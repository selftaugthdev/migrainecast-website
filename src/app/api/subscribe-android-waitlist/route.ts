import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "landing_page",
  "locale",
  "signup_timestamp",
] as const;

export async function POST(request: NextRequest) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_ANDROID_WAITLIST_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json({ error: "Waitlist is not configured." }, { status: 500 });
  }

  let email: unknown;
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // Optional attribution data (e.g. from campaign landing pages). Only
  // known keys with non-empty string values are forwarded.
  const fields = Object.fromEntries(
    ATTRIBUTION_KEYS.map((key) => [key, body[key]]).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string" && entry[1].trim() !== ""
    )
  );

  const referrer = request.headers.get("referer") ?? undefined;
  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  // Kit's v4 API has no single "subscribe to form by email" endpoint:
  // create (or fetch) the subscriber first, then add that subscriber to the form.
  let subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: kitHeaders,
    body: JSON.stringify(
      Object.keys(fields).length > 0
        ? { email_address: email, fields }
        : { email_address: email }
    ),
  });

  // If Kit rejects the request with custom fields attached (e.g. the
  // account doesn't recognize one of the keys), fall back to a plain
  // subscribe so attribution data never blocks the actual signup.
  if (!subscriberResponse.ok && Object.keys(fields).length > 0) {
    subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: kitHeaders,
      body: JSON.stringify({ email_address: email }),
    });
  }

  if (!subscriberResponse.ok) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  const { subscriber } = await subscriberResponse.json();

  const formResponse = await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers/${subscriber.id}`, {
    method: "POST",
    headers: kitHeaders,
    body: JSON.stringify({ referrer }),
  });

  if (!formResponse.ok) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

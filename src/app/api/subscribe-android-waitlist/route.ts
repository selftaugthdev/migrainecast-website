import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_ANDROID_WAITLIST_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json({ error: "Waitlist is not configured." }, { status: 500 });
  }

  let email: unknown;
  try {
    const body = await request.json();
    email = body?.email;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const referrer = request.headers.get("referer") ?? undefined;
  const kitHeaders = {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  // Kit's v4 API has no single "subscribe to form by email" endpoint:
  // create (or fetch) the subscriber first, then add that subscriber to the form.
  const subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: kitHeaders,
    body: JSON.stringify({ email_address: email }),
  });

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

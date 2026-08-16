"use client";

import { useEffect, useState } from "react";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;
const STORAGE_KEY = "mc_attribution";

function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  let stored: Attribution = {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw) as Attribution;
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  return { ...stored, ...fromUrl };
}

/**
 * Captures utm_* params from the current URL (ignoring any other query
 * params, so unknown ones can never break this) and persists them in
 * sessionStorage so attribution survives client-side navigation for the
 * rest of the visit, even once the params drop off the URL.
 *
 * Resolved synchronously on the first client render (not in an effect) so
 * consumers that track an event on mount get accurate values on their very
 * first render instead of firing once empty and once populated.
 */
export function useAttribution(): Attribution {
  const [attribution] = useState<Attribution>(readAttribution);

  useEffect(() => {
    if (Object.keys(attribution).length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch {
      // ignore storage errors (private browsing, quota, etc.)
    }
  }, [attribution]);

  return attribution;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Small internal event helper. Currently forwards to the GA (gtag) install
 * already present in the app (see GoogleAnalytics.tsx). Centralizing calls
 * here means swapping or adding a provider later only touches this file.
 */
export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== "")
  );

  window.gtag("event", eventName, cleanParams);
}

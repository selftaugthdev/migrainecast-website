"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { useAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

export function LandingViewTracker() {
  const pathname = usePathname();
  const attribution = useAttribution();

  useEffect(() => {
    trackEvent("pinterest_landing_view", { path: pathname, ...attribution });
    // Fire once on mount with whatever attribution resolved synchronously —
    // see useAttribution for why this doesn't need pathname/attribution deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

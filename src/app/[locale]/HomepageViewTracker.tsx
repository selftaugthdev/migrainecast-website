"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

export function HomepageViewTracker() {
  const pathname = usePathname();
  const locale = useLocale();
  const attribution = useAttribution();

  useEffect(() => {
    trackEvent("homepage_view", { path: pathname, locale, ...attribution });
    // Fire once on mount with whatever attribution resolved synchronously —
    // see useAttribution for why this doesn't need pathname/attribution deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

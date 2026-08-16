"use client";

import { AndroidWaitlistWidget } from "@/components/AndroidWaitlistWidget";
import { DownloadButton } from "@/components/DownloadButton";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";
import { useAttribution } from "@/lib/attribution";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278?ppid=49039837-f866-4209-b1b3-4ee7ac306f82";

const AppleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current shrink-0 ${className}`}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const IOS_BUTTON_CLASS =
  "inline-flex items-center gap-2.5 px-7 py-[17px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]";

/**
 * Shared iOS-download + Android-waitlist CTA pair used across the homepage
 * (hero, Android section, final CTA). Wires both buttons to the existing
 * DownloadButton/AndroidWaitlistWidget logic and fires location-aware
 * analytics events with path, locale, and any captured UTM attribution.
 */
export function HomeConversionActions({
  location,
  iosLabel,
  iosEventName,
  androidClickEventName,
  androidBadge,
  androidButtonLabel,
  iosClassName,
  stack = false,
  hideIos = false,
}: {
  location: string;
  iosLabel?: string;
  iosEventName?: string;
  /** Extra location-specific event fired alongside the generic android_waitlist_start. */
  androidClickEventName?: string;
  androidBadge?: string;
  androidButtonLabel?: string;
  iosClassName?: string;
  stack?: boolean;
  /** Android-only usage (e.g. the dedicated Android section). */
  hideIos?: boolean;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const attribution = useAttribution();

  const eventParams = { path: pathname, location, locale, ...attribution };

  return (
    <div className={`flex flex-wrap items-start gap-4 ${stack ? "sm:flex-row flex-col sm:items-center" : ""}`}>
      {!hideIos && (
        <DownloadButton
          href={APPSTORE_URL}
          location={location}
          eventName={iosEventName ?? "ios_download_click"}
          eventParams={eventParams}
          className={iosClassName ?? IOS_BUTTON_CLASS}
        >
          <AppleIcon />
          {iosLabel}
        </DownloadButton>
      )}

      <AndroidWaitlistWidget
        variant="green"
        badge={androidBadge}
        buttonLabel={androidButtonLabel}
        attribution={{
          ...attribution,
          landing_page: pathname,
          locale,
          signup_timestamp: new Date().toISOString(),
        }}
        onOpen={() => {
          if (androidClickEventName) trackEvent(androidClickEventName, eventParams);
          trackEvent("android_waitlist_start", eventParams);
        }}
        onSubmitted={(status) => {
          if (status === "success") trackEvent("android_waitlist_submit", eventParams);
        }}
      />
    </div>
  );
}

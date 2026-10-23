import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl", "de", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Keep canonical English URLs stable regardless of cookies or Accept-Language.
  localeDetection: false,
  // Page metadata and the sitemap advertise only genuine translations.
  alternateLinks: false,
});

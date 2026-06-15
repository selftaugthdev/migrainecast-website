import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl", "de", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

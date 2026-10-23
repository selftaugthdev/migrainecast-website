export const BASE_URL = "https://www.migrainecast.app";
export const LOCALES = ["en", "nl", "de", "fr", "es"] as const;
export const DEFAULT_LOCALE = "en";

// Only these routes have translated main content. English-only pages must not
// advertise four additional copies as translated, independently indexable URLs.
const TRANSLATED_PATHS = new Set(["/", "/tools/find-a-specialist"]);

export function localesForPath(path: string): readonly string[] {
  return TRANSLATED_PATHS.has(path) ? LOCALES : [DEFAULT_LOCALE];
}

export function localizedUrl(path: string, locale: string): string {
  if (!localesForPath(path).includes(locale)) locale = DEFAULT_LOCALE;
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const normalizedPath = path === "/" ? "" : path;
  return `${BASE_URL}${prefix}${normalizedPath}`;
}

export function buildAlternates(path: string, locale: string) {
  return {
    canonical: localizedUrl(path, locale),
    languages: {
      ...Object.fromEntries(localesForPath(path).map((l) => [l, localizedUrl(path, l)])),
      "x-default": localizedUrl(path, DEFAULT_LOCALE),
    },
  };
}

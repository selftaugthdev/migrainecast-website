export const BASE_URL = "https://www.migrainecast.app";
export const LOCALES = ["en", "nl", "de", "fr", "es"] as const;
export const DEFAULT_LOCALE = "en";

export function localizedUrl(path: string, locale: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const normalizedPath = path === "/" ? "" : path;
  return `${BASE_URL}${prefix}${normalizedPath}`;
}

export function buildAlternates(path: string, locale: string) {
  return {
    canonical: localizedUrl(path, locale),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localizedUrl(path, l)])),
      "x-default": localizedUrl(path, DEFAULT_LOCALE),
    },
  };
}

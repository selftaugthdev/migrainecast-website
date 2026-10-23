import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { DEFAULT_LOCALE, LOCALES, localesForPath } from "./lib/seo";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/");
  const locale = segments[1];
  if (LOCALES.some((supported) => supported === locale)) {
    const path = `/${segments.slice(2).join("/")}`.replace(/\/$/, "") || "/";
    if (locale !== DEFAULT_LOCALE && !localesForPath(path).includes(locale)) {
      const destination = request.nextUrl.clone();
      destination.pathname = path;
      return NextResponse.redirect(destination, 308);
    }
  }
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

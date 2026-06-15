import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MetaPixel } from "@/components/MetaPixel";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  nl: "nl_NL",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Layout" });

  return {
    metadataBase: new URL("https://migrainecast.app"),
    title: t("metadataTitle"),
    description: t("metadataDescription"),
    alternates: {
      languages: {
        en: "/",
        nl: "/nl",
        de: "/de",
        fr: "/fr",
        es: "/es",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("metadataTitle"),
      description: t("metadataDescription"),
      type: "website",
      locale: ogLocaleMap[locale] ?? "en_US",
      siteName: "MigraineCast",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadataTitle"),
      description: t("metadataDescription"),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Layout" });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MigraineCast",
    description: t("organizationDescription"),
    url: "https://migrainecast.com",
    logo: "https://migrainecast.com/Migraine Cast LOGO DARK MODE.png",
    sameAs: [
      "https://apps.apple.com/us/app/migraine-cast/id6754256278",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MigraineCast",
    url: "https://migrainecast.com",
    description: t("websiteDescription"),
  };

  return (
    <html lang={locale} suppressHydrationWarning className={`${fraunces.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'light';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <GoogleAnalytics />
      <MetaPixel />
      <body className="bg-bg text-text antialiased overflow-x-hidden">
        <NextIntlClientProvider>
          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

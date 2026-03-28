import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "MigraineCast — Predict Migraines Before They Strike",
  description:
    "MigraineCast helps you spot migraine patterns linked to weather, pressure, and triggers — so attacks don't come out of nowhere.",
  openGraph: {
    title: "MigraineCast — Predict Migraines Before They Strike",
    description:
      "MigraineCast helps you spot migraine patterns linked to weather, pressure, and triggers — so attacks don't come out of nowhere.",
    type: "website",
    locale: "en_US",
    siteName: "MigraineCast",
  },
  twitter: {
    card: "summary_large_image",
    title: "MigraineCast — Predict Migraines Before They Strike",
    description:
      "MigraineCast helps you spot migraine patterns linked to weather, pressure, and triggers — so attacks don't come out of nowhere.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MigraineCast",
  description:
    "MigraineCast helps migraine sufferers predict and prepare for attacks by tracking patterns linked to weather, barometric pressure, and personal triggers.",
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
  description:
    "Predict migraines before they strike with MigraineCast. Track patterns, understand weather triggers, and take control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${plusJakarta.variable}`}>
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
        <Navigation />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

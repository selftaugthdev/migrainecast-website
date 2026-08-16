import { Background } from "@/components/Background";
import { FeatureCards } from "@/components/FeatureCards";
import { HomeConversionActions } from "@/components/HomeConversionActions";
import { HomepageViewTracker } from "./HomepageViewTracker";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Layout" });

  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MigraineCast",
    applicationCategory: "HealthApplication",
    operatingSystem: "iOS",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "100" },
    description: t("schema.description"),
    downloadUrl: APPSTORE_URL,
    featureList: t.raw("schema.featureList") as string[],
  };

  const howItWorksSteps = t.raw("howItWorks.steps") as { title: string; desc: string }[];

  const howItWorksIcons = [
    (
      <svg key="check-conditions" viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    (
      <svg key="log-symptoms" viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    (
      <svg key="review-history" viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <HomepageViewTracker />
      <Background />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative w-full">
          <Image
            src="/hero-bg.jpg"
            alt="A woman finds calm above the clouds at sunrise, with the MigraineCast app open on her phone"
            width={2560}
            height={1440}
            priority
            unoptimized
            className="block w-full h-auto"
          />

          {/* Top scrim so the floating nav stays legible over the photo */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />

          {/* Scrim so the headline stays legible over the photo (desktop overlay only) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

          {/* iPhone mockup — self-contained box matching the frame PNG's own aspect ratio, placed in the open sky to the right of the photo's subject */}
          <div
            className="absolute"
            style={{ left: "72.75%", top: "21.79%", width: "18.5%", aspectRatio: "600 / 1139" }}
          >
            <div
              className="absolute overflow-hidden bg-black"
              style={{ left: "11.33%", top: "3.51%", width: "76.83%", height: "92.18%", borderRadius: "12% / 6%" }}
            >
              <Image
                src="/Simulator Screenshot - iPhone 17 Pro - 2026-01-23 at 19.49.29.png"
                alt="MigraineCast forecast screen showing daily migraine risk level with pressure, humidity, and temperature sensitivity factors"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <img
              src="/iphone mockup.png"
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
            />
          </div>

          {/* Desktop copy — overlaid on the open sky to the left of the photo */}
          <div className="hidden lg:flex absolute inset-0 flex-col pl-16 pt-28 max-w-[600px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white uppercase tracking-[0.08em] mb-5 backdrop-blur-sm w-fit animate-fade-up-delay-2">
              {t("hero.eyebrow")}
            </div>

            <h1 className="font-display text-[clamp(1.875rem,3.4vw,3rem)] font-normal leading-[1.1] tracking-tight mb-4 text-white animate-fade-up-delay-3">
              {t("hero.title")}
            </h1>

            <p className="text-[clamp(0.95rem,1.4vw,1.05rem)] text-white/90 leading-relaxed mb-7 animate-fade-up-delay-4">
              {t("hero.description")}
            </p>

            <div className="mb-5 animate-fade-up-delay-5">
              <HomeConversionActions
                location="hero"
                iosLabel={t("hero.downloadCta")}
                iosEventName="hero_ios_download_click"
                androidClickEventName="hero_android_waitlist_click"
                androidBadge={t("hero.androidBadge")}
                androidButtonLabel={t("hero.androidCta")}
              />
            </div>

            <div className="flex items-center gap-3 animate-fade-up-delay-5">
              <span className="text-yellow-400 tracking-tight text-base leading-none">★★★★★</span>
              <span className="text-sm text-white/85">
                {t.rich("hero.rating", {
                  b: (chunks) => <span className="text-white font-semibold">{chunks}</span>,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile copy — below the photo, using the page's normal theme colors */}
        <div className="lg:hidden px-6 pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold text-accent-soft uppercase tracking-[0.08em] mb-6">
            {t("hero.eyebrow")}
          </div>

          <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-normal leading-[1.07] tracking-tight mb-5">
            {t("hero.title")}
          </h1>

          <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-text-muted leading-relaxed mb-7">
            {t("hero.description")}
          </p>

          <div className="mb-6">
            <HomeConversionActions
              location="hero-mobile"
              iosLabel={t("hero.downloadCta")}
              iosEventName="hero_ios_download_click"
              androidClickEventName="hero_android_waitlist_click"
              androidBadge={t("hero.androidBadge")}
              androidButtonLabel={t("hero.androidCta")}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-yellow-400 tracking-tight text-base leading-none">★★★★★</span>
            <span className="text-sm text-text-muted">
              {t.rich("hero.rating", {
                b: (chunks) => <span className="text-text font-semibold">{chunks}</span>,
              })}
            </span>
          </div>
        </div>
      </section>

      {/* ── Core Benefits ────────────────────────────────────────────────── */}
      <section className="py-[120px] relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
            {t("coreBenefits.label")}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-4">
            {t("coreBenefits.title")}
          </h2>
          <p className="text-lg text-text-muted max-w-[520px] mb-16 leading-relaxed">
            {t("coreBenefits.description")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <FeatureCards />
              <div className="py-5 px-7 bg-accent/[0.06] border-l-[3px] border-accent text-lg text-text-muted italic rounded-r-xl">
                {t("coreBenefits.highlight")}
              </div>
            </div>

            {/* iPhone Mockup */}
            <div className="relative h-[580px] flex items-center justify-center order-1 lg:order-2">
              <div className="glow-ring w-[400px] h-[400px]" />
              <div className="glow-ring w-[500px] h-[500px]" />
              <div className="glow-ring w-[600px] h-[600px]" />

              <div className="relative z-10">
                <div className="relative w-[280px] h-[572px] bg-gradient-to-b from-[#3a3a3c] via-[#2c2c2e] to-[#1c1c1e] rounded-[55px] p-[3px] shadow-[0_50px_100px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)]">
                  <div className="w-full h-full bg-black rounded-[52px] p-[10px]">
                    <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-black">
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-full z-10" />
                      <Image
                        src="/Simulator Screenshot - iPhone 17 Pro - 2026-01-23 at 19.49.29.png"
                        alt="MigraineCast app screenshot showing daily migraine risk forecast and sensitivity factors like pressure and humidity"
                        fill
                        sizes="280px"
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute right-[-2px] top-[140px] w-[3px] h-[80px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-r-sm" />
                <div className="absolute left-[-2px] top-[120px] w-[3px] h-[28px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-l-sm" />
                <div className="absolute left-[-2px] top-[160px] w-[3px] h-[50px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-l-sm" />
                <div className="absolute left-[-2px] top-[220px] w-[3px] h-[50px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-l-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-[120px] bg-bg-elevated relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              {t("howItWorks.label")}
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-4">
              {t("howItWorks.title")}
            </h2>
            <p className="text-lg text-text-muted max-w-[480px] mx-auto">
              {t("howItWorks.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, i) => (
              <div
                key={i}
                className="relative p-10 glass-card glass-card-hover rounded-3xl text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent to-coral rounded-xl flex items-center justify-center font-display text-lg font-medium text-white shadow-[0_8px_20px_rgba(167,139,250,0.4)]">
                  {i + 1}
                </div>
                <div className="w-16 h-16 mx-auto mt-5 mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  {howItWorksIcons[i]}
                </div>
                <h4 className="font-display text-xl font-medium mb-3">{step.title}</h4>
                <p className="text-[0.95rem] text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Weather Positioning ──────────────────────────────────────────── */}
      <section className="py-[100px] relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
            {t("weather.label")}
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-tight mb-6">
            {t("weather.title")}
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            {t("weather.body")}
          </p>
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────────────────────────────── */}
      <section className="py-[100px] relative">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <span className="text-yellow-400 text-xl tracking-tight">★★★★★</span>
          <blockquote className="font-display text-[clamp(1.4rem,3vw,2rem)] font-normal leading-[1.4] text-text mt-6 mb-5">
            &ldquo;{t("testimonial.quote")}&rdquo;
          </blockquote>
          <p className="text-text-muted text-sm">{t("testimonial.author")}</p>
        </div>
      </section>

      {/* ── Android ──────────────────────────────────────────────────────── */}
      <section id="android" className="py-[120px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3DDC84]/[0.08] via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[640px] mx-auto px-6 relative text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold text-accent-soft uppercase tracking-[0.08em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] inline-block" />
            {t("android.label")}
          </span>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-normal leading-tight mb-4">
            {t("android.title")}
          </h2>
          <p className="text-lg text-text-muted leading-relaxed mb-9 max-w-[480px] mx-auto">
            {t("android.body")}
          </p>

          <div className="flex flex-col items-center gap-3">
            <HomeConversionActions
              location="android-section"
              hideIos
              androidBadge={t("hero.androidBadge")}
              androidButtonLabel={t("android.buttonLabel")}
            />
            <p className="text-xs text-text-subtle max-w-[380px]">{t("android.formNote")}</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section id="download" className="text-center py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(167,139,250,0.15)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight mb-10">
            {t("finalCta.titleLine1")}
            <br />
            {t("finalCta.titleLine2")}
          </h2>

          <div className="flex justify-center mb-6">
            <HomeConversionActions
              location="final"
              iosLabel={t("finalCta.iosCta")}
              iosEventName="final_ios_download_click"
              androidClickEventName="final_android_waitlist_click"
              androidBadge={t("hero.androidBadge")}
              androidButtonLabel={t("finalCta.androidCta")}
              stack
            />
          </div>

          <p className="text-sm text-text-subtle">{t("finalCta.freeNote")}</p>
          <p className="mt-2 text-sm text-text-subtle">{t("finalCta.availableOn")}</p>
        </div>
      </section>

      {/* ── Medical & trust boundary ─────────────────────────────────────── */}
      <section className="pb-16 relative">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <p className="text-sm text-text-subtle leading-relaxed">
            {t("medicalDisclaimer")}
          </p>
        </div>
      </section>
    </>
  );
}

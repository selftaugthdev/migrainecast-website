import { Background } from "@/components/Background";
import { DownloadButton } from "@/components/DownloadButton";
import { FeatureCards } from "@/components/FeatureCards";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278";

const AppleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current shrink-0 ${className}`}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

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
  const courseChecklist = t.raw("course.checklist") as string[];
  const courseDays = t.raw("course.days") as { day: string; title: string }[];
  const isThisYouItems = t.raw("isThisYou.items") as string[];

  const howItWorksIcons = [
    (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
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
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />

          {/* Scrim so the headline stays legible over the photo (desktop overlay only) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

          {/* iPhone mockup — self-contained box matching the frame PNG's own aspect ratio, placed in the open sky to the right of the photo's subject */}
          <div
            className="absolute"
            style={{ left: "72.75%", top: "21.79%", width: "18.5%", aspectRatio: "600 / 1139" }}
          >
            <div
              className="absolute overflow-hidden bg-black"
              style={{ left: "11.33%", top: "3.51%", width: "76.83%", height: "92.18%", borderRadius: "12% / 6%" }}
            >
              <video
                src="/demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain"
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
              <AppleIcon className="w-3.5 h-3.5" />
              {t("hero.badge")}
            </div>

            <h1 className="font-display text-[clamp(1.875rem,3.4vw,3rem)] font-normal leading-[1.1] tracking-tight mb-4 text-white animate-fade-up-delay-3">
              {t.rich("hero.title", {
                em: (chunks) => <em className="italic text-[#a3b0f8]">{chunks}</em>,
              })}
            </h1>

            <p className="text-[clamp(0.95rem,1.4vw,1.05rem)] text-white/80 leading-relaxed mb-6 animate-fade-up-delay-4">
              {t.rich("hero.description", {
                b: (chunks) => <span className="text-white font-medium">{chunks}</span>,
              })}
            </p>

            <div className="flex flex-wrap gap-3 mb-5 animate-fade-up-delay-5">
              <DownloadButton
                href={APPSTORE_URL}
                location="hero"
                className="inline-flex items-center gap-2.5 px-7 py-[17px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
              >
                <AppleIcon />
                {t("hero.downloadCta")}
              </DownloadButton>
              <Link
                href="/what-is-migrainecast"
                className="inline-flex items-center gap-2 px-5 py-[17px] text-white font-semibold transition-colors hover:text-accent-soft group"
              >
                {t("hero.howItHelps")}
                <svg
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center gap-3 animate-fade-up-delay-5">
              <span className="text-yellow-400 tracking-tight text-base leading-none">★★★★★</span>
              <span className="text-sm text-white/80">
                {t.rich("hero.rating", {
                  b: (chunks) => <span className="text-white font-semibold">{chunks}</span>,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile copy — below the photo, using the page's normal theme colors */}
        <div className="lg:hidden px-6 pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold text-accent-soft uppercase tracking-[0.08em] mb-7">
            <AppleIcon className="w-3.5 h-3.5" />
            {t("hero.badge")}
          </div>

          <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-normal leading-[1.07] tracking-tight mb-5">
            {t.rich("hero.title", {
              em: (chunks) => <em className="italic text-accent-soft">{chunks}</em>,
            })}
          </h1>

          <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-text-muted leading-relaxed mb-8">
            {t.rich("hero.description", {
              b: (chunks) => <span className="text-text font-medium">{chunks}</span>,
            })}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <DownloadButton
              href={APPSTORE_URL}
              location="hero-mobile"
              className="inline-flex items-center gap-2.5 px-7 py-[17px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
            >
              <AppleIcon />
              {t("hero.downloadCta")}
            </DownloadButton>
            <Link
              href="/what-is-migrainecast"
              className="inline-flex items-center gap-2 px-5 py-[17px] text-text font-semibold transition-colors hover:text-accent-soft group"
            >
              {t("hero.howItHelps")}
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px] fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
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

      {/* ── Features (Solution) ──────────────────────────────────────────── */}
      <section className="py-[120px] relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
            {t("solution.label")}
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-4">
            {t("solution.title")}
          </h2>
          <p className="text-lg text-text-muted max-w-[520px] mb-16 leading-relaxed">
            {t("solution.description")}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <FeatureCards />
              <div className="py-5 px-7 bg-accent/[0.06] border-l-[3px] border-accent text-lg text-text-muted italic rounded-r-xl">
                {t("solution.highlight")}
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
                        alt="MigraineCast app screenshot"
                        fill
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

      {/* ── Free Course Promo ─────────────────────────────────────────────── */}
      <section className="py-[100px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-coral/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[1000px] mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 px-3 py-1.5 bg-accent/10 rounded-full border border-accent/20">
                {t("course.badge")}
              </span>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-tight mb-4">
                {t("course.title")}
              </h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                {t("course.description")}
              </p>
              <ul className="space-y-3 mb-8">
                {courseChecklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-muted">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/weather-course"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(167,139,250,0.5)] group"
              >
                {t("course.cta")}
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-coral/20 rounded-3xl blur-2xl" />
                <div className="relative p-8 glass-card rounded-2xl backdrop-blur-sm">
                  <div className="space-y-4">
                    {courseDays.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <span className="text-xs font-semibold text-accent w-12">{item.day}</span>
                        <span className="text-sm text-text-muted">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Is This You? ─────────────────────────────────────────────────── */}
      <section className="py-[120px] relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              {t("isThisYou.label")}
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight">
              {t("isThisYou.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {isThisYouItems.map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-7 glass-card glass-card-hover rounded-2xl"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-accent/20 to-[#8b5cf6]/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 stroke-accent-soft stroke-2 fill-none"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[1.05rem] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section id="download" className="text-center py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(167,139,250,0.15)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight mb-4">
            {t("finalCta.titleLine1")}
            <br />
            {t("finalCta.titleLine2")}
          </h2>
          <p className="text-lg text-text-muted max-w-[560px] mx-auto mb-12">
            {t("finalCta.description")}
          </p>

          <DownloadButton
            href={APPSTORE_URL}
            location="cta"
            className="inline-flex items-center gap-2.5 px-12 py-[22px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold text-lg rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            <AppleIcon className="w-[22px] h-[22px]" />
            {t("finalCta.downloadCta")}
          </DownloadButton>

          <p className="mt-5 text-sm text-text-subtle">
            {t("finalCta.freeNote")}
          </p>
          <p className="mt-3 text-sm text-text-subtle flex items-center justify-center gap-2">
            <AppleIcon className="w-[18px] h-[18px]" />
            {t("finalCta.availableOn")}
          </p>
        </div>
      </section>
    </>
  );
}

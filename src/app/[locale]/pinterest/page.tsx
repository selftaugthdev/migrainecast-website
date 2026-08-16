import { Background } from "@/components/Background";
import Image from "next/image";
import type { Metadata } from "next";
import { BASE_URL, buildAlternates } from "@/lib/seo";
import { LandingViewTracker } from "./LandingViewTracker";
import { PinterestConversionActions } from "./PinterestConversionActions";
import { PinterestFaq } from "./PinterestFaq";

const TITLE = "Migraine Weather and Symptom Tracking | MigraineCast";
const DESCRIPTION =
  "Compare weather changes with your migraine history, track symptoms, and discover your personal patterns with MigraineCast.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: buildAlternates("/pinterest", locale),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: "website",
      siteName: "MigraineCast",
      images: [
        {
          url: `${BASE_URL}/hero-bg.jpg`,
          width: 2560,
          height: 1440,
          alt: "MigraineCast — weather-based migraine pattern tracking",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [`${BASE_URL}/hero-bg.jpg`],
    },
  };
}

const benefitCards = [
  {
    title: "Watch weather shifts",
    desc: "See pressure, temperature, and humidity changes in one place.",
    icon: (
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9z" />
    ),
  },
  {
    title: "Log symptoms quickly",
    desc: "Record what happened and when, without building a complicated diary.",
    icon: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
  },
  {
    title: "Compare patterns over time",
    desc: "Look for recurring relationships across multiple attacks.",
    icon: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </>
    ),
  },
];

const howItWorksSteps = [
  {
    title: "Check upcoming conditions",
    desc: "See how pressure, temperature, and humidity are shifting for your location.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
  },
  {
    title: "Log symptoms and attacks",
    desc: "A few taps to record what happened — no lengthy forms.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </>
    ),
  },
  {
    title: "Review patterns across time",
    desc: "See how your attacks line up with weather and other factors over weeks and months.",
    icon: (
      <>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </>
    ),
  },
];

const faqItems = [
  {
    question: "Is MigraineCast available on Android?",
    answer:
      "Not yet — MigraineCast is currently available on iPhone. The Android version is in development, and you can join the waitlist on this page to be notified as soon as it launches.",
  },
  {
    question: "Does weather trigger every migraine?",
    answer:
      "No. Weather is one possible factor among many — sleep, stress, hormones, diet, and other triggers all play a role, and they vary from person to person. MigraineCast helps you see whether weather lines up with your own attacks; it doesn't assume it's the cause.",
  },
  {
    question: "Can MigraineCast predict an attack?",
    answer:
      "MigraineCast shows a risk forecast based on upcoming weather conditions and the patterns in your own history, but it's guidance, not a guarantee. It's designed to help you notice possibilities and prepare, not to predict attacks with certainty.",
  },
  {
    question: "Is MigraineCast medical advice?",
    answer:
      "No. MigraineCast is a tracking and awareness tool. It doesn't diagnose migraine, recommend treatment, or replace care from a doctor or specialist.",
  },
  {
    question: "What information should I track?",
    answer:
      "Start with when an attack happened, roughly how severe it was, and anything that felt relevant — sleep, stress, food, or medication. Over time, comparing that history with weather and other conditions is what helps patterns become visible.",
  },
];

export default function PinterestLandingPage() {
  return (
    <>
      <LandingViewTracker />
      <Background />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-12 sm:pb-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
                From Pin to Personal Pattern
              </span>

              <h1 className="font-display text-[clamp(1.9rem,4.2vw,2.75rem)] font-normal leading-[1.15] tracking-tight mb-4 text-balance max-w-[29ch]">
                See whether weather changes align with your migraines
              </h1>

              <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-7 max-w-[500px]">
                MigraineCast brings forecasts, pressure changes, and your symptom history
                together so you can notice your own patterns over time.
              </p>

              <PinterestConversionActions
                location="hero"
                iosLabel="Download free on iPhone"
                androidBadge="Android coming soon"
              />

              <p className="mt-6 text-sm text-text-subtle flex items-center gap-2">
                <span className="text-yellow-400 tracking-tight">★★★★★</span>
                <span>
                  <span className="text-text font-semibold">4.8</span> on the App Store ·{" "}
                  <span className="text-text font-semibold">27+</span> countries
                </span>
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="glow-ring w-[260px] h-[260px]" />
                <div className="glow-ring w-[340px] h-[340px]" />
                <div className="relative z-10 w-[220px] sm:w-[260px] aspect-[280/572] bg-gradient-to-b from-[#3a3a3c] via-[#2c2c2e] to-[#1c1c1e] rounded-[42px] p-[3px] shadow-[0_50px_100px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)]">
                  <div className="w-full h-full bg-black rounded-[40px] p-[8px]">
                    <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[68px] h-[20px] bg-black rounded-full z-10" />
                      <Image
                        src="/Simulator Screenshot - iPhone 17 Pro - 2026-01-23 at 19.49.29.png"
                        alt="MigraineCast 14-day wellness forecast showing sensitivity factors like humidity and temperature change"
                        fill
                        sizes="(min-width: 640px) 260px, 220px"
                        className="object-cover object-top scale-[1.35] origin-top"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pinterest context strip ─────────────────────────────────────── */}
      <section className="relative py-8 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <p className="font-display text-lg font-normal mb-1.5">
            Found us through a migraine tip?
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            General information can help you recognize possibilities. Tracking helps you see
            what&rsquo;s actually recurring for you.
          </p>
        </div>
      </section>

      {/* ── Benefit cards ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitCards.map((card) => (
              <div key={card.title} className="glass-card glass-card-hover rounded-2xl p-7">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-coral/10 rounded-xl flex items-center justify-center mb-5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-[1.05rem] mb-1.5">{card.title}</h3>
                <p className="text-[0.95rem] text-text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-bg-elevated relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              How It Works
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-tight">
              Three steps, no complicated diary
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, i) => (
              <div
                key={step.title}
                className="relative p-10 glass-card glass-card-hover rounded-3xl text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent to-coral rounded-xl flex items-center justify-center font-display text-lg font-medium text-white shadow-[0_8px_20px_rgba(167,139,250,0.4)]">
                  {i + 1}
                </div>
                <div className="w-16 h-16 mx-auto mt-5 mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none"
                  >
                    {step.icon}
                  </svg>
                </div>
                <h4 className="font-display text-xl font-medium mb-3">{step.title}</h4>
                <p className="text-[0.95rem] text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product evidence ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 relative">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <span className="text-yellow-400 text-xl tracking-tight">★★★★★</span>
          <p className="font-display text-2xl font-normal mt-4 mb-2">
            4.8 on the App Store <span className="text-text-muted text-lg">· 27+ countries</span>
          </p>
          <blockquote className="text-text-muted italic leading-relaxed mt-6 max-w-[560px] mx-auto">
            &ldquo;All of my migraines were in line with high or medium risk days on the app. I
            finally understand what&rsquo;s happening.&rdquo;
          </blockquote>
          <p className="text-sm text-text-subtle mt-3">— Selen B., verified App Store review</p>
        </div>
      </section>

      {/* ── Platform conversion (repeat) ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-coral/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[640px] mx-auto px-6 relative">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-tight mb-4">
            Ready to see your own patterns?
          </h2>
          <p className="text-lg text-text-muted mb-9 leading-relaxed">
            Available free on iPhone today. Building for Android — join the list to be first in
            line.
          </p>

          <div className="flex justify-center">
            <PinterestConversionActions
              location="platform-section"
              iosLabel="Download free on the App Store"
              androidBadge="Android version in development"
              androidButtonLabel="Join the early-access waitlist"
              stack
            />
          </div>
        </div>
      </section>

      {/* ── Trust and medical boundary ───────────────────────────────────── */}
      <section className="pb-16 relative">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <p className="text-sm text-text-subtle leading-relaxed">
            MigraineCast helps you track patterns and environmental conditions. It does not
            diagnose migraine or replace medical care.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 relative">
        <div className="max-w-[760px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <PinterestFaq items={faqItems} />
        </div>
      </section>
    </>
  );
}

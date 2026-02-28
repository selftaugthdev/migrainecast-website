import { Background } from "@/components/Background";
import { FeatureCards } from "@/components/FeatureCards";
import Image from "next/image";
import Link from "next/link";

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MigraineCast",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "100",
  },
  description:
    "MigraineCast tracks barometric pressure and weather patterns to forecast migraine risk up to 48 hours ahead — so attacks don't come out of nowhere.",
  downloadUrl: "https://apps.apple.com/us/app/migraine-cast/id6754256278",
  featureList: [
    "Track migraine symptoms quickly",
    "Automatic weather and pressure correlation",
    "Pattern recognition and insights",
    "48-hour early warning alerts for risky conditions",
    "PDF report for neurologist appointments",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <Background />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-[120px] pb-20 relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[800px]">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent-soft mb-8 animate-fade-up-delay-2">
              <span className="text-yellow-400 shrink-0 tracking-tight">★★★★★</span>
              <span className="text-text-muted">&ldquo;All of my migraines were in line with high or medium risk days on the app.&rdquo;</span>
              <span className="text-text-subtle shrink-0">— Selen B.</span>
            </div>

            <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-normal leading-[1.1] mb-7 tracking-tight animate-fade-up-delay-3">
              Know a migraine is coming{" "}
              <em className="italic text-accent-soft">before</em> it hits
            </h1>

            <p className="text-[clamp(1.1rem,2vw,1.35rem)] text-text-muted max-w-[600px] mb-12 leading-relaxed animate-fade-up-delay-4">
              MigraineCast tracks barometric pressure and weather patterns at
              your location — giving you up to 48 hours of warning before
              high-risk days arrive.
            </p>

            <div className="flex flex-wrap gap-4 items-center animate-fade-up-delay-5">
              <a
                href="https://apps.apple.com/us/app/migraine-cast/id6754256278"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-[18px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download Free on iPhone
              </a>

              <Link
                href="/what-is-migrainecast"
                className="inline-flex items-center gap-2 px-6 py-[18px] text-text font-semibold transition-colors hover:text-accent-soft group"
              >
                Learn more
                <svg
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-[60px] border-t border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row flex-wrap justify-center gap-12 md:gap-12 items-center">
          <div className="text-center">
            <div className="font-display text-4xl font-medium text-text mb-1">
              27+
            </div>
            <div className="text-sm text-text-muted">Countries</div>
          </div>

          <div className="w-12 h-px md:w-px md:h-12 bg-white/10" />

          <div className="text-center">
            <div className="font-display text-4xl font-medium text-text mb-1">
              4.8★
            </div>
            <div className="text-sm text-text-muted">App Store rating</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-[120px] bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-[720px] mx-auto text-center">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              The Problem
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-6">
              Migraines don&apos;t come &quot;randomly&quot; — they just feel that way
            </h2>

            <div className="my-12 text-left max-w-[500px] mx-auto space-y-3">
              <p className="text-lg text-text-muted pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-text-subtle">
                Most migraine sufferers are told to &quot;track their triggers.&quot;
              </p>
              <p className="text-lg text-text-muted pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-text-subtle">
                So they write things down…
              </p>
              <p className="text-lg text-text-muted pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-text-subtle">
                Forget entries…
              </p>
              <p className="text-lg text-text-muted pl-7 relative before:content-['→'] before:absolute before:left-0 before:text-text-subtle">
                And still can&apos;t see any patterns.
              </p>
            </div>

            <p className="text-lg text-text-muted max-w-[600px] mx-auto">
              Weather, air pressure, sleep, stress — it&apos;s too much for the human
              brain to connect manually.
            </p>

            <p className="text-xl text-text mt-12 font-display italic">
              That&apos;s why migraines feel unpredictable.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-[120px] relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
            The Solution
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-6">
            MigraineCast connects the dots for you
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mt-16">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <FeatureCards />

              <div className="mt-2 py-5 px-7 bg-white/[0.03] border-l-[3px] border-accent text-lg text-text-muted italic">
                No spreadsheets. No guesswork. No medical jargon.
              </div>
            </div>

            {/* iPhone Mockup */}
            <div className="relative h-[580px] flex items-center justify-center order-1 lg:order-2">
              <div className="glow-ring w-[400px] h-[400px]" />
              <div className="glow-ring w-[500px] h-[500px]" />
              <div className="glow-ring w-[600px] h-[600px]" />

              <div className="relative">
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

      {/* Free Course Promo */}
      <section className="py-[100px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-coral/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[1000px] mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-4 px-3 py-1.5 bg-accent/10 rounded-full border border-accent/20">
                Free Email Course
              </span>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-tight mb-4">
                The Barometric Blueprint
              </h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                Finally understand why weather changes wreck your head. 7 days of
                science-backed insights delivered to your inbox.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Why pressure drops trigger migraines before the storm",
                  "Your brain's hidden weather sensitivity explained",
                  "Practical strategies to prepare and protect yourself",
                ].map((item, i) => (
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
                Get Free Access
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
                <div className="relative p-8 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="space-y-4">
                    {[
                      { day: "Day 1", title: "Why Does the Weather Give You Migraines?" },
                      { day: "Day 2", title: "Barometric Pressure: The Silent Trigger" },
                      { day: "Day 3", title: "The Lightning Connection (Yes, Really)" },
                      { day: "Day 4", title: "Temperature, Humidity, and the Heat Factor" },
                      { day: "Day 5", title: "Weather-Proofing Your Life" },
                      { day: "Day 6", title: "The Smarter Way to Track Weather Triggers" },
                      { day: "Day 7", title: "Taking Control of Weather Triggers" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <span className="text-xs font-semibold text-accent w-12">
                          {item.day}
                        </span>
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

      {/* How It Works */}
      <section id="how-it-works" className="py-[120px] bg-bg-elevated relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              How It Works
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-6">
              Three steps to clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {[
              {
                num: 1,
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                ),
                title: "Log your symptoms",
                desc: "Record migraine symptoms and severity in just a few taps",
              },
              {
                num: 2,
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                title: "We analyze the data",
                desc: "MigraineCast continuously matches your data with environmental changes",
              },
              {
                num: 3,
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                title: "See your patterns",
                desc: "Get personalized insights, trends, and early warnings",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative p-10 bg-white/[0.02] border border-white/5 rounded-3xl text-center transition-all duration-400 hover:bg-accent/5 hover:border-accent/20 hover:-translate-y-2"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent to-coral rounded-xl flex items-center justify-center font-display text-lg font-medium shadow-[0_8px_20px_rgba(167,139,250,0.4)]">
                  {step.num}
                </div>
                <div className="w-16 h-16 mx-auto mt-5 mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <h4 className="font-display text-xl font-medium mb-3">{step.title}</h4>
                <p className="text-[0.95rem] text-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-[120px] relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              Who It&apos;s For
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-6">
              Built for real migraine sufferers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-[900px] mx-auto">
            {[
              "You've cancelled plans because of a migraine that came out of nowhere",
              "You suspect weather is a trigger — but you can't prove it yet",
              "Your doctor said 'just track it' and you've tried, but it hasn't helped",
              "You want to prepare for attacks, not just react to them",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-7 bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-300 hover:bg-accent/5 hover:border-accent/15"
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

      {/* Privacy Section */}
      <section className="py-[120px] bg-gradient-to-b from-bg to-bg-elevated">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Shield Visual */}
            <div className="flex justify-center items-center relative order-1 lg:order-1">
              <div className="w-[200px] h-[200px] relative">
                <div className="shield-ring absolute -inset-10" />
                <div className="shield-ring absolute -inset-[70px] opacity-50" />
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full stroke-accent stroke-1 fill-none drop-shadow-[0_0_40px_rgba(167,139,250,0.3)]"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path
                    d="M9 12l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Privacy Text */}
            <div className="order-2 lg:order-2 text-center lg:text-left">
              <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
                Privacy First
              </span>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-8">
                Your health data stays yours
              </h2>

              <div className="flex flex-col gap-5">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-soft stroke-[1.5] fill-none">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ),
                    text: "Your data is never sold",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-soft stroke-[1.5] fill-none">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                      </svg>
                    ),
                    text: "No ads. No tracking for marketers.",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-soft stroke-[1.5] fill-none">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ),
                    text: "Just insights to help you manage migraines better",
                  },
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      {point.icon}
                    </div>
                    <p className="text-[1.05rem] text-text-muted">{point.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="download" className="text-center py-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(167,139,250,0.15)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight mb-4">
            Stop guessing.
            <br />
            Start seeing patterns.
          </h2>
          <p className="text-lg text-text-muted max-w-[600px] mx-auto mb-12">
            Take control of your migraines with data-driven insights.
          </p>

          <a
            href="https://apps.apple.com/us/app/migraine-cast/id6754256278"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-12 py-[22px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold text-lg rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download Free on iPhone
          </a>

          <p className="mt-5 text-sm text-text-subtle">
            Free to download — premium features unlock deeper insights
          </p>

          <p className="mt-3 text-sm text-text-subtle flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Available on iOS
          </p>
        </div>
      </section>
    </>
  );
}

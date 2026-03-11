import { Background } from "@/components/Background";
import { FeatureCards } from "@/components/FeatureCards";
import Image from "next/image";
import Link from "next/link";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278";

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MigraineCast",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "100" },
  description:
    "MigraineCast tracks barometric pressure and weather patterns to forecast migraine risk up to 48 hours ahead — so attacks don't come out of nowhere.",
  downloadUrl: APPSTORE_URL,
  featureList: [
    "Track migraine symptoms quickly",
    "Automatic weather and pressure correlation",
    "Pattern recognition and insights",
    "48-hour early warning alerts for risky conditions",
    "PDF report for neurologist appointments",
  ],
};

const AppleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current shrink-0 ${className}`}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <Background />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Use full width container on hero, no right padding on lg so phone can sit at edge */}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:pr-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10 lg:gap-8">

            {/* Left: Copy */}
            <div className="max-w-[600px] lg:pl-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold text-accent-soft uppercase tracking-[0.08em] mb-7 animate-fade-up-delay-2">
                <AppleIcon className="w-3.5 h-3.5" />
                Available on iPhone
              </div>

              <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.75rem)] font-normal leading-[1.07] tracking-tight mb-5 animate-fade-up-delay-3">
                Know a migraine is coming{" "}
                <em className="italic text-accent-soft">before</em> it hits
              </h1>

              <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-text-muted leading-relaxed mb-8 animate-fade-up-delay-4">
                Barometric pressure drops and weather shifts have been quietly
                triggering your migraines for years. MigraineCast shows you the
                pattern — and warns you{" "}
                <span className="text-text font-medium">up to 48 hours ahead</span>,
                so you can protect your days instead of losing them.
              </p>

              <div className="flex flex-wrap gap-3 mb-8 animate-fade-up-delay-5">
                <a
                  href={APPSTORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-[17px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
                >
                  <AppleIcon />
                  Download Free on iPhone
                </a>
                <Link
                  href="/what-is-migrainecast"
                  className="inline-flex items-center gap-2 px-5 py-[17px] text-text font-semibold transition-colors hover:text-accent-soft group"
                >
                  How it helps
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
                <span className="text-sm text-text-muted">
                  <span className="text-text font-semibold">4.8</span> on the App Store ·{" "}
                  <span className="text-text font-semibold">27+</span> countries
                </span>
              </div>
            </div>

            {/* Right: iPhone with demo video — flush to right edge */}
            <div className="flex items-center justify-center lg:justify-end animate-fade-up-delay-3">
              <div className="relative">
                {/* Glow rings */}
                <div className="glow-ring w-[320px] h-[320px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="glow-ring w-[460px] h-[460px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />

                {/* iPhone frame */}
                <div className="relative z-10">
                  <div className="relative w-[290px] h-[593px] bg-gradient-to-b from-[#3a3a3c] via-[#2c2c2e] to-[#1c1c1e] rounded-[55px] p-[3px] shadow-[0_60px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)]">
                    <div className="w-full h-full bg-black rounded-[52px] p-[10px]">
                      <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-black flex items-center justify-center">
                        <video
                          src="/demo.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Side buttons */}
                  <div className="absolute right-[-2px] top-[154px] w-[3px] h-[77px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-r-sm" />
                  <div className="absolute left-[-2px] top-[130px] w-[3px] h-[27px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-l-sm" />
                  <div className="absolute left-[-2px] top-[172px] w-[3px] h-[48px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-l-sm" />
                  <div className="absolute left-[-2px] top-[236px] w-[3px] h-[48px] bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] rounded-l-sm" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Features (Solution) ──────────────────────────────────────────── */}
      <section className="py-[120px] relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
            The Solution
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-4">
            Stop reacting. Start predicting.
          </h2>
          <p className="text-lg text-text-muted max-w-[520px] mb-16 leading-relaxed">
            MigraineCast does the tracking, the analysis, and the alerting —
            so all you have to do is live your life.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <FeatureCards />
              <div className="py-5 px-7 bg-accent/[0.06] border-l-[3px] border-accent text-lg text-text-muted italic rounded-r-xl">
                No spreadsheets. No guesswork. No medical jargon.
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
              How It Works
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-4">
              Simple enough to actually stick with
            </h2>
            <p className="text-lg text-text-muted max-w-[480px] mx-auto">
              No complex setup. No hour-long journaling. Just a few taps — and
              MigraineCast takes care of the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: 1,
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                ),
                title: "Log in seconds, not minutes",
                desc: "Record an attack in a few taps. No lengthy forms, no friction — just the data that actually helps identify your triggers.",
              },
              {
                num: 2,
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                title: "We connect it to your weather",
                desc: "MigraineCast automatically links each attack to barometric pressure and weather changes at your exact location — no manual input.",
              },
              {
                num: 3,
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                title: "See what's coming — 48 hours ahead",
                desc: "Get a personalised risk forecast before dangerous conditions arrive. Protect your plans instead of cancelling them.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="relative p-10 glass-card glass-card-hover rounded-3xl text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-accent to-coral rounded-xl flex items-center justify-center font-display text-lg font-medium text-white shadow-[0_8px_20px_rgba(167,139,250,0.4)]">
                  {step.num}
                </div>
                <div className="w-16 h-16 mx-auto mt-5 mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  {step.icon}
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
            &ldquo;All of my migraines were in line with high or medium risk days
            on the app. I finally understand what&apos;s happening.&rdquo;
          </blockquote>
          <p className="text-text-muted text-sm">— Selen B., verified App Store review</p>
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
                Free Email Course
              </span>
              <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-tight mb-4">
                What Nobody Told You About Weather and Migraines
              </h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                Finally understand why weather changes wreck your head. 7 days of
                science-backed insights delivered to your inbox — free.
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
                <div className="relative p-8 glass-card rounded-2xl backdrop-blur-sm">
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
              Is This You?
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight">
              Built for real migraine sufferers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {[
              "You've cancelled plans because of a migraine that came out of nowhere",
              "You suspect weather is a trigger — but you can't prove it yet",
              "Your doctor said 'just track it' and you've tried, but it hasn't helped",
              "You want to prepare for attacks, not just react to them",
            ].map((text, i) => (
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
            Stop guessing.
            <br />
            Start seeing patterns.
          </h2>
          <p className="text-lg text-text-muted max-w-[560px] mx-auto mb-12">
            Join migraine sufferers in 27+ countries who finally understand
            their triggers — and see attacks coming before they hit.
          </p>

          <a
            href={APPSTORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-12 py-[22px] bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold text-lg rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_40px_rgba(167,139,250,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            <AppleIcon className="w-[22px] h-[22px]" />
            Download Free on iPhone
          </a>

          <p className="mt-5 text-sm text-text-subtle">
            Free to download — premium features unlock deeper insights
          </p>
          <p className="mt-3 text-sm text-text-subtle flex items-center justify-center gap-2">
            <AppleIcon className="w-[18px] h-[18px]" />
            Available on iOS
          </p>
        </div>
      </section>
    </>
  );
}

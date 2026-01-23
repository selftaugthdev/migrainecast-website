import { Background } from "@/components/Background";
import Link from "next/link";

export const metadata = {
  title: "What is MigraineCast? — MigraineCast",
  description:
    "MigraineCast is a migraine tracking and pattern-detection app that helps people understand how migraines relate to weather, air pressure, and personal triggers.",
};

export default function WhatIsMigraineCastPage() {
  return (
    <>
      <Background />

      <article className="pt-[140px] pb-20 relative z-10">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Header */}
          <header className="mb-16">
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight mb-6">
              What is MigraineCast?
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              MigraineCast is a migraine tracking and pattern-detection app that
              helps people understand how migraines relate to weather, air
              pressure, and personal triggers.
            </p>
            <p className="text-lg text-text-muted leading-relaxed mt-4">
              Instead of simply logging symptoms, MigraineCast focuses on
              revealing patterns over time — especially patterns that are
              difficult or impossible to spot manually.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-16">
            {/* Why MigraineCast exists */}
            <section>
              <h2 className="font-display text-2xl font-medium mb-6">
                Why MigraineCast exists
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p className="text-lg font-medium text-text">
                  Migraines often feel random.
                </p>
                <p>
                  One day you&apos;re fine.
                  <br />
                  The next day, an attack hits without warning.
                </p>
                <p>Many migraine sufferers are told to:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>&quot;Track your triggers&quot;</li>
                  <li>&quot;Keep a migraine diary&quot;</li>
                  <li>&quot;Look for patterns&quot;</li>
                </ul>
                <p>But in practice, this rarely works.</p>
                <p className="text-text font-medium">Why?</p>
                <p>
                  Because migraines are influenced by multiple variables at
                  once:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Weather and barometric pressure changes</li>
                  <li>Sleep quality</li>
                  <li>Stress levels</li>
                  <li>Delayed triggers that don&apos;t show up immediately</li>
                </ul>
                <p>
                  The human brain isn&apos;t good at connecting these signals
                  over weeks or months.
                </p>
                <p className="text-accent-soft font-medium">
                  MigraineCast exists to solve that specific problem.
                </p>
              </div>
            </section>

            {/* What MigraineCast does differently */}
            <section>
              <h2 className="font-display text-2xl font-medium mb-6">
                What MigraineCast does differently
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p className="text-lg text-text">
                  MigraineCast is designed to connect the dots, not just collect
                  data.
                </p>
                <p>The app helps you:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Log migraine symptoms quickly and consistently</li>
                  <li>
                    Automatically associate migraine activity with environmental
                    changes
                  </li>
                  <li>
                    Identify repeating patterns linked to weather and pressure
                    shifts
                  </li>
                  <li>Gain early insight into higher-risk conditions</li>
                </ul>
                <p className="text-text font-medium">
                  The goal is not perfect prediction — it&apos;s better
                  awareness and fewer surprises.
                </p>
              </div>
            </section>

            {/* How MigraineCast works */}
            <section>
              <h2 className="font-display text-2xl font-medium mb-6">
                How MigraineCast works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-coral rounded-lg flex items-center justify-center shrink-0 font-display font-medium text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">
                      You track migraine symptoms
                    </h3>
                    <p className="text-text-muted">
                      Simple entries focused on what actually matters long-term.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-coral rounded-lg flex items-center justify-center shrink-0 font-display font-medium text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">
                      Environmental data is continuously matched
                    </h3>
                    <p className="text-text-muted">
                      Weather and pressure changes are correlated with your
                      history.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-coral rounded-lg flex items-center justify-center shrink-0 font-display font-medium text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-1">
                      Patterns emerge over time
                    </h3>
                    <p className="text-text-muted">
                      Trends become visible that are hard to see manually.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-text-muted mt-6 italic">
                MigraineCast is built for long-term insight, not daily
                perfection.
              </p>
            </section>

            {/* Who MigraineCast is for */}
            <section>
              <h2 className="font-display text-2xl font-medium mb-6">
                Who MigraineCast is for
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>MigraineCast is designed for people who:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>
                    Suspect weather or pressure changes trigger their migraines
                  </li>
                  <li>
                    Feel frustrated by migraine diaries that show no clear
                    answers
                  </li>
                  <li>Want insight, not generic advice</li>
                  <li>Prefer simple tools over complicated medical apps</li>
                </ul>
                <p className="mt-4">It&apos;s especially useful if your migraines:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Don&apos;t have one obvious trigger</li>
                  <li>Appear delayed or inconsistent</li>
                  <li>Seem connected to environmental changes</li>
                </ul>
              </div>
            </section>

            {/* What MigraineCast is not */}
            <section>
              <h2 className="font-display text-2xl font-medium mb-6">
                What MigraineCast is not
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>To be clear:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>MigraineCast does not diagnose migraines</li>
                  <li>It does not replace medical advice or treatment</li>
                  <li>It does not guarantee migraine prevention</li>
                </ul>
                <p>
                  MigraineCast provides information and patterns, not medical
                  claims.
                </p>
                <p className="text-text">
                  The goal is understanding — so you can make better decisions
                  with your doctor, routines, or lifestyle.
                </p>
              </div>
            </section>

            {/* Privacy and data */}
            <section>
              <h2 className="font-display text-2xl font-medium mb-6">
                Privacy and data
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>MigraineCast is built with privacy in mind.</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Your data is not sold</li>
                  <li>No advertising trackers</li>
                  <li>Health information stays under your control</li>
                </ul>
                <p>
                  The app exists to help users — not to monetize personal health
                  data.
                </p>
              </div>
            </section>

            {/* The core idea */}
            <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
              <h2 className="font-display text-2xl font-medium mb-4">
                The core idea behind MigraineCast
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p className="text-lg text-text">
                  Migraines don&apos;t come out of nowhere.
                </p>
                <p>
                  They often follow patterns — subtle, delayed, and
                  multi-variable patterns that are hard to see without help.
                </p>
                <p className="text-accent-soft font-medium">
                  MigraineCast exists to make those patterns visible.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="pt-8">
              <h2 className="font-display text-2xl font-medium mb-6">
                Ready to learn more?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.02] border border-white/10 rounded-full text-text font-medium transition-all hover:bg-accent/10 hover:border-accent/30"
                >
                  See how it works
                </Link>
                <a
                  href="https://apps.apple.com/us/app/migraine-cast/id6754256278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full shadow-[0_4px_20px_rgba(167,139,250,0.4)] transition-all hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download the app
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.02] border border-white/10 rounded-full text-text font-medium transition-all hover:bg-accent/10 hover:border-accent/30"
                >
                  Read about migraines
                </Link>
              </div>
            </section>
          </div>

          {/* Footer tagline */}
          <footer className="mt-20 pt-8 border-t border-white/10">
            <p className="text-sm text-text-subtle text-center">
              MigraineCast is a migraine tracking and pattern-detection app
              focused on weather and environmental correlations.
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}

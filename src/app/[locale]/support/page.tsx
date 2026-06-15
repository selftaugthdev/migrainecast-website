import { Background } from "@/components/Background";
import Link from "next/link";

export const metadata = {
  title: "Support — MigraineCast",
  description:
    "Get help with MigraineCast. Contact us with questions, feedback, or issues.",
};

export default function SupportPage() {
  return (
    <>
      <Background />

      <section className="pt-[140px] pb-20 min-h-screen relative z-10">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Header */}
          <header className="mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              Support
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight mb-6">
              How can we help?
            </h1>
            <p className="text-lg text-text-muted">
              Have a question, feedback, or need assistance with MigraineCast?
              We&apos;re here to help.
            </p>
          </header>

          {/* Contact Options */}
          <div className="space-y-6">
            {/* Email Support */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-coral/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium mb-2">
                    Email Support
                  </h2>
                  <p className="text-text-muted mb-4">
                    For questions, feedback, or any issues with the app, reach
                    out via email. We typically respond within 24-48 hours.
                  </p>
                  <a
                    href="mailto:support@migrainecast.com"
                    className="inline-flex items-center gap-2 text-accent-soft font-medium hover:underline"
                  >
                    support@migrainecast.com
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-none stroke-current stroke-2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-coral/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium mb-2">
                    Common Questions
                  </h2>
                  <div className="space-y-4 text-text-muted">
                    <div>
                      <h3 className="font-semibold text-text mb-1">
                        How does MigraineCast track weather?
                      </h3>
                      <p>
                        MigraineCast uses your location to fetch local weather
                        and barometric pressure data, which is then correlated
                        with your migraine history.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">
                        Is my data private?
                      </h3>
                      <p>
                        Yes. Your health data is never sold, and we don&apos;t use
                        advertising trackers. Your information stays under your
                        control.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">
                        How long until I see patterns?
                      </h3>
                      <p>
                        Most users start seeing meaningful patterns after 2-4
                        weeks of consistent tracking. The more data you log, the
                        clearer the patterns become.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learn More */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-coral/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-xl font-medium mb-2">
                    Learn More
                  </h2>
                  <p className="text-text-muted mb-4">
                    Want to understand more about how MigraineCast works or
                    learn about migraines and weather?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/what-is-migrainecast"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-medium transition-all hover:bg-accent/10 hover:border-accent/30"
                    >
                      What is MigraineCast?
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-sm font-medium transition-all hover:bg-accent/10 hover:border-accent/30"
                    >
                      Read the blog
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

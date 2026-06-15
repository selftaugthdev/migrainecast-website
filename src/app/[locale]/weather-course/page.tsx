import { Background } from "@/components/Background";

export const metadata = {
  title: "Free 7-Day Course: What Nobody Told You About Weather and Migraines — MigraineCast",
  description:
    "Discover why weather changes trigger your migraines and what you can do about it. Free 7-day email course backed by science.",
};

export default function WeatherCoursePage() {
  return (
    <>
      <Background />

      {/* Hero Section */}
      <section className="pt-[140px] pb-20 relative z-10">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
            Free 7-Day Email Course
          </span>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.1] mb-6">
            Finally Understand Why the Weather{" "}
            <span className="text-accent-soft italic">Wrecks Your Head</span>
          </h1>

          <p className="text-xl text-text-muted max-w-[600px] mx-auto mb-4">
            &ldquo;I knew a storm was coming before the weatherman did.&rdquo;
          </p>
          <p className="text-lg text-text-muted max-w-[600px] mx-auto mb-10">
            Sound familiar? You&apos;re not imagining it. Science confirms what
            you&apos;ve suspected all along—and this free course explains
            exactly how it works.
          </p>

          {/* Form Container */}
          <div className="max-w-[480px] mx-auto mb-16">
            <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-sm">
              <h2 className="font-display text-2xl mb-2">
                What Nobody Told You About Weather and Migraines
              </h2>
              <p className="text-text-muted text-sm mb-6">
                7 days. 7 emails. Zero fluff. Just science you can use.
              </p>

              {/* KIT Form Embed - Replace this div with your ConvertKit form */}
              <form
                action="https://app.kit.com/forms/9019007/subscriptions"
                method="post"
                className="space-y-4"
              >
                <div>
                  <input
                    type="email"
                    name="email_address"
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text-subtle focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.4)] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(167,139,250,0.5)] transition-all cursor-pointer"
                >
                  Start Learning — It&apos;s Free
                </button>
                <p className="text-xs text-text-subtle text-center">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal mb-4">
              What You&apos;ll Discover
            </h2>
            <p className="text-text-muted max-w-[500px] mx-auto">
              Each day, a new piece of the puzzle delivered to your inbox
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                day: "Day 1",
                title: "Why Does the Weather Give You Migraines?",
                description:
                  "Why barometric pressure changes affect your brain before you feel a single drop of rain",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
              },
              {
                day: "Day 2",
                title: "Barometric Pressure: The Silent Trigger",
                description:
                  "The fascinating neuroscience of how pressure changes trigger the migraine cascade",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                ),
              },
              {
                day: "Day 3",
                title: "The Lightning Connection (Yes, Really)",
                description:
                  "The surprising link between storms, lightning, and migraine attacks",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                ),
              },
              {
                day: "Day 4",
                title: "Temperature, Humidity, and the Heat Factor",
                description:
                  "How temperature swings and moisture levels compound your migraine risk",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                    />
                  </svg>
                ),
              },
              {
                day: "Day 5",
                title: "Weather-Proofing Your Life",
                description:
                  "Practical strategies to prepare for and minimize weather-triggered attacks",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                day: "Day 6",
                title: "The Smarter Way to Track Weather Triggers",
                description:
                  "How to identify your personal weather patterns and thresholds",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                ),
              },
              {
                day: "Day 7",
                title: "Taking Control of Weather Triggers",
                description:
                  "Putting it all together with your personalized action plan",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                day: "Bonus",
                title: "Your Weather Sensitivity Profile",
                description:
                  "A self-assessment tool to identify your personal atmospheric triggers",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-accent/5 hover:border-accent/20 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-coral/10 rounded-xl flex items-center justify-center shrink-0 text-accent group-hover:from-accent/30 group-hover:to-coral/20 transition-all">
                  {item.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {item.day}
                  </span>
                  <h3 className="font-display text-lg mt-1 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="p-10 bg-gradient-to-br from-accent/10 to-coral/5 border border-accent/20 rounded-3xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-display text-4xl text-accent-soft mb-2">
                  73%
                </div>
                <p className="text-sm text-text-muted">
                  of migraine sufferers report weather as a trigger
                </p>
              </div>
              <div>
                <div className="font-display text-4xl text-accent-soft mb-2">
                  6-12hrs
                </div>
                <p className="text-sm text-text-muted">
                  typical warning window before a weather-triggered attack
                </p>
              </div>
              <div>
                <div className="font-display text-4xl text-accent-soft mb-2">
                  50%
                </div>
                <p className="text-sm text-text-muted">
                  reduction in attacks possible with proper preparation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal mb-4">
              This Course Is For You If...
            </h2>
          </div>

          <div className="space-y-4">
            {[
              "You've noticed your migraines seem to follow weather patterns, but you're not sure why",
              "Doctors have dismissed your weather sensitivity as \"just coincidence\"",
              "You want to stop being blindsided by attacks and start anticipating them",
              "You're tired of feeling like a human barometer with no explanation",
              "You want science-backed knowledge, not pseudoscience or folk remedies",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-xl"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-coral flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <p className="text-text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-normal mb-4">
            Knowledge is Your{" "}
            <span className="text-accent-soft italic">First Defense</span>
          </h2>
          <p className="text-text-muted mb-10">
            You can&apos;t control the weather. But you can understand how it
            affects you—and that changes everything.
          </p>

          {/* Secondary Form */}
          <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-sm">
            <form
              action="https://app.kit.com/forms/9019007/subscriptions"
              method="post"
              className="space-y-4"
            >
              <div>
                <input
                  type="email"
                  name="email_address"
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text-subtle focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.4)] hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(167,139,250,0.5)] transition-all cursor-pointer"
              >
                Send Me Day 1 →
              </button>
              <p className="text-xs text-text-subtle">
                Join thousands learning to predict and prepare.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="pb-32 relative z-10">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-text-subtle text-sm">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              100% Free
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Delivered via Email
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Unsubscribe Anytime
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

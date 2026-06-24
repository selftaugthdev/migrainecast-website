import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Migraine Quizzes | MigraineCast",
  description:
    "Free, no-signup migraine quizzes. Find your trigger type, check whether weather is really behind your attacks, calculate your risk score, or test your migraine knowledge.",
};

const quizzes = [
  {
    href: "/migraine-trigger-quiz",
    title: "What's Your Migraine Trigger Type?",
    description:
      "Answer 7 quick questions to find out which trigger type fits you — Weather Watcher, Sensitive Sleeper, Stress Carrier, Hormonal Warrior, Dehydrated Drifter, or Mystery Migraineur.",
    badge: "2 min",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    href: "/weather-migraine-quiz",
    title: "Are You a Weather Migraine Sufferer?",
    description:
      "Storms and pressure drops get blamed for a lot of migraines — find out if weather is really your trigger, or if something else is the bigger driver.",
    badge: "2 min",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    href: "/migraine-risk-score",
    title: "What's Your Migraine Risk Score?",
    description:
      "Sleep, hydration, stress, screen time, caffeine, meals, and weather sensitivity — see how your daily habits add up to a personal risk score.",
    badge: "2 min",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
  },
  {
    href: "/migraine-trivia",
    title: "How Well Do You Know Migraines?",
    description:
      "Test your migraine knowledge with 8 quick questions. Separate the myths from the facts and see if you're a Beginner, Detective, or Expert.",
    badge: "2 min",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[1.5]">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 1 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
      </svg>
    ),
  },
];

export default function QuizzesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/25 bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            Free Quizzes
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-text mb-5 leading-tight">
            Quizzes for migraine sufferers
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            Free, no-signup quizzes to help you understand your triggers, gauge your risk, and test your
            migraine knowledge — each takes about 2 minutes.
          </p>
        </div>

        {/* Quiz grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.title}
              href={quiz.href}
              className="glass-card rounded-2xl p-7 flex flex-col gap-4 transition-all duration-200 group glass-card-hover hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  {quiz.icon}
                </div>
                <span
                  className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border ${quiz.badgeColor}`}
                >
                  {quiz.badge}
                </span>
              </div>
              <div>
                <h2 className="text-base font-semibold text-text mb-2 group-hover:text-accent-soft transition-colors">
                  {quiz.title}
                </h2>
                <p className="text-sm text-text-muted leading-relaxed">{quiz.description}</p>
              </div>
              <div className="mt-auto pt-2">
                <span className="text-sm font-medium text-accent inline-flex items-center gap-1.5">
                  Take the quiz
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-text mb-4">
            Want answers based on your real data, not a quiz?
          </h2>
          <p className="text-text-muted leading-relaxed mb-8 max-w-lg mx-auto">
            These quizzes give you a starting point. MigraineCast tracks your actual weather, sleep, and
            lifestyle patterns every day to find what really triggers your migraines.
          </p>
          <a
            href="https://apps.apple.com/us/app/migraine-cast/id6754256278"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-text text-bg font-semibold text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(167,139,250,0.3)]"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current shrink-0">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download MigraineCast Free
          </a>
        </div>
      </div>
    </div>
  );
}

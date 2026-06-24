"use client";

import { ReactNode } from "react";
import { Quiz } from "./Quiz";
import {
  RISK_SCORE_QUESTIONS,
  computeRiskScore,
  pickRiskTier,
} from "@/lib/quizzes/riskScore";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278";
const MAX_SCORE = RISK_SCORE_QUESTIONS.length * 3;

type RiskScoreQuizProps = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  extraIntro?: ReactNode;
};

export function RiskScoreQuiz({ eyebrow, title, intro, extraIntro }: RiskScoreQuizProps) {
  return (
    <Quiz<number>
      eyebrow={eyebrow}
      title={title}
      intro={intro}
      extraIntro={extraIntro}
      questions={RISK_SCORE_QUESTIONS}
      computeResult={computeRiskScore}
      renderResult={(score, restart) => {
        const tier = pickRiskTier(score);
        const pct = Math.round((score / MAX_SCORE) * 100);

        return (
          <div>
            {/* Result summary */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">Your migraine risk score</p>
                  <p className="font-display text-3xl font-normal text-text mb-1">
                    {score} <span className="text-base text-text-muted">/ {MAX_SCORE}</span>
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${tier.bg} ${tier.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${tier.dot}`} />
                    {tier.name}
                  </span>
                </div>
              </div>

              <div className="h-2.5 rounded-full bg-surface/60 overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full ${tier.dot}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-text-subtle mb-4">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
                <span>Very high</span>
              </div>

              <p className="text-sm text-text-muted leading-relaxed">{tier.description}</p>

              <button
                onClick={restart}
                className="mt-5 text-sm text-accent hover:text-accent-soft transition-colors flex items-center gap-1.5"
              >
                ← Retake the quiz
              </button>
            </div>

            {/* Tips */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <h3 className="font-display text-lg font-normal mb-4">Where to focus first</h3>
              <ul className="space-y-3">
                {tier.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-text-subtle mt-5">
                This score reflects self-reported habits, not a medical diagnosis. It&apos;s meant to highlight
                patterns worth paying attention to — not to replace advice from a doctor.
              </p>
            </div>

            {/* CTA */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-coral/10 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-soft stroke-[1.5] fill-none">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-normal mb-2">
                    MigraineCast calculates this automatically, every day.
                  </h3>
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">
                    Instead of a one-time quiz, MigraineCast tracks your sleep, hydration, stress, and
                    weather sensitivity continuously — recalculating your risk daily and alerting you
                    before it spikes.
                  </p>
                  <a
                    href={APPSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full text-sm shadow-[0_4px_20px_rgba(167,139,250,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(167,139,250,0.5)]"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Download MigraineCast Free
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

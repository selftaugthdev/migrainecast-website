"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/quizzes/types";

type QuizProps<R> = {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  extraIntro?: ReactNode;
  questions: QuizQuestion[];
  computeResult: (answers: string[]) => R;
  renderResult: (result: R, restart: () => void) => ReactNode;
};

export function Quiz<R>({
  eyebrow,
  title,
  intro,
  extraIntro,
  questions,
  computeResult,
  renderResult,
}: QuizProps<R>) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<R | null>(null);

  const total = questions.length;
  const progressPct = result ? 100 : Math.round((current / total) * 100);

  const selectOption = (value: string) => {
    const next = [...answers.slice(0, current), value];
    if (current + 1 < total) {
      setAnswers(next);
      setCurrent(current + 1);
    } else {
      setResult(computeResult(next));
    }
  };

  const goBack = () => {
    if (current === 0) return;
    setCurrent(current - 1);
  };

  const restart = () => {
    setAnswers([]);
    setCurrent(0);
    setResult(null);
  };

  return (
    <div className="pt-[140px] pb-24 relative z-10">
      <div className="max-w-[800px] mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-soft transition-colors mb-8 group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Quizzes
          </Link>

          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-4 block">
            {eyebrow}
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-normal leading-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-text-muted max-w-[580px] leading-relaxed">{intro}</p>
          {extraIntro && <div className="mt-5 max-w-[580px]">{extraIntro}</div>}
        </div>

        {!result && (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-text-subtle mb-2">
                <span>
                  Question {current + 1} of {total}
                </span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-[#8b5cf6] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-normal mb-6">
                {questions[current].question}
              </h2>
              <div className="space-y-3">
                {questions[current].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectOption(opt.value)}
                    className="w-full text-left px-5 py-4 bg-bg border border-surface/80 rounded-xl text-sm text-text hover:border-accent/60 hover:bg-accent/5 transition-all"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {current > 0 && (
                <button
                  onClick={goBack}
                  className="mt-6 text-sm text-text-muted hover:text-text transition-colors flex items-center gap-1.5"
                >
                  ← Previous question
                </button>
              )}
            </div>
          </>
        )}

        {result && renderResult(result, restart)}
      </div>
    </div>
  );
}

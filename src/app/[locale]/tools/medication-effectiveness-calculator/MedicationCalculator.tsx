"use client";

import { useState } from "react";
import Link from "next/link";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278?ppid=49039837-f866-4209-b1b3-4ee7ac306f82";

type MedClass = "triptan" | "otc" | "combination" | "gepant" | "ditan" | "ergot" | "other";
type DaysBand = "lt5" | "d5to9" | "d10to14" | "d15plus";
type MtoqAnswer = 0 | 1 | 2;
type SideEffect = "none" | "mild" | "skip" | "severe";
type ScoreBucket = "maximum" | "moderate" | "poor" | "veryPoor";

// ── Question definitions ─────────────────────────────────────────────────────

const medOptions: { value: MedClass; label: string; sub: string }[] = [
  { value: "triptan", label: "Triptan", sub: "Sumatriptan, rizatriptan, zolmitriptan…" },
  { value: "otc", label: "OTC pain reliever / NSAID", sub: "Ibuprofen, naproxen, paracetamol, aspirin…" },
  { value: "combination", label: "Combination analgesic", sub: "Painkillers combined with caffeine or codeine" },
  { value: "gepant", label: "Gepant", sub: "Ubrogepant, rimegepant, zavegepant…" },
  { value: "ditan", label: "Ditan", sub: "Lasmiditan" },
  { value: "ergot", label: "Ergotamine / DHE", sub: "Ergotamine, dihydroergotamine" },
  { value: "other", label: "Other / not sure", sub: "Something else, or you don't know the class" },
];

const daysOptions: { value: DaysBand; label: string }[] = [
  { value: "lt5", label: "Fewer than 5 days" },
  { value: "d5to9", label: "5–9 days" },
  { value: "d10to14", label: "10–14 days" },
  { value: "d15plus", label: "15 or more days" },
];

const mtoqQuestions = [
  "Are you pain-free within 2 hours of taking it, for most attacks?",
  "Does one dose give you relief that lasts at least 24 hours?",
  "Can you comfortably plan your day, knowing your medication will work?",
  "Do you feel in control of your migraines?",
];

const mtoqOptions: { value: MtoqAnswer; label: string }[] = [
  { value: 0, label: "Never or rarely" },
  { value: 1, label: "Less than half the time" },
  { value: 2, label: "Half the time or more" },
];

const sideEffectOptions: { value: SideEffect; label: string }[] = [
  { value: "none", label: "None" },
  { value: "mild", label: "Mild — noticeable but manageable" },
  { value: "skip", label: "Bad enough that I sometimes skip or delay a dose" },
  { value: "severe", label: "Severe" },
];

// ── Scoring ──────────────────────────────────────────────────────────────────

const bucketConfig: Record<
  ScoreBucket,
  {
    label: string;
    color: string;
    bg: string;
    dot: string;
    summary: string;
    guidance: string;
  }
> = {
  maximum: {
    label: "Maximum treatment optimization",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
    summary:
      "A perfect mTOQ-4 score. Your acute medication reliably gets you pain-free, keeps the attack from coming back, and leaves you feeling in control.",
    guidance:
      "Your treatment appears to be well optimized — the goal now is to keep it that way. Watch that your usage frequency stays in the safe range, and keep taking your medication early in the attack, which is when it works best.",
  },
  moderate: {
    label: "Moderate treatment optimization",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-400",
    summary:
      "Your medication is doing a decent job, but it isn't delivering consistently — some attacks break through, come back, or leave you unsure whether you can plan your day.",
    guidance:
      "Small changes often close this gap: taking the dose earlier in the attack (before pain peaks), adjusting the dose, or pairing it with an anti-nausea medication so it absorbs properly. Worth raising at your next appointment — you may be closer to reliable relief than you think.",
  },
  poor: {
    label: "Poor treatment optimization",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    dot: "bg-orange-400",
    summary:
      "Your medication is only helping some of the time. Most of your attacks aren't being fully controlled — pain lingers, returns within 24 hours, or leaves you unable to plan around it.",
    guidance:
      "This is worth a conversation with your doctor. Research by Lipton and colleagues found that people whose acute treatment is poorly optimized have a significantly higher risk of progressing from episodic to chronic migraine. There are many acute options — a different dose, a different drug in the same class, or a different class entirely often makes a large difference.",
  },
  veryPoor: {
    label: "Very poor treatment optimization",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
    summary:
      "Your medication rarely or never delivers meaningful relief — you're essentially riding out each attack without effective treatment.",
    guidance:
      "Please don't accept this as normal. An acute treatment that never works is a strong signal to see a doctor — ideally a headache specialist. Under-treated attacks are linked to a higher risk of migraine becoming chronic, and today there are more acute treatment classes than ever (triptans, gepants, ditans, and more). Do not stop or change your medication on your own — but do get it reviewed.",
  },
};

function classify(score: number): ScoreBucket {
  if (score === 8) return "maximum";
  if (score >= 6) return "moderate";
  if (score >= 1) return "poor";
  return "veryPoor";
}

// Medication-overuse headache thresholds per ICHD-3: ≥10 days/month for
// triptans, combination analgesics, ergots, and ditans; ≥15 days/month for
// simple analgesics. Gepants have no established MOH threshold.
type MohStatus = "none" | "approaching" | "risk" | "gepantNote";

function getMohStatus(med: MedClass, days: DaysBand): MohStatus {
  if (med === "gepant") {
    return days === "d10to14" || days === "d15plus" ? "gepantNote" : "none";
  }
  const threshold15 = med === "otc";
  if (threshold15) {
    if (days === "d15plus") return "risk";
    if (days === "d10to14") return "approaching";
    return "none";
  }
  if (days === "d10to14" || days === "d15plus") return "risk";
  if (days === "d5to9") return "approaching";
  return "none";
}

const mohContent: Record<
  Exclude<MohStatus, "none">,
  { label: string; color: string; bg: string; dot: string; body: string }
> = {
  risk: {
    label: "Medication overuse risk",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
    body:
      "Your usage frequency is at or above the level where medication overuse headache (MOH) becomes a real risk — a cycle where the medication itself starts causing more headaches. This is defined in the international headache classification (ICHD-3) and is one of the most common reasons migraine gets worse over time. Please discuss your usage frequency with your doctor; preventive treatment can often break the cycle.",
  },
  approaching: {
    label: "Approaching the overuse threshold",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-400",
    body:
      "You're below the medication overuse headache (MOH) threshold for your medication class, but close enough that it's worth watching. If your usage creeps up, or you find yourself taking medication 'just in case', mention it to your doctor — adding a preventive treatment can reduce how often you need acute medication in the first place.",
  },
  gepantNote: {
    label: "Frequent use — but low overuse risk",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-400",
    body:
      "You're using acute medication frequently, but current evidence suggests gepants carry little or no risk of medication overuse headache — some are even approved for prevention. Still, needing acute treatment this often is itself worth discussing with your doctor: a dedicated preventive strategy might reduce your attack frequency.",
  },
};

// ── Sub-components ───────────────────────────────────────────────────────────

function ScoreGauge({ score }: { score: number }) {
  const SCALE_MAX = 8;
  const pos = (Math.min(Math.max(score, 0), SCALE_MAX) / SCALE_MAX) * 100;

  return (
    <div className="mb-2">
      <div className="relative h-3 rounded-full overflow-hidden flex mb-2">
        <div className="bg-red-400/50" style={{ width: `${(0.5 / SCALE_MAX) * 100}%` }} />
        <div className="bg-orange-400/50" style={{ width: `${(5 / SCALE_MAX) * 100}%` }} />
        <div className="bg-amber-400/50" style={{ width: `${(2 / SCALE_MAX) * 100}%` }} />
        <div className="bg-emerald-400/50" style={{ width: `${(0.5 / SCALE_MAX) * 100}%` }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-text border-2 border-bg shadow-lg"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="flex justify-between text-[11px] text-text-subtle">
        <span>0</span>
        <span>2</span>
        <span>4</span>
        <span>6</span>
        <span>8</span>
      </div>
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
        selected
          ? "border-accent/60 bg-accent/10 text-text"
          : "border-surface/80 bg-bg text-text-muted hover:border-accent/40 hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function MedicationCalculator() {
  const [step, setStep] = useState<"medication" | "effectiveness" | "results">("medication");

  const [medClass, setMedClass] = useState<MedClass | null>(null);
  const [daysBand, setDaysBand] = useState<DaysBand | null>(null);
  const [mtoqAnswers, setMtoqAnswers] = useState<(MtoqAnswer | null)[]>([null, null, null, null]);
  const [sideEffect, setSideEffect] = useState<SideEffect | null>(null);

  const setMtoqAnswer = (i: number, val: MtoqAnswer) => {
    setMtoqAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)));
  };

  const effectivenessComplete = mtoqAnswers.every((a) => a !== null) && sideEffect !== null;

  const score = mtoqAnswers.reduce<number>((sum, a) => sum + (a ?? 0), 0);
  const bucket = classify(score);
  const cfg = bucketConfig[bucket];
  const moh = medClass && daysBand ? getMohStatus(medClass, daysBand) : "none";
  const showSideEffectNote = sideEffect === "skip" || sideEffect === "severe";

  const restart = () => {
    setStep("medication");
    setMedClass(null);
    setDaysBand(null);
    setMtoqAnswers([null, null, null, null]);
    setSideEffect(null);
  };

  return (
    <div className="pt-[140px] pb-24 relative z-10">
      <div className="max-w-[800px] mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-soft transition-colors mb-8 group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Free Tools
          </Link>

          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-4 block">
            Free Tool
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-normal leading-tight mb-4">
            Is Your Migraine Medication <em className="italic text-accent-soft">Actually Working?</em>
          </h1>
          <p className="text-lg text-text-muted max-w-[580px] leading-relaxed">
            Answer 7 quick questions based on the mTOQ-4 — a validated questionnaire used in
            migraine research — to score how well your acute medication is really performing,
            and whether your usage pattern puts you at risk of medication overuse headache.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {(["medication", "effectiveness", "results"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === s ? "text-text" : "text-text-subtle"
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s ? "bg-accent text-white" :
                  (i < ["medication", "effectiveness", "results"].indexOf(step) || step === "results") ? "bg-accent/20 text-accent" :
                  "bg-surface/40 text-text-subtle"
                }`}>
                  {i + 1}
                </span>
                <span className="hidden sm:inline">
                  {s === "medication" ? "Your Medication" : s === "effectiveness" ? "How Well It Works" : "Results"}
                </span>
              </div>
              {i < 2 && <div className="w-8 h-px bg-surface/60" />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Medication ── */}
        {step === "medication" && (
          <div className="glass-card rounded-2xl p-8">
            <h2 className="font-display text-xl font-normal mb-2">What do you take for an attack?</h2>
            <p className="text-text-muted text-sm mb-6">
              Pick the medication you rely on most when a migraine hits.
            </p>

            <div className="space-y-2 mb-8">
              {medOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  selected={medClass === opt.value}
                  onClick={() => setMedClass(opt.value)}
                >
                  <span className="font-medium text-text">{opt.label}</span>
                  <span className="block text-xs text-text-subtle mt-0.5">{opt.sub}</span>
                </OptionButton>
              ))}
            </div>

            <h2 className="font-display text-xl font-normal mb-2">
              How many days per month do you take it?
            </h2>
            <p className="text-text-muted text-sm mb-6">
              Count days, not doses — two doses on the same day counts as one day.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-8">
              {daysOptions.map((opt) => (
                <OptionButton
                  key={opt.value}
                  selected={daysBand === opt.value}
                  onClick={() => setDaysBand(opt.value)}
                >
                  {opt.label}
                </OptionButton>
              ))}
            </div>

            <button
              onClick={() => setStep("effectiveness")}
              disabled={!medClass || !daysBand}
              className="w-full py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_30px_rgba(167,139,250,0.4)]"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: Effectiveness (mTOQ-4 + side effects) ── */}
        {step === "effectiveness" && (
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-xl font-normal">How well does it work?</h2>
              <button
                onClick={() => setStep("medication")}
                className="text-xs text-text-muted hover:text-text transition-colors"
              >
                ← Change medication
              </button>
            </div>
            <p className="text-text-muted text-sm mb-8">
              Think about your last few attacks and answer honestly — there are no wrong answers.
            </p>

            <div className="space-y-8 mb-8">
              {mtoqQuestions.map((q, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-text mb-3">
                    <span className="text-text-subtle mr-2">{i + 1}.</span>
                    {q}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {mtoqOptions.map((opt) => (
                      <OptionButton
                        key={opt.value}
                        selected={mtoqAnswers[i] === opt.value}
                        onClick={() => setMtoqAnswer(i, opt.value)}
                      >
                        {opt.label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <p className="text-sm font-medium text-text mb-3">
                  <span className="text-text-subtle mr-2">5.</span>
                  How bothersome are the side effects?
                </p>
                <div className="space-y-2">
                  {sideEffectOptions.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      selected={sideEffect === opt.value}
                      onClick={() => setSideEffect(opt.value)}
                    >
                      {opt.label}
                    </OptionButton>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("results")}
              disabled={!effectivenessComplete}
              className="w-full py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_30px_rgba(167,139,250,0.4)]"
            >
              {effectivenessComplete ? "See My Results →" : "Answer all questions to continue"}
            </button>
          </div>
        )}

        {/* ── Step 3: Results ── */}
        {step === "results" && (
          <div>
            {/* Score summary */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 1 1-7 7z" />
                    <line x1="7" y1="10" x2="14" y2="17" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">Your effectiveness score (mTOQ-4)</p>
                  <p className="font-display text-3xl font-normal text-text mb-1">
                    {score} <span className="text-base text-text-muted">/ 8</span>
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>
              </div>

              <ScoreGauge score={score} />

              <p className="text-sm text-text-muted mt-4">{cfg.summary}</p>

              <button
                onClick={restart}
                className="mt-5 text-sm text-accent hover:text-accent-soft transition-colors flex items-center gap-1.5"
              >
                ← Check a different medication
              </button>
            </div>

            {/* Guidance */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <h3 className="font-display text-lg font-normal mb-2">What this means</h3>
              <p className="text-sm text-text-muted leading-relaxed">{cfg.guidance}</p>
            </div>

            {/* MOH warning */}
            {moh !== "none" && (
              <div className={`p-6 rounded-2xl border mb-6 ${mohContent[moh].bg}`}>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border mb-3 ${mohContent[moh].bg} ${mohContent[moh].color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${mohContent[moh].dot}`} />
                  {mohContent[moh].label}
                </span>
                <p className="text-sm text-text-muted leading-relaxed">{mohContent[moh].body}</p>
              </div>
            )}

            {/* Side effect note */}
            {showSideEffectNote && (
              <div className="p-6 rounded-2xl bg-surface/30 border border-surface/60 mb-6">
                <h3 className="font-display text-lg font-normal mb-2">About those side effects</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Skipping or delaying doses because of side effects quietly undermines your
                  treatment — acute migraine medication works best taken early, while pain is
                  still mild. If side effects are making you hesitate, tell your doctor: a
                  different formulation (nasal spray, injection, dissolvable tablet) or a
                  different medication class often solves this without giving up effectiveness.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-5 rounded-2xl bg-surface/30 border border-surface/60 mb-10">
              <p className="text-xs text-text-subtle leading-relaxed">
                This tool is for educational purposes only and is not medical advice. The mTOQ-4
                is a screening questionnaire, not a diagnosis. Never stop, start, or change a
                medication based on an online tool — always talk to your doctor or a headache
                specialist first.
              </p>
            </div>

            {/* CTA */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-coral/10 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M12 20V10M18 20V4M6 20v-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-normal mb-2">
                    Track what actually works — attack by attack.
                  </h3>
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">
                    A one-time quiz is a snapshot. MigraineCast logs every attack alongside the
                    weather, your sleep, and your triggers — so over time you can see exactly
                    when your medication works, when it doesn&apos;t, and bring real data to
                    your next doctor&apos;s appointment.
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
        )}

      </div>
    </div>
  );
}

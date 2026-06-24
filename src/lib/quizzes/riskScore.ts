import type { QuizQuestion } from "./types";

export const RISK_SCORE_QUESTIONS: QuizQuestion[] = [
  {
    question: "How many hours of sleep do you typically get, and how consistent is your schedule?",
    options: [
      { label: "7–9 hours, roughly the same time most nights", value: "0" },
      { label: "6–7 hours, fairly consistent", value: "1" },
      { label: "Under 6 hours, or it varies a lot night to night", value: "2" },
      { label: "Wildly inconsistent — some nights 4h, some nights 10h", value: "3" },
    ],
  },
  {
    question: "How much water do you drink on an average day?",
    options: [
      { label: "8+ glasses, I rarely think about it", value: "0" },
      { label: "5–7 glasses", value: "1" },
      { label: "2–4 glasses", value: "2" },
      { label: "Barely any — mostly coffee or tea", value: "3" },
    ],
  },
  {
    question: "How would you rate your day-to-day stress levels?",
    options: [
      { label: "Low, I have good ways to manage it", value: "0" },
      { label: "Moderate, manageable most days", value: "1" },
      { label: "High, most days feel like a lot", value: "2" },
      { label: "Constant — I rarely feel like I get a break", value: "3" },
    ],
  },
  {
    question: "How much daily screen time (phone + computer) do you get, including work?",
    options: [
      { label: "Under 3 hours", value: "0" },
      { label: "3–6 hours", value: "1" },
      { label: "6–9 hours", value: "2" },
      { label: "9+ hours — screens basically all day", value: "3" },
    ],
  },
  {
    question: "What's your caffeine intake and timing like?",
    options: [
      { label: "0–1 cups a day, consistent", value: "0" },
      { label: "2 cups a day, around the same time", value: "1" },
      { label: "3+ cups, or timing varies a lot day to day", value: "2" },
      { label: "Heavy and inconsistent — sometimes none, sometimes a lot", value: "3" },
    ],
  },
  {
    question: "How regularly do you eat meals?",
    options: [
      { label: "Three solid meals, rarely skip", value: "0" },
      { label: "Mostly regular, occasional skipped meal", value: "1" },
      { label: "I skip meals a few times a week", value: "2" },
      { label: "I often go long stretches without eating", value: "3" },
    ],
  },
  {
    question: "Have you noticed migraines around weather changes (storms, pressure drops, heat)?",
    options: [
      { label: "Never noticed a connection", value: "0" },
      { label: "Maybe once or twice", value: "1" },
      { label: "Yes, fairly often", value: "2" },
      { label: "Yes, almost every time the weather shifts", value: "3" },
    ],
  },
];

export type RiskTier = {
  min: number;
  max: number;
  name: string;
  color: string;
  bg: string;
  dot: string;
  description: string;
  tips: string[];
};

export const RISK_TIERS: RiskTier[] = [
  {
    min: 0,
    max: 5,
    name: "Low risk",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
    description:
      "Your day-to-day habits — sleep, hydration, stress, meals — are mostly working in your favor. That doesn't mean migraines won't happen, but the lifestyle side of the equation is solid.",
    tips: [
      "Keep doing what's working — consistency is the hard part, and you've got it.",
      "If migraines still show up, weather or hormones may be a bigger factor for you than lifestyle.",
      "Small slips (a late night, a skipped meal) are worth noting if a migraine follows.",
    ],
  },
  {
    min: 6,
    max: 10,
    name: "Moderate risk",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    dot: "bg-orange-400",
    description:
      "A few habits are working against you, even if none are extreme on their own. These tend to stack — a short night plus a skipped meal plus a stressful day can add up fast.",
    tips: [
      "Pick the one habit from the quiz that scored highest and focus there first.",
      "Watch for combinations — multiple moderate factors on the same day raise your risk more than any one alone.",
      "Small, consistent changes (an extra glass of water, a fixed bedtime) tend to beat big overhauls.",
    ],
  },
  {
    min: 11,
    max: 15,
    name: "High risk",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
    description:
      "Several of your daily habits line up with well-documented migraine triggers. That's genuinely useful to know — it means there's real room to bring your migraine frequency down through lifestyle alone.",
    tips: [
      "Sleep and hydration are usually the fastest wins — start there before tackling stress or screens.",
      "Don't try to fix everything at once; pick one or two areas for the next two weeks.",
      "Track which days you do feel better — that tells you which habit matters most for you specifically.",
    ],
  },
  {
    min: 16,
    max: 21,
    name: "Very high risk",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    dot: "bg-rose-400",
    description:
      "Most of the major lifestyle triggers are stacked against you right now. That's a lot to carry — but it also means there's a lot of upside if even a couple of these shift.",
    tips: [
      "Start with whichever single factor feels most fixable this week, not the hardest one.",
      "Consider talking to a doctor if migraines are frequent — lifestyle helps, but it isn't the whole picture.",
      "Tracking even loosely for two weeks will show you which factor is actually driving your attacks.",
    ],
  },
];

export function computeRiskScore(answers: string[]): number {
  return answers.reduce((sum, a) => sum + Number(a), 0);
}

export function pickRiskTier(score: number): RiskTier {
  return RISK_TIERS.find((t) => score >= t.min && score <= t.max) ?? RISK_TIERS[RISK_TIERS.length - 1];
}

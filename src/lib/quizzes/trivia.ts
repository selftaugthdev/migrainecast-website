import type { QuizQuestion } from "./types";

export const TRIVIA_QUESTIONS: QuizQuestion[] = [
  {
    question: "Can dehydration trigger a migraine?",
    options: [
      { label: "Yes — even mild dehydration is a documented trigger", value: "1" },
      { label: "No, hydration has nothing to do with migraines", value: "0" },
      { label: "Only if you're also exercising", value: "0" },
      { label: "Only in people with diabetes", value: "0" },
    ],
  },
  {
    question: "Does a drop in barometric pressure affect migraines?",
    options: [
      { label: "Yes, many people report migraines triggered by pressure changes", value: "1" },
      { label: "No, weather has been proven to have zero effect", value: "0" },
      { label: "Only altitude matters, not pressure", value: "0" },
      { label: "Only in winter", value: "0" },
    ],
  },
  {
    question: "Are migraine auras always visual — like flashing lights or zigzag lines?",
    options: [
      { label: "No — auras can also involve sensation, speech, or movement, not just vision", value: "1" },
      { label: "Yes, auras are always visual", value: "0" },
      { label: "No, auras are always about smell", value: "0" },
      { label: "Auras only happen in cluster headaches", value: "0" },
    ],
  },
  {
    question: "Is a migraine just a 'bad headache'?",
    options: [
      { label: "No — it's a neurological condition that can include nausea, and light/sound sensitivity", value: "1" },
      { label: "Yes, it's just an intense headache", value: "0" },
      { label: "No, it's actually a sinus infection", value: "0" },
      { label: "Yes, but only in adults", value: "0" },
    ],
  },
  {
    question: "Can certain foods trigger migraines in some people?",
    options: [
      { label: "Yes — aged cheese, alcohol, and processed meats are common ones for some people", value: "1" },
      { label: "No, food has never been linked to migraines", value: "0" },
      { label: "Only spicy food can trigger migraines", value: "0" },
      { label: "Only foods with sugar", value: "0" },
    ],
  },
  {
    question: "Is skipping meals a known migraine trigger?",
    options: [
      { label: "Yes, blood sugar drops are a well-documented trigger for many people", value: "1" },
      { label: "No, eating schedule has no effect", value: "0" },
      { label: "Only skipping breakfast specifically", value: "0" },
      { label: "Only in children", value: "0" },
    ],
  },
  {
    question: "Can hormonal changes, like a menstrual cycle, influence migraines?",
    options: [
      { label: "Yes — many people notice migraines clustering around hormonal shifts", value: "1" },
      { label: "No, hormones are unrelated to migraines", value: "0" },
      { label: "Only during pregnancy", value: "0" },
      { label: "Only after menopause", value: "0" },
    ],
  },
  {
    question: "Do all migraine sufferers experience aura?",
    options: [
      { label: "No — most people with migraine don't experience aura", value: "1" },
      { label: "Yes, aura is required for diagnosis", value: "0" },
      { label: "Yes, but only before age 20", value: "0" },
      { label: "Aura only happens during sleep", value: "0" },
    ],
  },
];

export type TriviaTier = {
  min: number;
  max: number;
  name: string;
  color: string;
  bg: string;
  dot: string;
  description: string;
  tips: string[];
};

const TOTAL_QUESTIONS = TRIVIA_QUESTIONS.length;

export const TRIVIA_TIERS: TriviaTier[] = [
  {
    min: 0,
    max: 3,
    name: "Migraine Beginner",
    color: "text-text-muted",
    bg: "bg-surface/40 border-surface/60",
    dot: "bg-text-subtle",
    description:
      "You're just getting started with the basics — and that's a perfectly fine place to be. Migraines are widely misunderstood, even by people who get them.",
    tips: [
      "Migraines are a neurological condition, not 'just a bad headache.'",
      "Common triggers include dehydration, skipped meals, poor sleep, stress, and weather changes.",
      "Tracking your own attacks for a few weeks is the fastest way to learn what applies to you specifically.",
    ],
  },
  {
    min: 4,
    max: 6,
    name: "Migraine Detective",
    color: "text-accent-soft",
    bg: "bg-accent/10 border-accent/20",
    dot: "bg-accent",
    description:
      "You know more than most — you've clearly paid attention to your own attacks, or done some reading. A few details are still fuzzy, but you're asking the right questions.",
    tips: [
      "Auras don't have to be visual, and most people with migraine never experience one at all.",
      "Weather and hormones are real, documented triggers — not 'just in your head.'",
      "The next step is tracking multiple factors together to see which combinations matter most for you.",
    ],
  },
  {
    min: 7,
    max: TOTAL_QUESTIONS,
    name: "Migraine Expert",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
    description:
      "You clearly know your stuff. Whether that's from years of living with migraines or genuine curiosity, you've got a solid grip on what's myth and what's documented.",
    tips: [
      "Put that knowledge to work — tracking is where most people plateau, even when they know the triggers.",
      "Share what you know — migraine myths (like 'it's just a headache') are still common.",
      "Consider tracking less-obvious combinations, like sleep plus weather, since those are harder to spot manually.",
    ],
  },
];

export function computeTriviaScore(answers: string[]): number {
  return answers.reduce((sum, a) => sum + Number(a), 0);
}

export function pickTriviaTier(score: number): TriviaTier {
  return TRIVIA_TIERS.find((t) => score >= t.min && score <= t.max) ?? TRIVIA_TIERS[TRIVIA_TIERS.length - 1];
}

export const TRIVIA_TOTAL = TOTAL_QUESTIONS;

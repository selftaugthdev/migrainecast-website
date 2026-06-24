import type { QuizQuestion } from "./types";

export type ArchetypeKey =
  | "weatherWatcher"
  | "sensitiveSleeper"
  | "stressCarrier"
  | "hormonalWarrior"
  | "dehydratedDrifter"
  | "mysteryMigraineur";

export const TRIGGER_TYPE_QUESTIONS: QuizQuestion[] = [
  {
    question: "When does a migraine usually catch you off guard?",
    options: [
      { label: "Right when the weather turns — a storm rolls in, pressure drops, a heatwave breaks", value: "weatherWatcher" },
      { label: "After a short or restless night, even just one", value: "sensitiveSleeper" },
      { label: "During or right after a stretch of high stress", value: "stressCarrier" },
      { label: "Around the same point in my monthly cycle", value: "hormonalWarrior" },
      { label: "On a day I barely ate or drank water", value: "dehydratedDrifter" },
      { label: "Honestly, with no clear pattern at all", value: "mysteryMigraineur" },
    ],
  },
  {
    question: "What's the first thing you check when a migraine starts?",
    options: [
      { label: "The weather radar — what's the pressure doing?", value: "weatherWatcher" },
      { label: "How many hours I slept", value: "sensitiveSleeper" },
      { label: "What's been on my mind lately", value: "stressCarrier" },
      { label: "Where I am in my cycle", value: "hormonalWarrior" },
      { label: "My water bottle — when did I last drink?", value: "dehydratedDrifter" },
      { label: "Nothing in particular — there's rarely an obvious trigger", value: "mysteryMigraineur" },
    ],
  },
  {
    question: "Which of these sounds most like you?",
    options: [
      { label: "I can sense a storm coming before any app tells me", value: "weatherWatcher" },
      { label: "One bad night's sleep can derail my whole week", value: "sensitiveSleeper" },
      { label: "I hold tension in my jaw or shoulders without noticing", value: "stressCarrier" },
      { label: "My worst attacks cluster around hormonal shifts", value: "hormonalWarrior" },
      { label: "I forget to eat or drink until it's too late", value: "dehydratedDrifter" },
      { label: "I've tracked everything and still can't crack it", value: "mysteryMigraineur" },
    ],
  },
  {
    question: "What helps you recover fastest after a migraine?",
    options: [
      { label: "Getting somewhere cool and dark, away from the weather", value: "weatherWatcher" },
      { label: "A long, uninterrupted nap", value: "sensitiveSleeper" },
      { label: "Stepping away from whatever was stressing me out", value: "stressCarrier" },
      { label: "Just riding it out — it usually passes with my cycle", value: "hormonalWarrior" },
      { label: "Water and a real meal", value: "dehydratedDrifter" },
      { label: "Honestly, nothing works consistently", value: "mysteryMigraineur" },
    ],
  },
  {
    question: "If you could only track ONE thing about your migraines, what would it be?",
    options: [
      { label: "Barometric pressure and weather changes", value: "weatherWatcher" },
      { label: "Sleep hours and quality", value: "sensitiveSleeper" },
      { label: "Stress levels and big life events", value: "stressCarrier" },
      { label: "Hormonal cycle timing", value: "hormonalWarrior" },
      { label: "Water and meal timing", value: "dehydratedDrifter" },
      { label: "I'd track everything — none of it has explained it yet", value: "mysteryMigraineur" },
    ],
  },
  {
    question: "Which sentence sounds most like something you'd say?",
    options: [
      { label: "\"Ugh, the pressure's dropping, I can feel it.\"", value: "weatherWatcher" },
      { label: "\"I'm paying for that late night tomorrow.\"", value: "sensitiveSleeper" },
      { label: "\"This week has been A LOT.\"", value: "stressCarrier" },
      { label: "\"Right on schedule.\"", value: "hormonalWarrior" },
      { label: "\"I haven't had water since this morning, have I?\"", value: "dehydratedDrifter" },
      { label: "\"I have no idea why this is happening again.\"", value: "mysteryMigraineur" },
    ],
  },
  {
    question: "What would make the biggest difference for you right now?",
    options: [
      { label: "A heads-up before the weather turns", value: "weatherWatcher" },
      { label: "Better, more consistent sleep", value: "sensitiveSleeper" },
      { label: "A way to manage stress before it builds up", value: "stressCarrier" },
      { label: "Tools that work with my cycle, not against it", value: "hormonalWarrior" },
      { label: "Reminders to eat and drink on time", value: "dehydratedDrifter" },
      { label: "Literally any pattern at all", value: "mysteryMigraineur" },
    ],
  },
];

type ArchetypeContent = {
  name: string;
  tagline: string;
  description: string;
  tips: string[];
  ctaTitle: string;
  ctaText: string;
};

export const ARCHETYPES: Record<ArchetypeKey, ArchetypeContent> = {
  weatherWatcher: {
    name: "The Weather Watcher",
    tagline: "Your migraines move with the barometer.",
    description:
      "You're tuned into the atmosphere whether you want to be or not. Pressure drops, incoming storms, and big swings in temperature or humidity show up again and again around your worst attacks.",
    tips: [
      "Keep an eye on barometric pressure forecasts, not just rain or temperature.",
      "Build in extra rest or a lighter schedule on days with a sharp pressure drop forecast.",
      "Track pressure alongside your migraines for a few weeks to find your personal threshold.",
    ],
    ctaTitle: "Get a heads-up before the pressure drops.",
    ctaText:
      "MigraineCast watches the barometric pressure for your exact location and sends a forecast and alert before the weather turns — so you can plan around it instead of being blindsided.",
  },
  sensitiveSleeper: {
    name: "The Sensitive Sleeper",
    tagline: "Your migraines run on sleep debt.",
    description:
      "Even one short or broken night seems to set off a chain reaction. Your sleep schedule isn't just about feeling tired — it's one of the biggest levers you have over your migraines.",
    tips: [
      "Protect a consistent sleep and wake time, even on weekends.",
      "Watch for the lag — a bad night often shows up as a migraine the next day, not immediately.",
      "Screens late at night can compound poor sleep — try winding down without one.",
    ],
    ctaTitle: "Connect the dots between sleep and attacks.",
    ctaText:
      "MigraineCast logs your sleep alongside your migraines and weather, so you can see exactly how much a rough night actually costs you — and catch the pattern before it repeats.",
  },
  stressCarrier: {
    name: "The Stress Carrier",
    tagline: "Your body keeps score, even when your mind doesn't notice.",
    description:
      "Tension builds quietly — in your shoulders, your jaw, your sleep — until it shows up as a migraine, often right as a stressful stretch starts to ease up.",
    tips: [
      "Watch for migraines on the first day off after a stressful week — this is a known pattern called 'let-down' migraine.",
      "Short, regular breaks during stressful days can matter more than one long break at the end.",
      "Notice where you physically hold tension (jaw, neck, shoulders) and check in on it during the day.",
    ],
    ctaTitle: "See your stress patterns laid out clearly.",
    ctaText:
      "MigraineCast lets you log stress alongside sleep and weather, so you can finally see whether it's the stressful day itself — or the day after — that's setting off your migraines.",
  },
  hormonalWarrior: {
    name: "The Hormonal Warrior",
    tagline: "Your cycle and your migraines are in sync.",
    description:
      "There's a rhythm to your attacks that tracks with hormonal shifts. That predictability is actually an advantage — it means you can plan around your highest-risk days.",
    tips: [
      "Mark your cycle alongside your migraines for a few months to confirm the pattern.",
      "Your highest-risk days are often right before your period starts, when estrogen drops sharply.",
      "Combining cycle tracking with sleep and weather can reveal which factor matters most on a given month.",
    ],
    ctaTitle: "Plan around your highest-risk days.",
    ctaText:
      "MigraineCast helps you track patterns over time across cycle, sleep, and weather — so your highest-risk days stop catching you by surprise.",
  },
  dehydratedDrifter: {
    name: "The Dehydrated Drifter",
    tagline: "Your routine — or lack of one — is doing more than you think.",
    description:
      "Skipped meals, forgotten water, and an inconsistent daily rhythm show up again and again before your migraines. The fix isn't complicated, but it does take building a habit.",
    tips: [
      "Try pairing water with something you already do every hour (checking your phone, a meeting break).",
      "Low blood sugar from skipped meals is a well-documented migraine trigger — keep a snack on hand.",
      "Set simple reminders until eating and drinking on a schedule becomes automatic.",
    ],
    ctaTitle: "Build the routine without the mental load.",
    ctaText:
      "MigraineCast helps you log hydration and meals alongside your migraines, so you can see the connection clearly — and build reminders around what actually matters for you.",
  },
  mysteryMigraineur: {
    name: "The Mystery Migraineur",
    tagline: "No single factor explains it — yet.",
    description:
      "You've likely tried to find the pattern already, and nothing single-handedly explains it. That usually means it's a combination of smaller factors stacking up, not one obvious culprit.",
    tips: [
      "Track several factors at once (sleep, stress, weather, hydration) rather than one at a time.",
      "Look for combinations — a short night plus a pressure drop might matter more than either alone.",
      "Give it a few weeks. Patterns across multiple triggers take longer to show up than single-factor ones.",
    ],
    ctaTitle: "Let the data find the pattern for you.",
    ctaText:
      "MigraineCast tracks weather, sleep, stress, and more automatically, then surfaces the combinations that actually line up with your attacks — so you don't have to guess anymore.",
  },
};

export function computeArchetype(answers: string[]): ArchetypeKey {
  const counts: Partial<Record<ArchetypeKey, number>> = {};
  for (const a of answers) {
    counts[a as ArchetypeKey] = (counts[a as ArchetypeKey] ?? 0) + 1;
  }

  let best: ArchetypeKey = "mysteryMigraineur";
  let bestCount = -1;
  (Object.keys(ARCHETYPES) as ArchetypeKey[]).forEach((key) => {
    const c = counts[key] ?? 0;
    if (c > bestCount) {
      bestCount = c;
      best = key;
    }
  });
  return best;
}

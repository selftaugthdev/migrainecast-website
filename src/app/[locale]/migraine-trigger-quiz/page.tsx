import type { Metadata } from "next";
import { TriggerTypeQuiz } from "@/components/quiz/TriggerTypeQuiz";

export const metadata: Metadata = {
  title: "What's Your Migraine Trigger Type? — Free Quiz | MigraineCast",
  description:
    "Take this free 7-question quiz to find out which migraine trigger type you are — Weather Watcher, Sensitive Sleeper, Stress Carrier, Hormonal Warrior, Dehydrated Drifter, or Mystery Migraineur.",
  openGraph: {
    title: "What's Your Migraine Trigger Type? — Free Quiz",
    description:
      "Take this free 7-question quiz to find out which migraine trigger type you are.",
    type: "website",
  },
};

export default function MigraineTriggerQuizPage() {
  return (
    <TriggerTypeQuiz
      eyebrow="Free Quiz"
      title={
        <>
          What&apos;s Your <em className="italic text-accent-soft">Migraine Trigger</em> Type?
        </>
      }
      intro="Answer 7 quick questions about your migraines and we'll tell you which trigger type fits you best — plus what to actually do about it."
    />
  );
}

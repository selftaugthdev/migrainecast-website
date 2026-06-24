import type { Metadata } from "next";
import { RiskScoreQuiz } from "@/components/quiz/RiskScoreQuiz";

export const metadata: Metadata = {
  title: "What's Your Migraine Risk Score? — Free Quiz | MigraineCast",
  description:
    "Answer 7 quick questions about your sleep, hydration, stress, screen time, caffeine, meals, and weather sensitivity to get your personal migraine risk score.",
  openGraph: {
    title: "What's Your Migraine Risk Score? — Free Quiz",
    description:
      "Answer 7 quick questions to get your personal migraine risk score, based on your daily habits.",
    type: "website",
  },
};

export default function MigraineRiskScorePage() {
  return (
    <RiskScoreQuiz
      eyebrow="Free Quiz"
      title={
        <>
          What&apos;s Your <em className="italic text-accent-soft">Migraine Risk</em> Score?
        </>
      }
      intro="Sleep, hydration, stress, screen time, caffeine, meals, and weather sensitivity all stack up. Answer 7 quick questions to see how your daily habits add up to your personal risk score."
    />
  );
}

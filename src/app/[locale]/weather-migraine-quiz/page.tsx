import type { Metadata } from "next";
import { TriggerTypeQuiz } from "@/components/quiz/TriggerTypeQuiz";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Are You a Weather Migraine Sufferer? — Free Quiz | MigraineCast",
    description:
      "Take this free quiz to find out if weather and barometric pressure are really behind your migraines, or if something else — sleep, stress, hormones, hydration — is the bigger driver.",
    openGraph: {
      title: "Are You a Weather Migraine Sufferer? — Free Quiz",
      description:
        "Find out if weather and barometric pressure are really behind your migraines, or if something else is the bigger driver.",
      type: "website",
    },
    alternates: buildAlternates("/weather-migraine-quiz", locale),
  };
}

export default function WeatherMigraineQuizPage() {
  return (
    <TriggerTypeQuiz
      eyebrow="Free Quiz"
      title={
        <>
          Are You a <em className="italic text-accent-soft">Weather Migraine</em> Sufferer?
        </>
      }
      intro="Storms, heatwaves, and sudden pressure drops get blamed for a lot of migraines — but is weather actually your trigger, or just an easy scapegoat? Answer 7 quick questions to find out."
      extraIntro={
        <p className="text-sm text-text-subtle leading-relaxed">
          Weather is one of the most commonly reported migraine triggers, but it rarely acts alone — sleep,
          stress, hormones, and hydration often interact with it. This quiz looks at all of them and tells
          you which one shows up most for you, weather included.
        </p>
      }
    />
  );
}

import type { Metadata } from "next";
import { TriviaQuiz } from "@/components/quiz/TriviaQuiz";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How Well Do You Know Migraines? — Free Trivia Quiz | MigraineCast",
    description:
      "Test your migraine knowledge with this free 8-question trivia quiz. Separate the myths from the facts on triggers, auras, and what actually helps.",
    openGraph: {
      title: "How Well Do You Know Migraines? — Free Trivia Quiz",
      description:
        "Test your migraine knowledge with this free 8-question trivia quiz.",
      type: "website",
    },
    alternates: buildAlternates("/migraine-trivia", locale),
  };
}

export default function MigraineTriviaPage() {
  return (
    <TriviaQuiz
      eyebrow="Free Quiz"
      title={
        <>
          How Well Do You <em className="italic text-accent-soft">Know Migraines</em>?
        </>
      }
      intro="Migraines are widely misunderstood — even by the people who get them. Test yourself with 8 quick questions and see if you're a Beginner, a Detective, or an Expert."
    />
  );
}

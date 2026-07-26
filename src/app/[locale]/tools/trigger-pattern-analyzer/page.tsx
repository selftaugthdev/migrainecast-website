import type { Metadata } from "next";
import { TriggerPatternAnalyzer } from "./TriggerPatternAnalyzer";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Trigger Pattern Analyzer — Find Your Migraine Patterns | MigraineCast",
    description:
      "Log your migraine days along with sleep, stress, and lifestyle factors. We'll cross-reference real weather data and show which factors most often coincide with your attacks. Free tool, no signup required.",
    openGraph: {
      title: "Trigger Pattern Analyzer — Find Your Migraine Patterns",
      description:
        "Log your migraine days along with sleep, stress, and lifestyle factors. We'll cross-reference real weather data and show which factors most often coincide with your attacks. Free tool, no signup required.",
      type: "website",
    },
    alternates: buildAlternates("/tools/trigger-pattern-analyzer", locale),
  };
}

export default function TriggerPatternAnalyzerPage() {
  return <TriggerPatternAnalyzer />;
}

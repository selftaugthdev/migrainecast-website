import type { Metadata } from "next";
import { TriggerPatternAnalyzer } from "./TriggerPatternAnalyzer";

export const metadata: Metadata = {
  title: "Trigger Pattern Analyzer — Find Your Migraine Patterns | MigraineCast",
  description:
    "Log your migraine days along with sleep, stress, and lifestyle factors. We'll cross-reference real weather data and show which factors most often coincide with your attacks. Free tool, no signup required.",
  openGraph: {
    title: "Trigger Pattern Analyzer — Find Your Migraine Patterns",
    description:
      "Log your migraine days along with sleep, stress, and lifestyle factors. We'll cross-reference real weather data and show which factors most often coincide with your attacks. Free tool, no signup required.",
    type: "website",
  },
};

export default function TriggerPatternAnalyzerPage() {
  return <TriggerPatternAnalyzer />;
}

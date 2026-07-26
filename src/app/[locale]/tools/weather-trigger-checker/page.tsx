import type { Metadata } from "next";
import { WeatherChecker } from "./WeatherChecker";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Weather Trigger Checker — Did a Pressure Drop Cause Your Migraine? | MigraineCast",
    description:
      "Enter your location and migraine dates to see exactly what barometric pressure was doing in the 48 hours before each attack. Free tool, no signup required.",
    openGraph: {
      title: "Weather Trigger Checker — Did a Pressure Drop Cause Your Migraine?",
      description:
        "Enter your location and migraine dates to see exactly what barometric pressure was doing in the 48 hours before each attack. Free tool, no signup required.",
      type: "website",
    },
    alternates: buildAlternates("/tools/weather-trigger-checker", locale),
  };
}

export default function WeatherTriggerCheckerPage() {
  return <WeatherChecker />;
}

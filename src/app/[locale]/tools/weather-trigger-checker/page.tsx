import type { Metadata } from "next";
import { WeatherChecker } from "./WeatherChecker";

export const metadata: Metadata = {
  title: "Weather Trigger Checker — Did a Pressure Drop Cause Your Migraine? | MigraineCast",
  description:
    "Enter your location and migraine dates to see exactly what barometric pressure was doing in the 48 hours before each attack. Free tool, no signup required.",
  openGraph: {
    title: "Weather Trigger Checker — Did a Pressure Drop Cause Your Migraine?",
    description:
      "Enter your location and migraine dates to see exactly what barometric pressure was doing in the 48 hours before each attack. Free tool, no signup required.",
    type: "website",
  },
};

export default function WeatherTriggerCheckerPage() {
  return <WeatherChecker />;
}

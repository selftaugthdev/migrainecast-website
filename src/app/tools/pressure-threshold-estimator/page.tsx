import type { Metadata } from "next";
import { ThresholdEstimator } from "./ThresholdEstimator";

export const metadata: Metadata = {
  title: "Personal Pressure Threshold Estimator — How Sensitive Are You? | MigraineCast",
  description:
    "Find out whether you're sensitive to small barometric pressure drops (3–5 hPa) or only big ones (10+ hPa), based on your real migraine history. Free tool, no signup required.",
  openGraph: {
    title: "Personal Pressure Threshold Estimator — How Sensitive Are You?",
    description:
      "Find out whether you're sensitive to small barometric pressure drops (3–5 hPa) or only big ones (10+ hPa), based on your real migraine history. Free tool, no signup required.",
    type: "website",
  },
};

export default function PressureThresholdEstimatorPage() {
  return <ThresholdEstimator />;
}

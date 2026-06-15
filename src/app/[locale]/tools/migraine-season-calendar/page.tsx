import type { Metadata } from "next";
import { SeasonCalendar } from "./SeasonCalendar";

export const metadata: Metadata = {
  title: "Migraine Season Calendar — Your Highest-Risk Months | MigraineCast",
  description:
    "See which months carry the most storm activity and pressure volatility in your city — so you can plan ahead for your highest-risk migraine seasons. Free tool, no signup required.",
  openGraph: {
    title: "Migraine Season Calendar — Your Highest-Risk Months",
    description:
      "See which months carry the most storm activity and pressure volatility in your city — so you can plan ahead for your highest-risk migraine seasons. Free tool, no signup required.",
    type: "website",
  },
};

export default function MigraineSeasonCalendarPage() {
  return <SeasonCalendar />;
}

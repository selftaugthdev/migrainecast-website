import type { Metadata } from "next";
import { SeasonCalendar } from "./SeasonCalendar";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Migraine Season Calendar — Your Highest-Risk Months | MigraineCast",
    description:
      "See which months carry the most storm activity and pressure volatility in your city — so you can plan ahead for your highest-risk migraine seasons. Free tool, no signup required.",
    openGraph: {
      title: "Migraine Season Calendar — Your Highest-Risk Months",
      description:
        "See which months carry the most storm activity and pressure volatility in your city — so you can plan ahead for your highest-risk migraine seasons. Free tool, no signup required.",
      type: "website",
    },
    alternates: buildAlternates("/tools/migraine-season-calendar", locale),
  };
}

export default function MigraineSeasonCalendarPage() {
  return <SeasonCalendar />;
}

import type { Metadata } from "next";
import { SpecialistFinder } from "./SpecialistFinder";

export const metadata: Metadata = {
  title: "Find a Migraine Specialist Near You | MigraineCast",
  description:
    "Search an interactive map to find headache specialists and neurologists near you. Free tool, no signup required.",
  openGraph: {
    title: "Find a Migraine Specialist Near You",
    description:
      "Search an interactive map to find headache specialists and neurologists near you. Free tool, no signup required.",
    type: "website",
  },
};

export default function FindSpecialistPage() {
  return <SpecialistFinder />;
}

import type { Metadata } from "next";
import { SpecialistFinder } from "./SpecialistFinder";
import { faqs } from "./faqs";

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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SpecialistFinder />
    </>
  );
}

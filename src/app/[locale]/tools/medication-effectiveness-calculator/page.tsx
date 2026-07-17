import type { Metadata } from "next";
import { MedicationCalculator } from "./MedicationCalculator";

export const metadata: Metadata = {
  title: "Migraine Medication Effectiveness Calculator — Is Your Treatment Working? | MigraineCast",
  description:
    "Free 2-minute check based on the validated mTOQ-4 questionnaire. Score how well your acute migraine medication really works and see if your usage puts you at risk of medication overuse headache.",
  openGraph: {
    title: "Is Your Migraine Medication Actually Working?",
    description:
      "Score your acute treatment with the validated mTOQ-4 questionnaire and check your medication overuse risk — free, no signup.",
    type: "website",
  },
};

const faqs = [
  {
    question: "What is the mTOQ-4?",
    answer:
      "The mTOQ-4 (Migraine Treatment Optimization Questionnaire) is a validated 4-item questionnaire developed by Dr. Richard Lipton and colleagues. It measures how well your acute migraine treatment is working across four dimensions: 2-hour pain freedom, 24-hour sustained relief, ability to plan your day, and feeling in control of your migraines. Scores range from 0 to 8, with 8 indicating maximum treatment optimization.",
  },
  {
    question: "How many days per month is too many for migraine medication?",
    answer:
      "According to the international headache classification (ICHD-3), taking triptans, ergots, opioids, or combination analgesics on 10 or more days per month — or simple analgesics like ibuprofen or paracetamol on 15 or more days per month — for more than 3 months puts you at risk of medication overuse headache. Gepants are the exception: current evidence suggests they carry little or no overuse risk.",
  },
  {
    question: "What is medication overuse headache?",
    answer:
      "Medication overuse headache (MOH) is a condition where frequent use of acute headache medication paradoxically causes more headaches, creating a self-perpetuating cycle. It's one of the most common reasons episodic migraine transforms into chronic migraine. The good news: it's treatable, usually by carefully reducing the overused medication under medical supervision, often with the help of a preventive treatment.",
  },
  {
    question: "What counts as an effective acute migraine treatment?",
    answer:
      "Headache specialists generally consider an acute treatment effective if it makes you pain-free within 2 hours for most attacks, the relief lasts at least 24 hours without the migraine returning, and it works consistently enough that you can plan your life around it. If your medication regularly falls short of this, it's worth discussing alternatives with your doctor — there are many acute treatment classes available today.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function MedicationEffectivenessCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MedicationCalculator />

      {/* FAQ */}
      <div className="pb-24 relative z-10">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl text-text mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card rounded-2xl p-6 md:p-7">
                <h3 className="text-base font-semibold text-text mb-2">{faq.question}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

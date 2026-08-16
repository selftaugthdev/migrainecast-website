"use client";

import { FaqAccordion } from "@/components/FaqAccordion";
import { usePathname } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";
import { useAttribution } from "@/lib/attribution";

export function PinterestFaq({ items }: { items: { question: string; answer: string }[] }) {
  const pathname = usePathname();
  const attribution = useAttribution();

  return (
    <FaqAccordion
      items={items}
      onOpen={(question) =>
        trackEvent("faq_open", { path: pathname, question, ...attribution })
      }
    />
  );
}

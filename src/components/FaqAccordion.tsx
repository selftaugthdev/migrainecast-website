"use client";

import type { SyntheticEvent } from "react";

export function FaqAccordion({
  items,
  onOpen,
}: {
  items: { question: string; answer: string }[];
  onOpen?: (question: string) => void;
}) {
  function handleToggle(e: SyntheticEvent<HTMLDetailsElement>, question: string) {
    if (e.currentTarget.open) onOpen?.(question);
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group glass-card rounded-2xl overflow-hidden"
          onToggle={(e) => handleToggle(e, item.question)}
        >
          <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-display text-lg font-normal text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[-2px]">
            {item.question}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 shrink-0 fill-none stroke-current stroke-2 text-text-muted transition-transform duration-200 group-open:rotate-45"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </summary>
          <p className="px-6 pb-6 text-text-muted text-sm leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

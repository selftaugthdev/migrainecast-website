"use client";

import { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export function DownloadButton({
  href,
  className,
  location,
  children,
  eventName = "download_click",
  eventParams,
}: {
  href: string;
  className: string;
  location: string;
  children: ReactNode;
  eventName?: string;
  eventParams?: Record<string, string | undefined>;
}) {
  function handleClick() {
    trackEvent(eventName, {
      event_category: "engagement",
      event_label: location,
      ...eventParams,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

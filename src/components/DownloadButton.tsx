"use client";

import { ReactNode } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function DownloadButton({
  href,
  className,
  location,
  children,
}: {
  href: string;
  className: string;
  location: string;
  children: ReactNode;
}) {
  function handleClick() {
    window.gtag?.("event", "download_click", {
      event_category: "engagement",
      event_label: location,
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

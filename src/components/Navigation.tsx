"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-white/5"
          : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-text no-underline">
          <div className="w-9 h-9 bg-gradient-to-br from-accent to-coral rounded-[10px] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 stroke-white stroke-2 fill-none"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <span className="font-display text-2xl font-medium">MigraineCast</span>
        </Link>

        <Link
          href="#download"
          className="inline-flex items-center gap-2 px-6 py-3 bg-text text-bg font-semibold text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(167,139,250,0.3)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-[18px] h-[18px] fill-none stroke-current stroke-2"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
            <path d="M12 16V8M8 12l4 4 4-4" />
          </svg>
          <span className="hidden sm:inline">Download</span>
        </Link>
      </div>
    </nav>
  );
}

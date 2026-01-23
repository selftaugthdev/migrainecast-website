"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/what-is-migrainecast", label: "What is MigraineCast?" },
    { href: "/blog", label: "Blog" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 ${
        scrolled || mobileMenuOpen
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "text-accent-soft"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-text transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-none stroke-current stroke-2"
            >
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 mt-5">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-2 transition-colors ${
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-accent-soft"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

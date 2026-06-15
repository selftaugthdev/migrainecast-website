"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");
  const tLocale = useTranslations("LocaleSwitcher");
  const localeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setLocaleMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!localeMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (localeMenuRef.current && !localeMenuRef.current.contains(e.target as Node)) {
        setLocaleMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [localeMenuOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const navLinks = [
    { href: "/what-is-migrainecast", label: t("whatIsMigraineCast") },
    { href: "/blog", label: t("blog") },
    { href: "/tools", label: t("freeTools") },
    { href: "/support", label: t("support") },
  ];

  const courseLink = { href: "/weather-course", label: t("freeCourse") };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-bg/80 backdrop-blur-xl border-b border-white/5"
          : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center text-text no-underline">
          <Image
            src="/New LOGO MigraineCast.png"
            alt="MigraineCast"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
            priority
          />
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
          <Link
            href={courseLink.href}
            className={`text-sm font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
              pathname === courseLink.href
                ? "bg-accent/15 border-accent/40 text-accent-soft"
                : "bg-accent/10 border-accent/25 text-accent hover:bg-accent/20"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {courseLink.label}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Locale switcher */}
          <div className="hidden sm:block relative" ref={localeMenuRef}>
            <button
              onClick={() => setLocaleMenuOpen((open) => !open)}
              className="flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text transition-colors px-2 py-1.5 rounded-full hover:bg-surface/40"
              aria-label={tLocale("label")}
              aria-expanded={localeMenuOpen}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="uppercase">{locale}</span>
            </button>

            {localeMenuOpen && (
              <div className="absolute top-full right-0 mt-2 glass-card rounded-xl overflow-hidden shadow-xl z-20 min-w-[140px]">
                {routing.locales.map((loc) => (
                  <Link
                    key={loc}
                    href={pathname}
                    locale={loc}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-accent/10 ${
                      locale === loc ? "text-accent-soft font-semibold" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {tLocale(loc)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full text-text-muted hover:text-text hover:bg-surface/40 transition-all duration-200"
            aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
          >
            {theme === "dark" ? (
              /* Sun icon */
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon */
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <a
            href="https://apps.apple.com/us/app/migraine-cast/id6754256278"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-text text-bg font-semibold text-sm rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(167,139,250,0.3)]"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current shrink-0">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span className="hidden sm:inline">{t("downloadFree")}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-text transition-colors"
            aria-label={t("toggleMenu")}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
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
            <Link
              href={courseLink.href}
              className="text-sm font-semibold py-2 text-accent inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              {courseLink.label}
            </Link>
            <div className="flex flex-wrap gap-2 pt-2 text-sm font-medium text-text-muted">
              {routing.locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={`px-3 py-1.5 rounded-full border transition-colors ${
                    locale === loc
                      ? "text-accent-soft border-accent/40 bg-accent/10"
                      : "border-surface/80 hover:text-text hover:border-surface"
                  }`}
                >
                  {tLocale(loc)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

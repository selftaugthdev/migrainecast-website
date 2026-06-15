"use client";

import { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278";
const EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

type LocationResult = {
  name: string;
  country: string;
  admin1?: string;
  lat: number;
  lon: number;
};

async function geocode(query: string, language: string): Promise<LocationResult[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=${language}&format=json`
  );
  const data = await res.json();
  return (data.results || []).map((r: Record<string, unknown>) => ({
    name: r.name as string,
    country: r.country as string,
    admin1: r.admin1 as string | undefined,
    lat: r.latitude as number,
    lon: r.longitude as number,
  }));
}

export function SpecialistFinder() {
  const locale = useLocale();
  const t = useTranslations("SpecialistFinder");
  const faqs = t.raw("faqs") as { question: string; answer: string }[];

  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
  const [mapQuery, setMapQuery] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLocationInput = (val: string) => {
    setLocationQuery(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (val.length < 2) { setLocationResults([]); return; }
    searchTimeout.current = setTimeout(async () => {
      const results = await geocode(val, locale);
      setLocationResults(results);
    }, 350);
  };

  const selectLocation = (loc: LocationResult) => {
    const label = `${loc.name}${loc.admin1 ? `, ${loc.admin1}` : ""}, ${loc.country}`;
    setLocationQuery(label);
    setLocationResults([]);
    setMapQuery(t("mapSearchQuery", { location: label }));
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationQuery(t("usingCurrentLocation"));
        setLocationResults([]);
        setMapQuery(
          t("mapSearchQuery", { location: `${pos.coords.latitude},${pos.coords.longitude}` })
        );
        setGeoLoading(false);
      },
      () => setGeoLoading(false)
    );
  };

  return (
    <div className="pt-[140px] pb-24 relative z-10">
      <div className="max-w-[800px] mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-soft transition-colors mb-8 group"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t("allFreeTools")}
          </Link>

          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-4 block">
            {t("freeTool")}
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-normal leading-tight mb-4">
            {t.rich("heroTitle", {
              em: (chunks) => <em className="italic text-accent-soft">{chunks}</em>,
            })}
          </h1>
          <p className="text-lg text-text-muted max-w-[580px] leading-relaxed">
            {t("heroDescription")}
          </p>
        </div>

        {/* Search card */}
        <div className="glass-card rounded-2xl p-8 mb-6">
          <h2 className="font-display text-xl font-normal mb-2">{t("searchCardTitle")}</h2>
          <p className="text-text-muted text-sm mb-6">
            {t("searchCardDescription")}
          </p>

          <div className="relative mb-4">
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => handleLocationInput(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full px-5 py-4 bg-bg border border-surface/80 rounded-xl text-text placeholder:text-text-subtle focus:outline-none focus:border-accent/60 transition-all text-sm"
            />
            {locationResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 glass-card rounded-xl overflow-hidden z-20 shadow-xl">
                {locationResults.map((loc, i) => (
                  <button
                    key={i}
                    onClick={() => selectLocation(loc)}
                    className="w-full text-left px-5 py-3 text-sm hover:bg-accent/10 transition-colors border-b border-surface/30 last:border-0"
                  >
                    <span className="text-text font-medium">{loc.name}</span>
                    {loc.admin1 && <span className="text-text-muted">, {loc.admin1}</span>}
                    <span className="text-text-subtle"> — {loc.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={useMyLocation}
            disabled={geoLoading}
            className="flex items-center gap-2 text-sm text-accent hover:text-accent-soft transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
            </svg>
            {geoLoading ? t("detecting") : t("useMyLocation")}
          </button>
        </div>

        {/* Map */}
        <div className="glass-card rounded-2xl p-2 mb-6 overflow-hidden">
          {!EMBED_KEY ? (
            <div className="aspect-[4/3] flex items-center justify-center text-center px-8">
              <p className="text-text-muted text-sm">
                {t("mapUnavailable")}
              </p>
            </div>
          ) : !mapQuery ? (
            <div className="aspect-[4/3] flex items-center justify-center text-center px-8">
              <p className="text-text-muted text-sm">
                {t("mapPrompt")}
              </p>
            </div>
          ) : (
            <iframe
              key={mapQuery}
              className="w-full aspect-[4/3] rounded-xl"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/search?key=${EMBED_KEY}&q=${encodeURIComponent(mapQuery)}`}
            />
          )}
        </div>

        <p className="text-xs text-text-subtle mb-10">
          {t("resultsDisclaimer")}
        </p>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-coral/10 border border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-soft stroke-[1.5] fill-none">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-xl font-normal mb-2">
                {t("ctaTitle")}
              </h3>
              <p className="text-text-muted text-sm mb-5 leading-relaxed">
                {t("ctaDescription")}
              </p>
              <a
                href={APPSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-full text-sm shadow-[0_4px_20px_rgba(167,139,250,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(167,139,250,0.5)]"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                {t("ctaButton")}
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-normal mb-6">{t("faqTitle")}</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-normal mb-2">{faq.question}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

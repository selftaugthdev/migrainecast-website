"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278";

type LocationResult = {
  name: string;
  country: string;
  admin1?: string;
  lat: number;
  lon: number;
};

type PressureAnalysis = {
  date: string;
  pressureDrop: number;
  maxBefore: number;
  pressureOnDay: number;
  correlation: "strong" | "moderate" | "weak" | "none";
  timeline: Array<{ time: string; pressure: number }>;
};

// ── API helpers ──────────────────────────────────────────────────────────────

async function geocode(query: string): Promise<LocationResult[]> {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`
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

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

async function analyseMigraineDate(
  lat: number,
  lon: number,
  migraineDate: string
): Promise<PressureAnalysis> {
  const startDate = shiftDate(migraineDate, -2);
  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lon.toString());
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", migraineDate);
  url.searchParams.set("hourly", "surface_pressure");
  url.searchParams.set("timezone", "UTC");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();

  const pressures: number[] = data.hourly.surface_pressure;
  const times: string[] = data.hourly.time;

  // First 48h = 2 days before, last 24h = migraine day
  const before = pressures.slice(0, 48).filter(Boolean);
  const migraineDay = pressures.slice(48).filter(Boolean);

  if (before.length === 0 || migraineDay.length === 0) {
    throw new Error("Insufficient pressure data for this date.");
  }

  const maxBefore = Math.max(...before);
  // Use average of first 12h of migraine day as "pressure at onset"
  const pressureOnDay =
    migraineDay.slice(0, 12).reduce((a, b) => a + b, 0) /
    Math.min(migraineDay.slice(0, 12).length, 12);
  const pressureDrop = maxBefore - pressureOnDay;

  let correlation: "strong" | "moderate" | "weak" | "none";
  if (pressureDrop >= 8) correlation = "strong";
  else if (pressureDrop >= 4) correlation = "moderate";
  else if (pressureDrop >= 1.5) correlation = "weak";
  else correlation = "none";

  const timeline = times
    .filter((_, i) => i % 6 === 0)
    .map((time, i) => ({ time, pressure: pressures[i * 6] ?? 0 }))
    .filter((t) => t.pressure > 0);

  return {
    date: migraineDate,
    pressureDrop: Math.round(pressureDrop * 10) / 10,
    maxBefore: Math.round(maxBefore * 10) / 10,
    pressureOnDay: Math.round(pressureOnDay * 10) / 10,
    correlation,
    timeline,
  };
}

// ── Sub-components ───────────────────────────────────────────────────────────

function PressureSparkline({
  timeline,
}: {
  timeline: PressureAnalysis["timeline"];
}) {
  if (timeline.length < 4) return null;
  const W = 300;
  const H = 56;
  const ps = timeline.map((t) => t.pressure);
  const min = Math.min(...ps) - 1;
  const max = Math.max(...ps) + 1;
  const range = max - min || 1;
  const x = (i: number) => ((i / (ps.length - 1)) * W).toFixed(1);
  const y = (p: number) => (H - ((p - min) / range) * H).toFixed(1);
  const d = ps.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p)}`).join(" ");
  // Migraine day starts at index ~8 (48h / 6h intervals)
  const splitIdx = Math.round((ps.length * 2) / 3);
  const splitX = ((splitIdx / (ps.length - 1)) * W).toFixed(1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-12"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(123,142,244)" stopOpacity="0.6" />
          <stop offset={`${(splitIdx / (ps.length - 1)) * 100}%`} stopColor="rgb(123,142,244)" />
          <stop offset="100%" stopColor="rgb(244,114,182)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line
        x1={splitX} y1="2" x2={splitX} y2={H - 2}
        stroke="rgba(244,114,182,0.5)"
        strokeWidth="1"
        strokeDasharray="3,3"
      />
      <text x={+splitX + 4} y="10" fontSize="7" fill="rgba(244,114,182,0.8)">
        migraine day
      </text>
    </svg>
  );
}

const correlationConfig = {
  strong: {
    label: "Strong correlation",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
    desc: (drop: number) =>
      `Pressure dropped ${drop} hPa in the 48 hours before this migraine — a significant fall strongly associated with triggering attacks.`,
  },
  moderate: {
    label: "Likely weather-related",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    dot: "bg-orange-400",
    desc: (drop: number) =>
      `A ${drop} hPa pressure drop was detected — a moderate fall that frequently precedes weather-triggered migraines.`,
  },
  weak: {
    label: "Possible influence",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    dot: "bg-yellow-400",
    desc: (drop: number) =>
      `A small pressure change of ${drop} hPa was detected. Weather may have been a contributing factor alongside other triggers.`,
  },
  none: {
    label: "Pressure was stable",
    color: "text-text-muted",
    bg: "bg-surface/40 border-surface/60",
    dot: "bg-text-subtle",
    desc: () =>
      `No significant pressure drop detected in the 48 hours before this migraine. Weather was likely not the primary trigger this time.`,
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// ── Main component ───────────────────────────────────────────────────────────

export function WeatherChecker() {
  const [step, setStep] = useState<"location" | "dates" | "results">("location");

  // Location state
  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dates state
  const [dates, setDates] = useState<string[]>(["", "", ""]);

  // Results state
  const [analyses, setAnalyses] = useState<PressureAnalysis[]>([]);
  const [analysing, setAnalysing] = useState(false);
  const [analyseError, setAnalyseError] = useState<string | null>(null);

  // ── Location handlers

  const handleLocationInput = (val: string) => {
    setLocationQuery(val);
    setSelectedLocation(null);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (val.length < 2) { setLocationResults([]); return; }
    searchTimeout.current = setTimeout(async () => {
      const results = await geocode(val);
      setLocationResults(results);
    }, 350);
  };

  const selectLocation = (loc: LocationResult) => {
    setSelectedLocation(loc);
    setLocationQuery(`${loc.name}${loc.admin1 ? `, ${loc.admin1}` : ""}, ${loc.country}`);
    setLocationResults([]);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        // Reverse geocode via Open-Meteo geocoding (by name won't work, but we can use lat/lon directly)
        setSelectedLocation({
          name: "Your location",
          country: "",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLocationQuery("Using your current location");
        setGeoLoading(false);
      },
      () => setGeoLoading(false)
    );
  };

  // ── Dates handlers

  const today = new Date().toISOString().split("T")[0];
  // Earliest date we support: 2 years ago
  const minDate = shiftDate(today, -730);
  // Latest date: 3 days ago (archive API lag)
  const maxDate = shiftDate(today, -3);

  const updateDate = (i: number, val: string) => {
    setDates((prev) => prev.map((d, idx) => (idx === i ? val : d)));
  };
  const addDate = () => setDates((prev) => [...prev, ""]);
  const removeDate = (i: number) => setDates((prev) => prev.filter((_, idx) => idx !== i));

  // ── Analysis

  const runAnalysis = async () => {
    if (!selectedLocation) return;
    const validDates = dates.filter((d) => d.trim() !== "");
    if (validDates.length === 0) return;

    setAnalysing(true);
    setAnalyseError(null);
    setAnalyses([]);

    try {
      const results = await Promise.all(
        validDates.map((d) =>
          analyseMigraineDate(selectedLocation.lat, selectedLocation.lon, d)
        )
      );
      setAnalyses(results);
      setStep("results");
    } catch (e) {
      setAnalyseError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setAnalysing(false);
    }
  };

  const significantCount = analyses.filter(
    (a) => a.correlation === "strong" || a.correlation === "moderate"
  ).length;

  // ── Render

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
            All Free Tools
          </Link>

          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-4 block">
            Free Tool
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-normal leading-tight mb-4">
            Did the Weather Cause <em className="italic text-accent-soft">Your Migraine?</em>
          </h1>
          <p className="text-lg text-text-muted max-w-[580px] leading-relaxed">
            Enter up to 5 migraine dates and your location. We&apos;ll pull the real barometric
            pressure data and show you what the atmosphere was doing in the 48 hours before each attack.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {(["location", "dates", "results"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === s ? "text-text" : analyses.length > 0 || step !== "location" && i < ["location","dates","results"].indexOf(step) ? "text-text-muted" : "text-text-subtle"
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s ? "bg-accent text-white" :
                  (i < ["location","dates","results"].indexOf(step) || step === "results") ? "bg-accent/20 text-accent" :
                  "bg-surface/40 text-text-subtle"
                }`}>
                  {i + 1}
                </span>
                <span className="hidden sm:inline capitalize">{s === "location" ? "Your Location" : s === "dates" ? "Migraine Dates" : "Results"}</span>
              </div>
              {i < 2 && <div className="w-8 h-px bg-surface/60" />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Location ── */}
        {step === "location" && (
          <div className="glass-card rounded-2xl p-8">
            <h2 className="font-display text-xl font-normal mb-2">Where were you?</h2>
            <p className="text-text-muted text-sm mb-6">
              We need your location to pull the correct barometric pressure data.
            </p>

            <div className="relative mb-4">
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => handleLocationInput(e.target.value)}
                placeholder="Search for a city (e.g. London, New York…)"
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
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-soft transition-colors mb-8"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
              </svg>
              {geoLoading ? "Detecting…" : "Use my current location"}
            </button>

            <button
              onClick={() => setStep("dates")}
              disabled={!selectedLocation}
              className="w-full py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_30px_rgba(167,139,250,0.4)]"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: Dates ── */}
        {step === "dates" && (
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-xl font-normal">When did your migraines happen?</h2>
              <button
                onClick={() => setStep("location")}
                className="text-xs text-text-muted hover:text-text transition-colors"
              >
                ← Change location
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-accent-soft stroke-[1.5] fill-none shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <p className="text-text-muted text-sm">
                Add up to 5 dates. Use dates from at least 3 days ago — we need the archived weather data to load.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {dates.map((d, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <span className="text-xs text-text-subtle w-16 shrink-0">
                    Migraine {i + 1}
                  </span>
                  <input
                    type="date"
                    value={d}
                    min={minDate}
                    max={maxDate}
                    onChange={(e) => updateDate(i, e.target.value)}
                    className="flex-1 px-4 py-3 bg-bg border border-surface/80 rounded-xl text-text text-sm focus:outline-none focus:border-accent/60 transition-all"
                  />
                  {dates.length > 1 && (
                    <button
                      onClick={() => removeDate(i)}
                      className="text-text-subtle hover:text-text transition-colors p-1"
                      aria-label="Remove date"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {dates.length < 5 && (
              <button
                onClick={addDate}
                className="text-sm text-accent hover:text-accent-soft transition-colors flex items-center gap-1.5 mb-8"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add another date
              </button>
            )}

            {analyseError && (
              <p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                {analyseError}
              </p>
            )}

            <button
              onClick={runAnalysis}
              disabled={analysing || dates.every((d) => !d)}
              className="w-full py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_30px_rgba(167,139,250,0.4)]"
            >
              {analysing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Fetching pressure data…
                </span>
              ) : (
                "Analyse My Migraines →"
              )}
            </button>
          </div>
        )}

        {/* ── Step 3: Results ── */}
        {step === "results" && analyses.length > 0 && (
          <div>
            {/* Summary */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-2xl font-normal text-text">
                    {significantCount > 0
                      ? `${significantCount} of ${analyses.length} migraines coincided with a significant pressure drop.`
                      : `No strong weather pattern found across ${analyses.length} migraine${analyses.length > 1 ? "s" : ""}.`}
                  </p>
                  <p className="text-text-muted mt-1">
                    {significantCount === analyses.length && analyses.length > 1
                      ? "Weather is very likely a primary trigger for you."
                      : significantCount > 0
                      ? "Weather appears to be one of your triggers — especially on high-drop days."
                      : "Other triggers may be more significant — diet, sleep, hormones, or stress."}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { setStep("dates"); setAnalyses([]); }}
                className="mt-5 text-sm text-accent hover:text-accent-soft transition-colors flex items-center gap-1.5"
              >
                ← Check different dates
              </button>
            </div>

            {/* Per-date cards */}
            <div className="space-y-5 mb-10">
              {analyses.map((a) => {
                const cfg = correlationConfig[a.correlation];
                return (
                  <div key={a.date} className={`p-6 rounded-2xl border ${cfg.bg}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <p className="font-semibold text-text">{formatDate(a.date)}</p>
                        <p className="text-sm text-text-muted mt-0.5">
                          Near {selectedLocation?.name}{selectedLocation?.country ? `, ${selectedLocation.country}` : ""}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 ${cfg.bg} ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Pressure numbers */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">Peak before</p>
                        <p className="font-display text-lg font-normal text-text">{a.maxBefore} <span className="text-xs text-text-muted">hPa</span></p>
                      </div>
                      <div>
                        <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">On migraine day</p>
                        <p className="font-display text-lg font-normal text-text">{a.pressureOnDay} <span className="text-xs text-text-muted">hPa</span></p>
                      </div>
                      <div>
                        <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">Total drop</p>
                        <p className={`font-display text-lg font-normal ${a.pressureDrop > 4 ? cfg.color : "text-text"}`}>
                          {a.pressureDrop > 0 ? `↓ ${a.pressureDrop}` : `≈ 0`} <span className="text-xs text-text-muted">hPa</span>
                        </p>
                      </div>
                    </div>

                    {/* Sparkline */}
                    <div className="mb-4">
                      <p className="text-xs text-text-subtle mb-1">Pressure over 72h (2 days before → migraine day)</p>
                      <PressureSparkline timeline={a.timeline} />
                    </div>

                    <p className="text-sm text-text-muted">{cfg.desc(a.pressureDrop)}</p>
                  </div>
                );
              })}
            </div>

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
                    {significantCount > 0
                      ? "Get warned before it happens again."
                      : "Track all your triggers automatically."}
                  </h3>
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">
                    {significantCount > 0
                      ? "You just saw the pattern. MigraineCast monitors your local barometric pressure around the clock and alerts you up to 48 hours before conditions like these arrive — so you can prepare instead of react."
                      : "MigraineCast automatically tracks weather, pressure, sleep, and symptom patterns — and builds your personal trigger profile over time."}
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
                    Download MigraineCast Free
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

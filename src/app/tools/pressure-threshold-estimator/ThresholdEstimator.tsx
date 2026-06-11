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

type DropResult = {
  date: string;
  drop: number;
};

type SensitivityBucket = "high" | "moderate" | "low" | "none";

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

async function getPressureDrop(lat: number, lon: number, migraineDate: string): Promise<DropResult> {
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
  // Signed: positive = pressure dropped, negative = pressure rose
  const drop = maxBefore - pressureOnDay;

  return { date: migraineDate, drop: Math.round(drop * 10) / 10 };
}

// ── Sensitivity classification ───────────────────────────────────────────────

const bucketConfig: Record<
  SensitivityBucket,
  {
    label: string;
    range: string;
    color: string;
    bg: string;
    dot: string;
    summary: (threshold: number | null) => string;
    forecast: string;
  }
> = {
  high: {
    label: "High sensitivity",
    range: "Reacts to small drops (≈3–5 hPa)",
    color: "text-red-400",
    bg: "bg-red-500/10 border-red-500/20",
    dot: "bg-red-400",
    summary: (t) =>
      `Your lowest recorded pre-migraine drop was just ${t} hPa. That's a small shift — the kind that happens on most days with unsettled weather, not just storms.`,
    forecast:
      "Because even small pressure shifts seem to affect you, a much wider range of days carry some risk. A short forecast window (a few hours) won't give you much lead time — you'll benefit most from monitoring trends over the next 24–48 hours, not just looking for big storms.",
  },
  moderate: {
    label: "Moderate sensitivity",
    range: "Reacts to moderate drops (≈5–10 hPa)",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    dot: "bg-orange-400",
    summary: (t) =>
      `Your lowest recorded pre-migraine drop was ${t} hPa. That's a moderate shift — typically associated with a passing front or approaching low-pressure system.`,
    forecast:
      "Fronts and low-pressure systems that produce 5–10 hPa drops are usually visible 24–48 hours in advance. A standard forecast window should give you a useful early-warning lead time without too many false alarms.",
  },
  low: {
    label: "Low sensitivity — large drops only",
    range: "Reacts mainly to large drops (10+ hPa)",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
    summary: (t) =>
      `Your lowest recorded pre-migraine drop was ${t} hPa. That's a large shift — usually only seen with significant storm systems.`,
    forecast:
      "Drops this large are relatively rare and are usually flagged well in advance by weather services. You likely don't need to worry about every minor wobble in pressure — focus your attention on days with storm warnings or significant weather changes.",
  },
  none: {
    label: "No clear pressure drop found",
    range: "Pressure was flat or rising before these migraines",
    color: "text-text-muted",
    bg: "bg-surface/40 border-surface/60",
    dot: "bg-text-subtle",
    summary: () =>
      "In the 48 hours before each of these migraines, pressure was flat or actually rising — none of them were preceded by a measurable drop.",
    forecast:
      "Since pressure drops don't seem to precede your migraines, barometric pressure alone may not give you much advance warning. Other triggers — sleep, hormones, diet, dehydration, or stress — may be more relevant for you. Try adding different dates, or more of them, to get a clearer picture.",
  },
};

function classify(threshold: number | null): SensitivityBucket {
  if (threshold === null) return "none";
  if (threshold <= 5) return "high";
  if (threshold <= 10) return "moderate";
  return "low";
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatChange(drop: number): { label: string; sub: string | null } {
  if (drop > 0.5) return { label: `↓ ${drop} hPa`, sub: null };
  if (drop < -0.5) return { label: `↑ ${Math.abs(drop)} hPa`, sub: "pressure rising" };
  return { label: "≈ 0 hPa", sub: "stable" };
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ThresholdGauge({ threshold }: { threshold: number | null }) {
  const SCALE_MAX = 16;
  const pos = Math.min(Math.max(threshold ?? 0, 0), SCALE_MAX) / SCALE_MAX * 100;

  return (
    <div className="mb-2">
      <div className="relative h-3 rounded-full overflow-hidden flex mb-2">
        <div className="bg-red-400/50" style={{ width: `${(5 / SCALE_MAX) * 100}%` }} />
        <div className="bg-orange-400/50" style={{ width: `${(5 / SCALE_MAX) * 100}%` }} />
        <div className="bg-emerald-400/50" style={{ width: `${(6 / SCALE_MAX) * 100}%` }} />
        {threshold !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-text border-2 border-bg shadow-lg"
            style={{ left: `${pos}%` }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex justify-between text-[11px] text-text-subtle">
        <span>0 hPa</span>
        <span>5 hPa</span>
        <span>10 hPa</span>
        <span>16+ hPa</span>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function ThresholdEstimator() {
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
  const [drops, setDrops] = useState<DropResult[]>([]);
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
  const minDate = shiftDate(today, -730);
  const maxDate = shiftDate(today, -3);

  const updateDate = (i: number, val: string) => {
    setDates((prev) => prev.map((d, idx) => (idx === i ? val : d)));
  };
  const addDate = () => setDates((prev) => [...prev, ""]);
  const removeDate = (i: number) => setDates((prev) => prev.filter((_, idx) => idx !== i));

  // ── Analysis

  const validDates = dates.filter((d) => d.trim() !== "");

  const runAnalysis = async () => {
    if (!selectedLocation) return;
    if (validDates.length < 3) return;

    setAnalysing(true);
    setAnalyseError(null);
    setDrops([]);

    try {
      const results = await Promise.all(
        validDates.map((d) => getPressureDrop(selectedLocation.lat, selectedLocation.lon, d))
      );
      setDrops(results.sort((a, b) => a.drop - b.drop));
      setStep("results");
    } catch (e) {
      setAnalyseError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setAnalysing(false);
    }
  };

  // Threshold = smallest *positive* drop (a real pressure fall) preceding a migraine.
  // Days where pressure was flat or rising aren't informative for sensitivity.
  const positiveDrops = drops.filter((d) => d.drop > 0.5).map((d) => d.drop);
  const threshold = positiveDrops.length > 0 ? Math.min(...positiveDrops) : null;
  const bucket = classify(threshold);
  const cfg = bucketConfig[bucket];

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
            How <em className="italic text-accent-soft">Pressure-Sensitive</em> Are You?
          </h1>
          <p className="text-lg text-text-muted max-w-[580px] leading-relaxed">
            Enter your location and at least 3 migraine dates. We&apos;ll work out how big a
            barometric pressure drop it actually takes to trigger one of your attacks — and
            what that means for how far ahead you should be watching the forecast.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {(["location", "dates", "results"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === s ? "text-text" : "text-text-subtle"
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
                Add at least 3 dates (up to 6) for a reliable estimate. Use dates from at least
                3 days ago — we need the archived weather data to load.
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
                  {dates.length > 3 && (
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

            {dates.length < 6 && (
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
              disabled={analysing || validDates.length < 3}
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
              ) : validDates.length < 3 ? (
                "Add at least 3 dates to continue"
              ) : (
                "Estimate My Threshold →"
              )}
            </button>
          </div>
        )}

        {/* ── Step 3: Results ── */}
        {step === "results" && drops.length > 0 && (
          <div>
            {/* Summary */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M12 20V10M18 20V4M6 20v-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">Your estimated threshold</p>
                  <p className="font-display text-3xl font-normal text-text mb-1">
                    {threshold !== null ? (
                      <>≈ {threshold} <span className="text-base text-text-muted">hPa</span></>
                    ) : (
                      <span className="text-2xl">No drop detected</span>
                    )}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                </div>
              </div>

              <ThresholdGauge threshold={threshold} />

              <p className="text-sm text-text-muted mt-4">{cfg.summary(threshold)}</p>

              <button
                onClick={() => { setStep("dates"); setDrops([]); }}
                className="mt-5 text-sm text-accent hover:text-accent-soft transition-colors flex items-center gap-1.5"
              >
                ← Check different dates
              </button>
            </div>

            {/* Per-date breakdown */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <h3 className="font-display text-lg font-normal mb-4">Pressure drop before each migraine</h3>
              <div className="space-y-2">
                {drops.map((d) => {
                  const isThreshold = threshold !== null && d.drop === threshold;
                  const change = formatChange(d.drop);
                  return (
                    <div
                      key={d.date}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                        isThreshold ? cfg.bg : "bg-surface/40 border-surface/60"
                      }`}
                    >
                      <span className="text-sm text-text">{formatDate(d.date)}</span>
                      <span className="flex items-center gap-2">
                        {isThreshold && (
                          <span className={`text-[10px] font-semibold uppercase tracking-wide ${cfg.color}`}>
                            Lowest drop
                          </span>
                        )}
                        <span className="font-display text-base font-normal text-text">
                          {change.label}
                        </span>
                        {change.sub && (
                          <span className="text-xs text-text-subtle">({change.sub})</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-text-subtle mt-4">
                {threshold !== null
                  ? "We use the smallest drop on this list as your estimated threshold — the gentlest pressure shift that still appears to have triggered an attack. Days where pressure was flat or rising aren't used for this estimate. The more dates you add, the more reliable it becomes."
                  : "None of these dates had a measurable pressure drop in the 48 hours before, so we can't estimate a threshold from them. Try adding different or additional dates."}
              </p>
            </div>

            {/* Forecast window guidance */}
            <div className="p-6 rounded-2xl bg-surface/30 border border-surface/60 mb-10">
              <h3 className="font-display text-lg font-normal mb-2">What this means for your forecast window</h3>
              <p className="text-sm text-text-muted leading-relaxed">{cfg.forecast}</p>
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
                    Get alerts tuned to your threshold.
                  </h3>
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">
                    MigraineCast learns your personal pressure sensitivity over time and sends
                    forecasts and alerts calibrated to it — so you&apos;re not buried in
                    irrelevant warnings, and you never miss the ones that matter to you.
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

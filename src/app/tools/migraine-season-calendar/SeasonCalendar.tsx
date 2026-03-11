"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type LocationResult = {
  name: string;
  country: string;
  admin1?: string;
  lat: number;
  lon: number;
};

type MonthStats = {
  month: number;
  stormDays: number;
  avgDrop: number;
  volatility: number;
  riskLevel: "calm" | "moderate" | "volatile" | "stormy";
};

// ── API helpers ───────────────────────────────────────────────────────────────

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

async function fetchSeasonData(
  lat: number,
  lon: number
): Promise<{ stats: MonthStats[]; yearRange: string }> {
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() - 5);

  const startDate = new Date(endDate);
  startDate.setFullYear(startDate.getFullYear() - 2);

  const fmt = (d: Date) => d.toISOString().split("T")[0];

  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lon.toString());
  url.searchParams.set("start_date", fmt(startDate));
  url.searchParams.set("end_date", fmt(endDate));
  url.searchParams.set("hourly", "surface_pressure");
  url.searchParams.set("timezone", "UTC");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();

  const pressures: number[] = data.hourly.surface_pressure;
  const times: string[] = data.hourly.time;

  // Compute daily averages
  const dailyMap: Record<string, number[]> = {};
  times.forEach((t, i) => {
    const day = t.split("T")[0];
    if (!dailyMap[day]) dailyMap[day] = [];
    if (pressures[i] != null) dailyMap[day].push(pressures[i]);
  });

  const days = Object.keys(dailyMap).sort();
  const dailyAvg = days.map((d) => {
    const vals = dailyMap[d];
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  });

  // Group day-to-day pressure changes by calendar month
  const monthData: Record<number, { drops: number[]; stormDays: number; totalDays: number }> = {};
  for (let m = 0; m < 12; m++) {
    monthData[m] = { drops: [], stormDays: 0, totalDays: 0 };
  }

  for (let i = 1; i < days.length; i++) {
    const month = parseInt(days[i].split("-")[1]) - 1;
    const change = dailyAvg[i - 1] - dailyAvg[i]; // positive = pressure dropped
    monthData[month].drops.push(Math.abs(change));
    monthData[month].totalDays++;
    if (change > 5) monthData[month].stormDays++;
  }

  // Compute raw volatility score per month (weighted avg drop + storm frequency)
  const rawScores = Array.from({ length: 12 }, (_, m) => {
    const { drops, stormDays, totalDays } = monthData[m];
    if (drops.length === 0) return 0;
    const avgDrop = drops.reduce((a, b) => a + b, 0) / drops.length;
    const stormFreq = totalDays > 0 ? stormDays / totalDays : 0;
    return avgDrop * 0.7 + stormFreq * 10 * 0.3;
  });

  const maxScore = Math.max(...rawScores);
  const minScore = Math.min(...rawScores);
  const range = maxScore - minScore || 1;

  const stats = Array.from({ length: 12 }, (_, m) => {
    const { drops, stormDays } = monthData[m];
    const avgDrop =
      drops.length > 0 ? drops.reduce((a, b) => a + b, 0) / drops.length : 0;
    const volatility = (rawScores[m] - minScore) / range;

    let riskLevel: "calm" | "moderate" | "volatile" | "stormy";
    if (volatility < 0.25) riskLevel = "calm";
    else if (volatility < 0.5) riskLevel = "moderate";
    else if (volatility < 0.75) riskLevel = "volatile";
    else riskLevel = "stormy";

    return {
      month: m,
      stormDays: Math.round(stormDays / 2), // per-year average
      avgDrop: Math.round(avgDrop * 10) / 10,
      volatility,
      riskLevel,
    };
  });

  const yearRange = `${startDate.getFullYear()}–${endDate.getFullYear()}`;
  return { stats, yearRange };
}

// ── Config ────────────────────────────────────────────────────────────────────

const riskConfig = {
  calm: {
    label: "Calm",
    barColor: "bg-emerald-400",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-400/20",
    bgColor: "bg-emerald-400/10",
    dot: "bg-emerald-400",
    desc: "Relatively stable pressure patterns — your lowest-risk period of the year.",
  },
  moderate: {
    label: "Moderate",
    barColor: "bg-yellow-400",
    textColor: "text-yellow-400",
    borderColor: "border-yellow-400/20",
    bgColor: "bg-yellow-400/10",
    dot: "bg-yellow-400",
    desc: "Some pressure variability is common. Stay aware, but it's not your peak danger period.",
  },
  volatile: {
    label: "Volatile",
    barColor: "bg-orange-400",
    textColor: "text-orange-400",
    borderColor: "border-orange-400/20",
    bgColor: "bg-orange-400/10",
    dot: "bg-orange-400",
    desc: "Significant pressure swings are common this month — a higher-risk period for weather-triggered migraines.",
  },
  stormy: {
    label: "High Risk",
    barColor: "bg-red-400",
    textColor: "text-red-400",
    borderColor: "border-red-400/20",
    bgColor: "bg-red-400/10",
    dot: "bg-red-400",
    desc: "Frequent storm activity and pressure drops. Plan ahead, stock up on medication, and stay prepared.",
  },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function MonthBars({ stats }: { stats: MonthStats[] }) {
  return (
    <div className="flex items-end gap-1 sm:gap-1.5 mb-3" style={{ height: "128px" }}>
      {stats.map((s) => {
        const cfg = riskConfig[s.riskLevel];
        // Min 6% height so even the calmest month is visible
        const heightPct = Math.max(6, s.volatility * 88 + 8);
        return (
          <div key={s.month} className="flex flex-col items-center gap-1.5 flex-1 group">
            <div className="w-full flex items-end justify-center" style={{ height: "100px" }}>
              <div
                className={`w-full rounded-t-md ${cfg.barColor} opacity-75 group-hover:opacity-100 transition-opacity duration-150`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <span className="text-[9px] sm:text-[10px] text-text-subtle leading-none select-none">
              {MONTHS[s.month]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function SeasonCalendar() {
  // Location state
  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Results state
  const [stats, setStats] = useState<MonthStats[] | null>(null);
  const [yearRange, setYearRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Handlers

  const handleLocationInput = (val: string) => {
    setLocationQuery(val);
    setSelectedLocation(null);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (val.length < 2) {
      setLocationResults([]);
      return;
    }
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
      (pos) => {
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

  const runAnalysis = async () => {
    if (!selectedLocation) return;
    setLoading(true);
    setError(null);
    setStats(null);
    try {
      const result = await fetchSeasonData(selectedLocation.lat, selectedLocation.lon);
      setStats(result.stats);
      setYearRange(result.yearRange);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStats(null);
    setLocationQuery("");
    setSelectedLocation(null);
    setError(null);
  };

  const topRiskMonths = stats
    ? [...stats].sort((a, b) => b.volatility - a.volatility).slice(0, 3)
    : [];

  const locationLabel = selectedLocation
    ? `${selectedLocation.name}${selectedLocation.country ? `, ${selectedLocation.country}` : ""}`
    : "";

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
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Free Tools
          </Link>

          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-4 block">
            Free Tool
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-normal leading-tight mb-4">
            Your Migraine <em className="italic text-accent-soft">Season Calendar</em>
          </h1>
          <p className="text-lg text-text-muted max-w-[580px] leading-relaxed">
            Enter your city and we&apos;ll analyse 2 years of barometric pressure data to show
            you which months carry the most storm activity — so you can plan ahead for your
            highest-risk seasons.
          </p>
        </div>

        {/* ── Input card ── */}
        {!stats && (
          <div className="glass-card rounded-2xl p-8">
            <h2 className="font-display text-xl font-normal mb-2">Where do you live?</h2>
            <p className="text-text-muted text-sm mb-6">
              We&apos;ll pull 2 years of historical barometric pressure data to map your
              city&apos;s seasonal risk pattern.
            </p>

            <div className="relative mb-4">
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => handleLocationInput(e.target.value)}
                placeholder="Search for a city (e.g. London, Chicago…)"
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

            {error && (
              <p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            <button
              onClick={runAnalysis}
              disabled={!selectedLocation || loading}
              className="w-full py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_30px_rgba(167,139,250,0.4)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"
                    />
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    />
                  </svg>
                  Analysing 2 years of pressure data…
                </span>
              ) : (
                "Show My Season Calendar →"
              )}
            </button>
          </div>
        )}

        {/* ── Results ── */}
        {stats && (
          <div>

            {/* Year-at-a-glance card */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <p className="text-text-subtle text-xs uppercase tracking-wider mb-1">
                    {yearRange} · {locationLabel}
                  </p>
                  <h2 className="font-display text-2xl font-normal text-text">
                    Pressure risk across the year
                  </h2>
                  <p className="text-text-muted text-sm mt-1">
                    Based on 2 years of hourly barometric pressure readings.
                  </p>
                </div>
                <button
                  onClick={reset}
                  className="text-xs text-text-muted hover:text-text transition-colors shrink-0 mt-1"
                >
                  ← Change city
                </button>
              </div>

              {/* Bar chart */}
              <MonthBars stats={stats} />

              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4 border-t border-surface/30">
                {(["calm", "moderate", "volatile", "stormy"] as const).map((level) => (
                  <span key={level} className="flex items-center gap-1.5 text-xs text-text-muted">
                    <span className={`w-2.5 h-2.5 rounded-sm ${riskConfig[level].barColor}`} />
                    {riskConfig[level].label}
                  </span>
                ))}
              </div>
            </div>

            {/* Top risk months */}
            <p className="text-xs font-semibold text-text-subtle uppercase tracking-wider mb-4">
              Your highest-risk months
            </p>
            <div className="space-y-4 mb-10">
              {topRiskMonths.map((s, rank) => {
                const cfg = riskConfig[s.riskLevel];
                return (
                  <div
                    key={s.month}
                    className={`p-6 rounded-2xl border ${cfg.borderColor} ${cfg.bgColor}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-text-subtle text-sm tabular-nums">
                          #{rank + 1}
                        </span>
                        <h3 className="font-display text-2xl font-normal text-text">
                          {MONTHS_FULL[s.month]}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 ${cfg.bgColor} ${cfg.borderColor} ${cfg.textColor}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">
                          Avg storm days / month
                        </p>
                        <p className={`font-display text-3xl font-normal ${cfg.textColor}`}>
                          {s.stormDays}
                          <span className="text-sm text-text-muted ml-1">days</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-text-subtle uppercase tracking-wide mb-1">
                          Avg daily pressure swing
                        </p>
                        <p className={`font-display text-3xl font-normal ${cfg.textColor}`}>
                          {s.avgDrop}
                          <span className="text-sm text-text-muted ml-1">hPa</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-text-muted">{cfg.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* All months compact list */}
            <div className="glass-card rounded-2xl p-6 mb-10">
              <p className="text-xs font-semibold text-text-subtle uppercase tracking-wider mb-4">
                All months at a glance
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                {stats.map((s) => {
                  const cfg = riskConfig[s.riskLevel];
                  return (
                    <div key={s.month} className="flex items-center justify-between gap-2">
                      <span className="text-sm text-text-muted w-24 shrink-0">
                        {MONTHS_FULL[s.month]}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bgColor} ${cfg.textColor} border ${cfg.borderColor}`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-coral/10 border border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent-soft stroke-[1.5] fill-none">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-normal mb-2">
                    Get warned before high-risk days arrive.
                  </h3>
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">
                    Now you know your highest-risk months. MigraineCast monitors your local
                    barometric pressure around the clock and alerts you up to 48 hours before
                    conditions drop — so you can prepare instead of react.
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

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

type LifestyleKey =
  | "poorSleep"
  | "highStress"
  | "skippedMeal"
  | "dehydrated"
  | "alcohol"
  | "screenTime"
  | "period";

type WeatherKey = "pressureDrop" | "tempSwing" | "humiditySwing";

type DayEntry = {
  date: string;
  lifestyle: Record<LifestyleKey, boolean>;
};

type FactorResult = {
  key: string;
  label: string;
  category: "weather" | "lifestyle";
  count: number;
  total: number;
  pct: number;
};

const LIFESTYLE_FACTORS: { key: LifestyleKey; label: string }[] = [
  { key: "poorSleep", label: "Poor sleep (<6h)" },
  { key: "highStress", label: "High stress day" },
  { key: "skippedMeal", label: "Skipped a meal" },
  { key: "dehydrated", label: "Didn't drink much water" },
  { key: "alcohol", label: "Alcohol the night before" },
  { key: "screenTime", label: "Long screen time" },
  { key: "period", label: "On your period" },
];

const WEATHER_FACTOR_LABELS: Record<WeatherKey, string> = {
  pressureDrop: "Pressure dropped 5+ hPa in the 48h before",
  tempSwing: "Temperature swung 8°C+ around the attack",
  humiditySwing: "Humidity swung 25%+ around the attack",
};

const emptyLifestyle = (): Record<LifestyleKey, boolean> =>
  LIFESTYLE_FACTORS.reduce((acc, f) => {
    acc[f.key] = false;
    return acc;
  }, {} as Record<LifestyleKey, boolean>);

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

async function getWeatherFlags(
  lat: number,
  lon: number,
  date: string
): Promise<Record<WeatherKey, boolean>> {
  const startDate = shiftDate(date, -2);
  const url = new URL("https://archive-api.open-meteo.com/v1/archive");
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lon.toString());
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", date);
  url.searchParams.set("hourly", "surface_pressure,temperature_2m,relative_humidity_2m");
  url.searchParams.set("timezone", "UTC");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();

  const pressures: number[] = data.hourly.surface_pressure;
  const temps: number[] = data.hourly.temperature_2m;
  const humidity: number[] = data.hourly.relative_humidity_2m;

  const before = pressures.slice(0, 48).filter((v) => v != null);
  const onset = pressures.slice(48, 60).filter((v) => v != null);

  if (before.length === 0 || onset.length === 0) {
    throw new Error("Insufficient weather data for this date.");
  }

  const maxBefore = Math.max(...before);
  const onsetAvg = onset.reduce((a, b) => a + b, 0) / onset.length;
  const pressureDrop = maxBefore - onsetAvg >= 5;

  const allTemps = temps.filter((v) => v != null);
  const tempSwing = allTemps.length > 0 && Math.max(...allTemps) - Math.min(...allTemps) >= 8;

  const allHumidity = humidity.filter((v) => v != null);
  const humiditySwing =
    allHumidity.length > 0 && Math.max(...allHumidity) - Math.min(...allHumidity) >= 25;

  return { pressureDrop, tempSwing, humiditySwing };
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// ── Main component ───────────────────────────────────────────────────────────

export function TriggerPatternAnalyzer() {
  const [step, setStep] = useState<"location" | "days" | "results">("location");

  // Location state
  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Day entries
  const [days, setDays] = useState<DayEntry[]>([
    { date: "", lifestyle: emptyLifestyle() },
    { date: "", lifestyle: emptyLifestyle() },
    { date: "", lifestyle: emptyLifestyle() },
  ]);

  // Results
  const [factors, setFactors] = useState<FactorResult[]>([]);
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

  // ── Day handlers

  const today = new Date().toISOString().split("T")[0];
  const minDate = shiftDate(today, -730);
  const maxDate = shiftDate(today, -3);

  const updateDate = (i: number, val: string) => {
    setDays((prev) => prev.map((d, idx) => (idx === i ? { ...d, date: val } : d)));
  };
  const toggleLifestyle = (i: number, key: LifestyleKey) => {
    setDays((prev) =>
      prev.map((d, idx) =>
        idx === i ? { ...d, lifestyle: { ...d.lifestyle, [key]: !d.lifestyle[key] } } : d
      )
    );
  };
  const addDay = () => setDays((prev) => [...prev, { date: "", lifestyle: emptyLifestyle() }]);
  const removeDay = (i: number) => setDays((prev) => prev.filter((_, idx) => idx !== i));

  // ── Analysis

  const validDays = days.filter((d) => d.date.trim() !== "");

  const runAnalysis = async () => {
    if (!selectedLocation) return;
    if (validDays.length < 3) return;

    setAnalysing(true);
    setAnalyseError(null);
    setFactors([]);

    try {
      const weatherFlags = await Promise.all(
        validDays.map((d) => getWeatherFlags(selectedLocation.lat, selectedLocation.lon, d.date))
      );

      const total = validDays.length;

      const lifestyleResults: FactorResult[] = LIFESTYLE_FACTORS.map((f) => {
        const count = validDays.filter((d) => d.lifestyle[f.key]).length;
        return {
          key: f.key,
          label: f.label,
          category: "lifestyle",
          count,
          total,
          pct: Math.round((count / total) * 100),
        };
      });

      const weatherResults: FactorResult[] = (Object.keys(WEATHER_FACTOR_LABELS) as WeatherKey[]).map(
        (key) => {
          const count = weatherFlags.filter((w) => w[key]).length;
          return {
            key,
            label: WEATHER_FACTOR_LABELS[key],
            category: "weather",
            count,
            total,
            pct: Math.round((count / total) * 100),
          };
        }
      );

      const combined = [...weatherResults, ...lifestyleResults]
        .filter((f) => f.count > 0)
        .sort((a, b) => b.pct - a.pct || b.count - a.count);

      setFactors(combined);
      setStep("results");
    } catch (e) {
      setAnalyseError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setAnalysing(false);
    }
  };

  const topFactor = factors[0];
  const hasStrongPattern = !!topFactor && topFactor.pct >= 50 && validDays.length >= 3;

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
            Find the <em className="italic text-accent-soft">Patterns</em> in Your Migraines
          </h1>
          <p className="text-lg text-text-muted max-w-[580px] leading-relaxed">
            Log a few migraine days along with what was going on — sleep, stress, food, and
            more. We&apos;ll cross-reference real weather data for your location and show
            which factors show up most often around your attacks.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {(["location", "days", "results"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                step === s ? "text-text" : "text-text-subtle"
              }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s ? "bg-accent text-white" :
                  (i < ["location","days","results"].indexOf(step) || step === "results") ? "bg-accent/20 text-accent" :
                  "bg-surface/40 text-text-subtle"
                }`}>
                  {i + 1}
                </span>
                <span className="hidden sm:inline capitalize">{s === "location" ? "Your Location" : s === "days" ? "Migraine Days" : "Results"}</span>
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
              We need your location to pull the correct weather data for your migraine days.
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
              onClick={() => setStep("days")}
              disabled={!selectedLocation}
              className="w-full py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_30px_rgba(167,139,250,0.4)]"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: Days ── */}
        {step === "days" && (
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-xl font-normal">Tell us about each migraine day</h2>
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
                Add at least 3 days (up to 8). For each, pick a date and tag anything that was
                also true that day — only what you remember, no need to be exact.
              </p>
            </div>

            <div className="space-y-5 mb-6">
              {days.map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface/30 border border-surface/60">
                  <div className="flex gap-3 items-center mb-3">
                    <span className="text-xs text-text-subtle w-16 shrink-0">
                      Migraine {i + 1}
                    </span>
                    <input
                      type="date"
                      value={d.date}
                      min={minDate}
                      max={maxDate}
                      onChange={(e) => updateDate(i, e.target.value)}
                      className="flex-1 px-4 py-3 bg-bg border border-surface/80 rounded-xl text-text text-sm focus:outline-none focus:border-accent/60 transition-all"
                    />
                    {days.length > 3 && (
                      <button
                        onClick={() => removeDay(i)}
                        className="text-text-subtle hover:text-text transition-colors p-1"
                        aria-label="Remove day"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {LIFESTYLE_FACTORS.map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => toggleLifestyle(i, f.key)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          d.lifestyle[f.key]
                            ? "bg-accent/20 border-accent/40 text-accent-soft"
                            : "bg-bg border-surface/80 text-text-subtle hover:border-accent/30"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {days.length < 8 && (
              <button
                onClick={addDay}
                className="text-sm text-accent hover:text-accent-soft transition-colors flex items-center gap-1.5 mb-8"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add another day
              </button>
            )}

            {analyseError && (
              <p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                {analyseError}
              </p>
            )}

            <button
              onClick={runAnalysis}
              disabled={analysing || validDays.length < 3}
              className="w-full py-4 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_8px_30px_rgba(167,139,250,0.4)]"
            >
              {analysing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Analysing patterns…
                </span>
              ) : validDays.length < 3 ? (
                "Add at least 3 days to continue"
              ) : (
                "Find My Patterns →"
              )}
            </button>
          </div>
        )}

        {/* ── Step 3: Results ── */}
        {step === "results" && (
          <div>
            {/* Summary */}
            <div className="glass-card rounded-2xl p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-accent-soft stroke-[1.5] fill-none">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-2xl font-normal text-text">
                    {hasStrongPattern
                      ? `"${topFactor.label}" showed up in ${topFactor.count} of ${topFactor.total} migraines.`
                      : factors.length > 0
                      ? "No single factor stood out strongly across these days."
                      : "We didn't find any of the tracked factors on these days."}
                  </p>
                  <p className="text-text-muted mt-1">
                    {hasStrongPattern
                      ? "That's a pattern worth paying attention to."
                      : "Try adding more days, or different combinations of factors, to sharpen the picture."}
                  </p>
                </div>
              </div>

              <button
                onClick={() => { setStep("days"); setFactors([]); }}
                className="mt-5 text-sm text-accent hover:text-accent-soft transition-colors flex items-center gap-1.5"
              >
                ← Check different days
              </button>
            </div>

            {/* Factor breakdown */}
            {factors.length > 0 && (
              <div className="glass-card rounded-2xl p-8 mb-6">
                <h3 className="font-display text-lg font-normal mb-4">How often each factor showed up</h3>
                <div className="space-y-4">
                  {factors.map((f, i) => (
                    <div key={f.key}>
                      <div className="flex items-center justify-between mb-1.5 gap-3">
                        <span className="text-sm text-text flex items-center gap-2">
                          <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                            f.category === "weather"
                              ? "text-accent-soft bg-accent/10 border-accent/20"
                              : "text-coral bg-coral/10 border-coral/20"
                          }`}>
                            {f.category === "weather" ? "Weather" : "Lifestyle"}
                          </span>
                          {f.label}
                        </span>
                        <span className="text-sm text-text-muted shrink-0">
                          {f.count}/{f.total}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-surface/60 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            i === 0 && hasStrongPattern
                              ? "bg-gradient-to-r from-accent to-[#8b5cf6]"
                              : "bg-text-subtle/50"
                          }`}
                          style={{ width: `${f.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-subtle mt-5">
                  This shows how often each factor was present on the days you logged — not
                  proof that it caused your migraine. The more days you add (and the more
                  varied they are), the more meaningful these patterns become.
                </p>
              </div>
            )}

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
                    Track every day automatically.
                  </h3>
                  <p className="text-text-muted text-sm mb-5 leading-relaxed">
                    MigraineCast logs weather, sleep, and your symptoms day after day, building
                    a personal trigger profile that gets sharper over time — no manual
                    spreadsheets required.
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

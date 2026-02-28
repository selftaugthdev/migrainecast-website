"use client";

import { useState, useEffect } from "react";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Log a migraine in under 10 seconds",
    desc: "Quick logging that doesn't feel like a chore",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Understand your weather triggers",
    desc: "MigraineCast automatically connects your attacks to barometric pressure drops, storms, and weather fronts",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Discover what actually triggers your migraines",
    desc: "See patterns across weeks and months — which days, seasons, and conditions consistently precede your attacks",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Know a high-risk day is coming",
    desc: "Get a 48-hour migraine risk forecast based on upcoming weather — so you can prepare, not just react",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent-soft stroke-[1.5] fill-none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "PDF report for your neurologist",
    desc: "Generate a doctor-ready PDF of your attack history, triggers, and weather correlations — ready to bring to your next appointment",
  },
];

export function FeatureCards() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {features.map((feature, i) => (
        <div
          key={i}
          onClick={() => setActive(i)}
          className={`flex gap-5 p-6 border rounded-2xl cursor-pointer transition-all duration-500 ${
            i === active
              ? "bg-accent/[0.07] border-accent/40 scale-[1.02] shadow-[0_0_28px_rgba(123,142,244,0.18)]"
              : "bg-white/[0.02] border-white/5 hover:bg-accent/[0.04] hover:border-accent/20"
          }`}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-coral/10 rounded-xl flex items-center justify-center shrink-0">
            {feature.icon}
          </div>
          <div>
            <h4 className="font-semibold text-[1.05rem] mb-1.5">{feature.title}</h4>
            <p className="text-[0.95rem] text-text-muted">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

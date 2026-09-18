import { HomeConversionActions } from "@/components/HomeConversionActions";
import { IPhoneFrame } from "@/components/IPhoneFrame";
import { HomepageViewTracker } from "./HomepageViewTracker";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const APPSTORE_URL = "https://apps.apple.com/us/app/migraine-cast/id6754256278?ppid=49039837-f866-4209-b1b3-4ee7ac306f82";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Layout" });
  return { title: t("metadataTitle"), description: t("metadataDescription") };
}

const forecastSignals = [
  { value: "7", label: "days ahead", detail: "Plan around the conditions you want to watch." },
  { value: "4+", label: "weather signals", detail: "Pressure, humidity, temperature, and more in one view." },
  { value: "1", label: "personal baseline", detail: "Your history is the context—not a generic score." },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const appSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "MigraineCast", applicationCategory: "HealthApplication", operatingSystem: "iOS", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: t("schema.description"), downloadUrl: APPSTORE_URL, featureList: t.raw("schema.featureList") as string[] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
    <HomepageViewTracker />

    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#07111e] lg:min-h-[720px]">
      <Image src="/migraine-weather-front-v2.png" alt="An approaching weather front over a distant horizon" fill priority sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,25,.95)_0%,rgba(4,13,25,.84)_38%,rgba(4,13,25,.18)_72%,rgba(4,13,25,.25)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#07111e]/80 to-transparent" />
      <div className="relative mx-auto grid min-h-[760px] max-w-[1280px] grid-cols-1 px-6 pt-32 lg:min-h-[720px] lg:grid-cols-[1.03fr_.97fr] lg:px-10 lg:pt-28">
        <div className="relative z-10 flex max-w-[610px] flex-col items-start pb-8 lg:justify-center lg:pb-24">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.12em] text-white/80 backdrop-blur-sm">{t("hero.eyebrow")}</p>
          <h1 className="max-w-[620px] whitespace-pre-line font-display text-[clamp(2.7rem,5vw,4.7rem)] font-medium leading-[.98] tracking-[-.045em] text-white">{t("hero.title")}</h1>
          <p className="mt-6 max-w-[540px] text-[1.05rem] leading-relaxed text-white/78 sm:text-[1.13rem]">{t("hero.description")}</p>
          <div className="mt-8"><HomeConversionActions location="hero" iosLabel={t("hero.downloadCta")} iosEventName="hero_ios_download_click" androidClickEventName="hero_android_waitlist_click" androidButtonLabel={t("hero.androidCta")} androidVariant="text" iosClassName="inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-4 font-semibold text-[#081322] shadow-[0_12px_30px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5 hover:bg-[#e9efff] focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4" /></div>
          <p className="mt-5 text-[11px] leading-none tracking-[.01em] text-white/45">{t("heroDisclaimer")}</p>
        </div>
        <div className="relative flex min-h-[375px] items-end justify-center lg:min-h-0 lg:items-center lg:justify-end">
          <div className="absolute bottom-[-5%] h-[67%] w-[58%] rounded-full bg-[#9eb8d4]/20 blur-3xl" />
          <IPhoneFrame className="z-10 w-[220px] drop-shadow-[0_28px_40px_rgba(0,0,0,.55)] sm:w-[255px] lg:w-[290px]" priority alt="MigraineCast forecast interface with day-by-day migraine weather conditions" />
        </div>
      </div>
    </section>

    <section className="border-y border-white/[.07] bg-[#0a1726] py-10"><div className="mx-auto grid max-w-[1100px] grid-cols-1 divide-y divide-white/[.09] px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">{forecastSignals.map((signal) => <div key={signal.label} className="px-0 py-6 sm:px-7 sm:py-1 first:sm:pl-0 last:sm:pr-0"><div className="font-display text-3xl text-[#dceaff]">{signal.value}</div><div className="mt-1 text-sm font-semibold text-white">{signal.label}</div><p className="mt-1.5 text-sm leading-relaxed text-[#a8b8cc]">{signal.detail}</p></div>)}</div></section>

    <section className="bg-[#f6f8fb] py-20 text-[#142033] sm:py-28"><div className="mx-auto max-w-[1100px] px-6"><div className="max-w-[650px]"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#48698c]">A clearer forecast, in context</p><h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.05] tracking-[-.035em]">See the signals that may matter to you.</h2><p className="mt-5 text-lg leading-relaxed text-[#506176]">MigraineCast puts the day-by-day forecast first, then gives you a practical way to compare it with what you experience over time.</p></div><div className="mt-14 grid gap-5 md:grid-cols-3">{[["Check the days ahead", "A readable daily forecast helps you spot pressure shifts and changing conditions before they arrive."], ["Capture an attack quickly", "Log symptoms when they happen, without turning your day into a data-entry task."], ["Bring useful history forward", "Review your own observations over time and have better context for a conversation with your clinician."]].map(([title, body], index) => <article key={title} className="rounded-2xl border border-[#dbe3ec] bg-white p-7 shadow-[0_12px_30px_rgba(24,43,68,.06)]"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f0f7] text-sm font-bold text-[#36597c]">0{index + 1}</span><h3 className="mt-8 text-xl font-bold tracking-[-.02em]">{title}</h3><p className="mt-3 leading-relaxed text-[#5b6b7d]">{body}</p></article>)}</div></div></section>

    <section className="bg-[#0b1827] py-20 sm:py-28"><div className="mx-auto grid max-w-[1100px] items-center gap-12 px-6 lg:grid-cols-[.85fr_1.15fr]"><div className="relative mx-auto w-[230px] sm:w-[265px]"><div className="absolute -inset-10 rounded-full bg-[#6385aa]/15 blur-3xl" /><IPhoneFrame className="relative w-full" alt="MigraineCast day-by-day forecast showing weather conditions" /></div><div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#9ab9d8]">Built around the real forecast</p><h2 className="mt-4 max-w-[600px] font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.06] tracking-[-.035em] text-white">One calm view for the next seven days.</h2><p className="mt-5 max-w-[590px] text-lg leading-relaxed text-[#b7c5d4]">Pressure, humidity, temperature, and changes across the week are easy to scan at a glance. The forecast is there to support awareness and planning—not to make a diagnosis or promise an outcome.</p><div className="mt-8 border-l-2 border-[#88afd3] pl-5 text-sm leading-relaxed text-[#c5d3e1]">Weather sensitivity differs from person to person. Use MigraineCast as one source of context alongside your own care plan.</div></div></div></section>

    <section id="download" className="bg-[#eaf1f7] py-20 text-center text-[#142033] sm:py-28"><div className="mx-auto max-w-[680px] px-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#48698c]">A more useful weather check</p><h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.03] tracking-[-.04em]">Know what’s changing before the day begins.</h2><p className="mx-auto mt-5 max-w-[530px] text-lg leading-relaxed text-[#53677e]">Download MigraineCast for a calmer, more personal way to follow the weather around you.</p><div className="mt-8 flex justify-center"><HomeConversionActions location="final" iosLabel={t("hero.downloadCta")} iosEventName="final_ios_download_click" androidClickEventName="final_android_waitlist_click" androidButtonLabel={t("hero.androidCta")} androidVariant="green" stack /></div><p className="mt-7 text-sm leading-relaxed text-[#63778e]">{t("medicalDisclaimer")}</p></div></section>
  </>;
}

import { getAllPosts } from "@/lib/blog";
import { MetadataRoute } from "next";

const BASE_URL = "https://migrainecast.app";
const LOCALES = ["en", "nl", "de", "fr", "es"] as const;
const DEFAULT_LOCALE = "en";

function localizedUrl(path: string, locale: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

function allLocaleUrls(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified?: Date
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localizedUrl(path, locale),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, localizedUrl(path, l)])
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticPages: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/what-is-migrainecast", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "daily", priority: 0.9 },
    { path: "/weather-course", changeFrequency: "monthly", priority: 0.7 },
    { path: "/agents", changeFrequency: "monthly", priority: 0.6 },
    { path: "/tools/weather-trigger-checker", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/pressure-threshold-estimator", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/trigger-pattern-analyzer", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/migraine-season-calendar", changeFrequency: "monthly", priority: 0.8 },
    { path: "/tools/find-a-specialist", changeFrequency: "weekly", priority: 0.7 },
    { path: "/support", changeFrequency: "yearly", priority: 0.4 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries = staticPages.flatMap(({ path, changeFrequency, priority }) =>
    allLocaleUrls(path, changeFrequency, priority)
  );

  const blogEntries = posts.flatMap((post) =>
    allLocaleUrls(
      `/blog/${post.slug}`,
      "monthly",
      0.7,
      new Date(post.date)
    )
  );

  return [...staticEntries, ...blogEntries];
}

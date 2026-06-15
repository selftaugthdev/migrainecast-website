import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/lib/blog";

export async function Footer() {
  const recentPosts = getAllPosts().slice(0, 3);
  const t = await getTranslations("Footer");

  return (
    <footer className="pt-14 pb-8 border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="font-display text-xl text-text-muted mb-3">MigraineCast</div>
            <p className="text-sm text-text-subtle leading-relaxed max-w-[220px]">
              {t("tagline")}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-text-subtle mb-4">{t("links")}</div>
            <div className="flex flex-col gap-2.5">
              <Link href="/weather-course" className="text-sm text-text-muted hover:text-text transition-colors">{t("freeCourse")}</Link>
              <Link href="/blog" className="text-sm text-text-muted hover:text-text transition-colors">{t("blog")}</Link>
              <Link href="/privacy" className="text-sm text-text-muted hover:text-text transition-colors">{t("privacyPolicy")}</Link>
              <Link href="/terms" className="text-sm text-text-muted hover:text-text transition-colors">{t("termsOfService")}</Link>
              <Link href="/support" className="text-sm text-text-muted hover:text-text transition-colors">{t("support")}</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-text-subtle mb-4">{t("freeToolsHeading")}</div>
            <div className="flex flex-col gap-2.5">
              <Link href="/tools/weather-trigger-checker" className="text-sm text-text-muted hover:text-text transition-colors">{t("weatherTriggerChecker")}</Link>
              <Link href="/tools" className="text-sm text-text-muted hover:text-text transition-colors">{t("allFreeTools")}</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-text-subtle mb-4">{t("recentPosts")}</div>
            <div className="flex flex-col gap-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="text-sm text-text-muted hover:text-text transition-colors leading-snug"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-sm text-text-subtle text-center">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}

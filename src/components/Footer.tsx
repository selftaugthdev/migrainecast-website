import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export function Footer() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <footer className="pt-14 pb-8 border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="font-display text-xl text-text-muted mb-3">MigraineCast</div>
            <p className="text-sm text-text-subtle leading-relaxed max-w-[220px]">
              Weather-based migraine forecasting for iPhone.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-text-subtle mb-4">Links</div>
            <div className="flex flex-col gap-2.5">
              <Link href="/weather-course" className="text-sm text-text-muted hover:text-text transition-colors">Free Course</Link>
              <Link href="/blog" className="text-sm text-text-muted hover:text-text transition-colors">Blog</Link>
              <Link href="/privacy" className="text-sm text-text-muted hover:text-text transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-text-muted hover:text-text transition-colors">Terms of Service</Link>
              <Link href="/support" className="text-sm text-text-muted hover:text-text transition-colors">Support</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-text-subtle mb-4">Free Tools</div>
            <div className="flex flex-col gap-2.5">
              <Link href="/tools/weather-trigger-checker" className="text-sm text-text-muted hover:text-text transition-colors">Weather Trigger Checker</Link>
              <Link href="/tools" className="text-sm text-text-muted hover:text-text transition-colors">All Free Tools</Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-[0.1em] uppercase text-text-subtle mb-4">Recent Posts</div>
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
          © {new Date().getFullYear()} MigraineCast. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

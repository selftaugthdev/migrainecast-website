import { Background } from "@/components/Background";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — MigraineCast",
  description:
    "Articles about migraines, weather triggers, and how to better manage your health.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Background />

      <section className="pt-[140px] pb-20 min-h-screen relative z-10">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-5 block">
              Blog
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-tight mb-6">
              Insights & Articles
            </h1>
            <p className="text-lg text-text-muted max-w-[600px]">
              Learn about migraines, weather triggers, and practical tips to help
              you stay ahead of attacks.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-8 bg-white/[0.02] border border-white/5 rounded-2xl transition-all duration-300 hover:bg-accent/5 hover:border-accent/20 hover:translate-x-2 group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <span className="text-sm text-accent-soft font-medium">
                    {post.category}
                  </span>
                  <span className="hidden md:block w-1 h-1 bg-text-subtle rounded-full" />
                  <span className="text-sm text-text-subtle">{post.date}</span>
                </div>

                <h2 className="font-display text-2xl font-medium mb-3 group-hover:text-accent-soft transition-colors">
                  {post.title}
                </h2>

                <p className="text-text-muted leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-soft group-hover:gap-3 transition-all">
                  Read more
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-none stroke-current stroke-2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">
                No articles yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

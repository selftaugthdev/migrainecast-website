import { Background } from "@/components/Background";
import { getAllPosts } from "@/lib/blog";
import { buildAlternates } from "@/lib/seo";
import { BlogList } from "./BlogList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Blog — MigraineCast",
    description:
      "Articles about migraines, weather triggers, and how to better manage your health.",
    alternates: buildAlternates("/blog", locale),
  };
}

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

          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}

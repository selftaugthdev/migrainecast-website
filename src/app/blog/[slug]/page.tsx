import { Background } from "@/components/Background";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found — MigraineCast",
    };
  }

  return {
    title: `${post.title} — MigraineCast Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: "MigraineCast",
      url: "https://migrainecast.com",
    },
    publisher: {
      "@type": "Organization",
      name: "MigraineCast",
      url: "https://migrainecast.com",
      logo: {
        "@type": "ImageObject",
        url: "https://migrainecast.com/Migraine Cast LOGO DARK MODE.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://migrainecast.com/blog/${slug}`,
    },
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Background />

      <article className="pt-[140px] pb-20 relative z-10">
        <div className="max-w-[720px] mx-auto px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-soft transition-colors mb-12 group"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:-translate-x-1 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-accent-soft font-medium">
                {post.category}
              </span>
              <span className="w-1 h-1 bg-text-subtle rounded-full" />
              <span className="text-sm text-text-subtle">{post.date}</span>
            </div>

            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-text-muted leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:font-normal
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-text-muted prose-p:leading-relaxed
              prose-a:text-accent-soft prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text prose-strong:font-semibold
              prose-ul:text-text-muted prose-ol:text-text-muted
              prose-li:marker:text-accent/50
              prose-blockquote:border-accent prose-blockquote:bg-white/[0.02] prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
              prose-code:text-accent-soft prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent-soft hover:gap-3 transition-all font-medium"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-none stroke-current stroke-2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all articles
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}

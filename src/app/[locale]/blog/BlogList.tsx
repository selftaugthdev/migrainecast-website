"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) =>
      [post.title, post.excerpt, post.category]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [posts, query]);

  return (
    <>
      <div className="relative mb-10">
        <svg
          viewBox="0 0 24 24"
          className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 fill-none stroke-current stroke-2 text-text-subtle pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="w-full pl-12 pr-5 py-4 bg-bg border border-surface/80 rounded-xl text-text placeholder:text-text-subtle focus:outline-none focus:border-accent/60 transition-all text-sm"
        />
      </div>

      <div className="space-y-6">
        {filteredPosts.map((post) => (
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

      {filteredPosts.length === 0 && posts.length > 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">
            No articles match &ldquo;{query}&rdquo;.
          </p>
        </div>
      )}

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-lg">
            No articles yet. Check back soon!
          </p>
        </div>
      )}
    </>
  );
}

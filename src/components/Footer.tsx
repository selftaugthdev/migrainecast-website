import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display text-xl text-text-muted">MigraineCast</div>

        <div className="flex flex-wrap justify-center gap-8">
          <Link
            href="/privacy"
            className="text-sm text-text-muted hover:text-text transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-text-muted hover:text-text transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/support"
            className="text-sm text-text-muted hover:text-text transition-colors"
          >
            Support
          </Link>
          <Link
            href="/blog"
            className="text-sm text-text-muted hover:text-text transition-colors"
          >
            Blog
          </Link>
        </div>

        <div className="text-sm text-text-subtle">
          © {new Date().getFullYear()} MigraineCast. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

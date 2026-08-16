"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const AndroidIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`shrink-0 w-4 h-4 ${className}`}>
    <path d="M17.6 9.48l1.84-3.18a.5.5 0 10-.87-.5l-1.86 3.22a10.4 10.4 0 00-8.42 0L6.43 5.8a.5.5 0 10-.87.5L7.4 9.48A9.1 9.1 0 002.5 17h19a9.1 9.1 0 00-3.9-7.52zM9 14.5a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

type Status = "idle" | "submitting" | "success" | "error";
type Variant = "overlay" | "default" | "pinterest";

export function AndroidWaitlistWidget({
  variant = "default",
  badge,
  buttonLabel,
  attribution,
  onOpen,
  onSubmitted,
}: {
  variant?: Variant;
  /** Small "coming soon"-style pill rendered next to the button. */
  badge?: string;
  /** Override the button's default translated label. */
  buttonLabel?: string;
  /** Extra fields (e.g. UTM attribution) sent alongside the email on submit. */
  attribution?: Record<string, string | undefined>;
  onOpen?: () => void;
  onSubmitted?: (status: "success" | "error") => void;
}) {
  const t = useTranslations("HomePage");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleOpen() {
    setOpen(true);
    onOpen?.();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe-android-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...attribution }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || t("hero.androidWaitlist.modal.errorMessage"));
        setStatus("error");
        onSubmitted?.("error");
        return;
      }

      setStatus("success");
      onSubmitted?.("success");
    } catch {
      setErrorMessage(t("hero.androidWaitlist.modal.errorMessage"));
      setStatus("error");
      onSubmitted?.("error");
    }
  }

  const isOverlay = variant === "overlay";
  const isPinterest = variant === "pinterest";

  const buttonClassName = isPinterest
    ? "inline-flex items-center gap-2.5 px-7 py-[17px] bg-accent/10 border border-accent/40 text-text font-semibold rounded-full transition-all duration-300 hover:-translate-y-[2px] hover:bg-accent/[0.16] hover:border-accent/60 cursor-pointer"
    : isOverlay
    ? "inline-flex items-center gap-2 px-5 py-3 border border-white/25 text-white text-sm font-semibold rounded-full backdrop-blur-sm transition-colors hover:bg-white/10 cursor-pointer"
    : "inline-flex items-center gap-2 px-5 py-3 border border-accent/30 text-accent-soft text-sm font-semibold rounded-full transition-colors hover:bg-accent/10 cursor-pointer";

  return (
    <>
      <div className={isPinterest ? "flex flex-col items-start gap-2" : undefined}>
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] inline-block" />
            {badge}
          </span>
        )}
        {!badge && (
          <p className={isOverlay ? "text-xs text-white/70 mb-2" : "text-xs text-text-subtle mb-2"}>
            {t("hero.androidWaitlist.introText")}
          </p>
        )}
        <button type="button" onClick={handleOpen} className={buttonClassName}>
          <AndroidIcon className={isPinterest ? "fill-[#3DDC84]" : "fill-current"} />
          {buttonLabel ?? t("hero.androidWaitlist.buttonLabel")}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-bg-elevated border border-white/10 p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("hero.androidWaitlist.modal.close")}
              className="absolute top-4 right-4 text-text-subtle hover:text-text transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {status === "success" ? (
              <div>
                <h3 className="font-display text-xl text-text mb-2">
                  {t("hero.androidWaitlist.modal.successTitle")}
                </h3>
                <p className="text-sm text-text-muted">
                  {t("hero.androidWaitlist.modal.successMessage")}
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl text-text mb-2 pr-6">
                  {t("hero.androidWaitlist.modal.title")}
                </h3>
                <p className="text-sm text-text-muted mb-5">
                  {t("hero.androidWaitlist.modal.description")}
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label htmlFor="android-waitlist-email" className="sr-only">
                    {t("hero.androidWaitlist.modal.placeholder")}
                  </label>
                  <input
                    id="android-waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("hero.androidWaitlist.modal.placeholder")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder:text-text-subtle focus:outline-none focus:border-accent/50 focus:bg-white/[0.07] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full px-6 py-3 bg-gradient-to-br from-accent to-[#8b5cf6] text-white font-semibold rounded-xl shadow-[0_4px_20px_rgba(167,139,250,0.4)] hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgba(167,139,250,0.5)] transition-all disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
                  >
                    {status === "submitting"
                      ? t("hero.androidWaitlist.modal.submitting")
                      : t("hero.androidWaitlist.modal.submitCta")}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-coral">{errorMessage}</p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

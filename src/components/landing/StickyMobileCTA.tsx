import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, ExternalLink, X } from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { getScrollRoot } from "@/lib/scroll";
import { useIntent, INTENT_CTA } from "@/lib/useIntent";
import { assignVariant, EXPERIMENTS } from "@/lib/abTest";
import { GOOGLE_FORM_URL } from "./constants";

/**
 * Scroll-aware mobile CTA.
 * - Hidden while the hero (#top) is in view, so it never covers the headline.
 * - Reveals once the user has scrolled past the hero.
 * - Dismissible for the session (sessionStorage).
 */
export function StickyMobileCTA() {
  const loc = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const intent = useIntent();
  const cta = INTENT_CTA[intent];
  // A/B: vary sticky CTA placement. control = hidden, bottom_pill = always show
  // after hero, scroll_trigger = only after 40% page depth.
  const variant = assignVariant("sticky_cta_placement", EXPERIMENTS.sticky_cta_placement);
  // Second concurrent experiment: copy on the /apply CTA. Only matters when
  // the intent-routed CTA actually points at /apply.
  const applyVariant = assignVariant("apply_cta_urgency", EXPERIMENTS.apply_cta_urgency);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (variant === "control") return;
    // Soft-dismiss: only hide for ~60s, then come back. Sales reps can't lose this.
    // sessionStorage can throw in Safari private browsing — guard all access
    let dismissedAt = 0;
    try {
      dismissedAt = Number(sessionStorage.getItem("hideStickyCTAAt") || 0);
    } catch { /* noop — storage restricted */ }
    const stillHidden = dismissedAt && Date.now() - dismissedAt < 60_000;
    setDismissed(Boolean(stillHidden));
    if (stillHidden) {
      const t = setTimeout(() => setDismissed(false), 60_000 - (Date.now() - dismissedAt));
      return () => clearTimeout(t);
    }

    if (variant === "scroll_trigger") {
      const root = getScrollRoot();
      const onScroll = () => {
        const el = root ?? document.documentElement;
        const top = root ? root.scrollTop : window.scrollY;
        const max = el.scrollHeight - el.clientHeight || 1;
        setVisible(top / max >= 0.4);
      };
      (root ?? window).addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => (root ?? window).removeEventListener("scroll", onScroll);
    }

    const hero = document.getElementById("top");
    if (!hero) {
      // Fallback: show after a small scroll
      const root = getScrollRoot();
      const onScroll = () => setVisible((root ? root.scrollTop : window.scrollY) > 480);
      (root ?? window).addEventListener("scroll", onScroll, { passive: true });
      return () => (root ?? window).removeEventListener("scroll", onScroll);
    }
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      root: getScrollRoot(),
      threshold: 0,
      rootMargin: "-40px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [variant]);

  if (variant === "control" || dismissed) return null;
  // Hide anywhere a route already provides its own bottom CTA / form.
  const p = loc.pathname;
  const hidden =
    p.startsWith("/apply") ||
    p.startsWith("/enrol") ||
    p.startsWith("/career-engine") ||
    p.startsWith("/internships") ||
    p.startsWith("/learn/") ||
    p === "/dashboard" ||
    p === "/verify";
  if (hidden) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div
        data-apply-surface={`sticky_mobile_cta:${variant}`}
        data-apply-cta-urgency={applyVariant}
        className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-slate-200/15 bg-[#0A0F1E] px-2 py-2 sm:mx-auto sm:max-w-md"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 -1px 2px rgba(0,0,0,0.3), 0 -16px 48px -12px rgba(0,0,0,0.7), 0 8px 24px -8px rgba(15,27,61,0.6)",
        }}
      >
        <WhatsAppLink
          source="sticky_mobile_cta"
          message="Hi Arzon, quick question about the programme."
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b6fa0]/15 text-[#7fb0d8] ring-1 ring-[#3b6fa0]/30 transition-all duration-200 hover:bg-[#3b6fa0]/25 hover:ring-[#3b6fa0]/55 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fb0d8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]"
          aria-label="Chat with a counsellor on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </WhatsAppLink>
        {cta.to === "/apply" ? (
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold flex-1"
            style={{ height: "2.75rem", minHeight: "2.75rem", padding: "0 1rem", fontSize: "13px" }}
          >
            <span>Register Now (2 Mins)</span>
            <span data-arrow aria-hidden>
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </a>
        ) : (
          <Link
            to={cta.to}
            className="btn btn-gold flex-1"
            style={{ height: "2.75rem", minHeight: "2.75rem", padding: "0 1rem", fontSize: "13px" }}
          >
            <span>{cta.shortLabel}</span>
            <span data-arrow aria-hidden>
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.setItem("hideStickyCTAAt", String(Date.now()));
            } catch { /* noop — storage restricted */ }
            setDismissed(true);
            setTimeout(() => setDismissed(false), 60_000);
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-100/60 transition-all duration-200 hover:bg-slate-50/10 hover:text-slate-50 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]"
          aria-label="Dismiss sticky call-to-action"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

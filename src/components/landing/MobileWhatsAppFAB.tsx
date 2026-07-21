import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";

/**
 * Floating WhatsApp contact button, mobile only.
 * Sits above the StickyMobileCTA so visitors can reach a counsellor
 * with one tap, on every page, before they apply.
 *
 * - Hidden while the hero (#top) is in view so it never covers the headline.
 * - Hidden on flows where conversation would interrupt the task (apply, learn,
 *   dashboard, admin). The contact page already has WhatsApp surfaced inline.
 */
export function MobileWhatsAppFAB() {
  const loc = useLocation();
  const [visible, setVisible] = useState(false);
  const [avoiding, setAvoiding] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hero = document.getElementById("top");
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-40px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [loc.pathname]);

  // Hide the bubble whenever a known "apply disclaimer" / fine-print block is on
  // screen, so the FAB can never sit on top of legally important small text
  // (especially tight 360px viewports where there's no room to dodge sideways).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-fab-avoid]"));
    if (targets.length === 0) {
      setAvoiding(false);
      return;
    }
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target);
          else seen.delete(e.target);
        }
        setAvoiding(seen.size > 0);
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [loc.pathname]);

  const p = loc.pathname;
  const hidden =
    p.startsWith("/apply") ||
    p.startsWith("/enrol") ||
    p.startsWith("/learn/") ||
    p.startsWith("/admin") ||
    (p.startsWith("/courses/") && p !== "/courses") ||
    p === "/dashboard" ||
    p === "/contact";
  if (hidden) return null;

  // The sticky mobile CTA bar already exposes a WhatsApp shortcut as its
  // secondary action on the SAME routes this FAB shows on. Stacking both
  // forces users to dismiss two CTAs and clips bottom content on 360px
  // viewports. The bar wins; we render the FAB only on routes where the
  // bar is intentionally suppressed.
  const stickyBarVisibleHere =
    !(p.startsWith("/courses/") && p !== "/courses") &&
    !p.startsWith("/apply") &&
    !p.startsWith("/enrol") &&
    !p.startsWith("/career-engine") &&
    !p.startsWith("/internships") &&
    !p.startsWith("/learn/") &&
    p !== "/dashboard" &&
    p !== "/verify";
  if (stickyBarVisibleHere) return null;

  const shown = visible && !avoiding;

  return (
    <WhatsAppLink
      source="mobile_fab"
      message="Hi Arzon, I have a quick question before applying."
      aria-label="Chat with an Arzon counsellor on WhatsApp"
      data-event="wa_fab_click"
      data-testid="mobile-sticky-cta"
      className={`fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-nav-blue text-slate-50 shadow-[0_10px_30px_-6px_rgba(59,111,160,0.55)] ring-1 ring-white/15 transition-all duration-300 md:hidden sm:h-14 sm:w-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 84px)" }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-nav-blue opacity-60 motion-safe:animate-ping"
      />
      <MessageCircle className="relative h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
      <span className="sr-only">WhatsApp counsellor</span>
    </WhatsAppLink>
  );
}

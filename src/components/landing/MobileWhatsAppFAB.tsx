import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";

function stickyActionBarIsVisible() {
  if (typeof document === "undefined") return false;
  const nodes = document.querySelectorAll<HTMLElement>("[data-sticky-action-bar]");
  for (const el of nodes) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    if (Number.parseFloat(cs.opacity) < 0.2) continue;
    if (cs.pointerEvents === "none") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) continue;
    return true;
  }
  return false;
}

/**
 * Floating WhatsApp contact button, mobile only.
 * Sits above sticky action bars (workshop register, role-page bars, home CTA)
 * so tap targets never collide on viewports under 430px.
 *
 * - Hidden while the hero (#top) is in view so it never covers the headline.
 * - Hidden on flows where conversation would interrupt the task (apply, learn,
 *   dashboard, admin). The contact page already has WhatsApp surfaced inline.
 */
export function MobileWhatsAppFAB() {
  const loc = useLocation();
  const [visible, setVisible] = useState(false);
  const [avoiding, setAvoiding] = useState(false);
  const [liftForBar, setLiftForBar] = useState(false);

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => setLiftForBar(stickyActionBarIsVisible());
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style", "data-sticky-action-bar", "aria-hidden"],
    });
    window.addEventListener("resize", read);
    return () => {
      mo.disconnect();
      window.removeEventListener("resize", read);
    };
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

  const shown = visible && !avoiding;
  const bottom = liftForBar
    ? "calc(env(safe-area-inset-bottom) + 5.5rem)"
    : "calc(env(safe-area-inset-bottom) + 1.25rem)";

  return (
    <WhatsAppLink
      source="mobile_fab"
      message="Hi Arzon, I have a quick question before applying."
      aria-label="Chat with an Arzon counsellor on WhatsApp"
      data-event="wa_fab_click"
      data-testid="mobile-sticky-cta"
      className={`fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-nav-blue text-slate-50 shadow-[0_10px_30px_-6px_rgba(59,111,160,0.55)] ring-1 ring-white/15 transition-all duration-300 md:hidden max-[430px]:right-3 sm:h-14 sm:w-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      } ${liftForBar ? "bottom-20" : ""}`}
      style={{ bottom }}
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

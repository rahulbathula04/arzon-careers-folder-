import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Compass } from "lucide-react";
import { track } from "@/lib/track";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileActionBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Exclude pages that have their own dedicated sticky CTA or checkout/dashboard/admin
    const excludePrefixes = [
      "/healthcare-career-workshop",
      "/pv-associate",
      "/admin",
      "/dashboard",
      "/enrol",
      "/apply",
      "/checkin",
      "/career-engine",
      "/acri",
    ];
    const isExcluded = excludePrefixes.some((p) => location.pathname.startsWith(p));
    if (isExcluded) {
      setVisible(false);
      return;
    }

    const checkScroll = () => {
      const root = document.getElementById("app-scroll-root");
      const rootScroll = root ? root.scrollTop : 0;
      const winScroll = typeof window !== "undefined" ? (window.scrollY || document.documentElement.scrollTop || 0) : 0;
      const scrollY = Math.max(rootScroll, winScroll);
      // Reveal smoothly once user has engaged and scrolled past the top hero
      setVisible(scrollY > 140);
    };

    checkScroll();

    const root = document.getElementById("app-scroll-root");
    if (root) {
      root.addEventListener("scroll", checkScroll, { passive: true });
    }
    window.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      if (root) root.removeEventListener("scroll", checkScroll);
      window.removeEventListener("scroll", checkScroll);
    };
  }, [location.pathname]);

  if (!visible) return null;

  const handleCtaClick = () => {
    track("sticky_mobile_diagnose_click", { props: { path: location.pathname } });
    trackEvent("cta_click", { action: "sticky_diagnose", path: location.pathname });
  };

  const handleWhatsAppClick = () => {
    track("whatsapp_click", { props: { source: "sticky_mobile_bar", path: location.pathname } });
    trackEvent("whatsapp_click", { source: "sticky_mobile_bar" });
  };

  return (
    <aside
      aria-label="Mobile quick actions"
      data-sticky-action-bar
      className="fixed bottom-3 inset-x-3.5 z-40 sm:hidden max-w-md mx-auto transition-all motion-safe:animate-in motion-safe:slide-in-from-bottom-4 duration-300"
      style={{
        bottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))",
      }}
    >
      <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-[#081F38]/92 backdrop-blur-2xl p-1.5 shadow-[0_16px_40px_rgba(7,26,74,0.45)]">
        {/* Apple Tactile WhatsApp Counsellor Button */}
        <a
          href="https://wa.me/919121283638?text=Hi%20Arzon%20Team%2C%20I%20want%20to%20know%20which%20healthcare%20career%20fits%20my%20degree."
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          aria-label="Chat with career counsellor on WhatsApp"
          className="h-11 w-11 shrink-0 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/25 active:scale-95 transition-all shadow-xs"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="sr-only">WhatsApp Counsellor</span>
        </a>

        {/* Apple Primary CTA Pill */}
        <Link
          to="/career-assessment"
          onClick={handleCtaClick}
          className="flex-1 h-11 px-4 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-slate-50 font-sans text-xs font-bold flex items-center justify-between transition-all shadow-md active:scale-[0.98]"
        >
          <span className="flex items-center gap-2 truncate">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="truncate">Find My Career Path</span>
          </span>
          <span className="flex items-center gap-1 shrink-0 pl-1 text-slate-100">
            <Compass className="h-3.5 w-3.5" />
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </aside>
  );
}

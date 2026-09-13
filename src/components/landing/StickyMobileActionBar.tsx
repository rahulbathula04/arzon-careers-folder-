import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
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
    ];
    const isExcluded = excludePrefixes.some((p) => location.pathname.startsWith(p));

    function onScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Show after scrolling 180px down
      setVisible(!isExcluded && scrollY > 180);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  if (!visible) return null;

  const handleDiagnoseClick = () => {
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
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-slate-800 bg-[#0B1325]/95 backdrop-blur-md px-3 py-2.5 shadow-2xl transition-all animate-in slide-in-from-bottom duration-300"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2">
        <a
          href="https://wa.me/919121283638?text=Hi%20Arzon%20Team%2C%20I%20want%20to%20know%20which%20healthcare%20career%20fits%20my%20degree."
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="h-11 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm min-h-[44px]"
        >
          <MessageCircle className="h-4 w-4 shrink-0 text-slate-50" />
          <span>Chat</span>
        </a>

        <Link
          to="/career-engine/start"
          onClick={handleDiagnoseClick}
          className="flex-1 h-11 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-50 font-sans text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 min-h-[44px]"
        >
          <Sparkles className="h-3.5 w-3.5 text-teal-200 shrink-0" />
          <span>Diagnose Career Fit (Free)</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-50 shrink-0" />
        </Link>
      </div>
    </aside>
  );
}

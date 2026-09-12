import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Calculator, PhoneCall } from "lucide-react";

export function StickyMobileActionBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on key decision paths
    const showPaths = [
      "/",
      "/roles",
      "/degrees",
      "/training",
      "/research",
      "/comparisons",
      "/locations/hyderabad",
      "/tools/cost-calculator",
    ];
    const isTargetPage = showPaths.some(
      (p) => location.pathname === p || (p !== "/" && location.pathname.startsWith(p))
    );

    function onScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Show after scrolling 200px down
      setVisible(isTargetPage && scrollY > 200);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <aside
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-40 sm:hidden border-t border-slate-800 bg-[#0B1325]/95 backdrop-blur-md p-3 shadow-2xl transition-all animate-in slide-in-from-bottom duration-300"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2">
        <Link
          to="/tools/cost-calculator"
          className="flex-1 h-11 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Calculator className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>Cost Calc</span>
        </Link>

        <Link
          to="/career-engine/start"
          className="flex-[1.5] h-11 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <span>Diagnose Career Path</span>
          <ArrowRight className="h-3.5 w-3.5 text-slate-50 shrink-0" />
        </Link>
      </div>
    </aside>
  );
}

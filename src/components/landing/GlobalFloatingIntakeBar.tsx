import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Stethoscope, ArrowRight, X, TrendingUp, Sparkles } from "lucide-react";
import { getPQAScore } from "@/lib/pqa";

// ---------------------------------------------------------------------------
// Context-aware floating bar.
// - Cold visitor: shows "Explore your degree's career paths"
// - Warm visitor (PQA 10–40): shows "You've started exploring — see your match"
// - Hot visitor (PQA 40+): shows "You qualify for a priority advisory session"
// ---------------------------------------------------------------------------

function getBarContent(score: number) {
  if (score >= 40) {
    return {
      badge: "PRIORITY ADVISORY",
      badgeColor: "text-amber-400",
      dot: "bg-amber-400",
      headline: "Your exploration depth qualifies you for a priority 1-on-1 career session.",
      cta: "Book Advisory",
      ctaStyle: "from-amber-400 to-amber-500 text-slate-950",
      scrollTarget: "expert-guidance",
    };
  }
  if (score >= 10) {
    return {
      badge: "CAREER EXPLORER",
      badgeColor: "text-sky-400",
      dot: "bg-sky-400",
      headline: "You're exploring healthcare careers — check your requirement coverage score.",
      cta: "Calculate My Score",
      ctaStyle: "from-sky-500 to-teal-500 text-white",
      scrollTarget: "interactive-explorer",
    };
  }
  return {
    badge: "FREE CAREER INTELLIGENCE",
    badgeColor: "text-emerald-400",
    dot: "bg-emerald-400",
    headline: "B.Pharm, Pharm.D, D.Pharm, Biotech & Life Sciences career paths — free to explore.",
    cta: "Explore My Options",
    ctaStyle: "from-emerald-500 to-teal-600 text-white",
    scrollTarget: "interactive-explorer",
  };
}

export function GlobalFloatingIntakeBar() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pqaScore, setPqaScore] = useState(0);

  // Show after 6 seconds of reading, not immediately
  useEffect(() => {
    const t = setTimeout(() => {
      if (!dismissed) setIsVisible(true);
    }, 6000);
    return () => clearTimeout(t);
  }, [dismissed]);

  // Re-read PQA score every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPqaScore(getPQAScore());
    }, 8000);
    setPqaScore(getPQAScore());
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
  };

  const content = getBarContent(pqaScore);

  const handleCTA = () => {
    const el = document.getElementById(content.scrollTarget);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isVisible || dismissed) return null;

  return (
    <motion.div
      initial={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-3xl rounded-2xl border border-slate-700/60 bg-[#0B152C]/95 backdrop-blur-lg px-4 py-3 sm:px-6 shadow-2xl shadow-slate-950/60 text-slate-100 flex flex-wrap items-center justify-between gap-3"
    >
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="hidden sm:flex h-9 w-9 rounded-xl bg-sky-500/10 border border-sky-400/20 items-center justify-center text-sky-400 shrink-0">
          <Stethoscope className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${content.dot} animate-pulse`} />
            <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${content.badgeColor}`}>
              {content.badge}
            </span>
            {pqaScore >= 10 && (
              <span className="font-mono text-[10px] text-slate-400">
                · PQA {pqaScore}pts
              </span>
            )}
          </div>
          <p className="text-xs font-sans font-medium text-slate-100 truncate mt-0.5 max-w-sm sm:max-w-md">
            {content.headline}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleCTA}
          className={`h-9 px-4 rounded-xl bg-gradient-to-r ${content.ctaStyle} text-xs font-bold font-mono flex items-center gap-1.5 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer`}
        >
          {content.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-50 hover:bg-slate-800/80 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

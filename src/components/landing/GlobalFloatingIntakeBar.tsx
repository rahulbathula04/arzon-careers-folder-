import { useState, useEffect } from "react";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { motion, useReducedMotion } from "framer-motion";
import { Stethoscope, ArrowRight, X, TrendingUp, Sparkles } from "lucide-react";
import { getPQAScore } from "@/lib/pqa";
// ---------------------------------------------------------------------------
// Context-aware floating bar.
// - Cold visitor: shows "Explore your degree's career paths"
// - Warm visitor (PQA 10–40): shows "You've started exploring — see your match"
// - Hot visitor (PQA 40+): shows "You qualify for a priority advisory session"

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
      ctaStyle: "from-sky-500 to-teal-500 text-slate-50",
      scrollTarget: "interactive-explorer",
    };
  }
  return {
    badge: "FREE CAREER INTELLIGENCE",
    badgeColor: "text-emerald-400",
    headline: "B.Pharm, Pharm.D, D.Pharm, Biotech & Life Sciences career paths — free to explore.",
    cta: "Explore My Options",
    ctaStyle: "from-emerald-500 to-teal-600 text-slate-50",
    scrollTarget: "interactive-explorer",
  };
}

export function GlobalFloatingIntakeBar() {
  return null;
}


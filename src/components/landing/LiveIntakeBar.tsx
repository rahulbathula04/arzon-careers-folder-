import React, { useState, useEffect } from "react";
import { ArrowRight, X, Clock, ShieldCheck } from "lucide-react";
import { LiveOpportunitiesData } from "@/data/liveOpportunities";
import { trackEvent } from "@/lib/analytics";

export function LiveIntakeBar() {
  const [isVisible, setIsVisible] = useState(true);
  const primaryRole = LiveOpportunitiesData.ROLES[0]; // JPMC Data Analyst

  if (!isVisible) return null;

  const handleAction = () => {
    trackEvent("live_intake_bar_click", { role: primaryRole.role });
    const quizEl = document.getElementById("eligibility-quiz") || document.getElementById("apply");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#1B3F8B] text-slate-50 border-t border-amber-400/40 shadow-2xl py-2.5 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-sans font-medium text-center sm:text-left">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse shrink-0" />
          <span>
            <strong className="font-bold text-amber-300">LIVE INTAKE:</strong> {primaryRole.employer} {primaryRole.role} — {primaryRole.openingsDisplay} (Deadline: {primaryRole.deadlineDisplay})
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAction}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-extrabold font-sans bg-amber-300 hover:bg-amber-400 text-slate-950 shadow-xs transition-all cursor-pointer"
          >
            <span>CHECK ELIGIBILITY</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close notification"
            className="p-1 rounded-md hover:bg-slate-100/10 text-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Bookmark, Sparkles, X, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MyCareerContextBarProps {
  selectedDegreeName: string | null;
  exploredCount: number;
  savedCount: number;
  jobsViewedCount: number;
  onOpenShortlist: () => void;
}

export const MyCareerContextBar: React.FC<MyCareerContextBarProps> = ({
  selectedDegreeName,
  exploredCount,
  savedCount,
  jobsViewedCount,
  onOpenShortlist,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!selectedDegreeName && exploredCount === 0) return null;

  return (
    <>
      {/* Desktop Floating Right Panel */}
      <aside className="hidden lg:block fixed bottom-6 right-6 z-40 w-72 rounded-2xl bg-[#0B152C]/95 backdrop-blur-md border border-slate-700/80 shadow-2xl p-4 tone-dark text-slate-100 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider">MY CAREER RESEARCH</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300">
            {selectedDegreeName || "B.Pharm"}
          </span>
        </div>

        <div className="py-3 space-y-2 font-sans text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Careers Explored:</span>
            <span className="font-mono font-bold text-slate-100">{exploredCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Careers Saved:</span>
            <span className="font-mono font-bold text-emerald-400">{savedCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Jobs Viewed:</span>
            <span className="font-mono font-bold text-sky-400">{jobsViewedCount || 5}</span>
          </div>
        </div>

        <Button
          onClick={onOpenShortlist}
          className="w-full h-9 rounded-xl bg-slate-900 hover:bg-sky-500/10 text-sky-400 border border-slate-700 hover:border-sky-400/40 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>View My Shortlist</span>
        </Button>
      </aside>

      {/* Mobile Sticky Compact Pill */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm rounded-full bg-[#0B152C]/95 backdrop-blur-md border border-slate-700/80 shadow-2xl p-2.5 px-4 text-slate-100 flex items-center justify-between tone-dark animate-in slide-in-from-bottom-2 duration-200">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold text-slate-100">
            {selectedDegreeName || "B.Pharm"} • {savedCount} Saved
          </span>
        </div>
        <button
          onClick={onOpenShortlist}
          className="py-1 px-3 rounded-full bg-amber-400 text-slate-950 font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer"
        >
          Shortlist
        </button>
      </div>
    </>
  );
};

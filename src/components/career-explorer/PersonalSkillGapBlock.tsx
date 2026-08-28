import React from "react";
import { Wrench, ShieldCheck, ArrowRight, Calendar, FlaskConical, ChevronRight } from "lucide-react";

interface PersonalSkillGapBlockProps {
  targetRoleTitle: string;
  /** Gaps passed from JobMatchEngine — role-specific, not PV-hardcoded */
  priorityGaps?: string[];
  onContinueToWhatsApp: () => void;
  onTryAssay?: () => void;
}

// Default 30-day week labels
const WEEK_LABELS = ["Week 1", "Week 2", "Week 3"];

// Generic fallback gaps if somehow no gaps are provided
const FALLBACK_GAPS = [
  "Industry-specific software training (check role tools above)",
  "Regulatory framework knowledge for your target career path",
  "Practical workflow understanding from active JDs",
];

export const PersonalSkillGapBlock: React.FC<PersonalSkillGapBlockProps> = ({
  targetRoleTitle,
  priorityGaps,
  onContinueToWhatsApp,
  onTryAssay,
}) => {
  const gaps = priorityGaps?.length ? priorityGaps : FALLBACK_GAPS;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B152C] border border-slate-800 space-y-6 text-left shadow-2xl">

      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-4">
        <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-400/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
          <Calendar className="w-3.5 h-3.5" /> 30-Day Targeted Roadmap
        </span>
        <h3 className="font-serif text-xl sm:text-3xl font-bold text-slate-50">
          What stands between you and{" "}
          <span className="italic text-sky-300">{targetRoleTitle.split(" /")[0]}</span>?
        </h3>
        <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-2xl">
          You don't need to learn everything. Focus first on the{" "}
          <strong className="text-slate-100">exact 3 skills</strong> most frequently tested
          in active job descriptions for this role — derived from JD analysis.
        </p>
      </div>

      {/* Priority Gap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gaps.slice(0, 3).map((gap, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-3 flex flex-col justify-between hover:border-sky-500/40 transition-colors group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-400">{WEEK_LABELS[i]} Focus</span>
                <Wrench className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-100 leading-snug">{gap}</h4>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified from active JDs</span>
            </div>
          </div>
        ))}
      </div>

      {/* ASSAY Test CTA */}
      {onTryAssay && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-[#070D1B] border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Ready to test yourself?
              </span>
            </div>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              Try the ASSAY™ diagnostic — the exact type of practical screening task companies
              give for this role. Your advisor will review it before your call.
            </p>
          </div>
          <button
            onClick={onTryAssay}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            <FlaskConical className="w-4 h-4" />
            Try ASSAY Test
          </button>
        </div>
      )}

      {/* Save Map CTA */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0C1938] to-[#070D1B] border border-sky-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-base font-bold text-slate-100">
            Save Your Career Map & 30-Day Skill Roadmap
          </h4>
          <p className="font-sans text-xs text-slate-300">
            We'll send your explored careers, requirement coverage score, and priority gaps to your WhatsApp within 2 hours.
          </p>
        </div>
        <button
          onClick={onContinueToWhatsApp}
          className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Save My Career Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

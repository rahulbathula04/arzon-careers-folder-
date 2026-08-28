import type { MatchBreakdown } from "@/data/liveOpportunities";

interface MatchScoreBreakdownProps {
  overallMatch: number;
  breakdown: MatchBreakdown;
  className?: string;
}

export function MatchScoreBreakdown({
  overallMatch,
  breakdown,
  className = "",
}: MatchScoreBreakdownProps) {
  const getScoreBadgeText = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Strong Alignment";
    return "Target Fit";
  };

  return (
    <div className={`rounded-xl border border-stone-200 bg-stone-50/90 p-5 space-y-4 shadow-xs ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 pb-3.5 border-b border-stone-200">
        <div className="space-y-1">
          <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Compatibility Score Breakdown
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 bg-emerald-100 text-emerald-950">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
            {getScoreBadgeText(overallMatch)}
          </span>
        </div>

        <div className="text-right">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{overallMatch}%</span>
          <span className="block text-[10px] font-mono font-bold uppercase text-stone-500">Overall Match</span>
        </div>
      </div>

      {/* Sub-Factor Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        {/* Factor 1: Skills */}
        <div className="space-y-1.5 bg-white card-light p-2.5 rounded-lg border border-stone-200/80">
          <div className="flex justify-between items-center text-[11px] font-sans text-slate-900 font-bold">
            <span>Skills Match</span>
            <span className="font-mono text-emerald-700">{breakdown.skillsMatch}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: `${breakdown.skillsMatch}%` }} />
          </div>
        </div>

        {/* Factor 2: Role Fit */}
        <div className="space-y-1.5 bg-white card-light p-2.5 rounded-lg border border-stone-200/80">
          <div className="flex justify-between items-center text-[11px] font-sans text-slate-900 font-bold">
            <span>Role Fit</span>
            <span className="font-mono text-[#1B3F8B]">{breakdown.roleFit}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-[#1B3F8B] rounded-full" style={{ width: `${breakdown.roleFit}%` }} />
          </div>
        </div>

        {/* Factor 3: Education */}
        <div className="space-y-1.5 bg-white card-light p-2.5 rounded-lg border border-stone-200/80">
          <div className="flex justify-between items-center text-[11px] font-sans text-slate-900 font-bold">
            <span>Education</span>
            <span className="font-mono text-emerald-700">{breakdown.educationMatch}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: `${breakdown.educationMatch}%` }} />
          </div>
        </div>

        {/* Factor 4: Experience */}
        <div className="space-y-1.5 bg-white card-light p-2.5 rounded-lg border border-stone-200/80">
          <div className="flex justify-between items-center text-[11px] font-sans text-slate-900 font-bold">
            <span>Experience</span>
            <span className="font-mono text-[#1B3F8B]">{breakdown.experienceMatch}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-[#1B3F8B] rounded-full" style={{ width: `${breakdown.experienceMatch}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}


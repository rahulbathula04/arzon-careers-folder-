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
    if (score >= 80) return "Strong Match";
    return "Moderate Match";
  };

  return (
    <div className={`tone-light rounded-xl border border-stone-200 bg-stone-50 p-5 space-y-4 ${className}`}>
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-stone-200">
        <div>
          <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Compatibility Score Breakdown
          </span>
          <span className="inline-block mt-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 bg-emerald-100 text-emerald-900">
            {getScoreBadgeText(overallMatch)}
          </span>
        </div>

        <div className="text-right">
          <span className="font-serif text-3xl font-bold text-stone-900">{overallMatch}%</span>
          <span className="block text-[10px] font-mono text-stone-500">Overall Match</span>
        </div>
      </div>

      {/* Sub-Factor Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px] font-sans text-stone-700 font-semibold">
            <span>Skills Match</span>
            <span className="font-mono font-bold text-emerald-700">{breakdown.skillsMatch}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${breakdown.skillsMatch}%` }} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px] font-sans text-stone-700 font-semibold">
            <span>Role Fit</span>
            <span className="font-mono font-bold text-[#1B3F8B]">{breakdown.roleFit}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-[#1B3F8B] rounded-full" style={{ width: `${breakdown.roleFit}%` }} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px] font-sans text-stone-700 font-semibold">
            <span>Education</span>
            <span className="font-mono font-bold text-emerald-700">{breakdown.educationMatch}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${breakdown.educationMatch}%` }} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px] font-sans text-stone-700 font-semibold">
            <span>Experience</span>
            <span className="font-mono font-bold text-[#1B3F8B]">{breakdown.experienceMatch}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
            <div className="h-full bg-[#1B3F8B] rounded-full" style={{ width: `${breakdown.experienceMatch}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

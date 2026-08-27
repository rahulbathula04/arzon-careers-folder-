import { ShieldCheck, CheckCircle2, UserCheck } from "lucide-react";

interface CandidateProfileIntelligenceProps {
  candidateName?: string;
  acriScore?: number;
  tierLabel?: string;
  verifiedSkills?: string[];
  matchedCount?: number;
}

export function CandidateProfileIntelligence({
  candidateName = "Your Profile",
  acriScore = 94,
  tierLabel = "Executive Tier-1",
  verifiedSkills = ["Python", "PyTorch", "SQL", "Power BI", "Statistics"],
  matchedCount = 12,
}: CandidateProfileIntelligenceProps) {
  return (
    <div className="tone-light rounded-2xl border border-stone-300/80 bg-white p-5 sm:p-6 shadow-sm text-stone-900 space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 flex items-center justify-center text-[#1B3F8B]">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                Profile Match Intelligence
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                <ShieldCheck className="h-3 w-3 text-emerald-700" /> VERIFIED
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5">
              {candidateName} · <span className="text-stone-600 font-sans text-sm font-normal">{tierLabel}</span>
            </h3>
          </div>
        </div>

        {/* ACRI Badge & Match Counter */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-mono text-stone-500 uppercase block">ACRI Score</span>
            <span className="font-serif text-2xl font-bold text-[#1B3F8B]">
              {acriScore} <span className="text-xs font-mono text-stone-400">/ 100</span>
            </span>
          </div>
          <div className="h-8 w-px bg-stone-200" />
          <div className="text-right">
            <span className="text-xs font-mono text-stone-500 uppercase block">Matched Roles</span>
            <span className="font-serif text-2xl font-bold text-emerald-700">{matchedCount}</span>
          </div>
        </div>
      </div>

      {/* Verified Skills Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono font-bold text-stone-500 uppercase text-[11px]">Verified Stack:</span>
          {verifiedSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-stone-200 bg-stone-50 font-mono text-stone-800 text-[11px]"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              {skill}
            </span>
          ))}
        </div>

        <span className="font-sans text-stone-500 text-xs">
          Matched using your ACRI benchmark and role preferences.
        </span>
      </div>
    </div>
  );
}

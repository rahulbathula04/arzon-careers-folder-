import { CheckCircle2, Sparkles, MapPin, Users, ChevronRight, Check } from "lucide-react";
import type { LiveRoleBrief } from "@/data/liveOpportunities";

interface OpportunityCardProps {
  opportunity: LiveRoleBrief;
  isSelected: boolean;
  onSelect: () => void;
}

export function OpportunityCard({
  opportunity,
  isSelected,
  onSelect,
}: OpportunityCardProps) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      aria-label={`${opportunity.role} at ${opportunity.employer}, ${opportunity.overallMatch}% match`}
      aria-pressed={isSelected}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`relative p-5 rounded-2xl transition-all duration-200 cursor-pointer select-none border ${
        isSelected
          ? "border-2 border-[#1B3F8B] bg-white shadow-xl ring-4 ring-[#1B3F8B]/10 translate-x-1"
          : "border-stone-200/90 bg-white hover:border-stone-400 hover:shadow-md"
      } focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] focus:ring-offset-2`}
    >
      {/* Active Indicator Bar on left edge */}
      {isSelected && (
        <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#1B3F8B] rounded-r-full" />
      )}

      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#1B3F8B] uppercase tracking-wider block truncate">
              {opportunity.employer}
            </span>
            {isSelected && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#1B3F8B]/10 text-[#1B3F8B] font-mono text-[10px] font-bold uppercase">
                <Check className="w-3 h-3 stroke-[3]" /> Selected
              </span>
            )}
          </div>
          <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug tracking-tight">
            {opportunity.role}
          </h3>
        </div>

        {/* Match Badge */}
        <div className="shrink-0 text-right">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-xs font-bold border shadow-xs ${
            opportunity.overallMatch >= 90
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : "border-sky-300 bg-sky-50 text-sky-900"
          }`}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {opportunity.overallMatch}% Match
          </span>
        </div>
      </div>

      {/* CTC & Location Row */}
      <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs font-mono text-stone-500 uppercase">CTC</span>
          <span className="font-mono font-bold text-slate-900 text-base">
            {opportunity.ctcDisplay}
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-stone-600">
          <span className="flex items-center gap-1 font-semibold">
            <Users className="h-3.5 w-3.5 text-[#1B3F8B]" />
            {opportunity.openingsCount} Openings
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-stone-400" />
            {opportunity.location}
          </span>
        </div>
      </div>

      {/* Matching Skill Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {opportunity.matchingSkills.slice(0, 3).map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-slate-200 bg-slate-50 font-mono text-slate-800 font-medium text-[11px]"
          >
            <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
            {skill}
          </span>
        ))}
        {opportunity.gapSkills.length > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-amber-300/80 bg-amber-50 text-[11px] font-mono text-amber-900 font-medium">
            <Sparkles className="h-3 w-3 text-amber-600 shrink-0" />
            +{opportunity.gapSkills.length} to strengthen
          </span>
        )}
      </div>

      {/* Footer Action Strip */}
      <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono">
        <span className={opportunity.status === "CLOSING_SOON" ? "text-amber-700 font-bold flex items-center gap-1" : "text-emerald-700 font-bold flex items-center gap-1"}>
          <span className={`h-1.5 w-1.5 rounded-full ${opportunity.status === "CLOSING_SOON" ? "bg-amber-500" : "bg-emerald-500"}`} />
          {opportunity.status === "CLOSING_SOON" ? "Closing Soon — Priority Review" : "Accepting Applications"}
        </span>
        <span className={`flex items-center gap-1 font-bold transition-all ${
          isSelected ? "text-[#1B3F8B] underline" : "text-stone-600 group-hover:text-[#1B3F8B]"
        }`}>
          View Match Specs <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}


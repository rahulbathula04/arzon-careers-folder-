import { CheckCircle2, Sparkles, MapPin, Users } from "lucide-react";
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
      className={`tone-light relative p-5 rounded-2xl border transition-all cursor-pointer select-none text-stone-900 ${
        isSelected
          ? "border-[#1B3F8B] bg-[#1B3F8B]/5 shadow-md ring-2 ring-[#1B3F8B]/20"
          : "border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm"
      } focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] focus:ring-offset-2`}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <span className="font-mono text-[11px] font-bold text-[#1B3F8B] uppercase tracking-wider block truncate">
            {opportunity.employer}
          </span>
          <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
            {opportunity.role}
          </h3>
        </div>

        {/* Match Badge */}
        <div className="shrink-0 text-right">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-emerald-300 bg-emerald-100 text-emerald-900 font-mono text-xs font-bold">
            {opportunity.overallMatch}% Match
          </span>
        </div>
      </div>

      {/* Salary & Openings Bar */}
      <div className="mt-3 pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between text-xs text-stone-700 font-sans gap-2">
        <span className="font-bold text-stone-900 font-serif text-base">
          {opportunity.ctcDisplay}
        </span>
        <div className="flex items-center gap-3 font-mono text-[11px] text-stone-500">
          <span className="flex items-center gap-1">
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
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-stone-200 bg-stone-50 font-mono text-stone-700 text-[11px]"
          >
            <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
            {skill}
          </span>
        ))}
        {opportunity.gapSkills.length > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-amber-200 bg-amber-50 text-[11px] font-mono text-amber-900">
            <Sparkles className="h-3 w-3 text-amber-600 shrink-0" />
            +{opportunity.gapSkills.length} to strengthen
          </span>
        )}
      </div>

      {/* Footer Status — only shown when open */}
      {opportunity.status === "OPEN" || opportunity.status === "CLOSING_SOON" ? (
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-stone-500">
          <span className={opportunity.status === "CLOSING_SOON" ? "text-amber-700 font-semibold" : "text-emerald-700 font-semibold"}>
            {opportunity.status === "CLOSING_SOON" ? "Closing Soon — Apply Now" : "Accepting Applications"}
          </span>
          <span className="flex items-center gap-1 text-[#1B3F8B] font-bold">
            View Details →
          </span>
        </div>
      ) : null}
    </div>
  );
}

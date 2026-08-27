import { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles, Building2, MapPin, Users, ShieldCheck } from "lucide-react";
import type { LiveRoleBrief } from "@/data/liveOpportunities";
import { MatchScoreBreakdown } from "./MatchScoreBreakdown";
import { QuickLeadRegisterModal } from "@/components/landing/QuickLeadRegisterModal";

interface OpportunityDetailPanelProps {
  opportunity: LiveRoleBrief;
}

export function OpportunityDetailPanel({ opportunity }: OpportunityDetailPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="tone-light rounded-2xl border border-stone-300/80 bg-white shadow-sm sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="p-6 sm:p-8 space-y-7">
        {/* Role Header */}
        <div className="space-y-3 pb-5 border-b border-stone-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#1B3F8B]" />
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                {opportunity.employer}
              </span>
            </div>

            <span className="font-mono text-xs text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" /> {opportunity.routingSla}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
            {opportunity.role}
          </h2>

          {/* Metadata Strip */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-600 pt-1">
            <span className="font-serif text-xl font-bold text-stone-900">
              {opportunity.ctcDisplay}
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-[#1B3F8B]" />
              {opportunity.openingsCount} Open Slots
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-stone-400" />
              {opportunity.location}
            </span>
          </div>
        </div>

        {/* Multi-Factor Match Score Breakdown */}
        <MatchScoreBreakdown
          overallMatch={opportunity.overallMatch}
          breakdown={opportunity.matchBreakdown}
        />

        {/* Why You Match & Gap Skills */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
            Why You Match This Role
          </h4>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Matched Skills */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-2">
              <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase block">
                Strong Alignment ({opportunity.matchingSkills.length} skills)
              </span>
              <div className="space-y-1.5">
                {opportunity.matchingSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-800 font-sans font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap Skills to Strengthen */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2">
              <span className="text-[11px] font-mono font-bold text-amber-900 uppercase block">
                To Strengthen ({opportunity.gapSkills.length})
              </span>
              <div className="space-y-1.5">
                {opportunity.gapSkills.length > 0 ? (
                  opportunity.gapSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-800 font-sans font-medium">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-emerald-700 font-sans font-medium">No critical gaps identified.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="space-y-2 p-4 rounded-xl border border-stone-200 bg-stone-50/80">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Eligibility
          </span>
          <p className="text-xs text-stone-800 font-sans leading-relaxed font-medium">
            {opportunity.eligibility}
          </p>
        </div>

        {/* Hiring Process */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500">
            Interview & Selection Steps
          </h4>
          <div className="space-y-2">
            {opportunity.hiringSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-stone-800 font-sans p-3 rounded-xl border border-stone-200 bg-stone-50/80">
                <span className="h-5 w-5 rounded-full bg-[#1B3F8B] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-medium">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What Happens After You Apply */}
        <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/80 space-y-1 text-xs font-sans">
          <span className="font-mono font-bold text-stone-700 uppercase block text-[11px]">
            What happens after you apply?
          </span>
          <p className="text-stone-700 leading-relaxed font-medium">
            Arzon routes your verified ACRI score and code portfolio to the hiring manager for this role within 24 hours.
          </p>
        </div>

        {/* Primary Action CTA */}
        <div className="pt-1 pb-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-12 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] focus:ring-offset-2"
          >
            Apply for this role <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <QuickLeadRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTrack={opportunity.role}
      />
    </div>
  );
}

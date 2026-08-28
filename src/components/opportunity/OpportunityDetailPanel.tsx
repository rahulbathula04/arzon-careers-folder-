import { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles, Building2, MapPin, Users, ShieldCheck, Clock, Award, Check } from "lucide-react";
import type { LiveRoleBrief } from "@/data/liveOpportunities";
import { MatchScoreBreakdown } from "./MatchScoreBreakdown";
import { QuickLeadRegisterModal } from "@/components/landing/QuickLeadRegisterModal";

interface OpportunityDetailPanelProps {
  opportunity: LiveRoleBrief;
}

export function OpportunityDetailPanel({ opportunity }: OpportunityDetailPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-stone-300 bg-white card-light shadow-lg sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="p-6 sm:p-8 space-y-7">
        {/* Role Header */}
        <div className="space-y-4 pb-6 border-b border-stone-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1B3F8B]/10 text-[#1B3F8B] font-bold">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                {opportunity.employer}
              </span>
            </div>

            <span className="font-mono text-xs text-emerald-900 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
              {opportunity.routingSla}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
            {opportunity.role}
          </h2>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-stone-200 bg-stone-50/80">
            <div>
              <span className="text-[10px] font-mono text-stone-500 uppercase block">Compensation</span>
              <span className="font-mono text-base sm:text-lg font-bold text-slate-900">
                {opportunity.ctcDisplay}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-stone-500 uppercase block">Openings</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Users className="h-3.5 w-3.5 text-[#1B3F8B]" />
                {opportunity.openingsCount} Open Slots
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-stone-500 uppercase block">Location / Work Type</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                {opportunity.location}
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Factor Match Score Breakdown */}
        <MatchScoreBreakdown
          overallMatch={opportunity.overallMatch}
          breakdown={opportunity.matchBreakdown}
        />

        {/* Why You Match & Gap Skills */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-[#1B3F8B]" />
            Why You Match This Role
          </h4>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Matched Skills */}
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/80 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                <span className="text-[11px] font-mono font-bold text-emerald-900 uppercase">
                  Strong Alignment
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-100">
                  {opportunity.matchingSkills.length} Skills
                </span>
              </div>
              <div className="space-y-2">
                {opportunity.matchingSkills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-900 font-sans font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gap Skills to Strengthen */}
            <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/80 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                <span className="text-[11px] font-mono font-bold text-amber-950 uppercase">
                  To Strengthen
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-900 px-2 py-0.5 rounded bg-amber-100">
                  {opportunity.gapSkills.length} Target
                </span>
              </div>
              <div className="space-y-2">
                {opportunity.gapSkills.length > 0 ? (
                  opportunity.gapSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-900 font-sans font-semibold">
                      <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-emerald-800 font-sans font-semibold flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" /> No critical skill gaps identified.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Requirements */}
        <div className="space-y-2 p-4 rounded-xl border border-stone-200 bg-stone-50/90">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Cohort Eligibility
          </span>
          <p className="text-xs text-slate-900 font-sans leading-relaxed font-semibold">
            {opportunity.eligibility}
          </p>
        </div>

        {/* Hiring Process */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#1B3F8B]" />
            Interview & Direct Selection Stages
          </h4>
          <div className="grid gap-2">
            {opportunity.hiringSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-slate-900 font-sans p-3 rounded-xl border border-stone-200 bg-stone-50/80 font-semibold hover:border-stone-300 transition-colors">
                <span className="h-6 w-6 rounded-full bg-[#1B3F8B] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Guarantee Box */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 space-y-1 text-xs font-sans">
          <span className="font-mono font-bold text-[#1B3F8B] uppercase block text-[11px]">
            Direct Desk Fast-Track Guarantee
          </span>
          <p className="text-slate-800 leading-relaxed font-medium">
            Arzon routes your verified ACRI benchmark scorecard and code portfolio directly to the enterprise hiring team within 24 hours of cohort qualification.
          </p>
        </div>

        {/* Primary Action CTA */}
        <div className="pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-13 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-white text-sm font-bold font-sans flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] focus:ring-offset-2 cursor-pointer"
          >
            Apply for Fast-Track Intake <ArrowRight className="h-4 w-4" />
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


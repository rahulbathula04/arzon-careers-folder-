import React from "react";
import { ArrowRight, Clock, Building2, UserCheck, Calendar, DollarSign } from "lucide-react";
import { LiveOpportunitiesData } from "@/data/liveOpportunities";
import { GOOGLE_FORM_URL } from "./constants";
import { trackEvent } from "@/lib/analytics";

const LIVE_OPPORTUNITIES = LiveOpportunitiesData.ROLES.map((r) => ({
  id: r.id,
  role: r.role,
  employer: r.employer,
  logoBadge: r.partnerBadge,
  openings: r.openingsDisplay,
  eligibility: r.eligibility,
  ctc: r.ctcDisplay,
  deadline: r.deadlineDisplay,
  status: r.status,
  urgencyLabel: r.urgencyLabel,
  skills: r.skills,
  trackSlug: r.trackSlug,
}));

export function LiveOpportunityBoard() {
  const totalRoles = LiveOpportunitiesData.METADATA.totalActiveRoles;

  const handleCheckEligibility = (opportunity: (typeof LIVE_OPPORTUNITIES)[number]) => {
    trackEvent("check_eligibility_click", { role: opportunity.role, employer: opportunity.employer });
    
    const quizEl = document.getElementById("eligibility-quiz") || document.getElementById("apply");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(GOOGLE_FORM_URL, "_blank");
    }
  };

  return (
    <section
      id="live-opportunity-board"
      aria-labelledby="opportunity-board-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"
    >
      <div className="mx-auto max-w-[1200px] space-y-12">
        {/* Header & Data System Metadata */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#0F2942] uppercase block">
              LIVE HIRING BOARD · ACTUAL EMPLOYER REQUIREMENTS
            </span>
            <h2
              id="opportunity-board-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F2942] tracking-tight leading-tight"
            >
              Live Opportunities Right Now.{" "}
              <span className="italic font-normal text-[#1B3F8B]">Check whether your profile qualifies.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed pt-1">
              Arzon candidates are evaluated and routed directly against actual employer job briefs. Stop guessing what employers want — check your eligibility for current active hiring pipelines.
            </p>
          </div>

          <div className="shrink-0 bg-white card-light px-4 py-3 rounded-lg border border-stone-200 shadow-2xs font-mono text-xs space-y-1">
            <div className="flex items-center gap-2 text-[#0F2942] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 motion-safe:animate-pulse shrink-0" />
              <span>{totalRoles}+ Live Roles Across Network</span>
            </div>
            <p className="text-[11px] text-stone-500">Updated today · Direct partner desk intake</p>
          </div>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {LIVE_OPPORTUNITIES.map((opp) => (
            <div
              key={opp.id}
              className="bg-white card-light rounded-xl border border-stone-200 p-6 flex flex-col justify-between space-y-6 shadow-2xs hover:border-stone-300 transition-colors"
            >
              <div className="space-y-5">
                {/* Header Badge Strip */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <span className="px-2 py-0.5 rounded bg-[#0F2942] text-slate-50 font-mono text-[10px] font-bold uppercase tracking-wider">
                    {opp.logoBadge}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold border ${
                      opp.status === "CLOSING_SOON"
                        ? "bg-amber-50 text-amber-900 border-amber-200"
                        : "bg-emerald-50 text-emerald-900 border-emerald-200"
                    }`}
                  >
                    {opp.urgencyLabel}
                  </span>
                </div>

                {/* Role Title & Employer */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-stone-500">
                    <span className="font-bold uppercase tracking-wider">{opp.employer}</span>
                    <span className="text-[10px] uppercase">ID: {opp.id}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2942] tracking-tight mt-1">
                    {opp.role}
                  </h3>
                </div>

                {/* Structured Metadata List */}
                <div className="space-y-2 py-3 border-y border-stone-100 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-mono text-[11px]">Openings</span>
                    <span className="font-bold text-stone-900">{opp.openings}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-mono text-[11px]">CTC / Compensation</span>
                    <span className="font-bold text-emerald-800">{opp.ctc}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-stone-500 font-mono text-[11px] block">Eligibility</span>
                    <span className="font-medium text-stone-800">{opp.eligibility}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-stone-500 font-mono text-[11px] block">Target Application Window</span>
                    <span className="font-bold text-stone-900">Deadline: {opp.deadline}</span>
                  </div>
                </div>

                {/* Target Employer Requirements */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Target Employer Requirements:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-stone-50 text-stone-800 rounded font-mono text-[11px] font-medium border border-stone-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleCheckEligibility(opp)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#0F2942] hover:bg-[#153270] shadow-2xs transition-all cursor-pointer group"
                >
                  <span>CHECK MY ELIGIBILITY</span>
                  <ArrowRight className="w-4 h-4 text-slate-50 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-[10px] text-center text-stone-500 font-mono mt-2">
                  Free eligibility check · Takes under 2 mins
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Banner Callout */}
        <div className="bg-white card-light rounded-xl border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#0F2942]">
              Don't see your exact role listed here?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Our certified partner desk regularly receives updated hiring briefs across Data Science, AI/ML, and Full-Stack Engineering.
            </p>
          </div>
          <button
            onClick={() => {
              const quizEl = document.getElementById("eligibility-quiz") || document.getElementById("apply");
              if (quizEl) quizEl.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans font-bold text-xs sm:text-sm text-[#0F2942] bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-all shrink-0 cursor-pointer"
          >
            <span>SUBMIT GENERAL ELIGIBILITY CHECK</span>
            <ArrowRight className="w-4 h-4 text-[#0F2942]" />
          </button>
        </div>
      </div>
    </section>
  );
}



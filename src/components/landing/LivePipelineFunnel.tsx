import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, FileCheck, Send, CalendarCheck, Briefcase, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { LiveOpportunitiesData } from "@/data/liveOpportunities";
import { trackEvent } from "@/lib/analytics";

export function LivePipelineFunnel() {
  const shouldReduceMotion = useReducedMotion();
  const m = LiveOpportunitiesData.COMPETITION_METRICS;

  const funnelStages = [
    {
      label: "Candidates Assessed",
      count: m.candidatesAssessed,
      icon: Users,
      badge: "EVALUATION PERIOD",
      desc: "Unique candidates who completed the readiness assessment",
      color: "bg-slate-100 text-slate-800 border-slate-300",
    },
    {
      label: "Met Initial Criteria",
      count: m.candidatesMeetingCriteria,
      icon: FileCheck,
      badge: `${m.acceptRatePercent}% QUALIFIED`,
      desc: "Passed academic screening and initial score threshold",
      color: "bg-[#1B3F8B]/10 text-[#1B3F8B] border-[#1B3F8B]/30",
    },
    {
      label: "Submitted to Partner Desk",
      count: m.profilesSubmitted,
      icon: Send,
      badge: "PARTNER ROUTED",
      desc: "Verified dossiers sent directly to employer recruiters",
      color: "bg-emerald-50 text-emerald-900 border-emerald-300",
    },
    {
      label: "Interviews Scheduled",
      count: m.interviewsScheduled,
      icon: CalendarCheck,
      badge: "ACTIVE CALLS",
      desc: "Direct recruiter & hiring manager interviews confirmed",
      color: "bg-amber-50 text-amber-900 border-amber-300",
    },
    {
      label: "Current Active Openings",
      count: m.currentOpenings,
      icon: Briefcase,
      badge: "LIVE ROLES",
      desc: "JPMorgan Chase, HSBC, & Certified Partner intake",
      color: "bg-emerald-600 text-white border-emerald-700",
    },
  ];

  const handleAction = () => {
    trackEvent("pipeline_funnel_cta_click");
    const quizEl = document.getElementById("eligibility-quiz");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pipeline-funnel"
      aria-labelledby="funnel-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-300/80"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <PremiumChip variant="navy" size="md">
              LIVE CANDIDATE PIPELINE METRICS
            </PremiumChip>
            <h2
              id="funnel-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"
            >
              Not Everyone Makes It Through.{" "}
              <span className="italic text-[#1B3F8B]">Find out if your profile qualifies.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              We track real candidate competition through every stage of our evaluation and submission pipeline. Stop guessing — see where candidates stand in the current intake window.
            </p>
          </div>

          {/* Audit Timestamp Badge */}
          <div className="shrink-0 bg-white p-4 rounded-2xl border border-stone-300 shadow-xs space-y-1.5 font-mono text-xs text-stone-700">
            <div className="flex items-center gap-2 text-[#1B3F8B] font-bold">
              <Clock className="w-4 h-4 text-[#1B3F8B]" />
              <span>DATA UPDATED: {m.lastUpdated}</span>
            </div>
            <p className="text-[11px] text-stone-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Source: {m.source}</span>
            </p>
          </div>
        </div>

        {/* Visual 5-Stage Funnel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {funnelStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden transition-all ${stage.color}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-white/40 backdrop-blur-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[9px] font-extrabold px-2 py-0.5 rounded bg-black/10">
                      {stage.badge}
                    </span>
                  </div>

                  <div>
                    <div className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {stage.count.toLocaleString()}
                    </div>
                    <h3 className="font-sans font-bold text-xs sm:text-sm mt-1 leading-snug">
                      {stage.label}
                    </h3>
                  </div>
                </div>

                <p className="text-[11px] opacity-80 leading-relaxed font-sans border-t border-black/10 pt-3">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Qualification Callout */}
        <div className="bg-white rounded-2xl border border-stone-300 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-xs font-bold uppercase text-[#1B3F8B]">
              QUALIFICATION SCARCITY
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
              64% of applicants do not pass initial screening. Know your score today.
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Free 3-minute candidate fit test · No payment required.
            </p>
          </div>

          <button
            onClick={handleAction}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-sans font-bold text-xs sm:text-sm text-white bg-[#1B3F8B] hover:bg-[#153270] shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer"
          >
            <span>TAKE FREE 3-MINUTE FIT TEST</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Sparkles, Building2, UserCheck, Calendar, DollarSign } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { LiveOpportunitiesData, LiveRoleBrief } from "@/data/liveOpportunities";
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
  urgencyLabel: r.urgencyLabel,
  skills: r.skills,
  trackSlug: r.trackSlug,
}));

export function LiveOpportunityBoard() {
  const shouldReduceMotion = useReducedMotion();

  const handleCheckEligibility = (opportunity: (typeof LIVE_OPPORTUNITIES)[number]) => {
    trackEvent("check_eligibility_click", { role: opportunity.role, employer: opportunity.employer });
    
    // Smooth scroll to apply section or open direct link
    const applyEl = document.getElementById("apply");
    if (applyEl) {
      applyEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(GOOGLE_FORM_URL, "_blank");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <section
      id="live-opportunity-board"
      aria-labelledby="opportunity-board-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] tone-light text-[#1A1A1A] border-b border-stone-300/80 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-bold text-emerald-900 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span>LIVE HIRING BOARD · ACTUAL EMPLOYER REQUIREMENTS</span>
            </div>
            <h2
              id="opportunity-board-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"
            >
              Live Opportunities Right Now.{" "}
              <span className="italic text-[#1B3F8B]">Check whether your profile qualifies.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              Arzon candidates are evaluated and routed directly against actual employer job briefs. Stop guessing what employers want — check your eligibility for current active hiring pipelines.
            </p>
          </div>

          <div className="shrink-0 bg-white p-4 rounded-xl border border-stone-300 shadow-xs space-y-1 font-mono text-xs text-stone-700">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>75+ Live Roles Across Network</span>
            </div>
            <p className="text-[11px] text-stone-500">Every day you wait, candidate profiles get routed first.</p>
          </div>
        </div>

        {/* Desktop Table & Mobile Cards */}
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="space-y-4"
        >
          {/* Opportunity Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LIVE_OPPORTUNITIES.map((opp) => (
              <motion.div
                key={opp.id}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { type: "spring", stiffness: 350 } }}
                className="rounded-2xl border border-stone-300 bg-white p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-4">
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold border bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-xs">
                    {opp.logoBadge}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border flex items-center gap-1 ${
                    opp.status === "CLOSING_SOON"
                      ? "bg-rose-50 text-rose-900 border-rose-300"
                      : "bg-emerald-50 text-emerald-900 border-emerald-300"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      opp.status === "CLOSING_SOON" ? "bg-rose-600" : "bg-emerald-600"
                    }`} />
                    {opp.urgencyLabel}
                  </span>
                </div>

                {/* Role Details */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase text-stone-500 tracking-wider">
                        {opp.employer}
                      </span>
                      <span className="font-mono text-[10px] text-stone-400 font-bold uppercase">
                        ID: {opp.id}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] tracking-tight mt-0.5">
                      {opp.role}
                    </h3>
                  </div>

                  {/* Grid Metadata */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-100 text-xs font-sans">
                    <div className="space-y-0.5">
                      <span className="text-stone-500 font-mono text-[11px] block">Openings</span>
                      <span className="font-bold text-stone-900 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#1B3F8B]" />
                        {opp.openings}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-stone-500 font-mono text-[11px] block">CTC / Compensation</span>
                      <span className="font-bold text-emerald-800 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        {opp.ctc}
                      </span>
                    </div>
                    <div className="col-span-2 space-y-0.5">
                      <span className="text-stone-500 font-mono text-[11px] block">Eligibility</span>
                      <span className="font-medium text-stone-800 flex items-start gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-stone-600 shrink-0 mt-0.5" />
                        {opp.eligibility}
                      </span>
                    </div>
                    <div className="col-span-2 space-y-0.5">
                      <span className="text-stone-500 font-mono text-[11px] block">Target Application Window</span>
                      <span className="font-bold text-stone-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        Deadline: {opp.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                      Target Employer Requirements:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 bg-stone-100 rounded text-[11px] font-mono font-medium text-stone-700 border border-stone-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => handleCheckEligibility(opp)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-sans font-bold text-xs sm:text-sm text-white bg-[#1B3F8B] hover:bg-[#153270] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span>CHECK MY ELIGIBILITY</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[10px] text-center text-stone-500 font-mono mt-2">
                    Free eligibility check · Takes under 2 mins
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Banner Callout */}
        <div className="bg-white rounded-2xl border border-stone-300 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
              Don't see your exact role listed here?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Our certified partner desk regularly receives updated hiring briefs across Data Science, AI/ML, and Full-Stack Engineering.
            </p>
          </div>
          <a
            href="#apply"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-stone-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <span>SUBMIT GENERAL ELIGIBILITY CHECK</span>
            <ArrowRight className="w-4 h-4 text-stone-900" />
          </a>
        </div>
      </div>
    </section>
  );
}

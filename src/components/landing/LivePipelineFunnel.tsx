import React from "react";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { LiveOpportunitiesData } from "@/data/liveOpportunities";
import { trackEvent } from "@/lib/analytics";

export function LivePipelineFunnel() {
  const m = LiveOpportunitiesData.COMPETITION_METRICS;

  const handleAction = () => {
    trackEvent("pipeline_funnel_cta_click");
    const quizEl = document.getElementById("eligibility-quiz") || document.getElementById("apply");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const metrics = [
    {
      label: "Candidates Assessed",
      value: m.candidatesAssessed.toLocaleString(),
      subtext: "Assessed in intake window",
      highlight: false,
    },
    {
      label: "Met Initial Criteria",
      value: m.candidatesMeetingCriteria.toLocaleString(),
      subtext: `${m.acceptRatePercent}% qualified score`,
      highlight: false,
    },
    {
      label: "Submitted to Partner Desk",
      value: m.profilesSubmitted.toLocaleString(),
      subtext: "Cleared for recruiter review",
      highlight: false,
    },
    {
      label: "Interviews Scheduled",
      value: m.interviewsScheduled.toLocaleString(),
      subtext: "Direct employer calls",
      highlight: false,
    },
    {
      label: "Current Active Openings",
      value: m.currentOpenings.toLocaleString(),
      subtext: "Live roles across network",
      highlight: true,
    },
  ];

  return (
    <section
      id="pipeline-funnel"
      aria-labelledby="funnel-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"
    >
      <div className="mx-auto max-w-[1200px] space-y-12">
        {/* Header & Data System Metadata */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#0F2942] uppercase block">
              LIVE CANDIDATE PIPELINE METRICS
            </span>
            <h2
              id="funnel-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#0F2942] tracking-tight leading-tight"
            >
              Not everyone makes it through.{" "}
              <span className="italic font-normal text-[#1B3F8B]">Find out if your profile qualifies.</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed pt-1">
              We track real candidate competition through every stage of our evaluation and submission pipeline. Stop guessing — see where candidates stand in the current intake window.
            </p>
          </div>

          <div className="shrink-0 bg-white card-light px-4 py-3 rounded-lg border border-stone-200 shadow-2xs font-mono text-xs space-y-1">
            <div className="flex items-center gap-2 text-[#0F2942] font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#1B3F8B] shrink-0" />
              <span>UPDATED: {m.lastUpdated}</span>
            </div>
            <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Source: {m.source}</span>
            </div>
          </div>
        </div>

        {/* Clean Editorial Funnel Data Strip */}
        <div className="bg-white card-light rounded-xl border border-stone-200 p-6 sm:p-8 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
            {metrics.map((item, idx) => (
              <div key={idx} className={`pt-4 sm:pt-0 ${idx !== 0 ? "sm:pl-6 lg:pl-8" : ""}`}>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
                    STAGE 0{idx + 1}
                  </span>
                  <div
                    className={`font-sans font-bold text-3xl sm:text-4xl tracking-tight ${
                      item.highlight ? "text-emerald-700" : "text-[#0F2942]"
                    }`}
                  >
                    {item.value}
                  </div>
                  <h3 className="font-sans font-semibold text-xs text-stone-800 leading-snug">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-sans pt-0.5">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unified Partner Desk & Qualification Callout Banner */}
        <div className="bg-[#0F2942] text-slate-50 rounded-xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                64% INITIAL SCREENING REJECTION
              </span>
              <span className="text-slate-400 text-xs font-mono">· No payment required</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-50 tracking-tight leading-snug">
              Submit Your Fit Report to the Certified Partner Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              Not everyone enters the partner review pipeline. Check whether your current profile meets the intake criteria before submitting. Hiring decisions remain strictly with the employer.
            </p>
          </div>

          <div className="shrink-0 space-y-2 w-full lg:w-auto text-center lg:text-right">
            <button
              onClick={handleAction}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-sans font-bold text-xs sm:text-sm text-[#0F2942] bg-white card-light hover:bg-slate-100 shadow-2xs transition-all cursor-pointer group"
            >
              <span>CHECK MY ELIGIBILITY</span>
              <ArrowRight className="w-4 h-4 text-[#0F2942] transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[10px] text-slate-400 font-mono block">
              Free eligibility check · Takes under 2 mins
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



import React from "react";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function LossPipelineComparisonBlock() {
  const handleAction = () => {
    trackEvent("loss_block_cta_click");
    const quizEl = document.getElementById("eligibility-quiz") || document.getElementById("apply");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const traditionalPath = [
    "Generic college resume with standard projects",
    "Applying to 100+ job portal listings",
    "Failing automated ATS or initial 15-min screening",
    "No feedback, zero callbacks, lost hiring window",
  ];

  const arzonPath = [
    "Target training against actual Tier-1 Enterprise & Quant job briefs",
    "Build bank-domain GitHub repos & capstone projects",
    "Pass internal 75/100 mock benchmark assessment",
    "Direct candidate routing via Certified Partner Desk",
  ];

  return (
    <section
      id="pipeline-choice"
      aria-labelledby="pipeline-choice-heading"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0F2942] border-b border-stone-200"
    >
      <div className="mx-auto max-w-[1200px] space-y-16">
        {/* Open Canvas Strategy Statement */}
        <div className="max-w-4xl space-y-6 pb-12 border-b border-stone-200">
          <span className="font-mono text-[11px] font-bold tracking-widest text-[#0F2942] uppercase block">
            THE ARZON POSITIONING
          </span>

          <h2
            id="pipeline-choice-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F2942] tracking-tight leading-tight"
          >
            The gap is not talent.{" "}
            <span className="italic font-normal text-stone-600 block sm:inline">
              It is preparation calibrated to the exact test, domain, and employer.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed max-w-3xl">
            Every day you wait, another candidate enters the partner review pipeline. You can keep sending cold resumes to job portals, or you can calibrate your skills directly against actual employer requirements.
          </p>

          {/* Clean Inline Strategy Formula */}
          <div className="pt-4 flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs font-semibold text-stone-700">
            <span className="text-[#0F2942] font-bold">TEST</span>
            <span className="text-stone-300">/</span>
            <span className="text-[#0F2942] font-bold">DOMAIN</span>
            <span className="text-stone-300">/</span>
            <span className="text-[#0F2942] font-bold">EMPLOYER</span>
            <span className="text-stone-400 font-sans font-normal mx-1">→</span>
            <span className="text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              CALIBRATED PREPARATION
            </span>
          </div>
        </div>

        {/* Editorial Pipeline Comparison */}
        <div className="space-y-10">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#1B3F8B] uppercase block">
              WHICH PIPELINE DO YOU WANT TO BE IN?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2942] tracking-tight">
              The Cost of Waiting vs. <span className="italic font-normal text-[#1B3F8B]">The Calibrated Fast-Track</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              The job doesn't wait for your resume to be ready. Compare the two paths available to you right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl">
            {/* Cold Applying Column */}
            <div className="bg-white card-light rounded-xl border border-stone-200 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xs">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-rose-800 tracking-wider flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    COLD APPLYING (IF YOU WAIT)
                  </span>
                  <span className="text-[10px] font-mono font-bold text-rose-700 uppercase bg-rose-50 px-2 py-0.5 rounded">
                    HIGH FRICTION
                  </span>
                </div>

                <ol className="space-y-3 font-sans text-xs sm:text-sm">
                  {traditionalPath.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-700 leading-snug">
                      <span className="font-mono font-bold text-stone-400 text-xs mt-0.5">0{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-4 border-t border-stone-100 font-mono text-xs text-rose-800 font-semibold">
                Outcome: Endless application cycle with 0 feedback
              </div>
            </div>

            {/* Arzon Pipeline Column */}
            <div className="bg-white card-light rounded-xl border border-emerald-300 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xs ring-1 ring-emerald-500/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="font-mono text-xs font-bold uppercase text-emerald-900 tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ARZON PIPELINE (IF YOU START NOW)
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                    PARTNER ROUTE
                  </span>
                </div>

                <ol className="space-y-3 font-sans text-xs sm:text-sm">
                  {arzonPath.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-900 font-medium leading-snug">
                      <span className="font-mono font-bold text-emerald-700 text-xs mt-0.5">0{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="pt-4 border-t border-stone-100 font-mono text-xs text-emerald-900 font-bold">
                Outcome: Profile submitted directly to employer decision makers
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 space-y-2">
            <div className="shrink-0">
              <button
                onClick={handleAction}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-sans font-bold text-xs sm:text-sm text-slate-50 bg-[#0F2942] hover:bg-[#153270] shadow-2xs transition-all cursor-pointer group"
              >
                <span>CHECK MY ELIGIBILITY</span>
                <ArrowRight className="w-4 h-4 text-slate-50 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="text-[11px] text-stone-500 font-mono block">
              Free eligibility check · Takes under 2 mins
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



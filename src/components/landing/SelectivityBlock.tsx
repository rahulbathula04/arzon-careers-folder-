import React from "react";
import { CheckCircle, XCircle, ShieldAlert } from "lucide-react";

/**
 * Section 3C — SelectivityBlock ("Can I Get In?")
 * Design: Off-white background (#FAF8F5), side-by-side suitability criteria
 * and selectivity rate stat to build exclusivity and trust.
 */
export function SelectivityBlock() {
  return (
    <section
      id="selectivity"
      aria-labelledby="selectivity-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            EXCLUSIVITY &amp; SELECTION CRITERIA
          </p>
          <h2
            id="selectivity-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Who should apply{" "}
            <span className="italic text-[#1B3F8B]">(and who should not).</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            We reject 64% of applicants. We do this because HSBC and JPMorgan expect qualified candidate profiles. Accepting everyone would destroy our recruitment partner status.
          </p>
        </div>

        {/* 2-Column Suitability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Who Should Apply */}
          <div className="rounded-2xl border border-emerald-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
              <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0" />
              <h3 className="font-serif text-xl font-bold text-stone-900">
                You should apply if you are:
              </h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-stone-700 font-sans">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span><strong>Final-year student or fresh graduate</strong> (B.Tech, B.E, MCA, B.Sc CS, Pharma, Biotech, Life Sciences).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span><strong>Targeting high-paying AI/ML or Clinical roles</strong> (₹6 LPA to ₹18 LPA starting package).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span><strong>Motivated to write production code</strong> and complete rigorous timed mock assessments.</span>
              </li>
            </ul>
          </div>

          {/* Who Should NOT Apply */}
          <div className="rounded-2xl border border-rose-200 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-rose-100 pb-4">
              <XCircle className="h-6 w-6 text-rose-600 shrink-0" />
              <h3 className="font-serif text-xl font-bold text-stone-900">
                This is NOT suitable for you if:
              </h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-stone-700 font-sans">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span><strong>Absolute beginners unwilling to code:</strong> You cannot learn AI without writing real Python.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span><strong>Expecting guaranteed offers without effort:</strong> Partner desks route candidates who pass internal benchmarks.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span><strong>Passive video watchers:</strong> If you only watch videos without submitting lab code, you will be dropped.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Selectivity Stat Banner */}
        <div className="rounded-2xl border border-stone-300 bg-white tone-light p-6 text-center space-y-2 max-w-4xl mx-auto">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B]">
            LAST COHORT ADMISSIONS DATA
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            2,184 Applications Received · 60 Candidates Selected (36% Acceptance Rate)
          </p>
        </div>
      </div>
    </section>
  );
}

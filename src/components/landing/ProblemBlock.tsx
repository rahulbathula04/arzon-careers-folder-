import React from "react";

/**
 * Section Three — The Problem
 * Design: Off-white background (#F2EFE9), slightly darker than the hero.
 * Dense editorial layout with a large pullout statistic (92%) in an enormous serif font.
 */
export function ProblemBlock() {
  return (
    <section
      id="the-problem"
      aria-labelledby="problem-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F2EFE9] text-[#1A1A1A] border-b border-stone-300/80"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B]">
            WHY TRADITIONAL APPLICATION PATHS FAIL
          </p>
          <h2
            id="problem-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"
          >
            Most AI graduates fail before the interview.{" "}
            <span className="italic text-[#1B3F8B]">Not because they're untalented. Because recruiters test skills that colleges never teach.</span>
          </h2>
        </div>

        {/* Visual Path Comparison Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          {/* Black Hole Path Card */}
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-red-200/80 pb-3">
              <span className="font-mono text-xs font-bold uppercase text-red-700 tracking-wider">
                ❌ THE TRADITIONAL PATH (COLD APPLYING)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-mono text-[10px] font-bold">
                92% REJECTED
              </span>
            </div>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-white tone-light rounded-xl border border-red-200 text-stone-700">
                1. College Degree &amp; Generic Resume
              </div>
              <div className="text-center text-red-400">↓</div>
              <div className="p-3 bg-white tone-light rounded-xl border border-red-200 text-stone-700">
                2. 200+ Applications on Job Portals
              </div>
              <div className="text-center text-red-400">↓</div>
              <div className="p-3 bg-red-100/80 rounded-xl border border-red-300 text-red-900 font-bold text-center">
                3. Automated ATS Filter / Black Hole Drop
              </div>
            </div>
          </div>

          {/* Arzon Pipeline Card */}
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50/50 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
              <span className="font-mono text-xs font-bold uppercase text-emerald-800 tracking-wider">
                ✓ THE ARZON CERTIFIED PIPELINE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
                RECRUITER READY
              </span>
            </div>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-white tone-light rounded-xl border border-emerald-200 text-stone-800">
                1. Skill Gap Audit &amp; Real Data Labs
              </div>
              <div className="text-center text-emerald-600 font-bold">↓</div>
              <div className="p-3 bg-white tone-light rounded-xl border border-emerald-200 text-stone-800">
                2. Verified Internship &amp; HackerRank Benchmark
              </div>
              <div className="text-center text-emerald-600 font-bold">↓</div>
              <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950 font-bold text-center">
                3. Partner Desk Submission → Hiring Manager Review
              </div>
            </div>
          </div>

        </div>

        {/* Three Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-2">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              ₹3.5 LPA
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Generic IT Roles Floor
            </p>
            <p className="text-xs text-stone-700 leading-normal">
              What generic IT roles pay fresh graduates in India today.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-2 border-l-4 border-l-[#1B3F8B]">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#1B3F8B]">
              ₹6–18 LPA
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1B3F8B]">
              HSBC &amp; JPMorgan Track
            </p>
            <p className="text-xs text-stone-700 leading-normal">
              What HSBC and JPMorgan pay AI/ML freshers. 2x to 5x higher. For people who pass Day 1.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-2">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              10 : 1
            </p>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-600">
              India GCC Talent Deficit
            </p>
            <p className="text-xs text-stone-700 leading-normal">
              Open GCC AI/ML roles per qualified engineer in India in 2026.
            </p>
          </div>
        </div>

        {/* Conclusion Paragraph */}
        <div className="rounded-2xl border border-stone-300 bg-[#F7F5F0] p-6 text-center max-w-3xl mx-auto">
          <p className="text-base sm:text-lg font-serif italic text-[#1A1A1A]">
            "The gap is not talent. It is preparation calibrated to the exact test, the exact domain, and the exact employer. That is what Arzon builds."
          </p>
        </div>
      </div>
    </section>
  );
}

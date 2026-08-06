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
            WHY MOST APPLICANTS FAIL BEFORE THE FIRST INTERVIEW
          </p>
          <h2
            id="problem-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.15]"
          >
            92% of AI/ML applicants fail HSBC's Day 1 HackerRank screening.{" "}
            <span className="italic text-[#1B3F8B]">Not because they cannot code. Because they studied the wrong things.</span>
          </h2>
        </div>

        {/* Pullout Stat & Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Large Pullout Stat */}
          <div className="lg:col-span-4 rounded-2xl border border-stone-300 bg-white tone-light p-8 space-y-3 text-center lg:text-left shadow-xs">
            <span className="font-serif text-7xl sm:text-8xl font-bold text-[#1B3F8B] block tracking-tight leading-none">
              92%
            </span>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-stone-700">
              Day 1 HackerRank Failure Rate
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Based on live HSBC &amp; JPMorgan fresher JD screening analytics across India GCC centres.
            </p>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-8 space-y-5 text-base sm:text-lg text-stone-800 leading-relaxed font-sans">
            <p>
              HSBC's GCC hiring process begins with a structured HackerRank assessment. It tests Python
              proficiency, data structures, algorithms, and applied ML reasoning. The test is not theoretical.
              It is production-oriented.
            </p>
            <p>
              Most candidates preparing through generic YouTube courses or Udemy certifications study content
              that does not match what HSBC's test actually asks. They know the concepts. They cannot solve
              the problems under time pressure in the exact format the test uses.
            </p>
            <p className="font-medium text-[#1A1A1A]">
              The result: 92% of applicants who pass the initial resume screen fail the Day 1 technical assessment.
              The talent exists. The preparation does not.
            </p>
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

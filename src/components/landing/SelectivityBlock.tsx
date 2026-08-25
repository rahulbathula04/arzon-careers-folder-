import React from "react";
import { CheckCircle, XCircle, ShieldAlert } from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";

/**
 * Section 3C — SelectivityBlock ("Can I Get In?")
 * Design: Off-white background (#FAF8F5), side-by-side suitability criteria
 * and selectivity rate stat to build exclusivity and trust.
 */
export function SelectivityBlock() {
  const eligibleGroups = [
    { title: "Freshers", badge: "✅ Eligible", desc: "No prior full-time corporate experience required." },
    { title: "Recent Graduates", badge: "✅ Eligible", desc: "Graduated in 2024, 2025, or upcoming 2026." },
    { title: "Final-Year Students", badge: "✅ Eligible", desc: "Currently in final semester or year of degree." },
  ];

  const skillFields = [
    "Artificial Intelligence & Machine Learning",
    "Python",
    "Data & Technology",
    "Related technical fields",
  ];

  return (
    <section
      id="selectivity"
      aria-labelledby="selectivity-heading"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A1A] border-b border-stone-200"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <PremiumChip variant="navy" size="md">
            ELIGIBILITY CRITERIA · JPMORGAN DATA ANALYST (₹14.0 LPA)
          </PremiumChip>
          <h2
            id="selectivity-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] tracking-tight leading-[1.18]"
          >
            Who Can Apply?
          </h2>
          <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
            Freshers, recent graduates, and final-year students are eligible for Tier-1 Enterprise Tech & Quant Fintech open Data Analyst positions (₹14.0 LPA CTC · Fill deadline: Sept 15).
          </p>
        </div>

        {/* 3-Column Who Can Apply Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {eligibleGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-emerald-300/80 bg-white tone-light p-6 space-y-3 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-600">✅</span>
                <span
                  style={{ color: "#065F46", backgroundColor: "#ECFDF5", borderColor: "#6EE7B7" }}
                  className="font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-xs"
                >
                  {group.badge}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                {group.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                {group.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Skills & Academic Exposure Card */}
        <div className="rounded-2xl border border-stone-300/80 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-sm max-w-4xl mx-auto">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 text-center">
            If you have skills or academic exposure in:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillFields.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-3 rounded-xl border border-stone-200 bg-[#F7F5F0] p-4 text-stone-800 font-medium text-sm sm:text-base"
              >
                <CheckCircle className="h-5 w-5 text-[#1B3F8B] shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 text-center">
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#1B3F8B] italic">
              "You don't need years of experience. You need to start."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

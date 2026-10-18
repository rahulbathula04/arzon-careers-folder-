import { Check, X, ShieldCheck, HelpCircle } from "lucide-react";

const FOR_YOU_ITEMS = [
  {
    degree: "B.Pharm Students & Graduates",
    detail: "Exploring non-sales pharmaceutical career options with long-term analytical growth.",
  },
  {
    degree: "M.Pharm Students & Graduates",
    detail: "Transitioning clinical pharmacology and pharmaceutics knowledge into drug safety operations.",
  },
  {
    degree: "Pharm.D Students & Graduates",
    detail: "Interested in medical safety review, causality assessment, and pharmacovigilance.",
  },
  {
    degree: "Life-Sciences Graduates",
    detail: "B.Sc/M.Sc biotechnology, biochemistry, and microbiology grads considering PV careers.",
  },
  {
    degree: "Entry-Level Job Seekers",
    detail: "Preparing to apply for Drug Safety Associate roles and wanting to understand the work first.",
  },
];

const NOT_FOR_YOU_ITEMS = [
  {
    title: "A Guaranteed Job or Placement",
    detail: "We provide role intelligence and practical skill insights, not placement shortcuts.",
  },
  {
    title: "Licensed Industry Software Access",
    detail: "Software access is not included unless explicitly confirmed for dedicated training cohorts.",
  },
  {
    title: "A Certificate as the Only Goal",
    detail: "This masterclass is designed for learning and direction, not passive certificate collecting.",
  },
  {
    title: "Full Job Readiness in 60 Minutes",
    detail: "A single session introduces the field; complete readiness requires sustained practical practice.",
  },
];

export function MasterclassAudience() {
  return (
    <section id="eligibility" className="py-16 sm:py-24 border-b border-[#E4EAF2] bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 text-[#1D4ED8] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <span>04 · Eligibility &amp; Expectations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-2 font-serif">
            Come with curiosity.{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              Leave with a clearer direction.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Transparent boundaries upfront so you know exactly what this educational masterclass delivers.
          </p>
        </div>

        {/* 2 Comparative Columns with Apple Bento Balance & Homepage Accents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: For You */}
          <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between tone-light card-light">
            {/* Emerald Micro Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#10B981] to-[#34D399]" />

            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center border border-[#A7F3D0] shrink-0">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#081F38]">
                    This session is for you if you are:
                  </h3>
                  <p className="text-xs text-[#059669] font-semibold">
                    Designed for aspiring healthcare safety candidates
                  </p>
                </div>
              </div>

              {/* Clean, Non-Cluttered List Rows */}
              <div className="divide-y divide-slate-100 mb-6">
                {FOR_YOU_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-start gap-3 group first:pt-0 last:pb-0"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      ✓
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-[#081F38]">{item.degree}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EEF6FF]/70 text-[#1D4ED8] border border-[#BFDBFE] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>No prior pharmacovigilance experience is required.</span>
              </div>
            </div>
          </div>

          {/* Card 2: NOT For You */}
          <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between tone-light card-light">
            {/* Rose Micro Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#F43F5E] to-[#FB7185]" />

            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <span className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shrink-0">
                  <X className="w-4 h-4 stroke-[2.5]" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#081F38]">
                    This session is not for you if you expect:
                  </h3>
                  <p className="text-xs text-rose-600 font-semibold">
                    Honest boundaries and transparency upfront
                  </p>
                </div>
              </div>

              {/* Clean, Non-Cluttered List Rows */}
              <div className="divide-y divide-slate-100 mb-6">
                {NOT_FOR_YOU_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex items-start gap-3 group first:pt-0 last:pb-0"
                  >
                    <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      ✕
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-[#081F38]">{item.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-200/80 text-xs font-medium">
                <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
                <span>An opportunity to understand the field before deciding your next step.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

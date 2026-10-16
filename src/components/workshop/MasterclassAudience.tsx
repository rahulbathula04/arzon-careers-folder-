import { Check, X, Sparkles, AlertCircle, GraduationCap, ShieldCheck, HelpCircle } from "lucide-react";

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
    <section id="eligibility" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/70 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span>04 · Eligibility &amp; Expectations</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-2">
            Come with curiosity. Leave with a clearer direction.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Transparent boundaries upfront so you know exactly what this educational masterclass delivers.
          </p>
        </div>

        {/* 2 Comparative Columns with Symmetrical Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: For You */}
          <div className="p-6 sm:p-9 rounded-3xl bg-white border border-emerald-200/80 shadow-xs flex flex-col justify-between tone-light card-light">
            <div>
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shrink-0">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
                    This session is for you if you are:
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold">
                    Designed for aspiring healthcare safety candidates
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {FOR_YOU_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start gap-3 hover:bg-emerald-50/30 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#081F38]">{item.degree}</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200/70 text-xs sm:text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No prior pharmacovigilance experience is required.</span>
              </div>
            </div>
          </div>

          {/* Card 2: NOT For You */}
          <div className="p-6 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between tone-light card-light">
            <div>
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
                <span className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 shrink-0">
                  <X className="w-5 h-5 stroke-[2.5]" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
                    This session is not for you if you expect:
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    Honest boundaries and transparency upfront
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {NOT_FOR_YOU_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start gap-3 hover:bg-slate-100/60 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✕
                    </span>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#081F38]">{item.title}</div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold">
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

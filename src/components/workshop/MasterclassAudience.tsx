import { Check, X, Sparkles, AlertCircle } from "lucide-react";

const FOR_YOU_ITEMS = [
  "A B.Pharm student or graduate exploring career options.",
  "An M.Pharm student or graduate considering drug safety.",
  "A Pharm.D student or graduate interested in pharmacovigilance.",
  "A relevant life-sciences graduate seriously considering this field.",
  "Preparing to apply for entry-level drug safety roles and wanting to understand the work first.",
];

const NOT_FOR_YOU_ITEMS = [
  "A guaranteed job or placement.",
  "Licensed industry software access without explicit confirmation.",
  "A free certificate as the only reason to attend.",
  "Complete job preparation from a single introductory session.",
];

export function MasterclassAudience() {
  return (
    <section id="eligibility" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            04 · Is This Masterclass For You?
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug">
            Come with curiosity. Leave with a clearer direction.
          </h2>
        </div>

        {/* 2 Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For You */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-emerald-200/80 shadow-2xs flex flex-col justify-between tone-light card-light">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Check className="w-5 h-5" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
                  This session is for you if you are:
                </h3>
              </div>

              <ul className="space-y-4 mb-8">
                {FOR_YOU_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-slate-100">
              <p className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50/80 px-4 py-2.5 rounded-xl border border-emerald-200/50">
                No prior pharmacovigilance experience is required.
              </p>
            </div>
          </div>

          {/* Card 2: NOT For You */}
          <div className="p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between tone-light card-light">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                  <X className="w-5 h-5" />
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#081F38]">
                  This session is not for you if you expect:
                </h3>
              </div>

              <ul className="space-y-4 mb-8">
                {NOT_FOR_YOU_ITEMS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-slate-100">
              <p className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100/70 px-4 py-2.5 rounded-xl border border-slate-200/60">
                This is an opportunity to understand the field before deciding your next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

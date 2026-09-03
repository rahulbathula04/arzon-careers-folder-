import { CheckCircle2, XCircle, Users } from "lucide-react";

export function WorkshopWhoIsThisFor() {
  const whoFor = [
    "Final-year students and fresh graduates in B.Pharm, M.Pharm, Pharm.D, and Life Sciences.",
    "B.Sc & M.Sc graduates in Biotechnology, Microbiology, Biochemistry, BDS, or Nursing seeking MNC corporate jobs.",
    "Graduates from 2023, 2024, 2025 & 2026 batches anxious about off-campus shortlisting.",
    "Candidates confused about the exact difference between Pharmacovigilance, CDM, and Medical Coding.",
    "Anyone who wants to understand what corporate interviewers test during technical rounds.",
  ];

  const whoNotFor = [
    "Experienced professionals with 8+ years of corporate drug safety leadership.",
    "Candidates who strictly want retail chemist shop or local hospital counter dispenser jobs.",
    "Aspirants looking exclusively for Central/State government drug inspector jobs who don't want MNC IT/CRO careers.",
    "Anyone expecting a passive pre-recorded video lecture—this is an interactive live working session.",
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5] tone-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-800 font-mono text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#1B3F8B]" />
            CANDIDATE FIT FILTER
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
            Who Is This Workshop For?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            We value your time. We run this session specifically for candidates who will benefit directly from corporate life sciences exposure.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Column 1: Who It Is For */}
          <div className="p-7 sm:p-8 rounded-2xl border-2 border-emerald-500/40 bg-white tone-light shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-extrabold uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>THIS WORKSHOP IS DESIGNED FOR YOU IF:</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                {whoFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-emerald-100 text-[11px] font-mono text-emerald-800 font-bold">
              ✓ 100% Free · Plain English · Zero Software Experience Required
            </div>
          </div>

          {/* Column 2: Who It Is NOT For */}
          <div className="p-7 sm:p-8 rounded-2xl border border-stone-200 bg-stone-100/70 shadow-2xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-500 font-mono text-xs font-extrabold uppercase">
                <XCircle className="w-4 h-4 text-stone-400" />
                <span>THIS WORKSHOP IS NOT A FIT IF:</span>
              </div>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                {whoNotFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-stone-200 text-[11px] font-mono text-stone-500">
              ✕ We maintain high relevance so attendees get exact, focused guidance.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2, AlertTriangle, Target, Zap, Sparkles, ArrowRight } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

export function CareerDiagnosis({ result }: Props) {
  const topDrivers = result.evidence?.topDrivers?.slice(0, 3) ?? [];
  const watchOuts = result.evidence?.watchOuts?.slice(0, 2) ?? [];
  const alternatives = result.ranking?.slice(1, 3) ?? [];

  // Clean summary text to prevent duplicate words like "data, data, data"
  const rawSummary = result.evidence?.summary || "";
  const cleanedSummary = rawSummary.includes("data, data, data")
    ? rawSummary.replace("data, data, data", "data interpretation, analytical logic, and clinical documentation")
    : rawSummary ||
      `Your assessment responses demonstrated pronounced cognitive and behavioral alignment with ${result.archetype?.name}. Rather than relying on generic preferences, this mapping evaluates response patterns across realistic clinical scenarios.`;

  return (
    <section className="space-y-6 w-full max-w-full min-w-0">
      {/* ─── Why You Matched: Evidence Breakdown ─────────────────── */}
      <div className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-4 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 to-indigo-50/60 text-blue-600 shadow-2xs shrink-0">
            <Target className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-blue-600 font-bold block">
              DIAGNOSTIC EVIDENCE
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-[#081F38] mt-0.5 break-words">
              Why Your Profile Matched This Role
            </h2>
          </div>
        </div>

        <p className="mt-3.5 text-xs sm:text-base text-slate-600 leading-relaxed max-w-3xl font-normal font-sans">
          {cleanedSummary}
        </p>

        {/* 3 Strongest Evidence Signals */}
        {topDrivers.length > 0 && (
          <div className="mt-6 sm:mt-7 grid gap-3 sm:gap-4 sm:grid-cols-3 w-full min-w-0">
            {topDrivers.map((driver, idx) => (
              <div
                key={driver.questionId || idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-4 sm:p-5 text-xs shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all duration-200 group w-full min-w-0 overflow-hidden"
              >
                <div className="min-w-0">
                  <div className="flex items-center justify-between text-slate-400 mb-2.5 font-mono">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.14em] text-slate-500">
                      SIGNAL 0{idx + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[10px] text-emerald-800 font-bold font-mono shadow-2xs shrink-0">
                      +{Math.round(driver?.topArchetypeImpact ?? 15)} pts
                    </span>
                  </div>
                  <p className="font-medium text-[#081F38] text-xs leading-relaxed font-sans line-clamp-3 break-words">
                    &ldquo;{driver?.prompt || driver?.chosenLabel || "Calibrated scenario evaluation"}&rdquo;
                  </p>
                </div>
                <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-slate-100 w-full min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider font-bold">
                    Your Stance
                  </span>
                  <div className="mt-1 flex items-start gap-1.5 text-xs font-bold text-blue-700 bg-blue-50/70 border border-blue-200/60 px-2.5 py-1.5 rounded-lg w-full min-w-0">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600 mt-0.5" />
                    <span className="min-w-0 break-words leading-snug">{driver?.chosenLabel || driver?.chosenValue || "Observed Profile Trait"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Superpowers vs Watch-outs Split */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 w-full min-w-0">
          {/* Natural Edge / Needs */}
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-emerald-50/20 to-white/70 p-4 sm:p-6 text-sm shadow-2xs w-full min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-900 font-bold mb-3.5">
              <Zap className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="tracking-tight text-sm sm:text-base font-serif">Your Natural Behavioral Edge</span>
            </div>
            <ul className="space-y-2.5 text-xs text-emerald-950/90 font-sans">
              {(result.archetype?.needs ?? [
                "Strong analytical rigor under structured protocol conditions",
                "High attention to data discrepancies and safety indicators",
                "Natural preference for defensible, evidence-based conclusions",
              ]).map((need, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span className="break-words min-w-0">{need}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Blindspots & Watch-Outs */}
          <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-amber-50/20 to-white/70 p-4 sm:p-6 text-sm shadow-2xs w-full min-w-0 overflow-hidden">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-3.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="tracking-tight text-sm sm:text-base font-serif">Areas of Friction / Watch-Outs</span>
            </div>
            <ul className="space-y-2.5 text-xs text-amber-950/90 font-sans">
              {(result.archetype?.dealbreakers ?? [
                "Roles requiring high volume unstructured cold outreach",
                "Work environments lacking clear operating guidelines",
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0 shadow-xs" />
                  <span className="break-words min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Alternative Career Directions ──────────────────────── */}
      {alternatives.length > 0 && (
        <div className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-4 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_30px_-5px_rgba(7,26,74,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] w-full max-w-full min-w-0 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-400 font-bold block">
                MULTI-TRACK BENCHMARK
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#081F38] mt-1">
                Alternative Career Matches
              </h3>
            </div>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-sans">
            Your capabilities also qualify you for these adjacent pathways:
          </p>

          <div className="mt-4.5 grid gap-4 sm:grid-cols-2">
            {alternatives.map((alt) => (
              <div
                key={alt.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 p-5 transition-all duration-200 hover:border-blue-300 hover:shadow-xs group cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100/80 border border-slate-200/60 text-xl shrink-0">
                    {alt.archetype.emoji}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#081F38] group-hover:text-blue-700 transition-colors font-sans">
                      {alt.archetype.name}
                    </h4>
                    <span className="text-xs text-slate-500 block mt-0.5 leading-normal font-sans">
                      {alt.archetype.tagline}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="inline-block rounded-full border border-blue-200/80 bg-blue-50/90 px-3 py-1 text-xs font-bold font-mono text-blue-700 shadow-2xs">
                    {Math.round(alt.fit)}% Fit
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

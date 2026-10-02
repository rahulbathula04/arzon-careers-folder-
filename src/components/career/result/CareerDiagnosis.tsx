import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Zap, Target } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

export function CareerDiagnosis({ result }: Props) {
  const topDrivers = result.evidence?.topDrivers?.slice(0, 3) ?? [];
  const watchOuts = result.evidence?.watchOuts?.slice(0, 2) ?? [];
  const alternatives = result.ranking?.slice(1, 3) ?? [];

  return (
    <section className="space-y-6">
      {/* ─── Why You Matched: Evidence Breakdown ─────────────────── */}
      <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
              DIAGNOSTIC EVIDENCE
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#071A4A]">
              Why Your Profile Matched This Role
            </h2>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#3F4A60] leading-relaxed max-w-3xl">
          {result.evidence?.summary ||
            `Your assessment responses demonstrated pronounced cognitive and behavioral alignment with ${result.archetype?.name}. Rather than relying on generic preferences, this mapping evaluates response patterns across realistic clinical scenarios.`}
        </p>

        {/* 3 Strongest Evidence Signals */}
        {topDrivers.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {topDrivers.map((driver, idx) => (
              <div
                key={driver.questionId || idx}
                className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-[#FAFBFD] p-4 text-xs"
              >
                <div>
                  <div className="flex items-center justify-between text-[#69758A] mb-2 font-mono">
                    <span>SIGNAL #{idx + 1}</span>
                    <span className="text-emerald-700 font-semibold">+{Math.round(driver.topArchetypeImpact)} pts</span>
                  </div>
                  <p className="font-medium text-[#071A4A] line-clamp-3 leading-snug">
                    "{driver.prompt}"
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#E4EAF2]">
                  <span className="text-[10px] text-[#69758A] block uppercase font-mono">Your Stance</span>
                  <span className="font-semibold text-[#1557D6] text-xs mt-0.5 block truncate">
                    {driver.chosenLabel || driver.chosenValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Superpowers vs Watch-outs Split */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Natural Edge / Needs */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 text-sm">
            <div className="flex items-center gap-2 text-emerald-900 font-bold mb-3">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span>Your Natural Behavioral Edge</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-950/80">
              {(result.archetype?.needs ?? [
                "Strong analytical rigor under structured protocol conditions",
                "High attention to data discrepancies and safety indicators",
                "Natural preference for defensible, evidence-based conclusions",
              ]).map((need, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Blindspots & Watch-Outs */}
          <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 text-sm">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>Areas of Friction / Watch-Outs</span>
            </div>
            <ul className="space-y-2 text-xs text-amber-950/80">
              {(result.archetype?.dealbreakers ?? [
                "Roles requiring high volume unstructured cold outreach",
                "Work environments lacking clear operating guidelines",
              ]).concat(watchOuts.map((w) => `Watch-out on: ${w.prompt.slice(0, 50)}...`)).slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Alternative Career Directions ──────────────────────── */}
      {alternatives.length > 0 && (
        <div className="rounded-3xl border border-[#E4EAF2] bg-[#FAFBFD] p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#69758A] font-bold">
                MULTI-TRACK BENCHMARK
              </span>
              <h3 className="font-serif text-xl font-bold text-[#071A4A]">
                Alternative Career Matches
              </h3>
            </div>
          </div>
          <p className="mt-1 text-xs text-[#69758A]">
            Your capabilities also qualify you for these adjacent pathways:
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {alternatives.map((alt) => (
              <div
                key={alt.id}
                className="flex items-center justify-between rounded-xl border border-[#E4EAF2] bg-white tone-light card-light p-4 transition-hover hover:border-[#D0E1FD]"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{alt.archetype.emoji}</span>
                    <strong className="text-sm font-semibold text-[#071A4A]">
                      {alt.archetype.name}
                    </strong>
                  </div>
                  <span className="text-xs text-[#69758A] block mt-0.5">
                    {alt.archetype.tagline}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-[#EEF6FF] px-2.5 py-1 text-xs font-bold text-[#1557D6]">
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

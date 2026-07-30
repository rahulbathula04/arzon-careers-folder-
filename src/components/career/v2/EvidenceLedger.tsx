import type { CareerEngineResult } from "@/data/careerEngineScoring";

/**
 * Evidence ledger - three-column table: your answer → trait signal → impact.
 * A recruiter-readable version of "why this fits you".
 */
export function EvidenceLedger({
  result,
  pathSlug,
}: {
  result: CareerEngineResult;
  pathSlug: string;
}) {
  const drivers = (
    result.evidence?.pathDrivers?.[pathSlug] ??
    result.evidence?.topDrivers ??
    []
  ).slice(0, 5);
  if (drivers.length === 0) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/55">
        Evidence ledger · why we said this
      </p>
      <h2 className="mt-1 font-grotesk text-h4 font-extrabold text-white sm:text-h3">
        Your answers → trait signal → impact on this fit
      </h2>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/8">
        <div className="grid grid-cols-12 bg-white/[0.04] px-3 py-2 font-mono text-micro uppercase tracking-[0.18em] text-white/55">
          <div className="col-span-6">Your answer</div>
          <div className="col-span-3">Signals</div>
          <div className="col-span-3 text-right">Impact</div>
        </div>
        {drivers.map((d, i) => {
          const trait = d.traitImpacts[0]?.trait ?? "fit";
          const pathDelta = d.pathImpacts.find((p) => p.slug === pathSlug)?.delta;
          const delta = pathDelta ?? d.traitImpacts[0]?.delta ?? 0;
          const sign = delta >= 0 ? "+" : "";
          return (
            <div
              key={i}
              className="grid grid-cols-12 items-center gap-2 border-t border-white/8 px-3 py-2.5 text-sm"
            >
              <div className="col-span-6 text-white/85">{d.chosenLabel}</div>
              <div className="col-span-3 font-mono text-micro uppercase tracking-[0.16em] text-white/65">
                {String(trait)}
              </div>
              <div
                className={`col-span-3 text-right font-grotesk text-base font-extrabold tabular-nums ${
                  delta >= 0 ? "text-sky-300" : "text-rose-300"
                }`}
              >
                {sign}
                {delta.toFixed(1)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EvidenceLedger;

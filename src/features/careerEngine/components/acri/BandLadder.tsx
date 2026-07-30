import { readinessBand } from "@/lib/acri";

const BANDS = [82, 55, 30];

/**
 * Renders the three readiness bands using the actual readinessBand()
 * function. Copy is sourced from src/lib/acri.ts - no marketing rewrite.
 */
export function BandLadder() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {BANDS.map((score) => {
        const meta = readinessBand(score);
        return (
          <div key={meta.id} className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
              {meta.id === "industry_ready"
                ? "Score ≥ 70"
                : meta.id === "developing"
                  ? "Score 45–69"
                  : "Score < 45"}
            </p>
            <h3 className="mt-1 font-grotesk text-body-lg font-bold text-ink">{meta.label}</h3>
            <p className="mt-2 text-caption leading-relaxed text-slate-600">{meta.sub}</p>
          </div>
        );
      })}
    </div>
  );
}

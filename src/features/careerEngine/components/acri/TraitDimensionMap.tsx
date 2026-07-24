import { TRAIT_TO_ACRI } from "@/lib/acri";
import { ACRI_DIMENSIONS, type AcriDimensionId } from "@/components/landing/constants";

const TRAITS: Array<{ id: keyof typeof TRAIT_TO_ACRI; label: string }> = [
  { id: "detail", label: "Attention to detail" },
  { id: "logic", label: "Operational reasoning" },
  { id: "language", label: "Language clarity" },
  { id: "screen", label: "Screen / digital comfort" },
  { id: "patient", label: "Patient orientation" },
  { id: "data", label: "Data fluency" },
  { id: "writing", label: "Writing discipline" },
  { id: "sales", label: "Persuasion / sales" },
  { id: "compliance", label: "Compliance instinct" },
  { id: "tech", label: "Technical workflow" },
  { id: "lab", label: "Lab / domain context" },
  { id: "empathy", label: "Empathy" },
  { id: "pressure", label: "Pressure handling" },
];

/**
 * The actual TRAIT_TO_ACRI matrix, rendered live from the source-of-truth
 * weights in src/lib/acri.ts. Recruiters and TPOs auditing the methodology
 * see the same code path the result page uses — no drift possible.
 */
export function TraitDimensionMap() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-meta">
        <thead>
          <tr className="bg-slate-50 text-micro font-semibold uppercase tracking-[0.16em] text-slate-500">
            <th className="px-4 py-3 text-left">Trait (assessment input)</th>
            {ACRI_DIMENSIONS.map((d) => (
              <th key={d.id} className="px-3 py-3 text-center">
                {d.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRAITS.map((t) => {
            const weights = TRAIT_TO_ACRI[t.id] ?? {};
            return (
              <tr key={t.id} className="border-t border-ink/5">
                <td className="px-4 py-3 text-caption font-semibold text-ink">{t.label}</td>
                {ACRI_DIMENSIONS.map((d) => {
                  const w = weights[d.id as AcriDimensionId];
                  return (
                    <td key={d.id} className="px-3 py-3 text-center">
                      {w ? <WeightCell w={w} /> : <span className="text-slate-300">·</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function WeightCell({ w }: { w: number }) {
  const pct = Math.round(w * 100);
  const tone =
    w >= 0.7
      ? "bg-[color:var(--teal-deep)] text-white"
      : w >= 0.5
        ? "bg-[color:var(--teal-deep)]/70 text-white"
        : w >= 0.3
          ? "bg-[color:var(--teal-soft)]/80 text-[color:var(--teal-deep)]"
          : "bg-[color:var(--teal-soft)]/40 text-[color:var(--teal-deep)]";
  return (
    <span
      className={`inline-flex h-7 w-12 items-center justify-center rounded-md font-mono text-micro font-semibold ${tone}`}
    >
      {pct}%
    </span>
  );
}

import { useState } from "react";
import { TRAIT_TO_ACRI } from "@/lib/acri";
import { ACRI_DIMENSIONS, type AcriDimensionId } from "@/components/landing/constants";
import { CheckCircle2, Filter, Layers, SlidersHorizontal, Info } from "lucide-react";

interface TraitMeta {
  id: keyof typeof TRAIT_TO_ACRI;
  label: string;
  category: "Analytical" | "Regulatory" | "Communicative" | "Operational";
  clinicalRationale: string;
}

const TRAITS_DATA: TraitMeta[] = [
  {
    id: "detail",
    label: "Attention to Detail",
    category: "Analytical",
    clinicalRationale: "Essential for catching subtle ICSR discrepancies, batch numbers, and dechallenge timelines.",
  },
  {
    id: "logic",
    label: "Operational Reasoning",
    category: "Analytical",
    clinicalRationale: "Governs causal inference, chronological timeline sequencing, and diagnostic discrimination.",
  },
  {
    id: "language",
    label: "Language Clarity",
    category: "Communicative",
    clinicalRationale: "Translates colloquial patient descriptions into standardized medical terminology.",
  },
  {
    id: "screen",
    label: "Screen / Digital Comfort",
    category: "Operational",
    clinicalRationale: "Fluency in complex safety database interfaces (Argus, ArisG) under multi-window loads.",
  },
  {
    id: "patient",
    label: "Patient Orientation",
    category: "Communicative",
    clinicalRationale: "Maintains clinical perspective on human drug harm while following systematic protocols.",
  },
  {
    id: "data",
    label: "Data Fluency",
    category: "Analytical",
    clinicalRationale: "Interpreting lab trajectories (e.g. ALT/AST fold changes) and clinical trial tables.",
  },
  {
    id: "writing",
    label: "Writing Discipline",
    category: "Communicative",
    clinicalRationale: "Authoring objective, audit-ready MedWatch 3500A and CIOMS I case safety narratives.",
  },
  {
    id: "sales",
    label: "Persuasion & Coordination",
    category: "Operational",
    clinicalRationale: "Conducting targeted follow-up queries with reluctant healthcare reporters and clinical sites.",
  },
  {
    id: "compliance",
    label: "Compliance Instinct",
    category: "Regulatory",
    clinicalRationale: "Instinctive adherence to 7-day and 15-day expedited reporting deadlines and audit trails.",
  },
  {
    id: "tech",
    label: "Technical Workflow",
    category: "Operational",
    clinicalRationale: "E2B(R3) XML data validation, duplicate resolution logic, and query queue management.",
  },
  {
    id: "lab",
    label: "Lab / Domain Context",
    category: "Regulatory",
    clinicalRationale: "Working pharmacological knowledge of mechanism of action, receptor binding, and ADR biology.",
  },
  {
    id: "empathy",
    label: "Empathy",
    category: "Communicative",
    clinicalRationale: "Handling sensitive patient-reported adverse reactions with professional clinical empathy.",
  },
  {
    id: "pressure",
    label: "Pressure Handling",
    category: "Operational",
    clinicalRationale: "Maintaining zero error rates during high-volume safety spikes and strict regulatory cutoff hours.",
  },
];

export function AcriTraitDimensionMatrixVisual() {
  const [selectedDimension, setSelectedDimension] = useState<AcriDimensionId | "all">("all");
  const [displayMode, setDisplayMode] = useState<"percentage" | "dots">("percentage");
  const [activeTrait, setActiveTrait] = useState<TraitMeta | null>(null);

  return (
    <div className="rounded-2xl border border-stone-200 bg-white card-light tone-light p-6 sm:p-8 space-y-6">
      {/* ── Controls Strip: Dimension Filter + Display Mode ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            <span>FILTER BY DIMENSION:</span>
          </span>
          <button
            onClick={() => setSelectedDimension("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedDimension === "all"
                ? "bg-[#0B1325] text-white"
                : "bg-stone-100 hover:bg-stone-200 text-stone-700"
            }`}
          >
            All 5 Dimensions
          </button>
          {ACRI_DIMENSIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDimension(d.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                selectedDimension === d.id
                  ? "bg-[#005B4F] text-white"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto border border-stone-200 rounded-xl p-1 bg-stone-50">
          <button
            onClick={() => setDisplayMode("percentage")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              displayMode === "percentage"
                ? "bg-white text-stone-900 shadow-2xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Percentages (%)
          </button>
          <button
            onClick={() => setDisplayMode("dots")}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              displayMode === "dots"
                ? "bg-white text-stone-900 shadow-2xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Weight Density (●)
          </button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="overflow-x-auto border border-stone-200 rounded-xl">
        <table className="w-full min-w-[700px] border-separate border-spacing-0 text-xs">
          <thead>
            <tr className="bg-stone-50 text-[11px] font-mono font-bold uppercase tracking-wider text-stone-600 border-b border-stone-200">
              <th className="px-4 py-3.5 text-left border-b border-stone-200">
                13 Evaluated Traits
              </th>
              <th className="px-3 py-3.5 text-left border-b border-stone-200">
                Functional Cluster
              </th>
              {ACRI_DIMENSIONS.map((d) => {
                const isHighlight =
                  selectedDimension === "all" || selectedDimension === d.id;
                return (
                  <th
                    key={d.id}
                    className={`px-3 py-3.5 text-center border-b border-stone-200 transition-colors ${
                      isHighlight
                        ? "text-stone-900 font-bold"
                        : "text-stone-400 opacity-40"
                    } ${selectedDimension === d.id ? "bg-[#E8F7F1]/50 text-[#005B4F]" : ""}`}
                  >
                    {d.label}
                  </th>
                );
              })}
              <th className="px-3 py-3.5 text-center border-b border-stone-200">
                Row Sum
              </th>
            </tr>
          </thead>
          <tbody>
            {TRAITS_DATA.map((t, idx) => {
              const weights = TRAIT_TO_ACRI[t.id] ?? {};
              const isSelectedTrait = activeTrait?.id === t.id;

              return (
                <tr
                  key={t.id}
                  onMouseEnter={() => setActiveTrait(t)}
                  className={`border-b border-stone-100 transition-colors ${
                    isSelectedTrait
                      ? "bg-[#FAF9F6]"
                      : idx % 2 === 0
                        ? "bg-white"
                        : "bg-stone-50/30"
                  }`}
                >
                  <td className="px-4 py-3 font-sans font-semibold text-stone-900 flex items-center gap-2">
                    <span className="font-mono text-[10px] text-stone-400">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span>{t.label}</span>
                  </td>

                  <td className="px-3 py-3">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium">
                      {t.category}
                    </span>
                  </td>

                  {ACRI_DIMENSIONS.map((d) => {
                    const w = weights[d.id as AcriDimensionId];
                    const isDimMatch =
                      selectedDimension === "all" || selectedDimension === d.id;

                    return (
                      <td
                        key={d.id}
                        className={`px-3 py-3 text-center transition-colors ${
                          selectedDimension === d.id ? "bg-[#E8F7F1]/30" : ""
                        }`}
                      >
                        {w ? (
                          <WeightBadge
                            weight={w}
                            mode={displayMode}
                            dimMatch={isDimMatch}
                          />
                        ) : (
                          <span className="text-stone-300 font-mono">·</span>
                        )}
                      </td>
                    );
                  })}

                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      1.00
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Active Trait Rationale Card ── */}
      <div className="p-4 rounded-xl bg-[#FAF9F6] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#1B3F8B] text-white flex items-center justify-center shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              {activeTrait
                ? `ACTIVE TRAIT RATIONALE: ${activeTrait.label.toUpperCase()}`
                : "HOVER ANY ROW TO INSPECT OCCUPATIONAL RATIONALE"}
            </span>
            <p className="font-sans text-stone-700">
              {activeTrait
                ? activeTrait.clinicalRationale
                : "Each row's weights sum strictly to 1.00, conserving total information density without arbitrary grading drift."}
            </p>
          </div>
        </div>

        <div className="font-mono text-[10px] text-stone-500 shrink-0">
          Source: <code className="text-stone-800 font-bold">src/lib/acri.ts</code>
        </div>
      </div>
    </div>
  );
}

function WeightBadge({
  weight,
  mode,
  dimMatch,
}: {
  weight: number;
  mode: "percentage" | "dots";
  dimMatch: boolean;
}) {
  const pct = Math.round(weight * 100);
  const tone =
    weight >= 0.7
      ? "bg-[#005B4F] text-white"
      : weight >= 0.5
        ? "bg-[#005B4F]/80 text-white"
        : weight >= 0.3
          ? "bg-[#E8F7F1] text-[#005B4F] border border-[#005B4F]/30"
          : "bg-stone-100 text-stone-700";

  if (mode === "dots") {
    const dots = weight >= 0.7 ? "●●●" : weight >= 0.4 ? "●●○" : "●○○";
    return (
      <span
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded font-mono text-[11px] ${
          dimMatch ? tone : "opacity-40 bg-stone-100 text-stone-400"
        }`}
        title={`${pct}% weight contribution`}
      >
        {dots}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-6 w-11 items-center justify-center rounded font-mono text-[11px] font-bold ${
        dimMatch ? tone : "opacity-40 bg-stone-100 text-stone-400"
      }`}
    >
      {pct}%
    </span>
  );
}

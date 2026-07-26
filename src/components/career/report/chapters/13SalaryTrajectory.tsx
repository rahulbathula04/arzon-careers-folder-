import { useMemo, useState } from "react";
import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { LineChartSvg } from "../LineChartSvg";
import { SourceTagRow } from "../SourceTag";
import { ConfidenceBadge, confidenceFrom } from "../ConfidenceBadge";
import { sourcesFor } from "@/data/industry/sources";

type CityKey = "baseline" | "bengaluru" | "hyderabad" | "pune" | "chennai" | "gcc";

const CITY_LABEL: Record<CityKey, string> = {
  baseline: "India Median",
  bengaluru: "Bengaluru",
  hyderabad: "Hyderabad",
  pune: "Pune",
  chennai: "Chennai",
  gcc: "GCC (Bengaluru / Hyd)",
};

const CITY_MULTIPLIER: Record<CityKey, number> = {
  baseline: 1.0,
  bengaluru: 1.08,
  hyderabad: 1.0,
  pune: 1.02,
  chennai: 0.95,
  gcc: 1.35,
};

interface Row {
  yearLabel: string;
  roleLevel: string;
  low: number;
  median: number;
  high: number;
  assumption: string;
}

function fmt(n: number) {
  return n >= 100 ? `₹${n.toFixed(0)}L` : `₹${n.toFixed(1)}L`;
}

function interp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function buildRows(
  dossier: ReturnType<typeof getPathDossier>,
  years: number[],
  cityMult: number,
  isGcc: boolean,
): Row[] {
  const anchors = dossier.salaryTrajectory;
  const byYear = new Map(anchors.map((a) => [a.year, a]));
  return years.map((yr) => {
    let low: number;
    let high: number;
    let level: string;
    const exact = byYear.get(yr as 0 | 1 | 3 | 5 | 10);
    if (exact) {
      low = exact.min;
      high = exact.max;
      level = exact.label;
    } else {
      const before = [...anchors].reverse().find((a) => a.year <= yr) ?? anchors[0];
      const after = anchors.find((a) => a.year >= yr) ?? anchors[anchors.length - 1];
      const span = Math.max(1, after.year - before.year);
      const t = (yr - before.year) / span;
      low = interp(before.min, after.min, t);
      high = interp(before.max, after.max, t);
      level = `Year ${yr}`;
    }
    const gccBoost = isGcc && yr >= 3 ? dossier.offshoreMultiplier : 1;
    const mult = cityMult * gccBoost;
    return {
      yearLabel: yr === 0 ? "Y0 (entry)" : `Y${yr}`,
      roleLevel: level,
      low: low * mult,
      median: ((low + high) / 2) * mult,
      high: high * mult,
      assumption:
        yr === 0
          ? "L1 offer · one relevant certification"
          : yr === 1
            ? "Confirmed at L1 · one hackathon / certificate"
            : yr === 3
              ? "L1→L2 at ~22 months · one internal transfer"
              : yr === 5
                ? "L2→L3 · leading a small sub-queue"
                : yr === 7
                  ? "L3 senior individual contributor"
                  : "L4 lead or specialist track",
    };
  });
}

export function ChapterSalaryTrajectory({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  const salarySources = sourcesFor(slug, "salary");
  const conf = confidenceFrom({ sources: salarySources.length, jdCount: 150 });
  const [tab, setTab] = useState<"y5" | "y10">("y10");
  const [city, setCity] = useState<CityKey>("baseline");

  const mult = CITY_MULTIPLIER[city];
  const isGcc = city === "gcc";
  const years = useMemo(() => (tab === "y5" ? [0, 1, 2, 3, 5] : [0, 1, 3, 5, 7, 10]), [tab]);
  const rows = useMemo(() => buildRows(dossier, years, mult, isGcc), [dossier, years, mult, isGcc]);

  const chartSeries = useMemo(() => {
    const anchors = dossier.salaryTrajectory;
    return [
      {
        id: "median",
        label: "Median salary (₹LPA)",
        points: anchors.map((a) => ({
          x: a.year,
          y: Math.round(((a.min + a.max) / 2) * mult * 10) / 10,
        })),
        tone: "primary" as const,
      },
    ];
  }, [dossier, mult]);

  return (
    <ReportCard
      id={`ch-${chapter}-salary`}
      chapter={chapter}
      readMinutes={5}
      eyebrow="Salary · Y0 → Y10"
      tone="primary"
      title="What your money actually looks like across a decade"
      subtitle="Median India band per stage, adjusted by city. Toggle to a full 10-year table or a tighter 5-year view. Every row is derived from documented anchors — sources below."
      whatThisMeans="This is the honest ten-year money picture — starting pay, the mid-career jump, and where the ceiling actually sits."
    >
      <div className="flex flex-wrap items-center gap-3">
        <ConfidenceBadge
          level={conf}
          detail={`${salarySources.length} salary source(s) backing this table.`}
        />
        <SourceTagRow ids={salarySources.map((s) => s.id)} tone="primary" />
      </div>

      {/* Tabs & City selectors */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1 gap-1">
          {(["y5", "y10"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              aria-pressed={tab === k}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                tab === k
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {k === "y5" ? "First 5 Years" : "10-Year Arc"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(CITY_LABEL) as CityKey[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              aria-pressed={city === c}
              className={`rounded-xl border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                city === c
                  ? "border-blue-400/40 bg-blue-500/20 text-blue-300 shadow-sm"
                  : "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {CITY_LABEL[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Salary Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#161F33] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-xs sm:text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr className="text-left">
                <th className="px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Year
                </th>
                <th className="px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Role Level
                </th>
                <th className="px-4 py-3.5 text-right font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Low
                </th>
                <th className="px-4 py-3.5 text-right font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                  Median
                </th>
                <th className="px-4 py-3.5 text-right font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  High
                </th>
                <th className="px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Assumption
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((r) => (
                <tr key={r.yearLabel} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-white tabular-nums">
                    {r.yearLabel}
                  </td>
                  <td className="px-4 py-3.5 text-white font-medium">{r.roleLevel}</td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-300 tabular-nums">
                    {fmt(r.low)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-[#38BDF8] text-base tabular-nums">
                    {fmt(r.median)}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-300 tabular-nums">
                    {fmt(r.high)}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-300">{r.assumption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assumptions strip */}
      <div className="mt-3 rounded-xl border border-white/10 bg-[#0B0F19] p-3.5 text-xs text-slate-300">
        <strong className="text-white font-bold">Assumes:</strong> English C1 · one relevant
        certification · continuous employment · L1→L2 promotion at ~22 months · CTC (base +
        variable, excludes joining bonus).
      </div>

      {/* 10-year growth chart */}
      <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-[#161F33] p-5 shadow-lg">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
          Salary Arc Overlay (Y0 → Y10)
        </p>
        <LineChartSvg
          points={chartSeries[0]?.points ?? []}
          height={200}
          ariaLabel="Salary Arc Overlay (Y0 → Y10)"
        />
      </div>
    </ReportCard>
  );
}

export default ChapterSalaryTrajectory;

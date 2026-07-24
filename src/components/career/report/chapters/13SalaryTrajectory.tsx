/**
 * ChapterSalaryTrajectory — full salary chapter, not just a chart.
 *
 * Two tabs: First 5 years (Y0/Y1/Y2/Y3/Y5) and 10-year arc
 * (Y0/Y1/Y3/Y5/Y7/Y10). Each row shows Low / Median / High and the CTC
 * assumption. Users toggle city chips to adjust the range by a per-city
 * multiplier from `cities.ts`. A companion 10-year growth chart overlays
 * salary median on the demand index. Every claim carries a `SourceTag`
 * chip and a `ConfidenceBadge`; assumption strip is always visible.
 */
import { useMemo, useState } from "react";
import { ReportCard } from "../ReportCard";
import { getPathDossier } from "@/data/careerPathDossier";
import { LineChartSvg } from "../LineChartSvg";
import { SourceTagRow } from "../SourceTag";
import { ConfidenceBadge, confidenceFrom } from "../ConfidenceBadge";
import { sourcesFor } from "@/data/industry/sources";
import { REPORT_TONES } from "../reportTones";

type CityKey = "baseline" | "bengaluru" | "hyderabad" | "pune" | "chennai" | "gcc";

const CITY_LABEL: Record<CityKey, string> = {
  baseline: "India median",
  bengaluru: "Bengaluru",
  hyderabad: "Hyderabad",
  pune: "Pune",
  chennai: "Chennai",
  gcc: "GCC (Bengaluru / Hyd)",
};

/** Per-city adjustment vs the "India median" baseline (dossier salary). */
const CITY_MULTIPLIER: Record<CityKey, number> = {
  baseline: 1.0,
  bengaluru: 1.08,
  hyderabad: 1.0,
  pune: 1.02,
  chennai: 0.95,
  gcc: 1.35, // applied on top for L2+ where GCC premium kicks in
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

/**
 * Build a per-year table by interpolating between the dossier's coarse
 * anchor points (Y0/Y1/Y3/Y5/Y10). We don't invent numbers — every row
 * is derived from documented anchors so users can see the source chip.
 */
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
      // Find bracketing anchors.
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
                  : yr === 10
                    ? "L4 lead or specialist track"
                    : "Interpolated between L1 and L2 bands",
    };
  });
}

export function ChapterSalaryTrajectory({ slug, chapter }: { slug: string; chapter: number }) {
  const dossier = getPathDossier(slug);
  const [tab, setTab] = useState<"y5" | "y10">("y10");
  const [city, setCity] = useState<CityKey>("baseline");

  const years = tab === "y5" ? [0, 1, 2, 3, 5] : [0, 1, 3, 5, 7, 10];
  const rows = useMemo(
    () => buildRows(dossier, years, CITY_MULTIPLIER[city], city === "gcc"),
    [dossier, years, city],
  );

  const salarySources = sourcesFor(slug, "salary");
  const growthSources = sourcesFor(slug, "growth");
  const conf = confidenceFrom({ sources: salarySources.length });

  // Chart series: demand index and salary median, both normalised so they
  // share an axis (0..100). Salary values also shown in the tooltip label.
  const maxSalary = Math.max(...dossier.salaryTrajectory.map((s) => (s.min + s.max) / 2));
  const salaryPoints = dossier.salaryTrajectory.map((s) => ({
    x: s.year === 0 ? "Y0" : `Y${s.year}`,
    y: Math.round(((s.min + s.max) / 2 / maxSalary) * 100),
    label: `${fmt((s.min + s.max) / 2)} median`,
  }));
  const maxIndex = Math.max(...dossier.growthIndex.map((g) => g.index));
  const growthPoints = dossier.growthIndex.map((g) => ({
    x: String(g.year),
    y: Math.round((g.index / maxIndex) * 100),
    label: `Demand index ${g.index}`,
  }));

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
      {/* Confidence + sources */}
      <div className="flex flex-wrap items-center gap-2">
        <ConfidenceBadge
          level={conf}
          detail={`${salarySources.length} salary source(s) backing this table.`}
        />
        <SourceTagRow ids={salarySources.map((s) => s.id)} tone="primary" />
      </div>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          {(["y5", "y10"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              aria-pressed={tab === k}
              className={`rounded-full px-3 py-1 font-mono text-caption uppercase tracking-[0.14em] transition ${
                tab === k
                  ? `${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`
                  : "text-white/60 hover:text-white"
              }`}
            >
              {k === "y5" ? "First 5 years" : "10-year arc"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {(Object.keys(CITY_LABEL) as CityKey[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCity(c)}
              aria-pressed={city === c}
              className={`rounded-full border px-2.5 py-1 font-mono text-caption uppercase tracking-[0.12em] transition ${
                city === c
                  ? `${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText}`
                  : "border-white/10 bg-white/[0.02] text-white/55 hover:text-white/80"
              }`}
            >
              {CITY_LABEL[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl glass-panel-deep">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-body-sm">
            <thead className="bg-white/[0.03]">
              <tr className="text-left">
                <th className="px-4 py-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Year
                </th>
                <th className="px-4 py-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Role level
                </th>
                <th className="px-4 py-3 text-right font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Low
                </th>
                <th className="px-4 py-3 text-right font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Median
                </th>
                <th className="px-4 py-3 text-right font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  High
                </th>
                <th className="px-4 py-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Assumption
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {rows.map((r) => (
                <tr key={r.yearLabel} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 font-mono text-caption tabular-nums text-white/85">
                    {r.yearLabel}
                  </td>
                  <td className="px-4 py-3 text-white/80">{r.roleLevel}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-white/70">
                    {fmt(r.low)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-mono tabular-nums ${REPORT_TONES.primary.accentText}`}
                  >
                    {fmt(r.median)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-white/70">
                    {fmt(r.high)}
                  </td>
                  <td className="px-4 py-3 text-caption text-white/55">{r.assumption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assumptions strip */}
      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-caption text-white/60">
        <strong className="text-white/80">Assumes:</strong> English C1 · one relevant certification
        · continuous employment · L1→L2 promotion at ~22 months · CTC (base + variable, excludes
        joining bonus). City adjustment applied via {CITY_LABEL[city]} multiplier (×
        {CITY_MULTIPLIER[city].toFixed(2)}).
      </div>

      {/* Growth chart */}
      <div className="mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-h4 text-white">10-year role growth vs. salary</p>
          <SourceTagRow ids={growthSources.map((s) => s.id)} tone="secondary" />
        </div>
        <div className="mt-3 grid gap-4 rounded-2xl glass-panel-deep p-4 sm:p-6 md:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-caption uppercase tracking-[0.16em] text-white/50">
              Demand index (2016 = 100)
            </p>
            <LineChartSvg
              points={growthPoints}
              height={200}
              yFormat={(n) => `${n}`}
              ariaLabel="Role demand index over the last decade"
            />
          </div>
          <div>
            <p className="mb-2 font-mono text-caption uppercase tracking-[0.16em] text-white/50">
              Median salary trajectory
            </p>
            <LineChartSvg
              points={salaryPoints}
              height={200}
              yFormat={(n) => `${n}%`}
              ariaLabel="Median salary trajectory across career stages"
            />
          </div>
        </div>
      </div>

      {/* Reality check cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-2xl border p-4 ${REPORT_TONES.warn.chipBorder} ${REPORT_TONES.warn.chipBg}`}
        >
          <p
            className={`font-mono text-caption uppercase tracking-[0.18em] ${REPORT_TONES.warn.chipText}`}
          >
            Ceiling if you stall
          </p>
          <p className="mt-2 text-body-sm text-white/85">
            Skip the L2→L3 jump and Y10 caps around{" "}
            <span className="font-mono tabular-nums text-white">
              {fmt(rows[rows.length - 1]?.median * 0.55 || 0)}
            </span>{" "}
            — 35-45% below trajectory. Most stalls happen at 3 years without a certification refresh
            or a lateral move.
          </p>
        </div>
        <div
          className={`rounded-2xl border p-4 ${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg}`}
        >
          <p
            className={`font-mono text-caption uppercase tracking-[0.18em] ${REPORT_TONES.secondary.chipText}`}
          >
            GCC premium
          </p>
          <p className="mt-2 text-body-sm text-white/85">
            Cracking a Global Capability Centre at Y3+ adds{" "}
            <span className="font-mono tabular-nums text-white">
              ×{dossier.offshoreMultiplier.toFixed(2)}
            </span>{" "}
            on the median band. Toggle the "GCC" city chip above to see the adjusted table.
          </p>
        </div>
      </div>

      <p className="mt-4 text-caption italic text-white/45">
        Bands are directional benchmarks from public salary aggregators — not job offers. Individual
        offers vary by employer, city, and how you interview.
      </p>
    </ReportCard>
  );
}

export default ChapterSalaryTrajectory;

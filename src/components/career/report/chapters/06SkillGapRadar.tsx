import type { CareerEngineResult } from "@/data/careerEngineScoring";
import type { ReactNode } from "react";
import { ReportCard } from "../ReportCard";
import { Wrench, FileCheck2, AlertTriangle } from "lucide-react";
import { REPORT_TONES } from "../reportTones";

/**
 * ChapterSkillGapRadar — recruiter readiness view. Each bar carries a
 * recruiter-style verdict (Above Average / Average / Needs Improvement) and
 * the chapter rolls up to an overall state (Recruiter Ready / Almost Ready /
 * Practice Needed).
 */
const AXES: { key: string; label: string; bar: number }[] = [
  { key: "compliance", label: "Domain (compliance)", bar: 60 },
  { key: "logic", label: "Process (logic)", bar: 55 },
  { key: "detail", label: "Detail & QA", bar: 60 },
  { key: "data", label: "Data / spreadsheet", bar: 50 },
  { key: "screen", label: "Tool exposure", bar: 45 },
];

/**
 * Per-axis recruiter guidance: what to build, what to show as proof, and the
 * specific readiness gap a recruiter would flag if the axis stays below bar.
 */
const AXIS_GUIDANCE: Record<string, { skill: string; proof: string; gap: string }> = {
  compliance: {
    skill: "ICH-GCP + Schedule Y basics, SOP-first thinking",
    proof: "1 mock deviation report + a redlined SOP on your CV",
    gap: "Can't cite which regulation applies to a given scenario",
  },
  logic: {
    skill: "Root-cause analysis and process-flow mapping",
    proof: "A CAPA write-up or workflow diagram in your portfolio",
    gap: "Freezes when asked 'walk me through your reasoning'",
  },
  detail: {
    skill: "Line-by-line QC, discrepancy spotting, audit-trail hygiene",
    proof: "Annotated sample dataset with 3+ discrepancies flagged",
    gap: "Misses temporal or unit inconsistencies under time pressure",
  },
  data: {
    skill: "Excel (pivot, xlookup, IF), basic SQL, clean data entry",
    proof: "One dashboard or reconciled dataset shared publicly",
    gap: "Can't reshape a messy sheet without breaking formulas",
  },
  screen: {
    skill: "Hands-on exposure to Medidata Rave, Veeva, or Argus",
    proof: "Screenshots of a live task inside the actual tool",
    gap: "Recruiter can't tell if you've ever logged into the system",
  },
};

function scaleTrait(v: number): number {
  return Math.max(0, Math.min(100, Math.round(((v + 3) / 6) * 100)));
}

type BarState = "above" | "average" | "needs";
const BAR_STATE_LABEL: Record<BarState, string> = {
  above: "Above Average",
  average: "Average",
  needs: "Needs Improvement",
};
const BAR_STATE_STYLE: Record<BarState, string> = {
  above: REPORT_TONES.secondary.statePill,
  average: REPORT_TONES.warn.statePill,
  needs: REPORT_TONES["ruled-out"].statePill,
};

function barState(you: number, bar: number): BarState {
  if (you >= bar + 10) return "above";
  if (you >= bar - 5) return "average";
  return "needs";
}

type OverallState = {
  key: "ready" | "almost" | "practice";
  label: string;
  blurb: string;
  style: string;
};
function overallState(states: BarState[]): OverallState {
  const above = states.filter((s) => s === "above").length;
  const needs = states.filter((s) => s === "needs").length;
  const total = states.length;
  if (above >= Math.ceil(total / 2) && needs === 0) {
    return {
      key: "ready",
      label: "Recruiter Ready",
      blurb: "You clear the recruiter bar on most axes. Focus on polish and interview reps.",
      style: REPORT_TONES.secondary.statePill,
    };
  }
  if (needs <= 1) {
    return {
      key: "almost",
      label: "Almost Ready",
      blurb:
        "You're at or near the recruiter floor. A short, targeted push gets you interview-ready.",
      style: REPORT_TONES.warn.statePill,
    };
  }
  return {
    key: "practice",
    label: "Practice Needed",
    blurb:
      "A few core axes are below the recruiter floor. The 12-week programme is built for exactly this gap.",
    style: REPORT_TONES["ruled-out"].statePill,
  };
}

export function ChapterSkillGapRadar({
  result,
  chapter,
}: {
  result: CareerEngineResult;
  chapter: number;
}) {
  const traits = (result.traitScores ?? {}) as Record<string, number>;
  const rows = AXES.map((a) => {
    const you = scaleTrait(Number(traits[a.key] ?? 0));
    const projected = Math.min(100, Math.max(you, a.bar + 8) + Math.round((100 - you) * 0.35));
    return { ...a, you, projected, state: barState(you, a.bar) };
  });
  const overall = overallState(rows.map((r) => r.state));

  // Prioritise the axes that need work — recruiter guidance is most useful
  // where the gap is real. Fallback to top 3 axes if the student is already
  // above bar everywhere.
  const focusRows = rows.filter((r) => r.state !== "above").slice(0, 3);
  const guidanceRows = (focusRows.length ? focusRows : rows.slice(0, 3)).map((r) => ({
    ...r,
    guidance: AXIS_GUIDANCE[r.key],
  }));

  return (
    <ReportCard
      id={`ch-${chapter}-gap`}
      chapter={chapter}
      eyebrow="Recruiter readiness"
      tone="warn"
      title="How recruiters would read you today"
      subtitle="Each bar carries a recruiter-style verdict. The header rolls it up to a single readiness state."
      whatThisMeans="This is what a recruiter would say about you today if they scanned your CV for 12 seconds — and exactly what to fix before the next application."
    >
      <div
        className={`mb-5 flex flex-wrap items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm ${overall.style}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
          Overall
        </span>
        <span className="font-bold">{overall.label}</span>
        <span className="basis-full text-xs text-white/70 sm:basis-auto sm:border-l sm:border-white/10 sm:pl-2">
          {overall.blurb}
        </span>
      </div>
      <ul
        className="space-y-4"
        role="img"
        aria-label="Recruiter readiness chart. See the accessible table for values."
      >
        {rows.map((r) => (
          <li key={r.key}>
            <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              <span>{r.label}</span>
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] ${BAR_STATE_STYLE[r.state]}`}
              >
                {BAR_STATE_LABEL[r.state]}
              </span>
            </div>
            <div className="relative mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/25"
                style={{ width: `${r.projected}%` }}
                aria-hidden
              />
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${REPORT_TONES.primary.bar}`}
                style={{ width: `${r.you}%` }}
                aria-hidden
              />
              <div
                className={`absolute top-0 h-full w-[2px] ${REPORT_TONES.warn.dot}`}
                style={{ left: `calc(${r.bar}% - 1px)` }}
                aria-hidden
              />
            </div>
            <div className="mt-1 flex items-center justify-end gap-2 font-mono text-[10px] tabular-nums text-white/45">
              <span>you {r.you}</span>
              <span aria-hidden>·</span>
              <span>bar {r.bar}</span>
              <span aria-hidden>·</span>
              <span>after {r.projected}</span>
            </div>
          </li>
        ))}
      </ul>
      {/* Accessible tabular fallback for screen readers and PDF export */}
      <table className="sr-only">
        <caption>
          Recruiter readiness: current score, recruiter floor, projected after programme, and
          verdict per axis
        </caption>
        <thead>
          <tr>
            <th scope="col">Axis</th>
            <th scope="col">You today</th>
            <th scope="col">Recruiter bar</th>
            <th scope="col">After 12 weeks</th>
            <th scope="col">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <th scope="row">{r.label}</th>
              <td>{r.you}</td>
              <td>{r.bar}</td>
              <td>{r.projected}</td>
              <td>{BAR_STATE_LABEL[r.state]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-white/60">
        <Legend swatch={REPORT_TONES.primary.bar} label="You today" />
        <Legend swatch="bg-white/25" label="After 12 weeks" />
        <Legend swatch={REPORT_TONES.warn.dot} label="Recruiter bar" isLine />
      </div>

      {/* What to address next — skills / proof / gaps, derived per axis. */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.22em] ${REPORT_TONES.warn.eyebrow}`}
        >
          What to address next
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <GuidanceColumn
            icon={<Wrench className={`h-3.5 w-3.5 ${REPORT_TONES.primary.iconFill}`} aria-hidden />}
            title="Skills to build"
            items={guidanceRows.map((r) => ({ axis: r.label, text: r.guidance.skill }))}
          />
          <GuidanceColumn
            icon={
              <FileCheck2
                className={`h-3.5 w-3.5 ${REPORT_TONES.secondary.iconFill}`}
                aria-hidden
              />
            }
            title="Proof to show"
            items={guidanceRows.map((r) => ({ axis: r.label, text: r.guidance.proof }))}
          />
          <GuidanceColumn
            icon={
              <AlertTriangle className={`h-3.5 w-3.5 ${REPORT_TONES.warn.iconFill}`} aria-hidden />
            }
            title="Readiness gaps"
            items={guidanceRows.map((r) => ({ axis: r.label, text: r.guidance.gap }))}
          />
        </div>
      </div>
    </ReportCard>
  );
}

function GuidanceColumn({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: { axis: string; text: string }[];
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 font-grotesk text-xs font-bold uppercase tracking-[0.14em] text-white/80">
        {icon}
        {title}
      </p>
      <ul className="mt-2 space-y-2">
        {items.map((it) => (
          <li key={`${title}-${it.axis}`} className="text-xs leading-snug text-white/70">
            <span className="font-semibold text-white/90">{it.axis}:</span> {it.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Legend({ swatch, label, isLine }: { swatch: string; label: string; isLine?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`inline-block ${isLine ? "h-3 w-[2px]" : "h-2 w-4 rounded-full"} ${swatch}`}
        aria-hidden
      />
      {label}
    </span>
  );
}

export default ChapterSkillGapRadar;

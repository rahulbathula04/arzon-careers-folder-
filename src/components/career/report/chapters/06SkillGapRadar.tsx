import type { CareerEngineResult } from "@/data/careerEngineScoring";
import type { ReactNode } from "react";
import { ReportCard } from "../ReportCard";
import { Wrench, FileCheck2, AlertTriangle } from "lucide-react";

const AXES: { key: string; label: string; bar: number }[] = [
  { key: "compliance", label: "Domain (compliance)", bar: 60 },
  { key: "logic", label: "Process (logic)", bar: 55 },
  { key: "detail", label: "Detail & QA", bar: 60 },
  { key: "data", label: "Data / spreadsheet", bar: 50 },
  { key: "screen", label: "Tool exposure", bar: 45 },
];

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
  above: "border-emerald-400/30 bg-emerald-500/20 text-emerald-300",
  average: "border-amber-400/30 bg-amber-500/20 text-amber-300",
  needs: "border-rose-400/30 bg-rose-500/20 text-rose-300",
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
      style: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    };
  }
  if (needs <= 1) {
    return {
      key: "almost",
      label: "Almost Ready",
      blurb:
        "You're at or near the recruiter floor. A short, targeted push gets you interview-ready.",
      style: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    };
  }
  return {
    key: "practice",
    label: "Practice Needed",
    blurb:
      "A few core axes are below the recruiter floor. The 12-week programme is built for exactly this gap.",
    style: "border-rose-500/30 bg-rose-500/10 text-rose-300",
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

  const focusRows = rows.filter((r) => r.state !== "above").slice(0, 3);
  const fallbackGuidance = {
    skill: "Domain fundamentals & SOP discipline",
    proof: "1 portfolio artefact",
    gap: "Needs practical exercise reps",
  };

  const guidanceRows = (focusRows.length ? focusRows : rows.slice(0, 3)).map((r) => ({
    ...r,
    guidance: AXIS_GUIDANCE[r.key] ?? fallbackGuidance,
  }));

  return (
    <ReportCard
      id={`ch-${chapter}-gap`}
      chapter={chapter}
      eyebrow="Recruiter Readiness"
      tone="warn"
      title="How recruiters would read you today"
      subtitle="Each bar carries a recruiter-style verdict. The header rolls it up to a single readiness state."
      whatThisMeans="This is what a recruiter would say about you today if they scanned your CV for 12 seconds - and exactly what to fix before the next application."
    >
      <div
        className={`mb-5 flex flex-wrap items-center gap-3 rounded-2xl border p-4 text-sm font-semibold shadow-lg ${overall.style}`}
      >
        <span className="font-mono text-xs uppercase tracking-wider opacity-80">Overall</span>
        <span className="font-bold text-base">{overall.label}</span>
        <span className="basis-full text-xs text-slate-300 sm:basis-auto sm:border-l sm:border-white/10 sm:pl-3">
          {overall.blurb}
        </span>
      </div>

      <ul className="space-y-4">
        {rows.map((r) => (
          <li key={r.key} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              <span>{r.label}</span>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${BAR_STATE_STYLE[r.state]}`}
              >
                {BAR_STATE_LABEL[r.state]}
              </span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-white/20"
                style={{ width: `${r.projected}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#2563EB]"
                style={{ width: `${r.you}%` }}
              />
              <div
                className="absolute top-0 h-full w-[2px] bg-amber-400"
                style={{ left: `calc(${r.bar}% - 1px)` }}
              />
            </div>
            <div className="flex items-center justify-end gap-2 font-mono text-xs tabular-nums text-slate-400">
              <span>You: {r.you}</span>
              <span>•</span>
              <span>Bar: {r.bar}</span>
              <span>•</span>
              <span>After 12w: {r.projected}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Guidance Columns */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-[#161F33] p-5 space-y-4 shadow-lg">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
          What to address next
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <GuidanceColumn
            icon={<Wrench className="h-4 w-4 text-blue-400" />}
            title="Skills to build"
            items={guidanceRows.map((r) => ({ axis: r.label, text: r.guidance.skill }))}
          />
          <GuidanceColumn
            icon={<FileCheck2 className="h-4 w-4 text-emerald-400" />}
            title="Proof to show"
            items={guidanceRows.map((r) => ({ axis: r.label, text: r.guidance.proof }))}
          />
          <GuidanceColumn
            icon={<AlertTriangle className="h-4 w-4 text-rose-400" />}
            title="Recruiter gap line"
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
    <div className="rounded-xl border border-white/10 bg-[#0B0F19] p-4 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
          {title}
        </span>
      </div>
      <ul className="space-y-2 text-xs text-slate-300 pt-1">
        {(items ?? []).map((it, idx) => (
          <li key={idx} className="space-y-0.5">
            <span className="block font-mono text-[10px] font-bold text-slate-400 uppercase">
              {it.axis}
            </span>
            <span className="text-slate-200">{it.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChapterSkillGapRadar;

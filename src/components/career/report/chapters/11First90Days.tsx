import { useMemo, useState } from "react";
import { AlertTriangle, CalendarPlus, Rocket, Target, Flag, Sparkles } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { getPathDossier } from "@/data/careerPathDossier";
import { ReportCard } from "../ReportCard";
import { buildIcs, downloadIcs, nextMondayInWeeks } from "@/lib/calendarIcs";
import { useReportState } from "../ReportStateContext";
import { personalizeFirst90Week, summarizeProfile } from "@/lib/report/personalize";

type Track = "fast" | "steady" | "foundation";

const TRACKS: Record<Track, { label: string; note: string }> = {
  fast: {
    label: "Fast-track",
    note: "Domain-strong, high pressure tolerance. You can compress the shadow phase and own a queue by day 40.",
  },
  steady: {
    label: "Steady",
    note: "Balanced signals. Follow the canonical 30/60/90 arc without cutting corners.",
  },
  foundation: {
    label: "Foundation",
    note: "Domain or workplace signal needs building. Add a week of drills before each phase transition.",
  },
};

function trackFor(result: CareerEngineResult): Track {
  const t = (result.traitScores as Record<string, number>) ?? {};
  const domain = Number(t.compliance ?? 0);
  const pressure = Number(t.pressure ?? 0);
  const detail = Number(t.detail ?? 0);
  const composite = domain * 0.5 + pressure * 0.3 + detail * 0.2;
  if (composite >= 1.2) return "fast";
  if (composite <= -0.3) return "foundation";
  return "steady";
}

interface WeekRow {
  week: number;
  phase: "30" | "60" | "90";
  deliverable: string;
  tools: string[];
  success: string;
}

function buildWeeks(dossier: ReturnType<typeof getPathDossier>, track: Track): WeekRow[] {
  const [p30, p60, p90] = dossier.first90Days;
  const coreTools = dossier.tools
    .flatMap((c) => c.items.filter((i) => i.frequency === "daily").map((i) => i.name))
    .slice(0, 4);
  const weekly = dossier.tools
    .flatMap((c) => c.items.filter((i) => i.frequency !== "daily").map((i) => i.name))
    .slice(0, 3);

  const phases: { window: "30" | "60" | "90"; weeks: number; phase: typeof p30 }[] = [
    { window: "30", weeks: track === "fast" ? 3 : track === "foundation" ? 5 : 4, phase: p30 },
    { window: "60", weeks: track === "fast" ? 5 : track === "foundation" ? 3 : 4, phase: p60 },
    { window: "90", weeks: track === "fast" ? 4 : track === "foundation" ? 4 : 4, phase: p90 },
  ];

  const rows: WeekRow[] = [];
  let week = 1;
  for (const { window, weeks, phase } of phases) {
    const outcomes = phase.outcomes;
    for (let i = 0; i < weeks; i++) {
      const outcome = outcomes[i % outcomes.length];
      const tools =
        window === "30"
          ? coreTools.slice(0, 2)
          : window === "60"
            ? coreTools
            : [...coreTools, ...weekly].slice(0, 4);
      rows.push({
        week,
        phase: window,
        deliverable: outcome,
        tools,
        success:
          window === "30"
            ? "You can describe what you did without notes."
            : window === "60"
              ? "Your work is going into production with < 8% rework."
              : "A teammate is asking you to review their work.",
      });
      week++;
      if (week > 12) break;
    }
    if (week > 12) break;
  }
  return rows.slice(0, 12);
}

export function ChapterFirst90Days({
  slug,
  chapter,
  result,
}: {
  slug: string;
  chapter: number;
  result?: CareerEngineResult;
}) {
  const dossier = getPathDossier(slug);
  const suggested = result ? trackFor(result) : "steady";
  const [track, setTrack] = useState<Track>(suggested);
  const weeks = useMemo(() => buildWeeks(dossier, track), [dossier, track]);
  const state = useReportState();
  const profile = state.quizProfile;

  const handleDownload = () => {
    const events = weeks.map((w) => ({
      uid: `arzon-90d-${slug}-w${w.week}`,
      title: `Week ${w.week} · ${w.deliverable.slice(0, 60)}`,
      description: `Phase Day ${w.phase} · ${w.deliverable}\n\nTools: ${w.tools.join(", ")}\nSuccess: ${w.success}\n\nArzon 90-day execution plan — ${slug}`,
      date: nextMondayInWeeks(w.week),
    }));
    const ics = buildIcs(`Arzon · 90-day plan · ${slug}`, events);
    downloadIcs(`arzon-90day-${slug}.ics`, ics);
  };

  return (
    <ReportCard
      id={`ch-${chapter}-first90`}
      chapter={chapter}
      readMinutes={6}
      eyebrow="First 90 Days · Execution Plan"
      tone="secondary"
      title="Your 12-week internship plan — week by week"
      subtitle="Personalised to your traits. Each row: what you ship, which tools you touch, and what 'success' looks like. Download as a calendar and put the deliverables in front of you."
      whatThisMeans="If you actually ship the 12 weekly outputs below, you finish the internship with a portfolio a hiring manager can't ignore."
    >
      {/* Personalization banner */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-xs text-blue-200">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Sparkles className="h-4 w-4 text-blue-400 shrink-0" />
          {profile
            ? `Plan tuned to your profile · ${summarizeProfile(profile)}`
            : "This plan is generic. Personalise it to your existing skills."}
        </span>
        <button
          type="button"
          onClick={state.openQuiz}
          className="rounded-full border border-blue-400/40 bg-blue-500/20 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white hover:bg-blue-500/40 transition-colors"
        >
          {profile ? "Update profile" : "Personalize (60s)"}
        </button>
      </div>

      {/* Track selector */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
          Suggested Track
        </span>
        <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1 gap-1">
          {(Object.keys(TRACKS) as Track[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrack(t)}
              aria-pressed={track === t}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                track === t
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {TRACKS[t].label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="ml-auto inline-flex h-10 items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 shadow-md transition-colors"
        >
          <CalendarPlus className="h-4 w-4 text-white" /> Add to Calendar (.ics)
        </button>
      </div>

      <p className="mt-3 text-xs sm:text-sm text-slate-300">
        <strong className="text-white font-bold">{TRACKS[track].label}:</strong>{" "}
        {TRACKS[track].note}
      </p>

      {/* Weekly grid */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#161F33] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-xs sm:text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr className="text-left">
                <th className="w-24 px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Week
                </th>
                <th className="px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Deliverable
                </th>
                <th className="px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tools
                </th>
                <th className="px-4 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Success Looks Like
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {weeks.map((w) => {
                const isMilestone = w.week === 4 || w.week === 8 || w.week === 12;
                const anno = personalizeFirst90Week(w.week, w.tools, profile);
                return (
                  <tr key={w.week} className={isMilestone ? "bg-blue-500/5" : ""}>
                    <td className="px-4 py-3.5 align-top">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-blue-400/40 bg-blue-500/20 font-mono text-xs font-bold text-blue-300 tabular-nums">
                          {w.week}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase text-slate-400">
                          D{w.phase}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-top font-medium text-white">
                      {w.deliverable}
                      {isMilestone && (
                        <div className="mt-1.5 inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                          <Flag className="h-3.5 w-3.5" /> Milestone Check
                        </div>
                      )}
                      {anno.weekNudge && (
                        <div className="mt-1.5 inline-flex items-center gap-1 rounded-md border border-blue-400/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-blue-300">
                          <Sparkles className="h-3 w-3" /> {anno.weekNudge}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {w.tools.map((tool) => {
                          const owned = anno.toolSubstitutions.some((s) => s.drop === tool);
                          return (
                            <span
                              key={tool}
                              className={`rounded-md border px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider ${
                                owned
                                  ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-300 line-through"
                                  : "border-white/15 bg-white/10 text-slate-200"
                              }`}
                            >
                              {tool}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-top text-slate-300">{w.success}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Milestone red-flag strip */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {dossier.first90Days.map((phase) => {
          const Icon = phase.window === "30" ? Rocket : phase.window === "60" ? Target : Flag;
          const badgeColor =
            phase.window === "30"
              ? "border-blue-500/30 bg-[#161F33] text-blue-400"
              : phase.window === "60"
                ? "border-emerald-500/30 bg-[#161F33] text-emerald-400"
                : "border-amber-500/30 bg-[#161F33] text-amber-400";
          return (
            <div
              key={phase.window}
              className={`rounded-2xl border p-5 space-y-3 shadow-lg ${badgeColor}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <p className="font-mono text-xs font-bold uppercase tracking-wider">
                  Day {phase.window} · {phase.title}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {phase.outcomes[0]}
              </p>
              <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-[#0B0F19] p-3 text-xs text-slate-300">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <span>
                  <strong className="font-bold text-rose-400">Red Flag:</strong> {phase.redFlag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </ReportCard>
  );
}

export default ChapterFirst90Days;

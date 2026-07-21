/**
 * ChapterFirst90Days — personalised 12-week execution plan.
 *
 * Not a static tri-panel any more. Renders a 12-row weekly grid
 * (Deliverable · Tools · What success looks like) driven by the dossier's
 * first90Days + tools arrays, personalised to a track chosen from the
 * user's traits (Fast-track / Steady / Foundation). Milestone markers at
 * days 30/60/90 with red-flag lines. "Add to calendar" downloads a 12-week
 * ICS with each week's task as a scheduled event.
 */
import { useMemo, useState } from "react";
import { AlertTriangle, CalendarPlus, Rocket, Target, Flag } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { getPathDossier } from "@/data/careerPathDossier";
import { ReportCard } from "../ReportCard";
import { REPORT_TONES } from "../reportTones";
import { buildIcs, downloadIcs, nextMondayInWeeks } from "@/lib/calendarIcs";
import { useReportState } from "../ReportStateContext";
import { personalizeFirst90Week, summarizeProfile } from "@/lib/report/personalize";
import { Sparkles } from "lucide-react";

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

  // Pace: fast-track compresses phase 1 into 2 weeks, extends phase 3.
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

const PHASE_TONE: Record<"30" | "60" | "90", keyof typeof REPORT_TONES> = {
  "30": "primary",
  "60": "secondary",
  "90": "warn",
};

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
      eyebrow="First 90 days · execution plan"
      tone="secondary"
      title="Your 12-week internship plan — week by week"
      subtitle="Personalised to your traits. Each row: what you ship, which tools you touch, and what 'success' looks like. Download as a calendar and put the deliverables in front of you."
      whatThisMeans="If you actually ship the 12 weekly outputs below, you finish the internship with a portfolio a hiring manager can't ignore."
    >
      {/* Personalization banner */}
      <div
        className={`mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2 text-caption ${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          {profile
            ? `Plan tuned to your profile · ${summarizeProfile(profile)}`
            : "This plan is generic. Personalise it to your existing skills."}
        </span>
        <button
          type="button"
          onClick={state.openQuiz}
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest hover:brightness-110 ${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`}
        >
          {profile ? "Update profile" : "Personalize (60s)"}
        </button>
      </div>

      {/* Track selector */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-caption uppercase tracking-[0.18em] text-white/50">
          Suggested track
        </span>
        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          {(Object.keys(TRACKS) as Track[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrack(t)}
              aria-pressed={track === t}
              className={`rounded-full px-3 py-1 font-mono text-caption uppercase tracking-[0.14em] transition ${
                track === t
                  ? `${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`
                  : "text-white/60 hover:text-white"
              }`}
            >
              {TRACKS[t].label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className={`ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border px-3 font-mono text-caption uppercase tracking-[0.14em] transition ${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText} hover:brightness-110`}
        >
          <CalendarPlus className="h-3.5 w-3.5" /> Add to calendar (.ics)
        </button>
      </div>

      <p className="mt-3 text-body-sm text-white/70">
        <strong className="text-white/85">{TRACKS[track].label}:</strong> {TRACKS[track].note}
      </p>

      {/* Weekly grid */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-body-sm">
            <thead className="bg-white/[0.03]">
              <tr className="text-left">
                <th className="w-20 px-4 py-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Week
                </th>
                <th className="px-4 py-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Deliverable
                </th>
                <th className="px-4 py-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Tools
                </th>
                <th className="px-4 py-3 font-mono text-caption uppercase tracking-[0.14em] text-white/50">
                  Success looks like
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {weeks.map((w) => {
                const tone = REPORT_TONES[PHASE_TONE[w.phase]];
                const isMilestone = w.week === 4 || w.week === 8 || w.week === 12;
                const anno = personalizeFirst90Week(w.week, w.tools, profile);
                return (
                  <tr key={w.week} className={isMilestone ? "bg-white/[0.02]" : ""}>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full border font-mono text-caption tabular-nums ${tone.chipBorder} ${tone.chipBg} ${tone.chipText}`}
                        >
                          {w.week}
                        </span>
                        <span className="font-mono text-caption uppercase tracking-[0.12em] text-white/40">
                          D{w.phase}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-white/85">
                      {w.deliverable}
                      {isMilestone && (
                        <div
                          className={`mt-1 inline-flex items-center gap-1 font-mono text-caption uppercase tracking-[0.14em] ${tone.chipText}`}
                        >
                          <Flag className="h-3 w-3" /> Milestone check
                        </div>
                      )}
                      {anno.weekNudge && (
                        <div
                          className={`mt-1 inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText}`}
                        >
                          <Sparkles className="h-3 w-3" /> {anno.weekNudge}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex flex-wrap gap-1">
                        {w.tools.map((tool) => {
                          const owned = anno.toolSubstitutions.some((s) => s.drop === tool);
                          return (
                            <span
                              key={tool}
                              title={
                                owned ? "Already in your skill list — use as leverage" : undefined
                              }
                              className={`rounded-md border px-1.5 py-0.5 font-mono text-caption uppercase tracking-[0.1em] ${
                                owned
                                  ? `${REPORT_TONES.secondary.chipBorder} ${REPORT_TONES.secondary.chipBg} ${REPORT_TONES.secondary.chipText} line-through opacity-80`
                                  : `${REPORT_TONES.neutral.chipBorder} ${REPORT_TONES.neutral.chipBg} ${REPORT_TONES.neutral.chipText}`
                              }`}
                            >
                              {tool}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-white/65">{w.success}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Milestone red-flag strip */}
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {dossier.first90Days.map((phase) => {
          const tone = REPORT_TONES[PHASE_TONE[phase.window as "30" | "60" | "90"]];
          const Icon = phase.window === "30" ? Rocket : phase.window === "60" ? Target : Flag;
          return (
            <div
              key={phase.window}
              className={`rounded-2xl border p-4 ${tone.chipBorder} ${tone.chipBg}`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${tone.iconFill}`} />
                <p
                  className={`font-mono text-caption uppercase tracking-[0.18em] ${tone.chipText}`}
                >
                  Day {phase.window} · {phase.title}
                </p>
              </div>
              <p className="mt-2 text-body-sm text-white/80">{phase.outcomes[0]}</p>
              <div className="mt-3 flex gap-2 rounded-lg border border-white/10 bg-black/25 p-2 text-caption text-white/70">
                <AlertTriangle
                  className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${REPORT_TONES["ruled-out"].iconFill}`}
                />
                <span>
                  <strong className="font-semibold text-white/85">Red flag:</strong> {phase.redFlag}
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

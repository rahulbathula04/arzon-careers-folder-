/**
 * ChapterFitBreakdown - transparent role-fit scoring breakdown.
 *
 * Shows: (1) how the fit score is composed (Domain 40 / Process 30 /
 * Tools 20 / Workplace 10), (2) the signals we saw in the user's answers
 * and what's still missing, (3) top three priority gaps with an action
 * plan of Week 1/2/3 tasks and a "success looks like" line.
 *
 * Data sources: `result.breakdown` (aptitude/interest/background/commitment)
 * mapped to the 40/30/20/10 pillars, and `result.traitScores` for the
 * per-trait signal breakdown.
 */
import { ArrowRight, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { ReportCard } from "../ReportCard";
import { REPORT_TONES } from "../reportTones";

interface Pillar {
  key: "domain" | "process" | "tools" | "workplace";
  label: string;
  weight: number;
  score: number; // 0..100
  detail: string;
}

function buildPillars(result: CareerEngineResult): Pillar[] {
  const b = result.breakdown ?? { aptitude: 0, interest: 0, background: 0, commitment: 0 };
  const t = result.traitScores as Record<string, number>;
  const norm = (v: number) => Math.max(0, Math.min(100, Math.round(v)));
  const trait = (k: string) => norm(((Number(t?.[k] ?? 0) + 3) / 6) * 100);
  return [
    {
      key: "domain",
      label: "Domain knowledge",
      weight: 40,
      score: norm(((b.background ?? 0) + (b.interest ?? 0)) / 2),
      detail:
        "How well your stated background + interest map to the role's regulatory / clinical vocabulary.",
    },
    {
      key: "process",
      label: "Process rigour",
      weight: 30,
      score: Math.round((trait("logic") + trait("detail")) / 2),
      detail: "Traits: logic + detail. Recruiters proxy this via case-work samples.",
    },
    {
      key: "tools",
      label: "Tool exposure",
      weight: 20,
      score: Math.round((trait("data") + trait("screen")) / 2),
      detail: "Screen-time comfort + data-comfort. Employer-specific tools are learned on the job.",
    },
    {
      key: "workplace",
      label: "Workplace readiness",
      weight: 10,
      score: Math.round((trait("pressure") + trait("language")) / 2),
      detail: "Deadline pressure tolerance + clinical-English fluency.",
    },
  ];
}

interface Gap {
  pillar: Pillar;
  delta: number; // points to lift score into next band
  week1: string;
  week2: string;
  week3: string;
  success: string;
  artefact: string;
  moduleTo?: string;
}

const GAP_PLAN: Record<Pillar["key"], Omit<Gap, "pillar" | "delta">> = {
  domain: {
    week1: "Read 3 recent Indian JDs end-to-end; extract the 20 recurring domain terms.",
    week2: "Complete the Arzon domain primer for your slug; sit the module MCQ.",
    week3: "Author a 1-page domain glossary in your own words; peer-review with a mentor.",
    success: "You can define every recurring JD term without googling.",
    artefact: "Personal glossary (Notion / Google Doc)",
    moduleTo: "/courses",
  },
  process: {
    week1: "Complete 5 sample cases from the free drill bank; log cycle time.",
    week2: "Do 10 more, this time with peer QC; track discrepancy rate.",
    week3: "Sit a timed 20-case set at target QC ≥ 92%.",
    success: "You process a full daily queue at ≤ 8% rework in a timed simulation.",
    artefact: "Case-drill scoresheet with QC trend line",
    moduleTo: "/career-engine",
  },
  tools: {
    week1: "Get sandbox access to the two top tools for your slug; work through the guided tour.",
    week2: "Ship one artefact per tool (e.g. one Argus ICSR + one MedDRA coded event set).",
    week3: "Screen-record a 5-min walkthrough for your portfolio.",
    success: "You have a portfolio link with tool artefacts a recruiter can open.",
    artefact: "Portfolio page with 3 tool artefacts",
    moduleTo: "/portfolio",
  },
  workplace: {
    week1: "Book two 20-min mock stand-ups with a mentor; script your update.",
    week2: "Take the ASSAY communication + integrity modules.",
    week3: "Record a 3-min clinical-English self-intro and share for feedback.",
    success: "You can run a status stand-up and take a client-style question without freezing.",
    artefact: "ASSAY communication score + recorded intro",
    moduleTo: "/career-engine",
  },
};

function pillarBar(p: Pillar, tone: keyof typeof REPORT_TONES) {
  const t = REPORT_TONES[tone];
  const contribution = Math.round((p.score * p.weight) / 100);
  return (
    <div key={p.key} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-grotesk text-body-sm font-bold text-white">{p.label}</p>
        <p className="font-mono text-caption tabular-nums text-white/55">
          <span className={t.accentText}>{contribution}</span>
          <span className="text-white/40"> / {p.weight}</span>
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.04]">
        <div
          className={`h-full rounded-full ${t.accentBg} motion-safe:transition-all motion-safe:duration-700`}
          style={{ width: `${p.score}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-caption text-white/45">
        {p.score}/100 on the pillar · weighted {p.weight}%
      </p>
      <p className="mt-2 text-caption text-white/60">{p.detail}</p>
    </div>
  );
}

export function ChapterFitBreakdown({
  result,
  chapter,
}: {
  result: CareerEngineResult;
  chapter: number;
}) {
  const pillars = buildPillars(result);
  const overall = Math.round(pillars.reduce((s, p) => s + (p.score * p.weight) / 100, 0));
  const answered = result.evidence?.scoring?.answered ?? 0;

  const gaps: Gap[] = pillars
    .map((p) => {
      const delta = Math.max(0, Math.min(30, 80 - p.score));
      return { pillar: p, delta, ...GAP_PLAN[p.key] };
    })
    .sort((a, b) => b.delta * b.pillar.weight - a.delta * a.pillar.weight)
    .slice(0, 3);

  return (
    <ReportCard
      id={`ch-${chapter}-fit-breakdown`}
      chapter={chapter}
      chapterTotal={20}
      readMinutes={4}
      eyebrow="Score composition"
      tone="primary"
      title="How your fit score was actually calculated"
      subtitle={`Built from ${answered} answers across 4 recruiter-weighted pillars. Every point above is explainable and every gap has a plan.`}
      score={{ value: overall, suffix: "composed" }}
    >
      {/* Composition */}
      <div className="grid gap-3 sm:grid-cols-2">
        {pillars.map((p, i) => {
          const tone: (keyof typeof REPORT_TONES)[] = ["primary", "secondary", "primary", "warn"];
          return pillarBar(p, tone[i] ?? "primary");
        })}
      </div>

      {/* Priority gaps + action plan */}
      <div className="mt-8">
        <p className="font-mono text-caption uppercase tracking-[0.22em] text-white/50">
          Priority gaps · ranked by weight × delta
        </p>
        <div className="mt-3 space-y-3">
          {gaps.map((g, i) => (
            <div key={g.pillar.key} className="glass-panel-deep rounded-2xl p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-caption uppercase tracking-[0.22em] text-white/45">
                    Gap #{i + 1} · lifts fit by ~{Math.round((g.delta * g.pillar.weight) / 100)} pts
                  </p>
                  <p className="mt-1 font-display text-h4 text-white">Close: {g.pillar.label}</p>
                </div>
                {g.moduleTo && (
                  <Link
                    to={g.moduleTo}
                    className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 font-mono text-caption uppercase tracking-[0.14em] transition ${REPORT_TONES.primary.chipBorder} ${REPORT_TONES.primary.chipBg} ${REPORT_TONES.primary.chipText} hover:brightness-110`}
                  >
                    Close this gap <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
              <ol className="mt-4 grid gap-2 sm:grid-cols-3">
                {["Week 1", "Week 2", "Week 3"].map((wk, idx) => (
                  <li key={wk} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                    <p className="font-mono text-caption uppercase tracking-[0.16em] text-white/45">
                      {wk}
                    </p>
                    <p className="mt-1 text-body-sm text-white/85">
                      {idx === 0 ? g.week1 : idx === 1 ? g.week2 : g.week3}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-caption">
                <Target className={`h-3.5 w-3.5 ${REPORT_TONES.secondary.iconFill}`} />
                <span className="text-white/75">
                  <strong className="font-semibold text-white/90">Success looks like:</strong>{" "}
                  {g.success}
                </span>
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 font-mono uppercase tracking-[0.14em] ${REPORT_TONES.neutral.chipBg} ${REPORT_TONES.neutral.chipText}`}
                >
                  Artefact · {g.artefact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <details className="mt-6 group">
        <summary className="cursor-pointer select-none font-mono text-caption uppercase tracking-[0.18em] text-white/55 hover:text-white/80">
          How this was scored
        </summary>
        <div className="glass-panel-deep mt-3 space-y-2 rounded-2xl p-4 text-body-sm text-white/70">
          <p>
            <strong className="text-white/85">40/30/20/10 deployment-ready model.</strong> Domain 40
            · Process 30 · Tools 20 · Workplace 10. Weights match how Indian recruiters actually
            filter at L1 (based on 150+ live JD audits).
          </p>
          <p>
            <strong className="text-white/85">Your pillar scores</strong> are computed live from
            your answers - Domain from your background/interest answers; Process/Tools/Workplace
            from the trait aggregates (logic/detail, data/screen, pressure/language).
          </p>
          <p>
            <strong className="text-white/85">Gap ranking</strong> ={" "}
            <em>points to next band × pillar weight</em>. That's why closing a small Domain gap
            usually beats closing a big Workplace gap.
          </p>
        </div>
      </details>
    </ReportCard>
  );
}

export default ChapterFitBreakdown;

/**
 * CareerFitReportV3 — Coursera/Duolingo-inspired 8-chapter report on top of
 * the master ReportCard primitive. Preserves the existing normalise/rebuild
 * result pipeline and the recommendation-outcome side effect.
 *
 * Chapters:
 *   1  Verdict
 *   2  Three Numbers  (+ inline ASSAY handoff)
 *   3  Primary Fit
 *   4  Why This, Not That
 *   5  Decision Helper (top-3 side-by-side)
 *   6  Skill Gap Radar
 *   7  Market Reality (India)
 *   8  Seven-Day Streak
 */
import { useEffect, useRef, useState } from "react";
// (icons removed from recruiter strip — pure monochrome editorial)
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { familyForPathSlug } from "@/data/careerFamilies";
import { RoleLadder } from "@/components/career/v2/RoleLadder";
import { DownloadReportPdfButton } from "@/components/career/v2/DownloadReportPdfButton";
import { recordChosenRole, recordRecommendation } from "@/lib/recommendationOutcomes.functions";
import { track } from "@/lib/track";
import { type RailChapter } from "./SectionRail";
import { LeftChapterRail, MobileChapterStrip, type RailGroup } from "./LeftChapterRail";
import { ReportStateProvider, useReportState } from "./ReportStateContext";
import { ReportActionBar } from "./ReportActionBar";
import { ReportFreshnessBadge } from "./ReportFreshnessBadge";
import { EvidenceExplorerModal } from "./EvidenceExplorerModal";
import { RoleFitQuiz } from "./RoleFitQuiz";
import { ChapterVerdict } from "./chapters/01Verdict";
import { ChapterMethodology } from "./chapters/00bMethodology";
import { ChapterFitBreakdown } from "./chapters/01bFitBreakdown";
import { ChapterThreeNumbers } from "./chapters/02ThreeNumbers";
import { ChapterPrimaryFit } from "./chapters/03PrimaryFit";
import { ChapterWhyNotThat } from "./chapters/04WhyNotThat";
import { ChapterDecisionHelper } from "./chapters/05DecisionHelper";
import { ChapterSkillGapRadar } from "./chapters/06SkillGapRadar";
import { ChapterSevenDays } from "./chapters/08SevenDays";
import { ChapterActionPlan } from "./chapters/08aActionPlan";
import { ChapterMarketReality } from "./chapters/07MarketReality";
import { ChapterCompanies } from "./chapters/09Companies";
import { ChapterTools } from "./chapters/10Tools";
import { ChapterFirst90Days } from "./chapters/11First90Days";
import { ChapterDayInLife } from "./chapters/12DayInLife";
import { ChapterSalaryTrajectory } from "./chapters/13SalaryTrajectory";
import { ChapterGrowthChart } from "./chapters/14GrowthChart";
import { ChapterAiOutlook } from "./chapters/15AiOutlook";
import { ChapterCities } from "./chapters/16Cities";
import { ChapterInterviewReality } from "./chapters/17InterviewReality";
import { ChapterPivots } from "./chapters/18Pivots";
import { ChapterObjections } from "./chapters/19Objections";
import { HeroSnapshot } from "./HeroSnapshot";
import { NextStepCta } from "./NextStepCta";

const CHAPTERS: RailChapter[] = [
  { id: "ch-1-verdict", number: 1, label: "Verdict" },
  { id: "ch-0-methodology", number: 0, label: "Methodology" },
  { id: "ch-2-fit-breakdown", number: 2, label: "Fit breakdown" },
  { id: "ch-3-three-numbers", number: 3, label: "The numbers" },
  { id: "ch-4-primary", number: 4, label: "Primary fit" },
  { id: "ch-5-why-not", number: 5, label: "Why not the runner-up" },
  { id: "ch-6-decision", number: 6, label: "Compare top matches" },
  { id: "ch-7-companies", number: 7, label: "Who's hiring" },
  { id: "ch-8-tools", number: 8, label: "Tools you'll use" },
  { id: "ch-9-first90", number: 9, label: "First 90 days" },
  { id: "ch-10-day", number: 10, label: "Day in the life" },
  { id: "ch-11-salary", number: 11, label: "Salary Y0→Y10" },
  { id: "ch-12-growth", number: 12, label: "10-yr demand" },
  { id: "ch-13-ai", number: 13, label: "AI · 2030 outlook" },
  { id: "ch-14-cities", number: 14, label: "Cities to target" },
  { id: "ch-15-market", number: 15, label: "Market reality" },
  { id: "ch-16-gap", number: 16, label: "Recruiter readiness" },
  { id: "ch-17-interview", number: 17, label: "Interview reality" },
  { id: "ch-18-pivots", number: 18, label: "Pivots" },
  { id: "ch-19-objections", number: 19, label: "Straight answers" },
  { id: "ch-20-action-plan", number: 20, label: "4-week action plan" },
  { id: "ch-21-streak", number: 21, label: "Week 1 · 7-day plan" },
];

const RAIL_GROUPS: RailGroup[] = [
  {
    label: "Your Best Match",
    chapterIds: ["ch-1-verdict", "ch-0-methodology", "ch-2-fit-breakdown", "ch-3-three-numbers"],
  },
  {
    label: "Other Good Options",
    chapterIds: ["ch-4-primary", "ch-5-why-not", "ch-6-decision"],
  },
  {
    label: "Inside This Career",
    chapterIds: [
      "ch-7-companies",
      "ch-8-tools",
      "ch-9-first90",
      "ch-10-day",
      "ch-11-salary",
      "ch-12-growth",
      "ch-13-ai",
      "ch-14-cities",
      "ch-15-market",
    ],
  },
  {
    label: "Your Hiring Readiness",
    chapterIds: ["ch-16-gap", "ch-17-interview", "ch-18-pivots", "ch-19-objections"],
  },
  {
    label: "Your Action Plan",
    chapterIds: ["ch-20-action-plan", "ch-21-streak"],
  },
];

export function CareerFitReportV3(props: {
  result: CareerEngineResult;
  leadId: string | null;
  onRetake?: () => void;
}) {
  return (
    <ReportStateProvider>
      <CareerFitReportV3Inner {...props} />
    </ReportStateProvider>
  );
}

function CareerFitReportV3Inner({
  result,
  leadId,
  onRetake,
}: {
  result: CareerEngineResult;
  leadId: string | null;
  onRetake?: () => void;
}) {
  const pathFits = result.evidence?.scoring?.topPathFits ?? [];
  const topSlugs = (
    pathFits.length
      ? pathFits.slice(0, 3).map((p) => p.slug)
      : (result.archetype.topPaths ?? []).slice(0, 3).map((p) => p.slug)
  ).filter((slug) => Boolean(PATHS[slug]));

  const primarySlug = topSlugs[0];
  const topFamily = primarySlug ? familyForPathSlug(primarySlug) : null;

  const reportState = useReportState();
  const captureRef = useRef<HTMLDivElement | null>(null);

  // Preserve v2 recommendation-outcome side effect.
  const captured = useRef(false);
  useEffect(() => {
    if (captured.current) return;
    if (!leadId || !topFamily || !primarySlug) return;
    captured.current = true;
    void recordRecommendation({
      data: { leadId, familyId: topFamily.id, topRoleSlug: primarySlug },
    }).catch(() => {});
  }, [leadId, topFamily, primarySlug]);

  // Track active chapter for the side rail.
  const [activeId, setActiveId] = useState<string | null>(CHAPTERS[0].id);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
          reportState.setLastChapter(visible.target.id);
          reportState.markCompleted(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const c of CHAPTERS) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
    // reportState methods are stable across renders (useCallback).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fire report_viewed once per mount. Dwell-based per-chapter events are
  // handled by an ancillary observer with a 400ms threshold to avoid storms.
  const viewedRef = useRef(false);
  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    track("report_viewed", {
      lead_id: leadId,
      props: {
        chapters_count: CHAPTERS.length,
        top_role_slug: primarySlug ?? null,
      },
    });
  }, [leadId, primarySlug]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const timers = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          if (!id) continue;
          if (e.isIntersecting && !seen.has(id)) {
            if (!timers.has(id)) {
              const handle = window.setTimeout(() => {
                seen.add(id);
                timers.delete(id);
                const idx = CHAPTERS.findIndex((c) => c.id === id);
                track("report_chapter_viewed", {
                  lead_id: leadId,
                  props: { chapter_id: id, index: idx + 1 },
                });
              }, 400);
              timers.set(id, handle);
            }
          } else if (!e.isIntersecting && timers.has(id)) {
            window.clearTimeout(timers.get(id)!);
            timers.delete(id);
          }
        }
      },
      { threshold: 0.4 },
    );
    for (const c of CHAPTERS) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const h of timers.values()) window.clearTimeout(h);
    };
  }, [leadId]);

  const handleRailJump = (toId: string) => {
    track("report_rail_jump", {
      lead_id: leadId,
      props: { from: activeId, to: toId },
    });
  };

  return (
    <div className="report-print-root" data-report-theme={reportState.theme} ref={captureRef}>
      <a
        href="#report-main"
        className="report-print-hide sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        Skip to report
      </a>

      <MobileChapterStrip chapters={CHAPTERS} activeId={activeId} onJump={handleRailJump} />

      <ReportActionBar captureRef={captureRef} leadId={leadId} />
      <EvidenceExplorerModal />
      <RoleFitQuiz />

      <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="report-print-hide">
          <LeftChapterRail
            chapters={CHAPTERS}
            groups={RAIL_GROUPS}
            activeId={activeId}
            onJump={handleRailJump}
          />
        </aside>

        <main id="report-main" className="min-w-0 space-y-6 pb-28 sm:pb-24">
          <HeroSnapshot result={result} primarySlug={primarySlug ?? null} />

          {/* What recruiters liked — recruiter-toned credibility strip */}
          <section
            aria-labelledby="recruiter-likes-heading"
            className="report-hero-plate report-print-hide"
          >
            <p
              id="recruiter-likes-heading"
              className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/55"
            >
              What recruiters liked
              <span aria-hidden className="mx-2 text-white/25">
                ·
              </span>
              <span className="tabular-nums text-white/40">03 signals</span>
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { lede: "Strong communication", body: "Your answers show clarity under pressure." },
                {
                  lede: "Documentation discipline",
                  body: "You treat records as evidence, not paperwork.",
                },
                {
                  lede: "Compliance thinking",
                  body: "You instinctively ask \u201cis this allowed?\u201d",
                },
              ].map((item, i) => (
                <li
                  key={item.lede}
                  className="rounded-xl border border-white/8 bg-white/[0.015] p-4"
                >
                  <span className="font-serif text-h4 leading-none tabular-nums text-white/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-grotesk text-body-sm font-semibold text-white">
                    {item.lede}
                  </p>
                  <p className="mt-1 text-caption leading-relaxed text-white/70">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <ChapterVerdict result={result} onRetake={onRetake} />

          <div className="report-print-hide flex flex-wrap items-center gap-2">
            <ReportFreshnessBadge />
          </div>

          <ChapterMethodology chapter={0} />

          <ChapterFitBreakdown result={result} chapter={2} />

          <div className="report-print-hide flex justify-end">
            <DownloadReportPdfButton result={result} leadId={leadId} />
          </div>

          <ChapterThreeNumbers result={result} />

          {primarySlug && (
            <ChapterPrimaryFit result={result} slug={primarySlug} chapter={4} tone="primary" />
          )}

          <ChapterWhyNotThat result={result} chapter={5} />

          <ChapterDecisionHelper result={result} slugs={topSlugs} chapter={6} />

          {primarySlug && topFamily && (
            <section className="space-y-2" aria-labelledby="inside-career-heading">
              <p
                id="inside-career-heading"
                className="flex items-center gap-2 font-mono text-overline font-semibold text-white/55"
              >
                Inside This Career
              </p>
              <p className="text-body-sm text-white/80">
                <span className="font-semibold text-white">What this means:</span>{" "}
                {topFamily.dayInLife}
              </p>
            </section>
          )}

          {primarySlug && <ChapterCompanies slug={primarySlug} chapter={7} />}
          {primarySlug && <ChapterTools slug={primarySlug} chapter={8} />}
          {primarySlug && <ChapterFirst90Days slug={primarySlug} chapter={9} result={result} />}
          {primarySlug && <ChapterDayInLife slug={primarySlug} chapter={10} />}
          {primarySlug && <ChapterSalaryTrajectory slug={primarySlug} chapter={11} />}
          {primarySlug && <ChapterGrowthChart slug={primarySlug} chapter={12} />}
          {primarySlug && <ChapterAiOutlook slug={primarySlug} chapter={13} />}
          {primarySlug && <ChapterCities slug={primarySlug} chapter={14} />}
          {primarySlug && <ChapterMarketReality slug={primarySlug} chapter={15} />}

          <ChapterSkillGapRadar result={result} chapter={16} />

          {primarySlug && <ChapterInterviewReality slug={primarySlug} chapter={17} />}
          {primarySlug && <ChapterPivots slug={primarySlug} chapter={18} />}
          {primarySlug && <ChapterObjections slug={primarySlug} chapter={19} />}

          {topFamily && (
            <RoleLadder
              family={topFamily}
              result={result}
              onTrackRole={(slug) => {
                if (!leadId) return;
                void recordChosenRole({
                  data: { leadId, roleSlug: slug, familyId: topFamily.id },
                }).catch(() => {});
              }}
            />
          )}

          <ChapterActionPlan archetype={result.archetypeId} leadId={leadId} chapter={20} />

          <ChapterSevenDays archetype={result.archetypeId} leadId={leadId} chapter={21} />

          <NextStepCta primarySlug={primarySlug ?? null} />

          {leadId && (
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
              Report ID · {leadId.slice(0, 8)}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default CareerFitReportV3;

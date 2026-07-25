import React, { useMemo, useRef } from "react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { PATHS } from "@/data/careerEngineScoring";
import { FAMILIES, familyForPathSlug } from "@/data/careerFamilies";
import { ChapterVerdict } from "./chapters/01Verdict";
import { ChapterMethodology } from "./chapters/00bMethodology";
import { ChapterFitBreakdown } from "./chapters/01bFitBreakdown";
import { ChapterThreeNumbers } from "./chapters/02ThreeNumbers";
import { ChapterPrimaryFit } from "./chapters/03PrimaryFit";
import { ChapterWhyNotThat } from "./chapters/04WhyNotThat";
import { ChapterDecisionHelper } from "./chapters/05DecisionHelper";
import { ChapterSkillGapRadar } from "./chapters/06SkillGapRadar";
import { ChapterMarketReality } from "./chapters/07MarketReality";
import { ChapterSevenDays } from "./chapters/08SevenDays";
import { ChapterActionPlan } from "./chapters/08aActionPlan";
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
import { RoleLadder } from "../v2/RoleLadder";
import { HeroSnapshot } from "./HeroSnapshot";
import { ReportActionBar } from "./ReportActionBar";
import { LeftChapterRail, MobileChapterStrip, type RailGroup } from "./LeftChapterRail";
import { NextStepCta } from "./NextStepCta";
import { ReportStateProvider, useReportState } from "./ReportStateContext";
import { ReportFreshnessBadge } from "./ReportFreshnessBadge";
import { DownloadReportPdfButton } from "../v2/DownloadReportPdfButton";
import { AiCareerCoachWidget } from "./AiCareerCoachWidget";
import { recordChosenRole } from "@/lib/recommendationOutcomes.functions";
import type { RailChapter } from "./SectionRail";

class ChapterBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("Chapter render prevented crash:", error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function CareerFitReportV3({
  result,
  leadId,
  onRetake,
}: {
  result: CareerEngineResult;
  leadId?: string | null;
  onRetake?: () => void;
}) {
  return (
    <ReportStateProvider>
      <CareerFitReportV3Inner result={result} leadId={leadId} onRetake={onRetake} />
    </ReportStateProvider>
  );
}

function CareerFitReportV3Inner({
  result,
  leadId,
  onRetake,
}: {
  result: CareerEngineResult;
  leadId?: string | null;
  onRetake?: () => void;
}) {
  const pathFits = result.evidence?.scoring?.topPathFits ?? [];
  const topSlugs = (
    pathFits.length
      ? pathFits.slice(0, 3).map((p) => p.slug)
      : (result.archetype?.topPaths ?? []).slice(0, 3).map((p) => p.slug)
  ).filter((slug) => Boolean(PATHS[slug]));

  const primarySlug = topSlugs[0] || (result.archetype?.topPaths?.[0]?.slug) || "pharmacovigilance";
  const topFamily = (primarySlug ? familyForPathSlug(primarySlug) : null) || FAMILIES["drug-safety"];

  const reportState = useReportState();
  const captureRef = useRef<HTMLDivElement | null>(null);

  const chapters: RailChapter[] = [
    { id: "ch-1-verdict", number: 1, label: "Verdict" },
    { id: "ch-0-methodology", number: 0, label: "Methodology" },
    { id: "ch-2-fit-breakdown", number: 2, label: "Fit breakdown" },
    { id: "ch-3-numbers", number: 3, label: "The numbers" },
    { id: `ch-4-fit-${primarySlug}`, number: 4, label: "Primary fit" },
    { id: "ch-[#5]-why-not", number: 5, label: "Why not that" },
    { id: "ch-[#6]-decision", number: 6, label: "Compare top matches" },
    { id: "ch-[#7]-companies", number: 7, label: "Who's hiring" },
    { id: "ch-[#8]-tools", number: 8, label: "Tools stack" },
    { id: "ch-[#9]-first90", number: 9, label: "First 90 days" },
    { id: "ch-[#10]-day", number: 10, label: "Day in the life" },
    { id: "ch-[#11]-salary", number: 11, label: "Salary arc" },
    { id: "ch-[#12]-growth", number: 12, label: "Growth chart" },
    { id: "ch-[#13]-ai-outlook", number: 13, label: "AI outlook" },
    { id: "ch-[#14]-cities", number: 14, label: "Top metros" },
    { id: "ch-[#15]-market-reality", number: 15, label: "Market reality" },
    { id: "ch-[#16]-gap", number: 16, label: "Skill gap radar" },
    { id: "ch-[#17]-interview", number: 17, label: "Interview reality" },
    { id: "ch-[#18]-pivots", number: 18, label: "Pivots" },
    { id: "ch-[#19]-objections", number: 19, label: "Objections" },
    { id: "ch-[#20]-action-plan", number: 20, label: "4-Week Action Plan" },
    { id: "ch-[#21]-7day-streak", number: 21, label: "7-Day Streak" },
  ];

  const railGroups: RailGroup[] = [
    {
      label: "Your Best Match",
      chapterIds: ["ch-1-verdict", "ch-0-methodology", "ch-2-fit-breakdown", "ch-3-numbers"],
    },
    {
      label: "Other Good Options",
      chapterIds: [
        `ch-4-fit-${primarySlug}`,
        "ch-[#5]-why-not",
        "ch-[#6]-decision",
      ],
    },
    {
      label: "Inside This Career",
      chapterIds: [
        "ch-[#7]-companies",
        "ch-[#8]-tools",
        "ch-[#9]-first90",
        "ch-[#10]-day",
        "ch-[#11]-salary",
        "ch-[#12]-growth",
        "ch-[#13]-ai-outlook",
        "ch-[#14]-cities",
        "ch-[#15]-market-reality",
      ],
    },
    {
      label: "Your Action Plan",
      chapterIds: [
        "ch-[#16]-gap",
        "ch-[#17]-interview",
        "ch-[#18]-pivots",
        "ch-[#19]-objections",
        "ch-[#20]-action-plan",
        "ch-[#21]-7day-streak",
      ],
    },
  ];

  return (
    <div className="report-root relative min-h-screen text-white">
      <div className="mx-auto max-w-[1520px]">
        <ReportActionBar captureRef={captureRef} leadId={leadId} />

        <MobileChapterStrip
          chapters={chapters}
          activeId={reportState.lastChapterId ?? null}
          onJump={reportState.setLastChapter}
        />
      </div>

      <div className="mx-auto grid max-w-[1520px] gap-8 pt-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <LeftChapterRail
          chapters={chapters}
          groups={railGroups}
          activeId={reportState.lastChapterId ?? null}
          onJump={reportState.setLastChapter}
        />

        <main ref={captureRef} className="report-[#21]-chapter-flow min-w-0 space-y-6 sm:space-y-8">
          <ChapterBoundary>
            <HeroSnapshot result={result} primarySlug={primarySlug} />
          </ChapterBoundary>

          {/* Recruiter signals */}
          <section className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-2xl space-y-4">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              What Recruiters Liked • 03 Signals
            </p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  lede: "Strong communication",
                  body: "Your answers show clarity under pressure.",
                },
                {
                  lede: "Documentation discipline",
                  body: "You treat records as evidence, not paperwork.",
                },
                {
                  lede: "Compliance thinking",
                  body: 'You instinctively ask "is this allowed?"',
                },
              ].map((item, i) => (
                <li
                  key={item.lede}
                  className="rounded-xl border border-white/10 bg-[#161F33] p-4 space-y-1 shadow-md"
                >
                  <span className="font-serif text-xl font-bold tabular-nums text-blue-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-bold text-sm text-white">
                    {item.lede}
                  </p>
                  <p className="text-xs text-slate-300">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <ChapterBoundary><ChapterVerdict result={result} onRetake={onRetake} /></ChapterBoundary>

          <div className="report-print-hide flex flex-wrap items-center gap-2">
            <ReportFreshnessBadge />
          </div>

          <ChapterBoundary><ChapterMethodology chapter={0} /></ChapterBoundary>
          <ChapterBoundary><ChapterFitBreakdown result={result} chapter={2} /></ChapterBoundary>          <div className="report-print-hide flex justify-end">
            <DownloadReportPdfButton result={result} leadId={leadId ?? null} />
          </div>
 
          <ChapterBoundary><ChapterThreeNumbers result={result} /></ChapterBoundary>
          <ChapterBoundary><ChapterPrimaryFit result={result} slug={primarySlug} chapter={4} tone="primary" /></ChapterBoundary>
          <ChapterBoundary><ChapterWhyNotThat result={result} chapter={5} /></ChapterBoundary>
          <ChapterBoundary><ChapterDecisionHelper result={result} slugs={topSlugs.length ? topSlugs : [primarySlug, "medical-coding", "clinical-data-management"]} chapter={6} /></ChapterBoundary>
          <ChapterBoundary><AiCareerCoachWidget result={result} primarySlug={primarySlug} /></ChapterBoundary>

          <section className="space-y-2" aria-labelledby="inside-career-heading">
            <p
              id="inside-career-heading"
              className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-400"
            >
              Inside This Career
            </p>
            <p className="text-sm text-slate-200">
              <span className="font-bold text-white">What this means:</span>{" "}
              {topFamily.dayInLife}
            </p>
          </section>

          <ChapterBoundary><ChapterCompanies slug={primarySlug} chapter={7} /></ChapterBoundary>
          <ChapterBoundary><ChapterTools slug={primarySlug} chapter={8} /></ChapterBoundary>
          <ChapterBoundary><ChapterFirst90Days slug={primarySlug} chapter={9} result={result} /></ChapterBoundary>
          <ChapterBoundary><ChapterDayInLife slug={primarySlug} chapter={10} /></ChapterBoundary>
          <ChapterBoundary><ChapterSalaryTrajectory slug={primarySlug} chapter={11} /></ChapterBoundary>
          <ChapterBoundary><ChapterGrowthChart slug={primarySlug} chapter={12} /></ChapterBoundary>
          <ChapterBoundary><ChapterAiOutlook slug={primarySlug} chapter={13} /></ChapterBoundary>
          <ChapterBoundary><ChapterCities slug={primarySlug} chapter={14} /></ChapterBoundary>
          <ChapterBoundary><ChapterMarketReality slug={primarySlug} chapter={15} /></ChapterBoundary>

          <ChapterBoundary><ChapterSkillGapRadar result={result} chapter={16} /></ChapterBoundary>

          <ChapterBoundary><ChapterInterviewReality slug={primarySlug} chapter={17} /></ChapterBoundary>
          <ChapterBoundary><ChapterPivots slug={primarySlug} chapter={18} /></ChapterBoundary>
          <ChapterBoundary><ChapterObjections slug={primarySlug} chapter={19} /></ChapterBoundary>

          {topFamily && (
            <ChapterBoundary>
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
            </ChapterBoundary>
          )}

          <ChapterBoundary><ChapterActionPlan archetype={result.archetypeId ?? null} leadId={leadId ?? null} chapter={20} /></ChapterBoundary>
          <ChapterBoundary><ChapterSevenDays archetype={result.archetypeId ?? null} leadId={leadId ?? null} chapter={21} /></ChapterBoundary>

          <ChapterBoundary><NextStepCta primarySlug={primarySlug ?? null} /></ChapterBoundary>

          {leadId && (
            <p className="text-center font-mono text-xs uppercase tracking-wider text-slate-500">
              Report ID · {leadId.slice(0, 8)}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export default CareerFitReportV3;

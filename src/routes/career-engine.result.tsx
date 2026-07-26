import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CareerShell } from "@/components/career/CareerShell";
import { StartFreshButton } from "@/components/career/StartFreshButton";
import { lazy, Suspense } from "react";
const CareerFitReportV3 = lazy(() =>
  import("@/components/career/report/CareerFitReportV3").then((m) => ({
    default: m.CareerFitReportV3,
  })),
);
import { StickyResultCta } from "@/components/career/v2/StickyResultCta";
import { ResultNextStepCard } from "@/components/career/v2/ResultNextStepCard";
import { SkillRadarChart } from "@/components/career/report/SkillRadarChart";
import {
  ARCHETYPES,
  type ArchetypeScore,
  type CareerEngineResult,
} from "@/data/careerEngineScoring";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getResult, getAttemptId } from "@/lib/careerEngineApi";
import { requireCareerEngineSession } from "@/lib/careerEngineGuard";
import { trackAttemptOutcome, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";

const search = z.object({ id: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/career-engine/result")({
  validateSearch: (s) => search.parse(s),
  beforeLoad: ({ search }) => {
    // If a public report ID is passed in the URL (e.g. /career-engine/result?id=lead_123), bypass session check!
    if (search && search.id) return;
    return requireCareerEngineSession({ needsLead: true });
  },
  head: () => ({
    meta: [
      { title: "Your Career Fit Report · Arzon Careers" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

function rebuildFromRow(
  row: { archetype?: string; fit_score?: number; result_payload?: unknown } | null,
): CareerEngineResult | null {
  if (!row || !row.archetype) return null;
  const arche = ARCHETYPES[row.archetype as ArchetypeId];
  if (!arche) return null;
  const payload = (row.result_payload || {}) as Partial<CareerEngineResult>;
  const ranking: ArchetypeScore[] = payload.ranking?.length
    ? payload.ranking.map((r) => ({ ...r, archetype: ARCHETYPES[r.id] }))
    : [{ id: arche.id, archetype: arche, fit: row.fit_score ?? 0 }];
  return {
    archetypeId: arche.id,
    archetype: arche,
    fitScore: row.fit_score ?? payload.fitScore ?? 0,
    confidence: payload.confidence ?? 60,
    confidenceBand: payload.confidenceBand ?? "recommended",
    ranking,
    notFit: payload.notFit
      ? { ...payload.notFit, archetype: ARCHETYPES[payload.notFit.id] }
      : ranking[ranking.length - 1],
    notFitReasons: payload.notFitReasons ?? [],
    microAccuracy: payload.microAccuracy ?? 0,
    breakdown: payload.breakdown ?? { aptitude: 0, interest: 0, background: 0, commitment: 0 },
    risks: payload.risks ?? [],
    traitScores: payload.traitScores ?? ({} as CareerEngineResult["traitScores"]),
    evidence: payload.evidence ?? {
      summary: "",
      topDrivers: [],
      watchOuts: [],
      pathDrivers: {},
      tieBreakers: [],
      scoring: { answered: 0, assessmentSize: 0, topGap: 0, topPathFits: [] },
    },
    resultMeta: payload.resultMeta,
  };
}

function normaliseResult(raw: CareerEngineResult | null): CareerEngineResult | null {
  if (!raw || !raw.archetypeId) return null;
  const arche = raw.archetype ?? ARCHETYPES[raw.archetypeId];
  if (!arche) return null;
  const ranking: ArchetypeScore[] = (raw.ranking ?? [])
    .map((r) => ({ ...r, archetype: r.archetype ?? ARCHETYPES[r.id] }))
    .filter((r): r is ArchetypeScore => Boolean(r.archetype));
  const safeRanking = ranking.length
    ? ranking
    : [{ id: arche.id, archetype: arche, fit: raw.fitScore ?? 0 }];
  const notFitRaw = raw.notFit;
  const notFit: ArchetypeScore = notFitRaw
    ? { ...notFitRaw, archetype: notFitRaw.archetype ?? ARCHETYPES[notFitRaw.id] ?? arche }
    : safeRanking[safeRanking.length - 1];
  return {
    ...raw,
    archetype: arche,
    fitScore: typeof raw.fitScore === "number" ? raw.fitScore : 0,
    confidence: typeof raw.confidence === "number" ? raw.confidence : 60,
    confidenceBand: raw.confidenceBand ?? "recommended",
    ranking: safeRanking,
    notFit,
    notFitReasons: raw.notFitReasons ?? [],
    microAccuracy: raw.microAccuracy ?? 0,
    breakdown: raw.breakdown ?? { aptitude: 0, interest: 0, background: 0, commitment: 0 },
    risks: raw.risks ?? [],
    traitScores: raw.traitScores ?? ({} as CareerEngineResult["traitScores"]),
    evidence: raw.evidence ?? {
      summary: "",
      topDrivers: [],
      watchOuts: [],
      pathDrivers: {},
      tieBreakers: [],
      scoring: { answered: 0, assessmentSize: 0, topGap: 0, topPathFits: [] },
    },
  };
}

function ResultPage() {
  const { id: searchLeadId } = Route.useSearch();
  const [result, setResult] = useState<CareerEngineResult | null>(() => {
    if (typeof window === "undefined") return null;
    const cached = sessionStorage.getItem("ce_result");
    if (!cached) return null;
    try {
      return normaliseResult(JSON.parse(cached) as CareerEngineResult);
    } catch {
      return null;
    }
  });

  const [leadId, setLeadId] = useState<string | null>(() => {
    if (searchLeadId) return searchLeadId;
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("ce_lead_id");
  });

  const [loading, setLoading] = useState<boolean>(!result && Boolean(searchLeadId));

  useEffect(() => {
    trackCEFunnelStep({ step: "result", leadId, attemptId: getAttemptId() });
  }, [leadId]);

  useEffect(() => {
    if (result || !searchLeadId) return;
    let cancel = false;
    setLoading(true);
    getResult(searchLeadId)
      .then((row) => {
        if (cancel) return;
        const rebuilt = rebuildFromRow(row);
        if (rebuilt) {
          setResult(rebuilt);
          setLeadId(searchLeadId);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("ce_result", JSON.stringify(rebuilt));
            sessionStorage.setItem("ce_lead_id", searchLeadId);
          }
        }
      })
      .catch((err) => console.warn("Failed to fetch public report:", err))
      .finally(() => {
        if (!cancel) setLoading(false);
      });
    return () => {
      cancel = true;
    };
  }, [searchLeadId, result]);

  useEffect(() => {
    if (!result) return;
    const attemptId = getAttemptId();
    if (attemptId) {
      trackAttemptOutcome({
        leadId,
        attemptId,
        archetype: result.archetype?.name ?? "Generalist",
        fitScore: result.fitScore,
        confidence: result.confidence,
        confidenceBand: result.confidenceBand,
        topPath: result.archetype?.pathSlug ?? null,
        topEvidence: (result.evidence?.topDrivers ?? []).map((d) => ({
          question_id: d.questionId,
          chosen: d.chosenValue,
          delta: d.topArchetypeImpact,
        })),
      });
    }
  }, [result, leadId]);

  const handleRetake = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ce_result");
      sessionStorage.removeItem("ce_answers");
      sessionStorage.removeItem("ce_lead_id");
      sessionStorage.removeItem("ce_attempt_id");
      window.location.href = "/career-engine/test";
    }
  };

  if (loading) {
    return (
      <CareerShell chrome="report">
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <h2 className="mt-4 font-bold text-xl text-white">Hydrating Career Fit Report...</h2>
          <p className="mt-2 text-sm text-slate-300">
            Fetching report dataset from Arzon Employment Intelligence Server.
          </p>
        </div>
      </CareerShell>
    );
  }

  if (!result) {
    return (
      <CareerShell chrome="report">
        <div className="mx-auto max-w-xl text-center py-16 space-y-4">
          <h1 className="text-2xl font-bold text-white">Report Not Found</h1>
          <p className="text-slate-300 text-sm">
            We couldn't find an active report snapshot for this session. Please start a fresh
            assessment.
          </p>
          <div className="pt-4">
            <StartFreshButton />
          </div>
        </div>
      </CareerShell>
    );
  }

  return (
    <CareerShell chrome="report">
      <div className="relative space-y-8 pb-32">
        <Suspense
          fallback={
            <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-300">
                Loading interactive 21-chapter report...
              </p>
            </div>
          }
        >
          <CareerFitReportV3 result={result} leadId={leadId} onRetake={handleRetake} />
        </Suspense>

        <SkillRadarChart overallFitScore={result.fitScore} />

        <ResultNextStepCard
          leadId={leadId}
          archetypeLabel={result.archetype?.name ?? "Generalist"}
          fitScore={result.fitScore}
        />

        <StickyResultCta leadId={leadId} />
      </div>
    </CareerShell>
  );
}

export default ResultPage;

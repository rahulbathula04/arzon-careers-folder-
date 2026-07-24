/**
 * Career Engine — Result page (v2: pure Career Discovery layer).
 *
 * Renders the Career Fit Report only. ACRI rings, archetype hero, readiness
 * score, and sub-breakdown bars all moved out — those tried to answer
 * employability, which is now ASSAY's job.
 */
import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CareerShell } from "@/components/career/CareerShell";
import { StartFreshButton } from "@/components/career/StartFreshButton";
import { lazy, Suspense } from "react";
const CareerFitReportV3 = lazy(() => import("@/components/career/report/CareerFitReportV3").then(m => ({ default: m.CareerFitReportV3 })));
import { StickyResultCta } from "@/components/career/v2/StickyResultCta";
import { ResultNextStepCard } from "@/components/career/v2/ResultNextStepCard";
import {
  ARCHETYPES,
  type ArchetypeScore,
  type CareerEngineResult,
} from "@/data/careerEngineScoring";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getResult, getAttemptId } from "@/lib/careerEngineApi";
import { requireCareerEngineSession, useCareerEngineGuard } from "@/lib/careerEngineGuard";
import { trackAttemptOutcome, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";

const search = z.object({ id: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/career-engine/result")({
  validateSearch: (s) => search.parse(s),
  beforeLoad: () => requireCareerEngineSession({ needsLead: true }),
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
    traitScores: (raw.traitScores ?? {}) as CareerEngineResult["traitScores"],
    evidence: {
      summary: raw.evidence?.summary ?? "",
      topDrivers: raw.evidence?.topDrivers ?? [],
      watchOuts: raw.evidence?.watchOuts ?? [],
      pathDrivers: raw.evidence?.pathDrivers ?? {},
      tieBreakers: raw.evidence?.tieBreakers ?? [],
      scoring: raw.evidence?.scoring ?? {
        answered: 0,
        assessmentSize: 0,
        topGap: 0,
        topPathFits: [],
      },
    },
  };
}

function ResultPage() {
  const { id } = Route.useSearch();
  useCareerEngineGuard({ needsLead: true });
  const [result, setResult] = useState<CareerEngineResult | null>(null);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const outcomeFiredRef = useRef(false);

  useEffect(() => {
    if (result) {
      setLoadTimedOut(false);
      return;
    }
    const t = setTimeout(() => setLoadTimedOut(true), 6000);
    return () => clearTimeout(t);
  }, [result]);

  useEffect(() => {
    trackCEFunnelStep({ step: "result", leadId: id ?? null, attemptId: getAttemptId() });
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = JSON.parse(sessionStorage.getItem("ce_result") || "null");
        if (cached && cached.archetypeId) {
          const hydrated: CareerEngineResult = {
            ...cached,
            archetype: ARCHETYPES[cached.archetypeId as ArchetypeId],
            ranking: (cached.ranking || []).map((r: ArchetypeScore) => ({
              ...r,
              archetype: ARCHETYPES[r.id],
            })),
            notFit: cached.notFit
              ? { ...cached.notFit, archetype: ARCHETYPES[cached.notFit.id as ArchetypeId] }
              : undefined,
          } as CareerEngineResult;
          const safe = normaliseResult(hydrated);
          if (safe) setResult(safe);
        }
      } catch {
        /* noop */
      }
    }
    if (id) {
      getResult(id)
        .then((row) => setResult((prev) => prev ?? normaliseResult(rebuildFromRow(row))))
        .catch(() => {
          /* noop */
        });
    }
  }, [id]);

  useEffect(() => {
    if (!result || typeof window === "undefined") return;
    const k = `ce_quiz_completed_${id ?? "none"}`;
    if (outcomeFiredRef.current || sessionStorage.getItem(k)) return;
    outcomeFiredRef.current = true;
    sessionStorage.setItem(k, "1");
    try {
      const topEvidence = (result.evidence?.topDrivers ?? []).slice(0, 5).map((d) => ({
        question_id: d.questionId,
        chosen: d.chosenLabel,
        delta: d.pathImpacts[0]?.delta ?? 0,
      }));
      trackAttemptOutcome({
        leadId: id ?? null,
        attemptId: getAttemptId(),
        archetype: result.archetypeId,
        fitScore: result.fitScore,
        confidence: result.confidence,
        confidenceBand: result.confidenceBand,
        topPath: result.archetype.topPaths?.[0]?.slug ?? null,
        topEvidence,
      });
    } catch (e) {
      console.error("[career-engine] trackAttemptOutcome failed", e);
    }
  }, [result, id]);

  if (!result) {
    return (
      <CareerShell chrome="report">
        {loadTimedOut ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center"
          >
            <p className="font-grotesk text-lg font-bold text-white">
              We couldn’t load your report.
            </p>
            <p className="mt-2 text-sm text-white/70">
              This is usually a slow network. Try refreshing — your answers are saved.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Refresh page
              </button>
              <StartFreshButton label="Retake the test" />
            </div>
            <p className="mt-4 text-xs text-white/50">
              Your answers are cached in this browser — refreshing won’t lose them.
            </p>
          </div>
        ) : (
          <div aria-busy="true" aria-label="Loading your career fit report" className="space-y-4">
            <div className="h-48 motion-safe:animate-pulse rounded-3xl bg-white/5" />
            <div className="h-64 motion-safe:animate-pulse rounded-3xl bg-white/5" />
            <div className="h-64 motion-safe:animate-pulse rounded-3xl bg-white/5" />
          </div>
        )}
      </CareerShell>
    );
  }

  return (
    <CareerShell chrome="report">
      <Suspense fallback={<div className="h-96 motion-safe:animate-pulse rounded-3xl bg-white/5" />}>
        <CareerFitReportV3 result={result} leadId={id ?? null} />
      </Suspense>
      <ResultNextStepCard
        leadId={id ?? null}
        archetypeLabel={result.archetype?.name ?? result.archetypeId}
        fitScore={result.fitScore}
      />
      <div className="mt-10 flex justify-center">
        <StartFreshButton label="Retake the test (fresh)" />
      </div>
      <StickyResultCta leadId={id ?? null} />
    </CareerShell>
  );
}

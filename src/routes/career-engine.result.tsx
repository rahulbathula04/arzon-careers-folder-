import { useEffect, useState, type CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, CheckCircle2, MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";
import {
  ARCHETYPES,
  computeResult,
  type ArchetypeScore,
  type CareerEngineResult,
} from "@/data/careerEngineScoring";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { buildAssessment, getOrCreateSeed } from "@/data/careerEngineSampler";
import {
  finalizeLead,
  getAttemptId,
  getLeadId,
  getSessionId,
  getResult,
} from "@/lib/careerEngineApi";
import { cacheResult, loadSavedAnswers } from "@/lib/careerEngineRunner";
import { requireCareerEngineSession } from "@/lib/careerEngineGuard";
import { trackAttemptOutcome, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import { CareerPlanCard } from "@/components/career/v2/CareerPlanCard";
import { CareerRoadmapCard } from "@/components/career/v2/CareerRoadmapCard";

const search = z.object({ id: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/career-engine/result")({
  validateSearch: (s) => search.parse(s),
  beforeLoad: () => requireCareerEngineSession({ needsLead: true }),
  head: () => ({
    meta: [
      { title: "Your Career Fit Report · Arzon Global" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

function rebuildFromRow(
  row: { archetype?: string; fit_score?: number; result_payload?: unknown } | null,
): CareerEngineResult | null {
  if (!row?.archetype) return null;
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
    evidence:
      payload.evidence ??
      {
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
  const ranking = (raw.ranking ?? [])
    .map((r) => ({ ...r, archetype: r.archetype ?? ARCHETYPES[r.id] }))
    .filter((r): r is ArchetypeScore => Boolean(r.archetype));
  const safeRanking = ranking.length
    ? ranking
    : [{ id: arche.id, archetype: arche, fit: raw.fitScore ?? 0 }];

  return {
    ...raw,
    archetype: arche,
    fitScore: typeof raw.fitScore === "number" ? raw.fitScore : 0,
    confidence: typeof raw.confidence === "number" ? raw.confidence : 60,
    confidenceBand: raw.confidenceBand ?? "recommended",
    ranking: safeRanking,
    notFit: raw.notFit
      ? {
          ...raw.notFit,
          archetype: raw.notFit.archetype ?? ARCHETYPES[raw.notFit.id] ?? arche,
        }
      : safeRanking[safeRanking.length - 1],
    notFitReasons: raw.notFitReasons ?? [],
    risks: raw.risks ?? [],
    traitScores: raw.traitScores ?? ({} as CareerEngineResult["traitScores"]),
    evidence:
      raw.evidence ??
      {
        summary: "",
        topDrivers: [],
        watchOuts: [],
        pathDrivers: {},
        tieBreakers: [],
        scoring: { answered: 0, assessmentSize: 0, topGap: 0, topPathFits: [] },
      },
  };
}

function buildLocalResult(): CareerEngineResult | null {
  const answers = loadSavedAnswers();
  if (!Object.keys(answers).length) return null;

  try {
    const assessment = buildAssessment(getOrCreateSeed(getSessionId()));
    return computeResult(answers, {
      questions: assessment,
      meta: {
        attemptId: getAttemptId() ?? `att_${Date.now()}`,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.warn("Local Career Engine result rebuild failed", error);
    return null;
  }
}

async function recoverLocalResult(leadId: string): Promise<CareerEngineResult | null> {
  const result = buildLocalResult();
  if (!result) return null;

  await finalizeLead({ leadId, result });
  cacheResult(result);
  return result;
}

function ResultPage() {
  const { id } = Route.useSearch();
  const [result, setResult] = useState<CareerEngineResult | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem("ce_result");
    if (raw) {
      try {
        const cached = normaliseResult(JSON.parse(raw) as CareerEngineResult);
        if (cached) return cached;
      } catch {
        // Fall through to answer-based recovery.
      }
    }

    const local = buildLocalResult();
    if (local) {
      try {
        cacheResult(local);
      } catch {
        // The in-memory result is still safe to render.
      }
    }
    return local;
  });
  const [leadId, setLeadId] = useState<string | null>(
    () => id ?? (typeof window !== "undefined" ? getLeadId() : null),
  );
  const [loading, setLoading] = useState(!result);
  const [recovering, setRecovering] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    trackCEFunnelStep({ step: "result", leadId, attemptId: getAttemptId() });
  }, [leadId]);

  useEffect(() => {
    if (result || !leadId) return;

    let cancelled = false;
    setLoading(true);
    setLoadError(false);

    (async () => {
      try {
        const row = await getResult(leadId);
        if (cancelled) return;

        const rebuilt = rebuildFromRow(row);
        if (rebuilt) {
          setResult(rebuilt);
          setLeadId(leadId);
          cacheResult(rebuilt);
          return;
        }

        setRecovering(true);
        const recovered = await recoverLocalResult(leadId);
        if (cancelled) return;

        if (recovered) {
          setResult(recovered);
          setLeadId(leadId);
          cacheResult(recovered);
        } else {
          setLoadError(true);
        }
      } catch (err) {
        console.warn("Career report recovery failed", err);
        try {
          const recovered = await recoverLocalResult(leadId);
          if (!cancelled && recovered) {
            setResult(recovered);
            setLeadId(leadId);
            cacheResult(recovered);
            return;
          }
        } catch (recoveryError) {
          console.warn("Local career report recovery failed", recoveryError);
        }
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) {
          setRecovering(false);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [leadId, result]);

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

  const retake = () => {
    sessionStorage.removeItem("ce_result");
    sessionStorage.removeItem("ce_answers");
    sessionStorage.removeItem("ce_lead_id");
    sessionStorage.removeItem("ce_attempt_id");
    window.location.href = "/career-engine/test";
  };

  if (loading) {
    return (
      <main className="arzon-ref-page arzon-ref-result-shell">
        <div className="arzon-ref-container py-16 sm:py-24">
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-700">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">
              Career Engine
            </p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
              Preparing your career report
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Your assessment is complete. We are loading your saved result.
            </p>
            <div className="mx-auto mt-6 h-2 max-w-xs overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-blue-600" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="arzon-ref-page arzon-ref-result-shell">
        <div className="arzon-ref-container py-12 sm:py-20">
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-700">
                  ASSESSMENT SAVED
                </span>
                <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                  We could not load your report yet.
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Your answers are kept with this assessment. We will not ask you to repeat the test from this screen.
                </p>
              </div>
            </div>

            {recovering || !loadError ? (
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-900">
                We are checking the saved assessment and rebuilding the report if needed.
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-800">
                The report service did not return a result. Your assessment is still saved. Please try again without restarting the assessment.
              </div>
            )}

            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <Link
                to="/career-engine"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-extrabold text-white"
              >
                Return to Career Engine <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/career-engine/test"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-800"
              >
                Continue Saved Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const top = result.ranking?.slice(0, 3) ?? [];
  const roleName = result.archetype?.name ?? "Recommended Career Path";
  const pathSlug = result.archetype?.topPaths?.[0]?.slug ?? "";
  const programmeSlug =
    pathSlug === "medical-coding"
      ? "medical-coding"
      : pathSlug === "pharmacovigilance"
        ? "pharmacovigilance"
        : pathSlug === "clinical-data-management"
          ? "clinical-data-management"
          : pathSlug === "sas-clinical"
            ? "sas-clinical"
            : pathSlug === "regulatory-affairs"
              ? "regulatory-affairs"
              : pathSlug === "ai-intelligence"
                ? "ai-intelligence"
                : "clinical-saas";

  return (
    <main className="arzon-ref-page arzon-ref-result-shell">
      <div className="arzon-ref-container arzon-ref-result-container">
        <div className="arzon-ref-breadcrumb">
          Career Engine <span>›</span> Results
        </div>

        <div className="arzon-ref-result-head">
          <div>
            <span className="arzon-ref-kicker-light">PERSONALISED CAREER REPORT</span>
            <h1>Your Career Path Result</h1>
            <p>Based on your responses, here are the career paths worth exploring next.</p>
          </div>
          <button type="button" onClick={retake} className="arzon-ref-retake">
            <RotateCcw /> Retake
          </button>
        </div>

        <section className="arzon-ref-result-card">
          <div className="arzon-ref-result-match">
            <div
              className="arzon-ref-score-ring"
              style={
                {
                  "--score": `${Math.max(0, Math.min(100, Math.round(result.fitScore)))}%`,
                } as CSSProperties
              }
            >
              <strong>{Math.round(result.fitScore)}%</strong>
              <span>Match</span>
            </div>
            <div className="arzon-ref-match-copy">
              <span className="arzon-ref-match-badge">Your Top Match</span>
              <h2>{roleName}</h2>
              <div className="arzon-ref-match-tags">
                <span>Role fit</span>
                <span>Skill alignment</span>
                <span>Career context</span>
              </div>
              <p>
                {result.evidence?.summary ||
                  "Your assessment signals point toward this role path based on the answers you provided."}
              </p>
            </div>
          </div>

          <div className="arzon-ref-result-actions">
            <Link
              to="/courses/$slug"
              params={{ slug: programmeSlug }}
              className="arzon-ref-btn arzon-ref-btn-primary"
            >
              View Recommended Programme <ArrowRight />
            </Link>
            <Link
              to="/career-engine/start"
              className="arzon-ref-btn arzon-ref-btn-white"
            >
              <MessageCircle /> Talk to Counsellor
            </Link>
          </div>
        </section>

        <section className="arzon-ref-result-secondary">
          <span className="arzon-ref-kicker-light">OTHER RECOMMENDED CAREER PATHS</span>
          <h2>Compare the next closest options.</h2>
          <div className="arzon-ref-result-list">
            {top.slice(1).map((item) => (
              <div key={item.id}>
                <div>
                  <strong>{item.archetype.name}</strong>
                  <span>{Math.round(item.fit)}% Match</span>
                </div>
                <Link to="/roles" className="arzon-ref-btn arzon-ref-btn-white">
                  View Details <ArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <CareerPlanCard result={result} leadId={leadId} />
        <CareerRoadmapCard result={result} leadId={leadId} />
      </div>
    </main>
  );
}

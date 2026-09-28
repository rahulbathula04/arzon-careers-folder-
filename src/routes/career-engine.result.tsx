import { useEffect, useState, type CSSProperties } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import {
  ARCHETYPES,
  type ArchetypeScore,
  type CareerEngineResult,
} from "@/data/careerEngineScoring";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getResult, getAttemptId, getLeadId, finalizeLead, hydrateCareerEngineSnapshot } from "@/lib/careerEngineApi";
import { requireCareerEngineSession } from "@/lib/careerEngineGuard";
import { trackAttemptOutcome, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import { StartFreshButton } from "@/components/career/StartFreshButton";
import { CareerPlanCard } from "@/components/career/v2/CareerPlanCard";
import { CareerRoadmapCard } from "@/components/career/v2/CareerRoadmapCard";

const search = z.object({ id: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/career-engine/result")({
  validateSearch: (s) => search.parse(s),
  beforeLoad: () => requireCareerEngineSession({ needsLead: true }),
  head: () => ({ meta: [{ title: "Your Career Fit Report · Arzon Global" }, { name: "robots", content: "noindex" }] }),
  component: ResultPage,
});

function rebuildFromRow(row: { archetype?: string; fit_score?: number; result_payload?: unknown } | null): CareerEngineResult | null {
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
    notFit: payload.notFit ? { ...payload.notFit, archetype: ARCHETYPES[payload.notFit.id] } : ranking[ranking.length - 1],
    notFitReasons: payload.notFitReasons ?? [],
    microAccuracy: payload.microAccuracy ?? 0,
    breakdown: payload.breakdown ?? { aptitude: 0, interest: 0, background: 0, commitment: 0 },
    risks: payload.risks ?? [],
    traitScores: payload.traitScores ?? ({} as CareerEngineResult["traitScores"]),
    evidence: payload.evidence ?? { summary: "", topDrivers: [], watchOuts: [], pathDrivers: {}, tieBreakers: [], scoring: { answered: 0, assessmentSize: 0, topGap: 0, topPathFits: [] } },
    resultMeta: payload.resultMeta,
  };
}

function normaliseResult(raw: CareerEngineResult | null): CareerEngineResult | null {
  if (!raw || !raw.archetypeId) return null;
  const arche = raw.archetype ?? ARCHETYPES[raw.archetypeId];
  if (!arche) return null;
  const ranking = (raw.ranking ?? []).map((r) => ({ ...r, archetype: r.archetype ?? ARCHETYPES[r.id] })).filter((r): r is ArchetypeScore => Boolean(r.archetype));
  const safeRanking = ranking.length ? ranking : [{ id: arche.id, archetype: arche, fit: raw.fitScore ?? 0 }];
  return { ...raw, archetype: arche, fitScore: typeof raw.fitScore === "number" ? raw.fitScore : 0, confidence: typeof raw.confidence === "number" ? raw.confidence : 60, confidenceBand: raw.confidenceBand ?? "recommended", ranking: safeRanking, notFit: raw.notFit ? { ...raw.notFit, archetype: raw.notFit.archetype ?? ARCHETYPES[raw.notFit.id] ?? arche } : safeRanking[safeRanking.length - 1], notFitReasons: raw.notFitReasons ?? [], risks: raw.risks ?? [], traitScores: raw.traitScores ?? ({} as CareerEngineResult["traitScores"]), evidence: raw.evidence ?? { summary: "", topDrivers: [], watchOuts: [], pathDrivers: {}, tieBreakers: [], scoring: { answered: 0, assessmentSize: 0, topGap: 0, topPathFits: [] } } };
}

function ResultPage() {
  const { id } = Route.useSearch();
  const [result, setResult] = useState<CareerEngineResult | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem("ce_result");
    if (!raw) return null;
    try { return normaliseResult(JSON.parse(raw) as CareerEngineResult); } catch { return null; }
  });
  const [leadId, setLeadId] = useState<string | null>(() => id ?? (typeof window !== "undefined" ? sessionStorage.getItem("ce_lead_id") : null));
  const [loading, setLoading] = useState(!result);
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);

  useEffect(() => { trackCEFunnelStep({ step: "result", leadId, attemptId: getAttemptId() }); }, [leadId]);
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const restore = async () => {
      // Always attempt the durable snapshot before declaring a report missing.
      hydrateCareerEngineSnapshot();
      if (cancelled) return;

      const effectiveLeadId =
        id ??
        (typeof window !== "undefined" ? sessionStorage.getItem("ce_lead_id") : null);

      if (effectiveLeadId) setLeadId(effectiveLeadId);

      // A locally-computed report is already a valid user-facing result.
      // Server persistence can be retried in the background without blocking
      // the student from seeing the report.
      const localRaw = typeof window !== "undefined" ? sessionStorage.getItem("ce_result") : null;
      if (!result && localRaw) {
        try {
          const local = normaliseResult(JSON.parse(localRaw) as CareerEngineResult);
          if (local) {
            setResult(local);
            setLoading(false);
            setRecoveryMessage(null);
          }
        } catch {
          /* continue to server recovery */
        }
      }

      const pending = typeof window !== "undefined" && sessionStorage.getItem("ce_pending_finalize") === "1";
      if ((pending || !effectiveLeadId) && result && effectiveLeadId && !effectiveLeadId.startsWith("lead_local_")) {
        try {
          const persisted = await finalizeLead({ leadId: effectiveLeadId, result });
          if (persisted) {
            sessionStorage.removeItem("ce_pending_finalize");
            setLeadId(persisted);
          }
        } catch (err) {
          console.warn("Background career report persistence retry failed", err);
        }
      }

      if (effectiveLeadId && !effectiveLeadId.startsWith("lead_local_")) {
        for (let attempt = 0; attempt < 5 && !cancelled; attempt += 1) {
          try {
            const row = await getResult(effectiveLeadId);
            const rebuilt = rebuildFromRow(row);
            if (rebuilt) {
              setResult(rebuilt);
              sessionStorage.setItem("ce_result", JSON.stringify(rebuilt));
              sessionStorage.setItem("ce_lead_id", effectiveLeadId);
              sessionStorage.removeItem("ce_pending_finalize");
              setRecoveryMessage(null);
              setLoading(false);
              return;
            }
          } catch (err) {
            console.warn("Career report recovery attempt failed", err);
          }

          if (!result && attempt < 4) {
            setRecoveryMessage("Your answers are safe. We’re restoring your report from the completed assessment.");
            await new Promise<void>((resolve) => {
              timer = setTimeout(resolve, 1200);
            });
          }
        }
      }

      if (!cancelled) {
        setLoading(false);
        if (!result) {
          setRecoveryMessage(
            "We could not load the saved report yet. Your completed answers are still preserved on this device. Try loading the report again before starting anything over.",
          );
        }
      }
    };

    void restore();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  // The first load is intentionally the only recovery run; subsequent state
  // updates must not restart the polling loop.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (!result) return;
    const attemptId = getAttemptId();
    if (attemptId) trackAttemptOutcome({ leadId, attemptId, archetype: result.archetype?.name ?? "Generalist", fitScore: result.fitScore, confidence: result.confidence, confidenceBand: result.confidenceBand, topPath: result.archetype?.pathSlug ?? null, topEvidence: (result.evidence?.topDrivers ?? []).map((d) => ({ question_id: d.questionId, chosen: d.chosenValue, delta: d.topArchetypeImpact })) });
  }, [result, leadId]);

  const retake = () => {
    sessionStorage.removeItem("ce_result"); sessionStorage.removeItem("ce_answers"); sessionStorage.removeItem("ce_lead_id"); sessionStorage.removeItem("ce_attempt_id");
    window.location.href = "/career-engine/test";
  };

  if (loading) {
    return (
      <main className="arzon-ref-page arzon-ref-result-shell">
        <div className="arzon-ref-result-loading">
          <span className="block text-lg font-semibold">Your career report is being restored…</span>
          <span className="mt-2 block text-sm opacity-70">Your completed answers are already saved. We are checking the completed assessment record.</span>
        </div>
      </main>
    );
  }
  if (!result) {
    return (
      <main className="arzon-ref-page arzon-ref-result-shell">
        <div className="arzon-ref-result-empty">
          <span className="arzon-ref-kicker-light">YOUR ASSESSMENT IS PRESERVED</span>
          <h1>We’re still restoring your report.</h1>
          <p>{recoveryMessage ?? "Your answers have not been discarded. Reload this report or continue from your saved assessment instead of starting again."}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => window.location.reload()} className="arzon-ref-btn arzon-ref-btn-primary">Reload report <RotateCcw /></button>
            <Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-white">Resume assessment</Link>
          </div>
        </div>
      </main>
    );
  }

  const top = result.ranking?.slice(0, 3) ?? [];
  const roleName = result.archetype?.name ?? "Recommended Career Path";
  const pathSlug = result.archetype?.topPaths?.[0]?.slug ?? "";
  const programmeSlug = pathSlug === "medical-coding" ? "medical-coding" : pathSlug === "pharmacovigilance" ? "pharmacovigilance" : pathSlug === "clinical-data-management" ? "clinical-data-management" : pathSlug === "sas-clinical" ? "sas-clinical" : pathSlug === "regulatory-affairs" ? "regulatory-affairs" : pathSlug === "ai-intelligence" ? "ai-intelligence" : "clinical-saas";

  return (
    <main className="arzon-ref-page arzon-ref-result-shell">
      <div className="arzon-ref-container arzon-ref-result-container">
        <div className="arzon-ref-breadcrumb">Career Engine <span>›</span> Results</div>
        <div className="arzon-ref-result-head">
          <div><span className="arzon-ref-kicker-light">PERSONALISED CAREER REPORT</span><h1>Your Career Path Result</h1><p>Based on your responses, here are the career paths worth exploring next.</p></div>
          <button type="button" onClick={retake} className="arzon-ref-retake"><RotateCcw /> Retake</button>
        </div>

        <section className="arzon-ref-result-card">
          <div className="arzon-ref-result-match">
            <div className="arzon-ref-score-ring" style={{ "--score": `${Math.max(0, Math.min(100, Math.round(result.fitScore)))}%` } as CSSProperties}><strong>{Math.round(result.fitScore)}%</strong><span>Match</span></div>
            <div className="arzon-ref-match-copy"><span className="arzon-ref-match-badge">Your Top Match</span><h2>{roleName}</h2><div className="arzon-ref-match-tags"><span>High Demand</span><span>Good Salary</span><span>Global Opportunities</span></div><p>{result.evidence?.summary || "Your assessment signals point toward this role path based on the answers you provided."}</p></div>
          </div>
          <div className="arzon-ref-result-actions">
            <Link to="/courses/$slug" params={{slug:programmeSlug}} className="arzon-ref-btn arzon-ref-btn-primary">View Recommended Programme <ArrowRight /></Link>
            <Link to="/career-engine/start" className="arzon-ref-btn arzon-ref-btn-white"><MessageCircle /> Talk to Counsellor</Link>
          </div>
        </section>

        <section className="arzon-ref-result-secondary">
          <span className="arzon-ref-kicker-light">OTHER RECOMMENDED CAREER PATHS</span>
          <h2>Compare the next closest options.</h2>
          <div className="arzon-ref-result-list">{top.slice(1).map((item)=><div key={item.id}><div><strong>{item.archetype.name}</strong><span>{Math.round(item.fit)}% Match</span></div><Link to="/roles" className="arzon-ref-btn arzon-ref-btn-white">View Details <ArrowRight/></Link></div>)}</div>
        </section>

        <CareerPlanCard result={result} leadId={leadId} />
        <CareerRoadmapCard result={result} leadId={leadId} />
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ArrowRight, CheckCircle2, MessageCircle, RotateCcw } from "lucide-react";
import {
  ARCHETYPES,
  type ArchetypeScore,
  type CareerEngineResult,
} from "@/data/careerEngineScoring";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getResult, getAttemptId } from "@/lib/careerEngineApi";
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
  const [loading, setLoading] = useState(!result && Boolean(id));

  useEffect(() => { trackCEFunnelStep({ step: "result", leadId, attemptId: getAttemptId() }); }, [leadId]);
  useEffect(() => {
    if (result || !id) return;
    let cancelled = false;
    getResult(id).then((row) => {
      if (cancelled) return;
      const rebuilt = rebuildFromRow(row);
      if (rebuilt) {
        setResult(rebuilt); setLeadId(id);
        sessionStorage.setItem("ce_result", JSON.stringify(rebuilt)); sessionStorage.setItem("ce_lead_id", id);
      }
    }).catch((err) => console.warn("Failed to fetch career result", err)).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, result]);
  useEffect(() => {
    if (!result) return;
    const attemptId = getAttemptId();
    if (attemptId) trackAttemptOutcome({ leadId, attemptId, archetype: result.archetype?.name ?? "Generalist", fitScore: result.fitScore, confidence: result.confidence, confidenceBand: result.confidenceBand, topPath: result.archetype?.pathSlug ?? null, topEvidence: (result.evidence?.topDrivers ?? []).map((d) => ({ question_id: d.questionId, chosen: d.chosenValue, delta: d.topArchetypeImpact })) });
  }, [result, leadId]);

  const retake = () => {
    sessionStorage.removeItem("ce_result"); sessionStorage.removeItem("ce_answers"); sessionStorage.removeItem("ce_lead_id"); sessionStorage.removeItem("ce_attempt_id");
    window.location.href = "/career-engine/test";
  };

  if (loading) return <main className="arzon-ref-page arzon-ref-result-shell"><div className="arzon-ref-result-loading">Generating your career report…</div></main>;
  if (!result) return <main className="arzon-ref-page arzon-ref-result-shell"><div className="arzon-ref-result-empty"><h1>Report Not Found</h1><p>Start a fresh assessment to generate your career result.</p><StartFreshButton /></div></main>;

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
            <div className="arzon-ref-score-ring"><strong>{Math.round(result.fitScore)}%</strong><span>Match</span></div>
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

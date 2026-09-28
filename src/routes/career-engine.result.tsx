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
import { getResult, getAttemptId, finalizeLead, hydrateCareerEngineSnapshot } from "@/lib/careerEngineApi";
import { requireCareerEngineSession } from "@/lib/careerEngineGuard";
import { trackAttemptOutcome, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
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
    <main className="min-h-screen overflow-x-clip bg-[#F7F3EC] text-[#07152F]">
      <section className="relative overflow-hidden bg-[#07152F] text-white">
        <div className="absolute inset-0"><img src="/images/bpharm-female-graduate-hero.jpg" alt="" className="h-full w-full object-cover opacity-25" loading="eager" /><div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/45" /></div>
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200">CAREER ENGINE · COMPLETED</p>
              <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.04em]">Your report is ready.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">A decision-support report based on your assessment responses. It is guidance, not a hiring or placement decision.</p>
            </div>
            <button type="button" onClick={retake} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-xs font-bold text-white backdrop-blur-md"><RotateCcw className="h-4 w-4" /> Retake</button>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05]"><img src="/images/pv-career-graduate.jpg" alt="" className="h-full min-h-[320px] w-full object-cover opacity-70" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[#07152F]/70 p-5 backdrop-blur-md"><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-200">TOP ROLE SIGNAL</p><p className="mt-2 font-serif text-3xl">{roleName}</p><p className="mt-2 text-xs text-white/50">Based on your assessment signals</p></div></div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">ROLE FIT SIGNAL</p><p className="mt-2 font-serif text-6xl">{Math.round(result.fitScore)}<span className="text-2xl text-white/35">%</span></p></div><div className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/65">{result.confidenceBand}</div></div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: \`\${Math.max(0, Math.min(100, Math.round(result.fitScore)))}%\` }} /></div>
              <p className="mt-5 text-sm leading-7 text-white/60">{result.evidence?.summary || "Your assessment signals point toward this role path based on the answers you provided."}</p>
              <div className="mt-6 flex flex-wrap gap-2">{(result.evidence?.topDrivers ?? []).slice(0, 4).map((driver) => <span key={driver.questionId} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/60">{driver.chosenValue}</span>)}</div>
              <div className="mt-7 flex flex-wrap gap-3"><Link to="/courses/$slug" params={{ slug: programmeSlug }} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-bold text-[#07152F]">Review preparation <ArrowRight className="h-4 w-4" /></Link><Link to="/roles" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 text-xs font-bold">Compare roles <ArrowRight className="h-4 w-4" /></Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {(result.ranking ?? []).slice(0, 3).map((item, index) => <div key={item.id} className={index === 0 ? "rounded-[2rem] border border-[#07152F]/10 bg-white p-6 shadow-sm md:col-span-3" : "rounded-[2rem] border border-[#07152F]/10 bg-white p-6 shadow-sm"}><div className="flex items-center justify-between gap-4"><span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#2F5F8F]">{index === 0 ? "01 · TOP SIGNAL" : \`0\${index + 1} · ADJACENT SIGNAL\`}</span><span className="font-serif text-2xl">{Math.round(item.fit)}%</span></div><h2 className="mt-4 font-serif text-3xl">{item.archetype.name}</h2><p className="mt-2 text-sm leading-6 text-[#07152F]/55">{item.archetype.tagline}</p></div>)}
        </div>
        <div className="mt-10"><CareerPlanCard result={result} leadId={leadId} /></div>
        <div className="mt-6"><CareerRoadmapCard result={result} leadId={leadId} /></div>
        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#07152F]/10 bg-white p-6 sm:p-8"><p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#2F5F8F]">WHAT TO WATCH</p><h2 className="mt-3 font-serif text-3xl">Use the result as a starting point.</h2><div className="mt-5 space-y-3">{(result.risks ?? []).slice(0, 5).map((risk) => <div key={risk} className="flex gap-3 text-sm leading-6 text-[#07152F]/60"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-600" />{risk}</div>)}</div></div>
          <div className="rounded-[2rem] border border-[#07152F]/10 bg-[#07152F] p-6 text-white sm:p-8"><p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-blue-200">NEXT DECISION</p><h2 className="mt-3 font-serif text-3xl">Understand the role. Then decide whether you need preparation.</h2><p className="mt-4 text-sm leading-6 text-white/55">Open the role profile to verify the work, requirements and evidence before enrolling in anything.</p><Link to="/roles" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-bold text-[#07152F]">Explore role profiles <ArrowRight className="h-4 w-4" /></Link></div>
        </section>
      </section>
    </main>
  );

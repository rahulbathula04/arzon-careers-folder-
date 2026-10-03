import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ShieldCheck, ArrowRight } from "lucide-react";
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
  startFreshAttempt,
  getProfile,
  hydrateCareerEngineSnapshot,
} from "@/lib/careerEngineApi";
import { cacheResult, loadSavedAnswers } from "@/lib/careerEngineRunner";
import { requireCareerEngineSession } from "@/lib/careerEngineGuard";
import { trackAttemptOutcome, trackCEFunnelStep } from "@/lib/careerEngineAnalytics";

// Modular Rebuilt Dossier Components
import { ResultHero } from "@/components/career/result/ResultHero";
import { CareerDiagnosis } from "@/components/career/result/CareerDiagnosis";
import { PillarFitMatrix } from "@/components/career/result/PillarFitMatrix";
import { CompetencyGapCard } from "@/components/career/result/CompetencyGapCard";
import { CapabilityScorecard } from "@/components/career/result/CapabilityScorecard";
import { CareerMarketDossier } from "@/components/career/result/CareerMarketDossier";
import { CareerRoadmap } from "@/components/career/result/CareerRoadmap";
import { CredentialVerification } from "@/components/career/result/CareerCertificate/CredentialVerification";
import { ChallengeFriend } from "@/components/career/result/ReferralSuite/ChallengeFriend";
import { ReferralProgress } from "@/components/career/result/ReferralSuite/ReferralProgress";
import { SocialShareModal } from "@/components/career/result/ReferralSuite/SocialShareModal";
import { ResultConversion } from "@/components/career/result/ResultConversion";

const search = z.object({ id: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/career-engine/result")({
  validateSearch: (s) => search.parse(s),
  beforeLoad: () => requireCareerEngineSession({ needsLead: true }),
  head: () => ({
    meta: [
      { title: "Your Career Identity Dossier · Arzon Global" },
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

    // 1. Check session storage
    let raw = sessionStorage.getItem("ce_result");

    // 2. Check local storage (persists permanently across tabs and restarts)
    if (!raw) {
      try {
        raw = localStorage.getItem("ce_completed_result") || localStorage.getItem("ce_result");
      } catch {
        /* ignore */
      }
    }

    // 3. Fall back to snapshot hydration
    if (!raw) {
      try {
        hydrateCareerEngineSnapshot();
        raw = sessionStorage.getItem("ce_result");
      } catch {
        /* ignore */
      }
    }

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
  const [socialModalOpen, setSocialModalOpen] = useState(false);

  const profile = typeof window !== "undefined" ? getProfile() : null;
  const candidateName = profile?.name;

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
    startFreshAttempt();
    window.location.href = "/career-engine/start";
  };

  const scrollToCertificate = () => {
    if (typeof document !== "undefined") {
      document.getElementById("official-certificate")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans py-16 sm:py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-8 shadow-sm sm:p-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#EEF6FF] text-[#1557D6]">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <p className="mt-5 text-xs font-mono font-bold uppercase tracking-[0.15em] text-[#1557D6]">
              ARZON CAREER ENGINE
            </p>
            <h1 className="mt-2 font-serif text-2xl font-bold text-[#071A4A] sm:text-3xl">
              Synthesizing Your Career Identity
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#3F4A60]">
              Calibrating your 42 responses against clinical industry benchmarks and generating your verified aptitude credential...
            </p>
            <div className="mx-auto mt-6 h-2 max-w-xs overflow-hidden rounded-full bg-[#EEF6FF]">
              <div className="h-full w-2/3 motion-safe:animate-pulse rounded-full bg-[#1557D6]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans py-12 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-7 shadow-sm sm:p-10">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#1557D6]">
                  ASSESSMENT PERSISTED
                </span>
                <h1 className="mt-2 font-serif text-2xl font-bold text-[#071A4A] sm:text-3xl">
                  We could not load your report yet.
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[#3F4A60]">
                  Your responses are securely saved. You do not need to repeat the diagnostic from this screen.
                </p>
              </div>
            </div>

            {recovering || !loadError ? (
              <div className="mt-6 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF] p-4 text-xs text-[#071A4A]">
                Checking persisted session state and rebuilding your diagnostic dossier...
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-xs text-rose-800">
                The report service did not return a result. Your answers remain cached. Please try again.
              </div>
            )}

            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <Link
                to="/career-engine"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#071A4A] px-6 text-sm font-bold text-white hover:bg-[#1557D6]"
              >
                Return to Career Engine <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/career-engine/start"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#E4EAF2] bg-white tone-light px-6 text-sm font-bold text-[#071A4A] hover:bg-slate-50"
              >
                Resume Saved Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Construct Personalized Viral Referral URL
  const origin = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
  const shareUrl = `${origin}/career-engine/start?ref=${encodeURIComponent(leadId || "arzon")}&name=${encodeURIComponent(
    candidateName || "",
  )}&identity=${encodeURIComponent(result.archetypeId)}&fit=${encodeURIComponent(
    Math.round(result.fitScore),
  )}`;

  return (
    <main
      className="min-h-screen bg-[#F7F9FC] text-[#071A4A] tone-light arzon-page-surface font-sans pt-5 pb-16 sm:pt-10 sm:pb-20"
      style={{ paddingBottom: "max(4rem, env(safe-area-inset-bottom, 4rem))" }}
    >
      <div className="mx-auto max-w-5xl px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#69758A]">
          <Link to="/career-engine" className="hover:text-[#071A4A] transition-colors">
            Career Engine
          </Link>
          <span>›</span>
          <span className="text-[#071A4A] font-semibold">Career Identity Dossier</span>
        </div>

        {/* 1. Career Identity Hero */}
        <ResultHero
          result={result}
          candidateName={candidateName}
          onShareClick={() => setSocialModalOpen(true)}
          onScrollToCertificate={scrollToCertificate}
          onRetake={retake}
        />

        {/* 2. Why You Matched: Evidence Signals & Behavioral Fit */}
        <CareerDiagnosis result={result} />

        {/* 3. 5-Pillar Fit Breakdown & Diagnostic Matrix */}
        <PillarFitMatrix result={result} />

        {/* 4. Competency Gap Analysis & Career Optimizer */}
        <CompetencyGapCard result={result} />

        {/* 5. Capability Scorecard: Multi-Vector Trait Percentiles */}
        <CapabilityScorecard result={result} />

        {/* 4. Target Role & Market Compensation Reality in India */}
        <CareerMarketDossier result={result} />

        {/* 5. 90-Day Proof-of-Work Execution Plan */}
        <CareerRoadmap result={result} />

        {/* 6. Free Classical Institutional Credential (PDF Download & Public Verification) */}
        <CredentialVerification
          result={result}
          candidateName={candidateName}
          leadId={leadId}
        />

        {/* 7. Next Steps: Exploration & Admissions Gateway */}
        <ResultConversion result={result} />

        {/* 8. Challenge A Friend (Social Comparison Loop) */}
        <ChallengeFriend
          result={result}
          candidateName={candidateName}
          shareUrl={shareUrl}
          onOpenSocialModal={() => setSocialModalOpen(true)}
        />

        {/* 9. Peer Referral Unlock Vault */}
        <ReferralProgress
          leadId={leadId}
          onShareClick={() => setSocialModalOpen(true)}
        />
      </div>

      {/* Social Multi-Channel Share Modal */}
      <SocialShareModal
        isOpen={socialModalOpen}
        onClose={() => setSocialModalOpen(false)}
        result={result}
        candidateName={candidateName}
        shareUrl={shareUrl}
      />
    </main>
  );
}

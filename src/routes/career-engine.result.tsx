import { useEffect, useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ShieldCheck, UserCheck, ArrowRight, ExternalLink } from "lucide-react";
import {
  getAttemptId,
  getLeadId,
  getProfile,
  startFreshAttempt,
  hydrateCareerEngineSnapshot,
} from "@/lib/careerEngineApi";
import { loadSavedAnswers } from "@/lib/careerEngineRunner";
import { trackCEFunnelStep } from "@/lib/careerEngineAnalytics";
import { DsaDiagnosticScorecard } from "@/components/career/result/DsaDiagnosticScorecard";
import {
  getPublicDiagnosticResult,
  encodeCompactAnswers,
  decodeCompactAnswers,
} from "@/lib/careerEngineDiagnostic.functions";
import { getAntiCheatFromStorage } from "@/lib/assessmentAntiCheat";

/**
 * Canonical Candidate Baseline Answers for 15% Score (6 / 40 Correct)
 * Used as fallback only when zero answer data is provided.
 */
export const CANONICAL_DSA_15_PERCENT_ANSWERS: Record<string, string> = {
  // Q1 - Q5: PV Scope & Fundamentals (1/5 correct = 20%)
  dsa_q1: "A", // INCORRECT (Trap 1: Picked ADR instead of AE; correct: B)
  dsa_q2: "A", // CORRECT (Investigator Brochure / RSI; correct: A)
  dsa_q3: "A", // INCORRECT (correct: C)
  dsa_q4: "B", // INCORRECT (correct: D)
  dsa_q5: "A", // INCORRECT (correct: B)

  // Q6 - Q10: ICSR Intake & Validity (1/5 correct = 20%)
  dsa_q6: "B", // INCORRECT (correct: A)
  dsa_q7: "C", // CORRECT (Digital media unverified reporter; correct: C)
  dsa_q8: "A", // INCORRECT (correct: D)
  dsa_q9: "C", // INCORRECT (correct: B)
  dsa_q10: "B", // INCORRECT (correct: A)

  // Q11 - Q15: Day 0 Regulatory Clocks (1/5 correct = 20%)
  dsa_q11: "A", // INCORRECT (Trap 2: Picked Monday instead of Friday; correct: C)
  dsa_q12: "D", // CORRECT (Calendar day vs business day rule; correct: D)
  dsa_q13: "A", // INCORRECT (correct: B)
  dsa_q14: "B", // INCORRECT (correct: A)
  dsa_q15: "A", // INCORRECT (correct: C)

  // Q16 - Q20: Seriousness & Expedited Timelines (1/5 correct = 20%)
  dsa_q16: "B", // INCORRECT (Trap 3: Picked 15-day instead of 7-day fatal SUSAR; correct: D)
  dsa_q17: "B", // CORRECT (Medically Important Event definition; correct: B)
  dsa_q18: "B", // INCORRECT (correct: A)
  dsa_q19: "A", // INCORRECT (correct: C)
  dsa_q20: "A", // INCORRECT (correct: D)

  // Q21 - Q25: MedDRA Hierarchy & MSSO Rules (1/5 correct = 20%)
  dsa_q21: "C", // INCORRECT (Trap 4: Split-coded symptoms instead of confirmed diagnosis; correct: B)
  dsa_q22: "A", // CORRECT (MedDRA 5-level hierarchy LLT to SOC; correct: A)
  dsa_q23: "A", // INCORRECT (correct: C)
  dsa_q24: "A", // INCORRECT (correct: D)
  dsa_q25: "A", // INCORRECT (correct: B)

  // Q26 - Q30: Special Safety Situations (1/5 correct = 20%)
  dsa_q26: "B", // INCORRECT (correct: A)
  dsa_q27: "C", // CORRECT (Pregnancy exposure tracking without AE; correct: C)
  dsa_q28: "A", // INCORRECT (correct: D)
  dsa_q29: "A", // INCORRECT (correct: B)
  dsa_q30: "B", // INCORRECT (correct: A)

  // Q31 - Q35: SBAR Narratives & Queries (0/5 correct = 0%)
  dsa_q31: "A", // INCORRECT (correct: C)
  dsa_q32: "A", // INCORRECT (correct: D)
  dsa_q33: "A", // INCORRECT (correct: B)
  dsa_q34: "B", // INCORRECT (correct: A)
  dsa_q35: "A", // INCORRECT (correct: C)

  // Q36 - Q40: Causality & Dispute Escalation (0/5 correct = 0%)
  dsa_q36: "A", // INCORRECT (correct: D)
  dsa_q37: "A", // INCORRECT (correct: B)
  dsa_q38: "B", // INCORRECT (correct: A)
  dsa_q39: "A", // INCORRECT (correct: C)
  dsa_q40: "A", // INCORRECT (correct: D)
};

const searchSchema = z.object({
  id: z.string().optional().catch(undefined),
  name: z.string().optional().catch(undefined),
  q: z.string().optional().catch(undefined),
  c: z.string().optional().catch(undefined),
  y: z.string().optional().catch(undefined),
  role: z.string().optional().catch(undefined),
  ans: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/career-engine/result")({
  validateSearch: (s) => searchSchema.parse(s),
  loaderDeps: ({ search: { id } }) => ({ id }),
  loader: async ({ deps: { id } }) => {
    if (!id || id.startsWith("lead_local_") || id.length < 10) {
      return { serverResult: null };
    }
    try {
      const serverResult = await getPublicDiagnosticResult({ data: { leadId: id } });
      return { serverResult };
    } catch (err) {
      console.warn("[career-engine/result] loader lookup failed", err);
      return { serverResult: null };
    }
  },
  head: () => ({
    meta: [
      { title: "Drug Safety Associate Clinical Interview Diagnostic Scorecard · Arzon Global" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const search = Route.useSearch();
  const loaderData = Route.useLoaderData();

  // Determine if this session is viewing a shared student link
  const hasSharedId = Boolean(search.id && search.id.trim().length > 0);
  const hasSharedPayload = Boolean(search.ans || search.name);
  const isSharedView = hasSharedId || hasSharedPayload;

  const leadId = search.id ?? (typeof window !== "undefined" ? getLeadId() : null);

  useEffect(() => {
    // Only hydrate current user snapshot if NOT viewing an external shared link
    if (!isSharedView && typeof window !== "undefined") {
      hydrateCareerEngineSnapshot();
    }
    trackCEFunnelStep({ step: "result", leadId, attemptId: getAttemptId() });
  }, [isSharedView, leadId]);

  // Resolve Candidate Profile:
  // 1. Server database record (highest priority when lead ID is provided)
  // 2. URL parameters (instant fallback if shared with encoded meta)
  // 3. Local candidate profile (only when viewing own local session)
  // 4. Default baseline
  const candidateProfile = useMemo(() => {
    if (loaderData?.serverResult?.found) {
      const r = loaderData.serverResult;
      return {
        name: r.candidateName || "Candidate",
        qualification: r.candidateQualification || "B.Pharm",
        college: r.candidateCollege || "Healthcare Graduate College",
        graduationYear: r.candidateGraduationYear || "2025",
        currentStatus: r.candidateCurrentStatus || "Actively Job Hunting",
        targetRole: r.candidateTargetRole || "Drug Safety Associate",
      };
    }

    if (hasSharedPayload) {
      return {
        name: search.name ? decodeURIComponent(search.name) : "Student Candidate",
        qualification: search.q ? decodeURIComponent(search.q) : "B.Pharm",
        college: search.c ? decodeURIComponent(search.c) : "Pharmacy College",
        graduationYear: search.y ? decodeURIComponent(search.y) : "2025",
        currentStatus: "Actively Job Hunting",
        targetRole: search.role ? decodeURIComponent(search.role) : "Drug Safety Associate",
      };
    }

    // Only read viewer's local storage if NOT an external shared view
    if (!isSharedView && typeof window !== "undefined") {
      const local = getProfile();
      if (local) {
        return {
          name: local.name || "Rahul V.",
          qualification: local.qualification || "B.Pharm",
          college: local.college || "Healthcare Graduate College",
          graduationYear: local.graduationYear || "2025",
          currentStatus: local.currentStatus || "Actively Job Hunting",
          targetRole: local.targetRole || "Drug Safety Associate",
        };
      }
    }

    return {
      name: "Rahul V.",
      qualification: "B.Pharm",
      college: "Healthcare Graduate College",
      graduationYear: "2025",
      currentStatus: "Actively Job Hunting",
      targetRole: "Drug Safety Associate",
    };
  }, [loaderData?.serverResult, hasSharedPayload, isSharedView, search]);

  // Compute effective answers:
  // 1. Server-recorded answers for this lead
  // 2. URL-decoded compact answers
  // 3. Local saved answers (only for own attempt)
  // 4. Canonical 15% diagnostic fallback
  const effectiveAnswers = useMemo(() => {
    // 1. Authoritative server answers
    if (loaderData?.serverResult?.found && loaderData.serverResult.answers) {
      const serverAns = loaderData.serverResult.answers;
      const count = Object.keys(serverAns).filter((k) => k.startsWith("dsa_q")).length;
      if (count >= 5) {
        return serverAns;
      }
    }

    // 2. URL-encoded answers
    if (search.ans) {
      const decoded = decodeCompactAnswers(search.ans);
      const decodedCount = Object.keys(decoded).length;
      if (decodedCount >= 5) {
        return decoded;
      }
    }

    // 3. Local browser storage (ONLY if NOT viewing another student's link)
    if (!isSharedView && typeof window !== "undefined") {
      const saved = loadSavedAnswers();
      const dsaKeys = Object.keys(saved).filter((k) => k.startsWith("dsa_q"));
      if (dsaKeys.length >= 5) {
        return saved;
      }
    }

    // 4. Default canonical baseline
    return CANONICAL_DSA_15_PERCENT_ANSWERS;
  }, [loaderData?.serverResult, search.ans, isSharedView]);

  const retake = () => {
    startFreshAttempt();
    window.location.href = "/career-engine/start";
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
  const compactAns = useMemo(() => encodeCompactAnswers(effectiveAnswers), [effectiveAnswers]);

  // Construct dual-mode share URL:
  // Includes ?id=<uuid> when valid, plus compact meta so recipients without db auth can still view
  const shareUrl = useMemo(() => {
    if (leadId && !leadId.startsWith("lead_local_")) {
      return `${origin}/career-engine/result?id=${encodeURIComponent(leadId)}&name=${encodeURIComponent(candidateProfile.name)}&ans=${compactAns}`;
    }
    return `${origin}/career-engine/result?name=${encodeURIComponent(candidateProfile.name)}&q=${encodeURIComponent(candidateProfile.qualification)}&c=${encodeURIComponent(candidateProfile.college)}&y=${encodeURIComponent(candidateProfile.graduationYear)}&ans=${compactAns}`;
  }, [origin, leadId, candidateProfile, compactAns]);

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-[#EAEFF6] via-[#F2F6FA] to-[#E8EEF5] text-[#071A4A] tone-light arzon-page-surface font-sans pt-3.5 pb-10 sm:pt-8 sm:pb-16 w-full max-w-full min-w-0 overflow-x-hidden relative"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 2.5rem)" }}
    >
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-blue-300/20 via-indigo-200/15 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 space-y-5 sm:space-y-7 w-full max-w-full min-w-0">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-mono text-[#69758A]">
          <div className="flex items-center gap-2">
            <Link to="/career-engine/start" className="hover:text-[#071A4A] transition-colors">
              Clinical Diagnostic
            </Link>
            <span>›</span>
            <span className="text-[#071A4A] font-semibold">Drug Safety Associate Technical Diagnostic</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10.5px] font-bold">
            <ShieldCheck className="h-3 w-3 text-emerald-600" />
            <span>Verified Technical Screening Ledger</span>
          </span>
        </div>

        {/* Shared Mode Evaluator / Recipient Banner */}
        {isSharedView && (
          <div className="rounded-2xl border border-blue-200/90 bg-white/95 p-4 sm:p-5 shadow-sm tone-light card-light flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 mt-0.5 sm:mt-0">
                <UserCheck className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80">
                    Student Evaluation Dossier
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    Verified Arzon Assessment
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#071A4A] pt-0.5">
                  Reviewing official diagnostic performance for{" "}
                  <span className="text-blue-700 font-bold">{candidateProfile.name}</span>{" "}
                  <span className="text-slate-500 font-normal">
                    ({candidateProfile.qualification}, {candidateProfile.college})
                  </span>
                </p>
              </div>
            </div>
            <Link
              to="/career-engine/start"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all shrink-0 active:scale-98"
            >
              <span>Take Diagnostic Yourself</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Primary Clinical Diagnostic Scorecard */}
        <DsaDiagnosticScorecard
          answers={effectiveAnswers}
          candidateName={candidateProfile.name}
          candidateQualification={candidateProfile.qualification}
          candidateCollege={candidateProfile.college}
          candidateGraduationYear={candidateProfile.graduationYear}
          candidateCurrentStatus={candidateProfile.currentStatus}
          candidateTargetRole={candidateProfile.targetRole}
          leadId={leadId}
          shareUrl={shareUrl}
          isSharedView={isSharedView}
          antiCheat={loaderData?.serverResult?.antiCheat ?? (typeof window !== "undefined" ? getAntiCheatFromStorage() ?? undefined : undefined)}
          onRetake={retake}
        />
      </div>
    </main>
  );
}

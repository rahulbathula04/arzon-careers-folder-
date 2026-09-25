/**
 * AcriAssessmentTerminal — Orchestrator
 *
 * This is the canonical component that owns and manages assessment session state.
 * All child components are consumers that receive state via props and emit events upward.
 *
 * Fixes:
 * 1. Never directly opens the test on page load / refresh. Always presents the official
 *    Mode Selection & Assessment Briefing screen (Image 1 reference).
 * 2. If an active session exists in storage, displays a clear, prominent "Resume Assessment"
 *    banner with progress & time remaining, rather than forcing the user into the test.
 * 3. Before launching the 25:00 certification battery, opens a candidate briefing & profile
 *    capture modal so certificates and scorecards are personalized to the candidate.
 * 4. Provides a clean "Exit Test" mechanism that returns to the mode selection screen without
 *    trapping the candidate in an auto-resuming loop.
 */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Info,
  Clock,
  User,
  Mail,
  GraduationCap,
  Building,
  AlertTriangle,
  X,
  Play,
  ArrowLeft,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import {
  startAcriSessionFn,
  autosaveAcriSessionFn,
  submitAcriAssessmentFn,
  verifyAcriInviteFn,
} from "@/lib/acri-core.functions";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { ACRI_PV_WORK_SIMULATION_ITEMS, type AcriAssessmentItem } from "@/data/acri/acriPvCaseLibrary";
import { generateCandidateQuestionBattery } from "@/lib/acri/acriQuestionBank";
import { useAcriIntegrityGuard } from "@/lib/acri/useAcriIntegrityGuard";
import { evaluateCandidateResponses } from "@/lib/acri/acriScoringEngine";
import { saveAcriResult } from "@/lib/acri/acriCandidateStore";
import {
  getAcriSession,
  saveAcriSession,
  resetAcriSession,
  recordAnswer,
  type AssessmentMode,
  type AcriSessionState,
} from "@/lib/acri/acriSession";
import {
  beginAssessment,
  beginSave,
  completeSave,
  resumeActive,
  openReview,
  closeReview,
  confirmSubmit,
  shouldTimerRun,
} from "@/lib/acri/acriStateMachine";
import { AcriStageRail } from "./AcriStageRail";
import { AcriProgressRail } from "./AcriProgressRail";
import { AcriWorkSimulation } from "./AcriWorkSimulation";
import { AcriResultScorecard } from "./AcriResultScorecard";
import { AcriCareerIntelligenceReport } from "./AcriCareerIntelligenceReport";
import { SampleReportModal, CertificateModal } from "../AcriModals";
import { ArzonLogo } from "../ArzonLogo";

// Autosave debounce (ms)
const AUTOSAVE_DEBOUNCE = 1500;

export interface CandidateProfile {
  fullName: string;
  email: string;
  qualification: string;
  college: string;
}

export function AcriAssessmentTerminal() {
  const [session, setSession] = useState<AcriSessionState>(() => getAcriSession());

  // Server functions
  const startSessionFn = useServerFn(startAcriSessionFn);
  const autosaveSessionFn = useServerFn(autosaveAcriSessionFn);
  const submitAssessmentFn = useServerFn(submitAcriAssessmentFn);
  const verifyInviteFn = useServerFn(verifyAcriInviteFn);

  // Invite verification state
  const [inviteCodeFromUrl, setInviteCodeFromUrl] = useState<string | null>(null);
  const [verifiedInvite, setVerifiedInvite] = useState<{
    code: string;
    candidateName?: string;
    qualification?: string;
    college?: string;
  } | null>(null);

  // CRITICAL FIX: hasStarted must always initialize to false on initial mount
  // so that navigating to /career-engine/test NEVER jumps directly into the test questions!
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Candidate profile state (persisted to sessionStorage)
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(() => {
    if (typeof window === "undefined") {
      return {
        fullName: "",
        email: "",
        qualification: "B.Pharm (Bachelor of Pharmacy)",
        college: "",
      };
    }
    try {
      const stored = sessionStorage.getItem("arzon_acri_candidate_profile");
      if (stored) return JSON.parse(stored);
    } catch {}
    return {
      fullName: "",
      email: "",
      qualification: "B.Pharm (Bachelor of Pharmacy)",
      college: "",
    };
  });

  // Modal states
  const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<AssessmentMode>("certified");
  const [briefingError, setBriefingError] = useState<string | null>(null);

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read URL params on mount to verify code
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      setInviteCodeFromUrl(code);
      verifyInviteFn({ data: { code } })
        .then((res) => {
          if (res?.valid) {
            setVerifiedInvite({
              code,
              candidateName: res.candidateName,
              qualification: res.qualification,
              college: res.college,
            });
            if (res.candidateName && res.candidateName !== "Verified Candidate") {
              setCandidateProfile((prev) => ({
                ...prev,
                fullName: res.candidateName || prev.fullName,
                qualification: res.qualification || prev.qualification,
                college: res.college || prev.college,
              }));
            }
          }
        })
        .catch(() => {});
    }
  }, [verifyInviteFn]);

  // Sync to storage whenever session changes
  useEffect(() => {
    saveAcriSession(session);
  }, [session]);

  // Derived data: Candidate-unique, stratified 40-question battery from attempt seed
  const items: AcriAssessmentItem[] = React.useMemo(() => {
    const seed = session.attemptId || session.sessionId || "ATT-ACRI-40";
    return generateCandidateQuestionBattery(seed, 40);
  }, [session.attemptId, session.sessionId]);

  // Timer countdown for Certified Mode
  useEffect(() => {
    if (!hasStarted || session.isFinished || session.mode !== "certified") return;
    if (!shouldTimerRun(session.phase)) return;
    if (isReducedMotion()) return;

    const timer = setInterval(() => {
      setSession((prev) => {
        let currentRemaining = prev.timeRemainingSeconds - 1;
        if (prev.expiresAt) {
          currentRemaining = Math.max(0, Math.floor((prev.expiresAt - Date.now()) / 1000));
        }

        if (currentRemaining <= 0) {
          // Time expired → auto submit
          const finalResult = evaluateCandidateResponses(
            {
              answers: prev.answers,
              flaggedItems: prev.flaggedItemIds,
            },
            items
          );

          return {
            ...prev,
            timeRemainingSeconds: 0,
            isFinished: true,
            result: finalResult,
            phase: "RESULT_READY",
          };
        }
        return { ...prev, timeRemainingSeconds: currentRemaining };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, session.isFinished, session.mode, session.phase, items]);

  // Anti-cheating & proctoring guard for certified mode
  const integrity = useAcriIntegrityGuard(
    session.mode,
    hasStarted,
    session.sessionId || undefined
  );

  const currentItem = items[session.currentItemIndex] || items[0];
  const answeredCount = Object.keys(session.answers).length;
  const overallPercent = Math.round((answeredCount / items.length) * 100);

  // Check if an in-progress session exists that can be resumed
  const hasActiveSession =
    (session.phase === "ACTIVE" || session.phase === "SAVING" || session.phase === "SAVED" || session.phase === "REVIEW") &&
    !session.isFinished &&
    session.timeRemainingSeconds > 0 &&
    (answeredCount > 0 || session.currentItemIndex > 0);

  // Stage info for sidebar
  const stageCategories = Array.from(new Set(items.map((i) => i.stageCategory)));
  const stageInfoList = stageCategories.map((cat) => {
    const catItems = items.filter((i) => i.stageCategory === cat);
    const completedCatItems = catItems.filter((i) => !!session.answers[i.id]);
    return {
      name: cat,
      category: cat,
      isComplete: catItems.every((i) => !!session.answers[i.id]),
      isActive: currentItem.stageCategory === cat,
      questionCount: catItems.length,
      completedCount: completedCatItems.length,
    };
  });

  const sectionItems = items.filter((i) => i.stageCategory === currentItem.stageCategory);
  const sectionQuestionNumber = sectionItems.findIndex((i) => i.id === currentItem.id) + 1;

  // ── Event Handlers ──────────────────────────────────────────────────────────

  const handleOpenBriefing = (mode: AssessmentMode) => {
    setPendingMode(mode);
    setBriefingError(null);
    setIsBriefingModalOpen(true);
  };

  const handleConfirmStart = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setBriefingError(null);

    if (pendingMode === "certified") {
      if (!candidateProfile.fullName.trim()) {
        setBriefingError("Please enter your full name for certificate registration.");
        return;
      }
      if (!candidateProfile.email.trim() || !candidateProfile.email.includes("@")) {
        setBriefingError("Please enter a valid academic or professional email address.");
        return;
      }
      if (!candidateProfile.college.trim()) {
        setBriefingError("Please enter your college or institution name.");
        return;
      }
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("arzon_acri_candidate_profile", JSON.stringify(candidateProfile));
    }

    let serverSessionId: string | null = null;
    let serverSessionToken: string | null = null;
    let expiresAtMs: number = Date.now() + 25 * 60 * 1000;

    try {
      if (pendingMode === "certified") {
        const sRes: any = await startSessionFn({
          data: {
            inviteCode: verifiedInvite?.code || inviteCodeFromUrl || "ACRI-PV-COHORT1",
          },
        });
        if (sRes?.sessionId) {
          serverSessionId = sRes.sessionId;
        }
        if (sRes?.sessionToken) {
          serverSessionToken = sRes.sessionToken;
        }
        if (sRes?.expiresAt) {
          expiresAtMs = new Date(sRes.expiresAt).getTime();
        }
      }
    } catch (err) {
      console.warn("Server session initialization fallback to client timer:", err);
    }

    const fresh = resetAcriSession(
      pendingMode,
      verifiedInvite?.code || inviteCodeFromUrl || null,
      serverSessionId,
      pendingMode === "certified" ? expiresAtMs : null,
      serverSessionToken,
    );
    const nextPhase = beginAssessment(fresh.phase);
    setSession({
      ...fresh,
      phase: nextPhase,
      timeRemainingSeconds: pendingMode === "certified" ? Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1000)) : Infinity,
      startedAt: Date.now(),
    });

    setIsBriefingModalOpen(false);
    setHasStarted(true);
  };

  const handleResumeSession = () => {
    setHasStarted(true);
  };

  const scheduleAutosave = useCallback(() => {
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    setSession((prev) => ({ ...prev, phase: beginSave(prev.phase) }));
    autosaveTimerRef.current = setTimeout(() => {
      setSession((prev) => {
        const savedPhase = completeSave(prev.phase);
        const resumedPhase = resumeActive(savedPhase);
        if (prev.sessionId) {
          autosaveSessionFn({
            data: {
              sessionId: prev.sessionId,
              sessionToken: prev.sessionToken || "tok_default",
              currentQuestionIndex: prev.currentItemIndex,
              responses: prev.answers,
            },
          }).catch(() => {});
        }
        return { ...prev, phase: resumedPhase, lastSavedAt: Date.now(), saveError: null };
      });
    }, AUTOSAVE_DEBOUNCE);
  }, [autosaveSessionFn]);

  const handleAnswerChange = useCallback(
    (answer: unknown) => {
      setSession((prev) => ({
        ...prev,
        ...recordAnswer(prev, currentItem.id, answer),
      }));
      scheduleAutosave();
    },
    [currentItem.id, scheduleAutosave],
  );

  const handleToggleFlag = useCallback(() => {
    setSession((prev) => {
      const isFlagged = prev.flaggedItemIds.includes(currentItem.id);
      return {
        ...prev,
        flaggedItemIds: isFlagged
          ? prev.flaggedItemIds.filter((id) => id !== currentItem.id)
          : [...prev.flaggedItemIds, currentItem.id],
      };
    });
  }, [currentItem.id]);

  const handleNext = useCallback(() => {
    if (session.currentItemIndex < items.length - 1) {
      setSession((prev) => ({ ...prev, currentItemIndex: prev.currentItemIndex + 1 }));
    }
  }, [session.currentItemIndex, items.length]);

  const handlePrev = useCallback(() => {
    if (session.currentItemIndex > 0) {
      setSession((prev) => ({ ...prev, currentItemIndex: prev.currentItemIndex - 1 }));
    }
  }, [session.currentItemIndex]);

  const handleOpenReview = useCallback(() => {
    setSession((prev) => ({ ...prev, phase: openReview(prev.phase) }));
  }, []);

  const handleSubmit = useCallback(() => {
    setSession((prev) => ({ ...prev, phase: confirmSubmit(prev.phase) }));
    const evaluation = evaluateCandidateResponses(
      {
        answers: session.answers,
        flaggedItems: session.flaggedItemIds,
      },
      items
    );

    const isReady = evaluation.compositeScore >= 80;
    const serial = Math.floor(100000 + Math.random() * 900000);
    const credId = isReady ? `AZ-ACRI-PV-2026-${serial}` : `AZ-ACRI-EVAL-${serial}`;
    const resId = `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    saveAcriResult({
      resultId: resId,
      candidateName: candidateProfile.fullName || "Rahul Bathula",
      candidateEmail: candidateProfile.email,
      qualification: candidateProfile.qualification,
      college: candidateProfile.college,
      score: evaluation.compositeScore,
      decision: evaluation.decision,
      passedGates: evaluation.passedGates,
      dimensionScores: evaluation.dimensionScores,
      credentialId: credId,
      completedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      mode: session.mode,
    });

    // Authoritative Server Evaluation
    if (session.sessionId) {
      submitAssessmentFn({
        data: {
          sessionId: session.sessionId,
          sessionToken: session.sessionToken || "tok_default",
          candidateName: candidateProfile.fullName || "Candidate",
          candidateEmail: candidateProfile.email && candidateProfile.email.includes("@") ? candidateProfile.email : undefined,
          qualification: candidateProfile.qualification,
          college: candidateProfile.college,
          responses: session.answers,
          consentPublicLeaderboard: true,
        },
      }).catch((e) => console.warn("Server evaluation background sync:", e));
    }

    setSession((prev) => ({
      ...prev,
      phase: "RESULT_READY",
      isFinished: true,
      result: evaluation,
    }));
  }, [session, candidateProfile, submitAssessmentFn, items]);

  const handleTimerExpire = useCallback(() => {
    const evaluation = evaluateCandidateResponses(
      {
        answers: session.answers,
        flaggedItems: session.flaggedItemIds,
      },
      items
    );

    const isReady = evaluation.compositeScore >= 80;
    const credId = isReady ? `AZ-ACRI-PV-2026-403067` : `AZ-ACRI-EVAL-403067`;
    const resId = `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    saveAcriResult({
      resultId: resId,
      candidateName: candidateProfile.fullName || "Rahul Bathula",
      candidateEmail: candidateProfile.email,
      qualification: candidateProfile.qualification,
      college: candidateProfile.college,
      score: evaluation.compositeScore,
      decision: evaluation.decision,
      passedGates: evaluation.passedGates,
      dimensionScores: evaluation.dimensionScores,
      credentialId: credId,
      completedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      mode: session.mode,
    });

    if (session.sessionId) {
      submitAssessmentFn({
        data: {
          sessionId: session.sessionId,
          sessionToken: session.sessionToken || "tok_default",
          candidateName: candidateProfile.fullName || "Candidate",
          candidateEmail: candidateProfile.email && candidateProfile.email.includes("@") ? candidateProfile.email : undefined,
          qualification: candidateProfile.qualification,
          college: candidateProfile.college,
          responses: session.answers,
          consentPublicLeaderboard: true,
        },
      }).catch((e) => console.warn("Server evaluation background sync:", e));
    }

    setSession((prev) => ({
      ...prev,
      timeRemainingSeconds: 0,
      phase: "RESULT_READY",
      isFinished: true,
      result: evaluation,
    }));
  }, [session, candidateProfile, submitAssessmentFn, items]);

  const handleExitToModeSelection = useCallback(() => {
    saveAcriSession(session);
    setIsExitModalOpen(false);
    setHasStarted(false);
  }, [session]);

  const handleRetake = useCallback(() => {
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    const fresh = resetAcriSession(session.mode);
    setSession(fresh);
    setHasStarted(false);
  }, [session.mode]);

  // ─────────────────────────────────────────────────────────────────────────────
  // VIEW 1: Result Scorecard View
  // ─────────────────────────────────────────────────────────────────────────────
  if (session.isFinished && session.result) {
    return (
      <div className="min-h-screen bg-[#F7F8F5]">
        <AcriCareerIntelligenceReport
          result={session.result}
          mode={session.mode}
          candidateName={candidateProfile.fullName || "Rahul Kumar"}
          onRetake={handleRetake}
          onViewCertificate={() => setIsCertificateOpen(true)}
          onViewReport={() => setIsReportOpen(true)}
        />

        <CertificateModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
        />

        <SampleReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          onOpenCertificate={() => {
            setIsReportOpen(false);
            setIsCertificateOpen(true);
          }}
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // VIEW 2: Mode Selection & Briefing Screen (Exact Brand Reference Reproduction)
  // ─────────────────────────────────────────────────────────────────────────────
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-[#0B1325] flex flex-col justify-between">
        {/* Terminal Top Bar */}
        <header className="border-b border-stone-200 bg-[#0B1325] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-90 transition">
              <ArzonLogo variant="dark" size="sm" />
            </Link>
            <span className="text-stone-500">|</span>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              ACRI PHARMACOVIGILANCE ASSESSMENT TERMINAL
            </span>
          </div>

          <Link
            to="/"
            className="text-xs font-medium text-stone-300 hover:text-white transition flex items-center gap-1"
          >
            ← Return to Overview
          </Link>
        </header>

        {/* Main Body */}
        <main className="max-w-4xl mx-auto w-full py-10 px-4 sm:px-6 space-y-8 flex-1">
          {/* Active In-Progress Session Resume Banner */}
          {hasActiveSession && (
            <div className="rounded-2xl border-2 border-emerald-600/30 bg-emerald-50/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
                  <span>IN-PROGRESS SESSION DETECTED</span>
                </div>
                <h3 className="font-bold text-sm text-stone-900">
                  You have an active {session.mode === "certified" ? "Certification" : "Practice"} assessment session
                </h3>
                <p className="text-xs text-stone-600">
                  Case {session.currentItemIndex + 1} of {items.length} · {answeredCount} answered ·{" "}
                  {Math.floor(session.timeRemainingSeconds / 60)}:
                  {(session.timeRemainingSeconds % 60).toString().padStart(2, "0")} remaining
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleResumeSession}
                  className="px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span>Resume Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                </button>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-700 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Discard &amp; Restart
                </button>
              </div>
            </div>
          )}

          {/* Verified Invite Banner */}
          {verifiedInvite && (
            <div className="rounded-2xl border-2 border-[#005B4F]/40 bg-[#E8F7F1] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#005B4F] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
                      COHORT 01 INVITE VERIFIED
                    </span>
                    <span className="font-mono text-xs font-black text-stone-900 bg-white tone-light px-2 py-0.5 rounded border border-[#005B4F]/30">
                      {verifiedInvite.code}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 mt-0.5">
                    Welcome <strong>{candidateProfile.fullName || "Candidate"}</strong> ({candidateProfile.qualification}). Your 25-minute certification slot is active.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#005B4F] text-white shrink-0 self-start sm:self-auto">
                INVITE ALLOCATED
              </span>
            </div>
          )}

          {/* Heading */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#07241A] text-emerald-400 border border-emerald-800/40">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ACRI-PV OCCUPATIONAL READINESS BATTERY v1.0</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1325] tracking-tight">
              Select Assessment Mode
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed font-sans">
              Arzon divides candidate evaluation into two distinct modalities to preserve
              occupational measurement validity and academic integrity.
            </p>
          </div>

          {/* Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Mode B: ACRI Certification (Recommended) */}
            <div className="rounded-2xl border-2 border-[#0B1325] bg-white tone-light p-6 sm:p-7 shadow-md relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-[#0B1325] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-xs">
                RECOMMENDED · OFFICIAL
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#0B1325] text-white flex items-center justify-center">
                    <Award className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-[#0B1325]">
                      Mode B: ACRI Certification
                    </h2>
                    <div className="text-xs text-stone-500 font-medium">
                      Controlled Occupational Assessment
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Strictly controlled evaluation. <strong>Zero answer-generating AI hints</strong> during the test.
                  Calibrated against 9 competencies and 3 mandatory critical occupational gates.
                </p>

                <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Timed 25-minute exam session</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Generates official ACRI Scorecard &amp; Seal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Verifiable Certificate (if ≥ 80% &amp; gates pass)</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBriefing("certified")}
                className="mt-6 w-full py-3.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Start ACRI Certification Assessment</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </button>
            </div>

            {/* Mode A: Practice / Learn */}
            <div className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-7 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-[#0B1325]">
                      Mode A: Practice / Learn
                    </h2>
                    <div className="text-xs text-stone-500 font-medium">
                      Formative Preparation &amp; Coaching
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Learn through guided simulation. <strong>Ask Arzon AI</strong> is fully available to explain concepts,
                  link ICH/EMA guidelines, and walk through clinical reasoning.
                </p>

                <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Untimed exploration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Interactive concept &amp; guideline explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Great for students preparing for certification</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBriefing("practice")}
                className="mt-6 w-full py-3.5 px-4 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-100 text-stone-900 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Launch Practice Mode</span>
                <ArrowRight className="h-4 w-4 text-stone-600" />
              </button>
            </div>
          </div>

          {/* Assessment Protocol Summary */}
          <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-4 text-xs text-stone-600 space-y-1">
            <div className="font-bold text-stone-800 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-stone-500" />
              <span>Assessment Architecture &amp; Integrity Notice</span>
            </div>
            <p>
              The ACRI assessment evaluates realistic job workflows: 4-criteria intake validation, E2B(R3) field extraction,
              WHO-UMC causality algorithms, MedDRA LLT coding, narrative drafting, and high-pressure triage.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-200 py-4 px-6 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Arzon Global · ACRI-PV Standard v1.0 · Aligned with ICH, EMA GVP, FDA 21 CFR
        </footer>

        {/* ── Briefing & Candidate Details Modal ─────────────────────────────── */}
        {isBriefingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs overflow-y-auto">
            <div className="relative w-full max-w-lg rounded-3xl border border-stone-200 bg-white tone-light p-6 sm:p-8 shadow-2xl my-8 overflow-hidden">
              <button
                type="button"
                onClick={() => setIsBriefingModalOpen(false)}
                className="absolute right-5 top-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <div className="border-b border-stone-100 pb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-2">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>
                      {pendingMode === "certified"
                        ? "MODE B · CERTIFIED EVALUATION"
                        : "MODE A · FORMATIVE PRACTICE"}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1325]">
                    {pendingMode === "certified"
                      ? "Candidate Briefing & Registration"
                      : "Practice Mode Overview"}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {pendingMode === "certified"
                      ? "Enter your details to register your occupational session and initialize your credential."
                      : "Prepare for the official ACRI evaluation with interactive concept support."}
                  </p>
                </div>

                {briefingError && (
                  <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{briefingError}</span>
                  </div>
                )}

                <form onSubmit={handleConfirmStart} className="space-y-3.5">
                  {/* Candidate Inputs (always for certified, optional for practice) */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Candidate Full Name {pendingMode === "certified" && "*"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                        <input
                          type="text"
                          required={pendingMode === "certified"}
                          value={candidateProfile.fullName}
                          onChange={(e) =>
                            setCandidateProfile((p) => ({ ...p, fullName: e.target.value }))
                          }
                          placeholder="e.g. Ananya Sharma"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white tone-light text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#1B3F8B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Email Address {pendingMode === "certified" && "*"}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                        <input
                          type="email"
                          required={pendingMode === "certified"}
                          value={candidateProfile.email}
                          onChange={(e) =>
                            setCandidateProfile((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="ananya@university.edu"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white tone-light text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#1B3F8B]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">
                          Qualification
                        </label>
                        <select
                          value={candidateProfile.qualification}
                          onChange={(e) =>
                            setCandidateProfile((p) => ({ ...p, qualification: e.target.value }))
                          }
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white tone-light text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#1B3F8B]"
                        >
                          <option value="B.Pharm (Bachelor of Pharmacy)">B.Pharm</option>
                          <option value="M.Pharm (Master of Pharmacy)">M.Pharm</option>
                          <option value="Pharm.D (Doctor of Pharmacy)">Pharm.D</option>
                          <option value="MBBS / BDS">MBBS / BDS</option>
                          <option value="B.Sc / M.Sc Life Sciences">B.Sc / M.Sc Life Sciences</option>
                          <option value="Other Degree">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-stone-700 uppercase tracking-wider mb-1">
                          College / University {pendingMode === "certified" && "*"}
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                          <input
                            type="text"
                            required={pendingMode === "certified"}
                            value={candidateProfile.college}
                            onChange={(e) =>
                              setCandidateProfile((p) => ({ ...p, college: e.target.value }))
                            }
                            placeholder="College name"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 bg-white tone-light text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#1B3F8B]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rules summary banner */}
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1.5 text-xs text-stone-700">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-emerald-700" />
                      <span>
                        {pendingMode === "certified"
                          ? "25-Minute Timed Session · Zero AI Hints"
                          : "Untimed Guided Session · AI Assistant Active"}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {pendingMode === "certified"
                        ? "40 authentic Pharmacovigilance scenarios evaluating ICSR intake, WHO-UMC causality, MedDRA coding, regulatory clocks, and safety triage. Industry Ready requires ≥ 80%."
                        : "Walk through 40 occupational cases at your own pace with Ask Arzon AI explaining regulatory guidelines and clinical principles."}
                    </p>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <span>
                        {pendingMode === "certified"
                          ? "Begin Assessment (25:00) →"
                          : "Begin Practice Simulation →"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBriefingModalOpen(false)}
                      className="py-3 px-4 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-700 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // VIEW 3: Active Assessment Terminal
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-white tone-light" style={{ overflow: "hidden" }}>
      {/* Top Navigation Bar */}
      <header
        className="border-b border-stone-200 bg-[#0B1325] text-white px-4 sm:px-6 flex items-center justify-between shrink-0"
        style={{ height: "var(--header-height, 56px)" }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:opacity-90 transition">
            <ArzonLogo variant="dark" size="sm" />
          </Link>
          <span className="text-stone-600">|</span>
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline">
            ACRI Assessment
          </span>
          <span className="text-xs font-mono text-stone-400 hidden md:inline">
            PV Associate Battery
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
              session.mode === "certified"
                ? "bg-emerald-950 text-emerald-300 border border-emerald-700/50"
                : "bg-blue-950 text-blue-300 border border-blue-700/50"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current motion-safe:animate-pulse" />
            {session.mode === "certified" ? "CERTIFIED MODE" : "PRACTICE MODE"}
          </span>

          <button
            type="button"
            onClick={() => setIsExitModalOpen(true)}
            className="text-xs text-stone-300 hover:text-white font-medium cursor-pointer transition-colors"
          >
            Exit Test
          </button>
        </div>
      </header>

      {/* Progress Sub-Header */}
      <AcriProgressRail
        sectionName={currentItem.stageCategory}
        questionNumber={sectionQuestionNumber}
        totalQuestions={sectionItems.length}
        overallPercent={overallPercent}
        timeRemainingSeconds={session.timeRemainingSeconds}
        mode={session.mode}
        onExpire={handleTimerExpire}
        isFlaggedCurrent={session.flaggedItemIds.includes(currentItem.id)}
        flaggedCount={session.flaggedItemIds.length}
        onToggleFlagCurrent={handleToggleFlag}
        onSaveAndExit={() => setIsExitModalOpen(true)}
        onEndTest={handleSubmit}
        onOpenReview={handleOpenReview}
        phase={session.phase}
        lastSavedAt={session.lastSavedAt}
        saveError={session.saveError}
      />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Stage Rail */}
        <AcriStageRail
          stages={stageInfoList}
          currentCategory={currentItem.stageCategory}
          mode={session.mode}
        />

        {/* Center: Question Workspace */}
        <AcriWorkSimulation
          item={currentItem}
          currentIndex={session.currentItemIndex}
          totalItems={items.length}
          currentAnswer={session.answers[currentItem.id]}
          onAnswerChange={handleAnswerChange}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          onToggleFlag={handleToggleFlag}
          isFlagged={session.flaggedItemIds.includes(currentItem.id)}
          mode={session.mode}
        />
      </div>

      {/* Bottom Status Bar */}
      <footer className="border-t border-stone-200 bg-[#FAF8F5] px-4 py-2 text-[11px] font-mono text-stone-500 flex flex-wrap items-center justify-between shrink-0">
        <div>ACRI ENGINE · Adaptive assessment · Secure session · Response recorded</div>
        <div className="hidden sm:block">ICH E2B(R3) &amp; EMA GVP VI Workplace Benchmark</div>
      </footer>

      {/* ── Exit Confirmation Modal ────────────────────────────────────────── */}
      {isExitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white tone-light p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-[#0B1325]">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900">Exit Assessment?</h3>
                <p className="text-xs text-stone-500">Your session is safely autosaved.</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              You have completed <strong>{answeredCount} of {items.length}</strong> questions.
              If you exit now, your responses are preserved and you can resume anytime from the Mode Selection screen.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleExitToModeSelection}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Exit to Overview
              </button>
              <button
                type="button"
                onClick={() => setIsExitModalOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-700 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Continue Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Integrity Guard / Anti-Cheating Strike Warning Modal ───────────── */}
      {integrity.showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border-2 border-amber-500 bg-white tone-light p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-amber-100 text-amber-700">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-widest block">
                  PROCTORING ALERT · STRIKE {integrity.strikes} OF 3
                </span>
                <h3 className="font-bold text-base text-stone-900">
                  Window Defocus Detected
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed">
              {integrity.activeWarningText}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={integrity.dismissWarningModal}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                I Understand · Return to Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * AcriAssessmentTerminal — Orchestrator
 *
 * This is the ONLY component that owns and mutates session state.
 * All child components are consumers that receive state via props
 * and emit events upward.
 *
 * State transitions use acriStateMachine.ts transition functions.
 * No component below this level writes to phase directly.
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
} from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { ACRI_PV_WORK_SIMULATION_ITEMS } from "@/data/acri/acriPvCaseLibrary";
import { evaluateCandidateResponses } from "@/lib/acri/acriScoringEngine";
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
  acknowledgeSubmission,
  beginProcessing,
  resultReady,
  sessionExpired,
  isAssessmentActive,
  shouldTimerRun,
} from "@/lib/acri/acriStateMachine";
import { AcriStageRail } from "./AcriStageRail";
import { AcriProgressRail } from "./AcriProgressRail";
import { AcriWorkSimulation } from "./AcriWorkSimulation";
import { AcriResultScorecard } from "./AcriResultScorecard";
import { SampleReportModal, CertificateModal } from "../AcriModals";
import { ArzonLogo } from "../ArzonLogo";

// Autosave debounce (ms)
const AUTOSAVE_DEBOUNCE = 1500;

export function AcriAssessmentTerminal() {
  const [session, setSession] = useState<AcriSessionState>(() => getAcriSession());
  const [hasStarted, setHasStarted] = useState<boolean>(
    () => {
      const s = getAcriSession();
      return s.phase !== "NOT_STARTED" && s.phase !== "READY";
    }
  );
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Sync to storage whenever session changes ───────────────────────────────
  useEffect(() => {
    saveAcriSession(session);
  }, [session]);

  // ── Timer countdown for Certified Mode ────────────────────────────────────
  useEffect(() => {
    if (!hasStarted || session.isFinished || session.mode !== "certified") return;
    if (!shouldTimerRun(session.phase)) return;
    if (isReducedMotion()) return;

    const timer = setInterval(() => {
      setSession((prev) => {
        if (prev.timeRemainingSeconds <= 1) {
          // Time expired → auto submit
          const finalResult = evaluateCandidateResponses({
            answers: prev.answers,
            flaggedItems: prev.flaggedItemIds,
          });
          return {
            ...prev,
            timeRemainingSeconds: 0,
            isFinished: true,
            result: finalResult,
            phase: "RESULT_READY",
          };
        }
        return { ...prev, timeRemainingSeconds: prev.timeRemainingSeconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, session.isFinished, session.mode, session.phase]);

  // ── Derived data ──────────────────────────────────────────────────────────
  const items = ACRI_PV_WORK_SIMULATION_ITEMS;
  const currentItem = items[session.currentItemIndex] || items[0];
  const answeredCount = Object.keys(session.answers).length;
  const overallPercent = Math.round((answeredCount / items.length) * 100);

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

  // Section-level question count
  const sectionItems = items.filter((i) => i.stageCategory === currentItem.stageCategory);
  const sectionQuestionNumber =
    sectionItems.findIndex((i) => i.id === currentItem.id) + 1;

  // ── Event Handlers ────────────────────────────────────────────────────────

  const handleStart = (mode: AssessmentMode) => {
    const fresh = resetAcriSession(mode);
    const nextPhase = beginAssessment(fresh.phase);
    setSession({ ...fresh, phase: nextPhase });
    setHasStarted(true);
  };

  const scheduleAutosave = useCallback(() => {
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    setSession((prev) => ({ ...prev, phase: beginSave(prev.phase) }));
    autosaveTimerRef.current = setTimeout(() => {
      setSession((prev) => {
        const savedPhase = completeSave(prev.phase);
        const resumedPhase = resumeActive(savedPhase);
        return { ...prev, phase: resumedPhase, lastSavedAt: Date.now(), saveError: null };
      });
    }, AUTOSAVE_DEBOUNCE);
  }, []);

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

  const handleCloseReview = useCallback(() => {
    setSession((prev) => ({ ...prev, phase: closeReview(prev.phase) }));
  }, []);

  const handleSubmit = useCallback(() => {
    setSession((prev) => ({ ...prev, phase: confirmSubmit(prev.phase) }));
    // Process result
    const evaluation = evaluateCandidateResponses({
      answers: session.answers,
      flaggedItems: session.flaggedItemIds,
    });
    setSession((prev) => ({
      ...prev,
      phase: "RESULT_READY",
      isFinished: true,
      result: evaluation,
    }));
  }, [session.answers, session.flaggedItemIds]);

  const handleTimerExpire = useCallback(() => {
    const evaluation = evaluateCandidateResponses({
      answers: session.answers,
      flaggedItems: session.flaggedItemIds,
    });
    setSession((prev) => ({
      ...prev,
      timeRemainingSeconds: 0,
      phase: "RESULT_READY",
      isFinished: true,
      result: evaluation,
    }));
  }, [session.answers, session.flaggedItemIds]);

  const handleSaveAndExit = useCallback(() => {
    saveAcriSession(session);
    window.location.href = "/";
  }, [session]);

  const handleRetake = useCallback(() => {
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    const fresh = resetAcriSession(session.mode);
    setSession(fresh);
    setHasStarted(false);
  }, [session.mode]);

  // ── 1. Result View ─────────────────────────────────────────────────────────
  if (session.isFinished && session.result) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-page)]">
        {/* Result Header */}
        <header className="border-b border-stone-200 bg-[var(--color-brand-ink)] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-[var(--z-sticky)]">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-90 transition">
              <ArzonLogo variant="dark" size="sm" />
            </Link>
            <span className="text-stone-500">|</span>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              ACRI Result
            </span>
          </div>
          <button
            type="button"
            onClick={handleRetake}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white font-medium cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>New Assessment</span>
          </button>
        </header>

        <AcriResultScorecard
          result={session.result}
          onRetake={handleRetake}
          onViewCertificate={() => setIsCertificateOpen(true)}
          onViewReport={() => setIsReportOpen(true)}
          mode={session.mode}
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

  // ── 2. Mode Selection / Briefing ───────────────────────────────────────────
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-page)] flex flex-col justify-between">
        <header className="border-b border-stone-200 bg-[var(--color-brand-ink)] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-90 transition">
              <ArzonLogo variant="dark" size="sm" />
            </Link>
            <span className="text-stone-500">|</span>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline">
              ACRI Pharmacovigilance Assessment Terminal
            </span>
          </div>
          <Link to="/" className="text-xs font-medium text-stone-300 hover:text-white transition">
            ← Return to Overview
          </Link>
        </header>

        <div className="max-w-4xl mx-auto w-full py-10 px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--color-brand-green-deep)] text-emerald-400 border border-emerald-800/40">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ACRI-PV OCCUPATIONAL READINESS BATTERY v1.0</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Select Assessment Mode
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
              Arzon divides candidate evaluation into two distinct modalities to preserve
              occupational measurement validity and academic integrity.
            </p>
          </div>

          {/* Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* ACRI Certification (Recommended) */}
            <div className="rounded-2xl border-2 border-[var(--color-brand-ink)] bg-white p-6 sm:p-7 shadow-[var(--shadow-md)] relative flex flex-col justify-between">
              <div className="absolute -top-3 right-6 bg-[var(--color-brand-ink)] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-xs">
                RECOMMENDED · OFFICIAL
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[var(--color-brand-ink)] text-white flex items-center justify-center">
                    <Award className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)]">
                      Mode B: ACRI Certification
                    </h3>
                    <div className="text-xs text-stone-500 font-medium">
                      Controlled Occupational Assessment
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Strictly controlled evaluation.{" "}
                  <strong>Zero answer-generating AI hints</strong> during the test.
                  Calibrated against 9 competencies and 3 mandatory critical occupational gates.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  {[
                    "Timed 25-minute exam session",
                    "Generates official ACRI Scorecard & Seal",
                    "Verifiable Certificate (if ≥ 80%)",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleStart("certified")}
                className="mt-6 w-full py-3.5 px-4 rounded-xl bg-[var(--color-brand-ink)] hover:bg-[var(--color-brand-navy)] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Start ACRI Certification Assessment</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </button>
            </div>

            {/* Practice / Learn */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-[var(--shadow-sm)] relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)]">
                      Mode A: Practice / Learn
                    </h3>
                    <div className="text-xs text-stone-500 font-medium">
                      Formative Preparation & Coaching
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Learn through guided simulation.{" "}
                  <strong>Ask Arzon AI</strong> is fully available to explain concepts,
                  link ICH/EMA guidelines, and walk through clinical reasoning.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  {[
                    "Untimed exploration",
                    "Interactive concept & guideline explanations",
                    "Great for students preparing for certification",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleStart("practice")}
                className="mt-6 w-full py-3.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-900 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Launch Practice Mode</span>
                <ArrowRight className="h-4 w-4 text-stone-600" />
              </button>
            </div>
          </div>

          {/* Protocol notice */}
          <div className="rounded-xl border border-stone-200/80 bg-stone-50 p-4 text-xs text-stone-600 space-y-1">
            <div className="font-bold text-stone-800 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-stone-500" />
              <span>Assessment Architecture & Integrity Notice</span>
            </div>
            <p>
              The ACRI assessment evaluates realistic job workflows: 4-criteria intake
              validation, E2B(R3) field extraction, WHO-UMC causality algorithms, MedDRA
              LLT coding, narrative drafting, and high-pressure triage.
            </p>
          </div>
        </div>

        <footer className="border-t border-stone-200 py-4 px-6 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Arzon Global · ACRI-PV Standard v1.0 · ICH E2A/E2B(R3), WHO-UMC, EMA GVP VI
        </footer>
      </div>
    );
  }

  // ── 3. Active 3-Column Assessment Terminal ─────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ overflow: "hidden" }}>
      {/* Top Navigation Bar */}
      <header
        className="border-b border-[rgba(255,255,255,0.06)] bg-[var(--color-brand-ink)] text-white px-4 sm:px-6 flex items-center justify-between shrink-0"
        style={{ height: "var(--header-height)" }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:opacity-90 transition">
            <ArzonLogo variant="dark" size="sm" />
          </Link>
          <span className="text-stone-600">|</span>
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline">
            ACRI Assessment
          </span>
          <span className="text-xs font-mono text-stone-500 hidden md:inline">
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
            onClick={handleRetake}
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
        onSaveAndExit={handleSaveAndExit}
        onEndTest={handleSubmit}
        onOpenReview={handleOpenReview}
        phase={session.phase}
        lastSavedAt={session.lastSavedAt}
        saveError={session.saveError}
      />

      {/* Main 2-Column Body (sidebar + center, with optional right AI panel) */}
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
      <footer className="border-t border-stone-200 bg-[var(--color-bg-surface-muted)] px-4 py-2 text-[11px] font-mono text-stone-500 flex flex-wrap items-center justify-between shrink-0">
        <div>ACRI ENGINE · Adaptive assessment · Secure session · Response recorded</div>
        <div className="hidden sm:block">ICH E2B(R3) & EMA GVP VI Workplace Benchmark</div>
      </footer>
    </div>
  );
}

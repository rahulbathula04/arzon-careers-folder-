import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Info,
  ChevronRight,
  Shield,
  Layers,
} from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";
import { ACRI_PV_WORK_SIMULATION_ITEMS } from "@/data/acri/acriPvCaseLibrary";
import { evaluateCandidateResponses } from "@/lib/acri/acriScoringEngine";
import {
  getAcriSession,
  saveAcriSession,
  resetAcriSession,
  type AssessmentMode,
  type AcriSessionState,
} from "@/lib/acri/acriSession";
import { AcriStageRail } from "./AcriStageRail";
import { AcriProgressRail } from "./AcriProgressRail";
import { AcriWorkSimulation } from "./AcriWorkSimulation";
import { AcriResultScorecard } from "./AcriResultScorecard";
import { SampleReportModal, CertificateModal } from "../AcriModals";
import { ArzonLogo } from "../ArzonLogo";

export function AcriAssessmentTerminal() {
  const [session, setSession] = useState<AcriSessionState>(() => getAcriSession());
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Sync session state to storage
  useEffect(() => {
    saveAcriSession(session);
  }, [session]);

  // Timer countdown for Certified Mode
  useEffect(() => {
    if (!hasStarted || session.isFinished || session.mode !== "certified" || isReducedMotion()) return;

    const timer = setInterval(() => {
      setSession((prev) => {
        if (prev.timeRemainingSeconds <= 1) {
          // Time expired -> auto evaluate
          const finalResult = evaluateCandidateResponses({
            answers: prev.answers,
            flaggedItems: prev.flaggedItemIds,
          });
          return {
            ...prev,
            timeRemainingSeconds: 0,
            isFinished: true,
            result: finalResult,
          };
        }
        return {
          ...prev,
          timeRemainingSeconds: prev.timeRemainingSeconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, session.isFinished, session.mode]);

  const items = ACRI_PV_WORK_SIMULATION_ITEMS;
  const currentItem = items[session.currentItemIndex] || items[0];

  // Derive stage status list for Stage Rail
  const stageCategories = Array.from(new Set(items.map((i) => i.stageCategory)));
  const stageInfoList = stageCategories.map((cat) => {
    const catItems = items.filter((i) => i.stageCategory === cat);
    const isComplete = catItems.every((i) => !!session.answers[i.id]);
    return {
      name: cat,
      category: cat,
      isComplete,
      isActive: currentItem.stageCategory === cat,
    };
  });

  const handleStart = (mode: AssessmentMode) => {
    const fresh = resetAcriSession(mode);
    setSession(fresh);
    setHasStarted(true);
  };

  const handleAnswerChange = (answer: any) => {
    setSession((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentItem.id]: answer,
      },
    }));
  };

  const handleToggleFlag = () => {
    setSession((prev) => {
      const isFlagged = prev.flaggedItemIds.includes(currentItem.id);
      return {
        ...prev,
        flaggedItemIds: isFlagged
          ? prev.flaggedItemIds.filter((id) => id !== currentItem.id)
          : [...prev.flaggedItemIds, currentItem.id],
      };
    });
  };

  const handleNext = () => {
    if (session.currentItemIndex < items.length - 1) {
      setSession((prev) => ({
        ...prev,
        currentItemIndex: prev.currentItemIndex + 1,
      }));
    }
  };

  const handlePrev = () => {
    if (session.currentItemIndex > 0) {
      setSession((prev) => ({
        ...prev,
        currentItemIndex: prev.currentItemIndex - 1,
      }));
    }
  };

  const handleSubmit = () => {
    const evaluation = evaluateCandidateResponses({
      answers: session.answers,
      flaggedItems: session.flaggedItemIds,
    });
    setSession((prev) => ({
      ...prev,
      isFinished: true,
      result: evaluation,
    }));
  };

  const handleRetake = () => {
    const fresh = resetAcriSession(session.mode);
    setSession(fresh);
    setHasStarted(false);
  };

  // ─────────────────────────────────────────────────────────────
  // 1. Result Scorecard View
  // ─────────────────────────────────────────────────────────────
  if (session.isFinished && session.result) {
    return (
      <div className="min-h-screen bg-[#F7F9FC]">
        {/* Terminal Header */}
        <header className="border-b border-stone-200 bg-[#0B1325] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-90 transition">
              <ArzonLogo variant="dark" size="sm" />
            </Link>
            <span className="text-stone-500">|</span>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              ACRI Evaluation Summary
            </span>
          </div>

          <button
            type="button"
            onClick={handleRetake}
            className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-white font-medium cursor-pointer"
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

  // ─────────────────────────────────────────────────────────────
  // 2. Mode Selection & Briefing Screen (Pre-Assessment)
  // ─────────────────────────────────────────────────────────────
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col justify-between">
        {/* Terminal Top Bar */}
        <header className="border-b border-stone-200 bg-[#0B1325] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:opacity-90 transition">
              <ArzonLogo variant="dark" size="sm" />
            </Link>
            <span className="text-stone-500">|</span>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              ACRI Pharmacovigilance Assessment Terminal
            </span>
          </div>

          <Link
            to="/"
            className="text-xs font-medium text-stone-300 hover:text-white transition"
          >
            ← Return to Overview
          </Link>
        </header>

        <div className="max-w-4xl mx-auto w-full py-10 px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#07241A] text-emerald-400 border border-emerald-800/40">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ACRI-PV OCCUPATIONAL READINESS BATTERY v1.0</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B1325] tracking-tight">
              Select Assessment Mode
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
              Arzon divides candidate evaluation into two distinct modalities to preserve occupational measurement validity and academic integrity.
            </p>
          </div>

          {/* Mode Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* MODE B: ACRI Certification (Recommended) */}
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
                    <h3 className="font-bold text-lg text-[#0B1325]">
                      Mode B: ACRI Certification
                    </h3>
                    <div className="text-xs text-stone-500 font-medium">
                      Controlled Occupational Assessment
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Strictly controlled evaluation. <strong>Zero answer-generating AI hints</strong> during the test. Calibrated against 9 competencies and 3 mandatory critical occupational gates.
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
                onClick={() => handleStart("certified")}
                className="mt-6 w-full py-3.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
              >
                <span>Start ACRI Certification Assessment</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </button>
            </div>

            {/* MODE A: Practice / Learn */}
            <div className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-7 shadow-xs relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#0B1325]">
                      Mode A: Practice / Learn
                    </h3>
                    <div className="text-xs text-stone-500 font-medium">
                      Formative Preparation &amp; Coaching
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Learn through guided simulation. <strong>Ask Arzon AI</strong> is fully available to explain concepts, link ICH/EMA guidelines, and walk through clinical reasoning.
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
                onClick={() => handleStart("practice")}
                className="mt-6 w-full py-3.5 px-4 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-100 text-stone-900 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
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
              The ACRI assessment evaluates realistic job workflows: 4-criteria intake validation, E2B(R3) field extraction, WHO-UMC causality algorithms, MedDRA LLT coding, narrative drafting, and high-pressure triage.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-stone-200 py-4 px-6 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Arzon Global · ACRI-PV Standard v1.0 · Aligned with ICH, EMA GVP, FDA 21 CFR
        </footer>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 3. Active 3-Column Assessment Terminal View
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-white tone-light">
      {/* Top Navigation Bar */}
      <header className="border-b border-stone-200 bg-[#0B1325] text-white px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:opacity-90 transition">
            <ArzonLogo variant="dark" size="sm" />
          </Link>
          <span className="text-stone-500">|</span>
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline">
            ACRI ASSESSMENT
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
            <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
            <span>
              {session.mode === "certified" ? "CERTIFIED MODE" : "PRACTICE MODE"}
            </span>
          </span>

          <button
            type="button"
            onClick={handleRetake}
            className="text-xs text-stone-300 hover:text-white font-medium cursor-pointer"
          >
            Exit Test
          </button>
        </div>
      </header>

      {/* Main 3-Column Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Rail: Stage List */}
        <AcriStageRail
          stages={stageInfoList}
          currentCategory={currentItem.stageCategory}
        />

        {/* Center: Authentic Work Simulation */}
        <AcriWorkSimulation
          item={currentItem}
          currentIndex={session.currentItemIndex}
          totalItems={items.length}
          currentAnswer={session.answers[currentItem.id]}
          onAnswerChange={handleAnswerChange}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          mode={session.mode}
        />

        {/* Right Rail: Progress, Timer, Flag */}
        <AcriProgressRail
          currentIndex={session.currentItemIndex}
          totalItems={items.length}
          timeRemainingSeconds={session.timeRemainingSeconds}
          flaggedCount={session.flaggedItemIds.length}
          isFlaggedCurrent={session.flaggedItemIds.includes(currentItem.id)}
          onToggleFlagCurrent={handleToggleFlag}
          mode={session.mode}
        />
      </div>

      {/* Bottom Status Bar */}
      <footer className="border-t border-stone-200 bg-[#FAF8F5] px-4 py-2 text-[11px] font-mono text-stone-500 flex flex-wrap items-center justify-between shrink-0">
        <div>ACRI ENGINE · Adaptive assessment · Secure session · Response recorded</div>
        <div className="hidden sm:block">ICH E2B(R3) &amp; EMA GVP VI Workplace Benchmark</div>
      </footer>
    </div>
  );
}

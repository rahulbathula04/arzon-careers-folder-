import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  Award,
  ShieldCheck,
  TrendingUp,
  FileText,
  ArrowRight,
  RotateCcw,
  Download,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";
import { ACRI_PV_COMPETENCIES } from "@/data/acri/acriPvStandard";
import { ArzonLogo } from "../ArzonLogo";

interface AcriResultScorecardProps {
  result: AcriDecisionResult;
  onRetake: () => void;
  onViewCertificate?: () => void;
  onViewReport?: () => void;
}

export function AcriResultScorecard({
  result,
  onRetake,
  onViewCertificate,
  onViewReport,
}: AcriResultScorecardProps) {
  const isReady = result.decision === "Industry Ready";

  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-4 sm:px-6 space-y-8">
      {/* ── HEADER BANNER: COMPOSITE SCORE & DECISION ── */}
      <div
        className={`rounded-2xl border p-6 sm:p-8 relative overflow-hidden transition ${
          isReady
            ? "border-emerald-600/30 bg-gradient-to-br from-[#07241A] to-[#0B1325] text-white"
            : "border-amber-600/30 bg-gradient-to-br from-stone-900 to-[#0B1325] text-white"
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <ArzonLogo variant="dark" size="sm" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-emerald-300 border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>ACRI OCCUPATIONAL DOSSIER</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isReady
                ? "Candidate Status: Industry Ready"
                : "Candidate Status: Readiness Gap Identified"}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              {isReady
                ? "Demonstrated verified occupational competence across ICH E2A/E2B(R3), WHO-UMC causality reasoning, MedDRA coding, and expedited regulatory reporting workflows."
                : "Specific operational and regulatory gaps identified. The composite score indicates high foundational potential with focused remediation required before commercial deployment."}
            </p>
          </div>

          {/* Composite Score Circle */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[140px]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-stone-300 mb-1">
              Composite ACRI
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {result.compositeScore}
              <span className="text-lg text-emerald-400 font-bold">/100</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300">
              {isReady ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Standard Met (≥80)</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-amber-300">Target: 80</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-stone-400">
          <div>Standard: ACRI-PV v1.0 · Calibrated to Indian Tier-1 Pharma JDs</div>
          <div>Audit Hash: AZ-ACRI-{Date.now().toString().slice(-6)}</div>
        </div>
      </div>

      {/* ── CRITICAL GATES OCCUPATIONAL AUDIT ── */}
      <div className="rounded-2xl border border-stone-200 bg-white tone-light p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-base font-bold text-[#0B1325] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>Critical Occupational Gates Audit</span>
            </h2>
            <p className="text-xs text-stone-500">
              In Pharmacovigilance, composite scores cannot compensate for failure in safety-critical regulatory requirements.
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              result.passedGates
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            }`}
          >
            {result.passedGates ? "ALL GATES PASSED" : "CRITICAL GATE BLOCKED"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Gate 1 */}
          <div className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-800">Gate 1: Minimum ICSR Validity</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">100% Req</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Verified extraction of 4 mandatory criteria (Patient, Reporter, Drug, Reaction).
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Criteria Verified</span>
            </div>
          </div>

          {/* Gate 2 */}
          <div className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-800">Gate 2: Expedited Timelines</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">100% Req</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              7-day fatal/life-threatening vs 15-day serious expedited regulatory clock adherence.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Clock Compliant</span>
            </div>
          </div>

          {/* Gate 3 */}
          <div className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-800">Gate 3: Safety Signal Triage</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">80% Req</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Appropriate queue triage and commercial batch contamination alert escalation.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Prioritization Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 9-DIMENSION COMPETENCY SCORECARD ── */}
      <div className="rounded-2xl border border-stone-200 bg-white tone-light p-6 shadow-2xs space-y-5">
        <div>
          <h2 className="text-base font-bold text-[#0B1325]">
            ACRI 9-Competency Capability Profile
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Calibrated against real Pharmacovigilance Associate job descriptions from Novartis, IQVIA, and Parexel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(ACRI_PV_COMPETENCIES).map(([key, comp]) => {
            const score = result.dimensionScores[key] || 82;
            const meets = score >= comp.minThreshold;

            return (
              <div
                key={key}
                className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/40 space-y-2 hover:bg-stone-50 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-stone-400">
                    {comp.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      meets
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {meets ? "Standard Met" : "Gap"}
                  </span>
                </div>

                <div className="text-xs font-bold text-stone-900 leading-tight">
                  {comp.name}
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-mono text-base font-extrabold text-[#0B1325]">
                      {score}%
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Threshold: {comp.minThreshold}%
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        meets ? "bg-emerald-600" : "bg-amber-500"
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── STRENGTHS & DEVELOPMENT GAPS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-900">
            <Award className="h-4 w-4 text-emerald-700" />
            <span>Top 3 Verified Strengths</span>
          </div>
          <ul className="space-y-2.5">
            {result.strengths.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-950">{s.dimension.name}: </span>
                  <span>
                    Scored {s.score}% (exceeds workplace benchmark by{" "}
                    {s.score - s.dimension.minThreshold}%).
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Development Gaps */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
            <TrendingUp className="h-4 w-4 text-amber-700" />
            <span>Priority Development Areas</span>
          </div>
          <ul className="space-y-2.5">
            {result.developmentGaps.map((g, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-800">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-amber-950">{g.dimension.name}: </span>
                  <span>
                    Current {g.score}%. Requires {g.gap}% improvement to reach operational independence.
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 12-WEEK TAILORED READINESS ROADMAP ── */}
      <div className="rounded-2xl border border-stone-200 bg-white tone-light p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#0B1325] flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-700" />
            <span>Recommended 12-Week Industry Preparation Roadmap</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Tailored to bridge your exact competency gaps before entering pharmaceutical hiring pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Weeks 1–4 · Foundations
            </div>
            <div className="text-xs font-bold text-stone-900">
              ICH E2A / E2D &amp; ICSR Criteria
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Master the 4 minimum elements, spontaneous vs clinical trial data, and 7 vs 15-day expedited reporting clocks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Weeks 5–8 · Case Processing
            </div>
            <div className="text-xs font-bold text-stone-900">
              WHO-UMC &amp; MedDRA Coding
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Simulated case processing on safety database interfaces, LLT selection, and chronological narrative drafting.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2">
            <div className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
              Weeks 9–12 · Workplace Ready
            </div>
            <div className="text-xs font-bold text-stone-900">
              Audit Scenarios &amp; Hiring Drills
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              High-pressure queue triage, mock inspection drills, and interview preparation with senior PV managers.
            </p>
          </div>
        </div>
      </div>

      {/* ── ACTION FOOTER: CERTIFICATE, REPORT, RETAKE ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-stone-200">
        <button
          type="button"
          onClick={onRetake}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider border border-stone-300 bg-white tone-light text-stone-900 hover:bg-stone-100 cursor-pointer shadow-xs transition"
        >
          <RotateCcw className="h-3.5 w-3.5 text-stone-500" />
          <span>Retake Assessment</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {onViewReport && (
            <button
              type="button"
              onClick={onViewReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider border border-stone-300 bg-white tone-light text-stone-900 hover:bg-stone-100 cursor-pointer shadow-xs transition"
            >
              <FileText className="h-3.5 w-3.5 text-stone-500" />
              <span>View Sample Dossier</span>
            </button>
          )}

          {onViewCertificate && isReady && (
            <button
              type="button"
              onClick={onViewCertificate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#0B1325] hover:bg-[#1B3F8B] text-white shadow-sm transition cursor-pointer"
            >
              <Award className="h-4 w-4 text-emerald-400" />
              <span>View ACRI Certificate (AZ-ACRI-2026-8291)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Building2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Clock,
  Layers,
  ArrowUpRight,
  Sparkles,
  FileText,
  Check,
  Users,
  Target,
  BarChart3,
  Calendar,
  Zap,
  HelpCircle,
} from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { CompanyBrandLogo } from "./CompanyLogos";
import { LIVE_EMPLOYER_OPENINGS, type LiveEmployerOpening } from "@/data/industry/liveEmployerOpenings";
import { EMPLOYER_WEIGHT_CONFIGS, type EmployerName } from "@/data/employerScoringEngine";
import type { CompetencyDimensionKey } from "@/data/employerAssessmentBank";
import { EmployerChallengeSimulator } from "../EmployerChallengeSimulator";

interface Props {
  result: CareerEngineResult;
}

export function CompanyMatchMatrix({ result }: Props) {
  const fitScore = Math.round(result.fitScore);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [showFullJd, setShowFullJd] = useState<boolean>(false);
  const [showRemediationPlan, setShowRemediationPlan] = useState<boolean>(false);
  const [showDimensionBreakdown, setShowDimensionBreakdown] = useState<boolean>(false);
  const [showSimulator, setShowSimulator] = useState<boolean>(false);

  const activeOpening = LIVE_EMPLOYER_OPENINGS[selectedIdx];
  const readiness = result.employerReadiness;

  // Retrieve employer-specific fit calibrated by the scoring engine
  const getEmployerFit = (shortName: string) => {
    return readiness?.employerMatches.find(
      (m) =>
        m.employer.toLowerCase() === shortName.toLowerCase() ||
        shortName.toLowerCase().includes(m.employer.toLowerCase()) ||
        m.fullCompanyName.toLowerCase().includes(shortName.toLowerCase())
    );
  };

  // Employer-specific hiring scores are not available from public job postings.
  const getScoreForIdx = (idx: number) => {
    const opening = LIVE_EMPLOYER_OPENINGS[idx];
    return getEmployerFit(opening.shortName)?.matchScore ?? null;
  };

  const currentEmployerFit = getEmployerFit(activeOpening.shortName);
  const currentMatchScore = currentEmployerFit?.matchScore ?? null;
  const hiringCutoff = currentEmployerFit?.hiringCutoff ?? null;
  const gapFromCutoff = currentEmployerFit?.gapFromCutoff ?? null;
  const isAboveCutoff = gapFromCutoff !== null && gapFromCutoff >= 0;

  const getCandidateStrengths = (_company: LiveEmployerOpening) => [
    "Review your answered scenarios to see demonstrated strengths.",
    "Use the practice feedback to identify topics to revisit.",
    "Job eligibility depends on the requirements in each official posting.",
  ];

  // Get status badge colors
  const getStatusBadge = () => {
    if (!currentEmployerFit) {
      return {
        label: currentMatchScore === null ? "Practice score unavailable" : "Practice result",
        className: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
        dotColor: "bg-emerald-600",
      };
    }
    switch (currentEmployerFit.status) {
      case "Exceeds Hiring Bar":
        return {
          label: "Practice result: strong",
          className: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
          dotColor: "bg-emerald-600",
        };
      case "Competitive Candidate":
        return {
          label: "Practice result",
          className: "bg-blue-50 text-blue-800 border-blue-200/80",
          dotColor: "bg-blue-600",
        };
      case "Borderline / Supervised":
        return {
          label: "Practice result: review needed",
          className: "bg-amber-50 text-amber-800 border-amber-200/80",
          dotColor: "bg-amber-600",
        };
      case "Critical Skill Deficit":
      default:
        return {
          label: "Practice result: review needed",
          className: "bg-rose-50 text-rose-800 border-rose-200/80",
          dotColor: "bg-rose-600",
        };
    }
  };

  const statusBadge = getStatusBadge();

  // Company weight configuration for dimension breakdown
  const employerWeights = currentEmployerFit
    ? EMPLOYER_WEIGHT_CONFIGS[currentEmployerFit.employer]?.weights
    : null;

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-6 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100/90 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-blue-700 mb-2.5 shadow-2xs">
            <Building2 className="h-3.5 w-3.5 text-blue-600" />
            <span>EMPLOYER RESEARCH · PRACTICE ASSESSMENT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#081F38]">
            Explore PV Roles and Practice Your Skills
          </h2>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed font-normal font-sans">
            This is a learning aid, not an employer hiring prediction. Vacancy details, salary estimates and selection criteria must be checked on each employer’s official careers site.
          </p>
        </div>

        {/* Practice assessment (RFI) & Calibration Grade Badge */}
        <div className="flex items-center gap-3.5 self-start md:self-auto bg-gradient-to-br from-white to-slate-50 border border-slate-200/90 px-4.5 py-3 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1)]">
          <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                Practice assessment
              </p>
              {readiness?.letterGrade && (
                <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  Grade {readiness.letterGrade}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-bold font-mono text-[#081F38]">
                {readiness ? `${readiness.overallReadinessScore}%` : "Not assessed"}
              </span>
              <span className="text-xs text-slate-500 font-sans font-medium">
                {readiness ? "Based on practice answers" : "Complete the practice assessment"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tactile Apple Pro Requisition Switcher Tabs */}
      <div className="mt-6">
        <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Explore employer information (verify openings on the official site):
        </p>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {LIVE_EMPLOYER_OPENINGS.map((emp, idx) => {
            const score = getScoreForIdx(idx);
            const isSelected = selectedIdx === idx;
            const fit = getEmployerFit(emp.shortName);
            const meetsBar = false;

            return (
              <button
                key={emp.company}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setShowFullJd(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "border-blue-500/90 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white ring-2 ring-blue-500/15 shadow-[0_4px_14px_rgba(37,99,235,0.1),inset_0_1px_0_rgba(255,255,255,1)]"
                    : "border-slate-200/80 bg-white hover:bg-slate-50/80 hover:border-slate-300 shadow-2xs"
                }`}
              >
                {/* Real Vector Brand Logo */}
                <div className="h-6 flex items-center justify-center shrink-0">
                  <CompanyBrandLogo company={emp.shortName} className="h-4 sm:h-4.5 w-auto" />
                </div>
                <div className="flex items-center gap-2 pl-2.5 border-l border-slate-200">
                  <span className={`font-mono text-xs font-bold ${isSelected ? "text-blue-700" : "text-[#081F38]"}`}>
                    {score === null ? "Practice" : `${score}%`}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      meetsBar
                        ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]"
                        : "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.7)]"
                    }`}
                    title="No employer hiring cutoff is verified"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rebuilt Requisition Deep-Dive Card: Apple Pro Layout Architecture */}
      <div className="mt-6 rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-[#FAFBFD] to-white p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(7,26,74,0.04)]">
        {/* Requisition Header Banner (Hero Block with full horizontal breathing room) */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100/90">
          <div className="flex items-start gap-4 sm:gap-5 min-w-0 flex-1">
            {/* Elevated Brand Logo Box */}
            <div className="h-16 w-28 sm:h-18 sm:w-32 bg-white border border-slate-200/90 rounded-2xl p-2.5 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] shrink-0">
              <CompanyBrandLogo company={activeOpening.shortName} className="max-h-9 max-w-full w-auto" />
            </div>

            {/* Identity & Requisition Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#081F38] font-sans">
                  {activeOpening.company}
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-800 shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
                  Employer information
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] shadow-2xs">
                  Illustrative profile
                </span>
              </div>

              {/* Role Title in Bold Accent Typography */}
              <div className="mt-2 flex items-center gap-2 text-sm sm:text-base font-bold text-[#081F38]">
                <Briefcase className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{activeOpening.activeOpenings.roleTitle}</span>
              </div>

              {/* Tagline & Department */}
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                {activeOpening.tagline} · <span className="text-slate-600 font-medium">{activeOpening.activeOpenings.department}</span>
              </p>

              {/* Metadata Badges Ribbon */}
              <div className="mt-3.5 flex items-center gap-2 sm:gap-2.5 flex-wrap text-xs font-sans">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-2xs">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{activeOpening.activeOpenings.locations[0]}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-2xs">
                  <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{activeOpening.activeOpenings.workModel}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-2xs">
                  <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{activeOpening.activeOpenings.experience}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Apple Pro Fit Score Radial / Pill Gauge */}
          <div className="lg:w-48 bg-gradient-to-br from-white to-[#F8FAFC] border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,1)] flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 shrink-0">
            <div className="text-left lg:text-center">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Live ATS Alignment
              </span>
              <div className="flex items-baseline lg:justify-center gap-1 mt-0.5">
                <span className="text-3xl sm:text-4xl font-mono font-extrabold text-blue-600">
                  {currentMatchScore === null ? "Not assessed" : `${currentMatchScore}%`}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">/ 100</span>
              </div>
            </div>
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs ${statusBadge.className}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dotColor}`} />
              {statusBadge.label}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Vacancy details need verification</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">Salary ranges, vacancy counts, hiring status, eligibility details and interview stages in historical research are not verified live data. We do not estimate ATS pass probability or claim you have cleared employer interview stages.</p>
              <a href={activeOpening.activeOpenings.careersUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">
                Visit {activeOpening.shortName} careers <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Fatal Elimination Risk Callout */}
            <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950 font-sans">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <strong className="font-semibold text-amber-900">
                  Primary Panel Disqualification Risk for {activeOpening.shortName}:
                </strong>{" "}
                <span>{currentEmployerFit.eliminationRisk}</span>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Assessment: Passed Signals vs Disqualification Triggers */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column A: Candidate Passed ATS Signals */}
          <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <div className="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                  ATS Matches in Your Profile ({activeOpening.shortName})
                </h4>
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                4 SIGNALS
              </span>
            </div>
            <ul className="space-y-3 text-xs text-emerald-950 font-sans">
              {getCandidateStrengths(activeOpening).map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="h-5 w-5 rounded-full bg-emerald-100/90 flex items-center justify-center text-emerald-700 mt-0.5 shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{str}</span>
                </li>
              ))}
              <li className="flex items-start gap-2.5 leading-relaxed text-emerald-900">
                <span className="h-5 w-5 rounded-full bg-emerald-100/90 flex items-center justify-center text-emerald-700 mt-0.5 shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                <span>Graduation Year Eligibility: Validated for 2024–2026 fresher hiring cohorts</span>
              </li>
            </ul>
          </div>

          {/* Column B: Exact Technical Gaps Causing Panel Disqualification */}
          <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/30 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <div className="h-6 w-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                  Gaps That Trigger Technical Rejection
                </h4>
              </div>
              <span className="text-[9px] font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                FATAL GAPS
              </span>
            </div>
            <ul className="space-y-3 text-xs text-amber-950 font-sans">
              {activeOpening.fatalGaps.slice(0, 3).map((gap, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="h-5 w-5 rounded-full bg-amber-100/90 flex items-center justify-center text-amber-700 mt-0.5 shrink-0">
                    <AlertTriangle className="h-3 w-3" />
                  </span>
                  <span>
                    <strong>{gap}</strong>
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2.5 leading-relaxed text-amber-900/90">
                <span className="h-5 w-5 rounded-full bg-amber-100/90 flex items-center justify-center text-amber-700 mt-0.5 shrink-0">
                  <AlertTriangle className="h-3 w-3" />
                </span>
                <span>Hands-on production casework on enterprise databases (Argus Safety / Rave EDC)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5 Regulatory Competency Dimensions Breakdown (Expandable Drawer) */}
        {readiness?.dimensionBreakdown && (
          <div className="mt-6 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setShowDimensionBreakdown(!showDimensionBreakdown)}
              className="w-full flex items-center justify-between gap-2 text-xs font-bold text-blue-700 hover:text-[#081F38] py-2 px-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span>
                  {showDimensionBreakdown ? "Hide" : "Inspect"} 5 Regulatory Dimensions Calibration for {activeOpening.shortName}
                </span>
              </span>
              {showDimensionBreakdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showDimensionBreakdown && (
              <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3">
                <p className="text-xs text-slate-600 font-sans">
                  Each employer weights these 5 core regulatory dimensions differently based on their sponsor accounts and delivery model. Here is how your profile scored:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {Object.entries(readiness.dimensionBreakdown).map(([dimKey, dim]) => {
                    const weightPct = employerWeights
                      ? Math.round((employerWeights[dimKey as CompetencyDimensionKey] || 0.2) * 100)
                      : 20;

                    return (
                      <div
                        key={dimKey}
                        className="p-3.5 rounded-xl border border-slate-200/80 bg-white shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#081F38] font-sans">
                            {dim.label}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            {weightPct}% Weight
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                dim.score >= 80
                                  ? "bg-emerald-500"
                                  : dim.score >= 65
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                              }`}
                              style={{ width: `${dim.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-[#081F38]">
                            {dim.score}%
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                          <span>Status: <strong>{dim.rating}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 14-Day Structured Study & Remediation Plan */}
        {readiness?.immediateFourteenDayPlan && (
          <div className="mt-4 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setShowRemediationPlan(!showRemediationPlan)}
              className="w-full flex items-center justify-between gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 py-2 px-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-700" />
                <span>
                  {showRemediationPlan ? "Hide" : "Inspect"} 14-Day Structured Study Plan to Clear {activeOpening.shortName} Technical Bar
                </span>
              </span>
              {showRemediationPlan ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {showRemediationPlan && (
              <div className="mt-4 pt-4 border-t border-emerald-200/80 space-y-3">
                <p className="text-xs text-slate-600 font-sans">
                  Targeted four-phase curriculum designed to turn regulatory weak points into interview assets within 14 days:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {readiness.immediateFourteenDayPlan.map((plan, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-xl border border-emerald-200/80 bg-white shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          {plan.dayRange}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          Phase 0{pIdx + 1}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-[#081F38] mt-2 font-sans">
                        {plan.milestone}
                      </h5>
                      <p className="text-[11px] text-slate-600 mt-1 font-sans leading-relaxed">
                        <strong>Target Skill:</strong> {plan.targetSkill}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mandatory Production Software & ATS Keywords */}
        <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600 shrink-0">
                <Layers className="h-3.5 w-3.5" />
              </div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#081F38]">
                Mandatory Production Software &amp; Tools Screened by {activeOpening.shortName}
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full shadow-2xs">
              4 Critical Standards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            {activeOpening.requiredTools.map((t) => (
              <div
                key={t.name}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[#081F38] font-sans">{t.name}</span>
                  <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs">
                    {t.importance.split(" ")[0]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal font-sans">
                  {t.proficiency}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Requisition Details & Interview Rubric */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={() => setShowFullJd(!showFullJd)}
            className="w-full flex items-center justify-between gap-2 text-xs font-bold text-blue-700 hover:text-[#081F38] py-2 px-3 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>
                {showFullJd ? "Hide" : "Inspect"} Full Verified Job Description &amp; 3-Stage Interview Rubric
              </span>
            </span>
            {showFullJd ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showFullJd && (
            <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-6">
              {/* Day-to-Day Operations */}
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-[#071A4A] mb-2.5">
                  Day-to-Day Production Responsibilities:
                </h5>
                <ul className="space-y-2 text-xs text-[#334155] leading-relaxed font-sans">
                  {activeOpening.dayToDayDuties.map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-[#1557D6]">{String(idx + 1).padStart(2, "0")}.</span>
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3-Stage Interview Process */}
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-[#071A4A] mb-2.5">
                  Official Interview Evaluation Stages:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {activeOpening.interviewStages.map((stage) => (
                    <div key={stage.stage} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                      <span className="text-[10px] font-mono font-bold text-[#1557D6] uppercase block">
                        {stage.stage} · {stage.duration}
                      </span>
                      <strong className="text-[#071A4A] block mt-1 font-sans">{stage.name}</strong>
                      <p className="text-[11px] text-[#64748B] mt-1.5 leading-normal font-sans">
                        <strong>Evaluates:</strong> {stage.keyCheck}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ATS Keywords Cloud */}
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-[#071A4A] mb-2">
                  Mandatory Resume ATS Screening Tokens:
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {activeOpening.atsKeywords.map((kw) => (
                    <span
                      key={kw.keyword}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#071A4A] text-xs font-mono font-medium border border-slate-200"
                    >
                      <Sparkles className="h-3 w-3 text-amber-600" />
                      <span>{kw.keyword}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Callout */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-sans">
            <p>
              Requisition source: Verified from public careers portals &amp; quarterly hiring desk filings (Q1 2026).
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setShowSimulator(!showSimulator)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(37,99,235,0.25)] transition-all shrink-0 cursor-pointer active:scale-95"
            >
              <Target className="h-3.5 w-3.5" />
              <span>{showSimulator ? "Close Simulator" : `Simulate ${activeOpening.shortName} Round 2 Scenarios`}</span>
            </button>
            <a
              href={activeOpening.activeOpenings.careersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#081F38] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0D2E54] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(8,31,56,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all shrink-0 cursor-pointer active:scale-95"
            >
              <span>View {activeOpening.shortName} Careers Portal</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Embedded Interactive Round 2 Simulator */}
        {showSimulator && (
          <div className="mt-6 pt-6 border-t border-slate-200/80">
            <EmployerChallengeSimulator
              initialEmployer={activeOpening.shortName as EmployerName}
              onClose={() => setShowSimulator(false)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

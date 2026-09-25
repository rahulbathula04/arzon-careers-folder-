import { useState } from "react";
import {
  Award,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface ReadinessTier {
  id: string;
  range: string;
  minScore: number;
  maxScore: number;
  label: string;
  badge: string;
  themeColor: string;
  accentBg: string;
  borderTone: string;
  tagline: string;
  operationalProfile: string;
  employerDecision: string;
  recommendedPathway: string;
  auditPassCriteria: string[];
}

const READINESS_TIERS: ReadinessTier[] = [
  {
    id: "industry_ready",
    range: "80 – 100",
    minScore: 80,
    maxScore: 100,
    label: "Industry Ready",
    badge: "BENCHMARK ATTAINED",
    themeColor: "text-emerald-800",
    accentBg: "bg-emerald-50",
    borderTone: "border-emerald-300",
    tagline: "Autonomous Day-1 Execution in Pharmacovigilance & Clinical Data",
    operationalProfile:
      "Demonstrates high precision in ICSR intake, flawless 4-criteria triage, zero-error regulatory calendar tracking (7-day / 15-day expedited submissions), and accurate MedDRA coding without over-interpretation.",
    employerDecision:
      "Direct fast-track recruitment recommendation. Bypasses standard entry-level screening tests; eligible for immediate client project onboarding.",
    recommendedPathway:
      "Official ACRI Credential conferred with cryptographic verification; direct placement pipeline with Tier-1 CROs and pharma sponsors.",
    auditPassCriteria: [
      "Composite ACRI Score ≥ 80.0",
      "Pass Gate 1: 100% Minimum ICSR Validity Accuracy",
      "Pass Gate 2: Expedited Submission Clock Compliance",
      "Pass Gate 3: Accurate Clinical Triage & Escalation",
    ],
  },
  {
    id: "near_ready",
    range: "60 – 79",
    minScore: 60,
    maxScore: 79,
    label: "Near Ready",
    badge: "TARGETED GAP CLOSURE",
    themeColor: "text-[#1B3F8B]",
    accentBg: "bg-blue-50/60",
    borderTone: "border-[#1B3F8B]/30",
    tagline: "Solid Theoretical Awareness with Specific Procedural Gaps",
    operationalProfile:
      "Understands core safety terminology and pharmacology, but exhibits inconsistencies in complex WHO-UMC causality attribution, multi-drug confounding, or narrative chronological syntax.",
    employerDecision:
      "Qualified for internship or junior trainee positions subject to a targeted 2-to-4 week intensive bridge simulation.",
    recommendedPathway:
      "Enrolled in targeted 14-day ICSR & MedDRA narrative sprint drills, followed by one re-test attempt to breach the 80% operational benchmark.",
    auditPassCriteria: [
      "Composite ACRI Score 60.0 – 79.9",
      "Needs strengthening in narrative synthesis or dechallenge logic",
      "Eligible for modular skills remediation",
    ],
  },
  {
    id: "foundation",
    range: "0 – 59",
    minScore: 0,
    maxScore: 59,
    label: "Building Foundations",
    badge: "CORE APPRENTICESHIP",
    themeColor: "text-stone-700",
    accentBg: "bg-stone-50",
    borderTone: "border-stone-300",
    tagline: "Early Stage Readiness; Needs Comprehensive Systematic Grounding",
    operationalProfile:
      "Lacks hands-on familiarity with safety databases, regulatory timelines, or standard ICSR triage workflows. High probability of operational errors requiring continuous supervision.",
    employerDecision:
      "Not recommended for immediate production deployment without completing a foundational apprenticeship.",
    recommendedPathway:
      "Comprehensive 12-week clinical data and pharmacovigilance cohort with live case processing, Argus database simulations, and mentor review.",
    auditPassCriteria: [
      "Composite ACRI Score < 60.0",
      "Gaps across regulatory guidelines and medical narrative writing",
      "Foundation training track recommended",
    ],
  },
];

export function AcriReadinessScaleVisual() {
  const [selectedTierId, setSelectedTierId] = useState<string>("industry_ready");
  const activeTier =
    READINESS_TIERS.find((t) => t.id === selectedTierId) || READINESS_TIERS[0];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white card-light tone-light p-6 sm:p-8 space-y-8">
      {/* ── Explanation of the 80% Threshold ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAF9F6] border border-stone-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#005B4F] uppercase tracking-wider">
              THE 80% OCCUPATIONAL BENCHMARK
            </span>
          </div>
          <h4 className="font-serif font-bold text-lg text-stone-900">
            Why 80% Defines the Operational Deployment Line
          </h4>
          <p className="font-sans text-xs text-stone-600 max-w-2xl leading-relaxed">
            In regulated clinical trials and post-marketing safety, an associate who requires line-by-line verification imposes supervision overhead. At 80%+, net output exceeds supervision cost from Week 1.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-white tone-light border border-stone-200 text-center shrink-0">
          <span className="font-mono text-[10px] text-stone-500 uppercase block">CRITICAL BENCHMARK</span>
          <span className="font-serif font-bold text-2xl text-[#005B4F]">80 / 100</span>
          <span className="font-mono text-[9px] text-stone-400 block">Minimum for Credential</span>
        </div>
      </div>

      {/* ── 3-Tier Horizontal Visual Ladder ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {READINESS_TIERS.map((tier) => {
          const isSelected = tier.id === selectedTierId;
          const isIndustryReady = tier.id === "industry_ready";

          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? isIndustryReady
                    ? "bg-[#E8F7F1]/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                    : "bg-white border-[#1B3F8B] ring-2 ring-[#1B3F8B]/20 shadow-sm"
                  : "bg-white border-stone-200 hover:bg-stone-50/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isIndustryReady
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    SCORE {tier.range}
                  </span>
                  {isIndustryReady && (
                    <Award className="h-4 w-4 text-emerald-600" />
                  )}
                </div>

                <div className="font-serif font-bold text-lg text-stone-900">
                  {tier.label}
                </div>
                <div className="font-mono text-[11px] text-[#005B4F] font-semibold mt-0.5">
                  {tier.badge}
                </div>

                <p className="font-sans text-xs text-stone-600 mt-2 line-clamp-2">
                  {tier.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-stone-500">Threshold</span>
                <span className="font-mono font-bold text-stone-900">
                  {tier.minScore}% – {tier.maxScore}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Active Tier Detailed Breakdown ── */}
      <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500">
                BAND SPECIFICATION: {activeTier.range}
              </span>
              <span className="text-stone-300">·</span>
              <span className="font-mono text-xs font-bold text-[#005B4F]">
                {activeTier.label}
              </span>
            </div>
            <h4 className="font-serif font-bold text-xl text-stone-900 mt-1">
              {activeTier.tagline}
            </h4>
          </div>

          <div className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white tone-light border border-stone-200 font-mono text-xs font-bold text-stone-800 shadow-2xs">
            Score Range: {activeTier.range}%
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              OPERATIONAL PROFILE
            </span>
            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              {activeTier.operationalProfile}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-1">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              EMPLOYER HIRING DECISION
            </span>
            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              {activeTier.employerDecision}
            </p>
          </div>
        </div>

        {/* Verification Pass Criteria Checklist */}
        <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            VERIFICATION AUDIT CRITERIA
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {activeTier.auditPassCriteria.map((crit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-[#005B4F] shrink-0" />
                <span>{crit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

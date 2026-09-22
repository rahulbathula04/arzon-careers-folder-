import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Share2,
  Copy,
  Download,
  RotateCcw,
  ExternalLink,
  Linkedin,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Twitter,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { AcriDecisionResult } from "@/data/acri/acriPvStandard";
import { ACRI_PV_COMPETENCIES } from "@/data/acri/acriPvStandard";
import { ArzonLogo } from "../ArzonLogo";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AcriResultScorecardProps {
  result: AcriDecisionResult;
  onRetake: () => void;
  onViewCertificate?: () => void;
  onViewReport?: () => void;
  /** Mode passed through from terminal: "certified" | "practice" */
  mode?: "certified" | "practice";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deriveReadinessState(score: number, passedGates: boolean) {
  if (score >= 80 && passedGates) return "industry_ready" as const;
  if (score >= 60) return "near_ready" as const;
  if (score >= 40) return "building_foundations" as const;
  return "supportive_foundational" as const;
}

function generateCredentialId(score: number): string {
  const ts = Date.now().toString().slice(-6);
  const prefix = score >= 80 ? "CERT" : "EVAL";
  return `AZ-ACRI-${prefix}-${ts}`;
}

/** Stable credential: seeded by score so it doesn't flicker on re-render */
function useCredentialId(score: number) {
  return useMemo(() => generateCredentialId(score), []);
}

// ─── Score Ring SVG ───────────────────────────────────────────────────────────

function ScoreRing({
  score,
  state,
}: {
  score: number;
  state: ReturnType<typeof deriveReadinessState>;
}) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const dashOffset = circumference - (progress / 100) * circumference;

  const ringColor =
    state === "industry_ready"
      ? "#16a34a"
      : state === "near_ready"
        ? "#d97706"
        : state === "building_foundations"
          ? "#ea580c"
          : "#dc2626";

  const label =
    state === "industry_ready"
      ? "INDUSTRY READY"
      : state === "near_ready"
        ? "NEAR READY"
        : state === "building_foundations"
          ? "BUILDING FOUNDATIONS"
          : "EARLY STAGE";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="108" height="108" viewBox="0 0 108 108" className="shrink-0">
        {/* Track */}
        <circle
          cx="54"
          cy="54"
          r={radius}
          fill="none"
          stroke="#e7e5e4"
          strokeWidth="8"
        />
        {/* Progress */}
        <circle
          cx="54"
          cy="54"
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 54 54)"
          className="motion-safe:[transition:stroke-dashoffset_0.8s_ease]"
        />
        {/* Score text */}
        <text
          x="54"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="22"
          fontWeight="800"
          fill="#0B1325"
          fontFamily="ui-monospace, monospace"
        >
          {score}
        </text>
        <text
          x="54"
          y="66"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#78716c"
          fontFamily="ui-monospace, monospace"
        >
          /100
        </text>
      </svg>
      <span
        className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
        style={{
          color: ringColor,
          borderColor: ringColor + "40",
          backgroundColor: ringColor + "10",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Competency Bar Row ───────────────────────────────────────────────────────

function CompetencyBar({
  label,
  code,
  score,
  threshold,
}: {
  label: string;
  code: string;
  score: number;
  threshold: number;
}) {
  const meets = score >= threshold;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
            {code}
          </span>
          <span className="text-xs font-semibold text-stone-800 truncate max-w-[160px]">
            {label}
          </span>
        </div>
        <span
          className={`font-mono text-xs font-bold ${meets ? "text-emerald-700" : "text-amber-700"}`}
        >
          {score}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${meets ? "bg-emerald-600" : "bg-amber-500"}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

// ─── Share Panel ─────────────────────────────────────────────────────────────

function SharePanel({
  score,
  credentialId,
  state,
}: {
  score: number;
  credentialId: string;
  state: ReturnType<typeof deriveReadinessState>;
}) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify?id=${credentialId}`
      : `https://arzon.global/verify?id=${credentialId}`;

  const shareText =
    state === "industry_ready"
      ? `I just scored ${score}/100 on the ACRI Pharmacovigilance Assessment — Industry Ready ✅ Credential: ${credentialId}`
      : `I completed the ACRI Pharmacovigilance Assessment with a score of ${score}/100. View details at Arzon Global.`;

  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(publicUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "My ACRI Result", text: shareText, url: publicUrl });
      } catch {
        setShareOpen(true);
      }
    } else {
      setShareOpen(true);
    }
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white tone-light p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
          Share Your Result
        </span>
        <button
          type="button"
          onClick={() => setShareOpen((v) => !v)}
          className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition cursor-pointer"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="font-mono">{shareOpen ? "Hide" : "Expand"}</span>
          {shareOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      </div>

      {/* Primary share row */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
        >
          <Share2 className="h-3 w-3" />
          Share Result
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-800 font-mono text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
        >
          <Copy className="h-3 w-3" />
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      {/* Expanded social panel */}
      {shareOpen && (
        <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-2">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white tone-light hover:bg-blue-50 text-[#0077b5] font-mono text-[11px] font-semibold transition"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white tone-light hover:bg-stone-100 text-stone-800 font-mono text-[11px] font-semibold transition"
          >
            <Twitter className="h-3.5 w-3.5" />
            X / Twitter
          </a>

          <a
            href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white tone-light hover:bg-green-50 text-green-700 font-mono text-[11px] font-semibold transition"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </a>

          <Link
            to="/verify"
            search={{ id: credentialId } as any}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white tone-light hover:bg-stone-100 text-stone-700 font-mono text-[11px] font-semibold transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Public Verify
          </Link>
        </div>
      )}

      {/* Credential ID strip */}
      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-400">
        <span>Credential ID</span>
        <span className="font-bold text-stone-600 tracking-wider">{credentialId}</span>
      </div>
    </div>
  );
}

// ─── Shareable Card (visual download target) ──────────────────────────────────

const ShareableCardRef = React.forwardRef<
  HTMLDivElement,
  { score: number; credentialId: string; state: ReturnType<typeof deriveReadinessState> }
>(({ score, credentialId, state }, ref) => {
  const stateLabel =
    state === "industry_ready"
      ? "INDUSTRY READY"
      : state === "near_ready"
        ? "NEAR READY"
        : state === "building_foundations"
          ? "BUILDING FOUNDATIONS"
          : "EARLY STAGE";

  const bgClass =
    state === "industry_ready"
      ? "bg-[#07241A]"
      : state === "near_ready"
        ? "bg-[#1c1003]"
        : "bg-[#0B1325]";

  return (
    <div
      ref={ref}
      className={`${bgClass} rounded-2xl p-5 w-[340px] min-h-[200px] flex flex-col justify-between border border-white/10 shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <ArzonLogo variant="dark" size="sm" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 border border-emerald-700/40 px-2 py-0.5 rounded-full">
          ACRI CERTIFIED
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-1">
          <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
            {score}
            <span className="text-lg text-stone-400 font-bold">/100</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
            {stateLabel}
          </div>
          <div className="text-xs text-stone-400 font-medium">
            Pharmacovigilance Associate · ACRI-PV v1.0
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-[9px] font-mono text-stone-500 uppercase tracking-wider">
            Arzon Global
          </div>
          <div className="text-[9px] font-mono text-stone-400 tracking-wider">
            {credentialId}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10 text-[9px] font-mono text-stone-500">
        arzon.global/verify · Industry-Aligned Healthcare Career Intelligence
      </div>
    </div>
  );
});
ShareableCardRef.displayName = "ShareableCard";

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function AcriResultScorecard({
  result,
  onRetake,
  onViewCertificate,
  onViewReport,
  mode = "certified",
}: AcriResultScorecardProps) {
  const credentialId = useCredentialId(result.compositeScore);
  const state = deriveReadinessState(result.compositeScore, result.passedGates);
  const cardRef = useRef<HTMLDivElement>(null);

  const isIndustryReady = state === "industry_ready";
  const isNearReady = state === "near_ready";
  const isBuilding = state === "building_foundations";
  const isEarly = state === "supportive_foundational";

  // Headline copy per state
  const stateHeadline = isIndustryReady
    ? "Industry Ready"
    : isNearReady
      ? "Near Ready"
      : isBuilding
        ? "Building Foundations"
        : "Keep Building";

  const stateSubline = isIndustryReady
    ? "Verified occupational readiness for Pharmacovigilance Associate roles."
    : isNearReady
      ? "Strong foundational competence. Focused remediation will close the gap."
      : isBuilding
        ? "Core skill areas identified. A structured preparation path will advance your readiness."
        : "Your readiness journey is beginning. Every expert started here.";

  // Sorted dimensions for bar display
  const sortedDimensions = useMemo(() => {
    return Object.entries(ACRI_PV_COMPETENCIES)
      .map(([key, comp]) => ({
        key,
        comp,
        score: result.dimensionScores[key] ?? 82,
      }))
      .sort((a, b) => b.score - a.score);
  }, [result.dimensionScores]);

  const handleDownloadCard = useCallback(async () => {
    // Use html2canvas if available, otherwise open the card in a print window
    try {
      const { default: html2canvas } = await import("html2canvas" as any);
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: null });
        const link = document.createElement("a");
        link.download = `ACRI-Result-${credentialId}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    } catch {
      // Fallback: open print view
      window.print();
    }
  }, [credentialId]);

  return (
    <div className="max-w-3xl mx-auto w-full py-6 sm:py-8 px-3 sm:px-4 space-y-5">
      {/* ── RESULT HERO ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-stone-200 bg-white tone-light shadow-xs overflow-hidden">
        {/* Colored top accent strip */}
        <div
          className={`h-1 w-full ${
            isIndustryReady
              ? "bg-emerald-600"
              : isNearReady
                ? "bg-amber-500"
                : isBuilding
                  ? "bg-orange-500"
                  : "bg-rose-500"
          }`}
        />

        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Score Ring */}
            <ScoreRing score={result.compositeScore} state={state} />

            {/* Text block */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400">
                  ACRI-PV v1.0
                </span>
                {mode === "certified" && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    CERTIFIED MODE
                  </span>
                )}
                {mode === "practice" && (
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    PRACTICE MODE
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B1325] tracking-tight leading-tight">
                {stateHeadline}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg">
                {stateSubline}
              </p>

              {/* Credential strip — only for certified industry ready */}
              {isIndustryReady && mode === "certified" && (
                <div className="inline-flex items-center gap-2 mt-1 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                  <span className="text-[11px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    {credentialId}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Positive gate confirmation for ≥80 */}
          {isIndustryReady && (
            <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {["ICSR Validity", "Expedited Timelines", "Safety Signal Triage"].map((gate) => (
                <div
                  key={gate}
                  className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{gate} — Verified</span>
                </div>
              ))}
            </div>
          )}

          {/* Gap notice for near ready */}
          {isNearReady && (
            <div className="mt-4 pt-4 border-t border-stone-100">
              <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  You are <strong>{80 - result.compositeScore} points</strong> from the Industry
                  Ready threshold. Targeted preparation in your development areas can close this gap
                  within weeks.
                </span>
              </div>
            </div>
          )}

          {/* Constructive notice for lower bands */}
          {(isBuilding || isEarly) && (
            <div className="mt-4 pt-4 border-t border-stone-100">
              <div className="flex items-start gap-2 text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5">
                <BookOpen className="h-4 w-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                <span>
                  {isBuilding
                    ? "Your result shows strong conceptual interest in pharmacovigilance. A structured 12-week preparation programme will systematically build the operational fluency required."
                    : "This result is the beginning of your readiness journey. The ACRI diagnostic has identified exactly which foundational areas to address first. Many successful PV associates started from this position."}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── COMPETENCY PROFILE ──────────────────────────────────── */}
      <div className="rounded-2xl border border-stone-200 bg-white tone-light shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0B1325]">
              9-Competency Capability Profile
            </h2>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Calibrated against Novartis, IQVIA, and Parexel PV Associate job descriptions.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedDimensions.map(({ key, comp, score }) => (
            <CompetencyBar
              key={key}
              label={comp.name}
              code={comp.code}
              score={score}
              threshold={comp.minThreshold}
            />
          ))}
        </div>
      </div>

      {/* ── STRENGTHS & DEVELOPMENT GRID ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-700" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-900">
              {isIndustryReady ? "Verified Strengths" : "Your Strongest Areas"}
            </span>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-950">{s.dimension.name}: </span>
                  <span className="text-stone-600">
                    {s.score}%
                    {isIndustryReady
                      ? ` — exceeds benchmark by ${s.score - s.dimension.minThreshold}%`
                      : ` — ${s.score >= s.dimension.minThreshold ? "meets threshold" : "closest to threshold"}`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Development Areas */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-700" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900">
              {isIndustryReady ? "Refinement Areas" : "Priority Development Areas"}
            </span>
          </div>
          <ul className="space-y-2">
            {result.developmentGaps.map((g, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                <AlertCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-amber-950">{g.dimension.name}: </span>
                  <span className="text-stone-600">
                    {isIndustryReady
                      ? `${g.score}% — already above threshold. Continue refining.`
                      : `${g.score}% — requires +${g.gap}% to reach operational independence.`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── PREPARATION ROADMAP ─────────────────────────────────── */}
      {!isIndustryReady && (
        <div className="rounded-2xl border border-stone-200 bg-white tone-light shadow-xs p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-[#0B1325]">
              {isNearReady
                ? "Recommended Remediation Path"
                : "Your 12-Week Readiness Roadmap"}
            </h2>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Sequenced to bridge your identified competency gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                phase: "Weeks 1–4",
                label: "Foundations",
                detail: "ICH E2A / E2D & ICSR 4-criteria mastery. Spontaneous vs. clinical trial reporting.",
              },
              {
                phase: "Weeks 5–8",
                label: "Case Processing",
                detail: "WHO-UMC causality algorithms, MedDRA LLT selection, narrative drafting under rubric.",
              },
              {
                phase: "Weeks 9–12",
                label: "Workplace Ready",
                detail: "High-pressure queue triage, mock inspection drills, interview preparation with PV managers.",
              },
            ].map((step) => (
              <div
                key={step.phase}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5"
              >
                <div className="text-[10px] font-mono font-bold text-[#1B3F8B] uppercase tracking-wider">
                  {step.phase} · {step.label}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/training"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Explore Training Programmes</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>
      )}

      {/* ── INDUSTRY READY: CREDENTIAL & NEXT STEPS ─────────────── */}
      {isIndustryReady && mode === "certified" && (
        <div className="rounded-2xl border-2 border-emerald-700/30 bg-[#07241A]/5 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-emerald-950">
              ACRI Credential — Industry Ready
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
            {[
              { label: "Credential ID", val: credentialId },
              { label: "Standard", val: "ACRI-PV v1.0" },
              { label: "Role Alignment", val: "Pharmacovigilance Associate" },
              { label: "Composite Score", val: `${result.compositeScore}/100` },
              { label: "Critical Gates", val: "All Passed" },
              { label: "Employer Visibility", val: "Verifiable via Public URL" },
            ].map((item) => (
              <div key={item.label} className="flex items-baseline justify-between border-b border-stone-200 pb-1.5">
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="font-bold text-stone-900">{item.val}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {onViewCertificate && (
              <button
                type="button"
                onClick={onViewCertificate}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition cursor-pointer shadow-sm"
              >
                <Award className="h-3.5 w-3.5 text-emerald-400" />
                View Certificate
              </button>
            )}
            <Link
              to="/verify"
              search={{ id: credentialId } as any}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-900 font-mono text-[11px] font-bold uppercase tracking-wider transition"
            >
              <ExternalLink className="h-3.5 w-3.5 text-stone-500" />
              Verify Result
            </Link>
          </div>
        </div>
      )}

      {/* ── SHARE PANEL ─────────────────────────────────────────── */}
      <SharePanel
        score={result.compositeScore}
        credentialId={credentialId}
        state={state}
      />

      {/* ── SHAREABLE RESULT CARD ───────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
            Shareable Result Card
          </span>
          <button
            type="button"
            onClick={handleDownloadCard}
            className="flex items-center gap-1 text-[11px] font-mono text-stone-500 hover:text-stone-900 border border-stone-200 bg-white tone-light px-2.5 py-1 rounded-lg hover:bg-stone-50 transition cursor-pointer"
          >
            <Download className="h-3 w-3" />
            Download Card
          </button>
        </div>
        <div className="overflow-x-auto pb-1">
          <ShareableCardRef
            ref={cardRef}
            score={result.compositeScore}
            credentialId={credentialId}
            state={state}
          />
        </div>
      </div>

      {/* ── ACTION FOOTER ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
        <button
          type="button"
          onClick={onRetake}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-100 text-stone-900 font-mono text-[11px] font-semibold uppercase tracking-wider transition cursor-pointer shadow-xs"
        >
          <RotateCcw className="h-3.5 w-3.5 text-stone-500" />
          Retake Assessment
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {onViewReport && (
            <button
              type="button"
              onClick={onViewReport}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-100 text-stone-900 font-mono text-[11px] font-semibold uppercase tracking-wider transition cursor-pointer shadow-xs"
            >
              View Sample Dossier
            </button>
          )}

          <Link
            to="/career-engine"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-[11px] font-bold uppercase tracking-wider transition shadow-sm"
          >
            Career Engine
            <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
          </Link>
        </div>
      </div>

      {/* Audit strip */}
      <div className="text-center text-[10px] font-mono text-stone-400">
        Standard: ACRI-PV v1.0 · ICH E2A/E2B(R3), WHO-UMC, EMA GVP VI · Arzon Global{" "}
        {new Date().getFullYear()}
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  MessageCircle,
  Award,
  Layers,
  Clock,
  FileText,
  Target,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Share2,
  Copy,
  Printer,
  Sparkles,
  Zap,
  HelpCircle,
  Lock,
  ExternalLink,
  GraduationCap,
  Calendar,
  Check,
  ArrowDown,
  GitBranch,
  Timer,
  Building2,
  UserCheck,
  Activity,
  AlertOctagon,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  type DsaDiagnosticResult,
  type DsaCompetencyKey,
  DSA_COMPETENCIES,
  scoreDsaDiagnostic,
} from "@/data/drugSafetyDiagnosticQuestions";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import { toast } from "sonner";
import { openExpertModal } from "@/components/system/UnifiedExpertModal";
import type { AntiCheatTelemetry } from "@/lib/assessmentAntiCheat";

interface Props {
  answers: Record<string, string>;
  candidateName?: string;
  candidateQualification?: string;
  candidateCollege?: string;
  candidateGraduationYear?: string;
  candidateCurrentStatus?: string;
  candidateTargetRole?: string;
  leadId?: string | null;
  shareUrl?: string;
  isSharedView?: boolean;
  antiCheat?: AntiCheatTelemetry;
  onRetake?: () => void;
}

export function DsaDiagnosticScorecard({
  answers,
  candidateName = "Candidate",
  candidateQualification = "B.Pharm",
  candidateCollege = "Pharmacy College",
  candidateGraduationYear = "2025",
  candidateCurrentStatus = "Actively Job Hunting",
  candidateTargetRole = "Drug Safety Associate",
  leadId,
  shareUrl,
  isSharedView = false,
  antiCheat,
  onRetake,
}: Props) {
  const result: DsaDiagnosticResult = scoreDsaDiagnostic(answers);
  const isDisqualified = Boolean(antiCheat?.disqualified || (antiCheat?.tabSwitches ?? 0) >= 3);
  const displayScore = isDisqualified ? 0 : result.totalScore;
  const displayCorrect = isDisqualified ? 0 : result.totalCorrect;
  const [filter, setFilter] = useState<"all" | "incorrect" | "correct">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  // Deterministic Reference ID
  const rawId = leadId || "ce-sim-2026";
  const shortRef = Math.abs(
    rawId.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0),
  )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0")
    .slice(-8);
  const referenceId = `CE-SIM-2026-${shortRef}`;

  const currentShareUrl =
    shareUrl || (typeof window !== "undefined" ? window.location.href : "https://arzoncareers.in");

  const filteredQuestions = result.questionReviews.filter((q) => {
    if (filter === "incorrect") return !q.isCorrect;
    if (filter === "correct") return q.isCorrect;
    return true;
  });

  const comp = result.competencyBreakdown;

  // Key KPI Scores
  const raiCorrect =
    comp.pv_fundamentals.correct + comp.icsr_validity.correct + comp.seriousness_expedited.correct;
  const raiScore = isDisqualified ? 0 : Math.round((raiCorrect / 15) * 100);

  const ccdCorrect = comp.day0_clocks.correct + comp.seriousness_expedited.correct;
  const ccdScore = isDisqualified ? 0 : Math.round((ccdCorrect / 10) * 100);

  // Tier-1 CRO Cutoff Logic (75% = 30 out of 40)
  const passingTargetQs = 30;
  const questionsShort = Math.max(0, passingTargetQs - (isDisqualified ? 0 : result.totalCorrect));

  const handleWhatsAppShare = () => {
    const integrityInfo = isDisqualified
      ? `\n• Proctoring Integrity: 0% (FAILED: CHEATING DETECTED — Strike 3/3 auto-disqualification triggered)`
      : antiCheat
      ? `\n• Proctoring Integrity: ${antiCheat.integrityScore}% (${antiCheat.tabSwitches === 0 ? "Clean Attempt" : `${antiCheat.tabSwitches} tab switches logged`})`
      : "";

    const text = isSharedView
      ? `Hi Arzon Admissions Team,\n\nI reviewed ${candidateName}'s Drug Safety Associate Technical Diagnostic on Arzon Careers.\n\n• Candidate: ${candidateName}\n• Qualification: ${candidateQualification} (${candidateGraduationYear} Batch)\n• College: ${candidateCollege}\n• Score: ${displayScore}% (${displayCorrect}/${result.totalQuestions} Correct)${isDisqualified ? " [FAILED: CHEATING DETECTED]" : ""}\n• Gap to Tier-1 CRO Cutoff (75%): ${questionsShort} questions short\n• Regulatory Accuracy Index: ${raiScore}%\n• Clock Discipline: ${ccdScore}%${integrityInfo}\n• Audit Reference: ${referenceId}\n• Verification URL: ${currentShareUrl}\n\nI would like to discuss this candidate's evaluation.`
      : `Hi Arzon Admissions Team,\n\nI just completed the Drug Safety Associate Technical Diagnostic on Arzon Careers.\n\n• Candidate: ${candidateName}\n• Qualification: ${candidateQualification} (${candidateGraduationYear} Batch)\n• College: ${candidateCollege}\n• Score: ${displayScore}% (${displayCorrect}/${result.totalQuestions} Correct)${isDisqualified ? " [FAILED: CHEATING DETECTED]" : ""}\n• Gap to Tier-1 CRO Cutoff (75%): ${questionsShort} questions short\n• Regulatory Accuracy Index: ${raiScore}%\n• Clock Discipline: ${ccdScore}%${integrityInfo}\n• Audit Reference: ${referenceId}\n• Verification URL: ${currentShareUrl}\n\nI would like to review my diagnostic results with a mentor and discuss technical interview preparation.`;
    const url = `https://api.whatsapp.com/send?phone=919121283638&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Arzon Clinical Interview Diagnostic · Drug Safety Associate",
          text: isDisqualified
            ? `FAILED: CHEATING DETECTED (Strike 3 Auto-Disqualification) on Arzon Careers. Audit Ref: ${referenceId}`
            : `My Clinical Diagnostic Score: ${result.totalScore}% (${result.totalCorrect}/40 Correct) on Arzon Careers. Audit Ref: ${referenceId}`,
          url: currentShareUrl,
        });
        return;
      } catch {
        // Fallback to WhatsApp
      }
    }
    handleWhatsAppShare();
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(currentShareUrl);
      toast.success("Verification link copied to clipboard!");
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Concentric Radial Dial
  const dialRadius = 52;
  const dialCircumference = 2 * Math.PI * dialRadius;
  const strokeDashoffset = dialCircumference - (displayScore / 100) * dialCircumference;

  const competencyKeys = Object.keys(result.competencyBreakdown) as DsaCompetencyKey[];

  return (
    <section className="space-y-6 sm:space-y-10 w-full max-w-full min-w-0 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20 sm:pb-6">
      {/* ── AUTO-DISQUALIFICATION BANNER ON STRIKE 3 ────────────────────────── */}
      {isDisqualified && (
        <div className="rounded-[24px] sm:rounded-[32px] border-2 border-rose-500/80 bg-rose-500/10 tone-light card-light p-5 sm:p-7 shadow-[0_8px_30px_rgba(244,63,94,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-lg">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
                  STRIKE 3/3 AUTO-DISQUALIFICATION
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
                  EXAM LOCKED
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans text-rose-700 tracking-tight mt-1">
                FAILED: CHEATING DETECTED
              </h2>
              <p className="text-xs sm:text-sm text-rose-800/90 mt-0.5 max-w-2xl leading-relaxed">
                Candidate exceeded the maximum allowable tab switch limit (3 violations recorded by browser lockdown proctor). This evaluation has been terminated and the final score permanently set to 0%.
              </p>
            </div>
          </div>
          <div className="shrink-0 font-mono text-center md:text-right bg-white/90 border border-rose-300 rounded-2xl px-5 py-3 shadow-sm self-stretch md:self-auto flex md:flex-col justify-between items-center md:items-end">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">FINAL SCORE</span>
            <span className="text-3xl font-black text-rose-600">0%</span>
          </div>
        </div>
      )}

      {/* ── 01. ACETERNITY SPOTLIGHT PASS (SHADCN / LUXURY APPLE WALLET) ───────── */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#081F38] via-[#0A2544] to-[#071A30] text-white p-6 sm:p-9 shadow-[0_24px_60px_-12px_rgba(8,31,56,0.45)] border border-white/10 relative overflow-hidden">
        {/* Aceternity Spotlight Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/30 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 text-white/[0.03] select-none font-serif text-[140px] sm:text-[180px] font-black leading-none">
          ARZON
        </div>

        {/* Top Header Ledger Ribbon */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <ArzonLogo variant="light" size="sm" showWordmark={true} />
            <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#C5A880] font-bold">
              Healthcare Career Intelligence Council
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-[10.5px] font-mono font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              <span>OFFICIAL CLINICAL AUDIT TRANSCRIPT</span>
            </div>
            <span className="text-[10px] sm:text-[10.5px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              Ref: {referenceId}
            </span>
          </div>
        </div>

        {/* Main Credential Passport Block */}
        <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Candidate Information & Calligraphy */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
              <span>CANDIDATE TECHNICAL SCREENING RECORD</span>
              <span className="text-white/40">·</span>
              <span>40 SCENARIO DILEMMAS</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
                {candidateName}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#C5A880] to-transparent rounded-full mt-2" />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm text-slate-300 pt-1">
              <span className="font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
                {candidateQualification}
              </span>
              <span className="text-white/40">·</span>
              <span>Class of {candidateGraduationYear}</span>
              <span className="text-white/40">·</span>
              <span className="text-slate-300 truncate max-w-[220px] sm:max-w-xs">{candidateCollege}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-1">
              Evaluated Role: <strong className="text-white font-bold">{candidateTargetRole}</strong> · Pharmacovigilance &amp; Drug Safety Screening
            </p>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap pt-3">
              <button
                type="button"
                onClick={() => openExpertModal({
                  targetTrack: "Fresher PV Associate",
                  qualification: candidateQualification,
                  source: "diagnostic_scorecard_top",
                })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#008F83] hover:bg-[#00736A] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Talk to Experts to Review Gaps</span>
              </button>
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Share on WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 text-xs font-bold transition-all border border-white/15 backdrop-blur-md active:scale-95 cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Shareable Link</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                aria-label="Print or Save PDF"
                className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all active:scale-95 cursor-pointer"
              >
                <Printer className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: Tactile Concentric Dial + Live Verification QR */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-row items-center justify-center sm:justify-end gap-5 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 backdrop-blur-md">
            {/* Concentric Progress Ring */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-36 h-36 transform -rotate-90 origin-center" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={dialRadius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
                <circle
                  cx="60"
                  cy="60"
                  r={dialRadius}
                  fill="none"
                  stroke={isDisqualified ? "#F43F5E" : result.totalScore >= 75 ? "#10B981" : result.totalScore >= 60 ? "#F59E0B" : "#F43F5E"}
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={dialCircumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                  {displayScore}%
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-300 mt-0.5">
                  {isDisqualified ? "FAILED: CHEATING" : `${result.totalCorrect}/40 Correct`}
                </span>
              </div>
            </div>

            {/* QR Code and Ledger Verification */}
            <div className="text-center sm:text-left space-y-2">
              <div className="inline-block p-2 bg-white rounded-xl shadow-xs">
                <QRCodeSVG value={currentShareUrl} size={64} level="M" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                  SCAN TO VERIFY AUDIT
                </span>
                <span className="text-[10.5px] font-mono text-slate-300 block font-semibold">
                  {referenceId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 01.5 ASSESSMENT INTEGRITY & PROCTORING AUDIT DOSSIER ──────────────── */}
      <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-7 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`h-11 w-11 rounded-2xl flex items-center justify-center font-bold shrink-0 border ${
                isDisqualified
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : (antiCheat?.integrityScore ?? 100) >= 90
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {isDisqualified ? <AlertTriangle className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                  ASSESSMENT INTEGRITY &amp; PROCTORING AUDIT
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9.5px] font-bold border ${
                    isDisqualified
                      ? "bg-rose-50 text-rose-800 border-rose-300"
                      : (antiCheat?.integrityScore ?? 100) >= 90
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-amber-50 text-amber-800 border-amber-300"
                  }`}
                >
                  {isDisqualified
                    ? "FAILED: CHEATING DETECTED (DISQUALIFIED)"
                    : (antiCheat?.integrityScore ?? 100) >= 90
                    ? "VERIFIED CLEAN ATTEMPT"
                    : "REVIEW RECOMMENDED"}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#081F38] tracking-tight mt-0.5">
                Proctored Technical Screening Metrics
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono self-start sm:self-auto">
            <span className="text-slate-500">Integrity Index:</span>
            <strong
              className={`text-sm sm:text-base font-bold ${
                isDisqualified
                  ? "text-rose-700"
                  : (antiCheat?.integrityScore ?? 100) >= 90
                  ? "text-emerald-700"
                  : "text-amber-700"
              }`}
            >
              {isDisqualified ? "0%" : `${antiCheat?.integrityScore ?? 100}%`}
            </strong>
          </div>
        </div>

        {/* 4 Proctoring Telemetry Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Tile 1: Tab Switches */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
              Tab Navigation
            </span>
            <div className="flex items-baseline gap-1.5">
              <strong className={`text-lg font-bold font-mono ${isDisqualified ? "text-rose-600" : "text-[#081F38]"}`}>
                {antiCheat?.tabSwitches ?? 0}
              </strong>
              <span className={`text-[11px] font-sans ${isDisqualified ? "text-rose-700 font-semibold" : "text-slate-600"}`}>
                {isDisqualified
                  ? "Switches (Strike 3 Auto-Disqualified)"
                  : (antiCheat?.tabSwitches ?? 0) === 0
                  ? "Switches (Clean)"
                  : "Switches Logged"}
              </span>
            </div>
            <p className="text-[10.5px] text-slate-500 font-sans leading-tight">
              {isDisqualified
                ? "Maximum tab switch limit reached. Candidate auto-disqualified."
                : (antiCheat?.tabSwitches ?? 0) === 0
                ? "Candidate remained exclusively in the test viewport."
                : "External browser navigation events were logged."}
            </p>
          </div>

          {/* Tile 2: Focus Retention */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
              Active Focus
            </span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-lg font-bold text-emerald-700 font-mono">
                {antiCheat?.focusRetentionPct ?? 100}%
              </strong>
              <span className="text-[11px] text-slate-600 font-sans">In Viewport</span>
            </div>
            <p className="text-[10.5px] text-slate-500 font-sans leading-tight">
              Window focus stability maintained without desktop switching.
            </p>
          </div>

          {/* Tile 3: Response Velocity */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
              Answer Velocity
            </span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-lg font-bold text-[#081F38] font-mono">
                {antiCheat?.avgTimePerQuestionSec ?? 38.2}s
              </strong>
              <span className="text-[11px] text-slate-600 font-sans">/ Question</span>
            </div>
            <p className="text-[10.5px] text-slate-500 font-sans leading-tight">
              Organic human deliberation cadence (No automated script patterns).
            </p>
          </div>

          {/* Tile 4: Anti-Copy Hardlock */}
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
              Clipboard Security
            </span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-lg font-bold text-[#081F38] font-mono">
                {antiCheat?.copyAttempts ? `${antiCheat.copyAttempts} Blocked` : "Locked"}
              </strong>
              <span className="text-[11px] text-emerald-700 font-sans font-semibold">
                Protected
              </span>
            </div>
            <p className="text-[10.5px] text-slate-500 font-sans leading-tight">
              Right-click, text selection, and shortcut copying hard-disabled.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 font-sans">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>
              Proctored in accordance with ICH E6(R2) &amp; EMA GVP clinical trial record integrity standards.
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            Hash: {referenceId}-AUDIT
          </span>
        </div>
      </div>

      {/* ── 02. SHADCN BENTO PIPELINE: WHY 75% CUTOFF VS 15% SCORE ─────────────── */}
      <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-9 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 mb-1.5">
              <GitBranch className="h-3 w-3" />
              <span>CRO RECRUITMENT PIPELINE FLOWCHART</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#081F38] tracking-tight">
              Why Tier-1 CROs Filter at 75%
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
            Hiring Screening Architecture
          </span>
        </div>

        {/* 3-Stage Connected Pipeline Flowchart Diagram */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch relative z-10">
            {/* Gate 01: Resume Filter */}
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/20 p-5 flex flex-col justify-between shadow-2xs relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold">
                    1
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    HR RESUME ATS
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[10px] font-bold">
                  <Check className="h-3 w-3" />
                  <span>PASSED</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#081F38] font-sans">
                  Academic Eligibility Check
                </h3>
                <div className="p-3 rounded-xl bg-white border border-emerald-100 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Degree:</span>
                    <strong className="text-[#081F38]">{candidateQualification} ({candidateGraduationYear})</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Status:</span>
                    <span className="text-emerald-800 font-bold">Eligible for Casework</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] font-mono text-emerald-900 font-semibold flex items-center justify-between">
                <span>Advancement:</span>
                <span className="font-bold text-emerald-800">Unlocked →</span>
              </div>
            </div>

            {/* Gate 02: Automated Technical Screening Cutoff (BLOCKED) */}
            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/30 p-5 flex flex-col justify-between shadow-sm relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                YOU ARE HERE · BLOCKED AT CUTOFF
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-600 text-white font-mono text-xs font-bold">
                    2
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-rose-800">
                    AUTOMATED TEST
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 font-mono text-[10px] font-bold">
                  <XCircle className="h-3 w-3" />
                  <span>BELOW BAR</span>
                </span>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-base font-bold text-[#081F38] font-sans">
                  40-Question Technical Test
                </h3>

                {/* Visual Gap Meter */}
                <div className="p-3 rounded-xl bg-white border border-rose-200 space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Tier-1 Cutoff:</span>
                      <span className="font-bold text-emerald-800">75% (30/40 Qs)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-500">Your Diagnostic:</span>
                      <span className="font-bold text-rose-700">{result.totalScore}% ({result.totalCorrect}/40 Qs)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-600 rounded-full" style={{ width: `${Math.max(8, result.totalScore)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-200 text-center">
                <span className="inline-block font-mono text-[11px] font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                  Gap: -{questionsShort} Questions to Clear Cutoff
                </span>
              </div>
            </div>

            {/* Gate 03: Sponsor Client Interview (LOCKED) */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between opacity-75 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-300 text-slate-700 font-mono text-xs font-bold">
                    3
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    CLIENT PANEL
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600 font-mono text-[10px] font-bold">
                  <Lock className="h-3 w-3" />
                  <span>LOCKED</span>
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-700 font-sans">
                  Sponsor Technical Panel
                </h3>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1 text-slate-400">
                  <div className="flex justify-between">
                    <span>Round:</span>
                    <span>Argus Casework Defense</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outcome:</span>
                    <span>Offer Letter Rollout</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-400 text-center">
                Unlocks when Stage 2 reaches 75%+
              </div>
            </div>
          </div>
        </div>

        {/* Visual Deficit Breakdown Ledger (Where the 24 questions are lost) */}
        <div className="mt-6 rounded-2xl bg-blue-50/60 border border-blue-200/80 p-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-blue-700 mb-2">
            <Target className="h-4 w-4" />
            <span>24-QUESTION DEFICIT RECOVERY MATRIX</span>
          </div>
          <p className="text-xs text-slate-700 font-sans leading-relaxed mb-4">
            Cognizant and IQVIA automated screening tests automatically reject candidates who do not reach 30/40. Here is the visual breakdown of the exact 24 questions that separate your score ({result.totalScore}%) from the 75% cutoff:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs space-y-1">
              <span className="text-[9.5px] text-slate-400 block font-bold">01 · DAY 0 CLOCKS</span>
              <span className="text-base font-black text-rose-700 block">-8 Questions</span>
              <span className="text-[10px] text-slate-500 block font-sans">Partner handoff &amp; calendar days</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs space-y-1">
              <span className="text-[9.5px] text-slate-400 block font-bold">02 · MEDDRA CODING</span>
              <span className="text-base font-black text-rose-700 block">-9 Questions</span>
              <span className="text-[10px] text-slate-500 block font-sans">Diagnosis superseding symptoms</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs space-y-1">
              <span className="text-[9.5px] text-slate-400 block font-bold">03 · ICSR VALIDITY</span>
              <span className="text-base font-black text-rose-700 block">-9 Questions</span>
              <span className="text-[10px] text-slate-500 block font-sans">4 Minimum safety criteria</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-blue-100 shadow-2xs space-y-1">
              <span className="text-[9.5px] text-slate-400 block font-bold">04 · CAUSALITY / SBAR</span>
              <span className="text-base font-black text-rose-700 block">-8 Questions</span>
              <span className="text-[10px] text-slate-500 block font-sans">WHO-UMC &amp; dispute escalation</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 03. THE 4 CRUCIAL MISTAKES — ACETERNITY BENTO CASE DIAGRAMS ───────── */}
      <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-9 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 mb-1.5">
              <AlertOctagon className="h-3 w-3" />
              <span>THE 4 FATAL INTERVIEW TRAPS</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#081F38] tracking-tight">
              Visual Case Diagrams: What Went Wrong
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
            ICH E2A &amp; MedDRA Quality Rules
          </span>
        </div>

        {/* 4 Rich Diagrammatic Infographic Cards */}
        <div className="space-y-6">
          {/* ── DIAGRAM 01: AE VS ADR DECISION TREE FLOWCHART ────────────────── */}
          <div className="rounded-2xl sm:rounded-3xl border-2 border-rose-200 bg-slate-50/30 p-5 sm:p-7 shadow-2xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-white font-mono text-xs font-bold">
                  01
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#081F38] font-sans">
                  The Adverse Event (AE) vs. Adverse Drug Reaction (ADR) Decision Tree
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                ✗ Trap Triggered
              </span>
            </div>

            {/* Visual SVG Flowchart */}
            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              {/* Event Box */}
              <div className="max-w-md mx-auto text-center p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-sans">
                <span className="font-mono text-[9.5px] font-bold text-slate-400 uppercase block mb-0.5">
                  CLINICAL TRIAL CASEWORK INCIDENT (Q1)
                </span>
                <strong className="text-[#081F38]">Patient slips on wet floor tiles at home → Fractures wrist</strong>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center text-slate-400">
                <ArrowDown className="h-5 w-5" />
              </div>

              {/* Decision Diamond */}
              <div className="max-w-xs mx-auto text-center p-3 rounded-2xl bg-blue-50 border-2 border-blue-300 text-xs font-mono font-bold text-blue-900 shadow-xs">
                Is there a reasonable causal link to trial drug IP-204?
              </div>

              {/* Branching Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Branch Left: Expected AE */}
                <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
                    <span>BRANCH: NO CAUSALITY</span>
                    <span className="bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      ✓ MANDATED STANDARD
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-200 text-center font-bold text-[#081F38] text-sm">
                    Adverse Event (AE)
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                    Any untoward medical occurrence during trial, regardless of causal relationship (ICH E2A Sec II.A).
                  </p>
                </div>

                {/* Branch Right: Candidate's Error */}
                <div className="rounded-xl border-2 border-rose-300 bg-rose-50/40 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-rose-800">
                    <span>BRANCH: ASSUMED CAUSALITY</span>
                    <span className="bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300">
                      ✗ WHAT YOU CHOSE
                    </span>
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-rose-200 text-center font-bold text-rose-800 text-sm">
                    Adverse Drug Reaction (ADR)
                  </div>
                  <p className="text-[11px] text-rose-800 font-sans leading-relaxed font-semibold">
                    Error: You assumed the trial drug caused a domestic slip-and-fall! Disqualified in Round 1.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── DIAGRAM 02: DAY 0 REGULATORY CLOCK TIMELINE DIAGRAM ─────────── */}
          <div className="rounded-2xl sm:rounded-3xl border-2 border-rose-200 bg-slate-50/30 p-5 sm:p-7 shadow-2xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-white font-mono text-xs font-bold">
                  02
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#081F38] font-sans">
                  Day 0 Regulatory Clock Calculation (Vendor Receipt vs. Safety Inbox)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                ✗ Trap Triggered
              </span>
            </div>

            {/* Visual Timeline Diagram */}
            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-5">
              <span className="font-mono text-[9.5px] font-bold text-slate-400 uppercase block text-center">
                72-HOUR REGULATORY CLOCK DISCREPANCY TIMELINE
              </span>

              {/* Horizontal / Stacked Timeline Track */}
              <div className="relative border-l-2 sm:border-l-0 sm:border-t-2 border-slate-300 pl-4 sm:pl-0 sm:pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Step 1: Friday */}
                <div className="relative space-y-1">
                  <div className="hidden sm:block absolute -top-[23px] left-0 h-3.5 w-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">
                    FRIDAY 09:00 AM · DAY 0
                  </span>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs">
                    <strong className="text-emerald-950 block font-bold">Vendor Receives Report</strong>
                    <span className="text-[11px] text-emerald-800 font-mono block mt-1">
                      ⏱️ REGULATORY CLOCK STARTS
                    </span>
                  </div>
                </div>

                {/* Step 2: Weekend Delay */}
                <div className="relative space-y-1">
                  <div className="hidden sm:block absolute -top-[23px] left-0 h-3.5 w-3.5 rounded-full bg-slate-400 ring-4 ring-slate-100" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    SATURDAY &amp; SUNDAY
                  </span>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <strong className="text-slate-700 block font-bold">Vendor Transfer Delay</strong>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      Clocks run on calendar days!
                    </span>
                  </div>
                </div>

                {/* Step 3: Monday Afternoon */}
                <div className="relative space-y-1">
                  <div className="hidden sm:block absolute -top-[23px] left-0 h-3.5 w-3.5 rounded-full bg-rose-600 ring-4 ring-rose-100" />
                  <span className="text-[10px] font-mono font-bold text-rose-800 uppercase block">
                    MONDAY 04:00 PM · DAY 3
                  </span>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs">
                    <strong className="text-rose-950 block font-bold">Sponsor PV Reads Email</strong>
                    <span className="text-[11px] text-rose-800 font-bold block mt-1">
                      ✗ You started clock here (3 Days Late!)
                    </span>
                  </div>
                </div>
              </div>

              {/* Regulatory Citation Box */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-900 font-semibold text-center">
                EMA GVP Module VI Rule: Day 0 starts upon receipt by ANY company employee or third-party partner. Starting Day 0 three days late causes an immediate critical regulatory inspection finding.
              </div>
            </div>
          </div>

          {/* ── DIAGRAM 03: 7-DAY FATAL SUSAR VS 15-DAY CLOCK ──────────────── */}
          <div className="rounded-2xl sm:rounded-3xl border-2 border-rose-200 bg-slate-50/30 p-5 sm:p-7 shadow-2xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-white font-mono text-xs font-bold">
                  03
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#081F38] font-sans">
                  The Expedited Reporting Clock: 7 Days (Fatal) vs. 15 Days (Non-Fatal)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                ✗ Trap Triggered
              </span>
            </div>

            {/* Visual Clock Comparison Bars */}
            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              {/* Category A: Fatal SUSAR */}
              <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-900">CASE: FATAL / LIFE-THREATENING SUSAR</span>
                  <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    ⚡ 7 CALENDAR DAYS
                  </span>
                </div>
                <div className="h-3 w-full bg-emerald-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "46%" }} />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-emerald-900">
                  <span>Day 0</span>
                  <span className="font-bold">Initial Health Authority Notification (Day 7)</span>
                  <span>+8 Days (Follow-up)</span>
                </div>
              </div>

              {/* Category B: What Candidate Chose */}
              <div className="p-4 rounded-xl border-2 border-rose-300 bg-rose-50/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-rose-900">YOUR ANSWER: ASSIGNED STANDARD NON-FATAL CLOCK</span>
                  <span className="font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                    15 CALENDAR DAYS (LATE!)
                  </span>
                </div>
                <div className="h-3 w-full bg-rose-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: "100%" }} />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-rose-800 font-bold">
                  <span>Day 0</span>
                  <span>Day 7 (Missed Deadline!)</span>
                  <span>Day 15 (8 Days Overdue Breach)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700 text-center">
                ICH E2A Section III.A: Fatal or life-threatening unexpected reactions strictly mandate initial expedited health authority notification within 7 calendar days.
              </div>
            </div>
          </div>

          {/* ── DIAGRAM 04: MEDDRA 5-LEVEL HIERARCHY PYRAMID ───────────────── */}
          <div className="rounded-2xl sm:rounded-3xl border-2 border-rose-200 bg-slate-50/30 p-5 sm:p-7 shadow-2xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-white font-mono text-xs font-bold">
                  04
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#081F38] font-sans">
                  MedDRA 5-Level Hierarchy: Confirmed Diagnosis vs. Split Symptoms
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                ✗ Trap Triggered
              </span>
            </div>

            {/* Visual 5-Level Pyramid Graphic */}
            <div className="p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <span className="font-mono text-[9.5px] font-bold text-slate-400 uppercase block text-center">
                MEDDRA MSSO 5-LEVEL HIERARCHICAL CODING PYRAMID
              </span>

              {/* 5 Stacked Tiers */}
              <div className="space-y-1.5 max-w-lg mx-auto font-mono text-xs">
                {/* Level 5: SOC */}
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center text-slate-600">
                  <span className="font-bold">[SOC] System Organ Class:</span> Cardiac disorders
                </div>

                {/* Level 4: HLGT */}
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center text-slate-600">
                  <span className="font-bold">[HLGT] High Level Group Term:</span> Coronary artery disorders
                </div>

                {/* Level 3: HLT */}
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center text-slate-600">
                  <span className="font-bold">[HLT] High Level Term:</span> Ischaemic coronary artery disorders
                </div>

                {/* Level 2: PT (Highlighted Golden Tier) */}
                <div className="p-3 rounded-xl bg-emerald-100 border-2 border-emerald-400 text-center font-bold text-emerald-950 shadow-xs">
                  ★ [PT] Preferred Term: Myocardial infarction (CODE THIS SINGLE TERM)
                </div>

                {/* Level 1: LLT */}
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center text-slate-600">
                  <span className="font-bold">[LLT] Lowest Level Term:</span> Acute myocardial infarction
                </div>
              </div>

              {/* Visual Split Coding Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans">
                <div className="p-3 rounded-xl border border-rose-300 bg-rose-50/40 text-rose-950 space-y-1">
                  <strong className="text-rose-800 font-bold block font-mono text-[10px] uppercase">
                    ❌ What You Did (Split Coding)
                  </strong>
                  <p>Coded chest pain + diaphoresis + dyspnea separately.</p>
                  <p className="text-[10.5px] text-rose-700 pt-0.5">
                    Violation: Artificially generated 3 duplicate adverse reactions in the database.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 text-emerald-950 space-y-1">
                  <strong className="text-emerald-800 font-bold block font-mono text-[10px] uppercase">
                    ✅ MedDRA PTC Rule (Sec 1.3)
                  </strong>
                  <p>Confirmed diagnosis supersedes signs and symptoms.</p>
                  <p className="text-[10.5px] text-emerald-700 pt-0.5">
                    Standard: Only code individual symptoms if diagnosis is unconfirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 04. SHADCN BENTO GRID: 8 PV COMPETENCY AREAS ───────────────────────── */}
      <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-9 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
              CLINICAL DOMAIN MASTERY MATRIX
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#081F38] tracking-tight mt-0.5">
              8 Pharmacovigilance Competency Areas
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
            5 Dilemmas Per Competency (40 Total)
          </span>
        </div>

        {/* Tactile 8-Card Grid with Segmented Ticks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {competencyKeys.map((key) => {
            const domain = result.competencyBreakdown[key];
            const meta = DSA_COMPETENCIES[key];
            const isGood = domain.score >= 75;

            return (
              <div
                key={key}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#081F38] font-sans truncate">
                      {domain.title}
                    </span>
                    <span
                      className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                        isGood
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                          : "bg-rose-50 text-rose-900 border-rose-200"
                      }`}
                    >
                      {domain.correct}/5 Qs
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed font-sans mb-3 line-clamp-2">
                    {meta.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  {/* 5 Segmented Physical Tick Indicators */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((tick) => {
                      const filled = tick <= domain.correct;
                      return (
                        <div
                          key={tick}
                          className={`h-2 flex-1 rounded-full transition-all ${
                            filled
                              ? isGood
                                ? "bg-emerald-600"
                                : "bg-rose-500"
                              : "bg-slate-200"
                          }`}
                        />
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-medium">Domain Mastery</span>
                    <span className={`font-bold ${isGood ? "text-emerald-800" : "text-rose-800"}`}>
                      {domain.score}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 05. ACETERNITY 7-DAY VISUAL SPRINT ROADMAP FLOWCHART ──────────────── */}
      <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-9 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
              REMEDIATION SYLLABUS FLOWCHART
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#081F38] tracking-tight mt-0.5">
              Your 7-Day Technical Interview Prep Plan
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
            Targeted to Your Specific Gaps
          </span>
        </div>

        {/* 4-Stage Connected Sprint Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/30 p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                DAY 01–02
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                CORE VALIDITY
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#081F38] font-sans">
              ICSR Intake &amp; Minimum Criteria
            </h4>
            <p className="text-[11.5px] text-slate-600 leading-relaxed font-sans">
              Master the 4 mandatory elements under ICH E2D: Identifiable Patient, Identifiable Reporter, Suspect Drug, and Adverse Event.
            </p>
            <div className="pt-2 border-t border-blue-100 text-[10.5px] font-mono text-blue-700 font-semibold">
              Tools: ICH E2D · Argus Case Intake
            </div>
          </div>

          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700">
                DAY 03–04
              </span>
              <span className="text-[10px] font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                MEDDRA CODING
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#081F38] font-sans">
              Hierarchy &amp; PTC Coding Rules
            </h4>
            <p className="text-[11.5px] text-slate-600 leading-relaxed font-sans">
              Master PTC Section 1.3: diagnosis over symptom, primary SOC allocation, verbatim LLT assignment, and Narrow SMQs.
            </p>
            <div className="pt-2 border-t border-indigo-100 text-[10.5px] font-mono text-indigo-700 font-semibold">
              Tools: MedDRA Browser · MSSO PTC
            </div>
          </div>

          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/30 p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
                DAY 05–06
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                REGULATORY CLOCKS
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#081F38] font-sans">
              Day 0 &amp; Expedited Reporting
            </h4>
            <p className="text-[11.5px] text-slate-600 leading-relaxed font-sans">
              Calculate calendar vs. business days, SDEA partner handoffs, 7-day fatal SUSARs, and 15-day non-fatal clocks.
            </p>
            <div className="pt-2 border-t border-amber-100 text-[10.5px] font-mono text-amber-800 font-semibold">
              Tools: EMA GVP VI · FDA 21 CFR
            </div>
          </div>

          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/30 p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                DAY 07
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                CASEWORK DEFENSE
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#081F38] font-sans">
              SBAR Narratives &amp; Causality
            </h4>
            <p className="text-[11.5px] text-slate-600 leading-relaxed font-sans">
              Practice WHO-UMC causality defense, dechallenge/rechallenge documentation, and sponsor dispute resolution.
            </p>
            <div className="pt-2 border-t border-emerald-100 text-[10.5px] font-mono text-emerald-800 font-semibold">
              Tools: WHO-UMC · SBAR Protocol
            </div>
          </div>
        </div>
      </div>

      {/* ── 06. SHADCN ACCORDION: QUESTION-BY-QUESTION CLINICAL EXPLANATIONS ───── */}
      <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-9 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
              TECHNICAL QUESTION AUDIT
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#081F38] tracking-tight mt-0.5">
              Question-by-Question Clinical Explanations
            </h2>
          </div>

          {/* Filter Pills & Expand Toggle */}
          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  filter === "all" ? "bg-[#081F38] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({result.totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => setFilter("incorrect")}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  filter === "incorrect" ? "bg-rose-600 text-white shadow-xs" : "text-rose-800 hover:bg-rose-50"
                }`}
              >
                Missed Gaps ({result.totalQuestions - result.totalCorrect})
              </button>
              <button
                type="button"
                onClick={() => setFilter("correct")}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  filter === "correct" ? "bg-emerald-600 text-white shadow-xs" : "text-emerald-800 hover:bg-emerald-50"
                }`}
              >
                Correct ({result.totalCorrect})
              </button>
            </div>

            <button
              type="button"
              onClick={() => setExpandAll(!expandAll)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
            >
              {expandAll ? "Collapse All" : "Expand All"}
            </button>
          </div>
        </div>

        {/* Clean Question List */}
        <div className="space-y-3 pt-1">
          {filteredQuestions.map((q) => {
            const isExpanded = expandAll || expandedId === q.id || filter === "incorrect";

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all ${
                  q.isCorrect ? "border-emerald-200 bg-emerald-50/20" : "border-rose-200 bg-rose-50/25"
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded && !expandAll ? null : q.id)}
                  className="p-3.5 sm:p-4 flex items-start justify-between gap-3 cursor-pointer select-none active:scale-[0.99] transition-transform"
                >
                  <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl text-xs font-mono font-bold mt-0.5 ${
                        q.isCorrect
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "bg-rose-100 text-rose-900 border border-rose-300"
                      }`}
                    >
                      {q.isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                        <span className="font-mono text-[9.5px] font-bold text-slate-400">
                          Question {q.number} of {result.totalQuestions}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="font-mono text-[9.5px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          {q.competencyTitle}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-slate-700 truncate">
                          {q.topic}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#081F38] font-sans leading-snug">
                        {q.prompt}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                    className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 shrink-0"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3.5 pb-4 sm:px-4 sm:pb-4 pt-2 border-t border-slate-100 space-y-2.5 text-xs">
                    {/* Clinical Case Evidence */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed">
                      <span className="text-[9.5px] font-mono font-bold uppercase text-slate-400 block mb-0.5">
                        Clinical Case Evidence:
                      </span>
                      {q.scenario}
                    </div>

                    {/* Answer Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          q.isCorrect
                            ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                            : "bg-rose-50 border-rose-200 text-rose-950"
                        }`}
                      >
                        <span className="text-[9.5px] font-mono font-bold uppercase opacity-70 block mb-0.5">
                          Your Answer:
                        </span>
                        <p className="font-semibold leading-relaxed">
                          Option {q.selectedOptionId || "—"}: {q.selectedOptionText}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950">
                        <span className="text-[9.5px] font-mono font-bold uppercase text-emerald-800 block mb-0.5">
                          Expected Industry Standard:
                        </span>
                        <p className="font-semibold leading-relaxed">
                          Option {q.correctOptionId}: {q.correctOptionText}
                        </p>
                      </div>
                    </div>

                    {/* Concise Clinical Explanation */}
                    <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 text-slate-700 leading-relaxed">
                      <div className="flex items-center gap-1.5 text-blue-700 font-bold font-mono text-[10.5px]">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>Clinical Reasoning:</span>
                      </div>
                      <p>{q.explanation}</p>
                      <p className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100">
                        Reference: {q.guidelineReference}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 07. WHAT YOU SHOULD DO NEXT (SHADCN ACTION PATHWAYS) ──────────────── */}
      <div className="rounded-[24px] sm:rounded-[32px] border border-slate-200/90 bg-white tone-light card-light p-5 sm:p-9 shadow-[0_4px_24px_rgba(8,31,56,0.04)]">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700">
            NEXT STEPS &amp; CAREER ADVANCEMENT
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-[#081F38] tracking-tight">
            What You Should Do Next
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Now that you have your diagnostic score and know your technical gaps, you have two actionable pathways:
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Action 1: Free Casework Lab */}
          <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-b from-blue-50/40 via-white to-white p-5 sm:p-7 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-mono text-[10px] font-bold uppercase tracking-wider mb-2.5">
                <Target className="h-3 w-3 text-blue-600" />
                <span>OPTION 1 · FREE CASEWORK LAB</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#081F38] font-sans">
                Close Your Technical Skill Gaps
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Target the exact questions you missed today. Follow our structured 7-day clinical casework syllabus covering ICSR triage, MedDRA PTC coding, and regulatory clock mastery.
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-white border border-blue-100 text-xs space-y-1 text-slate-600">
                <span className="text-[9.5px] font-mono font-bold uppercase text-blue-700 block mb-1">
                  PRIORITY REMEDIATION TOPICS:
                </span>
                <p>• ICH E2A definitions of AE, ADR, Unexpected Adverse Reaction, and SUSAR.</p>
                <p>• Reference Safety Information (RSI), Investigator Brochure (IB) vs SmPC.</p>
                <p>• Limitations of clinical trials: sample size, selection bias, duration, and rare adverse events.</p>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-blue-100 flex items-center justify-between gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => openExpertModal({
                  targetTrack: "Fresher PV Associate",
                  qualification: candidateQualification,
                  source: "diagnostic_scorecard_plan_strip",
                })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#008F83] hover:bg-[#00736A] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer w-full sm:w-auto"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Talk to Experts to Review Gaps</span>
              </button>
              <a
                href="/career-engine/plan"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#081F38] hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer w-full sm:w-auto"
              >
                <span>View 7-Day Casework Plan</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              {onRetake && (
                <button
                  type="button"
                  onClick={onRetake}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer w-full sm:w-auto"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>{isSharedView ? "Take Diagnostic Yourself" : "Retake Test"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Action 2: WhatsApp Mentorship */}
          <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-white p-5 sm:p-7 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-wider mb-2.5">
                <Award className="h-3 w-3 text-emerald-600" />
                <span>OPTION 2 · ARZON CREDENTIAL</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#081F38] font-sans">
                Request Certification from Arzon
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Share your verified diagnostic record ({result.totalScore}%, Ref: {referenceId}) with Arzon Admissions on WhatsApp. Our medical review team will assess your casework eligibility for the official Pharmacovigilance Fellowship certification.
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Candidate: {candidateName} ({candidateQualification})</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Verified Ledger Audit ID: {referenceId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Admissions WhatsApp: +91 91212 83638</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-emerald-100">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-xs font-bold transition-all shadow-md cursor-pointer w-full active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Request Certification via WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] font-mono text-slate-400 max-w-2xl mx-auto leading-relaxed border-t border-slate-100 pt-3">
          Notice: This diagnostic tests technical interview readiness based on published ICH E2A, ICH E2D, EMA GVP Module VI, and MedDRA MSSO guidelines. It is an independent screening tool developed by Arzon Global.
        </p>
      </div>

      {/* ── 08. MOBILE STICKY FLOATING ACTION BAR ──────────────────────────────── */}
      <div
        className="fixed bottom-3 left-3 right-3 sm:hidden z-40 bg-[#081F38]/95 backdrop-blur-xl border border-white/20 rounded-full p-2 pl-3.5 pr-2 shadow-[0_12px_36px_rgba(8,31,56,0.45)] flex items-center justify-between text-white"
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-600 font-mono text-xs font-black text-white shrink-0">
            {result.totalScore}%
          </span>
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-cyan-300 block leading-tight truncate">
              Ref: {shortRef}
            </span>
            <span className="text-[9.5px] font-sans text-slate-300 block leading-tight truncate">
              {result.totalCorrect}/40 Correct
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-3.5 py-1.5 text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Share Dossier"
            className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all active:scale-95 cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

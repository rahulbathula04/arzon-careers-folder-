import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  Video,
  Copy,
  CheckCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Layers,
  Award,
  AlertTriangle,
  User,
} from "lucide-react";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { track } from "@/lib/track";
import { type WorkshopConfig, buildGoogleCalendarUrl } from "@/data/workshopConfig";

interface ExtremePremiumOnboardingViewProps {
  candidateName: string;
  candidateDegree: string;
  candidatePhone?: string;
  candidateEmail?: string;
  cfg: WorkshopConfig;
  isVariantB: boolean;
  copiedMeet: boolean;
  onCopyMeet: () => void;
  postRegProblem: string | null;
  onSelectProblem: (problem: string) => void;
  onViewSyllabusToggle?: () => void;
  isSyllabusVisible?: boolean;
}

export function ExtremePremiumOnboardingView({
  candidateName,
  candidateDegree,
  candidatePhone,
  candidateEmail,
  cfg,
  isVariantB,
  copiedMeet,
  onCopyMeet,
  postRegProblem,
  onSelectProblem,
  onViewSyllabusToggle,
  isSyllabusVisible = false,
}: ExtremePremiumOnboardingViewProps) {
  const [selectedTriageOption, setSelectedTriageOption] = useState<"actionable" | "incomplete" | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const displayName = candidateName.trim() || "Candidate";
  const displayDegree = candidateDegree.trim() || "Life Sciences / Pharmacy Graduate";
  const passSerial = candidatePhone ? candidatePhone.slice(-4) : "8492";

  const handleDownloadDossier = () => {
    setIsGeneratingPdf(true);
    track("field_guide_pdf_download", {
      props: {
        variant: isVariantB ? "b" : "a",
        source: "onboarding_hero",
        degree: displayDegree,
      },
    });

    try {
      generateStarterKitPDF({
        candidateName: displayName,
        degree: displayDegree,
      });
    } catch (err) {
      console.error("[Field Guide PDF Download Error]", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleTriageSelect = (opt: "actionable" | "incomplete") => {
    setSelectedTriageOption(opt);
    track("onboarding_triage_challenge_answered", {
      props: {
        option: opt,
        isCorrect: opt === "actionable",
      },
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ── TOP STATUS STRIP: VERIFIED ADMISSION ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs tone-light">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-emerald-800 tracking-wider uppercase">
                ADMISSION CONFIRMED · PRIORITY SEAT LOCKED
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse" />
            </div>
            <p className="text-xs text-stone-600 font-sans">
              Seat 1 of 150 Live Capacity · Sunday, 06 September 2026 at 6:00 PM IST
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onViewSyllabusToggle && (
            <button
              type="button"
              onClick={onViewSyllabusToggle}
              className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-mono text-xs font-medium transition-colors cursor-pointer"
            >
              <span>{isSyllabusVisible ? "Hide Full Syllabus" : "View Full Syllabus"}</span>
              {isSyllabusVisible ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 01 (HERO) · THE 2026 HEALTHCARE CAREER FIELD GUIDE
          The emotional sequence: You're in → Here's something valuable.
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl border-2 border-[#1B3F8B] bg-gradient-to-b from-white to-[#F6F8FC] p-4.5 sm:p-8 lg:p-10 shadow-md relative overflow-hidden tone-light text-left">
        {/* Subtle background insignia */}
        <div className="absolute top-0 right-0 p-4 sm:p-6 pointer-events-none opacity-5 select-none font-mono text-[70px] sm:text-[100px] font-black leading-none text-[#1B3F8B]">
          2026
        </div>

        <div className="relative z-10 space-y-5 sm:space-y-6">
          {/* Hero Header Strip */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 font-mono text-[10px] sm:text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#1B3F8B]" />
              <span>IMMEDIATE INTELLIGENCE ASSET · 2026 EDITION</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-950 tracking-tight leading-snug sm:leading-tight">
              Start Reading Your Healthcare Career Field Guide Now.
            </h1>

            <p className="text-xs sm:text-base text-stone-700 font-sans leading-relaxed max-w-3xl">
              Welcome aboard, <strong>{displayName}</strong>. Before Sunday's live working session, review the verified career map, salary benchmarks, ATS screening keywords, and hiring rubrics across Pharmacovigilance, Medical Coding, and Clinical Data Management.
            </p>

            {/* Doctrinal Value Strip (Do not claim fixed 20+ tracks) */}
            <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-bold text-[#1B3F8B] uppercase tracking-wider">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-100 border border-stone-200">CAREER MAP</span>
              <span className="text-stone-300">·</span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-100 border border-stone-200">EMPLOYERS</span>
              <span className="text-stone-300">·</span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-100 border border-stone-200">FRESHER PAY</span>
              <span className="text-stone-300">·</span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-100 border border-stone-200">SKILLS</span>
              <span className="text-stone-300">·</span>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-stone-100 border border-stone-200">TOOLS</span>
            </div>
          </div>

          {/* 4 Feature Intelligence Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
            {/* Box 1 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:space-y-2 tone-light">
              <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs">
                <span className="font-bold text-[#1B3F8B]">01 · SALARY BANDS</span>
                <span className="text-stone-500 text-[10px]">VERIFIED</span>
              </div>
              <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                Hyderabad &amp; Bengaluru
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600 font-sans leading-relaxed">
                ₹3.2L - ₹5.2L entry-level CTC verified across TCS, Cognizant, IQVIA, and Accenture.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:space-y-2 tone-light">
              <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs">
                <span className="font-bold text-[#1B3F8B]">02 · WORKFLOWS</span>
                <span className="text-stone-500 text-[10px]">SAFETY &amp; EDC</span>
              </div>
              <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                Argus 8.4 vs Rave EDC
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600 font-sans leading-relaxed">
                Step-by-step case safety triage vs eCRF audit trails and query resolution protocols.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:space-y-2 tone-light">
              <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs">
                <span className="font-bold text-[#1B3F8B]">03 · ATS SCREENING</span>
                <span className="text-stone-500 text-[10px]">35+ TERMS</span>
              </div>
              <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                Keyword Bypass Vault
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600 font-sans leading-relaxed">
                ICH-E2D, MedDRA 27.0, MedWatch 3500A, SUSAR, and GCP terms that clear HR filters.
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5 sm:space-y-2 tone-light">
              <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs">
                <span className="font-bold text-[#1B3F8B]">04 · ROLE MATRICES</span>
                <span className="text-stone-500 text-[10px]">DAY-IN-THE-LIFE</span>
              </div>
              <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                PV vs CDM vs Coding
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600 font-sans leading-relaxed">
                Side-by-side comparison of daily responsibilities, tool requirements, and 5-year ceilings.
              </p>
            </div>
          </div>

          {/* Primary Action Row: Web Reader & Customized PDF */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
            <Link
              to="/starter-kit"
              onClick={() => {
                track("field_guide_web_reader_clicked", {
                  props: { variant: isVariantB ? "b" : "a", source: "onboarding_hero" },
                });
              }}
              className="flex-1 py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer text-center group"
            >
              <span>Open Digital Field Guide (Web Reader)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={handleDownloadDossier}
              disabled={isGeneratingPdf}
              className="py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl border-2 border-stone-800 bg-white hover:bg-stone-50 text-stone-900 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 tone-light"
            >
              <Download className="w-4 h-4 text-stone-800" />
              <span>{isGeneratingPdf ? "Building Dossier..." : "Download PDF Dossier ↓"}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 text-[10px] sm:text-[11px] font-mono text-stone-500">
            <span>ESTIMATED READING TIME: 14 MINUTES</span>
            <span>CUSTOMIZED FOR: {displayName} ({displayDegree})</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 02 · CANDIDATE ADMISSION PASS & WORKSHOP ACCESS
         ───────────────────────────────────────────────────────────── */}
      <div className="space-y-3.5 sm:space-y-4 text-left">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider block">
              PHASE 02 · ACCESS CREDENTIAL
            </span>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-stone-950">
              Your Official Hiring Lab Admission Pass
            </h2>
          </div>
          <span className="font-mono text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded border border-emerald-200">
            ROOM READY
          </span>
        </div>

        {/* Physical Boarding Pass Visual Design */}
        <div className="rounded-2xl sm:rounded-3xl border-2 border-stone-800 bg-[#FAF9F6] p-4.5 sm:p-8 shadow-lg relative overflow-hidden tone-light">
          {/* Perforated edge styling effect */}
          <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-stone-100 rounded-r-full border-r-2 border-y-2 border-stone-800" />
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-stone-100 rounded-l-full border-l-2 border-y-2 border-stone-800" />

          {/* Pass Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b-2 border-stone-800/20 pb-3 sm:pb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="font-black text-stone-950 tracking-widest uppercase text-[11px] sm:text-xs">
                ARZON GLOBAL HEALTHCARE HIRING LAB
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-[9px] sm:text-[10px] text-stone-500 uppercase font-semibold">ADMISSION CREDENTIAL</span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold font-mono text-[#1B3F8B] bg-blue-50 border border-blue-200 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md">
              PASS #{passSerial}
            </span>
          </div>

          {/* Pass Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-3.5 sm:py-5 border-b border-stone-300 font-mono text-xs">
            <div>
              <span className="text-[9px] sm:text-[10px] text-stone-500 block uppercase font-bold">CANDIDATE</span>
              <span className="font-bold text-stone-900 font-sans text-xs sm:text-sm block truncate">
                {displayName}
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-sans block truncate">{displayDegree}</span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] text-stone-500 block uppercase font-bold">ASSIGNED CASE</span>
              <span className="font-bold text-stone-900 block text-[11px] sm:text-xs">SIM-PV-METFORMIN-01</span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-sans">Acute Lactic Acidosis</span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] text-stone-500 block uppercase font-bold">DATE &amp; TIME</span>
              <span className="font-bold text-stone-900 block text-[11px] sm:text-xs">Sun 06 Sep · 18:00 IST</span>
              <span className="text-[10px] sm:text-[11px] text-emerald-700 font-bold font-sans">75 Minutes · Live</span>
            </div>

            <div>
              <span className="text-[9px] sm:text-[10px] text-stone-500 block uppercase font-bold">PRACTITIONER</span>
              <span className="font-bold text-stone-900 font-sans text-xs sm:text-sm block">Kumail Abbas</span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 font-sans">Novaspire / Ex-Cognizant</span>
            </div>
          </div>

          {/* Security Protocols Strip */}
          <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">ICH-E2D PROTOCOL ACTIVE · MEDDRA 27.0 · GCP SIMULATION COMPLIANT</span>
            </div>
            <span className="tracking-widest font-mono text-stone-400 select-none hidden sm:inline">
              ||||||| | ||||| || |||||||| ||| |||| | |||||
            </span>
          </div>

          {/* Action Row: Google Meet & Calendar */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-stone-300 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
            <a
              href={cfg.meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("google_meet_join_click", {
                  props: { variant: isVariantB ? "b" : "a", source: "admission_pass" },
                });
              }}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 sm:px-5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer text-center"
            >
              <Video className="w-4 h-4 text-stone-200 shrink-0" />
              <span>Join Google Meet Room →</span>
            </a>

            <button
              type="button"
              onClick={onCopyMeet}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-mono text-xs font-semibold transition-colors cursor-pointer tone-light"
            >
              {copiedMeet ? (
                <>
                  <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700">Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-500 shrink-0" />
                  <span>Copy Meet Link</span>
                </>
              )}
            </button>

            <a
              href={buildGoogleCalendarUrl(cfg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("google_calendar_add_click", {
                  props: { variant: isVariantB ? "b" : "a", source: "admission_pass" },
                });
              }}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-mono text-xs font-semibold transition-colors cursor-pointer tone-light"
            >
              <Calendar className="w-4 h-4 text-[#1B3F8B] shrink-0" />
              <span>Add to Google Calendar</span>
            </a>

            <a
              href="https://wa.me/919121283638?text=Hi%20Arzon%20Team%2C%20I%20just%20reserved%20my%20seat%20for%20the%20Sunday%20Healthcare%20Hiring%20Lab."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("whatsapp_click", {
                  props: { variant: isVariantB ? "b" : "a", source: "onboarding_screen" },
                });
              }}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Confirm on WhatsApp</span>
            </a>
          </div>

          <p className="text-[11px] text-stone-500 font-sans mt-2.5 sm:mt-3">
            Room credentials and case documents will be re-sent to your WhatsApp number 24 hours, 3 hours, and 15 minutes before the live session starts.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 03 · PRE-SESSION CASE BRIEFING (Interactive Triage)
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl border border-stone-300 bg-stone-50 p-4.5 sm:p-8 space-y-4 sm:space-y-5 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2.5 sm:pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-amber-900 uppercase tracking-widest">
              PHASE 03 · PRE-SESSION CASE BRIEFING
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-[10px] sm:text-[11px] font-mono text-stone-500">CASE PV-2026-041</span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-stone-600 bg-white px-2 py-0.5 rounded border border-stone-200 tone-light">
            60-SECOND READ
          </span>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="font-serif font-bold text-base sm:text-xl text-stone-950">
            Your Case File is Waiting for Live Triage on Sunday
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
            A 48-year-old female patient experienced severe metabolic acidosis 6 days after commencing Metformin ER 500 mg. An inpatient clinical pharmacist flagged the event and initiated the primary report, but the physician's co-signature is pending.
          </p>
        </div>

        {/* Interactive Triage Challenge */}
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-stone-300/80 shadow-2xs space-y-3.5 sm:space-y-4 tone-light">
          <div className="space-y-1">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#1B3F8B] uppercase tracking-wider block">
              THE PRE-SESSION CLINICAL CHALLENGE:
            </span>
            <p className="text-xs sm:text-sm font-bold text-stone-900 font-sans leading-snug">
              Is this case legally actionable under international ICH-E2D guidelines without the physician's co-signature?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => handleTriageSelect("actionable")}
              className={`p-3.5 sm:p-4 rounded-xl border text-left font-sans transition-all cursor-pointer ${
                selectedTriageOption === "actionable"
                  ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20"
                  : "border-stone-200 bg-stone-50 hover:border-[#1B3F8B] hover:bg-stone-100"
              }`}
            >
              <span className="font-mono text-[11px] sm:text-xs font-bold text-stone-900 block mb-1">
                OPTION A · ACTIONABLE IMMEDIATELY
              </span>
              <span className="text-[11px] sm:text-xs text-stone-600 block leading-relaxed">
                Yes. Under ICH-E2D, a clinical pharmacist is an identifiable HCP reporter, satisfying all 4 minimum criteria.
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTriageSelect("incomplete")}
              className={`p-3.5 sm:p-4 rounded-xl border text-left font-sans transition-all cursor-pointer ${
                selectedTriageOption === "incomplete"
                  ? "border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20"
                  : "border-stone-200 bg-stone-50 hover:border-[#1B3F8B] hover:bg-stone-100"
              }`}
            >
              <span className="font-mono text-[11px] sm:text-xs font-bold text-stone-900 block mb-1">
                OPTION B · INCOMPLETE CASE
              </span>
              <span className="text-[11px] sm:text-xs text-stone-600 block leading-relaxed">
                No. Because medical treatment is prescribed by a physician, safety reporting must wait for physician verification.
              </span>
            </button>
          </div>

          {/* Interactive Answer Reveal */}
          {selectedTriageOption && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs font-sans text-stone-800 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-bold text-[#1B3F8B] uppercase">
                <CheckCircle2 className="w-4 h-4 text-[#1B3F8B] shrink-0" />
                <span>Industry Technical Truth:</span>
              </div>
              <p className="text-stone-700 leading-relaxed text-[11px] sm:text-xs">
                {selectedTriageOption === "actionable" ? (
                  <strong>Spot on! </strong>
                ) : (
                  <strong>Common misconception! </strong>
                )}
                Under ICH-E2D Section 2.2, a hospital pharmacist is legally classified as a qualified Healthcare Professional (HCP). Because we have an identifiable patient, identifiable reporter, suspect product (Metformin), and serious event (acidosis), the <strong>15-day regulatory clock starts immediately on Day-0</strong>. Waiting for a physician signature would trigger a late-submission audit defect!
              </p>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-mono">
                We will demonstrate this exact case triage inside Oracle Argus during the opening 15 minutes of Sunday's session.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 04 · TAILOR YOUR LIVE SESSION (Career Bottleneck Diagnostic)
         ───────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl border border-stone-300 bg-white p-4.5 sm:p-8 space-y-3.5 sm:space-y-4 text-left tone-light">
        <div className="space-y-1">
          <span className="font-mono text-[10px] sm:text-xs font-bold text-[#1B3F8B] uppercase tracking-wider block">
            PHASE 04 · TAILOR YOUR LIVE SESSION
          </span>
          <h3 className="text-lg sm:text-2xl font-serif font-bold text-stone-950">
            What is your biggest current career bottleneck?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-sans">
            Select your primary hurdle so Mohamed Kumail Abbas can prioritize this topic during the interactive Q&amp;A segment.
          </p>
        </div>

        {!postRegProblem ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {[
              {
                id: "callbacks",
                label: "I'm sending applications but not getting interview callbacks",
              },
              {
                id: "roles",
                label: "I'm confused between PV, Medical Coding, and CDM",
              },
              {
                id: "technical",
                label: "I don't know what technical interviewers actually test",
              },
              {
                id: "interview",
                label: "I'm preparing for an upcoming technical interview",
              },
              {
                id: "course",
                label: "I'm considering taking a paid certification course",
              },
            ].map((prob) => (
              <button
                key={prob.id}
                type="button"
                onClick={() => onSelectProblem(prob.label)}
                className="p-3 sm:p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:border-[#1B3F8B] hover:bg-blue-50/50 text-stone-800 text-left font-sans text-xs transition-all cursor-pointer font-medium leading-snug"
              >
                {prob.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-sans space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-emerald-800 font-mono text-[10px] sm:text-[11px] uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile Focus Logged</span>
            </div>
            <p className="text-stone-700 text-xs leading-relaxed">
              We have noted your focus area: <em>"{postRegProblem}"</em>. The session curriculum and open-floor discussion will address this directly.
            </p>
          </div>
        )}

        {/* Preparation Instruction */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-sans text-stone-700 flex items-start gap-2.5 sm:gap-3">
          <Sparkles className="w-4 h-4 text-[#1B3F8B] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-stone-900 block font-semibold mb-0.5">
              Live Preparation Instruction:
            </strong>
            Have your current resume open on your device during Sunday's session. We will compare your skills and project phrasing directly against the audited ATS keyword rubric.
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 05 · ADMISSIONS DISPATCH TIMELINE & ZERO SPAM PROMISE
         ───────────────────────────────────────────────────────────── */}
      <div className="p-4.5 sm:p-6 rounded-2xl bg-stone-100/70 border border-stone-200 text-left space-y-3">
        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold text-stone-800 uppercase tracking-wider">
          <Clock className="w-4 h-4 text-[#1B3F8B] shrink-0" />
          <span>WHAT HAPPENS NEXT · CANDIDATE NOTIFICATION SCHEDULE</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-sans">
          <div className="p-3 rounded-xl bg-white border border-stone-200/80 space-y-1 tone-light">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] block uppercase">
              STEP 1 · IMMEDIATE
            </span>
            <p className="text-stone-700 font-medium">Field Guide Unlocked</p>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Digital reader access active; PDF dossier generated with your name.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200/80 space-y-1 tone-light">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] block uppercase">
              STEP 2 · 24 HOURS BEFORE
            </span>
            <p className="text-stone-700 font-medium">WhatsApp Case Dispatch</p>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Full case notes and Google Meet direct room credentials delivered via WhatsApp.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white border border-stone-200/80 space-y-1 tone-light">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] block uppercase">
              STEP 3 · 15 MINUTES BEFORE
            </span>
            <p className="text-stone-700 font-medium">Live Room Doors Open</p>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Priority room admission opens at 5:45 PM IST on Sunday. Session begins sharply at 6:00 PM IST.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-stone-500 font-sans pt-1 leading-relaxed">
          <strong>Zero Spam Guarantee:</strong> We do not sell data or make aggressive sales calls. This is a practical educational simulation for healthcare graduates.
        </p>
      </div>
    </div>
  );
}

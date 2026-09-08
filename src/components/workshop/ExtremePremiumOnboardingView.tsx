import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Download,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  Building2,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { track } from "@/lib/track";
import { type WorkshopConfig } from "@/data/workshopConfig";

interface ExtremePremiumOnboardingViewProps {
  candidateName: string;
  candidateDegree: string;
  candidateCollege?: string;
  candidateBranch?: string;
  candidatePhone?: string;
  candidateEmail?: string;
  cfg: WorkshopConfig;
  isVariantB?: boolean;
  copiedMeet?: boolean;
  onCopyMeet?: () => void;
  postRegProblem?: string | null;
  onSelectProblem?: (problem: string) => void;
  onViewSyllabusToggle?: () => void;
  isSyllabusVisible?: boolean;
}

export function ExtremePremiumOnboardingView({
  candidateName,
  candidateDegree,
  candidateCollege,
  candidateBranch,
  candidatePhone,
  candidateEmail,
  isVariantB = false,
}: ExtremePremiumOnboardingViewProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const displayName = candidateName.trim() || "Candidate";
  const displayDegree = candidateDegree.trim() || "Healthcare Graduate";
  const displayCollege = candidateCollege?.trim() || "College of Pharmacy / Life Sciences";
  const displayBranch = candidateBranch?.trim() || "Pharmacology / Clinical Research";
  const passSerial = candidatePhone ? candidatePhone.slice(-4) : "8492";
  const passId = `ARZ-2026-${passSerial}`;

  const handleDownloadDossier = () => {
    setIsGeneratingPdf(true);
    track("field_guide_pdf_download", {
      props: {
        variant: isVariantB ? "b" : "a",
        source: "minimal_onboarding",
        degree: displayDegree,
        college: displayCollege,
        branch: displayBranch,
      },
    });

    try {
      generateStarterKitPDF({
        candidateName: displayName,
        degree: displayDegree,
        college: displayCollege,
        branch: displayBranch,
      });
    } catch (err) {
      console.error("[Field Guide PDF Download Error]", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Arzon Team, I am ${displayName} (${displayDegree}, ${displayCollege}). I have confirmed my seat (${passId}) for the Friday 11 Sep Healthcare Career Masterclass.`
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 sm:space-y-10 animate-in fade-in duration-300 text-left">
      {/* ── 01. EXECUTIVE BOARDING PASS ── */}
      <div className="relative rounded-2xl sm:rounded-3xl border-2 border-stone-900 bg-[#FAF9F6] shadow-xl overflow-hidden tone-light">
        {/* Pass Perforations (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-stone-100 rounded-r-full border-r-2 border-y-2 border-stone-900"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-stone-100 rounded-l-full border-l-2 border-y-2 border-stone-900"
        />

        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b-2 border-stone-900/15 bg-white tone-light">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-900">
              ARZON EXECUTIVE ADMISSION · SEAT ALLOCATED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#1B3F8B] bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
              PASS #{passId}
            </span>
          </div>
        </div>

        {/* Main Pass Content */}
        <div className="p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          {/* Candidate Primary Identity */}
          <div className="space-y-2 border-b border-stone-300/80 pb-6">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-stone-500 uppercase tracking-wider block">
              ADMITTED CANDIDATE
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-950 tracking-tight leading-tight">
              {displayName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-1.5 font-medium">
                <GraduationCap className="w-4 h-4 text-[#1B3F8B] shrink-0" />
                <span>
                  {displayDegree}
                  {displayBranch ? ` · ${displayBranch}` : ""}
                </span>
              </div>

              {displayCollege && (
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Building2 className="w-4 h-4 text-stone-400 shrink-0" />
                  <span className="truncate max-w-md">{displayCollege}</span>
                </div>
              )}
            </div>
          </div>

          {/* Session Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 font-mono text-xs border-b border-stone-300/80 pb-6">
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1 tone-light">
              <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">
                DATE &amp; TIME
              </span>
              <p className="font-sans font-bold text-stone-950 text-sm">
                Friday, 11 Sep 2026
              </p>
              <p className="text-[11px] text-[#1B3F8B] font-semibold">
                6:00 PM – 7:15 PM IST
              </p>
              <span className="inline-block text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-1">
                75 Min Live Masterclass
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1 tone-light">
              <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">
                ASSIGNED CLINICAL PROTOCOL
              </span>
              <p className="font-sans font-bold text-stone-950 text-sm">
                Case PV-2026-041
              </p>
              <p className="text-[11px] text-stone-600">
                Metformin Lactic Acidosis
              </p>
              <span className="inline-block text-[10px] text-stone-700 font-medium bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 mt-1">
                ICH-E2D &amp; MedDRA 27.0
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1 tone-light">
              <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">
                FACULTY &amp; PLATFORM
              </span>
              <p className="font-sans font-bold text-stone-950 text-sm">
                Mohamed Kumail Abbas
              </p>
              <p className="text-[11px] text-stone-600">
                Ex-Cognizant PV Lead
              </p>
              <span className="inline-block text-[10px] text-stone-700 font-medium bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 mt-1">
                Interactive Google Meet
              </span>
            </div>
          </div>

          {/* Security & Access Notice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-sans">
                Live Google Meet credentials will be delivered via WhatsApp 30 minutes prior to session kick-off.
              </span>
            </div>
            <div className="font-mono text-[10px] text-stone-400 select-none tracking-widest hidden sm:block">
              ||||| ||| ||||||| || ||||| |||| |||
            </div>
          </div>
        </div>
      </div>

      {/* ── 02. DIRECT PRIMARY ACTIONS (ZERO CLUTTER) ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {/* Action 1: Download Field Guide PDF */}
          <button
            type="button"
            onClick={handleDownloadDossier}
            disabled={isGeneratingPdf}
            className="flex-1 py-4 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer disabled:opacity-60 text-center"
          >
            <Download className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              {isGeneratingPdf ? "Building Dossier..." : "Download Field Guide PDF ↓"}
            </span>
          </button>

          {/* Action 2: WhatsApp Confirmation */}
          <a
            href={`https://wa.me/919121283638?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("whatsapp_click", {
                props: { variant: isVariantB ? "b" : "a", source: "minimal_onboarding" },
              });
            }}
            className="py-4 px-6 rounded-xl border border-emerald-400 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2.5 shadow-sm cursor-pointer text-center"
          >
            <Phone className="w-4 h-4 text-white shrink-0" />
            <span>Confirm on WhatsApp</span>
          </a>
        </div>

        {/* Tertiary Web Reader Link */}
        <div className="text-center sm:text-left pt-1">
          <Link
            to="/starter-kit"
            onClick={() => {
              track("field_guide_web_reader_clicked", {
                props: { variant: isVariantB ? "b" : "a", source: "minimal_onboarding_sublink" },
              });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-600 hover:text-[#1B3F8B] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>Or read the complete 2026 Healthcare Career Field Guide online</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
          </Link>
        </div>
      </div>

      {/* ── 03. CASE PV-2026-041 CLINICAL BRIEF & CHECKLIST ── */}
      <div className="rounded-2xl sm:rounded-3xl border border-stone-300 bg-white p-6 sm:p-8 space-y-5 shadow-xs tone-light">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#1B3F8B] shrink-0" />
            <span className="font-mono text-xs font-bold text-stone-900 uppercase tracking-wider">
              3-MINUTE PRE-SESSION CLINICAL BRIEFING · CASE PV-2026-041
            </span>
          </div>
          <span className="font-mono text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            MANDATORY READ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] block uppercase tracking-wider">
              01 · THE CLINICAL SCENARIO
            </span>
            <h3 className="font-bold text-stone-900 text-xs sm:text-sm">
              48yo Female · Severe Acidosis
            </h3>
            <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed">
              Arterial pH &lt; 7.25 and lactate 8.2 mmol/L recorded 6 days following an increase in Metformin ER to 1,000 mg BID.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] block uppercase tracking-wider">
              02 · THE REGULATORY RULE
            </span>
            <h3 className="font-bold text-stone-900 text-xs sm:text-sm">
              ICH-E2D Immediate Action
            </h3>
            <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed">
              Flagged by a clinical pharmacist. Under ICH-E2D Section 2.2, hospital pharmacists are qualified HCP reporters — 15-day clock begins Day-0 without physician signature.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] block uppercase tracking-wider">
              03 · CANDIDATE PREPARATION
            </span>
            <h3 className="font-bold text-stone-900 text-xs sm:text-sm">
              Keep Resume Ready
            </h3>
            <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed">
              Have your current CV or resume open on your device. We will audit your real CV bullets against industry ATS screening algorithms during the session.
            </p>
          </div>
        </div>

        {/* Zero Spam Commitment */}
        <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-stone-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            Arzon Zero-Spam Promise: No aggressive sales calls or third-party sharing. Pure clinical career intelligence.
          </span>
        </div>
      </div>
    </div>
  );
}

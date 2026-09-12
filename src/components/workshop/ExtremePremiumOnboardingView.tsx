import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Download,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Calendar,
  BookOpen,
  FileText,
  Building2,
  GraduationCap,
  ArrowRight,
  Clock,
  Video,
  Copy,
  Check,
} from "lucide-react";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import { generateWorkshopBrochurePDF } from "@/lib/workshop-brochure-pdf";
import { track } from "@/lib/track";
import { type WorkshopConfig, buildGoogleCalendarUrl } from "@/data/workshopConfig";

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
  cfg,
  isVariantB = false,
  copiedMeet = false,
  onCopyMeet,
}: ExtremePremiumOnboardingViewProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfDone, setPdfDone] = useState(false);
  const [meetCopied, setMeetCopied] = useState(copiedMeet);

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
        source: "onboarding_view",
        degree: displayDegree,
        college: displayCollege,
      },
    });

    try {
      generateWorkshopBrochurePDF({
        institutionName: displayCollege,
        recipientName: displayName,
        recipientTitle: `${displayDegree} Candidate · Seat #${passId}`,
      });
      setPdfDone(true);
      setTimeout(() => setPdfDone(false), 4000);
    } catch {
      try {
        generateStarterKitPDF({
          candidateName: displayName,
          degree: displayDegree,
          college: displayCollege,
          branch: displayBranch,
        });
        setPdfDone(true);
        setTimeout(() => setPdfDone(false), 4000);
      } catch (fallbackErr) {
        console.error("[Field Guide Download Error]", fallbackErr);
      }
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCopyMeetLink = () => {
    if (cfg?.meetUrl) {
      navigator.clipboard.writeText(cfg.meetUrl).catch(() => {});
    }
    setMeetCopied(true);
    onCopyMeet?.();
    setTimeout(() => setMeetCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Arzon Team, I am ${displayName} (${displayDegree}, ${displayCollege}). I have confirmed my seat (${passId}) for the ${cfg?.dateDisplay || "Saturday 19 Sep"} Healthcare Career Workshop.`
  );

  const calendarUrl = buildGoogleCalendarUrl(cfg);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-0 text-left animate-in fade-in duration-300">

      {/* ════════════════════════════════════════════════════════════
          ZONE 01 · CONFIRMED — Authoritative Access Signal
          ════════════════════════════════════════════════════════════ */}
      <div className="border-b border-stone-200 pb-8 mb-8 space-y-3">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-emerald-800">
            ACCESS CONFIRMED
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-black text-[var(--color-arzon-ink)] leading-tight tracking-tight">
          You're in.
        </h1>
        <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
          Your workshop seat is reserved for <strong className="text-[var(--color-arzon-ink)]">{cfg?.dateDisplay || "Saturday, 19 Sep 2026"} · {cfg?.timeDisplay || "6:00 PM IST"}</strong>.
          {" "}Room credentials will be delivered to your WhatsApp 30 minutes before start.
        </p>

        {/* Pass identifier */}
        <div className="flex items-center gap-3 pt-1">
          <span className="font-mono text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            Seat ID
          </span>
          <span className="font-mono text-xs font-bold text-[var(--color-medical-navy)] bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
            {passId}
          </span>
          <span className="font-mono text-[10px] text-stone-400">
            {displayName}
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          ZONE 02 · CAREER FIELD GUIDE — The Hero Dossier
          ════════════════════════════════════════════════════════════ */}
      <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-xs tone-light mb-6">
        {/* Dossier header strip */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
            <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
              Arzon Global · Career Intelligence Dossier · 2026 Edition
            </span>
          </div>
          <span className="font-mono text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase tracking-wider">
            Included
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Dossier description */}
          <div className="space-y-1.5">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-arzon-ink)] leading-tight">
              2026 Healthcare Career Field Guide
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg">
              Salary bands · CRO employer map · ATS-ready skill cheat sheets · Interview question bank · 
              MedDRA coding workflows · Career growth from Fresher → Senior Associate.
            </p>

            {/* Inline metadata tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Career Map", "CRO Employers", "Fresher Pay Bands", "Skills Matrix", "Tools Cheat Sheet"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9.5px] font-semibold text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons — Tier 1 + Tier 2 */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            {/* Tier 1: Primary */}
            <Link
              to="/starter-kit"
              onClick={() => track("field_guide_web_reader_clicked", { props: { variant: isVariantB ? "b" : "a", source: "onboarding_zone2" } })}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-arzon-ink)] hover:bg-[var(--color-medical-navy)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              <BookOpen className="w-4 h-4" />
              Open Field Guide →
            </Link>

            {/* Tier 2: Secondary */}
            <button
              type="button"
              id="field-guide-download-btn"
              onClick={handleDownloadDossier}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-900 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
            >
              {pdfDone ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  Downloaded ✓
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {isGeneratingPdf ? "Building..." : "Download PDF ↓"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          ZONE 03 · WORKSHOP ACCESS RECORD
          ════════════════════════════════════════════════════════════ */}
      <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-xs tone-light mb-6">
        <div className="px-5 sm:px-6 py-3.5 border-b border-stone-100 bg-stone-50 flex items-center gap-2">
          <Video className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            Workshop Access · B.Pharm Career Intelligence Working Session
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Session facts row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Date", value: cfg?.dateDisplay || "Saturday, 19 Sep 2026" },
              { label: "Time", value: cfg?.timeDisplay || "6:00 PM – 7:15 PM IST" },
              { label: "Duration", value: cfg?.durationDisplay || "75 Min" },
              { label: "Faculty", value: cfg?.speaker?.name || "Mohamed Kumail Abbas" },
            ].map((item) => (
              <div key={item.label} className="space-y-0.5">
                <span className="font-mono text-[9.5px] font-bold text-stone-400 uppercase tracking-widest block">
                  {item.label}
                </span>
                <span className="font-sans text-xs font-semibold text-[var(--color-arzon-ink)]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Join + Copy row */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Tier 2: JOIN */}
            <a
              href={cfg?.meetUrl || "https://meet.google.com/pyc-qvxs-quz"}
              target="_blank"
              rel="noopener noreferrer"
              id="join-meet-btn"
              onClick={() => track("meet_join_click", { props: { variant: isVariantB ? "b" : "a", source: "onboarding_zone3" } })}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-900 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Video className="w-4 h-4 text-[var(--color-medical-navy)]" />
              Join Google Meet →
            </a>

            {/* Tier 3: Copy */}
            <button
              type="button"
              id="copy-meet-link-btn"
              onClick={handleCopyMeetLink}
              className="sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-stone-200 bg-white tone-light text-stone-600 hover:text-stone-900 font-mono text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              {meetCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{meetCopied ? "Copied" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          ZONE 04 · NEXT STEPS
          ════════════════════════════════════════════════════════════ */}
      <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-xs tone-light mb-6">
        <div className="px-5 sm:px-6 py-3.5 border-b border-stone-100 bg-stone-50">
          <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
            Next Steps
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <ol className="space-y-4">
            {[
              {
                n: "01",
                title: "Read the Career Field Guide",
                desc: "Open the 2026 dossier above. It explains salary bands, CRO hiring cycles, and what the interview actually tests.",
              },
              {
                n: "02",
                title: "Join the live workshop",
                desc: `Join Google Meet on ${cfg?.dateDisplay || "Saturday, 19 Sep 2026"} at ${cfg?.timeDisplay?.split("–")[0]?.trim() || "6:00 PM IST"}. No download required — works on any phone or laptop.`,
              },
              {
                n: "03",
                title: "Bring your career questions",
                desc: "The last 15 minutes are open Q&A. Prepare one specific question about your degree, city, or career situation.",
              },
            ].map((step) => (
              <li key={step.n} className="flex items-start gap-4">
                <span className="font-mono text-[10.5px] font-bold text-stone-400 tracking-widest pt-0.5 shrink-0">
                  {step.n}
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-[var(--color-arzon-ink)]">
                    {step.title}
                  </p>
                  <p className="font-sans text-xs text-stone-500 leading-relaxed mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          ZONE 05 · QUIET OPERATIONS & UTILITIES
          ════════════════════════════════════════════════════════════ */}
      <div className="pt-2 pb-4 space-y-3 border-t border-stone-100">
        <span className="font-mono text-[9.5px] font-bold text-stone-400 uppercase tracking-widest block">
          Utilities
        </span>

        <div className="flex flex-wrap gap-3">
          {/* WhatsApp updates */}
          <a
            href={`https://wa.me/919121283638?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            id="whatsapp-updates-btn"
            onClick={() => track("whatsapp_click", { props: { variant: isVariantB ? "b" : "a", source: "onboarding_zone5" } })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 bg-white tone-light text-stone-700 hover:text-stone-900 hover:border-stone-300 font-mono text-[11px] font-medium uppercase tracking-wide transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            Connect WhatsApp
          </a>

          {/* Calendar sync */}
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="calendar-sync-btn"
            onClick={() => track("calendar_sync_click", { props: { variant: isVariantB ? "b" : "a", source: "onboarding_zone5" } })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 bg-white tone-light text-stone-700 hover:text-stone-900 hover:border-stone-300 font-mono text-[11px] font-medium uppercase tracking-wide transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
            Add to Calendar
          </a>
        </div>

        {/* Trust footer */}
        <div className="flex items-center gap-2 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-mono text-[10px] text-stone-400">
            Arzon Zero-Spam Promise · No aggressive sales calls · No third-party data sharing
          </span>
        </div>

        {/* Clinical Brief preview */}
        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
            <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
              3-Min Pre-Session Brief · Case PV-2026-041 · Recommended Read
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                n: "01", title: "Clinical Scenario",
                body: "48yo Female · pH < 7.25 · Lactate 8.2 mmol/L · Metformin ER 1000mg BID · Day 6 post-dose-increase."
              },
              {
                n: "02", title: "Regulatory Rule",
                body: "Under ICH-E2D §2.2, pharmacist reporters qualify as HCPs. 15-day regulatory clock starts Day-0 without physician sign-off."
              },
              {
                n: "03", title: "Your Prep",
                body: "Have your CV open. We audit real resume bullets against industry ATS algorithms live in the last segment."
              },
            ].map((card) => (
              <div key={card.n} className="space-y-1">
                <span className="font-mono text-[9.5px] font-bold text-[var(--color-medical-navy)] uppercase tracking-wider">
                  {card.n} · {card.title}
                </span>
                <p className="font-sans text-[11px] text-stone-600 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

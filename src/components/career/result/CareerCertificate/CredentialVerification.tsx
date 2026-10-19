import { useRef, useState, useEffect } from "react";
import {
  Award,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  FileText,
  MessageCircle,
  Download,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { CertificatePreview, type CertificateData } from "./CertificatePreview";
import { CertificateGenerator } from "./CertificateGenerator";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
  leadId?: string | null;
}

export function CredentialVerification({ result, candidateName: initialName, leadId }: Props) {
  const [candidateName, setCandidateName] = useState(initialName || "Candidate");
  const [resumeDrawerOpen, setResumeDrawerOpen] = useState(false);
  const [copiedBullet, setCopiedBullet] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Generate deterministic audit reference
  const rawId = leadId || result.resultMeta?.attemptId || "career-engine-report";
  const shortRef = Math.abs(
    rawId.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0),
  )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0")
    .slice(-8);
  const referenceId = `CE-REPORT-${new Date().getFullYear()}-${shortRef}`;

  const issueDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const recordData: CertificateData = {
    candidateName,
    candidateQualification: result.profile?.course ?? "Healthcare Graduate",
    candidateCollege: result.profile?.college || (result.profile?.stream ? `${result.profile.stream} Stream` : "Healthcare Institute"),
    archetypeName: result.archetype?.name ?? "Healthcare Career Match",
    fitScore: Math.max(0, Math.min(100, Math.round(result.fitScore))),
    referenceId,
    issueDate,
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "https://arzoncareers.in";
  const reportUrl = leadId && !leadId.startsWith("lead_local_")
    ? `${origin}/career-engine/result?id=${encodeURIComponent(leadId)}`
    : `${origin}/career-engine/result`;

  const resumeBullet = `• Arzon Verified Career Evaluation: Top Match: ${recordData.archetypeName} (${recordData.fitScore}% Fit Index, ACRI Ref: ${referenceId}). Verified ledger at: ${reportUrl}`;

  // 1. Share on LinkedIn
  const handleShareLinkedIn = () => {
    const text = `I just completed the Arzon Career Engine diagnostic. My top clinical career match is "${recordData.archetypeName}" with a ${recordData.fitScore}% verified fit index! Check my evaluation ledger here:`;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`;
    
    // Copy summary to clipboard so user can paste it into the post description
    navigator.clipboard.writeText(`${text} ${reportUrl}`);
    toast.success("Post text & verification link copied! Opening LinkedIn…");
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  // 2. Share with Friends on WhatsApp
  const handleShareWhatsApp = () => {
    const text = `Hey! I took the Arzon Career Engine diagnostic and matched as "${recordData.archetypeName}" with a ${recordData.fitScore}% fit score! What role matches your healthcare background? Take the test here: ${reportUrl}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  // 3. Copy ATS Resume Bullet
  const handleCopyResumeBullet = () => {
    navigator.clipboard.writeText(resumeBullet);
    setCopiedBullet(true);
    toast.success("ATS Resume bullet point copied to clipboard!");
    setTimeout(() => setCopiedBullet(false), 2500);
  };

  // 4. Copy Direct Verification Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(reportUrl);
    setCopiedLink(true);
    toast.success("Candidate verification link copied!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="assessment-record" className="space-y-6">
      <div className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-6 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]">
        {/* Header Bar */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 shadow-2xs flex items-center justify-center text-blue-600 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-blue-600 block">
                CAREER IDENTITY RESULT CARD · VERIFIED LEDGER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38]">
                Your Verified Career Result Card
              </h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200/90 bg-emerald-50/90 px-3.5 py-1 font-mono text-[11px] font-bold text-emerald-800 shadow-2xs sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Verified Evaluation Record</span>
          </span>
        </div>

        <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-slate-600 font-sans">
          Your official candidate result card demonstrates your primary career archetype, role-fit calibration index, and verified audit ledger reference. Share on LinkedIn, append directly to your resume, or share with friends.
        </p>

        {/* The Result Card Preview */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <div className="w-full max-w-[680px]">
            <CertificatePreview ref={cardRef} data={recordData} />
          </div>
        </div>

        {/* 4 Action Triggers: LinkedIn, Resume, WhatsApp, Download */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
          {/* 1. Share on LinkedIn */}
          <button
            type="button"
            onClick={handleShareLinkedIn}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0A66C2] hover:bg-[#004182] px-6 py-3 text-sm font-bold text-white shadow-sm transition active:scale-[0.98] cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>Share on LinkedIn</span>
          </button>

          {/* 2. Add to Resume */}
          <button
            type="button"
            onClick={() => setResumeDrawerOpen((prev) => !prev)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-800 shadow-2xs transition active:scale-[0.98] cursor-pointer"
          >
            <FileText className="h-4 w-4 text-blue-600" />
            <span>Add to Resume</span>
            {resumeDrawerOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
          </button>

          {/* 3. Share with Friends (WhatsApp) */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100/80 px-5 py-3 text-sm font-semibold text-emerald-800 shadow-2xs transition active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>Share with Friends</span>
          </button>

          {/* 4. Copy Verification Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition active:scale-[0.98] cursor-pointer"
            title="Copy direct verification link"
          >
            {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
            <span>{copiedLink ? "Link Copied" : "Copy Link"}</span>
          </button>
        </div>

        {/* Expandable "Add to Resume" Drawer */}
        {resumeDrawerOpen && (
          <div className="mt-6 rounded-2xl border border-blue-200/90 bg-blue-50/50 p-5 sm:p-6 text-slate-800 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-blue-800 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Resume Placement Kit · ATS Optimized</span>
            </div>
            <p className="mt-1 text-xs text-slate-600 font-sans">
              Copy this verified credential bullet into the <strong>Certifications &amp; Professional Diagnostics</strong> section of your resume:
            </p>

            <div className="mt-3 relative rounded-xl border border-slate-300 bg-white p-3.5 font-mono text-xs text-slate-800 shadow-2xs leading-relaxed">
              {resumeBullet}
            </div>

            <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleCopyResumeBullet}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition active:scale-95 cursor-pointer"
              >
                {copiedBullet ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedBullet ? "ATS Bullet Copied!" : "Copy ATS Resume Bullet"}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition active:scale-95 cursor-pointer"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copy Verification URL</span>
              </button>
            </div>
          </div>
        )}

        {/* PDF & Export Options Bar */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <CertificateGenerator
            data={recordData}
            certificateRef={cardRef}
            onUpdateName={(name) => setCandidateName(name)}
          />
        </div>

        {/* Verification Ledger Footnote */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200/70 bg-gradient-to-r from-emerald-50/80 via-emerald-50/40 to-white p-4 text-xs leading-5 text-emerald-950 shadow-2xs">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <p className="font-sans">
            Your unique Assessment Reference ID is officially recorded in the Arzon Candidate Verification Ledger. Employers and recruiter partners can verify your role calibration directly at <span className="font-mono font-bold">{reportUrl}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

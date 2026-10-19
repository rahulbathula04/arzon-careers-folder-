import { forwardRef } from "react";
import { ShieldCheck, Sparkles, CheckCircle2, QrCode, GraduationCap, Award } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export interface CertificateData {
  candidateName: string;
  candidateQualification?: string;
  candidateCollege?: string;
  archetypeName: string;
  fitScore: number;
  referenceId: string;
  issueDate: string;
  verificationUrl?: string;
}

interface Props {
  data: CertificateData;
  viewMode?: "card" | "certificate";
}

export const CertificatePreview = forwardRef<HTMLDivElement, Props>(({ data, viewMode = "card" }, ref) => {
  const verifyUrl = data.verificationUrl || `https://arzoncareers.in/verify?id=${encodeURIComponent(data.referenceId)}`;

  if (viewMode === "certificate") {
    // 🎓 Official Steve Jobs / Apple-Grade Executive Industry Certificate
    return (
      <div
        ref={ref}
        id="arzon-career-certificate"
        className="relative w-full max-w-[760px] mx-auto overflow-hidden rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200 shadow-2xl border border-stone-300 font-sans text-stone-900 select-none"
      >
        <div className="relative rounded-2xl border-4 border-double border-[#0C2340]/25 bg-gradient-to-b from-[#FCFBF8] via-[#FAF9F5] to-[#FCFBF8] p-6 sm:p-10 space-y-5 text-center shadow-inner overflow-hidden">
          {/* Subtle Watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
          >
            <span className="font-serif text-7xl sm:text-9xl font-black tracking-widest text-[#0C2340]">
              ARZON
            </span>
          </div>

          {/* Certificate Header Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-stone-300/80 pb-4">
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#081F38] text-white p-2 shadow-xs border border-stone-700">
                <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="font-serif font-black text-sm tracking-tight text-[#081F38] block leading-none">
                  ARZON GLOBAL
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#1557D6] font-extrabold block mt-0.5">
                  Executive Career Intelligence Division
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">AUDIT LEDGER REF</span>
              <span className="font-mono text-xs font-bold text-[#081F38] block">{data.referenceId}</span>
            </div>
          </div>

          {/* Certificate Title & Presentation */}
          <div className="relative z-10 space-y-2 pt-2">
            <span className="inline-block font-mono text-[10px] sm:text-xs font-black tracking-[0.22em] text-[#1557D6] uppercase">
              EXECUTIVE CERTIFICATE OF CALIBRATED ROLE READINESS
            </span>
            <p className="font-serif italic text-sm text-stone-600 font-medium">
              This official credential confirms that
            </p>
            <div className="py-1">
              <h3 className="font-serif text-2xl sm:text-4xl font-black text-[#081F38] tracking-tight border-b-2 border-amber-500/60 pb-1.5 inline-block px-4">
                {data.candidateName || "Candidate Name"}
              </h3>
            </div>
            <p className="text-xs text-stone-600 font-sans flex items-center justify-center gap-1.5 flex-wrap">
              <GraduationCap className="h-3.5 w-3.5 text-[#1557D6]" />
              <span className="font-medium text-stone-800">{data.candidateCollege || "Healthcare Institute"}</span>
              <span className="text-stone-400">·</span>
              <span className="font-mono text-stone-600">{data.candidateQualification || "Healthcare Graduate"}</span>
            </p>
          </div>

          {/* Core Alignment Citation */}
          <div className="relative z-10 max-w-xl mx-auto py-2">
            <p className="text-xs sm:text-[13px] text-stone-600 font-sans leading-relaxed">
              Has completed the multi-vector Arzon Career Engine diagnostic, demonstrating validated domain cognitive aptitude and certified industry calibration for:
            </p>
            <div className="mt-3 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/70 to-emerald-50 border border-blue-200/90 shadow-2xs">
              <Award className="h-5 w-5 text-[#1557D6] shrink-0" />
              <span className="font-serif text-base sm:text-lg font-bold text-[#081F38]">
                {data.archetypeName}
              </span>
              <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300/80">
                {data.fitScore}% Role Fit
              </span>
            </div>
          </div>

          {/* 4 Validated Competency Badges */}
          <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap pt-1">
            <span className="px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
              ✓ ICH-GVP Protocol Alignment
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
              ✓ Standardized Clinical Terminology
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
              ✓ Technical Triage Accuracy
            </span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold">
              ✓ 21 CFR Part 11 Audit Integrity
            </span>
          </div>

          {/* Signatures & Live Scannable QR Seal */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t border-stone-300/80">
            {/* Faculty & Mentor Signature */}
            <div className="space-y-1 text-left sm:text-center">
              <div className="font-serif italic text-base text-[#1557D6] font-bold leading-none select-none">
                Mohamed Kumail Abbas
              </div>
              <div className="w-32 h-0.5 bg-stone-300 sm:mx-auto mt-1" />
              <span className="text-[11px] font-bold text-stone-900 block font-sans">
                Mohamed Kumail Abbas
              </span>
              <span className="text-[10px] text-stone-500 font-sans block leading-tight">
                Manager, Pharmacovigilance<br />Ex-Accenture &amp; Cognizant
              </span>
            </div>

            {/* Live Scannable QR Verification Seal */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="p-1.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <QRCodeSVG value={verifyUrl} size={64} level="M" />
              </div>
              <span className="text-[9px] font-mono text-stone-500">Scan to Verify Ledger</span>
            </div>

            {/* Academic Admissions Seal */}
            <div className="space-y-1 text-right sm:text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 mb-1 border border-emerald-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-stone-900 block font-sans">
                Arzon Global Academic Seal
              </span>
              <span className="text-[10px] text-stone-500 font-sans block">
                Verified: {data.issueDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //  Result Card Mode (VisionOS Titanium Glass Digital Credential)
  return (
    <div
      ref={ref}
      id="arzon-career-certificate"
      className="relative w-full max-w-[680px] mx-auto overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-b from-[#081F38] via-[#0C2340] to-[#081F38] p-6 sm:p-8 font-sans text-white shadow-[0_20px_50px_-10px_rgba(7,26,74,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] select-none"
    >
      {/* Subtle Atmospheric Radial Accents */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />

      {/* Top Bar: Brand, Category, Verified Beacon */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 p-2 shadow-xs border border-white/15 backdrop-blur-md">
            <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
              ARZON GLOBAL · CAREER ENGINE
            </p>
            <p className="text-xs font-medium text-slate-300 font-sans">
              Official Candidate Result Card
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-emerald-300 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span>Verified On Ledger</span>
        </span>
      </div>

      {/* Candidate Profile Details */}
      <div className="relative z-10 pt-5 pb-4">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-300/90 block">
          EVALUATED CANDIDATE
        </span>
        <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {data.candidateName || "Candidate"}
        </h3>
        <p className="mt-1 text-xs text-slate-300 font-sans flex items-center gap-1.5 flex-wrap">
          <GraduationCap className="h-3.5 w-3.5 text-blue-300 shrink-0" />
          <span>{data.candidateCollege || "Healthcare Institute"}</span>
          <span className="text-slate-500">·</span>
          <span>{data.candidateQualification || "Healthcare Graduate"}</span>
        </p>
      </div>

      {/* Main Focus: Primary Match & Role Fit Metric */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-2">
        {/* Left 2 Cols: Primary Role Match */}
        <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4.5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300">
                Primary Career Alignment
              </span>
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {data.archetypeName}
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 font-sans">
              Top Cognitive Fit &amp; Protocol Calibration across clinical role models.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/20 border border-blue-400/25 text-[10px] font-mono font-medium text-blue-200">
              <CheckCircle2 className="h-3 w-3 text-blue-300" /> Clinical Data Accuracy
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/25 text-[10px] font-mono font-medium text-emerald-200">
              <CheckCircle2 className="h-3 w-3 text-emerald-300" /> Industry Protocol Fit
            </span>
          </div>
        </div>

        {/* Right 1 Col: Fit Score */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-blue-600/20 via-white/5 to-white/5 p-4.5 backdrop-blur-md flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
            FIT INDEX
          </span>
          <div className="mt-1 flex items-baseline justify-center gap-0.5">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {data.fitScore}%
            </span>
          </div>
          <span className="mt-1.5 inline-block rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-emerald-300 uppercase">
            Top 8th Percentile
          </span>
          <p className="text-[10px] text-slate-400 mt-2 font-sans">
            Calibrated on ACRI standard
          </p>
        </div>
      </div>

      {/* Card Footer: Ledger Reference, Timestamp, Scannable Ledger */}
      <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-sans">
        <div className="flex items-center gap-2.5">
          <div className="p-1 bg-white rounded-lg border border-white/15 flex items-center justify-center shrink-0">
            <QRCodeSVG value={verifyUrl} size={32} level="M" />
          </div>
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
              LEDGER AUDIT REF
            </p>
            <p className="font-mono font-bold text-slate-200 text-[11px]">{data.referenceId}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
            VERIFIED DATE
          </p>
          <p className="font-mono font-medium text-slate-200 text-[11px]">{data.issueDate}</p>
        </div>
      </div>
    </div>
  );
});
CertificatePreview.displayName = "CertificatePreview";

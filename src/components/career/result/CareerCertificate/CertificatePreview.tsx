import { forwardRef } from "react";
import { ShieldCheck, Sparkles, GraduationCap, Award, Check } from "lucide-react";
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
  const strokeDashoffset = 251.2 - (251.2 * Math.min(Math.max(data.fitScore, 0), 100)) / 100;

  if (viewMode === "certificate") {
    // 🎓 Official Royal College / Executive Academic Diploma
    return (
      <div
        ref={ref}
        id="arzon-career-certificate"
        className="arzon-diploma-paper relative w-full max-w-[800px] mx-auto overflow-hidden rounded-3xl p-5 sm:p-8 font-sans text-stone-900 select-none"
      >
        <div className="arzon-diploma-inner-frame relative rounded-2xl p-6 sm:p-11 space-y-6 text-center overflow-hidden">
          {/* Ornate Corner Guilloche Accents */}
          <div className="pointer-events-none absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#C5A880]" />
          <div className="pointer-events-none absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#C5A880]" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#C5A880]" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#C5A880]" />

          {/* Archival Security Watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035]"
          >
            <span className="font-serif text-8xl sm:text-[140px] font-black tracking-widest text-[#071A4A]">
              ARZON
            </span>
          </div>

          {/* Certificate Header Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-[#C5A880]/50 pb-5">
            <div className="flex items-center gap-3.5 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071A4A] p-2 shadow-md border border-[#C5A880]">
                <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="font-serif font-black text-base tracking-tight text-[#071A4A] block leading-none">
                  ARZON GLOBAL
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#A88243] font-black block mt-1">
                  Executive Healthcare Career Intelligence
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[8.5px] text-stone-400 uppercase font-black tracking-wider block">
                AUDIT LEDGER REF
              </span>
              <span className="font-mono text-xs font-bold text-[#071A4A] block tracking-tight">
                {data.referenceId}
              </span>
            </div>
          </div>

          {/* Certificate Title & Presentation */}
          <div className="relative z-10 space-y-2 pt-2">
            <span className="inline-block font-mono text-[10px] sm:text-[11px] font-black tracking-[0.26em] text-[#071A4A] uppercase bg-[#C5A880]/15 px-4 py-1 rounded-full border border-[#C5A880]/40">
              EXECUTIVE DIPLOMA OF CLINICAL ROLE READINESS
            </span>
            <p className="font-serif italic text-sm text-stone-600 font-medium pt-1">
              By the authority of the Academic &amp; Industry Alignment Council, this certifies that
            </p>
            <div className="py-1">
              <h3 className="font-serif text-3xl sm:text-5xl font-black text-[#071A4A] tracking-tight border-b-2 border-[#D4AF37] pb-2 inline-block px-8">
                {data.candidateName || "Candidate Name"}
              </h3>
            </div>
            <p className="text-xs text-stone-600 font-sans flex items-center justify-center gap-1.5 flex-wrap">
              <GraduationCap className="h-4 w-4 text-[#A88243]" />
              <span className="font-semibold text-stone-900">{data.candidateCollege || "Healthcare Institute"}</span>
              <span className="text-stone-400">·</span>
              <span className="font-mono text-stone-700 font-medium">{data.candidateQualification || "Healthcare Graduate"}</span>
            </p>
          </div>

          {/* Core Alignment Citation */}
          <div className="relative z-10 max-w-xl mx-auto py-2">
            <p className="text-xs sm:text-[13px] text-stone-700 font-sans leading-relaxed">
              Has completed the diagnostic multi-vector evaluation through the Arzon Career Engine, proving verified clinical cognitive aptitude, terminology precision, and certified industry calibration for appointment as:
            </p>
            <div className="mt-4 inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#071A4A] to-[#0A2663] text-white shadow-md border border-[#D4AF37]">
              <Award className="h-5 w-5 text-[#E5C378] shrink-0" />
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF8F3]">
                {data.archetypeName}
              </span>
              <span className="font-mono text-xs font-black text-[#071A4A] bg-[#E5C378] px-3 py-0.5 rounded-full shadow-2xs">
                {data.fitScore}% Fit Index
              </span>
            </div>
          </div>

          {/* 4 Validated Competency Badges */}
          <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap pt-1">
            <span className="px-3 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-mono text-[10px] font-bold">
              ✓ ICH-GVP Protocol Alignment
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-mono text-[10px] font-bold">
              ✓ Standardized MedDRA Triage
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-mono text-[10px] font-bold">
              ✓ Technical Case Narrative Quality
            </span>
            <span className="px-3 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 font-mono text-[10px] font-bold">
              ✓ 21 CFR Part 11 Audit Integrity
            </span>
          </div>

          {/* Signatures & Live Scannable QR Seal */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-7 border-t border-[#C5A880]/50">
            {/* Faculty & Mentor Signature */}
            <div className="space-y-1 text-left sm:text-center">
              <div className="font-serif italic text-lg text-[#071A4A] font-bold leading-none select-none">
                Mohamed Kumail Abbas
              </div>
              <div className="w-36 h-0.5 bg-[#C5A880] sm:mx-auto mt-1.5" />
              <span className="text-[11px] font-bold text-stone-900 block font-sans">
                Mohamed Kumail Abbas
              </span>
              <span className="text-[10px] text-stone-500 font-sans block leading-tight">
                Manager, Pharmacovigilance<br />Ex-Accenture &amp; Cognizant
              </span>
            </div>

            {/* Live Scannable QR Verification Seal */}
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <div className="p-2 bg-white rounded-xl border border-[#C5A880]/70 shadow-xs">
                <QRCodeSVG value={verifyUrl} size={68} level="M" />
              </div>
              <span className="text-[9px] font-mono text-stone-600 font-bold uppercase tracking-wider">
                Scan to Verify Ledger
              </span>
            </div>

            {/* Academic Admissions Embossed Gold Seal */}
            <div className="space-y-1 text-right sm:text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] text-[#071A4A] mb-1 border-2 border-white shadow-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-bold text-stone-900 block font-sans">
                Academic Registrar Seal
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

  //  Student Pass Mode (Obsidian Executive Scholar Smart Pass with EMV Gold Chip & Activity Ring)
  return (
    <div
      ref={ref}
      id="arzon-career-certificate"
      className="arzon-executive-pass relative w-full max-w-[720px] mx-auto overflow-hidden rounded-[28px] p-6 sm:p-9 font-sans text-white select-none"
    >
      {/* Top Bar: Brand, Category, EMV Smart Chip */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/15 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1426] p-2 shadow-md border border-[#D4AF37]/50">
            <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#E5C378]">
              ARZON GLOBAL · CAREER ENGINE
            </p>
            <p className="text-xs font-semibold text-slate-200 font-sans">
              Official Executive Student Pass
            </p>
          </div>
        </div>

        {/* Tangible EMV Smart Chip & Active Beacon */}
        <div className="flex items-center gap-3">
          {/* Micro-etched Brass/Gold EMV Smart Chip */}
          <div
            className="arzon-smart-chip h-7 w-10 rounded-md flex flex-col justify-between p-1 relative overflow-hidden"
            title="Cryptographic Hardware Ledger Identity"
          >
            <div className="flex justify-between items-center h-full">
              <div className="w-[1px] h-full bg-[#7D5C14]/60" />
              <div className="w-3.5 h-3.5 rounded-xs border border-[#7D5C14]/70 bg-[#E5C378]/40" />
              <div className="w-[1px] h-full bg-[#7D5C14]/60" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-emerald-300 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Verified Ledger</span>
          </span>
        </div>
      </div>

      {/* Tangible Security Foil Ribbon */}
      <div className="relative z-10 my-4 h-7 w-full rounded-xl overflow-hidden border border-white/20 shadow-inner flex items-center justify-between px-3 bg-gradient-to-r from-[#D4AF37]/25 via-[#38BDF8]/20 to-[#D4AF37]/25 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[8.5px] font-black uppercase tracking-[0.24em] text-white/95">
            GOVT MSME REGISTERED · 21 CFR PART 11 COMPLIANT · IMMUTABLE
          </span>
        </div>
        <span className="font-mono text-[9px] font-bold text-[#E5C378] tracking-widest">
          ACRI-{data.referenceId.slice(-6)}
        </span>
      </div>

      {/* Candidate Profile Details */}
      <div className="relative z-10 pt-2 pb-4">
        <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-[0.22em] text-[#E5C378] block">
          ISSUED TO CANDIDATE
        </span>
        <h3 className="mt-1 font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {data.candidateName || "Candidate"}
        </h3>
        <p className="mt-2 text-xs font-sans flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-slate-200 font-medium border border-white/15">
            <GraduationCap className="h-3.5 w-3.5 text-[#E5C378] shrink-0" />
            <span>{data.candidateCollege || "Healthcare Institute"}</span>
          </span>
          <span className="inline-flex items-center rounded-lg bg-[#E5C378]/20 px-2.5 py-1 text-[#F3D993] font-mono text-[11px] font-bold border border-[#E5C378]/30">
            {data.candidateQualification || "Healthcare Graduate"}
          </span>
        </p>
      </div>

      {/* Main Focus: Primary Match & Apple Precision Ring */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
        {/* Left 2 Cols: Primary Role Match */}
        <div className="sm:col-span-2 rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5C378]">
                Primary Career Alignment
              </span>
              <Sparkles className="h-4 w-4 text-[#E5C378]" />
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              {data.archetypeName}
            </h4>
            <p className="text-xs text-slate-200 mt-2 font-sans leading-relaxed">
              Calibrated on multi-vector cognitive diagnostics and clinical regulatory standards.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30 text-[10.5px] font-mono font-medium text-blue-100">
              <Check className="h-3 w-3 text-blue-300" /> Protocol Alignment
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-[10.5px] font-mono font-medium text-emerald-100">
              <Check className="h-3 w-3 text-emerald-300" /> MedDRA Precision
            </span>
          </div>
        </div>

        {/* Right 1 Col: Apple Precision Circular Ring Gauge */}
        <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-4.5 backdrop-blur-md flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#E5C378]">
            FIT INDEX
          </span>

          <div className="relative mt-2 flex items-center justify-center">
            <svg className="h-20 w-20 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#passGoldGradient)"
                strokeWidth="7"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="passGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C378" />
                  <stop offset="60%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight">
                {data.fitScore}%
              </span>
            </div>
          </div>

          <span className="mt-2 inline-block rounded-full bg-emerald-500/25 border border-emerald-400/40 px-2.5 py-0.5 font-mono text-[9px] font-bold text-emerald-200 uppercase">
            Top 8th Percentile
          </span>
        </div>
      </div>

      {/* Card Footer: Ledger Reference, Timestamp, Scannable QR (High Contrast Guaranteed) */}
      <div className="relative z-10 mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 font-sans">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white rounded-xl border border-white/30 flex items-center justify-center shrink-0 shadow-xs">
            <QRCodeSVG value={verifyUrl} size={38} level="M" />
          </div>
          <div>
            <p className="font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#E5C378]">
              LEDGER AUDIT REF
            </p>
            <p className="font-mono font-bold text-[#F1F5F9] text-xs">{data.referenceId}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#E5C378]">
            VERIFIED DATE
          </p>
          <p className="font-mono font-bold text-[#F1F5F9] text-xs">{data.issueDate}</p>
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";

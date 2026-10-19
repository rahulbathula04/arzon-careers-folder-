import { forwardRef } from "react";
import { ShieldCheck, GraduationCap, Check } from "lucide-react";
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
    // 🎓 Minimal, Prestigious Academic Certificate (Universal & Printable)
    return (
      <div
        ref={ref}
        id="arzon-career-certificate"
        className="arzon-minimal-certificate relative w-full max-w-[780px] mx-auto overflow-hidden rounded-3xl p-5 sm:p-9 font-sans text-[#071A4A] select-none"
      >
        <div className="arzon-certificate-border relative rounded-2xl p-6 sm:p-10 space-y-6 text-center overflow-hidden bg-white">
          {/* Subtle Watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
          >
            <span className="font-serif text-8xl sm:text-[130px] font-black tracking-widest text-[#071A4A]">
              ARZON
            </span>
          </div>

          {/* Certificate Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071A4A] p-2 shadow-xs">
                <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="font-serif font-black text-sm tracking-tight text-[#071A4A] block leading-none">
                  ARZON GLOBAL
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block mt-1">
                  Healthcare Career Intelligence Council
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-mono text-[8.5px] text-slate-400 uppercase font-bold tracking-wider block">
                CREDENTIAL ID
              </span>
              <span className="font-mono text-xs font-bold text-[#071A4A] block tracking-tight">
                {data.referenceId}
              </span>
            </div>
          </div>

          {/* Certificate Title & Presentation */}
          <div className="relative z-10 space-y-2 pt-2">
            <span className="inline-block font-mono text-[10px] font-extrabold tracking-[0.24em] text-[#071A4A] uppercase bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
              CERTIFICATE OF CLINICAL READINESS
            </span>
            <p className="font-serif italic text-sm text-slate-500 font-medium pt-1">
              This is to certify that
            </p>
            <div className="py-1">
              <h3 className="font-serif text-3xl sm:text-5xl font-black text-[#071A4A] tracking-tight border-b-2 border-[#C5A880] pb-2 inline-block px-8">
                {data.candidateName || "Candidate Name"}
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans flex items-center justify-center gap-1.5 flex-wrap">
              <GraduationCap className="h-4 w-4 text-[#C5A880]" />
              <span className="font-semibold text-slate-900">{data.candidateCollege || "Healthcare Institute"}</span>
              <span className="text-slate-400">·</span>
              <span className="font-mono text-slate-700 font-medium">{data.candidateQualification || "Healthcare Graduate"}</span>
            </p>
          </div>

          {/* Citation of Verified Achievement */}
          <div className="relative z-10 max-w-xl mx-auto py-1">
            <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed">
              Has completed the diagnostic multi-vector assessment through the Arzon Career Engine, proving verified clinical cognitive aptitude, terminology precision, and certified industry calibration for appointment as:
            </p>
            <div className="mt-3.5 inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-[#071A4A] text-white shadow-sm">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
                {data.archetypeName}
              </span>
              <span className="font-mono text-xs font-black text-[#071A4A] bg-[#E5C378] px-2.5 py-0.5 rounded-full">
                {data.fitScore}% Fit Index
              </span>
            </div>
          </div>

          {/* 3 Core Validated Competencies */}
          <div className="relative z-10 flex items-center justify-center gap-2 flex-wrap pt-1">
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
              ✓ ICH-GVP Protocol Alignment
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
              ✓ Standardized MedDRA Triage
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold">
              ✓ 21 CFR Part 11 Audit Integrity
            </span>
          </div>

          {/* Signatures & Scannable QR Seal */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t border-slate-200">
            {/* Faculty Signature */}
            <div className="space-y-1 text-left sm:text-center">
              <div className="font-serif italic text-lg text-[#071A4A] font-bold leading-none select-none">
                Mohamed Kumail Abbas
              </div>
              <div className="w-32 h-0.5 bg-[#C5A880] sm:mx-auto mt-1.5" />
              <span className="text-[11px] font-bold text-slate-900 block font-sans">
                Mohamed Kumail Abbas
              </span>
              <span className="text-[10px] text-slate-500 font-sans block leading-tight">
                Manager, Pharmacovigilance<br />Ex-Accenture &amp; Cognizant
              </span>
            </div>

            {/* Live Scannable QR Verification */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <QRCodeSVG value={verifyUrl} size={64} level="M" />
              </div>
              <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                Scan to Verify Ledger
              </span>
            </div>

            {/* Registrar Seal */}
            <div className="space-y-1 text-right sm:text-center">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-[#071A4A] mb-1 border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#071A4A]" />
              </div>
              <span className="text-[11px] font-bold text-slate-900 block font-sans">
                Academic Registrar Seal
              </span>
              <span className="text-[10px] text-slate-500 font-sans block">
                Issued: {data.issueDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //  Minimal Executive Credential Card (Clean, Universal, High Value)
  return (
    <div
      ref={ref}
      id="arzon-career-certificate"
      className="arzon-minimal-card relative w-full max-w-[620px] mx-auto overflow-hidden rounded-3xl p-6 sm:p-8 font-sans text-slate-900 select-none"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071A4A] p-2 shadow-2xs">
            <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#C5A880]">
              ARZON GLOBAL
            </p>
            <p className="text-xs font-bold text-[#071A4A] font-sans">
              Executive Career Credential
            </p>
          </div>
        </div>

        {/* Minimal Verified Pill */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-emerald-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          <span>Verified Record</span>
        </span>
      </div>

      {/* Candidate Profile Details */}
      <div className="pt-5 pb-4">
        <p className="font-mono text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-[#C5A880]">
          ISSUED TO CANDIDATE
        </p>
        <h3 className="mt-1 font-sans text-3xl sm:text-4xl font-black text-[#071A4A] tracking-tight">
          {data.candidateName || "Candidate"}
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 font-sans flex items-center gap-1.5 flex-wrap">
          <span className="font-medium text-slate-800">{data.candidateCollege || "Healthcare Institute"}</span>
          <span className="text-slate-300">·</span>
          <span className="font-mono text-slate-600 font-semibold">{data.candidateQualification || "Healthcare Graduate"}</span>
        </p>
      </div>

      {/* Main Focus: Qualified Appointment Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-[#C5A880]">
            PRIMARY CAREER ALIGNMENT
          </p>
          <h4 className="text-xl sm:text-2xl font-bold text-[#071A4A] tracking-tight mt-0.5">
            {data.archetypeName}
          </h4>
          <div className="mt-2.5 flex flex-wrap gap-2 text-[10.5px] font-mono text-slate-600">
            <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium">
              <Check className="h-3 w-3 text-emerald-600" /> Protocol Alignment
            </span>
            <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-medium">
              <Check className="h-3 w-3 text-emerald-600" /> MedDRA Precision
            </span>
          </div>
        </div>

        {/* Fit Score Badge */}
        <div className="sm:border-l sm:border-slate-200 sm:pl-5 text-left sm:text-right shrink-0">
          <p className="font-mono text-[9px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            ROLE FIT INDEX
          </p>
          <p className="font-mono text-3xl font-black text-[#071A4A] mt-0.5 leading-none">
            {data.fitScore}%
          </p>
          <span className="mt-1.5 inline-block rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 font-mono text-[9px] font-bold uppercase">
            Top 8th Percentile
          </span>
        </div>
      </div>

      {/* Card Footer: Ledger Reference, QR, Verification Link */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
            <QRCodeSVG value={verifyUrl} size={40} level="M" />
          </div>
          <div>
            <p className="font-mono text-[8.5px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              AUDIT REFERENCE
            </p>
            <p className="font-mono font-bold text-[#071A4A] text-xs">{data.referenceId}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-[8.5px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
            VERIFIED DATE
          </p>
          <p className="font-mono font-medium text-slate-700 text-xs">{data.issueDate}</p>
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";

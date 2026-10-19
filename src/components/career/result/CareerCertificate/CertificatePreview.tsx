import { forwardRef } from "react";
import { ShieldCheck, Sparkles, CheckCircle2, QrCode, GraduationCap } from "lucide-react";

export interface CertificateData {
  candidateName: string;
  candidateQualification?: string;
  candidateCollege?: string;
  archetypeName: string;
  fitScore: number;
  referenceId: string;
  issueDate: string;
}

interface Props {
  data: CertificateData;
}

export const CertificatePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      id="arzon-career-certificate"
      className="relative w-full max-w-[680px] mx-auto overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-b from-[#081F38] via-[#0C2340] to-[#081F38] p-6 sm:p-8 font-sans text-white shadow-[0_20px_50px_-10px_rgba(7,26,74,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]"
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
          <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-slate-300 shrink-0">
            <QrCode className="h-4 w-4" />
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

import { forwardRef } from "react";
import { FileCheck2, Info } from "lucide-react";

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
      className="relative w-[840px] max-w-[840px] mx-auto overflow-hidden rounded-2xl border border-[#D7E2F0] bg-white p-8 sm:p-10 font-sans text-[#0A1128] shadow-xl"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#EEF6FF]" />
      <div className="pointer-events-none absolute -left-24 -bottom-28 h-64 w-64 rounded-full bg-[#F7F9FC]" />

      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071A4A] p-2">
            <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1557D6]">
              ARZON GLOBAL
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-500">CAREER ENGINE · ASSESSMENT SUMMARY</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wide text-[#1557D6]">
          <FileCheck2 className="h-3.5 w-3.5" />
          Assessment record
        </span>
      </div>

      <div className="relative z-10 py-8 text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#071A4A]">
          Career Assessment Record
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          A summary of the career-fit diagnostic generated from the candidate's responses to Arzon Career Engine.
        </p>

        <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-slate-200 bg-[#FAFBFD] px-6 py-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Prepared for
          </p>
          <h3 className="mt-2 font-serif text-3xl font-bold text-[#071A4A]">
            {data.candidateName || "Candidate"}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {data.candidateQualification || "Healthcare career candidate"}
            {data.candidateCollege ? ` · ${data.candidateCollege}` : ""}
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-4 text-left">
          <div className="rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/70 p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1557D6]">
              Primary career match
            </p>
            <p className="mt-2 font-serif text-xl font-bold text-[#071A4A]">{data.archetypeName}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Role-fit estimate
            </p>
            <p className="mt-1 font-serif text-4xl font-bold text-[#071A4A]">{data.fitScore}%</p>
            <p className="mt-1 text-xs text-slate-500">Guidance signal, not a readiness score</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
        <div>
          <p className="text-sm font-bold text-amber-950">What this record does and does not show</p>
          <p className="mt-1 text-xs leading-5 text-amber-900">
            This is an informational career-fit report. It is not a professional qualification, independent skill certification, or proof of industry readiness. Practical work samples and role-specific assessment are needed to demonstrate job-related capability.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
        <div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider">Assessment reference</p>
          <p className="mt-1 font-mono font-semibold text-slate-700">{data.referenceId}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[9px] font-bold uppercase tracking-wider">Generated on</p>
          <p className="mt-1 font-semibold text-slate-700">{data.issueDate}</p>
        </div>
      </div>
    </div>
  );
});
CertificatePreview.displayName = "CertificatePreview";

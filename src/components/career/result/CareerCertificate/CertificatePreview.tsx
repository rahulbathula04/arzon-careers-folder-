import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Award, Lock } from "lucide-react";
import { ArzonLogo } from "@/components/acri/ArzonLogo";

export interface CertificateData {
  candidateName: string;
  candidateQualification?: string;
  candidateCollege?: string;
  archetypeName: string;
  fitScore: number;
  credentialId: string;
  issueDate: string;
  verificationUrl: string;
  cryptoHash: string;
}

interface Props {
  data: CertificateData;
}

export const CertificatePreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      id="arzon-career-certificate"
      className="relative w-full max-w-[860px] mx-auto bg-[#070D1E] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#C5A572]/40 overflow-hidden font-sans select-none"
      style={{
        backgroundImage: "radial-gradient(ellipse at 50% 20%, rgba(21, 87, 214, 0.15), transparent 70%)",
      }}
    >
      {/* Guilloche Corner Accents */}
      <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#C5A572]/30" />
      <div className="pointer-events-none absolute inset-5 rounded-xl border border-white/10" />

      {/* Certificate Header */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Brand Emblem & Authority Seal */}
        <div className="flex items-center gap-3">
          <ArzonLogo variant="dark" size="md" />
        </div>

        <p className="mt-3 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
          ARZON INSTITUTE OF HEALTHCARE INTELLIGENCE
        </p>

        <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          Certificate of Career Aptitude & Role Readiness
        </h2>

        <p className="mt-1 text-xs text-slate-300 font-sans max-w-lg">
          Official institutional diagnostic verifying aptitude, behavioral alignment, and cognitive suitability for professional healthcare operations.
        </p>
      </div>

      {/* Candidate Presentation */}
      <div className="relative z-10 mt-6 sm:mt-8 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37]">
          THIS CREDENTIAL IS PROUDLY PRESENTED TO
        </span>

        <h3 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide border-b border-[#C5A572]/40 pb-2 inline-block px-8">
          {data.candidateName || "Candidate Name"}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          {data.candidateQualification ? `${data.candidateQualification}` : "Healthcare & Clinical Sciences Candidate"}
          {data.candidateCollege ? ` · ${data.candidateCollege}` : ""}
        </p>
      </div>

      {/* Diagnostic Evaluation Details */}
      <div className="relative z-10 mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-sm max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-4 text-center divide-x divide-white/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block">
              DIAGNOSTIC ARCHETYPE
            </span>
            <span className="mt-1 font-serif text-base sm:text-lg font-bold text-[#D4AF37] block">
              {data.archetypeName}
            </span>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block">
              ROLE ALIGNMENT SCORE
            </span>
            <span className="mt-1 font-serif text-base sm:text-lg font-bold text-white block">
              {data.fitScore}% Fit
            </span>
          </div>
        </div>
      </div>

      {/* Footer Attestation & Verification QR */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Verification QR Code */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-xl shrink-0 shadow-md">
            <QRCodeSVG
              value={data.verificationUrl}
              size={64}
              level="M"
              includeMargin={false}
            />
          </div>
          <div className="text-left font-mono text-[10px] text-slate-300 leading-tight">
            <span className="block font-bold text-white">SCAN TO VERIFY</span>
            <span className="block text-slate-400 mt-0.5">{data.credentialId}</span>
            <span className="block text-[9px] text-[#D4AF37] mt-1 font-semibold">ARZON VERIFIED REGISTRY</span>
          </div>
        </div>

        {/* Issue Date & Seal */}
        <div className="text-center sm:text-right text-xs">
          <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-400">
            ISSUE DATE
          </span>
          <span className="block font-semibold text-white mt-0.5">
            {data.issueDate}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
            <ShieldCheck className="h-3 w-3" />
            <span>CRYPTOGRAPHICALLY SEALED</span>
          </span>
        </div>
      </div>

      {/* Security Hash Footnote */}
      <div className="relative z-10 mt-4 text-center font-mono text-[9px] text-slate-400 border-t border-white/5 pt-2">
        {data.cryptoHash}
      </div>
    </div>
  );
});
CertificatePreview.displayName = "CertificatePreview";

import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Award } from "lucide-react";

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
      className="relative w-[840px] max-w-[840px] mx-auto bg-[#FCFBF7] text-[#0A1128] rounded-2xl p-6 sm:p-7 shadow-2xl border-4 border-[#9B783E]/70 overflow-hidden font-serif select-none shrink-0"
      style={{
        boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(155, 120, 62, 0.3)",
      }}
    >
      {/* Classical Concentric Guilloche / Ornamental Borders */}
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-[#9B783E]/30" />
      <div className="pointer-events-none absolute inset-3.5 rounded-lg border-2 border-[#9B783E]/60" />
      <div className="pointer-events-none absolute inset-4.5 rounded-md border border-[#9B783E]/20" />

      {/* Classical Corner Filigree Accents (SVG Flourishes) */}
      <div className="pointer-events-none absolute top-5 left-5 w-7 h-7 border-t-2 border-l-2 border-[#9B783E]" />
      <div className="pointer-events-none absolute top-5 right-5 w-7 h-7 border-t-2 border-r-2 border-[#9B783E]" />
      <div className="pointer-events-none absolute bottom-5 left-5 w-7 h-7 border-b-2 border-l-2 border-[#9B783E]" />
      <div className="pointer-events-none absolute bottom-5 right-5 w-7 h-7 border-b-2 border-r-2 border-[#9B783E]" />

      {/* Watermark Crest Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035]">
        <img
          src="/brand/arzon-icon.webp"
          alt=""
          className="w-80 h-80 object-contain filter grayscale"
        />
      </div>

      {/* ─── Header: Institutional Heraldry ────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="h-10 w-10 rounded-full border-2 border-[#9B783E] bg-[#071A4A] p-1.5 flex items-center justify-center shadow-md">
            <img
              src="/brand/arzon-icon.webp"
              alt="Arzon Global Seal"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <p className="mt-2 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.26em] text-[#9B783E]">
          ARZON INSTITUTE OF HEALTHCARE INTELLIGENCE
        </p>

        <p className="text-[9px] uppercase font-sans tracking-widest text-[#5A6578] mt-0.5">
          Council of Healthcare Career Standards · Verified Credential Registry
        </p>

        <div className="my-2 flex items-center justify-center gap-2.5 w-40">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#9B783E] to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#9B783E]" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#9B783E] to-transparent" />
        </div>

        <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#071A4A] uppercase">
          Certificate of Career Aptitude & Role Readiness
        </h2>

        <p className="mt-0.5 font-serif italic text-[11px] sm:text-xs text-[#4A5568] max-w-xl">
          By authority of the Clinical & Life Sciences Advisory Council, this official institutional credential is conferred upon
        </p>
      </div>

      {/* ─── Candidate Presentation ────────────────────────────────── */}
      <div className="relative z-10 mt-3.5 sm:mt-4 text-center">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A] tracking-wide inline-block px-8 border-b-2 border-[#9B783E]/50 pb-1">
          {data.candidateName || "Candidate Name"}
        </h3>

        <p className="mt-1 text-xs font-sans text-[#4A5568] font-medium">
          {data.candidateQualification ? `${data.candidateQualification}` : "Clinical Sciences & Healthcare Candidate"}
          {data.candidateCollege ? ` · ${data.candidateCollege}` : ""}
        </p>

        <p className="mt-1.5 font-serif italic text-[11px] sm:text-xs text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
          having successfully completed the comprehensive diagnostic evaluation across clinical domain aptitude,
          regulatory compliance discipline, structured logic, and professional role alignment for
        </p>
      </div>

      {/* ─── Evaluated Archetype & Score Badge ───────────────────────── */}
      <div className="relative z-10 mt-3 max-w-md mx-auto rounded-xl border border-[#9B783E]/40 bg-[#F4EFE6]/80 p-2.5 sm:p-3 shadow-inner">
        <div className="grid grid-cols-2 gap-3 text-center divide-x divide-[#9B783E]/30">
          <div>
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#69758A] block font-bold">
              VERIFIED CAREER IDENTITY
            </span>
            <span className="mt-0.5 font-serif text-sm sm:text-base font-bold text-[#071A4A] block">
              {data.archetypeName}
            </span>
          </div>
          <div>
            <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#69758A] block font-bold">
              ROLE ALIGNMENT
            </span>
            <span className="mt-0.5 font-serif text-sm sm:text-base font-bold text-[#9B783E] block">
              {data.fitScore}% Readiness Fit
            </span>
          </div>
        </div>
      </div>

      {/* ─── Signatures, Official Rosette Seal & Verification QR ───── */}
      <div className="relative z-10 mt-4 pt-3 border-t border-[#9B783E]/30 grid grid-cols-3 items-end gap-3 text-center">
        {/* Left Signature: Chief Executive Officer (Manideep) */}
        <div className="flex flex-col items-center">
          <div className="h-10 flex flex-col items-center justify-end">
            <div
              className="text-2xl text-[#0A1A3A] select-none font-normal leading-none"
              style={{
                fontFamily: "'Caveat', 'Brush Script MT', 'Great Vibes', 'Alex Brush', cursive",
                transform: "rotate(-2deg)",
              }}
            >
              Manideep
            </div>
            <svg className="w-20 h-2 text-[#0A1A3A]/70 mt-0.5" viewBox="0 0 100 8" fill="none">
              <path d="M2 5 C 25 8, 55 1, 75 4 C 88 5.5, 95 2, 98 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-28 border-b border-[#0A1128]/30 mt-1" />
          <span className="font-serif font-bold text-[10px] text-[#071A4A] uppercase tracking-wider mt-1 block">
            Manideep
          </span>
          <span className="font-sans text-[8.5px] text-[#69758A] block font-medium">
            Chief Executive Officer
          </span>
          <span className="font-mono text-[7px] text-[#9B783E] uppercase tracking-wider block">
            Arzon Global
          </span>
        </div>

        {/* Center: Official Classical Embossed Gold Foil Seal & QR */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Rosette Medal / Stamp */}
            <div className="w-14 h-14 rounded-full border-2 border-[#9B783E] bg-gradient-to-br from-[#E6C687] via-[#D4AF37] to-[#99772E] p-1 shadow-md flex flex-col items-center justify-center text-center">
              <div className="w-full h-full rounded-full border border-dashed border-[#785928] flex flex-col items-center justify-center p-0.5">
                <Award className="h-4 w-4 text-[#422C0A]" />
                <span className="font-mono text-[6.5px] font-bold tracking-tighter text-[#422C0A] uppercase mt-0.5">
                  SEAL OF MERIT
                </span>
                <span className="text-[5.5px] font-serif font-bold text-[#422C0A]">
                  2026
                </span>
              </div>
            </div>
          </div>
          <span className="font-mono text-[7.5px] uppercase tracking-widest text-[#9B783E] font-bold mt-1 block">
            INSTITUTIONAL SEAL
          </span>
        </div>

        {/* Right Signature: Head of Research & Development (Rahul Bathula) */}
        <div className="flex flex-col items-center">
          <div className="h-10 flex items-center justify-center">
            <img
              src="/brand/rahul-bathula-signature.png"
              alt="Rahul Bathula Signature"
              className="h-9 w-auto max-w-[120px] object-contain select-none"
              loading="eager"
            />
          </div>
          <div className="w-28 border-b border-[#0A1128]/30 mt-1" />
          <span className="font-serif font-bold text-[10px] text-[#071A4A] uppercase tracking-wider mt-1 block">
            Rahul Bathula
          </span>
          <span className="font-sans text-[8.5px] text-[#69758A] block font-medium">
            Head of Research & Development
          </span>
          <span className="font-mono text-[7px] text-[#9B783E] uppercase tracking-wider block">
            Arzon Career Engine
          </span>
        </div>
      </div>

      {/* ─── Bottom Metadata & Scannable QR Verification Bar ──────── */}
      <div className="relative z-10 mt-3 pt-2.5 border-t border-[#9B783E]/20 flex items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1 rounded-lg border border-[#9B783E]/40 shadow-xs shrink-0">
            <QRCodeSVG
              value={data.verificationUrl}
              size={46}
              level="M"
              includeMargin={false}
            />
          </div>
          <div className="text-left font-mono text-[8.5px] text-[#4A5568] leading-tight">
            <span className="block font-bold text-[#071A4A]">SCAN FOR OFFICIAL REGISTRY RECORD</span>
            <span className="block text-[#69758A] mt-0.5 font-semibold">CREDENTIAL ID: {data.credentialId}</span>
            <span className="block text-[7.5px] text-[#9B783E] mt-0.5 font-semibold">ARZON VERIFIED CAREER REGISTRY</span>
          </div>
        </div>

        <div className="text-right font-mono text-[8.5px] text-[#4A5568]">
          <span className="block text-[#69758A]">DATE OF CONFERMENT: {data.issueDate}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 mt-0.5">
            <ShieldCheck className="h-3 w-3" />
            <span>CRYPTOGRAPHICALLY VERIFIED & SEALED</span>
          </span>
          <span className="block text-[7.5px] text-[#8C98A9] mt-0.5">
            HASH: {data.cryptoHash}
          </span>
        </div>
      </div>
    </div>
  );
});
CertificatePreview.displayName = "CertificatePreview";

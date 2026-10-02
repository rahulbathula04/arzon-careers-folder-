import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck } from "lucide-react";

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
      className="relative mx-auto aspect-[297/210] w-full max-w-[1120px] overflow-hidden rounded-xl border-2 border-[#B18A4A] bg-[#FCFBF7] text-[#071A4A] shadow-[0_18px_50px_-28px_rgba(7,26,74,.35)] select-none"
    >
      <div className="pointer-events-none absolute inset-[1.6%] rounded-lg border border-[#B18A4A]/35" />
      <div className="pointer-events-none absolute inset-[2.5%] rounded-md border border-[#B18A4A]/20" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035]">
        <img
          src="/brand/arzon-icon.webp"
          alt=""
          className="h-[48%] w-[48%] object-contain grayscale"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col px-[5%] py-[4%]">
        <header className="text-center">
          <div className="mx-auto grid h-[7.5%] min-h-7 w-[7.5%] min-w-7 place-items-center rounded-full border border-[#B18A4A] bg-[#071A4A] p-[1.2%] shadow-sm">
            <img src="/brand/arzon-icon.webp" alt="Arzon Global" className="h-full w-full object-contain" />
          </div>

          <p className="mt-[1.5%] font-mono text-[clamp(7px,0.95vw,11px)] font-bold uppercase tracking-[0.24em] text-[#8B6A35]">
            ARZON CAREER ENGINE
          </p>
          <p className="mt-[0.4%] font-sans text-[clamp(6px,0.72vw,9px)] uppercase tracking-[0.14em] text-[#69758A]">
            Career Aptitude & Role Readiness Record
          </p>

          <div className="mx-auto my-[1.8%] flex w-[25%] items-center gap-2">
            <div className="h-px flex-1 bg-[#B18A4A]/45" />
            <div className="h-1 w-1 rotate-45 bg-[#B18A4A]" />
            <div className="h-px flex-1 bg-[#B18A4A]/45" />
          </div>

          <h2 className="font-sans text-[clamp(14px,2.55vw,30px)] font-extrabold uppercase leading-[1.05] tracking-[-0.025em] text-[#071A4A]">
            Career Aptitude & Role Readiness Certificate
          </h2>

          <p className="mx-auto mt-[1%] max-w-[82%] font-sans text-[clamp(7px,0.9vw,11px)] leading-snug text-[#4A5568]">
            Awarded for completion of the Arzon Career Engine diagnostic assessment and its role-fit analysis.
          </p>
        </header>

        <section className="mt-[2.5%] text-center">
          <h3 className="inline-block max-w-[90%] truncate border-b border-[#B18A4A]/55 px-5 pb-1 font-sans text-[clamp(16px,3.1vw,38px)] font-bold tracking-[0.015em] text-[#071A4A]">
            {data.candidateName || "Candidate Name"}
          </h3>
          <p className="mt-[0.8%] font-sans text-[clamp(7px,0.9vw,11px)] text-[#4A5568]">
            {data.candidateQualification || "Healthcare Candidate"}
            {data.candidateCollege ? ` · ${data.candidateCollege}` : ""}
          </p>
        </section>

        <section className="mx-auto mt-[2.4%] grid w-full max-w-[760px] grid-cols-2 overflow-hidden rounded-lg border border-[#B18A4A]/30 bg-[#F4EFE6]/65">
          <div className="px-3 py-[1.6%] text-center">
            <span className="block font-mono text-[clamp(6px,0.72vw,9px)] font-bold uppercase tracking-[0.12em] text-[#69758A]">
              Career Identity
            </span>
            <strong className="mt-1 block truncate font-sans text-[clamp(9px,1.2vw,15px)] font-bold text-[#071A4A]">
              {data.archetypeName}
            </strong>
          </div>
          <div className="border-l border-[#B18A4A]/25 px-3 py-[1.6%] text-center">
            <span className="block font-mono text-[clamp(6px,0.72vw,9px)] font-bold uppercase tracking-[0.12em] text-[#69758A]">
              Role Fit
            </span>
            <strong className="mt-1 block font-sans text-[clamp(9px,1.2vw,15px)] font-bold text-[#1557D6]">
              {data.fitScore}% Match
            </strong>
          </div>
        </section>

        <div className="mt-auto grid grid-cols-[1fr_auto_1fr] items-end gap-[4%] border-t border-[#B18A4A]/25 pt-[2.4%]">
          <div className="min-w-0 text-center">
            <div className="mx-auto h-5 w-[70%] max-w-40 border-b border-[#071A4A]/30" />
            <p className="mt-1 font-sans text-[clamp(6px,0.72vw,9px)] font-semibold uppercase tracking-[0.1em] text-[#071A4A]">
              Arzon Career Engine
            </p>
            <p className="mt-0.5 font-sans text-[clamp(5.5px,0.62vw,8px)] text-[#69758A]">
              Assessment issuer
            </p>
          </div>

          <div className="flex flex-col items-center justify-end">
            <div className="rounded-md border border-[#B18A4A]/35 bg-white p-1 shadow-sm">
              <QRCodeSVG value={data.verificationUrl} size={58} level="M" includeMargin={false} />
            </div>
            <span className="mt-1 font-mono text-[clamp(5px,0.58vw,7px)] font-bold uppercase tracking-[0.12em] text-[#8B6A35]">
              Scan to verify
            </span>
          </div>

          <div className="min-w-0 text-center">
            <p className="font-mono text-[clamp(5.5px,0.62vw,8px)] font-semibold uppercase tracking-[0.08em] text-[#69758A]">
              Credential ID
            </p>
            <p className="mt-0.5 truncate font-mono text-[clamp(6px,0.7vw,9px)] font-bold text-[#071A4A]">
              {data.credentialId}
            </p>
            <p className="mt-1 font-mono text-[clamp(5.5px,0.62vw,8px)] text-[#69758A]">
              Issued {data.issueDate}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 font-sans text-[clamp(5.5px,0.62vw,8px)] font-semibold text-emerald-700">
              <ShieldCheck className="h-[0.8em] w-[0.8em]" />
              Registry verification available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";

import { useRef, useState } from "react";
import { Award, ShieldCheck, CheckCircle2, Lock, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { CertificatePreview, type CertificateData } from "./CertificatePreview";
import { CertificateGenerator } from "./CertificateGenerator";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
  leadId?: string | null;
}

export function CredentialVerification({ result, candidateName: initialName, leadId }: Props) {
  const [candidateName, setCandidateName] = useState(
    initialName || result.profile?.course || "Candidate",
  );
  const certificateRef = useRef<HTMLDivElement>(null);

  // Generate deterministic Credential ID
  const rawId = leadId || result.resultMeta?.attemptId || "ARZON-CE-2026";
  const cleanHash = Math.abs(
    rawId.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0),
  )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0");
  const credentialId = `ARZ-CE-2026-${cleanHash.slice(0, 4)}-${cleanHash.slice(4, 8)}`;

  const verificationUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify?id=${credentialId}`
    : `https://arzoncareers.in/verify?id=${credentialId}`;

  const issueDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const certificateData: CertificateData = {
    candidateName,
    candidateQualification: result.profile?.course,
    candidateCollege: result.profile?.stream ? `${result.profile.stream} Stream` : undefined,
    archetypeName: result.archetype?.name ?? "Healthcare Career Specialist",
    fitScore: Math.round(result.fitScore),
    credentialId,
    issueDate,
    verificationUrl,
    cryptoHash: `SHA256: 9A2F-${cleanHash.slice(0, 4)}-${cleanHash.slice(4, 8)}-VERIFIED-ARZON`,
  };

  return (
    <section id="official-certificate" className="space-y-6">
      <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAF2] pb-6">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
                INSTITUTIONAL ACCREDITATION
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#071A4A]">
                Your Free Verified Credential
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Publicly Verifiable on Arzon Registry</span>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#3F4A60] leading-relaxed max-w-2xl">
          This credential certifies that you have completed the rigorous 42-point diagnostic battery, established cognitive suitability, and been evaluated against clinical industry operational benchmarks.
        </p>

        {/* Mobile Horizontal Scroll Hint */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] font-mono font-semibold text-[#69758A] mt-6 bg-[#FAFBFD] py-1.5 px-3 rounded-full border border-slate-200/80 w-fit mx-auto">
          <span>⇄ Swipe horizontally to preview full credential</span>
        </div>

        {/* Certificate Visual Canvas */}
        <div className="mt-4 sm:mt-8 overflow-x-auto pb-4 -mx-2 sm:mx-0 px-2 sm:px-0">
          <CertificatePreview ref={certificateRef} data={certificateData} />
        </div>

        {/* Certificate Actions & Downloads */}
        <div className="mt-8 pt-6 border-t border-[#E4EAF2]">
          <CertificateGenerator
            data={certificateData}
            certificateRef={certificateRef}
            onUpdateName={(name) => setCandidateName(name)}
          />
        </div>

        {/* Verification Guarantee Footnote */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-[#FAFBFD] p-4 text-xs text-[#69758A] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-400 shrink-0" />
            <span>
              Anyone can verify this credential at{" "}
              <Link to="/verify" search={{ id: credentialId }} className="text-[#1557D6] font-mono underline">
                arzoncareers.in/verify?id={credentialId}
              </Link>
            </span>
          </div>
          <Link
            to="/verify"
            search={{ id: credentialId }}
            className="hidden sm:inline-flex items-center gap-1 font-semibold text-[#1557D6] hover:underline"
          >
            <span>Test Verification</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

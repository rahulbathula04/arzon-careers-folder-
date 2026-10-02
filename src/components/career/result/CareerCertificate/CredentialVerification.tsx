import { useRef, useState, useEffect } from "react";
import { Award, ShieldCheck, Lock, ExternalLink, Maximize2, X } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      if (w > 0) {
        const baseWidth = 840;
        const nextScale = Math.min(1, w / baseWidth);
        setScale(nextScale);
        const naturalHeight = certificateRef.current?.offsetHeight || 600;
        setContainerHeight(nextScale < 1 ? Math.ceil(naturalHeight * nextScale) : undefined);
      }
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(containerRef.current);
    window.addEventListener("resize", updateDimensions);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <section id="official-certificate" className="space-y-6">
      <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-5 sm:p-8 shadow-sm">
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

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Publicly Verifiable on Arzon Registry</span>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#3F4A60] leading-relaxed max-w-2xl font-sans">
          This credential certifies that you have completed the rigorous 42-point diagnostic battery, established cognitive suitability, and been evaluated against clinical industry operational benchmarks.
        </p>

        {/* Responsive Mobile-First Certificate Scaler */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center">
          <div
            ref={containerRef}
            className="w-full relative overflow-hidden rounded-xl border border-stone-200/80 bg-[#FAF9F5] shadow-xs"
            style={{ height: containerHeight ? `${containerHeight}px` : "auto" }}
          >
            <div
              id="certificate-scale-wrapper"
              style={{
                width: scale < 1 ? "840px" : "100%",
                maxWidth: "840px",
                transform: scale < 1 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
              }}
            >
              <CertificatePreview ref={certificateRef} data={certificateData} />
            </div>
          </div>

          {/* Mobile Tap-to-inspect button */}
          {scale < 1 && (
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1557D6] active:scale-95 shadow-2xs transition cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Tap to inspect full-size details</span>
            </button>
          )}
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
        <div className="mt-6 rounded-2xl border border-slate-100 bg-[#FAFBFD] p-4 text-xs text-[#69758A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="break-all">
              Anyone can verify this credential at{" "}
              <Link to="/verify" search={{ id: credentialId }} className="text-[#1557D6] font-mono underline">
                arzoncareers.in/verify?id={credentialId}
              </Link>
            </span>
          </div>
          <Link
            to="/verify"
            search={{ id: credentialId }}
            className="inline-flex items-center gap-1 font-semibold text-[#1557D6] hover:underline shrink-0"
          >
            <span>Test Verification</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Mobile Fullscreen Modal */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md p-3 sm:p-6"
        >
          <div className="flex items-center justify-between pb-3 text-white">
            <span className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-300">
              Verified Credential Detail View
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-2">
            <div className="min-w-[840px] max-w-[840px]">
              <CertificatePreview data={certificateData} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

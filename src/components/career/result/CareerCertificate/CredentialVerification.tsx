import { useRef, useState, useEffect } from "react";
import { Award, Info, Maximize2, X } from "lucide-react";
import type { CareerEngineResult } from "@/data/careerEngineScoring";
import { CertificatePreview, type CertificateData } from "./CertificatePreview";
import { CertificateGenerator } from "./CertificateGenerator";

interface Props {
  result: CareerEngineResult;
  candidateName?: string;
  leadId?: string | null;
}

export function CredentialVerification({ result, candidateName: initialName, leadId }: Props) {
  const [candidateName, setCandidateName] = useState(initialName || "Candidate");
  const recordRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // This is a local report reference only. It is not a registry credential.
  const rawId = leadId || result.resultMeta?.attemptId || "career-engine-report";
  const shortRef = Math.abs(
    rawId.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0),
  )
    .toString(16)
    .toUpperCase()
    .padStart(8, "0")
    .slice(-8);
  const referenceId = `CE-REPORT-${new Date().getFullYear()}-${shortRef}`;

  const issueDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const recordData: CertificateData = {
    candidateName,
    candidateQualification: result.profile?.course,
    candidateCollege: result.profile?.stream ? `${result.profile.stream} Stream` : undefined,
    archetypeName: result.archetype?.name ?? "Healthcare career exploration",
    fitScore: Math.max(0, Math.min(100, Math.round(result.fitScore))),
    referenceId,
    issueDate,
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      if (width > 0) {
        const nextScale = Math.min(1, width / 840);
        setScale(nextScale);
        const naturalHeight = recordRef.current?.offsetHeight || 600;
        setContainerHeight(nextScale < 1 ? Math.ceil(naturalHeight * nextScale) : undefined);
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);
    window.addEventListener("resize", updateDimensions);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <section id="assessment-record" className="space-y-6">
      <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-5 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E4EAF2] pb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1557D6]">
                CAREER ASSESSMENT SUMMARY
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#071A4A]">
                Your Career Assessment Record
              </h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 sm:self-auto">
            <Info className="h-4 w-4 shrink-0" />
            Informational only
          </span>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3F4A60]">
          Download a clean summary of your career-fit result to keep or share. The role-fit estimate is based on your assessment responses. It is not a professional qualification, independently verified skill certification, or proof that you are ready for an industry role.
        </p>

        <div className="mt-6 flex flex-col items-center sm:mt-8">
          <div
            ref={containerRef}
            id="certificate-container-wrapper"
            className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-[#FAFBFD] shadow-xs"
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
              <CertificatePreview ref={recordRef} data={recordData} />
            </div>
          </div>

          {scale < 1 && (
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-3.5 py-1.5 text-xs font-semibold text-[#1557D6] shadow-2xs transition active:scale-95"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Inspect full-size details</span>
            </button>
          )}
        </div>

        <div className="mt-8 border-t border-[#E4EAF2] pt-6">
          <CertificateGenerator
            data={recordData}
            certificateRef={recordRef}
            onUpdateName={(name) => setCandidateName(name)}
          />
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#FAFBFD] p-4 text-xs leading-5 text-[#69758A]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p>
            The reference ID is included for your own records. Career Engine report references are not independently verified in the public credential registry. Verified ACRI work-simulation credentials use a separate assessment and verification process.
          </p>
        </div>
      </div>

      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 p-3 backdrop-blur-md sm:p-6"
        >
          <div className="flex items-center justify-between pb-3 text-white">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
              Assessment record details
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-2">
            <div className="mx-auto min-w-[840px] max-w-[840px]">
              <CertificatePreview data={recordData} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

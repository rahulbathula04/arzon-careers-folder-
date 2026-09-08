import { useState } from "react";
import { Download, FileText, CheckCircle2, Building2, Sparkles } from "lucide-react";
import { generateWorkshopBrochurePDF } from "@/lib/workshop-brochure-pdf";
import { track } from "@/lib/track";

interface WorkshopBrochureDownloadButtonProps {
  variant?: "primary" | "secondary" | "outline" | "admin";
  className?: string;
  customInstitution?: string;
  label?: string;
  showSubtext?: boolean;
}

export function WorkshopBrochureDownloadButton({
  variant = "primary",
  className = "",
  customInstitution,
  label = "Download Institutional Brochure (PDF)",
  showSubtext = false,
}: WorkshopBrochureDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    track("institutional_brochure_download", {
      props: {
        source: variant,
        institution: customInstitution || "general",
      },
    });

    try {
      generateWorkshopBrochurePDF({
        institutionName: customInstitution || "Partner University / College of Pharmacy",
        recipientName: "The Principal / Head of Placements (TPO) / Chairman",
        recipientTitle: "Academic Leadership & Placement Directorate",
      });
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error("[Workshop Brochure Download Error]", err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (variant === "admin") {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-300 bg-blue-50/80 hover:bg-blue-100 text-blue-900 font-mono text-xs font-bold transition-colors cursor-pointer shadow-2xs disabled:opacity-60 ${className}`}
        title="Download official PDF brochure for TPOs, Principals, and Chairmen"
      >
        {downloaded ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <Download className="w-3.5 h-3.5 text-blue-700" />
        )}
        <span>{isGenerating ? "Building PDF..." : downloaded ? "Downloaded!" : label}</span>
      </button>
    );
  }

  if (variant === "outline") {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isGenerating}
          className={`inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-stone-800 bg-white hover:bg-stone-50 text-stone-900 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-60 tone-light ${className}`}
        >
          {downloaded ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <Download className="w-4 h-4 text-stone-800" />
          )}
          <span>{isGenerating ? "Generating Prospectus..." : downloaded ? "Brochure Downloaded!" : label}</span>
        </button>
        {showSubtext && (
          <p className="text-[11px] text-stone-500 font-sans">
            5-page official prospectus covering syllabus, faculty, and college partnership guidelines.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className={`inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[var(--color-medical-navy)] hover:bg-[#1B3F8B] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-60 text-center ${className}`}
      >
        {downloaded ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <Download className="w-4 h-4 text-sky-400" />
        )}
        <span>{isGenerating ? "Generating Prospectus..." : downloaded ? "Brochure Downloaded!" : label}</span>
      </button>
      {showSubtext && (
        <p className="text-[11px] text-stone-500 font-sans">
          Curated for College Chairmen, Principals &amp; Placement Officers (TPOs).
        </p>
      )}
    </div>
  );
}

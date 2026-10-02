import { useState, type RefObject } from "react";
import { Download, Linkedin, Copy, Check, ExternalLink, Edit3, Award, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import type { CertificateData } from "./CertificatePreview";

interface Props {
  data: CertificateData;
  certificateRef: RefObject<HTMLDivElement | null>;
  onUpdateName?: (newName: string) => void;
}

export function CertificateGenerator({ data, certificateRef, onUpdateName }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(data.candidateName);

  // Export the same responsive certificate canvas into a true A4-landscape page.
  // Fit by both width and height so the document can never be clipped vertically.
  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Preparing your certificate PDF...", { id: "ce-cert-pdf" });

    try {
      await document.fonts?.ready;

      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(certificateRef.current, {
        scale: Math.min(3, Math.max(2, window.devicePixelRatio || 2)),
        useCORS: true,
        backgroundColor: "#FCFBF7",
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const padding = 4;
      const availableW = pageW - padding * 2;
      const availableH = pageH - padding * 2;
      const scale = Math.min(availableW / canvas.width, availableH / canvas.height);
      const renderW = canvas.width * scale;
      const renderH = canvas.height * scale;
      const x = (pageW - renderW) / 2;
      const y = (pageH - renderH) / 2;

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        x,
        y,
        renderW,
        renderH,
        undefined,
        "FAST",
      );

      const filename = `Arzon_Career_Certificate_${(data.candidateName || "Candidate").replace(/\\s+/g, "_")}_${data.credentialId}.pdf`;
      pdf.save(filename);

      toast.success("Certificate PDF downloaded.", { id: "ce-cert-pdf" });
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("PDF export failed. Please try again.", { id: "ce-cert-pdf" });
    } finally {
      setIsExporting(false);
    }
  };

  // Download High-Resolution Certificate PNG (Ideal for LinkedIn Posts & Portfolios)
  const handleDownloadPng = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Generating high-resolution certificate image...", { id: "ce-cert-png" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#FCFBF7",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `Arzon_Certificate_${(data.candidateName || "Candidate").replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Certificate image downloaded!", { id: "ce-cert-png" });
    } catch (err) {
      console.error("PNG export error:", err);
      toast.error("Image export error. Please try again.", { id: "ce-cert-png" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(data.verificationUrl);
      setCopiedLink(true);
      toast.success("Official verification link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim().length >= 2) {
      onUpdateName?.(tempName.trim());
      setIsEditingName(false);
      toast.success("Candidate name updated on certificate!");
    }
  };

  // Official LinkedIn Add-to-Profile Certification URL
  const linkedInCertUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    `Career Aptitude: ${data.archetypeName}`,
  )}&organizationName=${encodeURIComponent(
    "Arzon Global",
  )}&issueYear=${new Date().getFullYear()}&issueMonth=${
    new Date().getMonth() + 1
  }&certUrl=${encodeURIComponent(data.verificationUrl)}&certId=${encodeURIComponent(
    data.credentialId,
  )}`;

  return (
    <div className="space-y-4">
      {/* Candidate Name Customization Form */}
      {isEditingName ? (
        <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md mx-auto w-full">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your official full name for the certificate"
            className="flex-1 rounded-xl border border-[#D0E1FD] bg-white tone-light px-3.5 py-2.5 text-sm text-[#071A4A] outline-hidden focus:ring-2 focus:ring-[#1557D6] min-h-11"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 sm:flex-initial rounded-xl bg-[#071A4A] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#1557D6] min-h-11"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setTempName(data.candidateName);
                setIsEditingName(false);
              }}
              className="flex-1 sm:flex-initial rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 min-h-11"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsEditingName(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1557D6] hover:underline"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Spelling incorrect? Edit your name on the certificate</span>
          </button>
        </div>
      )}

      {/* Primary Action Buttons: Certificate Only */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
        {/* PDF Download Button */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#1557D6] transition-all disabled:opacity-50 w-full sm:w-auto"
        >
          <Download className="h-4 w-4" />
          <span>{isExporting ? "Generating PDF..." : "Download Certificate (PDF)"}</span>
        </button>

        {/* PNG Download Button */}
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={isExporting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-2.5 text-sm font-bold text-[#1557D6] hover:bg-[#DCEBFE] transition-all disabled:opacity-50 w-full sm:w-auto"
        >
          <FileText className="h-4 w-4" />
          <span>Save as Image (PNG)</span>
        </button>

        {/* Add to LinkedIn Profile */}
        <a
          href={linkedInCertUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0A66C2] bg-[#0A66C2] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#084e96] transition-all w-full sm:w-auto"
        >
          <Linkedin className="h-4 w-4" />
          <span>Add to LinkedIn</span>
        </a>

        {/* Copy Verification Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#E4EAF2] bg-white tone-light px-4 py-2.5 text-sm font-medium text-[#071A4A] hover:bg-slate-50 transition-all w-full sm:w-auto"
        >
          {copiedLink ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-[#69758A]" />
              <span>Copy Verification URL</span>
            </>
          )}
        </button>
      </div>

      <p className="text-center font-mono text-[11px] text-[#69758A]">
        PDF and PNG exports use the certificate shown above · Verified ID: {data.credentialId}
      </p>
    </div>
  );
}

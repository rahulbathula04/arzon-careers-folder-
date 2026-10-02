import { useState, type RefObject } from "react";
import { Download, Share2, Linkedin, Copy, Check, ExternalLink, Edit3, Award, Sparkles } from "lucide-react";
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

  // Download High-Definition A4 Landscape PDF
  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Rendering 300-DPI archival credential PDF...", { id: "ce-cert-pdf" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#070D1E",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        Math.max(0, (pdf.internal.pageSize.getHeight() - pdfHeight) / 2),
        pdfWidth,
        pdfHeight,
      );

      const filename = `Arzon_Career_Certificate_${(data.candidateName || "Candidate").replace(/\s+/g, "_")}_${data.credentialId}.pdf`;
      pdf.save(filename);

      toast.success("Official Credential PDF downloaded successfully!", { id: "ce-cert-pdf" });
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("PDF generation encountered an issue. Opening print dialog...", { id: "ce-cert-pdf" });
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Download PNG for Social / LinkedIn
  const handleDownloadPng = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Generating high-resolution certificate image...", { id: "ce-cert-png" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#070D1E",
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `Arzon_Certificate_${(data.candidateName || "Candidate").replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Certificate image downloaded!", { id: "ce-cert-png" });
    } catch (err) {
      console.error("PNG export error:", err);
      toast.error("Image download error. Please try again.", { id: "ce-cert-png" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(data.verificationUrl);
      setCopiedLink(true);
      toast.success("Verification URL copied to clipboard!");
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
      {/* Name Customization Toggle */}
      {isEditingName ? (
        <form onSubmit={handleSaveName} className="flex items-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your full name as it should appear on certificate"
            className="flex-1 rounded-xl border border-[#D0E1FD] bg-white tone-light px-3.5 py-2 text-sm text-[#071A4A] outline-hidden focus:ring-2 focus:ring-[#1557D6]"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-xl bg-[#071A4A] px-4 py-2 text-xs font-bold text-white hover:bg-[#1557D6]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditingName(false)}
            className="rounded-xl border border-slate-200 bg-white tone-light px-3 py-2 text-xs text-slate-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsEditingName(true)}
            className="inline-flex items-center gap-1.5 text-xs text-[#1557D6] hover:underline font-medium"
          >
            <Edit3 className="h-3 w-3" />
            <span>Spelling incorrect? Edit name on certificate</span>
          </button>
        </div>
      )}

      {/* Main Download & Integration Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* PDF Download */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="inline-flex items-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1557D6] transition-all disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>Download Official PDF (300 DPI)</span>
        </button>

        {/* PNG Download */}
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={isExporting}
          className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-3 text-sm font-bold text-[#1557D6] hover:bg-[#E0EEFD] transition-all disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          <span>Download Badge (PNG)</span>
        </button>

        {/* Add to LinkedIn Profile */}
        <a
          href={linkedInCertUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#0077B5]/30 bg-[#0077B5]/10 px-5 py-3 text-sm font-bold text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all"
        >
          <Linkedin className="h-4 w-4" />
          <span>Add to LinkedIn Profile</span>
        </a>

        {/* Copy Verification Link */}
        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white tone-light px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
        >
          {copiedLink ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Link Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-500" />
              <span>Copy Verification URL</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

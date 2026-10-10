import { useState, type RefObject } from "react";
import { Download, Edit3, FileText } from "lucide-react";
import { toast } from "sonner";
import type { CertificateData } from "./CertificatePreview";

interface Props {
  data: CertificateData;
  certificateRef: RefObject<HTMLDivElement | null>;
  onUpdateName?: (newName: string) => void;
}

export function CertificateGenerator({ data, certificateRef, onUpdateName }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(data.candidateName);

  // Download the informational Career Engine assessment record as an A4 landscape PDF
  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Preparing your career assessment record PDF...", { id: "ce-cert-pdf" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const certEl = certificateRef.current;

      // 1. Ensure all images inside the certificate (signatures, seals) are fully loaded
      const images = certEl.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // 2. Ensure web fonts are rendered
      if (document.fonts) {
        await document.fonts.ready;
      }

      // 3. Strictly capture the certificate DOM node with 3x print resolution
      const canvas = await html2canvas(certEl, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FCFBF7",
        logging: false,
        onclone: (clonedDoc) => {
          const cert = clonedDoc.getElementById("arzon-career-certificate");
          if (cert) {
            cert.style.transform = "none";
            cert.style.width = "840px";
            cert.style.maxWidth = "840px";
            cert.style.minWidth = "840px";
            cert.style.margin = "0 auto";
            cert.style.overflow = "visible";
            cert.style.position = "static";
          }
          const wrapper = clonedDoc.getElementById("certificate-scale-wrapper");
          if (wrapper) {
            wrapper.style.transform = "none";
            wrapper.style.width = "840px";
            wrapper.style.maxWidth = "840px";
            wrapper.style.height = "auto";
            wrapper.style.maxHeight = "none";
            wrapper.style.overflow = "visible";
          }
          const container = clonedDoc.getElementById("certificate-container-wrapper");
          if (container) {
            container.style.height = "auto";
            container.style.maxHeight = "none";
            container.style.overflow = "visible";
            container.style.width = "840px";
          }

          // Unclamp all parent elements so no ancestor clips the certificate during rendering
          let p = cert?.parentElement;
          while (p && p !== clonedDoc.body) {
            p.style.overflow = "visible";
            p.style.maxHeight = "none";
            if (p.style.height && p.style.height !== "auto") {
              p.style.height = "auto";
            }
            p = p.parentElement;
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth(); // 297mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm

      // Safe margins of at least 10mm around the certificate
      const margin = 10;
      const maxW = pdfWidth - margin * 2; // 277mm
      const maxH = pdfHeight - margin * 2; // 190mm

      // Proportional fit ensuring neither width nor height overflows A4 page
      const fitScale = Math.min(maxW / canvas.width, maxH / canvas.height);
      const renderWidth = canvas.width * fitScale;
      const renderHeight = canvas.height * fitScale;
      const x = (pdfWidth - renderWidth) / 2;
      const y = (pdfHeight - renderHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight, undefined, "FAST");

      const filename = `Arzon_Career_Assessment_Record_${(data.candidateName || "Candidate").replace(/\s+/g, "_")}_${data.referenceId}.pdf`;
      pdf.save(filename);

      toast.success("Assessment record PDF downloaded successfully!", { id: "ce-cert-pdf" });
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("PDF export encountered an issue. Opening browser print view...", { id: "ce-cert-pdf" });
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Download a high-resolution image of the informational assessment record
  const handleDownloadPng = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading("Preparing your assessment record image...", { id: "ce-cert-png" });

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const certEl = certificateRef.current;

      const images = certEl.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      if (document.fonts) {
        await document.fonts.ready;
      }

      const canvas = await html2canvas(certEl, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FCFBF7",
        logging: false,
        onclone: (clonedDoc) => {
          const cert = clonedDoc.getElementById("arzon-career-certificate");
          if (cert) {
            cert.style.transform = "none";
            cert.style.width = "840px";
            cert.style.maxWidth = "840px";
            cert.style.minWidth = "840px";
            cert.style.margin = "0 auto";
            cert.style.overflow = "visible";
            cert.style.position = "static";
          }
          const wrapper = clonedDoc.getElementById("certificate-scale-wrapper");
          if (wrapper) {
            wrapper.style.transform = "none";
            wrapper.style.width = "840px";
            wrapper.style.maxWidth = "840px";
            wrapper.style.height = "auto";
            wrapper.style.maxHeight = "none";
            wrapper.style.overflow = "visible";
          }
          const container = clonedDoc.getElementById("certificate-container-wrapper");
          if (container) {
            container.style.height = "auto";
            container.style.maxHeight = "none";
            container.style.overflow = "visible";
            container.style.width = "840px";
          }

          let p = cert?.parentElement;
          while (p && p !== clonedDoc.body) {
            p.style.overflow = "visible";
            p.style.maxHeight = "none";
            if (p.style.height && p.style.height !== "auto") {
              p.style.height = "auto";
            }
            p = p.parentElement;
          }
        },
      });

      const link = document.createElement("a");
      link.download = `Arzon_Career_Assessment_Record_${(data.candidateName || "Candidate").replace(/\s+/g, "_")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Assessment record image downloaded!", { id: "ce-cert-png" });
    } catch (err) {
      console.error("PNG export error:", err);
      toast.error("Image export error. Please try again.", { id: "ce-cert-png" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim().length >= 2) {
      onUpdateName?.(tempName.trim());
      setIsEditingName(false);
      toast.success("Display name updated on assessment record!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Candidate Name Customization Form */}
      {isEditingName ? (
        <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md mx-auto w-full">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your name to display on the assessment record"
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
            <span>Spelling incorrect? Edit your name on the assessment record</span>
          </button>
        </div>
      )}

      {/* Primary Action Buttons: Certificate Only */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 pt-2">
        {/* PDF Download Button */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#1557D6] transition-all active:scale-[0.98] disabled:opacity-50 w-full sm:w-auto cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>{isExporting ? "Generating PDF..." : "Download Assessment Record (PDF)"}</span>
        </button>

        {/* PNG Download Button */}
        <button
          type="button"
          onClick={handleDownloadPng}
          disabled={isExporting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-5 py-3 text-sm font-bold text-[#1557D6] hover:bg-[#DCEBFE] transition-all active:scale-[0.98] disabled:opacity-50 w-full sm:w-auto cursor-pointer"
        >
          <FileText className="h-4 w-4" />
          <span>Save as Image (PNG)</span>
        </button>


      </div>

      <p className="text-center font-mono text-[11px] text-[#69758A]">
        Informational assessment record · Reference ID: {data.referenceId}
      </p>
    </div>
  );
}

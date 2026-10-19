import { useState, type RefObject } from "react";
import { Download, Edit3, FileText, Check, Award, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ArzonDownloadButton } from "@/components/ui/download-button";
import type { CertificateData } from "./CertificatePreview";

interface Props {
  data: CertificateData;
  certificateRef: RefObject<HTMLDivElement | null>;
  onUpdateName?: (newName: string) => void;
  viewMode?: "card" | "certificate";
}

export function CertificateGenerator({ data, certificateRef, onUpdateName, viewMode = "card" }: Props) {
  const [isExporting, setIsExporting] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(data.candidateName);

  // Download assessment record / official certificate as an A4 landscape PDF
  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading(
      viewMode === "certificate"
        ? "Generating official Arzon industry certificate PDF..."
        : "Preparing candidate result card PDF...",
      { id: "ce-cert-pdf" }
    );

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const certEl = certificateRef.current;

      // Ensure images are fully loaded
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
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
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

      const margin = 10;
      const maxW = pdfWidth - margin * 2;
      const maxH = pdfHeight - margin * 2;

      const fitScale = Math.min(maxW / canvas.width, maxH / canvas.height);
      const renderWidth = canvas.width * fitScale;
      const renderHeight = canvas.height * fitScale;
      const x = (pdfWidth - renderWidth) / 2;
      const y = (pdfHeight - renderHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight, undefined, "FAST");

      const cleanName = (data.candidateName || "Candidate").replace(/\s+/g, "_");
      const prefix = viewMode === "certificate" ? "Arzon_Official_Certificate" : "Arzon_Career_Result_Card";
      const filename = `${prefix}_${cleanName}_${data.referenceId}.pdf`;
      pdf.save(filename);

      toast.success(
        viewMode === "certificate"
          ? "Official Certificate PDF downloaded!"
          : "Result Card PDF downloaded!",
        { id: "ce-cert-pdf" }
      );
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("PDF export encountered an issue. Opening browser print view...", { id: "ce-cert-pdf" });
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Download high-resolution PNG image
  const handleDownloadPng = async () => {
    if (!certificateRef.current) return;
    setIsExporting(true);
    toast.loading(
      viewMode === "certificate"
        ? "Generating high-resolution Certificate image..."
        : "Preparing high-resolution Result Card image...",
      { id: "ce-cert-png" }
    );

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
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const cleanName = (data.candidateName || "Candidate").replace(/\s+/g, "_");
      const prefix = viewMode === "certificate" ? "Arzon_Official_Certificate" : "Arzon_Career_Result_Card";
      const link = document.createElement("a");
      link.download = `${prefix}_${cleanName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success(
        viewMode === "certificate"
          ? "Certificate image saved in HD! Ready to share."
          : "Result Card image saved in HD! Ready to share.",
        { id: "ce-cert-png" }
      );
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
      toast.success("Candidate name updated across card & certificate!");
    }
  };

  return (
    <div className="space-y-4">
      {/* Candidate Name Live Customizer */}
      {isEditingName ? (
        <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md mx-auto w-full">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="Your full name for the certificate / card"
            className="flex-1 rounded-xl border border-slate-200/80 bg-white tone-light px-3.5 py-2.5 text-sm text-[#081F38] outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 min-h-11 shadow-2xs font-semibold"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 sm:flex-initial rounded-xl bg-[#081F38] hover:bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs min-h-11 active:scale-95 transition-all cursor-pointer"
            >
              Save Name
            </button>
            <button
              type="button"
              onClick={() => {
                setTempName(data.candidateName);
                setIsEditingName(false);
              }}
              className="flex-1 sm:flex-initial rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 min-h-11 active:scale-95 transition-all cursor-pointer"
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
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Spelling incorrect? Edit your name on the certificate &amp; card</span>
          </button>
        </div>
      )}

      {/* Primary Export Actions Bar - Uiverse Animated Download Suite */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-2">
        {/* PDF Download Button */}
        <ArzonDownloadButton
          label={viewMode === "certificate" ? "Download Certificate (PDF)" : "Download Result Card (PDF)"}
          completedLabel={viewMode === "certificate" ? "Certificate Saved!" : "Result Card Saved!"}
          onDownload={handleDownloadPdf}
          disabled={isExporting}
          variant="primary"
          theme="light"
        />

        {/* PNG Download Button */}
        <ArzonDownloadButton
          label={viewMode === "certificate" ? "Save Certificate Image (PNG)" : "Save Result Card Image (PNG)"}
          completedLabel="Image Saved!"
          onDownload={handleDownloadPng}
          disabled={isExporting}
          variant="outline"
          theme="light"
          icon={<ImageIcon className="arzon-dl-icon" strokeWidth={2.2} />}
        />
      </div>

      <p className="text-center font-mono text-[11px] text-slate-500">
        Tamper-proof verifiable record · Ledger Audit Ref: {data.referenceId}
      </p>
    </div>
  );
}

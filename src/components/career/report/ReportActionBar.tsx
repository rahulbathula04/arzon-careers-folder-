import { useState, type RefObject } from "react";
import { Download, Share2 } from "lucide-react";
import { exportReportPdf } from "@/lib/report/exportPdf";
import { track } from "@/lib/track";
import { useReportState } from "./ReportStateContext";

export function ReportActionBar({
  captureRef,
  leadId,
}: {
  captureRef: RefObject<HTMLElement | null>;
  leadId?: string | null;
}) {
  const state = useReportState();
  const [busy, setBusy] = useState<string | null>(null);

  async function handleDownload() {
    const root = captureRef.current;
    if (!root) return;
    setBusy("Preparing…");
    state.expandAll();
    await new Promise((r) => setTimeout(r, 250));
    track("report_pdf_export_v5", { lead_id: leadId ?? null });
    try {
      await exportReportPdf({
        root,
        filename: `arzon-career-fit-report-${(leadId ?? "draft").slice(0, 8)}.pdf`,
        onProgress: (m) => setBusy(m),
        quizProfile: state.quizProfile,
      });
    } catch (err) {
      console.error("[report] pdf export failed", err);
      setBusy("Export failed");
      setTimeout(() => setBusy(null), 1600);
      return;
    }
    setBusy(null);
  }

  async function handleShare() {
    if (!leadId) return;
    const url = `https://arzon.in/r/${leadId}`;
    if (navigator.share) {
      await navigator
        .share({
          title: "My Arzon Career Fit Report",
          text: "I just found my strongest healthcare career fit using Arzon's AI. Check out my report!",
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      const old = busy;
      setBusy("Link copied!");
      setTimeout(() => setBusy(old), 2000);
    }
  }

  return (
    <div
      className="report-print-hide mb-4 flex flex-wrap items-center justify-end gap-3"
      role="toolbar"
      aria-label="Report actions"
    >
      <button
        type="button"
        onClick={handleShare}
        className="h-10 px-4 rounded-xl flex items-center gap-2 text-white font-bold text-xs bg-[#2563EB] hover:bg-[#1d4ed8] shadow-md shadow-blue-500/20 transition-all"
      >
        <Share2 className="h-4 w-4" />
        <span>Share Result</span>
      </button>
      <button
        type="button"
        onClick={handleDownload}
        disabled={Boolean(busy)}
        className="h-10 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
      >
        <Download className="h-4 w-4 text-blue-400" />
        <span>{busy ?? "Download PDF Report"}</span>
      </button>
    </div>
  );
}

export default ReportActionBar;

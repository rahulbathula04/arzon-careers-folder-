import { useState, type RefObject } from "react";
import { Download, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { exportReportPdf } from "@/lib/report/exportPdf";
import { track } from "@/lib/track";
import { useReportState } from "./ReportStateContext";
import { REPORT_PRIMARY_CTA_GRADIENT } from "./reportTones";

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
    // Production domain for sharing
    const url = `https://arzon.in/r/${leadId}`;
    if (navigator.share) {
      await navigator.share({
        title: "My Arzon Career Fit Report",
        text: "I just found my strongest healthcare career fit using Arzon's AI. Check out my report!",
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      const old = busy;
      setBusy("Link copied!");
      setTimeout(() => setBusy(old), 2000);
    }
  }

  return (
    <div
      className="report-print-hide mb-4 flex flex-wrap items-center justify-end gap-2"
      role="toolbar"
      aria-label="Report actions"
    >
      <button
        type="button"
        onClick={handleShare}
        className="report-focus-ring inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-semibold text-sky-400 transition hover:bg-sky-500/20"
      >
        <Linkedin className="h-3.5 w-3.5" aria-hidden />
        Share Result
      </button>
      <button
        type="button"
        onClick={handleDownload}
        disabled={Boolean(busy)}
        className={cn(
          "report-focus-ring inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white disabled:opacity-60 transition hover:scale-[1.02] shadow-[0_0_15px_rgba(255,255,255,0.2)]",
        )}
      >
        <Download className={cn("h-3.5 w-3.5", busy && "motion-safe:animate-pulse")} aria-hidden />
        {busy ?? "Download PDF"}
      </button>
    </div>
  );
}

export default ReportActionBar;

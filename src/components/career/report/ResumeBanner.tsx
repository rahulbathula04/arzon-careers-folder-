import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useReportState } from "./ReportStateContext";
import { REPORT_TONES, REPORT_RESUME_BANNER_GRADIENT } from "./reportTones";

export function ResumeBanner({
  chapters,
}: {
  chapters: { id: string; number: number; label: string }[];
}) {
  const state = useReportState();
  const [visible, setVisible] = useState(false);
  const [chapter, setChapter] = useState<{ id: string; number: number; label: string } | null>(
    null,
  );

  useEffect(() => {
    if (state.resumeDismissed) return;
    const initialId = state.lastChapterId;
    if (!initialId) return;
    const found = chapters.find((c) => c.id === initialId);
    if (!found) return;
    // Skip banner if user is already at (or near) the chapter.
    if (found.number <= 1) return;
    setChapter(found);
    setVisible(true);
    const t = window.setTimeout(() => setVisible(false), 12000);
    return () => window.clearTimeout(t);
    // Mount-only: snapshot the resume target once so scrolling doesn't
    // re-trigger the banner as lastChapterId updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible || !chapter) return null;

  return (
    <div
      role="status"
      className={`report-print-hide mb-4 flex items-center gap-3 rounded-2xl border ${REPORT_TONES.primary.softBorder} ${REPORT_RESUME_BANNER_GRADIENT} px-4 py-3 text-sm text-white shadow-[0_20px_60px_-30px_rgba(37,99,235,0.4)]`}
    >
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${REPORT_TONES.primary.chipPillBg} font-mono text-[10px] font-semibold ${REPORT_TONES.primary.eyebrow}`}
      >
        {String(chapter.number).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.24em] ${REPORT_TONES.primary.softEyebrow}`}
        >
          Resume where you left off
        </p>
        <p className="truncate text-white/90">
          Chapter {chapter.number} · {chapter.label}
        </p>
      </div>
      <a
        href={`#${chapter.id}`}
        onClick={() => setVisible(false)}
        className="report-focus-ring inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-white"
      >
        Continue <ArrowRight className="h-3 w-3" aria-hidden />
      </a>
      <button
        type="button"
        onClick={() => {
          state.dismissResume();
          setVisible(false);
        }}
        aria-label="Dismiss"
        className="report-focus-ring inline-flex h-7 w-7 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

export default ResumeBanner;

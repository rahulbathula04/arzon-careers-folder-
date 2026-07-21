/**
 * LeftChapterRail — vertical grouped ToC that replaces the horizontal
 * SectionRail chip strip. Groups all 22 chapters into meaningful sections,
 * shows per-chapter completion, an active accent bar, and a top progress
 * bar. Sticky under the CareerShell header at lg+.
 *
 * Colors are consumed via `.report-rail-*` utilities in styles.css; this
 * file is exempt from the report accent-token gate.
 */
import { useMemo } from "react";
import { Check, Bookmark, RotateCcw, Download } from "lucide-react";
import type { RailChapter } from "./SectionRail";
import { useReportState } from "./ReportStateContext";

export interface RailGroup {
  label: string;
  chapterIds: string[];
}

export function LeftChapterRail({
  chapters,
  groups,
  activeId,
  onJump,
}: {
  chapters: RailChapter[];
  groups: RailGroup[];
  activeId: string | null;
  onJump?: (id: string) => void;
}) {
  const state = useReportState();
  const total = chapters.length;
  const completedCount = useMemo(
    () => chapters.filter((c) => state.completed.includes(c.id)).length,
    [chapters, state],
  );
  const pct = total ? Math.round((completedCount / total) * 100) : 0;
  const actionProgress = state.actionPlanProgress;
  const booking = state.counsellorBooking;
  const bookingLabel = useMemo(() => {
    if (!booking) return null;
    const d = new Date(booking.slotAt ?? booking.bookedAt);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [booking]);

  const byId = useMemo(() => {
    const m = new Map<string, RailChapter>();
    for (const c of chapters) m.set(c.id, c);
    return m;
  }, [chapters]);

  const handleClick = (id: string) => {
    onJump?.(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Report chapters" className="report-rail-nav report-print-hide hidden lg:block">
      <div className="report-progress-card">
        <div className="flex items-end justify-between gap-3">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
            Your progress
          </p>
          <p
            className="text-[22px] leading-none italic text-[#EAFDF7] tabular-nums"
            style={{ fontFamily: "var(--font-serif-display)" }}
          >
            {completedCount}
            <span className="text-white/35"> / {total}</span>
          </p>
        </div>
        <div className="report-rail-progress mt-4">
          <div className="report-rail-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-white/70">
          {pct === 0 ? (
            "Start with the Verdict — 30 seconds."
          ) : pct < 40 ? (
            <>
              Nice start. Keep going — the <span className="text-[#5eead4]">Market</span> chapters
              are next.
            </>
          ) : pct < 80 ? (
            <>
              You're halfway. <span className="text-[#5eead4]">Plan</span> chapters are the ones
              recruiters ask about.
            </>
          ) : pct < 100 ? (
            "Almost there — finish the 7-day streak."
          ) : (
            "Full brief unlocked. Book a counsellor to lock the plan."
          )}
        </p>
        {booking && bookingLabel ? (
          <div
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#5eead4]/25 bg-[#5eead4]/[0.08] px-2.5 py-1"
            role="status"
            title={
              booking.slotAt
                ? bookingLabel
                : `${booking.via === "whatsapp" ? "WhatsApp handoff" : "Slot logged"} · ${bookingLabel}`
            }
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#5eead4] motion-safe:animate-pulse"
              aria-hidden
            />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#5eead4]">
              Counsellor booked
            </span>
          </div>
        ) : null}
      </div>

      <ol className="mt-6 space-y-6">
        {groups.map((group) => (
          <li key={group.label}>
            <p className="report-rail-group-label">{group.label}</p>
            <ol className="space-y-0.5">
              {group.chapterIds.map((id) => {
                const c = byId.get(id);
                if (!c) return null;
                const isActive = activeId === id;
                const isDone = state.completed.includes(id);
                const isBookmarked = state.isBookmarked(id);
                const isActionPlan = id === "ch-20-action-plan";
                const showActionBadge =
                  isActionPlan &&
                  actionProgress.done > 0 &&
                  actionProgress.done < actionProgress.total;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => handleClick(id)}
                      data-active={isActive}
                      data-completed={isDone}
                      aria-current={isActive ? "true" : undefined}
                      className="report-rail-link"
                    >
                      <span className="report-rail-num" aria-hidden>
                        {isDone && !isActive ? (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        ) : (
                          String(c.number).padStart(2, "0")
                        )}
                      </span>
                      <span className="min-w-0 truncate">{c.label}</span>
                      {showActionBadge ? (
                        <span
                          className="ml-auto shrink-0 rounded-full border border-blue-300/40 bg-blue-300/10 px-1.5 py-px font-mono text-[9px] font-semibold tabular-nums text-blue-200"
                          aria-label={`${actionProgress.done} of ${actionProgress.total} steps done`}
                        >
                          {actionProgress.done}/{actionProgress.total}
                        </span>
                      ) : null}
                      {isBookmarked ? (
                        <Bookmark
                          className="h-3 w-3 shrink-0 text-yellow-300/90"
                          fill="currentColor"
                          aria-hidden
                        />
                      ) : isActive ? (
                        <span
                          className="h-1 w-1 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(37,99,235,0.5)]"
                          aria-hidden
                        />
                      ) : (
                        <span aria-hidden />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>

      <div className="mt-6 space-y-2 border-t border-white/8 pt-5">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("report-download-pdf");
            el?.click();
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-xs font-medium text-white/80 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          <Download className="h-3.5 w-3.5 text-white/60" aria-hidden />
          <span>Download PDF</span>
        </button>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("report-retake");
            el?.click();
          }}
          className="flex w-full items-center justify-center gap-1.5 py-2 text-xs font-medium text-white/40 transition-colors hover:text-[#5eead4]"
        >
          <RotateCcw className="h-3 w-3" aria-hidden />
          <span>Retake the test</span>
        </button>
      </div>

      <div className="mt-4 border-t border-white/8 pt-4 text-center">
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/25">
          Discovery brief · India
        </p>
      </div>
    </nav>
  );
}

/**
 * Compact top drawer used on <lg screens: horizontally scrollable chapter
 * chips + progress dot. Keeps the same data as the sidebar but fits mobile.
 */
export function MobileChapterStrip({
  chapters,
  activeId,
  onJump,
}: {
  chapters: RailChapter[];
  activeId: string | null;
  onJump?: (id: string) => void;
}) {
  const state = useReportState();
  const completedCount = chapters.filter((c) => state.completed.includes(c.id)).length;
  const pct = chapters.length ? Math.round((completedCount / chapters.length) * 100) : 0;
  const handleClick = (id: string) => {
    onJump?.(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="report-print-hide lg:hidden mb-4 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
          Report · {chapters.length} chapters
        </p>
        <p className="font-mono text-[10px] tabular-nums text-white/60">
          {completedCount}/{chapters.length} · {pct}%
        </p>
      </div>
      <div className="report-rail-progress mt-2">
        <div className="report-rail-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <ol className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chapters.map((c) => {
          const isActive = activeId === c.id;
          const isDone = state.completed.includes(c.id);
          return (
            <li key={c.id} className="shrink-0">
              <button
                type="button"
                onClick={() => handleClick(c.id)}
                data-active={isActive}
                data-completed={isDone}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 data-[active=true]:border-blue-300/40 data-[active=true]:bg-blue-300/10 data-[active=true]:text-white"
              >
                <span className="font-mono text-[10px] text-white/50">
                  {String(c.number).padStart(2, "0")}
                </span>
                <span className="max-w-[10rem] truncate">{c.label}</span>
                {isDone && !isActive && <Check className="h-3 w-3 text-sky-300" strokeWidth={3} />}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default LeftChapterRail;

/**
 * StickyProgressRail - a slim, sticky pill strip that surfaces the 5-chapter
 * spine (Who / Hire / Look / Compare / Now what). Fills as the user scrolls
 * past each spine anchor. Complements the 20-chapter LeftChapterRail without
 * replacing it.
 */
import { useEffect, useState } from "react";
import { Check, UserRound } from "lucide-react";
import { REPORT_STICKY_RAIL_PILL, REPORT_STICKY_RAIL_DOT } from "./reportTones";
import { BookingDetailsDialog } from "./BookingDetailsDialog";
import { useReportState } from "./ReportStateContext";
import { track } from "@/lib/track";

export interface SpineStep {
  id: string;
  label: string;
  anchorId: string;
}

export const REPORT_SPINE: SpineStep[] = [
  { id: "spine-who", label: "Your Best Match", anchorId: "ch-1-verdict" },
  { id: "spine-compare", label: "Other Good Options", anchorId: "ch-4-primary" },
  { id: "spine-look", label: "Inside This Career", anchorId: "ch-7-companies" },
  { id: "spine-hire", label: "Your Hiring Readiness", anchorId: "ch-16-gap" },
  { id: "spine-now", label: "Your Action Plan", anchorId: "ch-20-action-plan" },
];

export function StickyProgressRail({ steps = REPORT_SPINE }: { steps?: SpineStep[] }) {
  const [reachedIdx, setReachedIdx] = useState(-1);
  const [editorOpen, setEditorOpen] = useState(false);
  const { bookingProfile } = useReportState();
  const hasBookingDetails = Boolean(
    bookingProfile && (bookingProfile.name || bookingProfile.phone || bookingProfile.role),
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = steps.findIndex((s) => s.anchorId === e.target.id);
          if (idx >= 0) {
            setReachedIdx((prev) => Math.max(prev, idx));
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    for (const s of steps) {
      const el = document.getElementById(s.anchorId);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [steps]);

  const jump = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIdx = Math.max(0, reachedIdx);
  const pct =
    steps.length > 1 ? Math.round((Math.max(0, reachedIdx) / (steps.length - 1)) * 100) : 0;

  return (
    <nav
      aria-label="Report spine progress"
      className="report-print-hide sticky top-[57px] z-20 -mx-1 mb-4 rounded-2xl border border-white/8 bg-[color:color-mix(in_oklab,#0A0F1F_82%,transparent)] px-3 py-2.5 backdrop-blur-xl"
    >
      <div className="report-rail-progress" aria-hidden>
        <div className="report-rail-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <ol className="flex flex-1 gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((s, i) => {
            const done = i < activeIdx;
            const active = i === activeIdx;
            return (
              <li key={s.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => jump(s.anchorId)}
                  data-active={active}
                  data-done={done}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-white/70 transition hover:text-white ${REPORT_STICKY_RAIL_PILL} data-[active=true]:text-white`}
                >
                  <span
                    aria-hidden
                    className={`grid h-4 w-4 place-items-center rounded-full border border-white/15 bg-white/5 text-[9.5px] font-mono tabular-nums text-white/60 ${REPORT_STICKY_RAIL_DOT}`}
                    data-active={active}
                    data-done={done}
                  >
                    {done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : i + 1}
                  </span>
                  {s.label}
                </button>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={() => {
            track("report_booking_profile_edit_open", {
              lead_id: null,
              props: { source: "sticky_rail", has_details: hasBookingDetails },
            });
            setEditorOpen(true);
          }}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12px] font-medium text-white/75 transition hover:border-white/35 hover:bg-white/[0.08] hover:text-white"
          aria-label={hasBookingDetails ? "Edit your booking details" : "Add your booking details"}
          title={hasBookingDetails ? "Edit booking details" : "Add booking details"}
        >
          <UserRound className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">
            {hasBookingDetails ? "Edit details" : "Add details"}
          </span>
        </button>
      </div>
      <BookingDetailsDialog open={editorOpen} onOpenChange={setEditorOpen} />
    </nav>
  );
}

export default StickyProgressRail;

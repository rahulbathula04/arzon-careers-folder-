import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { REPORT_TONES, REPORT_RAIL_PROGRESS_GRADIENT } from "./reportTones";

/**
 * SectionRail - compact horizontal chapter strip that sits above the
 * report. Scrolls on overflow, sticks under the sticky header on scroll.
 * The old vertical left-column rail stole ~200px of horizontal space and
 * caused the score/decision cards to collapse and character-wrap.
 */
export interface RailChapter {
  id: string;
  number: number;
  label: string;
}

export function SectionRail({
  chapters,
  activeId,
  className,
  onJump,
}: {
  chapters: RailChapter[];
  activeId: string | null;
  className?: string;
  onJump?: (toId: string) => void;
}) {
  const activeIndex = Math.max(
    0,
    chapters.findIndex((c) => c.id === activeId),
  );
  const progress = chapters.length ? Math.round(((activeIndex + 1) / chapters.length) * 100) : 0;
  return (
    <nav
      aria-label="Report chapters"
      className={cn(
        "sticky top-[57px] z-20 -mx-4 border-b border-white/10 bg-[#070B16]/85 px-4 py-3 backdrop-blur-xl sm:top-[57px] sm:-mx-6 sm:px-6",
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
          Your report
        </p>
        <div className="h-px flex-1 bg-white/10" />
        <p className="font-mono text-[10px] tabular-nums text-white/55">
          <span className={REPORT_TONES.primary.accentText}>
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/30"> / {String(chapters.length).padStart(2, "0")}</span>
          <span className="ml-2 text-white/40">· {progress}%</span>
        </p>
      </div>
      <ol className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chapters.map((c, i) => {
          const active = c.id === activeId;
          const done = i < activeIndex;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={active ? "location" : undefined}
                onClick={() => onJump?.(c.id)}
                className={cn(
                  "report-rail-item motion-safe:transition-all",
                  active && "report-rail-item-active",
                  !active && done && "report-rail-item-done",
                )}
                style={
                  active
                    ? ({ ["--rail-accent" as string]: "#5eead4" } as React.CSSProperties)
                    : undefined
                }
              >
                <span
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center rounded-full border font-mono text-[9px] tabular-nums",
                    active
                      ? `${REPORT_TONES.primary.statePill}`
                      : done
                        ? `${REPORT_TONES.secondary.statePill}`
                        : "border-white/15 bg-white/[0.03] text-white/60",
                  )}
                >
                  {done ? <Check className="h-3 w-3" aria-hidden strokeWidth={3} /> : c.number}
                </span>
                <span>{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${REPORT_RAIL_PROGRESS_GRADIENT} motion-safe:transition-all motion-safe:duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  );
}

export default SectionRail;

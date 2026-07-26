import { forwardRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScoreChip, type ScoreBand } from "./ScoreChip";
import { useReportState } from "./ReportStateContext";

export type CardTone = "primary" | "secondary" | "warn" | "ruled-out" | "neutral";

const TONE_LABEL: Record<CardTone, string> = {
  primary: "Recommended",
  secondary: "Strong",
  warn: "Watch",
  "ruled-out": "Ruled out",
  neutral: "Chapter",
};

export interface ReportCardProps {
  chapter?: number;
  chapterTotal?: number;
  readMinutes?: number;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  score?: { value: number; band?: ScoreBand; of?: number; suffix?: string };
  media?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  tone?: CardTone;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
  summary?: ReactNode;
  whatThisMeans?: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export const ReportCard = forwardRef<HTMLElement, ReportCardProps>(function ReportCard(
  {
    chapter,
    chapterTotal,
    readMinutes,
    eyebrow,
    title,
    subtitle,
    score,
    media,
    children,
    actions,
    footer,
    tone = "neutral",
    className,
    id,
    "aria-labelledby": ariaLabelledby,
    summary,
    whatThisMeans,
    collapsible = true,
    defaultExpanded,
  },
  ref,
) {
  const headingId = id ? `${id}-title` : undefined;
  const state = useReportState();
  const initialExpanded = defaultExpanded ?? false;

  useEffect(() => {
    if (id && collapsible) state.registerCard(id, initialExpanded);
  }, [id]);

  const expanded = id && collapsible ? state.isExpanded(id) : true;
  const contentId = id ? `${id}-content` : undefined;
  const canToggle = Boolean(id) && collapsible;
  const onToggle = () => {
    if (id) state.toggleExpanded(id);
  };

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledby ?? headingId}
      className={cn(
        "rounded-2xl border border-white/10 bg-[#121723] p-6 sm:p-8 md:p-10 shadow-2xl space-y-4 text-white",
        className,
      )}
    >
      {(eyebrow || chapter !== undefined || readMinutes) && (
        <div className="flex flex-wrap items-center gap-2">
          {chapter !== undefined && (
            <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-2.5 py-0.5 text-xs font-mono font-bold text-white">
              {String(chapter).padStart(2, "0")}
              {chapterTotal ? (
                <span className="ml-1 text-slate-400">
                  / {String(chapterTotal).padStart(2, "0")}
                </span>
              ) : null}
            </span>
          )}
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            {eyebrow ?? TONE_LABEL[tone]}
          </span>
          {readMinutes ? (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/30" />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                {readMinutes} min read
              </span>
            </>
          ) : null}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0 space-y-3">
          {title && (
            <h2
              id={headingId}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">{subtitle}</p>
          )}
          {whatThisMeans && (
            <div className="rounded-xl border-l-4 border-l-[#3B82F6] bg-[#1A2338] p-4 text-slate-200 space-y-1">
              <span className="block font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                What this means
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{whatThisMeans}</p>
            </div>
          )}
          {!expanded && summary ? <div className="text-sm text-slate-300">{summary}</div> : null}
          {canToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={contentId}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-3.5 py-1 text-xs font-semibold text-white transition-colors mt-2"
            >
              <span>{expanded ? "Collapse chapter" : "Read full chapter"}</span>
              <span
                aria-hidden
                className={cn("transition-transform", expanded ? "rotate-180" : "")}
              >
                ▾
              </span>
            </button>
          )}
        </div>
        {score && (
          <div className="md:justify-self-end">
            <ScoreChip
              value={score.value}
              band={score.band}
              of={score.of ?? 100}
              suffix={score.suffix}
              size="md"
            />
          </div>
        )}
      </div>

      {media && <div className="pt-2">{media}</div>}
      <div id={contentId} hidden={!expanded} className="pt-2">
        {children && <div className="space-y-4">{children}</div>}
        {actions && <div className="pt-4 flex flex-wrap items-center gap-3">{actions}</div>}
        {footer && (
          <div className="pt-4 border-t border-white/10 text-xs text-slate-400">{footer}</div>
        )}
      </div>
    </section>
  );
});

export default ReportCard;

/**
 * ReportCard — premium card primitive for the Career Fit Report.
 *
 * Layered surface (radial glow + subtle gradient), gradient rail glow driven
 * by the tone's --card-accent CSS var, editorial eyebrow row (chapter
 * counter · tone label · read time), display-serif title, and a
 * motion-safe rise-in on scroll — all controlled through utilities defined
 * in src/styles.css (report-card-shell / rail / eyebrow-chip / rise).
 *
 * This file (with ScoreChip.tsx and reportTones.ts) is exempt from the
 * report accent-token gate, so it may reference raw shade classes.
 */
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
  /** Summary shown even when collapsed. Defaults to subtitle. */
  summary?: ReactNode;
  /** Plain-language "what this means" line — always visible under subtitle. */
  whatThisMeans?: ReactNode;
  /** If false, always render children (no toggle). Default: true. */
  collapsible?: boolean;
  /** Default expanded state when the card has never been toggled. */
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
    // Only when id changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        "report-card-shell overflow-hidden p-6 sm:p-8 md:p-10 motion-safe:report-card-rise",
        className,
      )}
    >
      <span aria-hidden className="report-card-rail" />

      {(eyebrow || chapter !== undefined || readMinutes) && (
        <div className="flex flex-wrap items-center gap-2">
          {chapter !== undefined && (
            <span className="report-card-eyebrow-chip">
              {String(chapter).padStart(2, "0")}
              {chapterTotal ? (
                <span className="ml-1 text-white/40">
                  / {String(chapterTotal).padStart(2, "0")}
                </span>
              ) : null}
            </span>
          )}
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
            {eyebrow ?? TONE_LABEL[tone]}
          </span>
          {readMinutes ? (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/25" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {readMinutes} min read
              </span>
            </>
          ) : null}
        </div>
      )}

      <div className="mt-3 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          {title && (
            <h2
              id={headingId}
              className="font-display text-balance text-[1.75rem] leading-[1.08] tracking-tight text-white sm:text-[2rem] md:text-[2.35rem]"
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-white/85 sm:text-base">
              {subtitle}
            </p>
          )}
          {whatThisMeans && (
            <p className="mt-3 max-w-[54ch] rounded-lg border-l border-white/15 pl-3 py-1 text-[13.5px] leading-relaxed text-white/85">
              <span className="mr-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                What this means
              </span>
              <span className="text-white/85">{whatThisMeans}</span>
            </p>
          )}
          {!expanded && summary ? (
            <div className="mt-3 max-w-[54ch] text-body-sm text-white/85">{summary}</div>
          ) : null}
          {canToggle && (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={contentId}
              className={cn(
                "mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5",
                "font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80",
                "transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              )}
            >
              <span>{expanded ? "Collapse" : "Read full chapter"}</span>
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

      {media && <div className="mt-5">{media}</div>}
      <div
        id={contentId}
        hidden={!expanded}
        className={cn(expanded ? "motion-safe:animate-in motion-safe:fade-in-0" : undefined)}
      >
        {children && <div className="mt-6">{children}</div>}
        {actions && <div className="mt-6 flex flex-wrap items-center gap-2">{actions}</div>}
        {footer && (
          <div className="mt-6 border-t border-white/10 pt-4 text-caption text-white/70">
            {footer}
          </div>
        )}
      </div>
    </section>
  );
});

export default ReportCard;

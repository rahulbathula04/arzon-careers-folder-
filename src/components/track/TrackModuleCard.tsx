import type { ReactNode } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import { getTrackTheme, NEUTRAL_THEME, type TrackTheme } from "@/data/trackTheme";
import { coverageBand } from "@/data/jdProvenance";

export type TrackModuleCardProps = {
  slug?: string | null;
  theme?: TrackTheme;
  /** Eyebrow line, e.g. "Module 1 · Wk 1-2". */
  eyebrow?: ReactNode;
  /** Title rendered as h3 by default. */
  title: ReactNode;
  /** Bullet list (topics, features, points). */
  bullets?: ReactNode[];
  /** Optional dark deliverable / payoff strip at the bottom of the card body. */
  deliverable?: { label?: string; value: ReactNode } | null;
  /** Italic footnote, e.g. JD mapping. */
  footnote?: ReactNode;
  /** Optional right-side qualitative chip (renders a band like "Many JDs"). */
  coveragePct?: number | null;
  /** Override the right chip entirely. */
  chip?: ReactNode;
  /** Optional CTA / actions slot, rendered at the bottom. */
  actions?: ReactNode;
  className?: string;
  /** Render a tinted top accent strip in the track color. */
  withAccentStrip?: boolean;
};

export function TrackModuleCard({
  slug,
  theme,
  eyebrow,
  title,
  bullets,
  deliverable,
  footnote,
  coveragePct,
  chip,
  actions,
  className = "",
  withAccentStrip = false,
}: TrackModuleCardProps) {
  const t = theme ?? (slug ? getTrackTheme(slug) : NEUTRAL_THEME);
  const rightChip =
    chip ??
    (typeof coveragePct === "number" ? (
      <span
        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono text-micro sm:text-micro ${t.chip}`}
      >
        <CheckCircle2 className="h-3 w-3" />
        <span className="whitespace-nowrap">{coverageBand(coveragePct)}</span>
      </span>
    ) : null);

  return (
    <div
      data-testid="track-module"
      data-track={slug ?? "neutral"}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-white/20 hover:bg-white/[0.04] sm:p-5 ${className}`}
    >
      {withAccentStrip ? (
        <div aria-hidden className={`absolute inset-x-0 top-0 h-[3px] ${t.accent}`} />
      ) : null}

      {(eyebrow || rightChip) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {eyebrow ? (
            <span className="font-mono text-micro uppercase tracking-[0.14em] text-eyebrow/90 sm:text-micro sm:tracking-[0.18em]">
              {eyebrow}
            </span>
          ) : (
            <span />
          )}
          {rightChip}
        </div>
      )}

      <h3 className="mt-2 text-body-sm font-semibold leading-snug text-white! [overflow-wrap:anywhere] sm:text-body-sm">
        {title}
      </h3>

      {bullets && bullets.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-meta leading-relaxed text-white/75 [overflow-wrap:anywhere] sm:text-caption"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {deliverable ? (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-micro leading-relaxed sm:text-meta">
          <FileText className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${t.accentText}`} />
          <span className="min-w-0 text-white/75 [overflow-wrap:anywhere]">
            <span className="text-white/60">{deliverable.label ?? "Deliverable"}:</span>{" "}
            {deliverable.value}
          </span>
        </div>
      ) : null}

      {footnote ? (
        <p className="mt-2 text-micro italic leading-relaxed text-white/60 [overflow-wrap:anywhere] sm:text-micro">
          {footnote}
        </p>
      ) : null}

      {actions ? <div className="mt-4">{actions}</div> : null}
    </div>
  );
}

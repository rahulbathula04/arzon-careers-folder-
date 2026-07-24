import type { ReactNode } from "react";
import { Calendar } from "lucide-react";
import { getTrackTheme, NEUTRAL_THEME, type TrackTheme } from "@/data/trackTheme";

export type TrackStat = { label: string; value: string };

export type TrackHeroPanelProps = {
  /** Track slug — resolves the locked theme. Pass null for the neutral panel. */
  slug?: string | null;
  /** Override theme directly (e.g. for the pricing tiers / neutral panels). */
  theme?: TrackTheme;
  /** Small uppercase label above the title (e.g. "Track 1 of 6"). */
  eyebrow?: ReactNode;
  /** Big icon shown in the rounded tile on the left. Defaults to theme.emoji. */
  icon?: ReactNode;
  /** Main title — rendered as h2 by default; pass `as="h1"` for landing heroes. */
  title: ReactNode;
  /** One-line outcome / blurb under the title. */
  blurb?: ReactNode;
  /** Up to ~3 stats shown on the right. */
  stats?: TrackStat[];
  /** Optional meta rows (hiring metros, sources). */
  metaRows?: { label: string; value: ReactNode }[];
  /** Optional "Last change" callout. */
  lastChange?: { dateISO: string; note: string } | null;
  /** Optional footer (CTAs, badges). */
  footer?: ReactNode;
  /** Tag for the title element. */
  as?: "h1" | "h2";
  className?: string;
};

export function TrackHeroPanel({
  slug,
  theme,
  eyebrow,
  icon,
  title,
  blurb,
  stats,
  metaRows,
  lastChange,
  footer,
  as = "h2",
  className = "",
}: TrackHeroPanelProps) {
  const t = theme ?? (slug ? getTrackTheme(slug) : NEUTRAL_THEME);
  const Heading = as;
  return (
    <div
      data-testid="track-hero"
      data-track={slug ?? "neutral"}
      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${t.grad} p-5 ring-1 ${t.ring} sm:p-7 lg:p-8 ${className}`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0c10]/40 text-h3 ring-1 sm:h-14 sm:w-14 sm:text-h2 ${t.ring}`}
          >
            {icon ?? <span aria-hidden>{t.emoji}</span>}
          </div>
          <div className="min-w-0 flex-1">
            {eyebrow ? (
              <div
                className={`mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-eyebrow-strong sm:text-micro sm:tracking-[0.2em]`}
              >
                {eyebrow}
              </div>
            ) : null}
            <Heading className="text-[clamp(1.25rem,4.2vw,1.875rem)] font-semibold leading-tight text-white! [overflow-wrap:anywhere]">
              {title}
            </Heading>
            {blurb ? (
              <p className="mt-1.5 max-w-2xl text-caption leading-relaxed text-white/70 sm:text-body-sm">
                {blurb}
              </p>
            ) : null}
          </div>
        </div>
        {stats && stats.length > 0 ? (
          <div className="grid w-full grid-cols-3 gap-2 text-center sm:w-auto sm:gap-3 lg:gap-4">
            {stats.slice(0, 3).map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        ) : null}
      </div>

      {metaRows && metaRows.length > 0 ? (
        <div className="mt-5 flex flex-col gap-2 text-micro leading-relaxed text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 sm:text-meta">
          {metaRows.map((r) => (
            <span key={r.label} className="[overflow-wrap:anywhere]">
              <span className="text-white/60">{r.label}:</span> {r.value}
            </span>
          ))}
        </div>
      ) : null}

      {lastChange ? (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-3 text-meta leading-relaxed text-white/75 sm:text-meta">
          <Calendar className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${t.accentText}`} />
          <span className="min-w-0">
            <span className="font-medium text-white">Last change ({lastChange.dateISO}):</span>{" "}
            {lastChange.note}
          </span>
        </div>
      ) : null}

      {footer ? <div className="mt-5">{footer}</div> : null}
    </div>
  );
}

function Stat({ label, value }: TrackStat) {
  return (
    <div className="min-w-0 rounded-lg border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 px-2.5 py-2 sm:px-3">
      <div className="truncate font-mono text-sm font-semibold tabular-nums text-white sm:text-base">
        {value}
      </div>
      <div className="mt-0.5 truncate font-mono text-micro uppercase tracking-[0.14em] text-eyebrow/80 sm:text-micro sm:tracking-[0.18em]">
        {label}
      </div>
    </div>
  );
}

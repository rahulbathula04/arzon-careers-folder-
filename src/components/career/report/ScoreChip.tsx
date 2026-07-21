/**
 * ScoreChip — the single visual language for every score on the report.
 *
 * Circular ring + tabular numeral + band label. Reused across Verdict,
 * Three Numbers, Primary Fit, Role Ladder, and Decision Helper so students
 * learn "green = strong, amber = watch" once and never re-learn it.
 */
import { cn } from "@/lib/utils";
import { REPORT_TONES, toneForBand } from "./reportTones";

export type ScoreBand = "recommended" | "strong" | "watch" | "notfit" | "neutral";

const BAND_LABEL: Record<ScoreBand, string> = {
  strong: "Strong",
  recommended: "Recommended",
  watch: "Watch",
  notfit: "Not a fit",
  neutral: "Score",
};

function styleForBand(band: ScoreBand) {
  const t = REPORT_TONES[toneForBand(band)];
  return {
    ring: t.ringStroke,
    text: t.chipText,
    chip: cn(t.chipBg, t.chipText, t.chipBorder),
    label: BAND_LABEL[band],
  };
}

export function bandForScore(score: number): ScoreBand {
  if (score >= 78) return "strong";
  if (score >= 55) return "recommended";
  if (score >= 35) return "watch";
  return "notfit";
}

export function ScoreChip({
  value,
  band,
  of = 100,
  size = "md",
  showLabel = false,
  suffix = "fit",
  className,
}: {
  value: number;
  band?: ScoreBand;
  of?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  suffix?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(of, Math.round(value)));
  const pct = of > 0 ? clamped / of : 0;
  const b = band ?? bandForScore((clamped / of) * 100);
  const style = styleForBand(b);

  const dim = size === "lg" ? 128 : size === "sm" ? 56 : 96;
  const stroke = size === "lg" ? 8 : size === "sm" ? 5 : 7;
  const r = 50 - stroke;
  const c = 2 * Math.PI * r;
  const offset = c - pct * c;

  const valueTextClass =
    size === "lg" ? "text-4xl sm:text-5xl" : size === "sm" ? "text-base" : "text-2xl sm:text-3xl";

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: dim, height: dim }}
      role="img"
      aria-label={`${clamped} of ${of} — ${style.label}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth={stroke} className="stroke-white/8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={style.ring}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-grotesk font-extrabold tabular-nums leading-none",
            valueTextClass,
            style.text,
          )}
        >
          {clamped}
        </span>
        {size !== "sm" && (
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/50">
            {suffix}
          </span>
        )}
      </div>
      {showLabel && (
        <span
          className={cn(
            "absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]",
            style.chip,
          )}
        >
          {style.label}
        </span>
      )}
    </div>
  );
}

export default ScoreChip;

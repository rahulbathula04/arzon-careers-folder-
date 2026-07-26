import { cn } from "@/lib/utils";

export type ScoreBand = "recommended" | "strong" | "watch" | "notfit" | "neutral";

const BAND_LABEL: Record<ScoreBand, string> = {
  strong: "Strong Fit",
  recommended: "Recommended",
  watch: "Watch",
  notfit: "Not a fit",
  neutral: "Score",
};

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
  const label = BAND_LABEL[b];

  const dim = size === "lg" ? 128 : size === "sm" ? 56 : 96;
  const stroke = size === "lg" ? 8 : size === "sm" ? 5 : 7;
  const r = 50 - stroke;
  const c = 2 * Math.PI * r;
  const offset = c - pct * c;

  const valueTextClass =
    size === "lg" ? "text-4xl sm:text-5xl" : size === "sm" ? "text-base" : "text-2xl sm:text-3xl";

  const strokeColor =
    b === "strong"
      ? "#3B82F6"
      : b === "recommended"
        ? "#10B981"
        : b === "watch"
          ? "#F59E0B"
          : "#EF4444";

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: dim, height: dim }}
      role="img"
      aria-label={`${clamped} of ${of} — ${label}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-white/10"
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ stroke: strokeColor }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            "font-serif font-bold tabular-nums leading-none text-white",
            valueTextClass,
          )}
        >
          {clamped}
        </span>
        {size !== "sm" && (
          <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-slate-400">
            {suffix}
          </span>
        )}
      </div>
      {showLabel && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#121723] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
          {label}
        </span>
      )}
    </div>
  );
}

export default ScoreChip;

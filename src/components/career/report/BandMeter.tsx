/**
 * BandMeter - horizontal 0–100 band with a marker at the score.
 *
 * Reads faster than a ring, kerns cleanly next to a big display numeral,
 * and works inside a narrow card without collapsing. Replaces ScoreChip
 * inside the "big numbers" surfaces on the report.
 */
import { cn } from "@/lib/utils";
import { bandForScore } from "./ScoreChip";
import { REPORT_TONES, toneForBand } from "./reportTones";

export function BandMeter({
  value,
  label,
  size = "md",
  className,
}: {
  value: number | null;
  label?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const hasValue = typeof value === "number" && !Number.isNaN(value);
  const clamped = hasValue ? Math.max(0, Math.min(100, Math.round(value!))) : 0;
  const band = hasValue ? bandForScore(clamped) : "neutral";

  const bandColor = REPORT_TONES[toneForBand(band)].accentBg;

  const displaySize =
    size === "lg"
      ? "text-[64px] leading-[0.9] sm:text-[88px]"
      : "text-[52px] leading-[0.9] sm:text-[72px]";

  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-grotesk font-black tabular-nums tracking-tight text-white",
            displaySize,
          )}
        >
          {hasValue ? clamped : "-"}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
          /100
        </span>
      </div>
      <div
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={hasValue ? clamped : undefined}
        aria-label={label ?? "Score"}
        className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]"
      >
        {/* Zone tints (subtle) */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-full opacity-40"
          style={{
            background:
              "linear-gradient(90deg, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0.18) 35%, rgba(251,191,36,0.20) 35%, rgba(251,191,36,0.18) 70%, rgba(45,212,191,0.22) 70%, rgba(45,212,191,0.22) 100%)",
          }}
        />
        {hasValue && (
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 motion-reduce:transition-none",
              bandColor,
            )}
            style={{ width: `${clamped}%` }}
          />
        )}
      </div>
      {label && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          {label}
        </p>
      )}
    </div>
  );
}

export default BandMeter;

/**
 * JDOverlapBar — the "your answers matched X of Y JD signals" meter.
 * Extracted from PrimaryFit v2 so every chapter uses the same visual.
 */
import { REPORT_TONES } from "./reportTones";

export function JDOverlapBar({
  filled,
  of,
  caption,
}: {
  filled: number;
  of: number;
  caption?: string;
}) {
  const pct = of > 0 ? Math.round((Math.min(filled, of) / of) * 100) : 0;
  return (
    <div className="rounded-2xl glass-panel-deep px-4 py-3.5">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
        <span>JD keyword overlap</span>
        <span className="tabular-nums text-white/80">
          {filled}/{of}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${REPORT_TONES.primary.bar} motion-safe:transition-[width] motion-safe:duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption && <p className="mt-2 text-xs text-white/55">{caption}</p>}
    </div>
  );
}

export default JDOverlapBar;

/**
 * ACRI Design System — Competency Bar Primitive
 *
 * Reusable single-competency bar used in:
 * - AcriResultPage (overview tab, competency tab)
 * - AcriShareableCard
 *
 * Bar color is threshold-aware:
 *   score >= threshold → brand green
 *   score 60–threshold → amber
 *   score < 60         → red
 */
import { cn } from "@/lib/utils";

interface AcriCompetencyBarProps {
  label: string;
  code: string;
  score: number;         // 0–100
  threshold: number;     // minimum for Industry Ready
  animated?: boolean;
  showScore?: boolean;
  className?: string;
}

function getBarColor(score: number, threshold: number): string {
  if (score >= threshold) return "var(--color-brand-green)";
  if (score >= 60) return "var(--color-warning)";
  return "var(--color-error)";
}

function getScoreColor(score: number, threshold: number): string {
  if (score >= threshold) return "var(--color-readiness-industry-text)";
  if (score >= 60) return "var(--color-readiness-near-text)";
  return "var(--color-readiness-building-text)";
}

export function AcriCompetencyBar({
  label,
  code,
  score,
  threshold,
  animated = true,
  showScore = true,
  className,
}: AcriCompetencyBarProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const barColor = getBarColor(clampedScore, threshold);
  const scoreColor = getScoreColor(clampedScore, threshold);
  const meetsThreshold = clampedScore >= threshold;

  return (
    <div className={cn("space-y-1.5", className)}>
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[var(--tracking-widest)] shrink-0">
            {code}
          </span>
          <span className="text-xs font-medium text-[var(--color-text-primary)] truncate">
            {label}
          </span>
        </div>

        {showScore && (
          <div className="flex items-center gap-1 shrink-0">
            <span
              className="font-mono text-xs font-bold"
              style={{ color: scoreColor }}
            >
              {clampedScore}%
            </span>
            {meetsThreshold && (
              <span className="text-[var(--color-brand-green)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Track + bar */}
      <div className="relative h-1.5 rounded-full bg-[var(--color-divider)] overflow-visible">
        {/* Threshold marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3.5 rounded-full z-10"
          style={{
            left: `${threshold}%`,
            background: "var(--color-border-strong)",
          }}
          title={`Threshold: ${threshold}%`}
        />

        {/* Progress bar */}
        <div
          className={cn("h-full rounded-full", animated && "acri-animate-bar")}
          style={{
            width: `${clampedScore}%`,
            background: barColor,
            "--bar-width": `${clampedScore}%`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

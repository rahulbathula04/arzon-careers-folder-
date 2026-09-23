/**
 * ACRI Design System — Score Progress Ring Primitive
 *
 * Animated SVG circular ring displaying the ACRI composite score.
 * Color is driven entirely by readiness state tokens — no raw hex.
 *
 * Used in: AcriResultHero, AcriShareableCard, AcriCertificate
 */
import { useMemo } from "react";
import type { AcriReadinessState } from "@/lib/acri/acriReadiness";
import { ACRI_READINESS_CONFIG } from "@/lib/acri/acriReadiness";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  score: number;                  // 0–100
  readinessState: AcriReadinessState;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;            // show "/ 100" below score
  animated?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm:  { diameter: 80,  stroke: 6,  fontSize: "text-xl",      labelSize: "text-[10px]" },
  md:  { diameter: 120, stroke: 8,  fontSize: "text-3xl",     labelSize: "text-xs" },
  lg:  { diameter: 160, stroke: 10, fontSize: "text-[2.5rem]", labelSize: "text-sm" },
  xl:  { diameter: 200, stroke: 12, fontSize: "text-[3.25rem]", labelSize: "text-base" },
};

const STATE_RING_COLOR: Record<AcriReadinessState, string> = {
  industry_ready:    "var(--color-readiness-industry-ring)",
  near_ready:        "var(--color-readiness-near-ring)",
  building_foundations: "var(--color-readiness-building-ring)",
};

const STATE_TRACK_COLOR: Record<AcriReadinessState, string> = {
  industry_ready:    "rgba(22,163,74,0.12)",
  near_ready:        "rgba(217,119,6,0.12)",
  building_foundations: "rgba(220,38,38,0.12)",
};

export function AcriProgressRing({
  score,
  readinessState,
  size = "lg",
  showLabel = true,
  animated = true,
  className,
}: ProgressRingProps) {
  const { diameter, stroke, fontSize, labelSize } = SIZE_CONFIG[size];
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const offset = useMemo(
    () => circumference - (clampedScore / 100) * circumference,
    [clampedScore, circumference],
  );

  const ringColor = STATE_RING_COLOR[readinessState];
  const trackColor = STATE_TRACK_COLOR[readinessState];
  const threshold = ACRI_READINESS_CONFIG.industryReadyThreshold;

  return (
    <div
      className={cn("relative flex items-center justify-center shrink-0", className)}
      style={{ width: diameter, height: diameter }}
      role="meter"
      aria-valuenow={clampedScore}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`ACRI score: ${clampedScore} out of 100`}
    >
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        className="-rotate-90"
      >
        {/* Threshold marker at 80 */}
        {readinessState !== "industry_ready" && (
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="rgba(22,163,74,0.25)"
            strokeWidth={stroke * 0.5}
            strokeDasharray={`2 ${(circumference / 100) * 3}`}
            strokeLinecap="round"
          />
        )}

        {/* Track */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />

        {/* Progress arc */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={
            animated
              ? { transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }
              : undefined
          }
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn("font-mono font-extrabold leading-none", fontSize)}
          style={{ color: ringColor }}
        >
          {clampedScore}
        </span>
        {showLabel && (
          <span
            className={cn("font-mono font-medium text-[var(--color-text-muted)]", labelSize)}
          >
            / 100
          </span>
        )}
      </div>

      {/* Pulse glow on industry ready */}
      {readinessState === "industry_ready" && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: "0 0 0 0 rgba(22,163,74,0.3)",
            animation: "acri-pulse-ring 2.5s ease-out infinite",
          }}
        />
      )}
    </div>
  );
}

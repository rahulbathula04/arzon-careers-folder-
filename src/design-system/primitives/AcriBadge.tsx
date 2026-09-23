/**
 * ACRI Design System — Badge Primitive
 *
 * Used for: readiness state tags, mode indicators (CERTIFIED/PRACTICE),
 * assessment version, status labels.
 *
 * readiness variant applies the appropriate color token set automatically.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AcriReadinessState } from "@/lib/acri/acriReadiness";
import { READINESS_LABELS } from "@/lib/acri/acriReadiness";

type BadgeVariant =
  | "readiness"  // drives color from readinessState prop
  | "mode-cert"
  | "mode-practice"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "navy"
  | "outline";

interface BadgeBaseProps {
  variant?: BadgeVariant;
  size?: "xs" | "sm" | "md";
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

interface ReadinessBadgeProps extends BadgeBaseProps {
  variant: "readiness";
  readinessState: AcriReadinessState;
  children?: ReactNode;
}

type BadgeProps = ReadinessBadgeProps | (BadgeBaseProps & { readinessState?: never });

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  readiness:     "", // set dynamically from readinessState
  "mode-cert":   "bg-emerald-950 text-emerald-300 border-emerald-700/50",
  "mode-practice": "bg-blue-950 text-blue-300 border-blue-700/50",
  neutral:       "bg-[var(--color-divider)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
  success:       "bg-[var(--color-success-bg)] text-[var(--color-readiness-industry-text)] border-[var(--color-success-border)]",
  warning:       "bg-[var(--color-warning-bg)] text-[var(--color-readiness-near-text)] border-[var(--color-warning-border)]",
  error:         "bg-[var(--color-error-bg)] text-[var(--color-readiness-building-text)] border-[var(--color-error-border)]",
  navy:          "bg-[var(--color-info-bg)] text-[var(--color-brand-navy)] border-[var(--color-info-border)]",
  outline:       "bg-transparent text-[var(--color-text-primary)] border-[var(--color-border-strong)]",
};

const READINESS_VARIANT_CLASSES: Record<AcriReadinessState, string> = {
  industry_ready:    "bg-[var(--color-readiness-industry-bg)] text-[var(--color-readiness-industry-text)] border-[var(--color-readiness-industry-border)]",
  near_ready:        "bg-[var(--color-readiness-near-bg)] text-[var(--color-readiness-near-text)] border-[var(--color-readiness-near-border)]",
  building_foundations: "bg-[var(--color-readiness-building-bg)] text-[var(--color-readiness-building-text)] border-[var(--color-readiness-building-border)]",
};

const SIZE_CLASSES = {
  xs: "text-[10px] px-2 py-0.5 gap-1 rounded-full",
  sm: "text-[11px] px-2.5 py-0.5 gap-1 rounded-full",
  md: "text-xs px-3 py-1 gap-1.5 rounded-full",
};

export function AcriBadge({
  variant = "neutral",
  size = "sm",
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  const readinessState = (props as ReadinessBadgeProps).readinessState;

  const variantClass =
    variant === "readiness" && readinessState
      ? READINESS_VARIANT_CLASSES[readinessState]
      : VARIANT_CLASSES[variant];

  const label =
    variant === "readiness" && readinessState
      ? (children ?? READINESS_LABELS[readinessState])
      : children;

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-bold uppercase tracking-[var(--tracking-ultra)] border shrink-0",
        variantClass,
        SIZE_CLASSES[size],
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </span>
  );
}

/** Shorthand — renders the readiness badge with correct color automatically */
export function ReadinessBadge({
  state,
  size = "sm",
  className,
}: {
  state: AcriReadinessState;
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  return (
    <AcriBadge variant="readiness" readinessState={state} size={size} className={className} />
  );
}

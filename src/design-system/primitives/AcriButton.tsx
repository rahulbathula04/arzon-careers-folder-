/**
 * ACRI Design System — Button Primitive
 *
 * Three-tier hierarchy per brand doctrine:
 *   primary   — dark ink bg, white text, strong actions (Submit, Download Certificate)
 *   secondary — white bg, dark border, supporting actions (Retake, View Sample)
 *   ghost     — no bg, minimal, utility actions (Cancel, Back)
 *
 * Never add a 4th tier. Never use plain red as a color. Destructive actions
 * use the secondary tier with red text (see variant="danger").
 */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "success" | "danger";
type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconTrailing?: ReactNode;
  loading?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-brand-ink)] text-white",
    "hover:bg-[var(--color-brand-navy)]",
    "border border-transparent",
    "shadow-[var(--shadow-sm)]",
  ].join(" "),
  secondary: [
    "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]",
    "border border-[var(--color-border-strong)]",
    "hover:bg-[var(--color-bg-surface-muted)]",
    "shadow-[var(--shadow-xs)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-text-secondary)]",
    "border border-transparent",
    "hover:bg-[var(--color-divider)] hover:text-[var(--color-text-primary)]",
  ].join(" "),
  success: [
    "bg-[var(--color-brand-green)] text-white",
    "hover:bg-[var(--color-brand-green-mid)]",
    "border border-transparent",
    "shadow-[var(--shadow-sm)]",
  ].join(" "),
  danger: [
    "bg-[var(--color-bg-surface)] text-[var(--color-error)]",
    "border border-[var(--color-error-border)]",
    "hover:bg-[var(--color-error-bg)]",
  ].join(" "),
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-7 px-3 gap-1 text-[11px] rounded-[var(--radius-sm)]",
  sm: "h-8 px-3.5 gap-1.5 text-xs rounded-[var(--radius-md)]",
  md: "h-9 px-4 gap-2 text-xs rounded-[var(--radius-md)]",
  lg: "h-10 px-5 gap-2 text-sm rounded-[var(--radius-lg)]",
};

export function AcriButton({
  variant = "primary",
  size = "md",
  icon,
  iconTrailing,
  loading = false,
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cn(
        // Base
        "inline-flex items-center justify-center font-mono font-bold uppercase tracking-[var(--tracking-wider)]",
        "transition-[background-color,border-color,color,box-shadow] duration-[var(--duration-fast)]",
        "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-navy)]",
        // Variant
        VARIANT_CLASSES[variant],
        // Size
        SIZE_CLASSES[size],
        className,
      )}
    >
      {loading ? (
        <svg
          className="h-3.5 w-3.5 animate-spin shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {!loading && iconTrailing ? (
        <span className="shrink-0">{iconTrailing}</span>
      ) : null}
    </button>
  );
}

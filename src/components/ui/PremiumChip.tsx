import React from "react";
import { type LucideIcon } from "lucide-react";

export type PremiumChipVariant = "emerald" | "navy" | "gold" | "sky" | "stone" | "purple";

export interface PremiumChipProps {
  children: React.ReactNode;
  variant?: PremiumChipVariant;
  icon?: LucideIcon;
  pulse?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const VARIANT_STYLES: Record<PremiumChipVariant, string> = {
  emerald:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/20",
  navy:
    "border-[#1B3F8B]/30 bg-[#1B3F8B]/10 text-[#1B3F8B] dark:text-sky-300 ring-1 ring-[#1B3F8B]/20",
  gold:
    "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 ring-1 ring-amber-500/20",
  sky:
    "border-sky-500/30 bg-sky-500/10 text-sky-800 dark:text-sky-300 ring-1 ring-sky-500/20",
  stone:
    "border-stone-300 bg-white tone-light text-stone-800 ring-1 ring-stone-200/50 shadow-xs",
  purple:
    "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-800 dark:text-fuchsia-300 ring-1 ring-fuchsia-500/20",
};

const SIZE_STYLES = {
  sm: "px-2.5 py-0.5 text-[10px]",
  md: "px-3 py-1 text-[11px]",
  lg: "px-3.5 py-1.5 text-xs",
};

export function PremiumChip({
  children,
  variant = "navy",
  icon: Icon,
  pulse = false,
  className = "",
  size = "md",
}: PremiumChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-200 ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

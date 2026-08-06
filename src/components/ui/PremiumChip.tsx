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
    "border-emerald-600/20 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/15 shadow-2xs font-semibold",
  navy:
    "border-[#1B3F8B]/25 bg-[#1B3F8B]/10 text-[#1B3F8B] ring-1 ring-[#1B3F8B]/15 shadow-2xs font-bold",
  gold:
    "border-amber-600/25 bg-amber-50 text-amber-900 ring-1 ring-amber-600/15 shadow-2xs font-bold",
  sky:
    "border-sky-600/25 bg-sky-50 text-sky-900 ring-1 ring-sky-600/15 shadow-2xs font-bold",
  stone:
    "border-stone-300 bg-stone-100/80 text-stone-900 ring-1 ring-stone-200 shadow-2xs font-bold",
  purple:
    "border-fuchsia-600/25 bg-fuchsia-50 text-fuchsia-900 ring-1 ring-fuchsia-600/15 shadow-2xs font-bold",
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

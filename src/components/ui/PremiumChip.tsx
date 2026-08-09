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
    "border-emerald-600/30 bg-emerald-100 text-emerald-950 ring-1 ring-emerald-600/20 shadow-2xs font-extrabold",
  navy:
    "border-[#1B3F8B]/40 bg-[#1B3F8B]/15 text-[#1B3F8B] ring-1 ring-[#1B3F8B]/25 shadow-2xs font-extrabold",
  gold:
    "border-amber-600/40 bg-amber-100 text-amber-950 ring-1 ring-amber-600/20 shadow-2xs font-extrabold",
  sky:
    "border-sky-600/40 bg-sky-100 text-sky-950 ring-1 ring-sky-600/25 shadow-2xs font-extrabold",
  stone:
    "border-stone-400 bg-stone-200 text-stone-950 ring-1 ring-stone-300 shadow-2xs font-extrabold",
  purple:
    "border-fuchsia-600/40 bg-fuchsia-100 text-fuchsia-950 ring-1 ring-fuchsia-600/25 shadow-2xs font-extrabold",
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
  const getChipStyle = () => {
    switch (variant) {
      case "emerald":
        return { color: "#065F46", backgroundColor: "#ECFDF5", borderColor: "#6EE7B7" };
      case "gold":
        return { color: "#78350F", backgroundColor: "#FEF3C7", borderColor: "#FDE68A" };
      case "sky":
        return { color: "#0C4A6E", backgroundColor: "#E0F2FE", borderColor: "#7DD3FC" };
      case "stone":
        return { color: "#1C1917", backgroundColor: "#F5F5F4", borderColor: "#D6D3D1" };
      case "purple":
        return { color: "#701A75", backgroundColor: "#FDF4FF", borderColor: "#F0ABFC" };
      case "navy":
      default:
        return { color: "#1B3F8B", backgroundColor: "#EEF2FF", borderColor: "#93C5FD" };
    }
  };

  const chipStyle = getChipStyle();

  return (
    <span
      style={chipStyle}
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-extrabold uppercase tracking-wider shadow-xs transition-all duration-200 ${SIZE_STYLES[size]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: chipStyle.color }} />}
      <span style={{ color: chipStyle.color }}>{children}</span>
    </span>
  );
}

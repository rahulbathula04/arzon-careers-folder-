import React from "react";

interface ArzonLogoProps {
  className?: string;
  variant?: "dark" | "light";
  showWordmark?: boolean;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "h-7 w-auto",
  md: "h-9 w-auto",
  lg: "h-11 w-auto",
} as const;

export function ArzonLogo({
  className = "",
  variant = "dark",
  showWordmark = true,
  showTagline = false,
  size = "md",
}: ArzonLogoProps) {
  const isDark = variant === "dark";
  
  // Sizing for the mark
  const sizeMap = {
    sm: { mark: "w-6 h-6", text: "text-xs" },
    md: { mark: "w-8 h-8", text: "text-sm" },
    lg: { mark: "w-10 h-10", text: "text-base" },
  };
  const dims = sizeMap[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Authentic Arzon Global Mark */}
      <img
        src="/brand/arzon-icon.webp"
        alt="Arzon Global"
        width={size === "sm" ? 28 : size === "lg" ? 44 : 34}
        height={size === "sm" ? 28 : size === "lg" ? 44 : 34}
        className={`shrink-0 rounded-md object-contain select-none shadow-xs ${
          size === "sm" ? "h-7 w-7" : size === "lg" ? "h-11 w-11" : "h-[34px] w-[34px]"
        }`}
        loading="eager"
        draggable={false}
      />
      
      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-extrabold tracking-[0.1em] ${dims.text} ${
            isDark ? "text-white" : "text-[#071A4A]"
          }`}
        >
          ARZON GLOBAL
        </span>
      )}

      {/* Tagline */}
      {showTagline && (
        <span
          className={`ml-3 hidden border-l pl-3 text-[8px] font-semibold uppercase tracking-[0.18em] sm:inline-block ${
            isDark
              ? "border-white/20 text-white/70"
              : "border-slate-300 text-[#69758A]"
          }`}
        >
          Your career. Our commitment.
        </span>
      )}
    </span>
  );
}

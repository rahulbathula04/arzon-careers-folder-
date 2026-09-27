import React from "react";

interface ArzonLogoProps {
  className?: string;
  variant?: "dark" | "light"; // dark = for dark backgrounds (default in brand), light = for light backgrounds
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ArzonLogo({
  className = "",
  variant = "dark",
  showWordmark = true,
  size = "md",
}: ArzonLogoProps) {
  const isDark = variant === "dark";

  const sizeClasses = {
    sm: {
      emblem: "h-7 w-7 text-xs",
      textArzon: "text-xs font-black tracking-wider",
      textTagline: "text-[7.5px] tracking-[0.18em]",
    },
    md: {
      emblem: "h-9 w-9 text-base",
      textArzon: "text-sm sm:text-base font-black tracking-wider",
      textTagline: "text-[8.5px] sm:text-[9px] tracking-[0.22em]",
    },
    lg: {
      emblem: "h-11 w-11 text-xl",
      textArzon: "text-lg sm:text-xl font-black tracking-wider",
      textTagline: "text-[10px] tracking-[0.24em]",
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Arzon "A" Emblem Badge */}
      <div
        className={`rounded-full shrink-0 flex items-center justify-center font-serif font-black shadow-xs select-none transition-transform group-hover:scale-105 ${
          sizeClasses.emblem
        } ${
          isDark
            ? "bg-white text-[#071A4A]"
            : "bg-[#071A4A] text-white"
        }`}
      >
        <span>A</span>
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-tight select-none">
          <span
            className={`font-sans uppercase ${sizeClasses.textArzon} ${
              isDark ? "text-white" : "text-[#071A4A]"
            }`}
          >
            ARZON GLOBAL
          </span>
          <span
            className={`font-sans font-semibold uppercase mt-0.5 ${sizeClasses.textTagline} ${
              isDark ? "text-white/70" : "text-[#69758A]"
            }`}
          >
            YOUR CAREER. OUR COMMITMENT.
          </span>
        </div>
      )}
    </div>
  );
}

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
    sm: { img: "h-6 w-6", textArzon: "text-sm", textGlobal: "text-[8px]" },
    md: { img: "h-8 w-8", textArzon: "text-lg", textGlobal: "text-[9px]" },
    lg: { img: "h-11 w-11", textArzon: "text-2xl", textGlobal: "text-[11px]" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official Arzon "A" Emblem with sky/cloud texture and upward compass needle */}
      <div className={`relative overflow-hidden rounded-lg bg-black shrink-0 ${sizeClasses.img} shadow-xs border border-white/10`}>
        <img
          src="/images/arzon-mark.jpg"
          alt="Arzon Global Emblem"
          className="h-full w-full object-cover"
          width={44}
          height={44}
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-none select-none">
          <span
            className={`font-sans font-black tracking-tight ${sizeClasses.textArzon} ${
              isDark ? "text-white" : "text-[#0B0F19]"
            }`}
          >
            ARZON
          </span>
          <span
            className={`font-sans font-semibold tracking-[0.38em] mt-0.5 ${sizeClasses.textGlobal} ${
              isDark ? "text-white/95" : "text-[#0B0F19]/90"
            }`}
          >
            GLOBAL
          </span>
        </div>
      )}
    </div>
  );
}

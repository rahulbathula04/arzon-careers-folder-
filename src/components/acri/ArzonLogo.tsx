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
  const logoSrc = showWordmark
    ? variant === "dark"
      ? "/brand/arzon-global-lockup.svg"
      : "/brand/arzon-global-lockup-light.svg"
    : "/brand/arzon-global-mark.svg";

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="Arzon Global"
        className={`${SIZE_CLASSES[size]} max-w-[min(72vw,240px)] object-contain`}
        loading="eager"
        fetchPriority="high"
        draggable={false}
      />
      {showTagline && (
        <span
          className={`ml-3 hidden border-l pl-3 text-[8px] font-semibold uppercase tracking-[0.18em] sm:inline-block ${
            variant === "dark"
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

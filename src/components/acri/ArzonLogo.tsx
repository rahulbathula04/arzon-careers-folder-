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

const MARK_SIZE_CLASSES = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
} as const;

/**
 * Canonical Arzon Global brand mark.
 *
 * This component intentionally uses the checked-in brand assets instead of
 * recreating the logo in JSX/CSS. One asset system prevents stale/alternate
 * marks from appearing across headers, funnels, footers and admin surfaces.
 */
export function ArzonLogo({
  className = "",
  variant = "dark",
  showWordmark = true,
  showTagline = false,
  size = "md",
}: ArzonLogoProps) {
  const lockupSrc =
    variant === "dark"
      ? "/brand/arzon-global-lockup.svg"
      : "/brand/arzon-global-lockup-light.svg";
  const markSrc = "/brand/arzon-global-mark.svg";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={showWordmark ? lockupSrc : markSrc}
        alt={showWordmark ? "Arzon Global" : ""}
        aria-hidden={showWordmark ? undefined : true}
        width={showWordmark ? 1200 : 400}
        height={showWordmark ? 330 : 340}
        className={showWordmark ? SIZE_CLASSES[size] : MARK_SIZE_CLASSES[size]}
        decoding="async"
        fetchPriority="high"
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

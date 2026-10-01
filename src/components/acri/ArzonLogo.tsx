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

  // The geometric 'A' mark SVG with inline markup to prevent loading failures
  const filterId = `cloud-mark-${isDark ? "dark" : "light"}`;
  const gradientId = `ice-mark-${isDark ? "dark" : "light"}`;
  const maskId = `cut-mark-${isDark ? "dark" : "light"}`;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Graphic Mark */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 400 340" 
        className={`shrink-0 ${dims.mark}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f8fbff"/><stop offset=".35" stopColor="#dcecff"/><stop offset=".7" stopColor="#8fc4ff"/><stop offset="1" stopColor="#d9ecff"/>
          </linearGradient>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency=".018" numOctaves="3" seed="7" result="n"/>
            <feColorMatrix in="n" type="saturate" values="0" result="g"/>
            <feComponentTransfer><feFuncA type="table" tableValues="0 .18"/></feComponentTransfer>
            <feBlend in="SourceGraphic" in2="n" mode="soft-light"/>
          </filter>
          <mask id={maskId}>
            <rect width="400" height="340" fill="white"/>
            <path d="M200 105 108 258h52l40-66 40 66h52Z" fill="black"/>
          </mask>
        </defs>
        <path d="M28 310 143 22h114l115 288h-68L200 105 96 310Z" fill={`url(#${gradientId})`} filter={`url(#${filterId})`} mask={`url(#${maskId})`}/>
        <path d="M200 105 108 258h52l40-66 40 66h52Z" fill={isDark ? "#fff" : "#071A4A"}/>
      </svg>
      
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

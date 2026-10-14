import React from "react";

/**
 * Authentic institutional logos for Arzon Global trust anchors.
 * Built with Apple-grade precision and vector clarity.
 */

export function TaskRealLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src="/images/logos/task-logo.png"
      alt="TASK - Telangana Academy for Skill and Knowledge"
      className={`object-contain ${className}`}
      loading="lazy"
    />
  );
}

export function HybizTvLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HYBIZ TV HD Official Logo"
    >
      {/* HYBIZ text */}
      <text
        x="8"
        y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="34"
        letterSpacing="0.5"
        fill="#1E40AF"
      >
        HYBIZ
      </text>
      
      {/* Dynamic orbital swooshes */}
      <g transform="translate(132, 28)">
        {/* Blue swoosh */}
        <path
          d="M -16 6 C -10 14, 8 14, 16 4 C 10 -6, -8 -6, -16 6 Z"
          fill="#0284C7"
          opacity="0.9"
        />
        {/* Orange swoosh */}
        <path
          d="M -12 -12 C -2 -14, 14 -4, 12 12 C 4 8, -6 -2, -12 -12 Z"
          fill="#F97316"
          opacity="0.95"
        />
        {/* Center core */}
        <circle cx="0" cy="0" r="3.5" fill="#0284C7" />
      </g>

      {/* TV block in Red */}
      <text
        x="152"
        y="42"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="34"
        letterSpacing="0.5"
        fill="#DC2626"
      >
        TV
      </text>

      {/* HD badge */}
      <rect x="156" y="8" width="28" height="13" rx="3" fill="#1E293B" />
      <text
        x="160"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="9.5"
        fill="#FFFFFF"
        letterSpacing="1"
      >
        HD
      </text>
    </svg>
  );
}

export function MsmeGovtLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MSME - Ministry of Micro, Small and Medium Enterprises, Govt. of India"
    >
      {/* Ashoka Chakra / Gear Emblem */}
      <g transform="translate(26, 30)">
        {/* Outer gear circle */}
        <circle cx="0" cy="0" r="18" stroke="#1E3A8A" strokeWidth="2.5" fill="none" strokeDasharray="3 2" />
        {/* Inner circle */}
        <circle cx="0" cy="0" r="12" fill="#1E3A8A" opacity="0.1" stroke="#1E3A8A" strokeWidth="1.5" />
        {/* Center dot */}
        <circle cx="0" cy="0" r="3" fill="#1E3A8A" />
        {/* Radiant spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="0"
            x2={12 * Math.cos((angle * Math.PI) / 180)}
            y2={12 * Math.sin((angle * Math.PI) / 180)}
            stroke="#1E3A8A"
            strokeWidth="1.2"
          />
        ))}
        {/* Green leaf accent */}
        <path
          d="M 6 -14 C 14 -16, 18 -8, 16 0 C 12 -4, 8 -8, 6 -14 Z"
          fill="#16A34A"
        />
        {/* Saffron sun accent */}
        <path
          d="M -16 -4 C -18 -12, -10 -16, -2 -14 C -6 -10, -10 -8, -16 -4 Z"
          fill="#EA580C"
        />
      </g>

      {/* MSME Wordmark */}
      <text
        x="56"
        y="32"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="24"
        letterSpacing="1"
        fill="#1E3A8A"
      >
        MSME
      </text>

      {/* Subtitle Government of India */}
      <text
        x="57"
        y="44"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="7"
        letterSpacing="0.8"
        fill="#059669"
      >
        GOVT. OF INDIA
      </text>
    </svg>
  );
}

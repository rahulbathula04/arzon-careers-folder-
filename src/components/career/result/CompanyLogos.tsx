import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function CognizantLogo({ className = "h-5 w-auto" }: LogoProps) {
  return (
    <svg viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Cognizant">
      <path
        d="M2.5 14C2.5 7.649 7.649 2.5 14 2.5C18.2 2.5 21.8 4.7 23.8 8L20.2 10.2C18.8 7.8 16.6 6.5 14 6.5C9.8 6.5 6.5 9.8 6.5 14C6.5 18.2 9.8 21.5 14 21.5C16.8 21.5 19.1 20 20.4 17.5L24 19.6C22 23 18.3 25.5 14 25.5C7.649 25.5 2.5 20.351 2.5 14Z"
        fill="#000048"
      />
      <circle cx="14" cy="14" r="3.5" fill="#00A3E0" />
      <text
        x="28"
        y="20"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="-0.3px"
        fill="#000048"
      >
        cognizant
      </text>
    </svg>
  );
}

export function IqviaLogo({ className = "h-5 w-auto" }: LogoProps) {
  return (
    <svg viewBox="0 0 110 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="IQVIA">
      {/* IQVIA geometric node mark */}
      <g transform="translate(0, 2)">
        <polygon points="0,11 6,2 17,2 23,11 17,20 6,20" fill="#0097A7" opacity="0.15" />
        <polygon points="0,11 6,2 11,11" fill="#00ACC1" />
        <polygon points="6,2 17,2 11,11" fill="#00838F" />
        <polygon points="17,2 23,11 11,11" fill="#0097A7" />
        <polygon points="23,11 17,20 11,11" fill="#00695C" />
        <polygon points="17,20 6,20 11,11" fill="#004D40" />
        <polygon points="6,20 0,11 11,11" fill="#00796B" />
      </g>
      <text
        x="29"
        y="19"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="18"
        letterSpacing="0.8px"
        fill="#002F6C"
      >
        IQVIA
      </text>
    </svg>
  );
}

export function ParexelLogo({ className = "h-5 w-auto" }: LogoProps) {
  return (
    <svg viewBox="0 0 120 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Parexel">
      <path
        d="M2 13C2 6.925 6.925 2 13 2C15.8 2 18.2 3.1 20 4.8L17.5 7.2C16.3 6 14.8 5.2 13 5.2C8.7 5.2 5.2 8.7 5.2 13C5.2 17.3 8.7 20.8 13 20.8C15 20.8 16.7 19.9 17.8 18.6L20.4 20.9C18.6 22.8 16 24 13 24C6.925 24 2 19.075 2 13Z"
        fill="#EF5323"
      />
      <text
        x="22"
        y="19"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="17"
        letterSpacing="1px"
        fill="#2A2A68"
      >
        PAREXEL
      </text>
    </svg>
  );
}

export function NovartisLogo({ className = "h-5 w-auto" }: LogoProps) {
  return (
    <svg viewBox="0 0 130 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Novartis">
      {/* Novartis Mortar & Pestle Flame Symbol */}
      <g transform="translate(0, 1)">
        <path
          d="M8.5 2C8.5 2 12.5 5.5 12.5 9C12.5 11.2 10.7 13 8.5 13C6.3 13 4.5 11.2 4.5 9C4.5 5.5 8.5 2 8.5 2Z"
          fill="#EE4026"
        />
        <path
          d="M13.5 8C13.5 8 16.5 10.8 16.5 13.5C16.5 15.2 15.2 16.5 13.5 16.5C11.8 16.5 10.5 15.2 10.5 13.5C10.5 10.8 13.5 8 13.5 8Z"
          fill="#F58220"
        />
        <path
          d="M2 17C2 15.5 4.5 14 8.5 14C12.5 14 15 15.5 15 17C15 20 12 22 8.5 22C5 22 2 20 2 17Z"
          fill="#EE4026"
        />
      </g>
      <text
        x="22"
        y="19"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="16"
        letterSpacing="0.6px"
        fill="#0460A9"
      >
        NOVARTIS
      </text>
    </svg>
  );
}

export function AccentureLogo({ className = "h-5 w-auto" }: LogoProps) {
  return (
    <svg viewBox="0 0 120 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Accenture">
      {/* Accenture Greater-Than Symbol */}
      <path
        d="M6 3L13 13L6 23L9 23L16 13L9 3L6 3Z"
        fill="#A100FF"
      />
      <text
        x="20"
        y="19"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="-0.3px"
        fill="#1A1A1A"
      >
        accenture
      </text>
    </svg>
  );
}

export function CompanyBrandLogo({ company, className = "h-5 w-auto" }: { company: string; className?: string }) {
  const norm = company.toLowerCase();
  if (norm.includes("cognizant")) return <CognizantLogo className={className} />;
  if (norm.includes("iqvia")) return <IqviaLogo className={className} />;
  if (norm.includes("parexel")) return <ParexelLogo className={className} />;
  if (norm.includes("novartis")) return <NovartisLogo className={className} />;
  if (norm.includes("accenture")) return <AccentureLogo className={className} />;
  return <span className="font-bold font-mono text-xs text-[#071A4A]">{company}</span>;
}

import { useEffect, useRef, useState } from "react";
import { ACRI_DIMENSIONS, type AcriDimensionId } from "@/components/landing/constants";
import type { AcriProfile } from "@/lib/acri";

/**
 * Five-dimension ACRI ring set (light / Coursera-style). Each ring animates
 * from 0 to its value once it scrolls into view. Rendered on a white surface
 * so colors and contrast match the rest of the result-page card system.
 */
export function AcriRings({
  profile,
  overall,
  bandLabel,
  nonPharmaCourse = false,
}: {
  profile: AcriProfile;
  overall: number;
  bandLabel: string;
  /** When true, render a chip explaining low rings are expected for this background. */
  nonPharmaCourse?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="tone-light">
      {nonPharmaCourse && (
        <div className="mb-4 inline-flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
          <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
          <p className="text-micro leading-snug text-amber-900">
            <span className="font-semibold">Non-pharma background.</span> These rings measure
            clinical-domain skills, so low scores here are expected and part of the plan — not a
            verdict on your fit. Your match % below is the real signal.
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <Ring label="Overall" value={shown ? overall : 0} highlight subLabel={bandLabel} />
        {ACRI_DIMENSIONS.map((d) => (
          <Ring
            key={d.id}
            label={d.label}
            value={shown ? Math.round(profile[d.id as AcriDimensionId] ?? 0) : 0}
          />
        ))}
      </div>
    </div>
  );
}

function Ring({
  label,
  value,
  highlight = false,
  subLabel,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  subLabel?: string;
}) {
  const size = 84;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 transform">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            className="text-slate-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            className={`${
              highlight ? "text-primary" : "text-accent-sky-deep"
            } transition-[stroke-dashoffset] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
            style={{
              strokeDasharray: c,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-grotesk text-base font-extrabold tabular-nums ${
              highlight ? "text-primary" : "text-slate-900"
            }`}
          >
            {value}
          </span>
        </div>
      </div>
      <p className="mt-2 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      {subLabel ? (
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.14em] text-primary">
          {subLabel}
        </p>
      ) : null}
    </div>
  );
}

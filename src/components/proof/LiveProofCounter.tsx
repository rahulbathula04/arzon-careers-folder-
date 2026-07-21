import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useTone } from "@/lib/tone/ToneContext";
import { LEDGER } from "@/data/ledger";

export type ProofItem = {
  value: string;
  label: string;
  to: string;
};

export const DEFAULT_PROOF_ITEMS: ProofItem[] = [
  { value: LEDGER.certificatesIssuedLabel, label: "Certificates", to: "/verify" },
  { value: LEDGER.jdsMirroredLabel, label: "Live JDs", to: "/jd-mirror" },
  { value: "40/30/20/10", label: "Methodology", to: "/methodology" },
];

/**
 * Tone-aware horizontal proof strip. Each stat links to the public ledger
 * route a parent or recruiter can audit. Replaces fabricated testimonials.
 */
export function LiveProofCounter({
  items = DEFAULT_PROOF_ITEMS,
  toneOverride,
  compact = false,
}: {
  items?: ProofItem[];
  toneOverride?: "light" | "dark";
  compact?: boolean;
}) {
  const ctxTone = useTone();
  const tone = toneOverride ?? ctxTone;
  const isDark = tone === "dark";

  const wrap = isDark
    ? "border-white/12 bg-white/[0.04] hover:border-[#7fb0d8]/45 hover:bg-white/[0.07]"
    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50";
  const value = isDark ? "text-slate-50" : "text-primary";
  const label = isDark ? "text-slate-300" : "text-slate-600";
  const chev = isDark ? "text-[#7fb0d8]" : "text-[color:var(--teal-deep)]";

  const cols =
    items.length === 2
      ? "grid-cols-2"
      : items.length === 3
        ? "grid-cols-2 sm:grid-cols-3"
        : "grid-cols-2 sm:grid-cols-4";

  return (
    <ul className={`grid ${cols} gap-2 sm:gap-3`} aria-label="Public ledger highlights">
      {items.map((it) => (
        <li key={it.to}>
          <Link
            to={it.to as any}
            preload="intent"
            className={`group flex h-full items-start justify-between gap-2 rounded-xl border px-3 py-2.5 transition ${wrap} ${compact ? "" : "sm:px-4 sm:py-3"}`}
          >
            <span className="min-w-0">
              <span
                className={`block stat-num ${value} ${compact ? "text-base" : "text-lg sm:text-h4"}`}
              >
                {it.value}
              </span>
              <span
                className={`mt-1 block font-sans text-micro font-semibold tracking-tight ${label}`}
              >
                {it.label}
              </span>
            </span>
            <ArrowUpRight
              aria-hidden
              className={`h-3.5 w-3.5 shrink-0 translate-y-0.5 transition group-hover:-translate-y-0 group-hover:translate-x-0.5 ${chev}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

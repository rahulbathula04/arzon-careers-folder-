import { Link } from "@tanstack/react-router";
import { ShieldCheck, Building2, Briefcase, ArrowUpRight } from "lucide-react";

/**
 * Compact, centered trust row used directly under the mobile hero.
 * Three short legal-status badges sit on a single line; long-form proof
 * (Govt of Telangana partner, ETV feature) is summarised in a single
 * centered link below. Hidden on md+ where the desktop hero already shows
 * a richer card.
 */
const badges = [
  { icon: ShieldCheck, label: "ISO 9001", hash: "iso" },
  { icon: Building2, label: "MSME", hash: "msme" },
  { icon: Briefcase, label: "MCA", hash: "mca" },
];

export function MobileTrustStrip() {
  return (
    <div className="tone-dark md:hidden border-y border-slate-200/8 bg-white/[0.02]">
      <div className="mx-auto max-w-md px-4 py-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {badges.map(({ icon: Icon, label, hash }) => (
            <Link
              key={label}
              to="/proof"
              hash={hash}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/12 bg-white/[0.04] px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-100/85"
            >
              <Icon className="h-3 w-3 text-gold" />
              {label}
              <span className="opacity-60">✓</span>
            </Link>
          ))}
        </div>
        <Link
          to="/proof"
          className="mt-3 inline-flex items-center gap-1 text-micro font-semibold text-primary-glow"
        >
          Govt of Telangana partner · Featured on ETV
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

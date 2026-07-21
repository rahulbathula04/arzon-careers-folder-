import { ShieldCheck, Building2, FileBadge2 } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "ISO 9001" },
  { icon: Building2, label: "MSME · Govt of India" },
  { icon: FileBadge2, label: "Registered with MCA" },
];

/**
 * Compliance strip. Mobile: single horizontal row, scrolls if it has to —
 * never wraps into a ragged 3-line block. Desktop: centred row with
 * eyebrow label.
 */
export function TrustBar({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`w-full border-y border-white/10 bg-[#0B1325] ${compact ? "py-2" : "py-2.5"}`}
      style={{ color: "#E2E8F0" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-4 sm:flex-wrap sm:justify-center sm:gap-x-5 sm:overflow-visible sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span
          className="hidden shrink-0 font-mono text-micro font-semibold uppercase tracking-[0.22em] sm:inline"
          style={{ color: "#60A5FA" }}
        >
          Compliance-registered · Hyderabad
        </span>
        <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
        <ul className="flex shrink-0 items-center gap-2 sm:gap-x-4">
          {items.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-micro font-medium sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
              style={{ color: "#E2E8F0" }}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#60A5FA" }} />
              <span className="whitespace-nowrap">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

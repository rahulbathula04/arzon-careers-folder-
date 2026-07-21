import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Hand-set primitives used across the result-page cards. Each card composes
 * these so the surfaces feel deliberately built rather than templated.
 */

export function CornerIndex({
  index,
  label,
  tone = "gold",
}: {
  index: string;
  label: string;
  tone?: "gold" | "muted";
}) {
  // Primitives default to tone-light surfaces (white card backgrounds).
  // "muted" must stay readable on white, not on dark.
  const color = tone === "gold" ? "text-gold" : "text-slate-500";
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={`font-grotesk text-micro font-bold tracking-[0.32em] ${color}`}
        aria-hidden="true"
      >
        {index}
      </span>
      <span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />
      <span
        className={`font-mono text-micro uppercase tracking-[0.24em] ${
          tone === "gold" ? "text-gold/85" : "text-slate-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/** Subtle radial-noise overlay so gradients don't read as flat presets. */
export function GrainOverlay() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.18] mix-blend-soft-light"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.35) 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px, 7px 7px",
        backgroundPosition: "0 0, 1.5px 1.5px",
      }}
    />
  );
}

/** A thin rule with a small tick — used as a quiet section break inside a card. */
export function HairlineDivider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent ${className}`}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-300" />
    </div>
  );
}

/** Small caps standfirst row — keywords joined by middle dots. */
export function EvidenceChips({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-micro uppercase tracking-[0.2em] text-slate-500">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-2">
          {i > 0 && <span className="text-slate-300">·</span>}
          {item}
        </span>
      ))}
    </p>
  );
}

/** Editorial CTA link — underline plus arrow that nudges on hover. */
export function EditorialLink({
  tone = "primary",
  children,
}: {
  tone?: "primary" | "gold";
  children: ReactNode;
}) {
  const colour = tone === "gold" ? "text-gold" : "text-primary-glow";
  return (
    <span
      className={`group inline-flex items-center gap-2 font-grotesk text-sm font-bold ${colour}`}
    >
      <span className="border-b border-current/40 pb-[2px] transition-colors group-hover:border-current">
        {children}
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 motion-reduce:transition-none group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  );
}

/** Pull a few short keyword phrases out of a "why" sentence for the chip row. */
export function deriveEvidenceTags(why: string, max = 3): string[] {
  if (!why) return [];
  // Split on common separators, keep short phrases.
  const parts = why
    .split(/[·•|;,]|\s—\s|\s-\s/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 3 && s.length <= 32);
  if (parts.length >= 2) return parts.slice(0, max);
  // Fallback: first N significant words.
  const words = why.replace(/[.!?]/g, "").split(/\s+/).filter(Boolean);
  if (words.length <= 4) return [why.replace(/[.!?]$/, "")];
  return [words.slice(0, 3).join(" "), words.slice(3, 6).join(" ")].filter(Boolean);
}

/**
 * Shared white "course card" chrome used across every result-page block.
 * Inspired by Coursera / Duolingo / Canvas: bright white surface, soft slate
 * ring, generous radius and a faint shadow that lifts the card off the dark
 * backdrop without looking templated. An optional tinted header band
 * (`eyebrow` + `title`) gives each section the same Coursera "module" feel.
 */
export function ResultCard({
  eyebrow,
  title,
  trailing,
  icon,
  tone = "primary",
  className = "",
  bodyClassName = "p-4 sm:p-6",
  children,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  trailing?: ReactNode;
  icon?: ReactNode;
  tone?: "primary" | "emerald" | "amber" | "fuchsia" | "gold" | "rose" | "slate";
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  const bandTone: Record<NonNullable<typeof tone>, string> = {
    primary: "from-primary/5 via-white to-primary/5 text-primary",
    emerald: "from-accent-sky-deep/8 via-white to-accent-sky-deep/5 text-accent-sky-deep",
    amber: "from-amber-400/10 via-white to-amber-400/5 text-amber-700",
    fuchsia: "from-fuchsia-500/10 via-white to-fuchsia-500/5 text-fuchsia-700",
    gold: "from-yellow-400/10 via-white to-yellow-400/5 text-yellow-700",
    rose: "from-rose-500/10 via-white to-rose-500/5 text-rose-700",
    slate: "from-slate-100 via-white to-slate-50 text-slate-700",
  };
  return (
    <section
      className={`tone-light mt-4 sm:mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] ${className}`}
    >
      {(eyebrow || title) && (
        <div
          className={`flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r px-4 py-3 sm:px-6 sm:py-4 ${bandTone[tone]}`}
        >
          <div className="min-w-0">
            {eyebrow && (
              <p className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide">
                {icon}
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className="mt-1.5 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body-lg">
                {title}
              </h3>
            )}
          </div>
          {trailing && <div className="shrink-0">{trailing}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/** Coursera-style row with a label, a coloured progress bar, and a percent. */
export function SkillBar({
  label,
  value,
  tone = 0,
}: {
  label: string;
  value: number;
  tone?: number;
}) {
  const palette = [
    "bg-primary",
    "bg-accent-sky-deep",
    "bg-amber-500",
    "bg-fuchsia-500",
    "bg-sky-500",
  ];
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-grotesk text-caption font-bold text-slate-900">{label}</p>
        <p className="font-mono text-micro font-bold tabular-nums text-slate-700">
          {v}
          <span className="text-slate-400">/100</span>
        </p>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${palette[tone % palette.length]} transition-[width] duration-500 motion-reduce:transition-none`}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

/** Coursera-style stat tile (small number + label + optional sub). */
export function StatTile({
  label,
  value,
  sub,
  tone = "slate",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "slate" | "primary" | "emerald" | "amber" | "gold";
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-50 ring-slate-200 text-slate-900",
    primary: "bg-primary/5 ring-primary/20 text-primary",
    emerald: "bg-accent-sky-deep/5 ring-accent-sky-deep/20 text-accent-sky-deep",
    amber: "bg-amber-50 ring-amber-200 text-amber-700",
    gold: "bg-yellow-50 ring-yellow-200 text-yellow-700",
  };
  return (
    <div className={`rounded-2xl px-4 py-3 ring-1 ${tones[tone]}`}>
      <p className="font-mono text-micro font-semibold uppercase tracking-wide opacity-80">
        {label}
      </p>
      <p className="mt-1 font-grotesk text-body-lg font-extrabold leading-tight tabular-nums text-slate-900">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-micro text-slate-600">{sub}</p>}
    </div>
  );
}

/** Coursera-style pill chip (used for tags/companies/skills). */
export function Chip({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "slate" | "primary" | "emerald" | "amber" | "fuchsia";
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    primary: "bg-primary/10 text-primary ring-primary/20",
    emerald: "bg-accent-sky-deep/10 text-accent-sky-deep ring-accent-sky-deep/20",
    amber: "bg-amber-100 text-amber-800 ring-amber-200",
    fuchsia: "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-micro font-semibold ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

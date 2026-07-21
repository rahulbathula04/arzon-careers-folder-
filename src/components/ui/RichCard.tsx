import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * RichCard — the project's canonical content card.
 *
 * Anatomy (matches the reference shots in /docs/cards):
 *
 *   ┌────────────────────────────────────┐
 *   │ [eyebrowLeft]        [eyebrowRight]│  ← gradient HEADER band
 *   │ Title                              │
 *   │                  (optional art)    │
 *   ├────────────────────────────────────┤
 *   │ Body copy                          │  ← solid SURFACE
 *   │ Meta rows (checks, bars, stats)    │
 *   │ Footer CTA                         │
 *   └────────────────────────────────────┘
 *
 * One prop, `tone`, swaps the entire colour story while keeping the
 * locked brand palette. See `--tone-*` tokens in src/styles.css.
 */

export type RichCardTone = "blue" | "orange" | "navy" | "emerald" | "violet" | "slate";

type ToneStyles = {
  /** wraps the whole card — sets surface bg + ink */
  shell: string;
  /** gradient header band */
  header: string;
  /** ink colour for items inside the header */
  headerInk: string;
  /** chip on the header */
  chip: string;
  /** body ink (paragraph / meta text) */
  bodyInk: string;
  /** subtle hairline inside content */
  divider: string;
};

const TONES: Record<RichCardTone, ToneStyles> = {
  blue: {
    shell: "bg-[var(--tone-blue-surface)] text-[var(--tone-blue-ink)]",
    header: "bg-[linear-gradient(135deg,var(--tone-blue-from),var(--tone-blue-to))]",
    headerInk: "text-white",
    chip: "bg-white/95 text-[var(--tone-blue-to)] ring-1 ring-white/40",
    bodyInk: "text-[var(--ink-soft)]",
    divider: "border-black/5",
  },
  orange: {
    shell: "bg-[var(--tone-orange-surface)] text-[var(--tone-orange-ink)]",
    header: "bg-[linear-gradient(135deg,var(--tone-orange-from),var(--tone-orange-to))]",
    headerInk: "text-white",
    chip: "bg-white/95 text-[var(--tone-orange-to)] ring-1 ring-white/40",
    bodyInk: "text-[var(--ink-soft)]",
    divider: "border-black/5",
  },
  navy: {
    shell: "bg-[var(--tone-navy-surface)] text-[var(--tone-navy-ink)]",
    header: "bg-[linear-gradient(135deg,var(--tone-navy-from),var(--tone-navy-to))]",
    headerInk: "text-white",
    chip: "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur",
    bodyInk: "text-white/75",
    divider: "border-white/10",
  },
  emerald: {
    shell: "bg-[var(--tone-emerald-surface)] text-[var(--tone-emerald-ink)]",
    header: "bg-[linear-gradient(135deg,var(--tone-emerald-from),var(--tone-emerald-to))]",
    headerInk: "text-white",
    chip: "bg-white/95 text-[var(--tone-emerald-to)] ring-1 ring-white/40",
    bodyInk: "text-[var(--ink-soft)]",
    divider: "border-black/5",
  },
  violet: {
    shell: "bg-[var(--tone-violet-surface)] text-[var(--tone-violet-ink)]",
    header: "bg-[linear-gradient(135deg,var(--tone-violet-from),var(--tone-violet-to))]",
    headerInk: "text-white",
    chip: "bg-white/95 text-[var(--tone-violet-to)] ring-1 ring-white/40",
    bodyInk: "text-[var(--ink-soft)]",
    divider: "border-black/5",
  },
  slate: {
    shell: "bg-[var(--tone-slate-surface)] text-[var(--tone-slate-ink)]",
    header: "bg-[linear-gradient(135deg,var(--tone-slate-from),var(--tone-slate-to))]",
    headerInk: "text-white",
    chip: "bg-white/10 text-white ring-1 ring-white/15 backdrop-blur",
    bodyInk: "text-white/70",
    divider: "border-white/10",
  },
};

type ToneContextValue = { tone: RichCardTone; styles: ToneStyles };
const ToneContext = React.createContext<ToneContextValue | null>(null);
function useTone() {
  const ctx = React.useContext(ToneContext);
  if (!ctx) throw new Error("RichCard.* must be used inside <RichCard>");
  return ctx;
}

type RootProps = React.HTMLAttributes<HTMLElement> & {
  tone?: RichCardTone;
  as?: "article" | "section" | "div" | "li";
  /** Visual lift level — `flat` for grids, `lifted` for hero/pricing. */
  elevation?: "flat" | "lifted";
};

function Root({
  tone = "blue",
  as: Tag = "article",
  elevation = "lifted",
  className,
  children,
  ...props
}: RootProps) {
  const styles = TONES[tone];
  return (
    <ToneContext.Provider value={{ tone, styles }}>
      <Tag
        className={cn(
          "group/richcard relative isolate flex flex-col overflow-hidden",
          "rounded-[var(--radius-card)]",
          elevation === "lifted"
            ? "shadow-[var(--shadow-card-elevated)]"
            : "shadow-[var(--shadow-soft)]",
          styles.shell,
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    </ToneContext.Provider>
  );
}

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Optional decorative element (SVG/icon) that peeks from the right edge. */
  art?: React.ReactNode;
  /** Tighter band when there's no headline inside the header. */
  compact?: boolean;
};
function Header({ art, compact, className, children, ...props }: HeaderProps) {
  const { styles } = useTone();
  return (
    <div
      className={cn(
        "relative isolate flex items-start justify-between gap-4 overflow-hidden",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
        styles.header,
        styles.headerInk,
        className,
      )}
      {...props}
    >
      <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-3">{children}</div>
      {art ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-2 z-0 opacity-80 [&>*]:h-28 [&>*]:w-28 sm:[&>*]:h-32 sm:[&>*]:w-32"
        >
          {art}
        </div>
      ) : null}
    </div>
  );
}

type EyebrowRowProps = React.HTMLAttributes<HTMLDivElement>;
function EyebrowRow({ className, children, ...props }: EyebrowRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon?: React.ReactNode;
};
function Chip({ icon, className, children, ...props }: ChipProps) {
  const { styles } = useTone();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em]",
        styles.chip,
        className,
      )}
      {...props}
    >
      {icon ? <span className="-ml-0.5 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span> : null}
      {children}
    </span>
  );
}

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3" | "h4";
  /** Use serif display face (default true) — matches reference card titles. */
  serif?: boolean;
};
function Title({ as: Tag = "h3", serif = true, className, children, ...props }: TitleProps) {
  return (
    <Tag
      className={cn(
        serif ? "font-display" : "font-grotesk",
        "text-[22px] leading-[1.1] tracking-tight sm:text-[26px]",
        "text-current",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

type BodyProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Tighter inner padding for dense grids. */
  compact?: boolean;
};
function Body({ compact, className, children, ...props }: BodyProps) {
  const { styles } = useTone();
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-4",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6",
        styles.bodyInk,
        "[&_strong]:text-current",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CheckListProps = React.HTMLAttributes<HTMLUListElement> & {
  items: React.ReactNode[];
};
function CheckList({ items, className, ...props }: CheckListProps) {
  const { styles, tone } = useTone();
  const accentColor =
    tone === "navy" || tone === "slate" ? "text-white" : `text-[var(--tone-${tone}-to)]`;
  return (
    <ul className={cn("flex flex-col gap-2.5 text-[14px]", styles.bodyInk, className)} {...props}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <svg
            viewBox="0 0 20 20"
            aria-hidden
            className={cn("mt-0.5 h-[18px] w-[18px] shrink-0 rounded-full", accentColor)}
          >
            <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.14" />
            <path
              d="M6 10.4l2.6 2.6L14.2 7.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-current">{item}</span>
        </li>
      ))}
    </ul>
  );
}

type FooterProps = React.HTMLAttributes<HTMLDivElement>;
function Footer({ className, children, ...props }: FooterProps) {
  const { styles } = useTone();
  return (
    <div
      className={cn(
        "mt-auto flex items-center justify-between gap-3 border-t px-5 py-4 sm:px-6",
        styles.divider,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const RichCard = Object.assign(Root, {
  Header,
  EyebrowRow,
  Chip,
  Title,
  Body,
  CheckList,
  Footer,
});

export default RichCard;

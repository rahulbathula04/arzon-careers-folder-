import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";

type Density = "comfortable" | "compact";

export type KpiColor = "blue" | "violet" | "emerald" | "amber" | "rose" | "zinc";

const COLOR_STYLES: Record<
  KpiColor,
  {
    border: string;
    glow: string;
    badge: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  blue: {
    border: "hover:border-blue-500/30 border-white/[0.08]",
    glow: "from-blue-500/[0.07] via-transparent to-transparent",
    badge: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  violet: {
    border: "hover:border-violet-500/30 border-white/[0.08]",
    glow: "from-violet-500/[0.07] via-transparent to-transparent",
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  emerald: {
    border: "hover:border-emerald-500/30 border-white/[0.08]",
    glow: "from-emerald-500/[0.07] via-transparent to-transparent",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  amber: {
    border: "hover:border-amber-500/30 border-white/[0.08]",
    glow: "from-amber-500/[0.07] via-transparent to-transparent",
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  rose: {
    border: "hover:border-rose-500/30 border-white/[0.08]",
    glow: "from-rose-500/[0.07] via-transparent to-transparent",
    badge: "text-rose-300 bg-rose-500/10 border-rose-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
  zinc: {
    border: "hover:border-white/20 border-white/[0.08]",
    glow: "from-white/[0.03] via-transparent to-transparent",
    badge: "text-zinc-300 bg-white/5 border-white/10",
    iconBg: "bg-white/5",
    iconColor: "text-zinc-400",
  },
};

/**
 * Standardised dashboard card. Wraps the Card surface so every
 * admin panel reads with the same hierarchy, spacing and contrast.
 */
export function AdminCard({
  title,
  eyebrow,
  description,
  actions,
  footer,
  density = "comfortable",
  className,
  bodyClassName,
  children,
}: {
  title?: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  density?: Density;
  className?: string;
  bodyClassName?: string;
  children?: ReactNode;
}) {
  const pad = density === "compact" ? "p-4" : "p-5 sm:p-6";
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      whileHover={shouldReduceMotion ? undefined : { y: -2, transition: TRANSITION_PRESETS.springQuick }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d11]/80 backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-200 hover:border-white/[0.16] hover:shadow-lg",
        className,
      )}
    >
      {(title || eyebrow || description || actions) && (
        <header
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-white/[0.06]",
            density === "compact" ? "px-4 py-3" : "px-5 py-4 sm:px-6",
          )}
        >
          <div className="min-w-0">
            {eyebrow ? (
              <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="truncate text-base font-semibold tracking-tight text-white">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-xs text-zinc-400">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </header>
      )}
      <div className={cn(pad, bodyClassName)}>{children}</div>
      {footer ? (
        <footer
          className={cn(
            "border-t border-white/[0.06] bg-black/20 text-xs text-zinc-400",
            density === "compact" ? "px-4 py-2.5" : "px-5 py-3 sm:px-6",
          )}
        >
          {footer}
        </footer>
      ) : null}
    </motion.section>
  );
}

/**
 * KPI tile - large number, AA-contrast label, colored glow, trend indicator.
 */
export function AdminKpi({
  label,
  value,
  delta,
  trend,
  icon,
  helper,
  accent,
  color = "blue",
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: ReactNode;
  helper?: ReactNode;
  accent?: boolean;
  color?: KpiColor;
}) {
  const shouldReduceMotion = useReducedMotion();
  const scheme = COLOR_STYLES[color] || COLOR_STYLES.blue;

  const trendBadge =
    trend === "up"
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : trend === "down"
        ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
        : "text-zinc-400 bg-white/5 border-white/10";

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -3, scale: 1.01, transition: TRANSITION_PRESETS.springQuick }
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-[#0d0d12]/90 p-5 shadow-sm transition-all duration-200",
        scheme.border,
        accent && "ring-1 ring-violet-500/30 border-violet-500/40",
      )}
    >
      {/* Background ambient gradient glow */}
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100",
          scheme.glow,
        )}
      />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {icon ? (
            <span
              className={cn(
                "grid h-7 w-7 shrink-0 place-items-center rounded-lg ring-1 ring-white/10",
                scheme.iconBg,
                scheme.iconColor,
              )}
            >
              {icon}
            </span>
          ) : null}
          <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            {label}
          </span>
        </div>
        {delta ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider",
              trendBadge,
            )}
          >
            {delta}
          </span>
        ) : null}
      </div>

      <div className="relative z-10 mt-4 flex items-baseline justify-between gap-2">
        <p className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
          {value}
        </p>
      </div>

      {helper ? (
        <p className="relative z-10 mt-2 text-[11px] text-zinc-500">{helper}</p>
      ) : null}
    </motion.div>
  );
}


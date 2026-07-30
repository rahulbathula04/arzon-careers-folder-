import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Density = "comfortable" | "compact";

/**
 * Standardised dashboard card. Wraps the shadcn Card surface so every
 * admin panel reads with the same hierarchy, spacing and contrast.
 *
 * - Title: text-lg font-semibold tracking-tight
 * - Eyebrow: small uppercase mono label
 * - Description: AA-contrast muted-foreground
 * - Footer slot for actions / metadata
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
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
    >
      {(title || eyebrow || description || actions) && (
        <header
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border",
            density === "compact" ? "px-4 py-3" : "px-5 py-4 sm:px-6",
          )}
        >
          <div className="min-w-0">
            {eyebrow ? (
              <p className="mb-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </header>
      )}
      <div className={cn(pad, bodyClassName)}>{children}</div>
      {footer ? (
        <footer
          className={cn(
            "border-t border-border bg-muted/40 text-sm text-muted-foreground",
            density === "compact" ? "px-4 py-2.5" : "px-5 py-3 sm:px-6",
          )}
        >
          {footer}
        </footer>
      ) : null}
    </section>
  );
}

/**
 * KPI tile - large number, AA-contrast label, optional delta.
 */
export function AdminKpi({
  label,
  value,
  delta,
  trend,
  icon,
  helper,
  accent,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: ReactNode;
  helper?: ReactNode;
  accent?: boolean;
}) {
  const trendClass =
    trend === "up"
      ? "text-sky-700 bg-sky-100"
      : trend === "down"
        ? "text-rose-700 bg-rose-100"
        : "text-muted-foreground bg-muted";
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-sm transition",
        accent ? "border-primary/40 ring-1 ring-primary/15" : "border-border",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          {icon ? (
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-muted text-foreground">
              {icon}
            </span>
          ) : null}
          <span className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </span>
        </div>
        {delta ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 font-mono text-micro font-semibold",
              trendClass,
            )}
          >
            {delta}
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-h2 font-bold leading-none tabular-nums text-foreground sm:text-h1">
        {value}
      </p>
      {helper ? <p className="mt-2 text-xs text-muted-foreground">{helper}</p> : null}
    </div>
  );
}

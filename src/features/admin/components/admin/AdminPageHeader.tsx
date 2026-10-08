import type { ReactNode } from "react";

/**
 * Standardised page header for every /admin/* route.
 * Gives titles a real visual weight, a muted-but-AA description,
 * and a slot for actions that survives on mobile (stacks below the title).
 */
export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 border-b border-border pb-5 sm:mb-8 sm:gap-4 sm:pb-6">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1.5 font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-h3 font-bold leading-tight tracking-tight text-foreground sm:text-h2 lg:text-h1">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="col-start-1 row-start-2 flex flex-wrap items-center gap-2 sm:col-start-2 sm:row-start-1 sm:justify-end">
          {actions}
        </div>
      ) : null}
    </header>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Section } from "@/components/ui/Section";

export type ResponsiveMinH = number | { base: number; sm?: number; md?: number; lg?: number };

type Variant = "default" | "faq" | "form" | "cta" | "strip" | "grid" | "media" | "compare";

interface Props {
  variant?: Variant;
  minH?: ResponsiveMinH;
}

/**
 * Lightweight, theme-aware skeleton for lazy-loaded landing sections.
 * Reserves vertical space (CLS=0) and gives a structured shimmer so the
 * page feels instant while the chunk streams in.
 */
/**
 * Resolve a responsive minH into an inline style that uses CSS custom
 * properties. Tailwind arbitrary classes read those vars (see
 * RESPONSIVE_MIN_H_CLASS below) and
 * apply the right value at each breakpoint, so reserved space matches the
 * real component height at every viewport. This keeps CLS ≈ 0 from
 * 320px through desktop without forcing the largest height everywhere.
 */
function minHStyle(minH?: ResponsiveMinH): React.CSSProperties | undefined {
  if (minH == null) return undefined;
  if (typeof minH === "number") return { minHeight: minH };
  const { base, sm, md, lg } = minH;
  return {
    ["--mh-base" as any]: `${base}px`,
    ["--mh-sm" as any]: `${sm ?? base}px`,
    ["--mh-md" as any]: `${md ?? sm ?? base}px`,
    ["--mh-lg" as any]: `${lg ?? md ?? sm ?? base}px`,
  };
}

const RESPONSIVE_MIN_H_CLASS =
  "min-h-[var(--mh-base)] sm:min-h-[var(--mh-sm)] md:min-h-[var(--mh-md)] lg:min-h-[var(--mh-lg)]";

export function SectionSkeleton({ variant = "default", minH }: Props) {
  const isResponsive = !!minH && typeof minH === "object";
  const style = minHStyle(minH);
  const inner = (() => {
    switch (variant) {
      case "strip":
        return (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
        );
      case "cta":
        return (
          <div className="rounded-[28px] border border-slate-200/10 bg-white/[0.03] px-6 py-12 sm:px-12 sm:py-16">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-9 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full max-w-xl" />
            <Skeleton className="mt-2 h-4 w-3/4 max-w-md" />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-12 w-full sm:w-56 rounded-full" />
              <Skeleton className="h-12 w-full sm:w-56 rounded-full" />
            </div>
          </div>
        );
      case "faq":
        return (
          <div>
            <Skeleton className="mx-auto h-8 w-64" />
            <Skeleton className="mx-auto mt-3 h-4 w-80" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          </div>
        );
      case "form":
        return (
          <div className="rounded-2xl border border-slate-200/10 bg-white/[0.03] p-6 sm:p-10">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="mt-2 h-4 w-72" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
            <Skeleton className="mt-6 h-12 w-full sm:w-48 rounded-full" />
          </div>
        );
      case "grid":
        return (
          <div>
            <Skeleton className="mx-auto h-8 w-72" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-44 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        );
      case "media":
        return (
          <div>
            <Skeleton className="mx-auto h-7 w-56" />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 opacity-80">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-32 rounded-md" />
              ))}
            </div>
          </div>
        );
      case "compare":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-72 w-full rounded-2xl" />
            <Skeleton className="h-72 w-full rounded-2xl" />
          </div>
        );
      default:
        return (
          <div>
            <Skeleton className="h-7 w-64" />
            <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
            <Skeleton className="mt-2 h-4 w-5/6 max-w-xl" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        );
    }
  })();

  return (
    <Section
      size="md"
      aria-hidden
      className={isResponsive ? RESPONSIVE_MIN_H_CLASS : undefined}
      style={style}
    >
      <div className="opacity-70">{inner}</div>
    </Section>
  );
}

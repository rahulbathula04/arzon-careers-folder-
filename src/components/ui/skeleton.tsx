import { cn } from "@/lib/utils";

/**
 * Skeleton placeholder. The shimmer (`animate-pulse`) is automatically
 * disabled when:
 *   - the OS sets `prefers-reduced-motion: reduce` (via the `motion-safe:` variant)
 *   - the user toggled motion off in our UI (via `html.reduce-motion`,
 *     handled in styles.css which strips all animation/transition).
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-skeleton
      className={cn("motion-safe:animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };

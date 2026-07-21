import { forwardRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * LightSurface — the canonical way to render a solid white (or light)
 * surface inside the dark marketing shell.
 *
 * Why this exists:
 *   The global `.tone-dark` cascade in src/styles.css repaints body copy
 *   white so headings/paragraphs stay legible on navy. Any raw `bg-white`
 *   card that lives inside `.tone-dark` therefore renders white-on-white
 *   text unless it opts out with the `tone-light` (or `card-light`)
 *   escape hatch. Two lint gates enforce this:
 *     • scripts/check-no-raw-white.mjs     (bans bare text-white/N)
 *     • scripts/check-tone-light-cards.mjs (requires tone-light on bg-white)
 *
 *   Instead of remembering both classes at every call site, render
 *   `<LightSurface>` and the guard is applied automatically. The
 *   underlying element, padding, radius, and shadow are all
 *   customisable via className.
 *
 * Usage:
 *   <LightSurface className="rounded-2xl p-6 shadow-sm">…</LightSurface>
 *   <LightSurface as="section" tint="soft">…</LightSurface>
 */
type Tint = "white" | "soft";

type LightSurfaceOwnProps = {
  as?: ElementType;
  tint?: Tint;
  children?: ReactNode;
  className?: string;
};

type LightSurfaceProps = LightSurfaceOwnProps &
  Omit<ComponentPropsWithoutRef<"div">, keyof LightSurfaceOwnProps>;

const TINT_BG: Record<Tint, string> = {
  white: "bg-white",
  soft: "bg-slate-50",
};

export const LightSurface = forwardRef<HTMLElement, LightSurfaceProps>(function LightSurface(
  { as, tint = "white", className, children, ...rest },
  ref,
) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      ref={ref}
      // `tone-light` is the escape hatch consumed by the global
      // `.tone-dark p:not(.tone-light *, …)` overrides in styles.css.
      // Keep it as the FIRST class so grep/audits reliably find it.
      className={cn("tone-light text-slate-900", TINT_BG[tint], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default LightSurface;

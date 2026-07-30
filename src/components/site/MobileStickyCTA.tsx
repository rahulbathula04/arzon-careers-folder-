import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  to: string;
  hint?: string;
  className?: string;
};

/**
 * MobileStickyCTA - a bottom-pinned primary action that respects the
 * iOS safe area and only appears on small screens. Mount once per
 * conversion-critical route (course, pricing, proof, enrol).
 */
export function MobileStickyCTA({ label, to, hint, className }: Props) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        "bg-gradient-to-t from-background via-background/95 to-background/0",
        className,
      )}
      role="region"
      aria-label="Primary action"
    >
      <Link
        to={to}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-full",
          "bg-[var(--cta-bg)] px-5 text-body-sm font-semibold text-[var(--cta-fg)]",
          "shadow-[0_12px_32px_-12px_oklch(0.52_0.16_252/0.55)]",
          "active:translate-y-[1px]",
        )}
      >
        <span>{label}</span>
        {hint ? (
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] opacity-80">
            {hint}
          </span>
        ) : null}
      </Link>
    </div>
  );
}

export default MobileStickyCTA;

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "gold" | "ghost";
type Size = "sm" | "md" | "lg" | "xl";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  gold: "btn-gold",
  ghost: "btn-ghost",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

/**
 * Universal CTA. Use this everywhere instead of bespoke `inline-flex h-12 …`.
 * Renders a <button> by default; pass `as="a"` for an anchor.
 */
export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean; // full-width on mobile, auto from sm: up
  fullBlock?: boolean; // full-width at all sizes
  /** Render the child element (Link, <a>, etc.) with the button styles applied. */
  asChild?: boolean;
  /** Adds the looping glow-pulse animation (primary/gold CTAs only). */
  glow?: boolean;
  /** Show a spinner, dim label, block clicks. */
  loading?: boolean;
  /** Icon node placed before the label. Auto-tagged for hover counter-nudge. */
  leadingIcon?: React.ReactNode;
  /** Icon node placed after the label. Auto-tagged for arrow-nudge on hover. */
  trailingIcon?: React.ReactNode;
}

export const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(function CTAButton(
  {
    variant = "primary",
    size,
    block,
    fullBlock,
    asChild,
    glow,
    loading,
    leadingIcon,
    trailingIcon,
    className,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  const Comp: any = asChild ? Slot : "button";
  const hasIcons = Boolean(leadingIcon || trailingIcon);
  const content = hasIcons ? (
    <>
      {leadingIcon ? (
        <span data-icon-leading aria-hidden>
          {leadingIcon}
        </span>
      ) : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span data-arrow aria-hidden>
          {trailingIcon}
        </span>
      ) : null}
    </>
  ) : (
    children
  );
  return (
    <Comp
      ref={ref}
      className={cn(
        "btn",
        variantClass[variant],
        size && sizeClass[size],
        block && "btn-block btn-block-sm-auto",
        fullBlock && "btn-block",
        glow && "btn-glow-pulse",
        className,
      )}
      data-loading={loading ? "true" : undefined}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      disabled={!asChild && (disabled || loading)}
      {...rest}
    >
      {asChild ? children : content}
    </Comp>
  );
});

/** Same look as CTAButton but for anchor / Link-style usage. */
export function ctaClass(
  variant: Variant = "primary",
  opts: { size?: Size; block?: boolean; fullBlock?: boolean; className?: string } = {},
) {
  return cn(
    "btn",
    variantClass[variant],
    opts.size && sizeClass[opts.size],
    opts.block && "btn-block btn-block-sm-auto",
    opts.fullBlock && "btn-block",
    opts.className,
  );
}

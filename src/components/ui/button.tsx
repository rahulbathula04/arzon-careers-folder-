import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTilt, tiltSeed } from "@/hooks/useTilt";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hc-tactile hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hc-tactile hover:bg-destructive/90",
        outline:
          "border-2 border-input bg-background text-foreground shadow-sm hc-tactile hover:bg-muted hover:border-ring",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hc-tactile hover:bg-secondary/80",
        // ghost: adapts to surface - visible on light bg by default. Use ghostDark on navy surfaces.
        ghost: "text-foreground hc-link hover:bg-muted",
        ghostDark: "text-white hc-link hover:bg-white/[0.06]",
        link: "text-primary underline-offset-4 hc-link",
        //, Premium variants - repointed to brand navy + teal accent -
        premium: "btn btn-primary hc-tactile",
        gold: "btn btn-gold hc-tactile",
        glass: "glass text-white hc-tactile hover:bg-white/10",
        outlineDark:
          "border border-white/20 bg-white/5 text-white backdrop-blur-md hc-tactile hover:bg-white/10",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-full px-7 text-base",
        xl: "h-14 rounded-full px-9 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const tilt = useTilt<HTMLButtonElement>();
    // Per-button seed for asymmetric tilt; fall back to variant when no text.
    const seedKey =
      typeof props.children === "string"
        ? props.children
        : `${variant ?? "default"}-${size ?? "default"}`;
    const mergedStyle = { ["--seed" as any]: tiltSeed(seedKey).toFixed(2), ...style };
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={mergedStyle}
        {...tilt}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

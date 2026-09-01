/**
 * Magic UI — ShimmerButton
 * A premium CTA button with an animated light shimmer sweep.
 * Source: https://magicui.design/docs/components/shimmer-button
 */
import { type ReactNode, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  className?: string;
}

export function ShimmerButton({
  children,
  shimmerColor = "rgba(255,255,255,0.25)",
  shimmerSize = "0.07em",
  shimmerDuration = "1.6s",
  borderRadius = "0.75rem",
  background = "#1B3F8B",
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--shimmer-duration": shimmerDuration,
          "--border-radius": borderRadius,
          "--background": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative cursor-pointer overflow-hidden whitespace-nowrap",
        "inline-flex items-center justify-center gap-2",
        "border border-white/10 px-6 py-3 text-sm font-extrabold text-white",
        "rounded-[var(--border-radius)]",
        "[background:var(--background)]",
        "shadow-xl shadow-[var(--background)]/30",
        "transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--background)]/40 hover:scale-[1.02] active:scale-[0.98]",
        "motion-safe:before:animate-[shimmer-slide_var(--shimmer-duration)_linear_infinite]",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-[var(--shimmer-color)] before:to-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Inject keyframe CSS once
if (typeof document !== "undefined") {
  const styleId = "magicui-shimmer-slide";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes shimmer-slide {
        to { transform: translateX(200%); }
      }
    `;
    document.head.appendChild(style);
  }
}

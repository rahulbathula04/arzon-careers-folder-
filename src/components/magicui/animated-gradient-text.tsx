/**
 * Magic UI — AnimatedGradientText
 * A shimmer animated gradient text effect.
 * Source: https://magicui.design/docs/components/animated-gradient-text
 */
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  colorFrom?: string;
  colorVia?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className,
  colorFrom = "#1B3F8B",
  colorVia = "#8A6D1F",
  colorTo = "#1B3F8B",
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          "--color-from": colorFrom,
          "--color-via": colorVia,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        "inline-block bg-[length:200%_auto] bg-clip-text text-transparent",
        "bg-gradient-to-r from-[var(--color-from)] via-[var(--color-via)] to-[var(--color-to)]",
        "motion-safe:animate-[gradient-shift_4s_ease_infinite]",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Inject keyframe CSS once
if (typeof document !== "undefined") {
  const styleId = "magicui-gradient-shift";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes gradient-shift {
        0% { background-position: 0% center; }
        50% { background-position: 100% center; }
        100% { background-position: 0% center; }
      }
    `;
    document.head.appendChild(style);
  }
}

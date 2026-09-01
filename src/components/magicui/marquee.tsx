/**
 * Magic UI — Marquee
 * An infinite horizontal scrolling marquee with a gradient fade on edges.
 * Source: https://magicui.design/docs/components/marquee
 */
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "motion-safe:animate-[marquee-x_var(--duration)_linear_infinite] flex-row": !vertical,
              "motion-safe:animate-[marquee-y_var(--duration)_linear_infinite] flex-col": vertical,
              "motion-safe:[animation-direction:reverse]": reverse,
              "motion-safe:group-hover:[animation-play-state:paused]": pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// Inject keyframe CSS once
if (typeof document !== "undefined") {
  const styleId = "magicui-marquee";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes marquee-x {
        from { transform: translateX(0); }
        to { transform: translateX(calc(-100% - var(--gap))); }
      }
      @keyframes marquee-y {
        from { transform: translateY(0); }
        to { transform: translateY(calc(-100% - var(--gap))); }
      }
    `;
    document.head.appendChild(style);
  }
}

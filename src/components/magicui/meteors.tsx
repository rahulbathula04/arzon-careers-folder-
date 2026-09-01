/**
 * Magic UI — Meteors
 * A shooting star particle effect for backgrounds.
 * Source: https://magicui.design/docs/components/meteors
 */
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 18, className }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.8}s`,
        duration: `${Math.floor(Math.random() * 8 + 6)}s`,
        size: Math.floor(Math.random() * 80 + 40),
      })),
    [number],
  );

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "absolute -top-2 left-1/2 h-0.5 rounded-full",
            "bg-gradient-to-r from-[#1B3F8B]/60 via-[#8A6D1F]/40 to-transparent",
            "motion-safe:animate-[meteor_linear_infinite]",
            "shadow-[0_0_0_1px_rgba(27,63,139,0.1)]",
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            width: `${meteor.size}px`,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
            transform: "rotate(215deg)",
          }}
        />
      ))}
    </div>
  );
}

// Inject keyframe CSS once
if (typeof document !== "undefined") {
  const styleId = "magicui-meteor";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes meteor {
        0% { transform: rotate(215deg) translateX(0); opacity: 1; }
        70% { opacity: 1; }
        100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

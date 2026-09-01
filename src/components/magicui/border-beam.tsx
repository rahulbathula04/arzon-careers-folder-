/**
 * Magic UI — BorderBeam
 * An animated beam of light that traces around the border of a card.
 * Source: https://magicui.design/docs/components/border-beam
 */
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "#1B3F8B",
  colorTo = "#8A6D1F",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] motion-safe:[mask-clip:padding-box,border-box]",
        "motion-safe:[mask-composite:intersect]",
        "[mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "motion-safe:after:absolute motion-safe:after:aspect-square motion-safe:after:w-[calc(var(--size)*1px)]",
        "after:motion-safe:animate-[border-beam_calc(var(--duration)*1s)_var(--delay)_infinite_linear]",
        "motion-safe:after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
        "motion-safe:after:[offset-anchor:90%_50%] motion-safe:after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        "border border-transparent",
        className,
      )}
    />
  );
}

// Inject keyframe CSS once
if (typeof document !== "undefined") {
  const styleId = "magicui-border-beam";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes border-beam {
        100% { offset-distance: 100%; }
      }
    `;
    document.head.appendChild(style);
  }
}

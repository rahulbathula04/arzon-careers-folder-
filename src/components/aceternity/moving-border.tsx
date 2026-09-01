/**
 * Aceternity UI — MovingBorder
 * An animated gradient border that moves around the card perimeter.
 * Source: https://ui.aceternity.com/components/moving-border
 */
import { useRef, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  as?: React.ElementType;
  borderClassName?: string;
  [key: string]: unknown;
}

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderRadius = "1rem",
  as: Component = "div",
  borderClassName,
  ...props
}: MovingBorderProps) {
  return (
    <Component
      className={cn("relative h-min overflow-hidden p-[2px]", containerClassName)}
      style={{ borderRadius }}
      {...props}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorderCore duration={duration} rx="30%" ry="30%" className={borderClassName}>
          <div className="h-20 w-20 bg-[conic-gradient(from_0deg_at_50%_50%,#1B3F8B_0deg,#8A6D1F_120deg,transparent_240deg,#1B3F8B_360deg)] opacity-80 blur-sm" />
        </MovingBorderCore>
      </div>
      <div
        className={cn("relative flex items-center justify-center border border-slate-200/50 bg-white", className)}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

function MovingBorderCore({
  children,
  duration = 2000,
  rx,
  ry,
  className,
}: {
  children: ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
}) {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
}

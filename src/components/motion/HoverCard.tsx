import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { TRANSITION_PRESETS } from "./motion-tokens";

export interface HoverCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  liftY?: number;
  scaleHover?: number;
}

export function HoverCard({
  children,
  className = "",
  liftY = -4,
  scaleHover = 1.01,
  ...props
}: HoverCardProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...(props as any)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{
        y: liftY,
        scale: scaleHover,
        transition: TRANSITION_PRESETS.springGentle,
      }}
      whileTap={{
        scale: 0.99,
        transition: TRANSITION_PRESETS.fast,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

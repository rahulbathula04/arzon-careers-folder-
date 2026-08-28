import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

export interface ParallaxVisualProps {
  children: ReactNode;
  className?: string;
  floatDistance?: number;
  duration?: number;
}

export function ParallaxVisual({
  children,
  className = "",
  floatDistance = 8,
  duration = 6,
}: ParallaxVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [-floatDistance, floatDistance, -floatDistance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

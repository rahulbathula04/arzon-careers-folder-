import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { TRANSITION_EASE } from "./motion-tokens";

export interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ImageReveal({
  children,
  className = "",
  delay = 0.1,
  duration = 0.6,
  once = true,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, clipPath: "inset(6% 6% 6% 6% round 16px)" }}
      whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 16px)" }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASE.smooth,
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}

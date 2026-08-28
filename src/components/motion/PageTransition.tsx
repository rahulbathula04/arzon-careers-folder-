import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { TRANSITION_PRESETS } from "./motion-tokens";

export interface PageTransitionProps {
  children: ReactNode;
  pathname?: string;
  className?: string;
}

export function PageTransition({ children, pathname, className = "" }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={TRANSITION_PRESETS.fast}
      className={className}
    >
      {children}
    </motion.div>
  );
}

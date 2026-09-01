import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Floating3dBadgeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  hoverScale?: number;
}

export function Floating3dBadge({
  children,
  className,
  delay = 0,
  duration = 4.5,
  hoverScale = 1.06,
}: Floating3dBadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ y: 0, rotateZ: 0 }}
      animate={{
        y: [-4, 5, -4],
        rotateZ: [-1.2, 1.5, -1.2],
        rotateX: [2, -2, 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        scale: hoverScale,
        rotateZ: 0,
        rotateX: 0,
        transition: { duration: 0.2 },
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
      className={cn("inline-flex items-center cursor-default filter drop-shadow-md", className)}
    >
      {children}
    </motion.div>
  );
}

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { staggerContainerVariants, staggerItemVariants } from "./motion-tokens";

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerInterval?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerInterval = 0.08,
  delayChildren = 0.04,
  once = true,
  amount = 0.15,
  className = "",
  ...props
}: StaggerContainerProps) {
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainerVariants(staggerInterval, delayChildren)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "", ...props }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...(props as any)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div variants={staggerItemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

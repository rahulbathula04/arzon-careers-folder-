import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, type ElementType } from "react";
import { slideVariants, TRANSITION_EASE } from "./motion-tokens";

export interface MotionRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number; // seconds
  duration?: number; // seconds
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.45,
  distance = 20,
  threshold = 0.15,
  once = true,
  className = "",
  as: Tag = "div",
  style,
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const Component = motion.create(Tag as any);

  if (shouldReduceMotion) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const variants = slideVariants(direction, distance);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: TRANSITION_EASE.smooth,
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}

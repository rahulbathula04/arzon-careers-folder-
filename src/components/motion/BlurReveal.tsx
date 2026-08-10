import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, type ElementType } from "react";
import { TRANSITION_EASE } from "./motion-tokens";

export interface BlurRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  blurAmount?: number;
  scaleInitial?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

export function BlurReveal({
  children,
  delay = 0.05,
  duration = 0.5,
  blurAmount = 8,
  scaleInitial = 0.97,
  once = true,
  className = "",
  as: Tag = "div",
  style,
  ...props
}: BlurRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion.create(Tag as any);

  if (shouldReduceMotion) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, scale: scaleInitial, filter: `blur(${blurAmount}px)` }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2 }}
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

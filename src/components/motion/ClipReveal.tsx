import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, type ElementType } from "react";
import { TRANSITION_EASE } from "./motion-tokens";

export interface ClipRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

export function ClipReveal({
  children,
  direction = "bottom",
  delay = 0.1,
  duration = 0.6,
  once = true,
  className = "",
  as: Tag = "div",
  style,
  ...props
}: ClipRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion.create(Tag as any);

  if (shouldReduceMotion) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const getClipInset = () => {
    switch (direction) {
      case "bottom":
        return { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" };
      case "top":
        return { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" };
      case "left":
        return { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" };
      case "right":
        return { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" };
    }
  };

  const clip = getClipInset();

  return (
    <Component
      initial={{ opacity: 0, clipPath: clip.hidden }}
      whileInView={{ opacity: 1, clipPath: clip.visible }}
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

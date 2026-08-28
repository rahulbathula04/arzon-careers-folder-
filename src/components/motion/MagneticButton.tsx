import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, type ElementType } from "react";
import { TRANSITION_PRESETS } from "./motion-tokens";

export interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: any) => void;
}

export function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  ...props
}: MagneticButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion.create(Tag as any);

  if (shouldReduceMotion) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      whileHover={{
        scale: 1.02,
        y: -1,
        transition: TRANSITION_PRESETS.springQuick,
      }}
      whileTap={{
        scale: 0.97,
        y: 0,
        transition: TRANSITION_PRESETS.fast,
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

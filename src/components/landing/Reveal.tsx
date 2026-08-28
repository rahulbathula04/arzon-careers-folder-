import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode, type CSSProperties, type ElementType } from "react";
import { TRANSITION_EASE } from "../motion/motion-tokens";

/**
 * Scroll-reveal wrapper using Framer Motion.
 * Supports delay (ms), custom tag, and variants while preserving compatibility.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  variant = "fade-up",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  variant?: "fade-up" | "fade-in" | "scale-in";
  style?: CSSProperties;
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion.create(Tag as any);

  if (shouldReduceMotion) {
    const CustomTag = Tag as any;
    return (
      <CustomTag className={className} style={style}>
        {children}
      </CustomTag>
    );
  }

  const getVariants = () => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case "scale-in":
        return {
          hidden: { opacity: 0, scale: 0.94 },
          visible: { opacity: 1, scale: 1 },
        };
      case "fade-in":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={getVariants()}
      transition={{
        duration: 0.45,
        delay: delay / 1000,
        ease: TRANSITION_EASE.smooth,
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}

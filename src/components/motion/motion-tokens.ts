import type { Transition, Variants } from "framer-motion";

/**
 * Shared Motion Design System Tokens & Easings
 * Tailored for high-end SaaS / fintech feel with responsive spring & custom curves.
 */

export const TRANSITION_EASE = {
  smooth: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth UI entrance
  gentle: [0.16, 1, 0.3, 1],
  bounce: [0.34, 1.56, 0.64, 1],
} as const;

export const TRANSITION_PRESETS = {
  fast: { duration: 0.2, ease: TRANSITION_EASE.smooth },
  medium: { duration: 0.38, ease: TRANSITION_EASE.smooth },
  slow: { duration: 0.55, ease: TRANSITION_EASE.smooth },
  springQuick: { type: "spring", stiffness: 400, damping: 28 },
  springGentle: { type: "spring", stiffness: 260, damping: 22 },
  springBounce: { type: "spring", stiffness: 350, damping: 18 },
} satisfies Record<string, Transition>;

// Stagger Container Variant
export const staggerContainerVariants = (
  staggerChildren = 0.08,
  delayChildren = 0.04,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Item reveal variant preset
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_PRESETS.medium,
  },
};

// Fade In Variant
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION_PRESETS.medium,
  },
};

// Scale In Variant
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_PRESETS.medium,
  },
};

// Slide Direction Variants
export const slideVariants = (
  direction: "up" | "down" | "left" | "right" | "none" = "up",
  distance = 24,
): Variants => {
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: TRANSITION_PRESETS.medium,
    },
  };
};

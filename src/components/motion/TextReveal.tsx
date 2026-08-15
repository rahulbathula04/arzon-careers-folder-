import { motion, useReducedMotion } from "framer-motion";
import { TRANSITION_EASE } from "./motion-tokens";

export interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  staggerDelay?: number;
  initialDelay?: number;
  mode?: "word" | "character";
  once?: boolean;
}

export function TextReveal({
  text,
  className = "",
  as: Tag = "h2",
  staggerDelay = 0.04,
  initialDelay = 0.05,
  mode = "word",
  once = true,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const items = mode === "word" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: TRANSITION_EASE.smooth,
      },
    },
  };

  const Component = motion.create(Tag);

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={containerVariants}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          variants={itemVariants}
          className="inline-block"
          style={{ paddingRight: mode === "word" && index < items.length - 1 ? "0.25em" : "0em" }}
        >
          {item}
        </motion.span>
      ))}
    </Component>
  );
}

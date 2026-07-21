import {
  useEffect,
  useRef,
  useState,
  createElement,
  type ReactNode,
  type CSSProperties,
  type ElementType,
} from "react";

/**
 * Lightweight scroll-reveal wrapper. Adds data-animate="fade-up" + flips
 * data-inview when the element scrolls into view, hooking into the existing
 * CSS in styles.css. Optional `delay` (ms) gives staggered reveals.
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
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    // Defensive: if the element is already visible in the viewport on mount
    // (e.g. above-the-fold hero on a short page, or inside a nested scroll
    // container that confuses IntersectionObserver), flip immediately so the
    // content never stays stuck at opacity:0.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    if (rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref,
      "data-animate": variant,
      "data-inview": inView ? "true" : "false",
      className,
      style: { animationDelay: delay ? `${delay}ms` : undefined, ...style },
    },
    children,
  );
}

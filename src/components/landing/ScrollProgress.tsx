import { useEffect, useState } from "react";
import { getScrollRoot } from "@/lib/scroll";

/**
 * Hairline scroll-progress bar pinned to the bottom of the sticky nav.
 * Uses transform: scaleX so it never re-layouts. Disabled in reduced motion.
 */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      const root = getScrollRoot();
      const max = root
        ? root.scrollHeight - root.clientHeight || 1
        : document.documentElement.scrollHeight - window.innerHeight || 1;
      const y = root ? root.scrollTop : window.scrollY;
      setP(Math.min(1, Math.max(0, y / max)));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const root = getScrollRoot();
    update();
    (root ?? window).addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      (root ?? window).removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-primary-glow to-gold"
        style={{
          transform: `scaleX(${p})`,
          transition: "transform 90ms linear",
          willChange: "transform",
        }}
      />
    </div>
  );
}

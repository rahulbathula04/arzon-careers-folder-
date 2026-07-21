/**
 * Hand-tuned smooth scroll. Uses requestAnimationFrame with easeOutQuart so
 * iOS Safari behaves consistently (native `scroll-behavior: smooth` is jerky
 * on momentum scroll there). Honors prefers-reduced-motion + .reduce-motion.
 */
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (document.documentElement.classList.contains("reduce-motion")) return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function getScrollRoot(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.getElementById("app-scroll-root");
}

function getScrollTop(): number {
  const root = getScrollRoot();
  return root ? root.scrollTop : window.scrollY;
}

export function resetScrollRoot() {
  const root = getScrollRoot();
  if (root) root.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  else if (typeof window !== "undefined")
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
}

export function getNavOffset(): number {
  if (typeof document === "undefined") return 0;
  const shell = document.querySelector<HTMLElement>(".nav-shell");
  return shell ? shell.getBoundingClientRect().height + 8 : 96;
}

let activeRaf = 0;
let activeCancel: (() => void) | null = null;

export function smoothScrollTo(targetY: number, duration = 520) {
  if (typeof window === "undefined") return;
  const root = getScrollRoot();
  // Always cancel any in-flight animation so rapid clicks don't fight each other.
  if (activeRaf) cancelAnimationFrame(activeRaf);
  if (activeCancel) activeCancel();
  activeRaf = 0;
  activeCancel = null;

  const startY = getScrollTop();
  const dy = targetY - startY;
  if (Math.abs(dy) < 2) return;
  if (reducedMotion()) {
    if (root) root.scrollTo({ top: targetY, left: 0, behavior: "instant" as ScrollBehavior });
    else window.scrollTo(0, targetY);
    return;
  }
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const top = startY + dy * easeOutQuart(t);
    if (root) root.scrollTo(0, top);
    else window.scrollTo(0, top);
    if (t < 1) activeRaf = requestAnimationFrame(step);
    else {
      activeRaf = 0;
      if (activeCancel) {
        activeCancel();
        activeCancel = null;
      }
    }
  };
  activeRaf = requestAnimationFrame(step);
  // Cancel if user scrolls manually — listen on the active scroll surface, not window.
  const surface: EventTarget = root ?? window;
  const cancel = () => {
    if (activeRaf) cancelAnimationFrame(activeRaf);
    activeRaf = 0;
    surface.removeEventListener("wheel", cancel as EventListener);
    surface.removeEventListener("touchstart", cancel as EventListener);
    activeCancel = null;
  };
  activeCancel = cancel;
  surface.addEventListener("wheel", cancel as EventListener, { passive: true, once: true });
  surface.addEventListener("touchstart", cancel as EventListener, { passive: true, once: true });
}

export function scrollToId(id: string, duration?: number) {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const root = getScrollRoot();
  const rootTop = root ? root.getBoundingClientRect().top : 0;
  const offset = root ? 8 : getNavOffset();
  const top = el.getBoundingClientRect().top - rootTop + getScrollTop() - offset;
  smoothScrollTo(top, duration);
  return true;
}

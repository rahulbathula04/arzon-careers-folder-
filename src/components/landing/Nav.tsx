import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";
import { getScrollRoot } from "@/lib/scroll";
import { GOOGLE_FORM_URL } from "./constants";

/**
 * Minimal Floating Header
 * Design: No cluttered navbar over the hero on home page. A minimal floating
 * header appears only after the user scrolls past the hero (or on sub-pages).
 * Contains the Arzon logo and one primary button: Apply Now.
 */
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TRANSITION_PRESETS } from "../motion/motion-tokens";

function NavInner() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = getScrollRoot();
    const onScroll = () => {
      const top = root ? root.scrollTop : window.scrollY;
      // On home page, hide until scrolled past hero (~350px)
      setScrolledPastHero(isHome ? top > 350 : top > 10);
    };
    onScroll();
    (root ?? window).addEventListener("scroll", onScroll, { passive: true });
    return () => (root ?? window).removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showNav = !isHome || scrolledPastHero;

  return (
    <AnimatePresence>
      {showNav && (
        <motion.header
          key="floating-nav"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
          transition={TRANSITION_PRESETS.medium}
          className="fixed top-0 inset-x-0 z-50 bg-[#0B1325]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Arzon Logo */}
            <Link
              to="/"
              aria-label="Arzon Global - go to home"
              className="flex shrink-0 items-center gap-2.5 group"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05, rotate: 2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-slate-900 ring-1 ring-teal-500/40 group-hover:ring-teal-400 transition-all"
              >
                <img
                  src={arzonIcon}
                  alt=""
                  width={28}
                  height={28}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </motion.div>
              <div className="leading-none">
                <p className="font-mono text-xs font-bold tracking-[0.24em] text-white">
                  ARZON
                </p>
                <p className="hidden xs:block font-mono text-[8px] font-bold tracking-[0.32em] text-teal-400">
                  GLOBAL
                </p>
              </div>
            </Link>

            {/* Center Links (Desktop only) */}
            <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
              {[
                { to: "/courses", label: "Programmes" },
                { to: "/why-arzon", label: "Proof & Credibility" },
                { to: "/verify", label: "Public Verifier" },
                { to: "/about", label: "About Us" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs font-mono font-semibold text-slate-300 hover:text-teal-300 transition-colors relative py-1 group"
                >
                  <span>{link.label}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"
                  />
                </Link>
              ))}
            </nav>

            {/* Single Primary Action: Apply Now */}
            <div className="flex items-center gap-3">
              <motion.a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 px-4 text-xs font-bold text-slate-950 hover:from-teal-400 hover:to-sky-400 shadow-lg shadow-teal-500/20 transition-all"
              >
                <span>Apply Now</span>
                <ExternalLink className="ml-1.5 h-3.5 w-3.5 text-slate-950 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

export const Nav = memo(NavInner);

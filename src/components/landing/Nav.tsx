import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";
import { getScrollRoot } from "@/lib/scroll";

/**
 * Minimal Floating Header
 * Design: No cluttered navbar over the hero on home page. A minimal floating
 * header appears only after the user scrolls past the hero (or on sub-pages).
 * Contains the Arzon logo and one primary button: Apply Now.
 */
function NavInner() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

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

  // If on home page and not scrolled past hero, render hidden to keep hero uncluttered
  if (isHome && !scrolledPastHero) {
    return null;
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-stone-300 shadow-md"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Arzon Logo */}
        <Link
          to="/"
          aria-label="Arzon Global - go to home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-[#1B3F8B] ring-1 ring-stone-300">
            <img
              src={arzonIcon}
              alt=""
              width={28}
              height={28}
              loading="eager"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-none">
            <p className="font-mono text-xs font-bold tracking-[0.24em] text-[#1A1A1A]">
              ARZON
            </p>
            <p className="hidden xs:block font-mono text-[8px] font-bold tracking-[0.32em] text-[#1B3F8B]">
              GLOBAL
            </p>
          </div>
        </Link>

        {/* Center Links (Desktop only) */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          <Link to="/courses" className="text-xs font-bold text-stone-700 hover:text-[#1B3F8B]">
            Programmes
          </Link>
          <Link to="/proof" className="text-xs font-bold text-stone-700 hover:text-[#1B3F8B]">
            Proof
          </Link>
          <Link to="/verify" className="text-xs font-bold text-stone-700 hover:text-[#1B3F8B]">
            Verifier
          </Link>
          <Link to="/refund" className="text-xs font-bold text-stone-700 hover:text-[#1B3F8B]">
            Trust Ledger
          </Link>
        </nav>

        {/* Single Primary Action: Apply Now */}
        <div className="flex items-center gap-3">
          <Link
            to="/apply"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-[#1B3F8B] px-4 text-xs font-bold text-white hover:bg-[#153270] shadow-xs transition-all"
          >
            <span>Apply Now</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export const Nav = memo(NavInner);

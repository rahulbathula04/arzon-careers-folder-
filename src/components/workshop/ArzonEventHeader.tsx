import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Gift, ArrowRight, Menu, X, ChevronDown } from "lucide-react";

interface ArzonEventHeaderProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

export function ArzonEventHeader({ onReserveClick }: ArzonEventHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full tone-dark bg-[#0B1325]/95 text-white border-b border-stone-800 shadow-md backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-[70px] items-center justify-between gap-4">
          
          {/* Brand & Subtitle Left */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#1B3F8B] text-white flex items-center justify-center font-extrabold font-sans text-base group-hover:scale-105 transition-transform shadow-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-white text-base sm:text-lg tracking-wider uppercase leading-none">
                  ARZON GLOBAL
                </span>
                <span className="font-mono text-[10px] text-teal-300 font-semibold tracking-normal mt-0.5 uppercase">
                  B.Pharm Career Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Center (Clean Campaign Anchors) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium text-stone-300">
            <a href="#career-paths" className="hover:text-teal-300 transition-colors text-stone-200">
              Career Map
            </a>
            <a href="#career-diagnostic" className="hover:text-teal-300 transition-colors text-stone-200">
              Career Selector
            </a>
            <a href="#what-you-learn" className="hover:text-teal-300 transition-colors text-stone-200">
              What You'll Learn
            </a>
            <a href="#faq" className="hover:text-teal-300 transition-colors text-stone-200">
              FAQ
            </a>
          </nav>

          {/* Single Primary Action CTA Right */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onReserveClick}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              <span>Reserve Free Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-300 hover:bg-white/10 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-stone-800 flex flex-col gap-3 font-sans text-sm text-stone-200 tone-dark bg-[#0B1325]">
            <a
              href="#career-paths"
              onClick={() => setMenuOpen(false)}
              className="px-2 py-1.5 hover:text-teal-300"
            >
              Career Map
            </a>
            <a
              href="#career-diagnostic"
              onClick={() => setMenuOpen(false)}
              className="px-2 py-1.5 hover:text-teal-300"
            >
              Career Selector
            </a>
            <a
              href="#what-you-learn"
              onClick={() => setMenuOpen(false)}
              className="px-2 py-1.5 hover:text-teal-300"
            >
              What You'll Learn
            </a>
            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="px-2 py-1.5 hover:text-teal-300"
            >
              FAQ
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onReserveClick();
              }}
              className="mt-2 w-full py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              <span>Reserve Free Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

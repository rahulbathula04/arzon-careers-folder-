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
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/brand/arzon-logo.webp"
                alt="Arzon Global Logo"
                className="h-8 sm:h-9 w-auto object-contain group-hover:opacity-95 transition-opacity"
              />
              <div className="hidden sm:flex flex-col border-l border-slate-700/80 pl-3">
                <span className="font-sans text-[11px] text-teal-400 font-bold tracking-wide uppercase leading-none">
                  B.Pharm Career Intelligence
                </span>
                <span className="font-sans text-[9px] text-slate-400 font-medium mt-0.5">
                  2026 Live Market Decoding
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Center (Clean Campaign Anchors) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-sans font-medium text-stone-300 shrink-0">
            <a href="#career-paths" className="hover:text-teal-300 transition-colors text-stone-200 whitespace-nowrap">
              Career Map
            </a>
            <a href="#reviews" className="hover:text-teal-300 transition-colors text-stone-200 whitespace-nowrap">
              Reviews
            </a>
            <a href="#career-diagnostic" className="hover:text-teal-300 transition-colors text-stone-200 whitespace-nowrap">
              Career Selector
            </a>
            <a href="#what-you-learn" className="hover:text-teal-300 transition-colors text-stone-200 whitespace-nowrap">
              What You'll Learn
            </a>
            <a href="#faq" className="hover:text-teal-300 transition-colors text-stone-200 whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* Single Primary Action CTA Right */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onReserveClick}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#1B3F8B] hover:bg-[#2552b3] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0 whitespace-nowrap"
              style={{ color: '#FFFFFF' }}
            >
              <span>Reserve Free Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile & Tablet hamburger button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:bg-white/10 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-800 flex flex-col gap-3 font-sans text-sm text-stone-200 tone-dark bg-[#0B1325]">
            <a
              href="#career-paths"
              onClick={() => setMenuOpen(false)}
              className="px-2 py-1.5 hover:text-teal-300"
            >
              Career Map
            </a>
            <a
              href="#reviews"
              onClick={() => setMenuOpen(false)}
              className="px-2 py-1.5 hover:text-teal-300"
            >
              Reviews
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

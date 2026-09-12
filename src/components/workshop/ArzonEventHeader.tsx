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
    <header className="sticky top-0 z-50 w-full bg-[#0B1325] text-white border-b border-white/10 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-[72px] items-center justify-between gap-4">
          
          {/* Logo Left */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#00C896] text-[#0B1325] flex items-center justify-center font-extrabold font-mono text-base group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="font-sans font-black text-white text-lg tracking-widest uppercase">
              ARZON
            </span>
          </Link>

          {/* Navigation Center (Inter font, clean SaaS spacing) */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-sans font-medium text-stone-300">
            <a href="#hero" className="hover:text-white transition-colors border-b-2 border-[#00C896] pb-0.5 text-white font-semibold">
              Home
            </a>
            <div className="relative group cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
              <span>Students</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
            <a href="#career-paths" className="hover:text-white transition-colors">
              Roles
            </a>
            <a href="#career-matrix" className="hover:text-white transition-colors">
              Degrees
            </a>
            <a href="#what-you-learn" className="hover:text-white transition-colors">
              Training
            </a>
            <a href="#career-matrix" className="hover:text-white transition-colors">
              Internships
            </a>
            <Link to="/tools/cost-calculator" className="hover:text-white transition-colors">
              Cost Calculator
            </Link>
            <a href="#hiring-market" className="hover:text-white transition-colors">
              Research
            </a>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </nav>

          {/* Actions Right */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search icon button */}
            <button
              type="button"
              className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors hidden sm:flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Free Resources pill button */}
            <button
              type="button"
              onClick={onReserveClick}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/20 hover:border-white/40 text-stone-200 hover:text-white font-sans text-xs font-medium transition-colors cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#00C896]" />
              <span>Free Resources</span>
            </button>

            {/* Primary Action CTA: Diagnose My Path → */}
            <button
              type="button"
              onClick={onReserveClick}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#00C896] hover:bg-[#00b084] text-[#0B1325] font-sans text-xs sm:text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Diagnose My Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden p-2 rounded-lg text-stone-300 hover:bg-white/10"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="xl:hidden bg-[#070E1B] border-b border-white/10 px-4 py-5 space-y-3 font-sans text-sm font-medium text-stone-300">
          <a href="#hero" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-white">
            Home
          </a>
          <a href="#career-paths" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-white">
            Roles &amp; Career Directions
          </a>
          <a href="#career-matrix" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-white">
            B.Pharm Decision Matrix
          </a>
          <a href="#what-you-learn" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-white">
            What You'll Learn
          </a>
          <Link to="/tools/cost-calculator" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-white">
            Cost Calculator
          </Link>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-white">
            FAQ
          </a>
        </div>
      )}
    </header>
  );
}

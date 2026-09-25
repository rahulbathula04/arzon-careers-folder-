import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Search, Menu, X, ArrowRight } from "lucide-react";
import { GlobalSearchModal } from "../../system/GlobalSearchModal";

interface AcriLaunchHeaderProps {
  onApplyClick: () => void;
}

export function AcriLaunchHeader({ onApplyClick }: AcriLaunchHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="h-10 w-10 rounded-xl bg-[#005B4F] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl tracking-tight text-[#0B1325]">
                ARZON GLOBAL
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#005B4F] font-bold">
                Career Intelligence System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#1D2939]">
            <Link
              to="/"
              className="hover:text-[#005B4F] transition-colors py-1"
            >
              Home
            </Link>
            <Link
              to="/acri/pharmacovigilance-certification"
              className="text-[#005B4F] font-semibold flex items-center gap-1.5 py-1"
            >
              <span>Assess</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#005B4F]" />
            </Link>
            <Link
              to="/courses"
              className="hover:text-[#005B4F] transition-colors py-1"
            >
              Training
            </Link>
            <Link
              to="/roles"
              className="hover:text-[#005B4F] transition-colors py-1"
            >
              Roles
            </Link>
            <Link
              to="/acri"
              className="hover:text-[#005B4F] transition-colors py-1"
            >
              Resources
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-500 bg-white tone-light card-light border border-stone-200 rounded-lg hover:border-stone-300 hover:text-stone-800 transition-all cursor-pointer shadow-2xs"
              title="Search (Ctrl+K or ⌘K)"
              aria-label="Search site"
            >
              <Search className="h-3.5 w-3.5 text-stone-400" />
              <kbd className="inline-flex items-center text-[10px] font-mono px-1 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-500">
                ⌘K
              </kbd>
            </button>

            <Link
              to="/login"
              className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:text-[#005B4F] transition-colors"
            >
              Sign in
            </Link>

            <button
              type="button"
              onClick={onApplyClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005B4F] hover:bg-[#00473E] text-white font-sans font-semibold text-xs tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>Apply for an Invite</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-300" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-stone-600 hover:bg-stone-200/50"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={onApplyClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005B4F] text-white text-xs font-semibold cursor-pointer"
            >
              <span>Apply</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-200/50 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col gap-2 font-medium text-stone-800 text-sm">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100"
              >
                Home
              </Link>
              <Link
                to="/acri/pharmacovigilance-certification"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-[#E8F7F1] text-[#005B4F] font-semibold"
              >
                Assess (Pharmacovigilance)
              </Link>
              <Link
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100"
              >
                Training
              </Link>
              <Link
                to="/roles"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100"
              >
                Roles
              </Link>
              <Link
                to="/acri"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100"
              >
                Methodology &amp; Resources
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-stone-100"
              >
                Sign in
              </Link>
            </nav>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onApplyClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#005B4F] text-white font-semibold text-sm shadow-sm cursor-pointer"
              >
                <span>Apply for an ACRI Invite</span>
                <ArrowRight className="h-4 w-4 text-emerald-300" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

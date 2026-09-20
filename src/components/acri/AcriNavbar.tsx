import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Menu, X, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { ArzonLogo } from "./ArzonLogo";

export function AcriNavbar({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-xs"
          : "bg-[#FAF8F5] border-b border-stone-200/70"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <ArzonLogo variant="light" size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold text-stone-700">
              <Link
                to="/"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/students/4th-year"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Students
              </Link>
              <Link
                to="/pv-associate"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Roles
              </Link>
              <a
                href="#assess-section"
                className="px-3 py-1.5 rounded-md text-emerald-800 font-bold hover:bg-emerald-50 transition-colors flex items-center gap-1"
              >
                <span>Assess</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </a>
              <Link
                to="/courses"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Training
              </Link>
              <Link
                to="/internships"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Internships
              </Link>
              <Link
                to="/research"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Tools &amp; Research
              </Link>
              <div className="relative group/dropdown">
                <button
                  type="button"
                  className="px-2.5 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>More</span>
                  <ChevronDown className="h-3.5 w-3.5 text-stone-500 transition-transform group-hover/dropdown:rotate-180" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover/dropdown:block w-48 bg-white tone-light border border-stone-200 rounded-lg shadow-lg py-1 z-50">
                  <Link
                    to="/acri"
                    className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  >
                    ACRI Methodology
                  </Link>
                  <Link
                    to="/verify"
                    className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  >
                    Verify Certificate
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  >
                    About Arzon
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-xs text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  >
                    Contact Desk
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Right Action Stack */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Search Arzon Career Database"
            >
              <Search className="h-4.5 w-4.5" />
            </button>

            {/* Login */}
            <Link
              to="/employer/login"
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-stone-800 hover:text-[#0B1325] transition-colors"
            >
              Login
            </Link>

            {/* Get Started Button */}
            <Link
              to="/career-engine/test"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0B1325] hover:bg-[#152342] rounded-lg transition-colors shadow-xs"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-2 pb-6 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/students/4th-year"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Students
          </Link>
          <Link
            to="/pv-associate"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Roles
          </Link>
          <a
            href="#assess-section"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-md"
          >
            Assess (ACRI)
          </a>
          <Link
            to="/courses"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Training
          </Link>
          <Link
            to="/internships"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Internships
          </Link>
          <Link
            to="/research"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Tools &amp; Research
          </Link>
          <Link
            to="/verify"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-md"
          >
            Verify Certificate
          </Link>
          <div className="pt-3 border-t border-stone-200 flex gap-2">
            <Link
              to="/employer/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2 text-xs font-semibold border border-stone-300 rounded-md text-stone-800"
            >
              Login
            </Link>
            <Link
              to="/career-engine/test"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider bg-[#0B1325] text-white rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import arzonIcon from "@/assets/arzon-icon.webp";
import { ArrowRight, Building2, Calendar, Menu, X } from "lucide-react";

interface ArzonEventHeaderProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

const NAV_LINKS = [
  { href: "#event-overview", label: "The Session" },
  { href: "#what-you-will-see", label: "Agenda" },
  { href: "#simulated-case", label: "Live Case" },
  { href: "#mentor", label: "Mentor" },
  { href: "#field-guide", label: "Field Guide" },
  { href: "#faq", label: "FAQ" },
];

export function ArzonEventHeader({ onReserveClick, isRegistered = false }: ArzonEventHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── TOP LIVE SESSION ANNOUNCEMENT BAR ── */}
      <div className="w-full bg-[#070F1E] border-b border-white/10 py-2.5 px-4 text-center select-none">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 sm:gap-3 text-white font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-bold text-white tracking-widest whitespace-nowrap">
            LIVE CLINICAL WORKING SESSION
          </span>
          <span className="text-white/30 hidden md:inline">·</span>
          <span className="text-slate-300 font-medium whitespace-nowrap hidden sm:inline">
            FRI 11 SEP 2026 · 6:00 – 7:15 PM IST
          </span>
          <span className="text-white/30 hidden lg:inline">·</span>
          <span className="text-slate-300 font-medium whitespace-nowrap hidden lg:inline">
            ICH-E2D CASE TRIAGE &amp; MEDDRA CODING
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[9.5px] border border-emerald-500/30 whitespace-nowrap">
            100% FREE
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full bg-[var(--color-warm-white)]/95 backdrop-blur-md border-b border-[var(--color-border-warm)] shadow-xs transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-[68px] items-center justify-between gap-4">

            {/* ─── Brand Left ─── */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <img
                  src={arzonIcon}
                  alt="Arzon Global"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-stone-200/80 shadow-xs group-hover:border-[#0B1325] transition-colors"
                />
                <div className="flex flex-col text-left">
                  <span className="font-serif font-black text-[#0B1325] text-sm sm:text-[15px] tracking-tight leading-none group-hover:text-[#1B3F8B] transition-colors">
                    ARZON GLOBAL
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-stone-400 font-bold mt-1 whitespace-nowrap">
                    Healthcare Career Intelligence
                  </span>
                </div>
              </Link>
            </div>

            {/* ─── Nav Center (Full Desktop on xl: 1280px+) ─── */}
            <nav className="hidden xl:flex items-center gap-6 text-[11px] font-mono font-medium text-stone-600 tracking-wider uppercase">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#0B1325] hover:font-bold whitespace-nowrap transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Institutional link */}
              <span className="text-stone-300 select-none">|</span>
              <Link
                to="/tpos"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-stone-300 bg-white tone-light hover:bg-stone-50 hover:border-stone-400 text-[#1B3F8B] font-mono font-bold text-[10px] tracking-wider uppercase whitespace-nowrap transition-all shadow-2xs"
              >
                <Building2 className="w-3 h-3 text-[#1B3F8B]" />
                For Institutions
              </Link>
            </nav>

            {/* ─── Compact Nav for Medium Displays (lg: 1024px – 1279px) ─── */}
            <nav className="hidden lg:flex xl:hidden items-center gap-4 text-[11px] font-mono font-medium text-stone-600 tracking-wider uppercase">
              <a href="#what-you-will-see" className="hover:text-[#0B1325] whitespace-nowrap transition-colors">
                Agenda
              </a>
              <a href="#simulated-case" className="hover:text-[#0B1325] whitespace-nowrap transition-colors">
                Live Case
              </a>
              <a href="#mentor" className="hover:text-[#0B1325] whitespace-nowrap transition-colors">
                Mentor
              </a>
              <Link
                to="/tpos"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-stone-300 bg-white tone-light hover:bg-stone-50 text-[#1B3F8B] font-mono font-bold text-[10px] tracking-wider uppercase whitespace-nowrap transition-all shadow-2xs"
              >
                <Building2 className="w-3 h-3 text-[#1B3F8B]" />
                Institutions
              </Link>
            </nav>

            {/* ─── Right: Date chip + CTA + Mobile Hamburger ─── */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Date chip – desktop only */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100/90 border border-stone-200/90 text-[#0B1325] font-mono text-[11px] font-medium whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="whitespace-nowrap">Fri 11 Sep · 6:00 PM IST</span>
              </div>

              {/* Primary CTA */}
              {!isRegistered ? (
                <button
                  type="button"
                  id="header-reserve-btn"
                  onClick={onReserveClick}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] active:scale-[0.98] text-white tone-dark font-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="whitespace-nowrap" style={{ color: "#FFFFFF" }}>
                    Reserve Free Seat
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white shrink-0" style={{ color: "#FFFFFF" }} />
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  <span>Confirmed</span>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-stone-200 bg-white tone-light text-stone-700 hover:text-[#0B1325] hover:border-stone-300 transition-colors shadow-2xs cursor-pointer"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Drawer ─── */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#0B1325]/60 backdrop-blur-sm transition-all"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="absolute top-0 left-0 right-0 bg-[var(--color-warm-white)] border-b border-[var(--color-border-warm)] shadow-xl px-5 py-6 flex flex-col gap-2 tone-light"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <img src={arzonIcon} alt="Arzon Global" className="w-7 h-7 rounded-lg" />
                <span className="font-serif font-bold text-[#0B1325] text-sm">ARZON GLOBAL</span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Date indicator in mobile menu */}
            <div className="flex items-center gap-2 px-3 py-2 my-1 rounded-lg bg-stone-100 border border-stone-200 text-[#0B1325] font-mono text-xs">
              <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span>Friday 11 Sep 2026 · 6:00 PM IST</span>
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg font-mono text-xs font-semibold text-stone-700 uppercase tracking-wider hover:bg-stone-100 hover:text-[#0B1325] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Institutional link in mobile drawer */}
            <div className="mt-2 pt-3 border-t border-stone-200">
              <span className="block px-3 font-mono text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                Institutional Gateway
              </span>
              <Link
                to="/tpos"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50/80 border border-blue-200 uppercase tracking-wider hover:bg-blue-100 transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span>TPOs · Principals · HODs · Chairmen</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onReserveClick();
              }}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
              style={{ color: "#FFFFFF" }}
            >
              <span>Reserve Your Free Seat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

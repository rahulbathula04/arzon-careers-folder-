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
      <div className="w-full bg-[var(--color-clinical-teal)] py-2 px-4 text-center">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-white">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/90" />
            </span>
            LIVE WORKING SESSION · FRI 11 SEP 2026 · 6:00 – 7:15 PM IST
            <span className="hidden sm:inline">· PHARMACOVIGILANCE MASTERCLASS · FREE</span>
          </span>
        </p>
      </div>

      <header className="sticky top-0 z-40 w-full bg-[var(--color-warm-white)]/96 backdrop-blur-md border-b border-[var(--color-border-warm)] transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-4">

            {/* ─── Brand Left ─── */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <img
                  src={arzonIcon}
                  alt="Arzon Global"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[var(--color-border-warm)] shadow-sm group-hover:border-[var(--color-arzon-ink)] transition-colors"
                />
                <div className="flex flex-col text-left">
                  <span className="font-serif font-black text-[var(--color-arzon-ink)] text-[13px] sm:text-sm tracking-tight leading-none group-hover:text-[var(--color-medical-navy)] transition-colors">
                    ARZON GLOBAL
                  </span>
                  <span className="hidden sm:block font-mono text-[9px] uppercase tracking-widest text-stone-400 font-semibold mt-0.5">
                    Healthcare Career Intelligence
                  </span>
                </div>
              </Link>
            </div>

            {/* ─── Nav Center (Desktop) ─── */}
            <nav className="hidden md:flex items-center gap-4 text-[11px] font-mono font-medium text-stone-500 tracking-wide">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--color-arzon-ink)] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* Institutional nav separator + link */}
              <span className="text-stone-200 select-none">|</span>
              <Link
                to="/tpos"
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[var(--color-border-warm)] bg-stone-50 text-[var(--color-medical-navy)] hover:bg-blue-50 hover:border-blue-200 transition-colors font-bold text-[10px] tracking-wide uppercase whitespace-nowrap"
              >
                <Building2 className="w-3 h-3" />
                For Institutions
              </Link>
            </nav>


            {/* ─── Right: Date chip + CTA + Mobile Hamburger ─── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Date chip – desktop only */}
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] text-[var(--color-arzon-ink)] font-mono text-[10.5px]">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>Fri 11 Sep · 6:00 PM IST</span>
              </div>

              {/* Primary CTA */}
              {!isRegistered ? (
                <button
                  type="button"
                  id="header-reserve-btn"
                  onClick={onReserveClick}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-[var(--color-arzon-ink)] hover:bg-[var(--color-medical-navy)] text-white tone-dark font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                >
                  <span className="hidden sm:inline" style={{ color: '#FFFFFF' }}>Reserve Free Seat</span>
                  <span className="sm:hidden" style={{ color: '#FFFFFF' }}>Register</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" style={{ color: '#FFFFFF' }} />
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
                  <span>Confirmed</span>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-warm-paper)] text-stone-600 hover:text-[var(--color-arzon-ink)] hover:border-stone-300 transition-colors"
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
          className="md:hidden fixed inset-0 z-30 bg-[var(--color-arzon-ink)]/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="absolute top-14 left-0 right-0 bg-[var(--color-warm-white)] border-b border-[var(--color-border-warm)] shadow-lg px-4 py-5 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Date indicator in mobile menu */}
            <div className="flex items-center gap-1.5 px-3 py-2 mb-2 rounded-md bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] text-[var(--color-arzon-ink)] font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>Friday 11 Sep 2026 · 6:00 PM IST</span>
            </div>

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg font-mono text-xs font-semibold text-stone-600 uppercase tracking-wider hover:bg-stone-50 hover:text-[var(--color-arzon-ink)] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Institutional link — distinct visual treatment in mobile drawer */}
            <div className="mt-1 pt-3 border-t border-[var(--color-border-warm)]">
              <span className="block px-3 font-mono text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                For Institutions
              </span>
              <Link
                to="/tpos"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg font-mono text-xs font-bold text-[var(--color-medical-navy)] bg-blue-50/60 border border-blue-100 uppercase tracking-wider hover:bg-blue-100 transition-colors"
              >
                <Building2 className="w-4 h-4" />
                TPOs · Principals · HODs · Chairmen
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Link>
            </div>

              <button
                type="button"
                onClick={() => { setMenuOpen(false); onReserveClick(); }}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-arzon-ink)] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                style={{ color: '#FFFFFF' }}
              >
                Reserve Your Free Seat
                <ArrowRight className="w-4 h-4" />
              </button>
          </nav>
        </div>
      )}
    </>
  );
}

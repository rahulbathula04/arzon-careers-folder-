import { useState } from "react";
import { Link } from "@tanstack/react-router";
import arzonIcon from "@/assets/arzon-icon.webp";
import { ArrowRight, Building2, Menu, X } from "lucide-react";

interface ArzonEventHeaderProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

const NAV_LINKS = [
  { href: "#career-matrix", label: "B.Pharm Career Map" },
  { href: "#why-attend", label: "Why Attend" },
  { href: "#career-paths", label: "Career Paths" },
  { href: "#what-you-learn", label: "What You'll Learn" },
  { href: "#faq", label: "FAQ" },
];

export function ArzonEventHeader({ onReserveClick, isRegistered = false }: ArzonEventHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── TOP LIVE SESSION ANNOUNCEMENT BAR ── */}
      <div className="w-full bg-[var(--color-medical-navy)] border-b border-white/10 py-2.5 px-4 text-center select-none">
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-2 sm:gap-3 text-white font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          <span className="font-bold text-white tracking-widest whitespace-nowrap">
            LIVE B.PHARM CAREER INTELLIGENCE SESSION
          </span>
          <span className="text-white/30 hidden md:inline">·</span>
          <span className="text-slate-300 font-medium whitespace-nowrap hidden sm:inline">
            FRI 11 SEP 2026 · 6:00 – 7:15 PM IST
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold text-[9.5px] border border-teal-500/30 whitespace-nowrap">
            100% FREE
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full bg-[var(--color-warm-paper)]/95 backdrop-blur-md border-b border-[var(--color-border-warm)] shadow-xs transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-[68px] items-center justify-between gap-4">

            {/* ─── Brand Left ─── */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <img
                  src={arzonIcon}
                  alt="Arzon Global"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-stone-200 shadow-xs group-hover:border-[#0B1325] transition-colors"
                />
                <div className="flex flex-col text-left">
                  <span className="font-serif font-black text-[var(--color-medical-navy)] text-sm sm:text-[15px] tracking-tight leading-none group-hover:text-[var(--color-arzon-blue)] transition-colors">
                    ARZON GLOBAL
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-stone-500 font-bold mt-1 whitespace-nowrap">
                    CAREER INTELLIGENCE FOR LIFE SCIENCES
                  </span>
                </div>
              </Link>
            </div>

            {/* ─── Nav Center (Desktop) ─── */}
            <nav className="hidden lg:flex items-center gap-6 text-[11px] font-mono font-medium text-stone-600 tracking-wider uppercase">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--color-medical-navy)] hover:font-bold whitespace-nowrap transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ─── Right CTA Button ─── */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onReserveClick}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                style={{ color: '#FFFFFF' }}
              >
                <span>Reserve Free Seat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-white tone-light border-b border-stone-200 px-4 py-4 space-y-3 font-mono text-xs font-bold uppercase tracking-wider">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-stone-700 hover:text-[var(--color-medical-navy)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

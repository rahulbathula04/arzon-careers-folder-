import { Link } from "@tanstack/react-router";
import arzonIcon from "@/assets/arzon-icon.webp";
import { ArrowRight, Calendar } from "lucide-react";

interface ArzonEventHeaderProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

export function ArzonEventHeader({ onReserveClick, isRegistered = false }: ArzonEventHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--color-warm-white)]/95 backdrop-blur-md border-b border-[var(--color-border-warm)] transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Left */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={arzonIcon}
                alt="Arzon Global"
                className="w-8 h-8 rounded-lg border border-[var(--color-border-warm)] shadow-sm group-hover:border-[var(--color-arzon-ink)] transition-colors"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif font-black text-[var(--color-arzon-ink)] text-sm tracking-tight leading-none group-hover:text-[var(--color-medical-navy)] transition-colors">
                  ARZON GLOBAL
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-wider text-stone-500 font-semibold mt-0.5">
                  Healthcare Career Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Center (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-stone-600">
            <a href="#event-overview" className="hover:text-[var(--color-arzon-ink)] transition-colors">
              The Session
            </a>
            <a href="#what-you-will-see" className="hover:text-[var(--color-arzon-ink)] transition-colors">
              What You'll See
            </a>
            <a href="#simulated-case" className="hover:text-[var(--color-arzon-ink)] transition-colors">
              The Case
            </a>
            <a href="#mentor" className="hover:text-[var(--color-arzon-ink)] transition-colors">
              Mentor
            </a>
            <a href="#field-guide" className="hover:text-[var(--color-arzon-ink)] transition-colors">
              Field Guide
            </a>
            <a href="#faq" className="hover:text-[var(--color-arzon-ink)] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Right Event Date & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] text-[var(--color-arzon-ink)] font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>Sun 6 Sep · 6:00 PM IST</span>
            </div>

            {!isRegistered ? (
              <button
                type="button"
                onClick={onReserveClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--color-medical-navy)] hover:bg-[#0A2246] text-white tone-dark font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
              >
                <span className="text-white" style={{ color: '#FFFFFF' }}>Reserve Free Seat</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" style={{ color: '#FFFFFF' }} />
              </button>
            ) : (
              <a
                href="https://meet.google.com/pyc-qvxs-quz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--color-clinical-teal)] hover:bg-[var(--color-clinical-teal)]/90 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                <span>Google Meet Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

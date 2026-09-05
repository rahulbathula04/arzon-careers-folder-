import { ArrowRight, Video } from "lucide-react";

interface ArzonCaseCTAProps {
  onReserveClick: () => void;
  isRegistered?: boolean;
}

export function ArzonCaseCTA({ onReserveClick, isRegistered = false }: ArzonCaseCTAProps) {
  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-[var(--color-arzon-ink)] border border-[var(--color-medical-navy)]/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl tone-dark">
      <div className="space-y-1 text-left max-w-xl">
        <span className="font-mono text-[10px] font-bold text-[var(--color-editorial-amber)] uppercase tracking-widest block">
          LIVE DEMONSTRATION · GOOGLE MEET
        </span>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-warm-paper)] tracking-tight">
          Want to see how this case is triaged live?
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[var(--color-warm-paper)]/70 leading-relaxed">
          Mohamed Kumail Abbas will demonstrate the full casualty review, MedDRA auto-encoding, and Day 0 regulatory clock calculation on screen.
        </p>
      </div>

      {!isRegistered ? (
        <button
          type="button"
          onClick={onReserveClick}
          className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[var(--color-warm-paper)] hover:bg-white text-[var(--color-arzon-ink)] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer tone-light"
        >
          <span>RESERVE MY FREE SEAT</span>
          <ArrowRight className="w-4 h-4 text-[var(--color-medical-navy)]" />
        </button>
      ) : (
        <a
          href="https://meet.google.com/pyc-qvxs-quz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[var(--color-clinical-teal)] hover:bg-[var(--color-clinical-teal)]/90 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all shrink-0"
        >
          <Video className="w-4 h-4" />
          <span>JOIN GOOGLE MEET ROOM</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

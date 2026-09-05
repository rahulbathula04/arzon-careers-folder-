import { Calendar, Clock, Video } from "lucide-react";

export function ArzonEventMetaStrip() {
  return (
    <div className="w-full my-6 select-none">
      <div className="rounded-xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-xs overflow-hidden flex flex-col md:flex-row items-stretch text-left">
        {/* One Strong Navy Anchor */}
        <div className="bg-[var(--color-medical-navy)] text-white px-5 py-4 md:py-3 flex items-center justify-between md:justify-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {/* Teal Live Marker */}
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-clinical-teal)]"></span>
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-warm-paper)]">
              EVENT RECORD
            </span>
          </div>
          <span className="md:hidden font-mono text-[10px] text-white/60 uppercase">
            SESSION 01
          </span>
        </div>

        {/* Amber Accent Rule between Navy Anchor and Records */}
        <div className="h-0.5 md:h-auto md:w-1 bg-[var(--color-editorial-amber)] shrink-0"></div>

        {/* The 4 Editorial Metadata Fields */}
        <div className="flex-1 px-5 py-3 grid grid-cols-2 lg:grid-cols-4 gap-4 items-center font-sans text-xs">
          {/* Starts */}
          <div className="space-y-0.5">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">
              STARTS
            </span>
            <p className="font-bold text-[var(--color-arzon-ink)] text-xs sm:text-sm">
              06 SEP 2026 · 06:00 PM IST
            </p>
          </div>

          {/* Ends */}
          <div className="space-y-0.5 border-l border-[var(--color-border-warm)]/60 pl-4">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">
              ENDS
            </span>
            <p className="font-bold text-[var(--color-arzon-ink)] text-xs sm:text-sm">
              06 SEP 2026 · 07:15 PM IST
            </p>
          </div>

          {/* Venue */}
          <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-[var(--color-border-warm)]/60 pt-2 sm:pt-0 sm:pl-4">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">
              VENUE
            </span>
            <p className="font-bold text-[var(--color-clinical-teal)] text-xs sm:text-sm flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5" />
              <span>GOOGLE MEET</span>
            </p>
          </div>

          {/* Duration */}
          <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-[var(--color-border-warm)]/60 pt-2 sm:pt-0 sm:pl-4">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">
              DURATION
            </span>
            <p className="font-bold text-[var(--color-arzon-ink)] text-xs sm:text-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--color-medical-navy)]" />
              <span>75 MINUTES</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

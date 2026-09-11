import { Calendar, Clock, Video, Award, Users, CheckCircle2 } from "lucide-react";

interface ArzonEventMetaStripProps {
  allocatedSeats?: number;
  totalCapacity?: number;
}

export function ArzonEventMetaStrip({
  allocatedSeats = 432,
  totalCapacity = 500,
}: ArzonEventMetaStripProps) {
  const percent = Math.min(100, Math.round((allocatedSeats / totalCapacity) * 100));
  const remaining = Math.max(0, totalCapacity - allocatedSeats);

  return (
    <div className="w-full space-y-4 select-none">

      {/* ── EVENT DETAILS DOSSIER CARD ── */}
      <div className="rounded-xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm overflow-hidden flex flex-col md:flex-row items-stretch text-left">
        {/* Navy Anchor */}
        <div className="bg-[var(--color-medical-navy)] text-white px-5 py-4 md:py-3 flex items-center justify-between md:justify-center gap-3 shrink-0 md:min-w-[140px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-clinical-teal)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-clinical-teal)]" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-warm-paper)]">
              EVENT DETAILS
            </span>
          </div>
          <span className="md:hidden font-mono text-[10px] text-white/60 uppercase">
            SESSION 01
          </span>
        </div>

        {/* Amber rule */}
        <div className="h-0.5 md:h-auto md:w-1 bg-[var(--color-editorial-amber)] shrink-0" />

        {/* 5 detail fields */}
        <div className="flex-1 px-5 py-3 grid grid-cols-2 lg:grid-cols-5 gap-4 items-center font-sans text-xs">
          <div className="space-y-0.5">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">DATE</span>
            <div className="flex items-center gap-1.5 font-bold text-[var(--color-arzon-ink)]">
              <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="text-xs sm:text-sm">Fri 11 Sep 2026</span>
            </div>
          </div>

          <div className="space-y-0.5 border-l border-[var(--color-border-warm)]/60 pl-4">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">TIME</span>
            <div className="flex items-center gap-1.5 font-bold text-[var(--color-arzon-ink)]">
              <Clock className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="text-xs sm:text-sm">6:00 – 7:15 PM IST</span>
            </div>
          </div>

          <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-[var(--color-border-warm)]/60 pt-2 sm:pt-0 sm:pl-4">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">PLATFORM</span>
            <div className="flex items-center gap-1.5 font-bold text-[var(--color-clinical-teal)]">
              <Video className="w-3 h-3 shrink-0" />
              <span className="text-xs sm:text-sm">Google Meet</span>
            </div>
          </div>

          <div className="space-y-0.5 border-t lg:border-t-0 sm:border-l border-[var(--color-border-warm)]/60 pt-2 sm:pt-0 sm:pl-4">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">SEATS</span>
            <div className="flex items-center gap-1.5 font-bold text-[var(--color-arzon-ink)]">
              <Users className="w-3 h-3 text-stone-400 shrink-0" />
              <span className="text-xs sm:text-sm">
                {allocatedSeats >= 500 ? `${allocatedSeats}+ (Open)` : `Limited (${totalCapacity})`}
              </span>
            </div>
          </div>

          <div className="space-y-0.5 border-t lg:border-t-0 sm:border-l border-[var(--color-border-warm)]/60 pt-2 sm:pt-0 sm:pl-4">
            <span className="font-mono text-[9.5px] uppercase font-bold text-stone-500 tracking-wider block">CERTIFICATE</span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-600">
              <Award className="w-3 h-3 shrink-0" />
              <span className="text-xs sm:text-sm">Free · PDF</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIVE SEAT PROGRESS STRIP ── */}
      <div className="rounded-xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] px-5 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-600">
              Live Seat Allocation
            </span>
          </div>
          {remaining > 0 ? (
            <span className="font-mono text-[10px] font-bold text-red-600 uppercase tracking-wider">
              {remaining} seats remaining
            </span>
          ) : (
            <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              High Demand · Overflow Access Open
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="relative h-2.5 w-full rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-medical-navy)] to-[var(--color-clinical-teal)] transition-all duration-1000"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span><strong className="text-[var(--color-arzon-ink)]">{allocatedSeats}</strong> seats reserved</span>
          </div>
          <span>{percent}% allocated</span>
        </div>
      </div>
    </div>
  );
}

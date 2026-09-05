import { Briefcase, FileSearch, Compass } from "lucide-react";

export function ArzonWorkshopOverview() {
  return (
    <section id="event-overview" className="py-8 sm:py-10 bg-[var(--color-warm-paper)] border-b border-[var(--color-border-warm)] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header with Arzon Signature Marker */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              SESSION VALUE
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            What this session is really about
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl">
            The gap between pharmacy college textbooks and daily clinical safety operations is why thousands of healthcare graduates struggle to crack technical interview rounds. In this free 75-minute working session by Mohamed Kumail Abbas (Manager, Pharmacovigilance), you will see what entry-level PV associates actually do on Day 1: triage safety cases, navigate MedDRA coding, and meet regulatory reporting clocks.
          </p>
        </div>

        {/* 3 Concise Operational Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Block 1: REAL WORK */}
          <div className="p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm space-y-3 tone-light">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-medical-navy)]/10 border border-[var(--color-medical-navy)]/20 flex items-center justify-center text-[var(--color-medical-navy)]">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              PILLAR 01
            </span>
            <h3 className="font-serif text-lg font-bold text-[var(--color-arzon-ink)]">
              Real Work
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
              Understand what a Pharmacovigilance Associate actually does daily—from adverse event case intake,
              duplicate checks, and data entry to narrative drafting.
            </p>
          </div>

          {/* Block 2: EMPLOYER EXPECTATIONS */}
          <div className="p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm space-y-3 tone-light">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-medical-navy)]/10 border border-[var(--color-medical-navy)]/20 flex items-center justify-center text-[var(--color-medical-navy)]">
              <FileSearch className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              PILLAR 02
            </span>
            <h3 className="font-serif text-lg font-bold text-[var(--color-arzon-ink)]">
              Employer Expectations
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
              See what operational terms and skills appear in real job descriptions (ICSR, MedDRA coding,
              Day 0 reporting clocks, safety databases) and why recruiters test for them.
            </p>
          </div>

          {/* Block 3: CAREER DIRECTION */}
          <div className="p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm space-y-3 tone-light">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-medical-navy)]/10 border border-[var(--color-medical-navy)]/20 flex items-center justify-center text-[var(--color-medical-navy)]">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              PILLAR 03
            </span>
            <h3 className="font-serif text-lg font-bold text-[var(--color-arzon-ink)]">
              Career Direction
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
              Compare Pharmacovigilance with adjacent healthcare career pathways like Clinical Data Management (CDM),
              Medical Coding, and Regulatory Affairs to choose your optimal route.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

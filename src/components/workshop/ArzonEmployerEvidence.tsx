import { Building2, MapPin, Search, CheckCircle2, ArrowRight } from "lucide-react";

export function ArzonEmployerEvidence() {
  return (
    <section className="w-full py-16 sm:py-20 bg-[var(--color-warm-paper)] border-b border-[var(--color-border-warm)] text-left tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Arzon Signature */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[11px] font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              EMPLOYER INTELLIGENCE · JOB DESCRIPTION ARCHIVES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            What jobs actually ask for
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            Hiring managers at major Contract Research Organizations (CROs) evaluate candidates on day-one operational competencies,
            not generic college textbook theory. Here is the verifiable evidence from recent hiring notices.
          </p>
        </div>

        {/* 1. Horizontal Editorial Gap Visualizer (Section 14 in prompt) */}
        <div className="rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-border-warm)] pb-3">
            <span className="font-mono text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider">
              THE HEALTHCARE GRADUATION DISCONNECT
            </span>
            <span className="font-mono text-[11px] text-stone-500 uppercase">
              DEGREE CURRICULUM VS DAY-ONE HIRING TESTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: What University Taught */}
            <div className="md:col-span-4 p-5 rounded-xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] space-y-2">
              <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                01 · WHAT YOUR DEGREE TAUGHT
              </span>
              <h4 className="font-serif text-lg font-bold text-stone-800">
                Academic Sciences
              </h4>
              <ul className="font-mono text-xs text-stone-600 space-y-1 pt-1">
                <li>• General Pharmacology</li>
                <li>• Pharmaceutics Formulations</li>
                <li>• Medicinal Chemistry</li>
                <li>• Anatomy & Physiology</li>
              </ul>
            </div>

            {/* Middle: The Gap Arrow & Reality */}
            <div className="md:col-span-4 text-center py-2 space-y-1">
              <span className="font-mono text-[10px] font-bold text-[var(--color-editorial-amber)] uppercase tracking-widest block">
                THE UNADDRESSED GAP
              </span>
              <p className="font-serif italic text-base text-[var(--color-arzon-ink)] font-bold">
                Why 90% of Freshers Fail Technical Rounds
              </p>
              <div className="flex items-center justify-center gap-2 text-[var(--color-editorial-amber)] pt-1">
                <span className="h-0.5 w-12 bg-[var(--color-editorial-amber)]"></span>
                <span className="font-mono text-xs font-bold">NO CRO TRAINING</span>
                <span className="h-0.5 w-12 bg-[var(--color-editorial-amber)]"></span>
              </div>
            </div>

            {/* Right: What Employers Actually Screen For */}
            <div className="md:col-span-4 p-5 rounded-xl bg-[var(--color-medical-navy)] tone-dark text-white space-y-2 shadow-md">
              <span style={{ color: '#0F766E' }} className="font-mono text-[10px] font-bold uppercase tracking-widest block">
                02 · WHAT CRO INTERVIEWERS TEST
              </span>
              <h4 style={{ color: '#FFFFFF' }} className="font-serif text-lg font-bold text-white">
                Live Operations Literacy
              </h4>
              <ul style={{ color: '#F5F1E8' }} className="font-mono text-xs space-y-1 pt-1">
                <li>• 4-Pillar ICSR Case Triage</li>
                <li>• MedDRA Hierarchy & PT Coding</li>
                <li>• 15-Day Expedited Regulatory Clock</li>
                <li>• SBAR Safety Narrative Writing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Asymmetric Editorial Research Spread (Section 11 in prompt) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Asymmetric Wide Lead Card: ICSR CASE PROCESSING (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-warm)] pb-3">
                <span className="font-mono text-[10px] font-bold text-[var(--color-clinical-teal)] uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--color-clinical-teal)]/10">
                  PRIMARY TECHNICAL FILTER
                </span>
                <span className="font-mono text-[11px] text-stone-500">
                  COGNIZANT / PAREXEL HIRING NOTICE
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[var(--color-medical-navy)] uppercase tracking-wider block">
                  KEY REQUIREMENT 01
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--color-arzon-ink)]">
                  ICSR Triage & Duplicate Search Protocol
                </h3>
              </div>

              {/* Exact JD Excerpt */}
              <div className="p-4 rounded-xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] font-sans text-xs sm:text-sm text-stone-800 leading-relaxed italic">
                "Candidate must demonstrate working proficiency in evaluating initial adverse event reports, confirming the four minimum validity pillars, performing duplicate search in the safety database, and determining regulatory seriousness criteria."
              </div>

              {/* Arzon Operational Interpretation */}
              <div className="space-y-1.5 pt-2">
                <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  ARZON CAREER INTELLIGENCE INTERPRETATION
                </span>
                <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                  Recruiters immediately eliminate applicants who only discuss pharmacology formulas.
                  Demonstrating that you know how an ICSR intake works signals immediate production value to project delivery leads.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border-warm)] flex items-center justify-between text-xs font-mono text-[var(--color-medical-navy)] font-bold">
              <span>COVERED IN WORKSHOP: STAGE 01 & 02</span>
              <span>75 MIN WORKING SESSION</span>
            </div>
          </div>

          {/* Right Column: 2 Secondary Evidence Panels (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Secondary Card 1: MedDRA Coding */}
            <div className="p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pb-2 border-b border-[var(--color-border-warm)]">
                <span className="font-bold text-[var(--color-medical-navy)]">IQVIA / LAB CORP REQUIREMENT</span>
                <span>ENTRY-LEVEL</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[var(--color-arzon-ink)]">
                MedDRA SOC & PT Coding Accuracy
              </h4>
              <div className="p-3 rounded-lg bg-[var(--color-warm-paper)] text-xs text-stone-800 italic leading-snug">
                "Working familiarity with Medical Dictionary for Regulatory Activities hierarchy, assigning Lowest Level Terms and System Organ Classes."
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Interviewers test candidates with sample patient verbatims. Knowing how to locate the correct Preferred Term separates candidates who trained on real tools.
              </p>
            </div>

            {/* Secondary Card 2: Regulatory Timelines */}
            <div className="p-6 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pb-2 border-b border-[var(--color-border-warm)]">
                <span className="font-bold text-[var(--color-medical-navy)]">ACCENTURE HEALTHCARE OPS</span>
                <span>AUDIT CRITICAL</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[var(--color-arzon-ink)]">
                Day 0 Calculation & 15-Day Clock
              </h4>
              <div className="p-3 rounded-lg bg-[var(--color-warm-paper)] text-xs text-stone-800 italic leading-snug">
                "Comprehension of expedited reporting calendars per US FDA 21 CFR 314.80 and EMA GVP Module VI statutory deadlines."
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Missing a clock incurs severe sponsor audit penalties. Candidates who understand Day 0 pass the scenario-based interview questions effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

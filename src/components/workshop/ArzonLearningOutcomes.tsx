import { Activity, FileCheck, Layers, GitFork } from "lucide-react";

export function ArzonLearningOutcomes() {
  const outcomes = [
    {
      num: "01",
      icon: Activity,
      title: "Understand the real PV workflow",
      description:
        "See how adverse event cases enter a drug safety department, how initial intake and duplicate checks are run, and what day-to-day triage actually entails.",
      evidence: "Hands-on walkthrough of an ICSR report from intake to regulatory triage.",
    },
    {
      num: "02",
      icon: Layers,
      title: "Recognize what entry-level JDs ask for",
      description:
        "Deconstruct actual recruitment keywords—ICSR processing, MedDRA hierarchy, serious vs non-serious criteria, and Day 0 clocks—in plain English.",
      evidence: "Direct mapping of job descriptions from top CROs and healthcare IT firms.",
    },
    {
      num: "03",
      icon: FileCheck,
      title: "Practice a real case-triage framework",
      description:
        "Learn the 4 ICH-E2D validity pillars, seriousness criteria, and 15-day expedited reporting rules using an educational case simulation.",
      evidence: "Actionable decision matrix you can discuss in technical interview rounds.",
    },
    {
      num: "04",
      icon: GitFork,
      title: "See where your healthcare degree can lead",
      description:
        "Evaluate realistic 1 to 3-year salary benchmarks and growth paths across Pharmacovigilance, Clinical Data Management (CDM), and Medical Coding.",
      evidence: "Comparative career roadmap based on city compensation data.",
    },
  ];

  return (
    <section id="outcomes" className="py-8 sm:py-10 bg-[var(--color-warm-paper)] border-b border-[var(--color-border-warm)] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header with Arzon Signature Marker */}
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3.5 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              DELIVERABLES
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            What you will gain from this Workshop
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700">
            Four specific, verifiable industry takeaways designed to replace generic advice with operational clarity.
          </p>
        </div>

        {/* 4 Outcome Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="p-5 rounded-xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] shadow-sm space-y-3 tone-light flex flex-col justify-between group hover:border-[var(--color-medical-navy)]/40 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] flex items-center justify-center text-[var(--color-medical-navy)] tone-light">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-400 group-hover:text-[var(--color-medical-navy)] transition-colors">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[var(--color-arzon-ink)] leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[var(--color-border-warm)]">
                  <span className="font-mono text-[9.5px] font-bold text-[var(--color-medical-navy)] uppercase tracking-wider block">
                    PRACTICAL EVIDENCE
                  </span>
                  <p className="font-sans text-[11px] text-stone-700 font-medium mt-0.5 leading-snug">
                    {item.evidence}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

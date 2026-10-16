interface WalkawayItem {
  number: string;
  title: string;
  description: string;
}

const WALKAWAY_ITEMS: WalkawayItem[] = [
  {
    number: "01",
    title: "The role",
    description:
      "Understand what a Drug Safety Associate does and how pharmacovigilance teams contribute to patient safety.",
  },
  {
    number: "02",
    title: "The workflow",
    description:
      "Follow the stages of an Individual Case Safety Report (ICSR), from case receipt and triage to medical coding, quality control and submission.",
  },
  {
    number: "03",
    title: "The opportunities",
    description:
      "Explore entry-level pharmacovigilance and drug safety roles, their responsibilities, and the differences between them.",
  },
  {
    number: "04",
    title: "The skills",
    description:
      "Understand the knowledge and capabilities relevant to these roles, and what you may need to learn next.",
  },
  {
    number: "05",
    title: "Your questions, answered",
    description:
      "Get the opportunity to ask your mentor questions about the field and the work involved.",
  },
];

export function MasterclassWalkaway() {
  return (
    <section id="outcomes" className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            02 · What You'll Walk Away With
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug">
            Understand the work before you choose the career.
          </h2>
        </div>

        {/* 5 Walkaway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WALKAWAY_ITEMS.map((item, index) => (
            <div
              key={item.number}
              className={`p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col tone-light card-light ${
                index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                  {item.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#081F38] mb-2.5">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

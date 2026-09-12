import { BarChart3, Building2, Layers, MapPin, CalendarCheck } from "lucide-react";

export function ResearchStatsBar() {
  const stats = [
    {
      icon: BarChart3,
      value: "2,180+",
      label: "Job Postings Analyzed",
      subtext: "(Indian Healthcare Market)",
    },
    {
      icon: Building2,
      value: "187",
      label: "Employers Mapped",
      subtext: "(MNCs, CROs, IT-Pharma)",
    },
    {
      icon: Layers,
      value: "15+",
      label: "Career Families",
      subtext: "(Freshers & Graduates)",
    },
    {
      icon: MapPin,
      value: "7 Major",
      label: "Hiring Hubs",
      subtext: "(Hyd, Blr, Mum, Pune & more)",
    },
    {
      icon: CalendarCheck,
      value: "Up to Sept 2026",
      label: "Latest Data",
      subtext: "Verified Hiring Intelligence",
    },
  ];

  return (
    <section className="w-full bg-[var(--color-warm-paper)] border-y border-[var(--color-border-warm)] py-6 sm:py-8 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 items-center">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-white tone-light border border-stone-200/80 hover:border-teal-400 transition-colors shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center mb-2.5 text-teal-700">
                  <IconComponent className="w-5 h-5 text-[var(--color-teal-deep)]" />
                </div>
                <span className="font-mono text-xl sm:text-2xl font-black text-[var(--color-medical-navy)] tracking-tight">
                  {item.value}
                </span>
                <span className="font-sans text-xs font-bold text-[var(--color-arzon-ink)] uppercase tracking-wider mt-1">
                  {item.label}
                </span>
                <span className="font-mono text-[10px] text-stone-500 mt-0.5">
                  {item.subtext}
                </span>
              </div>
            );
          })}
        </div>
        <p className="font-mono text-[11px] text-center text-stone-500 mt-4 tracking-tight">
          Based on Arzon Global's analyzed healthcare hiring dataset. Hiring requirements, salary ranges and eligibility vary by employer, role, location and experience.
        </p>
      </div>
    </section>
  );
}

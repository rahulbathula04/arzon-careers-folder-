import { Building2 } from "lucide-react";

export function WorkshopHiringStrip() {
  const employers = [
    { name: "Novartis", hub: "Hyderabad & Mumbai" },
    { name: "IQVIA", hub: "Bengaluru & Kochi" },
    { name: "Parexel", hub: "Hyderabad & Bengaluru" },
    { name: "Cognizant Life Sciences", hub: "Hyderabad, Chennai & Pune" },
    { name: "Accenture Health", hub: "Bengaluru & Mumbai" },
    { name: "Optum (UnitedHealth)", hub: "Hyderabad & Gurugram" },
    { name: "Pfizer India", hub: "Chennai & Mumbai" },
    { name: "Dr. Reddy's", hub: "Hyderabad Hub" },
  ];

  return (
    <section className="border-y border-stone-200 bg-stone-50/80 py-8 tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white tone-light border border-stone-200 text-stone-700 font-mono text-[11px] font-bold uppercase tracking-wider shadow-2xs">
          <Building2 className="w-3.5 h-3.5 text-[#1B3F8B]" />
          <span>INDIAN HEALTHCARE CORPORATE LANDSCAPE</span>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 font-sans max-w-2xl mx-auto">
          Job titles &amp; entry-level fresher openings observed at companies including:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-1">
          {employers.map((emp) => (
            <div
              key={emp.name}
              className="px-3.5 py-2 rounded-xl border border-stone-200/90 bg-white tone-light shadow-2xs hover:border-[#1B3F8B]/40 hover:shadow-xs transition-all flex flex-col items-center"
            >
              <span className="font-sans font-bold text-stone-900 text-xs sm:text-sm tracking-tight">
                {emp.name}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-stone-500">
                {emp.hub}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] sm:text-[11px] text-stone-600 font-sans max-w-2xl mx-auto pt-1">
          Roles &amp; requirements analyzed from public job descriptions on Naukri and LinkedIn. Mentions are for career orientation only and do not imply formal partnership or institutional endorsement.
        </p>
      </div>
    </section>
  );
}

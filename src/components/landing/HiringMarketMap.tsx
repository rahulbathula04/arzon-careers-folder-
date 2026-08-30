import { useState } from "react";
import { MapPin, Building2, Briefcase, TrendingUp } from "lucide-react";

const HUBS = [
  {
    id: "hyd",
    name: "Hyderabad Hub",
    activeJobs: 420,
    avgSalary: "₹4.5 - 8.5 LPA",
    topCompanies: ["Cognizant", "Parexel", "Novartis", "Wipro Health"],
    topRoles: ["PV Safety Analyst", "Medical Coder", "CDM Trainee"],
  },
  {
    id: "blr",
    name: "Bengaluru Hub",
    activeJobs: 380,
    avgSalary: "₹4.8 - 9.2 LPA",
    topCompanies: ["IQVIA", "Indegene", "Accenture Life Sciences", "Thermo Fisher"],
    topRoles: ["Clinical Data Associate", "RA Specialist", "Medical Writer"],
  },
  {
    id: "mum",
    name: "Mumbai & Pune",
    activeJobs: 310,
    avgSalary: "₹4.2 - 8.0 LPA",
    topCompanies: ["TCS Healthcare", "Cipla", "Lupin", "Inventiv Health"],
    topRoles: ["Medical Coder", "PV Associate", "Drug Safety Analyst"],
  },
  {
    id: "che",
    name: "Chennai & South",
    activeJobs: 240,
    avgSalary: "₹4.0 - 7.5 LPA",
    topCompanies: ["EpiSource", "Omega Healthcare", "Access Healthcare", "GeBBS"],
    topRoles: ["CPC Certified Coder", "AR Caller", "Medical Auditor"],
  },
];

export function HiringMarketMap() {
  const [selectedHubId, setSelectedHubId] = useState("hyd");
  const hub = HUBS.find((h) => h.id === selectedHubId) || HUBS[0];

  return (
    <section className="py-12 sm:py-16 bg-[#F7F5F0] tone-light text-[#1A1A1A] relative overflow-hidden border-b border-stone-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white tone-light card-light px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#1B3F8B] shadow-xs">
            <MapPin className="h-3.5 w-3.5 text-[#1B3F8B]" />
            <span>INTERACTIVE INDIA HIRING MARKET MAP</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Explore live hiring hubs. <br />
            <span className="italic font-normal text-[#8A6D1F]">
              See active fresher demands by region.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-medium">
            Filter key Indian healthcare IT &amp; CRO hiring hubs to inspect active fresher openings, top hiring companies, and location-wise starting salary ranges.
          </p>
        </div>

        {/* Interactive Hub Filter Buttons - Swipeable on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-none">
          {HUBS.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setSelectedHubId(h.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer border shrink-0 whitespace-nowrap min-h-[42px] flex items-center ${
                selectedHubId === h.id
                  ? "bg-[#1B3F8B] text-white border-[#1B3F8B] shadow-sm"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50 shadow-2xs"
              }`}
            >
              {h.name} ({h.activeJobs} Openings)
            </button>
          ))}
        </div>

        {/* Hub Inspector Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xl tone-light card-light grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase">
              <Briefcase className="h-4 w-4 text-[#1B3F8B]" />
              <span>Active Fresher Openings</span>
            </div>
            <div className="font-mono font-black text-3xl text-[#1B3F8B]">
              {hub.activeJobs}+ Jobs
            </div>
            <p className="text-xs text-stone-600 font-sans font-medium">
              Active vacancies in {hub.name} scraped across live Indian job portals.
            </p>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase">
              <TrendingUp className="h-4 w-4 text-[#8A6D1F]" />
              <span>Starting Salary Band</span>
            </div>
            <div className="font-serif font-bold text-2xl text-[#8A6D1F]">
              {hub.avgSalary}
            </div>
            <p className="text-xs text-stone-600 font-sans font-medium">
              Starting package range for trained &amp; ACRI-verified candidates.
            </p>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500 uppercase">
              <Building2 className="h-4 w-4 text-teal-700" />
              <span>Top Employers Hiring</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hub.topCompanies.map((c) => (
                <span
                  key={c}
                  className="text-xs font-mono font-bold bg-white tone-light card-light border border-stone-200 text-stone-800 px-2.5 py-1 rounded-lg shadow-2xs"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

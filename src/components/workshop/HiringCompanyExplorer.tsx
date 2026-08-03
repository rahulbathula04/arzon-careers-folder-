import { Building2, MapPin, Briefcase } from "lucide-react";

interface HiringCompanyExplorerProps {
  onOpenRegister?: () => void;
}

export function HiringCompanyExplorer({ onOpenRegister }: HiringCompanyExplorerProps) {
  const employers = [
    {
      name: "IQVIA",
      type: "Global CRO Leader",
      location: "Hyderabad / Bengaluru / Remote",
      activeRoles: ["Safety Specialist", "Clinical Data Associate", "Biostatistician"],
      hiringStatus: "High Volume Hiring",
      salary: "₹4.0L – ₹14.5L"
    },
    {
      name: "Parexel",
      type: "Clinical Development MNC",
      location: "Hyderabad / Mohali / Mumbai",
      activeRoles: ["Pharmacovigilance Scientist", "eCTD Regulatory Publisher"],
      hiringStatus: "Actively Recruiting",
      salary: "₹3.8L – ₹15.0L"
    },
    {
      name: "Cognizant Life Sciences",
      type: "Enterprise Tech & Healthcare",
      location: "Hyderabad / Chennai / Kolkata",
      activeRoles: ["PV Data Entry Analyst", "CDM Database Programmer"],
      hiringStatus: "Fresher & Lateral Hiring",
      salary: "₹3.5L – ₹12.0L"
    },
    {
      name: "Novartis",
      type: "Global Pharmaceutical Giant",
      location: "Hyderabad Corporate R&D Hub",
      activeRoles: ["Global Drug Safety Executive", "Regulatory Affairs Manager"],
      hiringStatus: "Top Tier Hiring",
      salary: "₹5.0L – ₹18.0L"
    }
  ];

  return (
    <section className="bg-slate-950 py-20 text-white border-t border-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
            <Building2 className="h-3.5 w-3.5 text-blue-400" />
            <span>EMPLOYER RECRUITMENT DIRECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Top Hiring Healthcare Employers
          </h2>
          <p className="mt-2 text-base text-slate-300 font-sans">
            Direct insight into hiring hubs, open positions, and salary bands across top global CROs and pharma MNCs.
          </p>
        </div>

        {/* Crunchbase/Glassdoor Style Employer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {employers.map((emp) => (
            <div
              key={emp.name}
              className="rounded-2xl bg-slate-900/40 p-6 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-200"
            >
              <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-base font-mono">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{emp.name}</h3>
                    <span className="text-xs text-slate-400 font-sans">{emp.type}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md font-semibold">
                  {emp.hiringStatus}
                </span>
              </div>

              <div className="mt-4 space-y-2.5 text-xs text-slate-300 font-sans">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{emp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                  <span>Salary Range: <strong className="text-white font-mono">{emp.salary}</strong></span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">OPEN ROLES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {emp.activeRoles.map((role) => (
                      <span key={role} className="rounded-md bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

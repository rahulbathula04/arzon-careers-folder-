import { Wrench, ShieldCheck, Database, Code2 } from "lucide-react";

export function IndustrySkillsToolsBlock() {
  const topSkills = [
    { name: "ICSR Adverse Event Processing & Narratives", percentage: 88, desc: "Mandatory in PV case intake & triage" },
    { name: "MedDRA Medical Dictionary Coding", percentage: 76, desc: "Standardized medical term classification" },
    { name: "ICH-GCP E6(R2) & GVP Safety Guidelines", percentage: 72, desc: "Global regulatory compliance framework" },
    { name: "Clinical Data Querying & SQL Analysis", percentage: 65, desc: "Database discrepancy resolution & audit" },
    { name: "Aggregate Safety Reports (DSUR / PSUR)", percentage: 58, desc: "Periodic safety update preparation" },
  ];

  const validatedTools = [
    { name: "Oracle Argus Safety", category: "Safety Database", relevance: "Required in 75% of PV job descriptions" },
    { name: "MedDRA Dictionary", category: "Medical Dictionary", relevance: "Required in 80% of Drug Safety roles" },
    { name: "Medidata Rave EDC", category: "Clinical EDC", relevance: "Required in 70% of CDM postings" },
    { name: "Veeva Vault Safety", category: "Cloud Regulatory", relevance: "Required in Enterprise Pharma" },
    { name: "SQL & PowerBI", category: "Healthcare Analytics", relevance: "Required in RWE & Analytics roles" },
    { name: "Oracle Clinical", category: "Trial Database", relevance: "Required by CRO hiring desks" },
  ];

  return (
    <section id="skills-tools" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-sky-400" />
            <span>Employer Software & Skill Demand</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
            What are companies <br />
            <span className="italic text-sky-400">actually asking for?</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Analysis of active enterprise job descriptions reveals exact skill frequency percentages and primary software tools.
          </p>
        </div>

        {/* Skill Percentage Frequency Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Block: Top Mentioned Skills */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#070D1B] space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-serif text-lg font-bold text-slate-50">
                Top Skills Mentioned in Active JDs
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-0.5">
                Calculated across 850+ active healthcare job requisitions
              </p>
            </div>

            <div className="space-y-4">
              {topSkills.map((sk) => (
                <div key={sk.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-bold">
                    <span className="text-slate-100">{sk.name}</span>
                    <span className="font-mono text-emerald-400">{sk.percentage}% JDs</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full"
                      style={{ width: `${sk.percentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-sans text-slate-400">{sk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Software Tools */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#070D1B] space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="font-serif text-lg font-bold text-slate-50">
                Primary Software Tools Tested by Hiring Desks
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-0.5">
                Software tools candidates are expected to understand
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {validatedTools.map((t) => (
                <div key={t.name} className="p-4 rounded-2xl bg-[#0B152C] border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-sky-400 uppercase block">{t.category}</span>
                  <h4 className="font-serif text-sm font-bold text-slate-50">{t.name}</h4>
                  <p className="text-[11px] font-sans text-slate-300">{t.relevance}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

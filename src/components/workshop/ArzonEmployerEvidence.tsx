import { 
  ShieldCheck, 
  FlaskConical, 
  Database, 
  FileText, 
  PenTool, 
  Binary, 
  BarChart3, 
  Bot, 
  CheckCircle2, 
  Sparkles, 
  Microscope, 
  Building, 
  Pill, 
  Briefcase 
} from "lucide-react";

export function ArzonEmployerEvidence() {
  const pathways = [
    { name: "Pharmacovigilance & Drug Safety", icon: ShieldCheck, tag: "High GCC Demand" },
    { name: "Clinical Research & Operations", icon: FlaskConical, tag: "Clinical Trials" },
    { name: "Clinical Data Management", icon: Database, tag: "EDC & Systems" },
    { name: "Regulatory Affairs", icon: FileText, tag: "Global Filings" },
    { name: "Medical Writing & Info", icon: PenTool, tag: "Scientific Pubs" },
    { name: "Medical Coding & RCM", icon: Binary, tag: "Chart Auditing" },
    { name: "Healthcare Analytics", icon: BarChart3, tag: "Clinical SAS" },
    { name: "AI & Healthcare Systems", icon: Bot, tag: "Emerging Tech" },
    { name: "Quality Assurance (QA)", icon: CheckCircle2, tag: "QMS & Compliance" },
    { name: "Quality Control (QC)", icon: Sparkles, tag: "Lab Analysis" },
    { name: "Pharma Manufacturing", icon: Building, tag: "Production" },
    { name: "Hospital & Clinical Pharmacy", icon: Pill, tag: "Clinical Care" },
    { name: "HEOR / Real-World Evidence", icon: BarChart3, tag: "Outcomes Research" },
    { name: "Pharma Sales & Commercial", icon: Briefcase, tag: "Business Growth" },
    { name: "Pharma Marketing", icon: Briefcase, tag: "Brand Management" },
    { name: "Research & R&D", icon: Microscope, tag: "Drug Discovery" }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white tone-light border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            MORE CAREER PATHS THAN YOU THINK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            The Healthcare Industry Career Spectrum
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
            Your B.Pharm or Life Sciences degree does not point to just one career. It opens doors across multiple healthcare, clinical, technology, and corporate functions.
          </p>
        </div>

        {/* Grid of Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pathways.map((pw, i) => {
            const IconComp = pw.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white tone-light border border-stone-200 flex items-center justify-center text-[#1B3F8B] shrink-0">
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xs font-bold text-stone-900 leading-snug">{pw.name}</h3>
                    <span className="font-mono text-[10px] text-stone-500">{pw.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2 max-w-3xl mx-auto">
          <h3 className="font-serif text-lg font-bold text-[#1B3F8B]">
            Knowing these careers exist isn't enough. You need to understand which one fits YOU.
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-sans">
            In the live session, we decode each major path so you can compare responsibilities, fresher eligibility, technology requirements, and salary bands before making a decision.
          </p>
        </div>
      </div>
    </section>
  );
}

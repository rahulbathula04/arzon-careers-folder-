import {
  FileText,
  UserCheck,
  Award,
  Layers,
  Wrench,
  DollarSign,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Building,
  CheckCircle2,
} from "lucide-react";

interface HiringMarketDiagramProps {
  onReserveClick: () => void;
}

export function HiringMarketDiagram({ onReserveClick }: HiringMarketDiagramProps) {
  const processSteps = [
    { label: "JOB DESCRIPTION", icon: FileText },
    { label: "ROLE REALITY", icon: UserCheck },
    { label: "ELIGIBILITY", icon: CheckCircle2 },
    { label: "SKILLS", icon: Award },
    { label: "TOOLS", icon: Wrench },
    { label: "CERTIFICATIONS", icon: Layers },
    { label: "SALARY BANDS", icon: DollarSign },
    { label: "CAREER PATH", icon: TrendingUp },
  ];

  const valueCards = [
    {
      num: "01",
      title: "Healthcare Career Landscape",
      desc: "Understand the major non-clinical & clinical career families open to B.Pharm freshers.",
    },
    {
      num: "02",
      title: "Employer Intelligence",
      desc: "See which specific MNCs, CROs, and IT-Pharma giants hire for each specific role.",
    },
    {
      num: "03",
      title: "Role-by-Role Reality",
      desc: "Understand what candidates actually do on screen every day after getting hired.",
    },
    {
      num: "04",
      title: "Fresher Accessibility",
      desc: "Identify which careers you can realistically target right now versus after experience.",
    },
    {
      num: "05",
      title: "Skills & Technologies",
      desc: "Understand the exact software (Argus, Rave, ICD-10) employers screen for.",
    },
    {
      num: "06",
      title: "Certification Intelligence",
      desc: "Separate valuable industry credentials from unnecessary, high-cost training diplomas.",
    },
    {
      num: "07",
      title: "Salary & Career Growth",
      desc: "Understand realistic starting compensation bands (LPA) and 3-5 year progression.",
    },
    {
      num: "08",
      title: "Your Next 90 Days",
      desc: "Identify which single career direction deserves your focused attention & effort.",
    },
  ];

  return (
    <section id="what-you-learn" className="w-full bg-[var(--color-warm-paper)] py-14 sm:py-20 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Section matching Mockup `media_1789216663202.jpg` */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-14">
          
          {/* Left Column: 8 Discovery Cards */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <span>SESSION AGENDA</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[var(--color-medical-navy)] tracking-tight mb-6">
              WHAT YOU'LL DISCOVER IN 60–75 MINUTES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valueCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white tone-light rounded-2xl p-4 border border-stone-200/80 shadow-xs hover:border-teal-400 transition-colors"
                >
                  <span className="font-mono text-xs font-bold text-teal-600 block mb-1">
                    {card.num}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[var(--color-medical-navy)]">
                    {card.title}
                  </h3>
                  <p className="font-sans text-xs text-stone-600 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Built From The Hiring Market Box */}
          <div className="lg:col-span-5 bg-[var(--color-medical-navy)] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <span className="font-mono text-xs font-bold text-teal-300 uppercase tracking-wider block mb-2">
              RESEARCH METHODOLOGY
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
              Built From The Hiring Market.
              <br />
              <span className="text-teal-300">Not Just A Course Catalogue.</span>
            </h3>
            <p className="font-sans text-xs text-stone-300 leading-relaxed mb-6">
              Instead of starting with "What course should we sell?", we analyzed 2,180+ active healthcare job descriptions across India to map what employers actually demand.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/80 mb-6">
              <div>
                <span className="font-mono text-xl font-bold text-white block">2,180+</span>
                <span className="font-sans text-[11px] text-stone-400">Job Postings Analyzed</span>
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-white block">187</span>
                <span className="font-sans text-[11px] text-stone-400">Employers Mapped</span>
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-white block">15+</span>
                <span className="font-sans text-[11px] text-stone-400">Career Families</span>
              </div>
              <div>
                <span className="font-mono text-xl font-bold text-teal-300 block">Sept 2026</span>
                <span className="font-sans text-[11px] text-stone-400">Latest Market Data</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onReserveClick}
              className="w-full py-3 rounded-xl bg-[#FF6525] hover:bg-[#e05318] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ color: '#FFFFFF' }}
            >
              GET MY FREE CAREER MAP
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Process Diagram: JOB DESCRIPTION ↓ ROLE ↓ ... */}
        <div className="bg-white tone-light rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="font-mono text-xs font-bold text-teal-700 uppercase tracking-wider">
              HOW WE MAP CAREERS
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-medical-navy)] mt-1">
              THE ARZON REVERSE-HIRING FLOW
            </h3>
            <p className="font-sans text-xs text-stone-600 mt-1">
              We extract intelligence directly from employer requisitions before prescribing any skill roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {processSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white border border-slate-700 font-mono text-xs font-bold shadow-xs">
                    <IconComponent className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{step.label}</span>
                  </div>
                  {idx < processSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

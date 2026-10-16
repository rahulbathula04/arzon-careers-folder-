import { 
  Activity, 
  GitBranch, 
  Building2, 
  HelpCircle, 
  Workflow, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

interface TakeawayItem {
  num: string;
  tag: string;
  title: string;
  desc: string;
  footer: string;
  icon: typeof Activity;
}

const TAKEAWAYS: TakeawayItem[] = [
  {
    num: "01",
    tag: "Patient Safety",
    title: "The Role Reality",
    desc: "What a Drug Safety Associate actually does each day—protecting patient safety across global clinical trials and commercial medicines.",
    footer: "Enterprise responsibilities vs textbook theory",
    icon: Activity,
  },
  {
    num: "02",
    tag: "ICH E2B Workflow",
    title: "The 7-Stage Pipeline",
    desc: "How adverse event cases move from Day-0 intake & triage to MedDRA coding, safety narrative drafting, QC, and regulatory submission.",
    footer: "Receipt → Triage → Coding → QC → Submit",
    icon: GitBranch,
  },
  {
    num: "03",
    tag: "Entry Careers",
    title: "Hiring & Opportunities",
    desc: "Entry roles (PV Associate, Case Processor, Medical Reviewer) and what top employers actively look for in fresh graduates.",
    footer: "IQVIA · Accenture · Cognizant · Pfizer · TCS",
    icon: Building2,
  },
  {
    num: "04",
    tag: "Direct Mentorship",
    title: "Live Faculty Q&A",
    desc: "Ask Mohamed Kumail Abbas your specific questions about CV preparation, fresher traps, and making the transition from pharmacy.",
    footer: "5+ Years Enterprise PV Experience",
    icon: HelpCircle,
  },
];

export function MasterclassWalkaway() {
  return (
    <section id="outcomes" className="py-12 sm:py-16 border-b border-[#E4EAF2] bg-[#F8FAFC]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header: Clean Apple Typography & Signature Arzon Gradient */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200/80 bg-blue-50/80 text-blue-700 font-mono text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>02 · WHAT YOU'LL WALK AWAY WITH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#081F38] tracking-tight leading-tight">
            Understand the work{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              before you choose the career.
            </span>
          </h2>
          <p className="text-sm text-slate-600 mt-2.5 font-sans leading-relaxed">
            4 core takeaways to help you decide if pharmacovigilance is the right career path for you—no fluff, just practical clarity.
          </p>
        </div>

        {/* 4 Clean, Balanced Apple-Style Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {TAKEAWAYS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4EAF2] shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 tone-light card-light flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Number + Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      {item.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Tag & Title */}
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 mb-1">
                    {item.tag}
                  </div>
                  <h3 className="text-base font-bold text-[#081F38] group-hover:text-blue-700 transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                {/* Card Micro Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    {item.footer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Industry Context Bar */}
        <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs tone-light card-light flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">
              Conducted live with Mohamed Kumail Abbas · 100% Free · Certificate of Participation included
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
            <span>Primary Hiring Hubs:</span>
            <span className="font-semibold text-slate-700">IQVIA · Accenture · Cognizant · TCS · Pfizer</span>
          </div>
        </div>

      </div>
    </section>
  );
}

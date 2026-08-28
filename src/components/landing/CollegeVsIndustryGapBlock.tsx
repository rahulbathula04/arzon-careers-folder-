import { BookOpen, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollegeVsIndustryGapBlockProps {
  onCompareCurriculumClick: () => void;
}

export function CollegeVsIndustryGapBlock({ onCompareCurriculumClick }: CollegeVsIndustryGapBlockProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#070D1B] text-slate-100 tone-dark border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>11. ACADEMIC VS INDUSTRY GAP ANALYSIS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
            What college teaches vs <br />
            <span className="italic text-amber-300">what industry expects</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300">
            Academic degrees provide essential theoretical foundations, but enterprise hiring desks evaluate candidates on specific operational workflows and software tools.
          </p>
        </div>

        {/* Side-by-Side Comparative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: What Your Degree Gives You */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B152C] space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="h-10 w-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-50">
                    Your Degree Gives You:
                  </h3>
                  <p className="font-mono text-xs text-sky-400">Academic & Theoretical Foundations</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm font-sans font-medium text-slate-300">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Pharmacy & Pharmacology Fundamentals</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Pharmaceutics & Pharmaceutical Chemistry</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>Basic Academic Laboratory Practices</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>General Medical & Scientific Research Foundations</span>
                </li>
              </ul>
            </div>

            <p className="text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-3">
              Essential foundation, but missing direct software & workflow exposure.
            </p>
          </div>

          {/* Right Column: What Target Roles Additionally Expect */}
          <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-[#0B152C] space-y-6 flex flex-col justify-between shadow-2xl ring-1 ring-amber-500/20">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-50">
                    Target Roles Additionally Expect:
                  </h3>
                  <p className="font-mono text-xs text-amber-400">Enterprise Hiring Expectations</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm font-sans font-medium text-slate-200">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>ICSR Case Processing & Safety Workflows</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Enterprise Software Exposure (Argus Safety / MedDRA / EDC)</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Regulatory Guidelines (ICH-GCP, GVP, FDA 21 CFR)</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-[#070D1B] border border-amber-500/20">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Practical Data Handling & Capstone Project Proof</span>
                </li>
              </ul>
            </div>

            <p className="text-[11px] font-mono text-amber-300 border-t border-slate-800 pt-3 font-bold">
              This gap is why 80% of graduates face general applicant ATS rejection.
            </p>
          </div>

        </div>

        {/* Action Callout */}
        <div className="text-center pt-2">
          <Button
            onClick={onCompareCurriculumClick}
            className="h-13 sm:h-14 px-8 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-sans font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
          >
            <span>Compare My Curriculum With Industry Requirements</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Button>
          <p className="text-[11px] font-mono text-slate-400 mt-2">
            Create your free Arzon Career Profile to receive a personalized gap assessment.
          </p>
        </div>

      </div>
    </section>
  );
}

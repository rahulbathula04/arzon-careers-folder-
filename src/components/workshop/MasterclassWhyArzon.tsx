import { Users, Award, ShieldCheck, CheckCircle2, Compass, ArrowRight } from "lucide-react";

export function MasterclassWhyArzon() {
  return (
    <section id="why-arzon" className="py-12 sm:py-16 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5">
            <Compass className="w-3.5 h-3.5" />
            <span>05 · Why Arzon Careers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight leading-snug mb-2">
            Career decisions deserve better information.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Arzon Careers helps students explore career paths and understand the practical skills required to pursue them.
          </p>
        </div>

        {/* 3 Compact Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Pillar 1: Learners */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between text-center tone-light card-light group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
              <div className="font-mono text-2xl font-extrabold text-[#081F38] mb-1 tracking-tight">
                12,000+
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Learners Guided
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Healthcare students and graduates guided through career transitions across India.
              </p>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-[10.5px] font-mono text-blue-700 font-semibold">
              Documented Career Reach
            </div>
          </div>

          {/* Pillar 2: TASK */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between text-center tone-light card-light group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Award className="w-4 h-4" />
              </div>
              <div className="font-mono text-xl font-extrabold text-[#081F38] mb-1 tracking-tight">
                TASK Recognition
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                State Skilling Partnership
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Telangana Academy for Skill and Knowledge institutional skill development relationship.
              </p>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-[10.5px] font-mono text-blue-700 font-semibold">
              Institutional Framework
            </div>
          </div>

          {/* Pillar 3: ISO */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between text-center tone-light card-light group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="font-mono text-xl font-extrabold text-[#081F38] mb-1 tracking-tight">
                ISO 9001:2015
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Certified Quality Standard
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Certified quality management system for educational content delivery &amp; candidate guidance.
              </p>
            </div>
            <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 text-[10.5px] font-mono text-blue-700 font-semibold">
              Quality Assurance
            </div>
          </div>
        </div>

        {/* Apple Editorial Philosophy Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 text-center max-w-2xl mx-auto shadow-2xs">
          <p className="text-xs sm:text-sm text-[#081F38] font-medium leading-relaxed italic">
            "Our approach is simple: understand the role, identify the skills it requires, and make informed decisions about what to learn next."
          </p>
          <div className="mt-1.5 text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Arzon Careers Operational Doctrine
          </div>
        </div>
      </div>
    </section>
  );
}

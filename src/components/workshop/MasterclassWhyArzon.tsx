import { Users, Award, ShieldCheck, CheckCircle2, Compass, ArrowRight } from "lucide-react";

export function MasterclassWhyArzon() {
  return (
    <section id="why-arzon" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>05 · Why Arzon Careers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug mb-4">
            Career decisions deserve better information.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Arzon Careers helps students explore career paths and understand the skills required to pursue them.
          </p>
        </div>

        {/* 3 Pillars Grid with Visual Life */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1: Learners */}
          <div className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between text-center tone-light card-light">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="font-mono text-3xl font-extrabold text-[#081F38] mb-1">
                12,000+
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-2">
                Learners Across Our Career Tracks
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Healthcare students and graduates guided through career transitions across India.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-mono text-blue-700 font-semibold">
              Documented Career Reach
            </div>
          </div>

          {/* Pillar 2: TASK */}
          <div className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between text-center tone-light card-light">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <div className="font-mono text-xl font-extrabold text-[#081F38] mb-1">
                TASK Recognition
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-2">
                State Skilling Partnership
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Telangana Academy for Skill and Knowledge institutional skill development relationship.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-mono text-blue-700 font-semibold">
              Institutional Framework
            </div>
          </div>

          {/* Pillar 3: ISO */}
          <div className="p-7 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between text-center tone-light card-light">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="font-mono text-xl font-extrabold text-[#081F38] mb-1">
                ISO 9001:2015
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-2">
                Certified Quality Standard
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Certified quality management system for educational content delivery &amp; candidate guidance.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-mono text-blue-700 font-semibold">
              Quality Assurance
            </div>
          </div>
        </div>

        {/* Philosophy Callout Card */}
        <div className="p-7 sm:p-9 rounded-2xl bg-gradient-to-r from-blue-50/80 via-sky-50/50 to-blue-50/80 border border-blue-100 text-center max-w-3xl mx-auto shadow-2xs">
          <p className="text-sm sm:text-base text-[#081F38] font-semibold leading-relaxed">
            "Our approach is simple: understand the role, identify the skills it requires, and make informed decisions about what to learn next."
          </p>
        </div>
      </div>
    </section>
  );
}

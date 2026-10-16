import { Users, Award, ShieldCheck } from "lucide-react";

export function MasterclassWhyArzon() {
  return (
    <section id="why-arzon" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            05 · Why Arzon Careers
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug mb-4">
            Career decisions deserve better information.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Arzon Careers helps students explore career paths and understand the skills required to pursue them.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1 */}
          <div className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/90 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#081F38] mb-2 font-mono">
              12,000+
            </h3>
            <p className="text-sm font-semibold text-slate-800 mb-1">
              Learners across our career tracks
            </p>
            <p className="text-xs text-slate-500">
              Healthcare students and graduates guided through career transitions.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/90 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#081F38] mb-2 font-mono">
              TASK Recognition
            </h3>
            <p className="text-sm font-semibold text-slate-800 mb-1">
              State Skilling Initiative
            </p>
            <p className="text-xs text-slate-500">
              Telangana Academy for Skill and Knowledge recognized skill development partner.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/90 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#081F38] mb-2 font-mono">
              ISO 9001:2015
            </h3>
            <p className="text-sm font-semibold text-slate-800 mb-1">
              Quality Certified
            </p>
            <p className="text-xs text-slate-500">
              Certified quality management framework for educational curriculum delivery.
            </p>
          </div>
        </div>

        {/* Philosophy Footer Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/60 border border-blue-100 text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
            Our approach is simple: understand the role, identify the skills it requires, and make informed decisions about what to learn next.
          </p>
        </div>
      </div>
    </section>
  );
}

import { UserCheck, GraduationCap, Building2 } from "lucide-react";

export function MasterclassMentor() {
  return (
    <section id="mentor" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
            03 · Your Mentor
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug">
            Learn from an industry professional.
          </h2>
        </div>

        {/* Mentor Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-2xs max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-6">
            {/* Avatar / Monogram */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#081F38] text-white flex flex-col items-center justify-center shrink-0 shadow-sm border border-slate-700">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                MKA
              </span>
              <span className="text-[10px] font-mono text-slate-300 font-semibold tracking-wide">
                M.PHARM
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold mb-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Lead Faculty</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#081F38]">
                Mohamed Kumail Abbas
              </h3>
              <p className="text-sm font-medium text-slate-600 flex items-center justify-center sm:justify-start gap-2">
                <GraduationCap className="w-4 h-4 text-slate-500" />
                <span>M.Pharm</span>
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed pt-6 border-t border-slate-200">
            <p>
              Understand the fundamentals of pharmacovigilance, the ICSR workflow and the responsibilities associated with drug safety roles.
            </p>
            <p>
              The session is designed to connect the concepts you learn in your degree with the work performed in pharmacovigilance.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/60">
            <p className="text-xs text-slate-500 italic text-center sm:text-left">
              * Mentor credentials and employment history will be published after verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

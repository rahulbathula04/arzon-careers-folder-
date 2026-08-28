import { VERIFIED_COMPANY_ROLES } from "@/data/healthcareTaxonomy";
import { Building2, MapPin, Briefcase, GraduationCap, Calendar, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyRolesFeedProps {
  onAdvisorClick: () => void;
}

export function CompanyRolesFeed({ onAdvisorClick }: CompanyRolesFeedProps) {
  return (
    <section id="company-roles" className="py-16 sm:py-24 bg-[#0B152C] text-slate-100 tone-dark border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>08. VERIFIED INDUSTRY HIRING CONTEXT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-50">
            Where can these careers exist? <br />
            <span className="italic text-sky-400">Actual role context, not just logos.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300">
            See real entry-level postings from verified hiring partners showing required degrees, software skills, and hiring locations.
          </p>
        </div>

        {/* Real Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERIFIED_COMPANY_ROLES.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl border border-slate-700/80 bg-[#070D1B] space-y-5 flex flex-col justify-between shadow-xl hover:border-sky-400/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                
                {/* Card Top Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 font-bold border border-sky-400/30 shadow-md">
                      <Building2 className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-slate-50 leading-snug group-hover:text-sky-300 transition-colors">
                        {job.roleTitle}
                      </h4>
                      <p className="font-mono text-xs font-bold text-sky-400">
                        {job.companyName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role Attributes */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-200 truncate">{job.location}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-200">{job.experience}</span>
                  </div>
                </div>

                {/* Accepted Degrees */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    Degrees Accepted:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.degreesAccepted.map((deg) => (
                      <span key={deg} className="px-2.5 py-0.5 rounded-md bg-sky-500/10 border border-sky-400/30 font-mono text-[11px] font-bold text-sky-300">
                        {deg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Required Skills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                    Key Requirements:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.keySkills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-sans text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Card Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {job.postedDate}
                </span>
                <span className="text-emerald-400 font-bold">
                  {job.activeOpenings} Active Slots
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Reassurance Footer */}
        <div className="text-center space-y-3 pt-2">
          <p className="font-mono text-xs text-slate-400">
            Flow: <strong className="text-sky-300">Career</strong> → <strong className="text-sky-300">Company</strong> → <strong className="text-sky-300">Role</strong> → <strong className="text-sky-300">Requirements</strong>
          </p>
          <Button
            onClick={onAdvisorClick}
            className="h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold cursor-pointer"
          >
            Ask An Advisor About Company Eligibility
          </Button>
        </div>

      </div>
    </section>
  );
}

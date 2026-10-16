import { UserCheck, GraduationCap, Building2, Briefcase, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";

interface ExperienceItem {
  company: string;
  role: string;
  focus: string;
  badge: string;
}

const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    company: "Novaspire",
    role: "Manager, Pharmacovigilance",
    focus: "Leading enterprise safety teams, audit readiness, and ICSR quality governance.",
    badge: "Current Leadership",
  },
  {
    company: "Cognizant",
    role: "PV Operations",
    focus: "Global safety surveillance, high-volume case intake, and triage workflows.",
    badge: "Enterprise CRO",
  },
  {
    company: "Accenture",
    role: "Life Sciences Safety Ops",
    focus: "Multi-sponsor clinical delivery, adverse event evaluation, and Argus workflows.",
    badge: "Life Sciences",
  },
  {
    company: "Norwich Clinical",
    role: "Clinical Safety Operations",
    focus: "Clinical trial safety monitoring, SAE reconciliation, and investigator alerts.",
    badge: "Clinical Trials",
  },
  {
    company: "Indegene",
    role: "Safety Analytics & Case Ops",
    focus: "Medical coding, literature screening, and signal detection support.",
    badge: "Safety Analytics",
  },
  {
    company: "Quintiles (IQVIA)",
    role: "Drug Safety Operations",
    focus: "Ground-floor ICSR processing, adverse event validity, and triage protocol.",
    badge: "CRO Pioneer",
  },
];

export function MasterclassMentor() {
  return (
    <section id="mentor" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>03 · Your Mentor</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-tight leading-snug mb-3">
            Learn from an industry professional.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Connect directly with an active pharmacovigilance manager who directs real case-processing operations.
          </p>
        </div>

        {/* Master Mentor Dossier Container */}
        <div className="rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-xs p-6 sm:p-10 mb-8">
          {/* Top Faculty Bio Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-slate-200">
            {/* Real Mentor Portrait */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-sm border-2 border-white ring-2 ring-blue-500/20 bg-slate-100">
              <img
                src={mentorKumailImg}
                alt="Mohamed Kumail Abbas, M.Pharm - Pharmacovigilance Masterclass Instructor"
                className="w-full h-full object-cover object-top filter contrast-[1.02]"
              />
              <div 
                className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" 
                title="Verified Active Practitioner" 
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Industry Professional</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#081F38]">
                Mohamed Kumail Abbas
              </h3>
              <p className="text-sm font-medium text-slate-600 flex items-center justify-center sm:justify-start gap-2">
                <GraduationCap className="w-4 h-4 text-slate-500" />
                <span>M.Pharm</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-700 font-semibold">15+ Years Healthcare &amp; Drug Safety Leader</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-500 pt-1">
                Career across Quintiles (IQVIA), Indegene, Norwich Clinical, Accenture, Cognizant and Novaspire.
              </p>
            </div>
          </div>

          {/* Key Stat Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-slate-200">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center tone-light card-light">
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#081F38]">15+</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Years PV Leadership</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center tone-light card-light">
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#081F38]">6</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Global CRO &amp; Tech Orgs</div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-center tone-light card-light">
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#081F38]">1,000+</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Graduates Mentored</div>
            </div>
          </div>

          {/* Work Experience Timeline Grid */}
          <div className="pt-8">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Verified Career Journey &amp; Corporate Background
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {WORK_EXPERIENCE.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all tone-light card-light"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-sm text-[#081F38]">{exp.company}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {exp.badge}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-blue-700 mb-1">{exp.role}</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{exp.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Session Perspective Callout */}
          <div className="mt-8 pt-6 border-t border-slate-200 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            <p>
              Understand the fundamentals of pharmacovigilance, the ICSR workflow, and the responsibilities associated with drug safety roles.
            </p>
            <p>
              The session is designed to connect the concepts you learn in your degree with the work performed in pharmacovigilance teams.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60">
            <p className="text-xs text-slate-400 italic text-center sm:text-left">
              * Mentor credentials and professional background documented from global clinical operations and CRO leadership.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

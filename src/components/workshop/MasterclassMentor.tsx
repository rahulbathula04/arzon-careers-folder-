import { UserCheck, GraduationCap, Briefcase, ShieldCheck } from "lucide-react";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";

interface ExperienceItem {
  company: string;
  role: string;
  focus: string;
  badge: string;
  badgeStyle: string;
}

const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    company: "Novaspire",
    role: "Manager, Pharmacovigilance",
    focus: "Leading enterprise safety teams, audit readiness, and ICSR quality governance.",
    badge: "Current Leadership",
    badgeStyle: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
  },
  {
    company: "Cognizant",
    role: "PV Operations",
    focus: "Global safety surveillance, high-volume case intake, and triage workflows.",
    badge: "Enterprise CRO",
    badgeStyle: "bg-[#EEF6FF] text-[#2563EB] border-[#BFDBFE]",
  },
  {
    company: "Accenture",
    role: "Life Sciences Safety Ops",
    focus: "Multi-sponsor clinical delivery, adverse event evaluation, and safety database workflows.",
    badge: "Life Sciences",
    badgeStyle: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  },
  {
    company: "Norwich Clinical",
    role: "Clinical Safety Operations",
    focus: "Clinical trial safety monitoring, SAE reconciliation, and investigator alerts.",
    badge: "Clinical Trials",
    badgeStyle: "bg-[#ECFEFF] text-[#0284C7] border-[#A5F3FC]",
  },
  {
    company: "Indegene",
    role: "Safety Analytics & Case Ops",
    focus: "Medical coding, literature screening, and signal detection support.",
    badge: "Safety Analytics",
    badgeStyle: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  },
  {
    company: "Quintiles (IQVIA)",
    role: "Drug Safety Operations",
    focus: "Ground-floor ICSR processing, adverse event validity, and triage protocol.",
    badge: "CRO Pioneer",
    badgeStyle: "bg-[#EEF6FF] text-[#1D4ED8] border-[#BFDBFE]",
  },
];

export function MasterclassMentor() {
  return (
    <section id="mentor" className="py-16 sm:py-24 border-b border-[#E4EAF2] bg-white tone-light card-light">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 text-[#1D4ED8] text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>03 · Your Mentor</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#081F38] tracking-[-0.03em] leading-tight mb-2.5">
            Learn from an active{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
              industry professional.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl mx-auto">
            Connect directly with an active pharmacovigilance manager directing live case-processing operations.
          </p>
        </div>

        {/* Master Mentor Dossier Container */}
        <div className="rounded-3xl bg-slate-50/70 border border-[#E2E8F0] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] p-6 sm:p-9 mb-8 tone-light card-light">
          {/* Top Faculty Bio Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-7 border-b border-slate-200/80">
            {/* Real Mentor Portrait with Glowing Ring */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-xs border-2 border-white ring-2 ring-[#2563EB]/25 bg-slate-100">
              <img
                src={mentorKumailImg}
                alt="Mohamed Kumail Abbas, M.Pharm - Pharmacovigilance Masterclass Instructor"
                className="w-full h-full object-cover object-top"
              />
              <div 
                className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white shadow-xs" 
                title="Verified Active Practitioner" 
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-[11px] font-semibold">
                <ShieldCheck className="w-3 h-3 text-[#10B981]" />
                <span>Verified Industry Professional</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight">
                Mohamed Kumail Abbas
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 flex items-center justify-center sm:justify-start gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>M.Pharm</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-800 font-semibold">15+ Years Healthcare &amp; Drug Safety Leader</span>
              </p>
              <p className="text-xs text-slate-500 pt-0.5 leading-relaxed">
                Career across Quintiles (IQVIA), Indegene, Norwich Clinical, Accenture, Cognizant, and Novaspire.
              </p>
            </div>
          </div>

          {/* Key Stat Tiles with Homepage Metric Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-6 border-b border-slate-200/80">
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-center tone-light card-light shadow-2xs hover:border-[#2563EB]/40 transition-colors">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#2563EB] tracking-tight">15+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Years PV Leadership</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-center tone-light card-light shadow-2xs hover:border-[#0284C7]/40 transition-colors">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#0284C7] tracking-tight">6</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Global CRO &amp; Tech Orgs</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-center tone-light card-light shadow-2xs hover:border-[#10B981]/40 transition-colors">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#10B981] tracking-tight">1,000+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Graduates Mentored</div>
            </div>
          </div>

          {/* Work Experience Timeline Grid */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-3.5">
              <Briefcase className="w-3.5 h-3.5 text-[#2563EB]" />
              <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-500">
                Verified Career Journey &amp; Corporate Background
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {WORK_EXPERIENCE.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all tone-light card-light"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-semibold text-xs sm:text-sm text-[#081F38]">{exp.company}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold border ${exp.badgeStyle}`}>
                        {exp.badge}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-[#2563EB] mb-1">{exp.role}</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{exp.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operations & Mentorship Visual Split */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white tone-light card-light shadow-2xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-5 aspect-[16/10] overflow-hidden relative">
                <img
                  src="/images/pv-masterclass-live-session.jpg"
                  alt="Mohamed Kumail Abbas leading interactive case review masterclass"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-[10px] font-mono font-medium text-white bg-[#2563EB]/90 px-2.5 py-0.5 rounded border border-white/20">
                    Live Operational Guidance
                  </span>
                </div>
              </div>
              <div className="md:col-span-7 p-5 sm:p-6 text-left space-y-2">
                <div className="text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#2563EB]">
                  Interactive Faculty Mentorship
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#081F38]">
                  From Pharmacy Degree to Enterprise Drug Safety Desk
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans">
                  Mohamed Kumail Abbas walks you through real case reviews, common fresher interview traps, and how to position your pharmacy education for enterprise CRO and MNC recruitment.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60">
            <p className="text-[10.5px] text-slate-400 italic text-center sm:text-left">
              * Mentor credentials and professional background documented from global clinical operations and CRO leadership.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

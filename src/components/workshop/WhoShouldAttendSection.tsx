import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface WhoShouldAttendSectionProps {
  onReserveClick: () => void;
}

export function WhoShouldAttendSection({ onReserveClick }: WhoShouldAttendSectionProps) {
  const forYou = [
    "You are currently studying B.Pharm (1st, 2nd, 3rd, or 4th year).",
    "You are graduating soon or recently completed B.Pharm.",
    "You don't know which specific healthcare career to choose.",
    "You keep hearing about PV, coding, CDM, clinical research, and analytics but don't know the differences.",
    "You are unsure which companies actually hire B.Pharm freshers vs M.Pharm candidates.",
    "You are considering joining a private course but don't know whether it is worth the cost.",
    "You want to understand the job market before investing months of time or money.",
    "You want practical career intelligence and verified role reality rather than generic motivation.",
  ];

  const notForYou = [
    "You already have a clearly defined healthcare career path and job offer.",
    "You already know which exact role, tools, and companies you are targeting.",
    "You are looking for generic motivational speeches rather than data-backed career intelligence.",
    "You want a quick shortcut without understanding how the hiring market operates.",
  ];

  return (
    <section className="w-full bg-slate-50 py-12 sm:py-16 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-900 font-sans text-xs font-bold uppercase tracking-wider mb-2">
            <span>Self-Selection Guide</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Is This Session Right For You?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600 mt-2">
            We maintain high-intent session criteria so every participant receives maximum strategic value.
          </p>
        </div>

        {/* Real Indian B.Pharm Campus Cohort Spotlight */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-slate-200 bg-white tone-light shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[300px]">
              <img
                src="/images/bpharm-students-group.jpg"
                alt="Indian B.Pharm students preparing for healthcare careers"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-600/90 text-[10px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-xs mb-1">
                  120+ Campuses Across India
                </span>
                <p className="text-xs font-semibold text-slate-100">
                  NIPER · Osmania · BITS Pilani · JNTUH · Andhra Univ · Manipal · Mumbai
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-teal-600 motion-safe:animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-700">
                  B.Pharm Candidate Cohort
                </span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                Designed for Pharmacy Students Who Refuse to Settle for Generic Sales Rep Jobs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                Most B.Pharm graduates are pushed into field medical sales or generic retail counters because college syllabi don’t teach enterprise database workflows. This workshop provides empirical hiring data and database fluency (Argus Safety, MedDRA, Medidata RAVE, ICD-10) to secure high-paying Tier-1 GCC roles.
              </p>
              
              {/* Student snapshot cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <img
                    src="/images/bpharm-male-graduate.jpg"
                    alt="Aryan Sharma"
                    className="w-11 h-11 rounded-full object-cover object-top shrink-0 ring-2 ring-teal-600/20"
                  />
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">Aryan Sharma</p>
                    <p className="text-[11px] text-teal-700 font-medium truncate">B.Pharm 4th Year → PV Track</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <img
                    src="/images/pharmacy-student-avatar.jpg"
                    alt="Priya Sharma"
                    className="w-11 h-11 rounded-full object-cover object-top shrink-0 ring-2 ring-teal-600/20"
                  />
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">Priya Sharma</p>
                    <p className="text-[11px] text-teal-700 font-medium truncate">B.Pharm 3rd Year → CDM Analyst</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Card 1: THIS SESSION IS FOR YOU IF... */}
          <div className="bg-white tone-light rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md">
            <div className="flex items-center gap-2 mb-6 text-emerald-700">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <h3 className="font-sans text-lg font-extrabold text-slate-900">
                THIS SESSION IS FOR YOU IF...
              </h3>
            </div>
            <div className="space-y-3.5">
              {forYou.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: THIS SESSION MAY NOT BE FOR YOU IF... */}
          <div className="bg-white tone-light rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-6 text-slate-700">
              <XCircle className="w-6 h-6 shrink-0 text-slate-400" />
              <h3 className="font-sans text-lg font-bold text-slate-900">
                THIS SESSION MAY NOT BE FOR YOU IF...
              </h3>
            </div>
            <div className="space-y-3.5">
              {notForYou.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={onReserveClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
          >
            <span>GET MY FREE CAREER MAP + RESERVE SEAT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

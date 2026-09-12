import { CheckCircle2, XCircle, GraduationCap, Sparkles } from "lucide-react";

export function ArzonAudience() {
  const targetAudiences = [
    { title: "B.Pharm Students", desc: "Especially students in 3rd or 4th year unsure what to pursue after graduation." },
    { title: "B.Pharm Graduates", desc: "If you're applying for jobs but don't know which specific roles to target." },
    { title: "M.Pharm Students & Graduates", desc: "If you're evaluating corporate industry career options vs traditional roles." },
    { title: "Pharm.D Students & Graduates", desc: "If you want to understand GCC, clinical trial, and healthcare corporate paths." },
    { title: "Life Sciences Students & Graduates", desc: "B.Sc/M.Sc students exploring clinical, pharmaceutical, or healthcare careers." }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            ATTENDANCE CRITERIA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Who Should Attend This Session?
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
            If you've ever said: <em>"I don't know what to do after my degree,"</em> this session is designed for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Who Should Attend */}
          <div className="rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="font-serif text-xl font-bold text-stone-900">Who Should Attend</h3>
            </div>

            <div className="space-y-4">
              {targetAudiences.map((aud, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-stone-900">{aud.title}</h4>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed">{aud.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who Should NOT Attend */}
          <div className="rounded-3xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-4">
                <XCircle className="h-5 w-5 text-rose-600" />
                <h3 className="font-serif text-xl font-bold text-stone-900">Who Should NOT Attend</h3>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <p className="text-xs text-stone-800 leading-relaxed font-sans">
                  If you have already chosen your exact career path, researched relevant employers, mapped the required software skills, and already have a clear 3-month preparation plan...
                </p>
                <p className="text-xs font-bold text-rose-900 font-mono">
                  You probably don't need this session.
                </p>
              </div>

              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                This live session is specifically created for candidates who need career clarity backed by actual market information—not sales pitches or generic motivation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
              💡 <strong>Goal:</strong> Transform career uncertainty into an actionable 90-day preparation roadmap.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

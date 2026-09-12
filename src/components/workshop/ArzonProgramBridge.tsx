import { ArrowRight, CheckCircle2, Target, ShieldCheck, Sparkles } from "lucide-react";

export function ArzonProgramBridge() {
  const steps = [
    "B.Pharm / Degree",
    "Career Options",
    "Target Role",
    "Employer Requirements",
    "Required Skills",
    "Technology / Tools",
    "Practical Preparation",
    "Interview Readiness",
    "Job Application",
    "Career Growth"
  ];

  return (
    <section className="py-16 sm:py-24 bg-white tone-light border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            THE CAREER TRANSITION PIPELINE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            From Degree to Role Readiness
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
            See the step-by-step structural difference between graduating with just a degree and becoming job-ready.
          </p>
        </div>

        {/* Pipeline Visualizer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-300 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {steps.map((st, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
                  i === 0 
                    ? "bg-[#1B3F8B] text-white" 
                    : i === steps.length - 1 
                    ? "bg-emerald-600 text-white" 
                    : "bg-white text-stone-800 border border-stone-300"
                }`}>
                  {st}
                </span>
                {i < steps.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-stone-400 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-1.5 max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold text-amber-900 uppercase tracking-wider block">
              CORE GOAL PRINCIPLE
            </span>
            <p className="font-serif text-lg font-bold text-stone-900">
              "The goal isn't to collect certificates. The goal is to become useful for a role that companies actually hire for."
            </p>
          </div>
        </div>

        {/* Role Matching Quick Guide */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-stone-900 text-center">
            Which Career Direction Fits Your Mindset?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans">
            {[
              { pref: "Science + patient safety", role: "Pharmacovigilance" },
              { pref: "Clinical environment + coordination", role: "Clinical Research" },
              { pref: "Data + systems + structured work", role: "Clinical Data Management" },
              { pref: "Regulations + documentation", role: "Regulatory Affairs" },
              { pref: "Writing + science", role: "Medical Writing" },
              { pref: "Healthcare + technology", role: "Healthcare Analytics / AI" },
              { pref: "Structured processes + coding", role: "Medical Coding" },
              { pref: "Laboratory + quality", role: "QA / QC" },
              { pref: "Communication + business", role: "Pharma Commercial" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-mono text-[10px] text-stone-500 uppercase">{item.pref}</span>
                <p className="font-serif text-sm font-bold text-[#1B3F8B]">→ {item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

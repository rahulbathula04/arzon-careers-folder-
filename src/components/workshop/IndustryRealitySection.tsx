import { XCircle, CheckCircle2, GitCompare } from "lucide-react";

interface IndustryRealitySectionProps {
  onOpenRegister?: () => void;
}

export function IndustryRealitySection({ onOpenRegister }: IndustryRealitySectionProps) {
  const collegeItems = [
    { title: "Rote Theory Memory", desc: "Memorizing textbook definitions for written semester exams." },
    { title: "Zero Software Exposure", desc: "Never touching enterprise tools like Argus, MedDRA, or Rave." },
    { title: "Static Academic Lectures", desc: "Listening to non-industry faculty without real case study experience." },
    { title: "Generic Job Applications", desc: "'Apply to everything' without domain-specific resume optimization." }
  ];

  const companyItems = [
    { title: "Live Regulatory Cases", desc: "Processing real ICSR case intake and narrative evaluations." },
    { title: "Enterprise Software Hands-on", desc: "Executing live workflows in Argus Safety & eCTDexpress." },
    { title: "MNC Team Reviews", desc: "Participating in cross-functional clinical trial data reviews." },
    { title: "Direct Recruiter Targeting", desc: "Connecting directly with hiring managers seeking specific tool skills." }
  ];

  return (
    <section className="bg-slate-950 py-20 text-white border-t border-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
            <GitCompare className="h-3.5 w-3.5 text-blue-400" />
            <span>COLLEGE VS CORPORATE REALITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            College Theory vs Corporate Expectations
          </h2>
          <p className="mt-2 text-base text-slate-300 font-sans">
            Why 90% of healthcare graduates struggle in technical interviews—and how to fix it immediately.
          </p>
        </div>

        {/* GitHub Diff Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left Split: COLLEGE THEORY (Red Diff) */}
          <div className="rounded-2xl bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between border border-rose-500/20">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/20">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-rose-400" />
                  <span className="font-mono font-bold text-rose-400 text-xs uppercase">❌ ACADEMIC THEORY</span>
                </div>
                <span className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md font-semibold">
                  OUTDATED
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {collegeItems.map((item) => (
                  <div key={item.title} className="rounded-xl bg-slate-950/80 p-3.5">
                    <span className="text-rose-400 font-bold block text-xs font-sans mb-1">- {item.title}</span>
                    <span className="text-slate-300 font-sans text-xs leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 text-center">
              <span className="text-xs font-mono text-rose-400 font-semibold">Outcome: High rejection rate in technical rounds</span>
            </div>
          </div>

          {/* Right Split: COMPANY WORKFLOWS (Green Diff) */}
          <div className="rounded-2xl bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between border border-emerald-500/20">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono font-bold text-emerald-400 text-xs uppercase">✓ CORPORATE WORKFLOWS</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md font-semibold">
                  RECRUITER EXPECTATION
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {companyItems.map((item) => (
                  <div key={item.title} className="rounded-xl bg-slate-950/80 p-3.5">
                    <span className="text-emerald-400 font-bold block text-xs font-sans mb-1">+ {item.title}</span>
                    <span className="text-slate-300 font-sans text-xs leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 text-center">
              <span className="text-xs font-mono text-emerald-400 font-semibold">Outcome: Shortlisted & hired in first attempt</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

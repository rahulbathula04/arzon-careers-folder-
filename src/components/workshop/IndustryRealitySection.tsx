import { XCircle, CheckCircle2, ArrowRight, GitCompare } from "lucide-react";

interface IndustryRealitySectionProps {
  onOpenRegister: () => void;
}

export function IndustryRealitySection({ onOpenRegister }: IndustryRealitySectionProps) {
  const collegeItems = [
    { title: "Rote Memory & Theory", desc: "Memorizing textbook definitions for 3-hour semester written exams." },
    { title: "Zero Software Exposure", desc: "Never touching enterprise tools like Argus, MedDRA, or Medidata Rave." },
    { title: "Static Class Lectures", desc: "Listening to non-industry faculty without real case study experience." },
    { title: "Paper Notes & Viva", desc: "Submitting written lab manuals with zero regulatory audit workflows." },
    { title: "Generic Placement Advice", desc: "'Apply to everything' without domain-specific resume optimization." }
  ];

  const companyItems = [
    { title: "Live Regulatory Cases", desc: "Processing real ICSR case intake and writing narrative evaluations." },
    { title: "Enterprise Software Hands-on", desc: "Executing live workflows in Argus Safety, eCTDexpress & SAS Studio." },
    { title: "MNC Team Meetings", desc: "Participating in cross-functional clinical trial data reviews." },
    { title: "Regulatory Audit Reports", desc: "Submitting ICH-GCP compliant dossiers ready for USFDA audit." },
    { title: "Direct Recruiter Targeting", desc: "Connecting directly with hiring managers seeking specific tool skills." }
  ];

  return (
    <section className="bg-slate-950 py-16 lg:py-24 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-mono font-semibold text-slate-300 mb-4">
            <GitCompare className="h-3.5 w-3.5 text-blue-400" />
            <span>GITHUB DIFF-STYLE INDUSTRY GAP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            The Industry Reality Gap
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Why 90% of healthcare graduates struggle in technical interviews—and how to fix it immediately.
          </p>
        </div>

        {/* GitHub Diff Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Split: COLLEGE THEORY (Red Diff) */}
          <div className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-500/20">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rose-500" />
                  <span className="font-mono font-bold text-rose-400 text-sm tracking-wide">❌ COLLEGE ACADEMIC THEORY</span>
                </div>
                <span className="text-[11px] font-mono text-rose-500/80 bg-rose-500/10 px-2.5 py-1 rounded-md">
                  OUTDATED
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {collegeItems.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-rose-500/10 bg-slate-950/80 p-4 font-mono text-xs">
                    <span className="text-rose-400 font-bold block text-sm font-sans mb-1">- {item.title}</span>
                    <span className="text-slate-400 font-sans text-xs leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-500/20 text-center">
              <span className="text-xs font-mono text-rose-400">Outcome: High rejection rate in technical rounds</span>
            </div>
          </div>

          {/* Right Split: COMPANY WORKFLOWS (Green Diff) */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/10 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono font-bold text-emerald-400 text-sm tracking-wide">✓ CORPORATE WORKFLOWS</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  RECRUITER EXPECTATION
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {companyItems.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-emerald-500/15 bg-slate-950/80 p-4 font-mono text-xs">
                    <span className="text-emerald-400 font-bold block text-sm font-sans mb-1">+ {item.title}</span>
                    <span className="text-slate-300 font-sans text-xs leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/20 text-center">
              <span className="text-xs font-mono text-emerald-400">Outcome: Shortlisted & hired in first attempt</span>
            </div>
          </div>

        </div>

        {/* Section Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Ready to bridge the college-to-corporate gap for your degree?
            </span>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all cursor-pointer"
            >
              <span>Find My Career Path</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

import { ShieldCheck, Award, FileCheck, Users, CheckCircle2 } from "lucide-react";

interface ArzonTrustAnchorProps {
  onOpenRegister?: () => void;
}

export function ArzonTrustAnchor({ onOpenRegister }: ArzonTrustAnchorProps) {
  return (
    <section className="tone-dark bg-slate-950 py-20 text-white border-t border-slate-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>INSTITUTIONAL CREDIBILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Trust Arzon Intelligence
          </h2>
          <p className="mt-2 text-base text-slate-300 font-sans">
            Backed by accredited quality management standards, government ecosystem partnerships, and live corporate hiring data.
          </p>
        </div>

        {/* McKinsey-Style Asymmetric Proof Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
          
          {/* Featured Stat Card (7 columns) */}
          <div className="md:col-span-7 rounded-2xl bg-slate-900/50 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-3">
                <FileCheck className="h-4 w-4" />
                <span>SOURCED INDUSTRY HIRING BENCHMARK</span>
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                14,280+ JDs
              </div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed font-sans">
                Our intelligence algorithms analyze live job descriptions from IQVIA, Parexel, Novartis, and Cognizant to deliver accurate skill gap metrics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Verified Live Data Stream</span>
            </div>
          </div>

          {/* Medium Pillar Cards (5 columns stacked) */}
          <div className="md:col-span-5 space-y-6">
            <div className="rounded-2xl bg-slate-900/40 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ISO 9001:2015 Certified</h3>
                  <p className="text-xs text-slate-300 mt-1 font-sans">Accredited standard for healthcare career intelligence.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/40 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">TASK Govt Partner</h3>
                  <p className="text-xs text-slate-300 mt-1 font-sans">Collaborating with Telangana Academy for Skill and Knowledge.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/40 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">MNC Senior Mentors</h3>
                  <p className="text-xs text-slate-300 mt-1 font-sans">Active drug safety scientists and regulatory publishers.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

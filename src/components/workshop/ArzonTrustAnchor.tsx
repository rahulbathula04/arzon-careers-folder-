import { ShieldCheck, Award, Building2, Users, FileCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface ArzonTrustAnchorProps {
  onOpenRegister: () => void;
}

export function ArzonTrustAnchor({ onOpenRegister }: ArzonTrustAnchorProps) {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "ISO 9001:2015 Certified",
      desc: "Internationally accredited quality management standard for healthcare career intelligence & training."
    },
    {
      icon: Award,
      title: "TASK Government Partner",
      desc: "Collaborating with Telangana Academy for Skill and Knowledge to empower regional healthcare talent."
    },
    {
      icon: FileCheck,
      title: "14,000+ JD Sourced Data",
      desc: "Our career engine metrics are built on real live job descriptions from IQVIA, Parexel, and Novartis."
    },
    {
      icon: Users,
      title: "MNC Senior Mentorship",
      desc: "Guided directly by active drug safety scientists, regulatory publishers, and biostatisticians."
    }
  ];

  return (
    <section className="bg-slate-950 py-16 text-white border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-mono font-semibold text-slate-300 mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>INSTITUTIONAL TRUST & CREDIBILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Why Trust Arzon Healthcare Intelligence
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Backed by accredited quality standards, government ecosystem partnerships, and real corporate hiring data.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustPillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="p-3 rounded-2xl border border-slate-800 bg-slate-950 text-blue-400 w-fit mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white font-serif">{p.title}</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Benchmark</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro-conversion Prompt */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <span className="text-xs text-slate-300 font-medium">
              Want your personalized answer verified by Arzon's intelligence engine?
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

import { Link } from "@tanstack/react-router";
import {
  Compass,
  Laptop,
  FileCheck2,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";

const STAGES = [
  {
    stage: "STAGE 01",
    title: "Diagnose & Fit Match",
    icon: Compass,
    timeframe: "Week 0",
    description: "Take the 90-second ACRI Diagnostic Assessment to determine your exact percentile match across 6 corporate healthcare tracks.",
    deliverable: "Personalized ACRI Career Fit Scorecard & Track Benchmark",
  },
  {
    stage: "STAGE 02",
    title: "Operational Case Work",
    icon: Laptop,
    timeframe: "Weeks 1–8",
    description: "Work directly on live enterprise databases (Oracle Argus, MedDRA, Medidata RAVE, ICD-10) with de-identified clinical trial and safety cases.",
    deliverable: "50+ Processed ICSR Cases / Validated eCRFs / Coded Records",
  },
  {
    stage: "STAGE 03",
    title: "Cryptographic Audit & ATS Dossier",
    icon: FileCheck2,
    timeframe: "Weeks 9–10",
    description: "Your work samples and case execution logs are cryptographically audited on the Arzon Public Verifier ledger with SHA-256 integrity hashes.",
    deliverable: "ISO-9001 Audited Portfolio & ATS Keyword-Optimized CV",
  },
  {
    stage: "STAGE 04",
    title: "GCC Corporate Deployment",
    icon: Building2,
    timeframe: "Weeks 11–12+",
    description: "Direct placement introductions and interview rounds with Tier-1 life sciences GCCs, pharma MNCs, and healthcare technology enterprises.",
    deliverable: "Interview Shortlists at Novartis, IQVIA, Parexel, Optum & Dr. Reddy's",
  },
];

export function PreparationArchitecture() {
  return (
    <section id="method" className="py-16 sm:py-24 border-b border-stone-200 bg-white tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-3xl">
            <PremiumChip variant="navy" size="md">
              THE ARZON PREPARATION ARCHITECTURE
            </PremiumChip>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              From University Degree to Enterprise Operational Deployment
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              We do not sell generic video courses. We run a structured workforce readiness pipeline engineered to take pharmacy and life sciences graduates from theoretical background to day-one GCC competence.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/career-engine/start"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] text-slate-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Take 90-Sec Fit Assessment</span>
              <ArrowRight className="h-4 w-4 text-slate-50" />
            </Link>
          </div>
        </div>

        {/* 4-Stage Horizontal Progression Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAGES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Interactive3dCard
                key={idx}
                maxTilt={10}
                depthScale={1.03}
                containerClassName="h-full"
                className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 space-y-5 shadow-xs flex flex-col justify-between hover:border-[#1B3F8B]/40 hover:shadow-xl transition-all h-full"
              >
                <div className="space-y-4">
                  <Card3dLayer translateZ={25} className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-md shadow-2xs">
                      {s.stage}
                    </span>
                    <Floating3dBadge duration={4} delay={idx * 0.3}>
                      <span className="font-mono text-[11px] text-stone-500 font-bold">
                        {s.timeframe}
                      </span>
                    </Floating3dBadge>
                  </Card3dLayer>

                  <Card3dLayer translateZ={30} className="space-y-2">
                    <div className="flex items-center gap-2 text-[#1B3F8B]">
                      <Icon className="h-5 w-5" />
                      <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed">
                      {s.description}
                    </p>
                  </Card3dLayer>
                </div>

                <Card3dLayer translateZ={20} className="rounded-2xl bg-white tone-light border border-stone-200/90 p-3.5 space-y-1 shadow-2xs">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 block">
                    TANGIBLE OUTPUT
                  </span>
                  <p className="text-[11px] text-stone-800 font-sans font-medium">
                    {s.deliverable}
                  </p>
                </Card3dLayer>
              </Interactive3dCard>
            );
          })}
        </div>

        {/* Public Verifier Assurance Strip with 3D Depth */}
        <Interactive3dCard
          maxTilt={6}
          depthScale={1.01}
          className="rounded-3xl border border-stone-200 bg-[#FAF8F5] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:shadow-lg transition-all"
        >
          <Card3dLayer translateZ={15} className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-[#1B3F8B] shrink-0 shadow-2xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1A1A1A]">
                Cryptographically Audited &amp; ISO-9001 Accredited
              </h4>
              <p className="text-xs text-stone-600 font-sans max-w-2xl leading-relaxed">
                Every candidate certificate and project dossier includes a unique cryptographic verification hash on our public ledger at <span className="font-mono text-[#1B3F8B]">arzonglobal.com/verify</span>, giving corporate HR teams 100% confidence.
              </p>
            </div>
          </Card3dLayer>

          <Card3dLayer translateZ={25} className="shrink-0">
            <Link
              to="/verify"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white tone-light hover:bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <span>Explore Public Verifier</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#1B3F8B]" />
            </Link>
          </Card3dLayer>
        </Interactive3dCard>
      </div>
    </section>
  );
}


import { ShieldCheck, CheckCircle2, ArrowRight, Layers, BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface CandidateCaseStudy {
  name: string;
  degree: string;
  focusTrack: string;
  avatar: string;
  acriScore: string;
  readinessBand: string;
  topCompetencies: string[];
  takeaway: string;
}

const CASE_STUDIES: CandidateCaseStudy[] = [
  {
    name: "Priya S.",
    degree: "B.Pharm Graduate",
    focusTrack: "ICSR Processing & Triaging",
    avatar: "/images/avatar-priya.jpg",
    acriScore: "84/100",
    readinessBand: "Industry Ready",
    topCompetencies: ["ICSR Processing (92%)", "Triage & Seriousness (88%)"],
    takeaway:
      "The ACRI evaluation pinpointed the exact reason I struggled with technical screening: missing practical 4-criteria ICSR triage rules. Addressing those specific gaps made all the difference in technical readiness.",
  },
  {
    name: "Rahul R.",
    degree: "M.Pharm (Pharmacology)",
    focusTrack: "Expedited Regulatory Reporting",
    avatar: "/images/avatar-rahul.jpg",
    acriScore: "88/100",
    readinessBand: "Industry Ready",
    topCompetencies: ["Regulatory Timelines (94%)", "MedDRA Coding (86%)"],
    takeaway:
      "Most exams test textbook memorization. ACRI tested how I handle regulatory 15-day expedited reporting under pressure. Having a verifiable scorecard that proves day-one competence gives tangible credibility.",
  },
  {
    name: "Ananya K.",
    degree: "Pharm.D Graduate",
    focusTrack: "Causality & Narrative Review",
    avatar: "/images/avatar-ananya.jpg",
    acriScore: "91/100",
    readinessBand: "Industry Ready",
    topCompetencies: ["WHO-UMC Causality (95%)", "Narrative Writing (90%)"],
    takeaway:
      "The clinical simulation highlighted my gaps in WHO-UMC causality classification and safety narratives. It showed me exactly what senior drug safety evaluators expect in live case processing.",
  },
];

export function AcriTestimonials() {
  return (
    <section className="bg-[#FAF8F5] py-16 lg:py-24 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-stone-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] border border-[#005B4F]/20 text-[#005B4F] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>CANDIDATE CAPABILITY PROFILES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1325]">
              How Candidates Bridge the Readiness Gap
            </h2>
            <p className="mt-1 text-sm sm:text-base text-stone-600">
              Calibrated benchmarks and real case profiles from healthcare graduates preparing for pharmacovigilance.
            </p>
          </div>

          <div>
            <Link
              to="/pv-associate"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#005B4F] hover:text-[#00473E] transition-colors group"
            >
              <span>Explore Role Competencies</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3 Benchmark Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CASE_STUDIES.map((c) => (
            <div
              key={c.name}
              className="card-light rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Profile Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover border border-stone-200 shadow-2xs"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="font-serif text-sm font-bold text-[#0B1325] flex items-center gap-1.5">
                        <span>{c.name}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">{c.degree}</p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ACRI {c.acriScore}
                  </span>
                </div>

                {/* Focus Track */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200/80 text-[11px] font-semibold text-stone-700">
                  <Layers className="h-3.5 w-3.5 text-[#005B4F]" />
                  <span>Focus:</span>
                  <span className="text-stone-900 font-bold">{c.focusTrack}</span>
                </div>

                {/* Reflection */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{c.takeaway}&rdquo;
                </p>
              </div>

              {/* Benchmarked Competencies */}
              <div className="mt-6 pt-3 border-t border-stone-100 space-y-1.5">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                  Top Evaluated Dimensions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {c.topCompetencies.map((comp) => (
                    <span
                      key={comp}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#FAF8F5] text-stone-700 border border-stone-200"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

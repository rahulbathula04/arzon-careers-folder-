import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  FileText,
  Activity,
  Binary,
  Scale,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { AcriScoringPipelineEngine } from "@/components/acri/methodology/AcriScoringPipelineEngine";
import { AcriFiveDimensionsVisual } from "@/components/acri/methodology/AcriFiveDimensionsVisual";
import { AcriTraitDimensionMatrixVisual } from "@/components/acri/methodology/AcriTraitDimensionMatrixVisual";
import { AcriAssessmentArchitectureVisual } from "@/components/acri/methodology/AcriAssessmentArchitectureVisual";
import { AcriReadinessScaleVisual } from "@/components/acri/methodology/AcriReadinessScaleVisual";
import { AcriEvidenceMaturityVisual } from "@/components/acri/methodology/AcriEvidenceMaturityVisual";

export const Route = createFileRoute("/acri/methodology")({
  head: () => {
    const ps = pageSeo({
      path: "/acri/methodology",
      title: "ACRI Methodology & Clinical Standards · Arzon Global",
      description:
        "The scientific, regulatory, and psychometric methodology underpinning the Arzon Career Readiness Index (ACRI) Pharmacovigilance standard.",
    });
    return {
      meta: [
        { title: "ACRI Methodology & Clinical Standards · Arzon Global" },
        ...ps.meta,
      ],
      links: ps.links,
    };
  },
  component: AcriMethodologyPage,
});

function AcriMethodologyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0B1325] font-sans antialiased selection:bg-[#E8F7F1]">
      {/* ── Editorial Header / Hero ── */}
      <section className="border-b border-stone-200 bg-white tone-light card-light py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F1] text-[#005B4F] text-xs font-mono font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>CLINICAL &amp; PSYCHOMETRIC METHODOLOGY · ACRI-PV v1.0</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            How ACRI Measures Real-World Healthcare Capability
          </h1>

          <p className="font-sans text-base sm:text-lg text-stone-700 leading-relaxed max-w-3xl">
            The Arzon Career Readiness Index is not an academic quiz or an attendance certificate. It is a psychometrically calibrated simulation engine engineered to determine whether a life sciences graduate can safely and independently perform entry-level clinical data workflows on Day 1.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/acri/pharmacovigilance-certification"
              className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-sm"
            >
              <span>APPLY FOR CERTIFICATION</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-300" />
            </Link>

            <Link
              to="/acri/competencies"
              className="px-6 py-3 rounded-xl border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-800 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all"
            >
              <span>EXPLORE 9 COMPETENCIES</span>
              <ChevronRight className="h-3.5 w-3.5 text-stone-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-20">
        {/* Section 0: Scoring Pipeline Engine */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              PIPELINE ARCHITECTURE
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              End-to-End Evaluation Engine
            </h2>
          </div>
          <AcriScoringPipelineEngine />
        </section>

        {/* Section 1: Five Core Dimensions Architectural Breakdown */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              01 · THE 5 CORE DIMENSIONS
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Architectural Dimension System
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 mt-1">
              Every score decomposes into five independent 0–100 dimension profiles aligned with regulatory standards.
            </p>
          </div>
          <AcriFiveDimensionsVisual />
        </section>

        {/* Section 2: Trait → Dimension Weighting Matrix */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              02 · WEIGHTING CALCULATION
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Trait-to-Dimension Mapping Matrix
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 mt-1">
              Conservation of mathematical weight: every trait maps into dimension coefficients summing strictly to 1.00.
            </p>
          </div>
          <AcriTraitDimensionMatrixVisual />
        </section>

        {/* Section 3: Assessment Architecture (40 Questions) */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              03 · ASSESSMENT INSTRUMENT
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              40 Calibrated Assessment Items
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 mt-1">
              Real-world scenario vignettes, hospital triage telemetry, and situational judgment probes.
            </p>
          </div>
          <AcriAssessmentArchitectureVisual />
        </section>

        {/* Section 4: Standard Setting & Benchmark Calibration */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              04 · THE 80% THRESHOLD
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Why 80% Defines "Industry Ready"
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 mt-1">
              In clinical operations, an associate who requires line-by-line verification imposes supervision overhead.
            </p>
          </div>
          <AcriReadinessScaleVisual />
        </section>

        {/* Section 5: Evidence Maturity & Calibration Roadmap */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              05 · EVIDENCE MATURITY
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Psychometric Validation Lifecycle
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 mt-1">
              From 120+ JD corpus mining to 10,000+ candidate attempts and physician-led audit loops.
            </p>
          </div>
          <AcriEvidenceMaturityVisual />
        </section>

        {/* Section 6: Authoritative Reference Standards */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
              06 · REGULATORY COMPLIANCE
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Authoritative Reference Standards
            </h2>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white card-light tone-light border border-stone-200 flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-[#005B4F] shrink-0 mt-0.5">ICH E2A / E2B(R3)</span>
              <div className="text-xs text-stone-700">
                International Council for Harmonisation standards governing Individual Case Safety Report (ICSR) elements, transmission specifications, and expedited reporting criteria.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white card-light tone-light border border-stone-200 flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-[#005B4F] shrink-0 mt-0.5">MedDRA v27.0</span>
              <div className="text-xs text-stone-700">
                Medical Dictionary for Regulatory Activities terminology hierarchy from Lowest Level Term (LLT) to System Organ Class (SOC) for standardized event classification.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white card-light tone-light border border-stone-200 flex items-start gap-4">
              <span className="font-mono text-xs font-bold text-[#005B4F] shrink-0 mt-0.5">WHO-UMC Causality</span>
              <div className="text-xs text-stone-700">
                World Health Organization – Uppsala Monitoring Centre system for standardized causality categorization (Certain, Probable, Possible, Unlikely, Conditional, Unassessable).
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Call to Action Banner */}
        <section className="rounded-3xl bg-[#0B1325] text-white p-8 sm:p-12 text-center space-y-4">
          <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">
            TEST YOUR READINESS
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white">
            Ready to Discover Your ACRI Score?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            Apply for an invitation to the ACRI Launch Cohort. Complete the 25-minute simulation, receive your 9-dimension intelligence report, and earn your verified industry credential.
          </p>
          <div className="pt-2">
            <Link
              to="/acri/pharmacovigilance-certification"
              className="px-8 py-3.5 rounded-xl bg-white tone-light text-stone-900 hover:bg-stone-100 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg"
            >
              <span>APPLY FOR AN INVITE</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

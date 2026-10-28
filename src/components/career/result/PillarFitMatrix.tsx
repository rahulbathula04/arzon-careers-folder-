import { ShieldCheck, Database, FileCode, Award, Cpu, Target, CheckCircle2, Sparkles, Layers } from "lucide-react";
import type { CareerEngineResult, PillarResult } from "@/data/careerEngineScoring";

interface Props {
  result: CareerEngineResult;
}

export function PillarFitMatrix({ result }: Props) {
  const pillars: PillarResult[] = result.pillarResults
    ? Object.values(result.pillarResults)
    : [
        {
          slug: "pharmacovigilance",
          title: "Pharmacovigilance",
          fitScore: Math.round(result.fitScore),
          readinessScore: result.readinessScore ?? 45,
          confidence: result.evidenceConfidence ?? "High",
          evidenceCoverage: 88,
          quadrant: result.quadrant ?? "training_opportunity",
          quadrantLabel: result.quadrantLabel ?? "Training Opportunity",
          topDrivers: ["Precision Detail", "Regulatory Rigor", "Patient Safety Concern"],
          gaps: ["Standardized Medical Coding", "Enterprise Safety Database Workflows"],
        },
        {
          slug: "clinical-data-management",
          title: "Clinical Data Management",
          fitScore: Math.max(30, Math.round(result.fitScore * 0.88)),
          readinessScore: Math.round((result.readinessScore ?? 45) * 0.9),
          confidence: "High",
          evidenceCoverage: 85,
          quadrant: "training_opportunity",
          quadrantLabel: "Training Opportunity",
          topDrivers: ["Data Accuracy", "Protocol Compliance"],
          gaps: ["Electronic Data Capture (EDC)", "eCRF Validation Specs"],
        },
        {
          slug: "medical-coding",
          title: "Medical Coding",
          fitScore: Math.max(30, Math.round(result.fitScore * 0.82)),
          readinessScore: Math.round((result.readinessScore ?? 45) * 0.85),
          confidence: "Moderate",
          evidenceCoverage: 80,
          quadrant: "training_opportunity",
          quadrantLabel: "Training Opportunity",
          topDrivers: ["Document Screening", "Pattern Matching"],
          gaps: ["ICD-10-CM Guidelines", "CPT Procedure Modifiers"],
        },
        {
          slug: "regulatory-affairs",
          title: "Regulatory Affairs",
          fitScore: Math.max(30, Math.round(result.fitScore * 0.78)),
          readinessScore: Math.round((result.readinessScore ?? 45) * 0.8),
          confidence: "Moderate",
          evidenceCoverage: 75,
          quadrant: "explore_alternatives",
          quadrantLabel: "Explore Alternatives",
          topDrivers: ["Long-form Reading", "Submission Discipline"],
          gaps: ["eCTD Dossier Module 1-5", "USFDA 505(b)(2) Filings"],
        },
        {
          slug: "sas-clinical",
          title: "SAS Clinical Programming",
          fitScore: Math.max(30, Math.round(result.fitScore * 0.72)),
          readinessScore: Math.round((result.readinessScore ?? 45) * 0.75),
          confidence: "Moderate",
          evidenceCoverage: 70,
          quadrant: "explore_alternatives",
          quadrantLabel: "Explore Alternatives",
          topDrivers: ["Analytical Logic", "Structured Data Thinking"],
          gaps: ["SAS PROC SQL", "CDISC SDTM / ADaM Standards"],
        },
      ];

  const primaryPillar = pillars[0];
  const confidence = result.evidenceConfidence ?? "High";
  const readiness = result.readinessScore ?? 45;
  const quadrantLabel = result.quadrantLabel ?? "Training Opportunity (High Natural Fit, Target Skill Building Needed)";

  // Micro-icon mapping for each pillar
  const getPillarIcon = (slug: string) => {
    switch (slug) {
      case "pharmacovigilance":
        return <ShieldCheck className="h-4 w-4 text-blue-600" />;
      case "clinical-data-management":
        return <Database className="h-4 w-4 text-indigo-600" />;
      case "medical-coding":
        return <FileCode className="h-4 w-4 text-teal-600" />;
      case "regulatory-affairs":
        return <Award className="h-4 w-4 text-purple-600" />;
      case "sas-clinical":
      default:
        return <Cpu className="h-4 w-4 text-sky-600" />;
    }
  };

  // Clean, untruncated status badge mapping
  const renderDiagnosticBadge = (quadrant: string, label?: string) => {
    switch (quadrant) {
      case "job_ready":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-mono font-bold shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Job Ready
          </span>
        );
      case "training_opportunity":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-[10px] font-mono font-bold shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Training Target
          </span>
        );
      case "existing_skill_poor_alignment":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200/80 text-[10px] font-mono font-bold shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            Skill Pivot
          </span>
        );
      case "explore_alternatives":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 text-[10px] font-mono font-bold shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Secondary Track
          </span>
        );
    }
  };

  return (
    <section className="space-y-6 w-full max-w-full min-w-0">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-200/90 bg-white tone-light card-light p-4 sm:p-9 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_12px_36px_-6px_rgba(7,26,74,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/90 pb-5 sm:pb-6 w-full min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-blue-700 shadow-2xs max-w-full">
                <Layers className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span className="truncate">5-PILLAR MATRIX <span className="hidden sm:inline">· HEALTHCARE DOMAINS</span></span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                <span>Evidence: {confidence}</span>
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#081F38] mt-2">
              Healthcare Career Family Breakdown
            </h2>
          </div>

          {/* Apple-grade Overall Readiness Tile */}
          <div className="flex items-center gap-3.5 self-start sm:self-auto bg-gradient-to-br from-white to-slate-50 border border-slate-200/90 px-4.5 py-2.5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1)]">
            <div className="h-10 w-10 rounded-full border-2 border-blue-600/20 bg-blue-50 flex items-center justify-center font-mono font-extrabold text-sm text-blue-700">
              {readiness}%
            </div>
            <div>
              <span className="block text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">
                Overall Readiness
              </span>
              <span className="text-xs font-bold text-[#081F38] font-sans">
                Domain Exposure Index
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed font-normal max-w-3xl">
          Rather than assigning a single static score, the engine measures your profile across the 5 core healthcare career pillars in India, separating your <strong className="text-[#081F38] font-semibold">Career Fit (Disposition)</strong> from your current <strong className="text-[#081F38] font-semibold">Role Readiness (Domain Exposure)</strong>.
        </p>

        {/* 5-Pillar Score Cards Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full min-w-0">
          {pillars.map((p, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={p.slug}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-200 w-full min-w-0 overflow-hidden ${
                  isTop
                    ? "border-blue-400/90 bg-gradient-to-b from-blue-50/60 via-white to-slate-50/40 ring-1 ring-blue-500/20 shadow-[0_4px_16px_rgba(37,99,235,0.08)]"
                    : "border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div>
                  {isTop ? (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#081F38] text-white px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-[0.14em] mb-2.5 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      <span>Primary Match</span>
                    </div>
                  ) : (
                    <div className="h-5 mb-1" />
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100/80 border border-slate-200/60 shrink-0">
                        {getPillarIcon(p.slug)}
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#081F38] tracking-tight leading-snug">
                        {p.title}
                      </h3>
                    </div>

                    <span className="inline-flex shrink-0 items-center rounded-full border border-blue-200/80 bg-blue-50/90 px-2.5 py-1 text-xs font-bold font-mono text-blue-700 shadow-2xs">
                      {p.fitScore}% Fit
                    </span>
                  </div>

                  {/* Readiness Progress Bar with Gradient and Value */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium font-mono uppercase text-[10px] tracking-wider">
                        Role Readiness
                      </span>
                      <span className="font-bold text-[#081F38] font-mono text-xs">
                        {p.readinessScore}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 shadow-xs transition-all duration-700"
                        style={{ width: `${p.readinessScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100/90 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-slate-400">Confidence</span>
                    <span className="font-bold text-blue-700">{p.confidence}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-slate-400">Diagnostic State</span>
                    {renderDiagnosticBadge(p.quadrant, p.quadrantLabel)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2x2 Fit vs Readiness Matrix Visualizer */}
        <div className="mt-8 rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50/50 via-indigo-50/20 to-slate-50/40 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2 mb-3.5">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#081F38] font-mono">
              Diagnostic Quadrant: {quadrantLabel}
            </span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 text-xs">
            <div
              className={`rounded-xl border p-4 transition-all ${
                primaryPillar.quadrant === "job_ready"
                  ? "border-emerald-300 bg-emerald-50/80 shadow-2xs ring-1 ring-emerald-500/20"
                  : "border-slate-200 bg-white/90"
              }`}
            >
              <div className="font-bold text-[#081F38] flex items-center gap-2">
                <span>🎯 High Fit + High Readiness</span>
                {primaryPillar.quadrant === "job_ready" && (
                  <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                    ACTIVE
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-slate-600 leading-relaxed font-sans font-normal">
                Ideal candidate for immediate clinical placement and fast-track recruitment.
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 transition-all ${
                primaryPillar.quadrant === "training_opportunity"
                  ? "border-blue-400/90 bg-white ring-1 ring-blue-500/20 shadow-xs"
                  : "border-slate-200 bg-white/90"
              }`}
            >
              <div className="font-bold text-[#081F38] flex items-center gap-2">
                <span>🚀 High Fit + Low Readiness</span>
                {primaryPillar.quadrant === "training_opportunity" && (
                  <span className="text-[10px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                    YOUR PROFILE
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-slate-600 leading-relaxed font-sans font-normal">
                Strong natural working style fit. Needs structured 90-day clinical tool mastery (Safety Databases / Medical Coding / EDC).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

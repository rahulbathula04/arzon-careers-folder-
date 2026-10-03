import { ShieldCheck, Target, Zap, AlertCircle, ArrowUpRight } from "lucide-react";
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
          gaps: ["MedDRA 27.x Coding", "Argus Safety Database"],
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
          gaps: ["Medidata Rave EDC", "eCRF Validation Specs"],
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

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#E4EAF2] bg-white tone-light card-light p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4EAF2] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#1557D6] font-bold">
                5-PILLAR HEALTHCARE MATRIX
              </span>
              <span className="rounded-full bg-[#EEF6FF] border border-[#D0E1FD] px-2.5 py-0.5 text-[10px] font-bold text-[#1557D6]">
                Evidence Confidence: {confidence}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071A4A] mt-1">
              Healthcare Career Family Breakdown
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block text-[10px] font-mono uppercase text-[#69758A] font-bold">Overall Readiness</span>
              <span className="font-serif text-2xl font-bold text-[#071A4A]">{readiness}%</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-[#3F4A60] leading-relaxed">
          Rather than assigning a single static score, the engine measures your profile across the 5 core healthcare career pillars in India, separating your <strong className="text-[#071A4A]">Career Fit (Disposition)</strong> from your current <strong className="text-[#071A4A]">Role Readiness (Domain Exposure)</strong>.
        </p>

        {/* 5-Pillar Score Cards Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={p.slug}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                  isTop
                    ? "border-[#1557D6] bg-[#EEF6FF]/40 ring-1 ring-[#1557D6]/20 shadow-xs"
                    : "border-[#E4EAF2] bg-[#FAFBFD] hover:bg-white"
                }`}
              >
                {isTop && (
                  <span className="absolute -top-3 left-4 rounded-full bg-[#071A4A] px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-2xs">
                    Primary Match
                  </span>
                )}
                <div>
                  <div className="flex items-start justify-between gap-2 mt-1">
                    <h3 className="font-serif text-lg font-bold text-[#071A4A]">{p.title}</h3>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-[#EEF6FF] px-2.5 py-1 text-xs font-bold text-[#1557D6]">
                      {p.fitScore}% Fit
                    </span>
                  </div>

                  {/* Readiness Progress Bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#69758A] font-medium">Role Readiness</span>
                      <span className="font-bold text-[#071A4A]">{p.readinessScore}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E4EAF2]">
                      <div
                        className="h-full rounded-full bg-[#1557D6] transition-all"
                        style={{ width: `${p.readinessScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E4EAF2]/80 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-[#69758A]">Confidence</span>
                    <span className="font-bold text-[#1557D6]">{p.confidence}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                    <span className="text-[#69758A]">Diagnostic State</span>
                    <span className="font-bold text-[#071A4A] truncate max-w-[140px]">{p.quadrantLabel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2x2 Fit vs Readiness Matrix Visualizer */}
        <div className="mt-8 rounded-2xl border border-[#D0E1FD] bg-[#EEF6FF]/60 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-[#1557D6]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#071A4A]">
              Diagnostic Quadrant: {quadrantLabel}
            </span>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className={`rounded-xl border p-3.5 ${primaryPillar.quadrant === 'job_ready' ? 'border-emerald-500 bg-emerald-50' : 'border-[#E4EAF2] bg-white'}`}>
              <div className="font-bold text-[#071A4A] flex items-center gap-1.5">
                <span>🎯 High Fit + High Readiness</span>
                {primaryPillar.quadrant === 'job_ready' && <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded-full">ACTIVE</span>}
              </div>
              <p className="mt-1 text-[#3F4A60] leading-relaxed">
                Ideal candidate for immediate clinical placement and fast-track recruitment.
              </p>
            </div>

            <div className={`rounded-xl border p-3.5 ${primaryPillar.quadrant === 'training_opportunity' ? 'border-[#1557D6] bg-white ring-1 ring-[#1557D6]' : 'border-[#E4EAF2] bg-white'}`}>
              <div className="font-bold text-[#071A4A] flex items-center gap-1.5">
                <span>🚀 High Fit + Low Readiness</span>
                {primaryPillar.quadrant === 'training_opportunity' && <span className="text-[10px] font-mono bg-[#1557D6] text-white px-2 py-0.5 rounded-full">YOUR PROFILE</span>}
              </div>
              <p className="mt-1 text-[#3F4A60] leading-relaxed">
                Strong natural working style fit. Needs structured 90-day clinical tool mastery (Argus / MedDRA / EDC).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

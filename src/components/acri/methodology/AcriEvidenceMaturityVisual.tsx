import { useState } from "react";
import {
  Database,
  Users,
  LineChart,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from "lucide-react";

interface FrameworkStage {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  status: "ACTIVE" | "COMPUTING" | "ESTABLISHED";
  metrics: string;
  description: string;
  methodologyDetails: string[];
  transparencyNotice: string;
}

const MATURITY_STAGES: FrameworkStage[] = [
  {
    id: "corpus",
    stageNumber: "STAGE 01",
    title: "JD Corpus Extraction & Competency Mapping",
    subtitle: "Real-world employer requirements grounded in public job listings",
    status: "ESTABLISHED",
    metrics: "120+ Verified JDs",
    description:
      "Continuous NLP parsing of entry-level and junior Pharmacovigilance and Clinical Data Associate listings across major Indian and global CROs (IQVIA, Cognizant, Parexel, Syneos, Novartis, Accenture).",
    methodologyDetails: [
      "Extracted 42 discrete occupational skills and clustered them into 9 core clinical competencies.",
      "Calibrated weight coefficients based on mandatory vs optional recruiter requirements.",
      "Refreshed quarterly to align with evolving health authority guidance (e.g. EU MDR, MedDRA v27.0).",
    ],
    transparencyNotice:
      "Public provenance available in the JD Mirror. Methodology maps directly to employer demand.",
  },
  {
    id: "empirical",
    stageNumber: "STAGE 02",
    title: "Empirical Candidate Distribution",
    subtitle: "10,000+ completed Career Engine attempts across life science cohorts",
    status: "ESTABLISHED",
    metrics: "10,000+ Attempts",
    description:
      "Real-world testing across B.Pharm, M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences graduates, establishing normative baseline curves and response latency patterns.",
    methodologyDetails: [
      "Identifies common stumbling blocks (e.g., miscalculating Day 0 clock on weekend reports).",
      "Eliminates ambiguously worded items with uncharacteristically low discrimination indexes.",
      "Establishes realistic 80% competency cutoffs aligned with senior physician expectations.",
    ],
    transparencyNotice:
      "All attempts anonymized; aggregate data logged to the public sessions table.",
  },
  {
    id: "psychometrics",
    stageNumber: "STAGE 03",
    title: "Psychometric Item Calibration",
    subtitle: "Classical Test Theory (CTT) & Item Response Theory (IRT)",
    status: "COMPUTING",
    metrics: "N ≥ 500 Re-test Target",
    description:
      "Item-difficulty index (p-value target: 0.40–0.85) and point-biserial discrimination coefficient (r_pb ≥ 0.25). Tracking towards published Cronbach's Alpha internal consistency.",
    methodologyDetails: [
      "Items flagged if p > 0.90 (too trivial) or p < 0.25 (confusing/uninformative).",
      "Within-7-day re-test reliability sub-study currently running to measure test-retest stability.",
      "Full ASSAY (Arzon Science and Skill Assessment for Industry Readiness) instrument will replace preview rubric once sample threshold is satisfied.",
    ],
    transparencyNotice:
      "We will not publish a synthetic Alpha coefficient. Numbers will be released once N ≥ 500 matched re-test attempts are recorded.",
  },
  {
    id: "clinical_loop",
    stageNumber: "STAGE 04",
    title: "Clinical Safety Physician & Recruiter Audit Loop",
    subtitle: "Human safety physicians validating simulation scoring fidelity",
    status: "ACTIVE",
    metrics: "Quarterly Audit Cycle",
    description:
      "Blind case evaluations by senior pharmacovigilance leads (Ex-Cognizant, Ex-IQVIA) comparing simulated ACRI candidate rankings against actual probationary performance.",
    methodologyDetails: [
      "Verification that high scorers (ACRI ≥ 80) require minimal supervision during case intake onboarding.",
      "Iterative adjustments to scenario vignettes to match real enterprise Argus and MedDRA database workflows.",
      "Hard critical gates validated to ensure zero false positives on safety-critical regulatory rules.",
    ],
    transparencyNotice:
      "Guarantees that ACRI scores reflect genuine occupational capability rather than test-taking tactics.",
  },
];

export function AcriEvidenceMaturityVisual() {
  const [activeStageId, setActiveStageId] = useState<string>("corpus");
  const activeStage =
    MATURITY_STAGES.find((s) => s.id === activeStageId) || MATURITY_STAGES[0];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white card-light tone-light p-6 sm:p-8 space-y-6">
      {/* ── Top Overview: Honest Accounting ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#005B4F]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#005B4F]">
              EVIDENCE MATURITY &amp; CALIBRATION ROADMAP
            </span>
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 mt-1">
            How the Evidence Base Evolves
          </h3>
          <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-2xl mt-1">
            We hold ACRI to scientific standards of transparency: we document our sample sizes, our validation milestones, and precisely what we do not yet claim.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FAF9F6] border border-stone-200 px-3 py-1.5 rounded-xl font-mono text-xs text-stone-700 self-start md:self-auto">
          <Clock className="h-3.5 w-3.5 text-[#1B3F8B]" />
          <span>v1.0 Preview Rubric Active</span>
        </div>
      </div>

      {/* ── 4-Stage Horizontal Flow Tracker ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MATURITY_STAGES.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isActive
                  ? "bg-[#0B1325] text-white border-[#0B1325] shadow-sm"
                  : "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isActive ? "text-emerald-300" : "text-stone-500"
                    }`}
                  >
                    {stage.stageNumber}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-stone-200 text-stone-700"
                    }`}
                  >
                    {stage.status}
                  </span>
                </div>

                <div className="font-serif font-bold text-xs sm:text-sm leading-snug">
                  {stage.title}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                <span
                  className={`font-mono text-[10px] ${
                    isActive ? "text-stone-300" : "text-stone-500"
                  }`}
                >
                  Metric
                </span>
                <span
                  className={`font-mono text-xs font-bold ${
                    isActive ? "text-emerald-400" : "text-[#005B4F]"
                  }`}
                >
                  {stage.metrics}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Active Stage Deep Inspection ── */}
      <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
          <div>
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">
              {activeStage.stageNumber} · {activeStage.status}
            </span>
            <h4 className="font-serif font-bold text-lg text-stone-900 mt-0.5">
              {activeStage.title}
            </h4>
          </div>

          <div className="font-mono text-xs font-bold text-[#005B4F] bg-[#E8F7F1] border border-[#005B4F]/20 px-3 py-1 rounded-lg self-start sm:self-auto">
            {activeStage.metrics}
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
          {activeStage.description}
        </p>

        {/* Methodology Specifics */}
        <div className="p-4 rounded-xl bg-white tone-light border border-stone-200 space-y-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            METHODOLOGICAL SPECIFICS
          </span>
          <div className="space-y-2">
            {activeStage.methodologyDetails.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                <CheckCircle2 className="h-4 w-4 text-[#005B4F] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency Notice */}
        <div className="p-3.5 rounded-xl border border-amber-200/80 bg-amber-50/50 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong>Transparency Accounting:</strong> {activeStage.transparencyNotice}
          </span>
        </div>
      </div>
    </div>
  );
}

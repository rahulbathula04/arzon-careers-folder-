import { useState } from "react";
import { TrendingUp, Award, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface TrajectoryData {
  track: string;
  roleTitle: string;
  entryCtc: string;
  year3Ctc: string;
  year5Ctc: string;
  demand: "Very High" | "High" | "Specialized";
  keyMilestones: string[];
  growthFactor: string;
}

const TRAJECTORIES: TrajectoryData[] = [
  {
    track: "Clinical SAS & Biostatistics",
    roleTitle: "Statistical Programmer → Senior Programmer → Lead Biostatistician",
    entryCtc: "₹4.5L – ₹7.0L",
    year3Ctc: "₹8.5L – ₹12.0L",
    year5Ctc: "₹14.0L – ₹22.0L",
    demand: "Very High",
    keyMilestones: [
      "Mastery of CDISC SDTM / ADaM standards and FDA submission packages",
      "Lead TLF (Tables, Listings, Figures) generation for global trials",
      "Cross-functional protocol design with medical directors",
    ],
    growthFactor: "3.2x over 5 years",
  },
  {
    track: "Pharmacovigilance & Drug Safety",
    roleTitle: "ICSR Associate → Senior Safety Specialist → Safety Signal Lead",
    entryCtc: "₹3.8L – ₹5.5L",
    year3Ctc: "₹7.0L – ₹9.5L",
    year5Ctc: "₹11.0L – ₹16.0L",
    demand: "Very High",
    keyMilestones: [
      "Autonomous ICSR case triage & E2B(R3) transmission compliance",
      "Aggregate reporting (PSUR/PBRER) drafting for global health agencies",
      "Safety signal detection & risk management plan (RMP) authoring",
    ],
    growthFactor: "2.9x over 5 years",
  },
  {
    track: "Clinical Data Management (CDM)",
    roleTitle: "CDA → Senior Data Manager → Study Data Lead",
    entryCtc: "₹3.5L – ₹5.2L",
    year3Ctc: "₹6.5L – ₹9.0L",
    year5Ctc: "₹10.5L – ₹15.0L",
    demand: "High",
    keyMilestones: [
      "eCRF build & discrepancy management in EDC platforms",
      "Full ownership of Data Management Plan (DMP) & database lock protocols",
      "Global study oversight across multi-site international clinical trials",
    ],
    growthFactor: "2.8x over 5 years",
  },
  {
    track: "Medical Coding & Revenue Cycle",
    roleTitle: "Coder → Senior Surgical Coder → Compliance Auditor",
    entryCtc: "₹3.5L – ₹4.8L",
    year3Ctc: "₹6.0L – ₹8.5L",
    year5Ctc: "₹9.5L – ₹14.0L",
    demand: "High",
    keyMilestones: [
      "CPC/CIC credentialing with 95%+ chart review accuracy",
      "Specialization in complex inpatient DRG & interventional radiology",
      "Provider query management & institutional compliance audits",
    ],
    growthFactor: "2.7x over 5 years",
  },
  {
    track: "Regulatory Affairs & Medical Writing",
    roleTitle: "RA Trainee → Regulatory Specialist → Global Submissions Lead",
    entryCtc: "₹3.8L – ₹5.8L",
    year3Ctc: "₹7.5L – ₹10.5L",
    year5Ctc: "₹12.0L – ₹18.0L",
    demand: "Specialized",
    keyMilestones: [
      "eCTD Module 1-5 electronic compilation & lifecycle maintenance",
      "Authoring Clinical Study Reports (CSR) & Investigator Brochures (IB)",
      "Direct health authority response handling with USFDA, EMA, and CDSCO",
    ],
    growthFactor: "3.1x over 5 years",
  },
];

export function DegreeRoiTrajectory() {
  const [selectedTrack, setSelectedTrack] = useState(0);
  const active = TRAJECTORIES[selectedTrack];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E4EAF2] tone-light card-light">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
          <TrendingUp className="h-3 w-3 text-[#10B981]" />
          <span>CAREER VELOCITY &amp; SALARY TRAJECTORY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
          Brainstorm Your 5-Year Compensation &amp;{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
            Promotion Velocity
          </span>
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
          Compare realistic compensation milestones, typical promotion cycles, and market demand across top healthcare clinical tracks.
        </p>
      </div>

      {/* Track Selection Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 mb-6 border-b border-[#E4EAF2]">
        {TRAJECTORIES.map((item, idx) => {
          const isSelected = selectedTrack === idx;
          return (
            <button
              key={item.track}
              type="button"
              onClick={() => setSelectedTrack(idx)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                isSelected
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#081F38] tone-light card-light"
              }`}
            >
              {item.track}
            </button>
          );
        })}
      </div>

      {/* Active Trajectory Display Card */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 p-6 sm:p-8 tone-light card-light shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E4EAF2]">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
              Career Ladder Progression
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#081F38] mt-1">
              {active.roleTitle}
            </h3>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2 font-mono text-xs font-bold text-emerald-800 shrink-0">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>Avg Growth: {active.growthFactor}</span>
          </div>
        </div>

        {/* 3 Milestone Columns (Entry, Year 3, Year 5) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {/* Milestone 1: Year 1 (Entry) */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 tone-light card-light shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F1F5F9] px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#475569]">
                <Clock className="h-3 w-3 text-[#2563EB]" />
                <span>Year 1 (Entry)</span>
              </span>
              <span className="font-mono text-[10px] font-semibold text-[#64748B]">Associate</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#081F38] tracking-tight">
                {active.entryCtc}
              </div>
              <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                Fresher onboarding, core SOP training, and supervised database case execution.
              </p>
            </div>
          </div>

          {/* Milestone 2: Year 3 (Senior) */}
          <div className="rounded-xl border border-blue-200 bg-[#EEF6FF]/70 p-5 tone-light card-light shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#1D4ED8]">
                <Clock className="h-3 w-3 text-[#2563EB]" />
                <span>Year 3 (Senior)</span>
              </span>
              <span className="font-mono text-[10px] font-semibold text-[#1E3A8A]">Specialist</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1D4ED8] tracking-tight">
                {active.year3Ctc}
              </div>
              <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                Autonomous case ownership, quality reviews, and junior mentee guidance.
              </p>
            </div>
          </div>

          {/* Milestone 3: Year 5 (Lead/Manager) */}
          <div className="rounded-xl border border-emerald-300 bg-white p-5 tone-light card-light shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-emerald-800">
                <Clock className="h-3 w-3 text-emerald-600" />
                <span>Year 5 (Lead)</span>
              </span>
              <span className="font-mono text-[10px] font-semibold text-emerald-700">Team Lead / Manager</span>
            </div>
            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight">
                {active.year5Ctc}
              </div>
              <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                Audit defense with global sponsors, SLA management, and technical leadership.
              </p>
            </div>
          </div>
        </div>

        {/* Key Career Growth Milestones */}
        <div className="mt-6 pt-5 border-t border-[#E4EAF2]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#081F38]">
            Key Competency Milestones to Reach Senior Bands:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            {active.keyMilestones.map((m) => (
              <div key={m} className="flex items-start gap-2 text-xs text-[#334155]">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E4EAF2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#64748B]">
            Data calibrated against 2,000+ job offers across Bangalore, Hyderabad, Pune, and MNC CROs.
          </span>
          <Link
            to="/career-engine/start"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8]"
          >
            <span>Assess your starting CTC fit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

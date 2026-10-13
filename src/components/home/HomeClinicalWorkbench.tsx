import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  Search,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Terminal,
} from "lucide-react";

export function HomeClinicalWorkbench() {
  const [activeTab, setActiveTab] = useState<"intake" | "meddra" | "narrative" | "qc">("intake");
  const [checkedCriteria, setCheckedCriteria] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const toggleCriterion = (idx: number) => {
    setCheckedCriteria((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const allPassed = [0, 1, 2, 3].every((i) => checkedCriteria[i]);

  return (
    <section id="interactive-workbench" className="ap-section ap-tint border-y border-[#E4EAF2]">
      <div className="ap-shell">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D0E1FD] bg-[#EEF6FF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1557D6] mb-3">
            <Terminal className="h-3.5 w-3.5 text-[#1557D6]" />
            <span>Interactive Operational Workbench</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#071A4A] tracking-tight">
            Experience the Daily Work Before You Choose
          </h2>
          <p className="text-base text-[#475569] mt-3">
            Hiring managers don&apos;t evaluate textbook definitions. They assess whether you can process raw adverse events into audit-ready regulatory cases. Test the actual ICSR workflow below.
          </p>
        </div>

        {/* Workbench Shell */}
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl overflow-hidden tone-light card-light">
          {/* Top Bar / Metadata */}
          <div className="bg-[#071A4A] px-5 py-3.5 sm:px-7 flex flex-wrap items-center justify-between gap-3 text-white border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-wider">
                <span className="text-white/90">ARGUS SAFETY E2B(R3) SIMULATOR</span>
                <span className="text-white/30">/</span>
                <span className="text-cyan-300 font-bold">CASE ARZ-2026-PV-0891</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 text-[11px]">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Expedited Clock: 15 Calendar Days</span>
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-white/10">
                Interactive Case Mode
              </span>
            </div>
          </div>

          {/* Workbench Tabs */}
          <div className="border-b border-slate-200/80 bg-slate-50/80 px-4 sm:px-7 flex overflow-x-auto gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("intake")}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "intake"
                  ? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>01. Intake & Day-0 Triage</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("meddra")}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "meddra"
                  ? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Code2 className="h-4 w-4" />
              <span>02. MedDRA Coding Tree</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("narrative")}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "narrative"
                  ? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              <span>03. Narrative Drafting</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("qc")}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "qc"
                  ? "border-[#1557D6] text-[#071A4A] bg-white tone-light card-light rounded-t-lg shadow-2xs"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>04. Zero-Defect QC Audit</span>
            </button>
          </div>

          {/* Workbench Body */}
          <div className="p-4 sm:p-8 min-h-[420px] bg-white tone-light card-light">
            {/* TAB 1: INTAKE & DAY-0 TRIAGE */}
            {activeTab === "intake" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Source Document Excerpt */}
                <div className="lg:col-span-6 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E2E8F0]">
                    <span className="font-mono font-bold text-[#071A4A] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-[#1557D6]" />
                      <span>Primary Source Document (Hospital Fax)</span>
                    </span>
                    <span className="rounded bg-[#E2E8F0] px-2 py-0.5 font-mono text-[10px] text-[#475569]">
                      Unstructured Clinical Intake
                    </span>
                  </div>

                  <div className="font-mono text-[11.5px] leading-relaxed text-[#334155] bg-white p-3 rounded-lg border border-[#E2E8F0] space-y-2 tone-light card-light">
                    <p>
                      <strong>Date of Report:</strong> 12-Oct-2026 | <strong>Source:</strong> Dr. V. Sundaram (MD Internal Medicine, Apollo Hospital, Chennai)
                    </p>
                    <p>
                      <strong>Patient:</strong> Mrs. K.S., 52-year-old female (Hospital ID: #AP-88421).
                    </p>
                    <p>
                      <strong>Suspect Medication:</strong> Inj. Rocephin (Ceftriaxone sodium 1g IV bid). Started 11-Oct-2026 for acute pyelonephritis.
                    </p>
                    <p className="bg-amber-50 p-2 rounded border border-amber-200/60 text-amber-900">
                      <strong>Adverse Event:</strong> Within 12 minutes of 2nd infusion, patient developed acute laryngeal edema, severe wheezing, facial swelling, and BP drop (80/50 mmHg). Required emergency epinephrine 0.5mg IM and ICU admission. Infusion immediately halted.
                    </p>
                  </div>

                  <div className="mt-3 text-[11px] text-[#64748B]">
                    <strong>DSA Operational Step:</strong> Verify whether this document satisfies the 4 ICH E2D minimum criteria to establish regulatory Day-0.
                  </div>
                </div>

                {/* Right: Interactive 4 Criteria Checklist */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="text-sm font-bold text-[#071A4A] flex items-center gap-2">
                    <span>ICH E2D Four Minimum Criteria Validation</span>
                    <span className="text-xs font-normal text-[#64748B]">(Tap to verify)</span>
                  </h3>

                  <div className="space-y-2.5">
                    {[
                      {
                        title: "1. Identifiable Patient",
                        note: "Patient initials Mrs. K.S., 52Y, Hospital ID provided.",
                      },
                      {
                        title: "2. Identifiable Reporter",
                        note: "Dr. V. Sundaram, MD Internal Medicine, Apollo Hospital Chennai.",
                      },
                      {
                        title: "3. Suspect Medicinal Product",
                        note: "Inj. Rocephin (Ceftriaxone 1g IV), dose and indication recorded.",
                      },
                      {
                        title: "4. Adverse Event Reaction",
                        note: "Laryngeal edema, severe wheezing, hypotension, ICU transfer.",
                      },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleCriterion(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                          checkedCriteria[idx]
                            ? "border-emerald-300 bg-emerald-50/60 text-emerald-950"
                            : "border-[#E2E8F0] bg-white text-[#64748B] tone-light card-light"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-5 w-5 mt-0.5 shrink-0 ${
                            checkedCriteria[idx] ? "text-emerald-600" : "text-slate-300"
                          }`}
                        />
                        <div>
                          <strong className="block text-xs font-bold text-[#071A4A]">
                            {item.title}
                          </strong>
                          <span className="block text-[11px] text-[#475569] mt-0.5">
                            {item.note}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Day-0 Status Box */}
                  <div
                    className={`p-4 rounded-xl border text-xs ${
                      allPassed
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : "border-amber-300 bg-amber-50 text-amber-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {allPassed ? (
                        <>
                          <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          <span>VALID ICSR CONFIRMED · REGULATORY CLOCK RUNNING</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <span>CRITERIA INCOMPLETE · CANNOT LOCK DAY-0</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11.5px] leading-relaxed">
                      {allPassed
                        ? "Day-0 established as 12-Oct-2026. Because event is life-threatening and required hospitalization, this qualifies as SERIOUS (Expedited 15-day submission deadline: 27-Oct-2026)."
                        : "All 4 criteria are mandatory under ICH E2D. If any criterion is missing, case remains logged in intake triage awaiting targeted follow-up."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MEDDRA CODING */}
            {activeTab === "meddra" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#EEF6FF] p-4 rounded-xl border border-[#D0E1FD]">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#1557D6] uppercase tracking-wider block">
                      Reported Verbatim Reaction
                    </span>
                    <strong className="text-sm sm:text-base text-[#071A4A] font-bold">
                      &ldquo;Severe bronchospasm and laryngeal edema following Ceftriaxone injection&rdquo;
                    </strong>
                  </div>
                  <div className="rounded-lg bg-white px-3 py-1.5 border border-[#CBD5E1] text-xs font-mono text-[#071A4A] shrink-0 tone-light card-light">
                    MedDRA Dictionary Version 27.0
                  </div>
                </div>

                {/* 5-Level Hierarchy Visual */}
                <div className="border border-[#CBD5E1] rounded-xl overflow-hidden bg-white tone-light card-light">
                  <div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-[#E2E8F0] text-xs font-bold text-[#071A4A] flex items-center justify-between">
                    <span>MedDRA 5-Tier Hierarchical Classification</span>
                    <span className="font-mono text-[11px] text-[#64748B]">Primary System Organ Class Path</span>
                  </div>

                  <div className="p-4 sm:p-6 space-y-3">
                    {[
                      {
                        level: "SOC",
                        name: "System Organ Class",
                        value: "Immune system disorders",
                        code: "10021428",
                        color: "border-indigo-400 bg-indigo-50/50 text-indigo-950",
                      },
                      {
                        level: "HLGT",
                        name: "High Level Group Term",
                        value: "Allergic conditions",
                        code: "10001708",
                        color: "border-blue-400 bg-blue-50/50 text-blue-950",
                      },
                      {
                        level: "HLT",
                        name: "High Level Term",
                        value: "Anaphylactic and anaphylactoid responses",
                        code: "10002199",
                        color: "border-sky-400 bg-sky-50/50 text-sky-950",
                      },
                      {
                        level: "PT",
                        name: "Preferred Term (Regulatory Analysis Unit)",
                        value: "Anaphylactic reaction",
                        code: "10002198",
                        color: "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold",
                      },
                      {
                        level: "LLT",
                        name: "Lowest Level Term (Data Entry Point)",
                        value: "Acute anaphylactic reaction",
                        code: "10000783",
                        color: "border-[#1557D6] bg-[#EEF6FF] text-[#071A4A] font-bold",
                      },
                    ].map((tier, idx) => (
                      <div
                        key={tier.level}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border ${tier.color}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-white/80 shadow-xs tone-light card-light">
                            {tier.level}
                          </span>
                          <div>
                            <span className="text-[11px] text-[#475569] block">{tier.name}</span>
                            <strong className="text-xs sm:text-sm">{tier.value}</strong>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-white/90 text-[#334155] self-start sm:self-auto tone-light card-light">
                          Code: {tier.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50 text-xs text-blue-900 flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-700 mt-0.5 shrink-0" />
                  <span>
                    <strong>MedDRA MSSO Point-to-Consider (PtC) Rule:</strong> When multiple concurrent symptoms (bronchospasm, facial edema, hypotension) point unequivocally to a systemic diagnosis (Anaphylaxis), the processor codes the definitive diagnosis PT rather than splitting individual symptoms.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: NARRATIVE DRAFTING */}
            {activeTab === "narrative" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#071A4A]">
                    Production Narrative vs Defective Narrative Comparison
                  </h3>
                  <span className="text-xs text-[#64748B]">Represents 30–40% of Daily DSA Work</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Defective Draft */}
                  <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
                    <div className="flex items-center justify-between text-xs font-bold text-rose-800 pb-2 mb-2 border-b border-rose-200">
                      <span>Rejected Draft (Fails CRO Quality Gate)</span>
                      <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px]">Error Rate: High</span>
                    </div>
                    <p className="text-xs text-rose-950 font-mono leading-relaxed bg-white/70 p-3 rounded-lg border border-rose-200 tone-light card-light">
                      &ldquo;A female patient was given Rocephin for infection and got sick with wheezing and allergic reaction. Doctor gave epinephrine and sent to ICU. Infusion was stopped. Reporter says drug caused it.&rdquo;
                    </p>
                    <ul className="mt-3 text-[11px] text-rose-800 space-y-1">
                      <li>• Missing exact age, hospital identifier, dose, route, and frequency.</li>
                      <li>• Missing onset latency (time from infusion start to reaction).</li>
                      <li>• Missing baseline lab values, dechallenge outcome, and medical history.</li>
                    </ul>
                  </div>

                  {/* Arzon Gold Standard Narrative */}
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50/40 p-4">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800 pb-2 mb-2 border-b border-emerald-300">
                      <span>Arzon Production Standard (Right-First-Time ≥ 98%)</span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px]">Audit Ready</span>
                    </div>
                    <p className="text-xs text-emerald-950 font-mono leading-relaxed bg-white/90 p-3 rounded-lg border border-emerald-300 tone-light card-light">
                      &ldquo;This spontaneous report from a physician describes the case of a 52-year-old female patient (ID #AP-88421) who experienced an acute anaphylactic reaction with severe bronchospasm, laryngeal edema, and hypotension following administration of ceftriaxone sodium (Inj. Rocephin 1g IV bid) for acute pyelonephritis on 12-OCT-2026. Onset latency was 12 minutes post-infusion. The drug was immediately discontinued (positive dechallenge). Patient was treated with emergency epinephrine 0.5mg IM and transferred to ICU. Blood pressure stabilized and patient recovered. Causality assessed as probable by treating physician.&rdquo;
                    </p>
                    <ul className="mt-3 text-[11px] text-emerald-900 space-y-1">
                      <li>✓ Complete chronological sequence from indication to resolution.</li>
                      <li>✓ Explicit dechallenge documentation and reporter causality captured.</li>
                      <li>✓ E2B(R3) field alignment verified for automated XML routing.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: QC DEFECT AUDIT */}
            {activeTab === "qc" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#071A4A]">Zero-Tolerance Critical Error Taxonomy</h3>
                    <p className="text-xs text-[#64748B]">How pharmacovigilance quality managers evaluate candidate submissions</p>
                  </div>
                  <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-mono font-bold text-rose-700 border border-rose-200">
                    AQL: 0% Critical Tolerance
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-rose-300 bg-white p-4 shadow-xs tone-light card-light">
                    <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Critical Defect (Score: 0)</span>
                    </div>
                    <strong className="block text-xs font-bold text-[#071A4A] mb-1">
                      Missed Seriousness / Wrong Day-0
                    </strong>
                    <p className="text-[11px] text-[#475569] leading-relaxed mb-3">
                      Failing to flag hospitalization or death causes missed 15-day expedited regulatory deadline, risking FDA/EMA inspection findings and heavy penalties.
                    </p>
                    <span className="block text-[10px] font-mono text-rose-700 font-semibold bg-rose-50 px-2 py-1 rounded">
                      Action: Immediate Re-training & Retest
                    </span>
                  </div>

                  <div className="rounded-xl border border-amber-300 bg-white p-4 shadow-xs tone-light card-light">
                    <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Major Defect (Score: -15)</span>
                    </div>
                    <strong className="block text-xs font-bold text-[#071A4A] mb-1">
                      Incorrect MedDRA PT / Causality
                    </strong>
                    <p className="text-[11px] text-[#475569] leading-relaxed mb-3">
                      Selecting an inaccurate Preferred Term (PT) distorts global signal detection algorithms and aggregate safety data reports (PBRER / DSUR).
                    </p>
                    <span className="block text-[10px] font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-1 rounded">
                      Action: Quality Correction Loop
                    </span>
                  </div>

                  <div className="rounded-xl border border-blue-200 bg-white p-4 shadow-xs tone-light card-light">
                    <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
                      <Activity className="h-4 w-4" />
                      <span>Minor Defect (Score: -5)</span>
                    </div>
                    <strong className="block text-xs font-bold text-[#071A4A] mb-1">
                      Typographical & Formatting Flaws
                    </strong>
                    <p className="text-[11px] text-[#475569] leading-relaxed mb-3">
                      Spelling mistakes in narrative or inconsequential field omissions that do not compromise case comprehension or regulatory routing.
                    </p>
                    <span className="block text-[10px] font-mono text-blue-800 font-semibold bg-blue-50 px-2 py-1 rounded">
                      Action: Peer Review Coaching
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Workbench Footer Action Bar */}
          <div className="bg-slate-50/80 px-6 py-4.5 sm:px-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 text-center sm:text-left">
              <strong className="text-[#071A4A] font-bold">Ready to master production case processing?</strong>
              <span className="block sm:inline sm:ml-1 text-slate-500">
                Process 15 complete regulatory cases in our 12-week Pharmacovigilance track.
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/roles/drug-safety-associate"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-[#1557D6] hover:text-[#1557D6] transition-all flex-1 sm:flex-initial tone-light card-light"
              >
                <span>DSA Blueprint</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/pv-associate"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#071A4A] px-5 py-2 text-xs font-bold text-white hover:bg-[#1557D6] shadow-xs hover:shadow transition-all flex-1 sm:flex-initial"
              >
                <span>12-Week Program</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Shield,
  Layers,
  ArrowRight,
  Info,
  RotateCcw,
  Flag,
} from "lucide-react";
import type { AcriAssessmentItem } from "@/data/acri/acriPvCaseLibrary";
import type { AssessmentMode } from "@/lib/acri/acriSession";

interface AcriWorkSimulationProps {
  item: AcriAssessmentItem;
  currentIndex: number;
  totalItems: number;
  currentAnswer: any;
  onAnswerChange: (answer: any) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onToggleFlag?: () => void;
  isFlagged?: boolean;
  mode: AssessmentMode;
}

export function AcriWorkSimulation({
  item,
  currentIndex,
  totalItems,
  currentAnswer,
  onAnswerChange,
  onNext,
  onPrev,
  onSubmit,
  onToggleFlag,
  isFlagged = false,
  mode,
}: AcriWorkSimulationProps) {
  const [practiceTab, setPracticeTab] = useState<"none" | "concept" | "guideline" | "example">("none");

  const isLast = currentIndex === totalItems - 1;

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-stone-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Stage & Regulatory Reference Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#07241A] text-emerald-400">
              {item.stageCategory.toUpperCase()}
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Case {item.itemNumber} of {totalItems}
            </span>
          </div>

          {item.evidenceRef && (
            <div className="inline-flex items-center gap-1.5 text-xs text-stone-600 font-mono bg-white tone-light border border-stone-200 px-3 py-1 rounded-md shadow-2xs">
              <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
              <span>{item.evidenceRef}</span>
            </div>
          )}
        </div>

        {/* Clinical Scenario Box */}
        {item.clinicalScenario && (
          <div className="rounded-xl border border-stone-200 bg-white tone-light p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-stone-500">
              <FileText className="h-3.5 w-3.5 text-stone-400" />
              <span>Clinical Case Intake Dossier</span>
            </div>

            {(item.clinicalScenario.patient || item.clinicalScenario.suspectDrug) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-3 rounded-lg border border-stone-200/70">
                {item.clinicalScenario.patient && (
                  <div>
                    <span className="font-semibold text-stone-700">Patient: </span>
                    <span className="text-stone-900">{item.clinicalScenario.patient}</span>
                  </div>
                )}
                {item.clinicalScenario.suspectDrug && (
                  <div>
                    <span className="font-semibold text-stone-700">Suspect Product: </span>
                    <span className="text-stone-900">{item.clinicalScenario.suspectDrug}</span>
                  </div>
                )}
                {item.clinicalScenario.adverseEvent && (
                  <div className="sm:col-span-2">
                    <span className="font-semibold text-stone-700">Adverse Reaction: </span>
                    <span className="text-stone-900 font-medium">{item.clinicalScenario.adverseEvent}</span>
                  </div>
                )}
              </div>
            )}

            {item.clinicalScenario.narrativeSnippet && (
              <div className="p-3.5 rounded-lg bg-stone-900 text-stone-100 font-mono text-xs leading-relaxed whitespace-pre-wrap select-text">
                {item.clinicalScenario.narrativeSnippet}
              </div>
            )}
          </div>
        )}

        {/* Prompt Header */}
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#0B1325] leading-snug">
            {item.prompt}
          </h2>
        </div>

        {/* Specialized Interactive Work Simulation Content */}
        <div className="mt-4">
          {item.simulationType === "intake_validation" && (
            <IntakeValidationSimulation
              item={item}
              answer={currentAnswer || { criteria: {}, verdict: "" }}
              onChange={onAnswerChange}
            />
          )}

          {item.simulationType === "field_extraction" && (
            <FieldExtractionSimulation
              item={item}
              answer={currentAnswer || {}}
              onChange={onAnswerChange}
            />
          )}

          {item.simulationType === "who_causality" && (
            <WhoCausalitySimulation
              item={item}
              answer={currentAnswer || ""}
              onChange={onAnswerChange}
            />
          )}

          {item.simulationType === "confounder_update" && (
            <McqSimulation
              item={item}
              answer={currentAnswer || ""}
              onChange={onAnswerChange}
            />
          )}

          {item.simulationType === "meddra_coding" && (
            <McqSimulation
              item={item}
              answer={currentAnswer || ""}
              onChange={onAnswerChange}
            />
          )}

          {item.simulationType === "narrative_writing" && (
            <NarrativeWritingSimulation
              item={item}
              answer={currentAnswer || ""}
              onChange={onAnswerChange}
            />
          )}

          {item.simulationType === "case_triage" && (
            <CaseTriageSimulation
              item={item}
              answer={currentAnswer || []}
              onChange={onAnswerChange}
            />
          )}

          {item.simulationType === "mcq" && (
            <McqSimulation
              item={item}
              answer={currentAnswer || ""}
              onChange={onAnswerChange}
            />
          )}
        </div>

        {/* MODE A: Practice / Learn "Ask Arzon AI" Guidance Drawer */}
        {mode === "practice" && (
          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Practice Mode: Ask Arzon AI Learning Assistant</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPracticeTab(practiceTab === "concept" ? "none" : "concept")}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition cursor-pointer ${
                    practiceTab === "concept"
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white tone-light text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  Explain Concept
                </button>
                <button
                  type="button"
                  onClick={() => setPracticeTab(practiceTab === "guideline" ? "none" : "guideline")}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition cursor-pointer ${
                    practiceTab === "guideline"
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white tone-light text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  Show Guideline
                </button>
                <button
                  type="button"
                  onClick={() => setPracticeTab(practiceTab === "example" ? "none" : "example")}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition cursor-pointer ${
                    practiceTab === "example"
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white tone-light text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  Clinical Example
                </button>
              </div>
            </div>

            {practiceTab === "concept" && (
              <div className="mt-3 p-3 bg-white tone-light rounded-lg border border-emerald-200 text-xs text-stone-700 leading-relaxed">
                <span className="font-bold text-emerald-900">Core Principle: </span>
                {item.simulationType === "intake_validation" &&
                  "Under ICH E2A/E2D, an Individual Case Safety Report (ICSR) cannot enter safety databases unless all 4 minimum elements exist: Identifiable Patient, Identifiable Reporter, Suspect Product, and Adverse Event. If any element is absent, follow-up must be initiated."}
                {item.simulationType === "who_causality" &&
                  "The WHO-UMC causality algorithm evaluates temporality, dechallenge, rechallenge, and alternative causes. 'Certain' is restricted exclusively to cases with positive rechallenge or laboratory proof."}
                {item.simulationType === "case_triage" &&
                  "Fatal and life-threatening unexpected reactions (SUSARs) demand expedited Day 7 clock reporting. Commercial batch clusters demand immediate signal escalation."}
                {item.simulationType !== "intake_validation" &&
                  item.simulationType !== "who_causality" &&
                  item.simulationType !== "case_triage" &&
                  "Focus on regulatory precision and objective evidence. In safety operations, subjective inferences must never replace documented clinical observations."}
              </div>
            )}

            {practiceTab === "guideline" && (
              <div className="mt-3 p-3 bg-white tone-light rounded-lg border border-emerald-200 text-xs text-stone-700 leading-relaxed font-mono">
                {item.evidenceRef || "ICH E2D • Clinical Safety Data Management"}
                <div className="mt-1 text-stone-600 font-sans">
                  Mandatory regulatory standard enforced by FDA (21 CFR 314.80), EMA (GVP Module VI), and CDSCO.
                </div>
              </div>
            )}

            {practiceTab === "example" && (
              <div className="mt-3 p-3 bg-white tone-light rounded-lg border border-emerald-200 text-xs text-stone-700 leading-relaxed">
                <span className="font-bold text-emerald-900">Workplace Scenario: </span>
                When a hospital sends an adverse event email without doctor contact details, safety associates place the case on a 24-hour query hold while pursuing physician verification.
              </div>
            )}
          </div>
        )}

        {/* MODE B: Certified Mode Discreet Audit Stamp */}
        {mode === "certified" && (
          <div className="mt-8 rounded-lg border border-stone-200 bg-white tone-light p-3 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-700" />
              <span className="font-mono text-[11px] font-semibold tracking-wide">
                ACRI CERTIFICATION MODE · ACTIVE CANDIDATE PROCTORING
              </span>
            </div>
            <div className="text-[11px] text-stone-400">
              No AI assistance active · Responses evaluated against occupational standard
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="max-w-4xl mx-auto w-full pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider border transition cursor-pointer ${
            currentIndex === 0
              ? "opacity-40 cursor-not-allowed border-stone-200 text-stone-400 bg-stone-100"
              : "border-stone-300 bg-white tone-light text-stone-900 hover:bg-stone-100"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous Case</span>
        </button>

        {onToggleFlag && (
          <button
            type="button"
            onClick={onToggleFlag}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-semibold transition cursor-pointer border ${
              isFlagged
                ? "bg-amber-50 text-amber-800 border-amber-300"
                : "bg-white tone-light text-stone-600 border-stone-200 hover:bg-stone-50"
            }`}
          >
            <Flag
              className={`h-3.5 w-3.5 ${
                isFlagged ? "fill-amber-500 text-amber-500" : "text-stone-400"
              }`}
            />
            <span>{isFlagged ? "Flagged for Review" : "Flag for Review"}</span>
          </button>
        )}

        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#0B1325] hover:bg-[#1B3F8B] text-white shadow-sm transition cursor-pointer"
          >
            <span>Finish &amp; Evaluate ACRI Score</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#0B1325] hover:bg-[#1B3F8B] text-white shadow-sm transition cursor-pointer"
          >
            <span>Next Case</span>
            <ChevronRight className="h-4 w-4 text-stone-300" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. Intake 4-Criteria Validation Simulation
// ─────────────────────────────────────────────────────────────
function IntakeValidationSimulation({
  item,
  answer,
  onChange,
}: {
  item: AcriAssessmentItem;
  answer: { criteria: Record<string, boolean>; verdict: string };
  onChange: (ans: any) => void;
}) {
  const criteriaList = item.simulationData?.criteriaList || [];
  const verdictOptions = item.simulationData?.verdictOptions || [];

  const handleToggle = (id: string) => {
    const updated = {
      ...answer,
      criteria: {
        ...answer.criteria,
        [id]: !answer.criteria[id],
      },
    };
    onChange(updated);
  };

  const handleVerdict = (val: string) => {
    onChange({
      ...answer,
      verdict: val,
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-stone-200 bg-white tone-light p-4 sm:p-5 shadow-2xs">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-3">
          Step 1: Check 4 Minimum ICSR Criteria (ICH E2A / E2D)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {criteriaList.map((crit: any) => {
            const isChecked = !!answer.criteria?.[crit.id];
            return (
              <label
                key={crit.id}
                onClick={() => handleToggle(crit.id)}
                className={`flex items-start gap-3 p-3.5 rounded-lg border text-xs cursor-pointer transition ${
                  isChecked
                    ? "border-emerald-500 bg-emerald-50/50 text-stone-900"
                    : "border-stone-200 bg-stone-50/50 hover:bg-stone-100/60 text-stone-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <div className="font-bold text-stone-900">{crit.label}</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">
                    Found in source: &ldquo;{crit.evidence}&rdquo;
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white tone-light p-4 sm:p-5 shadow-2xs">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-3">
          Step 2: Operational Case Processing Verdict
        </div>

        <div className="space-y-2.5">
          {verdictOptions.map((opt: any) => {
            const isSelected = answer.verdict === opt.value;
            return (
              <label
                key={opt.value}
                onClick={() => handleVerdict(opt.value)}
                className={`flex items-center gap-3 p-3.5 rounded-lg border text-xs cursor-pointer transition ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                    : "border-stone-200 bg-stone-50/50 hover:bg-stone-100/60 text-stone-700 font-medium"
                }`}
              >
                <input
                  type="radio"
                  name="verdict"
                  checked={isSelected}
                  onChange={() => {}}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Structured Field Extraction Simulation
// ─────────────────────────────────────────────────────────────
function FieldExtractionSimulation({
  item,
  answer,
  onChange,
}: {
  item: AcriAssessmentItem;
  answer: Record<string, string>;
  onChange: (ans: any) => void;
}) {
  const fields = item.simulationData?.fields || [];

  const handleSelect = (fieldKey: string, value: string) => {
    onChange({
      ...answer,
      [fieldKey]: value,
    });
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white tone-light p-4 sm:p-6 shadow-2xs space-y-4">
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
        E2B(R3) Safety Database Data Entry Fields
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f: any) => (
          <div key={f.key} className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 flex items-center justify-between">
              <span>{f.label}</span>
              <span className="text-[10px] font-mono text-stone-400">E2B Element</span>
            </label>
            <select
              value={answer[f.key] || ""}
              onChange={(e) => handleSelect(f.key, e.target.value)}
              className="w-full text-xs font-medium bg-stone-50 border border-stone-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
            >
              <option value="">-- Select extraction --</option>
              {f.options.map((opt: string) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. WHO-UMC Causality Algorithm Simulation
// ─────────────────────────────────────────────────────────────
function WhoCausalitySimulation({
  item,
  answer,
  onChange,
}: {
  item: AcriAssessmentItem;
  answer: string;
  onChange: (ans: any) => void;
}) {
  const options = item.options || [];

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = answer === opt.key;
        return (
          <div
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`p-4 rounded-xl border transition cursor-pointer ${
              isSelected
                ? "border-emerald-600 bg-emerald-50/70 text-stone-900 shadow-xs"
                : "border-stone-200 bg-white tone-light hover:bg-stone-50/80 text-stone-700"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="causality"
                checked={isSelected}
                onChange={() => {}}
                className="mt-1 text-emerald-600 focus:ring-emerald-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#0B1325]">{opt.text}</span>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    WHO-UMC Category
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. Case Narrative Drafting Simulation
// ─────────────────────────────────────────────────────────────
function NarrativeWritingSimulation({
  item,
  answer,
  onChange,
}: {
  item: AcriAssessmentItem;
  answer: string;
  onChange: (ans: any) => void;
}) {
  const defaultDraft = item.simulationData?.defaultDraft || "";
  const rubricChecklist = item.simulationData?.rubricChecklist || [];

  const wordCount = (answer || "").split(/\s+/).filter(Boolean).length;
  const charCount = (answer || "").length;

  const handleUseTemplate = () => {
    onChange(defaultDraft);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-stone-200 bg-white tone-light p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
            ICSR Safety Narrative Draft Editor
          </div>
          <button
            type="button"
            onClick={handleUseTemplate}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Load Standard PV Narrative Template</span>
          </button>
        </div>

        <textarea
          rows={7}
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your regulatory safety narrative here in chronological order..."
          className="w-full text-xs font-mono leading-relaxed bg-stone-50 border border-stone-300 rounded-lg p-3.5 text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
        />

        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
          <span>Words: {wordCount} · Characters: {charCount}</span>
          <span className={wordCount >= 50 ? "text-emerald-600 font-semibold" : "text-amber-600"}>
            {wordCount >= 50 ? "✓ Minimum length satisfied" : "Needs ≥ 50 words for regulatory review"}
          </span>
        </div>
      </div>

      {/* Narrative Quality Rubric Checklist */}
      <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2">
        <div className="text-xs font-bold text-stone-700">
          Audited Regulatory Narrative Quality Checklist (ACRI Rubric)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
          {rubricChecklist.map((r: string, idx: number) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. High-Pressure 5-Case Triage Simulation
// ─────────────────────────────────────────────────────────────
function CaseTriageSimulation({
  item,
  answer,
  onChange,
}: {
  item: AcriAssessmentItem;
  answer: string[]; // array of case IDs in priority order
  onChange: (ans: any) => void;
}) {
  const cases = item.simulationData?.cases || [];

  // Initialize with cases if empty
  const currentOrder: any[] =
    answer.length > 0
      ? answer.map((id) => cases.find((c: any) => c.id === id) || { id, title: id })
      : cases;

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const newOrder = [...currentOrder];
    const temp = newOrder[idx - 1];
    newOrder[idx - 1] = newOrder[idx];
    newOrder[idx] = temp;
    onChange(newOrder.map((c) => c.id));
  };

  const moveDown = (idx: number) => {
    if (idx === currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    const temp = newOrder[idx + 1];
    newOrder[idx + 1] = newOrder[idx];
    newOrder[idx] = temp;
    onChange(newOrder.map((c) => c.id));
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-stone-600 font-medium">
        Order the 5 incoming queue cases from highest priority (Rank 1 — Urgent) to lowest priority (Rank 5). Use the arrow controls to prioritize.
      </div>

      <div className="space-y-2.5">
        {currentOrder.map((c: any, index: number) => (
          <div
            key={c.id}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-white tone-light shadow-2xs"
          >
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-[#0B1325] text-white font-mono font-bold text-xs shrink-0">
              #{index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-stone-900 leading-snug">{c.title}</div>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                <span className="font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  {c.seriousness}
                </span>
                <span className="text-stone-500 font-mono">
                  Deadline: {c.deadline}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 shrink-0">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="px-2 py-0.5 text-xs font-mono rounded bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Move up"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === currentOrder.length - 1}
                className="px-2 py-0.5 text-xs font-mono rounded bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Move down"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. Standard MCQ Clinical Question
// ─────────────────────────────────────────────────────────────
function McqSimulation({
  item,
  answer,
  onChange,
}: {
  item: AcriAssessmentItem;
  answer: string;
  onChange: (ans: any) => void;
}) {
  const options = item.options || [];

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = answer === opt.key;
        return (
          <div
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`p-4 rounded-xl border transition cursor-pointer ${
              isSelected
                ? "border-emerald-600 bg-emerald-50/70 text-stone-900 shadow-xs"
                : "border-stone-200 bg-white tone-light hover:bg-stone-50/80 text-stone-700"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold shrink-0 mt-0.5 ${
                  isSelected
                    ? "bg-emerald-600 text-white"
                    : "bg-stone-100 text-stone-700 border border-stone-200"
                }`}
              >
                {opt.key}
              </span>
              <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                {opt.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

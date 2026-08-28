import * as React from "react";
import { useState } from "react";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Brain,
  Zap,
  Target,
  BarChart3,
  Stethoscope,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import { getTrackTheme } from "@/data/trackTheme";

export type CopilotTrack =
  | "medical-coding"
  | "software-engineering"
  | "clinical-research"
  | "resume-ats";

export interface AiArtifactCanvasProps {
  track: CopilotTrack;
  onTrackChange?: (track: CopilotTrack) => void;
  candidateName?: string;
  acriScore?: number;
  className?: string;
}

export function AiArtifactCanvas({
  track,
  onTrackChange,
  candidateName = "Candidate",
  acriScore = 78,
  className,
}: AiArtifactCanvasProps) {
  const [activeTab, setActiveTab] = useState<"workspace" | "radar" | "suggestions">("workspace");
  const [analyzing, setAnalyzing] = useState(false);
  const [medicalCode, setMedicalCode] = useState("ICD-10-CM E11.9");
  const [codeVerified, setCodeVerified] = useState(false);
  const theme = getTrackTheme(track === "medical-coding" ? "medical-coding" : track === "software-engineering" ? "pharmacovigilance" : "medical-writing");

  const handleSimulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setCodeVerified(true);
    }, 1200);
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-white/10 bg-[#0B132B]/90 backdrop-blur-md text-slate-200 overflow-hidden shadow-2xl",
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3.5 gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Live AI Workspace
              </span>
              <span className="rounded-full bg-teal-500/20 px-2 py-0.5 font-mono text-[10px] font-medium text-teal-300 border border-teal-500/30">
                Claude Artifacts 3.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive split-screen execution canvas
            </p>
          </div>
        </div>

        {/* Track selector */}
        <div className="flex items-center gap-1.5 rounded-xl bg-black/40 p-1 border border-white/10">
          <button
            type="button"
            onClick={() => onTrackChange?.("medical-coding")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              track === "medical-coding"
                ? "bg-teal-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white",
            )}
          >
            <Stethoscope className="h-3.5 w-3.5" />
            Medical Coding
          </button>
          <button
            type="button"
            onClick={() => onTrackChange?.("software-engineering")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              track === "software-engineering"
                ? "bg-teal-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white",
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            Engineering
          </button>
          <button
            type="button"
            onClick={() => onTrackChange?.("resume-ats")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
              track === "resume-ats"
                ? "bg-teal-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white",
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            ATS Resume
          </button>
        </div>
      </div>

      {/* Workspace Secondary Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-black/20 px-5 py-2">
        <div className="flex items-center gap-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("workspace")}
            className={cn(
              "pb-1 border-b-2 transition-colors",
              activeTab === "workspace"
                ? "border-teal-400 text-teal-300 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200",
            )}
          >
            Scenario Workspace
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("radar")}
            className={cn(
              "pb-1 border-b-2 transition-colors",
              activeTab === "radar"
                ? "border-teal-400 text-teal-300 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200",
            )}
          >
            ACRI Readiness Radar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("suggestions")}
            className={cn(
              "pb-1 border-b-2 transition-colors",
              activeTab === "suggestions"
                ? "border-teal-400 text-teal-300 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200",
            )}
          >
            AI Diagnostics
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">ACRI Score:</span>
          <span className="rounded-md bg-teal-500/20 px-2 py-0.5 font-mono text-xs font-bold text-teal-300 border border-teal-500/30">
            {acriScore} / 100
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {analyzing ? (
          <div className="flex h-64 flex-col items-center justify-center">
            <AiThinkingLoader label="Thinking & auditing scenario parameters…" size="xl" variant="card" />
          </div>
        ) : activeTab === "workspace" ? (
          track === "medical-coding" ? (
            /* Medical Coding Audit Scenario */
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                    Patient Chart #8942-B · Clinical Audit
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] text-emerald-300 font-medium border border-emerald-500/30">
                    Active Audit Task
                  </span>
                </div>
                <div className="rounded-lg bg-black/40 p-3.5 font-mono text-xs leading-relaxed text-slate-300 border border-white/5">
                  <p className="text-teal-300">// Chief Complaint:</p>
                  <p>54-year-old male with type 2 diabetes mellitus without complications presenting for routine quarterly evaluation.</p>
                  <p className="mt-2 text-teal-300">// Clinical Assessment:</p>
                  <p>HbA1c 6.8%. BP 124/78 mmHg. Fasting blood glucose 110 mg/dL. No nephropathy or retinopathy reported.</p>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Select Correct ICD-10 Diagnostic Code:
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={medicalCode}
                      onChange={(e) => {
                        setMedicalCode(e.target.value);
                        setCodeVerified(false);
                      }}
                      className="flex-1 rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-xs font-mono text-white focus:border-teal-400 focus:outline-none"
                    >
                      <option value="ICD-10-CM E11.9">E11.9 - Type 2 diabetes mellitus without complications</option>
                      <option value="ICD-10-CM E11.65">E11.65 - Type 2 diabetes mellitus with hyperglycemia</option>
                      <option value="ICD-10-CM E10.9">E10.9 - Type 1 diabetes mellitus without complications</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleSimulateAnalysis}
                      className="rounded-lg bg-teal-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-teal-400 transition-colors"
                    >
                      Audit Code
                    </button>
                  </div>
                </div>

                {codeVerified && (
                  <div className="flex items-start gap-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-emerald-200 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Audit Passed: E11.9 Verified</p>
                      <p className="text-emerald-300/80 text-[11px] mt-0.5">
                        Properly mapped primary diagnosis without acute complications. +15 ACRI Domain Lift points earned.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Guidance Box */}
              <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 flex items-start gap-3">
                <Brain className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-teal-300">Arzon Copilot Pro-Tip</p>
                  <p className="text-slate-300 leading-relaxed">
                    Recruiters in hospital billing networks heavily evaluate precision on secondary complication flags. Always cross-reference HbA1c threshold levels before assigning E11.65.
                  </p>
                </div>
              </div>
            </div>
          ) : track === "resume-ats" ? (
            /* ATS Resume Scenario Canvas */
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-teal-400">
                    Live ATS Parse Confidence
                  </span>
                  <span className="rounded-full bg-teal-500/20 px-3 py-1 font-mono text-xs font-bold text-teal-300 border border-teal-500/30">
                    88% Match Rate
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Keyword Alignment</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-teal-400" style={{ width: "92%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-white">Extracted High-Impact Keywords:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["ICD-10-CM", "CPT Coding", "HIPAA Compliance", "Medical Billing", "Clinical Audit", "EHR Systems"].map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1 rounded-md bg-teal-500/10 border border-teal-500/30 px-2.5 py-1 text-[11px] font-medium text-teal-300"
                      >
                        <CheckCircle2 className="h-3 w-3 text-teal-400" />
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateAnalysis}
                  className="w-full rounded-lg bg-teal-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-teal-400 transition-colors shadow-lg"
                >
                  Generate Optimized ATS Resume PDF →
                </button>
              </div>
            </div>
          ) : (
            /* Software Engineering Scenario Canvas */
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-teal-400">
                    Interactive Code Audit Scenario
                  </span>
                  <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[11px] text-blue-300 font-medium border border-blue-500/30">
                    Level 2 Challenge
                  </span>
                </div>
                <div className="rounded-lg bg-black/60 p-3.5 font-mono text-xs text-slate-200 border border-white/10">
                  <pre className="overflow-x-auto text-teal-300">
{`// Problem: Optimizing database query latency
async function getActiveCohortUsers(cohortId: string) {
  const users = await db.query("SELECT * FROM users WHERE cohort_id = $1", [cohortId]);
  return users.filter(u => u.status === 'active');
}`}
                  </pre>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-white">AI Question:</strong> How would you optimize this query to execute filtering at the database layer rather than in memory?
                </p>
              </div>
            </div>
          )
        ) : activeTab === "radar" ? (
          /* ACRI Readiness Radar Tab */
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white text-sm">5-Dimension ACRI Benchmark</h4>
                <span className="text-xs text-teal-400 font-mono">Calibrated vs 1,420 JDs</span>
              </div>

              {[
                { dim: "Domain Depth", score: 85, color: "bg-teal-400" },
                { dim: "Problem Solving", score: 72, color: "bg-blue-400" },
                { dim: "Communication & Pitch", score: 80, color: "bg-amber-400" },
                { dim: "Execution Speed", score: 68, color: "bg-purple-400" },
                { dim: "Role Compliance", score: 90, color: "bg-emerald-400" },
              ].map((item) => (
                <div key={item.dim} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{item.dim}</span>
                    <span className="font-mono font-bold text-white">{item.score}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className={cn("h-full transition-all duration-500", item.color)} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* AI Diagnostics Tab */
          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <h4 className="font-semibold text-white text-sm">Actionable Diagnostic Feed</h4>
              <div className="space-y-2 text-xs">
                <div className="rounded-lg bg-teal-500/10 border border-teal-500/30 p-3 text-teal-200">
                  <p className="font-bold">⚡ Priority Action:</p>
                  <p className="mt-1 text-slate-300">
                    Complete 2 additional CPT procedural coding exercises to raise Execution Speed to 80+ percentile.
                  </p>
                </div>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-amber-200">
                  <p className="font-bold">💡 Recruiter Insight:</p>
                  <p className="mt-1 text-slate-300">
                    Candidates with verified ICD-10-CM accuracy receive 3.4x more recruiter interview requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

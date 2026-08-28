import React, { useState } from "react";
import { CAREER_PROFILES, type CareerPath } from "@/data/healthcareTaxonomy";
import {
  Building2, CheckCircle2, ChevronRight, DollarSign, Wrench,
  ShieldCheck, TrendingUp, X, FlaskConical, Send, Sparkles,
  BookOpen, Clock, AlertTriangle, BarChart2, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPQAEvent } from "@/lib/pqa";
import { toast } from "sonner";

interface CareerDetailInspectorProps {
  careerName: string | null;
  onClose: () => void;
  onAdvisorClick: () => void;
}

// ---------------------------------------------------------------------------
// Mini ASSAY Test — the product's signature feature, embedded in the inspector
// ---------------------------------------------------------------------------
function AssayTestBlock({ profile }: { profile: CareerPath }) {
  const [response, setResponse] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleSubmit = () => {
    if (response.trim().length < 40) {
      toast.error("Write at least 40 characters — give it a real attempt.", { duration: 3000 });
      return;
    }

    // Persist attempt to localStorage so the advisor can review before the call
    try {
      const attempts = JSON.parse(localStorage.getItem("arzon_assay_attempts") ?? "[]") as unknown[];
      attempts.push({
        roleId: profile.id,
        roleTitle: profile.title,
        response: response.trim(),
        ts: new Date().toISOString(),
      });
      localStorage.setItem("arzon_assay_attempts", JSON.stringify(attempts));
    } catch {
      // noop
    }

    trackPQAEvent("ASSAY_ATTEMPTED");
    setIsSubmitted(true);
    toast.success("ASSAY attempt saved!", {
      description: "Your advisor will review this before your call. It helps them give targeted feedback.",
      duration: 6000,
    });
  };

  if (isSubmitted) {
    return (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-[#070D1B] border border-indigo-500/50 space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
          <span className="font-mono text-xs font-bold text-indigo-300 uppercase tracking-wider">
            ASSAY Attempt Recorded
          </span>
        </div>
        <p className="text-xs font-sans text-slate-300 leading-relaxed">
          Your response has been saved. When you book an advisor session, they'll review your
          attempt <strong className="text-slate-100">before</strong> the call so they can give
          you targeted, specific feedback — not generic advice.
        </p>
        <div className="p-3 rounded-xl bg-[#0B152C] border border-slate-800 text-[11px] font-mono text-slate-400 italic">
          "{response.trim().slice(0, 120)}{response.trim().length > 120 ? "…" : ""}"
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-[#070D1B] border border-indigo-500/40 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-bold text-indigo-300 uppercase tracking-wider">
              ASSAY™ Skill-Gap Diagnostic
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[9px] font-bold border border-indigo-400/30">
              LIVE
            </span>
          </div>
          <p className="text-[11px] font-sans text-slate-400 leading-relaxed max-w-xl">
            This is the <strong className="text-slate-200">actual type of task</strong> companies
            test you on during screening for {profile.title.split(" /")[0]}. Attempt it below.
            Your advisor will review it before your call.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#0B152C] border border-indigo-500/20 space-y-1">
        <span className="font-mono text-[10px] font-bold text-indigo-400 uppercase block">Task Prompt:</span>
        <p className="text-xs font-sans text-slate-200 leading-relaxed font-medium">
          {profile.assayTest}
        </p>
      </div>

      <div className="space-y-2">
        <textarea
          value={response}
          onChange={handleChange}
          placeholder="Write your attempt here. Don't overthink it — your advisor wants to see how you approach this, not a perfect answer."
          rows={5}
          className="w-full p-4 rounded-xl bg-[#0B152C] border border-slate-700 font-sans text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-400/60 resize-none transition-colors leading-relaxed"
        />
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>{charCount} chars {charCount < 40 ? `(need ${40 - charCount} more)` : "— ready to submit"}</span>
          <span className="text-indigo-400">Reviewed by advisor before your call</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/20 cursor-pointer flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        <span>Submit ASSAY Attempt → Advisor Will Review</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Growth path visual stepper
// ---------------------------------------------------------------------------
function GrowthPathStepper({ steps }: { steps: string[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-5 bottom-5 w-px bg-gradient-to-b from-sky-500/60 via-emerald-500/40 to-transparent" />
      <div className="space-y-3 pl-10">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-10 top-0.5 w-7 h-7 rounded-full bg-[#0B152C] border-2 border-sky-500/60 flex items-center justify-center">
              <span className="font-mono text-[10px] font-bold text-sky-400">{i + 1}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#070D1B] border border-slate-800">
              <p className="font-sans text-xs text-slate-200">{step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function CareerDetailInspector({ careerName, onClose, onAdvisorClick }: CareerDetailInspectorProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "salary" | "assay">("overview");

  if (!careerName) return null;

  const profileKey = Object.keys(CAREER_PROFILES).find(
    (k) => CAREER_PROFILES[k].title.toLowerCase() === careerName.toLowerCase()
  );
  const profile: CareerPath = profileKey ? CAREER_PROFILES[profileKey] : CAREER_PROFILES.pv;

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "skills", label: "Skills & Tools", icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: "salary", label: "Salary Data", icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { id: "assay", label: "ASSAY™ Test", icon: <FlaskConical className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B152C] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 tone-dark max-h-[92vh] flex flex-col">

        {/* ── Header ── */}
        <div className="p-5 sm:p-7 bg-gradient-to-r from-[#070D1B] to-[#0C1938] border-b border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 font-mono text-[10px] font-bold uppercase">
                {profile.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {profile.activeOpeningsCount}+ Active Openings India
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-3xl font-bold text-slate-50 leading-snug">
              {profile.title}
            </h3>
            <p className="font-sans text-xs text-slate-300 max-w-2xl leading-relaxed">
              {profile.summary}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Tab Nav ── */}
        <div className="flex gap-1 px-5 sm:px-7 pt-4 shrink-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-sky-500/15 border border-sky-400/40 text-sky-300"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === "assay" && (
                <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[9px] border border-indigo-400/30">
                  NEW
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Scrollable Tab Content ── */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 font-sans text-slate-200">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <>
              {/* What Is It */}
              <div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
                  What this career actually means
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">{profile.whatItIs}</p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-sky-400" />
                  Real day-to-day responsibilities
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {profile.responsibilities.map((resp, i) => (
                    <li key={i} className="p-3 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start gap-2.5 hover:border-sky-500/30 transition-colors">
                      <ChevronRight className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span className="text-slate-200 leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Companies + Qualifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" /> Companies that hire for this role
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {profile.hiringCompanies.map((co) => (
                      <span key={co} className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:border-sky-500/30 transition-colors">
                        {co}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Degree distribution in hiring
                  </span>
                  <div className="space-y-2.5">
                    {profile.qualifications.map((q) => (
                      <div key={q.degree} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-300">{q.degree}</span>
                          <span className="font-bold text-amber-300">{q.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
                            style={{ width: `${q.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Career Growth Path */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Career progression timeline
                </span>
                <GrowthPathStepper steps={profile.growthPath} />
              </div>
            </>
          )}

          {/* ── SKILLS & TOOLS TAB ── */}
          {activeTab === "skills" && (
            <>
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Required skills (present in majority of JDs)
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.requiredSkills.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" /> Preferred skills (accelerates shortlisting)
                </span>
                <div className="flex flex-wrap gap-2">
                  {profile.preferredSkills.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs font-mono font-bold text-sky-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" /> Software tools — verified from JD analysis
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.tools.map((tool) => (
                    <div key={tool.name} className="p-4 rounded-xl bg-[#070D1B] border border-slate-800 space-y-2 hover:border-amber-400/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-emerald-400">{tool.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-400/30 text-[10px] font-mono font-bold text-amber-300">
                          {tool.frequency} JDs
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: tool.frequency }}
                        />
                      </div>
                      <p className="text-[11px] font-sans text-slate-400 leading-relaxed">{tool.relevance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── SALARY TAB ── */}
          {activeTab === "salary" && (
            <>
              <div className="p-5 rounded-2xl bg-[#070D1B] border border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> City-level compensation data (Aug 2026)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Figures in LPA (₹ Lakhs Per Annum)</span>
                </div>
                <div className="space-y-4">
                  {profile.salaryByCity.map((s) => (
                    <div key={s.city} className="space-y-2">
                      <span className="font-mono text-xs font-bold text-slate-200">{s.city}</span>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="p-3 rounded-xl bg-[#0B152C] border border-slate-800 text-center">
                          <span className="font-mono text-[10px] text-slate-400 block mb-1">Entry (0-2 yrs)</span>
                          <span className="font-mono font-bold text-slate-100">{s.entry}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B152C] border border-emerald-500/20 text-center">
                          <span className="font-mono text-[10px] text-slate-400 block mb-1">Mid (3-5 yrs)</span>
                          <span className="font-mono font-bold text-emerald-400">{s.mid}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B152C] border border-amber-500/20 text-center">
                          <span className="font-mono text-[10px] text-slate-400 block mb-1">Senior (5+ yrs)</span>
                          <span className="font-mono font-bold text-amber-400">{s.senior}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                  Salary ranges reflect published JD offers and industry benchmarks. GCC Hub
                  locations (Hyderabad, Bengaluru) typically carry a 10-15% premium for the
                  same experience level vs. smaller cities.
                </p>
              </div>
            </>
          )}

          {/* ── ASSAY TEST TAB ── */}
          {activeTab === "assay" && (
            <>
              <div className="p-4 rounded-xl bg-[#070D1B] border border-slate-800 flex items-start gap-3 mb-2">
                <FlaskConical className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-300 block mb-1">What is an ASSAY™ test?</span>
                  <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
                    ASSAY tests are derived from actual screening tasks that companies like IQVIA, Parexel,
                    and Cognizant use in their hiring process for {profile.title.split(" /")[0]}.
                    Unlike generic aptitude tests, these are role-specific practicals. Your attempt is reviewed
                    by your advisor before your 1-on-1 call — so the session is immediately useful.
                  </p>
                </div>
              </div>
              <AssayTestBlock profile={profile} />
            </>
          )}

        </div>

        {/* ── Footer Actions ── */}
        <div className="p-5 sm:p-6 bg-[#070D1B] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>
              Dataset ID:{" "}
              <span className="font-bold text-sky-300">{profile.id.toUpperCase()}-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 sm:flex-none h-11 px-5 rounded-xl border-slate-700 bg-slate-900 text-slate-300 text-xs font-mono hover:bg-slate-800 cursor-pointer"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setActiveTab("assay");
              }}
              className="flex-1 sm:flex-none h-11 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-mono text-xs font-bold cursor-pointer flex items-center gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              Try ASSAY Test
            </Button>
            <Button
              onClick={() => {
                onClose();
                onAdvisorClick();
              }}
              className="flex-1 sm:flex-none h-11 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-bold shadow-md cursor-pointer"
            >
              Talk to Expert
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

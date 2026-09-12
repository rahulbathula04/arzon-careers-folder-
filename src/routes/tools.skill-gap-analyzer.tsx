import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/tools/skill-gap-analyzer")({
  head: () => {
    const seo = pageSeo({
      path: "/tools/skill-gap-analyzer",
      title: "JD Skill Gap Analyzer · Arzon Global",
      description:
        "Paste any entry-level healthcare or life sciences job description to extract required software tools, regulatory frameworks, and identify potential skill gaps.",
    });
    return {
      meta: [{ title: "JD Skill Gap Analyzer · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: SkillGapAnalyzerComponent,
});

const KEYWORD_PATTERNS = [
  { term: "Argus Safety", category: "Pharmacovigilance Tool", courseSlug: "pharmacovigilance" },
  { term: "MedDRA", category: "Medical Dictionary", courseSlug: "pharmacovigilance" },
  { term: "ICSR", category: "PV Case Intake", courseSlug: "pharmacovigilance" },
  { term: "PSUR", category: "Aggregate Reporting", courseSlug: "pharmacovigilance" },
  { term: "PBRER", category: "Aggregate Reporting", courseSlug: "pharmacovigilance" },
  { term: "ICD-10-CM", category: "Medical Coding", courseSlug: "medical-coding" },
  { term: "CPT", category: "Procedural Coding", courseSlug: "medical-coding" },
  { term: "HCPCS", category: "Supplies Coding", courseSlug: "medical-coding" },
  { term: "AAPC", category: "Certification Standard", courseSlug: "medical-coding" },
  { term: "CPC", category: "Coding Certification", courseSlug: "medical-coding" },
  { term: "Medidata Rave", category: "EDC Platform", courseSlug: "clinical-data-management" },
  { term: "Veeva", category: "Clinical Suite / eCTD", courseSlug: "clinical-data-management" },
  { term: "CDASH", category: "CRF Standard", courseSlug: "clinical-data-management" },
  { term: "SDTM", category: "CDISC Standard", courseSlug: "sas-clinical" },
  { term: "ADaM", category: "CDISC Standard", courseSlug: "sas-clinical" },
  { term: "Base SAS", category: "Statistical Software", courseSlug: "sas-clinical" },
  { term: "PROC SQL", category: "SAS Query Language", courseSlug: "sas-clinical" },
  { term: "eCTD", category: "Regulatory Dossier", courseSlug: "regulatory-affairs" },
  { term: "CDSCO", category: "Indian Regulatory Body", courseSlug: "regulatory-affairs" },
  { term: "FDA 21 CFR", category: "Compliance Rule", courseSlug: "pharmacovigilance" },
];

function SkillGapAnalyzerComponent() {
  const [jdText, setJdText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [foundTerms, setFoundTerms] = useState<typeof KEYWORD_PATTERNS>([]);

  const handleAnalyze = () => {
    if (!jdText.trim()) return;
    const lower = jdText.toLowerCase();
    const matched = KEYWORD_PATTERNS.filter((kp) => lower.includes(kp.term.toLowerCase()));
    setFoundTerms(matched);
    setAnalyzed(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Top Header */}
      <div className="border-b border-stone-200 bg-white tone-light card-light py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-stone-700 hover:text-stone-900 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> ROLE TAXONOMY
          </Link>
          <div className="font-mono text-[10px] text-stone-500 uppercase tracking-widest hidden sm:block">
            ARZON INTERACTIVE RESEARCH TOOL
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#1B3F8B]" />
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">
              JD SKILL GAP ANALYZER
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            Parse Any Job Description to Uncover Skill Gaps
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">
            Paste the text of any fresher Drug Safety, Medical Coding, CDM, Regulatory, or SAS job description from Naukri or LinkedIn to extract key software tools, CDISC standards, and regulatory prerequisites.
          </p>
        </div>
      </header>

      {/* Main Analyzer Input & Result */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        <div className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 space-y-4 shadow-xs">
          <label className="font-mono text-xs font-bold text-stone-900 uppercase tracking-wider block">
            PASTE JOB DESCRIPTION TEXT BELOW:
          </label>
          <textarea
            rows={8}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste raw JD text from Naukri, LinkedIn India, or company careers portal..."
            className="w-full p-4 bg-[#FAF9F6] border border-stone-300 rounded-none text-xs font-sans text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-[#1B3F8B]"
          />
          <button
            onClick={handleAnalyze}
            className="w-full sm:w-auto bg-[#0B1325] text-white hover:bg-[#1B3F8B] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> PARSE JD SKILL REQUIREMENTS
          </button>
        </div>

        {analyzed && (
          <div className="space-y-6">
            <div className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                    Analysis Results: Detected Technical Prerequisites
                  </h2>
                </div>
                <span className="font-mono text-[10px] font-bold text-stone-500">
                  {foundTerms.length} MATCHING TERMS FOUND
                </span>
              </div>

              {foundTerms.length === 0 ? (
                <div className="p-6 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-sans space-y-2">
                  <div className="flex items-center gap-2 font-mono font-bold uppercase">
                    <AlertTriangle className="w-4 h-4 text-amber-700" /> NO ENTERPRISE TECHNICAL TOKENS DETECTED
                  </div>
                  <p>
                    The pasted text does not specify standard software tools (Oracle Argus, Medidata Rave, ICD-10-CM, eCTD, SAS). It may be a generic recruiter blurb.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {foundTerms.map((item, idx) => (
                    <div key={idx} className="border border-stone-200 p-4 bg-stone-50 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[9px] font-bold text-[#1B3F8B] uppercase block">
                          {item.category}
                        </span>
                        <span className="font-serif font-bold text-base text-stone-900">{item.term}</span>
                      </div>
                      <Link
                        to="/courses/$slug"
                        params={{ slug: item.courseSlug }}
                        className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 border border-emerald-300 hover:bg-emerald-100 flex items-center gap-1"
                      >
                        SYLLABUS MATCH <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#0B1325] text-white p-8 sm:p-10 border border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  ROLE READINESS REVERSE-ENGINEERING
                </span>
                <h3 className="font-serif font-bold text-2xl text-white">
                  Close Your Detected Skill Gaps With Arzon Cohort Training
                </h3>
                <p className="font-sans text-xs text-stone-300 max-w-xl">
                  Arzon reverse-engineers training modules from real JD pools to ensure you can perform the exact operational tasks recruiters demand.
                </p>
              </div>

              <Link
                to="/career-engine/start"
                className="shrink-0 bg-white tone-light text-stone-900 hover:bg-stone-100 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-white"
              >
                RUN FULL FIT DIAGNOSTIC →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

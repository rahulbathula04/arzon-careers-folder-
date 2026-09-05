import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Download,
  FileText,
  CheckCircle2,
  Copy,
  CheckCheck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  MapPin,
  Search,
  ChevronDown,
  Terminal,
  Gift,
  Calendar,
  Video,
  Award,
  BookOpen,
  Briefcase,
  ExternalLink,
  Phone,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { generateStarterKitPDF } from "@/lib/starter-kit-pdf";
import {
  STARTER_KIT_QUESTIONS,
  ARGUS_WORKFLOW_STEPS,
  RAVE_WORKFLOW_STEPS,
  ATS_KEYWORDS_DATA,
  CITY_SALARY_BENCHMARKS,
  TWELVE_WEEK_ROADMAP,
  type InterviewQuestion,
} from "@/data/starterKitData";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";
import arzonIcon from "@/assets/arzon-icon.webp";

export const Route = createFileRoute("/starter-kit")({
  head: () => {
    const title = "2026 Healthcare Career Starter Kit (Free PDF Download) | Arzon Global";
    const description =
      "Download the free 2026 Healthcare Career Starter Kit. Includes Top 20 CRO Interview Q&As, Oracle Argus vs Medidata RAVE workflow cheat-sheets, 35+ ATS keywords, and city-by-city salary benchmarks.";

    const ps = pageSeo({
      title,
      description,
      path: "/starter-kit",
    });

    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Healthcare Career Workshop", path: "/healthcare-career-workshop" },
            { name: "2026 Healthcare Career Starter Kit", path: "/starter-kit" },
          ]),
        },
      ],
    };
  },
  component: StarterKitPage,
});

function StarterKitPage() {
  const [activeTab, setActiveTab] = useState<"interview" | "software" | "keywords" | "salaries" | "roadmap">("interview");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateDegree, setCandidateDegree] = useState("");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const categories = [
    "All",
    "Pharmacovigilance & Case Safety",
    "Medical Coding & Standards",
    "Clinical Trials & GCP",
    "Aggregate Safety & Career Strategy",
  ];

  const filteredQuestions = STARTER_KIT_QUESTIONS.filter((q) => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyKeyword = (keyword: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      generateStarterKitPDF({
        candidateName: candidateName.trim() || undefined,
        degree: candidateDegree.trim() || undefined,
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B]/15 selection:text-[#0B1325]">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 h-16 bg-white/95 tone-light backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-black ring-1 ring-stone-900/10 shadow-2xs">
              <img src={arzonIcon} alt="Arzon Global" width={28} height={28} className="h-full w-full object-contain" />
            </div>
            <div className="leading-none text-left">
              <span className="font-serif text-lg font-bold text-stone-950 tracking-tight block">ARZON</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#1B3F8B] font-extrabold block">Global</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/healthcare-career-workshop"
              className="text-xs font-mono font-bold text-stone-600 hover:text-stone-950 hidden sm:inline-block transition-colors"
            >
              ← Back to Workshop Page
            </Link>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? "Generating..." : "Download Free PDF"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <section className="bg-[#0B1325] tone-dark text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 font-mono text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-blue-300" />
                <span>OFFICIAL 2026 CANDIDATE EDITION · 100% FREE DOWNLOAD</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                2026 Healthcare Career Starter Kit
              </h1>

              <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed max-w-2xl">
                The comprehensive technical &amp; placement guide for B.Pharm, Pharm.D, and Life Sciences graduates preparing for corporate roles at Novartis, IQVIA, Parexel, and Cognizant.
              </p>

              {/* Mentor Card */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/80 border border-stone-800 max-w-md">
                <div className="relative h-11 w-11 rounded-lg overflow-hidden shrink-0 border border-blue-500/30">
                  <img src={mentorKumailImg} alt="Mohamed Kumail Abbas" className="h-full w-full object-cover object-top" />
                  <span className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-black" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white font-sans">Curated by Mohamed Kumail Abbas</p>
                  <p className="text-stone-400 font-sans text-[11px]">
                    Manager, Pharmacovigilance · Former Safety Lead at Accenture &amp; Cognizant (20+ Yrs Exp)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick PDF Personalizer & Instant Download Card */}
            <div className="lg:col-span-4 bg-stone-900/90 tone-dark border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl text-left">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="font-mono text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  INSTANT PDF DISPATCH
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  7-PAGE PDF
                </span>
              </div>

              <p className="text-xs text-stone-300 font-sans">
                Want your name and qualification printed on the official cover page? Enter below (optional) and tap download.
              </p>

              <div className="space-y-3">
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Your Full Name (e.g. Rahul Sharma)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs font-sans focus:outline-none focus:border-blue-400"
                />
                <input
                  type="text"
                  value={candidateDegree}
                  onChange={(e) => setCandidateDegree(e.target.value)}
                  placeholder="Your Degree (e.g. B.Pharm / M.Sc Biotech)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs font-sans focus:outline-none focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isGeneratingPdf ? "Building PDF..." : "Download Official PDF Now"}</span>
                </button>
              </div>

              <div className="pt-2 text-[10px] font-mono text-stone-400 flex items-center justify-between">
                <span>✓ 100% Free</span>
                <span>✓ Print-Ready Format</span>
                <span>✓ Zero Spam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-b border-stone-200 bg-white tone-light py-5 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">20</span>
            <span className="text-xs text-stone-600 font-sans">Global CRO Interview Q&amp;As</span>
          </div>
          <div className="p-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">2</span>
            <span className="text-xs text-stone-600 font-sans">Enterprise Software Blueprints</span>
          </div>
          <div className="p-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">35+</span>
            <span className="text-xs text-stone-600 font-sans">ATS Resume Power Keywords</span>
          </div>
          <div className="p-3">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#1B3F8B] block">6</span>
            <span className="text-xs text-stone-600 font-sans">City Salary Benchmarks</span>
          </div>
        </div>
      </section>

      {/* ── TAB NAVIGATION ── */}
      <section className="sticky top-16 z-30 bg-stone-100/90 tone-light backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("interview")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "interview"
                ? "bg-[#0B1325] text-white shadow-xs"
                : "bg-white tone-light text-stone-600 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            1. Top 20 Interview Q&amp;As
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("software")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "software"
                ? "bg-[#0B1325] text-white shadow-xs"
                : "bg-white tone-light text-stone-600 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            2. Software Workflow Blueprint
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("keywords")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "keywords"
                ? "bg-[#0B1325] text-white shadow-xs"
                : "bg-white tone-light text-stone-600 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            3. 35+ ATS Keywords
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("salaries")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "salaries"
                ? "bg-[#0B1325] text-white shadow-xs"
                : "bg-white tone-light text-stone-600 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            4. 2026 Salary Benchmark
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("roadmap")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "roadmap"
                ? "bg-[#0B1325] text-white shadow-xs"
                : "bg-white tone-light text-stone-600 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            5. 12-Week Roadmap
          </button>
        </div>
      </section>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* TAB 1: TOP 20 INTERVIEW QUESTIONS */}
        {activeTab === "interview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                  Top 20 Global CRO Technical Interview Questions
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                  Master the exact regulatory definitions and clinical scenarios evaluated by interview panels at Novartis, IQVIA, and Parexel.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions or keywords..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 bg-white tone-light text-xs font-sans focus:outline-none focus:border-[#1B3F8B]"
                />
              </div>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#1B3F8B] text-white"
                      : "bg-white tone-light border border-stone-200 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="p-8 text-center bg-white tone-light rounded-2xl border border-stone-200 text-stone-500 font-sans text-sm">
                  No questions match your search or filter.
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const isExpanded = expandedQuestionId === q.id;
                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-stone-200 bg-white tone-light overflow-hidden shadow-2xs transition-all hover:border-stone-300 text-left"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                        className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left cursor-pointer hover:bg-stone-50/50 transition-colors"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-[#1B3F8B] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                              Question {q.id}
                            </span>
                            <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                              {q.category}
                            </span>
                          </div>
                          <h3 className="font-sans text-base sm:text-lg font-bold text-stone-900 leading-snug">
                            {q.question}
                          </h3>
                        </div>
                        <div className="p-1 rounded-lg bg-stone-100 text-stone-600 shrink-0 mt-1">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-6 sm:px-6 space-y-4 border-t border-stone-100 pt-4 bg-stone-50/40">
                          {/* Interviewer Intent */}
                          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs font-sans text-amber-900 flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold font-mono text-[11px] uppercase block">What Interviewers Are Testing:</strong>
                              <span>{q.interviewerIntent}</span>
                            </div>
                          </div>

                          {/* Model Answer */}
                          <div className="space-y-2">
                            <span className="font-mono text-xs font-bold text-stone-800 uppercase tracking-wider block">
                              High-Scoring Model Answer:
                            </span>
                            <div className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed whitespace-pre-line bg-white tone-light p-4 rounded-xl border border-stone-200">
                              {q.answer}
                            </div>
                          </div>

                          {/* Pro Tip */}
                          <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs font-sans text-[#0B1325] flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-[#1B3F8B] shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold font-mono text-[11px] uppercase block text-[#1B3F8B]">Panelist Pro-Tip:</strong>
                              <span>{q.proTip}</span>
                            </div>
                          </div>

                          {/* Keywords */}
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <span className="text-[11px] font-mono text-stone-400">Keywords:</span>
                            {q.keywords.map((kw) => (
                              <span
                                key={kw}
                                className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700 font-mono text-[10px] font-semibold"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SOFTWARE WORKFLOW BLUEPRINT */}
        {activeTab === "software" && (
          <div className="space-y-12 animate-in fade-in duration-200 text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                Enterprise Software Workflow Blueprint
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                Step-by-step technical architecture of how case processing and clinical data management function across global life sciences enterprises.
              </p>
            </div>

            {/* Oracle Argus Safety 8.4 */}
            <div className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>ORACLE ARGUS SAFETY 8.4</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-sans">
                    End-to-End Adverse Event Case Processing Lifecycle
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-stone-500">ICH-E2B(R3) Compliant</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ARGUS_WORKFLOW_STEPS.map((step) => (
                  <div key={step.stepNumber} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-[#0B1325] text-white flex items-center justify-center font-mono text-xs font-bold">
                          {step.stepNumber}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {step.sla}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-stone-900">{step.title}</h4>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed">{step.description}</p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/80 space-y-1 text-[11px] font-mono">
                      <div className="text-stone-700">
                        <span className="text-stone-400">Role:</span> {step.role}
                      </div>
                      <div className="text-emerald-700 font-semibold">
                        <span className="text-stone-400">Rule:</span> {step.complianceRule}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medidata RAVE EDC */}
            <div className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono text-xs font-bold uppercase">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>MEDIDATA RAVE EDC</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-sans">
                    Clinical Data Management &amp; Database Lock Lifecycle
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-stone-500">21 CFR Part 11 &amp; CDISC SDTM</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {RAVE_WORKFLOW_STEPS.map((step) => (
                  <div key={step.stepNumber} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-full bg-[#1B3F8B] text-white flex items-center justify-center font-mono text-xs font-bold">
                          {step.stepNumber}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {step.sla}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-stone-900">{step.title}</h4>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed">{step.description}</p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/80 space-y-1 text-[11px] font-mono">
                      <div className="text-stone-700">
                        <span className="text-stone-400">Role:</span> {step.role}
                      </div>
                      <div className="text-blue-700 font-semibold">
                        <span className="text-stone-400">Standard:</span> {step.complianceRule}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 35+ ATS RESUME KEYWORDS */}
        {activeTab === "keywords" && (
          <div className="space-y-8 animate-in fade-in duration-200 text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                35+ ATS-Optimized Keywords for Healthcare Resumes
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                Click any keyword to copy its proven action bullet point formula directly to your clipboard for LinkedIn or resume updates.
              </p>
            </div>

            {/* Keyword Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ATS_KEYWORDS_DATA.map((k) => {
                const isCopied = copiedKeyword === k.keyword;
                return (
                  <div
                    key={k.keyword}
                    className="p-4 rounded-xl border border-stone-200 bg-white tone-light space-y-3 hover:border-stone-300 shadow-2xs transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                            k.tier === "Critical"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {k.tier}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">{k.category}</span>
                      </div>
                      <h3 className="font-sans font-bold text-sm text-stone-900">{k.keyword}</h3>
                      <p className="text-xs text-stone-600 font-sans leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-200/80">
                        "{k.sampleBullet}"
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyKeyword(k.keyword, k.sampleBullet)}
                      className="w-full py-2 px-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied Bullet Point!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Copy Resume Bullet</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: 2026 SALARY BENCHMARK */}
        {activeTab === "salaries" && (
          <div className="space-y-8 animate-in fade-in duration-200 text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                2026 Healthcare Fresher Salary Benchmark &amp; City Matrix
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                Starting CTC vs. 3-year career trajectory for life sciences graduates across Tier-1 delivery centers in India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CITY_SALARY_BENCHMARKS.map((city) => (
                <div key={city.city} className="rounded-2xl border border-stone-200 bg-white tone-light p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div>
                      <h3 className="font-sans text-lg font-bold text-stone-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#1B3F8B]" />
                        {city.city}
                      </h3>
                      <span className="text-[11px] font-mono text-stone-500">{city.hubType}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
                      <span className="text-stone-500 font-sans">Fresher (0–1 Year):</span>
                      <span className="font-mono font-bold text-emerald-700">
                        ₹{city.fresherLpa[0]}L – ₹{city.fresherLpa[1]}L LPA
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
                      <span className="text-stone-500 font-sans">Mid-Level (3 Years):</span>
                      <span className="font-mono font-bold text-stone-800">
                        ₹{city.exp3yrLpa[0]}L – ₹{city.exp3yrLpa[1]}L LPA
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-100">
                      <span className="text-stone-500 font-sans">Senior Associate (5 Years):</span>
                      <span className="font-mono font-bold text-stone-800">
                        ₹{city.senior5yrLpa[0]}L – ₹{city.senior5yrLpa[1]}L LPA
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1.5">
                      <span className="text-stone-500 font-sans">Team Lead (8+ Years):</span>
                      <span className="font-mono font-bold text-[#1B3F8B]">
                        ₹{city.lead8yrLpa[0]}L – ₹{city.lead8yrLpa[1]}L LPA
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-[10px] font-mono font-bold text-stone-400 block mb-1 uppercase">Top Employers:</span>
                    <div className="flex flex-wrap gap-1">
                      {city.topEmployers.map((emp) => (
                        <span key={emp} className="text-[11px] font-sans px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {emp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: 12-WEEK ROADMAP */}
        {activeTab === "roadmap" && (
          <div className="space-y-8 animate-in fade-in duration-200 text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
                The 12-Week Zero-to-Offer Corporate Action Plan
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans mt-1">
                The step-by-step roadmap taking pharmacy &amp; life sciences freshers from baseline degree theory to signed offer letters.
              </p>
            </div>

            <div className="space-y-6">
              {TWELVE_WEEK_ROADMAP.map((phase, idx) => (
                <div
                  key={phase.weekRange}
                  className="rounded-2xl border border-stone-200 bg-white tone-light p-6 sm:p-7 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#0B1325] text-white flex items-center justify-center font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-mono text-xs font-bold text-[#1B3F8B] block">{phase.weekRange}</span>
                        <h3 className="font-sans text-base sm:text-lg font-bold text-stone-900">{phase.phaseTitle}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider block">
                      Core Milestones:
                    </span>
                    <ul className="space-y-2">
                      {phase.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs font-sans text-stone-800 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#1B3F8B] shrink-0" />
                    <div>
                      <strong className="font-mono font-bold text-[#1B3F8B] mr-1">Verified Deliverable:</strong>
                      <span>{phase.deliverables}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WORKSHOP CONVERSION FOOTER BANNER ── */}
        <section className="rounded-3xl bg-[#0B1325] tone-dark text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/15 blur-[100px] pointer-events-none" />
          <div className="relative space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>LIVE WORKING SESSION · UPCOMING WEEKEND</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Ready to See Oracle Argus Processed Live?
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
              Reading this Starter Kit gives you the theory. In our 90-minute live workshop, Mohamed Kumail Abbas will open a live enterprise screen and walk through real adverse event triage and MedDRA coding live.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/healthcare-career-workshop"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Reserve Free Workshop Seat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Again</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

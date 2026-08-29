import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RefreshCw, CheckCircle2, MapPin, Sparkles, BookOpen, Search, Zap, Check } from "lucide-react";
import { JD_PROVENANCE } from "@/data/jdProvenance";

function formatRefreshDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

type TrackTheme = {
  gradient: string;
  accent: string;
  barColor: string;
  emoji: string;
};

const TRACK_THEMES: Record<string, TrackTheme> = {
  pharmacovigilance: {
    gradient: "from-[#1d4ed8] via-[#2563eb] to-[#0ea5e9]",
    accent: "#38bdf8",
    barColor: "#38bdf8",
    emoji: "💊",
  },
  "medical-coding": {
    gradient: "from-[#c2410c] via-[#ea580c] to-[#d97706]",
    accent: "#fb923c",
    barColor: "#fb923c",
    emoji: "🩺",
  },
  "clinical-data-management": {
    gradient: "from-[#047857] via-[#059669] to-[#0d9488]",
    accent: "#34d399",
    barColor: "#34d399",
    emoji: "📊",
  },
  "sas-clinical": {
    gradient: "from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]",
    accent: "#a78bfa",
    barColor: "#a78bfa",
    emoji: "💻",
  },
  "regulatory-affairs": {
    gradient: "from-[#be185d] via-[#db2777] to-[#e11d48]",
    accent: "#f472b6",
    barColor: "#f472b6",
    emoji: "📋",
  },
  "medical-writing": {
    gradient: "from-[#1e40af] via-[#2563eb] to-[#0284c7]",
    accent: "#60a5fa",
    barColor: "#60a5fa",
    emoji: "✍️",
  },
};

const DEFAULT_THEME = TRACK_THEMES.pharmacovigilance;

export function JDMirror({
  variant: _variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const [rawJd, setRawJd] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  const handleMatchJd = () => {
    if (!rawJd.trim()) return;
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setMatchResult({
        matchedTrack: "Medical Coding & Compliance",
        acriRequired: 84,
        keySkills: ["ICD-10-CM Coding", "CPT 2026 Manual", "HIPAA Compliance", "Chart Auditing"],
        candidateMatchCount: 42,
        topCandidatePercentile: 96,
      });
    }, 1000);
  };

  return (
    <section
      id="jd-mirror"
      className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] ${className ?? ""}`}
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Interactive Instant AI JD Matcher Panel */}
        <div className="rounded-[28px] bg-white border border-stone-200/90 p-6 sm:p-8 text-[#1A1A1A] space-y-6 shadow-xl relative overflow-hidden tone-light card-light">
          {/* Top row badge & live status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-sky-50 px-3.5 py-1 font-mono text-xs font-extrabold text-[#1B3F8B] border border-sky-200 shadow-2xs inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#1B3F8B] fill-[#1B3F8B]" />
                Instant AI JD Matcher
              </span>
              <span className="text-xs text-stone-500 font-mono font-semibold">Employers &amp; Recruiters</span>
            </div>
            <span className="text-[11px] font-mono text-stone-600 font-bold bg-stone-100 border border-stone-200 px-3 py-1 rounded-full">
              LIVE ENGINE · 1,420+ PRE-VERIFIED FRESHERS
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#1A1A1A] tracking-tight leading-snug">
              Paste your raw Job Description
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed font-sans font-medium">
              Our AI parses your raw requirements, maps them across ACRI evaluation dimensions, and instantly identifies candidate match counts from the Arzon talent pool.
            </p>
          </div>

          {/* Quick Preset Sample Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-stone-400 font-bold uppercase tracking-wider">Try Sample:</span>
            {[
              { label: "Medical Coding (ICD-10/CPT)", text: "Looking for a Junior Medical Coder proficient in ICD-10-CM, CPT coding, medical terminology, and EHR audit procedures with 0-1 year experience." },
              { label: "Pharmacovigilance Safety Analyst", text: "Urgent requirement for PV Safety Analyst. Mandatory skills: ICSR case processing, MedDRA coding, Narrative writing, Argus Safety database basics." },
              { label: "Clinical Data Management", text: "Hiring CDM Trainee / Junior Data Associate. Skills needed: eCRF design, query management, CDISC SDTM standards, GCP compliance." },
            ].map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => setRawJd(sample.text)}
                className="rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 px-2.5 py-1 text-[11px] font-mono font-bold text-[#1B3F8B] transition-all cursor-pointer"
              >
                + {sample.label}
              </button>
            ))}
          </div>

          <div className="space-y-3.5">
            <textarea
              value={rawJd}
              onChange={(e) => setRawJd(e.target.value)}
              placeholder="Paste job description requirements here (e.g. Looking for a Medical Coder proficient in ICD-10-CM, CPT, and EHR audit procedures)..."
              rows={3}
              className="w-full rounded-2xl border border-stone-300 bg-stone-50 p-4 text-xs sm:text-sm font-mono text-stone-900 placeholder:text-stone-400 focus:border-[#1B3F8B] focus:bg-white focus:ring-2 focus:ring-[#1B3F8B]/20 focus:outline-none transition-all shadow-xs"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleMatchJd}
                disabled={isMatching || !rawJd.trim()}
                style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
                className="rounded-xl bg-[#1B3F8B] px-7 py-3 text-xs sm:text-sm font-extrabold text-white hover:bg-[#153270] disabled:opacity-50 transition-all shadow-lg shadow-[#1B3F8B]/20 flex items-center gap-2 cursor-pointer group"
              >
                <Zap className="h-4 w-4 fill-white transition-transform group-hover:scale-110" style={{ color: "#FFFFFF" }} />
                <span style={{ color: "#FFFFFF" }}>{isMatching ? "Matching against 1,420 candidates…" : "Analyze & Match Candidates →"}</span>
              </button>
              {rawJd.trim() && (
                <button
                  type="button"
                  onClick={() => setRawJd("")}
                  className="text-xs font-mono text-stone-500 hover:text-stone-800 underline cursor-pointer"
                >
                  Clear text
                </button>
              )}
            </div>
          </div>

          {matchResult && (
            <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-5 space-y-4 shadow-xs">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <span className="font-mono text-xs text-[#1B3F8B] uppercase tracking-wider font-extrabold">
                    Matched Track: {matchResult.matchedTrack}
                  </span>
                  <p className="text-base font-extrabold text-[#1A1A1A] mt-1">
                    {matchResult.candidateMatchCount} Candidates Eligible (Top candidate: {matchResult.topCandidatePercentile}th percentile)
                  </p>
                </div>
                <span className="rounded-lg bg-sky-100 px-3 py-1 font-mono text-xs font-extrabold text-[#1B3F8B] border border-sky-300">
                  Target ACRI: {matchResult.acriRequired}+
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 border-t border-sky-200/60">
                {matchResult.keySkills.map((sk: string) => (
                  <span key={sk} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-stone-200 px-3 py-1 text-xs font-bold text-stone-800 shadow-2xs">
                    <Check className="h-3.5 w-3.5 text-teal-600" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Header Block */}
        <div className="rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-8 max-w-3xl space-y-4 shadow-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-[#0F172A]">
            <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />
            <span className="text-[#0F172A] font-bold">THE JD MIRROR · LIVE CREDIBILITY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
            " The exact lines from real Indian JDs{" "}
            <span className="italic text-[#8A6D1F]">
              and the module we built to train for each one.
            </span>{" "}
            "
          </h2>
          <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
            Recruiters write JDs in a very specific language. We read thousands of them, extract
            what actually repeats, and turn each recurring requirement into a graded week of
            training with a real deliverable. Nothing in our syllabus is academic filler.
          </p>
        </div>

        {/* Track Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {JD_PROVENANCE.map((p) => {
            const theme = TRACK_THEMES[p.slug] ?? DEFAULT_THEME;
            const phrases = p.topJdPhrases.slice(0, 3);
            const avgCoverage = Math.round(
              (phrases.reduce((s, x) => s + x.coverage, 0) / phrases.length) * 100,
            );
            return (
              <article
                key={p.slug}
                className="flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Curved Top Gradient Banner */}
                <div
                  className={`relative bg-gradient-to-r ${theme.gradient} p-5 text-white overflow-hidden min-h-[115px] flex flex-col justify-between`}
                >
                  <div className="flex items-center gap-2 relative z-10">
                    <span className="inline-flex items-center gap-1 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                      <BookOpen className="h-2.5 w-2.5 text-[#2563EB]" />
                      <span className="text-[#0F172A]">TRACK</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/95 text-[#0F172A] px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shadow-sm">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span className="text-[#0F172A]">{avgCoverage}% match</span>
                    </span>
                  </div>

                  <div className="relative z-10 pt-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
                      {p.roleTitle}
                    </h3>
                  </div>

                  {/* Background Watermark Emoji */}
                  <span className="absolute right-2 -bottom-2 text-5xl opacity-30 select-none pointer-events-none">
                    {theme.emoji}
                  </span>
                </div>

                {/* White Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                  <div className="space-y-3">
                    {/* Stat Strip */}
                    <div className="flex items-center gap-2 text-xs text-[#475569] font-semibold">
                      <span className="font-mono font-bold text-[#0F172A]">
                        {p.jdCount.toLocaleString("en-IN")} JDs
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#334155]">
                        <MapPin className="h-3 w-3 text-[#64748B]" />
                        {p.topMetros.slice(0, 2).join(" · ")}
                      </span>
                    </div>

                    {/* Dark Slate Phrase Rows with High-Contrast Pure White Text */}
                    <ul className="space-y-2.5">
                      {phrases.map((phr) => {
                        const pct = Math.round(phr.coverage * 100);
                        return (
                          <li
                            key={phr.phrase}
                            className="tone-dark bg-[#0F172A] text-slate-100 rounded-xl p-3.5 space-y-2 shadow-sm border border-slate-800"
                          >
                            <div className="flex items-start gap-2.5">
                              <CheckCircle2
                                style={{ color: "#38bdf8" }}
                                className="h-4 w-4 shrink-0 mt-0.5 text-sky-400"
                              />
                              <p
                                style={{ color: "#F8FAFC" }}
                                className="text-xs font-bold text-[#F8FAFC] leading-snug tracking-tight"
                              >
                                "{phr.phrase}"
                              </p>
                            </div>
                            <div className="flex items-center gap-2 pt-0.5">
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%`, backgroundColor: "#38bdf8" }}
                                />
                              </div>
                              <span
                                style={{ color: "#38bdf8" }}
                                className="font-mono text-xs font-bold text-sky-300 shrink-0"
                              >
                                {pct}%
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Warm Tan Notice Banner with High-Contrast Dark Amber Text */}
                    {p.lastChange && (
                      <div className="bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] p-3 rounded-xl flex items-start gap-2 text-xs">
                        <RefreshCw className="h-3.5 w-3.5 text-[#78350F] shrink-0 mt-0.5" />
                        <span className="leading-snug text-[#78350F] font-medium">
                          <strong className="font-bold text-[#78350F]">
                            Updated {formatRefreshDate(p.lastChange.dateISO)}:
                          </strong>{" "}
                          {p.lastChange.note}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Outline Button at Bottom of Card */}
                  <div className="pt-2">
                    <Link
                      to="/courses/$slug"
                      params={{ slug: p.slug }}
                      className="text-xs h-10 px-4 w-full flex items-center justify-center gap-2 text-[#0F172A] font-bold rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <span className="text-[#0F172A]">Explore track</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#64748B]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

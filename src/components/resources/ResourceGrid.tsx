import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  X,
  FileText,
  Calendar,
  Building2,
  CheckCircle2,
  ArrowRight,
  Database,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { RESEARCH_REPORTS, type ResearchReport } from "@/data/researchReports";

type CategoryFilter = "all" | string;

export function ResourceGrid() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const list = Array.from(new Set(RESEARCH_REPORTS.map((r) => r.categoryLabel)));
    return [
      { id: "all", label: "All Research Dossiers", count: RESEARCH_REPORTS.length },
      ...list.map((cat) => ({
        id: cat,
        label: cat,
        count: RESEARCH_REPORTS.filter((r) => r.categoryLabel === cat).length,
      })),
    ];
  }, []);

  const filteredReports = useMemo(() => {
    let result = [...RESEARCH_REPORTS];

    if (selectedCategory !== "all") {
      result = result.filter((r) => r.categoryLabel === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.h1.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.answerLayer.toLowerCase().includes(q) ||
          r.executiveSummary.toLowerCase().includes(q) ||
          r.geography.toLowerCase().includes(q) ||
          r.keyTakeaways.some((k) => k.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const handleReset = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ─── CONTROLS BAR: CATEGORY TABS & SEARCH ─────────────────────────── */}
      <div className="flex flex-col gap-4 bg-[#F8FAFC]/90 p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] tone-light card-light">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-white text-[#475569] border border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#081F38] tone-light card-light"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#E4EAF2]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by topic (e.g. PV, cost, B.Pharm, coding)..."
              className="w-full rounded-xl border border-[#CBD5E1] bg-white pl-9 pr-9 py-2 text-xs sm:text-sm text-[#081F38] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/15 transition-all tone-light card-light"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#94A3B8] hover:text-[#081F38]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="hidden sm:inline-flex items-center rounded-full bg-white border border-[#E2E8F0] px-2.5 py-1 font-mono text-[11px] font-bold text-[#64748B] tone-light card-light">
            <span>{filteredReports.length} Dossiers Listed</span>
          </div>
        </div>
      </div>

      {/* ─── RESEARCH CARDS GRID ───────────────────────────────────────────── */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {filteredReports.map((report) => (
            <article
              key={report.slug}
              className="flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-7 shadow-xs hover:border-[#2563EB]/40 hover:shadow-lg transition-all group tone-light card-light relative overflow-hidden"
            >
              {/* Top Accent Gradient Line on Hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#10B981] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top Badges Bar: Category + Audited Date */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E4EAF2]">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1D4ED8] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    {report.categoryLabel}
                  </span>
                  <div className="inline-flex items-center gap-1 font-mono text-[10px] text-[#64748B]">
                    <Calendar className="h-3 w-3 text-[#94A3B8]" />
                    <span>AUDITED: {report.updatedDate}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="pt-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight group-hover:text-[#2563EB] transition-colors leading-snug">
                    <Link to="/resources/$slug" params={{ slug: report.slug }}>
                      {report.h1}
                    </Link>
                  </h3>
                </div>

                {/* Direct Executive Finding (AI Grounding Callout) */}
                <div className="mt-4 rounded-xl bg-[#EEF6FF]/80 border-l-3 border-[#2563EB] border border-[#BFDBFE] p-3.5 text-xs text-[#081F38] tone-light card-light leading-relaxed">
                  <strong className="font-mono text-[10px] uppercase font-bold text-[#1D4ED8] block mb-1">
                    EXECUTIVE RESEARCH FINDING:
                  </strong>
                  <span>{report.answerLayer}</span>
                </div>

                {/* Executive Summary */}
                <p className="mt-4 text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
                  {report.executiveSummary}
                </p>

                {/* Key Takeaways */}
                <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Empirical Highlights ({report.keyTakeaways.length})
                  </span>
                  <div className="space-y-1.5">
                    {report.keyTakeaways.slice(0, 2).map((takeaway) => (
                      <div key={takeaway} className="flex items-start gap-2 text-xs text-[#334155]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Size & Geography Metadata */}
                <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#64748B]">
                  <span>SAMPLE: <strong>{report.sampleSize}</strong></span>
                  <span>&bull;</span>
                  <span>GEO: <strong>{report.geography}</strong></span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-[#E4EAF2] flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#64748B] inline-flex items-center gap-1">
                  <Database className="h-3 w-3 text-[#2563EB]" />
                  <span>{report.dataTables.length} Data Tables</span>
                </span>
                <Link
                  to="/resources/$slug"
                  params={{ slug: report.slug }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 text-xs font-bold transition-all shadow-xs"
                >
                  <span>Read Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] tone-light card-light">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#EEF6FF] text-[#2563EB] border border-[#BFDBFE] mb-3">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#081F38]">
            No research reports match &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B] max-w-sm">
            Try adjusting your search keywords, clearing your filter, or reset all criteria to view all empirical dossiers.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2 text-xs font-bold transition-all shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset filters &amp; view all</span>
          </button>
        </div>
      )}
    </div>
  );
}

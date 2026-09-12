import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { JD_PROVENANCE } from "@/data/jdProvenance";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/tools/role-matrix")({
  head: () => {
    const seo = pageSeo({
      path: "/tools/role-matrix",
      title: "Role Requirement Matrix · Arzon Global Research",
      description:
        "Interactive matrix displaying recurring employer requirements, JD phrase frequencies, and satisfied syllabus modules across Pharmacovigilance, Medical Coding, CDM, Regulatory Affairs & SAS.",
    });
    return {
      meta: [{ title: "Role Requirement Matrix · Arzon Global Research" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: RoleMatrixComponent,
});

function RoleMatrixComponent() {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");

  const filteredProvenance = JD_PROVENANCE.filter(
    (p) => selectedTrack === "all" || p.slug === selectedTrack
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Top Header */}
      <div className="border-b border-stone-200 bg-white tone-light card-light py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/roles"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-stone-700 hover:text-stone-900 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> ROLE TAXONOMY
          </Link>
          <div className="font-mono text-[10px] text-stone-500 uppercase tracking-widest hidden sm:block">
            ARZON RESEARCH MATRIX · Q2 2026 REFRESH
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#1B3F8B]" />
            <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">
              INTERACTIVE RESEARCH MATRIX
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight">
            Employer Requirement Frequency Matrix
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed font-sans border-l-2 border-[#1B3F8B] pl-4">
            Empirical data mapping verbatim job description requirements from Naukri, LinkedIn India, and company careers portals to the reverse-engineered Arzon syllabus modules.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTrack("all")}
              className={`px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider border transition-colors ${
                selectedTrack === "all"
                  ? "bg-[#0B1325] text-white border-[#0B1325]"
                  : "bg-white tone-light text-stone-700 border-stone-300 hover:bg-stone-100"
              }`}
            >
              All Tracks ({JD_PROVENANCE.length})
            </button>
            {JD_PROVENANCE.map((p) => (
              <button
                key={p.slug}
                onClick={() => setSelectedTrack(p.slug)}
                className={`px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider border transition-colors ${
                  selectedTrack === p.slug
                    ? "bg-[#0B1325] text-white border-[#0B1325]"
                    : "bg-white tone-light text-stone-700 border-stone-300 hover:bg-stone-100"
                }`}
              >
                {p.roleTitle}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Table Matrix */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {filteredProvenance.map((prov) => (
          <section key={prov.slug} className="bg-white tone-light card-light border border-stone-300 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider">
                  ROLE TRACK: {prov.roleTitle.toUpperCase()}
                </span>
                <h2 className="font-serif font-bold text-2xl text-stone-900 mt-1">
                  {prov.roleTitle} Hiring Competencies
                </h2>
              </div>
              <div className="font-mono text-xs text-stone-600 flex flex-wrap gap-3">
                <span className="bg-stone-100 px-2 py-1 border border-stone-200 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-stone-500" /> {prov.topMetros.slice(0, 3).join(", ")}
                </span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-1 border border-emerald-200 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {prov.jdCount} JDs SAMPLED
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="border-b border-stone-300 bg-stone-50 font-mono text-[10px] font-bold uppercase tracking-wider text-stone-600">
                    <th className="py-3 px-4">Verbatim Employer Requirement</th>
                    <th className="py-3 px-4">JD Frequency Band</th>
                    <th className="py-3 px-4">Satisfied By Arzon Module</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {prov.topJdPhrases.map((phrase, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-stone-900">
                        "{phrase.phrase}"
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span className="inline-block bg-stone-100 text-stone-800 px-2 py-0.5 border border-stone-200 font-bold">
                          {phrase.coverage >= 0.8 ? "Most JDs (≥80%)" : phrase.coverage >= 0.6 ? "Many JDs (60-80%)" : "Common JDs (40-60%)"}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#1B3F8B] font-bold">
                        {phrase.satisfiedByModule || "Core Practical Drills"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {prov.lastChange && (
              <div className="pt-4 border-t border-stone-200 flex items-center gap-2 text-xs font-mono text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>SYLLABUS REFRESH ({prov.lastChange.dateISO}):</strong> {prov.lastChange.note}
                </span>
              </div>
            )}
          </section>
        ))}

        {/* Diagnostic CTA */}
        <section className="bg-[#0B1325] text-white p-8 sm:p-10 border border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              CAREER FIT DIAGNOSTIC ENGINE
            </span>
            <h3 className="font-serif font-bold text-2xl text-white">
              Evaluate Your Percentile Match Across All Matrix Requirements
            </h3>
            <p className="font-sans text-xs text-stone-300 max-w-xl">
              Take the 90-second Arzon diagnostic fit test to evaluate your competency profile against active job description metrics.
            </p>
          </div>

          <Link
            to="/career-engine/start"
            className="shrink-0 bg-white tone-light text-stone-900 hover:bg-stone-100 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-white"
          >
            START FIT TEST →
          </Link>
        </section>
      </main>
    </div>
  );
}

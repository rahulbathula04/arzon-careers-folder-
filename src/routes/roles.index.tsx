import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, ShieldCheck, Briefcase, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { CAREER_ROLES } from "@/data/careerRoles";
import { pageSeo } from "@/lib/seo";

export const Route = createFileRoute("/roles/")({
  head: () => {
    const seo = pageSeo({
      path: "/roles",
      title: "Healthcare & Life Science Role Taxonomy · Arzon Global",
      description:
        "Explore entry-level and growth role competencies for Drug Safety, Medical Coding, Clinical Data Management, Regulatory Affairs, and SAS Programming.",
    });
    return {
      meta: [{ title: "Healthcare & Life Science Role Taxonomy · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: RolesIndexComponent,
});

const FAMILIES = [
  { id: "all", label: "All Roles" },
  { id: "drug-safety", label: "Drug Safety & PV" },
  { id: "clinical-data", label: "Clinical Data & SAS" },
  { id: "regulatory", label: "Regulatory Affairs" },
  { id: "medical-coding", label: "Medical Coding" },
];

function RolesIndexComponent() {
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = CAREER_ROLES.filter((role) => {
    const matchesFamily = selectedFamily === "all" || role.familyId === selectedFamily;
    const matchesSearch =
      searchQuery.trim() === "" ||
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFamily && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B] selection:text-white pb-24">
      {/* Header Banner */}
      <section className="border-b border-stone-200 bg-white tone-light card-light py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">
              ARZON GLOBAL · INDUSTRY ROLE TAXONOMY
            </span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-stone-900 tracking-tight leading-tight max-w-4xl">
            Train for Roles, Not Courses
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-700 max-w-3xl leading-relaxed font-sans">
            Every role in the Arzon taxonomy is reverse-engineered from active entry-level job descriptions at Tier-1 Global Capability Centers, CROs, and Pharma Enterprise employers.
          </p>

          {/* Search & Filter Control Bar */}
          <div className="mt-8 pt-8 border-t border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search roles by name, skill, or tool (PV, Argus, CPC)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-stone-300 rounded-none text-xs font-sans text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-[#1B3F8B]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {FAMILIES.map((fam) => (
                <button
                  key={fam.id}
                  onClick={() => setSelectedFamily(fam.id)}
                  className={`px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider border transition-colors ${
                    selectedFamily === fam.id
                      ? "bg-[#0B1325] text-white border-[#0B1325]"
                      : "bg-white tone-light text-stone-700 border-stone-300 hover:bg-stone-100"
                  }`}
                >
                  {fam.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Roles Listing Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-8">
          <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#1B3F8B]" />
            Role Competency Directory
          </h2>
          <span className="font-mono text-[11px] font-bold text-stone-500">
            {filteredRoles.length} ROLES IDENTIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => {
            const roleSlugClean = role.slug.split(".").pop() || role.slug;
            return (
              <div
                key={role.slug}
                className="bg-white tone-light card-light border border-stone-300 p-6 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold text-[#1B3F8B] uppercase tracking-wider border border-stone-200 bg-stone-50 px-2 py-0.5">
                      {role.seniority.toUpperCase()} LEVEL
                    </span>
                    {role.evidence && (
                      <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {role.evidence.jdCount} JDs SAMPLED
                      </span>
                    )}
                  </div>

                  <Link
                    to="/roles/$slug"
                    params={{ slug: roleSlugClean }}
                    className="group"
                  >
                    <h3 className="font-serif font-bold text-xl text-stone-900 group-hover:text-[#1B3F8B] transition-colors leading-snug">
                      {role.name}
                    </h3>
                  </Link>

                  <p className="mt-3 font-sans text-xs text-stone-700 leading-relaxed line-clamp-3">
                    {role.blurb}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                    <div className="font-mono text-[10px] text-stone-500 uppercase tracking-wider">
                      PRIMARY SKILLS DEMANDED:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="font-mono text-[9px] text-stone-600 bg-stone-100 px-1.5 py-0.5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-stone-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {role.topCompanies.slice(0, 2).join(", ")}
                  </span>
                  <Link
                    to="/roles/$slug"
                    params={{ slug: roleSlugClean }}
                    className="font-mono text-xs font-bold text-stone-900 hover:text-[#1B3F8B] uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    COMPETENCY PROFILE <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Diagnostic Panel */}
        <section className="mt-16 bg-[#0B1325] text-white p-8 sm:p-12 border border-stone-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> COMPETENCY FIT ENGINE
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Measure Your Percentile Match Against Live Role Competencies
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              The Arzon Career Engine evaluates your educational background, analytical skills, and technical software familiarity against entry-level job descriptions.
            </p>
          </div>

          <Link
            to="/career-engine/start"
            className="shrink-0 bg-white tone-light text-stone-900 hover:bg-stone-100 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border border-white"
          >
            RUN DIAGNOSTIC FIT TEST →
          </Link>
        </section>
      </main>
    </div>
  );
}

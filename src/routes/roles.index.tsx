import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, ShieldCheck, Briefcase, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { CAREER_ROLES } from "@/data/careerRoles";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

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
    <div className="arzon-v2-page min-h-screen bg-white tone-light text-[var(--arzon-ink)] pb-24">
      <ArzonV2PageHero
        eyebrow="CAREER INTELLIGENCE · ROLE DIRECTORY"
        title="Compare the work before you choose the programme."
        description="Browse healthcare and life-sciences roles by function, seniority and core skills. Use each competency profile to understand what employers ask for, then check your readiness."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">
            Start Career Assessment <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="arzon-v2-button-secondary">
            Explore Programmes
          </Link>
        </div>
      </ArzonV2PageHero>

      <section className="border-b border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] tone-light">
        <div className="arzon-v2-container py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--arzon-ink-muted)]" />
              <input
                type="text"
                placeholder="Search role, skill or tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[var(--arzon-border)] bg-white px-10 py-3 text-sm text-[var(--arzon-ink)] outline-none placeholder:text-[var(--arzon-ink-muted)] focus:border-[var(--arzon-blue-600)] focus:ring-2 focus:ring-[var(--arzon-blue-600)]/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {FAMILIES.map((fam) => (
                <button
                  key={fam.id}
                  type="button"
                  onClick={() => setSelectedFamily(fam.id)}
                  className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${selectedFamily === fam.id
                    ? "border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] text-white"
                    : "border-[var(--arzon-border)] bg-white text-[var(--arzon-ink-soft)] hover:bg-[var(--arzon-surface-blue)]"
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
      <main className="arzon-v2-container py-12 sm:py-16">
        <div className="flex items-center justify-between border-b border-[var(--arzon-border)] pb-3 mb-8">
          <h2 className="font-serif font-bold text-xl text-[var(--arzon-ink)] flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[var(--arzon-blue-700)]" />
            Role Competency Directory
          </h2>
          <span className="font-mono text-[11px] font-bold text-[var(--arzon-ink-muted)]">
            {filteredRoles.length} ROLES IDENTIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => {
            const roleSlugClean = role.slug.split(".").pop() || role.slug;
            return (
              <div
                key={role.slug}
                className="bg-white tone-light card-light border border-[var(--arzon-border)] p-6 flex flex-col justify-between hover:border-[#1B3F8B] transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold text-[var(--arzon-blue-700)] uppercase tracking-wider border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] px-2 py-0.5">
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
                    <h3 className="font-serif font-bold text-xl text-[var(--arzon-ink)] group-hover:text-[var(--arzon-blue-700)] transition-colors leading-snug">
                      {role.name}
                    </h3>
                  </Link>

                  <p className="mt-3 font-sans text-xs text-[var(--arzon-ink-soft)] leading-relaxed line-clamp-3">
                    {role.blurb}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[var(--arzon-border)] space-y-2">
                    <div className="font-mono text-[10px] text-[var(--arzon-ink-muted)] uppercase tracking-wider">
                      PRIMARY SKILLS DEMANDED:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="font-mono text-[9px] text-[var(--arzon-ink-soft)] bg-[var(--arzon-surface-blue)] px-1.5 py-0.5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--arzon-border)] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[var(--arzon-ink-muted)] flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {role.topCompanies.slice(0, 2).join(", ")}
                  </span>
                  <Link
                    to="/roles/$slug"
                    params={{ slug: roleSlugClean }}
                    className="font-mono text-xs font-bold text-[var(--arzon-ink)] hover:text-[var(--arzon-blue-700)] uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    COMPETENCY PROFILE <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Diagnostic Panel */}
        <section className="mt-16 bg-[var(--arzon-navy-950)] text-white p-8 sm:p-12 border border-stone-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> COMPETENCY FIT ENGINE
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              See which role path deserves a closer look.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              The Arzon Career Engine evaluates your educational background, analytical skills, and technical software familiarity against entry-level job descriptions.
            </p>
          </div>

          <Link
            to="/career-engine"
            className="arzon-v2-button-secondary shrink-0 bg-white text-[var(--arzon-ink)]"
          >
            START CAREER ASSESSMENT →
          </Link>
        </section>
      </main>
    </div>
  );
}

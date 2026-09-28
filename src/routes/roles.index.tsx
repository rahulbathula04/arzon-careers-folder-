import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Building2, CheckCircle2, Search } from "lucide-react";
import { CAREER_ROLES } from "@/data/careerRoles";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

export const Route = createFileRoute("/roles/")({
  head: () => {
    const seo = pageSeo({
      path: "/roles",
      title: "Healthcare & Life Science Role Taxonomy · Arzon Global",
      description:
        "Explore healthcare and life-science roles, core skills, tools, employer context and readiness requirements.",
    });
    return {
      meta: [{ title: "Healthcare & Life Science Role Taxonomy · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: RolesIndexComponent,
});

const FAMILIES = [
  { id: "all", label: "All roles" },
  { id: "drug-safety", label: "Drug safety & PV" },
  { id: "clinical-data", label: "Clinical data & SAS" },
  { id: "regulatory", label: "Regulatory affairs" },
  { id: "medical-coding", label: "Medical coding" },
];

function RolesIndexComponent() {
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = CAREER_ROLES.filter((role) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      (selectedFamily === "all" || role.familyId === selectedFamily) &&
      (!query ||
        role.name.toLowerCase().includes(query) ||
        role.blurb.toLowerCase().includes(query) ||
        role.skills.some((skill) => skill.toLowerCase().includes(query)))
    );
  });

  return (
    <div className="arzon-v2-page min-h-screen pb-20">
      <ArzonV2PageHero
        eyebrow="CAREER INTELLIGENCE · ROLE DIRECTORY"
        title="Compare the work before you choose the programme."
        description="Explore the roles, skills, tools and employer context behind healthcare and life-science careers. Start with the work, then decide how to prepare."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-button-primary">
            Find my career path <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="arzon-button-secondary">Explore programmes</Link>
        </div>
      </ArzonV2PageHero>

      <section className="tone-light border-y border-[var(--arzon-border)] bg-white">
        <div className="arzon-v2-container py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative block max-w-xl flex-1">
              <span className="sr-only">Search roles</span>
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--arzon-ink-muted)]" />
              <input
                type="search"
                placeholder="Search a role or skill"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="tone-light h-11 w-full rounded-lg border border-[var(--arzon-border)] bg-white pl-10 pr-3 text-sm text-[var(--arzon-ink-strong)] outline-none placeholder:text-[var(--arzon-ink-muted)] focus:border-[var(--arzon-blue-600)] focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:pb-0">
              {FAMILIES.map((family) => (
                <button
                  key={family.id}
                  type="button"
                  onClick={() => setSelectedFamily(family.id)}
                  className={[
                    "min-h-10 shrink-0 rounded-lg border px-3 text-sm font-semibold transition",
                    selectedFamily === family.id
                      ? "border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] text-white"
                      : "border-[var(--arzon-border)] bg-white text-[var(--arzon-ink-soft)] hover:bg-[var(--arzon-surface)]",
                  ].join(" ")}
                >
                  {family.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="arzon-v2-container py-10 sm:py-14">
        <div className="flex flex-col gap-2 border-b border-[var(--arzon-border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="arzon-v2-data-label">ROLE DIRECTORY</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--arzon-ink-strong)]">
              {filteredRoles.length} roles to explore
            </h2>
          </div>
          <p className="text-sm text-[var(--arzon-ink-muted)]">
            Select a role to see the requirements and preparation path.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredRoles.map((role) => {
            const slug = role.slug.split(".").pop() || role.slug;
            return (
              <article key={role.slug} className="arzon-v2-card flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-md bg-[var(--arzon-blue-100)] px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--arzon-blue-700)]">
                    {role.seniority} level
                  </span>
                  {role.evidence && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--arzon-success)]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {role.evidence.jdCount} JDs
                    </span>
                  )}
                </div>

                <Link to="/roles/$slug" params={{ slug }} className="group mt-4">
                  <h3 className="text-xl font-bold leading-tight text-[var(--arzon-ink-strong)] group-hover:text-[var(--arzon-blue-700)]">
                    {role.name}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--arzon-ink-soft)]">
                  {role.blurb}
                </p>

                <div className="mt-5 border-t border-[var(--arzon-border)] pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
                    Common skills
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {role.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="rounded-md bg-[var(--arzon-surface)] px-2 py-1 text-xs text-[var(--arzon-ink-soft)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--arzon-border)] pt-4">
                  <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-[var(--arzon-ink-muted)]">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{role.topCompanies.slice(0, 2).join(", ")}</span>
                  </span>
                  <Link
                    to="/roles/$slug"
                    params={{ slug }}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--arzon-blue-700)]"
                  >
                    View role <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {filteredRoles.length === 0 && (
          <div className="arzon-v2-card mt-6 p-8 text-center">
            <Briefcase className="mx-auto h-8 w-8 text-[var(--arzon-ink-muted)]" />
            <h2 className="mt-3 text-lg font-bold text-[var(--arzon-ink-strong)]">No roles found</h2>
            <p className="mt-1 text-sm text-[var(--arzon-ink-soft)]">Try another role name, skill or family.</p>
          </div>
        )}

        <section className="mt-12 rounded-[var(--arzon-radius-xl)] bg-[var(--arzon-navy-950)] p-6 text-white sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200">NEXT STEP</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Not sure which role to explore?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Start the free career assessment and use your result to decide which role profiles deserve a closer look.
            </p>
          </div>
          <Link to="/career-engine" className="tone-light arzon-button-secondary mt-6 shrink-0 bg-white text-[var(--arzon-ink-strong)] hover:bg-slate-100 lg:mt-0">
            Find my career path <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}

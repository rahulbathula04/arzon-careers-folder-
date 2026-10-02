import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Building2, CheckCircle2, Search } from "lucide-react";
import { CAREER_ROLES } from "@/data/careerRoles";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

export const Route = createFileRoute("/roles/")({
  head: () => {
    const seo = pageSeo({
      path: "/roles",
      title: "60 Healthcare & Life Science Career Paths · Arzon Global",
      description:
        "Explore 60 healthcare and life-science career paths across drug safety, clinical data, regulatory affairs, medical coding, health analytics and commercial healthcare, with skills, tools and preparation context.",
    });
    return {
      meta: [{ title: "Healthcare & Life Science Role Taxonomy · Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: RolesIndexComponent,
});

const ROLE_IMAGES: Record<string, string> = {
  "drug-safety": "/images/pv-clinical-workstation.jpg",
  "clinical-data": "/images/pv-career-graduate.jpg",
  "regulatory": "/images/bpharm-female-graduate-hero.jpg",
  "medical-coding": "/images/bpharm-male-graduate.jpg",
};

const FAMILIES = [
  { id: "all", label: "All roles" },
  { id: "drug-safety", label: "Drug safety & PV" },
  { id: "clinical-data", label: "Clinical data & SAS" },
  { id: "regulatory", label: "Regulatory affairs" },
  { id: "medical-coding", label: "Medical coding & HIM" },
  { id: "health-analytics-ai", label: "Health analytics & AI" },
  { id: "commercial-healthcare", label: "Commercial healthcare" },
];

function RolesIndexComponent() {
  const [selectedFamily, setSelectedFamily] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const reduceMotion = useReducedMotion();

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
        title={<>See the work before you <span className="text-blue-300">choose the programme.</span></>}
        description="Follow the same candidate journey from the homepage: understand the work, compare the requirements, then decide what preparation makes sense."
        imageSrc="/images/bpharm-female-graduate-hero.jpg"
        imageAlt="Healthcare graduate exploring career roles"
        statLabel="ROLE DIRECTORY"
        statValue={filteredRoles.length + " roles"}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-button-primary">
            Find my career path <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses" className="arzon-button-secondary bg-white/95">Explore programmes</Link>
        </div>
      </ArzonV2PageHero>

      <section className="arzon-v2-proof-strip">
        <div className="arzon-v2-container arzon-v2-proof-grid">
          <RoleProof value={String(CAREER_ROLES.length)} label="Role profiles" />
          <RoleProof value="JD-linked" label="Common skills" />
          <RoleProof value="Employer" label="Context included" />
          <RoleProof value="Role-first" label="Preparation paths" />
        </div>
      </section>

      <section className="border-b border-[var(--arzon-border)] bg-white tone-light">
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
                className="h-11 w-full rounded-lg border border-[var(--arzon-border)] bg-white tone-light pl-10 pr-3 text-sm text-[var(--arzon-ink-strong)] outline-none placeholder:text-[var(--arzon-ink-muted)] focus:border-[var(--arzon-blue-600)] focus:ring-2 focus:ring-blue-100"
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
                      : "border-[var(--arzon-border)] bg-white tone-light text-[var(--arzon-ink-soft)] hover:bg-[var(--arzon-surface)]",
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
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-[var(--arzon-ink-strong)]">{filteredRoles.length} roles to explore</h2>
          </div>
          <p className="text-sm text-[var(--arzon-ink-muted)]">Select a role to see the requirements and preparation path.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredRoles.map((role, index) => {
            const slug = role.slug.split(".").pop() || role.slug;
            const image = ROLE_IMAGES[role.familyId] ?? "/images/bpharm-female-graduate-hero.jpg";
            return (
              <motion.article
                key={role.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.025, 0.18) }}
                className="group overflow-hidden rounded-[1.75rem] border border-[var(--arzon-border)] bg-white tone-light shadow-[0_15px_45px_-30px_rgba(7,21,47,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(7,21,47,0.45)]"
              >
                <Link to="/roles/$slug" params={{ slug }} className="block">
                  <div className="relative overflow-hidden bg-[var(--arzon-navy-950)]">
                    <img src={image} alt="" className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--arzon-navy-950)]/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
                      <span className="rounded-full border border-white/15 bg-black/20 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm">{role.seniority} level</span>
                      {role.evidence && <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" />{role.evidence.jdCount} JDs</span>}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--arzon-blue-700)]">{role.familyId.replace("-", " ")}</p>
                        <h3 className="mt-2 font-serif text-2xl leading-tight text-[var(--arzon-ink-strong)] transition-colors group-hover:text-[var(--arzon-blue-700)]">{role.name}</h3>
                      </div>
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--arzon-border)] transition group-hover:bg-[var(--arzon-navy-950)] group-hover:text-white"><ArrowRight className="h-4 w-4" /></span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{role.blurb}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {role.skills.slice(0, 3).map((skill) => <span key={skill} className="rounded-full bg-[var(--arzon-surface)] px-2.5 py-1 text-[11px] text-[var(--arzon-ink-soft)]">{skill}</span>)}
                    </div>
                    <div className="mt-5 flex items-center gap-2 border-t border-[var(--arzon-border)] pt-4 text-[11px] text-[var(--arzon-ink-muted)]">
                      <Building2 className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{role.topCompanies.slice(0, 2).join(" · ")}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
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

        <section className="relative mt-12 overflow-hidden rounded-[var(--arzon-radius-xl)] bg-[var(--arzon-navy-950)] p-6 text-white sm:p-8 lg:min-h-64">
          <img src="/images/bpharm-female-graduate-hero.jpg" alt="" className="absolute inset-y-0 right-0 hidden h-full w-2/5 object-cover object-top opacity-55 lg:block" />
          <div className="relative max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-200">NEXT STEP</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Not sure which role to explore?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Start the free career assessment and use your result to decide which role profiles deserve a closer look.</p>
            <Link to="/career-engine" className="tone-light arzon-button-secondary mt-6 bg-white tone-light text-[var(--arzon-ink-strong)] hover:bg-slate-100">Find my career path <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function RoleProof({ value, label }: { value: string; label: string }) {
  return <div className="arzon-v2-proof-item"><span className="text-sm font-extrabold text-[var(--arzon-ink-strong)]">{value}</span><span className="text-[10px] font-semibold text-slate-500">{label}</span></div>;
}

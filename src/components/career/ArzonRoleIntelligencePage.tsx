import { ArrowRight, BarChart3, Building2, CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CAREER_ROLES, type CareerRole } from "@/data/careerRoles";

const FAMILY_IMAGES: Record<string, string> = {
  "drug-safety": "/images/pv-clinical-workstation.jpg",
  "clinical-data": "/images/pv-career-graduate.jpg",
  regulatory: "/images/bpharm-female-graduate-hero.jpg",
  "medical-coding": "/images/bpharm-male-graduate.jpg",
  "health-analytics-ai": "/images/pv-career-graduate.jpg",
  "commercial-healthcare": "/images/bpharm-female-graduate-hero.jpg",
};

export function ArzonRoleIntelligencePage({
  role,
  courseSlug,
  provenance,
}: {
  role: CareerRole;
  courseSlug: string;
  provenance: { refreshedOn: string; topJdPhrases: Array<{ phrase: string; satisfiedByModule?: string | null }> } | null;
}) {
  const assessmentSearch = { role: role.slug.split(".").pop() ?? role.slug };
  const relatedRoles = CAREER_ROLES
    .filter((item) => item.slug !== role.slug && (item.familyId === role.familyId || item.pathSlug === role.pathSlug))
    .slice(0, 6);
  const heroImage = FAMILY_IMAGES[role.familyId] ?? "/images/bpharm-female-graduate-hero.jpg";
  const employers = role.topCompanies.slice(0, 8);
  const requirements = role.skills.slice(0, 8);
  const eligibility = role.eligibility?.required?.slice(0, 4) ?? [];
  const certifications = role.certifications?.slice(0, 4) ?? [];
  const cleanRoleSlug = role.slug.split(".").pop() ?? role.slug;

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F7F3EC] text-[#07152F]">
      <section className="relative overflow-hidden bg-[#07152F] text-white">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover opacity-30" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/45" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            <Link to="/roles" className="hover:text-white">Roles</Link><ChevronRight className="h-3 w-3" />{role.name}
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.68fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-200 backdrop-blur-md">
                {role.familyId.replaceAll("-", " ")} · {role.seniority} level
              </span>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6.2rem)] leading-[0.88] tracking-[-0.045em]">
                {role.name}
                <br /><span className="italic text-blue-200">from the inside.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">{role.blurb}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/career-engine/start" search={assessmentSearch} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">
                  Check my fit <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/courses/$slug" params={{ slug: courseSlug }} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-md">
                  View preparation <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5">
              <img src={heroImage} alt={role.name} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2">
                <Metric label="Demand signal" value={role.demandIndia || "—"} />
                <Metric label="JD evidence" value={role.evidence ? String(role.evidence.jdCount) + "+" : "—"} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[68px] z-30 border-b border-[#07152F]/10 bg-[#F7F3EC]/90 backdrop-blur-xl sm:top-[76px]">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-5 sm:px-8">
          {[
            ["Overview", "#overview"],
            ["Market", "#market"],
            ["Skills", "#skills"],
            ["Evidence", "#evidence"],
            ["Related roles", "#related"],
          ].map(([label, href]) => <a key={href} href={href} className="shrink-0 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#07152F]/50 hover:text-[#07152F]">{label}</a>)}
        </div>
      </nav>

      <section id="overview" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">01 · THE WORK</p>
            <h2 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">What does a {role.name} actually do?</h2>
            <p className="mt-5 text-sm leading-7 text-[#07152F]/62">{role.blurb}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {requirements.slice(0, 4).map((skill) => (
              <div key={skill} className="rounded-[1.5rem] border border-[#07152F]/10 bg-white p-5 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E8EEF6] text-[#2F5F8F]"><Wrench className="h-4 w-4" /></span>
                <h3 className="mt-5 text-sm font-bold">{skill}</h3>
                <p className="mt-2 text-xs leading-5 text-[#07152F]/52">A capability commonly associated with this role profile.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="market" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">02 · MARKET CONTEXT</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">The signals behind the role.</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F7F3EC] px-4 py-2 text-xs font-semibold text-[#07152F]/55"><BarChart3 className="h-4 w-4" /> Evidence-led, not a placement guarantee</span>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <MetricCard label="JD evidence" value={role.evidence ? String(role.evidence.jdCount) + "+" : "Not available"} />
            <MetricCard label="Entry salary band" value={role.salary ? "₹" + role.salary.entry.min + "–" + role.salary.entry.max + " LPA" : "Not available"} />
            <MetricCard label="Employer examples" value={employers.length ? String(employers.length) + "+" : "Not available"} />
          </div>

          {employers.length ? (
            <div className="mt-6 rounded-[2rem] border border-[#07152F]/10 bg-[#F7F3EC] p-6 sm:p-8">
              <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[#2F5F8F]" /><p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#07152F]/50">COMPANIES REPRESENTED IN THE ROLE DATASET</p></div>
              <div className="mt-5 flex flex-wrap gap-2">{employers.map((company) => <span key={company} className="rounded-full border border-[#07152F]/10 bg-white px-4 py-2 text-xs font-semibold text-[#07152F]/70">{company}</span>)}</div>
            </div>
          ) : null}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">03 · REQUIREMENTS</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">What to build before you apply.</h2>
            <p className="mt-5 text-sm leading-7 text-[#07152F]/60">Use these signals as a checklist for your own preparation. Individual employers may ask for different qualifications.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {requirements.map((skill, index) => (
              <div key={skill} className="flex items-center gap-4 rounded-2xl border border-[#07152F]/10 bg-white p-4 shadow-sm">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#07152F] font-mono text-[9px] font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <InfoPanel title="Common eligibility" icon={ShieldCheck} items={eligibility.length ? eligibility : ["Check each employer's job description for current eligibility requirements."]} />
          <InfoPanel title="Credentials / evidence" icon={Sparkles} items={certifications.length ? certifications : ["Projects and demonstrated skills can complement formal qualifications."]} />
        </div>
      </section>

      <section id="evidence" className="bg-[#07152F] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">04 · EVIDENCE</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[0.95] sm:text-6xl">See the requirement trail before you choose preparation.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">Where job-description provenance is available, Arzon maps common phrases back to the preparation path. Missing evidence is shown as missing — not invented.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">ROLE SNAPSHOT</p>
              <p className="mt-3 font-serif text-3xl">{role.name}</p>
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs"><span className="text-white/45">Seniority</span><span className="font-semibold capitalize">{role.seniority}</span></div>
                <div className="flex justify-between text-xs"><span className="text-white/45">Path</span><span className="font-semibold">{role.pathSlug}</span></div>
                <div className="flex justify-between text-xs"><span className="text-white/45">Dataset refresh</span><span className="font-semibold">{provenance?.refreshedOn ?? "Not available"}</span></div>
              </div>
            </div>
          </div>

          {provenance?.topJdPhrases?.length ? (
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {provenance.topJdPhrases.map((item) => (
                <div key={item.phrase} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <p className="mt-3 text-sm font-semibold text-white/85">{item.phrase}</p>
                  {item.satisfiedByModule ? <p className="mt-2 text-xs text-white/45">Mapped to: {item.satisfiedByModule}</p> : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-sm text-white/55">Role evidence is currently being sourced for this profile.</div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/career-engine/start" search={assessmentSearch} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Check my fit <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/courses/$slug" params={{ slug: courseSlug }} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-bold text-white">See preparation <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section id="related" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">05 · ADJACENT PATHS</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Compare nearby roles.</h2></div>
          <Link to="/roles" className="inline-flex items-center gap-2 text-sm font-semibold text-[#07152F]/60 hover:text-[#07152F]">All roles <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedRoles.map((item) => {
            const slug = item.slug.split(".").pop() ?? item.slug;
            return (
              <Link key={item.slug} to="/roles/$slug" params={{ slug }} className="group rounded-[1.5rem] border border-[#07152F]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#07152F]/40">{item.seniority}</span><ArrowRight className="h-4 w-4 text-[#07152F]/30 transition group-hover:translate-x-1" /></div>
                <h3 className="mt-4 font-serif text-2xl">{item.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#07152F]/55">{item.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#F7F3EC] px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-white ring-1 ring-[#07152F]/10">
          <div className="grid lg:grid-cols-[1fr_0.7fr]">
            <div className="p-8 sm:p-12">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">YOUR NEXT MOVE</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[0.95] sm:text-5xl">Don’t buy a programme before you understand the role.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#07152F]/60">Take the free Career Engine with this role pre-selected, then use the result to inspect your preparation gap.</p>
              <Link to="/career-engine/start" search={assessmentSearch} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#07152F] px-6 text-sm font-bold text-white">Start with {role.name} <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="relative min-h-[300px]">
              <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-8 text-center text-[10px] text-[#07152F]/35 sm:px-8">Role profile: {cleanRoleSlug}</div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/15 bg-[#07152F]/65 p-4 backdrop-blur-md"><p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/40">{label}</p><p className="mt-2 text-sm font-bold capitalize">{value}</p></div>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[1.5rem] border border-[#07152F]/10 bg-[#F7F3EC] p-6"><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#07152F]/40">{label}</p><p className="mt-3 font-serif text-3xl">{value}</p></div>;
}

function InfoPanel({ title, icon: Icon, items }: { title: string; icon: typeof ShieldCheck; items: string[] }) {
  return <div className="rounded-[1.75rem] border border-[#07152F]/10 bg-white p-6"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-[#2F5F8F]" /><p className="text-sm font-bold">{title}</p></div><div className="mt-4 space-y-2">{items.map((item) => <div key={item} className="flex gap-2 text-sm leading-6 text-[#07152F]/60"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-700" />{item}</div>)}</div></div>;
}

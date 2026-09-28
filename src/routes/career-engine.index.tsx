import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Target } from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { CAREER_ROLES } from "@/data/careerRoles";
import { SITE } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { trackCEFunnelStep, trackCECtaClicked } from "@/lib/careerEngineAnalytics";

const ROLE_FAMILIES = [
  { id: "drug-safety", label: "Drug safety", image: "/images/pv-clinical-workstation.jpg", copy: "Case processing, safety review and pharmacovigilance work." },
  { id: "medical-coding", label: "Medical coding", image: "/images/bpharm-male-graduate.jpg", copy: "Clinical documentation, coding standards and claims workflows." },
  { id: "clinical-data", label: "Clinical data", image: "/images/pv-career-graduate.jpg", copy: "Data cleaning, validation and clinical-trial operations." },
  { id: "regulatory", label: "Regulatory affairs", image: "/images/bpharm-female-graduate-hero.jpg", copy: "Submissions, compliance and health-authority workflows." },
];

export const Route = createFileRoute("/career-engine/")({
  head: () => {
    const ps = pageSeo({
      path: "/career-engine",
      title: "Career Engine · Find roles worth exploring | Arzon Global",
      description: "A free role-first career assessment that helps you understand which healthcare paths and preparation gaps are worth exploring.",
      image: SITE.ogImages.careerEngine,
    });
    return {
      meta: [{ title: "Career Engine · Arzon Global" }, ...ps.meta],
      links: ps.links,
      scripts: [{ type: "application/ld+json", children: breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Career Engine", path: "/career-engine" }]) }],
    };
  },
  component: CareerEngineLanding,
});

function CareerEngineLanding() {
  useEffect(() => { trackCEFunnelStep({ step: "interested" }); }, []);
  const onCta = (target: string) => () => trackCECtaClicked({ step: "interested", target });

  return (
    <CareerShell>
      <main className="min-h-screen overflow-x-clip bg-[#F7F3EC] text-[#07152F]">
        <section className="relative overflow-hidden bg-[#07152F] text-white">
          <div className="absolute inset-0">
            <img src="/images/bpharm-female-graduate-hero.jpg" alt="" className="h-full w-full object-cover opacity-30" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/40" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200 backdrop-blur-md"><ShieldCheck className="h-3.5 w-3.5" /> Free · role-first assessment</span>
                <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6.3rem)] leading-[0.88] tracking-[-0.045em]">Stop choosing courses.<br /><span className="italic text-blue-200">Start understanding roles.</span></h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">Answer a short set of career questions. Arzon maps your signals to role paths, shows what to investigate next, and keeps the programme decision until after the career decision.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/career-engine/start" onClick={onCta("career_fit_primary")} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Start my free career plan <ArrowRight className="h-4 w-4" /></Link>
                  <Link to="/roles" onClick={onCta("browse_roles")} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-bold backdrop-blur-md">Explore roles</Link>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">{["~6 minutes", "Role signals", "Skill gaps", "No placement promise"].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-semibold text-white/55">{item}</span>)}</div>
              </div>
              <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5">
                <img src="/images/bpharm-female-graduate-hero.jpg" alt="Healthcare graduate exploring a career path" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" />
                <div className="absolute left-5 right-5 top-5 rounded-2xl border border-white/10 bg-[#07152F]/65 p-4 backdrop-blur-md">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-200">CAREER SIGNAL</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">{["Fit", "Gap", "Path"].map((item, i) => <div key={item} className="rounded-xl bg-white/[0.07] p-3"><span className="block h-1.5 rounded-full bg-white/25"><span className="block h-full rounded-full bg-emerald-300" style={{ width: \`\${52 + i * 14}%\` }} /></span><p className="mt-2 text-[9px] font-bold text-white/55">{item}</p></div>)}</div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-[#07152F]/70 p-4 backdrop-blur-md"><p className="text-sm font-semibold">Your report is guidance — not a hiring or placement decision.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="max-w-3xl"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">WHAT THE ENGINE DOES</p><h2 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">Four questions before you spend money.</h2></div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["01", "Where are you starting?", "Your degree, stream and current stage."],
              ["02", "What kind of work fits?", "Work-style and role-interest signals."],
              ["03", "What needs building?", "Capability gaps worth investigating."],
              ["04", "What next?", "A role path and preparation route to inspect."],
            ].map(([number, title, copy]) => <div key={number} className="rounded-[1.5rem] border border-[#07152F]/10 bg-white p-5 shadow-sm"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#07152F] font-mono text-[9px] font-bold text-white">{number}</span><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-2 text-xs leading-5 text-[#07152F]/55">{copy}</p></div>)}
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">ROLE LANDSCAPE</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">See the work before the test.</h2></div><Link to="/roles" className="inline-flex items-center gap-2 text-sm font-bold text-[#2F5F8F]">Open all roles <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {ROLE_FAMILIES.map((family) => {
                const roles = CAREER_ROLES.filter((r) => r.familyId === family.id).slice(0, 3);
                return <article key={family.id} className="overflow-hidden rounded-[2rem] border border-[#07152F]/10 bg-[#F7F3EC]"><div className="relative h-64 overflow-hidden bg-[#07152F]"><img src={family.image} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 text-white"><p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-blue-200">CAREER FAMILY</p><h3 className="mt-2 font-serif text-3xl">{family.label}</h3></div></div><div className="p-6"><p className="text-sm leading-6 text-[#07152F]/60">{family.copy}</p><div className="mt-5 space-y-2">{roles.map((role) => { const slug = role.slug.split(".").pop() ?? role.slug; return <Link key={role.slug} to="/roles/$slug" params={{ slug }} className="flex items-center justify-between rounded-xl border border-[#07152F]/10 bg-white px-4 py-3 text-xs font-semibold hover:border-[#2F5F8F]/40">{role.name}<ArrowRight className="h-3.5 w-3.5 text-[#07152F]/30" /></Link>; })}</div></div></article>;
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"><div className="overflow-hidden rounded-[2.5rem] bg-[#07152F] text-white"><div className="grid lg:grid-cols-[1fr_0.7fr]"><div className="p-8 sm:p-12"><Target className="h-6 w-6 text-blue-200" /><h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[0.95] sm:text-5xl">Your report should answer one thing: what should I investigate next?</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/60">You get a role signal, the drivers behind it, watch-outs, and a preparation route. It is designed to support a decision — not replace one.</p><Link to="/career-engine/start" onClick={onCta("career_fit_bottom")} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Start my assessment <ArrowRight className="h-4 w-4" /></Link></div><div className="relative min-h-[300px]"><img src="/images/pv-clinical-workstation.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/20 to-transparent" /></div></div></div></section>
      </main>
    </CareerShell>
  );
}

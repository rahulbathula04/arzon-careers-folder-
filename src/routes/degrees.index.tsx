import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { DEGREE_PATHWAYS } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";

const DEGREE_IMAGES: Record<string, string> = {
  "b-pharm": "/images/bpharm-female-graduate-hero.jpg",
  "pharm-d": "/images/bpharm-male-graduate.jpg",
  "m-pharm": "/images/pv-clinical-workstation.jpg",
  "life-sciences": "/images/pv-career-graduate.jpg",
};

export const Route = createFileRoute("/degrees/")({
  head: () => {
    const seo = pageSeo({
      path: "/degrees",
      title: "Degree to Career Pathways in Healthcare | Arzon Global",
      description: "See which healthcare roles, skills and preparation tracks align with your degree.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Degree to Career Pathways | Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Arzon Degree-to-Career Pathways",
          numberOfItems: DEGREE_PATHWAYS.length,
          itemListElement: DEGREE_PATHWAYS.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.degreeName,
            url: \`https://arzoncareers.in/degrees/\${d.slug}\`,
          })),
        }),
      }],
    };
  },
  component: DegreesIndex,
});

function DegreesIndex() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#F7F3EC] text-[#07152F]">
      <section className="relative overflow-hidden bg-[#07152F] text-white">
        <div className="absolute inset-0">
          <img src="/images/bpharm-students-group.jpg" alt="" className="h-full w-full object-cover opacity-30" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">DEGREE → CAREER</p>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6.3rem)] leading-[0.88] tracking-[-0.045em]">
                Your degree is the start.
                <br /><span className="italic text-blue-200">The role is the destination.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">Explore the role families connected to your qualification, then inspect the skills, work and preparation behind each path.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/career-engine" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Get my career plan <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/roles" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-bold">Explore roles</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-md">
              <img src="/images/bpharm-students-group.jpg" alt="Healthcare students reviewing career options" className="h-64 w-full object-cover opacity-80" loading="lazy" />
              <div className="grid grid-cols-3 gap-2 p-4">
                <Stat value={String(DEGREE_PATHWAYS.length)} label="degree paths" />
                <Stat value="Role-first" label="decision" />
                <Stat value="Free" label="career engine" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">CHOOSE YOUR STARTING POINT</p>
          <h2 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">See what can happen after your qualification.</h2>
          <p className="mt-5 text-sm leading-7 text-[#07152F]/60">These are pathways to explore, not guarantees of eligibility or employment. Open a degree to inspect the role map and preparation options.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {DEGREE_PATHWAYS.map((degree, index) => {
            const image = DEGREE_IMAGES[degree.slug] ?? "/images/bpharm-female-graduate-hero.jpg";
            return (
              <Link
                key={degree.slug}
                to="/degrees/$slug"
                params={{ slug: degree.slug }}
                className="group overflow-hidden rounded-[2rem] border border-[#07152F]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-45px_rgba(7,21,47,0.45)]"
              >
                <div className="relative h-64 overflow-hidden bg-[#07152F]">
                  <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading={index < 2 ? "eager" : "lazy"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/15 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-blue-200">QUALIFICATION</span>
                      <h3 className="mt-2 font-serif text-3xl">{degree.degreeName}</h3>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur-md"><ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F7F3EC] px-3 py-1.5 text-[10px] font-bold text-[#07152F]/55">{degree.typicalDuration}</span>
                    <span className="rounded-full bg-[#F7F3EC] px-3 py-1.5 text-[10px] font-bold text-[#07152F]/55">{degree.eligibleRoles.length} role paths</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#07152F]/58">{degree.overview}</p>
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {degree.eligibleRoles.slice(0, 4).map((role) => (
                      <div key={role.roleSlug + role.roleName} className="flex items-start gap-2 text-xs font-semibold text-[#07152F]/65">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /> {role.roleName}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2F5F8F]">Open pathway <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#07152F] text-white">
          <div className="grid lg:grid-cols-[1fr_0.65fr]">
            <div className="p-8 sm:p-12">
              <GraduationCap className="h-6 w-6 text-blue-200" />
              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[0.95] sm:text-5xl">Your qualification tells us where you started. The Career Engine helps you inspect where to go next.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">Use the free assessment after exploring your degree pathway. Your result is guidance, not a hiring or placement guarantee.</p>
              <Link to="/career-engine" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Start my career plan <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="relative min-h-[300px]">
              <img src="/images/pv-clinical-workstation.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3"><p className="font-serif text-lg">{value}</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/40">{label}</p></div>;
}

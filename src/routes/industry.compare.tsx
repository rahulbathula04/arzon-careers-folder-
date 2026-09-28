import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { ROLES } from "@/data/industry/roles";
import { pageSeo } from "@/lib/seo";
import type { AIRisk, Demand, RoleProfile } from "@/data/industry/types";

export const Route = createFileRoute("/industry/compare")({
  component: ComparePage,
  head: () => {
    const ps = pageSeo({
      path: "/industry/compare",
      title: "PV vs Coding vs CDM vs RA vs AI Health - compare careers",
      description:
        "Side-by-side comparison of healthcare careers in India: pay ranges, demand, AI risk, work mode, abroad markets and top employers. JD-derived, refreshed quarterly.",
    });
    return {
      meta: [{ title: "Compare healthcare careers - PV, Coding, CDM, RA, AI Health" }, ...ps.meta],
      links: ps.links,
    };
  },
});

const DEMAND_TONE: Record<Demand, string> = {
  "Very High": "bg-accent-glow/15 text-eyebrow ring-1 ring-accent-glow/30",
  High: "bg-accent-glow/15 text-eyebrow ring-1 ring-accent-glow/30",
  Steady: "bg-white/10 text-white/75 ring-1 ring-white/15",
};

const AIRISK_TONE: Record<AIRisk, string> = {
  resistant: "bg-accent-glow/15 text-eyebrow ring-1 ring-accent-glow/30",
  audit: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30",
  augmented: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30",
};

const AIRISK_LABEL: Record<AIRisk, string> = {
  resistant: "Resistant",
  audit: "Audit-protected",
  augmented: "Augmented",
};

function topCity(r: RoleProfile) {
  return r.pay[0];
}

function ComparePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#F7F3EC] text-[#07152F]">
      <section className="relative overflow-hidden bg-[#07152F] text-white">
        <div className="absolute inset-0">
          <img src="/images/pv-career-graduate.jpg" alt="" className="h-full w-full object-cover opacity-30" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/45" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">CAREER INTELLIGENCE · COMPARE</p>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6.3rem)] leading-[0.88] tracking-[-0.045em]">
                Compare the work.
                <br /><span className="italic text-blue-200">Then choose what to explore.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                Put healthcare career families side by side across demand signals, pay bands, work mode, AI posture and employer context.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/career-engine" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Find my career path <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/roles" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-bold">Browse role profiles</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-md">
              <img src="/images/pv-career-graduate.jpg" alt="" className="h-52 w-full object-cover opacity-80" loading="lazy" />
              <div className="p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-blue-200">WHAT YOU CAN COMPARE</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {["Demand", "Pay bands", "AI posture", "Work mode"].map((item) => <span key={item} className="rounded-xl bg-white/[0.06] p-3 text-xs font-semibold text-white/75">{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["01", "Demand", "See the documented demand signal for each role family."],
            ["02", "Work", "Compare work mode, language expectations and fit context."],
            ["03", "Economics", "Inspect salary bands by experience and hiring city."],
          ].map(([number, title, copy]) => (
            <div key={number} className="rounded-[1.5rem] border border-[#07152F]/10 bg-white p-5 shadow-sm">
              <span className="font-mono text-[9px] font-bold text-[#2F5F8F]">{number}</span>
              <h2 className="mt-3 font-serif text-2xl">{title}</h2>
              <p className="mt-2 text-xs leading-5 text-[#07152F]/55">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 hidden overflow-hidden rounded-[2rem] border border-[#07152F]/10 bg-white shadow-[0_25px_70px_-45px_rgba(7,21,47,0.45)] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#07152F]/10 bg-[#F7F3EC]">
                  <th className="sticky left-0 z-10 bg-[#F7F3EC] px-5 py-4 font-mono text-[9px] uppercase tracking-[0.16em] text-[#07152F]/45">Dimension</th>
                  {ROLES.map((r) => <th key={r.slug} className="min-w-[170px] px-5 py-4 align-top"><Link to="/industry/$role" params={{ role: r.slug }} className="font-serif text-xl hover:text-[#2F5F8F]">{r.name}</Link><span className="mt-1 block text-[10px] text-[#07152F]/40">{r.shortName}</span></th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#07152F]/10">
                {[
                  ["Demand", (r: RoleProfile) => <span className="rounded-full bg-[#E8EEF6] px-2.5 py-1 text-[10px] font-bold text-[#2F5F8F]">{r.demand}</span>],
                  ["AI posture", (r: RoleProfile) => <span className="rounded-full bg-[#F7F3EC] px-2.5 py-1 text-[10px] font-bold text-[#07152F]/60">{AIRISK_LABEL[r.aiRisk]}</span>],
                  ["Top hiring city", (r: RoleProfile) => <span className="text-[#07152F]/65">{topCity(r).city}</span>],
                  ["Fresher pay", (r: RoleProfile) => <span className="font-semibold">₹{topCity(r).fresher[0]}–{topCity(r).fresher[1]} LPA</span>],
                  ["2–3 yrs", (r: RoleProfile) => <span className="font-semibold">₹{topCity(r).midY3[0]}–{topCity(r).midY3[1]} LPA</span>],
                  ["4–6 yrs", (r: RoleProfile) => <span className="font-semibold">₹{topCity(r).seniorY5[0]}–{topCity(r).seniorY5[1]} LPA</span>],
                  ["7+ yrs", (r: RoleProfile) => <span className="font-bold">₹{topCity(r).leadY8[0]}–{topCity(r).leadY8[1]} LPA</span>],
                  ["Work mode", (r: RoleProfile) => <span className="text-[#07152F]/65">{r.workMode}</span>],
                  ["English bar", (r: RoleProfile) => <span className="text-[#07152F]/65">{r.englishNeeded}</span>],
                  ["Who fits", (r: RoleProfile) => <span className="text-xs leading-5 text-[#07152F]/55">{r.who}</span>],
                  ["Top employers", (r: RoleProfile) => <span className="text-xs leading-5 text-[#07152F]/55">{r.topEmployers.slice(0,3).join(", ")}</span>],
                ].map(([label, render]) => (
                  <tr key={String(label)}>
                    <th className="sticky left-0 z-10 bg-white px-5 py-4 font-mono text-[9px] uppercase tracking-[0.12em] text-[#07152F]/40">{String(label)}</th>
                    {ROLES.map((r) => <td key={r.slug} className="px-5 py-4 align-top">{(render as (role: RoleProfile) => React.ReactNode)(r)}</td>)}
                  </tr>
                ))}
                <tr>
                  <th className="sticky left-0 z-10 bg-white px-5 py-4" />
                  {ROLES.map((r) => <td key={r.slug} className="px-5 py-4"><Link to="/industry/$role" params={{ role: r.slug }} className="inline-flex items-center gap-1 text-xs font-bold text-[#2F5F8F]">Open profile <ArrowRight className="h-3.5 w-3.5" /></Link></td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {ROLES.map((r) => {
            const p = topCity(r);
            return (
              <article key={r.slug} className="overflow-hidden rounded-[1.75rem] border border-[#07152F]/10 bg-white shadow-sm">
                <div className="relative h-44 overflow-hidden bg-[#07152F]">
                  <img src="/images/pv-career-graduate.jpg" alt="" className="h-full w-full object-cover opacity-60" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <div><p className="font-serif text-2xl">{r.name}</p><p className="text-[10px] text-white/50">{r.shortName} · {p.city}</p></div>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold">{r.demand}</span>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 text-xs">
                  <dt className="text-[#07152F]/40">Fresher</dt><dd className="text-right font-semibold">₹{p.fresher[0]}–{p.fresher[1]} LPA</dd>
                  <dt className="text-[#07152F]/40">2–3 yrs</dt><dd className="text-right font-semibold">₹{p.midY3[0]}–{p.midY3[1]} LPA</dd>
                  <dt className="text-[#07152F]/40">4–6 yrs</dt><dd className="text-right font-semibold">₹{p.seniorY5[0]}–{p.seniorY5[1]} LPA</dd>
                  <dt className="text-[#07152F]/40">7+ yrs</dt><dd className="text-right font-bold">₹{p.leadY8[0]}–{p.leadY8[1]} LPA</dd>
                  <dt className="text-[#07152F]/40">Work mode</dt><dd className="text-right">{r.workMode}</dd>
                  <dt className="text-[#07152F]/40">AI posture</dt><dd className="text-right">{AIRISK_LABEL[r.aiRisk]}</dd>
                </dl>
                <div className="border-t border-[#07152F]/10 p-5"><Link to="/industry/$role" params={{ role: r.slug }} className="inline-flex items-center gap-2 text-sm font-bold text-[#2F5F8F]">Open {r.shortName} profile <ArrowRight className="h-4 w-4" /></Link></div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#07152F]/10 bg-white p-6 sm:p-8">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#07152F]/40">READING THE DATA</p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#07152F]/55">
            Pay shown is for each role's top hiring city. Bands are presented as market context rather than an individual salary guarantee. Use the role pages for the underlying dimensions and current evidence notes.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/industry/salaries" search={{ city: "all", exp: "fresher", role: "all" }} className="rounded-full border border-[#07152F]/10 bg-[#F7F3EC] px-4 py-2 text-xs font-bold">City-by-city pay tables</Link>
            <Link to="/industry/employers" search={{ city: "all", role: "all", tier: "all" }} className="rounded-full border border-[#07152F]/10 bg-[#F7F3EC] px-4 py-2 text-xs font-bold">Employer grid</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <th
        scope="row"
        className="sticky left-0 z-10 bg-[#0A0E1A] px-4 py-3 text-left text-micro font-medium uppercase tracking-wide text-white/50 align-top"
      >
        {label}
      </th>
      {children}
    </tr>
  );
}

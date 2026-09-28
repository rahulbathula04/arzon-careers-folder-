import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, X } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

type Value = string | boolean;
type Row = { feature: string; arzon: Value; typical: Value; selfStudy: Value };

const ROWS: Row[] = [
  { feature: "Role-first career guidance", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Structured cohort", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Practical projects", arzon: true, typical: "Varies", selfStudy: "Self-managed" },
  { feature: "Mentor / support layer", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Readiness assessment", arzon: true, typical: "Varies", selfStudy: false },
  { feature: "Career preparation", arzon: true, typical: "Varies", selfStudy: "Self-managed" },
  { feature: "Healthcare role focus", arzon: true, typical: "Usually broader", selfStudy: "Topic dependent" },
  { feature: "Portfolio / evidence work", arzon: true, typical: "Varies", selfStudy: "Depends on learner" },
];

export const Route = createFileRoute("/courses/compare")({
  head: () => {
    const ps = pageSeo({
      path: "/courses/compare",
      title: "Compare programme approaches · Arzon Global",
      description: "Compare role-focused programme elements with common online learning and self-study approaches.",
      image: "/og/internships.jpg",
    });
    return { meta: [{ title: "Compare programme approaches · Arzon Global" }, ...ps.meta], links: ps.links };
  },
  component: ComparePage,
});

function Cell({ value }: { value: Value }) {
  if (value === true) return <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700"><Check className="h-4 w-4" /> Included</span>;
  if (value === false) return <span className="inline-flex items-center gap-1.5 text-[#07152F]/35"><X className="h-4 w-4" /> Not inherent</span>;
  return <span className="text-[#07152F]/55">{value}</span>;
}

function ComparePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#F7F3EC] text-[#07152F]">
      <section className="relative overflow-hidden bg-[#07152F] text-white">
        <div className="absolute inset-0">
          <img src="/images/bpharm-female-graduate-hero.jpg" alt="" className="h-full w-full object-cover opacity-30" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/90 to-[#07152F]/45" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">COMPARE · BEFORE YOU CHOOSE</p>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,6.3rem)] leading-[0.88] tracking-[-0.045em]">
                Compare the system.
                <br /><span className="italic text-blue-200">Not the brochure.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">Look at what surrounds the learning: role direction, practical work, support, assessment and evidence. Then decide what matters for your own career path.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/career-engine" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Get my career plan <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/courses" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-bold backdrop-blur-md">Browse programmes</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-md">
              <img src="/images/bpharm-female-graduate-hero.jpg" alt="Healthcare graduate" className="h-52 w-full object-cover opacity-80" loading="lazy" />
              <div className="p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-blue-200">THE DECISION</p>
                <p className="mt-2 font-serif text-2xl">First understand the role. Then compare preparation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArzonDecisionHub
        eyebrow="START WITH CONTEXT"
        title="A comparison is useful after you know what you need."
        description="Use the Career Engine or role directory first. Return here when you want to inspect the structure around a learning option."
        primaryLabel="Find my career path"
        primaryTo="/career-engine"
        secondaryLabel="Explore roles"
        secondaryTo="/roles"
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F5F8F]">SIDE-BY-SIDE</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">What is actually included?</h2>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-[#07152F]/10 bg-white shadow-[0_25px_70px_-45px_rgba(7,21,47,0.4)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#07152F]/10 bg-[#F7F3EC]">
                  <th className="px-6 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#07152F]/45">Programme element</th>
                  <th className="px-6 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#2F5F8F]">Arzon</th>
                  <th className="px-6 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#07152F]/45">Typical online programme</th>
                  <th className="px-6 py-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#07152F]/45">Self-study</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-[#07152F]/10 last:border-0">
                    <th className="px-6 py-5 font-semibold text-[#07152F]">{row.feature}</th>
                    <td className="px-6 py-5"><Cell value={row.arzon} /></td>
                    <td className="px-6 py-5"><Cell value={row.typical} /></td>
                    <td className="px-6 py-5"><Cell value={row.selfStudy} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {["Understand the role", "Identify the gap", "Build evidence"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-[#07152F]/10 bg-white p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#07152F] font-mono text-[9px] font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-sm font-bold">{item}</p>
              <p className="mt-1 text-xs leading-5 text-[#07152F]/50">A useful decision stage before enrolment.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#07152F] text-white">
          <div className="grid lg:grid-cols-[1fr_0.72fr]">
            <div className="p-8 sm:p-12">
              <CheckCircle2 className="h-6 w-6 text-emerald-300" />
              <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-[0.96] sm:text-5xl">Make the next click about your career, not the sales page.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">Use the free assessment, inspect the role requirements and only then review a preparation programme.</p>
              <Link to="/career-engine" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#07152F]">Start the Career Engine <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="relative min-h-[280px]">
              <img src="/images/pv-clinical-workstation.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

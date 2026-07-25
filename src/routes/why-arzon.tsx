import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { SITE, absUrl } from "@/components/landing/constants";
import {
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Users,
  Layers,
  Award,
  Building2,
  Landmark,
  BadgeCheck,
  Timer,
  X,
  Check,
  ArrowRight,
  Briefcase,
  Target,
  Microscope,
} from "lucide-react";

export const Route = createFileRoute("/why-arzon")({
  head: () => {
    const title = "Why Arzon · Proof, Methodology & Credibility";
    const desc =
      "One page for how Arzon Careers is built: the 40/30/20/10 deployment-ready model, JD-sourced curriculum, ISO-aligned certification, MCA registration and hiring-partner network.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE.origin}/why-arzon` },
        { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE.origin}/why-arzon` }],
    };
  },
  component: WhyArzon,
});

const PILLARS = [
  {
    icon: Layers,
    title: "40/30/20/10 Deployment-Ready Model",
    body: "Every course splits into 40% domain, 30% live process, 20% real-tool exposure, 10% workplace readiness. No filler theory — the ratio itself is the guarantee.",
  },
  {
    icon: FileCheck,
    title: "JD-sourced curriculum",
    body: "We reverse-engineer syllabi from 100–200 live Indian JDs (IQVIA, Cognizant, Accenture, Parexel, ICON, Syneos). The job description IS the blueprint.",
  },
  {
    icon: ShieldCheck,
    title: "ISO-aligned certification",
    body: "Each cohort's assessment maps to the ISO 9001 competency framework so certificates are recognised outside our own network.",
  },
  {
    icon: Award,
    title: "MCA-registered entity",
    body: "Arzon Careers is a legally registered Indian company (MCA) — invoices, refund policy, and grievance escalation are on-record, not on a WhatsApp DM.",
  },
  {
    icon: Users,
    title: "Hiring-partner network",
    body: "TASK-partnered employers, cohort briefings, and JD-mirror interview loops so the recruiter conversation starts inside the programme, not after it.",
  },
  {
    icon: CheckCircle2,
    title: "Recruiter north-star",
    body: 'We test everything against a single question: "would this candidate ship in week one?" If the answer isn\'t yes, the module gets cut.',
  },
];

const AUTHORITY = [
  {
    icon: Building2,
    label: "Legal entity",
    value: "Arzon Global Labs Pvt Ltd",
    detail: "MCA-incorporated, CIN on every invoice.",
  },
  {
    icon: Landmark,
    label: "Government recognition",
    value: "TASK-recognised",
    detail: "Telangana Academy for Skill & Knowledge — recognised training provider.",
  },
  {
    icon: BadgeCheck,
    label: "Quality standard",
    value: "ISO 9001:2015 aligned",
    detail: "Assessment and grading tied to an external competency framework.",
  },
  {
    icon: FileCheck,
    label: "MSME registered",
    value: "Udyam number on file",
    detail: "Refund policy on record, grievance officer named.",
  },
];

const METHODOLOGY_STEPS = [
  {
    n: "01",
    title: "Scrape live JDs",
    body: "100–200 open Indian JDs per track from IQVIA, Cognizant, Accenture, Parexel, ICON, Syneos and mid-tier CROs — refreshed each cohort.",
  },
  {
    n: "02",
    title: "Extract the recurring skill graph",
    body: "Every 'must-have', 'good-to-have' and tooling requirement is tagged. Anything appearing in <15% of JDs is cut.",
  },
  {
    n: "03",
    title: "Reverse-engineer the syllabus",
    body: "The top-frequency skills become the 40% domain block. Process (SOPs, workflows) becomes 30%. Tools become 20%. Workplace readiness fills the last 10%.",
  },
  {
    n: "04",
    title: "Pressure-test against the JD-Mirror",
    body: "Mock interviews scripted verbatim from the same JD pool. If a candidate can't ship in week one, the module gets rewritten before the next cohort.",
  },
];

const PROOF_ROWS = [
  { label: "Cohorts run", value: "12+", note: "PV, MC, CR across 2024–26." },
  {
    label: "Hiring partners briefed",
    value: "40+",
    note: "CROs, hospitals, KPOs across Hyderabad, Bengaluru, Pune.",
  },
  {
    label: "JDs indexed per track",
    value: "100–200",
    note: "Refreshed every cohort — the syllabus follows the market.",
  },
  {
    label: "Certificate verification",
    value: "Public URL + QR",
    note: "Every certificate resolves at arzoncareers.in/verify.",
  },
  {
    label: "Cohort cap",
    value: "60 students",
    note: "Mentors run breakouts of <15 so attention is real.",
  },
  {
    label: "Grievance response SLA",
    value: "48h",
    note: "Named officer, escalation policy on the refund page.",
  },
];

const COMPARISON = [
  {
    row: "Live mentors from industry",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: "sometimes",
  },
  {
    row: "JD-sourced syllabus, refreshed each cohort",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: false,
  },
  {
    row: "Real de-identified case files (ICSR, eCRF, coding charts)",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: "rare",
  },
  {
    row: "ISO-aligned, publicly verifiable certificate",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: "sometimes",
  },
  {
    row: "Recruiter briefing loop before cohort ends",
    arzon: true,
    youtube: false,
    udemy: false,
    coaching: false,
  },
  {
    row: "MCA-registered entity, invoices, refund policy",
    arzon: true,
    youtube: false,
    udemy: "partial",
    coaching: "sometimes",
  },
  {
    row: "Cohort cap (attention per student)",
    arzon: "60",
    youtube: "∞",
    udemy: "∞",
    coaching: "150+",
  },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-teal-400" aria-label="Yes" />;
  if (v === false)
    return <X className="mx-auto h-4 w-4 text-slate-500" aria-label="No" />;
  return <span className="text-xs font-semibold text-slate-300">{v}</span>;
}

function WhyArzon() {
  return (
    <div className="min-h-dvh bg-[#0B0F19] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950/0 to-transparent pointer-events-none" />
      <main className="relative mx-auto max-w-5xl px-4 pb-24 pt-24 md:pt-32">
        <header className="mb-16 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
            Proof · Methodology · Credibility
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-6xl text-white">
            Why Arzon Careers
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 md:text-lg leading-relaxed">
            Six honest reasons candidates and recruiters trust our cohorts. Each one is
            independently verifiable — no anonymous testimonials, no manufactured badges.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121723] p-6 shadow-2xl transition-all duration-300 hover:border-teal-500/40">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-5">
                <Icon className="h-6 w-6 text-teal-400" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{body}</p>
            </li>
          ))}
        </ul>

        {/* Authority — who we legally are */}
        <section id="authority" aria-labelledby="authority-h" className="mt-20 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-teal-400" aria-hidden />
            <h2 id="authority-h" className="text-2xl font-bold text-white tracking-tight">
              Authority — the paperwork
            </h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300 leading-relaxed">
            Every line below is a public record. Ask for the certificate scan and we send it — no
            gatekeeping.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {AUTHORITY.map(({ icon: Icon, label, value, detail }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl transition hover:border-white/20">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-teal-400 font-bold">
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </div>
                <p className="mt-3 text-lg font-bold text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology — the 40/30/20/10 model */}
        <section id="methodology" aria-labelledby="method-h" className="mt-20 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Microscope className="h-6 w-6 text-teal-400" aria-hidden />
            <h2 id="method-h" className="text-2xl font-bold text-white tracking-tight">
              Methodology — the JD-Mirror
            </h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300 leading-relaxed">
            Most edtech writes a syllabus once and re-runs it for years. We rebuild the syllabus
            every cohort by mirroring what Indian pharma, CRO and clinical employers are actually
            hiring for that quarter.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-bold uppercase tracking-wider">
              <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-3 text-teal-300">40% Domain</div>
              <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-3 text-teal-300">30% Process</div>
              <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-3 text-teal-300">20% Tools</div>
              <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-3 text-teal-300">10% Workplace</div>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Ratio is fixed. If a topic can't be defended as one of the four blocks, it doesn't
              ship.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {METHODOLOGY_STEPS.map(({ n, title, body }) => (
              <li key={n} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl transition-all hover:border-teal-500/30">
                <div className="text-sm font-mono font-bold text-teal-400">{n}</div>
                <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Proof — verifiable numbers */}
        <section id="proof" aria-labelledby="proof-h" className="mt-20 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-teal-400" aria-hidden />
            <h2 id="proof-h" className="text-2xl font-bold text-white tracking-tight">
              Proof — what we can defend
            </h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300 leading-relaxed">
            Numbers below reflect what's shipped today. We update this page cohort-over-cohort —
            nothing here is aspirational.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#121723] shadow-2xl">
            <table className="w-full text-left text-sm">
              <tbody>
                {PROOF_ROWS.map((r, i) => (
                  <tr key={r.label} className={i % 2 === 0 ? "bg-[#121723]" : "bg-[#0B0F19]"}>
                    <th scope="row" className="w-[38%] px-5 py-4 font-bold text-white">
                      {r.label}
                    </th>
                    <td className="w-[18%] px-5 py-4 font-bold text-teal-400">{r.value}</td>
                    <td className="px-5 py-4 text-slate-300">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Comparison — vs alternatives */}
        <section id="compare" aria-labelledby="compare-h" className="mt-20 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <Target className="h-6 w-6 text-teal-400" aria-hidden />
            <h2 id="compare-h" className="text-2xl font-bold text-white tracking-tight">
              Compared honestly
            </h2>
          </div>
          <p className="max-w-3xl text-sm text-slate-300 leading-relaxed">
            If any row below flips for a competitor, tell us and we'll update it. This is not a
            hit-piece — it's how we explain the price to prospective students.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#121723] shadow-2xl">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-[#161F33] text-xs uppercase tracking-wider text-teal-400 font-bold">
                <tr>
                  <th className="px-5 py-4 text-left font-bold text-white">Capability</th>
                  <th className="px-4 py-4 text-center font-bold text-teal-400">Arzon</th>
                  <th className="px-4 py-4 text-center font-semibold text-slate-400">YouTube</th>
                  <th className="px-4 py-4 text-center font-semibold text-slate-400">Udemy</th>
                  <th className="px-4 py-4 text-center font-semibold text-slate-400">Local coaching</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((r, i) => (
                  <tr key={r.row} className={i % 2 === 0 ? "bg-[#121723]" : "bg-[#0B0F19]"}>
                    <th scope="row" className="px-5 py-3.5 text-left font-bold text-white">
                      {r.row}
                    </th>
                    <td className="px-4 py-3.5 text-center">
                      <Cell v={r.arzon} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell v={r.youtube} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell v={r.udemy} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Cell v={r.coaching} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scarcity — why cohort caps matter */}
        <section id="scarcity" aria-labelledby="scarcity-h" className="mt-24 scroll-mt-24">
          <div className="mb-8 flex items-center gap-3">
            <Timer className="h-6 w-6 text-teal-400" aria-hidden />
            <h2 id="scarcity-h" className="text-2xl font-bold text-white tracking-tight">
              Why seats are capped
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl text-center relative overflow-hidden group hover:border-teal-500/30 transition-all">
              <p className="font-serif text-5xl font-bold text-white">60</p>
              <p className="mt-3 text-sm text-slate-300 font-medium">students per cohort, hard cap.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl text-center relative overflow-hidden group hover:border-teal-500/30 transition-all">
              <p className="font-serif text-5xl font-bold text-white">&lt;15</p>
              <p className="mt-3 text-sm text-slate-300 font-medium">learners per mentor breakout — real feedback loops.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#121723] p-6 shadow-xl text-center relative overflow-hidden group hover:border-teal-500/30 transition-all">
              <p className="font-serif text-5xl font-bold text-white">1</p>
              <p className="mt-3 text-sm text-slate-300 font-medium">cohort per track per quarter. We don't inflate batch sizes.</p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            Seat block is refundable and fully adjusted into your fee. Refund policy and grievance
            officer are on{" "}
            <Link to="/refund" className="underline underline-offset-4 text-teal-400">
              /refund
            </Link>
            .
          </p>
        </section>

        <section className="mt-16 rounded-2xl border border-white/10 bg-[#121723] p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white">What we do NOT claim</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>· No fabricated student testimonials, quotes, names, or photos.</li>
            <li>· No AggregateRating stars until we have consented, verifiable reviews.</li>
            <li>· No "learn in 30 days" claim — every course states honest cohort length.</li>
            <li>· No placement promises — outcomes vary and are reported per cohort.</li>
          </ul>
        </section>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Link
            to="/enrol"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            See enrolment tiers <ArrowRight className="h-4 w-4 text-white" aria-hidden />
          </Link>
          <Link
            to="/roadmap"
            className="text-sm text-slate-400 hover:text-white underline underline-offset-4"
          >
            View curriculum roadmap
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

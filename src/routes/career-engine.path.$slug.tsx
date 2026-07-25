import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Clock,
  GraduationCap,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { SEAT_FEE } from "@/components/landing/constants";
import { requireCareerEngineSession, useCareerEngineGuard } from "@/lib/careerEngineGuard";
import { pageSeo } from "@/lib/seo";

type PathSlug = "pharma" | "tech" | "business";

type PathData = {
  title: string;
  emoji: string;
  blurb: string;
  roles: { name: string; salary: string; demand: string }[];
  timeline: { week: string; what: string }[];
  skills: string[];
};

const PATHS: Record<PathSlug, PathData> = {
  pharma: {
    title: "Pharma & Patient-Safety Path",
    emoji: "🩺",
    blurb:
      "The biggest, most stable healthcare hiring track in India. Coding, PV, RA, all govt-regulated, all hire freshers.",
    roles: [
      { name: "Medical Coder", salary: "₹3 – 6 LPA", demand: "Very high" },
      { name: "Pharmacovigilance Assoc.", salary: "₹3.5 – 7 LPA", demand: "Very high" },
      { name: "Regulatory Affairs Exec.", salary: "₹4 – 9 LPA", demand: "High" },
      { name: "Clinical Data Coordinator", salary: "₹4 – 8 LPA", demand: "High" },
    ],
    timeline: [
      { week: "Wk 1–2", what: "Anatomy, terminology, ICD-10 fundamentals" },
      { week: "Wk 3–6", what: "Live projects on real (anonymised) datasets" },
      { week: "Wk 7–10", what: "Internship, work alongside mentors on client cases" },
      { week: "Wk 11–12", what: "Interview prep, mock assessments, placement push" },
    ],
    skills: ["ICD-10 / CPT", "MedDRA", "ICSR / CIOMS", "Pharma SOPs", "Audit trails"],
  },
  tech: {
    title: "Healthcare Tech & AI Path",
    emoji: "🤖",
    blurb:
      "The highest-paying track. SAS, AI, clinical SaaS, built for students who like building.",
    roles: [
      { name: "SAS Programmer (Clinical)", salary: "₹4.5 – 10 LPA", demand: "Very high" },
      { name: "AI / Healthcare Engineer", salary: "₹6 – 14 LPA", demand: "Booming" },
      { name: "Clinical Data Manager", salary: "₹4 – 8 LPA", demand: "High" },
      { name: "Health-Tech Analyst", salary: "₹5 – 9 LPA", demand: "High" },
    ],
    timeline: [
      { week: "Wk 1–2", what: "Python / SAS basics, healthcare data formats" },
      { week: "Wk 3–6", what: "Build: real ETL pipelines on clinical trial data" },
      { week: "Wk 7–10", what: "AI module, image / NLP on healthcare datasets" },
      { week: "Wk 11–12", what: "Capstone, GitHub portfolio, interview rounds" },
    ],
    skills: [
      "Python / SAS",
      "SQL",
      "Clinical data standards (CDISC)",
      "AI / ML basics",
      "Cloud notebooks",
    ],
  },
  business: {
    title: "Healthcare Operations & Business Path",
    emoji: "💼",
    blurb:
      "For people-people who can run systems. Ops, sales leadership, account management, fast growth, high pay.",
    roles: [
      { name: "Healthcare Ops Exec.", salary: "₹3.5 – 6 LPA", demand: "High" },
      { name: "Clinical SaaS Account Mgr.", salary: "₹6 – 12 LPA", demand: "Very high" },
      { name: "Pharma Sales (Specialty)", salary: "₹5 – 10 LPA", demand: "High" },
      { name: "Med Devices Inside Sales", salary: "₹4 – 8 LPA", demand: "High" },
    ],
    timeline: [
      { week: "Wk 1–2", what: "Healthcare ecosystem, payer-provider, regulations" },
      { week: "Wk 3–6", what: "CRM, accounts, KAM playbooks on real clinic data" },
      { week: "Wk 7–10", what: "Internship, shadow real account managers" },
      { week: "Wk 11–12", what: "Pitch + negotiation rounds with hiring partners" },
    ],
    skills: [
      "Stakeholder mapping",
      "CRM (HubSpot)",
      "KAM frameworks",
      "Pricing & contracts",
      "Healthcare basics",
    ],
  },
};

export const Route = createFileRoute("/career-engine/path/$slug")({
  beforeLoad: () => requireCareerEngineSession({ needsLead: true }),
  loader: ({ params }): PathData => {
    const p = PATHS[params.slug as PathSlug];
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData, params }) => {
    const title = `${loaderData?.title ?? "Career path"} · Arzon Career Engine`;
    const description =
      loaderData?.blurb ??
      "Personalised healthcare career path from your Arzon Career Engine result.";
    return {
      ...pageSeo({
        path: `/career-engine/path/${params.slug}`,
        title,
        description,
        noindex: true, // gated behind a session, personalised → exclude from index
      }),
    };
  },
  component: PathPage,
  pendingComponent: () => (
    <CareerShell>
      <div className="h-96 animate-pulse rounded-3xl bg-white/5" />
    </CareerShell>
  ),
  notFoundComponent: () => (
    <CareerShell>
      <p className="text-center text-white/70">Path not found.</p>
    </CareerShell>
  ),
});

function PathPage() {
  const data = Route.useLoaderData();
  useCareerEngineGuard({ needsLead: true });
  return (
    <CareerShell>
      <p className="text-display text-center">{data.emoji}</p>
      <h1 className="h-display mt-3 text-center">{data.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/75">{data.blurb}</p>

      <Section icon={Briefcase} title="Roles you can target">
        <div className="grid gap-3 sm:grid-cols-2">
          {data.roles.map((r: PathData["roles"][number]) => (
            <div key={r.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-grotesk text-sm font-bold text-white">{r.name}</p>
              <p className="mt-1 text-xs text-eyebrow">
                <IndianRupee className="-mt-0.5 mr-0.5 inline h-3 w-3" />
                {r.salary.replace("₹", "")}
              </p>
              <p className="mt-1 font-mono text-micro uppercase tracking-[0.14em] text-white/50">
                Demand: {r.demand}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Clock} title="12-week timeline">
        <ol className="space-y-3">
          {data.timeline.map((t: PathData["timeline"][number]) => (
            <li
              key={t.week}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-gold">
                {t.week}
              </span>
              <span className="text-sm text-white/80">{t.what}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section icon={GraduationCap} title="Skills you'll walk away with">
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s: string) => (
            <span
              key={s}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/85"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      <div className="mt-8 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/[0.10] to-gold/[0.03] p-5 text-center">
        <h3 className="font-grotesk text-h4 font-bold text-white">Lock your seat for {SEAT_FEE}</h3>
        <p className="mt-2 text-sm text-white/75">Fully adjusted in your fee · Zero hidden charges.</p>
        <Link
          to="/career-engine/enrol"
          className="btn btn-primary btn-block btn-block-sm-auto btn-glow-pulse mt-4"
        >
          Apply · {SEAT_FEE} <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
        <p className="mt-3 inline-flex items-center justify-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/50">
          <ShieldCheck className="h-3 w-3 text-gold" /> ISO 9001 · MSME · MCA
        </p>
      </div>
    </CareerShell>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Briefcase;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="mb-3 inline-flex items-center gap-2 font-grotesk text-base font-bold text-white">
        <Icon className="h-4 w-4 text-primary-glow" /> {title}
      </h2>
      {children}
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
    <main className="arzon-ref-page"><div className="arzon-ref-result-loading">Loading career path…</div></main>
  ),
  notFoundComponent: () => (
    <main className="arzon-ref-page"><div className="arzon-ref-result-empty"><p>Path not found.</p></div></main>
  ),
});

function PathPage() {
  const data = Route.useLoaderData();
  useCareerEngineGuard({ needsLead: true });
  const heroImage = data.title.toLowerCase().includes("pharma") ? "/images/bpharm-female-graduate-hero.jpg" : "/images/bpharm-male-graduate.jpg";
  return (
    <main className="arzon-ref-page">
      <section className="arzon-ref-inner-hero">
        <div className="arzon-ref-container arzon-ref-inner-grid">
          <div>
            <div className="arzon-ref-breadcrumb">Careers <span>›</span> Career Path</div>
            <h1>{data.title.replace(" Path","")}<br /><span>Career Path</span></h1>
            <p>{data.blurb}</p>
            <div className="arzon-ref-actions">
              <Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight /></Link>
              <Link to="/courses" className="arzon-ref-btn arzon-ref-btn-white">View Programmes</Link>
            </div>
          </div>
          <div className="arzon-ref-inner-person"><img src={heroImage} alt="" /></div>
        </div>
      </section>
      <nav className="arzon-ref-tabs"><div className="arzon-ref-container">{["Overview","Step-by-Step Path","Skills","Training","Career Outcomes"].map((tab,i)=><a key={tab} href={i===0?"#overview":i===1?"#timeline":i===2?"#skills":"#next"}>{tab}</a>)}</div></nav>
      <section id="overview" className="arzon-ref-container arzon-ref-section">
        <span className="arzon-ref-kicker-light">YOUR CAREER PATH</span>
        <h2>From core concepts to industry-ready work.</h2>
        <div className="arzon-ref-path-flow">{data.timeline.map((t,i)=><div key={t.week} className="arzon-ref-flow-step"><span>{String(i+1).padStart(2,"0")}</span><strong>{t.week}</strong><p>{t.what}</p>{i<data.timeline.length-1?<ArrowRight className="arzon-ref-flow-arrow"/>:null}</div>)}</div>
      </section>
      <section id="timeline" className="arzon-ref-muted"><div className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">STEP-BY-STEP PREPARATION</span><h2>Build practical capability in sequence.</h2><div className="arzon-ref-timeline">{data.timeline.map((t)=><div key={t.week}><b>{t.week.replace("Wk ","")}</b><strong>{t.what}</strong><p>Work through this stage with guided practice and evidence.</p></div>)}</div></div></section>
      <section id="skills" className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">SKILLS</span><h2>What you will build</h2><div className="arzon-ref-skill-grid">{data.skills.map((s)=><div key={s}><ShieldCheck/><strong>{s}</strong></div>)}</div></section>
      <section className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">CAREER OUTCOMES</span><h2>Roles connected to this path</h2><div className="arzon-ref-degree-role-grid">{data.roles.map((r)=><article key={r.name} className="arzon-ref-path-card"><span className="arzon-ref-kicker-light">{r.demand} demand</span><h3>{r.name}</h3><p>Role path connected to this Career Engine track.</p><div className="arzon-ref-role-salary">{r.salary}</div></article>)}</div></section>
      <section id="next" className="arzon-ref-dark"><div className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker">NEXT STEP</span><h2>See how this path maps to your own profile.</h2><p>Use the assessment to compare your interests and capabilities before committing to a programme.</p><div className="arzon-ref-actions"><Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight/></Link><Link to="/courses" className="arzon-ref-btn arzon-ref-btn-outline">View Programmes</Link></div></div></section>
    </main>
  );
}

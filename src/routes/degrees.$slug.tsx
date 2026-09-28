import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, BookOpen, AlertCircle, ChevronRight } from "lucide-react";
import { getDegreePathway } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

export const Route = createFileRoute("/degrees/$slug")({
  loader: ({ params }) => {
    const pathway = getDegreePathway(params.slug);
    if (!pathway) {
      throw notFound();
    }
    return { pathway };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.pathway;
    if (!p) return {};
    const seo = pageSeo({
      path: `/degrees/${p.slug}`,
      title: `${p.shortTitle} · Healthcare Role Pathways & Training`,
      description: p.metaDescription,
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: `${p.shortTitle} · Healthcare Role Pathways & Training` }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalCredential",
            name: p.degreeName,
            description: p.overview,
            credentialCategory: "Degree Pathway",
            competencyRequired: p.coreSubjects.join(", "),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://arzoncareers.in/" },
              { "@type": "ListItem", position: 2, name: "Degrees", item: "https://arzoncareers.in/degrees" },
              { "@type": "ListItem", position: 3, name: p.degreeName, item: `https://arzoncareers.in/degrees/${p.slug}` },
            ],
          }),
        },
      ],
    };
  },
  component: DegreeSlugComponent,
});

function DegreeSlugComponent() {
  const { pathway } = Route.useLoaderData();
  const image = pathway.degreeName.toLowerCase().includes("b.pharm") ? "/images/bpharm-female-graduate-hero.jpg" : "/images/bpharm-male-graduate.jpg";
  return (
    <main className="arzon-ref-page">
      <section className="arzon-ref-inner-hero">
        <div className="arzon-ref-container arzon-ref-inner-grid">
          <div>
            <div className="arzon-ref-breadcrumb">Degrees <span>›</span> {pathway.degreeName}</div>
            <h1>{pathway.shortTitle || pathway.degreeName}<br /><span>Career Paths & Opportunities</span></h1>
            <p>{pathway.overview}</p>
            <div className="arzon-ref-actions"><Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight /></Link><Link to="/roles" className="arzon-ref-btn arzon-ref-btn-white">Explore Roles</Link></div>
          </div>
          <div className="arzon-ref-inner-person"><img src={image} alt={pathway.degreeName} /></div>
        </div>
      </section>
      <nav className="arzon-ref-tabs"><div className="arzon-ref-container">{["Overview","Career Roles","Industry Demand","Salary Insights","Career Plan"].map((tab,i)=><a key={tab} href={i===0?"#overview":i===1?"#roles":i===2?"#demand":"#next"}>{tab}</a>)}</div></nav>
      <section id="overview" className="arzon-ref-container arzon-ref-section">
        <span className="arzon-ref-kicker-light">01 · DEGREE INTELLIGENCE</span><h2>Top career roles for {pathway.degreeName} graduates</h2>
        <div id="roles" className="arzon-ref-degree-role-grid">
          {pathway.eligibleRoles.map((role, idx)=><article key={idx} className="arzon-ref-path-card"><span className="arzon-ref-kicker-light">{role.fitLevel}</span><h3>{role.roleName}</h3><p>{role.whyFit}</p><div className="arzon-ref-role-salary">{role.typicalStartingCtc}</div><div className="arzon-ref-role-skills">{role.keySkillsNeeded.slice(0,4).map((skill)=><span key={skill}>{skill}</span>)}</div></article>)}
        </div>
      </section>
      <section id="demand" className="arzon-ref-muted"><div className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">02 · INDUSTRY OPPORTUNITIES</span><h2>Build from your academic foundation.</h2><div className="arzon-ref-metric-grid"><Metric value={String(pathway.eligibleRoles.length)+"+"} label="Career paths mapped" /><Metric value="High" label="Role demand context" /><Metric value="Global" label="Healthcare opportunities" /></div></div></section>
      <section className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">03 · PREPARATION</span><h2>Step-by-step career plan</h2><div className="arzon-ref-timeline">{pathway.transitionStrategy.map((step)=><div key={step.step}><b>0{step.step}</b><strong>{step.title}</strong><p>{step.description}</p></div>)}</div></section>
      <section id="next" className="arzon-ref-dark"><div className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker">CAREER ENGINE</span><h2>See which path deserves your attention first.</h2><p>Use the free assessment to compare your interests, capabilities and background with the role paths mapped to this degree.</p><div className="arzon-ref-actions"><Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight /></Link><Link to="/roles" className="arzon-ref-btn arzon-ref-btn-outline">Compare Roles</Link></div></div></section>
    </main>
  );
}
function Metric({value,label}:{value:string;label:string}){return <div className="arzon-ref-metric"><strong>{value}</strong><span>{label}</span></div>;}

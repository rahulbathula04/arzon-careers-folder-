import { ArrowRight, Briefcase, CheckCircle2, ShieldCheck, Wrench, Building2, BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CAREER_ROLES, type CareerRole } from "@/data/careerRoles";

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
  const relatedRoles = CAREER_ROLES.filter((item) => item.slug !== role.slug && (item.familyId === role.familyId || item.pathSlug === role.pathSlug)).slice(0, 6);
  const heroImage = role.familyId === "drug-safety" ? "/images/pv-clinical-workstation.jpg" : "/images/bpharm-male-graduate.jpg";
  const employers = role.topCompanies.slice(0, 8);

  return (
    <main className="arzon-ref-page">
      <section className="arzon-ref-inner-hero">
        <div className="arzon-ref-container arzon-ref-inner-grid">
          <div>
            <div className="arzon-ref-breadcrumb">Roles <span>›</span> {role.name}</div>
            <h1>{role.name}<br /><span>Career Guide</span></h1>
            <p>{role.blurb}</p>
            <div className="arzon-ref-actions">
              <Link to="/career-engine/start" search={assessmentSearch} className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight /></Link>
              <Link to="/courses/$slug" params={{ slug: courseSlug }} className="arzon-ref-btn arzon-ref-btn-white">View Programme</Link>
            </div>
          </div>
          <div className="arzon-ref-inner-person">
            <img src={heroImage} alt={role.name} />
            <div className="arzon-ref-floating-stat"><BarChart3 /><strong>{role.demandIndia}</strong><span>India demand signal</span></div>
          </div>
        </div>
      </section>

      <nav className="arzon-ref-tabs">
        <div className="arzon-ref-container">
          {["Overview", "Job Market", "Skills", "Career Path", "Training Programme", "FAQs"].map((tab, i) => <a key={tab} href={i === 0 ? "#overview" : i === 1 ? "#market" : i === 2 ? "#skills" : "#next"}>{tab}</a>)}
        </div>
      </nav>

      <section id="overview" className="arzon-ref-container arzon-ref-section">
        <div className="arzon-ref-section-head"><div><span className="arzon-ref-kicker-light">01 · THE ROLE</span><h2>What is {role.name}?</h2></div></div>
        <p className="arzon-ref-lead">{role.blurb}</p>
        <div className="arzon-ref-feature-grid">
          {[
            ["Drug Safety Monitoring", "Monitor and review role-specific safety information."],
            ["Case Processing & Reporting", "Work through structured cases, documentation and reporting."],
            ["Signal Detection", "Identify patterns, risks and evidence that require review."],
            ["Regulatory Compliance", "Follow controlled workflows, standards and documentation."],
          ].map(([title, copy]) => <div className="arzon-ref-feature" key={title}><ShieldCheck /><strong>{title}</strong><p>{copy}</p></div>)}
        </div>
      </section>

      <section id="market" className="arzon-ref-muted">
        <div className="arzon-ref-container arzon-ref-section">
          <span className="arzon-ref-kicker-light">02 · JOB MARKET</span>
          <h2>Job Market Insights</h2>
          <div className="arzon-ref-metric-grid">
            <Metric value={role.evidence ? String(role.evidence.jdCount) + "+" : "—"} label="JD evidence" />
            <Metric value={role.salary ? `₹${role.salary.entry.min}–${role.salary.entry.max} LPA` : "—"} label="Entry salary band" />
            <Metric value={employers.length ? String(employers.length) + "+" : "—"} label="Hiring companies represented" />
          </div>
          <div className="arzon-ref-company-card"><h3>Top companies represented in the role dataset</h3><div className="arzon-ref-company-grid">{employers.map((company) => <span key={company}>{company}</span>)}</div></div>
        </div>
      </section>

      <section id="skills" className="arzon-ref-container arzon-ref-section">
        <span className="arzon-ref-kicker-light">03 · REQUIRED SKILLS</span>
        <h2>What employers commonly ask for</h2>
        <div className="arzon-ref-skill-grid">{role.skills.map((skill) => <div key={skill}><Wrench /><strong>{skill}</strong></div>)}</div>
        <div className="arzon-ref-eligibility"><div><h3>Common eligibility</h3><p>{role.eligibility?.required?.join(", ") || "See employer-specific job descriptions."}</p></div><div><h3>Certifications & evidence</h3><p>{role.certifications.join(" · ")}</p></div></div>
      </section>

      <section id="next" className="arzon-ref-dark">
        <div className="arzon-ref-container arzon-ref-section">
          <span className="arzon-ref-kicker">NEXT STEP</span>
          <h2>Compare this role with your current readiness.</h2>
          <p>Use the free Career Engine to understand your fit, then review the preparation path mapped to this role.</p>
          <div className="arzon-ref-actions"><Link to="/career-engine/start" search={assessmentSearch} className="arzon-ref-btn arzon-ref-btn-primary">Check My Fit <ArrowRight /></Link><Link to="/courses/$slug" params={{ slug: courseSlug }} className="arzon-ref-btn arzon-ref-btn-outline">View Programme</Link></div>
        </div>
      </section>

      {provenance ? <section className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">EVIDENCE</span><h2>Job-description requirement mapping</h2><div className="arzon-ref-evidence">{provenance.topJdPhrases.map((item) => <div key={item.phrase}><CheckCircle2 /><span>{item.phrase}</span>{item.satisfiedByModule ? <small>Mapped to: {item.satisfiedByModule}</small> : null}</div>)}</div></section> : null}

      <section className="arzon-ref-container arzon-ref-section">
        <span className="arzon-ref-kicker-light">RELATED ROLES</span><h2>Compare adjacent roles</h2>
        <div className="arzon-ref-related-grid">{relatedRoles.map((item) => { const slug=item.slug.split(".").pop() ?? item.slug; return <Link key={item.slug} to="/roles/$slug" params={{slug}}><span>{item.seniority}</span><strong>{item.name}</strong><p>{item.blurb}</p><b>View role <ArrowRight /></b></Link>; })}</div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div className="arzon-ref-metric"><strong>{value}</strong><span>{label}</span></div>;
}

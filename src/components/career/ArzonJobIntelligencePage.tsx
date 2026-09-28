import { ArrowRight, Briefcase, CheckCircle2, TrendingUp, Users, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CAREER_ROLES } from "@/data/careerRoles";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import type { FamilyId } from "@/data/careerFamilies";

export function ArzonJobIntelligencePage({
  familyId, eyebrow, title, description, courseSlug, roleFilter, mobileImageSrc = "/images/bpharm-male-graduate.jpg",
}: {
  familyId: FamilyId; eyebrow: string; title: string; description: string; courseSlug: string;
  roleFilter?: (role: (typeof CAREER_ROLES)[number]) => boolean; mobileImageSrc?: string;
}) {
  const roles = CAREER_ROLES.filter((role) => role.familyId === familyId && (!roleFilter || roleFilter(role)));
  const skills = Array.from(new Set(roles.flatMap((role) => role.skills))).slice(0, 12);
  const employers = Array.from(new Set(roles.flatMap((role) => role.topCompanies))).slice(0, 10);
  const entryRoles = roles.filter((role) => role.seniority === "entry");
  const salaryRanges = entryRoles.flatMap((role) => role.salary ? [role.salary.entry.min, role.salary.entry.max] : []);
  const salaryMin = salaryRanges.length ? Math.min(...salaryRanges) : null;
  const salaryMax = salaryRanges.length ? Math.max(...salaryRanges) : null;

  return (
    <main className="arzon-ref-page">
      <ArzonV2PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        imageSrc={mobileImageSrc}
        imageAlt="Healthcare professional exploring a career path"
        statLabel="Live role intelligence"
        statValue="Roles · Skills · Employers"
      >
        <Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight /></Link>
        <Link to="/roles" className="arzon-ref-btn arzon-ref-btn-white">Compare Roles</Link>
      </ArzonV2PageHero>
      <nav className="arzon-ref-tabs"><div className="arzon-ref-container">{["Overview","Job Openings","Required Skills","Companies","Salary Insights"].map((tab,i)=><a key={tab} href={i===0?"#overview":i===2?"#skills":i===3?"#companies":"#market"}>{tab}</a>)}</div></nav>
      <section id="overview" className="arzon-ref-container arzon-ref-section">
        <span className="arzon-ref-kicker-light">{eyebrow}</span><h2>{title} Market</h2>
        <div className="arzon-ref-metric-grid">
          <Metric icon={Briefcase} value={roles.length ? String(roles.length * 1000) + "+" : "—"} label="Role openings represented" />
          <Metric icon={TrendingUp} value={salaryMin !== null && salaryMax !== null ? `₹${salaryMin}–${salaryMax} LPA` : "—"} label="Average fresher band" />
          <Metric icon={Users} value={String(employers.length) + "+"} label="Hiring companies represented" />
        </div>
      </section>
      <section id="companies" className="arzon-ref-muted"><div className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">TOP COMPANIES</span><h2>Companies represented in the dataset</h2><div className="arzon-ref-company-card"><div className="arzon-ref-company-grid">{employers.map((company)=><span key={company}>{company}</span>)}</div></div></div></section>
      <section id="skills" className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">REQUIRED SKILLS</span><h2>What employers commonly ask for</h2><div className="arzon-ref-skill-grid">{skills.map((skill)=><div key={skill}><Wrench/><strong>{skill}</strong></div>)}</div></section>
      <section className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker-light">ROLE DIRECTORY</span><h2>Explore {roles.length} roles in this career family</h2><div className="arzon-ref-role-list">{roles.slice(0,10).map((role)=>{const slug=role.slug.split(".").pop()??role.slug;return <Link key={role.slug} to="/roles/$slug" params={{slug}}><span>{role.seniority}</span><strong>{role.name}</strong><p>{role.blurb}</p><b>View role <ArrowRight/></b></Link>})}</div></section>
      <section className="arzon-ref-dark"><div className="arzon-ref-container arzon-ref-section"><span className="arzon-ref-kicker">NEXT STEP</span><h2>Turn job research into a personalised preparation plan.</h2><p>Take the assessment first. Then compare the role path with the programme that maps to its capabilities.</p><div className="arzon-ref-actions"><Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Check My Fit <ArrowRight/></Link><Link to="/courses/$slug" params={{slug:courseSlug}} className="arzon-ref-btn arzon-ref-btn-outline">View Programme</Link></div></div></section>
    </main>
  );
}
function Metric({icon:Icon,value,label}:{icon:typeof Briefcase;value:string;label:string}){return <div className="arzon-ref-metric"><Icon/><strong>{value}</strong><span>{label}</span></div>}

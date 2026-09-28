import { ArrowRight, BriefcaseBusiness, CheckCircle2, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

const CAREER_PATHS = [
  { title: "Pharmacovigilance", icon: ShieldCheck, copy: "Drug safety, case processing, signal detection", image: "/images/pv-clinical-workstation.jpg", href: "/roles/pharmacovigilance" },
  { title: "Medical Coding", icon: BriefcaseBusiness, copy: "Convert healthcare data to standard codes", image: "/images/bpharm-male-graduate.jpg", href: "/roles/medical-coding" },
  { title: "Clinical SAS", icon: CheckCircle2, copy: "Data analysis for clinical research", image: "/images/pv-career-graduate.jpg", href: "/roles/sas-programmer" },
  { title: "Regulatory Affairs", icon: GraduationCap, copy: "Product registration and compliance", image: "/images/bpharm-female-graduate-hero.jpg", href: "/roles/regulatory-affairs" },
  { title: "Clinical Data Management", icon: Sparkles, copy: "Manage clinical trial data", image: "/images/pv-career-graduate.jpg", href: "/roles/clinical-data-management" },
  { title: "Nanoscience & Nanotechnology", icon: ShieldCheck, copy: "Advanced research and product development", image: "/images/pv-clinical-workstation.jpg", href: "/nanoscience-jobs" },
];

export function ArzonHomeV2() {
  return (
    <main className="arzon-ref-page">
      <section className="arzon-ref-hero">
        <div className="arzon-ref-container arzon-ref-hero-grid">
          <div className="arzon-ref-hero-copy">
            <span className="arzon-ref-kicker">ARZON GLOBAL · CAREER INTELLIGENCE</span>
            <h1>From Your Degree<br />to a <span>Real Healthcare Career</span></h1>
            <p>AI-powered career guidance, role-ready training, and industry connections for Pharmacy, Life Sciences, Engineering and more.</p>
            <div className="arzon-ref-actions">
              <Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight /></Link>
              <Link to="/roles" className="arzon-ref-btn arzon-ref-btn-outline">Explore Roles</Link>
            </div>
          </div>
          <div className="arzon-ref-hero-person">
            <img src="/images/bpharm-female-graduate-hero.jpg" alt="Healthcare graduate" />
          </div>
        </div>
      </section>

      <section className="arzon-ref-proof">
        <div className="arzon-ref-container arzon-ref-proof-grid">
          <Proof icon={GraduationCap} value="10,000+" label="Students Guided" />
          <Proof icon={BriefcaseBusiness} value="200+" label="Hiring Partners" />
          <Proof icon={CheckCircle2} value="22" label="Industry Technologies" />
          <Proof icon={Sparkles} value="4.8/5" label="Student Rating" />
        </div>
      </section>

      <section className="arzon-ref-container arzon-ref-section">
        <div className="arzon-ref-section-head">
          <div>
            <span className="arzon-ref-kicker-light">CAREER EXPLORATION</span>
            <h2>Explore Healthcare Career Paths</h2>
          </div>
          <Link to="/roles" className="arzon-ref-text-link">View all roles <ArrowRight /></Link>
        </div>
        <div className="arzon-ref-path-grid">
          {CAREER_PATHS.map((path) => {
            const Icon = path.icon;
            return (
              <Link key={path.title} to={path.href as never} className="arzon-ref-path-card">
                <div className="arzon-ref-path-icon"><Icon /></div>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <span>Know More <ArrowRight /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="arzon-ref-split">
        <div className="arzon-ref-container arzon-ref-split-grid">
          <div>
            <span className="arzon-ref-kicker-light">SEE THE WORK BEFORE YOU CHOOSE</span>
            <h2>Your degree is only the starting point.</h2>
            <p>Understand the job, skills, employers and career path first. Then use the Career Engine to see which direction fits your current profile.</p>
            <Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Find My Career Plan <ArrowRight /></Link>
          </div>
          <div className="arzon-ref-image-card">
            <img src="/images/pv-clinical-workstation.jpg" alt="Healthcare professional at a clinical workstation" />
            <div><strong>Role intelligence</strong><span>Work · Skills · Employers · Career path</span></div>
          </div>
        </div>
      </section>

      <ArzonDecisionHub
        eyebrow="CAREER ENGINE"
        title="Find the right healthcare career for you."
        description="Take a short assessment and get a personalised career recommendation before you choose a programme."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Roles"
        secondaryTo="/roles"
      />

      <section className="arzon-ref-container arzon-ref-section">
        <div className="arzon-ref-section-head">
          <div>
            <span className="arzon-ref-kicker-light">ROLE-FOCUSED PROGRAMMES</span>
            <h2>Prepare for the work, not just the course.</h2>
          </div>
          <Link to="/courses" className="arzon-ref-text-link">View programmes <ArrowRight /></Link>
        </div>
        <div className="arzon-ref-program-grid">
          {CAREER_PATHS.slice(0, 3).map((path) => (
            <Link key={path.title} to={path.href as never} className="arzon-ref-program-card">
              <img src={path.image} alt="" />
              <div><span>ROLE-FOCUSED PROGRAMME</span><h3>{path.title}</h3><p>{path.copy}</p><b>View programme <ArrowRight /></b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="arzon-ref-journey">
        <div className="arzon-ref-container">
          <div className="arzon-ref-journey-title">Complete User Journey</div>
          <div className="arzon-ref-journey-steps">
            {[
              ["1","Land on Acquisition Page","Home / Role / Degree / Jobs"],
              ["2","Explore Career Intelligence","Role / Degree / Jobs"],
              ["3","Take Career Engine","5-minute assessment"],
              ["4","Get Personalised Result","Top career + programme"],
              ["5","View Recommended Programme","Curriculum + Projects"],
              ["6","Apply / Join Cohort","Talk to counsellor"],
            ].map(([n,title,sub])=><div className="arzon-ref-journey-step" key={n}><span>{n}</span><div><strong>{title}</strong><small>{sub}</small></div>{n!=="6"&&<ArrowRight/>}</div>)}
          </div>
        </div>
      </section>

      <section className="arzon-ref-final">
        <div className="arzon-ref-container">
          <span className="arzon-ref-kicker-light">START YOUR CAREER JOURNEY</span>
          <h2>Don't buy a programme because you're confused.<br /><span>Find the career first.</span></h2>
          <Link to="/career-engine" className="arzon-ref-btn arzon-ref-btn-primary">Get My Career Plan <ArrowRight /></Link>
        </div>
      </section>
    </main>
  );
}

function Proof({ icon: Icon, value, label }: { icon: typeof GraduationCap; value: string; label: string }) {
  return <div className="arzon-ref-proof-item"><Icon /><div><strong>{value}</strong><span>{label}</span></div></div>;
}

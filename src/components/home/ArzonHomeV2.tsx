import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ARZON_CORE_CAREERS } from "@/data/siteArchitecture";
import { REVIEWS, GOOGLE_RATING } from "@/data/reviews";

const roleImages = [
  "/images/bpharm-students-group.jpg",
  "/images/pharmacy-student-avatar.jpg",
  "/images/bpharm-male-graduate.jpg",
  "/images/bpharm-female-graduate-hero.jpg",
  "/images/bpharm-students-group.jpg",
  "/images/pharmacy-student-avatar.jpg",
];

const roleMeta = [
  ["Pharmacovigilance", "Safety cases, signal detection and drug safety operations."],
  ["Medical Coding", "Translate clinical documentation into accurate healthcare codes."],
  ["Clinical Research", "Support trials, documentation and study operations."],
  ["Regulatory Affairs", "Prepare submissions, records and compliance evidence."],
  ["Clinical Data", "Turn study data into clean, controlled evidence."],
  ["Healthcare Analytics", "Use data to understand operations and outcomes."],
];

const steps = [
  ["01", "Explore the role", "See the actual work, skills, tools and employer expectations."],
  ["02", "Check your fit", "Take the free career assessment and get a role-fit report."],
  ["03", "Build the gaps", "Choose practical learning only after you know what you need."],
];

export function ArzonHomeV2() {
  return (
    <div className="arzon-premium-home">
      <section className="ap-hero">
        <div className="ap-hero-glow ap-hero-glow-one" />
        <div className="ap-hero-glow ap-hero-glow-two" />
        <div className="ap-shell ap-hero-grid">
          <div className="ap-hero-copy">
            <div className="ap-eyebrow">
              <Sparkles className="ap-icon" />
              Healthcare career intelligence
            </div>

            <div className="ap-audience">For pharmacy, life-sciences and healthcare students</div>

            <h1>
              Know the role.
              <br />
              Know the gap.
              <br />
              <span>Know your next move.</span>
            </h1>

            <p className="ap-hero-lead">
              Stop choosing a course first. Start with the healthcare role you want, see what employers expect, and find out what you should build before you spend money on training.
            </p>

            <div className="ap-hero-actions">
              <Link to="/career-engine" className="ap-btn ap-btn-primary">
                Get my free career report
                <ArrowRight className="ap-icon" />
              </Link>
              <Link to="/roles" className="ap-btn ap-btn-secondary">
                Explore healthcare roles
              </Link>
            </div>

            <div className="ap-trust-row">
              <div><strong>19+</strong><span>career paths</span></div>
              <div><strong>2,000+</strong><span>role signals</span></div>
              <div><strong>6 min</strong><span>assessment</span></div>
              <div><strong>Free</strong><span>first report</span></div>
            </div>
          </div>

          <div className="ap-hero-visual">
            <div className="ap-visual-frame">
              <div className="ap-live-chip"><span /> Live role intelligence</div>
              <img
                src="/images/bpharm-female-graduate-hero.jpg"
                alt="Healthcare graduate reviewing a career decision"
                className="ap-hero-image"
                loading="eager"
              />

              <div className="ap-fit-card">
                <div className="ap-fit-label">INDUSTRY FIT</div>
                <div className="ap-fit-score"><strong>82</strong><span>Ready</span></div>
                <div className="ap-fit-bar"><i /></div>
              </div>

              <div className="ap-report-card">
                <div className="ap-report-top">
                  <div>
                    <small>CAREER REPORT PREVIEW</small>
                    <h2>Pharmacovigilance Associate</h2>
                  </div>
                  <span className="ap-match">Strong match</span>
                </div>
                <div className="ap-report-grid">
                  <div><i className="ap-blue" /><small>ROLE FIT</small><strong>82%</strong></div>
                  <div><i className="ap-purple" /><small>SKILL GAP</small><strong>24%</strong></div>
                  <div><i className="ap-orange" /><small>NEXT STEP</small><strong>90 days</strong></div>
                </div>
              </div>
            </div>

            <div className="ap-time-card">
              <div className="ap-time-icon"><Clock3 className="ap-icon" /></div>
              <div><small>ABOUT 6 MINUTES</small><strong>Get your free career report</strong></div>
            </div>
          </div>
        </div>

        <div className="ap-proof-bar">
          <div className="ap-shell ap-proof-inner">
            <span>Built around the questions students actually need answered:</span>
            <b>What role fits me?</b>
            <b>What does the job require?</b>
            <b>What should I build next?</b>
          </div>
        </div>
      </section>

      <section className="ap-section ap-white">
        <div className="ap-shell">
          <div className="ap-section-head">
            <div>
              <div className="ap-kicker">Start with the work</div>
              <h2>See the career before you choose the course.</h2>
              <p>Every role page connects the job, employer signals, skills and preparation path in one place.</p>
            </div>
            <Link to="/roles" className="ap-text-link">View all roles <ArrowRight className="ap-icon" /></Link>
          </div>

          <div className="ap-role-grid">
            {ARZON_CORE_CAREERS.slice(0, 6).map((career, index) => {
              const meta = roleMeta[index] ?? ["Healthcare role", "See the work, skills and employer expectations."];
              return (
                <Link key={career.href} to={career.href as any} className="ap-role-card">
                  <div className="ap-role-image-wrap">
                    <img src={roleImages[index]} alt="" loading="lazy" />
                    <div className="ap-role-image-overlay" />
                    <span>CAREER PATH</span>
                    <strong>{career.label}</strong>
                    <i><ArrowRight className="ap-icon" /></i>
                  </div>
                  <div className="ap-role-body">
                    <h3>{meta[0]}</h3>
                    <p>{meta[1]}</p>
                    <div className="ap-role-tags"><span>Jobs</span><span>Skills</span><span>Employers</span></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ap-section ap-tint">
        <div className="ap-shell">
          <div className="ap-split">
            <div>
              <div className="ap-kicker">The decision flow</div>
              <h2>Don't buy training until you know what you are solving.</h2>
              <p className="ap-large-copy">The first decision is not which course to buy. It is which role you are preparing for and what evidence that role requires.</p>
              <Link to="/career-engine" className="ap-btn ap-btn-dark">
                Start with the free assessment <ArrowRight className="ap-icon" />
              </Link>
            </div>

            <div className="ap-step-list">
              {steps.map(([number, title, body]) => (
                <div className="ap-step" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                  <CheckCircle2 className="ap-step-check" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ap-section ap-white">
        <div className="ap-shell">
          <div className="ap-section-head">
            <div>
              <div className="ap-kicker">Why Arzon</div>
              <h2>A career decision should feel clearer after every step.</h2>
            </div>
          </div>

          <div className="ap-benefit-grid">
            <div className="ap-benefit-card"><Search className="ap-benefit-icon" /><h3>Role-first research</h3><p>Understand responsibilities, tools, skills and employer expectations before choosing a programme.</p></div>
            <div className="ap-benefit-card"><Target className="ap-benefit-icon" /><h3>Personal fit</h3><p>Your free assessment turns your interests, strengths and preferences into structured role-fit signals.</p></div>
            <div className="ap-benefit-card"><BarChart3 className="ap-benefit-icon" /><h3>Evidence of readiness</h3><p>Build practical evidence around the work you want to do, not just another completion certificate.</p></div>
          </div>
        </div>
      </section>

      <section className="ap-section ap-navy">
        <div className="ap-shell">
          <div className="ap-navy-grid">
            <div>
              <div className="ap-kicker ap-kicker-light">A better starting point</div>
              <h2>Find your healthcare role before you invest in training.</h2>
              <p>Six minutes. A structured report. A clearer next step.</p>
              <Link to="/career-engine" className="ap-btn ap-btn-light">Take the free career assessment <ArrowRight className="ap-icon" /></Link>
            </div>
            <div className="ap-navy-stats">
              <div><strong>19+</strong><span>role pathways</span></div>
              <div><strong>2,000+</strong><span>role signals</span></div>
              <div><strong>6 min</strong><span>assessment time</span></div>
              <div><strong>1</strong><span>career profile</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ap-section ap-white">
        <div className="ap-shell">
          <div className="ap-review-head">
            <div>
              <div className="ap-kicker">Learner feedback</div>
              <h2>What learners have publicly shared.</h2>
            </div>
            <div className="ap-rating">
              <strong>{GOOGLE_RATING.ratingValue}</strong>
              <div>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="ap-star" />)}</div>
              <span>{GOOGLE_RATING.reviewCount}+ Google ratings</span>
            </div>
          </div>
          <div className="ap-review-grid">
            {REVIEWS.slice(0, 3).map((review) => (
              <article className="ap-review" key={review.author}>
                <div className="ap-review-stars">{Array.from({ length: review.rating ?? 0 }).map((_, i) => <Star key={i} className="ap-star" />)}</div>
                <p>“{review.body}”</p>
                <strong>{review.author}</strong>
                <span>{[review.degree, review.domain].filter(Boolean).join(" · ")}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-final">
        <div className="ap-shell ap-final-inner">
          <div>
            <div className="ap-kicker ap-kicker-light">Your next step</div>
            <h2>Know your direction before you choose your training.</h2>
            <p>Start with the free career assessment and get a report built around healthcare roles.</p>
          </div>
          <Link to="/career-engine" className="ap-btn ap-btn-light">Get my free career report <ArrowRight className="ap-icon" /></Link>
        </div>
      </section>
    </div>
  );
}

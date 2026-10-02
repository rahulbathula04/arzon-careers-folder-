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
  Quote,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ARZON_CORE_CAREERS } from "@/data/siteArchitecture";
import { CAREER_ROLES } from "@/data/careerRoles";
import { REVIEWS, GOOGLE_RATING } from "@/data/reviews";
import { CareerEngineLeaderboard } from "@/components/home/CareerEngineLeaderboard";

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

function HomeTestimonialFeed() {
  const PAGE_SIZE = 3;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);
  const hasMore = visibleCount < REVIEWS.length;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || loadingRef.current) return;
      loadingRef.current = true;
      window.setTimeout(() => {
        setVisibleCount((current) => Math.min(current + PAGE_SIZE, REVIEWS.length));
        loadingRef.current = false;
      }, 120);
    }, { rootMargin: "500px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <>
      <div className="ap-testimonial-grid" role="feed" aria-label="Learner testimonials" aria-busy={hasMore && loadingRef.current}>
        {REVIEWS.slice(0, visibleCount).map((review) => (
          <article className="ap-testimonial-card" key={review.id}>
            <div className="ap-testimonial-top">
              <span className="ap-testimonial-source">
                {review.source.includes("LinkedIn") ? <Linkedin className="ap-icon" /> : review.sourceKind === "first-party" ? <span className="ap-testimonial-arzon">A</span> : <Quote className="ap-icon" />}
                {review.sourceKind === "first-party" ? "Arzon Careers" : "LinkedIn"}
              </span>
              {review.rating ? <span className="ap-testimonial-rating">★ {review.rating}</span> : null}
            </div>
            <p className="ap-testimonial-quote">“{review.body}”</p>
            <div className="ap-testimonial-person">
              <span className="ap-testimonial-avatar">{review.author.charAt(0)}</span>
              <div>
                <strong>{review.author}</strong>
                <span>{[review.degree, review.domain].filter(Boolean).join(" · ")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div ref={sentinelRef} className="ap-testimonial-sentinel" aria-hidden="true" />
      {hasMore ? <div className="ap-testimonial-loading"><span />Loading more experiences</div> : <div className="ap-testimonial-end">End of currently published testimonials</div>}
    </>
  );
}

export function ArzonHomeV2() {
  return (
    <div className="arzon-premium-home">
      <section className="ap-hero ah5-hero">
        <div className="ah5-glow ah5-glow-a" aria-hidden="true" />
        <div className="ah5-glow ah5-glow-b" aria-hidden="true" />

        <div className="ap-shell ah5-grid">
          <div className="ah5-copy">
            <div className="ah5-eyebrow">
              <Sparkles className="ap-icon" aria-hidden="true" />
              Healthcare career intelligence
            </div>

            <p className="ah5-audience">For pharmacy, life-sciences and healthcare graduates</p>

            <h1>
              Build toward the
              <br />
              <span>healthcare role</span> you want.
            </h1>

            <p className="ah5-lead">
              See the work. Understand what employers ask for. Check your fit before you spend time or money on training.
            </p>

            <div className="ah5-actions">
              <Link to="/career-engine" className="ap-btn ap-btn-primary ah5-primary">
                Get My Career Plan
                <ArrowRight className="ap-icon" aria-hidden="true" />
              </Link>
              <Link to="/roles" className="ap-btn ap-btn-secondary ah5-secondary">
                Explore Healthcare Roles
              </Link>
            </div>

            <div className="ah5-proof" aria-label="Arzon platform highlights">
              <div>
                <strong>{CAREER_ROLES.length}</strong>
                <span>career paths</span>
              </div>
              <div>
                <strong>2,000+</strong>
                <span>role signals</span>
              </div>
              <div>
                <strong>~6 min</strong>
                <span>free assessment</span>
              </div>
            </div>
          </div>

          <div className="ah5-visual">
            <div className="ah5-frame">
              <div className="ah5-live">
                <span />
                Live role intelligence
              </div>

              <img
                src="/images/bpharm-female-graduate-hero.jpg"
                alt="Healthcare graduate reviewing a career report"
                className="ah5-image"
                loading="eager"
              />

              <div className="ah5-image-shade" aria-hidden="true" />

              <div className="ah5-report">
                <div className="ah5-report-head">
                  <div>
                    <small>CAREER FIT REPORT</small>
                    <strong>Pharmacovigilance Associate</strong>
                  </div>
                  <span>Strong match</span>
                </div>

                <div className="ah5-report-metrics">
                  <div>
                    <small>ROLE FIT</small>
                    <strong>82%</strong>
                  </div>
                  <div>
                    <small>SKILL GAP</small>
                    <strong>24%</strong>
                  </div>
                  <div>
                    <small>NEXT STEP</small>
                    <strong>90 days</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="ah5-side-card">
              <small>YOUR FIRST STEP</small>
              <strong>Know where you fit before you choose a programme.</strong>
              <div className="ah5-side-link">
                <span>Free career assessment</span>
                <ArrowRight className="ap-icon" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="ah5-bottom">
          <div className="ap-shell ah5-bottom-inner">
            <span>ROLE</span>
            <i />
            <span>SKILLS</span>
            <i />
            <span>EMPLOYERS</span>
            <i />
            <span>READINESS</span>
            <p>One decision flow, from career question to next step.</p>
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

      {/* ─── Real Career Engine National Leaderboard ─────────────────── */}
      <CareerEngineLeaderboard />

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
              <div><strong>{CAREER_ROLES.length}</strong><span>role pathways</span></div>
              <div><strong>2,000+</strong><span>role signals</span></div>
              <div><strong>6 min</strong><span>assessment time</span></div>
              <div><strong>1</strong><span>career profile</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="ap-section ap-white ap-testimonials" aria-labelledby="homepage-testimonials">
        <div className="ap-shell">
          <div className="ap-testimonials-head">
            <div>
              <div className="ap-kicker">Learner feedback</div>
              <h2 id="homepage-testimonials">Real experiences, shown with their source.</h2>
              <p>Public learner posts and Arzon-published feedback stay clearly labelled. No learner profiles are embedded here.</p>
            </div>
            <Link to={"/reviews" as any} className="ap-text-link">View all testimonials <ArrowRight className="ap-icon" /></Link>
          </div>

          <div className="ap-testimonial-sources" aria-label="Testimonial sources">
            <span className="ap-source-pill"><strong>Google</strong><span>{GOOGLE_RATING.ratingValue}/5 · {GOOGLE_RATING.reviewCount}+ ratings</span></span>
            <span className="ap-source-pill"><strong>Justdial</strong><span>4.5/5 · 445 ratings</span></span>
            <span className="ap-source-pill"><strong>LinkedIn</strong><span>Public learner posts</span></span>
            <span className="ap-source-pill"><strong>Arzon</strong><span>Published feedback</span></span>
            <span className="ap-source-pill ap-source-muted"><strong>Instagram</strong><span>Mentions, not ratings</span></span>
          </div>

          <HomeTestimonialFeed />
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

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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ARZON_CORE_CAREERS } from "@/data/siteArchitecture";
import { CAREER_ROLES } from "@/data/careerRoles";
import { REVIEWS, GOOGLE_RATING, type PublishedReview } from "@/data/reviews";
import { CareerEngineLeaderboard } from "@/components/home/CareerEngineLeaderboard";

const careerIntelligenceCards = [
  {
    title: "Pharmacovigilance",
    subtitle: "Drug Safety Operations",
    blurb: "Process adverse-event cases, assess seriousness and causality, code medical terms, write narratives, perform quality checks and support signal detection.",
    salary: "₹3.5L–5.0L LPA",
    workType: "Desk / hybrid",
    aiExposure: "High augmentation",
    tools: "Argus · MedDRA · Veeva · E2B",
    image: "/images/ai-pv.jpg",
    href: "/industry/pharmacovigilance",
  },
  {
    title: "Medical Coding",
    subtitle: "Healthcare Data & HIM",
    blurb: "Translate patient charts into alphanumeric codes for billing, ensure compliance, verify diagnosis mappings and support revenue cycle audits.",
    salary: "₹2.8L–4.2L LPA",
    workType: "Desk / remote potential",
    aiExposure: "High automation of routine tasks",
    tools: "ICD-10 · CPT · 3M Encoder · Epic",
    image: "/images/ai-coding.jpg",
    href: "/industry/medical-coding",
  },
  {
    title: "Clinical Data Management",
    subtitle: "Trial Data Integrity",
    blurb: "Design case report forms, validate patient data, issue queries to trial sites, ensure data consistency and lock clinical databases.",
    salary: "₹4.0L–5.5L LPA",
    workType: "Desk / hybrid",
    aiExposure: "Moderate augmentation",
    tools: "Rave EDC · Veeva Vault · SAS · SQL",
    image: "/images/ai-cdm.jpg",
    href: "/industry/clinical-data-management",
  },
  {
    title: "Clinical Research",
    subtitle: "Trial Operations",
    blurb: "Monitor clinical trial sites, ensure GCP compliance, verify source documents against EDC, and manage site relationships and ethics approvals.",
    salary: "₹3.5L–5.0L LPA",
    workType: "High travel / hybrid",
    aiExposure: "Low automation",
    tools: "CTMS · eTMF · EDC · Outlook",
    image: "/images/ai-cr.jpg",
    href: "/industry/clinical-research",
  },
  {
    title: "Regulatory Affairs",
    subtitle: "Global Compliance",
    blurb: "Author and compile eCTD submissions, respond to health authority queries, maintain product licenses and ensure lifecycle compliance.",
    salary: "₹4.0L–6.0L LPA",
    workType: "Desk / hybrid",
    aiExposure: "Moderate (extraction & tracking)",
    tools: "eCTD · Veeva RIM · Documentum",
    image: "/images/ai-ra.jpg",
    href: "/industry/regulatory-affairs",
  },
  {
    title: "Medical Writing",
    subtitle: "Scientific Communications",
    blurb: "Author clinical study reports, investigator brochures, regulatory documents and scientific publications using trial data.",
    salary: "₹4.5L–6.5L LPA",
    workType: "Desk / remote",
    aiExposure: "High augmentation",
    tools: "Word · EndNote · Veeva · Datavision",
    image: "/images/ai-mw.jpg",
    href: "/industry/medical-writing",
  },
];

const steps = [
  ["01", "Explore the role", "See the actual work, skills, tools and employer expectations."],
  ["02", "Check your fit", "Take the free career assessment and get a role-fit report."],
  ["03", "Build the gaps", "Choose practical learning only after you know what you need."],
];

function SmallReviewCard({ review }: { review: PublishedReview }) {
  const isLinkedIn = review.source.includes("LinkedIn");
  const isArzon = review.sourceKind === "first-party";
  return (
    <article className="ap-small-card tone-light card-light">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#334155] min-w-0">
          {isLinkedIn ? (
            <Linkedin className="h-3.5 w-3.5 text-[#0A66C2] shrink-0" />
          ) : isArzon ? (
            <span className="grid h-3.5 w-3.5 place-items-center rounded bg-[#071A4A] text-[8px] font-bold text-white shrink-0">A</span>
          ) : (
            <Quote className="h-3 w-3 text-amber-600 shrink-0" />
          )}
          <span className="truncate">
            {isArzon ? "Arzon Feedback" : isLinkedIn ? "LinkedIn Post" : review.source.includes("Google") ? "Google Review" : "Justdial"}
          </span>
        </span>

        {review.rating ? (
          <span className="inline-flex items-center gap-0.5 font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/50 shrink-0">
            <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
            <span>{review.rating}.0</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-0.5 font-mono text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200/50 shrink-0">
            Verified
          </span>
        )}
      </div>

      <p className="text-[11.5px] leading-snug text-[#1E293B] line-clamp-2 italic font-sans my-auto">
        “{review.body}”
      </p>

      <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9]">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EEF6FF] font-bold text-[#1557D6] text-[10px]">
          {review.author.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <strong className="block text-[11px] font-bold text-[#071A4A] truncate leading-tight">
            {review.author}
          </strong>
          <span className="block text-[9px] text-[#69758A] truncate mt-0.5">
            {[review.degree, review.domain].filter(Boolean).join(" · ")}
          </span>
        </div>
      </div>
    </article>
  );
}

function HomeTestimonialFeed() {
  const [activeFilter, setActiveFilter] = useState<"all" | "google" | "justdial" | "linkedin" | "arzon">("all");

  const filteredReviews = REVIEWS.filter((review) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "google") return review.source.toLowerCase().includes("google");
    if (activeFilter === "justdial") return review.source.toLowerCase().includes("justdial");
    if (activeFilter === "linkedin") return review.source.toLowerCase().includes("linkedin");
    if (activeFilter === "arzon") return review.sourceKind === "first-party";
    return true;
  });

  // Split into two balanced sets for dual-row continuous infinite scrolling
  const row1 = filteredReviews.filter((_, i) => i % 2 === 0);
  const row2 = filteredReviews.filter((_, i) => i % 2 === 1);
  const finalRow2 = row2.length > 0 ? row2 : row1;

  // Calculate dynamic duration based on count (at least 32s for smooth glide)
  const duration1 = Math.max(30, row1.length * 4) + "s";
  const duration2 = Math.max(34, finalRow2.length * 4.2) + "s";

  return (
    <div className="space-y-3">
      {/* Interactive Filter Pills */}
      <div className="ap-testimonial-sources" role="tablist" aria-label="Testimonial source filter">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`ap-source-pill ${activeFilter === "all" ? "active" : ""}`}
        >
          <strong>All Sources</strong>
          <span>{REVIEWS.length} reviews</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("google")}
          className={`ap-source-pill ${activeFilter === "google" ? "active" : ""}`}
        >
          <strong>Google</strong>
          <span>{GOOGLE_RATING.ratingValue}/5 · {GOOGLE_RATING.reviewCount}+ ratings</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("justdial")}
          className={`ap-source-pill ${activeFilter === "justdial" ? "active" : ""}`}
        >
          <strong>Justdial</strong>
          <span>4.5/5 · 445 ratings</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("linkedin")}
          className={`ap-source-pill ${activeFilter === "linkedin" ? "active" : ""}`}
        >
          <strong>LinkedIn</strong>
          <span>Public learner posts</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("arzon")}
          className={`ap-source-pill ${activeFilter === "arzon" ? "active" : ""}`}
        >
          <strong>Arzon</strong>
          <span>Published feedback</span>
        </button>
      </div>

      {/* Row 1: Infinite Marquee (Left Scroll) */}
      <div
        className="ap-marquee-wrapper"
        style={{ ["--ap-marquee-duration" as string]: duration1 }}
      >
        <div className="ap-marquee-track">
          <div className="ap-marquee-row">
            {row1.map((review) => (
              <SmallReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="ap-marquee-row" aria-hidden="true">
            {row1.map((review) => (
              <SmallReviewCard key={`${review.id}-clone1`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Infinite Marquee (Right Scroll) */}
      <div
        className="ap-marquee-wrapper"
        style={{ ["--ap-marquee-duration" as string]: duration2 }}
      >
        <div className="ap-marquee-track is-reverse">
          <div className="ap-marquee-row">
            {finalRow2.map((review) => (
              <SmallReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="ap-marquee-row" aria-hidden="true">
            {finalRow2.map((review) => (
              <SmallReviewCard key={`${review.id}-clone2`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Ticker Bottom Metadata */}
      <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-mono text-[#69758A]">
        <span>Hover or tap any card to pause</span>
        <Link
          to={"/reviews" as any}
          className="inline-flex items-center gap-1 font-semibold text-[#1557D6] hover:underline"
        >
          <span>Explore all 40+ verified testimonials</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
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
              <div className="ap-kicker">Career Intelligence</div>
              <h2>Understand the career before you invest in it.</h2>
              <p>Real work. Hiring signals. Skills. Tools. Employers. Salary paths. AI exposure. Your preparation gap.</p>
            </div>
            <Link to="/roles" className="ap-text-link">View all roles <ArrowRight className="ap-icon" /></Link>
          </div>

          <div className="ap-intelligence-grid">
            {careerIntelligenceCards.map((career) => (
              <div key={career.href} className="ap-intelligence-card">
                <div className="ap-ic-visual">
                  <img src={career.image} alt={`${career.title} career intelligence cover`} loading="lazy" />
                  <div className="ap-ic-visual-overlay" />
                  <div className="ap-ic-title-overlay">
                    <h3>{career.title}</h3>
                    <span>{career.subtitle}</span>
                  </div>
                </div>
                
                <div className="ap-ic-body">
                  <div className="ap-ic-section">
                    <small>WHAT YOU ACTUALLY DO</small>
                    <p>{career.blurb}</p>
                  </div>

                  <div className="ap-ic-metrics">
                    <div className="ap-ic-metric">
                      <small>INDIA ENTRY RANGE</small>
                      <strong>{career.salary}</strong>
                    </div>
                    <div className="ap-ic-metric">
                      <small>TYPICAL WORK</small>
                      <strong>{career.workType}</strong>
                    </div>
                    <div className="ap-ic-metric">
                      <small>AI EXPOSURE</small>
                      <strong>{career.aiExposure}</strong>
                    </div>
                    <div className="ap-ic-metric ap-ic-tools">
                      <small>CORE TOOLS</small>
                      <strong>{career.tools}</strong>
                    </div>
                  </div>

                  <div className="ap-ic-action">
                    <Link to={career.href as any} className="ap-btn ap-btn-primary w-full justify-center">
                      Explore Career Intelligence
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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

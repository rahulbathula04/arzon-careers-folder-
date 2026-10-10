import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { CAREER_ROLES } from "@/data/careerRoles";
import { CareerStarterKitLeadMagnet } from "@/components/career/CareerStarterKitLeadMagnet";

export const Route = createFileRoute("/careers")({
  head: () => {
    const seoData = pageSeo({
      path: "/careers",
      title: "Arzon Global Careers & Salary Bands · Role Pathways",
      description:
        "Explore Arzon Global Careers, fresher salary bands (₹3.5L–₹6.5L), hiring CROs and role pathways across Pharmacovigilance, CDM & Medical Coding.",
      image: "/og/about.jpg",
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://arzoncareers.in/" },
              { "@type": "ListItem", position: 2, name: "Careers", item: "https://arzoncareers.in/careers" },
            ],
          }),
        },
      ],
    };
  },
  component: HealthcareCareersPage,
});

const PATHS = [
  {
    title: "Pharmacovigilance",
    slug: "pharmacovigilance",
    icon: ShieldCheck,
    description: "Drug safety, case processing and signal detection.",
  },
  {
    title: "Medical Coding",
    slug: "medical-coding",
    icon: Stethoscope,
    description: "Convert healthcare documentation into standard codes.",
  },
  {
    title: "Clinical SAS",
    slug: "sas-clinical",
    icon: BarChart3,
    description: "Analyse clinical research data for regulated reporting.",
  },
  {
    title: "Regulatory Affairs",
    slug: "regulatory-affairs",
    icon: BookOpenCheck,
    description: "Product registration, submissions and compliance.",
  },
  {
    title: "Clinical Data Management",
    slug: "clinical-data-management",
    icon: BriefcaseBusiness,
    description: "Manage and validate clinical-trial data.",
  },
  {
    title: "Nanoscience & Nanotechnology",
    slug: "nanoscience",
    icon: Microscope,
    description: "Applied research and advanced product development.",
    externalRoute: "/nanoscience-jobs",
  },
];

const FEATURED_ROLES = [
  "drug-safety-associate",
  "pv-associate",
  "outpatient-coder",
  "cda",
  "sas-programmer",
  "ra-associate",
]
  .map((slug) => CAREER_ROLES.find((role) => role.slug.endsWith(slug)))
  .filter((role): role is (typeof CAREER_ROLES)[number] => Boolean(role));

function HealthcareCareersPage() {
  return (
    <main className="arzon-v2-page min-h-screen">
      <ArzonV2PageHero
        eyebrow="CAREER INTELLIGENCE"
        title={
          <>
            From your degree to a <span className="text-blue-300">real healthcare career.</span>
          </>
        }
        description="Explore the role, understand the skills, see the employer context, and build a preparation path before you choose a programme."
        imageSrc="/images/bpharm-female-graduate-hero.jpg"
        imageAlt="Healthcare graduate exploring career opportunities"
        statLabel="Career pathways"
        statValue={CAREER_ROLES.length + " career paths"}
      >
        <Link to="/career-engine" className="arzon-v2-button-primary">
          Get My Career Plan <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/roles" className="arzon-v2-button-secondary bg-white/95">
          Explore Roles <ArrowRight className="h-4 w-4" />
        </Link>
      </ArzonV2PageHero>

      <section className="arzon-v2-proof-strip">
        <div className="arzon-v2-container arzon-v2-proof-grid">
          <Proof icon={GraduationCap} value={String(CAREER_ROLES.length)} label="Career paths" />
          <Proof icon={BriefcaseBusiness} value="JD-linked" label="Role research" />
          <Proof icon={CheckCircle2} value="Role-first" label="Preparation paths" />
          <Proof icon={ShieldCheck} value="Free" label="Career assessment" />
        </div>
      </section>

      <div className="arzon-v2-tabbar">
        <div className="arzon-v2-container arzon-v2-tabbar-inner">
          <a className="arzon-v2-tab" data-active="true" href="#overview">Overview</a>
          <a className="arzon-v2-tab" href="#career-paths">Career Paths</a>
          <a className="arzon-v2-tab" href="#roles">Roles</a>
          <a className="arzon-v2-tab" href="#job-market">Job Market</a>
          <a className="arzon-v2-tab" href="#next-step">Next Step</a>
        </div>
      </div>

      <section id="overview" className="arzon-v2-container arzon-v2-section">
        <div className="arzon-v2-section-heading">
          <div>
            <span className="arzon-v2-eyebrow">START HERE</span>
            <h2>Explore the career path before the programme.</h2>
          </div>
          <Link to="/career-engine" className="hidden text-sm font-bold text-blue-700 sm:inline-flex sm:items-center sm:gap-1">
            Get my career plan <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <div className="arzon-v2-card p-5 sm:p-6">
            <h3 className="text-lg font-extrabold text-[var(--arzon-ink-strong)]">What should you compare?</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["The work", "What the person actually does day to day."],
                ["The skills", "Recurring capabilities and software from role research."],
                ["The employers", "Where these roles appear and what varies by employer."],
                ["The preparation", "Projects and training connected to the target role."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-[var(--arzon-border)] bg-slate-50/70 p-4">
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="arzon-v2-card p-5 sm:p-6">
            <span className="arzon-v2-data-label">CAREER ENGINE</span>
            <h3 className="mt-2 text-xl font-extrabold tracking-tight">Not sure where you fit?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the free assessment to compare role paths against your background, interests and working preferences.
            </p>
            <Link to="/career-engine" className="arzon-v2-button-primary mt-5 w-full sm:w-fit">
              Find my career path <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="career-paths" className="border-y border-[var(--arzon-border)] bg-white tone-light">
        <div className="arzon-v2-container arzon-v2-section">
          <div className="arzon-v2-section-heading">
            <div>
              <span className="arzon-v2-eyebrow">CAREER PATHS</span>
              <h2>Choose the healthcare function you want to understand.</h2>
            </div>
            <Link to="/roles" className="hidden text-sm font-bold text-blue-700 sm:inline-flex sm:items-center sm:gap-1">
              View all roles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="arzon-v2-role-grid mt-6">
            {PATHS.map((path) => {
              const Icon = path.icon;
              const to = path.externalRoute ?? ("/roles/" + path.slug);
              return (
                <Link key={path.title} to={to as never} className="arzon-v2-role-card group">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold group-hover:text-blue-700">{path.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{path.description}</p>
                  <span className="mt-auto pt-4 text-xs font-bold text-blue-700">
                    Know more <ArrowRight className="ml-0.5 inline h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="job-market" className="arzon-v2-container arzon-v2-section">
        <div className="arzon-v2-section-heading">
          <div>
            <span className="arzon-v2-eyebrow">ROLE MARKET</span>
            <h2>Use job evidence to understand the work.</h2>
          </div>
          <Link to="/roles" className="hidden text-sm font-bold text-blue-700 sm:inline-flex sm:items-center sm:gap-1">
            Role directory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="arzon-v2-metric-grid mt-6">
          <Metric value={String(CAREER_ROLES.length)} label="Role profiles" />
          <Metric value="JD-linked" label="Skills and tools" />
          <Metric value="Role-first" label="Preparation model" />
        </div>

        <div id="roles" className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {FEATURED_ROLES.map((role) => {
            const slug = role.slug.split(".").pop() ?? role.slug;
            return (
              <article key={role.slug} className="arzon-v2-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="arzon-v2-data-label">{role.seniority} level</span>
                  {role.evidence ? (
                    <span className="text-[10px] font-bold text-emerald-700">{role.evidence.jdCount} JDs</span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-lg font-extrabold">{role.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{role.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
                <Link to="/roles/$slug" params={{ slug }} className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-blue-700">
                  View role <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <CareerStarterKitLeadMagnet />

      <section id="next-step" data-fab-avoid className="arzon-v2-container pb-14 sm:pb-20">
        <div className="arzon-v2-next-step">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-blue-200">NEXT STEP</span>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight sm:text-3xl">
                Know the role. Then decide how to prepare.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/80">
                Explore role requirements, take the free Career Engine assessment, review your personalised plan, and only then evaluate the relevant programme.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/career-engine" className="arzon-v2-button-secondary border-white/20 bg-white tone-light text-[var(--arzon-ink-strong)]">
                Get My Career Plan <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/courses" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-bold text-white hover:bg-white/10">
                View Programmes <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Proof({ icon: Icon, value, label }: { icon: typeof GraduationCap; value: string; label: string }) {
  return (
    <div className="arzon-v2-proof-item">
      <Icon className="h-4 w-4 shrink-0 text-blue-700" />
      <div>
        <p className="text-sm font-extrabold text-[var(--arzon-ink-strong)]">{value}</p>
        <p className="text-[10px] font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="arzon-v2-metric">
      <span className="arzon-v2-data-label">{label}</span>
      <p className="arzon-v2-metric-value">{value}</p>
    </div>
  );
}

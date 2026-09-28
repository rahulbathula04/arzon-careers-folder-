import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

const STORY_ROLES = [
  {
    title: "Pharmacovigilance",
    image: "/images/pv-clinical-workstation.jpg",
    eyebrow: "DRUG SAFETY",
    copy: "Review cases, code safety information and detect signals.",
    href: "/roles/pharmacovigilance",
  },
  {
    title: "Medical Coding",
    image: "/images/bpharm-male-graduate.jpg",
    eyebrow: "HEALTHCARE OPERATIONS",
    copy: "Turn clinical documentation into standardized healthcare codes.",
    href: "/roles/medical-coding",
  },
  {
    title: "Clinical Data",
    image: "/images/pv-career-graduate.jpg",
    eyebrow: "CLINICAL RESEARCH",
    copy: "Work with clinical data, queries, validation and study workflows.",
    href: "/roles/clinical-data-management",
  },
];

const STORY_STEPS = [
  ["01", "You have the degree.", "But the job titles, skills and pathways are still unclear."],
  ["02", "You see the work.", "Explore real role patterns, tools, employers and entry requirements."],
  ["03", "You test your direction.", "The Career Engine turns your answers into role paths worth exploring."],
  ["04", "You build the gap.", "Follow a role-specific preparation plan with projects and proof of work."],
] as const;

const PROGRAMMES = [
  ["Pharmacovigilance", "Case processing · MedDRA · Signal detection", "/images/pv-clinical-workstation.jpg", "/courses/pharmacovigilance"],
  ["Medical Coding", "ICD-10-CM · CPT · Revenue cycle", "/images/bpharm-male-graduate.jpg", "/courses/medical-coding"],
  ["Clinical Data Management", "EDC · Queries · Data quality", "/images/pv-career-graduate.jpg", "/courses/clinical-data-management"],
];

export function ArzonHomeV2() {
  return (
    <div className="arzon-v2-page min-h-screen overflow-hidden bg-white antialiased">
      <ArzonV2PageHero
        eyebrow="ARZON GLOBAL · CAREER INTELLIGENCE"
        title={<>Your degree is the beginning.<br /><span className="text-blue-300">Your career needs a direction.</span></>}
        description="See the person, the work, the role and the path before you decide what to learn."
        imageSrc="/images/bpharm-female-graduate-hero.jpg"
        imageAlt="Indian healthcare graduate building her career path"
        statLabel="CAREER ENGINE"
        statValue="Find your role"
      >
        <Link to="/career-engine" className="arzon-button-primary">
          Find My Career Path <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/roles" className="arzon-button-secondary bg-white/95">
          Explore Roles <ArrowRight className="h-4 w-4" />
        </Link>
      </ArzonV2PageHero>

      <section className="arzon-v2-proof-strip">
        <div className="arzon-v2-container arzon-v2-proof-grid">
          <HomeProof icon={GraduationCap} value="50+" label="Roles to explore" />
          <HomeProof icon={BriefcaseBusiness} value="JD-linked" label="Skills & employers" />
          <HomeProof icon={CheckCircle2} value="Role-first" label="Preparation paths" />
          <HomeProof icon={ShieldCheck} value="Free" label="Career assessment" />
        </div>
      </section>

      <section className="arzon-v2-container py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <span className="arzon-v2-eyebrow">THE STORY STARTS HERE</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--arzon-ink-strong)] sm:text-5xl">
              You don't need another course page.
              <span className="block text-blue-600">You need to see where the course leads.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Arzon starts with the career decision. Explore the work first, understand what employers ask for, then choose how to prepare.
            </p>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-slate-100">
            <img
              src="/images/bpharm-female-graduate-hero.jpg"
              alt="Healthcare graduate planning her career"
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-3">
              {["Degree", "Role", "Preparation"].map((item, index) => (
                <div key={item} className="rounded-xl border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700">0{index + 1}</span>
                  <p className="mt-1 text-sm font-extrabold text-slate-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--arzon-border)] bg-slate-50">
        <div className="arzon-v2-container py-14 sm:py-20">
          <div className="max-w-2xl">
            <span className="arzon-v2-eyebrow">HOW ARZON WORKS</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              A career decision should feel like a journey, not a catalogue.
            </h2>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {STORY_STEPS.map(([number, title, body]) => (
              <article key={number} className="arzon-v2-card overflow-hidden p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-xs font-extrabold text-white">{number}</span>
                <h3 className="mt-5 text-lg font-extrabold text-[var(--arzon-ink-strong)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="arzon-v2-container py-14 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="arzon-v2-eyebrow">SEE THE WORK</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Meet the careers before you choose one.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">The same visual language continues from the homepage into role intelligence.</p>
          </div>
          <Link to="/roles" className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-700">View all roles <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STORY_ROLES.map((role) => (
            <Link key={role.title} to={role.href as never} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img src={role.image} alt={role.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/92 p-4 backdrop-blur">
                  <span className="text-[9px] font-extrabold uppercase tracking-[.14em] text-blue-700">{role.eyebrow}</span>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-950">{role.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-slate-600">{role.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">Explore this role <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--arzon-navy-950)] text-white">
        <div className="arzon-v2-container py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-blue-200">CAREER ENGINE</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                What if the website could actually tell you where to go next?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
                Take the assessment, get a role recommendation, understand the evidence, and receive a preparation path.
              </p>
              <Link to="/career-engine" className="arzon-button-primary mt-6">
                Start Free Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 p-3 shadow-2xl">
              <div className="overflow-hidden rounded-xl bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <span className="text-xs font-extrabold text-slate-900">Your Career Engine</span>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold text-blue-700">5 MINUTES</span>
                </div>
                <div className="grid gap-5 p-5 sm:grid-cols-[.8fr_1.2fr]">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <img src="/images/bpharm-female-graduate-hero.jpg" alt="" className="h-12 w-12 rounded-full object-cover object-top" />
                      <div><p className="text-xs font-extrabold text-slate-900">Your career profile</p><p className="text-[10px] text-slate-500">B.Pharm · Fresher</p></div>
                    </div>
                    <div className="mt-5 h-2 rounded-full bg-slate-200"><div className="h-full w-3/4 rounded-full bg-blue-600" /></div>
                    <p className="mt-2 text-[10px] font-bold text-slate-500">Assessment in progress</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700">QUESTION 04</span>
                    <p className="mt-3 text-base font-extrabold text-slate-900">What kind of work interests you most?</p>
                    <div className="mt-4 space-y-2">
                      {["Working with data and analysis", "Healthcare and patient safety", "Regulatory and compliance"].map((option, index) => (
                        <div key={option} className={`rounded-lg border p-3 text-xs font-semibold ${index === 1 ? "border-blue-600 bg-blue-50 text-blue-800" : "border-slate-200 text-slate-600"}`}>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArzonDecisionHub
        eyebrow="FREE CAREER CLARITY"
        title="See the role. Then decide how to prepare."
        description="The programme comes after the career decision—not before it."
        primaryLabel="Find my career path"
        primaryTo="/career-engine"
        secondaryLabel="Browse role profiles"
        secondaryTo="/roles"
      />

      <section className="arzon-v2-container py-14 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="arzon-v2-eyebrow">PREPARE FOR THE WORK</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">The final step is a programme built around the role.</h2>
          </div>
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-extrabold text-blue-700">Explore programmes <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PROGRAMMES.map(([title, details, image, href]) => (
            <Link key={title} to={href as never} className="group relative min-h-[330px] overflow-hidden rounded-2xl">
              <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="text-[9px] font-bold uppercase tracking-[.14em] text-blue-200">ROLE-FOCUSED PROGRAMME</span>
                <h3 className="mt-2 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-200">{details}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold">View programme <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="arzon-v2-container py-14 text-center sm:py-20">
          <Sparkles className="mx-auto h-7 w-7 text-blue-600" />
          <span className="arzon-v2-eyebrow mt-3 inline-block">START YOUR STORY</span>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Don't buy a programme because you are confused.
            <span className="block text-blue-600">Find the career first.</span>
          </h2>
          <Link to="/career-engine" className="arzon-button-primary mx-auto mt-7">
            Find My Career Path <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function HomeProof({ icon: Icon, value, label }: { icon: typeof GraduationCap; value: string; label: string }) {
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

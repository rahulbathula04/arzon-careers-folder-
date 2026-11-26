import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  Layers3,
  Microscope,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { LINKS } from "@/components/landing/constants";

type SimulationTask = "intake" | "criteria" | "timeline" | "narrative";

const SIMULATION_TASKS: Array<{
  id: SimulationTask;
  number: string;
  label: string;
  description: string;
  prompts: string[];
}> = [
  {
    id: "intake",
    number: "01",
    label: "Case intake",
    description: "Review a synthetic report and identify the information supplied by the reporter.",
    prompts: ["Reporter information", "Suspect product details", "Reported event", "Relevant dates"],
  },
  {
    id: "criteria",
    number: "02",
    label: "Minimum criteria",
    description: "Check whether the information in the scenario is sufficient for the defined case-validity exercise.",
    prompts: ["Identifiable patient", "Identifiable reporter", "Suspect product", "Adverse event"],
  },
  {
    id: "timeline",
    number: "03",
    label: "Timeline review",
    description: "Review the dates in the scenario and explain which reporting-clock rule applies to the stated context.",
    prompts: ["Initial receipt date", "Follow-up information", "Applicable jurisdiction", "Reasoning recorded"],
  },
  {
    id: "narrative",
    number: "04",
    label: "Narrative & QC",
    description: "Review the case summary for clarity, chronology, missing information and internal consistency.",
    prompts: ["Chronological sequence", "Relevant clinical details", "Missing information", "Quality review notes"],
  },
];

const CAREER_PATHS = [
  {
    title: "Pharmacovigilance",
    role: "PV Associate · Drug Safety Associate",
    description: "Adverse event reporting, case processing, safety documentation and quality review.",
    image: "/images/pv-clinical-workstation.jpg",
    href: "/pv-associate",
    label: "Initial assessment focus",
  },
  {
    title: "Clinical Data Management",
    role: "Clinical Data Coordinator · CDM Associate",
    description: "Clinical data review, discrepancy handling, query workflows and data quality.",
    image: "/images/pv-clinical-collaboration.jpg",
    href: "/courses/clinical-data-management",
    label: "Explore role area",
  },
  {
    title: "Medical Coding",
    role: "Medical Coding Specialist",
    description: "Medical terminology, clinical documentation and role-specific coding systems.",
    image: "/images/pv-clinical-coding.jpg",
    href: "/courses/medical-coding",
    label: "Explore role area",
  },
  {
    title: "Regulatory Affairs",
    role: "Regulatory Operations Associate",
    description: "Regulatory documentation, submission processes and product information workflows.",
    image: "/images/pv-regulatory-audit.jpg",
    href: "/courses/regulatory-affairs",
    label: "Explore role area",
  },
];

const DEGREE_OPTIONS = [
  { label: "B.Pharm", detail: "Explore pharmacovigilance, medical coding and selected clinical operations roles, subject to each employer's criteria." },
  { label: "Pharm.D", detail: "Explore drug safety, clinical research and other healthcare roles where the employer's qualification criteria include Pharm.D." },
  { label: "M.Pharm", detail: "Explore role requirements relevant to your specialisation, experience and preferred area of work." },
  { label: "Life Sciences", detail: "Explore clinical data, research operations and other roles where the published qualification criteria match your degree." },
  { label: "MBBS / BDS", detail: "Explore relevant clinical research, safety and healthcare operations roles, subject to role-specific requirements." },
];

function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto mb-9 max-w-3xl text-center sm:mb-12" : "mb-8 max-w-2xl sm:mb-10"}>
      <p className="type-eyebrow text-arzon-teal">{eyebrow}</p>
      <h2 className="type-h1 mt-3 text-arzon-deep-teal">{title}</h2>
      {description ? <p className="type-body mt-4 text-ink-soft">{description}</p> : null}
    </div>
  );
}

function ProductPreview({ compact = false }: { compact?: boolean }) {
  const [activeTask, setActiveTask] = useState<SimulationTask>("intake");
  const task = SIMULATION_TASKS.find((item) => item.id === activeTask) ?? SIMULATION_TASKS[0];

  return (
    <div className={compact ? "rounded-3xl border border-arzon-seafoam/40 bg-white p-3 shadow-[0_18px_55px_rgba(0,75,69,0.10)]" : "rounded-3xl border border-arzon-seafoam/40 bg-white p-4 shadow-[0_18px_55px_rgba(0,75,69,0.08)] sm:p-6"}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-arzon-mint text-arzon-teal">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="type-label text-arzon-deep-teal">Clinical Simulation Engine</p>
            <p className="type-caption mt-0.5 text-ink-soft">Pharmacovigilance · Sample assessment</p>
          </div>
        </div>
        <span className="rounded-full bg-arzon-ice px-3 py-1 type-meta text-arzon-deep-teal">SYNTHETIC CASE</span>
      </div>

      <div className="grid gap-4 pt-4 md:grid-cols-[minmax(0,1fr)_11rem]">
        <div className="min-w-0">
          <div className="flex gap-1 overflow-x-auto pb-2" role="tablist" aria-label="Sample simulation tasks">
            {SIMULATION_TASKS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeTask === item.id}
                onClick={() => setActiveTask(item.id)}
                className={activeTask === item.id
                  ? "shrink-0 rounded-full bg-arzon-deep-teal px-3 py-2 type-caption font-semibold text-white"
                  : "shrink-0 rounded-full border border-border bg-white px-3 py-2 type-caption font-medium text-ink-soft transition-colors hover:border-arzon-seafoam hover:text-arzon-deep-teal"}
              >
                {item.number} · {item.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-arzon-ice p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="type-meta text-arzon-teal">TASK {task.number}</p>
              <span className="rounded-full border border-arzon-seafoam/50 bg-white px-2.5 py-1 type-caption text-arzon-deep-teal">Training environment</span>
            </div>
            <h3 className="type-h3 mt-2 text-arzon-deep-teal">{task.label}</h3>
            <p className="type-body-sm mt-2 text-ink-soft">{task.description}</p>

            <div className="mt-4 rounded-xl border border-arzon-seafoam/50 bg-white p-4">
              <div className="flex items-center gap-2">
                <FileSearch className="h-4 w-4 text-arzon-teal" />
                <p className="type-label text-arzon-deep-teal">Synthetic case record</p>
              </div>
              <p className="type-caption mt-2 text-ink-soft">
                Fictional training scenario. No real patient information or production safety database is used.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {task.prompts.map((prompt, index) => (
                  <div key={prompt} className="flex items-center gap-2 rounded-lg bg-arzon-ice px-3 py-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-arzon-mint type-meta text-arzon-deep-teal">{index + 1}</span>
                    <span className="type-caption text-ink">{prompt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl bg-arzon-mint/70 p-4">
          <p className="type-meta text-arzon-teal">WHAT THIS CAN ASSESS</p>
          <div className="mt-4 space-y-3">
            {["Information review", "Workflow understanding", "Reasoning and documentation", "Recognition of missing details"].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-arzon-teal" />
                <span className="type-caption text-arzon-deep-teal">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-arzon-seafoam/50 pt-4">
            <p className="type-caption text-ink-soft">Assessment results describe performance on the stated tasks. They are not a professional licence or employment guarantee.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function ArzonHomeIntelligence() {
  const [degree, setDegree] = useState("B.Pharm");
  const selectedDegree = DEGREE_OPTIONS.find((item) => item.label === degree) ?? DEGREE_OPTIONS[0];

  return (
    <div className="arzon-home-intelligence overflow-x-clip bg-white text-ink">
      <section id="platform" className="relative isolate overflow-hidden bg-gradient-to-br from-arzon-ice via-white to-arzon-mint/70">
        <div className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-arzon-seafoam/20 blur-3xl" aria-hidden="true" />
        <div className="ap-shell relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <p className="type-eyebrow text-arzon-teal">Healthcare talent intelligence</p>
            <h1 className="type-display mt-5 max-w-3xl text-arzon-deep-teal">
              Know what the industry requires.{" "}
              <span className="text-arzon-teal">Show what you can do.</span>
            </h1>
            <p className="type-body mt-6 max-w-xl text-ink-soft">
              Explore healthcare roles, understand the requirements behind them and demonstrate your knowledge through practical, role-based assessments.
            </p>
            <p className="type-body-sm mt-3 max-w-xl text-ink-soft">
              Arzon helps you connect your education and experience with the work a role involves, then understand what may be worth developing next.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={"/career-engine/start" as any}
                data-testid="primary-career-intelligence-cta"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-arzon-deep-teal px-7 py-3 type-label text-white shadow-[0_8px_22px_rgba(0,75,69,0.16)] transition hover:bg-arzon-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arzon-teal"
              >
                Build My Profile <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#clinical-simulation"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-arzon-seafoam/60 bg-white px-7 py-3 type-label text-arzon-deep-teal transition hover:bg-arzon-mint/50"
              >
                Explore a Sample Assessment <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-arzon-seafoam/40 pt-5">
              {[
                "Industry-informed role requirements",
                "Practical clinical simulations",
                "Clear candidate reports",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 type-caption text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-arzon-teal" />
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <Link to={"/recruiters" as any} className="inline-flex items-center gap-1.5 type-caption font-semibold text-arzon-teal hover:text-arzon-deep-teal">
                Hiring or assessing early-career talent? Explore Arzon for Employers <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="relative z-10 min-w-0">
            <ProductPreview compact />
            <p className="mt-3 text-center type-caption text-ink-mute">
              Product preview · Synthetic training data · Interface shown for illustration
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-arzon-seafoam/30 bg-white">
        <div className="ap-shell grid gap-4 py-5 sm:grid-cols-3 sm:gap-6">
          {[
            { icon: Search, title: "Understand the role", copy: "Start with published requirements and role context." },
            { icon: ClipboardCheck, title: "Demonstrate capability", copy: "Work through relevant tasks in a synthetic environment." },
            { icon: FileCheck2, title: "See your next step", copy: "Review what was shown, what is unverified and what to work on." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-arzon-mint text-arzon-teal">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="type-label text-arzon-deep-teal">{item.title}</p>
                  <p className="type-caption mt-1 text-ink-soft">{item.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="why-arzon" className="bg-arzon-ice py-14 sm:py-20">
        <div className="ap-shell">
          <SectionIntro
            eyebrow="The gap between education and work"
            title="Knowing the subject is one thing. Applying it is another."
            description="Your degree and resume are important parts of your story. Practical work can show additional things: how you review information, follow a process, explain a decision and document what you found."
            align="center"
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-3xl border border-arzon-seafoam/30 bg-white p-6 sm:p-8">
              <p className="type-meta text-ink-mute">WHAT A PROFILE CAN TELL YOU</p>
              <h3 className="type-h2 mt-3 text-arzon-deep-teal">Your background</h3>
              <p className="type-body-sm mt-2 text-ink-soft">Education, specialisation, projects, internships, certifications and the skills you report having.</p>
              <ul className="mt-6 space-y-3">
                {["What you studied", "Where you have gained experience", "Which roles interest you", "Which skills you say you have"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 type-body-sm text-ink-soft">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-arzon-teal" /> {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-arzon-seafoam/50 bg-arzon-mint/55 p-6 sm:p-8">
              <p className="type-meta text-arzon-teal">WHAT A PRACTICAL TASK CAN ADD</p>
              <h3 className="type-h2 mt-3 text-arzon-deep-teal">Your demonstrated work</h3>
              <p className="type-body-sm mt-2 text-ink-soft">A structured view of how you approached a defined scenario and which parts of the task you completed.</p>
              <ul className="mt-6 space-y-3">
                {["Identify information in a case", "Recognise missing details", "Follow the stated workflow", "Explain and document your reasoning"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 type-body-sm text-arzon-deep-teal">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-arzon-teal" /> {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center type-caption text-ink-mute">
            Neither a degree nor a single simulation tells the whole story. Arzon brings profile information and task-specific evidence together, with the limits of each made clear.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-14 sm:py-20">
        <div className="ap-shell">
          <SectionIntro
            eyebrow="How Arzon works"
            title="From industry requirements to your next step."
            description="A clear process connects the role you are exploring with your background, the tasks you complete and the information in your report."
            align="center"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "01", icon: FileSearch, title: "Understand the role", copy: "Review role requirements, qualifications and the responsibilities described by employers." },
              { number: "02", icon: UserRound, title: "Build your profile", copy: "Share your education, experience, skills and the career areas you want to explore." },
              { number: "03", icon: Microscope, title: "Demonstrate capability", copy: "Complete relevant knowledge checks and synthetic, role-based practical tasks." },
              { number: "04", icon: ClipboardCheck, title: "Review your next step", copy: "See demonstrated areas, gaps, unknowns and practical development options." },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="rounded-2xl border border-border bg-white p-5 transition hover:border-arzon-seafoam hover:shadow-[0_10px_28px_rgba(0,75,69,0.07)]">
                  <div className="flex items-center justify-between">
                    <span className="type-meta text-arzon-teal">{step.number}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-arzon-mint text-arzon-teal"><Icon className="h-5 w-5" /></span>
                  </div>
                  <h3 className="type-h3 mt-5 text-arzon-deep-teal">{step.title}</h3>
                  <p className="type-body-sm mt-2 text-ink-soft">{step.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="clinical-simulation" className="bg-arzon-ice py-14 sm:py-20">
        <div className="ap-shell">
          <div className="grid items-center gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div>
              <p className="type-eyebrow text-arzon-teal">See the product in action</p>
              <h2 className="type-h1 mt-3 text-arzon-deep-teal">Work through a case. Understand the task.</h2>
              <p className="type-body mt-4 text-ink-soft">
                The Clinical Simulation Engine gives candidates a place to practise selected pharmacovigilance workflows using fictional training scenarios. Assessment criteria are defined for the task and the result explains what was reviewed.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "ICSR intake and information review",
                  "Case validity and missing information",
                  "Timeline reasoning in a stated regulatory context",
                  "Narrative clarity and quality review",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 type-body-sm text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-arzon-teal" /> {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 type-caption text-ink-mute">
                The simulator is an educational assessment environment. It is not a production safety database, regulatory submission system or professional certification.
              </p>
              <Link to={"/career-assessment" as any} className="mt-7 inline-flex items-center gap-2 rounded-full bg-arzon-deep-teal px-6 py-3 type-label text-white transition hover:bg-arzon-teal">
                Explore the assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="min-w-0">
              <ProductPreview />
            </div>
          </div>
        </div>
      </section>

      <section id="career-paths" className="bg-white py-14 sm:py-20">
        <div className="ap-shell">
          <SectionIntro
            eyebrow="Explore healthcare career paths"
            title="Start with the work you want to understand."
            description="Explore selected healthcare and life-sciences role families. Requirements vary by employer, location, qualification and experience."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {CAREER_PATHS.map((career) => (
              <article key={career.title} className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:border-arzon-seafoam hover:shadow-[0_12px_32px_rgba(0,75,69,0.08)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-arzon-mint">
                  <img src={career.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 type-caption font-semibold text-arzon-deep-teal">{career.label}</span>
                </div>
                <div className="p-5">
                  <h3 className="type-h3 text-arzon-deep-teal">{career.title}</h3>
                  <p className="type-caption mt-1 font-medium text-arzon-teal">{career.role}</p>
                  <p className="type-body-sm mt-3 text-ink-soft">{career.description}</p>
                  <Link to={career.href as any} className="mt-5 inline-flex items-center gap-1.5 type-label text-arzon-teal hover:text-arzon-deep-teal">
                    Explore this role <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="degree-alignment" className="bg-arzon-ice py-14 sm:py-20">
        <div className="ap-shell grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="overflow-hidden rounded-3xl">
            <img src="/images/bpharm-students-group.jpg" alt="Healthcare and pharmacy students together" loading="lazy" className="aspect-[5/4] h-full w-full object-cover" />
          </div>
          <div>
            <p className="type-eyebrow text-arzon-teal">Degree and role exploration</p>
            <h2 className="type-h1 mt-3 text-arzon-deep-teal">See how your qualification relates to different roles.</h2>
            <p className="type-body mt-4 text-ink-soft">
              Choose your academic background to explore role families and the requirements worth checking. A degree selector is a starting point, not an automatic eligibility decision.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Choose your qualification">
              {DEGREE_OPTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setDegree(item.label)}
                  aria-pressed={degree === item.label}
                  className={degree === item.label
                    ? "rounded-full bg-arzon-deep-teal px-4 py-2 type-caption font-semibold text-white"
                    : "rounded-full border border-arzon-seafoam/50 bg-white px-4 py-2 type-caption font-medium text-arzon-deep-teal transition hover:bg-arzon-mint"}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-arzon-seafoam/40 bg-white p-5" aria-live="polite">
              <p className="type-meta text-arzon-teal">SELECTED QUALIFICATION</p>
              <h3 className="type-h3 mt-2 text-arzon-deep-teal">{selectedDegree.label}</h3>
              <p className="type-body-sm mt-2 text-ink-soft">{selectedDegree.detail}</p>
              <Link to={"/career-engine/start" as any} className="mt-4 inline-flex items-center gap-2 type-label text-arzon-teal hover:text-arzon-deep-teal">
                Start with my profile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="candidate-report" className="bg-white py-14 sm:py-20">
        <div className="ap-shell">
          <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="type-eyebrow text-arzon-teal">Your candidate report</p>
              <h2 className="type-h1 mt-3 text-arzon-deep-teal">A clearer view of where you stand.</h2>
              <p className="type-body mt-4 text-ink-soft">
                A useful report should explain the information it used, what was assessed and what remains unknown. It should not hide everything behind one unexplained score.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Your education, experience and target role",
                  "Role requirements relevant to your chosen path",
                  "Competencies demonstrated in the assessment",
                  "Areas that are partial, unverified or not assessed",
                  "Practical suggestions for what to do next",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 type-body-sm text-ink-soft">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-arzon-teal" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-arzon-seafoam/40 bg-arzon-ice p-4 shadow-[0_14px_42px_rgba(0,75,69,0.07)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-arzon-seafoam/40 pb-4">
                <div>
                  <p className="type-meta text-arzon-teal">ILLUSTRATIVE REPORT LAYOUT</p>
                  <h3 className="type-h3 mt-1 text-arzon-deep-teal">Candidate Capability Dossier</h3>
                </div>
                <span className="rounded-full bg-white px-3 py-1 type-caption text-ink-mute">Sample structure</span>
              </div>
              <div className="mt-4 rounded-2xl border border-border bg-white p-4">
                <p className="type-meta text-ink-mute">TARGET ROLE</p>
                <p className="type-label mt-1 text-arzon-deep-teal">Pharmacovigilance Associate</p>
                <p className="type-caption mt-1 text-ink-soft">The benchmark version and research period appear on the actual report.</p>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { label: "ICSR workflow understanding", state: "Demonstrated", kind: "good" },
                  { label: "Medical terminology task", state: "Partially demonstrated", kind: "partial" },
                  { label: "Regulatory timeline task", state: "Not yet assessed", kind: "unknown" },
                  { label: "Narrative writing", state: "Development suggested", kind: "action" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 rounded-xl border border-border bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="type-body-sm font-medium text-ink">{item.label}</span>
                    <span className={
                      item.kind === "good" ? "w-fit rounded-full bg-arzon-mint px-3 py-1 type-caption font-semibold text-arzon-deep-teal"
                        : item.kind === "partial" ? "w-fit rounded-full bg-amber-50 px-3 py-1 type-caption font-semibold text-amber-800"
                        : item.kind === "action" ? "w-fit rounded-full bg-arzon-ice px-3 py-1 type-caption font-semibold text-arzon-teal"
                        : "w-fit rounded-full bg-slate-100 px-3 py-1 type-caption font-medium text-slate-600"
                    }>{item.state}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 type-caption text-ink-mute">Illustrative labels only. Actual results depend on the candidate's submitted profile and completed assessment.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="industry-intelligence" className="bg-arzon-ice py-14 sm:py-20">
        <div className="ap-shell">
          <SectionIntro
            eyebrow="Industry research and methodology"
            title="Know where the requirements come from."
            description="Arzon's role intelligence is designed to draw on multiple evidence sources. Each published benchmark should show its scope, research window, source references and limitations."
            align="center"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: FileSearch, title: "Job descriptions", copy: "Review published qualifications, experience, skills, tools and responsibilities for relevant roles." },
              { icon: BriefcaseBusiness, title: "Employer input", copy: "Use conversations with employers and experienced professionals to add context about actual work expectations." },
              { icon: Layers3, title: "Market information", copy: "Use available hiring and labour-market information to understand where role requirements may be changing." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-arzon-seafoam/30 bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-arzon-mint text-arzon-teal"><Icon className="h-5 w-5" /></span>
                  <h3 className="type-h3 mt-5 text-arzon-deep-teal">{item.title}</h3>
                  <p className="type-body-sm mt-2 text-ink-soft">{item.copy}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-arzon-seafoam/40 bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="type-label text-arzon-deep-teal">Scheduled research, transparent scope</p>
              <p className="type-body-sm mt-1 text-ink-soft">Research reports should display the collection period, role, location, experience group, source list and known limitations. Published job descriptions are not universal industry standards.</p>
            </div>
            <Link to={"/resources" as any} className="mt-4 inline-flex shrink-0 items-center gap-2 type-label text-arzon-teal hover:text-arzon-deep-teal sm:mt-0">
              Explore Arzon resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="institutional-engagement" className="bg-white py-14 sm:py-20">
        <div className="ap-shell grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="overflow-hidden rounded-3xl border border-arzon-seafoam/30 bg-arzon-ice">
            <img
              src="/images/arzon-task-inauguration.png"
              alt="Photograph from the Arzon Global Hyderabad centre inauguration"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-white px-5 py-4">
              <div>
                <p className="type-label text-arzon-deep-teal">Hyderabad centre inauguration</p>
                <p className="type-caption mt-1 text-ink-soft">July 2025 · Event record</p>
              </div>
              <a href={LINKS.mediaInauguration.watch} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 type-caption font-semibold text-arzon-teal hover:text-arzon-deep-teal">
                Watch recording <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div>
            <p className="type-eyebrow text-arzon-teal">Institutional engagement</p>
            <h2 className="type-h1 mt-3 text-arzon-deep-teal">Our work is shaped by academic and industry engagement.</h2>
            <p className="type-body mt-4 text-ink-soft">
              Arzon Global's Hyderabad training centre was inaugurated in July 2025 in the presence of Dr. Srikanth Sinha, CEO of the Telangana Academy for Skill and Knowledge (TASK).
            </p>
            <p className="type-body-sm mt-3 text-ink-soft">
              We share the event record so students can see the context behind this engagement. Participation in an event does not imply government accreditation, regulatory approval or endorsement of Arzon's assessments.
            </p>
            <a href={LINKS.mediaInauguration.watch} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 type-label text-arzon-teal hover:text-arzon-deep-teal">
              View the event recording <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="learning-in-practice" className="bg-arzon-ice py-14 sm:py-20">
        <div className="ap-shell">
          <SectionIntro
            eyebrow="Learning in practice"
            title="See the people and work behind the programme."
            description="A look at the learning environments, sessions and practical activities that form part of Arzon's healthcare career work."
            align="center"
          />
          <div className="grid gap-4 md:grid-cols-3">
            <figure className="overflow-hidden rounded-2xl border border-border bg-white">
              <img src="/images/pv-masterclass-live-session.jpg" alt="A live pharmacovigilance learning session" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-4">
                <p className="type-label text-arzon-deep-teal">Mentor-led sessions</p>
                <p className="type-caption mt-1 text-ink-soft">Expert discussions and guided learning.</p>
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-border bg-white">
              <img src="/images/bpharm-students-group.jpg" alt="Pharmacy students at an academic gathering" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-4">
                <p className="type-label text-arzon-deep-teal">Student community</p>
                <p className="type-caption mt-1 text-ink-soft">Connecting learners around healthcare careers.</p>
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-border bg-white">
              <img src="/images/pv-workstation-realistic.jpg" alt="A pharmacovigilance workstation used as a learning reference" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-4">
                <p className="type-label text-arzon-deep-teal">Practical workflows</p>
                <p className="type-caption mt-1 text-ink-soft">Learning around structured casework and documentation.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="student-commitment" className="bg-arzon-deep-teal py-14 text-white sm:py-20">
        <div className="ap-shell grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="type-eyebrow text-arzon-seafoam">Our commitment to students</p>
            <h2 className="type-display mt-4 text-white">Your assessment comes first. A course comes second.</h2>
            <p className="type-body mt-5 max-w-2xl text-white/80">
              We begin by understanding your background and the role you are exploring. A learning recommendation should follow only when there is a genuine reason for it.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            {[
              "No artificial skill gaps to sell a programme",
              "No paid changes to assessment outcomes",
              "Clear distinction between claimed and demonstrated skills",
              "No promise of interviews, jobs or salaries",
              "External learning resources can be appropriate too",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 border-b border-white/10 py-3 last:border-b-0">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-arzon-seafoam" />
                <p className="type-body-sm text-white/90">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-14 sm:py-20">
        <div className="ap-shell grid gap-9 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="type-eyebrow text-arzon-teal">Frequently asked questions</p>
            <h2 className="type-h1 mt-3 text-arzon-deep-teal">A few things worth knowing.</h2>
            <p className="type-body-sm mt-3 text-ink-soft">Clear answers about profile assessment, simulations and what the results mean.</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {[
              ["What is Arzon Global?", "Arzon Global is a healthcare talent intelligence platform. It helps candidates understand role requirements, review their profile against those requirements and demonstrate selected capabilities through practical assessments."],
              ["Does an assessment result guarantee a job?", "No. Assessment results describe performance on the specified tasks and conditions. Employers make their own recruitment decisions, and Arzon does not guarantee interviews, offers or employment."],
              ["Are the clinical cases real patient cases?", "No. The educational simulator uses synthetic training scenarios. Candidates should never enter real patient information into the training environment."],
              ["Does Arzon always recommend its own programmes?", "No. Recommendations should reflect the candidate's identified needs. Independent study, external resources, practical experience or further assessment may be more appropriate than an Arzon programme."],
              ["How does Arzon understand role requirements?", "The research approach draws on relevant job descriptions, employer and professional input, and available market information. Each published research report should state its source coverage and collection period."],
              ["Is a role match an official industry certification?", "No. Role comparisons are guidance based on available evidence and stated assessment methods. They are not a statutory qualification, regulatory approval or universal industry standard."],
            ].map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 type-label text-arzon-deep-teal">
                  {question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-arzon-teal transition group-open:rotate-180" />
                </summary>
                <p className="type-body-sm mt-3 max-w-3xl text-ink-soft">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-arzon-mint via-white to-arzon-ice py-12 sm:py-16">
        <div className="ap-shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <p className="type-eyebrow text-arzon-teal">Your next step</p>
            <h2 className="type-h1 mt-2 text-arzon-deep-teal">Start with your profile. Understand the role.</h2>
            <p className="type-body-sm mt-3 text-ink-soft">Explore healthcare careers, review the requirements and see which areas may be worth developing.</p>
          </div>
          <Link to={"/career-engine/start" as any} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-arzon-deep-teal px-7 py-3 type-label text-white transition hover:bg-arzon-teal">
            Build My Profile <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

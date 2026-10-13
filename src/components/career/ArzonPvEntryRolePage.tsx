import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Database,
  FileCheck,
  FileSearch,
  FileText,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerRole } from "@/data/careerRoles";

type RoleJdProvenance = {
  roleTitle?: string;
  refreshedOn: string;
  sources?: string[];
  topMetros?: string[];
  topJdPhrases: Array<{ phrase: string; satisfiedByModule?: string | null }>;
} | null;

type RolePageProfile = {
  eyebrow: string;
  headline: string;
  summary: string;
  operatingPrinciple: string;
  workday: Array<{ title: string; description: string }>;
  coreSkills: Array<{ title: string; description: string }>;
  supportingSkills: string[];
  lookFor: string[];
  notTheSameAs: { title: string; description: string };
  first90Days: Array<{ period: string; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

const ROLE_PROFILES: Record<string, RolePageProfile> = {
  "drug-safety-associate": {
    eyebrow: "ENTRY-LEVEL ROLE · DRUG SAFETY OPERATIONS",
    headline: "Learn to move a safety report to the right next action.",
    summary:
      "Drug Safety Associates work at the operational front line of pharmacovigilance. They receive adverse-event information, check whether a report is valid, identify urgency, document decisions and route work through controlled processes.",
    operatingPrinciple: "Good intake is not just data entry. It is a traceable decision about what has arrived, what is known, what is missing and what must happen next.",
    workday: [
      { title: "Receive and index", description: "Capture source, receipt details, product and reporter information without losing the original context." },
      { title: "Check case validity", description: "Apply the four minimum ICSR criteria and document whether the report can be treated as a valid case." },
      { title: "Assess urgency", description: "Identify reported seriousness information, potential expedited pathways and the need for escalation under the supplied SOP." },
      { title: "Route and track", description: "Move the case to the correct queue, record missing information and maintain an auditable status trail." },
      { title: "Protect the deadline", description: "Use the case tracker to surface due dates, overdue follow-ups and unresolved blockers to the reviewer." },
    ],
    coreSkills: [
      { title: "Intake & validity", description: "Extract the four minimum criteria and explain why the report is valid, invalid or awaiting clarification." },
      { title: "Day-0 & triage logic", description: "Record the relevant receipt date and apply the provided reporting rules instead of guessing a deadline." },
      { title: "Seriousness awareness", description: "Recognize reported seriousness criteria and escalate uncertain or medically important cases." },
      { title: "Documentation discipline", description: "Write concise case notes, preserve source traceability and explain each status change." },
    ],
    supportingSkills: ["Spontaneous vs solicited sources", "E2D(R1) source context", "GVP and ICH awareness", "Follow-up tracking", "Duplicate screening", "SOP and audit-trail discipline"],
    lookFor: [
      "A clean intake and validity register with a reason for every decision.",
      "Evidence that the learner can prioritize a case without silently changing source facts.",
      "A tracker showing receipt date, status, outstanding information and escalation notes.",
    ],
    notTheSameAs: {
      title: "What the role does not authorize",
      description: "An entry-level associate does not independently diagnose a patient, invent missing clinical facts, make unsupported causality claims or authorize regulatory submission outside the employer's approved workflow.",
    },
    first90Days: [
      { period: "Days 1–30", title: "Follow the SOP accurately", description: "Learn case terminology, source handling, validity, receipt dates and the escalation route for uncertainty." },
      { period: "Days 31–60", title: "Process with structured review", description: "Complete intake and tracking tasks, respond to QC feedback and reduce repeat documentation defects." },
      { period: "Days 61–90", title: "Show dependable queue discipline", description: "Manage an assigned workload under supervision, flag deadline risks early and maintain traceable case notes." },
    ],
    faqs: [
      { question: "Is this suitable for a fresher?", answer: "It can be a target for eligible pharmacy and life-sciences graduates. Individual employers set their own degree, graduation-year, experience, shift and location requirements, so each vacancy must be checked." },
      { question: "Will I make real regulatory submissions during training?", answer: "The role-readiness track uses synthetic teaching cases and workflow simulation. It does not authorize learners to submit real safety cases or make decisions for a marketing authorisation holder." },
      { question: "Do I need to know Argus before joining?", answer: "Prior tool exposure varies by vacancy. The training should teach case-workflow logic and provide a clearly labelled demonstration or simulator where licensed Argus Safety access is unavailable." },
    ],
  },
  "pv-associate": {
    eyebrow: "ENTRY-LEVEL ROLE · CASE ASSESSMENT & DOCUMENTATION",
    headline: "Turn clinical source information into a coherent, reviewable case.",
    summary:
      "PV Associates commonly support end-to-end ICSR processing, including structured data capture, MedDRA and product coding, chronological narrative writing, follow-up, duplicate checks and quality review. The work depends on accuracy and evidence, not confident-sounding assumptions.",
    operatingPrinciple: "Every coded term and every sentence in the narrative should be traceable to source information or clearly identified as a qualified assessment.",
    workday: [
      { title: "Read the source", description: "Separate reported facts, medical history, treatment details, event chronology and information that is still missing." },
      { title: "Structure the case", description: "Enter patient, reporter, product, reaction, history, tests, outcome and relevant dates in the appropriate fields." },
      { title: "Code with rationale", description: "Choose a supported MedDRA term and standard product reference; document the rationale when the source is ambiguous." },
      { title: "Write the narrative", description: "Build a chronological account that agrees with the structured fields and preserves uncertainty in the source." },
      { title: "Follow up and self-check", description: "Raise targeted questions, search for possible duplicates and resolve conflicts before the next review step." },
    ],
    coreSkills: [
      { title: "MedDRA term selection", description: "Move from verbatim text to an appropriate LLT/PT and explain the choice using controlled terminology guidance." },
      { title: "Product coding", description: "Differentiate suspect and concomitant products and work from approved reference data instead of inventing a match." },
      { title: "Chronological narratives", description: "Maintain date, treatment, event, dechallenge, outcome and relevant clinical-data consistency." },
      { title: "Follow-up & duplicates", description: "Draft targeted questions and document why a record is or is not a possible duplicate." },
    ],
    supportingSkills: ["WHO-DD / product reference concepts", "CIOMS I form familiarity", "E2B(R3) field mapping", "QC defect correction", "Source reconciliation", "Professional medical writing"],
    lookFor: [
      "Coded cases with a visible rationale for difficult verbatims.",
      "Narratives that agree with data fields and preserve the chronology of source documents.",
      "Follow-up questions that target missing decision-relevant information rather than ask vague questions.",
    ],
    notTheSameAs: {
      title: "Coding is not clinical diagnosis",
      description: "The processor represents the event as reported and follows coding guidance. A code must not introduce a diagnosis that the source does not support, and unresolved clinical questions should be documented or escalated.",
    },
    first90Days: [
      { period: "Days 1–30", title: "Build source-to-field accuracy", description: "Practice case extraction, terminology lookup and the link between source facts and structured fields." },
      { period: "Days 31–60", title: "Improve narrative and coding quality", description: "Use reviewer findings to correct term selection, chronology, missing data and narrative-field conflicts." },
      { period: "Days 61–90", title: "Work a case through the review cycle", description: "Manage initial processing, follow-up and corrections within the assigned SOP and supervision model." },
    ],
    faqs: [
      { question: "Is PV Associate different from Drug Safety Associate?", answer: "Titles overlap across employers. Some teams use them interchangeably; others separate intake/triage, coding, narrative writing, QC or regional responsibilities. Read the duties, not just the title." },
      { question: "Will the course teach actual MedDRA and WHO Drug coding?", answer: "It should include guided coding practice using lawful training references or licensed access. The portfolio should label any sample dictionaries or mock tools accurately and should not imply that a learner holds a paid production licence." },
      { question: "Will the projects be real patient cases?", answer: "No. Project work should use synthetic, non-identifiable teaching cases. Patient data from employers, hospitals or public reports must not be copied into student portfolios." },
    ],
  },
  "icsr-case-processor": {
    eyebrow: "ENTRY-LEVEL ROLE · ICSR WORKFLOW EXECUTION",
    headline: "Build dependable case-processing habits, one field at a time.",
    summary:
      "An ICSR Case Processor transforms incoming safety information into a structured individual case safety report under an established workflow. The job demands careful source extraction, controlled data entry, coding support, duplicate screening, change tracking and reliable hand-off to QC or medical review.",
    operatingPrinciple: "A case is only reviewable when its source, fields, narrative, outstanding questions and change history tell the same story.",
    workday: [
      { title: "Index the source", description: "Record source type, country, receipt details and the document set received for the case." },
      { title: "Extract case data", description: "Capture the reported patient, reporter, products, reaction, history, tests and outcomes while marking absent data as absent." },
      { title: "Complete structured fields", description: "Populate the provided case template and track mandatory, conditional and unavailable information." },
      { title: "Search and reconcile", description: "Compare key identifiers and clinical details to locate potential duplicates or conflicting records." },
      { title: "Prepare for QC", description: "Run a self-check, record corrections and hand over unresolved clinical or data questions with context." },
    ],
    coreSkills: [
      { title: "Source-to-field accuracy", description: "Transfer information faithfully and distinguish not-reported from not-applicable or unknown where the system permits." },
      { title: "Workflow and status control", description: "Understand intake, data entry, coding, QC, follow-up and case-history stages in the supplied workflow." },
      { title: "Duplicate screening", description: "Compare multiple case identifiers and record the evidence supporting a duplicate or non-duplicate decision." },
      { title: "Error correction trail", description: "Document why a field changed, what source supports it and whether further review is needed." },
    ],
    supportingSkills: ["ICSR minimum criteria", "MedDRA / product coding basics", "CIOMS-to-E2B(R3) mapping", "Narrative-to-field consistency", "SOP adherence", "Queue and SLA tracking"],
    lookFor: [
      "Structured case files with source references and no invented facts.",
      "A documented duplicate search using consistent identifiers and clinical attributes.",
      "A QC-ready packet with open questions, corrections and version history.",
    ],
    notTheSameAs: {
      title: "Structured processing is not independent medical review",
      description: "The processor's responsibility is accurate, traceable execution within the defined workflow. Clinical interpretation, final medical assessment and regulatory dispatch follow the employer's controlled review and authorization process.",
    },
    first90Days: [
      { period: "Days 1–30", title: "Learn the case template", description: "Practice source mapping, field conventions, safe handling of unknown data and the team's workflow states." },
      { period: "Days 31–60", title: "Reduce preventable entry errors", description: "Use QC findings to improve completeness, date consistency, duplicate searching and correction traceability." },
      { period: "Days 61–90", title: "Deliver review-ready case packets", description: "Prepare assigned cases under supervision, keep work queues current and escalate blocked records promptly." },
    ],
    faqs: [
      { question: "Does an ICSR Case Processor need to make causality decisions?", answer: "That depends on the employer's role design and SOP. Students should learn the concepts and record reported information accurately, but must not make unsupported clinical conclusions or exceed their assigned authority." },
      { question: "What is the practical difference from a PV Associate?", answer: "ICSR Case Processor emphasizes workflow execution and data quality. PV Associate may include a broader mix of coding, narratives, follow-up and case assessment. Real job titles often overlap." },
      { question: "Will this page show live vacancies?", answer: "No. This is an occupation and readiness guide. A separate vacancy listing must confirm that each role is open, current and suitable for the candidate." },
    ],
  },
};

const PROJECTS = [
  {
    number: "01",
    label: "MINOR PROJECT",
    title: "Post-marketing ICSR production simulation",
    amount: "20 synthetic cases",
    description: "Determine validity and receipt-date decisions, extract case information, code supported terms, write chronological narratives, check possible duplicates and prepare targeted follow-up questions.",
    artifacts: ["Case packets and narratives", "Coding rationale log", "Follow-up and duplicate register"],
  },
  {
    number: "02",
    label: "MINOR PROJECT",
    title: "Independent QC & safety reconciliation",
    amount: "15 audits + reconciliation",
    description: "Audit pre-populated records containing deliberate defects, classify findings, reconcile a synthetic clinical-trial listing against safety records and document corrections with root-cause and CAPA recommendations.",
    artifacts: ["QC defect ledger", "Reconciliation discrepancy matrix", "Correction trail and CAPA report"],
  },
  {
    number: "03",
    label: "MAJOR CAPSTONE",
    title: "Integrated drug-safety operations & signal assessment",
    amount: "35-case capstone batch",
    description: "Combine case processing, literature screening, a synthetic safety line listing, preliminary signal screening and a clearly scoped aggregate-report section with a final operations dashboard.",
    artifacts: ["Case portfolio and line listing", "Signal-screening memo", "Scoped PSUR/PBRER section and KPI dashboard"],
  },
];

const CURRICULUM_STAGES = [
  { weeks: "01–03", label: "Foundations & intake", description: "PV lifecycle, India / US / EU regulatory context, source classification, validity, Day-0, seriousness and special situations.", icon: BookOpen },
  { weeks: "04–05", label: "Coding & narratives", description: "MedDRA, product coding, source-to-field extraction, narrative chronology, follow-up and duplicate handling.", icon: FileText },
  { weeks: "06–07", label: "Systems & quality", description: "Workflow simulation, E2B(R3) mapping, validation errors, independent QC and clinical-safety reconciliation.", icon: Database },
  { weeks: "08–09", label: "Surveillance & reports", description: "Literature screening, signal fundamentals, aggregate-report structure, risk management and audit readiness.", icon: Search },
  { weeks: "10–11", label: "Integrated production", description: "Timed case batches, follow-ups, peer QC, operational metrics and capstone defense.", icon: Workflow },
  { weeks: "12", label: "Readiness assessment", description: "Independent practical, viva, portfolio review, technical mock interviews and a personal gap report.", icon: GraduationCap },
];

const RELATED_ROLES = [
  { slug: "drug-safety-associate", title: "Drug Safety Associate", lens: "Intake, triage and routing" },
  { slug: "pv-associate", title: "PV Associate", lens: "Coding, narrative and case follow-up" },
  { slug: "icsr-case-processor", title: "ICSR Case Processor", lens: "Structured case workflow and data quality" },
];

export function isPriorityPvRoleSlug(slug: string): boolean {
  const cleanSlug = slug.split(".").pop() ?? slug;
  return Object.prototype.hasOwnProperty.call(ROLE_PROFILES, cleanSlug);
}

export function ArzonPvEntryRolePage({
  role,
  courseSlug,
  provenance,
}: {
  role: CareerRole;
  courseSlug: string;
  provenance: RoleJdProvenance;
}) {
  const slug = role.slug.split(".").pop() ?? role.slug;
  const profile = ROLE_PROFILES[slug];
  if (!profile) return null;

  const assessmentSearch = { role: slug };
  const refreshedLabel = provenance?.refreshedOn
    ? new Date(provenance.refreshedOn + "T00:00:00").toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : "Refresh date not supplied";
  const roleTasks = profile.workday;
  const otherRoles = RELATED_ROLES.filter((item) => item.slug !== slug);

  return (
    <main className="arzon-v2-page min-h-screen bg-[var(--arzon-surface)] text-[var(--arzon-ink-strong)]">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[var(--arzon-navy-950)] via-[var(--arzon-navy-900)] to-[var(--arzon-blue-700)] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute right-12 top-16 h-64 w-64 rounded-full border border-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="arzon-v2-container relative grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-100">
              <Link to="/roles" className="transition hover:text-white">Roles</Link>
              <span aria-hidden="true" className="text-white/45">/</span>
              <span>{role.name}</span>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {profile.eyebrow}
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl xl:text-6xl">
              {role.name}
              <span className="mt-3 block text-blue-200">{profile.headline}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">{profile.summary}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/career-engine/start" search={assessmentSearch} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[var(--arzon-navy-950)] shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50">
                Check my role fit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/courses/$slug" params={{ slug: courseSlug }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore the 12-week programme
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-xs leading-6 text-slate-300">Role guidance, not a live vacancy or placement guarantee. Employer eligibility and job duties vary by posting.</p>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-3 rounded-[2rem] border border-white/10" />
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-[var(--arzon-navy-950)] shadow-2xl">
              <div className="relative h-56 sm:h-64">
                <img src="/images/pv-clinical-workstation.jpg" alt="Pharmacovigilance case-work environment" className="absolute inset-0 h-full w-full object-cover object-center opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--arzon-navy-950)] via-[var(--arzon-navy-950)]/15 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[var(--arzon-navy-950)]/75 px-3 py-1.5 font-mono text-[10px] text-white backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  ROLE WORKFLOW
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200">OPERATING PRINCIPLE</p>
                  <p className="mt-2 max-w-md text-xl font-semibold leading-snug text-white sm:text-2xl">{profile.operatingPrinciple}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
                {[
                  { value: "12", label: "weeks" },
                  { value: "36", label: "guided classes" },
                  { value: "72", label: "contact hours" },
                  { value: "03", label: "assessed projects" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[var(--arzon-navy-950)] px-3 py-4 sm:px-4">
                    <p className="text-2xl font-semibold tracking-tight text-white">{stat.value}</p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-blue-200">THE WORKFLOW</p>
                    <p className="mt-1 text-sm font-semibold text-white">Source → structured case → quality review</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Workflow className="h-5 w-5 text-blue-200" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-1.5" aria-label="Five-stage case workflow">
                  {["Intake", "Extract", "Code", "Review", "Route"].map((stage, index) => (
                    <div key={stage} className="min-w-0">
                      <div className={"h-1.5 rounded-full " + (index < 3 ? "bg-blue-300" : "bg-white/20")} />
                      <p className="mt-2 truncate text-[9px] font-medium text-slate-300 sm:text-[10px]">{stage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -left-5 top-1/3 hidden max-w-44 rounded-2xl border border-[var(--arzon-border)] bg-white p-3 text-[var(--arzon-ink-strong)] shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--arzon-surface-subtle)] text-[var(--arzon-blue-700)]"><FileCheck className="h-4 w-4" /></div>
                <div><p className="text-[10px] font-bold">Traceable decisions</p><p className="text-[9px] text-[var(--arzon-ink-muted)]">Source-backed work</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="On this page" className="sticky top-0 z-30 border-b border-[var(--arzon-border)] bg-white/95 backdrop-blur">
        <div className="arzon-v2-container flex gap-5 overflow-x-auto py-3 text-xs font-semibold text-[var(--arzon-ink-soft)]">
          {[["workday", "The work"], ["skills", "Skills"], ["projects", "Projects"], ["curriculum", "12-week path"], ["evidence", "JD evidence"], ["questions", "FAQs"]].map(([href, label]) => (
            <a key={href} href={"#" + href} className="shrink-0 py-1 transition hover:text-[var(--arzon-blue-700)]">{label}</a>
          ))}
        </div>
      </nav>

      <section className="arzon-v2-container py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="arzon-v2-eyebrow">01 · ROLE REALITY</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">What the work looks like on a real team.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--arzon-ink-soft)]">Titles differ across CROs and pharma companies. Use the task list in a vacancy to understand whether a team needs intake support, end-to-end processing, coding, narrative writing or QC.</p>
            <div className="mt-6 rounded-2xl border border-[var(--arzon-border)] bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--arzon-surface-subtle)] text-[var(--arzon-blue-700)]"><Target className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-semibold text-[var(--arzon-ink-strong)]">{profile.notTheSameAs.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{profile.notTheSameAs.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="workday" className="scroll-mt-24">
            <div className="relative space-y-3 before:absolute before:bottom-8 before:left-5 before:top-8 before:w-px before:bg-[var(--arzon-border)]">
              {roleTasks.map((item, index) => (
                <article key={item.title} className="relative grid grid-cols-[2.5rem_1fr] gap-3 rounded-2xl border border-[var(--arzon-border)] bg-white p-4 transition hover:shadow-md sm:p-5">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)] font-mono text-xs font-bold text-[var(--arzon-blue-700)]">{String(index + 1).padStart(2, "0")}</div>
                  <div className="pt-0.5">
                    <h3 className="text-base font-bold text-[var(--arzon-ink-strong)]">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[var(--arzon-ink-soft)]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 border-y border-[var(--arzon-border)] bg-white">
        <div className="arzon-v2-container py-12 sm:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="arzon-v2-eyebrow">02 · SKILL STACK</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">What a fresher should be able to demonstrate.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--arzon-ink-soft)]">The proof is in the case file, coding rationale and correction trail—not only in knowing the name of a regulation or safety database.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {profile.coreSkills.map((skill, index) => {
              const icons = [ClipboardCheck, FileSearch, ShieldCheck, CheckCircle2];
              const Icon = icons[index % icons.length];
              return (
                <article key={skill.title} className="group rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-5 transition duration-200 hover:-translate-y-1 hover:border-[var(--arzon-blue-600)] hover:bg-white hover:shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[var(--arzon-blue-700)] shadow-sm"><Icon className="h-5 w-5" /></div>
                    <span className="font-mono text-[10px] font-bold text-[var(--arzon-ink-muted)]">CORE 0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-base font-bold text-[var(--arzon-ink-strong)]">{skill.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{skill.description}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-5 rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-5 sm:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--arzon-navy-950)] text-white"><Wrench className="h-5 w-5" /></div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--arzon-ink-strong)]">Supporting knowledge</h3>
                <p className="mt-1 text-sm text-[var(--arzon-ink-soft)]">Learn the vocabulary and workflow context needed to collaborate with downstream reviewers.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.supportingSkills.map((skill) => <span key={skill} className="rounded-full border border-[var(--arzon-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--arzon-ink-soft)]">{skill}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { title: "Source fidelity", text: "No invented facts. Missing information stays visible.", icon: FileText },
              { title: "Controlled workflow", text: "Decisions follow the supplied SOP and review authority.", icon: Workflow },
              { title: "Traceable corrections", text: "Changes include a reason and source of support.", icon: ShieldCheck },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 rounded-xl border border-[var(--arzon-border)] p-4">
                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--arzon-blue-700)]" />
                <div><h3 className="text-sm font-semibold text-[var(--arzon-ink-strong)]">{item.title}</h3><p className="mt-1 text-xs leading-5 text-[var(--arzon-ink-soft)]">{item.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="arzon-v2-container py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="arzon-v2-eyebrow">03 · PROOF OF WORK</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">Three projects. Three different kinds of proof.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--arzon-ink-soft)]">Each project builds on the previous one: first process the case, then audit the work, then combine case operations with wider safety analysis.</p>
            <div className="mt-6 rounded-2xl bg-[var(--arzon-navy-950)] p-5 text-white">
              <div className="flex items-center gap-3"><Layers className="h-5 w-5 text-blue-200" /><p className="font-semibold">Portfolio standard</p></div>
              <p className="mt-3 text-sm leading-6 text-slate-200">Synthetic case data, clearly labelled tools, documented decision rules, assessor feedback and evidence of corrected errors.</p>
            </div>
          </div>
          <div id="projects" className="scroll-mt-24 space-y-4">
            {PROJECTS.map((project, index) => {
              const icons = [FileText, ClipboardCheck, BarChart3];
              const Icon = icons[index];
              return (
                <article key={project.number} className="overflow-hidden rounded-2xl border border-[var(--arzon-border)] bg-white shadow-sm">
                  <div className="grid md:grid-cols-[6.3rem_1fr]">
                    <div className={"flex flex-row items-center justify-between gap-3 p-5 text-white md:flex-col md:items-start " + (index === 2 ? "bg-[var(--arzon-blue-700)]" : "bg-[var(--arzon-navy-950)]")}>
                      <span className="font-mono text-3xl font-semibold">{project.number}</span>
                      <Icon className="h-6 w-6 text-blue-200" />
                      <span className="font-mono text-[9px] font-bold tracking-wider text-blue-100">{project.label}</span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--arzon-surface)] px-3 py-1 text-xs font-semibold text-[var(--arzon-blue-700)]">{project.amount}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold leading-snug text-[var(--arzon-ink-strong)]">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{project.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.artifacts.map((artifact) => (
                          <span key={artifact} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--arzon-border)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--arzon-ink-soft)]"><CheckCircle2 className="h-3 w-3 text-[var(--arzon-teal-700)]" />{artifact}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="mt-5 rounded-xl border border-[var(--arzon-border)] bg-white p-4 text-xs leading-6 text-[var(--arzon-ink-muted)]"><strong className="text-[var(--arzon-ink-strong)]">Training boundary:</strong> all portfolio cases and datasets are synthetic. Projects demonstrate supervised practice; they are not real production work, regulatory submissions or proof of access to a licensed enterprise safety system.</p>
      </section>

      <section id="curriculum" className="scroll-mt-24 border-y border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)]">
        <div className="arzon-v2-container py-12 sm:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="arzon-v2-eyebrow">04 · THE 12-WEEK BUILD</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">A progression from intake to independent assessment.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--arzon-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--arzon-ink-strong)]"><Clock className="h-4 w-4 text-[var(--arzon-blue-700)]" />72 guided hours</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--arzon-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--arzon-ink-strong)]"><Zap className="h-4 w-4 text-[var(--arzon-blue-700)]" />Practical-first</span>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {CURRICULUM_STAGES.map((stage, index) => (
              <article key={stage.weeks} className="relative overflow-hidden rounded-2xl border border-[var(--arzon-border)] bg-white p-5 transition hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--arzon-surface)] text-[var(--arzon-blue-700)]"><stage.icon className="h-5 w-5" /></div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--arzon-ink-muted)]">WEEKS {stage.weeks}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[var(--arzon-ink-strong)]">{stage.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{stage.description}</p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--arzon-surface-subtle)]"><div className="h-full rounded-full bg-[var(--arzon-blue-700)]" style={{ width: ((index + 1) / CURRICULUM_STAGES.length * 100) + "%" }} /></div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-2xl border border-[var(--arzon-border)] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-[var(--arzon-blue-700)]" /><h3 className="font-bold text-[var(--arzon-ink-strong)]">Standards you'll learn to navigate</h3></div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["ICH E2A–E2F context", "E2B(R3)", "E2D(R1)", "ICH-GVP", "MedDRA", "WHO Drug reference", "CDSCO / PvPI", "SOPs & audit trails"].map((item) => <span key={item} className="rounded-full border border-[var(--arzon-border)] px-3 py-1.5 text-xs text-[var(--arzon-ink-soft)]">{item}</span>)}
              </div>
              <p className="mt-4 text-xs leading-5 text-[var(--arzon-ink-muted)]">Standards and implementation dates should be revalidated against the applicable regulator and target employer before each cohort.</p>
            </div>
            <div className="rounded-2xl border border-[var(--arzon-border)] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3"><Activity className="h-5 w-5 text-[var(--arzon-blue-700)]" /><h3 className="font-bold text-[var(--arzon-ink-strong)]">How readiness is assessed</h3></div>
              <div className="mt-4 space-y-3">
                {[
                  ["ICSR validity & extraction", "20 points"],
                  ["Coding rationale", "15 points"],
                  ["Narrative chronology", "15 points"],
                  ["Seriousness / causality / timelines", "15 points"],
                  ["QC & reconciliation", "20 points"],
                  ["Operational discipline", "10 points"],
                  ["Viva", "5 points"],
                ].map(([label, score]) => <div key={label} className="flex items-center justify-between gap-3 border-b border-[var(--arzon-border)] pb-2 last:border-0 last:pb-0"><span className="text-xs text-[var(--arzon-ink-soft)]">{label}</span><span className="font-mono text-xs font-bold text-[var(--arzon-ink-strong)]">{score}</span></div>)}
              </div>
              <p className="mt-4 text-xs leading-5 text-[var(--arzon-ink-muted)]">Proposed assessment rubric from the programme design. Final cohort rubric and critical-error rules should be approved before delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="evidence" className="scroll-mt-24 arzon-v2-container py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="arzon-v2-eyebrow">05 · JD → CURRICULUM → PROOF</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">Show how every requirement becomes a piece of evidence.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--arzon-ink-soft)]">Use this page alongside the specific vacancy. Employer wording, qualification rules, system access and reporting obligations can change; the mapping is a preparation guide, not a promise that every employer asks for the same things.</p>
            <div className="mt-6 rounded-2xl border border-[var(--arzon-border)] bg-white p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--arzon-ink-muted)]">DATA TRANSPARENCY</p>
              <p className="mt-2 text-sm font-semibold text-[var(--arzon-ink-strong)]">Arzon JD map last refreshed: {refreshedLabel}</p>
              <p className="mt-2 text-xs leading-5 text-[var(--arzon-ink-soft)]">A dated role-requirement map is not a live vacancy feed. Check the employer’s original posting for current details before applying.</p>
              {provenance?.sources?.length ? <div className="mt-4 flex flex-wrap gap-2">{provenance.sources.map((source) => <span key={source} className="rounded-full bg-[var(--arzon-surface)] px-2.5 py-1 text-[10px] font-medium text-[var(--arzon-ink-soft)]">{source}</span>)}</div> : null}
              {provenance?.topMetros?.length ? <p className="mt-3 text-xs text-[var(--arzon-ink-muted)]">Markets tracked in the dataset: {provenance.topMetros.join(" · ")}</p> : null}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--arzon-border)] bg-white">
            <div className="grid grid-cols-[1.05fr_0.95fr] gap-3 bg-[var(--arzon-navy-950)] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-100 sm:px-5">
              <span>Recurring requirement</span><span>Preparation evidence</span>
            </div>
            <div className="divide-y divide-[var(--arzon-border)]">
              {(provenance?.topJdPhrases?.length ? provenance.topJdPhrases : [
                { phrase: "End-to-end ICSR workflow", satisfiedByModule: "ICSR simulation and capstone" },
                { phrase: "Coding and narrative accuracy", satisfiedByModule: "Coding rationale and case packets" },
                { phrase: "QC, documentation and timelines", satisfiedByModule: "Independent QC and KPI tracker" },
              ]).map((item) => (
                <div key={item.phrase} className="grid grid-cols-[1.05fr_0.95fr] gap-3 px-4 py-4 sm:px-5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-teal-700)]" />
                    <span className="text-xs font-semibold leading-5 text-[var(--arzon-ink-strong)] sm:text-sm">{item.phrase}</span>
                  </div>
                  <div className="text-xs leading-5 text-[var(--arzon-ink-soft)]">{item.satisfiedByModule ?? "Map this requirement to the relevant assessed project and confirm coverage before launch."}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-4 sm:p-5">
              <p className="text-xs leading-5 text-[var(--arzon-ink-muted)]">The employer requirement and the student deliverable should be checked together. A lesson title or attendance record alone is not evidence of competence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--arzon-border)] bg-white">
        <div className="arzon-v2-container py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="arzon-v2-eyebrow">06 · CAREER FIT</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">Who should explore this path?</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--arzon-ink-soft)]">This work tends to suit people who like structured investigation, careful written communication, evidence-based decisions and consistent quality checks.</p>
              <div className="mt-5 space-y-3">
                {profile.lookFor.map((item) => <div key={item} className="flex gap-3 rounded-xl border border-[var(--arzon-border)] p-3.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-teal-700)]" /><p className="text-sm leading-6 text-[var(--arzon-ink-soft)]">{item}</p></div>)}
              </div>
            </div>
            <div>
              <div className="rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-5 sm:p-6">
                <div className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-[var(--arzon-blue-700)]" /><h3 className="font-bold text-[var(--arzon-ink-strong)]">Companies in Arzon's role-family dataset</h3></div>
                <p className="mt-2 text-xs leading-5 text-[var(--arzon-ink-muted)]">Examples represented in the catalogue; not all are hiring now and this list does not imply a partnership or placement relationship.</p>
                <div className="mt-4 flex flex-wrap gap-2">{role.topCompanies.slice(0, 9).map((company) => <span key={company} className="rounded-lg border border-[var(--arzon-border)] bg-white px-3 py-2 text-xs font-semibold text-[var(--arzon-ink-soft)]">{company}</span>)}</div>
              </div>
              <div className="mt-4 rounded-2xl border border-[var(--arzon-border)] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3"><GraduationCap className="h-5 w-5 text-[var(--arzon-blue-700)]" /><h3 className="font-bold text-[var(--arzon-ink-strong)]">Eligibility is vacancy-specific</h3></div>
                <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{role.eligibility?.note ?? "Many entry-level safety roles prefer pharmacy, medicine or life-sciences qualifications. Confirm degree eligibility, graduation year, experience, shift and location on the original posting."}</p>
                {role.eligibility?.required?.length ? <div className="mt-4 flex flex-wrap gap-2">{role.eligibility.required.map((item) => <span key={item} className="rounded-full bg-[var(--arzon-surface)] px-3 py-1.5 text-xs text-[var(--arzon-ink-soft)]">{item}</span>)}</div> : null}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-[var(--arzon-ink-strong)]">Possible next steps after gaining supervised experience</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {profile.first90Days.map((step) => (
                <article key={step.period} className="rounded-2xl border border-[var(--arzon-border)] bg-[var(--arzon-surface)] p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--arzon-blue-700)]">{step.period}</p>
                  <h4 className="mt-3 text-base font-bold text-[var(--arzon-ink-strong)]">{step.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="scroll-mt-24 arzon-v2-container py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <p className="arzon-v2-eyebrow">07 · QUESTIONS CANDIDATES ASK</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--arzon-ink-strong)] sm:text-4xl">Clear answers before you commit.</h2>
          <div className="mt-7 space-y-3">
            {profile.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-[var(--arzon-border)] bg-white p-5 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[var(--arzon-ink-strong)]">
                  <span>{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--arzon-surface)] text-[var(--arzon-blue-700)] transition group-open:rotate-45"><span className="text-xl leading-none">+</span></span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--arzon-ink-soft)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="arzon-v2-container pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--arzon-navy-950)] p-6 text-white sm:p-9 lg:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-[var(--arzon-blue-700)]/30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200">YOUR NEXT STEP</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Check fit first. Build proof for the work next.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Use the Career Engine to explore role fit, then review the Pharmacovigilance programme and its assessments. Apply only to vacancies whose current eligibility and duties match your profile.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link to="/career-engine/start" search={assessmentSearch} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[var(--arzon-navy-950)] transition hover:bg-blue-50">Explore my role fit <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/pharmacovigilance-jobs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Explore PV job guidance</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--arzon-border)] bg-white">
        <div className="arzon-v2-container py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="arzon-v2-eyebrow">RELATED ROLE PROFILES</p><h2 className="mt-2 text-2xl font-bold text-[var(--arzon-ink-strong)]">Compare the work before choosing.</h2></div>
            <Link to="/roles" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--arzon-blue-700)]">Browse all roles <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {otherRoles.map((item) => (
              <Link key={item.slug} to="/roles/$slug" params={{ slug: item.slug }} className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--arzon-border)] p-5 transition hover:border-[var(--arzon-blue-600)] hover:shadow-sm">
                <div><p className="text-xs font-semibold text-[var(--arzon-blue-700)]">{item.lens}</p><h3 className="mt-1 font-bold text-[var(--arzon-ink-strong)]">{item.title}</h3></div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[var(--arzon-ink-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--arzon-blue-700)]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

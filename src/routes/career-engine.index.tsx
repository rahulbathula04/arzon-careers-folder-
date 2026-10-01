import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BarChart3, CheckCircle2, Clock3, Database, FileCheck2,
  FlaskConical, GraduationCap, LockKeyhole, MessageCircle, ShieldCheck,
  Stethoscope, Target, Wrench,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";
import { SITE } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { trackCEFunnelStep, trackCECtaClicked } from "@/lib/careerEngineAnalytics";
import { TARGET_TOTAL } from "@/data/careerEngineSampler";

export const Route = createFileRoute("/career-engine/")({
  head: () => {
    const ps = pageSeo({
      path: "/career-engine",
      title: "Career Engine | Find the Healthcare Role That Fits You | Arzon Global",
      description:
        "Start a free Career Fit Assessment or learn about Arzon's invitation-only active work simulation. Understand your role fit before choosing a programme.",
      image: SITE.ogImages.careerEngine,
    });
    return {
      meta: [{ title: "Career Engine | Arzon Global" }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Career Engine", path: "/career-engine" },
        ]),
      }],
    };
  },
  component: CareerEngineLanding,
});

const ROLE_FAMILIES = [
  { icon: Stethoscope, title: "Pharmacovigilance", description: "Drug safety, adverse-event case processing and safety operations.", paths: "PV Associate · Drug Safety · Case Processing" },
  { icon: Database, title: "Clinical Data", description: "Clinical trial data cleaning, query management and database workflows.", paths: "Clinical Data Coordinator · Data Associate" },
  { icon: FileCheck2, title: "Regulatory Affairs", description: "Dossier preparation, submissions and regulatory documentation.", paths: "Regulatory Associate · Regulatory Operations" },
  { icon: BarChart3, title: "Healthcare Analytics", description: "Healthcare data, reporting and analytical operations.", paths: "Healthcare Analyst · Reporting Analyst" },
];

function CareerEngineLanding() {
  useEffect(() => { trackCEFunnelStep({ step: "interested" }); }, []);
  const trackCta = (target: string) => () => trackCECtaClicked({ step: "interested", target });

  return (
    <CareerShell>
      <main className="pb-8 arzon-page-surface">
        <section className="pt-5 pb-8 sm:pt-10 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-blue-800">
              <ShieldCheck className="h-3.5 w-3.5" /> Arzon Career Engine
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
              Find the healthcare role that fits your background.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              First understand your role fit. Then, if you need proof of practical ability, request access to an active work simulation.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {[`${TARGET_TOTAL} questions`, "About 6 minutes", "Role fit", "Work style", "Readiness signal"].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white card-light px-3 py-1.5 text-xs font-bold text-slate-600">{item}</span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-6xl gap-5 lg:grid-cols-[1fr_1.08fr]">
            <section className="rounded-3xl border-2 border-[var(--arzon-blue-700)] bg-white card-light p-6 shadow-lg sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--arzon-blue-700)] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
                  <Target className="h-3.5 w-3.5" /> Free
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Start here</span>
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Start My Free Career Assessment</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A personal career-fit assessment. It looks at your interests, skills, work preferences and background, then maps those signals to healthcare role families.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-extrabold text-blue-700">1</div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Map your background to roles</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">We match your existing skills and degrees to active healthcare sectors to find where you fit best.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700">2</div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Identify exact skill gaps</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">See exactly what you need to learn to be employable, before investing in any programme.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700">3</div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Get a clear action plan</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Receive a personalised career report with direct, actionable steps to enter the industry.</p>
                  </div>
                </div>
              </div>
              <Link to="/career-engine/start" onClick={trackCta("career_fit_primary")} className="arzon-button-primary mt-6 min-h-12 w-full rounded-xl px-5 text-sm font-extrabold">
                Start My Free Career Assessment <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-xs text-slate-500">Your answers are saved as you go. You should never have to repeat the assessment because a report page failed.</p>
            </section>

            <section className="career-engine-dark-panel relative isolate overflow-hidden rounded-3xl border p-5 text-white shadow-xl sm:p-8">
              <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 hidden h-56 w-56 rounded-full bg-blue-600/20 blur-3xl sm:block" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-amber-200">
                    <LockKeyhole className="h-3.5 w-3.5" /> Admin approval required
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Active work simulation</span>
                </div>
                <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">Prove how you work, not just what you know.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  The ACRI Pharmacovigilance work simulation is a separate practical product. It puts candidates into realistic PV case situations and evaluates decisions across defined competency areas.
                </p>
                <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3">
                  <MiniProof icon={FlaskConical} title="Real case work" body="Scenario-based PV decisions" />
                  <MiniProof icon={Wrench} title="Practical signals" body="Skills mapped to workflows" />
                  <MiniProof icon={GraduationCap} title="Credential path" body="Assessment and verification" />
                </div>
                <div className="mt-5 rounded-2xl border border-white/15 bg-white card-light p-4 !text-[#071A4A] sm:mt-6" style={{ color: '#071A4A' }}>
                  <div className="flex items-start gap-3">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    <div>
                      <p className="text-sm font-extrabold !text-[#071A4A]" style={{ color: '#071A4A' }}>Access is controlled by Arzon Admin</p>
                      <p className="mt-1 text-xs leading-5 !text-slate-600" style={{ color: '#475569' }}>
                        Candidates request an invite. Approved candidates receive an access key. The assessment remains unavailable until that key is validated.
                      </p>
                    </div>
                  </div>
                </div>
                <Link to="/acri/pharmacovigilance-certification" search={{ apply: "true" }} onClick={trackCta("acri_work_simulation")} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-slate-900 sm:mt-6 hover:bg-blue-50">
                  Request Simulation Access <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white card-light p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-700">THE DIFFERENCE</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Assessment and simulation solve different problems.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                The Career Fit Assessment helps a person decide where to look. The Active Work Simulation checks practical performance inside a specific role domain. One is broad and exploratory; the other is controlled and role-specific.
              </p>
            </div>
            <div className="space-y-3">
              <CompareRow label="Career Fit Assessment" value="Broad role direction" />
              <CompareRow label="Active Work Simulation" value="Practical role performance" />
              <CompareRow label="Access" value="Open to everyone" />
              <CompareRow label="ACRI access" value="Invite + admin approval" />
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-slate-700">WHAT THE CAREER ENGINE LOOKS AT</span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Your background first. Role requirements second.</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600">The assessment compares signals across several healthcare role families rather than forcing every student into one track.</p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROLE_FAMILIES.map(({ icon: Icon, title, description, paths }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white card-light p-5 shadow-sm">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-slate-700"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-base font-extrabold text-slate-950">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{description}</p>
                <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] font-bold leading-5 text-slate-500">{paths}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Metric icon={Clock3} value="~6 min" label="Assessment time" />
            <Metric icon={CheckCircle2} value={String(TARGET_TOTAL)} label="Questions in the full assessment" />
            <Metric icon={MessageCircle} value="Saved" label="Progress and result recovery" />
          </div>
        </section>

        <ArzonDecisionHub eyebrow="AFTER YOUR RESULT" title="Use the report before you choose a programme." description="Review the role path, skill gaps and next steps first. A programme should solve a defined gap, not be the first step." primaryLabel="Start My Free Assessment" primaryTo="/career-engine/start" secondaryLabel="Explore Healthcare Roles" secondaryTo="/roles" />

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white card-light p-5 text-xs leading-5 text-slate-500">
          <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-700" /><p>Career Engine results are guidance based on assessment responses. They are not hiring, placement or employment predictions. ACRI is a separate invitation-controlled work simulation and certification workflow.</p></div>
        </section>
      </main>
    </CareerShell>
  );
}

function MiniProof({ icon: Icon, title, body }: { icon: typeof FlaskConical; title: string; body: string }) {
  return (
    <div className="flex min-h-[104px] flex-col justify-between rounded-2xl border border-slate-200 bg-white card-light p-4 shadow-sm sm:min-h-0 sm:p-3">
      <Icon className="h-4 w-4 shrink-0 text-[#5B8FC5]" aria-hidden="true" />
      <div className="mt-3">
        <p className="text-xs font-extrabold !text-[#071A4A]" style={{ color: '#071A4A' }}>{title}</p>
        <p className="mt-1 text-[11px] leading-4 !text-slate-600" style={{ color: '#475569' }}>{body}</p>
      </div>
    </div>
  );
}
function CompareRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"><span className="text-xs font-bold text-slate-700">{label}</span><span className="text-right text-xs font-extrabold text-slate-950">{value}</span></div>;
}
function Metric({ icon: Icon, value, label }: { icon: typeof Clock3; value: string; label: string }) {
  return <div className="text-center"><Icon className="mx-auto h-5 w-5 text-slate-700" /><p className="mt-2 text-xl font-extrabold text-slate-950">{value}</p><p className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">{label}</p></div>;
}

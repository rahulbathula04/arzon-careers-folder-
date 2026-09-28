import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, GraduationCap, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";
import { InfiniteReviewMarquee } from "@/components/home/InfiniteReviewMarquee";

const CAREER_PATHS = [
  { title: "Pharmacovigilance", eyebrow: "DRUG SAFETY", copy: "Case processing, safety narratives, MedDRA and signal workflows.", image: "/images/pv-clinical-workstation.jpg", href: "/roles/pharmacovigilance", accent: "Drug safety" },
  { title: "Medical Coding", eyebrow: "HEALTHCARE DATA", copy: "Turn clinical documentation into accurate, standardised codes.", image: "/images/bpharm-male-graduate.jpg", href: "/roles/medical-coding", accent: "Coding" },
  { title: "Clinical Data", eyebrow: "CLINICAL OPERATIONS", copy: "Work with EDC systems, data cleaning and clinical trial datasets.", image: "/images/pv-career-graduate.jpg", href: "/roles/clinical-data-management", accent: "Clinical data" },
  { title: "Regulatory Affairs", eyebrow: "COMPLIANCE", copy: "Support submissions, documentation and regulated product lifecycles.", image: "/images/bpharm-female-graduate-hero.jpg", href: "/roles/regulatory-affairs", accent: "Regulatory" },
];

const PROGRAMMES = [
  { title: "Drug Safety Associate Track", tag: "PHARMACOVIGILANCE", image: "/images/pv-clinical-workstation.jpg", copy: "Build evidence around ICSR processing, MedDRA, narratives and safety workflows." },
  { title: "Medical Coder Track", tag: "MEDICAL CODING", image: "/images/bpharm-male-graduate.jpg", copy: "Build practical coding capability around anatomy, terminology and coding systems." },
  { title: "Clinical Data Associate Track", tag: "CLINICAL DATA", image: "/images/pv-career-graduate.jpg", copy: "Build data-management evidence around clinical workflows and industry platforms." },
];

const JOURNEY = [
  ["01", "Choose a role", "Start with the work, not the course catalogue."],
  ["02", "See the requirements", "Compare role expectations with your current profile."],
  ["03", "Build the gap", "Use projects, assessment and preparation to close specific gaps."],
  ["04", "Carry the evidence", "Keep your work and readiness record moving forward."],
] as const;

export function ArzonHomeV2() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="bg-[#F7F3EC] text-[#07152F]">
      <section className="relative overflow-hidden border-b border-[#07152F]/10 bg-[#F7F3EC]">
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-2xl"
          >
            <span className="inline-flex rounded-full border border-[#07152F]/15 bg-white/55 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
              Arzon Global · Career intelligence
            </span>
            <h1 className="mt-7 font-serif text-[clamp(3.25rem,7vw,6.8rem)] leading-[0.88] tracking-[-0.045em]">
              Build toward
              <br />
              <span className="italic">the role</span> you want.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#07152F]/70 sm:text-lg">
              See the work. Understand the skills. Test your direction. Build the evidence before you spend money on training.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/career-engine" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#07152F] px-6 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5">
                Get My Career Plan <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/roles" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#07152F]/20 bg-white/70 px-6 text-sm font-semibold transition-colors hover:bg-white">
                Explore careers
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#07152F]/60">
              {["Role intelligence", "Career assessment", "12-week roadmaps"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" /> {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.25rem] bg-[#07152F] shadow-[0_30px_90px_-35px_rgba(7,21,47,0.55)]">
              <img src="/images/bpharm-female-graduate-hero.jpg" alt="Healthcare graduate exploring career options" className="aspect-[4/5] w-full object-cover object-center sm:aspect-[5/4] lg:aspect-[4/5]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152F]/90 via-transparent to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 grid gap-3 sm:left-7 sm:right-7 sm:bottom-7">
                <div className="rounded-2xl border border-white/15 bg-[#07152F]/75 p-4 text-white backdrop-blur-md">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-blue-200">YOUR CAREER SIGNAL</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-serif text-2xl">Pharmacovigilance</p>
                      <p className="mt-1 text-xs text-white/65">Role direction · current capability · next gap</p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold text-emerald-200">Personalised</span>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-[#07152F]/10 bg-white p-4 shadow-xl sm:block"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#07152F]/45">NEXT STEP</p>
              <p className="mt-1 text-sm font-semibold">See the work before the course.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#07152F]/10 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2F5F8F]">THE PROBLEM</p>
              <h2 className="mt-5 font-serif text-4xl leading-[0.95] tracking-tight sm:text-6xl">
                You have the degree.
                <br />
                <span className="italic text-[#2F5F8F]">Now what?</span>
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#07152F]/65">
              Most career sites start by selling a course. Arzon starts one step earlier: with the role, the work, the employer requirements and the evidence you still need to build.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {JOURNEY.map(([number, title, copy], index) => (
              <motion.div
                key={number}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group rounded-3xl border border-[#07152F]/10 bg-[#F7F3EC] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="font-mono text-xs font-semibold text-[#2F5F8F]">{number}</span>
                <h3 className="mt-12 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#07152F]/60">{copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#F7F3EC] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2F5F8F]">SEE THE WORK</p>
              <h2 className="mt-4 font-serif text-4xl leading-none sm:text-6xl">Choose the role before you choose the programme.</h2>
            </div>
            <Link to="/roles" className="inline-flex items-center gap-2 text-sm font-semibold">See all roles <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {CAREER_PATHS.map((path, index) => (
              <motion.div
                key={path.title}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
              >
                <Link to={path.href as never} className="group relative block overflow-hidden rounded-[2rem] bg-[#07152F]">
                  <img src={path.image} alt="" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.04] group-hover:opacity-90" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-blue-200">{path.eyebrow}</p>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-3xl sm:text-4xl">{path.title}</h3>
                        <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">{path.copy}</p>
                      </div>
                      <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#07152F] sm:flex"><ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07152F] py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">CAREER ENGINE</p>
            <h2 className="mt-5 font-serif text-4xl leading-[0.96] sm:text-6xl">Your career direction should be personal.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Answer practical questions about how you think, work and learn. Your result turns that signal into a role direction, capability gaps and a preparation path.
            </p>
            <Link to="/career-engine" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07152F] transition hover:-translate-y-0.5">
              Start the assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-blue-200">CAREER SIGNAL</span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-200">READY TO EXPLORE</span>
            </div>
            <div className="py-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400">Suggested direction</p>
                  <p className="mt-2 font-serif text-3xl">Pharmacovigilance</p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
              <div className="mt-8 space-y-4">
                {[["Detail", 88], ["Compliance", 81], ["Writing", 76], ["Logic", 72]].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-1.5 flex justify-between text-[11px] text-slate-300"><span>{label}</span><span>{value}%</span></div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={reduceMotion ? { width: `${value}%` } : { width: 0 }}
                        whileInView={{ width: `${value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-blue-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/[0.06] p-4"><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Top gap</p><p className="mt-2 text-sm font-semibold">MedDRA workflow</p></div>
              <div className="rounded-2xl bg-white/[0.06] p-4"><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-slate-400">Next action</p><p className="mt-2 text-sm font-semibold">Build the 12-week plan</p></div>
            </div>
          </div>
        </div>
      </section>

      <ArzonDecisionHub
        eyebrow="DECIDE WITH EVIDENCE"
        title="Know your direction before you commit to training."
        description="Explore roles, take the assessment and use your result to decide whether a programme is the right next step."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Roles"
        secondaryTo="/roles"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2F5F8F]">ROLE-FOCUSED PROGRAMMES</p>
              <h2 className="mt-4 font-serif text-4xl leading-none sm:text-6xl">Programmes built around the work.</h2>
            </div>
            <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold">View programmes <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PROGRAMMES.map((programme, index) => (
              <motion.div
                key={programme.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Link to="/courses" className="group block overflow-hidden rounded-[2rem] border border-[#07152F]/10 bg-[#F7F3EC] transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="relative overflow-hidden">
                    <img src={programme.image} alt="" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] text-[#07152F]">{programme.tag}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl leading-tight">{programme.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#07152F]/60">{programme.copy}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Explore programme <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InfiniteReviewMarquee />

      <section className="bg-[#F7F3EC] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#07152F] text-white">
            <div className="grid lg:grid-cols-[1fr_0.8fr]">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200">START WITH CLARITY</p>
                <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[0.96] sm:text-6xl">Get a career plan before you spend money on training.</h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
                  Start with the assessment. See the recommended direction and current gaps. Then decide whether an Arzon programme belongs in your next step.
                </p>
                <Link to="/career-engine" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#07152F]">
                  Get My Career Plan <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full">
                <img src="/images/pv-career-graduate.jpg" alt="Healthcare professional preparing for a career" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07152F] via-[#07152F]/25 to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/15 bg-[#07152F]/65 p-4 backdrop-blur-md">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-blue-200">THE ARZON JOURNEY</p>
                  <p className="mt-2 text-sm text-white/85">Role → Assessment → Plan → Preparation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#07152F]/10 bg-[#F7F3EC] px-5 py-10 text-xs text-[#07152F]/50 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>Arzon Global · Healthcare career intelligence and role readiness.</span>
          <span className="inline-flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5" /> Built around roles, evidence and preparation.</span>
        </div>
      </footer>
    </main>
  );
}

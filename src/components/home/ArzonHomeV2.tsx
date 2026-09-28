import { ArrowRight, CheckCircle2, GraduationCap, BriefcaseBusiness, Sparkles, ShieldCheck, Search, Target, BookOpen, BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { COURSES } from "@/data/courses";
import { ARZON_CORE_PROGRAMME_SLUGS } from "@/data/siteArchitecture";
import { ArzonCareerPathGrid } from "@/components/home/ArzonCareerPathGrid";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

const CORE_COURSES = COURSES.filter((course) =>
  ARZON_CORE_PROGRAMME_SLUGS.includes(course.slug as (typeof ARZON_CORE_PROGRAMME_SLUGS)[number]),
).slice(0, 6);

const stages = [
  ["1st & 2nd Year", "Explore", "Understand roles early.", "/images/bpharm-students-group.jpg", "bg-blue-600"],
  ["3rd Year", "Build skills", "Start practical role work.", "/images/pharmacy-student-avatar.jpg", "bg-teal-600"],
  ["Final Year", "Get ready", "Build projects and interview evidence.", "/images/bpharm-male-graduate.jpg", "bg-violet-600"],
  ["Graduate", "Take action", "Close gaps for your target role.", "/images/bpharm-female-graduate-hero.jpg", "bg-orange-500"],
];

const proof = [
  [Search, "Start with the job", "See the work, tools and employer expectations."],
  [Target, "Check your direction", "Use the free career assessment before choosing a programme."],
  [BookOpen, "Build practical skills", "Practice through tasks, projects and mentor review."],
  [ShieldCheck, "Keep your evidence", "Turn completed work into a career-readiness record."],
];

const colours = ["from-blue-600 to-indigo-600", "from-teal-500 to-emerald-600", "from-violet-500 to-fuchsia-600", "from-orange-500 to-rose-500", "from-cyan-500 to-blue-600", "from-emerald-500 to-teal-600"];

export function ArzonHomeV2() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#FFFDF8] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F3F8FF] via-[#FFFDF8] to-[#EEFFFA]">
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-blue-700 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" /> Healthcare Career Intelligence
              </span>
              <h1 className="mt-6 max-w-3xl font-serif text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">
                Don't choose a course.
                <span className="block text-blue-700">Choose your career direction.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Explore healthcare roles, understand what employers expect, check your fit and build the skills that move you toward the work you want.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/career-engine" className="group inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-[#102E5C] px-6 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#173F78]">
                  Take the free career assessment <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link to="/roles" className="inline-flex h-13 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:text-blue-700">
                  Explore healthcare roles
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                {["Role-first research", "Employer requirements", "Practical projects", "Career assessment", "Human support"].map((x) => (
                  <span key={x} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{x}</span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -right-2 -top-5 z-20 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:block">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">CAREER PLAN</p>
                <p className="mt-1 text-sm font-bold text-[#102E5C]">Role → Skills → Evidence</p>
              </div>
              <div className="rounded-[32px] border-8 border-white bg-slate-100 shadow-[0_35px_80px_-30px_rgba(15,23,42,.5)]">
                <div className="relative h-[430px] overflow-hidden rounded-[24px]">
                  <img src="/images/bpharm-female-graduate-hero.jpg" alt="Healthcare graduate" className="h-full w-full object-cover" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A4A]/95 via-[#071A4A]/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/30 bg-white/95 p-4 shadow-xl backdrop-blur">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">FREE CAREER DIAGNOSTIC</p>
                    <p className="mt-1 text-lg font-extrabold">Which healthcare role fits you?</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {["Role fit", "Skill gaps", "Next steps"].map((x, i) => (
                        <div key={x} className="rounded-xl bg-slate-50 p-2.5">
                          <div className={`mb-2 h-1.5 rounded-full ${i === 0 ? "bg-blue-600" : i === 1 ? "bg-teal-500" : "bg-violet-500"}`} />
                          <p className="text-[10px] font-bold text-slate-700">{x}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-[#102E5C] px-4 py-3 text-white shadow-xl sm:block">
                <p className="text-[9px] font-bold uppercase tracking-widest text-blue-200">ABOUT 6 MINUTES</p>
                <p className="mt-1 text-sm font-bold">Get your free career report</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">
          {[["01","Explore","Roles"],["02","Assess","Career fit"],["03","Build","Skills"],["04","Prove","Evidence"]].map(([n,t,b],i) => (
            <div key={n} className="relative px-4 py-6 sm:px-7">
              <div className={`absolute inset-x-0 top-0 h-1 ${["bg-blue-600","bg-teal-500","bg-violet-500","bg-orange-500"][i]}`} />
              <span className="font-mono text-[10px] font-bold text-slate-400">{n}</span>
              <p className="mt-1 text-sm font-extrabold">{t}</p><p className="mt-1 text-xs text-slate-500">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <ArzonCareerPathGrid />

      <ArzonDecisionHub
        eyebrow="START HERE"
        title="Make the career decision before the course decision."
        description="Start free. Understand the work, check your fit and see the gap between where you are and what the role expects."
        primaryLabel="Get my free career report"
        primaryTo="/career-engine"
        secondaryLabel="See role intelligence"
        secondaryTo="/roles"
      />

      <section className="bg-[#F5F9FF] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700">HOW ARZON HELPS</span>
            <h2 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">A career system built around the work, not just the course.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Every step answers a student question: What can I do, what does the job need, where am I today and what should I work on next?</p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map(([Icon,title,body],i) => {
              const I = Icon as typeof Search;
              return <div key={title as string} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className={`absolute inset-x-0 top-0 h-1 ${["bg-blue-600","bg-teal-500","bg-violet-500","bg-orange-500"][i]}`} />
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${["bg-blue-50 text-blue-700","bg-teal-50 text-teal-700","bg-violet-50 text-violet-700","bg-orange-50 text-orange-700"][i]}`}><I className="h-5 w-5" /></div>
                <h3 className="mt-5 text-lg font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body as string}</p>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-700">FOR STUDENTS</span>
              <h2 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">Wherever you are in college, there is a next step.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Start early, build skills in college or focus on your first role after graduation.</p>
            </div>
            <Link to="/healthcare-careers" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">Explore career paths <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map(([title,sub,body,img,color]) => <div key={title} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden"><img src={img} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" /><span className={`absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase text-white ${color}`}>{sub}</span></div>
              <div className="p-5"><h3 className="font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p><Link to="/career-engine" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-700">Find your next step <ArrowRight className="h-3 w-3" /></Link></div>
            </div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#FFF7ED] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4"><div><span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-700">ROLE-FOCUSED PROGRAMMES</span><h2 className="mt-5 font-serif text-4xl font-bold sm:text-5xl">Learn for a role. Practice the work. Build evidence.</h2></div><Link to="/courses" className="hidden items-center gap-2 text-sm font-bold text-blue-700 sm:inline-flex">View all <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_COURSES.map((course,i) => <Link key={course.slug} to="/courses/$slug" params={{slug:course.slug}} className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${colours[i % colours.length]}`} />
              <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${colours[i % colours.length]} text-white shadow-lg`}><course.Icon className="h-5 w-5" /></div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{course.roleTitle ?? course.category}</p>
              <h3 className="mt-1 text-lg font-extrabold">{course.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{course.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">{course.tools.slice(0,3).map(t=><span key={t} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">{t}</span>)}</div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#102E5C] py-16 text-white sm:py-20">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.8fr] lg:items-center lg:px-8">
          <div><span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-100">FOR COLLEGES & EMPLOYERS</span><h2 className="mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Connect learning to real healthcare work.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">Use role intelligence, assessments, practical projects and evidence for student preparation and talent discovery.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link to="/tpos" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#102E5C]"><GraduationCap className="h-4 w-4" /> For colleges</Link><Link to="/recruiters" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white"><BriefcaseBusiness className="h-4 w-4" /> For employers</Link></div></div>
          <div className="grid grid-cols-2 gap-3">{[["19+","career pathways"],["2,000+","role signals"],["6 min","assessment"],["1","career profile"]].map(([v,l],i)=><div key={l} className="rounded-3xl border border-white/10 bg-white/10 p-5"><div className={`h-1.5 w-10 rounded-full ${["bg-cyan-400","bg-emerald-400","bg-violet-400","bg-orange-400"][i]}`} /><p className="mt-5 text-2xl font-black">{v}</p><p className="mt-1 text-xs text-blue-100">{l}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#F1F7FF] via-white to-[#EEFFFA] px-4 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-3xl"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#102E5C] text-white shadow-lg"><BarChart3 className="h-6 w-6" /></div><h2 className="mt-6 font-serif text-4xl font-bold sm:text-5xl">Know your direction before you spend money on training.</h2><p className="mt-4 text-base leading-7 text-slate-600">Take the free assessment, get your report and decide your next step with more information.</p><Link to="/career-engine" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#102E5C] px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#173F78]">Get my free career report <ArrowRight className="h-4 w-4" /></Link></div>
      </section>
    </div>
  );
}

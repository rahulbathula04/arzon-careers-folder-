import {
  ArrowRight,
  BarChart3,
  BookOpen,
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
import { COURSES } from "@/data/courses";
import { ARZON_CORE_PROGRAMME_SLUGS, ARZON_CORE_CAREERS } from "@/data/siteArchitecture";
import { REVIEWS, AGGREGATE_RATING } from "@/data/reviews";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

const CORE_COURSES = COURSES.filter((course) =>
  ARZON_CORE_PROGRAMME_SLUGS.includes(course.slug as (typeof ARZON_CORE_PROGRAMME_SLUGS)[number]),
).slice(0, 6);

const careerVisuals = [
  { image: "/images/bpharm-students-group.jpg", tone: "from-blue-600 to-indigo-700" },
  { image: "/images/pharmacy-student-avatar.jpg", tone: "from-teal-500 to-emerald-700" },
  { image: "/images/bpharm-male-graduate.jpg", tone: "from-violet-500 to-purple-700" },
  { image: "/images/bpharm-female-graduate-hero.jpg", tone: "from-orange-500 to-rose-600" },
  { image: "/images/bpharm-students-group.jpg", tone: "from-cyan-500 to-blue-700" },
  { image: "/images/pharmacy-student-avatar.jpg", tone: "from-emerald-500 to-teal-700" },
];

const stages = [
  ["1st & 2nd Year", "Explore", "See the roles, work and employer expectations early.", "/images/bpharm-students-group.jpg"],
  ["3rd Year", "Build", "Start practical role work and build useful evidence.", "/images/pharmacy-student-avatar.jpg"],
  ["Final Year", "Prepare", "Turn projects and skills into interview-ready evidence.", "/images/bpharm-male-graduate.jpg"],
  ["Graduate", "Act", "Close the gaps for the role you want next.", "/images/bpharm-female-graduate-hero.jpg"],
];

const proof = [
  [Search, "Start with the job", "See responsibilities, tools, skills and employer signals."],
  [Target, "Check your direction", "Use the free assessment before choosing a programme."],
  [BookOpen, "Build practical skills", "Work through role-focused tasks and projects."],
  [ShieldCheck, "Keep your evidence", "Build a structured record of your readiness."],
];

const colours = [
  "from-blue-600 to-indigo-600",
  "from-teal-500 to-emerald-600",
  "from-violet-500 to-fuchsia-600",
  "from-orange-500 to-rose-500",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
];

export function ArzonHomeV2() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#fbfcff] text-slate-950">
      <section className="relative overflow-hidden bg-[#071a3f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(59,130,246,.28),transparent_34%),radial-gradient(circle_at_12%_85%,rgba(45,212,191,.14),transparent_30%)]" />
        <div className="absolute -right-28 top-16 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-blue-100 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Healthcare career intelligence
              </div>
              <h1 className="mt-6 font-serif text-5xl font-bold leading-[.96] tracking-tight sm:text-6xl lg:text-[4.7rem]">
                Stop choosing courses.
                <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">Start choosing roles.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
                Understand the healthcare jobs market, check your role fit and see exactly what skills and evidence you need before you spend money on training.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/career-engine" className="group inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-white tone-light px-6 text-sm font-extrabold text-[#102e5c] shadow-[0_18px_50px_-20px_rgba(255,255,255,.7)] transition hover:-translate-y-0.5 hover:bg-blue-50">
                  Get my industry-fit score <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link to="/roles" className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15">
                  Explore healthcare roles
                </Link>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4">
                {[["19+","career paths"],["2,000+","role signals"],["6 min","assessment"],["1","career profile"]].map(([value,label]) => (
                  <div key={label} className="border-l border-white/15 pl-3"><p className="text-lg font-black text-white">{value}</p><p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-200">{label}</p></div>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-2xl">
              <div className="absolute -right-3 top-8 z-30 hidden w-52 rounded-2xl border border-white/20 bg-[#0c2757]/90 p-4 shadow-2xl backdrop-blur-xl sm:block">
                <div className="flex items-center justify-between"><span className="text-[9px] font-bold uppercase tracking-[.16em] text-blue-200">Industry fit</span><ShieldCheck className="h-4 w-4 text-emerald-300" /></div>
                <div className="mt-3 flex items-end gap-2"><span className="text-3xl font-black">82</span><span className="pb-1 text-xs font-bold text-emerald-300">Ready</span></div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[82%] rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" /></div>
              </div>
              <div className="overflow-hidden rounded-[32px] border border-white/15 bg-white/8 p-2 shadow-[0_40px_100px_-35px_rgba(0,0,0,.8)] backdrop-blur">
                <div className="relative overflow-hidden rounded-[26px]">
                  <img src="/images/bpharm-female-graduate-hero.jpg" alt="Healthcare graduate exploring career options" className="h-[500px] w-full object-cover object-center sm:h-[560px]" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061735] via-[#061735]/15 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Live role intelligence</div>
                  <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/20 bg-white/95 p-4 text-slate-900 shadow-2xl backdrop-blur-xl sm:p-5">
                    <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-blue-700">Career report preview</p><h2 className="mt-1 text-xl font-black">Pharmacovigilance Associate</h2></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-700">Strong match</span></div>
                    <div className="mt-4 grid grid-cols-3 gap-2">{[["Role fit","82%","bg-blue-600"],["Skill gap","24%","bg-violet-500"],["Next step","90 days","bg-orange-500"]].map(([label,value,color]) => <div key={label} className="rounded-xl bg-slate-50 p-3"><div className={`mb-2 h-1.5 w-8 rounded-full ${color}`} /><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-black text-slate-800">{value}</p></div>)}</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-4 z-20 hidden items-center gap-3 rounded-2xl bg-white tone-light px-4 py-3 text-slate-900 shadow-2xl sm:flex"><div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-blue-700"><Clock3 className="h-4 w-4" /></div><div><p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">About 6 minutes</p><p className="text-xs font-extrabold">Get your free career report</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white tone-light">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">
          {[["01","Explore","Roles","bg-blue-600"],["02","Assess","Career fit","bg-teal-500"],["03","Build","Skills","bg-violet-500"],["04","Prove","Evidence","bg-orange-500"]].map(([number,title,subtitle,color]) => <div key={number} className="relative border-r border-slate-200 px-4 py-6 last:border-r-0 sm:px-7"><div className={`absolute inset-x-0 top-0 h-1 ${color}`} /><span className="font-mono text-[10px] font-bold text-slate-400">{number}</span><p className="mt-1 text-sm font-black">{title}</p><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>)}
        </div>
      </section>

      <section className="bg-[#f7f9ff] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl"><span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-blue-700"><BriefcaseBusiness className="h-3 w-3" /> Role intelligence</span><h2 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">Compare careers before you compare courses.</h2><p className="mt-4 text-base leading-7 text-slate-600">See the actual work, skills, tools, employers and preparation path for each healthcare role.</p></div>
            <Link to="/roles" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">View all roles <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{ARZON_CORE_CAREERS.map((career,i) => { const visual=careerVisuals[i%careerVisuals.length]; return <Link key={career.href} to={career.href as any} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white tone-light shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_55px_-30px_rgba(15,23,42,.55)]"><div className="relative h-44 overflow-hidden"><img src={visual.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /><div className={`absolute inset-0 bg-gradient-to-t ${visual.tone} opacity-75 mix-blend-multiply`} /><div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-white/70">Career path</p><h3 className="mt-1 text-lg font-black">{career.label}</h3></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-white group-hover:text-blue-700"><ArrowRight className="h-4 w-4" /></span></div></div><div className="p-5"><p className="text-sm leading-6 text-slate-600">Role overview, skills, tools, employer signals and the preparation path.</p><div className="mt-4 flex flex-wrap gap-2">{["Role","Skills","Jobs"].map(tag => <span key={tag} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">{tag}</span>)}</div></div></Link>; })}</div>
        </div>
      </section>

      <ArzonDecisionHub eyebrow="START FREE" title="Make the career decision before the course decision." description="Answer a short assessment, get structured role-fit signals and see what to work on next." primaryLabel="Get my industry-fit score" primaryTo="/career-engine" secondaryLabel="See role intelligence" secondaryTo="/roles" />

      <section className="tone-light bg-white py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="max-w-2xl"><span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-700">HOW IT WORKS</span><h2 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">A career system built around the work, not just the course.</h2><p className="mt-4 text-base leading-7 text-slate-600">Each step answers a practical question before you make the next decision.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{proof.map(([Icon,title,body],i)=>{const I=Icon as typeof Search; const accents=["bg-blue-50 text-blue-700","bg-teal-50 text-teal-700","bg-violet-50 text-violet-700","bg-orange-50 text-orange-700"]; return <div key={title as string} className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white tone-light p-6 shadow-sm"><div className={`absolute inset-x-0 top-0 h-1 ${["bg-blue-600","bg-teal-500","bg-violet-500","bg-orange-500"][i]}`} /><div className={`grid h-12 w-12 place-items-center rounded-2xl ${accents[i]}`}><I className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-black">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body as string}</p></div>})}</div></div></section>

      <section className="bg-[#f4f7ff] py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700">FOR STUDENTS</span><h2 className="mt-5 font-serif text-4xl font-bold leading-tight sm:text-5xl">Your next step depends on where you are now.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Start early, build skills in college or focus on your first role after graduation.</p></div><Link to="/healthcare-careers" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">Explore career paths <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stages.map(([title,label,body,image])=><div key={title} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white tone-light shadow-sm"><div className="relative h-48 overflow-hidden"><img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" /><span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur">{label}</span></div><div className="p-5"><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p><Link to="/career-engine" className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-blue-700">Find my next step <ArrowRight className="h-3 w-3" /></Link></div></div>)}</div></div></section>

      <section className="bg-[#fff8ef] py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex items-end justify-between gap-4"><div><span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-700">ROLE-FOCUSED PROGRAMMES</span><h2 className="mt-5 font-serif text-4xl font-bold sm:text-5xl">Learn for a role. Practice the work. Build evidence.</h2></div><Link to="/courses" className="hidden items-center gap-2 text-sm font-extrabold text-blue-700 sm:inline-flex">Browse programmes <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{CORE_COURSES.map((course,i)=><Link key={course.slug} to="/courses/$slug" params={{slug:course.slug}} className="group relative overflow-hidden rounded-[26px] border border-orange-100 bg-white tone-light p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${colours[i%colours.length]}`} /><div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${colours[i%colours.length]} text-white shadow-lg`}><course.Icon className="h-5 w-5" /></div><p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{course.roleTitle ?? course.category}</p><h3 className="mt-1 text-lg font-black">{course.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{course.blurb}</p><div className="mt-5 flex flex-wrap gap-2">{course.tools.slice(0,3).map(tool=><span key={tool} className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">{tool}</span>)}</div></Link>)}</div></div></section>

      <section className="bg-white py-16 sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">STUDENT REVIEWS</span><h2 className="mt-5 font-serif text-4xl font-bold sm:text-5xl">What learners say about the clarity they got.</h2></div><div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"><div className="flex items-center gap-2"><span className="text-2xl font-black">{AGGREGATE_RATING.ratingValue}</span><div className="flex gap-0.5">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div></div><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{AGGREGATE_RATING.reviewCount}+ published reviews</p></div></div><div className="mt-10 grid gap-4 md:grid-cols-3">{REVIEWS.slice(0,3).map(review=><article key={review.author} className="rounded-[26px] border border-slate-200 bg-white tone-light p-6 shadow-sm"><div className="flex items-center gap-1">{Array.from({length:review.rating}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div><p className="mt-5 text-sm leading-6 text-slate-700">“{review.body}”</p><div className="mt-6 border-t border-slate-100 pt-4"><p className="text-sm font-black text-slate-900">{review.author}</p><p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{review.degree} · {review.domain}</p></div></article>)}</div></div></section>

      <section className="relative overflow-hidden bg-[#102e5c] py-16 text-white sm:py-20"><div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" /><div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.8fr] lg:items-center lg:px-8"><div><span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-100">FOR COLLEGES & EMPLOYERS</span><h2 className="mt-5 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Connect learning to real healthcare work.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">Use role intelligence, assessments, practical projects and evidence for student preparation and talent discovery.</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link to="/tpos" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white tone-light px-5 py-3 text-sm font-black text-[#102e5c]"><GraduationCap className="h-4 w-4" /> For colleges</Link><Link to="/recruiters" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-5 py-3 text-sm font-black text-white"><BriefcaseBusiness className="h-4 w-4" /> For employers</Link></div></div><div className="grid grid-cols-2 gap-3">{[[Users,"12,000+","learners"],[BarChart3,"19+","career pathways"],[Search,"2,000+","role signals"],[Target,"1","career profile"]].map(([Icon,value,label])=>{const I=Icon as typeof Users; return <div key={label as string} className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur"><I className="h-5 w-5 text-cyan-300" /><p className="mt-5 text-2xl font-black">{value as string}</p><p className="mt-1 text-xs text-blue-100">{label as string}</p></div>})}</div></div></section>

      <section className="bg-gradient-to-br from-[#eff5ff] via-white to-[#effcf9] px-4 py-16 text-center sm:py-24"><div className="mx-auto max-w-3xl"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#102e5c] text-white shadow-lg"><BarChart3 className="h-6 w-6" /></div><h2 className="mt-6 font-serif text-4xl font-bold sm:text-5xl">Know your direction before you spend money on training.</h2><p className="mt-4 text-base leading-7 text-slate-600">Take the readiness test, get your report and decide your next step with better information.</p><Link to="/career-engine" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#102e5c] px-7 py-3.5 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#173f78]">Take the readiness test <ArrowRight className="h-4 w-4" /></Link></div></section>
    </div>
  );
}

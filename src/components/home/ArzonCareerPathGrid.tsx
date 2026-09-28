import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ARZON_CORE_CAREERS } from "@/data/siteArchitecture";

const palette = [
  "from-blue-500 to-indigo-600",
  "from-teal-500 to-emerald-600",
  "from-violet-500 to-fuchsia-600",
  "from-orange-500 to-rose-500",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
];

export function ArzonCareerPathGrid() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-blue-700">
              <Sparkles className="h-3 w-3" /> CAREER PATHS
            </span>
            <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              What could you do after your degree?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Compare healthcare roles by the work, skills, tools, employers and preparation needed.
            </p>
          </div>
          <Link to="/roles" className="inline-flex items-center gap-2 text-sm font-bold text-blue-700">
            View all roles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARZON_CORE_CAREERS.map((career, i) => (
            <Link
              key={career.href}
              to={career.href as any}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-[#FCFDFF] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${palette[i % palette.length]}`} />
              <div className="flex items-start justify-between gap-4">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${palette[i % palette.length]} text-white shadow-md`}>
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              <h3 className="mt-6 text-lg font-extrabold text-slate-900">{career.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Role overview, skills, tools, employers and programme path.
              </p>
              <div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span className="rounded-full bg-slate-100 px-2.5 py-1">Role</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1">Skills</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1">Jobs</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

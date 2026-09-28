import { ArrowRight, CheckCircle2, Target, Search, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel: string;
  secondaryTo: string;
};

export function ArzonDecisionHub({
  eyebrow = "CHOOSE YOUR NEXT STEP",
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EEF6FF] via-white to-[#EEFFFA] py-16 sm:py-24">
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-blue-700 shadow-sm ring-1 ring-blue-100">
            <Sparkles className="h-3 w-3" /> {eyebrow}
          </span>
          <h2 className="mt-5 font-serif text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="group rounded-[28px] border border-blue-200 bg-white p-6 shadow-lg shadow-blue-100/50 transition hover:-translate-y-1 hover:shadow-xl sm:p-8">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white"><Target className="h-5 w-5" /></div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">FREE</span>
            </div>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">CHECK YOUR FIT</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900">Know which roles match you.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Answer a short set of questions and receive role-fit signals, skill gaps and suggested next steps.</p>
            <Link to={primaryTo as any} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#102E5C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#173F78]">{primaryLabel}<ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="group rounded-[28px] border border-teal-200 bg-white p-6 shadow-lg shadow-teal-100/40 transition hover:-translate-y-1 hover:shadow-xl sm:p-8">
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-600 text-white"><Search className="h-5 w-5" /></div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700">NO SIGN-UP</span>
            </div>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">SEE THE WORK</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900">Understand what the job needs.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Review responsibilities, skills, tools and employer expectations before you decide what to study.</p>
            <Link to={secondaryTo as any} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-teal-300 hover:text-teal-700">{secondaryLabel}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
          {["Start with information", "Compare the work", "Decide when you have enough evidence"].map((x) => (
            <span key={x} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

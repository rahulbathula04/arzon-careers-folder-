import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Search, ShieldCheck } from "lucide-react";
import { CAREER_ROLES } from "@/data/careerRoles";
import { getJdProvenance } from "@/data/jdProvenance";

type Props = {
  title: string;
  description: string;
  programmeSlug: string;
  programmeLabel: string;
  roleSlugs: string[];
  searchIntent: string;
  howWorkLooks: string[];
  employerRequirements: string[];
  tools: string[];
};

export function CareerIntelligenceLanding({
  title,
  description,
  programmeSlug,
  programmeLabel,
  roleSlugs,
  searchIntent,
  howWorkLooks,
  employerRequirements,
  tools,
}: Props) {
  const roles = roleSlugs
    .map((slug) => CAREER_ROLES.find((r) => r.slug === slug || r.slug.endsWith(`.${slug}`)))
    .filter(Boolean);

  const provenance = getJdProvenance(programmeSlug);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-stone-900 pb-24">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1B3F8B]">
              Career intelligence · {searchIntent}
            </p>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-stone-950">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">{description}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/career-engine/test"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B3F8B] px-5 py-3 text-sm font-bold text-white hover:bg-[#153270]"
              >
                Check My Fit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/roles"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-stone-900 hover:bg-stone-50"
              >
                Browse roles
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Search className="mt-1 h-5 w-5 text-[#1B3F8B]" />
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">Start with the job, not the course</p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-stone-950">What are you actually deciding?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
                This page explains the work, employer requirements, tools, and common entry gaps first. The assessment then checks how your current profile compares with the role requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">01 · Work</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-stone-950">What does the work look like?</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {howWorkLooks.map((item) => (
                <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-700">{item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">02 · Tools</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-stone-950">Tools and systems</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {tools.map((tool) => <span key={tool} className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700">{tool}</span>)}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">03 · Employers</p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-stone-950">What do employers typically ask for?</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {employerRequirements.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-stone-200 p-4 text-sm leading-6 text-stone-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />{item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">04 · Role paths</p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-stone-950">Choose the role you want to understand</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role) => role && (
              <Link
                key={role.slug}
                to="/roles/$slug"
                params={{ slug: role.slug.split(".").pop() || role.slug }}
                className="group rounded-2xl border border-stone-200 bg-white p-5 hover:border-[#1B3F8B] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-950">{role.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{role.blurb}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#1B3F8B] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {provenance && (
          <section className="rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-[#1B3F8B]" />
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1B3F8B]">05 · Evidence</p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-stone-950">How the role information is sourced</h2>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  Arzon's current {programmeLabel} evidence set contains {provenance.jdCount} sampled job descriptions, refreshed {provenance.refreshedOn}. Sources: {provenance.sources.join(", ")}.
                </p>
                <p className="mt-2 text-xs leading-5 text-stone-500">Market data is time-bound. Employer requirements and compensation should be checked against the current job description.</p>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-3xl bg-[#0B1325] p-7 sm:p-9 text-white">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300">06 · Decision step</p>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-bold">Check your fit before choosing a programme</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-300">
                The Career Engine should tell you which role families fit your profile, what gaps need attention, and what to do next.
              </p>
            </div>
            <Link to="/career-engine/test" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-stone-950 hover:bg-stone-100">
              Check My Fit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="flex justify-center">
          <Link to="/courses/$slug" params={{ slug: programmeSlug }} className="text-sm font-bold text-[#1B3F8B] hover:underline">
            Already know this is your path? View {programmeLabel} programme <ArrowRight className="inline h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}

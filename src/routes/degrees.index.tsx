import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, GraduationCap, BriefcaseBusiness, BarChart3, ClipboardCheck } from "lucide-react";
import { DEGREE_PATHWAYS } from "@/data/degreePathways";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

export const Route = createFileRoute("/degrees/")({
  head: () => {
    const seo = pageSeo({
      path: "/degrees",
      title: "Degree to Career Pathways in Healthcare | Arzon Global",
      description:
        "Compare healthcare roles, skills and preparation paths for B.Pharm, Pharm.D, M.Pharm and Life Sciences degrees.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Degree to Career Pathways | Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Arzon Degree-to-Career Pathways",
          numberOfItems: DEGREE_PATHWAYS.length,
          itemListElement: DEGREE_PATHWAYS.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.degreeName,
            url: `https://arzoncareers.in/degrees/${d.slug}`,
          })),
        }),
      }],
    };
  },
  component: DegreesIndex,
});

function DegreesIndex() {
  return (
    <main className="arzon-v2-page min-h-screen bg-[var(--arzon-surface-subtle)] pb-20">
      <ArzonV2PageHero
        eyebrow="DEGREE INTELLIGENCE"
        title={
          <>
            Your degree is the start.
            <span className="text-blue-600"> Your role comes next.</span>
          </>
        }
        description="Select your qualification to see relevant healthcare roles, the skills employers ask for, and the preparation path connected to each role."
        mobileImageSrc="/images/bpharm-students-group.jpg"
        mobileImageAlt="Healthcare students reviewing career options"
      >
        <Link to="/career-engine" className="arzon-v2-button-primary">
          Find My Career Path <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/roles" className="arzon-v2-button-secondary bg-white">
          Browse All Roles <ArrowRight className="h-4 w-4" />
        </Link>
      </ArzonV2PageHero>

      <section className="border-y border-[var(--arzon-border)] bg-white">
        <div className="arzon-v2-container grid gap-0 sm:grid-cols-3">
          <Signal icon={GraduationCap} title="Choose your degree" body="Start with the qualification you already have." />
          <Signal icon={BriefcaseBusiness} title="See matching roles" body="Compare real role families and their requirements." />
          <Signal icon={ClipboardCheck} title="Check your fit" body="Use Career Engine when you want a personal result." />
        </div>
      </section>

      <section className="arzon-v2-container py-10 sm:py-14">
        <div className="max-w-2xl">
          <span className="arzon-v2-eyebrow">CHOOSE YOUR QUALIFICATION</span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            What can you do with your degree?
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Each pathway connects your academic background to role options, required skills and a practical next step.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {DEGREE_PATHWAYS.map((degree) => (
            <Link
              key={degree.slug}
              to="/degrees/$slug"
              params={{ slug: degree.slug }}
              className="group flex min-h-[310px] flex-col rounded-2xl border border-[var(--arzon-border)] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                  {degree.eligibleRoles.length} role paths
                </span>
              </div>

              <span className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-700">
                {degree.typicalDuration}
              </span>
              <h3 className="mt-2 text-xl font-extrabold leading-tight text-slate-950 group-hover:text-blue-700">
                {degree.degreeName}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                {degree.overview}
              </p>

              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                {degree.eligibleRoles.slice(0, 3).map((role) => (
                  <div key={role.roleSlug + role.roleName} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-slate-700">{role.roleName}</span>
                  </div>
                ))}
              </div>

              <span className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                View degree pathway <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="arzon-v2-container pb-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-300">CAREER ENGINE</span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Your degree narrows the options. Your assessment adds the personal context.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Get a role-fit report based on your background, work preferences and assessment responses before you choose a preparation programme.
              </p>
            </div>
            <Link to="/career-engine" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-slate-950 hover:bg-blue-50">
              Start Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ArzonDecisionHub
        eyebrow="STILL UNSURE?"
        title="Compare roles before choosing a programme."
        description="Use the role directory to understand the work, skills and employer context, then use Career Engine for a personal recommendation."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Roles"
        secondaryTo="/roles"
      />
    </main>
  );
}

function Signal({ icon: Icon, title, body }: { icon: typeof GraduationCap; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 px-4 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-6">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
      <div>
        <p className="text-sm font-extrabold text-slate-900">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{body}</p>
      </div>
    </div>
  );
}

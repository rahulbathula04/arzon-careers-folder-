import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Compass, FileText, ShieldAlert } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/components/landing/constants";

export const Route = createFileRoute("/why-arzon")({
  head: () => {
    const title = "How Arzon Helps You Explore Healthcare Careers";
    const description =
      "Explore healthcare role profiles, use Career Assessment guidance, and compare programme details before deciding how to prepare.";
    const ps = pageSeo({
      path: "/why-arzon",
      title,
      description,
      image: SITE.ogImages.careerEngine,
    });
    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
    };
  },
  component: WhyArzonPage,
});

function WhyArzonPage() {
  return (
    <main className="min-h-app bg-white pb-16 text-[var(--arzon-ink-strong)] tone-light">
      <section className="border-b border-[#E4EAF2] bg-[#F8FAFC]">
        <div className="ap-shell py-12 sm:py-16 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1557D6]">
            HOW ARZON WORKS
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-serif font-bold leading-tight tracking-tight text-[#071A4A] sm:text-5xl">
                Make your next healthcare career decision with clearer information.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                Explore role requirements, use career-fit guidance, and review programme details before deciding how to prepare. You should be able to understand what a product does and what its results do not prove.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/roles" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1557D6] px-5 py-3 text-sm font-bold text-white hover:bg-[#1044A5]">
                  Explore healthcare roles <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/career-assessment" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#CBD5E1] bg-white px-5 py-3 text-sm font-bold text-[#071A4A] hover:bg-slate-50">
                  Take the Career Assessment
                </Link>
              </div>
            </div>
            <aside className="rounded-2xl border border-[#DCE5F0] bg-white p-5 sm:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1557D6]">A useful starting point</p>
              <h2 className="mt-3 text-xl font-bold text-[#071A4A]">Understand the work before choosing a course.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Begin with a role profile. Review its responsibilities and listed skills, then compare the programme details against the areas you want to practise.
              </p>
              <Link to="/pv-associate" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1557D6] hover:underline">
                View a Pharmacovigilance role page <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="ap-shell py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1557D6]">The candidate journey</p>
          <h2 className="mt-3 text-2xl font-serif font-bold text-[#071A4A] sm:text-3xl">Three things you can review</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            These are separate steps. A career recommendation is not a skills credential, and completing a programme does not guarantee a job.
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-[#DCE5F0] bg-white p-5">
            <BookOpen className="h-5 w-5 text-[#1557D6]" />
            <h3 className="mt-4 text-base font-bold text-[#071A4A]">Role information</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Explore responsibilities, skills and tools listed for healthcare roles.</p>
            <Link to="/roles" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1557D6] hover:underline">
              Browse roles <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
          <article className="rounded-xl border border-[#DCE5F0] bg-white p-5">
            <Compass className="h-5 w-5 text-[#1557D6]" />
            <h3 className="mt-4 text-base font-bold text-[#071A4A]">Career-fit guidance</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use the free Career Assessment to identify role families worth exploring.</p>
            <Link to="/career-assessment" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1557D6] hover:underline">
              Take the assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
          <article className="rounded-xl border border-[#DCE5F0] bg-white p-5">
            <FileText className="h-5 w-5 text-[#1557D6]" />
            <h3 className="mt-4 text-base font-bold text-[#071A4A]">Programme details</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Review duration, syllabus, learning activities and the support listed for the specific programme.</p>
            <Link to="/courses" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1557D6] hover:underline">
              Compare programmes <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-y border-[#E4EAF2] bg-[#F8FAFC]">
        <div className="ap-shell grid gap-8 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white text-[#1557D6] shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-2xl font-serif font-bold text-[#071A4A] sm:text-3xl">What these pages do not prove</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We should be precise about the limits of career guidance, programme information and examples.
            </p>
          </div>
          <div className="space-y-4">
            {[
              ["Career Assessment", "Its result is guidance for exploring roles. It is not a professional certification, hiring decision or employment prediction."],
              ["Programme completion", "Completion does not guarantee an interview, offer, salary level or placement. Check the specific programme terms before enrolling."],
              ["Employer and market references", "A named employer or job-market example does not establish a hiring partnership. Salary ranges require a source, location, seniority and date."],
              ["Sample tasks and work examples", "An example illustrates the type of work being discussed. It should not be presented as a real learner outcome unless it is a genuine, consented and appropriately redacted artifact."],
            ].map(([title, body]) => (
              <div key={title} className="border-b border-[#DCE5F0] pb-4 last:border-0 last:pb-0">
                <h3 className="text-sm font-bold text-[#071A4A]">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ap-shell py-12 sm:py-16">
        <div className="rounded-2xl border border-[#DCE5F0] bg-white p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1557D6]">Before you enrol</p>
          <h2 className="mt-3 text-2xl font-serif font-bold text-[#071A4A] sm:text-3xl">Check the details for the programme you are considering.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Confirm the current syllabus, duration, delivery format, practical assignments, certificate issuer, refund terms and any career support included. If a detail is not clear on the page, ask the team to confirm it in writing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/courses" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1557D6] px-5 py-3 text-sm font-bold text-white hover:bg-[#1044A5]">
              Review programmes <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/refund" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#CBD5E1] px-5 py-3 text-sm font-bold text-[#071A4A] hover:bg-slate-50">
              Read refund terms
            </Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#CBD5E1] px-5 py-3 text-sm font-bold text-[#071A4A] hover:bg-slate-50">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

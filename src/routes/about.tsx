import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Landmark, Building2, BadgeCheck, ArrowRight } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { PageCTA } from "@/components/landing/PageCTA";
import { pageSeo } from "@/lib/seo";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonLd";
import { ADDRESS, COUNSELLOR_PHONE_DISPLAY, SITE } from "@/components/landing/constants";

export const Route = createFileRoute("/about")({
  head: () => {
    const ps = pageSeo({
      path: "/about",
      title: "About Arzon Global. Project-first internship academy",
      description:
        "Arzon Global is an ISO 9001, MSME & MCA-registered pharmacovigilance, medical coding and clinical research training institute based in Hyderabad, India.",
      image: SITE.ogImages.about,
    });
    return {
      meta: [{ title: "About Arzon Global. Project-first internship academy" }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: localBusinessSchema({
            telephone: COUNSELLOR_PHONE_DISPLAY,
            email: "info@arzonglobal.com",
            address: {
              streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
              addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
              addressRegion: ADDRESS.region,
              postalCode: ADDRESS.postalCode,
              addressCountry: ADDRESS.countryCode,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-900/0 to-transparent pointer-events-none" />
      <section className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
          About us
        </p>
        <h1 className="h-display mt-3">Built for students who'd rather ship than scroll.</h1>
        <p className="mt-5 text-base text-white/70">
          Arzon Global is an India-based project-first internship academy. We run 12-week cohorts in
          healthcare, tech and commerce, taught by mentors who actually work in the industry, on
          real client briefs and real data.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Cred
            icon={Landmark}
            title="Public launch · 30 Jul 2025"
            body="TASK officials attended our launch as chief guests. Not an official affiliation, partnership or endorsement."
          />
          <Cred
            icon={ShieldCheck}
            title="ISO 9001:2015"
            body="Independently audited delivery and assessment system."
          />
          <Cred
            icon={Building2}
            title="MCA-registered Pvt. Ltd."
            body="Verifiable on the Ministry of Corporate Affairs portal."
          />
          <Cred
            icon={BadgeCheck}
            title="MSME · Udyam"
            body="Govt of India MSME registration in the Udyam scheme."
          />
        </div>

        <h2 className="h-section mt-16">Why we exist</h2>
        <div className="mt-3 space-y-4 text-sm leading-relaxed text-white/75">
          <p>
            Most "internships" sold to Indian students are recorded videos in a trench coat. We
            watched the same students get burned twice, by big-brand institutes that promise
            placement and deliver PDFs.
          </p>
          <p>
            We started Arzon Global to build the opposite: small cohorts, mentors who ship for a
            living, real client data, and a certificate that resolves to a public verifier, not a
            JPEG that can be Photoshopped.
          </p>
          <p>
            Our offer is simple: do the work, show the work, get hired on evidence rather than
            pedigree.
          </p>
        </div>

        <h2 className="h-section mt-12">What we don't do</h2>
        <ul className="mt-3 space-y-2 text-sm text-white/75">
          <li>· Promise jobs. Against ASCI. Against our values.</li>
          <li>· Inflate numbers. We publish the denominator.</li>
          <li>· Sell your data.</li>
          <li>· Run countdown timers or scarcity copy.</li>
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/apply"
            className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Start your application <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            to="/proof"
            className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
          >
            See the proof vault
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Cred({ icon: Icon, title, body }: { icon: typeof Landmark; title: string; body: string }) {
  return (
    <div className="group glass-panel-deep relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/10 blur-[40px] transition-colors group-hover:bg-teal-500/20" />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:ring-teal-500/50">
        <Icon className="h-6 w-6 text-slate-300 transition-colors group-hover:text-teal-400" />
      </div>
      <p className="mt-5 font-grotesk text-lg font-bold tracking-tight text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

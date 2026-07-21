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
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <Icon className="h-5 w-5 text-gold" />
      <p className="mt-3 font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs text-white/65">{body}</p>
    </div>
  );
}

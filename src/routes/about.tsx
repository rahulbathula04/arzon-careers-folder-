import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Landmark, Building2, BadgeCheck, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/landing/Footer";
import { PageCTA } from "@/components/landing/PageCTA";
import { pageSeo } from "@/lib/seo";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonLd";
import { ADDRESS, COUNSELLOR_PHONE_DISPLAY, SITE } from "@/components/landing/constants";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-900/0 to-transparent pointer-events-none" />
      <section className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            About us
          </p>
          <h1 className="h-display mt-3">Built for students who'd rather ship than scroll.</h1>
          <p className="mt-5 text-base text-white/70">
            Arzon Global is an India-based project-first internship academy. We run 12-week cohorts in
            healthcare, tech and commerce, taught by mentors who actually work in the industry, on
            real client briefs and real data.
          </p>
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
          <StaggerItem>
            <Cred
              icon={Landmark}
              title="TASK Alignment · 30 Jul 2025"
              body="Telangana Academy for Skill & Knowledge (Dept of ITE&C) officials attended our public launch."
            />
          </StaggerItem>
          <StaggerItem>
            <Cred
              icon={ShieldCheck}
              title="ISO 9001:2015"
              body="Independently audited quality management framework for candidate preparation."
            />
          </StaggerItem>
          <StaggerItem>
            <Cred
              icon={Building2}
              title="MCA Corporate ID"
              body="Legally incorporated under the Ministry of Corporate Affairs (MCA)."
            />
          </StaggerItem>
          <StaggerItem>
            <Cred
              icon={BadgeCheck}
              title="MSME UDYAM & Open Ledger"
              body="Government of India MSME registration with an open-ledger independently verifiable system."
            />
          </StaggerItem>
        </StaggerContainer>

        <Reveal>
          <h2 className="h-section mt-16">Leadership & Vision</h2>
          <p className="mt-2 text-sm text-white/70">
            Founded by industry practitioners on a mission to build transparent employability infrastructure for India.
          </p>
        </Reveal>

        <StaggerContainer className="mt-6 grid gap-6 sm:grid-cols-2">
          <StaggerItem>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01, transition: TRANSITION_PRESETS.springGentle }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xs shadow-sm hover:border-teal-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold">
                  M
                </span>
                <div>
                  <h3 className="font-grotesk text-lg font-bold text-white">Manideep</h3>
                  <p className="text-xs font-mono text-teal-400">Co-Founder & CEO</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/75 leading-relaxed">
                Leads institutional expansion, corporate partnerships, and overall strategy across Arzon Global's workforce readiness initiatives.
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01, transition: TRANSITION_PRESETS.springGentle }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xs shadow-sm hover:border-sky-500/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 font-bold">
                  S
                </span>
                <div>
                  <h3 className="font-grotesk text-lg font-bold text-white">Shashank</h3>
                  <p className="text-xs font-mono text-sky-400">Co-Founder & CSO</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/75 leading-relaxed">
                Drives strategic recruiter alignment, candidate readiness frameworks, and the proprietary ASSAY assessment engine.
              </p>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

        <Reveal>
          <h2 className="h-section mt-16">The ASSAY Verification Engine</h2>
          <div className="mt-3 space-y-4 text-sm leading-relaxed text-white/75">
            <p>
              At the heart of Arzon Careers is <strong className="text-teal-300">ASSAY (Arzon Science and Skill Assessment for Industry Readiness)</strong>, our proprietary evaluation instrument.
            </p>
            <p>
              Rather than relying on self-reported résumés or basic certificates, ASSAY tests candidates across five core operational dimensions: Operational Reasoning, Communication, Documentation, Workflow Thinking, and Domain Awareness.
            </p>
          </div>
        </Reveal>

        <Reveal>
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
        </Reveal>

        <Reveal>
          <h2 className="h-section mt-12">What we don't do</h2>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>· Promise jobs. Against ASCI. Against our values.</li>
            <li>· Inflate numbers. We publish the denominator.</li>
            <li>· Sell your data.</li>
            <li>· Run fake countdown timers or artificial scarcity copy.</li>
          </ul>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/apply"
              className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Start your application <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/proof"
              className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              See the proof vault
            </Link>
          </motion.div>
        </Reveal>
      </section>
      <Footer />
    </main>
  );
}

function Cred({ icon: Icon, title, body }: { icon: typeof Landmark; title: string; body: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01, transition: TRANSITION_PRESETS.springGentle }}
      className="group glass-panel-deep relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl transition-colors duration-300 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/10 blur-[40px] transition-colors group-hover:bg-teal-500/20" />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:ring-teal-500/50">
        <Icon className="h-6 w-6 text-slate-300 transition-colors group-hover:text-teal-400" />
      </div>
      <p className="mt-5 font-grotesk text-lg font-bold tracking-tight text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
    </motion.div>
  );
}

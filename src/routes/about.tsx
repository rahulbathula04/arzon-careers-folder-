import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Landmark, Building2, BadgeCheck, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";
import { pageSeo } from "@/lib/seo";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonLd";
import { ADDRESS, COUNSELLOR_PHONE_DISPLAY, SITE } from "@/components/landing/constants";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { TRANSITION_PRESETS } from "@/components/motion/motion-tokens";
import { PremiumChip } from "@/components/ui/PremiumChip";

export const Route = createFileRoute("/about")({
  head: () => {
    const ps = pageSeo({
      path: "/about",
      title: "About Arzon Global · Project-first internship academy",
      description:
        "Arzon Global is an ISO 9001, MSME & MCA-registered pharmacovigilance, medical coding and clinical research training institute based in Hyderabad, India.",
      image: SITE.ogImages.about,
    });
    return {
      meta: [{ title: "About Arzon Global · Project-first internship academy" }, ...ps.meta],
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] tone-light font-sans antialiased">
      <Nav />
      <main className="relative mx-auto max-w-4xl px-4 pt-28 sm:pt-36 pb-20 sm:px-6">
        <Reveal>
          <div className="mb-3">
            <PremiumChip variant="navy" size="md">
              ABOUT ARZON GLOBAL
            </PremiumChip>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] leading-tight">
            Built for students who'd rather ship than scroll.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            Arzon Global is an India-based project-first internship academy. We run 12-week cohorts in
            healthcare, tech and clinical operations, taught by mentors who actually work in the industry, on
            real client briefs and real data.
          </p>
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
          <StaggerItem>
            <Cred
              icon={Landmark}
              title="TASK Alignment · 30 Jul 2025"
              body="Telangana Academy for Skill & Knowledge (Dept of ITE&C) officials attended our public launch."
              badgeColor="bg-teal-100 text-teal-800"
            />
          </StaggerItem>
          <StaggerItem>
            <Cred
              icon={ShieldCheck}
              title="ISO 9001:2015"
              body="Independently audited quality management framework for candidate preparation."
              badgeColor="bg-amber-100 text-amber-900"
            />
          </StaggerItem>
          <StaggerItem>
            <Cred
              icon={Building2}
              title="MCA Corporate ID"
              body="Legally incorporated under the Ministry of Corporate Affairs (MCA)."
              badgeColor="bg-purple-100 text-purple-800"
            />
          </StaggerItem>
          <StaggerItem>
            <Cred
              icon={BadgeCheck}
              title="MSME UDYAM & Open Ledger"
              body="Government of India MSME registration with an open-ledger independently verifiable system."
              badgeColor="bg-emerald-100 text-emerald-800"
            />
          </StaggerItem>
        </StaggerContainer>

        <Reveal>
          <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-16">Leadership & Vision</h2>
          <p className="mt-2 text-sm text-stone-600">
            Founded by industry practitioners on a mission to build transparent employability infrastructure for India.
          </p>
        </Reveal>

        <StaggerContainer className="mt-6 grid gap-6 sm:grid-cols-2">
          <StaggerItem>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4, transition: TRANSITION_PRESETS.springGentle }}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#1B3F8B] font-bold">
                  M
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Manideep</h3>
                  <p className="text-xs font-mono text-[#1B3F8B] font-bold uppercase tracking-wider">Co-Founder &amp; CEO</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-stone-700 leading-relaxed font-sans">
                Leads institutional expansion, corporate partnerships, and overall strategy across Arzon Global's workforce readiness initiatives.
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4, transition: TRANSITION_PRESETS.springGentle }}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-[#8A6D1F] font-bold">
                  S
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Shashank</h3>
                  <p className="text-xs font-mono text-[#8A6D1F] font-bold uppercase tracking-wider">Co-Founder &amp; CSO</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-stone-700 leading-relaxed font-sans">
                Drives strategic recruiter alignment, candidate readiness frameworks, and the proprietary ASSAY assessment engine.
              </p>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

        <Reveal>
          <div className="mt-16 rounded-2xl border border-stone-200 bg-white p-8 shadow-xs space-y-3">
            <PremiumChip variant="gold" size="sm">
              PROPRIETARY FRAMEWORK
            </PremiumChip>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">The ASSAY Verification Engine</h2>
            <div className="space-y-3 text-sm leading-relaxed text-stone-700 font-sans">
              <p>
                At the heart of Arzon Careers is <strong className="text-[#1B3F8B]">ASSAY (Arzon Science and Skill Assessment for Industry Readiness)</strong>, our proprietary evaluation instrument.
              </p>
              <p>
                Rather than relying on self-reported résumés or basic certificates, ASSAY tests candidates across five core operational dimensions: Operational Reasoning, Communication, Documentation, Workflow Thinking, and Domain Awareness.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-8 shadow-xs space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Why we exist</h2>
            <div className="space-y-3 text-sm leading-relaxed text-stone-700 font-sans">
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
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 rounded-2xl border border-stone-200 bg-white p-8 shadow-xs space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">What we don't do</h2>
            <ul className="mt-3 space-y-2 text-sm text-stone-700 font-sans">
              <li>· Promise jobs. Against ASCI. Against our values.</li>
              <li>· Inflate numbers. We publish the denominator.</li>
              <li>· Sell your data.</li>
              <li>· Run fake countdown timers or artificial scarcity copy.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/apply"
              className="inline-flex h-12 items-center rounded-xl bg-[#1B3F8B] hover:bg-[#153270] px-6 text-sm font-bold text-white shadow-md transition-all"
            >
              Start your application <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/proof"
              className="inline-flex h-12 items-center rounded-xl border border-stone-300 bg-white hover:bg-stone-50 px-5 text-sm font-bold text-stone-800 shadow-xs transition-all"
            >
              See the proof vault
            </Link>
          </motion.div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}

function Cred({ icon: Icon, title, body, badgeColor }: { icon: typeof Landmark; title: string; body: string; badgeColor: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: -4, transition: TRANSITION_PRESETS.springGentle }}
      className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition-all"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${badgeColor}`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-4 font-serif text-lg font-bold tracking-tight text-[#1A1A1A]">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-600 font-sans">{body}</p>
    </motion.div>
  );
}

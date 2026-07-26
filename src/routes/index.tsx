import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useNavSections } from "@/components/landing/NavSectionsContext";
import { Hero } from "@/components/landing/Hero";
import { BentoProgrammes } from "@/components/landing/BentoProgrammes";
import { CredibilityStrip } from "@/components/landing/CredibilityStrip";
import { HiringPartnerWall } from "@/components/landing/HiringPartnerWall";
import { InstitutionalReachWall } from "@/components/landing/InstitutionalReachWall";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { RecruiterOutcomes } from "@/components/landing/RecruiterOutcomes";
import { TaskPartnershipBlock } from "@/components/landing/TaskPartnershipBlock";
import { SITE, LINKS, absUrl } from "@/components/landing/constants";
import { seo } from "@/lib/seo";
import { SectionSkeleton } from "@/components/landing/SectionSkeleton";
import { useHomeSearchSignals } from "@/hooks/useHomeSearchSignals";
import { COURSES } from "@/data/courses";

const HOME_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "programmes", label: "Programmes" },
  { id: "jd-mirror", label: "Proof" },
  { id: "curriculum", label: "Curriculum" },
  { id: "limited-seats", label: "Cohort" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "apply", label: "Apply" },
];

// Below-the-fold, lazy so they don't block hydration / LCP. We keep the
// home scroll to the high-signal sections; everything else still lives on
// its dedicated route (/proof, /credibility, /trust-report, /refund, /faq).
const FAQ = lazy(() => import("@/components/landing/FAQ").then((m) => ({ default: m.FAQ })));
const FinalCTA = lazy(() =>
  import("@/components/landing/FinalCTA").then((m) => ({ default: m.FinalCTA })),
);
const JDMirror = lazy(() =>
  import("@/components/credibility/JDMirror").then((m) => ({ default: m.JDMirror })),
);
const HowItWorks = lazy(() =>
  import("@/components/landing/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);
const LimitedSeatsCountdown = lazy(() =>
  import("@/components/landing/LimitedSeatsCountdown").then((m) => ({
    default: m.LimitedSeatsCountdown,
  })),
);
const ExitIntentQuiz = lazy(() =>
  import("@/components/landing/ExitIntentQuiz").then((m) => ({ default: m.ExitIntentQuiz })),
);

/**
 * Defer hydration with a structured skeleton so the page feels instant
 * (CLS = 0). `minH` accepts either a single value or a per-breakpoint map
 * `{ base, sm, md, lg }`. Mobile-first values prevent the skeleton from
 * over-reserving space on narrow viewports while still matching the taller
 * desktop layout.
 */
function Defer({
  children,
  minH = 200,
  variant,
}: {
  children: React.ReactNode;
  minH?: React.ComponentProps<typeof SectionSkeleton>["minH"];
  variant?: React.ComponentProps<typeof SectionSkeleton>["variant"];
}) {
  const fallback = <SectionSkeleton variant={variant ?? "default"} minH={minH} />;
  return (
    <Suspense fallback={fallback}>
      <div className="defer-reveal">{children}</div>
    </Suspense>
  );
}

export const Route = createFileRoute("/")({
  head: () => {
    const og = absUrl(SITE.ogImage.inauguration);
    const title = "India's Workforce Readiness Platform · Arzon Careers";
    const desc =
      "Pharmacovigilance, medical coding & clinical research courses in India with paid internships, ISO-aligned certificate & placement support. Apply now.";
    const s = seo("/");
    const homeUrl = `${SITE.origin}/`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        // Open Graph (Facebook / WhatsApp / LinkedIn)
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: homeUrl },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: "Arzon Global" },
        { property: "og:image", content: og },
        { property: "og:image:secure_url", content: og },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: String(SITE.ogImage.width) },
        { property: "og:image:height", content: String(SITE.ogImage.height) },
        { property: "og:image:alt", content: SITE.ogImage.alt },
        // Twitter / X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
        { name: "twitter:image:alt", content: SITE.ogImage.alt },
      ],
      links: [...s.links],
      scripts: [
        {
          // FAQPage schema, mirrors the on-page FAQ component so Google
          // can render rich Q&A snippets in search results. Plain text
          // only (schema.org disallows HTML in answer bodies).
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this a real internship or just another online course?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both. First 8 weeks are live classes with homework. Last 4 weeks you work on real hospital or CRO files. You get a proper internship certificate at the end.",
                },
              },
              {
                "@type": "Question",
                name: "Will the certificate actually help me get a job?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Each certificate has a unique ID and a public link recruiters can verify online. It is issued by Arzon Global (ISO 9001 certified, MSME & MCA registered) and is performance-based, not a participation certificate.",
                },
              },
              {
                "@type": "Question",
                name: "I'm in 1st or 2nd year. Can I still join?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, best time to start. Classes run in the evening, all sessions are recorded so you don't miss anything during exams.",
                },
              },
              {
                "@type": "Question",
                name: "Do you guarantee a job?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No, and don't trust anyone who does (it's against ASCI rules). What we promise: real interview practice, a fixed CV, and intros to our hiring partners.",
                },
              },
              {
                "@type": "Question",
                name: "How is this different from YouTube or Udemy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Live mentors who actually work in the industry. Real medical files to practice on. ISO-certified, performance-based certificate. A counsellor you can call.",
                },
              },
              {
                "@type": "Question",
                name: "How do I pay the fee?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "One-time. Take the 3-min fit test first; the seat-confirmation step (fully adjusted in your fee) is shown after your result. We do not offer EMI, education fees can't legally be financed that way.",
                },
              },
              {
                "@type": "Question",
                name: "What if I don't get an interview after the programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If you complete the programme with grade B+ and don't get an interview in 90 days, we extend free placement support for 6 more months.",
                },
              },
              {
                "@type": "Question",
                name: "How big are the batches?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Maximum 60 students per batch. Mentor sees you in groups of under 15, so you actually get attention.",
                },
              },
              {
                "@type": "Question",
                name: "I'm a BBA student — is this programme for me?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. BBA, B.Com and other non-pharma students join every cohort. The programme builds the medical/clinical vocabulary from scratch in the first two weeks.",
                },
              },
              {
                "@type": "Question",
                name: "Will non-pharma students survive the medical content?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Week 1–2 is a 'medical fundamentals' bridge built specifically for non-pharma students.",
                },
              },
              {
                "@type": "Question",
                name: "How do I pick the right programme?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Take the free 3-minute Career Engine test. It scores aptitude, interest and role-readiness and recommends 1 primary + 1 backup track.",
                },
              },
              {
                "@type": "Question",
                name: "Can I switch programmes after I start?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, within the first week of your cohort. After that, switching is case-by-case to protect cohort progress.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a stipend?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. This is a structured training internship — you pay for industry-grade training, you don't get paid.",
                },
              },
              {
                "@type": "Question",
                name: "What kind of files do we actually work on?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Real, de-identified case files: PV ICSR cases, medical coding charts, eCRF datasets — the exact work fresh hires do on day one.",
                },
              },
              {
                "@type": "Question",
                name: "Who issues the certificate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Arzon Global Labs — ISO 9001 certified, MSME registered, MCA incorporated. Each certificate carries ISO, MSME and Govt. of Telangana seals.",
                },
              },
              {
                "@type": "Question",
                name: "How do recruiters verify the certificate?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Each certificate has a unique ID, a QR code and a public verification URL at arzoncareers.in/verify.",
                },
              },
              {
                "@type": "Question",
                name: "What's the typical starting salary?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entry-level offers typically fall in the ₹2.4–4.2 LPA range in Hyderabad, Bengaluru and Pune. Band data per role is published on the industry pages.",
                },
              },
              {
                "@type": "Question",
                name: "What laptop do I need?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Any laptop with Windows 10/11 or macOS, 8 GB RAM and a 5 Mbps connection is enough. No gaming-spec hardware required.",
                },
              },
              {
                "@type": "Question",
                name: "Can I attend on mobile only?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can watch live classes on mobile, but assignments (medical coding charts, eCRF entries) need a laptop.",
                },
              },
              {
                "@type": "Question",
                name: "How do I know Arzon Global is not a scam?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MSME-registered, MCA-incorporated, ISO 9001 certified, with national/regional media coverage. Verify any certificate live at arzoncareers.in/verify.",
                },
              },
            ],
          }),
        },
        {
          // ItemList of Course — enables Google's Course-list rich result.
          // Each item is a full Course node with the required provider,
          // so a single JSON-LD block satisfies both ItemList and Course
          // structured-data guidelines. Keep descriptions plain text.
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            name: "Arzon Careers — Deployment-Ready Programmes",
            numberOfItems: COURSES.length,
            itemListElement: COURSES.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Course",
                "@id": `${SITE.origin}/courses/${c.slug}`,
                url: `${SITE.origin}/courses/${c.slug}`,
                name: c.title,
                description: c.blurb,
                inLanguage: "en-IN",
                educationalLevel: c.seniority ?? "Fresher",
                teaches: c.jd.topSkills.join(", "),
                about: c.category,
                occupationalCredentialAwarded: c.certification,
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Arzon Global",
                  sameAs: SITE.origin,
                  url: SITE.origin,
                },
                hasCourseInstance: {
                  "@type": "CourseInstance",
                  courseMode: "Blended",
                  courseWorkload: "P12W",
                  location: { "@type": "Place", name: "Hyderabad, India" },
                  inLanguage: "en-IN",
                },
              },
            })),
          }),
        },
        {
          // Organization contact / brand mark for the landing page. Complements
          // the EducationalOrganization node in __root.tsx by asserting the
          // canonical brand URL + logo for knowledge-panel eligibility.
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Arzon Global",
            url: SITE.origin,
            logo: absUrl(SITE.ogImage.inauguration),
            sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website],
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  useNavSections(HOME_SECTIONS);
  useHomeSearchSignals({ path: "/" });

  return (
    <main className="min-h-app overflow-x-clip pb-24 md:pb-0">
      {/* 1 · Hero — one promise, one CTA, one proof line */}
      <div data-apply-surface="home-hero">
        <Hero />
      </div>

      {/* 2 · Government recognition — independently verifiable proof. */}
      <TaskPartnershipBlock />

      {/* 2b · Academic adoption & institutional participation wall */}
      <InstitutionalReachWall />

      {/* 3 · Programmes — hybrid track picker (imagery + decision data).
          `#tracks` alias preserves anchor links from older nav / share URLs. */}
      <section id="tracks" data-apply-surface="home-bento">
        <BentoProgrammes />
      </section>

      {/* 4 · How it works — single source of truth */}
      <div className="cv-auto">
        <Defer variant="default" minH={{ base: 900, md: 720, lg: 620 }}>
          <HowItWorks />
        </Defer>
      </div>

      {/* 4b · Recruiter Day-1 readiness — outcome at hiring manager's desk */}
      <div className="cv-auto">
        <Defer variant="default" minH={{ base: 1200, md: 780, lg: 640 }}>
          <RecruiterOutcomes />
        </Defer>
      </div>

      {/* 6 · Credibility — TASK / ISO / MCA */}
      <CredibilityStrip />

      {/* 7 · Deeper proof for scrollers */}
      <div className="cv-auto">
        <Defer variant="default" minH={{ base: 1100, md: 900, lg: 760 }}>
          <JDMirror variant="compact" />
        </Defer>
      </div>

      {/* 8 · Pricing */}
      <Pricing />

      {/* 9 · FAQ — top 6 only */}
      <Defer variant="faq" minH={{ base: 700, md: 560, lg: 520 }}>
        <FAQ limit={6} />
      </Defer>

      {/* 10 · Urgency + Final CTA — one band at the decision moment */}
      <Defer variant="cta" minH={{ base: 460, md: 360, lg: 320 }}>
        <LimitedSeatsCountdown />
      </Defer>
      <Defer variant="cta" minH={{ base: 460, md: 380, lg: 360 }}>
        <FinalCTA />
      </Defer>

      <div className="cv-auto">
        <Footer />
      </div>
      {/* Exit-intent + scroll-depth re-engagement quiz */}
      <Suspense fallback={null}>
        <ExitIntentQuiz />
      </Suspense>
      <Toaster richColors position="top-center" theme="dark" />
    </main>
  );
}

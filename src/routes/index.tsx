import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useNavSections } from "@/components/landing/NavSectionsContext";
import { Hero } from "@/components/landing/Hero";
import { BentoProgrammes } from "@/components/landing/BentoProgrammes";
import { CredibilityStrip } from "@/components/landing/CredibilityStrip";
import { HiringPartnerWall } from "@/components/landing/HiringPartnerWall";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";
import { RecruiterOutcomes } from "@/components/landing/RecruiterOutcomes";
import { RoleTrackLibrary } from "@/components/landing/RoleTrackLibrary";
import { SITE, LINKS, absUrl } from "@/components/landing/constants";
import { seo } from "@/lib/seo";
import { SectionSkeleton } from "@/components/landing/SectionSkeleton";
import { useHomeSearchSignals } from "@/hooks/useHomeSearchSignals";
import { COURSES } from "@/data/courses";

const HOME_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "programmes", label: "Programmes" },
  { id: "how-it-works", label: "How it works" },
  { id: "recruiter-outcomes", label: "Outcomes" },
  { id: "credibility", label: "Credibility" },
  { id: "jd-mirror", label: "Proof" },
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
 * Defer hydration with a structured skeleton so the page feels instant (CLS = 0).
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
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
        { name: "twitter:image:alt", content: SITE.ogImage.alt },
        {
          name: "keywords",
          content:
            "fresher jobs in india, pharmacovigilance jobs for freshers, medical coding jobs for freshers, clinical data management salary, bpharm career options, pharmd career path, biotechnology jobs, regulatory affairs freshers, argus safety tools, meddra coding, healthcare data analytics",
        },
      ],
      links: [...s.links],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this a real internship or another online course?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both parts are real and distinct. Weeks 1–8 are live instructor-led classes with graded weekly homework on actual data files. Weeks 9–12 are an applied internship where you work on enterprise-domain and healthcare capstone projects.",
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
                name: "Do you guarantee a job?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. We do not guarantee jobs. We guarantee real skills, audited artifacts, ISO verifiable certificates, and direct partner-desk introductions for qualifying students.",
                },
              },
            ],
          }),
        },
        {
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
    <main className="min-h-app overflow-x-clip pb-24 md:pb-0 bg-[#F7F5F0]">
      {/* 1 · Hero — Degree-to-Role Matching Promise */}
      <div data-apply-surface="home-hero">
        <Hero />
      </div>

      {/* 2 · 12-Week Fresher Role Tracks — Pick the job you want */}
      <section id="tracks" data-apply-surface="home-bento">
        <BentoProgrammes />
      </section>

      {/* 3 · The JD Mirror — Degree vs Employer Expectation Skill Gap Audit */}
      <div className="cv-auto">
        <Defer variant="default" minH={{ base: 1100, md: 900, lg: 760 }}>
          <JDMirror variant="compact" />
        </Defer>
      </div>

      {/* 4 · Healthcare Employer Requirements & Live Job Descriptions Wall */}
      <HiringPartnerWall />

      {/* 5 · Arzon Role Track Library — Deep-dive Skill Frequency Map */}
      <RoleTrackLibrary />

      {/* 6 · The 12-Week Deployment Engine — 8 Wks Training + 4 Wks Applied Case Work */}
      <div className="cv-auto">
        <Defer variant="default" minH={{ base: 900, md: 720, lg: 620 }}>
          <HowItWorks />
        </Defer>
      </div>

      {/* 7 · Recruiter Day-1 Readiness — Outcome & Candidate Dossier Evaluation */}
      <div className="cv-auto">
        <Defer variant="default" minH={{ base: 1200, md: 780, lg: 640 }}>
          <RecruiterOutcomes />
        </Defer>
      </div>

      {/* 8 · Institutional Credibility — TASK / ISO 9001 / MSME / Telangana Verification */}
      <CredibilityStrip />

      {/* 9 · Value & Investment — Clear Fee Structure & EMI */}
      <Pricing />

      {/* 10 · FAQ — Top 6 Transparent Answers */}
      <Defer variant="faq" minH={{ base: 700, md: 560, lg: 520 }}>
        <FAQ limit={6} />
      </Defer>

      {/* 11 · Zero-Pressure Advisory CTA — Speak with a Healthcare Specialist */}
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

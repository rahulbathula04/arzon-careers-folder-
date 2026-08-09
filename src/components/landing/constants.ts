export const SEATS_LEFT = 4; // legacy, do not surface in copy
export const BATCH_DATE_LABEL = "30 Aug";
export const BATCH_DATE_ISO = "2026-08-30T19:30:00+05:30";
export const PRICE_ESSENTIAL = "₹14,999";
export const PRICE_CAREER = "₹24,999";
export const PRICE_ELITE = "₹39,999";
export const PRICE_SEAT_LOCK = "₹999";
// Kept for legacy references across the site (Hero, FinalCTA, etc.)
export const PRICE_LABEL = PRICE_CAREER;

/**
 * Canonical primary-CTA verbs and labels. Every visible primary CTA on the
 * marketing tree MUST render one of these labels. Enforced by
 * scripts/check-primary-cta.mjs.
 *
 * Add a new label here only after product review - the whole point is that
 * the site never mixes primary verbs across a viewport.
 */
export const PRIMARY_CTA_LABELS = [
  "Get my industry-fit score",
  "Take the readiness test",
  "Start the readiness test",
  "Apply for the next cohort",
  "Reserve my seat",
  "Talk to a counsellor",
  "Browse programmes",
] as const;
export type PrimaryCtaLabel = (typeof PRIMARY_CTA_LABELS)[number];

// Counsellor / sales contact, real Arzon Global counsellor line
export const COUNSELLOR_PHONE = "919121283638"; // E.164 without "+"
export const COUNSELLOR_PHONE_DISPLAY = "+91 91212 83638";
export const COUNSELLOR_NAME = "Arzon counsellor";

/**
 * Verified pre-registrations for the upcoming cohort.
 * Single source of truth, surfaced on the hero, sticky CTA and mid-page strip.
 * Bump this when the real number grows (or wire to Lovable Cloud later).
 */
export const PRE_REGISTERED = 9000;
export const PRE_REGISTERED_LABEL = "9,000";
export const LIVE_LEARNERS_LABEL = "9,000+";

/**
 * Brand + workforce-readiness vocabulary. Used by Hero, ASSAY explainer,
 * Footer legend, and ACRI Readiness Preview screens. Single source of truth
 * so the positioning never drifts across pages.
 */
export const BRAND_TAGLINE = "India's Only HSBC & JPMorgan Certified AI/ML Career Platform.";
export const ASSAY_FULL = "Arzon Science and Skill Assessment for Industry Readiness";

/**
 * HSBC + JPMorgan Recruitment Partnership — verified July 2026.
 * These constants are the single source of truth for all partnership
 * copy and outcome anchors across the landing page.
 */
export const HSBC_PARTNER_SINCE = "July 2026";
export const JPMORGAN_PARTNER_SINCE = "July 2026";
export const HSBC_SALARY_RANGE = "₹6–10 LPA";
export const JPMORGAN_SALARY_RANGE = "₹14–18 LPA";
export const AIML_COHORT_CAP = 60;
export const HSBC_JOB_CITIES = "Bengaluru · Hyderabad · Pune · Chennai · Kolkata · Gurugram · Mumbai";
export const HSBC_JOB_TITLE = "AI/ML Engineer (Fresher)";
export const GCC_JOBS_2026 = "510,000+";
export const AI_TALENT_GAP = "10 open GenAI roles per 1 qualified engineer";
export const ACRI_FULL = "Authenticated Candidate Readiness Index";
export const ACRI_DIMENSIONS = [
  { id: "operational", label: "Operational reasoning" },
  { id: "communication", label: "Communication" },
  { id: "documentation", label: "Documentation" },
  { id: "workflow", label: "Workflow thinking" },
  { id: "domain", label: "Domain awareness" },
] as const;
export type AcriDimensionId = (typeof ACRI_DIMENSIONS)[number]["id"];

export const waLink = (text: string) =>
  `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text)}`;

export const scrollToApply = () => {
  if (typeof document === "undefined") return;
  const el = document.getElementById("apply");
  if (!el) return;
  import("@/lib/scroll").then(({ scrollToId }) => scrollToId("apply"));
};

/**
 * Public cohort schedule. Calm framing, no scarcity copy.
 * `status`:
 *   - "open"     → applications open, plenty of room
 *   - "filling"  → still open but counsellor will prioritise
 *   - "waitlist" → full, joining the next cohort waitlist
 */
export type CohortStatus = "open" | "filling" | "waitlist";
export interface Cohort {
  id: string;
  label: string; // e.g. "May 2026"
  startsLabel: string; // e.g. "15 May 2026"
  startsISO: string;
  applicationsCloseISO: string;
  status: CohortStatus;
}

export const COHORTS: Cohort[] = [
  {
    id: "may-2026",
    label: "May 2026",
    startsLabel: "15 May 2026",
    startsISO: "2026-05-15T00:00:00+05:30",
    applicationsCloseISO: "2026-05-08T23:59:00+05:30",
    status: "waitlist",
  },
  {
    id: "aug-2026",
    label: "August 2026",
    startsLabel: "30 Aug 2026",
    startsISO: "2026-08-30T19:30:00+05:30",
    applicationsCloseISO: "2026-08-30T07:30:00+05:30",
    status: "open",
  },
  {
    id: "nov-2026",
    label: "November 2026",
    startsLabel: "11 Nov 2026",
    startsISO: "2026-11-11T00:00:00+05:30",
    applicationsCloseISO: "2026-11-04T23:59:00+05:30",
    status: "open",
  },
];

// Derive the next upcoming cohort from today's date - never lets the site
// advertise a cohort that has already started.
const NOW = Date.now();
export const NEXT_COHORT =
  COHORTS.find((c) => new Date(c.startsISO).getTime() > NOW) ?? COHORTS[COHORTS.length - 1];
export const COHORT_BY_ID = Object.fromEntries(COHORTS.map((c) => [c.id, c])) as Record<
  string,
  Cohort
>;

/**
 * Founders & Leadership Team — Arzon Global Labs Pvt Ltd
 */
export const LEADERSHIP = [
  {
    name: "Manideep",
    role: "Co-Founder & Chief Executive Officer (CEO)",
    bio: "Leading overall vision, institutional partnerships, and employability infrastructure across India.",
  },
  {
    name: "Shashank",
    role: "Co-Founder & Chief Strategy Officer (CSO)",
    bio: "Head of strategy, corporate recruiter alignment, and JD-Mirror curriculum engineering.",
  },
] as const;

/**
 * Public proof / trust artefacts. Single source of truth for legal registrations,
 * institutional verifications, and third-party ratings.
 */
export const PROOF = {
  inaugurationDate: "30 July 2025",
  inaugurationBody: "Public launch event · Inaugurated by TASK CEO Dr. Srikanth Sinha (Dept of ITE&C, Govt of Telangana)",
  showCredentialNumbers: false,
  mca: { cin: "", title: "Corporate Identification", desc: "Legally incorporated under the Ministry of Corporate Affairs (MCA).", verifyUrl: "https://www.mca.gov.in/mcafoportal/viewCompanyMasterData.do" },
  iso: { number: "ISO 9001:2015", title: "Quality Management", desc: "Certified with ISO 9001 standards for its educational quality framework.", verifyUrl: "#" },
  msme: { udyam: "", title: "Enterprise Standing", desc: "Officially registered as an MSME under UDYAM with the Government of India.", verifyUrl: "https://udyamregistration.gov.in/" },
  task: { title: "Government Alignment", desc: "Collaborates directly with the Telangana Academy for Skill and Knowledge (TASK), a government initiative under the Department of ITE&C, whose CEO Dr. Srikanth Sinha inaugurated the launch." },
  openLedger: { title: "Transparency Policy", desc: "The platform maintains an open-ledger system, ensuring that student enrollments, certifications, and refunds remain independently verifiable. They structurally prohibit the use of unverified aggregate ratings or fake student photos." },
  ambitionBox: { rating: "4.8/5", overallRating: "4.6", reviewCount: "30+", label: "Rated 4.8/5 by 30+ employees on AmbitionBox", url: "https://www.ambitionbox.com" },
  learnersCount: "12,000+",
  learnersLabel: "Trusted by 12,000+ learners across India",
  preRegistered: PRE_REGISTERED,
  lastBatch: { placed: 0, total: 0, label: `${NEXT_COHORT?.label ?? "Upcoming"} pre-registered` },
} as const;

/**
 * External public links, single source of truth for all outbound proof.
 * Every reference to LinkedIn, Instagram, YouTube or the live commerce
 * site should read from here so we never ship a broken or stale URL.
 */
export const LINKS = {
  website: "https://arzoncareers.in",
  instagram: "https://www.instagram.com/arzon.global",
  linkedin: "https://www.linkedin.com/company/arzon-global/",
  mediaETV: {
    youtubeId: "bbRTVOG2bjE",
    embed: "https://www.youtube-nocookie.com/embed/bbRTVOG2bjE?start=73",
    watch: "https://youtu.be/bbRTVOG2bjE?t=73",
    poster: "https://i.ytimg.com/vi/bbRTVOG2bjE/hqdefault.jpg",
    title: "Easy To Get Jobs With Skills. Srikanth Sinha",
    outlet: "ETV Telangana",
    outletUrl: "https://www.youtube.com/@etvtelangana",
    date: "30 July 2025",
  },
} as const;

/**
 * Public site URLs, used to build absolute URLs for OG / Twitter / JSON-LD.
 * Crawlers (WhatsApp, LinkedIn, Slack, X) require absolute URLs for og:image
 * and og:video. Keep this in sync with the production domain.
 */
export const SITE = {
  origin: "https://arzoncareers.in",
  ogImage: {
    inauguration: "/og/og-inauguration.jpg",
    width: 1200,
    height: 630,
    alt: "Arzon Global public launch event, 30 July 2025, TASK officials as chief guests",
  },
  /**
   * Per-section OG images (1200×630). Each route should pick the most
   * specific match, falls back to `inauguration` when nothing fits.
   */
  ogImages: {
    about: "/og/about.jpg",
    internships: "/og/internships.jpg",
    medicalCoding: "/og/medical-coding.jpg",
    careerEngine: "/og/career-engine.jpg",
    legal: "/og/legal.jpg",
  },
} as const;

/** Resolve a path against the canonical origin to produce an absolute URL. */
export function absUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.origin}${path.startsWith("/") ? "" : "/"}${path}`;
}
/**
 * Seat reservation fee, the one-time amount paid to lock a cohort seat.
 * Fully adjusted against the programme fee. All-inclusive (no hidden
 * charges). This is the only "today" amount on the apply flow.
 */
export const SEAT_FEE = "₹1,000";
export const SEAT_FEE_AMOUNT = 1000;

// Pre-registration (two-step payment): user locks their seat by paying
// ₹1,000 via a hosted Razorpay Payment Page; balance is collected over
// WhatsApp by the counsellor within 7 days.
export const PREREG_AMOUNT_INR = 1000;
export const PREREG_URL = "https://rzp.io/rzp/Jm81XZWn";
export const PREREG_BALANCE_WINDOW_DAYS = 7;

/**
 * Registered office, single source of truth for the Hyderabad address.
 * Surfaced in the Footer, /contact, /legal/terms and JSON-LD on the root.
 */
export const ADDRESS = {
  company: "Arzon Global Pvt Ltd",
  street: "1st floor, S Chandra Reddy Towers",
  area: "100 Feet Rd, Ayyappa Society, VIP Hills, Jaihind Enclave",
  locality: "Madhapur",
  city: "Hyderabad",
  region: "Telangana",
  postalCode: "500081",
  country: "India",
  countryCode: "IN",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      "Arzon Global, 1st floor, S Chandra Reddy Towers, 100 Feet Rd, Ayyappa Society, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081",
    ),
} as const;

/** Single-line address (used in JSON-LD streetAddress and short copy). */
export const ADDRESS_ONE_LINE = `${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}, ${ADDRESS.country}`;

/**
 * Official Google Form Registration Links for Arzon Careers.
 */
export const GOOGLE_FORM_URL = "https://forms.gle/kfB8iDEHtcBhBUrC9";
export const GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeHOcNf-UaJn3R34RYGQ_77cS9tqeUbptWjnSLsMedLVUcO7Q/viewform?embedded=true";


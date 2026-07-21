/**
 * Arzon Careers · 100 dedicated high-traffic SEO keywords.
 *
 * Grounded in Semrush India-database research (Dec 2025) across the
 * five Arzon programmes — pharmacovigilance, medical coding, clinical
 * data management, regulatory affairs, SAS clinical — plus the
 * city/intent modifiers that actually drive India healthcare-careers
 * search traffic.
 *
 * Each entry carries the search volume / KD band so we can prioritise:
 *   - `traffic`: H = >5K/mo · M = 500–5K · L = <500 (long-tail)
 *   - `route`:   primary landing page on the site
 *   - `intent`:  informational | navigational | transactional
 *
 * Used by:
 *   - src/routes/__root.tsx   → sitewide <meta name="keywords"> top set
 *   - src/data/seoBoost.ts    → per-course overlay
 *   - src/lib/seo.ts          → page-level keyword injection helper
 */

export type KeywordTraffic = "H" | "M" | "L";
export type KeywordIntent = "informational" | "navigational" | "transactional";

export interface BankKeyword {
  term: string;
  traffic: KeywordTraffic;
  route: string;
  intent: KeywordIntent;
}

export const KEYWORD_BANK: BankKeyword[] = [
  // ── Medical coding (anchor cluster — 27K/mo head term) ───────────
  {
    term: "medical coding",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "informational",
  },
  {
    term: "medical coding course",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "what is medical coding",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "informational",
  },
  {
    term: "medical coding course fees",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "medical coding certification",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "medical coding training",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "online medical coding courses",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "medical coding course near me",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "medical coding course duration",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "informational",
  },
  {
    term: "medical coding course qualification",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "informational",
  },
  {
    term: "medical coding salary in india",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "informational",
  },
  {
    term: "medical coding jobs for freshers",
    traffic: "M",
    route: "/industry/medical-coder/hyderabad",
    intent: "transactional",
  },
  {
    term: "medical coding work from home",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "cpc certification training",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "icd-10-cm coding course",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "cpt coding course",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "hcc risk adjustment coding",
    traffic: "L",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "medical billing and coding course",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "aapc cpc exam preparation",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },

  // ── Pharmacovigilance (flagship — 1.6K/mo head term) ─────────────
  {
    term: "pharmacovigilance course",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance courses",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance internship",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance certificate course",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance course fee",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance online courses",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance course in hyderabad",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance course in bangalore",
    traffic: "M",
    route: "/industry/pharmacovigilance-associate/bangalore",
    intent: "transactional",
  },
  {
    term: "argus safety training",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "icsr case processing course",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "good pharmacovigilance practice",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "informational",
  },
  {
    term: "drug safety associate course",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "drug safety and pharmacovigilance",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "informational",
  },
  {
    term: "meddra coding training",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance jobs in hyderabad",
    traffic: "M",
    route: "/industry/pharmacovigilance-associate/hyderabad",
    intent: "transactional",
  },

  // ── Clinical research / CDM (4.4K/mo head term) ──────────────────
  {
    term: "clinical research course",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "diploma in clinical research",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "pg diploma in clinical research",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "clinical research and pharmacovigilance courses",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "clinical research courses fees",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "clinical research course india",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "clinical research jobs for freshers",
    traffic: "M",
    route: "/industry/clinical-data-associate/hyderabad",
    intent: "transactional",
  },
  {
    term: "clinical research salary india",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "informational",
  },
  {
    term: "clinical data management course",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "clinical data management internship",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "clinical data manager salary",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "informational",
  },
  {
    term: "medidata rave training",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "veeva clinical data course",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "cdisc sdtm training india",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "cdash training online",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },

  // ── Regulatory affairs ───────────────────────────────────────────
  {
    term: "regulatory affairs course india",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },
  {
    term: "regulatory affairs courses in mumbai",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },
  {
    term: "pharmaceutical regulatory affairs training",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },
  {
    term: "ectd dossier course",
    traffic: "L",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },
  {
    term: "regulatory affairs jobs for freshers",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },
  {
    term: "cdsco regulatory training",
    traffic: "L",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },
  {
    term: "fda regulatory affairs course",
    traffic: "L",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },
  {
    term: "medical writing course india",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional",
  },

  // ── SAS clinical / programming ───────────────────────────────────
  {
    term: "sas clinical programming course",
    traffic: "M",
    route: "/courses/sas-clinical",
    intent: "transactional",
  },
  {
    term: "sas clinical training india",
    traffic: "M",
    route: "/courses/sas-clinical",
    intent: "transactional",
  },
  {
    term: "sdtm adam training",
    traffic: "L",
    route: "/courses/sas-clinical",
    intent: "transactional",
  },
  {
    term: "sas programmer course india",
    traffic: "L",
    route: "/courses/sas-clinical",
    intent: "transactional",
  },
  {
    term: "clinical sas jobs",
    traffic: "M",
    route: "/courses/sas-clinical",
    intent: "transactional",
  },
  {
    term: "base sas certification training",
    traffic: "L",
    route: "/courses/sas-clinical",
    intent: "transactional",
  },

  // ── Healthcare / life-science career intent ──────────────────────
  {
    term: "healthcare careers for life science graduates",
    traffic: "L",
    route: "/",
    intent: "informational",
  },
  { term: "life sciences careers india", traffic: "M", route: "/", intent: "informational" },
  {
    term: "b.pharm jobs in clinical research",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  { term: "pharmacy graduate career options", traffic: "M", route: "/", intent: "informational" },
  { term: "biotech graduate jobs", traffic: "M", route: "/", intent: "informational" },
  { term: "msc biotech career options", traffic: "M", route: "/", intent: "informational" },
  {
    term: "career change to pharmacovigilance",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "informational",
  },
  { term: "cro jobs india", traffic: "M", route: "/", intent: "transactional" },
  { term: "healthcare it career path", traffic: "L", route: "/", intent: "informational" },
  {
    term: "industry fit test pharma",
    traffic: "L",
    route: "/career-engine",
    intent: "transactional",
  },

  // ── City modifiers (intent layer for /industry/* programmatic) ───
  {
    term: "medical coding course in hyderabad",
    traffic: "M",
    route: "/industry/medical-coder/hyderabad",
    intent: "transactional",
  },
  {
    term: "medical coding course in chennai",
    traffic: "M",
    route: "/industry/medical-coder/chennai",
    intent: "transactional",
  },
  {
    term: "medical coding course in bangalore",
    traffic: "M",
    route: "/industry/medical-coder/bangalore",
    intent: "transactional",
  },
  {
    term: "medical coding course in pune",
    traffic: "M",
    route: "/industry/medical-coder/pune",
    intent: "transactional",
  },
  {
    term: "medical coding course in mumbai",
    traffic: "M",
    route: "/industry/medical-coder/mumbai",
    intent: "transactional",
  },
  {
    term: "medical coding course in delhi",
    traffic: "M",
    route: "/industry/medical-coder/delhi",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance jobs in bangalore",
    traffic: "L",
    route: "/industry/pharmacovigilance-associate/bangalore",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance jobs in pune",
    traffic: "L",
    route: "/industry/pharmacovigilance-associate/pune",
    intent: "transactional",
  },
  {
    term: "clinical data management jobs in bangalore",
    traffic: "L",
    route: "/industry/clinical-data-associate/bangalore",
    intent: "transactional",
  },
  {
    term: "clinical data management jobs in hyderabad",
    traffic: "L",
    route: "/industry/clinical-data-associate/hyderabad",
    intent: "transactional",
  },
  {
    term: "regulatory affairs jobs in mumbai",
    traffic: "L",
    route: "/industry/regulatory-affairs-associate/mumbai",
    intent: "transactional",
  },

  // ── Fees / online / certificate / fresher intent ─────────────────
  {
    term: "best pharmacovigilance training institute in india",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "best clinical research institute india",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },
  {
    term: "best medical coding institute india",
    traffic: "L",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  { term: "iso certified pharma course india", traffic: "L", route: "/", intent: "transactional" },
  {
    term: "verifiable internship certificate india",
    traffic: "L",
    route: "/proof",
    intent: "informational",
  },
  {
    term: "online internship with certificate india",
    traffic: "M",
    route: "/",
    intent: "transactional",
  },
  {
    term: "paid pharma internship hyderabad",
    traffic: "L",
    route: "/industry/pharmacovigilance-associate/hyderabad",
    intent: "transactional",
  },
  {
    term: "pharmacovigilance training online",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional",
  },
  {
    term: "medical coding certification online",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
  {
    term: "real world evidence training",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional",
  },

  // ── Brand + proof terms ──────────────────────────────────────────
  { term: "arzon global", traffic: "L", route: "/", intent: "navigational" },
  { term: "arzon careers", traffic: "L", route: "/", intent: "navigational" },
  { term: "career engine arzon", traffic: "L", route: "/career-engine", intent: "navigational" },
  {
    term: "arzon pharmacovigilance internship",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "navigational",
  },
  {
    term: "what is pharmacovigilance course",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "informational",
  },
  {
    term: "medical coding internship india",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional",
  },
];

/** Flat list of every keyword phrase, used by the sitewide meta tag. */
export const KEYWORD_BANK_TERMS: string[] = KEYWORD_BANK.map((k) => k.term);

/** Keywords for a given route — used for per-page meta keyword injection. */
export function keywordsForRoute(route: string, limit = 12): string[] {
  return KEYWORD_BANK.filter((k) => k.route === route)
    .sort((a, b) => rankTraffic(b.traffic) - rankTraffic(a.traffic))
    .slice(0, limit)
    .map((k) => k.term);
}

function rankTraffic(t: KeywordTraffic): number {
  return t === "H" ? 3 : t === "M" ? 2 : 1;
}

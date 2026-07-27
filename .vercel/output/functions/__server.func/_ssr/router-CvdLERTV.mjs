import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, L as Link, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, d as useNavigate, H as HeadContent, S as Scripts, e as useRouterState, O as Outlet, f as useLocation } from "../_libs/tanstack__react-router.mjs";
import { u as notFound, v as redirect } from "../_libs/tanstack__router-core.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-CMxFZmfM.mjs";
import { c as createSsrRpc } from "./createSsrRpc-BV3sOdh8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CGVBerDj.mjs";
import { c as createServerFn } from "./server-BKkhNWog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { O as Overlay, P as Portal, C as Content, a as Close, T as Title, D as Description, R as Root, b as Trigger } from "../_libs/radix-ui__react-dialog.mjs";
import { M as MOMENT_STATUSES, a as MOMENT_CATEGORIES } from "./moments.types-CDdnLKsa.mjs";
import { g as getEnrolmentIntent } from "./enrolment.functions-Cs_77DUe.mjs";
import { i as isTier, T as TIER_META } from "./enrolmentTiers-CKOrj6Lb.mjs";
import { createClient } from "../_libs/supabase__supabase-js.mjs";
import { s as streamText } from "../_libs/ai.mjs";
import { o as openai } from "../_libs/ai-sdk__openai.mjs";
import { v as verifyWebhookRequest, W as WebhookError } from "../_libs/lovable.dev__webhooks-js.mjs";
import { createHmac, timingSafeEqual } from "crypto";
import { s as sendLovableEmail } from "../_libs/lovable.dev__email-js.mjs";
import { supabaseAdmin } from "./client.server-DUn3rRvm.mjs";
import { r as redis } from "./redis.server-jD5sLB4g.mjs";
import { r as render } from "../_libs/react-email__render.mjs";
import { A as Activity, S as Stethoscope, D as Database, C as CodeXml, F as FileCheckCorner, a as Atom, b as Server, R as Receipt, N as Network, P as PenLine, c as Dna, B as BrainCircuit, d as Sparkles, L as Layers, e as Shield, f as ChartLine, g as Cpu, h as Cloud, i as Smartphone, j as CircuitBoard, G as GitBranch, M as Megaphone, k as ChartColumn, W as Wallet, U as Users, l as Globe, m as ShieldCheck, n as RotateCcw, T as Target, o as TriangleAlert, p as BookOpen, q as ArrowRight, r as CalendarDays, s as MessageCircle, X, t as Menu, u as RefreshCcw, v as Sun, w as Moon, x as CircleUserRound, y as LogIn, z as Camera } from "../_libs/lucide-react.mjs";
import { H as Html } from "../_libs/react-email__html.mjs";
import { H as Head } from "../_libs/react-email__head.mjs";
import { P as Preview } from "../_libs/react-email__preview.mjs";
import { B as Body } from "../_libs/react-email__body.mjs";
import { C as Container } from "../_libs/react-email__container.mjs";
import { H as Heading } from "../_libs/react-email__heading.mjs";
import { T as Text } from "../_libs/react-email__text.mjs";
import { S as Section } from "../_libs/react-email__section.mjs";
import { B as Button$1 } from "../_libs/react-email__button.mjs";
import { H as Hr } from "../_libs/react-email__hr.mjs";
import { p as objectType, q as stringType, D as coerce, v as enumType, z as recordType, A as unknownType, x as numberType, w as booleanType, B as anyType, y as literalType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/workflow__serde.mjs";
import "../_libs/upstash__redis.mjs";
import "../_libs/uncrypto.mjs";
import "node:crypto";
import "../_libs/prettier.mjs";
import "../_libs/html-to-text.mjs";
import "../_libs/selderee__plugin-htmlparser2.mjs";
import "../_libs/selderee.mjs";
import "../_libs/parseley.mjs";
import "../_libs/leac.mjs";
import "../_libs/peberminta.mjs";
import "../_libs/domhandler.mjs";
import "../_libs/domelementtype.mjs";
import "../_libs/htmlparser2.mjs";
import "../_libs/entities.mjs";
import "../_libs/deepmerge.mjs";
import "../_libs/dom-serializer.mjs";
function DarkBackdrop({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-[calc(env(safe-area-inset-bottom)+88px)] lg:pb-0", children });
}
const thumbMC = "/assets/medical-coding-B_UNASlX.webp";
const thumbPV = "/assets/pharmacovigilance-rs3gWyk1.webp";
const thumbCDM = "/assets/clinical-data-management-COVp3ws7.webp";
const thumbSAS = "/assets/sas-clinical-hNdXybXz.webp";
const thumbNano = "/assets/nanoscience-CgoWfkPR.webp";
const thumbAI = "/assets/ai-intelligence-CNTz1If1.webp";
const thumbSaaS = "/assets/clinical-saas-BpEc3qf8.webp";
const thumbRA = "/assets/regulatory-affairs-DJ0bZpNZ.webp";
const thumbMC400 = "/assets/medical-coding-400w-myurltMU.webp";
const thumbMC600 = "/assets/medical-coding-600w-rsMtA_GI.webp";
const thumbPV400 = "/assets/pharmacovigilance-400w-I4b7xR6u.webp";
const thumbPV600 = "/assets/pharmacovigilance-600w-CySmEgv1.webp";
const thumbCDM400 = "/assets/clinical-data-management-400w-CskwWKkC.webp";
const thumbCDM600 = "/assets/clinical-data-management-600w-BQRya6DJ.webp";
const thumbSAS400 = "/assets/sas-clinical-400w-C4TUoj37.webp";
const thumbSAS600 = "/assets/sas-clinical-600w-Ded8FrVc.webp";
const thumbNano400 = "/assets/nanoscience-400w-AD05_e8q.webp";
const thumbNano600 = "/assets/nanoscience-600w-L06b64vr.webp";
const thumbAI400 = "/assets/ai-intelligence-400w-BYL7suv7.webp";
const thumbAI600 = "/assets/ai-intelligence-600w-B_Aepbvl.webp";
const thumbSaaS400 = "/assets/clinical-saas-400w-DDw6S2Aj.webp";
const thumbSaaS600 = "/assets/clinical-saas-600w-CwZVX1Sx.webp";
const thumbRA400 = "/assets/regulatory-affairs-400w-DZ2onfOa.webp";
const thumbRA600 = "/assets/regulatory-affairs-600w-CRk94G-7.webp";
const BY_SLUG = {
  "medical-coding": thumbMC,
  pharmacovigilance: thumbPV,
  "clinical-data-management": thumbCDM,
  "sas-clinical": thumbSAS,
  nanoscience: thumbNano,
  "ai-intelligence": thumbAI,
  "ai-healthcare": thumbAI,
  "clinical-research": thumbSAS,
  "regulatory-affairs": thumbRA,
  "clinical-saas": thumbSaaS,
  "healthcare-rcm": thumbMC,
  "digital-health-fhir": thumbAI,
  "medical-writing": thumbRA,
  bioinformatics: thumbNano
};
const SRCSET_BY_SLUG = {
  "medical-coding": { w400: thumbMC400, w600: thumbMC600, w800: thumbMC },
  pharmacovigilance: { w400: thumbPV400, w600: thumbPV600, w800: thumbPV },
  "clinical-data-management": { w400: thumbCDM400, w600: thumbCDM600, w800: thumbCDM },
  "sas-clinical": { w400: thumbSAS400, w600: thumbSAS600, w800: thumbSAS },
  nanoscience: { w400: thumbNano400, w600: thumbNano600, w800: thumbNano },
  "ai-intelligence": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "ai-healthcare": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "clinical-research": { w400: thumbSAS400, w600: thumbSAS600, w800: thumbSAS },
  "regulatory-affairs": { w400: thumbRA400, w600: thumbRA600, w800: thumbRA },
  "clinical-saas": { w400: thumbSaaS400, w600: thumbSaaS600, w800: thumbSaaS },
  "healthcare-rcm": { w400: thumbMC400, w600: thumbMC600, w800: thumbMC },
  "digital-health-fhir": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "medical-writing": { w400: thumbRA400, w600: thumbRA600, w800: thumbRA },
  bioinformatics: { w400: thumbNano400, w600: thumbNano600, w800: thumbNano }
};
const SRCSET_BY_CATEGORY = {
  "Pharmacy & Life Sciences": { w400: thumbPV400, w600: thumbPV600, w800: thumbPV },
  "Tech Programmes": { w400: thumbAI400, w600: thumbAI600, w800: thumbAI },
  "Commerce & Marketing": { w400: thumbMC400, w600: thumbMC600, w800: thumbMC }
};
function thumbSrcSetFor(slug, category) {
  const override = OVERRIDES[slug];
  if (override) return { src: override, srcSet: void 0 };
  const set = SRCSET_BY_SLUG[slug] ?? SRCSET_BY_CATEGORY[category];
  return {
    src: set.w800,
    srcSet: `${set.w400} 400w, ${set.w600} 600w, ${set.w800} 800w`
  };
}
const BY_CATEGORY = {
  "Pharmacy & Life Sciences": thumbPV,
  "Tech Programmes": thumbAI,
  "Commerce & Marketing": thumbMC
};
function thumbFor(slug, category) {
  const override = OVERRIDES[slug];
  if (override) return override;
  return BY_SLUG[slug] ?? BY_CATEGORY[category];
}
let OVERRIDES = {};
const subscribers = /* @__PURE__ */ new Set();
function setThumbnailOverrides(map) {
  OVERRIDES = { ...map };
  subscribers.forEach((fn) => fn());
}
function ThumbnailOverridesProvider({ children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const needed = pathname === "/" || pathname.startsWith("/courses") || pathname.startsWith("/admin");
  reactExports.useEffect(() => {
    if (!needed) return;
    let cancelled = false;
    let channel = null;
    async function load() {
      const { data, error } = await supabase.from("course_thumbnail_overrides").select("slug,image_url");
      if (cancelled || error || !data) return;
      const map = {};
      for (const row of data) map[row.slug] = row.image_url;
      setThumbnailOverrides(map);
      if (data.length === 0 && channel) {
        supabase.removeChannel(channel);
        channel = null;
      }
    }
    const start = () => {
      if (cancelled) return;
      void load();
      channel = supabase.channel("course_thumbnail_overrides").on(
        "postgres_changes",
        { event: "*", schema: "public", table: "course_thumbnail_overrides" },
        () => {
          void load();
        }
      ).subscribe();
    };
    const w = typeof window !== "undefined" ? window : null;
    let idleHandle;
    let timeoutHandle;
    if (w?.requestIdleCallback) {
      idleHandle = w.requestIdleCallback(start, { timeout: 4e3 });
    } else {
      timeoutHandle = setTimeout(start, 1500);
    }
    return () => {
      cancelled = true;
      if (idleHandle !== void 0 && w && "cancelIdleCallback" in w) {
        w.cancelIdleCallback(
          idleHandle
        );
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      if (channel) supabase.removeChannel(channel);
    };
  }, [needed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const PRICE_SEAT_LOCK = "₹999";
const COUNSELLOR_PHONE = "919121283638";
const COUNSELLOR_PHONE_DISPLAY = "+91 91212 83638";
const LIVE_LEARNERS_LABEL = "9,000+";
const ACRI_FULL = "Authenticated Candidate Readiness Index";
const ACRI_DIMENSIONS = [
  { id: "operational", label: "Operational reasoning" },
  { id: "communication", label: "Communication" },
  { id: "documentation", label: "Documentation" },
  { id: "workflow", label: "Workflow thinking" },
  { id: "domain", label: "Domain awareness" }
];
const waLink = (text2) => `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(text2)}`;
const COHORTS = [
  {
    id: "may-2026",
    label: "May 2026",
    startsLabel: "15 May 2026",
    startsISO: "2026-05-15T00:00:00+05:30",
    applicationsCloseISO: "2026-05-08T23:59:00+05:30",
    status: "waitlist"
  },
  {
    id: "aug-2026",
    label: "August 2026",
    startsLabel: "12 Aug 2026",
    startsISO: "2026-08-12T00:00:00+05:30",
    applicationsCloseISO: "2026-08-05T23:59:00+05:30",
    status: "open"
  },
  {
    id: "nov-2026",
    label: "November 2026",
    startsLabel: "11 Nov 2026",
    startsISO: "2026-11-11T00:00:00+05:30",
    applicationsCloseISO: "2026-11-04T23:59:00+05:30",
    status: "open"
  }
];
const NOW = Date.now();
const NEXT_COHORT = COHORTS.find((c) => new Date(c.startsISO).getTime() > NOW) ?? COHORTS[COHORTS.length - 1];
const COHORT_BY_ID = Object.fromEntries(COHORTS.map((c) => [c.id, c]));
const PROOF = {
  inaugurationDate: "30 July 2025",
  // Legacy field kept for back-compat with components that still read it.
  // We do not surface a placement %. First cohort completes Nov 2026.
  // `placed: 0, total: 0` so any consumer can gate rendering on `total > 0`.
  lastBatch: { label: `${NEXT_COHORT?.label ?? "Upcoming"} pre-registered` }
};
const LINKS = {
  website: "https://arzoncareers.in",
  instagram: "https://www.instagram.com/arzon.global",
  linkedin: "https://www.linkedin.com/company/arzon-global/",
  mediaETV: {
    watch: "https://youtu.be/bbRTVOG2bjE?t=73",
    outlet: "ETV Telangana",
    outletUrl: "https://www.youtube.com/@etvtelangana"
  }
};
const SITE = {
  origin: "https://arzoncareers.in",
  ogImage: {
    inauguration: "/og/og-inauguration.jpg",
    width: 1200,
    height: 630,
    alt: "Arzon Global public launch event, 30 July 2025, TASK officials as chief guests"
  },
  /**
   * Per-section OG images (1200×630). Each route should pick the most
   * specific match, falls back to `inauguration` when nothing fits.
   */
  ogImages: {
    about: "/og/about.jpg",
    internships: "/og/internships.jpg",
    careerEngine: "/og/career-engine.jpg",
    legal: "/og/legal.jpg"
  }
};
function absUrl(path2) {
  if (/^https?:\/\//i.test(path2)) return path2;
  return `${SITE.origin}${path2.startsWith("/") ? "" : "/"}${path2}`;
}
const SEAT_FEE = "₹1,000";
const SEAT_FEE_AMOUNT = 1e3;
const PREREG_AMOUNT_INR = 1e3;
const PREREG_URL = "https://rzp.io/rzp/Jm81XZWn";
const ADDRESS = {
  company: "Arzon Global Pvt Ltd",
  street: "1st floor, S Chandra Reddy Towers",
  area: "100 Feet Rd, Ayyappa Society, VIP Hills, Jaihind Enclave",
  locality: "Madhapur",
  city: "Hyderabad",
  region: "Telangana",
  postalCode: "500081",
  country: "India",
  countryCode: "IN",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(
    "Arzon Global, 1st floor, S Chandra Reddy Towers, 100 Feet Rd, Ayyappa Society, VIP Hills, Jaihind Enclave, Madhapur, Hyderabad, Telangana 500081"
  )
};
const ADDRESS_ONE_LINE = `${ADDRESS.street}, ${ADDRESS.area}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.region} ${ADDRESS.postalCode}, ${ADDRESS.country}`;
const TrackSchema = objectType({
  event_name: stringType().min(1).max(64),
  anon_id: stringType().uuid().optional().nullable(),
  session_id: stringType().uuid().optional().nullable(),
  application_id: stringType().uuid().optional().nullable(),
  lead_id: stringType().uuid().optional().nullable(),
  path: stringType().max(256).optional().nullable(),
  referrer: stringType().max(256).optional().nullable(),
  utm_source: stringType().max(64).optional().nullable(),
  program_slug: stringType().max(80).optional().nullable(),
  cohort: stringType().max(64).optional().nullable(),
  props: recordType(stringType(), unknownType()).optional()
});
const trackEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => {
  const r = TrackSchema.safeParse(data);
  return r.success ? r.data : null;
}).handler(createSsrRpc("39a0417704f811794703987a71b321d62c2696baad2dc944fcb08205fb9476df"));
const FunnelSchema = objectType({
  fromDays: numberType().int().min(1).max(365).optional(),
  utm_source: stringType().max(64).optional(),
  program_slug: stringType().max(80).optional()
});
const getFunnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(createSsrRpc("3c29fca30de0f7d71f6a255060add7718a14707c7c777f21ba6f49b077035149"));
const getRecentEvents = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d9f5ca7dbe41852cd55ccffc85669ee3be9e876632c24521c6f7af9c001c93cf"));
const getConversionFunnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(createSsrRpc("c65ba4535ca8c74e1c6c28e86729c8f287f251e7c255f446c0cdfa7fc6948f78"));
const ExperimentSchema = objectType({
  experiment: stringType().min(1).max(64),
  fromDays: numberType().int().min(1).max(365).optional()
});
const getExperimentLift = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ExperimentSchema.parse(data ?? {})).handler(createSsrRpc("961354ebbeb96325964931171493ec5e10f3e5b4d8d3b8ee32859f54ad17f3c8"));
const getFunnelDropoff = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(createSsrRpc("87f6f71f4dd451d3da8673de63ffc5b495598be85d3ab0087c9f8951e2ebb22e"));
const getWhatsAppConversion = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(createSsrRpc("3e8b233ddd754a91ab6de5feb9d161a29ddf4c85a22ca10910f8a99b4e71cc46"));
const SsrErrorsSchema = objectType({
  fromDays: numberType().int().min(1).max(90).optional()
});
const getSsrErrors = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => SsrErrorsSchema.parse(data ?? {})).handler(createSsrRpc("450426229cf1934f598f5b5ad0bdaafee285ce98077c165e4fe0daf751eccd17"));
const getCareerEngineFunnel = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => FunnelSchema.parse(data ?? {})).handler(createSsrRpc("2e7b552e0fcd7f1c3e4d64a5f756d2ab0099591de70fd8d1f15aaf127e1b8451"));
const KEY$2 = "arzon_attribution_v1";
const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid"
];
function emptyAttribution() {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    gclid: null,
    fbclid: null,
    referrer: null,
    landing_path: null,
    first_touch_at: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function captureAttribution() {
  if (typeof window === "undefined") return null;
  try {
    const existing = window.localStorage.getItem(KEY$2);
    if (existing) {
      try {
        return JSON.parse(existing);
      } catch {
      }
    }
    const url = new URL(window.location.href);
    const a = emptyAttribution();
    let hasAny = false;
    for (const f of UTM_FIELDS) {
      const v = url.searchParams.get(f);
      if (v) {
        a[f] = v.slice(0, 120);
        hasAny = true;
      }
    }
    const ref = document.referrer || null;
    a.referrer = ref ? ref.slice(0, 256) : null;
    a.landing_path = (url.pathname + url.search).slice(0, 256);
    if (hasAny || ref) {
      window.localStorage.setItem(KEY$2, JSON.stringify(a));
    }
    return a;
  } catch {
    return null;
  }
}
function getAttribution() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY$2);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function getAttributionProps() {
  const a = getAttribution();
  if (!a) return {};
  const out = {};
  for (const f of UTM_FIELDS) {
    const v = a[f];
    if (v) out[f] = v;
  }
  if (a.referrer) out.first_referrer = a.referrer;
  if (a.landing_path) out.first_landing_path = a.landing_path;
  return out;
}
function getAttributionUtmSource() {
  return getAttribution()?.utm_source ?? null;
}
const KEY$1 = "arzon_event_dedupe_v1";
const MAX_ENTRIES = 200;
function readStore() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY$1);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function writeStore(s) {
  if (typeof window === "undefined") return;
  try {
    const keys = Object.keys(s);
    if (keys.length > MAX_ENTRIES) {
      const sorted = keys.sort((a, b) => (s[a] ?? 0) - (s[b] ?? 0));
      for (const k of sorted.slice(0, keys.length - MAX_ENTRIES)) delete s[k];
    }
    window.localStorage.setItem(KEY$1, JSON.stringify(s));
  } catch {
  }
}
function claimOnce(key) {
  if (!key) return true;
  const s = readStore();
  if (s[key]) return false;
  s[key] = Date.now();
  writeStore(s);
  return true;
}
const __vite_import_meta_env__ = {};
const ANON_KEY = "arzon_anon_id";
function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
}
function getAnonId() {
  if (typeof window === "undefined") return null;
  try {
    let id = window.localStorage.getItem(ANON_KEY);
    if (!id) {
      id = uuid();
      window.localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}
const PAGE_VIEW_SAMPLE_RATE = (() => {
  const raw = __vite_import_meta_env__?.VITE_ANALYTICS_PAGEVIEW_SAMPLE;
  const n = raw ? Number(raw) : 0.25;
  return Number.isFinite(n) && n > 0 && n <= 1 ? n : 0.25;
})();
const HIGH_VOLUME_EVENTS = /* @__PURE__ */ new Set(["page_view"]);
function track(eventName, extra = {}) {
  if (typeof window === "undefined") return;
  try {
    if (navigator.doNotTrack === "1") return;
  } catch {
  }
  if (HIGH_VOLUME_EVENTS.has(eventName) && Math.random() > PAGE_VIEW_SAMPLE_RATE) {
    return;
  }
  if (extra.dedupeKey && !claimOnce(extra.dedupeKey)) return;
  try {
    const url = new URL(window.location.href);
    const utm = url.searchParams.get("utm_source") ?? url.searchParams.get("utm") ?? getAttributionUtmSource() ?? null;
    const attributionProps = getAttributionProps();
    const payload = {
      event_name: eventName,
      anon_id: getAnonId(),
      session_id: extra.session_id ?? null,
      application_id: extra.application_id ?? null,
      lead_id: extra.lead_id ?? null,
      path: url.pathname + url.search,
      referrer: document.referrer || null,
      utm_source: utm,
      program_slug: extra.program_slug ?? null,
      cohort: extra.cohort ?? null,
      props: { ...attributionProps, ...extra.props ?? {} }
    };
    void trackEvent({ data: payload }).catch(() => {
    });
  } catch {
  }
}
const WhatsAppLink = reactExports.forwardRef(function WhatsAppLink2({ message, source, program_slug, trackProps, onClick, target, rel, ...rest }, ref) {
  let href = "";
  let generationFailed = false;
  try {
    href = waLink(message);
  } catch {
    generationFailed = true;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      ...rest,
      ref,
      href: generationFailed ? "#" : href,
      "data-wa-source": source,
      target: target ?? "_blank",
      rel: rel ?? "noreferrer",
      onClick: (e) => {
        if (generationFailed) {
          e.preventDefault();
          toast.error("Couldn't open WhatsApp. Copy the message and paste it in chat.", {
            action: {
              label: "Copy message",
              onClick: () => {
                try {
                  navigator.clipboard?.writeText(message);
                  toast.success("Message copied");
                } catch {
                  toast.error("Copy failed — long-press to select the message.");
                }
              }
            }
          });
          try {
            track("whatsapp_link_error", {
              program_slug: program_slug ?? null,
              props: { source, reason: "generation_failed", ...trackProps ?? {} }
            });
          } catch {
          }
          return;
        }
        e.currentTarget.dataset.waTracked = "1";
        try {
          track("whatsapp_click", {
            program_slug: program_slug ?? null,
            props: { source, ...trackProps ?? {} }
          });
        } catch {
        }
        onClick?.(e);
      }
    }
  );
});
function MobileWhatsAppFAB() {
  const loc = useLocation();
  const [visible, setVisible] = reactExports.useState(false);
  const [avoiding, setAvoiding] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const hero = document.getElementById("top");
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
      rootMargin: "-40px 0px 0px 0px"
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [loc.pathname]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = Array.from(document.querySelectorAll("[data-fab-avoid]"));
    if (targets.length === 0) {
      setAvoiding(false);
      return;
    }
    const seen2 = /* @__PURE__ */ new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen2.add(e.target);
          else seen2.delete(e.target);
        }
        setAvoiding(seen2.size > 0);
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [loc.pathname]);
  const p = loc.pathname;
  const hidden = p.startsWith("/apply") || p.startsWith("/enrol") || p.startsWith("/learn/") || p.startsWith("/admin") || p.startsWith("/courses/") && p !== "/courses" || p === "/dashboard" || p === "/contact";
  if (hidden) return null;
  const stickyBarVisibleHere = !(p.startsWith("/courses/") && p !== "/courses") && !p.startsWith("/apply") && !p.startsWith("/enrol") && !p.startsWith("/career-engine") && !p.startsWith("/internships") && !p.startsWith("/learn/") && p !== "/dashboard" && p !== "/verify";
  if (stickyBarVisibleHere) return null;
  const shown = visible && !avoiding;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    WhatsAppLink,
    {
      source: "mobile_fab",
      message: "Hi Arzon, I have a quick question before applying.",
      "aria-label": "Chat with an Arzon counsellor on WhatsApp",
      "data-event": "wa_fab_click",
      "data-testid": "mobile-sticky-cta",
      className: `fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-nav-blue text-slate-50 shadow-[0_10px_30px_-6px_rgba(59,111,160,0.55)] ring-1 ring-white/15 transition-all duration-300 md:hidden sm:h-14 sm:w-14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`,
      style: { bottom: "calc(env(safe-area-inset-bottom) + 84px)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": true,
            className: "absolute inset-0 rounded-full bg-nav-blue opacity-60 motion-safe:animate-ping"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "relative h-5 w-5 sm:h-6 sm:w-6", strokeWidth: 2.25 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "WhatsApp counsellor" })
      ]
    }
  );
}
const arzonIcon = "data:image/webp;base64,UklGRrwLAABXRUJQVlA4ILALAAAwPwCdASoAAQABPm0yl0ikIqIhJBEJuIANiWdu4XNBDFZ8byN3lPvW83dRj+bdXnbfS7vVEc3yUnWHcffdfldyy8Ah6mYF+Rf2n0Vf0vjnKAHil54Xob2F/5sNIlnSSawlfhStBo8n5J3d3d3dzLxpRUNN/IFb8o6Fmgns+ljR5PySchJqZ3dfFZDV0RCYnZirNIQ7mWE/JO7uhp+QeQ9KgXXJqtGTxHpWfHQ/RK00jhgloN58+Sd3d3RQw6tSemyF3ytj/tRbu6kSpePv6CTu3jhMM1kTCfknQ0/IPnFutNxqDcKAhfyfJApVC5TSW+0otRrFjBL/TJO7uig2NO2rdWo/9NCMgmpgOwQqBUhcj4xM1H0AdrHwafYS+Sd0NPyIoSV/ACyPw5uB2Re1NXmbX272BU5JrEo8yl+wdJ6Vx39uGtODYVC4gY1iwffDg6EGDzh8U3HJp+QfSE/rtkqgS9B9QbhwjT302zrV9fM0BSiCHNe2OtJ3pPilL+fUKVEL5a6I8GOj/LJT3mIGZRFt+wg9uo8wETTJLzu/J03yVgUmB/zoHteL4gecs7RQL1uvO0o/cfOhSw8ZtJmpebUE0BFMNfeXTbfMmvP8Bd3dEuP/YUqdeqKrucA6H6/9oNHKmKY9YoNSa01xEZhLOkk1hK/ClaDR5PyTu7u7u7u7u5gAAP7/laIABV+arv3/xXVE1jWIom8eHYT/+xEHL+Z1uf/Grq+VVNtMWuzmi9WB27/VydV8LNenUNOMEXQUAp/Af7g+i+gC/UBK/G16QEH2kHP67EnIfCbXmLPmAUt+KEPvuIGeeFz2R2tuXp1o7iCkjTb907LdXscAFPgAjHctklu7ELgXz8lSr9BMWZ75yrciEBH/s+oI0/FzMInwUzgRF0kwyoE6ocoHb5wblYGOSD95ndJ59vuToVukScxH5dNRyUQuH2S/F2K+lW5rkBq4kajlzrG+5xQyl9dKMzwqpUWLNkG2Px86yGi4KJxXGEeENi4fg0OmqVIGxjcLT9Vjka8Rk0kkVJGonEwODTpdGFAQTi6QJ0rxNLHrCqnzPE4Td5SnVxq1hEL0ZNnskZ183+gOKxGgVRoP5ust/WenUz+tXHr2/1OuuP0H1z2FFzEVmqg/56bPrD0uIEmtP0jRqsF13b/zjqoVM6Igsan/gdTrxizP4NgFeoykc9s8PX2ZUzpAKupWGlZl1cxmDWFV8kxUSrTG+mygSW1ruaxkPWt7kGqB+ZoXZZua1IoLM60mEfGFDVZcVZuL4uEqaclyiP65htWstWF/MrvbjZsZGVzBWMjRuYifB2b1FobgOR5ucVvAphPLG2pUP4DzD9iMd4HkW7m/7xcIe3WEQGU8btDz5ymRo7plP1ShxFhiDIodnH4QkCxVzHwrUzn14DbJEps/XOdia1tIaLtKEyqli99Tm3NqyURKWIMlt7alhyUSacysOTWIwUFBj+W1OVw6Hg2yp2O9sIcRT4/E46baBrA58EsuAyApjqM4MP5Asjfy5F+1BRLmtJw9+Vr2w9y8wNilCskail9bSSf4mCj6BguN20bEQ9Z85fyTnPJNfj2edt6m97R34x7Jh6NZdKgPYSYJxbVkePhqN71mnBkiQAptWBdtSvpcfzADsEnPhOdyB3RjiBU1S5KUS5p11WDAyeD2QhqkQeJsiIyLgKxhfgRSKokqE7i5AjdVGNkkRkEqPiVMLtbQEWqrP6TvHJdmmGhIVNQx3KAOaTcvKpJcyyOcfoNrgfB2rFd/XNcn1CPYHFwRerswJL9Mk8TM9wAvexAEHdj8jajGJX4w64Yw0iAJcemNeM2VvGE5iA5PR8g3VkkrRcgxCjGyqxQNcCA/zHf4w/HPW3uEWG1+n951Ji5SwVT/mgApvv6fQ42yHtHcEiSGeZc6krovtNDJf0rwiFB7X9ckwfUNkZT3slPd+HN/Io6E4vMLLZ7LMZeWP64znwvxVOyqQTjbukeQzndjAIu5xKzbqXiJ2Ylj8E6GyPqFqCQtcwGisPZBCieiUqKWfpzveoRJ9oooC+jY1qnBv1/WtRQjB88KeA/RWITEfVo4r0JUVcgL9Xm0gWJref5+S/9u8wkIlRSaaAWm2CQsH5YqVwSRNzJ4GJO1oAVc0ArdkwkE0MZL3sJxWgqfcoGEbD80dOqKuruvmyWJH6Ekwugh1xmmfTMWGLIan46ewhO0U28GOgHGX6fVjA5ZCW89zxf3losL/Ah+CCG+m3iuToMNbKmXeMGdNZa1eo7FYLZgO0K/ViPIxocJQnjniC21nYc5GNDeLAKRJhX9TBlIuVcD0Qxs/ZkvLNvu7v3J6Zmb7qWMoH0l1G8AToQmIyZQOsTubesWvhp+p9ranB3X+pY4T3jKldeA4iiHY9fzZ4Zvw9Vr0gXOvgSR3U5fbEaRXNwDKZHMieg+v4ZUV6dmLYjjB1PcgBIklGipFAnsTV3co0KDBoOyHOpREWrUUPLnmx9HRtVNC30y71mD3Iyu7zpB/F/iLKndwIx1WjqJ//gZSI9kp7bjKnqqqjP+AVbD+rVCk+QRG9BrWg55iWCj/ajyZ3A90qLeBls/JR6luph73/KsqnNxVzrFV8d5eyarLP/qsULEHJQ1jpVZFslayQoFCxcKOY4CICjVF4q0YeBbQr1SpAzzjzgjGilvfQtQ9h8cwmX7c473azE/BaY2DbosCPep18PfOkyyhwCxModd2pP+iNIKmEEm+Zl3/pnN+L1hzYx35RCUDPvtodAlZGIsc4iX00awBm4DG8JY++H59PqztyvIzBJrLn5eqUm9NWqTlvOOgNwC7/Ud5CpUjkyoUcrDzttVrMknrfDJw3ULeBd7/2pXbkCvmNU+txaHt88LOduBT1folK0XchTyR0VGY35EKaYmWTYxYAmb2S66BiLwkDHEAm4wyV3xKA+GuF+b8fNPyE9ZZYEv31/qIzAXwTnJdtStvDUChaWIyzbrGoNldsaqiso4MvoJX0QbHZkmQ+3KX6y6/2wUUlL6JG6cI/PRtT+pgh/ok2suKc6Br4PG6E3mol+PxwRJelCLMlMQS/V9Zyd6nSUs/x5pXMKAF6s1VeNxUKXlWb3l038WIP8R8u2PRkHiQZtwccl3d/95p/5wc/E9sJBdNDwOdVPANH5lJz+R+h44KXAiy2a9cPsfbkx7cc+ktStURn01xJy9V5S+vkVSL6lhMhiE/MEAPFZIx1f9MnMnZ05piEISODk/rx3CE95RkoNh/v6wVOyCPhlUbcuZDjuydBTt3+BwKmz3hwkXX4XIGyyhiKk+PtUeiBh5O+goCa7t0FinVJ6W/8RDd19UwMBus6FIljkY77oyCMPgOp1psDvcawSSp0lrnwc4zFWqOTmcD7oSylgshkwolc+95xpF87iNsHOeeAsR2/txlSr7L0j5v3vqGN65M1BCbMQgYNaWF43l6NVkdgCfA9hR7TMUjOHoaC6vyQ7zj//LTuBYq3U96xVYwdo4bP4ZpOSdc/cHMWEGiDlDGAHSjxlNJ5uFU2Ny5zRShyNveX3o/MACTipuDVp2HA17tUUuGvupk1y4n1sBvnOlmVkbCT8zd7gzpogMpvRY0jwhWFfTOp62cL7cRn2pm865Rwwq0U3WdV7rzYmKE+XQUkL0Ts81D2q93riMW6BvUMIy56ehspAPCm0w2LgNVBejQPfR7DyT+ge08u+1iHrueO6fVHQUBxuI/Am11sNUdZzVr1Uz/XGIGAbdP2TM0NBXwcqey5HbbHmgfPqc8SimkMi/IGyYcjw2gU6dAewmz/6BpKZJo+jJvlWnk9b0vaumSfS9fZqZDBg+m+dhC16M5356i1g6wgBEaTXmaJ3XRNPu2F/49/AtGZH4swl1FhJXWyALV9BIAKUc/Mg+60dHuSRgkkAOBcedl42H+gdmeA+LcCj9Qj5XdhyUfVdGN1zfxhnAyo8i2yHeaLKRKUMgMdP1sf9HkeAdDMGoexeoY1YdIsQAAAAAAAAA";
const PHRASES = ["Charting your path…", "Mapping the constellation…", "Almost there…"];
function SpaceLoader({
  visible,
  reducedMotion,
  phraseIndex
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": !visible,
      role: "status",
      className: `pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070B16] transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`,
      style: { visibility: visible ? "visible" : "hidden" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute inset-0",
            style: {
              background: "radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--primary-glow, #60A5FA) 22%, transparent), transparent 70%)"
            }
          }
        ),
        !reducedMotion && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ce-stars ce-stars-1", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ce-stars ce-stars-2", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ce-stars ce-stars-3", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-24 w-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "aria-hidden": true,
                className: `absolute inset-0 rounded-full ${reducedMotion ? "" : "ce-glow-pulse"}`,
                style: {
                  background: "radial-gradient(circle, color-mix(in oklab, var(--primary-glow, #60A5FA) 50%, transparent) 0%, transparent 70%)",
                  filter: "blur(8px)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                viewBox: "0 0 100 100",
                className: `absolute inset-0 h-full w-full ${reducedMotion ? "" : "ce-orbit-spin"}`,
                "aria-hidden": true,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "50",
                      cy: "50",
                      r: "46",
                      fill: "none",
                      stroke: "color-mix(in oklab, var(--primary-glow, #60A5FA) 60%, transparent)",
                      strokeWidth: "1.25",
                      strokeDasharray: "6 10",
                      strokeLinecap: "round"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "4", r: "2", fill: "var(--gold, #F5C04A)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                viewBox: "0 0 100 100",
                className: `absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] ${reducedMotion ? "" : "ce-orbit-spin-rev"}`,
                "aria-hidden": true,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "50",
                    cy: "50",
                    r: "46",
                    fill: "none",
                    stroke: "color-mix(in oklab, white 18%, transparent)",
                    strokeWidth: "0.75",
                    strokeDasharray: "2 8"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: arzonIcon, alt: "", className: "h-12 w-12 rounded-full", draggable: false }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[1.25rem] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `font-mono text-micro font-semibold uppercase tracking-[0.24em] text-white/70 ${reducedMotion ? "" : "ce-phrase-fade"}`,
              children: PHRASES[phraseIndex % PHRASES.length]
            },
            phraseIndex
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Loading…" })
        ] })
      ]
    }
  );
}
const STORAGE_KEY = "arzon:reduce-motion";
const CLASS_NAME = "reduce-motion";
function readStored() {
  if (typeof window === "undefined") return "system";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "on" || v === "off" ? v : "system";
}
function systemPrefers() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function resolveReducedMotion(pref) {
  if (pref === "on") return true;
  if (pref === "off") return false;
  return systemPrefers();
}
function apply(reduced) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle(CLASS_NAME, reduced);
}
function useReducedMotion() {
  const [pref, setPref] = reactExports.useState(() => readStored());
  const [reduced, setReduced] = reactExports.useState(() => resolveReducedMotion(readStored()));
  reactExports.useEffect(() => {
    const next = resolveReducedMotion(pref);
    setReduced(next);
    apply(next);
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      const r = resolveReducedMotion("system");
      setReduced(r);
      apply(r);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [pref]);
  reactExports.useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setPref(readStored());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const setPreference = reactExports.useCallback((next) => {
    if (next === "system") window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, next);
    setPref(next);
  }, []);
  const toggle = reactExports.useCallback(() => {
    setPreference(reduced ? "off" : "on");
  }, [reduced, setPreference]);
  return { pref, reduced, setPreference, toggle };
}
const REDUCED_MOTION_BOOT_SCRIPT = `(function(){try{var k='${STORAGE_KEY}';var v=localStorage.getItem(k);var r=v==='on'?true:v==='off'?false:(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);if(r)document.documentElement.classList.add('${CLASS_NAME}');}catch(e){}})();`;
function isReducedMotion() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains(CLASS_NAME);
}
const MIN_VISIBLE_MS = 600;
const MAX_VISIBLE_MS = 6e3;
const DEBUG = false;
function RouteLoader() {
  const status = useRouterState({ select: (s) => s.status });
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const router2 = useRouter();
  const [visible, setVisible] = reactExports.useState(false);
  const [reducedMotion, setReducedMotion] = reactExports.useState(false);
  const [phraseIndex, setPhraseIndex] = reactExports.useState(0);
  const [lastEvent, setLastEvent] = reactExports.useState("(none)");
  const [eventCount, setEventCount] = reactExports.useState(0);
  const shownAtRef = reactExports.useRef(null);
  const hideTimerRef = reactExports.useRef(null);
  const maxTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return;
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);
  reactExports.useEffect(() => {
    const pending = status === "pending" || isLoading;
    if (pending) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      if (!visible) {
        shownAtRef.current = Date.now();
      }
      setVisible(true);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      maxTimerRef.current = setTimeout(() => setVisible(false), MAX_VISIBLE_MS);
    } else if (visible) {
      const elapsed = shownAtRef.current ? Date.now() - shownAtRef.current : MIN_VISIBLE_MS;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      hideTimerRef.current = setTimeout(() => setVisible(false), wait);
    }
  }, [status, isLoading, visible]);
  reactExports.useEffect(() => {
    const unsub = router2.subscribe("onBeforeNavigate", (e) => {
      setLastEvent("onBeforeNavigate");
      setEventCount((n) => n + 1);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      shownAtRef.current = Date.now();
      setVisible(true);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
      maxTimerRef.current = setTimeout(() => setVisible(false), MAX_VISIBLE_MS);
    });
    const unsub2 = router2.subscribe("onResolved", (e) => {
      setLastEvent("onResolved");
      setEventCount((n) => n + 1);
      const elapsed = shownAtRef.current ? Date.now() - shownAtRef.current : MIN_VISIBLE_MS;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setVisible(false), wait);
    });
    return () => {
      unsub();
      unsub2();
    };
  }, [router2]);
  reactExports.useEffect(
    () => () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    },
    []
  );
  reactExports.useEffect(() => {
    if (!visible || reducedMotion || isReducedMotion()) return;
    const id = setInterval(() => setPhraseIndex((i) => i + 1), 1200);
    return () => clearInterval(id);
  }, [visible, reducedMotion]);
  reactExports.useEffect(() => {
  }, [visible]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SpaceLoader, { visible, reducedMotion, phraseIndex }),
    DEBUG
  ] });
}
function RouteLoaderPresenceCheck() {
  return null;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function useTilt() {
  const raf = reactExports.useRef(null);
  const target = reactExports.useRef(null);
  const onMove = reactExports.useCallback((e) => {
    if (isReducedMotion()) return;
    const el = e.currentTarget;
    target.current = el;
    const rect = el.getBoundingClientRect();
    const mx = Math.max(-1, Math.min(1, (e.clientX - rect.left) / rect.width * 2 - 1));
    const my = Math.max(-1, Math.min(1, (e.clientY - rect.top) / rect.height * 2 - 1));
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    });
  }, []);
  const onEnter = reactExports.useCallback((e) => {
    if (isReducedMotion()) return;
    e.currentTarget.style.setProperty("--hover", "1");
  }, []);
  const onLeave = reactExports.useCallback((e) => {
    const el = e.currentTarget;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.setProperty("--hover", "0");
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  }, []);
  return {
    onPointerMove: onMove,
    onPointerEnter: onEnter,
    onPointerLeave: onLeave
  };
}
function tiltSeed(key) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = h * 31 + key.charCodeAt(i) | 0;
  return h % 200 / 100 - 1;
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hc-tactile hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hc-tactile hover:bg-destructive/90",
        outline: "border-2 border-input bg-background text-foreground shadow-sm hc-tactile hover:bg-muted hover:border-ring",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hc-tactile hover:bg-secondary/80",
        // ghost: adapts to surface — visible on light bg by default. Use ghostDark on navy surfaces.
        ghost: "text-foreground hc-link hover:bg-muted",
        ghostDark: "text-white hc-link hover:bg-white/[0.06]",
        link: "text-primary underline-offset-4 hc-link",
        //, Premium variants — repointed to brand navy + teal accent —
        premium: "btn btn-primary hc-tactile",
        gold: "btn btn-gold hc-tactile",
        glass: "glass text-white hc-tactile hover:bg-white/10",
        outlineDark: "border border-white/20 bg-white/5 text-white backdrop-blur-md hc-tactile hover:bg-white/10"
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-full px-7 text-base",
        xl: "h-14 rounded-full px-9 text-base",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const tilt = useTilt();
    const seedKey = typeof props.children === "string" ? props.children : `${variant ?? "default"}-${size ?? "default"}`;
    const mergedStyle = { ["--seed"]: tiltSeed(seedKey).toFixed(2), ...style };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        style: mergedStyle,
        ...tilt,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function GlobalErrorFallback({ error, resetErrorBoundary }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[400px] w-full flex-col items-center justify-center rounded-3xl border border-red-500/10 bg-red-500/5 p-8 text-center glass-panel-deep", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-1 ring-red-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 font-mono text-lg font-semibold tracking-widest text-red-500 uppercase", children: "System Fault Detected" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-sm text-red-400/80", children: "We encountered a critical exception while loading this module. Our engineering team has been notified." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 max-w-lg overflow-auto rounded-lg bg-black/40 p-3 text-left border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs text-red-300/60 font-mono", children: error.message }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: resetErrorBoundary,
        variant: "outline",
        className: "mt-8 gap-2 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "h-4 w-4" }),
          "Attempt Recovery"
        ]
      }
    )
  ] });
}
function getScrollRoot() {
  if (typeof document === "undefined") return null;
  return document.getElementById("app-scroll-root");
}
function resetScrollRoot() {
  const root = getScrollRoot();
  if (root) root.scrollTo({ top: 0, left: 0, behavior: "instant" });
  else if (typeof window !== "undefined")
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}
function ScrollProgress() {
  const [p, setP] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      const root2 = getScrollRoot();
      const max = root2 ? root2.scrollHeight - root2.clientHeight || 1 : document.documentElement.scrollHeight - window.innerHeight || 1;
      const y = root2 ? root2.scrollTop : window.scrollY;
      setP(Math.min(1, Math.max(0, y / max)));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const root = getScrollRoot();
    update();
    (root ?? window).addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      (root ?? window).removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": true,
      className: "pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-full origin-left bg-gradient-to-r from-primary via-primary-glow to-gold",
          style: {
            transform: `scaleX(${p})`,
            transition: "transform 90ms linear",
            willChange: "transform"
          }
        }
      )
    }
  );
}
function useAdminGate(allowed = ["admin"]) {
  const [status, setStatus] = reactExports.useState("loading");
  const [userId, setUserId] = reactExports.useState(null);
  const [nonce, setNonce] = reactExports.useState(0);
  const recheck = reactExports.useCallback(() => setNonce((n) => n + 1), []);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function check() {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (cancelled) return;
      if (userErr || !userData.user) {
        setUserId(null);
        setStatus("unauth");
        return;
      }
      const uid = userData.user.id;
      setUserId(uid);
      for (const role of allowed) {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: uid,
          _role: role
        });
        if (cancelled) return;
        if (!error && data === true) {
          setStatus("ready");
          return;
        }
      }
      const { data: rows } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      if (cancelled) return;
      const ok = (rows ?? []).some((r) => allowed.includes(r.role));
      setStatus(ok ? "ready" : "forbidden");
    }
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUserId(null);
        setStatus("unauth");
        return;
      }
      setStatus("loading");
      check();
    });
    const onFocus = () => {
      if (document.visibilityState === "visible") check();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [nonce, allowed.join("|")]);
  return { status, userId, recheck };
}
function AuthBadge({
  className = "",
  variant = "compact"
}) {
  const { status } = useAdminGate(["admin", "reviewer", "support"]);
  if (status === "loading") return null;
  if (variant === "row") {
    if (status === "ready") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/admin",
          preload: "intent",
          "aria-label": "Open admin dashboard",
          className: `flex items-center justify-between rounded-lg px-3 py-3 text-body-sm font-semibold text-sky-700 hover:bg-sky-500/10 ${className}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
              " Admin dashboard"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-sky-500/15 px-2 py-0.5 text-micro font-bold uppercase tracking-wider text-sky-700", children: "Staff" })
          ]
        }
      );
    }
    if (status === "forbidden") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "aria-label": "Signed in, no staff access",
          className: `flex items-center gap-2 rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft ${className}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "h-4 w-4" }),
            " Signed in"
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/admin/login",
        preload: "intent",
        "aria-label": "Admin sign in",
        className: `flex items-center gap-2 rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft hover:bg-ink/5 ${className}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
          " Admin sign in"
        ]
      }
    );
  }
  if (status === "ready") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/admin",
        preload: "intent",
        "aria-label": "Open admin dashboard",
        className: `inline-flex h-8 items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 text-xs font-semibold text-sky-700 hover:bg-sky-500/15 ${className}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
          " Admin"
        ]
      }
    );
  }
  if (status === "forbidden") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        "aria-label": "Signed in, no staff access",
        className: `inline-flex h-8 items-center gap-1.5 rounded-full border border-ink/15 bg-ink/[0.04] px-2.5 text-xs font-medium text-ink-soft ${className}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "h-3.5 w-3.5" }),
          " Signed in"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/admin/login",
      preload: "intent",
      "aria-label": "Admin sign in",
      className: `inline-flex h-8 items-center gap-1.5 rounded-full border border-ink/15 px-2.5 text-xs font-medium text-ink-soft hover:bg-ink/5 ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3.5 w-3.5" }),
        " Admin"
      ]
    }
  );
}
const KEY = "arzon-theme";
const THEME_BOOT_SCRIPT = `(function(){try{var k='${KEY}';var s=localStorage.getItem(k);var m=s==='dark'||s==='light'?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;if(m==='dark'){r.classList.add('dark');}else{r.classList.remove('dark');}r.style.colorScheme=m;}catch(e){}})();`;
function getInitialTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function useTheme() {
  const [theme, setTheme] = reactExports.useState(() => getInitialTheme());
  reactExports.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
    }
  }, [theme]);
  return {
    theme,
    setTheme,
    toggle: () => setTheme((t) => t === "dark" ? "light" : "dark")
  };
}
function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: toggle,
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      "aria-pressed": isDark,
      title: isDark ? "Light mode" : "Dark mode",
      className: `inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-card text-ink transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`,
      children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4", "aria-hidden": true })
    }
  );
}
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-[#0a0c10]/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const links = [
  { label: "Learn", to: "/courses" },
  { label: "Assess", to: "/career-engine/start" },
  { label: "Why Arzon", to: "/why-arzon" }
];
function NavInner() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const root = getScrollRoot();
    const onScroll = () => setScrolled((root ? root.scrollTop : window.scrollY) > 8);
    onScroll();
    (root ?? window).addEventListener("scroll", onScroll, { passive: true });
    return () => (root ?? window).removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `relative z-40 w-full transition-all border-b border-slate-200/80 bg-white/95 backdrop-blur-md ${scrolled ? "shadow-md" : ""}`,
      style: { paddingTop: "env(safe-area-inset-top)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              "aria-label": "Arzon Global — go to home",
              className: "flex shrink-0 items-center gap-2.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#0F172A] ring-1 ring-slate-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: arzonIcon,
                    alt: "",
                    width: 32,
                    height: 32,
                    loading: "eager",
                    decoding: "async",
                    className: "h-full w-full object-contain"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-none", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-extrabold tracking-[0.24em] text-[#0F172A]", children: "ARZON" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden xs:block font-mono text-[9px] font-bold tracking-[0.36em] text-[#64748B]", children: "GLOBAL" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Main navigation", className: "hidden items-center gap-6 xl:flex xl:gap-8", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              hash: l.hash,
              preload: "intent",
              activeOptions: { exact: l.to === "/" && !l.hash },
              activeProps: {
                className: "text-[#2563EB] font-extrabold after:scale-x-100"
              },
              className: "relative whitespace-nowrap text-sm font-bold text-[#334155] transition-colors duration-200 hover:text-[#2563EB] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-[#2563EB] after:transition-transform after:duration-300 hover:after:scale-x-100",
              children: l.label
            },
            l.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden shrink-0 items-center gap-3.5 xl:flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/dashboard",
                preload: "intent",
                activeProps: { className: "text-[#2563EB] font-bold" },
                className: "whitespace-nowrap text-sm font-bold text-[#334155] hover:text-[#2563EB]",
                children: "Dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AuthBadge, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              WhatsAppLink,
              {
                source: "nav_desktop",
                message: "Hi Arzon, quick question about the programme.",
                className: "inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl border border-emerald-300 bg-emerald-50 px-4 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-4 w-4 text-emerald-700" }),
                  " WhatsApp Support"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/apply",
                preload: "intent",
                "data-apply-surface": "nav-desktop",
                "data-testid": "nav-apply-cta",
                className: "inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "Apply" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Sheet,
            {
              open,
              onOpenChange: (next) => {
                setOpen(next);
                track(next ? "mobile_nav_opened" : "mobile_nav_closed", {
                  props: { source: "hamburger" }
                });
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-[#0F172A] hover:bg-slate-100 transition-colors xl:hidden",
                    "aria-label": open ? "Close menu" : "Open menu",
                    "aria-haspopup": "dialog",
                    "aria-expanded": open,
                    "data-testid": "nav-menu-button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-6 w-6 text-[#0F172A]" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SheetContent,
                  {
                    side: "right",
                    className: "bg-white w-[86vw] max-w-sm p-0 data-[state=open]:duration-200 data-[state=closed]:duration-150 border-l border-slate-200",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "border-b border-slate-200 px-5 py-4 text-left bg-slate-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-mono text-xs font-extrabold tracking-[0.28em] text-[#0F172A]", children: "ARZON GLOBAL" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col px-3 py-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pb-1 font-mono text-[10px] uppercase font-bold tracking-[0.18em] text-[#64748B]", children: "Browse" }),
                        links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: l.to,
                            hash: l.hash,
                            preload: "intent",
                            onClick: () => setOpen(false),
                            activeProps: { className: "bg-slate-100 text-[#2563EB] font-bold" },
                            className: "rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors",
                            children: l.label
                          },
                          l.label
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/cohorts",
                            preload: "intent",
                            onClick: () => setOpen(false),
                            className: "rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors",
                            children: "Cohorts"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/contact",
                            preload: "intent",
                            onClick: () => setOpen(false),
                            className: "rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors",
                            children: "Contact"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/dashboard",
                            preload: "intent",
                            onClick: () => setOpen(false),
                            className: "rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors",
                            children: "Dashboard"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setOpen(false),
                            className: "w-full text-left",
                            "aria-label": "Close menu",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthBadge, { variant: "row" })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-col gap-2 border-t border-slate-200 px-4 py-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Link,
                          {
                            to: "/apply",
                            preload: "intent",
                            "data-apply-surface": "nav-mobile-sheet",
                            onClick: () => setOpen(false),
                            className: "inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white hover:bg-[#1d4ed8] shadow-md shadow-blue-600/20",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "Start your application" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-white" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          WhatsAppLink,
                          {
                            source: "nav_mobile",
                            message: "Hi Arzon, quick question about the programme.",
                            onClick: () => setOpen(false),
                            className: "inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-800 hover:bg-emerald-100",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-emerald-700" }),
                              " Talk on WhatsApp"
                            ]
                          }
                        )
                      ] })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {})
      ]
    }
  );
}
const Nav = reactExports.memo(NavInner);
const NavSectionsContext = reactExports.createContext(null);
function NavSectionsProvider({ children }) {
  const [sections, setSections] = reactExports.useState([]);
  const value = reactExports.useMemo(() => ({ sections, setSections }), [sections]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavSectionsContext.Provider, { value, children });
}
function useNavSectionsContext() {
  const value = reactExports.useContext(NavSectionsContext);
  if (!value) return { sections: [], setSections: () => void 0 };
  return value;
}
function useNavSections(sections) {
  const { setSections } = useNavSectionsContext();
  reactExports.useEffect(() => {
    setSections(sections);
    return () => setSections([]);
  }, [sections, setSections]);
}
const SSR_ERROR_PATTERNS = [
  // The signature error we just hit: loader returned a non-serializable
  // value (e.g. a React component reference) so TanStack's dehydration
  // never wrote $_TSR.router and hydration aborted.
  { kind: "hydration_invariant", rx: /Invariant failed/i },
  { kind: "missing_dehydration", rx: /\$_TSR\.router|dehydrated data/i },
  { kind: "hydration_mismatch", rx: /Hydration failed|did not match|Text content does not match/i },
  // Server-side dehydration choke (Seroval cannot serialize a value).
  { kind: "seroval_serialization", rx: /Seroval Error|forward_ref|react\.forward_ref/i }
];
function classify(message) {
  if (!message) return null;
  for (const { kind, rx } of SSR_ERROR_PATTERNS) {
    if (rx.test(message)) return kind;
  }
  return null;
}
const seen = /* @__PURE__ */ new Set();
function dedupKey(kind, path2, message) {
  return `${kind}|${path2}|${message.slice(0, 120)}`;
}
function reportSsrError(report) {
  if (typeof window === "undefined") return;
  const message = (report.message ?? "").trim();
  const kind = classify(message);
  if (!kind) return;
  const path2 = window.location.pathname + window.location.search;
  const key = dedupKey(kind, path2, message);
  if (seen.has(key)) return;
  seen.add(key);
  window.setTimeout(() => seen.delete(key), 1e4);
  try {
    track("ssr_hydration_error", {
      program_slug: report.programSlug ?? null,
      props: {
        kind,
        source: report.source,
        message: message.slice(0, 500),
        stack: (report.stack ?? "").slice(0, 1200),
        user_agent: navigator.userAgent.slice(0, 200)
      }
    });
  } catch {
  }
}
let installed = false;
function installSsrErrorListeners() {
  if (installed) return;
  if (typeof window === "undefined") return;
  installed = true;
  window.addEventListener("error", (event) => {
    reportSsrError({
      message: event.message ?? event.error?.message,
      stack: event.error?.stack,
      source: "window_error"
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message = typeof reason === "string" ? reason : reason?.message ?? String(reason ?? "");
    reportSsrError({
      message,
      stack: typeof reason === "object" ? reason?.stack : void 0,
      source: "unhandledrejection"
    });
  });
}
const PERMISSION_DENIED_RE = /permission denied for function\s+"?([a-zA-Z_][a-zA-Z0-9_]*)"?/i;
const COOLDOWN_MS = 3e4;
const lastLoggedAt = /* @__PURE__ */ new Map();
function shouldSkip(functionName) {
  const now = Date.now();
  const prev = lastLoggedAt.get(functionName) ?? 0;
  if (now - prev < COOLDOWN_MS) return true;
  lastLoggedAt.set(functionName, now);
  return false;
}
async function reportRlsIncident(incident) {
  try {
    if (shouldSkip(incident.functionName)) return;
    let userId = null;
    try {
      const { data } = await supabase.auth.getSession();
      userId = data.session?.user?.id ?? null;
    } catch {
    }
    const row = {
      function_name: incident.functionName.slice(0, 200),
      message: (incident.message ?? "").slice(0, 2e3),
      path: (incident.path ?? (typeof location !== "undefined" ? location.pathname + location.search : null))?.slice(0, 500) ?? null,
      db_role: userId ? "authenticated" : "anon",
      user_id: userId,
      context: incident.context ?? {}
    };
    const { error } = await supabase.from("rls_incidents").insert([row]);
    if (error && false) ;
  } catch (err) {
  }
}
function extractPermissionDenied(body) {
  const scan = (text2) => {
    const m = text2.match(PERMISSION_DENIED_RE);
    if (!m) return null;
    return { functionName: m[1], message: text2.slice(0, 2e3) };
  };
  if (typeof body === "string") return scan(body);
  if (body && typeof body === "object") {
    const b = body;
    for (const candidate of [b.message, b.details, b.hint]) {
      if (typeof candidate === "string") {
        const hit = scan(candidate);
        if (hit) return hit;
      }
    }
  }
  return null;
}
function installRlsIncidentInterceptor() {
  if (typeof window === "undefined") return;
  const w = window;
  if (w.__rlsInterceptorInstalled) return;
  w.__rlsInterceptorInstalled = true;
  const originalFetch = window.fetch.bind(window);
  const supabaseHost = (() => {
    try {
      return new URL("https://grcmczxdcssroeljrygv.supabase.co").host;
    } catch {
      return null;
    }
  })();
  const patchedFetch = async function patchedFetch2(input, init) {
    const response = await originalFetch(input, init);
    try {
      if (response.ok) return response;
      if (response.status < 400) return response;
      const urlStr = typeof input === "string" ? input : input instanceof URL ? input.toString() : input instanceof Request ? input.url : "";
      if (!supabaseHost || !urlStr.includes(supabaseHost)) return response;
      if (!urlStr.includes("/rest/") && !urlStr.includes("/rpc/")) return response;
      const clone = response.clone();
      const text2 = await clone.text();
      let parsed = text2;
      try {
        parsed = JSON.parse(text2);
      } catch {
      }
      const hit = extractPermissionDenied(parsed);
      if (hit) {
        void reportRlsIncident({
          functionName: hit.functionName,
          message: hit.message,
          context: { status: response.status, url: urlStr }
        });
      }
    } catch (err) {
    }
    return response;
  };
  window.fetch = patchedFetch;
}
function resolveApplySurface(el) {
  if (!el) return "unknown";
  const explicit = el.closest("[data-apply-surface]");
  if (explicit?.dataset.applySurface) return explicit.dataset.applySurface;
  const section = el.closest("section[id], nav, footer, header");
  if (!section) return "unknown";
  if (section.tagName === "NAV") return "nav";
  if (section.tagName === "FOOTER") return "footer";
  if (section.tagName === "HEADER") return "header";
  return section.id ? `section:${section.id}` : "section";
}
function resolveApplyProgrammeSlug(anchor) {
  const explicit = anchor.closest("[data-programme-slug]");
  const fromAttr = explicit?.dataset.programmeSlug;
  if (fromAttr) return fromAttr;
  try {
    const u = new URL(anchor.href, window.location.origin);
    return u.searchParams.get("programme");
  } catch {
    return null;
  }
}
const variantCache = /* @__PURE__ */ new Map();
function getAssignedVariant(experiment) {
  if (variantCache.has(experiment)) return variantCache.get(experiment);
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(`ab:${experiment}`);
  } catch {
    return null;
  }
}
const EXPERIMENTS = {
  sticky_cta_placement: ["control", "bottom_pill", "scroll_trigger"],
  hero_headline: ["control", "outcome", "urgency"],
  apply_cta_urgency: ["control", "seats_left", "deadline"],
  apply_step1_field_order: ["control", "whatsapp_first", "minimal_top"],
  apply_step1_cta_placement: ["control", "sticky_bottom", "inline_after_whatsapp"],
  apply_step1_confirm_copy: ["control", "outcome", "urgency"]
};
async function initSentry() {
  return;
}
const appCss = "/assets/styles-Dv9KCpg4.css";
function breadcrumbSchema(trail) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((node, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: node.name,
      item: absUrl(node.path)
    }))
  });
}
function localBusinessSchema(input) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: input.name ?? "Arzon Global",
    url: SITE.origin,
    telephone: input.telephone,
    email: input.email,
    address: { "@type": "PostalAddress", ...input.address },
    areaServed: "IN"
  });
}
function faqSchema(faqs) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  });
}
function itemListSchema(input) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    itemListElement: input.items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      url: absUrl(item.path),
      ...item.description ? { description: item.description } : {}
    }))
  });
}
function organizationReviewsSchema(input) {
  const base = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arzon Global",
    url: SITE.origin,
    review: input.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
      ...r.datePublished ? { datePublished: r.datePublished } : {}
    }))
  };
  return JSON.stringify(base);
}
const REVIEWS = [
  // Example (commented out — populate with real reviews before shipping):
  // { author: "Priya Sharma", rating: 5, body: "Real client work, real mentor reviews. Got my first PV interview within 6 weeks.", datePublished: "2025-09-12" },
];
const KEYWORD_BANK = [
  // ── Medical coding (anchor cluster — 27K/mo head term) ───────────
  {
    term: "medical coding",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "informational"
  },
  {
    term: "medical coding course",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "what is medical coding",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "informational"
  },
  {
    term: "medical coding course fees",
    traffic: "H",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "medical coding certification",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "medical coding training",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "online medical coding courses",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "medical coding course near me",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "medical coding course duration",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "informational"
  },
  {
    term: "medical coding course qualification",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "informational"
  },
  {
    term: "medical coding salary in india",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "informational"
  },
  {
    term: "medical coding jobs for freshers",
    traffic: "M",
    route: "/industry/medical-coder/hyderabad",
    intent: "transactional"
  },
  {
    term: "medical coding work from home",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "cpc certification training",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "icd-10-cm coding course",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "cpt coding course",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "hcc risk adjustment coding",
    traffic: "L",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "medical billing and coding course",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "aapc cpc exam preparation",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  // ── Pharmacovigilance (flagship — 1.6K/mo head term) ─────────────
  {
    term: "pharmacovigilance course",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance courses",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance internship",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance certificate course",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance course fee",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance online courses",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance course in hyderabad",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance course in bangalore",
    traffic: "M",
    route: "/industry/pharmacovigilance-associate/bangalore",
    intent: "transactional"
  },
  {
    term: "argus safety training",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "icsr case processing course",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "good pharmacovigilance practice",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "informational"
  },
  {
    term: "drug safety associate course",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "drug safety and pharmacovigilance",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "informational"
  },
  {
    term: "meddra coding training",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance jobs in hyderabad",
    traffic: "M",
    route: "/industry/pharmacovigilance-associate/hyderabad",
    intent: "transactional"
  },
  // ── Clinical research / CDM (4.4K/mo head term) ──────────────────
  {
    term: "clinical research course",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "diploma in clinical research",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "pg diploma in clinical research",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "clinical research and pharmacovigilance courses",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "clinical research courses fees",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "clinical research course india",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "clinical research jobs for freshers",
    traffic: "M",
    route: "/industry/clinical-data-associate/hyderabad",
    intent: "transactional"
  },
  {
    term: "clinical research salary india",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "informational"
  },
  {
    term: "clinical data management course",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "clinical data management internship",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "clinical data manager salary",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "informational"
  },
  {
    term: "medidata rave training",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "veeva clinical data course",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "cdisc sdtm training india",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "cdash training online",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  // ── Regulatory affairs ───────────────────────────────────────────
  {
    term: "regulatory affairs course india",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  {
    term: "regulatory affairs courses in mumbai",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  {
    term: "pharmaceutical regulatory affairs training",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  {
    term: "ectd dossier course",
    traffic: "L",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  {
    term: "regulatory affairs jobs for freshers",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  {
    term: "cdsco regulatory training",
    traffic: "L",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  {
    term: "fda regulatory affairs course",
    traffic: "L",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  {
    term: "medical writing course india",
    traffic: "M",
    route: "/courses/regulatory-affairs",
    intent: "transactional"
  },
  // ── SAS clinical / programming ───────────────────────────────────
  {
    term: "sas clinical programming course",
    traffic: "M",
    route: "/courses/sas-clinical",
    intent: "transactional"
  },
  {
    term: "sas clinical training india",
    traffic: "M",
    route: "/courses/sas-clinical",
    intent: "transactional"
  },
  {
    term: "sdtm adam training",
    traffic: "L",
    route: "/courses/sas-clinical",
    intent: "transactional"
  },
  {
    term: "sas programmer course india",
    traffic: "L",
    route: "/courses/sas-clinical",
    intent: "transactional"
  },
  {
    term: "clinical sas jobs",
    traffic: "M",
    route: "/courses/sas-clinical",
    intent: "transactional"
  },
  {
    term: "base sas certification training",
    traffic: "L",
    route: "/courses/sas-clinical",
    intent: "transactional"
  },
  // ── Healthcare / life-science career intent ──────────────────────
  {
    term: "healthcare careers for life science graduates",
    traffic: "L",
    route: "/",
    intent: "informational"
  },
  { term: "life sciences careers india", traffic: "M", route: "/", intent: "informational" },
  {
    term: "b.pharm jobs in clinical research",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  { term: "pharmacy graduate career options", traffic: "M", route: "/", intent: "informational" },
  { term: "biotech graduate jobs", traffic: "M", route: "/", intent: "informational" },
  { term: "msc biotech career options", traffic: "M", route: "/", intent: "informational" },
  {
    term: "career change to pharmacovigilance",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "informational"
  },
  { term: "cro jobs india", traffic: "M", route: "/", intent: "transactional" },
  { term: "healthcare it career path", traffic: "L", route: "/", intent: "informational" },
  {
    term: "industry fit test pharma",
    traffic: "L",
    route: "/career-engine",
    intent: "transactional"
  },
  // ── City modifiers (intent layer for /industry/* programmatic) ───
  {
    term: "medical coding course in hyderabad",
    traffic: "M",
    route: "/industry/medical-coder/hyderabad",
    intent: "transactional"
  },
  {
    term: "medical coding course in chennai",
    traffic: "M",
    route: "/industry/medical-coder/chennai",
    intent: "transactional"
  },
  {
    term: "medical coding course in bangalore",
    traffic: "M",
    route: "/industry/medical-coder/bangalore",
    intent: "transactional"
  },
  {
    term: "medical coding course in pune",
    traffic: "M",
    route: "/industry/medical-coder/pune",
    intent: "transactional"
  },
  {
    term: "medical coding course in mumbai",
    traffic: "M",
    route: "/industry/medical-coder/mumbai",
    intent: "transactional"
  },
  {
    term: "medical coding course in delhi",
    traffic: "M",
    route: "/industry/medical-coder/delhi",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance jobs in bangalore",
    traffic: "L",
    route: "/industry/pharmacovigilance-associate/bangalore",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance jobs in pune",
    traffic: "L",
    route: "/industry/pharmacovigilance-associate/pune",
    intent: "transactional"
  },
  {
    term: "clinical data management jobs in bangalore",
    traffic: "L",
    route: "/industry/clinical-data-associate/bangalore",
    intent: "transactional"
  },
  {
    term: "clinical data management jobs in hyderabad",
    traffic: "L",
    route: "/industry/clinical-data-associate/hyderabad",
    intent: "transactional"
  },
  {
    term: "regulatory affairs jobs in mumbai",
    traffic: "L",
    route: "/industry/regulatory-affairs-associate/mumbai",
    intent: "transactional"
  },
  // ── Fees / online / certificate / fresher intent ─────────────────
  {
    term: "best pharmacovigilance training institute in india",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "best clinical research institute india",
    traffic: "M",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  {
    term: "best medical coding institute india",
    traffic: "L",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  { term: "iso certified pharma course india", traffic: "L", route: "/", intent: "transactional" },
  {
    term: "verifiable internship certificate india",
    traffic: "L",
    route: "/proof",
    intent: "informational"
  },
  {
    term: "online internship with certificate india",
    traffic: "M",
    route: "/",
    intent: "transactional"
  },
  {
    term: "paid pharma internship hyderabad",
    traffic: "L",
    route: "/industry/pharmacovigilance-associate/hyderabad",
    intent: "transactional"
  },
  {
    term: "pharmacovigilance training online",
    traffic: "M",
    route: "/courses/pharmacovigilance",
    intent: "transactional"
  },
  {
    term: "medical coding certification online",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  },
  {
    term: "real world evidence training",
    traffic: "L",
    route: "/courses/clinical-data-management",
    intent: "transactional"
  },
  // ── Brand + proof terms ──────────────────────────────────────────
  { term: "arzon global", traffic: "L", route: "/", intent: "navigational" },
  { term: "arzon careers", traffic: "L", route: "/", intent: "navigational" },
  { term: "career engine arzon", traffic: "L", route: "/career-engine", intent: "navigational" },
  {
    term: "arzon pharmacovigilance internship",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "navigational"
  },
  {
    term: "what is pharmacovigilance course",
    traffic: "L",
    route: "/courses/pharmacovigilance",
    intent: "informational"
  },
  {
    term: "medical coding internship india",
    traffic: "M",
    route: "/courses/medical-coding",
    intent: "transactional"
  }
];
const KEYWORD_BANK_TERMS = KEYWORD_BANK.map((k) => k.term);
function getRootHead() {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Arzon Global · PV, Medical Coding & CDM Internships" },
      {
        name: "description",
        content: "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME & MCA registered, verifiable certificates."
      },
      { name: "keywords", content: KEYWORD_BANK_TERMS.join(", ") },
      { name: "author", content: "Arzon Global" },
      { property: "og:site_name", content: "Arzon Global" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@arzonglobal" },
      { name: "theme-color", content: "#0A0F1E" },
      { name: "apple-mobile-web-app-title", content: "Arzon Global" },
      { name: "application-name", content: "Arzon Global" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "google-site-verification",
        content: ""
      },
      {
        property: "og:image",
        content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b608b14a-fd99-4ff6-83b7-5054418300eb"
      },
      {
        name: "twitter:image",
        content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/b608b14a-fd99-4ff6-83b7-5054418300eb"
      },
      { property: "og:title", content: "Arzon Global · PV, Medical Coding & CDM Internships" },
      { name: "twitter:title", content: "Arzon Global · PV, Medical Coding & CDM Internships" },
      {
        property: "og:description",
        content: "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME & MCA registered, verifiable certificates."
      },
      {
        name: "twitter:description",
        content: "Pharmacovigilance, medical coding, clinical data & regulatory affairs internships in India. ISO-aligned, MSME & MCA registered, verifiable certificates."
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700;1,800&family=Outfit:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap"
      },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap",
        media: "print"
      },
      { rel: "dns-prefetch", href: "https://grcmczxdcssroeljrygv.supabase.co" },
      {
        rel: "preconnect",
        href: "https://grcmczxdcssroeljrygv.supabase.co",
        crossOrigin: "anonymous"
      },
      { rel: "icon", type: "image/jpeg", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.ico" }
    ],
    scripts: [
      {
        children: `(function(){try{var ls=document.querySelectorAll('link[rel="stylesheet"][media="print"]');ls.forEach(function(l){if(l.sheet){l.media="all";}else{l.addEventListener("load",function(){l.media="all";},{once:true});}});}catch(e){}})();`
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Arzon Global",
          legalName: "Arzon Global Labs Pvt Ltd",
          url: SITE.origin,
          logo: absUrl("/og/og-inauguration.jpg"),
          foundingDate: "2024",
          email: "info@arzonglobal.com",
          telephone: COUNSELLOR_PHONE_DISPLAY,
          address: {
            "@type": "PostalAddress",
            streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
            addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
            addressRegion: ADDRESS.region,
            postalCode: ADDRESS.postalCode,
            addressCountry: ADDRESS.countryCode
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: COUNSELLOR_PHONE_DISPLAY,
            email: "info@arzonglobal.com",
            areaServed: "IN",
            availableLanguage: ["en", "hi", "te"]
          },
          sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website, LINKS.mediaETV.outletUrl]
        })
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Arzon Global",
          alternateName: "Arzon",
          url: SITE.origin,
          inLanguage: "en-IN",
          publisher: { "@type": "Organization", name: "Arzon Global", url: SITE.origin },
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE.origin}/courses?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })
      },
      ...REVIEWS.length > 0 ? [
        {
          type: "application/ld+json",
          children: organizationReviewsSchema({
            reviews: REVIEWS
          })
        }
      ] : [],
      ...[],
      {
        type: "application/speculationrules",
        children: JSON.stringify({
          prerender: [
            {
              source: "document",
              where: {
                and: [
                  { href_matches: "/*" },
                  { not: { href_matches: "/api/*" } },
                  { not: { href_matches: "/admin*" } },
                  { not: { href_matches: "/*?*" } }
                ]
              },
              eagerness: "conservative"
            }
          ]
        })
      }
    ]
  };
}
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 6e4, refetchOnWindowFocus: false } }
});
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-app items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-section mt-4", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-white/70", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$2b = createRootRoute({
  head: () => getRootHead(),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ({ error, reset }) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalErrorFallback, { error, resetErrorBoundary: reset }),
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { suppressHydrationWarning: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          suppressHydrationWarning: true,
          dangerouslySetInnerHTML: { __html: REDUCED_MOTION_BOOT_SCRIPT }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { suppressHydrationWarning: true, dangerouslySetInnerHTML: { __html: THEME_BOOT_SCRIPT } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { suppressHydrationWarning: true, children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
    installSsrErrorListeners();
    installRlsIncidentInterceptor();
    void initSentry();
  }, []);
  const prevKeyRef = reactExports.useRef(null);
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.getElementById("app-scroll-root");
    if (!root) return;
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {
      }
    }
    const STORE_KEY = "__appScrollPos";
    const readStore2 = () => {
      try {
        return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
      } catch {
        return {};
      }
    };
    const writeStore2 = (s) => {
      try {
        sessionStorage.setItem(STORE_KEY, JSON.stringify(s));
      } catch {
      }
    };
    const railKey = (el) => {
      const id = el.dataset.railId;
      if (id) return `rail:${id}`;
      return null;
    };
    const collectRails = () => {
      const map = {};
      const rails = document.querySelectorAll(".scroll-rail");
      rails.forEach((el) => {
        const k = railKey(el);
        if (k) map[k] = el.scrollLeft;
      });
      return map;
    };
    const currentKey = () => {
      const st = window.history.state;
      return (st && typeof st.key === "string" ? st.key : "") + "|" + window.location.pathname;
    };
    const isFirstMount = prevKeyRef.current === null;
    if (prevKeyRef.current) {
      const store = readStore2();
      store[prevKeyRef.current] = {
        top: root.scrollTop,
        left: root.scrollLeft,
        rails: collectRails()
      };
      writeStore2(store);
    }
    const key = currentKey();
    prevKeyRef.current = key;
    if (window.location.hash) return;
    if (isFirstMount) {
      resetScrollRoot();
      return;
    }
    const saved = readStore2()[key];
    if (saved && typeof saved === "object") {
      root.scrollTo({
        top: saved.top ?? 0,
        left: saved.left ?? 0,
        behavior: "instant"
      });
      const targets = saved.rails || {};
      let attempts = 0;
      const restoreRails = () => {
        const rails = document.querySelectorAll(".scroll-rail");
        rails.forEach((el) => {
          const id = el.dataset.railId;
          if (!id) return;
          const want = targets[`rail:${id}`];
          if (typeof want === "number" && Math.abs(el.scrollLeft - want) > 1) {
            el.scrollTo({ left: want, top: 0, behavior: "instant" });
          }
        });
        attempts++;
        if (attempts < 6) setTimeout(restoreRails, 100);
      };
      restoreRails();
    } else {
      resetScrollRoot();
    }
  }, [pathname]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.getElementById("app-scroll-root");
    if (!root) return;
    const STORE_KEY = "__appScrollPos";
    let store;
    try {
      store = JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
    } catch {
      store = {};
    }
    const ensureEntry = (key) => {
      let e = store[key];
      if (!e) {
        e = { top: 0, left: 0, rails: {} };
        store[key] = e;
      }
      if (!e.rails) e.rails = {};
      return e;
    };
    let rootDirty = false;
    const dirtyRails = /* @__PURE__ */ new Set();
    let frame = 0;
    let commitHandle;
    let commitTimer;
    const idleWin = window;
    const scheduleCommit = () => {
      if (commitHandle !== void 0 || commitTimer) return;
      const run = () => {
        commitHandle = void 0;
        commitTimer = void 0;
        try {
          sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
        } catch {
        }
      };
      if (idleWin.requestIdleCallback) {
        commitHandle = idleWin.requestIdleCallback(run, { timeout: 1e3 });
      } else {
        commitTimer = setTimeout(run, 250);
      }
    };
    const flush = () => {
      frame = 0;
      const key = prevKeyRef.current;
      if (!key) {
        rootDirty = false;
        dirtyRails.clear();
        return;
      }
      const entry = ensureEntry(key);
      if (rootDirty) {
        entry.top = root.scrollTop;
        entry.left = root.scrollLeft;
        rootDirty = false;
      }
      if (dirtyRails.size) {
        for (const el of dirtyRails) {
          const id = el.dataset.railId;
          if (id) entry.rails[`rail:${id}`] = el.scrollLeft;
        }
        dirtyRails.clear();
      }
      scheduleCommit();
    };
    const queueFlush = () => {
      if (!frame) frame = requestAnimationFrame(flush);
    };
    const onRootScroll = () => {
      rootDirty = true;
      queueFlush();
    };
    root.addEventListener("scroll", onRootScroll, { passive: true });
    const onRailScroll = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t === root) return;
      if (!t.classList || !t.classList.contains("scroll-rail")) return;
      dirtyRails.add(t);
      queueFlush();
    };
    document.addEventListener("scroll", onRailScroll, { passive: true, capture: true });
    const onPageHide = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      rootDirty = true;
      document.querySelectorAll(".scroll-rail").forEach((el) => dirtyRails.add(el));
      flush();
      if (commitHandle !== void 0 && idleWin.cancelIdleCallback)
        idleWin.cancelIdleCallback(commitHandle);
      if (commitTimer) clearTimeout(commitTimer);
      commitHandle = void 0;
      commitTimer = void 0;
      try {
        sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
      } catch {
      }
    };
    window.addEventListener("pagehide", onPageHide);
    const reapply = () => {
      const key = prevKeyRef.current;
      if (!key) return;
      try {
        const saved = store[key];
        if (!saved) return;
        const maxTop = Math.max(0, root.scrollHeight - root.clientHeight);
        const maxLeft = Math.max(0, root.scrollWidth - root.clientWidth);
        const top = Math.min(saved.top ?? 0, maxTop);
        const left = Math.min(saved.left ?? 0, maxLeft);
        if (Math.abs(root.scrollTop - top) > 1 || Math.abs(root.scrollLeft - left) > 1) {
          root.scrollTo({ top, left, behavior: "instant" });
        }
        const targets = saved.rails || {};
        document.querySelectorAll(".scroll-rail").forEach((el) => {
          const id = el.dataset.railId;
          if (!id) return;
          const want = targets[`rail:${id}`];
          if (typeof want !== "number") return;
          const max = Math.max(0, el.scrollWidth - el.clientWidth);
          const clamped = Math.min(want, max);
          if (Math.abs(el.scrollLeft - clamped) > 1) {
            el.scrollTo({ left: clamped, top: 0, behavior: "instant" });
          }
        });
      } catch {
      }
    };
    let reapplyRaf = 0;
    const queueReapply = () => {
      if (reapplyRaf) cancelAnimationFrame(reapplyRaf);
      reapplyRaf = requestAnimationFrame(() => {
        reapplyRaf = 0;
        reapply();
      });
    };
    window.addEventListener("resize", queueReapply);
    window.addEventListener("orientationchange", queueReapply);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(queueReapply) : null;
    if (ro) ro.observe(root);
    const observeRails = () => {
      if (!ro) return;
      document.querySelectorAll(".scroll-rail").forEach((el) => {
        try {
          ro.observe(el);
        } catch {
        }
      });
    };
    observeRails();
    const mo = new MutationObserver((muts) => {
      let added = false;
      for (const m of muts) {
        if (m.addedNodes.length) {
          added = true;
          break;
        }
      }
      if (added) {
        observeRails();
        queueReapply();
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("resize", queueReapply);
      window.removeEventListener("orientationchange", queueReapply);
      if (ro) ro.disconnect();
      mo.disconnect();
      if (reapplyRaf) cancelAnimationFrame(reapplyRaf);
      root.removeEventListener("scroll", onRootScroll);
      document.removeEventListener("scroll", onRailScroll, true);
      window.removeEventListener("pagehide", onPageHide);
      if (frame) cancelAnimationFrame(frame);
      if (commitHandle !== void 0 && idleWin.cancelIdleCallback)
        idleWin.cancelIdleCallback(commitHandle);
      if (commitTimer) clearTimeout(commitTimer);
    };
  }, []);
  reactExports.useEffect(() => {
    const w = typeof window !== "undefined" ? window : null;
    let h;
    let t;
    const fire = () => {
      track("page_view");
    };
    if (w?.requestIdleCallback) {
      h = w.requestIdleCallback(fire, { timeout: 3e3 });
    } else {
      t = setTimeout(fire, 800);
    }
    return () => {
      if (h !== void 0 && w && "cancelIdleCallback" in w) {
        w.cancelIdleCallback(h);
      }
      if (t) clearTimeout(t);
    };
  }, [pathname]);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    const onClick = (e) => {
      const target = e.target;
      if (!target) return;
      const anchor = target.closest("a[href*='wa.me']");
      if (!anchor) return;
      if (anchor.dataset.waTracked === "1") return;
      anchor.dataset.waTracked = "1";
      try {
        const source = anchor.dataset.waSource ?? anchor.getAttribute("aria-label") ?? anchor.textContent?.trim().slice(0, 48) ?? "unlabelled";
        track("whatsapp_click", {
          props: { source, path: window.location.pathname, delegated: true }
        });
        try {
          window.sessionStorage.setItem(
            "wa_last_click",
            JSON.stringify({ t: Date.now(), source, fired: false })
          );
        } catch {
        }
      } catch {
      }
      setTimeout(() => {
        delete anchor.dataset.waTracked;
      }, 1500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => {
      if (document.visibilityState !== "visible") return;
      try {
        const raw = window.sessionStorage.getItem("wa_last_click");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed.fired) return;
        if (Date.now() - parsed.t > 10 * 6e4) return;
        track("whatsapp_message_created", {
          props: { source: parsed.source, latency_ms: Date.now() - parsed.t, proxy: "visibility" }
        });
        window.sessionStorage.setItem("wa_last_click", JSON.stringify({ ...parsed, fired: true }));
      } catch {
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  reactExports.useEffect(() => {
    if (typeof document === "undefined") return;
    const onClick = (e) => {
      const target = e.target;
      if (!target) return;
      const anchor = target.closest("a[href*='/apply']");
      if (!anchor) return;
      try {
        const u = new URL(anchor.href, window.location.origin);
        if (u.origin !== window.location.origin) return;
        if (!u.pathname.startsWith("/apply")) return;
      } catch {
        return;
      }
      if (anchor.dataset.applyTracked === "1") return;
      anchor.dataset.applyTracked = "1";
      try {
        const surface = resolveApplySurface(anchor);
        const programmeSlug = resolveApplyProgrammeSlug(anchor);
        const experimentVariant = getAssignedVariant("sticky_cta_placement");
        const applyCtaUrgency = getAssignedVariant("apply_cta_urgency");
        const heroHeadline = getAssignedVariant("hero_headline");
        const step1FieldOrder = getAssignedVariant("apply_step1_field_order");
        const step1CtaPlacement = getAssignedVariant("apply_step1_cta_placement");
        const step1ConfirmCopy = getAssignedVariant("apply_step1_confirm_copy");
        track("apply_cta_click", {
          program_slug: programmeSlug,
          props: {
            surface,
            path: window.location.pathname,
            delegated: true,
            funnel_step: "cta",
            experiment: "sticky_cta_placement",
            experiment_variant: experimentVariant,
            apply_cta_urgency_variant: applyCtaUrgency,
            hero_headline_variant: heroHeadline,
            apply_step1_field_order_variant: step1FieldOrder,
            apply_step1_cta_placement_variant: step1CtaPlacement,
            apply_step1_confirm_copy_variant: step1ConfirmCopy
          }
        });
      } catch {
      }
      setTimeout(() => {
        delete anchor.dataset.applyTracked;
      }, 1500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  const hideMarketingNav = pathname.startsWith("/apply") || pathname.startsWith("/career") || pathname.startsWith("/learn") || pathname.startsWith("/enrol") || pathname.startsWith("/admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbnailOverridesProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DarkBackdrop, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NavSectionsProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: "#app-scroll-root",
        className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary",
        children: "Skip to main content"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        id: "app-scroll-root",
        tabIndex: -1,
        className: "app-scroll-root",
        style: { "--nav-h": "0px" },
        children: [
          !hideMarketingNav && /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileWhatsAppFAB, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RouteLoader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RouteLoaderPresenceCheck, {})
  ] }) }) }) });
}
const $$splitComponentImporter$1P = () => import("./why-arzon-CTiDCXee.mjs");
const Route$2a = createFileRoute("/why-arzon")({
  head: () => {
    const title = "Why Arzon · Proof, Methodology & Credibility";
    const desc = "One page for how Arzon Careers is built: the 40/30/20/10 deployment-ready model, JD-sourced curriculum, ISO-aligned certification, MCA registration and hiring-partner network.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:url",
        content: `${SITE.origin}/why-arzon`
      }, {
        property: "og:image",
        content: absUrl(SITE.ogImage.inauguration)
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }],
      links: [{
        rel: "canonical",
        href: `${SITE.origin}/why-arzon`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1P, "component")
});
function seo(path2) {
  const url = absUrl(path2);
  return {
    meta: [
      { property: "og:url", content: url },
      { name: "twitter:url", content: url }
    ],
    links: [{ rel: "canonical", href: url }]
  };
}
const DEFAULT_OG_IMAGE = absUrl(SITE.ogImage.inauguration);
function pageSeo(input) {
  const { path: path2, title, description, ogType = "website", noindex } = input;
  const url = absUrl(path2);
  const image = input.image ? absUrl(input.image) : DEFAULT_OG_IMAGE;
  const meta = [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: ogType },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:width", content: String(SITE.ogImage.width) },
    { property: "og:image:height", content: String(SITE.ogImage.height) },
    { property: "og:image:alt", content: SITE.ogImage.alt },
    { property: "og:locale", content: "en_IN" },
    { property: "og:site_name", content: "Arzon Global" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:url", content: url }
  ];
  if (noindex) {
    meta.push({ name: "robots", content: "noindex,nofollow" });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: url }]
  };
}
const $$splitComponentImporter$1O = () => import("./waitlist-Bx0rqdOZ.mjs");
const Route$29 = createFileRoute("/waitlist")({
  head: () => {
    const seo2 = pageSeo({
      path: "/waitlist",
      title: "Cohort waitlist · Arzon Careers",
      description: "The current cohort is locked. Join the WhatsApp waitlist and we'll hold your seat for the next batch.",
      noindex: true
    });
    return {
      meta: [{
        title: "Cohort waitlist · Arzon Careers"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1O, "component")
});
const $$splitComponentImporter$1N = () => import("./verify-Ds08zfTB.mjs");
const verifySearchSchema = objectType({
  id: stringType().optional()
});
const Route$28 = createFileRoute("/verify")({
  validateSearch: (input) => verifySearchSchema.parse(input),
  head: () => {
    const ps = pageSeo({
      path: "/verify",
      title: "Verify a certificate. Arzon Global",
      description: "Paste an Arzon Global certificate ID to verify it instantly. Public, free verification, no login required.",
      image: SITE.ogImages.legal
    });
    return {
      meta: [{
        title: "Verify a certificate. Arzon Global"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1N, "component")
});
const $$splitComponentImporter$1M = () => import("./trust-report-BTU5dmpx.mjs");
const Route$27 = createFileRoute("/trust-report")({
  beforeLoad: () => {
    throw redirect({
      to: "/why-arzon",
      statusCode: 301
    });
  },
  head: () => {
    const seo2 = pageSeo({
      path: "/trust-report",
      title: "Why Arzon · Proof, Methodology & Credibility",
      description: "Legacy trust report — merged into /why-arzon. Redirecting.",
      noindex: true
    });
    return {
      meta: [{
        title: "Why Arzon · Proof, Methodology & Credibility"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1M, "component")
});
const $$splitComponentImporter$1L = () => import("./tpos-B8r5GEBo.mjs");
const Route$26 = createFileRoute("/tpos")({
  head: () => {
    const title = "For TPOs & placement officers · Arzon Careers";
    const description = "Partner-college briefing for placement officers: live batch outcomes from the public ledger, ACRI methodology, registrations, and three ways to reach the partnerships counsellor.";
    const ps = pageSeo({
      path: "/tpos",
      title,
      description
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absUrl("/")
          }, {
            "@type": "ListItem",
            position: 2,
            name: "For TPOs",
            item: absUrl("/tpos")
          }]
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1L, "component")
});
const fetchTrustLedger = createServerFn({
  method: "GET"
}).handler(createSsrRpc("172fc4f516ba319001ec0584fd92a2203994128744d55c159ccd152a1236c324"));
const fetchChangelog = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e03fb74b3e71ce18afd7e99ebea442bc606b7f8657a541e0c27a56d3f1249ed8"));
const fetchStatus = createServerFn({
  method: "GET"
}).handler(createSsrRpc("4b05414530f89986af9d0d7340ed7ef87d5ca38443a879091804c1b3459d605c"));
const $$splitComponentImporter$1K = () => import("./status-BBEuPX2d.mjs");
const Route$25 = createFileRoute("/status")({
  loader: () => fetchStatus(),
  head: () => {
    const ps = pageSeo({
      path: "/status",
      title: "System Status · Arzon Careers",
      description: "Real-time status of Arzon Careers website, ACRI quiz, payments, counsellor line and live class delivery.",
      image: "/og/about.jpg"
    });
    return {
      meta: [{
        title: "System Status · Arzon Careers"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1K, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh animate-pulse bg-background p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-64 rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded bg-muted" })
    ] })
  ] }) })
});
const COURSES = [
  // ───────── Pharmacy & Life Sciences ─────────
  {
    slug: "pharmacovigilance",
    title: "Fresher Drug Safety Associate Track — Argus + MedDRA + ICSR",
    roleTitle: "Drug Safety Associate",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: Activity,
    blurb: "Collect, analyse and report drug-safety data to keep patients safe and meet global regulations.",
    heroTagline: "Built from 1,247 live Drug Safety Associate JDs. Argus + MedDRA + E2B(R3) the way Cognizant, IQVIA and Accenture actually hire for.",
    tools: ["Argus Safety", "ArisG", "MedDRA", "WHO-DD", "E2B(R3)", "VigiBase", "EudraVigilance"],
    jd: {
      topSkills: [
        "ICSR processing",
        "MedDRA coding",
        "Narrative writing",
        "E2B / EVDAS",
        "Aggregate reports (PSUR/PBRER)"
      ],
      hiringRoles: [
        "Drug Safety Associate",
        "PV Officer",
        "ICSR Processor",
        "Aggregate Report Writer"
      ],
      salary: "₹3.5 – 7 LPA",
      demand: "Very High",
      sampleEmployers: ["Cognizant", "Accenture", "IQVIA", "Parexel", "Syneos", "Tata 1mg"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "PV foundations & global regulations",
        topics: [
          "Drug development lifecycle",
          "ICH-GVP modules",
          "FDA / EMA / CDSCO frameworks",
          "Roles in PV"
        ],
        deliverable: "Regulatory comparison sheet",
        jdSkill: "Knowledge of ICH-GVP and ICH-E2 guidelines"
      },
      {
        weeks: "W3–4",
        title: "Adverse events & ICSR processing",
        topics: [
          "AE vs ADR vs SAE",
          "Case intake & triage",
          "Seriousness, causality, expectedness",
          "Source-document handling"
        ],
        deliverable: "10 mock ICSR cases booked",
        jdSkill: "End-to-end ICSR case processing"
      },
      {
        weeks: "W5–6",
        title: "MedDRA & WHO-DD coding",
        topics: [
          "MedDRA hierarchy (LLT→SOC)",
          "Coding conventions",
          "WHO Drug Dictionary",
          "Quality checks"
        ],
        deliverable: "100-term coding test (>95% accuracy)",
        jdSkill: "MedDRA + WHO-DD coding proficiency"
      },
      {
        weeks: "W7–8",
        title: "Argus Safety hands-on",
        topics: [
          "Case book-in workflow",
          "Narrative writing",
          "Follow-up handling",
          "E2B(R3) submission"
        ],
        deliverable: "Argus simulation: 25 cases",
        jdSkill: "Working knowledge of Argus / ArisG"
      },
      {
        weeks: "W9–10",
        title: "Aggregate reports & signal detection",
        topics: [
          "PSUR / PBRER / DSUR",
          "Literature search (Embase/Medline)",
          "Signal detection basics",
          "EVDAS & VigiBase"
        ],
        deliverable: "1 mini-PSUR draft",
        jdSkill: "Aggregate report writing & signal screening"
      },
      {
        weeks: "W11–12",
        title: "Audits, inspections & capstone",
        topics: ["GVP audits", "CAPA", "Quality metrics", "Mock interview"],
        deliverable: "Capstone: 50-case PV report",
        jdSkill: "Inspection-readiness and quality mindset"
      }
    ],
    projects: {
      minor: [
        "Process 25 ICSR cases in a simulated Argus environment",
        "Code 100 adverse-event terms in MedDRA with QC review"
      ],
      major: "End-to-end PSUR for a sample drug, including line-listing, signal review and benefit-risk summary"
    },
    certification: "Verified Pharmacovigilance Internship Certificate + Project Letter from associated CRO partner."
  },
  {
    slug: "medical-coding",
    title: "Fresher Medical Coder Track — ICD-10-CM + CPT + 3M Encoder",
    roleTitle: "Medical Coder",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: Stethoscope,
    blurb: "Master the coding standards hospitals and insurers use to process global healthcare claims.",
    heroTagline: "Built from 1,893 live fresher Medical Coder JDs. ICD-10-CM, CPT, E/M, modifiers — exactly what Optum, Omega and Access Healthcare interview on.",
    tools: [
      "ICD-10-CM",
      "ICD-10-PCS",
      "CPT®",
      "HCPCS Level II",
      "3M Encoder",
      "EncoderPro",
      "EHR systems"
    ],
    jd: {
      topSkills: [
        "ICD-10-CM coding",
        "CPT & HCPCS",
        "E/M coding",
        "HIPAA compliance",
        "NCCI edits",
        "Modifier application"
      ],
      hiringRoles: [
        "Medical Coder (E/M, IP, OP, Surgery)",
        "Coding QA Analyst",
        "AR / Denial Analyst"
      ],
      salary: "₹3 – 6 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Optum",
        "Omega Healthcare",
        "Access Healthcare",
        "R1 RCM",
        "Sutherland",
        "AGS Health"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Anatomy, physiology & medical terminology",
        topics: [
          "Body systems overview",
          "Common Rx classes",
          "Medical terminology roots/suffixes",
          "Disease processes"
        ],
        deliverable: "Terminology + anatomy quiz",
        jdSkill: "Strong medical terminology and anatomy"
      },
      {
        weeks: "W3–4",
        title: "ICD-10-CM coding",
        topics: [
          "Conventions and guidelines",
          "Chapter-specific guidelines",
          "Sequencing rules",
          "Combination codes"
        ],
        deliverable: "100-chart ICD-10-CM exercise",
        jdSkill: "ICD-10-CM proficiency to AAPC standard"
      },
      {
        weeks: "W5–6",
        title: "CPT & HCPCS Level II",
        topics: [
          "Surgery / Radiology / Path / Medicine sections",
          "E/M leveling",
          "Modifiers (-25, -59, -51, …)",
          "HCPCS Level II"
        ],
        deliverable: "60-chart CPT + E/M test",
        jdSkill: "CPT, HCPCS and E/M leveling"
      },
      {
        weeks: "W7–8",
        title: "Specialty coding (IP, OP, Surgery, ED)",
        topics: ["IP DRG basics", "Outpatient APC", "Surgery coding rules", "ED workflows"],
        deliverable: "Specialty mini-audit",
        jdSkill: "Multi-specialty coding exposure"
      },
      {
        weeks: "W9–10",
        title: "Compliance, NCCI & RCM",
        topics: [
          "HIPAA & PHI handling",
          "NCCI edits and bundling",
          "Medical necessity",
          "Payer rules & denials"
        ],
        deliverable: "Denial-management case study",
        jdSkill: "HIPAA, NCCI and payer-side awareness"
      },
      {
        weeks: "W11–12",
        title: "CPC mock + capstone audit",
        topics: ["CPC exam strategy", "Timed practice", "QA workflows", "Resume + interview prep"],
        deliverable: "Capstone: 50-chart audit + report",
        jdSkill: "Production accuracy ≥ 95% with QA mindset"
      }
    ],
    projects: {
      minor: [
        "Code 100 outpatient charts in ICD-10-CM with QA peer review",
        "CPT + E/M leveling on 60 surgical encounters"
      ],
      major: "50-chart end-to-end audit (ICD + CPT + modifiers + denial-risk note) graded against AAPC rubric"
    },
    certification: "Verified Medical Coding Internship Certificate + CPC-readiness assessment."
  },
  {
    slug: "clinical-data-management",
    title: "Clinical Data Associate Track — Medidata Rave + CDASH + SDTM",
    roleTitle: "Clinical Data Associate",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: Database,
    blurb: "Manage, validate and report clinical-trial data using industry-standard CDISC tools.",
    heroTagline: "Built from 684 live Clinical Data Associate JDs. Medidata Rave, CDASH, SDTM — the toolkit IQVIA, Parexel and Syneos hire freshers for.",
    tools: [
      "Medidata Rave",
      "Oracle Clinical / RDC",
      "Veeva CDMS",
      "CDISC SDTM",
      "CDASH",
      "SAS basics"
    ],
    jd: {
      topSkills: [
        "CRF design (CDASH)",
        "Edit-check programming",
        "Data cleaning & query management",
        "SAE reconciliation",
        "Database lock"
      ],
      hiringRoles: ["Clinical Data Associate", "CDM Programmer", "Data Validation Specialist"],
      salary: "₹4 – 8 LPA",
      demand: "High",
      sampleEmployers: ["IQVIA", "Parexel", "Syneos", "ICON plc", "TCS Lifesciences", "Cognizant"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Clinical trials & GCP overview",
        topics: ["Trial phases I–IV", "ICH-GCP", "Roles: sponsor, CRO, site", "21 CFR Part 11"],
        deliverable: "GCP self-assessment",
        jdSkill: "ICH-GCP & 21 CFR Part 11 awareness"
      },
      {
        weeks: "W3–4",
        title: "CRF design with CDASH",
        topics: [
          "Protocol-driven CRF design",
          "CDASH standards",
          "Annotated CRF",
          "Version control"
        ],
        deliverable: "Annotated CRF for a sample protocol",
        jdSkill: "CDASH-aligned CRF design"
      },
      {
        weeks: "W5–6",
        title: "EDC build (Medidata Rave / Veeva)",
        topics: ["Study build basics", "Edit checks", "User management", "UAT"],
        deliverable: "Mini study build + UAT log",
        jdSkill: "Hands-on EDC (Rave / Veeva)"
      },
      {
        weeks: "W7–8",
        title: "Data cleaning & query management",
        topics: [
          "Discrepancy handling",
          "Query lifecycle",
          "Listings review",
          "Coding (MedDRA/WHO-DD)"
        ],
        deliverable: "Clean a 200-row dirty dataset",
        jdSkill: "Query management & data cleaning"
      },
      {
        weeks: "W9–10",
        title: "SAE recon, SDTM & lock",
        topics: [
          "SAE reconciliation with PV",
          "SDTM mapping basics",
          "Define-XML",
          "Lock checklist"
        ],
        deliverable: "SAE recon report",
        jdSkill: "SAE reconciliation & SDTM exposure"
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview prep",
        topics: ["Lock dry run", "Audit trail review", "Resume building", "Mock interview"],
        deliverable: "Capstone: full study lock package",
        jdSkill: "End-to-end CDM lifecycle ownership"
      }
    ],
    projects: {
      minor: [
        "Design + annotate a CRF for an oncology Phase II protocol",
        "Build edit checks and run UAT on a Medidata-style EDC"
      ],
      major: "Take a sample study from CRF design → cleaning → SAE recon → mock database lock"
    },
    certification: "Verified Clinical Data Management Internship Certificate + Project Letter."
  },
  {
    slug: "sas-clinical",
    title: "Clinical SAS Programmer Track — SDTM + ADaM + TLF",
    roleTitle: "Clinical SAS Programmer",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: CodeXml,
    blurb: "Program SDTM/ADaM datasets and TLFs for regulatory submissions.",
    heroTagline: "Built from 512 live Clinical SAS Programmer JDs. Base SAS + Macros, SDTM, ADaM, TLFs — the exact stack CROs interview on.",
    tools: ["SAS Base", "SAS Macros", "SAS SQL", "SDTM", "ADaM", "Define-XML", "Pinnacle 21"],
    jd: {
      topSkills: [
        "Base SAS + Macros",
        "SDTM / ADaM mapping",
        "TLFs (Tables, Listings, Figures)",
        "Pinnacle 21 validation",
        "Clinical-trial data flow"
      ],
      hiringRoles: ["SAS Programmer (Clinical)", "Statistical Programmer", "ADaM Lead"],
      salary: "₹4.5 – 10 LPA",
      demand: "Very High",
      sampleEmployers: ["IQVIA", "Cytel", "Parexel", "TCS", "Accenture", "Quanticate"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Base SAS essentials",
        topics: ["DATA step", "PROC SQL", "Reading raw data", "Output delivery"],
        deliverable: "10 mini SAS exercises",
        jdSkill: "Strong Base SAS programming"
      },
      {
        weeks: "W3–4",
        title: "SAS Macros & efficiency",
        topics: ["Macro vars and macros", "%IF/%DO", "Reusable utilities", "Debugging"],
        deliverable: "Reusable macro library",
        jdSkill: "Macro programming for production code"
      },
      {
        weeks: "W5–6",
        title: "Clinical data & SDTM",
        topics: [
          "CDISC overview",
          "SDTM domains (DM, AE, EX, LB…)",
          "Mapping conventions",
          "Define-XML basics"
        ],
        deliverable: "Map raw data → 5 SDTM domains",
        jdSkill: "SDTM mapping per CDISC IG"
      },
      {
        weeks: "W7–8",
        title: "ADaM datasets",
        topics: ["ADaM principles", "ADSL build", "BDS structure", "Traceability"],
        deliverable: "Build ADSL + ADAE",
        jdSkill: "ADaM creation with traceability"
      },
      {
        weeks: "W9–10",
        title: "TLFs for submissions",
        topics: [
          "Demographic tables",
          "Efficacy tables",
          "Safety listings",
          "Figures with PROC SGPLOT"
        ],
        deliverable: "5 TLFs to mock SAP",
        jdSkill: "TLF programming to SAP"
      },
      {
        weeks: "W11–12",
        title: "Validation & capstone",
        topics: [
          "Pinnacle 21 checks",
          "Double programming",
          "Define-XML packaging",
          "Submission readiness"
        ],
        deliverable: "Capstone: SDTM + ADaM + TLF pack",
        jdSkill: "Submission-grade deliverable"
      }
    ],
    projects: {
      minor: [
        "Build a reusable macro library for common clinical reports",
        "Map 5 SDTM domains for a sample Phase II oncology trial"
      ],
      major: "End-to-end deliverable: raw → SDTM → ADaM → TLFs → Pinnacle-21 validated package"
    },
    certification: "Verified Clinical SAS Programming Internship Certificate + Project Letter."
  },
  {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs Associate Track — eCTD + Veeva Vault RIM + ANDA",
    roleTitle: "Regulatory Affairs Associate",
    seniority: "Fresher",
    jdRefreshedOn: "2026-05-01",
    category: "Pharmacy & Life Sciences",
    Icon: FileCheckCorner,
    blurb: "Submissions and approvals across FDA, EMA and CDSCO for global health authorities.",
    heroTagline: "Built from 437 live Regulatory Affairs Associate JDs. eCTD modules, Veeva Vault RIM, ANDA/NDA/MAA — exactly what Dr Reddy's, Sun Pharma and Aurobindo hire for.",
    tools: ["eCTD", "FDA portals", "EMA EudraLex", "CDSCO SUGAM", "Veeva Vault RIM"],
    jd: {
      topSkills: [
        "eCTD module structure (M1–M5)",
        "ANDA / NDA / MAA basics",
        "Labeling & artwork review",
        "RIM tools",
        "Variations & lifecycle"
      ],
      hiringRoles: [
        "Regulatory Affairs Associate",
        "Publishing Specialist",
        "Labeling Coordinator"
      ],
      salary: "₹4 – 9 LPA",
      demand: "High",
      sampleEmployers: [
        "Dr. Reddy's",
        "Sun Pharma",
        "Aurobindo",
        "Lupin",
        "Freyr Solutions",
        "Indegene"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Global RA landscape",
        topics: [
          "Drug approval pathways",
          "FDA, EMA, CDSCO, PMDA, ANVISA",
          "Generic vs innovator",
          "Lifecycle management"
        ],
        deliverable: "Pathway comparison brief",
        jdSkill: "Knowledge of major regulatory frameworks"
      },
      {
        weeks: "W3–4",
        title: "eCTD & dossier structure",
        topics: [
          "CTD modules M1–M5",
          "Granularity rules",
          "Hyperlinking & bookmarks",
          "Common deficiencies"
        ],
        deliverable: "Mini-dossier table of contents",
        jdSkill: "Working knowledge of eCTD structure"
      },
      {
        weeks: "W5–6",
        title: "ANDA / NDA / MAA basics",
        topics: ["ANDA Q&A", "NDA contents", "EU MAA centralised vs DCP", "FDA gateway"],
        deliverable: "ANDA module 1 draft",
        jdSkill: "ANDA / NDA / MAA familiarity"
      },
      {
        weeks: "W7–8",
        title: "Labeling, artwork & promotional review",
        topics: [
          "USPI / SmPC / PIL",
          "Artwork lifecycle",
          "Promo material compliance",
          "Change control"
        ],
        deliverable: "Mock USPI + SmPC review",
        jdSkill: "Labeling & artwork QC"
      },
      {
        weeks: "W9–10",
        title: "RIM systems & publishing",
        topics: [
          "Veeva Vault RIM tour",
          "Publishing workflow",
          "Validation",
          "Submission tracking"
        ],
        deliverable: "RIM-style submission log",
        jdSkill: "RIM / publishing tool exposure"
      },
      {
        weeks: "W11–12",
        title: "Variations, queries & capstone",
        topics: [
          "Type IA/IB/II variations",
          "Health-authority queries",
          "Resume & RA interview prep"
        ],
        deliverable: "Capstone: small ANDA pack",
        jdSkill: "Lifecycle + query handling"
      }
    ],
    projects: {
      minor: [
        "Draft Module 1 (administrative) for a generic ANDA",
        "QC review of a USPI + SmPC for label deviations"
      ],
      major: "End-to-end mini-ANDA package (M1 + summary M2) with publishing checklist"
    },
    certification: "Verified Regulatory Affairs Internship Certificate + Project Letter."
  },
  {
    slug: "nanoscience",
    title: "Nanoscience & Nanotechnology",
    category: "Pharmacy & Life Sciences",
    Icon: Atom,
    blurb: "Apply nanotech to pharma, materials and diagnostics, synthesis to characterisation.",
    heroTagline: "Lab-grade exposure for research and R&D roles.",
    tools: ["SEM", "TEM", "AFM", "FTIR", "XRD", "DLS", "UV-Vis"],
    jd: {
      topSkills: [
        "Nanoparticle synthesis",
        "Characterisation (SEM/TEM/XRD)",
        "Drug delivery systems",
        "Lab notebook discipline",
        "Literature review"
      ],
      hiringRoles: ["R&D Associate", "Formulation Trainee", "Materials Lab Analyst"],
      salary: "₹3 – 6 LPA",
      demand: "Steady",
      sampleEmployers: [
        "Pharma R&D centres",
        "IISc/CSIR labs",
        "Biocon",
        "Dr. Reddy's R&D",
        "ARCI"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Nano fundamentals",
        topics: ["Nanoscale phenomena", "Quantum effects", "Surface area & reactivity", "Safety"],
        deliverable: "Concept quiz + lab safety cert",
        jdSkill: "Foundation in nanoscale science"
      },
      {
        weeks: "W3–4",
        title: "Synthesis methods",
        topics: [
          "Top-down vs bottom-up",
          "Sol-gel, hydrothermal",
          "Green synthesis",
          "Reproducibility"
        ],
        deliverable: "Mock synthesis SOP",
        jdSkill: "Hands-on synthesis exposure"
      },
      {
        weeks: "W5–6",
        title: "Characterisation toolbox",
        topics: ["SEM/TEM imaging", "XRD pattern reading", "FTIR/UV-Vis", "DLS for size/zeta"],
        deliverable: "Characterisation report on a sample dataset",
        jdSkill: "Reading SEM/TEM/XRD/DLS data"
      },
      {
        weeks: "W7–8",
        title: "Nano in drug delivery",
        topics: ["Liposomes & micelles", "Polymeric NPs", "Targeted delivery", "Toxicology basics"],
        deliverable: "Drug-delivery design brief",
        jdSkill: "Application to formulation R&D"
      },
      {
        weeks: "W9–10",
        title: "Materials & diagnostics",
        topics: ["Quantum dots", "Biosensors", "Lateral-flow assays", "Magnetic NPs"],
        deliverable: "Mini literature review",
        jdSkill: "Cross-domain nano applications"
      },
      {
        weeks: "W11–12",
        title: "Capstone project",
        topics: ["Project design", "Data analysis", "Poster preparation", "Viva"],
        deliverable: "Capstone: research poster + report",
        jdSkill: "Communicate research outputs"
      }
    ],
    projects: {
      minor: [
        "Characterisation deep-dive on a provided SEM/XRD dataset",
        "Design brief for a nano drug-delivery system"
      ],
      major: "Research poster + report on a chosen application (drug delivery, biosensor or material)"
    },
    certification: "Verified Nanotech R&D Internship Certificate + Mentor recommendation."
  },
  {
    slug: "clinical-saas",
    title: "Clinical SaaS Programme",
    category: "Pharmacy & Life Sciences",
    Icon: Server,
    blurb: "Configure, validate and run studies on the SaaS platforms every CRO and biotech is migrating to.",
    heroTagline: "The Veeva + Medidata + Oracle skill set CROs interview for.",
    tools: [
      "Veeva Vault Clinical (CTMS, eTMF, Study Startup)",
      "Medidata Rave EDC",
      "Oracle Clinical One",
      "Argus Safety",
      "21 CFR Part 11",
      "GxP validation"
    ],
    jd: {
      topSkills: [
        "Vault Clinical configuration",
        "Rave study build & edit checks",
        "Clinical One admin",
        "21 CFR Part 11 / CSV",
        "User & role management"
      ],
      hiringRoles: [
        "Clinical Systems Analyst",
        "EDC Build Programmer",
        "Veeva Vault Administrator",
        "Validation Analyst"
      ],
      salary: "₹6 – 12 LPA",
      demand: "Very High",
      sampleEmployers: [
        "IQVIA",
        "Parexel",
        "Syneos",
        "ICON plc",
        "Indegene",
        "TCS Lifesciences",
        "Cognizant Life Sciences"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Clinical SaaS landscape & GxP foundations",
        topics: [
          "Clinical platforms market map",
          "Multi-tenant SaaS basics",
          "ICH-GCP & 21 CFR Part 11 refresher",
          "Roles: build, validate, operate"
        ],
        deliverable: "Platform comparison matrix (Vault vs Rave vs Clinical One)",
        jdSkill: "Working knowledge of major clinical SaaS systems"
      },
      {
        weeks: "W3–4",
        title: "Veeva Vault Clinical (CTMS + eTMF)",
        topics: [
          "Vault object model",
          "CTMS site & monitoring workflows",
          "eTMF zones, EDLs and TMF reference model",
          "Vault admin: users, roles, lifecycles"
        ],
        deliverable: "Configure CTMS + eTMF for a mock study",
        jdSkill: "Hands-on Veeva Vault Clinical configuration"
      },
      {
        weeks: "W5–6",
        title: "Medidata Rave study build",
        topics: [
          "Architect: forms, folders, matrices",
          "Edit checks & derivations",
          "Custom functions basics",
          "UAT & migration"
        ],
        deliverable: "Mini Rave study build + UAT log",
        jdSkill: "Rave study build & edit-check programming"
      },
      {
        weeks: "W7–8",
        title: "Oracle Clinical One & Argus admin",
        topics: [
          "Clinical One study design",
          "Randomisation & supply (RTSM)",
          "Argus Safety case workflow basics",
          "Cross-system data flow"
        ],
        deliverable: "Clinical One mock study + Argus user setup",
        jdSkill: "Oracle clinical platform familiarity"
      },
      {
        weeks: "W9–10",
        title: "Validation, CSV & 21 CFR Part 11",
        topics: [
          "GAMP 5 risk-based CSV",
          "IQ/OQ/PQ documentation",
          "Audit trails & e-signatures",
          "Change control"
        ],
        deliverable: "OQ test script pack for a Vault config",
        jdSkill: "Computer System Validation discipline"
      },
      {
        weeks: "W11–12",
        title: "Capstone: end-to-end SaaS study",
        topics: [
          "Cross-platform study design",
          "Build → validate → go-live",
          "SOP authoring",
          "Mock interview"
        ],
        deliverable: "Capstone: study configured across two SaaS platforms with validation evidence",
        jdSkill: "Ship a validated, production-style configuration"
      }
    ],
    projects: {
      minor: [
        "Configure a Veeva Vault eTMF zone with EDLs for a Phase II study",
        "Build a Medidata Rave EDC form with edit checks and run UAT"
      ],
      major: "End-to-end study configured across Vault Clinical + Rave with full CSV evidence (URS → IQ/OQ → PQ)"
    },
    certification: "Verified Clinical SaaS Internship Certificate + Validation evidence pack."
  },
  {
    slug: "healthcare-rcm",
    title: "Healthcare RCM & US Medical Billing",
    category: "Pharmacy & Life Sciences",
    Icon: Receipt,
    blurb: "Run the US revenue cycle end-to-end, eligibility, claims, denials and AR, the way Optum and R1 hire for.",
    heroTagline: "The largest healthcare-BPO hiring pipeline in India.",
    tools: [
      "Epic / Cerner basics",
      "Athena",
      "Availity",
      "Waystar",
      "EDI 837 / 835 / 270 / 271",
      "ICD-10-CM",
      "CPT®"
    ],
    jd: {
      topSkills: [
        "Eligibility & prior authorisation",
        "Charge capture & claim scrubbing",
        "EDI 837 / 835 reading",
        "Denial management & appeals",
        "AR follow-up & KPIs"
      ],
      hiringRoles: [
        "AR Caller",
        "Charge Entry Specialist",
        "Denial Management Analyst",
        "RCM Operations Analyst"
      ],
      salary: "₹3 – 6 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Optum",
        "R1 RCM",
        "Access Healthcare",
        "AGS Health",
        "Omega Healthcare",
        "Sutherland",
        "Cognizant"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "US healthcare ecosystem & payers",
        topics: [
          "Provider–payer–patient flow",
          "Medicare, Medicaid & commercial plans",
          "HIPAA basics",
          "Revenue cycle map"
        ],
        deliverable: "Payer comparison + RCM flow diagram",
        jdSkill: "US healthcare ecosystem fluency"
      },
      {
        weeks: "W3–4",
        title: "Patient access, eligibility & prior auth",
        topics: [
          "EDI 270/271 eligibility",
          "Benefits verification",
          "Prior authorisation workflows",
          "Patient estimation"
        ],
        deliverable: "Eligibility + auth log on 25 mock patients",
        jdSkill: "Front-end RCM operations"
      },
      {
        weeks: "W5–6",
        title: "Charge capture & claims (837/835)",
        topics: [
          "Charge entry & coding handoff",
          "EDI 837 claim structure",
          "Clearinghouse scrubbing",
          "EDI 835 remittance"
        ],
        deliverable: "Submit & post 50 mock claims",
        jdSkill: "End-to-end claim lifecycle"
      },
      {
        weeks: "W7–8",
        title: "Denial management & appeals",
        topics: [
          "CARC/RARC denial codes",
          "Root-cause categories",
          "Appeal letter writing",
          "Payer-specific playbooks"
        ],
        deliverable: "20 denial workups + appeal letters",
        jdSkill: "Denial analytics & resolution"
      },
      {
        weeks: "W9–10",
        title: "AR follow-up & RCM KPIs",
        topics: [
          "AR aging buckets",
          "Collector calling scripts",
          "DSO / clean-claim rate / denial rate",
          "Reporting"
        ],
        deliverable: "AR aging dashboard + collector script pack",
        jdSkill: "AR ownership & KPI literacy"
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview",
        topics: [
          "End-to-end mock revenue cycle",
          "Compliance & PHI handling",
          "RCM analyst interview drills",
          "Resume polish"
        ],
        deliverable: "Capstone: 50-claim revenue cycle audit",
        jdSkill: "Production-ready RCM analyst"
      }
    ],
    projects: {
      minor: [
        "Run eligibility + prior-auth on a 25-patient mock panel",
        "Work 20 denied claims to resolution with appeal letters"
      ],
      major: "End-to-end revenue cycle on a 50-claim sample: eligibility → coding handoff → 837 → 835 → denials → AR resolution"
    },
    certification: "Verified Healthcare RCM Internship Certificate + Project Letter."
  },
  {
    slug: "digital-health-fhir",
    title: "Digital Health & FHIR Interoperability",
    category: "Pharmacy & Life Sciences",
    Icon: Network,
    blurb: "Build the interoperability layer every modern health-tech product needs. HL7 FHIR R4, ABDM and SMART on FHIR.",
    heroTagline: "FHIR fluency is the new baseline for healthtech engineering.",
    tools: [
      "HL7 FHIR R4",
      "HAPI FHIR",
      "Medplum",
      "Postman",
      "SMART on FHIR / OAuth 2.0",
      "ABDM Sandbox",
      "SNOMED CT",
      "LOINC"
    ],
    jd: {
      topSkills: [
        "FHIR R4 resources & profiles",
        "Implementation Guides (US Core, ABDM)",
        "FHIR API design (HAPI / Medplum)",
        "SMART on FHIR auth",
        "Clinical terminologies (SNOMED, LOINC, ICD)"
      ],
      hiringRoles: [
        "Healthcare Integration Engineer",
        "FHIR Developer",
        "Digital Health Engineer",
        "Interoperability Analyst"
      ],
      salary: "₹6 – 14 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Practo",
        "Tata 1mg",
        "PharmEasy",
        "Apollo 24|7",
        "HealthifyMe",
        "Indegene",
        "Persistent Health"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Health data standards & HL7 v2 → FHIR R4",
        topics: [
          "HL7 v2 messages overview",
          "Why FHIR? REST + resources",
          "FHIR data model basics",
          "Postman + public FHIR servers"
        ],
        deliverable: "Read & write 10 Patient/Observation resources via Postman",
        jdSkill: "FHIR R4 fundamentals"
      },
      {
        weeks: "W3–4",
        title: "Resources, profiles & Implementation Guides",
        topics: [
          "Core resources (Patient, Encounter, Observation, MedicationRequest)",
          "Profiles & extensions",
          "US Core IG",
          "ABDM HRP/HIP profiles"
        ],
        deliverable: "Author a custom profile + example resource",
        jdSkill: "FHIR profiling for an Implementation Guide"
      },
      {
        weeks: "W5–6",
        title: "Build a FHIR API (HAPI / Medplum)",
        topics: [
          "HAPI FHIR JPA server setup",
          "Medplum as a hosted alternative",
          "Search parameters",
          "Bundles & transactions"
        ],
        deliverable: "Deploy a working FHIR API with seed data",
        jdSkill: "Hands-on FHIR server development"
      },
      {
        weeks: "W7–8",
        title: "SMART on FHIR + OAuth 2.0",
        topics: [
          "SMART app launch flow",
          "Scopes & consent",
          "OAuth 2.0 / PKCE",
          "Patient-facing app pattern"
        ],
        deliverable: "SMART app that reads a patient's data",
        jdSkill: "Secure FHIR app integration"
      },
      {
        weeks: "W9–10",
        title: "Terminologies + India ABDM stack",
        topics: [
          "SNOMED CT, LOINC, ICD basics",
          "Code systems & ValueSets",
          "ABDM (HFR, HPR, HIE-CM, Health Locker)",
          "Consent flows"
        ],
        deliverable: "Connect to ABDM Sandbox + map a code set",
        jdSkill: "Terminology + ABDM integration"
      },
      {
        weeks: "W11–12",
        title: "Capstone: FHIR-native EHR module",
        topics: [
          "Architecture & data model",
          "API + minimal UI",
          "Testing with Touchstone",
          "Demo + interview prep"
        ],
        deliverable: "Capstone: FHIR-native mini-EHR module",
        jdSkill: "Ship a real interoperable health-tech feature"
      }
    ],
    projects: {
      minor: [
        "Author a US Core-aligned Patient profile + validate against the IG",
        "Build a SMART on FHIR app that reads a patient timeline"
      ],
      major: "FHIR-native mini-EHR module: HAPI/Medplum backend + SMART app + ABDM-style consent flow"
    },
    certification: "Verified Digital Health & FHIR Internship Certificate + GitHub portfolio."
  },
  {
    slug: "medical-writing",
    title: "Medical & Scientific Writing",
    category: "Pharmacy & Life Sciences",
    Icon: PenLine,
    blurb: "Write the documents pharma actually pays for, protocols, CSRs, regulatory summaries and manuscripts.",
    heroTagline: "From protocol to publication, the writing pharma billing rates demand.",
    tools: [
      "MS Word advanced",
      "EndNote / Mendeley",
      "ICH-E3 templates",
      "CTD modules",
      "AMA / Vancouver style",
      "PubMed / Embase"
    ],
    jd: {
      topSkills: [
        "Protocol & investigator brochure writing",
        "CSR authoring (ICH-E3)",
        "Regulatory writing (CTD 2.5 / 2.7)",
        "Manuscript & abstract writing",
        "Reference management"
      ],
      hiringRoles: [
        "Medical Writer",
        "Regulatory Writer",
        "Scientific Communications Associate",
        "Publications Specialist"
      ],
      salary: "₹4.5 – 9 LPA",
      demand: "High",
      sampleEmployers: [
        "IQVIA",
        "Indegene",
        "Freyr Solutions",
        "Cactus Communications",
        "Parexel",
        "Syneos Health",
        "Tata Elxsi"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Pharma document landscape & ICH-E3",
        topics: [
          "Regulatory document map",
          "ICH-E3 CSR structure",
          "GCP & data sources",
          "Style guides (AMA, Vancouver)"
        ],
        deliverable: "Annotated CSR table of contents",
        jdSkill: "ICH-E3 fluency"
      },
      {
        weeks: "W3–4",
        title: "Protocols & investigator brochures",
        topics: [
          "Protocol skeleton & SAP linkage",
          "Inclusion/exclusion writing",
          "IB structure",
          "Plain-language summaries"
        ],
        deliverable: "Write a Phase II protocol synopsis + IB section",
        jdSkill: "Protocol & IB authoring"
      },
      {
        weeks: "W5–6",
        title: "CSR authoring",
        topics: [
          "Synopsis & narrative writing",
          "TLF interpretation",
          "Safety narratives",
          "Internal QC review"
        ],
        deliverable: "Mini-CSR (synopsis + safety section) for a mock study",
        jdSkill: "End-to-end CSR drafting"
      },
      {
        weeks: "W7–8",
        title: "Regulatory writing. CTD modules 2.5 & 2.7",
        topics: [
          "Module 2.5 clinical overview",
          "Module 2.7 clinical summary",
          "Cross-referencing CSRs",
          "Health-authority queries"
        ],
        deliverable: "Module 2.7.4 safety summary draft",
        jdSkill: "CTD authoring discipline"
      },
      {
        weeks: "W9–10",
        title: "Manuscripts, posters & lay summaries",
        topics: [
          "IMRaD structure",
          "Author guidelines (NEJM/Lancet)",
          "Conference posters/abstracts",
          "Plain-language summaries (EMA)"
        ],
        deliverable: "Manuscript draft + conference poster",
        jdSkill: "Publications-grade scientific writing"
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview prep",
        topics: [
          "Full mock CSR review cycle",
          "QC checklists",
          "Portfolio building",
          "Mock interview"
        ],
        deliverable: "Capstone: full mock CSR + manuscript",
        jdSkill: "Hire-ready medical writing portfolio"
      }
    ],
    projects: {
      minor: [
        "Author a Phase II protocol synopsis + IB clinical section",
        "Draft Module 2.7.4 safety summary from mock CSR data"
      ],
      major: "Full mock CSR (ICH-E3 sections) + companion manuscript draft submitted to QC review"
    },
    certification: "Verified Medical Writing Internship Certificate + Writing portfolio."
  },
  {
    slug: "bioinformatics",
    title: "Bioinformatics & Genomic Data",
    category: "Pharmacy & Life Sciences",
    Icon: Dna,
    blurb: "Work with NGS data the way clinical genomics labs do. Linux, Python, variant calling and interpretation.",
    heroTagline: "Python + Linux + NGS, the toolkit Indian genomics labs hire for.",
    tools: [
      "Linux / Bash",
      "Python + Biopython",
      "BWA / Bowtie2",
      "GATK",
      "samtools / bcftools",
      "ANNOVAR / VEP",
      "IGV",
      "Nextflow"
    ],
    jd: {
      topSkills: [
        "Linux & shell scripting",
        "Python for biology (Biopython, pandas)",
        "NGS pipelines (FASTQ → VCF)",
        "Variant annotation & interpretation",
        "Reproducible workflows (Nextflow / Snakemake)"
      ],
      hiringRoles: [
        "Bioinformatics Analyst",
        "Clinical Genomics Associate",
        "NGS Pipeline Engineer",
        "Variant Curator"
      ],
      salary: "₹5 – 10 LPA",
      demand: "High",
      sampleEmployers: [
        "MedGenome",
        "Strand Life Sciences",
        "Genomics India",
        "Mapmygenome",
        "Eurofins Genomics",
        "Indegene",
        "Persistent Systems"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Linux + Python for biology",
        topics: [
          "Shell, pipes & scripting",
          "Python core + pandas",
          "Biopython basics",
          "Git for analysis projects"
        ],
        deliverable: "Reproducible analysis notebook on a public dataset",
        jdSkill: "Linux + Python fluency for bioinformatics"
      },
      {
        weeks: "W3–4",
        title: "Sequence analysis fundamentals",
        topics: [
          "DNA/RNA/protein refresher",
          "BLAST searches",
          "Pairwise & multiple alignment",
          "Phylogenetics intro"
        ],
        deliverable: "BLAST + alignment report on a chosen gene",
        jdSkill: "Sequence analysis literacy"
      },
      {
        weeks: "W5–6",
        title: "NGS pipelines (FASTQ → VCF)",
        topics: [
          "FASTQ QC (FastQC, fastp)",
          "Alignment (BWA/Bowtie2)",
          "Variant calling (GATK HaplotypeCaller)",
          "Best-practice workflow"
        ],
        deliverable: "Run an end-to-end germline pipeline on sample data",
        jdSkill: "GATK best-practices NGS pipeline"
      },
      {
        weeks: "W7–8",
        title: "Variant annotation & interpretation",
        topics: [
          "ANNOVAR / VEP",
          "ClinVar, gnomAD, OMIM",
          "ACMG classification basics",
          "IGV review"
        ],
        deliverable: "Annotated, ACMG-classified variant report (10 variants)",
        jdSkill: "Clinical variant interpretation"
      },
      {
        weeks: "W9–10",
        title: "Transcriptomics & single-cell intro",
        topics: [
          "RNA-seq pipeline (STAR/Salmon)",
          "Differential expression (DESeq2)",
          "Single-cell overview (Scanpy)",
          "Visualisation"
        ],
        deliverable: "Mini RNA-seq differential expression report",
        jdSkill: "Bulk + single-cell RNA-seq exposure"
      },
      {
        weeks: "W11–12",
        title: "Reproducible workflows + capstone",
        topics: [
          "Nextflow / Snakemake basics",
          "Containerised pipelines (Docker)",
          "Reporting & QC",
          "Mock interview"
        ],
        deliverable: "Capstone: Nextflow variant-calling pipeline + clinical-style report",
        jdSkill: "Production, reproducible bioinformatics workflows"
      }
    ],
    projects: {
      minor: [
        "Run a germline NGS pipeline on sample FASTQ → annotated VCF",
        "RNA-seq differential expression analysis with DESeq2 + visualisations"
      ],
      major: "End-to-end Nextflow pipeline (FASTQ → annotated, ACMG-classified report) on a clinical-grade sample"
    },
    certification: "Verified Bioinformatics Internship Certificate + GitHub pipeline portfolio."
  },
  // ───────── Tech Programmes ─────────
  {
    slug: "ai-intelligence",
    title: "AI Intelligence Programme",
    category: "Tech Programmes",
    Icon: BrainCircuit,
    blurb: "Foundations of modern AI: LLMs, agents, RAG and applied product thinking.",
    heroTagline: "Build AI products, not just notebooks.",
    tools: ["Python", "PyTorch", "LangChain", "OpenAI API", "Hugging Face", "Pinecone / pgvector"],
    jd: {
      topSkills: [
        "Python & numpy",
        "LLM prompting & evals",
        "RAG pipelines",
        "Agentic workflows",
        "Vector databases"
      ],
      hiringRoles: ["Junior AI Engineer", "AI Product Engineer", "Applied AI Intern"],
      salary: "₹6 – 14 LPA",
      demand: "Very High",
      sampleEmployers: ["Microsoft", "Razorpay", "Swiggy", "Indian AI startups", "Cognizant AI"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Python & data foundations",
        topics: ["Python core", "numpy/pandas", "Notebook discipline", "Git basics"],
        deliverable: "5 pandas exercises",
        jdSkill: "Strong Python foundations"
      },
      {
        weeks: "W3–4",
        title: "ML refresher for AI",
        topics: [
          "Supervised vs unsupervised",
          "Evaluation metrics",
          "Train/val/test",
          "Bias & variance"
        ],
        deliverable: "Mini classifier",
        jdSkill: "Core ML literacy"
      },
      {
        weeks: "W5–6",
        title: "LLMs & prompting",
        topics: ["Transformer intuition", "Prompt patterns", "Function calling", "Cost & latency"],
        deliverable: "Prompt-engineering report",
        jdSkill: "LLM API & prompting skill"
      },
      {
        weeks: "W7–8",
        title: "RAG pipelines",
        topics: [
          "Embeddings",
          "Vector DBs (pgvector/Pinecone)",
          "Chunking & retrieval",
          "Eval harness"
        ],
        deliverable: "RAG over a custom doc set",
        jdSkill: "End-to-end RAG implementation"
      },
      {
        weeks: "W9–10",
        title: "Agents & tools",
        topics: ["LangChain / LangGraph", "Tool use", "Memory & state", "Guardrails"],
        deliverable: "Agent that completes a real task",
        jdSkill: "Agentic system design"
      },
      {
        weeks: "W11–12",
        title: "Productionisation & capstone",
        topics: ["Deployment", "Observability", "Cost control", "Demo + interview prep"],
        deliverable: "Capstone AI product",
        jdSkill: "Ship a working AI product"
      }
    ],
    projects: {
      minor: [
        "RAG system over your own document corpus",
        "Prompt-engineering eval harness with measurable metrics"
      ],
      major: "End-to-end AI product (web app + API) with auth, RAG, and observability"
    },
    certification: "Verified Applied AI Internship Certificate + GitHub project portfolio."
  },
  {
    slug: "machine-learning",
    title: "Applied Machine Learning Programme",
    category: "Tech Programmes",
    Icon: Sparkles,
    blurb: "Classical ML through deep learning, with deployment and MLOps fundamentals.",
    heroTagline: "From scikit-learn to deployed models.",
    tools: ["Python", "scikit-learn", "PyTorch", "MLflow", "Docker", "AWS SageMaker"],
    jd: {
      topSkills: [
        "Feature engineering",
        "Model selection & tuning",
        "Deep learning basics",
        "MLOps (MLflow, Docker)",
        "Statistics"
      ],
      hiringRoles: ["ML Engineer Intern", "Junior Data Scientist", "MLOps Trainee"],
      salary: "₹6 – 12 LPA",
      demand: "Very High",
      sampleEmployers: ["Flipkart", "Myntra", "Razorpay", "Infosys", "TCS Research"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Stats & Python for ML",
        topics: ["Distributions", "Hypothesis testing", "Pandas pipelines", "Visualisation"],
        deliverable: "EDA report on a real dataset",
        jdSkill: "Working statistics + Python"
      },
      {
        weeks: "W3–4",
        title: "Classical ML",
        topics: ["Linear/logistic", "Trees & ensembles", "SVM, kNN", "Cross-validation"],
        deliverable: "Tabular ML benchmark",
        jdSkill: "scikit-learn proficiency"
      },
      {
        weeks: "W5–6",
        title: "Feature engineering & tuning",
        topics: ["Encoding & scaling", "Feature selection", "Bayesian/Optuna tuning", "Pipelines"],
        deliverable: "Optuna-tuned model report",
        jdSkill: "Feature engineering & tuning"
      },
      {
        weeks: "W7–8",
        title: "Deep learning",
        topics: ["PyTorch basics", "CNNs", "RNN/Transformers intro", "Transfer learning"],
        deliverable: "Image classifier with transfer learning",
        jdSkill: "DL with PyTorch"
      },
      {
        weeks: "W9–10",
        title: "MLOps fundamentals",
        topics: ["MLflow tracking", "Docker for ML", "Model registry", "Drift monitoring"],
        deliverable: "Tracked & containerised model",
        jdSkill: "MLOps pipeline awareness"
      },
      {
        weeks: "W11–12",
        title: "Capstone & deployment",
        topics: ["Cloud deploy (AWS/GCP)", "REST API", "Latency & cost", "Mock interview"],
        deliverable: "Deployed ML capstone",
        jdSkill: "Production ML deployment"
      }
    ],
    projects: {
      minor: [
        "Tabular benchmark with full feature-engineering report",
        "Image classifier fine-tuned on a custom dataset"
      ],
      major: "Deploy a model end-to-end with MLflow tracking, Docker, REST API and monitoring"
    },
    certification: "Verified Applied ML Internship Certificate + GitHub portfolio."
  },
  {
    slug: "full-stack",
    title: "Full Stack Mastery",
    category: "Tech Programmes",
    Icon: Layers,
    blurb: "TypeScript, React, Node and Postgres, ship real production-grade web apps.",
    heroTagline: "The exact stack hired-for in 2025 internships.",
    tools: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind",
      "Vercel"
    ],
    jd: {
      topSkills: ["TypeScript & React", "REST + auth", "Postgres / SQL", "Git / CI", "Testing"],
      hiringRoles: ["Frontend Intern", "Full-Stack Intern", "Junior Software Engineer"],
      salary: "₹5 – 12 LPA",
      demand: "Very High",
      sampleEmployers: ["Razorpay", "Zomato", "Swiggy", "Postman", "Atlan", "Indian SaaS startups"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Modern JS & TypeScript",
        topics: ["ES modules", "Async / promises", "TS types & generics", "Tooling"],
        deliverable: "TS utility library",
        jdSkill: "TypeScript fluency"
      },
      {
        weeks: "W3–4",
        title: "React fundamentals",
        topics: ["Hooks", "State patterns", "Forms", "Routing"],
        deliverable: "React mini-app",
        jdSkill: "React production patterns"
      },
      {
        weeks: "W5–6",
        title: "Backend with Node & Postgres",
        topics: ["Express / Hono", "REST design", "Postgres schema", "Prisma ORM"],
        deliverable: "REST API on Postgres",
        jdSkill: "Node + SQL"
      },
      {
        weeks: "W7–8",
        title: "Auth, payments & uploads",
        topics: ["JWT / OAuth", "Stripe / Razorpay", "File uploads", "Webhooks"],
        deliverable: "Auth + payments demo",
        jdSkill: "Auth & 3rd-party integrations"
      },
      {
        weeks: "W9–10",
        title: "Testing & CI/CD",
        topics: ["Vitest / Playwright", "GitHub Actions", "Preview deployments", "Observability"],
        deliverable: "Tested CI pipeline",
        jdSkill: "Testing & CI/CD discipline"
      },
      {
        weeks: "W11–12",
        title: "Capstone SaaS",
        topics: ["Product spec", "Architecture", "Performance", "Demo"],
        deliverable: "Capstone: deployed SaaS",
        jdSkill: "Ship a real full-stack product"
      }
    ],
    projects: {
      minor: ["TypeScript REST API with auth on Postgres", "React dashboard wired to your own API"],
      major: "Deployed multi-user SaaS (auth + payments + Postgres + CI) on Vercel/Render"
    },
    certification: "Verified Full-Stack Internship Certificate + GitHub portfolio."
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking & Security",
    category: "Tech Programmes",
    Icon: Shield,
    blurb: "Offensive security fundamentals, recon, exploitation, web app security and reporting.",
    heroTagline: "Built around the CEH and OWASP Top 10.",
    tools: ["Kali Linux", "Burp Suite", "Nmap", "Metasploit", "Wireshark", "Hydra", "OWASP ZAP"],
    jd: {
      topSkills: [
        "Network scanning",
        "Vulnerability assessment",
        "Web app pentesting (OWASP Top 10)",
        "Reporting",
        "Linux fundamentals"
      ],
      hiringRoles: ["Security Analyst Intern", "VAPT Trainee", "SOC Analyst (L1)"],
      salary: "₹4 – 10 LPA",
      demand: "Very High",
      sampleEmployers: ["Deloitte", "EY", "KPMG", "Indian cyber-sec startups", "TCS Cyber"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Linux, networking & lab setup",
        topics: ["Kali Linux", "TCP/IP refresher", "Lab with VMs", "Tooling"],
        deliverable: "Lab walkthrough",
        jdSkill: "Networking + Linux comfort"
      },
      {
        weeks: "W3–4",
        title: "Recon & scanning",
        topics: ["OSINT", "Nmap deep-dive", "Service enumeration", "Banner grabbing"],
        deliverable: "Recon report on a CTF box",
        jdSkill: "Recon and enumeration skill"
      },
      {
        weeks: "W5–6",
        title: "Exploitation basics",
        topics: [
          "Metasploit",
          "Password attacks (Hydra)",
          "Privilege escalation",
          "Post-exploitation"
        ],
        deliverable: "Compromise 3 lab boxes",
        jdSkill: "Exploitation lifecycle understanding"
      },
      {
        weeks: "W7–8",
        title: "Web application security",
        topics: ["OWASP Top 10", "Burp Suite", "SQLi / XSS / SSRF", "API testing"],
        deliverable: "Web pentest of intentional-vuln app",
        jdSkill: "OWASP Top 10 testing"
      },
      {
        weeks: "W9–10",
        title: "Reporting & frameworks",
        topics: ["CVSS scoring", "Pentest report writing", "MITRE ATT&CK", "Compliance overview"],
        deliverable: "Professional pentest report",
        jdSkill: "Client-grade reporting"
      },
      {
        weeks: "W11–12",
        title: "Capstone CTF + interview",
        topics: ["Multi-stage CTF", "Interview prep", "Certification roadmap"],
        deliverable: "Capstone CTF + write-up",
        jdSkill: "Demonstrable applied skill"
      }
    ],
    projects: {
      minor: [
        "Network pentest of a HackTheBox-style lab with full report",
        "Web app security audit of an OWASP Juice-Shop-style target"
      ],
      major: "Multi-stage CTF + professional pentest report (executive + technical)"
    },
    certification: "Verified Ethical Hacking Internship Certificate + CEH-readiness assessment."
  },
  {
    slug: "data-science",
    title: "Data Science",
    category: "Tech Programmes",
    Icon: ChartLine,
    blurb: "From SQL and statistics to dashboards, ML and storytelling with data.",
    heroTagline: "JD-mapped to what analytics & DS teams actually demand.",
    tools: ["Python", "SQL", "pandas", "scikit-learn", "Tableau / Power BI", "BigQuery"],
    jd: {
      topSkills: [
        "SQL",
        "Python + pandas",
        "Statistics",
        "Data visualisation",
        "ML basics",
        "Storytelling"
      ],
      hiringRoles: ["Data Analyst", "Junior Data Scientist", "Analytics Intern"],
      salary: "₹5 – 11 LPA",
      demand: "Very High",
      sampleEmployers: ["Flipkart", "Swiggy", "PhonePe", "Deloitte", "EY", "Indian SaaS"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "SQL deep-dive",
        topics: ["Joins, window functions", "CTEs", "Performance", "Real ad-hoc analysis"],
        deliverable: "10-question SQL set",
        jdSkill: "Strong SQL (windows + CTEs)"
      },
      {
        weeks: "W3–4",
        title: "Python for analytics",
        topics: ["pandas idioms", "Numpy", "Cleaning real datasets", "Notebook hygiene"],
        deliverable: "EDA notebook",
        jdSkill: "Python + pandas at production level"
      },
      {
        weeks: "W5–6",
        title: "Statistics & experimentation",
        topics: ["Hypothesis testing", "Confidence intervals", "A/B testing", "Sampling"],
        deliverable: "A/B test analysis report",
        jdSkill: "Applied statistics for product"
      },
      {
        weeks: "W7–8",
        title: "Visualisation & dashboards",
        topics: ["Tableau / Power BI", "Storyboarding", "Dashboard design", "Executive comms"],
        deliverable: "Stakeholder dashboard",
        jdSkill: "Tableau/Power BI delivery"
      },
      {
        weeks: "W9–10",
        title: "ML for analysts",
        topics: [
          "scikit-learn essentials",
          "Feature engineering",
          "Evaluation",
          "Communicating results"
        ],
        deliverable: "ML mini-project",
        jdSkill: "Practical ML literacy"
      },
      {
        weeks: "W11–12",
        title: "Capstone case",
        topics: ["Business framing", "End-to-end analysis", "Recommendation", "Mock interview"],
        deliverable: "Capstone analysis + deck",
        jdSkill: "Business-ready analyst output"
      }
    ],
    projects: {
      minor: [
        "A/B-test analysis on a real-world dataset",
        "Stakeholder-ready Tableau / Power BI dashboard"
      ],
      major: "End-to-end business case: SQL → Python → ML → dashboard → recommendation deck"
    },
    certification: "Verified Data Science Internship Certificate + portfolio."
  },
  {
    slug: "iot-lab",
    title: "Internet of Things Lab",
    category: "Tech Programmes",
    Icon: Cpu,
    blurb: "Build connected devices end-to-end, sensors, MCUs, MQTT and cloud dashboards.",
    heroTagline: "Hardware + software + cloud, in one project arc.",
    tools: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "Node-RED", "AWS IoT Core"],
    jd: {
      topSkills: [
        "Embedded C / MicroPython",
        "Sensor interfacing",
        "MQTT / HTTP",
        "Cloud IoT services",
        "Dashboarding"
      ],
      hiringRoles: ["IoT Engineer Intern", "Embedded Trainee", "Hardware-Software Integrator"],
      salary: "₹3.5 – 8 LPA",
      demand: "High",
      sampleEmployers: [
        "Bosch",
        "Honeywell",
        "Reliance Jio",
        "L&T Tech Services",
        "Indian IoT startups"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Embedded foundations",
        topics: ["MCU concepts", "Arduino IDE", "GPIO / ADC", "Power basics"],
        deliverable: "Sensor → LED demo",
        jdSkill: "Embedded basics"
      },
      {
        weeks: "W3–4",
        title: "ESP32 & connectivity",
        topics: ["Wi-Fi / BLE", "REST", "Deep sleep", "OTA basics"],
        deliverable: "Wi-Fi sensor node",
        jdSkill: "Networked MCU programming"
      },
      {
        weeks: "W5–6",
        title: "MQTT & messaging",
        topics: ["MQTT broker (Mosquitto)", "Topics & QoS", "Retained messages", "Security (TLS)"],
        deliverable: "End-to-end MQTT pipeline",
        jdSkill: "MQTT-based device comms"
      },
      {
        weeks: "W7–8",
        title: "Edge with Raspberry Pi",
        topics: ["Linux on Pi", "Python services", "Local processing", "Camera + edge ML"],
        deliverable: "Edge inference demo",
        jdSkill: "Edge + Linux integration"
      },
      {
        weeks: "W9–10",
        title: "Cloud IoT & dashboards",
        topics: [
          "AWS IoT Core / GCP IoT",
          "Rules engine",
          "Node-RED dashboards",
          "Time-series storage"
        ],
        deliverable: "Cloud-connected fleet demo",
        jdSkill: "Cloud IoT integration"
      },
      {
        weeks: "W11–12",
        title: "Capstone product",
        topics: ["Spec → device → dashboard", "Reliability", "Demo", "Interview prep"],
        deliverable: "Capstone IoT product",
        jdSkill: "Build-and-ship IoT product"
      }
    ],
    projects: {
      minor: [
        "ESP32-based environmental sensor publishing over MQTT",
        "Edge ML demo on Raspberry Pi"
      ],
      major: "End-to-end IoT product: device + cloud + dashboard + reliability metrics"
    },
    certification: "Verified IoT Internship Certificate + project hardware demo."
  },
  {
    slug: "cloud",
    title: "Mastering Cloud Technologies",
    category: "Tech Programmes",
    Icon: Cloud,
    blurb: "Hands-on AWS-first cloud, compute, storage, networking, IaC and security.",
    heroTagline: "AWS Cloud Practitioner + Solutions Architect track.",
    tools: [
      "AWS (EC2, S3, VPC, IAM, RDS, Lambda)",
      "Terraform",
      "CloudFormation",
      "Docker",
      "GitHub Actions"
    ],
    jd: {
      topSkills: [
        "Core AWS services",
        "IAM & security",
        "Networking (VPC)",
        "IaC (Terraform)",
        "CI/CD pipelines"
      ],
      hiringRoles: ["Cloud Engineer Intern", "DevOps Trainee", "Junior SRE"],
      salary: "₹5 – 12 LPA",
      demand: "Very High",
      sampleEmployers: ["AWS Partner network", "Infosys", "TCS", "Wipro", "Razorpay", "Cognizant"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Cloud fundamentals & AWS Core",
        topics: ["Cloud models", "AWS Global infra", "EC2 / S3 / IAM basics", "Cost & billing"],
        deliverable: "AWS account hardened + first EC2",
        jdSkill: "AWS Cloud Practitioner core"
      },
      {
        weeks: "W3–4",
        title: "Networking on AWS",
        topics: [
          "VPC, subnets, route tables",
          "Security groups & NACLs",
          "Load balancers",
          "Route53"
        ],
        deliverable: "Custom VPC with public + private",
        jdSkill: "AWS networking"
      },
      {
        weeks: "W5–6",
        title: "Storage & databases",
        topics: ["S3 deep-dive", "EBS vs EFS", "RDS / DynamoDB", "Backups"],
        deliverable: "Multi-AZ database demo",
        jdSkill: "Data services on AWS"
      },
      {
        weeks: "W7–8",
        title: "Serverless & containers",
        topics: ["Lambda + API GW", "ECS Fargate", "Docker basics", "Event-driven design"],
        deliverable: "Serverless API + container service",
        jdSkill: "Compute beyond EC2"
      },
      {
        weeks: "W9–10",
        title: "IaC + CI/CD",
        topics: [
          "Terraform basics",
          "Modules & state",
          "GitHub Actions deploys",
          "Secrets handling"
        ],
        deliverable: "Terraform deploys a stack",
        jdSkill: "IaC + CI/CD literacy"
      },
      {
        weeks: "W11–12",
        title: "Security & capstone",
        topics: [
          "IAM advanced",
          "Cloud security best practice",
          "Cost optimisation",
          "Architecture diagram"
        ],
        deliverable: "Capstone: 3-tier app on AWS",
        jdSkill: "Production-aware cloud build"
      }
    ],
    projects: {
      minor: [
        "Multi-AZ web app with VPC, ALB and RDS on AWS",
        "Terraform module that provisions a reusable stack"
      ],
      major: "3-tier production-style architecture on AWS with IaC + CI/CD"
    },
    certification: "Verified Cloud Internship Certificate + AWS CCP-readiness assessment."
  },
  {
    slug: "android-development",
    title: "Android Development Studio",
    category: "Tech Programmes",
    Icon: Smartphone,
    blurb: "Modern Android with Kotlin, Jetpack Compose and Firebase, ship a real Play-Store app.",
    heroTagline: "Kotlin + Compose, the way Google teaches it now.",
    tools: ["Kotlin", "Android Studio", "Jetpack Compose", "Room", "Retrofit", "Firebase"],
    jd: {
      topSkills: [
        "Kotlin",
        "Jetpack Compose",
        "Architecture (MVVM)",
        "Networking & local DB",
        "Play Store publishing"
      ],
      hiringRoles: ["Android Engineer Intern", "Mobile Developer Trainee"],
      salary: "₹4.5 – 10 LPA",
      demand: "High",
      sampleEmployers: ["Swiggy", "Zomato", "Razorpay", "Cred", "Indian consumer apps"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Kotlin essentials",
        topics: ["Syntax + null safety", "Coroutines", "Collections", "OOP idioms"],
        deliverable: "Kotlin katas",
        jdSkill: "Strong Kotlin foundation"
      },
      {
        weeks: "W3–4",
        title: "Jetpack Compose UI",
        topics: ["Composables", "State", "Navigation", "Theming"],
        deliverable: "Multi-screen Compose app",
        jdSkill: "Compose UI patterns"
      },
      {
        weeks: "W5–6",
        title: "Architecture & state",
        topics: ["MVVM", "ViewModel + Flow", "DI (Hilt)", "Repository pattern"],
        deliverable: "Refactor into MVVM",
        jdSkill: "Production app architecture"
      },
      {
        weeks: "W7–8",
        title: "Networking & local DB",
        topics: ["Retrofit + OkHttp", "Coroutine flows", "Room DB", "Caching"],
        deliverable: "Online + offline capable app",
        jdSkill: "Data layer skills"
      },
      {
        weeks: "W9–10",
        title: "Auth, Firebase & push",
        topics: ["Firebase Auth", "Firestore", "FCM push", "Crashlytics"],
        deliverable: "Auth + push demo",
        jdSkill: "Firebase integrations"
      },
      {
        weeks: "W11–12",
        title: "Publish & capstone",
        topics: ["Play Store policies", "Signing & release", "Beta testing", "Resume + interview"],
        deliverable: "Capstone app on Play Store (internal)",
        jdSkill: "Ship a real Android app"
      }
    ],
    projects: {
      minor: [
        "Compose-only single-screen consumer app",
        "Networked app with Room caching and offline mode"
      ],
      major: "Full-stack Android app published to Play Store internal track with auth + push"
    },
    certification: "Verified Android Internship Certificate + Play Store project link."
  },
  {
    slug: "embedded-systems",
    title: "EmbedX: Smart Systems Engineering",
    category: "Tech Programmes",
    Icon: CircuitBoard,
    blurb: "Embedded C, RTOS and bare-metal microcontrollers for smart-product engineering.",
    heroTagline: "The path into core embedded jobs at hardware companies.",
    tools: ["STM32 / ESP32", "Embedded C", "FreeRTOS", "I²C / SPI / UART", "KiCad basics"],
    jd: {
      topSkills: [
        "Embedded C",
        "Microcontroller peripherals",
        "RTOS basics",
        "Communication protocols",
        "Debugging with logic analyser"
      ],
      hiringRoles: ["Embedded Engineer Intern", "Firmware Trainee"],
      salary: "₹3.5 – 8 LPA",
      demand: "High",
      sampleEmployers: ["Bosch", "Continental", "Honeywell", "Tata Elxsi", "L&T Tech Services"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Embedded C & toolchain",
        topics: ["C deep-dive for embedded", "Memory model", "Toolchains", "Debugger basics"],
        deliverable: "Bare-metal blink + UART",
        jdSkill: "Embedded C fluency"
      },
      {
        weeks: "W3–4",
        title: "MCU peripherals",
        topics: ["GPIO, ADC, PWM", "Interrupts", "Timers", "Power modes"],
        deliverable: "Peripheral demo board",
        jdSkill: "Peripheral programming"
      },
      {
        weeks: "W5–6",
        title: "Communication protocols",
        topics: ["UART", "I²C", "SPI", "Logic analyser debugging"],
        deliverable: "Multi-sensor bus demo",
        jdSkill: "Protocol-level debugging"
      },
      {
        weeks: "W7–8",
        title: "RTOS basics",
        topics: ["FreeRTOS tasks", "Queues & semaphores", "Scheduling", "Resource locks"],
        deliverable: "RTOS-based 3-task app",
        jdSkill: "RTOS application skill"
      },
      {
        weeks: "W9–10",
        title: "Connectivity & robustness",
        topics: ["BLE / Wi-Fi modules", "Watchdogs", "OTA basics", "Field failure modes"],
        deliverable: "Connected RTOS app",
        jdSkill: "Production robustness mindset"
      },
      {
        weeks: "W11–12",
        title: "Capstone smart device",
        topics: ["Schematic basics in KiCad", "Integration", "Demo", "Interview prep"],
        deliverable: "Capstone smart device",
        jdSkill: "Ship an embedded product"
      }
    ],
    projects: {
      minor: [
        "Multi-sensor data acquisition via I²C/SPI with logic-analyser proof",
        "FreeRTOS app coordinating 3 concurrent tasks"
      ],
      major: "Connected smart device: RTOS + sensors + BLE/Wi-Fi + watchdog + demo"
    },
    certification: "Verified Embedded Systems Internship Certificate + hardware project demo."
  },
  {
    slug: "devops",
    title: "DevOps Engineering",
    category: "Tech Programmes",
    Icon: GitBranch,
    blurb: "CI/CD, containers, Kubernetes and observability, the modern DevOps toolchain.",
    heroTagline: "Land Junior DevOps / SRE roles at Indian SaaS companies.",
    tools: ["Linux", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Prometheus / Grafana"],
    jd: {
      topSkills: [
        "Linux & shell",
        "Docker",
        "Kubernetes basics",
        "CI/CD",
        "IaC",
        "Monitoring & alerting"
      ],
      hiringRoles: ["Junior DevOps Engineer", "SRE Intern", "Platform Engineer Trainee"],
      salary: "₹6 – 14 LPA",
      demand: "Very High",
      sampleEmployers: ["Razorpay", "Atlan", "Postman", "Indian SaaS", "Cognizant Cloud"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Linux & shell",
        topics: ["Filesystem, processes", "Bash scripting", "Networking tools", "SSH"],
        deliverable: "Bash automation script",
        jdSkill: "Linux & shell fluency"
      },
      {
        weeks: "W3–4",
        title: "Docker & containers",
        topics: ["Images & layers", "Compose", "Networking", "Best practice"],
        deliverable: "Multi-service Compose stack",
        jdSkill: "Docker production usage"
      },
      {
        weeks: "W5–6",
        title: "CI/CD with GitHub Actions",
        topics: ["Workflows", "Caching", "Secrets", "Matrix builds"],
        deliverable: "End-to-end pipeline",
        jdSkill: "CI/CD pipeline ownership"
      },
      {
        weeks: "W7–8",
        title: "Kubernetes essentials",
        topics: ["Pods, Deployments, Services", "Helm basics", "Ingress", "Scaling"],
        deliverable: "App on local k8s + Helm chart",
        jdSkill: "Kubernetes basics"
      },
      {
        weeks: "W9–10",
        title: "IaC + cloud",
        topics: ["Terraform on AWS/GCP", "State & modules", "Cost awareness", "Secrets mgmt"],
        deliverable: "Terraform-managed env",
        jdSkill: "Terraform & cloud IaC"
      },
      {
        weeks: "W11–12",
        title: "Observability + capstone",
        topics: ["Prometheus/Grafana", "Logs & traces", "On-call basics", "Postmortem culture"],
        deliverable: "Capstone: full pipeline + dashboard",
        jdSkill: "Production-grade observability"
      }
    ],
    projects: {
      minor: [
        "Containerised app with Compose + GitHub Actions CI/CD",
        "Helm-deployed app on local Kubernetes"
      ],
      major: "Production-style pipeline: GitHub → CI → Terraform → Kubernetes → Prometheus dashboard"
    },
    certification: "Verified DevOps Internship Certificate + GitHub portfolio."
  },
  // ───────── Commerce & Marketing ─────────
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Growth Hacking",
    category: "Commerce & Marketing",
    Icon: Megaphone,
    blurb: "Performance marketing, SEO, content and growth experiments, the full demand stack.",
    heroTagline: "Run real campaigns on a small live budget.",
    tools: [
      "Google Ads",
      "Meta Ads",
      "GA4",
      "Google Search Console",
      "SEMrush / Ahrefs",
      "Notion / HubSpot"
    ],
    jd: {
      topSkills: [
        "Performance marketing (Google + Meta)",
        "SEO",
        "GA4 analytics",
        "Funnel & conversion thinking",
        "Content + email"
      ],
      hiringRoles: ["Performance Marketing Intern", "SEO Executive", "Growth Analyst"],
      salary: "₹3 – 8 LPA",
      demand: "Very High",
      sampleEmployers: [
        "WebEngage",
        "Razorpay",
        "Indian D2C brands",
        "Schbang",
        "GroupM",
        "Performics"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Marketing fundamentals",
        topics: ["Funnels & ICP", "Channel mix", "Brand vs performance", "Metrics: CAC, LTV, ROAS"],
        deliverable: "Strategy doc for a chosen brand",
        jdSkill: "Marketing fundamentals"
      },
      {
        weeks: "W3–4",
        title: "SEO that ranks",
        topics: ["Keyword research", "On-page SEO", "Technical SEO basics", "Link building"],
        deliverable: "SEO audit + content brief",
        jdSkill: "Practical SEO"
      },
      {
        weeks: "W5–6",
        title: "Google Ads",
        topics: ["Search & PMax", "Bidding & quality score", "Conversion tracking", "Budgeting"],
        deliverable: "Live Google Ads campaign",
        jdSkill: "Google Ads execution"
      },
      {
        weeks: "W7–8",
        title: "Meta Ads & creatives",
        topics: ["Campaign / ad set / ad", "Audiences", "Creative testing", "Pixel & CAPI"],
        deliverable: "Live Meta Ads campaign",
        jdSkill: "Meta Ads execution"
      },
      {
        weeks: "W9–10",
        title: "Analytics & CRO",
        topics: ["GA4 events", "Looker Studio", "Funnel analysis", "Landing-page CRO"],
        deliverable: "GA4 + Looker dashboard",
        jdSkill: "GA4 + analytics"
      },
      {
        weeks: "W11–12",
        title: "Growth hacking + capstone",
        topics: ["Lifecycle email", "Referral loops", "Experiments", "Reporting"],
        deliverable: "Capstone: full growth report",
        jdSkill: "End-to-end growth ownership"
      }
    ],
    projects: {
      minor: [
        "SEO audit + content brief for a real brand",
        "Live Google + Meta ad campaign with reporting"
      ],
      major: "End-to-end growth report for a real brand: SEO + paid + analytics + experiments"
    },
    certification: "Verified Digital Marketing Internship Certificate + live-campaign portfolio."
  },
  {
    slug: "business-analytics",
    title: "Business Analytics & Intelligence",
    category: "Commerce & Marketing",
    Icon: ChartColumn,
    blurb: "Turn business questions into data answers using SQL, Excel, Power BI and statistics.",
    heroTagline: "Built for the BA / consulting interview funnel.",
    tools: [
      "Excel (advanced)",
      "SQL",
      "Power BI / Tableau",
      "Python (pandas)",
      "PowerPoint storytelling"
    ],
    jd: {
      topSkills: [
        "Excel modelling",
        "SQL",
        "Visualisation (PBI/Tableau)",
        "Business framing",
        "Storytelling with data"
      ],
      hiringRoles: ["Business Analyst Intern", "Strategy Analyst", "BI Developer"],
      salary: "₹4.5 – 10 LPA",
      demand: "Very High",
      sampleEmployers: [
        "Deloitte",
        "EY",
        "KPMG",
        "Accenture Strategy",
        "ZS Associates",
        "Mu Sigma"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Excel modelling",
        topics: [
          "Lookups, dynamic arrays",
          "Pivot tables",
          "Financial modelling basics",
          "Sensitivity"
        ],
        deliverable: "Mini financial model",
        jdSkill: "Advanced Excel"
      },
      {
        weeks: "W3–4",
        title: "SQL for analysts",
        topics: ["Joins & aggregates", "Window functions", "CTEs", "Performance"],
        deliverable: "Analyst SQL portfolio",
        jdSkill: "SQL for BI"
      },
      {
        weeks: "W5–6",
        title: "Power BI / Tableau",
        topics: ["Semantic models", "DAX / calculated fields", "Dashboard design", "Publishing"],
        deliverable: "Executive dashboard",
        jdSkill: "BI dashboarding"
      },
      {
        weeks: "W7–8",
        title: "Statistics for business",
        topics: ["Distributions", "Hypothesis testing", "Forecasting basics", "A/B testing"],
        deliverable: "Forecast report",
        jdSkill: "Applied statistics"
      },
      {
        weeks: "W9–10",
        title: "Python for analysts",
        topics: ["pandas", "Joining datasets", "Cleaning", "Visualisation"],
        deliverable: "Cleaned + analysed dataset",
        jdSkill: "Python literacy"
      },
      {
        weeks: "W11–12",
        title: "Case-study capstone",
        topics: ["Business framing", "Hypothesis tree", "Recommendation", "Storyboard deck"],
        deliverable: "Capstone case + deck",
        jdSkill: "Consulting-style problem solving"
      }
    ],
    projects: {
      minor: [
        "Executive Power BI / Tableau dashboard with live drill-downs",
        "SQL + Excel forecast for a sample P&L"
      ],
      major: "Consulting-style capstone case: framing → analysis → recommendation deck"
    },
    certification: "Verified Business Analytics Internship Certificate + portfolio."
  },
  {
    slug: "finance",
    title: "Applied Finance & Investment Strategy",
    category: "Commerce & Marketing",
    Icon: Wallet,
    blurb: "Financial modelling, valuation and investment analysis, the analyst skill set.",
    heroTagline: "Modelled on entry-level IB / equity-research JDs.",
    tools: ["Excel", "PowerPoint", "Bloomberg basics", "Tijori / Screener", "Python (optional)"],
    jd: {
      topSkills: [
        "Three-statement modelling",
        "Valuation (DCF, comps)",
        "Industry analysis",
        "Pitch decks",
        "Excel mastery"
      ],
      hiringRoles: [
        "Investment Banking Analyst Intern",
        "Equity Research Trainee",
        "Finance Analyst"
      ],
      salary: "₹5 – 14 LPA",
      demand: "High",
      sampleEmployers: [
        "JPMorgan",
        "Goldman Sachs ops",
        "Nomura",
        "Motilal Oswal",
        "Indian PE/VC funds"
      ]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "Accounting & finance refresher",
        topics: ["3 statements", "Ratios", "Working capital", "Cash flow"],
        deliverable: "Ratio analysis on a real company",
        jdSkill: "Solid accounting fundamentals"
      },
      {
        weeks: "W3–4",
        title: "Excel for finance",
        topics: ["Modelling discipline", "Scenarios", "Sensitivity", "Best practices"],
        deliverable: "Reusable model template",
        jdSkill: "Banker-grade Excel"
      },
      {
        weeks: "W5–6",
        title: "Three-statement modelling",
        topics: ["Revenue build", "Cost stack", "Linked statements", "Sanity checks"],
        deliverable: "Working 3-statement model",
        jdSkill: "Modelling proficiency"
      },
      {
        weeks: "W7–8",
        title: "Valuation",
        topics: ["DCF", "Trading & transaction comps", "Football field", "WACC"],
        deliverable: "Valuation report on a company",
        jdSkill: "Valuation toolkit"
      },
      {
        weeks: "W9–10",
        title: "Industry & investment analysis",
        topics: ["Industry frameworks", "Channel checks", "Investment thesis", "Risks"],
        deliverable: "Industry deep-dive",
        jdSkill: "Equity research analysis"
      },
      {
        weeks: "W11–12",
        title: "Pitch deck + capstone",
        topics: ["Pitchbook structure", "Storyline & visuals", "Mock interview"],
        deliverable: "Capstone: pitch + model",
        jdSkill: "Banker-style deliverable"
      }
    ],
    projects: {
      minor: [
        "Three-statement model + DCF for a listed Indian company",
        "Industry deep-dive note (10 pages)"
      ],
      major: "Full pitch deck + supporting model + valuation for a real-world target"
    },
    certification: "Verified Finance Internship Certificate + portfolio of models and decks."
  },
  {
    slug: "human-resources",
    title: "Human Resource Management & Talent Management",
    category: "Commerce & Marketing",
    Icon: Users,
    blurb: "Modern HR, sourcing, talent ops, comp & benefits, HR analytics and culture.",
    heroTagline: "From sourcing to HRBP foundations.",
    tools: ["LinkedIn Recruiter", "Naukri RMS", "Greenhouse / Lever", "Excel", "Power BI for HR"],
    jd: {
      topSkills: [
        "Talent acquisition",
        "Employee lifecycle",
        "Comp & benefits basics",
        "HR analytics",
        "Compliance"
      ],
      hiringRoles: ["HR Intern", "Talent Acquisition Trainee", "HR Operations Associate"],
      salary: "₹3 – 7 LPA",
      demand: "Steady",
      sampleEmployers: ["Infosys", "TCS", "Indian SaaS", "ANSR", "Recruitment consultancies"]
    },
    syllabus: [
      {
        weeks: "W1–2",
        title: "HR foundations & lifecycle",
        topics: [
          "Hire-to-retire lifecycle",
          "HR roles (TA, HRBP, Ops)",
          "Indian labour basics",
          "HRMS overview"
        ],
        deliverable: "Lifecycle process map",
        jdSkill: "HR fundamentals"
      },
      {
        weeks: "W3–4",
        title: "Talent acquisition",
        topics: ["JD writing", "Boolean sourcing", "LinkedIn / Naukri", "Interview kit"],
        deliverable: "Sourcing + screening exercise",
        jdSkill: "TA skill set"
      },
      {
        weeks: "W5–6",
        title: "Onboarding & engagement",
        topics: ["Onboarding journeys", "Engagement surveys", "Recognition", "Retention drivers"],
        deliverable: "Onboarding plan for a real role",
        jdSkill: "Employee experience design"
      },
      {
        weeks: "W7–8",
        title: "Comp & benefits",
        topics: [
          "Salary structures (CTC)",
          "Benefits design",
          "Statutory (PF/ESI/Gratuity)",
          "Benchmarking"
        ],
        deliverable: "CTC + benefit design exercise",
        jdSkill: "C&B literacy"
      },
      {
        weeks: "W9–10",
        title: "HR analytics",
        topics: ["Excel for HR", "Power BI HR dashboard", "Attrition analytics", "Funnel metrics"],
        deliverable: "HR dashboard",
        jdSkill: "Data-led HR"
      },
      {
        weeks: "W11–12",
        title: "Capstone & interview prep",
        topics: ["End-to-end TA cycle", "Stakeholder mgmt", "Mock interview", "Resume polishing"],
        deliverable: "Capstone: end-to-end TA case",
        jdSkill: "Interview-ready HR practitioner"
      }
    ],
    projects: {
      minor: [
        "Sourcing + shortlisting drive for a real role with Boolean strings",
        "HR Power BI dashboard with attrition + funnel"
      ],
      major: "End-to-end talent acquisition case: JD → sourcing → interview kit → offer → onboarding plan"
    },
    certification: "Verified HR Internship Certificate + portfolio of TA + analytics work."
  }
];
const COURSES_BY_SLUG = Object.fromEntries(
  COURSES.map((c) => [c.slug, c])
);
const CATEGORIES$1 = [
  "Pharmacy & Life Sciences",
  "Tech Programmes",
  "Commerce & Marketing"
];
const CITIES = [
  {
    slug: "bengaluru",
    name: "Bengaluru",
    matchKeys: ["Bengaluru", "Bangalore"],
    hiringDensity: "Very High",
    hubFor: ["Pharmacovigilance", "Clinical Data Management", "AI in Healthcare"],
    costOfLivingNote: "Highest CoL among PV hubs. Single-room PG in Marathahalli/Bellandur ₹12–18k. Compensates with the densest hiring market.",
    liveNote: "MNC CRO HQ city. Best for IQVIA, Parexel, ICON, Labcorp inside the same metro."
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    matchKeys: ["Hyderabad"],
    hiringDensity: "Very High",
    hubFor: ["Pharmacovigilance", "Regulatory Affairs", "Medical Coding"],
    costOfLivingNote: "Lowest CoL among Tier-1 PV hubs. PG in Gachibowli/Madhapur ₹8–12k. Highest savings rate for freshers.",
    liveNote: "India's PV capital. Genome Valley + ICON Hyderabad campus drive most fresher hiring."
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    matchKeys: ["Mumbai"],
    hiringDensity: "High",
    hubFor: ["Regulatory Affairs", "Pharmacovigilance"],
    costOfLivingNote: "Highest CoL nationally. Powai/Andheri PG ₹15–25k. Domestic pharma HQ city — pay premiums offset rent.",
    liveNote: "Sun, Cipla, Lupin, Glenmark HQ city. Best for Indian-pharma RA roles."
  },
  {
    slug: "pune",
    name: "Pune",
    matchKeys: ["Pune"],
    hiringDensity: "High",
    hubFor: ["Clinical Data Management", "Pharmacovigilance"],
    costOfLivingNote: "Mid CoL. PG in Hinjewadi/Kharadi ₹10–14k. Tier-1 lifestyle without Mumbai rent.",
    liveNote: "Cytel, Syneos, Veeva Pune campuses anchor CDM + biostats hiring."
  },
  {
    slug: "chennai",
    name: "Chennai",
    matchKeys: ["Chennai"],
    hiringDensity: "Very High",
    hubFor: ["Medical Coding", "Pharmacovigilance"],
    costOfLivingNote: "Low–mid CoL. PG in OMR/Velachery ₹8–12k. Best CoL-to-pay ratio in coding.",
    liveNote: "India's medical-coding capital. Omega, Access, AGS Health hire 2,000+ freshers/yr each."
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    matchKeys: ["NCR", "Delhi", "Gurgaon", "Noida"],
    hiringDensity: "High",
    hubFor: ["Regulatory Affairs", "Medical Coding"],
    costOfLivingNote: "Mid–high CoL. PG in Gurgaon/Noida ₹10–16k. Better for experienced shifts than freshers.",
    liveNote: "Optum Gurgaon + Cognizant Noida anchor coding + RCM. Pharma is split with Mumbai."
  }
];
const CITIES_BY_SLUG = Object.fromEntries(
  CITIES.map((c) => [c.slug, c])
);
function findPayBand(bands, city) {
  for (const k of city.matchKeys) {
    const hit = bands.find((b) => b.city.toLowerCase() === k.toLowerCase());
    if (hit) return hit;
  }
  return void 0;
}
const ROLES = [
  {
    slug: "pharmacovigilance",
    name: "Pharmacovigilance",
    shortName: "PV",
    tagline: "The drug-safety job that India quietly runs for the world.",
    whatIsIt: "PV is how the pharma world catches side-effects after a drug is on the market. Your day looks like this: a hospital nurse in Germany files an adverse-event form, it lands in your safety database (Argus, ARISg), you read it, you code the symptoms in MedDRA, you classify seriousness, and you file an ICSR to the regulator inside the legal clock (24 hours for fatal, 15 days for serious). Repeat 8-12 cases a day.",
    whyHiring: "Every drug that reaches a patient must be monitored for life. India runs PV for ~70% of global pharma because regulators accept work done from India and labour cost is 1/5th of the US. Demand is structural, not cyclical.",
    who: "B.Pharm, M.Pharm, Pharm.D, B.Sc Life Sciences, BDS, BAMS, BHMS, BPT. MBBS welcome. Strong written English non-negotiable.",
    demand: "Very High",
    aiRisk: "augmented",
    aiNote: "AI now drafts the ICSR narrative and pre-codes MedDRA terms. What stays human: medical judgement on causality, seriousness assessment, regulator submission, and PV audit. The job moves up the value chain, it does not vanish.",
    englishNeeded: "Strong written",
    workMode: "Hybrid",
    industrySize: "India PV services market: ~$1.4B in 2025, projected $2.6B by 2029 (NASSCOM/IQVIA).",
    hiringRoles: [
      "Drug Safety Associate (L1)",
      "ICSR Processor",
      "Aggregate Report Writer (PSUR/PBRER)",
      "Signal Detection Analyst",
      "PV Quality Reviewer",
      "PV Audit Specialist"
    ],
    skills: [
      "Argus Safety",
      "ARISg",
      "Veeva Vault Safety",
      "MedDRA",
      "WHO-DD",
      "ICH E2B(R3)",
      "CIOMS I",
      "GVP modules"
    ],
    certs: [
      { name: "MedDRA proficiency (MSSO)", pays: "+₹40-60k at offer" },
      { name: "ISoP / DIA PV certificate", pays: "Promotion to QC at Y2" },
      { name: "Argus / ARISg system cert", pays: "+₹50k or shifts to L2" }
    ],
    pay: [
      {
        city: "Hyderabad",
        fresher: [3.5, 5.5],
        midY3: [5.5, 8.5],
        seniorY5: [8, 13],
        leadY8: [14, 22]
      },
      {
        city: "Bengaluru",
        fresher: [3.8, 6.2],
        midY3: [6, 9.5],
        seniorY5: [9, 15],
        leadY8: [16, 26]
      },
      { city: "Mumbai", fresher: [3.6, 6], midY3: [6, 9], seniorY5: [9, 14], leadY8: [15, 24] },
      {
        city: "Chennai",
        fresher: [3.4, 5.5],
        midY3: [5.5, 8.2],
        seniorY5: [8, 12],
        leadY8: [13, 20]
      },
      { city: "Pune", fresher: [3.5, 5.8], midY3: [5.8, 9], seniorY5: [9, 13], leadY8: [14, 22] },
      {
        city: "NCR",
        fresher: [3.5, 5.8],
        midY3: [5.8, 8.8],
        seniorY5: [8.5, 13],
        leadY8: [14, 22]
      },
      { city: "Kochi", fresher: [3.2, 5], midY3: [5, 7.5], seniorY5: [7.5, 11], leadY8: [12, 18] },
      {
        city: "Remote",
        fresher: [3.5, 5.5],
        midY3: [5.5, 8],
        seniorY5: [8, 12],
        leadY8: [13, 20],
        note: "Remote roles concentrate at MNC CROs (IQVIA, ICON, Labcorp)."
      }
    ],
    ladder: [
      {
        yrs: "Y0",
        role: "Drug Safety Associate (L1)",
        payInr: "₹3.5 – 6 LPA",
        unlocks: "PV training + 100 case-processing reps in any tool"
      },
      {
        yrs: "Y2",
        role: "Senior DSA / QC Reviewer",
        payInr: "₹6 – 9 LPA",
        unlocks: "QC certification + 1 system tool (Argus or ARISg)"
      },
      {
        yrs: "Y5",
        role: "Aggregate Report Writer / Team Lead",
        payInr: "₹9 – 14 LPA",
        unlocks: "PSUR/PBRER ownership, regulator submissions"
      },
      {
        yrs: "Y8+",
        role: "PV Manager / Signal Lead",
        payInr: "₹15 – 26 LPA",
        unlocks: "Audit, signal detection, EU-QPPV adjacency"
      }
    ],
    abroad: [
      {
        country: "UAE",
        flag: "🇦🇪",
        payInrEquiv: "₹15 – 28 LPA equivalent",
        eligibility: "B.Pharm + DHA pharmacist licence (PharmaExam) + 1 yr PV",
        note: "Hospitals + pharma branches; tax-free."
      },
      {
        country: "Saudi Arabia",
        flag: "🇸🇦",
        payInrEquiv: "₹14 – 24 LPA equivalent",
        eligibility: "SCFHS pharmacist licence + 2 yr exp",
        note: "PV at SFDA-regulated affiliates."
      },
      {
        country: "Singapore",
        flag: "🇸🇬",
        payInrEquiv: "₹22 – 38 LPA equivalent",
        eligibility: "B.Pharm + 3 yr PV + EP pass",
        note: "APAC PV hubs (Novartis, MSD)."
      },
      {
        country: "Ireland",
        flag: "🇮🇪",
        payInrEquiv: "₹35 – 55 LPA equivalent",
        eligibility: "M.Pharm + EU work permit (Critical Skills)",
        note: "EU-QPPV pipeline; high bar."
      },
      {
        country: "USA",
        flag: "🇺🇸",
        payInrEquiv: "Indian salaries are bid against US offshoring; not a direct hiring route",
        eligibility: "H1B sponsorship rare for L1 PV",
        note: "US firms hire IN India to keep costs low."
      }
    ],
    topEmployers: [
      "IQVIA",
      "Parexel",
      "Syneos Health",
      "ICON plc",
      "Labcorp Drug Development",
      "PPD (Thermo Fisher)",
      "Eversana",
      "Indegene",
      "TCS Life Sciences",
      "Cognizant Life Sciences",
      "Accenture Health & Life Sciences",
      "Dr. Reddy's",
      "Sun Pharma",
      "Cipla",
      "Novartis",
      "Sanofi",
      "Aurobindo Pharma"
    ],
    faqs: [
      {
        q: "Can a fresher get a PV job without a course?",
        a: "Sometimes, at Tier-3 BPOs at ₹2.4-3 LPA. With a structured PV course (Argus + MedDRA + 50 cases on resume), L1 offers come from MNC CROs at ₹3.8-6 LPA. The course pays for itself in 4 months."
      },
      {
        q: "Is PV being killed by AI?",
        a: "No. AI drafts the narrative and pre-codes terms, but the medical judgement, regulator submission, and audit work cannot be automated under current GVP rules. The job shifts up; entry-level L1 work shrinks ~20% over 3 yrs, mid-level QC work grows."
      },
      {
        q: "Night shifts?",
        a: "PV is global. Most L1 roles are India-day shift (8am-6pm IST). Some MNCs run a US shift (6pm-3am IST) at +25% pay."
      },
      {
        q: "Best city to start?",
        a: "Hyderabad and Bengaluru carry ~60% of India PV hiring. Pune and Mumbai trail. Tier-2 cities (Vizag, Kochi) are picking up via remote MNC roles."
      },
      {
        q: "Can non-pharmacy graduates do PV?",
        a: "Yes: B.Sc Life Sciences, BDS, BAMS, BHMS, BPT and MBBS are all hireable at L1. The decisive filter is written English, not the degree."
      }
    ],
    arzonCourseSlug: "pharmacovigilance",
    sources: ["naukri_pv", "iqvia_2025", "nasscom_bpm", "internal_jd"],
    asOf: "Nov 2025"
  },
  {
    slug: "medical-coding",
    name: "Medical Coding",
    shortName: "Coding",
    tagline: "The highest-volume healthcare hire in India. 80,000 openings/yr.",
    whatIsIt: "A US doctor sees a patient and writes a clinical note. You read that note and translate every diagnosis to ICD-10-CM, every procedure to CPT, every drug to HCPCS. Insurance pays the hospital based on your codes. Mis-code by one digit and the claim gets denied. India runs 60% of US RCM coding because labour is cheap and English is good.",
    whyHiring: "US healthcare keeps growing, the number of US coders is shrinking, and US hospitals offshore aggressively. NASSCOM puts India healthcare BPM at $7-8B with coding the largest sub-segment.",
    who: "Any life-sciences graduate (B.Pharm, B.Sc Nursing, BPT, BHMS, BDS, B.Sc Life Sciences). Anatomy + medical terminology background helps. Commerce graduates can do AR/denials but not coding.",
    demand: "Very High",
    aiRisk: "augmented",
    aiNote: "AI suggests codes but the human coder still signs off. Auto-coding has been promised for 15 years; payer audits still require human attestation. Where AI does bite: very simple specialties (radiology read-only). Surgery, IP, E/M coding remain human-led.",
    englishNeeded: "Conversational",
    workMode: "WFH common",
    industrySize: "India healthcare BPM: ~$7-8B in 2025, coding ~45% of that (NASSCOM 2025).",
    hiringRoles: [
      "Medical Coder (E/M, IP, OP, Surgery, Radiology)",
      "Coding QA Auditor",
      "AR Caller / Denial Analyst",
      "Charge Entry Specialist",
      "RCM Operations Lead",
      "CDI Specialist (Clinical Documentation Improvement)"
    ],
    skills: [
      "ICD-10-CM",
      "CPT",
      "HCPCS",
      "DRG / APC",
      "3M Encoder",
      "EncoderPro",
      "EPIC chart navigation",
      "HIPAA basics"
    ],
    certs: [
      {
        name: "AAPC CPC (Certified Professional Coder)",
        pays: "+₹70k-1.2L at offer; required by most MNCs after Y1"
      },
      { name: "AHIMA CCS", pays: "+₹1L; opens IP coding (highest pay band)" },
      {
        name: "Specialty cert (CIRCC, CASCC, CRC)",
        pays: "+₹50k each; gates surgery/cardio bands"
      }
    ],
    pay: [
      {
        city: "Chennai",
        fresher: [2.8, 4.2],
        midY3: [4, 6.5],
        seniorY5: [6.5, 10],
        leadY8: [11, 18],
        note: "Highest-density coding city in India."
      },
      {
        city: "Hyderabad",
        fresher: [3, 4.5],
        midY3: [4.5, 7],
        seniorY5: [7, 11],
        leadY8: [12, 19]
      },
      {
        city: "Bengaluru",
        fresher: [3, 4.8],
        midY3: [4.8, 7.5],
        seniorY5: [7.5, 12],
        leadY8: [13, 20]
      },
      { city: "Mumbai", fresher: [3, 4.5], midY3: [4.5, 6.8], seniorY5: [7, 11], leadY8: [12, 18] },
      { city: "Coimbatore", fresher: [2.6, 4], midY3: [4, 6], seniorY5: [6, 9], leadY8: [10, 15] },
      {
        city: "Trichy",
        fresher: [2.4, 3.8],
        midY3: [3.8, 5.5],
        seniorY5: [5.5, 8.5],
        leadY8: [9, 14]
      },
      { city: "Noida", fresher: [2.8, 4.5], midY3: [4.5, 7], seniorY5: [7, 11], leadY8: [12, 18] },
      {
        city: "Remote",
        fresher: [2.8, 4.5],
        midY3: [4.5, 7],
        seniorY5: [7, 11],
        leadY8: [12, 18],
        note: "Most major BPOs allow WFH after probation."
      }
    ],
    ladder: [
      {
        yrs: "Y0",
        role: "Trainee Coder",
        payInr: "₹2.6 – 4 LPA",
        unlocks: "Onboarding training + 30-day shadow on E/M or OP"
      },
      {
        yrs: "Y2",
        role: "Coder L2 (CPC certified)",
        payInr: "₹4.5 – 7 LPA",
        unlocks: "AAPC CPC + 95% accuracy on production"
      },
      {
        yrs: "Y5",
        role: "QA Auditor / Specialty Coder",
        payInr: "₹7 – 12 LPA",
        unlocks: "Specialty cert + audit responsibility"
      },
      {
        yrs: "Y8+",
        role: "Coding Lead / RCM Manager",
        payInr: "₹13 – 20 LPA",
        unlocks: "Team management + payer-side compliance"
      }
    ],
    abroad: [
      {
        country: "UAE",
        flag: "🇦🇪",
        payInrEquiv: "₹12 – 22 LPA equivalent",
        eligibility: "CPC + 3 yr exp + DHA Health Information licence",
        note: "Hospital coders at JCI-accredited groups."
      },
      {
        country: "Philippines",
        flag: "🇵🇭",
        payInrEquiv: "Competing market, not a hiring route",
        eligibility: "—",
        note: "PH coders compete with India for US contracts; pricing pressure stays."
      },
      {
        country: "USA",
        flag: "🇺🇸",
        payInrEquiv: "₹35 – 70 LPA equivalent",
        eligibility: "Green card / H1B + AAPC CPC + 5 yr exp",
        note: "US hires for QA + auditor roles; entry coding stays offshore."
      }
    ],
    topEmployers: [
      "Optum (UnitedHealth)",
      "R1 RCM",
      "Omega Healthcare",
      "Access Healthcare",
      "AGS Health",
      "Sutherland Healthcare",
      "Wipro HPS",
      "Infosys BPM",
      "GeBBS Healthcare",
      "Cognizant Life Sciences",
      "Accenture Health & Life Sciences",
      "Tech Mahindra Healthcare"
    ],
    faqs: [
      {
        q: "Do I need CPC before applying?",
        a: "No for trainee roles, yes by Y1. Most BPOs sponsor your CPC attempt after probation; passing it gets you the L2 hike."
      },
      {
        q: "WFH or office?",
        a: "Most coders work hybrid (3 days office) post-probation. Senior coders (Y3+) at MNC accounts often get fully WFH."
      },
      {
        q: "Is night shift mandatory?",
        a: "No. Coding is async (you read charts, not call patients). AR caller roles are night shift; coding is mostly India-day."
      },
      {
        q: "How does pay compare to PV?",
        a: "Coding starts ~₹0.5-1 LPA below PV at L1, but with CPC the Y3 band is comparable. Specialty coders (surgery, IP) match or beat PV by Y5."
      },
      {
        q: "Career ceiling?",
        a: "Senior auditor / RCM lead at ₹15-22 LPA in India; ₹35-50 LPA equivalent if you shift to US payer-side compliance."
      }
    ],
    arzonCourseSlug: "medical-coding",
    sources: ["ambitionbox_coding", "nasscom_bpm", "internal_jd"],
    asOf: "Nov 2025"
  },
  {
    slug: "clinical-data-management",
    name: "Clinical Data Management",
    shortName: "CDM",
    tagline: "The data backbone of every clinical trial. Pays better than PV.",
    whatIsIt: "A pharma company runs a Phase-3 trial in 200 hospitals across 30 countries. Each hospital enters patient data into an EDC system (Medidata Rave, Veeva CDMS, Oracle InForm). You design the form, write the edit checks, query the bad data, lock the database when the trial ends, and hand a clean dataset to biostatistics. Without CDM, the trial cannot file with FDA.",
    whyHiring: "Trial volume keeps growing (2,000+ Phase-3 trials globally per year). India runs CDM for 65% of MNC pharma trials because labour cost is 1/4 and FDA accepts the work.",
    who: "B.Pharm, M.Pharm, B.Sc Life Sciences, B.Tech Biotech. Tech-leaning candidates do well (CDM is half-data, half-coding).",
    demand: "High",
    aiRisk: "audit",
    aiNote: "AI cleans data faster but FDA submissions require human-attested audit trails on every edit. The job shifts toward AI-output review and risk-based monitoring. CDM is one of the safer roles because regulator rules favour human accountability.",
    englishNeeded: "Strong written",
    workMode: "Hybrid",
    industrySize: "Global EDC + CDM market: ~$2.5B in 2025, India captures ~40% of execution work (IQVIA Institute).",
    hiringRoles: [
      "Clinical Data Associate (L1)",
      "Clinical Data Coordinator",
      "EDC Build Programmer",
      "Data Validation Specialist",
      "Database Lock Lead",
      "Veeva Vault CDMS Administrator"
    ],
    skills: [
      "Medidata Rave",
      "Veeva Vault CDMS",
      "Oracle InForm / Clinical One",
      "SQL basics",
      "CDISC SDTM",
      "ICH E6(R2) GCP",
      "21 CFR Part 11"
    ],
    certs: [
      {
        name: "SCDM CCDM (Certified Clinical Data Manager)",
        pays: "Required for L3+ promotion; +₹1.5L typically"
      },
      { name: "Medidata Rave Study Builder cert", pays: "+₹80k-1.2L; gates EDC build roles" },
      {
        name: "Veeva Vault CDMS Administrator",
        pays: "+₹1L-1.5L; high demand at Veeva-shop pharma"
      }
    ],
    pay: [
      {
        city: "Bengaluru",
        fresher: [4.5, 7],
        midY3: [7, 11],
        seniorY5: [11, 17],
        leadY8: [18, 28]
      },
      {
        city: "Hyderabad",
        fresher: [4.2, 6.8],
        midY3: [6.8, 10.5],
        seniorY5: [10, 16],
        leadY8: [17, 26]
      },
      { city: "Mumbai", fresher: [4, 6.5], midY3: [6.5, 10], seniorY5: [10, 15], leadY8: [16, 24] },
      {
        city: "Chennai",
        fresher: [4, 6.2],
        midY3: [6.2, 9.5],
        seniorY5: [9.5, 14],
        leadY8: [15, 22]
      },
      { city: "Pune", fresher: [4.2, 6.5], midY3: [6.5, 10], seniorY5: [10, 15], leadY8: [16, 24] },
      { city: "NCR", fresher: [4, 6.5], midY3: [6.5, 10], seniorY5: [10, 15], leadY8: [16, 24] },
      {
        city: "Remote",
        fresher: [4, 6.5],
        midY3: [6.5, 10],
        seniorY5: [10, 15],
        leadY8: [16, 24],
        note: "Veeva, IQVIA, Medidata run remote-first CDM teams."
      }
    ],
    ladder: [
      {
        yrs: "Y0",
        role: "Clinical Data Associate (L1)",
        payInr: "₹4.5 – 7 LPA",
        unlocks: "On-the-job EDC training (typically Rave or Veeva)"
      },
      {
        yrs: "Y2",
        role: "Clinical Data Coordinator",
        payInr: "₹7 – 11 LPA",
        unlocks: "Owns 2-3 trials end-to-end + first cert"
      },
      {
        yrs: "Y5",
        role: "Lead CDA / EDC Build Lead",
        payInr: "₹11 – 17 LPA",
        unlocks: "SCDM CCDM + database lock ownership"
      },
      {
        yrs: "Y8+",
        role: "CDM Manager / Programme Lead",
        payInr: "₹18 – 28 LPA",
        unlocks: "Multi-trial portfolio + sponsor liaison"
      }
    ],
    abroad: [
      {
        country: "Singapore",
        flag: "🇸🇬",
        payInrEquiv: "₹28 – 50 LPA equivalent",
        eligibility: "M.Pharm/M.Sc + 4 yr CDM + EP pass",
        note: "APAC CDM hubs (Novartis, Pfizer)."
      },
      {
        country: "Ireland",
        flag: "🇮🇪",
        payInrEquiv: "₹35 – 60 LPA equivalent",
        eligibility: "Critical Skills Permit + 5 yr exp",
        note: "Lead CDA roles at MNC pharma EU HQ."
      },
      {
        country: "USA",
        flag: "🇺🇸",
        payInrEquiv: "₹50 – 90 LPA equivalent",
        eligibility: "H1B + 5 yr exp + SCDM CCDM",
        note: "Most US CDM hiring goes to senior roles; entry stays offshore."
      },
      {
        country: "UK",
        flag: "🇬🇧",
        payInrEquiv: "₹35 – 60 LPA equivalent",
        eligibility: "Skilled Worker visa + 4 yr CDM",
        note: "Strong CRO presence (Parexel, ICON UK)."
      }
    ],
    topEmployers: [
      "IQVIA",
      "Parexel",
      "ICON plc",
      "Labcorp Drug Development",
      "Fortrea",
      "PPD (Thermo Fisher)",
      "Veeva Systems",
      "Medidata (Dassault)",
      "Oracle Health Sciences",
      "TCS Life Sciences",
      "Cognizant Life Sciences",
      "Indegene",
      "Novartis"
    ],
    faqs: [
      {
        q: "Coding background needed?",
        a: "Helpful, not required. SQL basics + Excel power-user is enough at L1. EDC build roles do need scripting."
      },
      {
        q: "Why does CDM pay more than PV?",
        a: "Smaller talent pool (more tech-leaning), higher cost of training each new hire (system access, GCP cert), and FDA exposure on database lock raises the floor."
      },
      {
        q: "Veeva or Medidata: which to learn first?",
        a: "Medidata Rave still owns ~55% of trials, Veeva is gaining fast (~25%). Learn Rave first; Veeva is easier to pick up second."
      },
      {
        q: "Travel to sponsor sites?",
        a: "Rare at L1-L3. Lead CDA roles see sponsor visits (1-2/quarter, mostly virtual now)."
      },
      {
        q: "Can a B.Sc Life Sciences fresher get in?",
        a: "Yes. CDM hiring is more about analytical aptitude than degree title. M.Pharm helps for EDC build, B.Sc is fine for L1 review."
      }
    ],
    arzonCourseSlug: "clinical-data-management",
    sources: ["glassdoor_cdm", "iqvia_2025", "internal_jd"],
    asOf: "Nov 2025"
  },
  {
    slug: "regulatory-affairs",
    name: "Regulatory Affairs",
    shortName: "RA",
    tagline: "The job that decides whether a drug or device is allowed to be sold.",
    whatIsIt: "A pharma company finishes Phase-3 and wants to sell the drug. You compile the dossier — chemistry, manufacturing, controls, preclinical, clinical, labelling — into the eCTD format, file it on CDSCO SUGAM (India), FDA ESG (US) or EMA CESP (EU), and own every back-and-forth with the regulator until approval. Same job for medical devices under MDR/IVDR. One missed module, one wrong label claim, and the launch slips by a year.",
    whyHiring: "India is the world's largest generics exporter and a fast-growing devices market. Every export filing, every label change, every post-approval variation needs an RA owner. India also runs RA ops for ~55% of MNC pharma global filings (Freyr alone ships 10,000+ submissions/yr).",
    who: "B.Pharm, M.Pharm (Reg. Affairs preferred), Pharm.D, M.Sc Life Sciences. Devices RA also takes B.Tech Biomedical. Strong written English non-negotiable — you draft for regulators.",
    demand: "Very High",
    aiRisk: "augmented",
    aiNote: "AI now drafts CTD modules, summarises deficiency letters, and cross-checks labelling. What stays human: regulator strategy (which market first, what variation route), signing off submissions, and audit defence. RA pay is rising because senior strategic work is what compounds.",
    englishNeeded: "Strong written",
    workMode: "Hybrid",
    industrySize: "Global RA outsourcing market: ~$8B in 2025, India captures ~40% of execution work (NASSCOM + IQVIA).",
    hiringRoles: [
      "RA Associate (L1) — dossier compilation",
      "RA Executive — CMC / labelling",
      "RA Publisher (eCTD)",
      "Regulatory Strategist",
      "RA Manager (Devices / Drugs)",
      "Global RA Lead"
    ],
    skills: [
      "eCTD",
      "Veeva Vault RIM",
      "ICH M4 / Q / S / E",
      "CDSCO SUGAM",
      "FDA ESG",
      "EMA CESP",
      "MDR / IVDR (devices)",
      "21 CFR Part 11",
      "GMP basics"
    ],
    certs: [
      {
        name: "RAC (Regulatory Affairs Certification, RAPS)",
        pays: "+₹1.5–2L at offer; near-mandatory for senior RA in MNCs"
      },
      {
        name: "TOPRA MSc Regulatory Affairs",
        pays: "Promotion to Strategist by Y4; UK/EU mobility"
      },
      { name: "Veeva Vault RIM Administrator", pays: "+₹1L; gates publishing-team roles" }
    ],
    pay: [
      {
        city: "Hyderabad",
        fresher: [3.8, 6.2],
        midY3: [6.5, 10],
        seniorY5: [11, 17],
        leadY8: [20, 32]
      },
      {
        city: "Bengaluru",
        fresher: [4, 6.5],
        midY3: [7, 11],
        seniorY5: [12, 18],
        leadY8: [22, 35]
      },
      { city: "Mumbai", fresher: [4, 6.5], midY3: [7, 10.5], seniorY5: [11, 17], leadY8: [20, 32] },
      {
        city: "Ahmedabad",
        fresher: [3.5, 5.8],
        midY3: [6, 9],
        seniorY5: [9.5, 14],
        leadY8: [16, 26],
        note: "Generics RA hub (Zydus, Torrent, Intas)."
      },
      { city: "Chennai", fresher: [3.5, 5.8], midY3: [6, 9], seniorY5: [9, 14], leadY8: [16, 26] },
      { city: "Pune", fresher: [3.8, 6], midY3: [6.5, 10], seniorY5: [10, 15], leadY8: [18, 28] },
      { city: "NCR", fresher: [3.8, 6.2], midY3: [6.5, 10], seniorY5: [10, 16], leadY8: [18, 30] },
      {
        city: "Remote",
        fresher: [3.8, 6],
        midY3: [6.5, 10],
        seniorY5: [10, 15],
        leadY8: [18, 28],
        note: "Freyr, ProPharma, Navitas run remote-first RA pods."
      }
    ],
    ladder: [
      {
        yrs: "Y0",
        role: "RA Associate (L1)",
        payInr: "₹3.8 – 6.5 LPA",
        unlocks: "Trained on eCTD + first 5 module-3 sections"
      },
      {
        yrs: "Y2",
        role: "RA Executive (CMC or Labelling)",
        payInr: "₹6.5 – 11 LPA",
        unlocks: "Owns 1 product end-to-end + Veeva Vault RIM cert"
      },
      {
        yrs: "Y5",
        role: "RA Manager / Strategist",
        payInr: "₹12 – 18 LPA",
        unlocks: "RAC + first regulator meeting representation"
      },
      {
        yrs: "Y8+",
        role: "Global RA Lead / RA Head",
        payInr: "₹22 – 35 LPA",
        unlocks: "Multi-market portfolio + audit + board reporting"
      }
    ],
    abroad: [
      {
        country: "UAE",
        flag: "🇦🇪",
        payInrEquiv: "₹18 – 32 LPA equivalent",
        eligibility: "B.Pharm + MoHAP / DHA RA registration + 2 yr exp",
        note: "MoHAP RA hires for both branded and generic dossiers."
      },
      {
        country: "Saudi Arabia",
        flag: "🇸🇦",
        payInrEquiv: "₹16 – 28 LPA equivalent",
        eligibility: "SFDA familiarity + 3 yr exp",
        note: "SFDA hires India RA for generics + biosimilars."
      },
      {
        country: "Singapore",
        flag: "🇸🇬",
        payInrEquiv: "₹28 – 48 LPA equivalent",
        eligibility: "M.Pharm RA + 4 yr exp + EP pass",
        note: "APAC HQ RA at Novartis, Pfizer, J&J."
      },
      {
        country: "UK",
        flag: "🇬🇧",
        payInrEquiv: "₹32 – 55 LPA equivalent",
        eligibility: "TOPRA MSc + Skilled Worker visa",
        note: "MHRA + EMA dual filings; very strong RA market."
      },
      {
        country: "Ireland",
        flag: "🇮🇪",
        payInrEquiv: "₹38 – 65 LPA equivalent",
        eligibility: "Critical Skills Permit + 5 yr exp + RAC",
        note: "EU RA HQ for most US pharma; premium pay."
      }
    ],
    topEmployers: [
      "Freyr Solutions",
      "ProPharma Group",
      "Navitas Life Sciences",
      "IQVIA",
      "Parexel",
      "Dr. Reddy's",
      "Sun Pharma",
      "Cipla",
      "Lupin",
      "Aurobindo Pharma",
      "Biocon",
      "Glenmark",
      "Zydus Lifesciences",
      "Novartis",
      "Sanofi"
    ],
    faqs: [
      {
        q: "RA vs PV — which pays better long-term?",
        a: "RA. PV starts ₹0.3-0.5 LPA higher at L1, but RA overtakes by Y3 and at Y8+ RA pays 30-50% more (₹22-35 vs ₹15-26). Reason: RA owns market access; PV is monitoring."
      },
      {
        q: "CDSCO vs USFDA filings — which to learn first?",
        a: "USFDA. India RA hiring is dominated by US-bound generics (ANDA filings). CDSCO knowledge is layered on later. EU/EMA is the third skill."
      },
      {
        q: "Does RAC certification really pay?",
        a: "Yes. RAC adds ₹1.5-2L immediately at offer in MNCs and is near-mandatory for the Manager step (Y5). It also unlocks UAE/UK/EU roles."
      },
      {
        q: "Devices RA or Drugs RA — different careers?",
        a: "Yes. Devices RA (under MDR/IVDR + ISO 13485) pays slightly higher and the talent pool is smaller. Drugs RA has 10x more openings. Pick devices if you have B.Tech Biomedical or device industry exposure."
      },
      {
        q: "Can a fresher get an RA job without M.Pharm?",
        a: "Yes — B.Pharm + a structured RA course (eCTD + ICH + 1 mock dossier) lands L1 offers at Freyr, Navitas, ProPharma at ₹3.8-6 LPA. M.Pharm RA mainly speeds Y3 promotion."
      },
      {
        q: "Is RA a good abroad route?",
        a: "One of the best in healthcare. UK, Ireland, UAE and Singapore all run structural RA shortages. RAC + 4 yrs exp + visa is the formula."
      }
    ],
    arzonCourseSlug: "regulatory-affairs",
    sources: ["naukri_ra", "cdsco_sugam", "ich_m4", "iqvia_2025", "internal_jd"],
    asOf: "Nov 2025"
  },
  {
    slug: "ai-in-healthcare",
    name: "AI in Healthcare",
    shortName: "AI Health",
    tagline: "The role healthcare companies are creating fastest in 2025-26.",
    whatIsIt: "A hospital wants its doctors to dictate notes and have AI generate the chart. A pharma company wants AI to draft the ICSR narrative. A coding firm wants AI to auto-suggest ICD-10 codes. You sit between the clinical workflow and the model: you write the prompts, build the RAG over medical guidelines, evaluate model output against a clinician's gold standard, and own the safety case (FDA AI/ML guidance, EU AI Act Annex III, IEC 62304 for SaMD). It's not pure ML engineering — it's clinical AI productisation.",
    whyHiring: "Every PV firm, coding BPO, EHR vendor and hospital chain is running an AI pilot in 2025-26. NASSCOM estimates AI-in-Health will create 80,000+ specialised roles in India by 2028. Demand is growing 35-40% YoY versus 8-10% for general PV/coding.",
    who: "Two valid entry routes. (1) Healthcare graduate (B.Pharm, B.Sc Life Sciences, nursing, coders) + 3-month Python + prompt-eng + medical NLP bootcamp. (2) CS/IT grad + a healthcare domain bootcamp. Pure clinicians without any tech upskilling will struggle.",
    demand: "Very High",
    aiRisk: "resistant",
    aiNote: "This IS the AI side. The risk here is the opposite — being too generalist. Specialise early in one of: clinical NLP, RAG on medical literature, SaMD safety, or coding/PV automation QA. Generalist 'AI engineer' resumes get filtered out for healthcare-specific ones.",
    englishNeeded: "Strong written",
    workMode: "Hybrid",
    industrySize: "India AI-in-Health market: ~$1.6B in 2025, projected $11B by 2030 (NASSCOM 2025).",
    hiringRoles: [
      "Clinical AI Associate / Annotator",
      "Medical Prompt Engineer",
      "Clinical NLP Engineer",
      "AI Safety Reviewer (SaMD)",
      "Healthcare RAG Engineer",
      "AI Product Manager (Health)"
    ],
    skills: [
      "Python",
      "Prompt engineering",
      "RAG / vector DBs",
      "LangChain / LlamaIndex",
      "FHIR / HL7",
      "Clinical NLP (cTAKES, MedSpaCy)",
      "MedLM / Med-PaLM eval",
      "FDA AI/ML guidance",
      "EU AI Act Annex III",
      "IEC 62304 (SaMD)"
    ],
    certs: [
      {
        name: "Coursera AI for Medicine (Andrew Ng)",
        pays: "+₹1L at offer; the recognised entry credential"
      },
      {
        name: "Google Cloud Healthcare API certification",
        pays: "+₹1.5L; gates GCP-shop pharma roles"
      },
      { name: "AWS HealthLake / HCLS Specialty", pays: "+₹1.2L at AWS-aligned firms" },
      {
        name: "AAPC AI for Coding Specialist",
        pays: "Internal coding-firm fast-track to AI QA team"
      }
    ],
    pay: [
      {
        city: "Bengaluru",
        fresher: [6, 11],
        midY3: [11, 18],
        seniorY5: [18, 30],
        leadY8: [32, 60]
      },
      {
        city: "Hyderabad",
        fresher: [5.5, 10],
        midY3: [10, 16],
        seniorY5: [17, 28],
        leadY8: [30, 55]
      },
      { city: "Pune", fresher: [5.5, 10], midY3: [10, 16], seniorY5: [16, 26], leadY8: [28, 50] },
      { city: "NCR", fresher: [5.5, 10], midY3: [10, 16], seniorY5: [16, 26], leadY8: [28, 50] },
      { city: "Mumbai", fresher: [5, 9], midY3: [9, 15], seniorY5: [15, 24], leadY8: [26, 45] },
      { city: "Chennai", fresher: [5, 9], midY3: [9, 14], seniorY5: [14, 22], leadY8: [25, 42] },
      {
        city: "Remote",
        fresher: [6, 11],
        midY3: [11, 18],
        seniorY5: [18, 30],
        leadY8: [32, 60],
        note: "Suki, Abridge, Nuance hire India-remote at near-MNC bands."
      }
    ],
    ladder: [
      {
        yrs: "Y0",
        role: "Clinical AI Associate / Annotator",
        payInr: "₹5.5 – 10 LPA",
        unlocks: "Python + prompt-eng + 1 healthcare bootcamp"
      },
      {
        yrs: "Y2",
        role: "Medical Prompt Engineer / NLP Reviewer",
        payInr: "₹10 – 18 LPA",
        unlocks: "RAG project on resume + 1 cloud cert"
      },
      {
        yrs: "Y5",
        role: "Clinical NLP Lead / AI Safety Reviewer",
        payInr: "₹18 – 30 LPA",
        unlocks: "Owns 1 SaMD or production model + safety case"
      },
      {
        yrs: "Y8+",
        role: "AI Product Manager (Health) / SaMD Lead",
        payInr: "₹32 – 60 LPA",
        unlocks: "Cross-function: clinical, regulatory, engineering, product"
      }
    ],
    abroad: [
      {
        country: "USA",
        flag: "🇺🇸",
        payInrEquiv: "₹70 – 140 LPA equivalent",
        eligibility: "H1B / O-1 + 5 yr clinical AI exp + portfolio",
        note: "Highest-paying market; bar is high but Indian clinical-NLP talent is sought."
      },
      {
        country: "Singapore",
        flag: "🇸🇬",
        payInrEquiv: "₹40 – 70 LPA equivalent",
        eligibility: "M.Sc / M.Pharm + 3 yr exp + EP pass",
        note: "APAC AI-in-Health hubs (NUH, A*STAR, Holmusk)."
      },
      {
        country: "UK",
        flag: "🇬🇧",
        payInrEquiv: "₹35 – 65 LPA equivalent",
        eligibility: "Skilled Worker + 3 yr clinical AI",
        note: "NHS AI Lab + private health-tech (Babylon, Cera)."
      },
      {
        country: "UAE",
        flag: "🇦🇪",
        payInrEquiv: "₹28 – 50 LPA equivalent",
        eligibility: "3 yr exp + Golden Visa eligible",
        note: "Cleveland Clinic Abu Dhabi, M42, G42 Healthcare."
      },
      {
        country: "Ireland",
        flag: "🇮🇪",
        payInrEquiv: "₹40 – 70 LPA equivalent",
        eligibility: "Critical Skills Permit + 4 yr exp",
        note: "EU pharma AI HQs (Pfizer, AbbVie, J&J)."
      }
    ],
    topEmployers: [
      "Google Health (Alphabet)",
      "Nuance / Microsoft DAX",
      "Suki AI",
      "Abridge",
      "Innovaccer",
      "HealthEM.AI",
      "Apollo 24/7",
      "Practo",
      "ZS Associates",
      "IQVIA",
      "TCS Life Sciences",
      "Cognizant Life Sciences",
      "Indegene"
    ],
    faqs: [
      {
        q: "Do I need to be a hardcore coder?",
        a: "No. The bar is Python at intermediate level + prompt engineering + one cloud platform. The differentiator is healthcare domain depth (clinical workflows, FHIR, regulator rules), not LeetCode. Pure ML engineers without domain context lose to clinical-AI hybrids."
      },
      {
        q: "Is this just hype that will fade?",
        a: "No. FDA has approved 1,000+ AI/ML medical devices and the EU AI Act now requires human oversight roles. The job is regulated into existence. What might fade: generic 'AI consultant' titles. What stays: clinical-NLP engineer, AI safety reviewer, RAG ops on medical content."
      },
      {
        q: "How does pay compare to PV / coding?",
        a: "30-60% premium at every level. AI-Health fresher ₹6-11 LPA vs PV ₹3.5-6. By Y5: AI-Health ₹18-30 LPA vs PV ₹8-13. The gap reflects scarcity, not stability — both are stable jobs."
      },
      {
        q: "What's the right bootcamp path?",
        a: "3 months: Python + APIs + LangChain + RAG → 1 month: prompt engineering on medical text → 1 month: FHIR + medical terminology refresher → portfolio: 1 RAG-on-guidelines project + 1 model-eval write-up. That gets L1 offers."
      },
      {
        q: "Will AI eat coding/PV jobs and feed AI-Health jobs?",
        a: "Partially. ~20% of L1 PV/coding work shifts to AI over 3 yrs. The PV/coding industry is growing fast enough that net hiring stays positive — but the AI-Health side grows 4x faster. If you're starting in 2026, AI-Health is the higher-beta bet."
      },
      {
        q: "Abroad route — which country first?",
        a: "USA pays best but H1B is brutal. UK/Singapore are realistic at Y3+ with the right cert stack. UAE (M42, G42 Healthcare, Cleveland Clinic Abu Dhabi) is the fastest visa route — Golden Visa eligible from Y3."
      },
      {
        q: "Are freshers welcome or only mid-career switchers?",
        a: "Both. Innovaccer, Apollo 24/7, Practo and the BPO AI-QA arms (Optum AI, AGS AI) all run fresher pipelines. The hard filter is portfolio, not experience — one real RAG/prompt project on GitHub matters more than years on a CV."
      }
    ],
    arzonCourseSlug: "ai-intelligence",
    sources: ["naukri_ai_health", "nasscom_ai_health", "fda_ai_ml", "iqvia_2025", "internal_jd"],
    asOf: "Nov 2025"
  },
  {
    slug: "clinical-research",
    name: "Clinical Research",
    shortName: "CRA/CTM",
    tagline: "The job that runs the trial that gets the drug approved.",
    whatIsIt: "A pharma company designs a Phase-2 or Phase-3 trial. You are the operational owner: you qualify investigator sites, train hospital staff on the protocol, monitor source documents against the CRF (SDV), audit informed consent, raise deviation reports, and own the site relationship until database lock. As you grow, you stop visiting sites and start running the whole study (CTM / Project Manager). The trial cannot run without you.",
    whyHiring: "India is now the second-largest patient pool for global trials after the US, and the new clinical-trial rules (NDCT 2019 + DCGI fast-track) have re-opened MNC sponsor activity. Every CRO is expanding India operations. ~12,000 active CRA/CRC openings on Naukri at any given time.",
    who: "B.Pharm, M.Pharm, Pharm.D, B.Sc Nursing, MBBS, BDS, BAMS, BHMS, BPT, M.Sc Life Sciences. Travel-readiness is the decisive non-degree filter for CRA roles. CRC roles are site-based (no travel).",
    demand: "Very High",
    aiRisk: "augmented",
    aiNote: "Risk-based monitoring + remote SDV are eating ~30% of on-site CRA travel. AI now flags protocol deviations from EDC data automatically. What stays human: site relationships, investigator training, audit defence, IRB/EC interaction, and deviation root-cause. The role moves from data-checker to risk-manager.",
    englishNeeded: "Strong verbal + written",
    workMode: "Hybrid",
    industrySize: "Global clinical trials services market: ~$60B in 2025; India captures ~$3.5B of execution work and is growing 14% YoY (IQVIA Institute 2025).",
    hiringRoles: [
      "Clinical Research Coordinator (CRC) — site-based",
      "Clinical Research Associate (CRA L1)",
      "Senior CRA / Lead CRA",
      "Clinical Trial Manager (CTM)",
      "Site Activation Specialist",
      "Clinical Project Manager"
    ],
    skills: [
      "ICH E6(R3) GCP",
      "Schedule Y / NDCT 2019",
      "21 CFR Part 50/54/56/312",
      "Medidata Rave (CRA view)",
      "Veeva Vault CTMS",
      "Florence eBinders / eISF",
      "Risk-Based Monitoring (RBM)",
      "SDV / SDR",
      "EC/IRB submissions"
    ],
    certs: [
      {
        name: "ACRP CCRA / CCRC",
        pays: "+₹1.5–2L at offer; near-mandatory for MNC CRO promotion to Sr CRA"
      },
      { name: "SoCRA CCRP", pays: "+₹1L; favoured by US-aligned sponsors" },
      {
        name: "GCP refresher (TransCelerate-recognised)",
        pays: "Annual requirement; gates billable monitoring days"
      }
    ],
    pay: [
      {
        city: "Bengaluru",
        fresher: [4, 6.5],
        midY3: [7, 11],
        seniorY5: [12, 18],
        leadY8: [20, 32]
      },
      {
        city: "Hyderabad",
        fresher: [3.8, 6.2],
        midY3: [6.5, 10.5],
        seniorY5: [11, 17],
        leadY8: [18, 30]
      },
      { city: "Mumbai", fresher: [4, 6.5], midY3: [7, 11], seniorY5: [12, 18], leadY8: [20, 32] },
      {
        city: "Chennai",
        fresher: [3.8, 6],
        midY3: [6.5, 10],
        seniorY5: [10.5, 16],
        leadY8: [17, 28]
      },
      { city: "Pune", fresher: [3.8, 6], midY3: [6.5, 10], seniorY5: [10.5, 16], leadY8: [17, 28] },
      {
        city: "NCR",
        fresher: [4, 6.5],
        midY3: [6.8, 10.5],
        seniorY5: [11, 17],
        leadY8: [18, 30],
        note: "AIIMS + Medanta + Fortis trial sites; strong CRC market."
      },
      {
        city: "Ahmedabad",
        fresher: [3.5, 5.8],
        midY3: [6, 9.5],
        seniorY5: [10, 15],
        leadY8: [16, 26],
        note: "Zydus + Intas in-house clinical ops."
      },
      {
        city: "Remote",
        fresher: [4, 6.5],
        midY3: [6.5, 10.5],
        seniorY5: [11, 17],
        leadY8: [18, 30],
        note: "Remote = office-based monitoring (RBM/CRA-in-house) at IQVIA, Parexel, ICON. Field CRA always travels."
      }
    ],
    ladder: [
      {
        yrs: "Y0",
        role: "Clinical Research Coordinator (site)",
        payInr: "₹3.5 – 6 LPA",
        unlocks: "GCP cert + 1 year of site-level CRF + EC submission reps"
      },
      {
        yrs: "Y2",
        role: "CRA L1 (in-house) → Field CRA",
        payInr: "₹6.5 – 11 LPA",
        unlocks: "First independent monitoring visit + ACRP CCRA prep"
      },
      {
        yrs: "Y5",
        role: "Senior / Lead CRA",
        payInr: "₹12 – 18 LPA",
        unlocks: "ACRP CCRA + multi-site oversight + co-monitor reviews"
      },
      {
        yrs: "Y8+",
        role: "Clinical Trial Manager / Project Manager",
        payInr: "₹20 – 32 LPA",
        unlocks: "Owns end-to-end study budget, timelines and sponsor relationship"
      }
    ],
    abroad: [
      {
        country: "UAE",
        flag: "🇦🇪",
        payInrEquiv: "₹18 – 32 LPA equivalent",
        eligibility: "B.Pharm + 2 yr CRA + DHA/MoHAP licence",
        note: "Cleveland Clinic Abu Dhabi, M42, Mediclinic — small but premium."
      },
      {
        country: "Singapore",
        flag: "🇸🇬",
        payInrEquiv: "₹28 – 48 LPA equivalent",
        eligibility: "M.Pharm + 4 yr CRA + EP pass",
        note: "APAC trial-ops hubs (Novartis, Roche, MSD)."
      },
      {
        country: "UK",
        flag: "🇬🇧",
        payInrEquiv: "₹32 – 55 LPA equivalent",
        eligibility: "Skilled Worker visa + 4 yr CRA",
        note: "MHRA-regulated trials; strong CRO presence."
      },
      {
        country: "Ireland",
        flag: "🇮🇪",
        payInrEquiv: "₹38 – 65 LPA equivalent",
        eligibility: "Critical Skills Permit + 5 yr exp + ACRP",
        note: "EU clinical-ops HQ for most US pharma."
      },
      {
        country: "Australia",
        flag: "🇦🇺",
        payInrEquiv: "₹35 – 60 LPA equivalent",
        eligibility: "TSS 482 visa + 4 yr CRA + ICH-GCP",
        note: "Strong oncology trial market; ARCS-recognised training."
      }
    ],
    topEmployers: [
      "IQVIA",
      "Parexel",
      "ICON plc",
      "Labcorp Drug Development",
      "PPD (Thermo Fisher)",
      "Fortrea",
      "Syneos Health",
      "Novotech",
      "Veeda Clinical Research",
      "JSS Medical Research",
      "Apollo Hospitals (CRO arm)",
      "Tata 1mg Trials",
      "Sun Pharma",
      "Cipla",
      "Dr. Reddy's",
      "Novartis",
      "Sanofi"
    ],
    faqs: [
      {
        q: "CRC vs CRA — which to start with?",
        a: "CRC if you want hospital-based, no-travel work and have a nursing/pharmacy background tied to a city. CRA if you can travel 12-15 days/month and want the higher pay band by Y3. CRA pay overtakes CRC by ₹2-3 LPA from Y2 onwards."
      },
      {
        q: "Is CRA travel really that much?",
        a: "Field CRA: 10-15 monitoring days/month at sponsor sites across India. In-house CRA (RBM): 0 travel, slightly lower pay. Most MNC CROs now offer the in-house option, which is what makes the role accessible to women returners and parents."
      },
      {
        q: "Do I need ACRP/SoCRA certification?",
        a: "Not for L1, yes by Y3 in MNC CROs. ACRP CCRA is the global standard and adds ₹1.5-2L at promotion; without it, the Senior CRA step often gets blocked."
      },
      {
        q: "Can a fresher get CRA without going through CRC first?",
        a: "Rare in India. The standard path is CRC (1-2 yr) → in-house CRA (1 yr) → field CRA. A few MNCs (IQVIA, Parexel) hire M.Pharm freshers directly into in-house CRA at ₹5-7 LPA via structured graduate programmes."
      },
      {
        q: "Are clinical trials in India safe long-term, given regulatory history?",
        a: "Yes, post-2019. NDCT 2019 + Schedule Y reforms restored MNC sponsor confidence; trial registrations on CTRI are at all-time highs. The 2013-2018 slowdown is behind the industry."
      },
      {
        q: "Best abroad route for CRAs?",
        a: "UK and Ireland — both run structural CRA shortages and accept Indian ACRP-certified CRAs at Y4+. UAE is the fastest visa but the market is smaller. USA H1B for CRAs is rare; the role tends to stay onshore."
      }
    ],
    arzonCourseSlug: "clinical-research",
    sources: ["naukri_clinical_research", "ctri_2025", "iqvia_2025", "ich_e6r3", "internal_jd"],
    asOf: "Nov 2025"
  },
  {
    slug: "medical-writing",
    name: "Medical Writing",
    shortName: "MW",
    tagline: "The job that turns clinical data into the document the regulator reads.",
    whatIsIt: "A trial finishes and produces 8,000 pages of raw data. You write the documents that synthesise it: the Clinical Study Report (CSR, ICH E3), the Investigator's Brochure, the patient narratives, the Common Technical Document (CTD) summaries, the Periodic Safety Update Report (PSUR/PBRER), and — on the publications side — the journal manuscripts and conference posters. Two career tracks live under the same name: regulatory medical writing (RMW) for filings, and medical communications (MedComms) for journals + KOL slide decks.",
    whyHiring: "Every trial needs writers, every approved drug needs PSURs forever, and every pharma launch needs publications + KOL training material. India runs ~50% of MNC pharma's regulatory writing offshore (NASSCOM 2025) and the MedComms agency market in India has tripled since 2020.",
    who: "B.Pharm, M.Pharm, Pharm.D, M.Sc Life Sciences, MBBS, BDS, BAMS, BHMS, MD/MS. Strong written English is the entire job — non-negotiable. Publication writing also values prior journal authorship.",
    demand: "High",
    aiRisk: "augmented",
    aiNote: "AI now drafts patient narratives, CTD section 2 summaries, and first-pass manuscript outlines. What stays human: medical interpretation, sponsor-style adherence, regulator audit defence, and the senior-author voice in publications. RMW is more AI-assisted than MedComms; both compress the L1 pyramid but expand senior-writer demand.",
    englishNeeded: "Strong written",
    workMode: "WFH common",
    industrySize: "Global medical writing market: ~$5.5B in 2025, projected $9B by 2029; India captures ~30% of offshore execution (Grand View + NASSCOM).",
    hiringRoles: [
      "Medical Writer L1 (RMW)",
      "Medical Writer (MedComms / Publications)",
      "Senior Medical Writer (CSR / PSUR)",
      "Scientific Communications Lead",
      "Principal Medical Writer / Lead",
      "Medical Editor / QC Reviewer"
    ],
    skills: [
      "ICH E3 (CSR)",
      "ICH M4 (CTD)",
      "PSUR / PBRER (GVP Module VII)",
      "AMA Manual of Style",
      "GPP3 (Good Publication Practice)",
      "EndNote / Reference Manager",
      "Veeva Vault PromoMats",
      "MS Word advanced + track-changes",
      "Plain-language summaries (EU CTR)"
    ],
    certs: [
      {
        name: "AMWA Essential Skills certificate",
        pays: "+₹80k-1.2L at offer; the recognised entry credential"
      },
      { name: "EMWA Foundation / Advanced", pays: "+₹1L; favoured by EU-aligned pharma and CROs" },
      { name: "ISMPP CMPP (publications)", pays: "+₹1.2L; gates senior MedComms roles" }
    ],
    pay: [
      {
        city: "Bengaluru",
        fresher: [4, 6.5],
        midY3: [7, 11],
        seniorY5: [12, 19],
        leadY8: [22, 36]
      },
      {
        city: "Hyderabad",
        fresher: [3.8, 6],
        midY3: [6.5, 10.5],
        seniorY5: [11, 17],
        leadY8: [20, 32]
      },
      { city: "Mumbai", fresher: [4, 6.5], midY3: [7, 11], seniorY5: [12, 18], leadY8: [20, 33] },
      {
        city: "Chennai",
        fresher: [3.8, 6],
        midY3: [6.5, 10],
        seniorY5: [10.5, 16],
        leadY8: [18, 28]
      },
      {
        city: "Pune",
        fresher: [3.8, 6.2],
        midY3: [6.5, 10.5],
        seniorY5: [11, 17],
        leadY8: [19, 30]
      },
      { city: "NCR", fresher: [4, 6.5], midY3: [6.8, 10.5], seniorY5: [11, 17], leadY8: [19, 30] },
      {
        city: "Remote",
        fresher: [4, 6.5],
        midY3: [6.5, 10.5],
        seniorY5: [11, 17],
        leadY8: [19, 30],
        note: "MedComms agencies (Indegene, Sciformix, Cactus) and MNC pharma both run remote-first writing teams."
      }
    ],
    ladder: [
      {
        yrs: "Y0",
        role: "Medical Writer L1 (Narratives / Manuscripts)",
        payInr: "₹4 – 6.5 LPA",
        unlocks: "AMWA basics + 50 patient narratives or 3 manuscript drafts on resume"
      },
      {
        yrs: "Y2",
        role: "Medical Writer L2 (CSR sections / Posters)",
        payInr: "₹7 – 11 LPA",
        unlocks: "First full CSR section ownership or first lead-author publication"
      },
      {
        yrs: "Y5",
        role: "Senior Medical Writer (PSUR / Lead manuscript)",
        payInr: "₹12 – 19 LPA",
        unlocks: "EMWA Advanced or ISMPP CMPP + sponsor-facing role"
      },
      {
        yrs: "Y8+",
        role: "Principal Writer / Scientific Comms Lead",
        payInr: "₹22 – 36 LPA",
        unlocks: "Owns therapeutic-area portfolio + KOL strategy + writer team"
      }
    ],
    abroad: [
      {
        country: "UAE",
        flag: "🇦🇪",
        payInrEquiv: "₹18 – 32 LPA equivalent",
        eligibility: "M.Pharm/MD + 3 yr writing + Golden Visa eligible from Y4",
        note: "Smaller market — premium MedComms at G42 Healthcare and pharma APAC HQs."
      },
      {
        country: "Singapore",
        flag: "🇸🇬",
        payInrEquiv: "₹30 – 55 LPA equivalent",
        eligibility: "M.Pharm + 4 yr writing + EP pass",
        note: "APAC MedComms hubs (Novartis, Roche, AstraZeneca)."
      },
      {
        country: "UK",
        flag: "🇬🇧",
        payInrEquiv: "₹32 – 60 LPA equivalent",
        eligibility: "Skilled Worker visa + EMWA + 4 yr exp",
        note: "Strongest writing market in Europe; agencies (Oxford PharmaGenesis, Costello) hire India regularly."
      },
      {
        country: "Ireland",
        flag: "🇮🇪",
        payInrEquiv: "₹38 – 65 LPA equivalent",
        eligibility: "Critical Skills Permit + 5 yr exp",
        note: "EU pharma writing HQs (Pfizer, AbbVie, J&J)."
      },
      {
        country: "USA",
        flag: "🇺🇸",
        payInrEquiv: "₹50 – 95 LPA equivalent",
        eligibility: "H1B + 6 yr exp + AMWA + portfolio",
        note: "Senior writer + principal writer roles; entry MW stays offshore."
      }
    ],
    topEmployers: [
      "Indegene",
      "Sciformix (Covance)",
      "Cactus Communications",
      "Excelra",
      "Bioquest Solutions",
      "IQVIA",
      "Parexel",
      "Syneos Health",
      "Labcorp Drug Development",
      "Novartis",
      "Sanofi",
      "Pfizer",
      "Dr. Reddy's",
      "Sun Pharma",
      "Biocon",
      "Oxford PharmaGenesis",
      "Costello Medical"
    ],
    faqs: [
      {
        q: "RMW (regulatory) vs MedComms (publications) — which pays better?",
        a: "RMW pays ~10-15% higher at every band because regulator-facing work is higher liability. MedComms is more flexible (remote, agency culture) and has a faster ladder for strong writers. Pick RMW for stability, MedComms for variety."
      },
      {
        q: "MBBS / MD doing medical writing — overqualified?",
        a: "No. MDs lead the highest-paying senior roles (₹25-40 LPA at Y6) because therapeutic-area depth speeds up CSRs and lifts manuscript quality. Many MDs use MW as the route into pharma without practising clinically."
      },
      {
        q: "Is a writing sample required for the first job?",
        a: "Yes. Most MW interviews end with a 4-8 hour writing test (rewrite a methods section, summarise a results table). Coursework + 2-3 polished writing samples (a journal-style summary, a patient narrative draft) are the entry portfolio."
      },
      {
        q: "Will AI take medical writing jobs?",
        a: "AI compresses the bottom of the pyramid (narrative drafting, table shells) but expands senior demand because audit + sponsor-style + regulator defence cannot be automated. Net effect: fewer L1 hires per project, more senior writers per portfolio. Plan for the senior track from Day 1."
      },
      {
        q: "Can a non-pharmacy graduate get in?",
        a: "Possible but harder. M.Sc Life Sciences with strong English and a published review article gets L1 offers. MBBS/MD/Pharm.D have the easiest route. Pure English-major candidates almost never clear the medical-content test."
      },
      {
        q: "Best abroad route for writers?",
        a: "UK and Ireland. Both have structural writer shortages and accept India-trained writers at Y4+. EMWA + 4 yrs CSR/PSUR experience + Skilled Worker visa is the standard formula. Singapore is the APAC alternative."
      }
    ],
    arzonCourseSlug: "medical-writing",
    sources: ["naukri_medical_writing", "amwa_2025", "emwa_2025", "nasscom_bpm", "internal_jd"],
    asOf: "Nov 2025"
  }
];
const ROLES_BY_SLUG = Object.fromEntries(
  ROLES.map((r) => [r.slug, r])
);
const listPublishedMoments = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5b12b9e55705b3e25dd049623d626573efe8b92dbc010e9d97ced956e4e51769"));
const getMomentBySlug = createServerFn({
  method: "GET"
}).inputValidator((data) => objectType({
  slug: stringType().min(1).max(120)
}).parse(data)).handler(createSsrRpc("e90dd4cbaf90d961a7fddee08b84d71273800db72f1420f8a747ff143123ff91"));
const listMomentsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("bf03975efd47d1fb603f7700697995cbf1d369ceb9d8f07c4a451f82c0eda80e"));
const getMomentAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid()
}).parse(data)).handler(createSsrRpc("556897b785d794de3f03905ef8bbc0be146f404c8057e2b88ac2c7f2796cd6f5"));
const MomentInputSchema = objectType({
  slug: stringType().max(120).optional(),
  title: stringType().min(2).max(160),
  subtitle: stringType().max(240).nullable().optional(),
  body: stringType().max(2e4).optional(),
  event_date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/),
  location: stringType().max(160).nullable().optional(),
  category: enumType(MOMENT_CATEGORIES),
  status: enumType(MOMENT_STATUSES)
});
const createMoment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MomentInputSchema.parse(data)).handler(createSsrRpc("f0652ee2747f5f4d93e0bdde248ea1cf3407898511df4aad194c6aeaf48ca2d5"));
const MomentUpdateSchema = MomentInputSchema.partial().extend({
  id: stringType().uuid()
});
const updateMoment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MomentUpdateSchema.parse(data)).handler(createSsrRpc("865de48116bb59b9f17184aebe364e1305f0bb70878edbb7ef3d83f3a8a686a9"));
const deleteMoment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid()
}).parse(data)).handler(createSsrRpc("5201c3d6dbb8b17413f0246a9887a8a60ce5ec6f02dd4ddca629664716ff0edd"));
const AddImageSchema = objectType({
  moment_id: stringType().uuid(),
  storage_path: stringType().min(1).max(512),
  alt: stringType().max(240).optional(),
  caption: stringType().max(500).nullable().optional(),
  width: numberType().int().positive().nullable().optional(),
  height: numberType().int().positive().nullable().optional(),
  make_cover: booleanType().optional()
});
const addMomentImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => AddImageSchema.parse(data)).handler(createSsrRpc("c9bba08335c1e341478d1a799f770154545f015179fdf5a9f46aac83ffd5bd7b"));
const removeMomentImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid()
}).parse(data)).handler(createSsrRpc("c7bbbf33ffca8507c935688b50c0c8cadf0d109536f50f04c1e6c06f1acd5085"));
const setMomentCover = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  moment_id: stringType().uuid(),
  image_id: stringType().uuid()
}).parse(data)).handler(createSsrRpc("22c55f90c737dfcf527786bf73971ae005f0bfe773a431865e12ece705fbfc79"));
const updateMomentImage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  id: stringType().uuid(),
  alt: stringType().max(240).optional(),
  caption: stringType().max(500).nullable().optional()
}).parse(data)).handler(createSsrRpc("31447ff58de484807235c9c47ba69c4c20a87ef8fc039e3efaf1b2dccb9d0023"));
const listMomentSitemap = createServerFn({
  method: "GET"
}).handler(createSsrRpc("308c8e5f988ca3644d4f8227009769b48bd5e35d0365d5720d7028762504984c"));
const STATIC_ENTRIES = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "daily",
    image: "/og/og-inauguration.jpg",
    imageAlt: "Arzon Global public launch event"
  },
  {
    path: "/about",
    priority: "0.7",
    changefreq: "monthly",
    image: "/og/about.jpg",
    imageAlt: "About Arzon Global"
  },
  {
    path: "/contact",
    priority: "0.6",
    changefreq: "monthly",
    image: "/og/about.jpg",
    imageAlt: "Contact Arzon Global"
  },
  {
    path: "/cohorts",
    priority: "0.7",
    changefreq: "weekly",
    image: "/og/internships.jpg",
    imageAlt: "Arzon Global cohort schedule"
  },
  {
    path: "/jd-mirror",
    priority: "0.8",
    changefreq: "monthly",
    image: "/og/internships.jpg",
    imageAlt: "Arzon Careers JD Mirror — syllabus from real Indian JDs"
  },
  {
    path: "/refund",
    priority: "0.4",
    changefreq: "yearly",
    image: "/og/legal.jpg",
    imageAlt: "Arzon Global refund policy"
  },
  {
    path: "/verify",
    priority: "0.5",
    changefreq: "monthly",
    image: "/og/legal.jpg",
    imageAlt: "Verify Arzon Global certificate"
  },
  {
    path: "/courses",
    priority: "0.9",
    changefreq: "weekly",
    image: "/og/internships.jpg",
    imageAlt: "Arzon Global programmes"
  },
  {
    path: "/career-engine",
    priority: "0.8",
    changefreq: "weekly",
    image: "/og/career-engine.jpg",
    imageAlt: "Arzon Career Engine fit test"
  },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  {
    path: "/legal/privacy",
    priority: "0.3",
    changefreq: "yearly",
    image: "/og/legal.jpg",
    imageAlt: "Arzon Global privacy notice"
  },
  {
    path: "/legal/terms",
    priority: "0.3",
    changefreq: "yearly",
    image: "/og/legal.jpg",
    imageAlt: "Arzon Global terms of service"
  },
  { path: "/changelog", priority: "0.5", changefreq: "weekly" },
  { path: "/refer", priority: "0.6", changefreq: "monthly" },
  { path: "/status", priority: "0.3", changefreq: "weekly" },
  { path: "/courses/compare", priority: "0.7", changefreq: "monthly" },
  { path: "/industry", priority: "0.9", changefreq: "weekly" },
  { path: "/industry/salaries", priority: "0.8", changefreq: "weekly" },
  { path: "/industry/employers", priority: "0.8", changefreq: "weekly" },
  { path: "/industry/compare", priority: "0.8", changefreq: "weekly" },
  { path: "/industry/pharmacovigilance", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/medical-coding", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/clinical-data-management", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/regulatory-affairs", priority: "0.8", changefreq: "monthly" },
  { path: "/industry/ai-in-healthcare", priority: "0.8", changefreq: "monthly" },
  { path: "/build", priority: "0.8", changefreq: "weekly" },
  { path: "/build/request", priority: "0.6", changefreq: "monthly" },
  { path: "/curriculum", priority: "0.7", changefreq: "monthly" },
  { path: "/acri", priority: "0.7", changefreq: "monthly" },
  { path: "/recruiters", priority: "0.8", changefreq: "monthly" },
  { path: "/tpos", priority: "0.8", changefreq: "monthly" },
  {
    path: "/moments",
    priority: "0.7",
    changefreq: "weekly",
    image: "/og/og-inauguration.jpg",
    imageAlt: "Arzon Moments — our story in photos"
  },
  {
    path: "/why-arzon",
    priority: "0.8",
    changefreq: "monthly",
    image: "/og/about.jpg",
    imageAlt: "Why Arzon — proof, methodology and credibility"
  },
  {
    path: "/roadmap",
    priority: "0.6",
    changefreq: "weekly",
    image: "/og/about.jpg",
    imageAlt: "Arzon infrastructure roadmap"
  }
];
STATIC_ENTRIES.map((e) => e.path);
const CAREER_PATH_SLUGS = ["pharma", "tech", "business"];
const CANONICAL_HOST = "arzoncareers.in";
function originFromRequest(_request) {
  return `https://${CANONICAL_HOST}`;
}
function urlEntry(origin, path2, lastmod, priority = "0.7", changefreq = "weekly", image) {
  const loc = `${origin}${path2}`;
  const hreflang = `<xhtml:link rel="alternate" hreflang="en-IN" href="${loc}"/><xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`;
  const img = image ? `<image:image><image:loc>${origin}${image.href}</image:loc>${image.alt ? `<image:title>${escapeXml(image.alt)}</image:title>` : ""}</image:image>` : "";
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${hreflang}${img}</url>`;
}
function escapeXml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) => c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&apos;"
  );
}
const Route$24 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = originFromRequest();
        const lastmod = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        const entries = [];
        for (const e of STATIC_ENTRIES) {
          entries.push(
            urlEntry(
              origin,
              e.path,
              lastmod,
              e.priority,
              e.changefreq,
              e.image ? { href: e.image, alt: e.imageAlt } : void 0
            )
          );
        }
        for (const slug of Object.keys(COURSES_BY_SLUG)) {
          entries.push(urlEntry(origin, `/courses/${slug}`, lastmod, "0.8", "weekly"));
        }
        for (const slug of CAREER_PATH_SLUGS) {
          entries.push(urlEntry(origin, `/career-engine/path/${slug}`, lastmod, "0.6", "weekly"));
        }
        for (const role of Object.values(ROLES_BY_SLUG)) {
          for (const city of CITIES) {
            if (!findPayBand(role.pay, city)) continue;
            entries.push(
              urlEntry(origin, `/industry/${role.slug}/${city.slug}`, lastmod, "0.6", "monthly")
            );
          }
        }
        try {
          const { items } = await listMomentSitemap();
          for (const m of items) {
            const lm = (m.updated_at || lastmod).slice(0, 10);
            entries.push(urlEntry(origin, `/moments/${m.slug}`, lm, "0.6", "monthly"));
          }
        } catch {
        }
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.sitemaps.org/schemas/sitemap-image/0.9">
${entries.join("\n")}
</urlset>
`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$1J = () => import("./roadmap-BwhwXlFc.mjs");
const Route$23 = createFileRoute("/roadmap")({
  head: () => {
    const title = "Roadmap · Arzon Careers is becoming India's pharma skill-graph";
    const desc = "Public roadmap: what Arzon Careers delivers today, what ships next quarter, and the long-arc vision — a verified skill-evidence graph for India's pharma & clinical workforce.";
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:url",
        content: `${SITE.origin}/roadmap`
      }, {
        property: "og:image",
        content: absUrl(SITE.ogImage.inauguration)
      }],
      links: [{
        rel: "canonical",
        href: `${SITE.origin}/roadmap`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1J, "component")
});
const $$splitComponentImporter$1I = () => import("./reset-password-Djq_DnNK.mjs");
const Route$22 = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Reset password · Arzon Global"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1I, "component")
});
const $$splitComponentImporter$1H = () => import("./republic-BTU5dmpx.mjs");
const Route$21 = createFileRoute("/republic")({
  beforeLoad: () => {
    throw redirect({
      to: "/why-arzon",
      statusCode: 301
    });
  },
  head: () => {
    const seo2 = pageSeo({
      path: "/republic",
      title: "Why Arzon · Republic of Skills",
      description: "Legacy republic page — merged into /why-arzon. Redirecting.",
      noindex: true
    });
    return {
      meta: [{
        title: "Why Arzon · Republic of Skills"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1H, "component")
});
const $$splitComponentImporter$1G = () => import("./refund-Bcl5XtvP.mjs");
const REFUND_FAQS = [{
  q: "How does the seat fee work?",
  a: `The ${SEAT_FEE} seat fee locks your spot in the next cohort. When you continue with the programme, the full amount is adjusted against your programme fee — you don't pay it twice.`
}, {
  q: "How do I cancel before the cohort starts?",
  a: "Write to support with your registered email. We process the cancellation per the terms in your signed enrolment agreement and confirm in writing within 5 working days."
}, {
  q: "What if Arzon Global cancels or postpones a cohort?",
  a: "You can roll over to the next cohort at no extra cost, or request settlement of any amount you've paid. We settle within 5 working days."
}, {
  q: "Do you guarantee a job?",
  a: "No. ASCI guidelines prohibit guaranteed-placement claims, and we follow them. We commit to live mentoring, graded real-data work, a verifiable certificate, and structured introductions to our hiring partners."
}];
const Route$20 = createFileRoute("/refund")({
  head: () => {
    const ps = pageSeo({
      path: "/refund",
      title: "Cancellation & enrolment policy · Arzon Global",
      description: "Plain-English cancellation policy: how the seat fee works, cohort changes, and what we commit to in writing.",
      image: SITE.ogImages.legal
    });
    return {
      meta: [{
        title: "Cancellation & enrolment policy · Arzon Global"
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: faqSchema(REFUND_FAQS)
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1G, "component")
});
const $$splitComponentImporter$1F = () => import("./refer-DKsh3jIG.mjs");
const Route$1$ = createFileRoute("/refer")({
  head: () => {
    const title = "Refer a friend to Arzon Careers";
    const ps = pageSeo({
      path: "/refer",
      title,
      description: "Refer a healthcare graduate to Arzon Careers. They get ₹1,000 off and you get ₹3,000 when they enrol.",
      image: "/og/career-engine.jpg"
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1F, "component")
});
const $$splitComponentImporter$1E = () => import("./recruiters-DEMMCHFf.mjs");
const Route$1_ = createFileRoute("/recruiters")({
  head: () => {
    const title = "Hire from Arzon · Verify any candidate, see the rubric";
    const description = "Recruiters: verify any Arzon Global certificate, see the JD-task rubric behind every grade band, and preview de-identified work samples per track. No fluff, no PII.";
    const ps = pageSeo({
      path: "/recruiters",
      title,
      description
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absUrl("/")
          }, {
            "@type": "ListItem",
            position: 2,
            name: "For Recruiters",
            item: absUrl("/recruiters")
          }]
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1E, "component")
});
const $$splitComponentImporter$1D = () => import("./qa-Dp_5pVtr.mjs");
const Route$1Z = createFileRoute("/qa")({
  component: lazyRouteComponent($$splitComponentImporter$1D, "component"),
  head: () => ({
    meta: [{
      title: "QA Coverage — Arzon Careers"
    }, {
      name: "description",
      content: "Internal dashboard of automated copy, spacing, hydration, and payment-flow validations shipped with the latest build."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }, {
      property: "og:image",
      content: absUrl(SITE.ogImage.inauguration)
    }],
    links: [{
      rel: "canonical",
      href: "https://arzoncareers.in/qa"
    }]
  })
});
const $$splitComponentImporter$1C = () => import("./proof-methodology-BTU5dmpx.mjs");
const Route$1Y = createFileRoute("/proof-methodology")({
  beforeLoad: () => {
    throw redirect({
      to: "/why-arzon",
      statusCode: 301
    });
  },
  head: () => {
    const seo2 = pageSeo({
      path: "/proof-methodology",
      title: "Why Arzon · Proof, Methodology & Credibility",
      description: "Legacy proof-methodology page — merged into /why-arzon. Redirecting.",
      noindex: true
    });
    return {
      meta: [{
        title: "Why Arzon · Proof, Methodology & Credibility"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1C, "component")
});
const $$splitComponentImporter$1B = () => import("./proof-BTU5dmpx.mjs");
const Route$1X = createFileRoute("/proof")({
  beforeLoad: () => {
    throw redirect({
      to: "/why-arzon",
      statusCode: 301
    });
  },
  head: () => {
    const seo2 = pageSeo({
      path: "/proof",
      title: "Why Arzon · Proof, Methodology & Credibility",
      description: "Legacy proof page — merged into /why-arzon. Redirecting.",
      noindex: true
    });
    return {
      meta: [{
        title: "Why Arzon · Proof, Methodology & Credibility"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1B, "component")
});
const ListPublicSchema = objectType({
  limit: numberType().int().min(1).max(500).optional()
});
const listPublicPlacements = createServerFn({
  method: "GET"
}).inputValidator((data) => ListPublicSchema.parse(data ?? {})).handler(createSsrRpc("30c88add11a75e94e58b1520c8b674a1b0b69101b23d56c9f49a975e3e87dd35"));
const EmployerCreateSchema = objectType({
  slug: stringType().min(2).max(80).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, and dashes only"),
  name: stringType().min(2).max(160),
  website: stringType().url().max(300).optional().nullable(),
  logoUrl: stringType().url().max(500).optional().nullable(),
  contactEmail: stringType().email().max(160).optional().nullable(),
  verifiedAt: stringType().datetime().optional().nullable(),
  notes: stringType().max(1e3).optional().nullable()
});
const listEmployers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("9775d5ed55ea5d4eb77f81f410523ea1930370be29b2e371cd5ffb88d2859247"));
const createEmployer = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => EmployerCreateSchema.parse(data)).handler(createSsrRpc("59110b2f7b25b992c7b62817a001defd5e9f475f4ab0e94317fad903e829dd12"));
const EVIDENCE_ENUM = ["signed_offer_letter", "employer_hr_email", "payslip", "joining_letter", "linkedin_confirmation"];
const PlacementCreateSchema = objectType({
  employerId: stringType().uuid(),
  candidateRef: stringType().min(2).max(80).describe("Anonymised reference — e.g. 'A.K. · Hyderabad' — never full name without consent"),
  candidateUserId: stringType().uuid().optional().nullable(),
  roleTitle: stringType().min(2).max(120),
  city: stringType().min(2).max(80),
  monthStart: stringType().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD (use the 1st of the joining month)"),
  salaryBandInr: stringType().max(60).optional().nullable(),
  evidenceSource: enumType(EVIDENCE_ENUM),
  evidenceRef: stringType().min(2).max(500).describe("Internal pointer: storage path, HR contact, or LinkedIn URL"),
  evidenceNotes: stringType().max(1e3).optional().nullable(),
  published: booleanType().optional()
});
const listPlacementsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("dd89b9fafa1cd83683764eb374ab0d4fbcafe56da38ba5f3c71cd5ecee7c4a83"));
const createPlacement = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => PlacementCreateSchema.parse(data)).handler(createSsrRpc("1bdc2d8afcc84a18c7e3a9b99636a92d5654d7a5a5aac9fcea37d774940ce09e"));
const RetractSchema = objectType({
  id: stringType().uuid(),
  reason: stringType().min(2).max(240)
});
const retractPlacement = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => RetractSchema.parse(data)).handler(createSsrRpc("1c39e028aa1a38859385b9db8083d3988dcc5e37c0f10612eb72e3301a5a6154"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("e42a9df2f67fc10008c13c4777b1d08cf435f8e4955e8ea60a383a9bb684b13b"));
const $$splitNotFoundComponentImporter$5 = () => import("./placements-CyyEEOKH.mjs");
const $$splitErrorComponentImporter$b = () => import("./placements-DjA2TefV.mjs");
const $$splitComponentImporter$1A = () => import("./placements-Cq01oUQi.mjs");
const Route$1W = createFileRoute("/placements")({
  head: () => {
    const title = "Verified Placements · Arzon Careers";
    const desc = "The public ledger of every hire Arzon has placed. Each entry is confirmed in writing by the employer. No unverified claims. No inflated numbers.";
    const seo2 = pageSeo({
      path: "/placements",
      title,
      description: desc,
      ogType: "article"
    });
    return {
      meta: [{
        title
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  loader: async () => {
    let placements = [];
    try {
      const res = await listPublicPlacements({
        data: {}
      });
      placements = res.placements;
    } catch {
      throw notFound();
    }
    if (placements.length === 0) throw notFound();
    return {
      placements
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1A, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-10 w-2/3 rounded-xl bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-4 w-full max-w-xl rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-2", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-2xl bg-muted" }, i)) })
  ] }) }),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$b, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$5, "notFoundComponent")
});
const $$splitComponentImporter$1z = () => import("./methodology-BTU5dmpx.mjs");
const Route$1V = createFileRoute("/methodology")({
  beforeLoad: () => {
    throw redirect({
      to: "/why-arzon",
      statusCode: 301
    });
  },
  head: () => {
    const seo2 = pageSeo({
      path: "/methodology",
      title: "Why Arzon · Proof, Methodology & Credibility",
      description: "Legacy methodology page — merged into /why-arzon. Redirecting.",
      noindex: true
    });
    return {
      meta: [{
        title: "Why Arzon · Proof, Methodology & Credibility"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1z, "component")
});
const $$splitComponentImporter$1y = () => import("./jd-mirror-CJXV0g8H.mjs");
const Route$1U = createFileRoute("/jd-mirror")({
  head: () => {
    const path2 = "/jd-mirror";
    const title = "JD Mirror · Syllabus built from real Indian job descriptions · Arzon Careers";
    const description = "We read 5,000+ real Indian fresher JDs from Naukri, LinkedIn India and Foundit, then turn every recurring requirement into a graded week of training. See the exact JD lines and the modules that train for them.";
    const ps = pageSeo({
      path: path2,
      title,
      description,
      image: SITE.ogImage.inauguration,
      ogType: "website"
    });
    return {
      meta: [{
        title
      }, {
        name: "keywords",
        content: "JD based training India, syllabus from job descriptions, fresher medical coder training, fresher drug safety associate training, JD-derived curriculum, role-based training India"
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE.origin
          }, {
            "@type": "ListItem",
            position: 2,
            name: "JD Mirror",
            item: absUrl(path2)
          }]
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1y, "component")
});
const $$splitComponentImporter$1x = () => import("./faq-Dzn120be.mjs");
const Route$1T = createFileRoute("/faq")({
  head: () => {
    const ps = pageSeo({
      path: "/faq",
      title: "FAQs · Arzon Careers",
      description: "Every question students have asked about our 12-week, deployment-ready programmes — certificate, fees, refunds, batches and placement support."
    });
    return {
      meta: [{
        title: "FAQs · Arzon Careers"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1x, "component")
});
const $$splitErrorComponentImporter$a = () => import("./enrol-9H9B-QZf.mjs");
const $$splitComponentImporter$1w = () => import("./enrol-B33RD7mv.mjs");
const Route$1S = createFileRoute("/enrol")({
  head: () => ({
    meta: [{
      title: "Enrol now. Arzon Global"
    }, {
      name: "description",
      content: "Skip the test and enrol directly in your Arzon Global programme."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1w, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$a, "errorComponent")
});
const $$splitComponentImporter$1v = () => import("./deployment-model-BTU5dmpx.mjs");
const Route$1R = createFileRoute("/deployment-model")({
  beforeLoad: () => {
    throw redirect({
      to: "/why-arzon",
      statusCode: 301
    });
  },
  head: () => {
    const seo2 = pageSeo({
      path: "/deployment-model",
      title: "Why Arzon · Deployment-Ready Model",
      description: "Legacy deployment-model page — merged into /why-arzon. Redirecting.",
      noindex: true
    });
    return {
      meta: [{
        title: "Why Arzon · Deployment-Ready Model"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1v, "component")
});
const $$splitComponentImporter$1u = () => import("./dashboard-Cd-jZJU0.mjs");
const Route$1Q = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Your dashboard. Arzon Global"
    }, {
      name: "description",
      content: "Resume your programme, track progress, see your cohort schedule and download your certificates."
    }, {
      property: "og:title",
      content: "Your Arzon dashboard"
    }, {
      property: "og:description",
      content: "Pick up where you left off and see your cohort milestones."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1u, "component")
});
const $$splitComponentImporter$1t = () => import("./curriculum-DXnG8mQP.mjs");
const Route$1P = createFileRoute("/curriculum")({
  head: () => {
    const seo2 = pageSeo({
      path: "/curriculum",
      title: "Curriculum — JD-derived syllabus | Arzon Careers",
      description: "Week-by-week syllabus for 6 fresher tracks, reverse-engineered from real Indian JDs: PV, Medical Coding, CDM, Clinical SAS, RA and Medical Writing.",
      image: "/og/internships.jpg"
    });
    return {
      meta: [{
        title: "Curriculum — JD-derived syllabus | Arzon Careers"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1t, "component")
});
const $$splitComponentImporter$1s = () => import("./credibility-BTU5dmpx.mjs");
const Route$1O = createFileRoute("/credibility")({
  beforeLoad: () => {
    throw redirect({
      to: "/why-arzon",
      statusCode: 301
    });
  },
  head: () => {
    const seo2 = pageSeo({
      path: "/credibility",
      title: "Why Arzon · Proof, Methodology & Credibility",
      description: "Legacy credibility page — merged into /why-arzon. Redirecting.",
      noindex: true
    });
    return {
      meta: [{
        title: "Why Arzon · Proof, Methodology & Credibility"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1s, "component")
});
const $$splitComponentImporter$1r = () => import("./copilot-4wqM8MxV.mjs");
const Route$1N = createFileRoute("/copilot")({
  head: () => {
    const seo2 = pageSeo({
      path: "/copilot",
      title: "Arzon Copilot · AI Healthcare Mock Interviewer",
      description: "Interactive AI-powered mock interview practice for Clinical Research, Pharmacovigilance, and Healthcare careers.",
      noindex: true
    });
    return {
      meta: [{
        title: "Arzon Copilot · AI Mock Interview"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1r, "component")
});
const $$splitComponentImporter$1q = () => import("./contact-1anXE02E.mjs");
const Route$1M = createFileRoute("/contact")({
  head: () => {
    const ps = pageSeo({
      path: "/contact",
      title: "Contact Arzon Global. Talk to a counsellor",
      description: "Talk to an Arzon Global counsellor about pharmacovigilance, medical coding or clinical research courses & internships. WhatsApp, email or call · Hyderabad.",
      image: SITE.ogImages.about
    });
    return {
      meta: [{
        title: "Contact Arzon Global. Talk to a counsellor"
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: localBusinessSchema({
          telephone: COUNSELLOR_PHONE_DISPLAY,
          email: "info@arzonglobal.com",
          address: {
            streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
            addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
            addressRegion: ADDRESS.region,
            postalCode: ADDRESS.postalCode,
            addressCountry: ADDRESS.countryCode
          }
        })
      }, {
        type: "application/ld+json",
        children: breadcrumbSchema([{
          name: "Home",
          path: "/"
        }, {
          name: "Contact",
          path: "/contact"
        }])
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1q, "component")
});
const $$splitComponentImporter$1p = () => import("./cohorts-CesPrbPl.mjs");
const Route$1L = createFileRoute("/cohorts")({
  head: () => {
    const ps = pageSeo({
      path: "/cohorts",
      title: "Cohort schedule. Arzon Global",
      description: "Upcoming pharmacovigilance, medical coding & clinical research internship cohorts in India. Start dates, fees, application windows and how to enrol.",
      image: SITE.ogImages.internships
    });
    return {
      meta: [{
        title: "Cohort schedule. Arzon Global"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1p, "component")
});
const $$splitComponentImporter$1o = () => import("./changelog-Bi2tKmur.mjs");
const Route$1K = createFileRoute("/changelog")({
  loader: () => fetchChangelog(),
  head: () => {
    const ps = pageSeo({
      path: "/changelog",
      title: "Programme Changelog · Arzon Careers",
      description: "Public changelog of curriculum, platform, policy and trust updates at Arzon Careers.",
      image: "/og/about.jpg"
    });
    return {
      meta: [{
        title: "Programme Changelog · Arzon Careers"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1o, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh animate-pulse bg-background p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-64 rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 w-full rounded bg-muted" })
  ] }) })
});
const $$splitComponentImporter$1n = () => import("./career-engine-Ciqa-mSW.mjs");
const Route$1J = createFileRoute("/career-engine")({
  head: () => ({
    meta: [{
      title: "Arzon Career Engine"
    }, {
      name: "description",
      content: "Free 3-minute healthcare career diagnostic. Find the role that fits your stream, strengths and goals."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1n, "component")
});
const $$splitComponentImporter$1m = () => import("./apply-BTU5dmpx.mjs");
const Route$1I = createFileRoute("/apply")({
  beforeLoad: () => {
    throw redirect({
      to: "/enrol",
      statusCode: 301
    });
  },
  head: () => ({
    meta: [{
      title: "Enrol · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1m, "component")
});
const $$splitErrorComponentImporter$9 = () => import("./admin-BZ2E88uB.mjs");
const $$splitComponentImporter$1l = () => import("./admin-VyeAw-l7.mjs");
const Route$1H = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1l, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$9, "errorComponent")
});
const $$splitComponentImporter$1k = () => import("./acri-b1OD0IUY.mjs");
const Route$1G = createFileRoute("/acri")({
  head: () => {
    const title = "ACRI methodology · How the Career Engine score is built";
    const description = "Public, auditable methodology for the Arzon Career Engine score. 5 dimensions, 13 traits, 40 questions, calibration sources, current sample size, and what we don't yet claim.";
    const ps = pageSeo({
      path: "/acri",
      title,
      description
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: title,
          description,
          url: absUrl("/acri"),
          publisher: {
            "@type": "Organization",
            name: "Arzon Global"
          }
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1k, "component")
});
const $$splitComponentImporter$1j = () => import("./about-Bbk6D5aP.mjs");
const Route$1F = createFileRoute("/about")({
  head: () => {
    const ps = pageSeo({
      path: "/about",
      title: "About Arzon Global. Project-first internship academy",
      description: "Arzon Global is an ISO 9001, MSME & MCA-registered pharmacovigilance, medical coding and clinical research training institute based in Hyderabad, India.",
      image: SITE.ogImages.about
    });
    return {
      meta: [{
        title: "About Arzon Global. Project-first internship academy"
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: localBusinessSchema({
          telephone: COUNSELLOR_PHONE_DISPLAY,
          email: "info@arzonglobal.com",
          address: {
            streetAddress: `${ADDRESS.street}, ${ADDRESS.area}`,
            addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
            addressRegion: ADDRESS.region,
            postalCode: ADDRESS.postalCode,
            addressCountry: ADDRESS.countryCode
          }
        })
      }, {
        type: "application/ld+json",
        children: breadcrumbSchema([{
          name: "Home",
          path: "/"
        }, {
          name: "About",
          path: "/about"
        }])
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1j, "component")
});
const $$splitComponentImporter$1i = () => import("./route-BFsOu0JM.mjs");
const Route$1E = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) {
      throw redirect({
        to: "/admin/login"
      });
    }
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1i, "component")
});
const $$splitComponentImporter$1h = () => import("./index-Bf37wEMo.mjs");
const Route$1D = createFileRoute("/")({
  head: () => {
    const og = absUrl(SITE.ogImage.inauguration);
    const title = "India's Workforce Readiness Platform · Arzon Careers";
    const desc = "Pharmacovigilance, medical coding & clinical research courses in India with paid internships, ISO-aligned certificate & placement support. Apply now.";
    const s = seo("/");
    const homeUrl = `${SITE.origin}/`;
    return {
      meta: [
        {
          title
        },
        {
          name: "description",
          content: desc
        },
        // Open Graph (Facebook / WhatsApp / LinkedIn)
        {
          property: "og:title",
          content: title
        },
        {
          property: "og:description",
          content: desc
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:url",
          content: homeUrl
        },
        {
          property: "og:locale",
          content: "en_IN"
        },
        {
          property: "og:site_name",
          content: "Arzon Global"
        },
        {
          property: "og:image",
          content: og
        },
        {
          property: "og:image:secure_url",
          content: og
        },
        {
          property: "og:image:type",
          content: "image/jpeg"
        },
        {
          property: "og:image:width",
          content: String(SITE.ogImage.width)
        },
        {
          property: "og:image:height",
          content: String(SITE.ogImage.height)
        },
        {
          property: "og:image:alt",
          content: SITE.ogImage.alt
        },
        // Twitter / X
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: title
        },
        {
          name: "twitter:description",
          content: desc
        },
        {
          name: "twitter:image",
          content: og
        },
        {
          name: "twitter:image:alt",
          content: SITE.ogImage.alt
        }
      ],
      links: [...s.links],
      scripts: [{
        // FAQPage schema, mirrors the on-page FAQ component so Google
        // can render rich Q&A snippets in search results. Plain text
        // only (schema.org disallows HTML in answer bodies).
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{
            "@type": "Question",
            name: "Is this a real internship or just another online course?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Both. First 8 weeks are live classes with homework. Last 4 weeks you work on real hospital or CRO files. You get a proper internship certificate at the end."
            }
          }, {
            "@type": "Question",
            name: "Will the certificate actually help me get a job?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Each certificate has a unique ID and a public link recruiters can verify online. It is issued by Arzon Global (ISO 9001 certified, MSME & MCA registered) and is performance-based, not a participation certificate."
            }
          }, {
            "@type": "Question",
            name: "I'm in 1st or 2nd year. Can I still join?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, best time to start. Classes run in the evening, all sessions are recorded so you don't miss anything during exams."
            }
          }, {
            "@type": "Question",
            name: "Do you guarantee a job?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No, and don't trust anyone who does (it's against ASCI rules). What we promise: real interview practice, a fixed CV, and intros to our hiring partners."
            }
          }, {
            "@type": "Question",
            name: "How is this different from YouTube or Udemy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Live mentors who actually work in the industry. Real medical files to practice on. ISO-certified, performance-based certificate. A counsellor you can call."
            }
          }, {
            "@type": "Question",
            name: "How do I pay the fee?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "One-time. Take the 3-min fit test first; the seat-confirmation step (fully adjusted in your fee) is shown after your result. We do not offer EMI, education fees can't legally be financed that way."
            }
          }, {
            "@type": "Question",
            name: "What if I don't get an interview after the programme?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If you complete the programme with grade B+ and don't get an interview in 90 days, we extend free placement support for 6 more months."
            }
          }, {
            "@type": "Question",
            name: "How big are the batches?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Maximum 60 students per batch. Mentor sees you in groups of under 15, so you actually get attention."
            }
          }, {
            "@type": "Question",
            name: "I'm a BBA student — is this programme for me?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. BBA, B.Com and other non-pharma students join every cohort. The programme builds the medical/clinical vocabulary from scratch in the first two weeks."
            }
          }, {
            "@type": "Question",
            name: "Will non-pharma students survive the medical content?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Week 1–2 is a 'medical fundamentals' bridge built specifically for non-pharma students."
            }
          }, {
            "@type": "Question",
            name: "How do I pick the right programme?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Take the free 3-minute Career Engine test. It scores aptitude, interest and role-readiness and recommends 1 primary + 1 backup track."
            }
          }, {
            "@type": "Question",
            name: "Can I switch programmes after I start?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, within the first week of your cohort. After that, switching is case-by-case to protect cohort progress."
            }
          }, {
            "@type": "Question",
            name: "Is there a stipend?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. This is a structured training internship — you pay for industry-grade training, you don't get paid."
            }
          }, {
            "@type": "Question",
            name: "What kind of files do we actually work on?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Real, de-identified case files: PV ICSR cases, medical coding charts, eCRF datasets — the exact work fresh hires do on day one."
            }
          }, {
            "@type": "Question",
            name: "Who issues the certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Arzon Global Labs — ISO 9001 certified, MSME registered, MCA incorporated. Each certificate carries ISO, MSME and Govt. of Telangana seals."
            }
          }, {
            "@type": "Question",
            name: "How do recruiters verify the certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Each certificate has a unique ID, a QR code and a public verification URL at arzoncareers.in/verify."
            }
          }, {
            "@type": "Question",
            name: "What's the typical starting salary?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Entry-level offers typically fall in the ₹2.4–4.2 LPA range in Hyderabad, Bengaluru and Pune. Band data per role is published on the industry pages."
            }
          }, {
            "@type": "Question",
            name: "What laptop do I need?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Any laptop with Windows 10/11 or macOS, 8 GB RAM and a 5 Mbps connection is enough. No gaming-spec hardware required."
            }
          }, {
            "@type": "Question",
            name: "Can I attend on mobile only?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can watch live classes on mobile, but assignments (medical coding charts, eCRF entries) need a laptop."
            }
          }, {
            "@type": "Question",
            name: "How do I know Arzon Global is not a scam?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "MSME-registered, MCA-incorporated, ISO 9001 certified, with national/regional media coverage. Verify any certificate live at arzoncareers.in/verify."
            }
          }]
        })
      }, {
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
                url: SITE.origin
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Blended",
                courseWorkload: "P12W",
                location: {
                  "@type": "Place",
                  name: "Hyderabad, India"
                },
                inLanguage: "en-IN"
              }
            }
          }))
        })
      }, {
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
          sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website]
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1h, "component")
});
const $$splitErrorComponentImporter$8 = () => import("./moments.index-Bb4H61wo.mjs");
const $$splitComponentImporter$1g = () => import("./moments.index-DgCYLy0E.mjs");
const Route$1C = createFileRoute("/moments/")({
  head: () => {
    const ps = pageSeo({
      path: "/moments",
      title: "Arzon Moments — our launch, our people, our proof",
      description: "A visual record of Arzon Global. Office launches, media moments, partnerships, campus visits and team milestones — published photo by photo."
    });
    return {
      meta: [{
        title: "Arzon Moments — our launch, our people, our proof"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1g, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$8, "errorComponent")
});
const UPCOMING = [{
  tag: "Launch",
  title: "Office inauguration reel",
  hint: "Ribbon cut, first cohort walk-in."
}, {
  tag: "Campus",
  title: "TASK campus visits",
  hint: "Faculty briefings + Q&A."
}, {
  tag: "Media",
  title: "ETV / press coverage",
  hint: "Segments as they publish."
}];
function EmptyMoments({
  tone = "dark"
} = {}) {
  const isLight = tone === "light";
  const t = {
    hairline: isLight ? "border-slate-900/10" : "border-white/10",
    hairlineDashed: isLight ? "border-slate-900/15" : "border-white/12",
    panelBg: isLight ? "bg-gradient-to-br from-sky-50 via-white to-white" : "bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent",
    iconBg: isLight ? "bg-sky-500/10 ring-sky-600/30" : "bg-sky-300/10 ring-sky-300/30",
    iconFg: isLight ? "text-accent-emerald-deep" : "text-sky-300",
    eyebrow: isLight ? "text-accent-emerald-deep" : "text-sky-300",
    eyebrowSoft: isLight ? "text-accent-emerald-deep/80" : "text-sky-300/80",
    heading: isLight ? "text-ink" : "text-white",
    body: isLight ? "text-muted-foreground" : "text-white/70",
    micro: isLight ? "text-muted-foreground" : "text-white/60",
    itemBg: isLight ? "bg-muted/70" : "bg-white/[0.02]",
    iconGhost: isLight ? "text-muted-foreground" : "text-white/25",
    // Buttons are tonal islands. On the light shell the primary CTA is a
    // dark navy button, so it opts into the dark palette via `tone-dark`;
    // on the dark shell it is a white button that opts into `tone-light`.
    primaryBtn: isLight ? "tone-dark bg-[#0A1024] text-white hover:bg-[#0A1024]/90" : "tone-light bg-white text-[#0A1024] hover:bg-white/90",
    secondaryBtn: isLight ? "border-border text-ink hover:border-slate-400 hover:bg-muted" : "border-white/20 text-white hover:border-white/40 hover:bg-white/5"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-testid": "moments-empty-root", "data-tone": tone, className: "mx-auto max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-3xl border ${t.hairline} ${t.panelBg} p-8 sm:p-10`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${t.iconBg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: `h-5 w-5 ${t.iconFg}`, "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-mono text-micro font-bold uppercase tracking-[0.22em] ${t.eyebrow}`, children: "Publishing soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `mt-1 font-grotesk text-xl font-semibold leading-snug sm:text-2xl ${t.heading}`, children: "The first stories are in edit." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 max-w-xl text-sm leading-relaxed ${t.body}`, children: "No stock photos. No placeholders. Every moment we ship is a real event, published with the date, place and the people who were in the room." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap gap-3 sm:w-auto sm:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: `inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-semibold transition sm:flex-none ${t.primaryBtn}`, children: [
          "Browse programmes",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: `inline-flex h-10 flex-1 items-center justify-center rounded-md border px-4 text-sm font-semibold transition sm:flex-none ${t.secondaryBtn}`, children: "About Arzon" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3", children: UPCOMING.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `overflow-hidden rounded-2xl border border-dashed ${t.hairlineDashed} ${t.itemBg}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[4/3] w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.12),transparent_60%)]", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: `h-8 w-8 ${t.iconGhost}` }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-mono text-micro font-bold uppercase tracking-[0.22em] ${t.eyebrowSoft}`, children: u.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1.5 font-grotesk text-sm font-semibold ${t.heading}`, children: u.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-1 text-xs ${t.micro}`, children: u.hint })
      ] })
    ] }, u.title)) })
  ] });
}
const Route$1B = createFileRoute("/internships/")({
  beforeLoad: () => {
    throw redirect({ to: "/courses", statusCode: 301 });
  }
});
const $$splitComponentImporter$1f = () => import("./industry.index-CotJ1Yle.mjs");
const Route$1A = createFileRoute("/industry/")({
  component: lazyRouteComponent($$splitComponentImporter$1f, "component"),
  head: () => {
    const ps = pageSeo({
      path: "/industry",
      title: "Industry Intelligence, India 2026, Arzon",
      description: "Real pay bands, top employers, career ladders and abroad markets for PV, Medical Coding, CDM and more. Sourced from JD scrapes and refreshed quarterly."
    });
    return {
      meta: [{
        title: "Industry Intelligence, India 2026, Arzon"
      }, ...ps.meta],
      links: ps.links
    };
  }
});
const $$splitComponentImporter$1e = () => import("./enrol.index-3l8N-26X.mjs");
const Route$1z = createFileRoute("/enrol/")({
  head: () => ({
    meta: [{
      title: "Select Workforce Readiness Tier · Arzon Global"
    }, {
      name: "description",
      content: "Compare Essential, Career, and Elite workforce readiness tiers. Transparent pricing with zero hidden charges."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1e, "component")
});
const $$splitComponentImporter$1d = () => import("./courses.index-BNsh1GNn.mjs");
const Route$1y = createFileRoute("/courses/")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400"
    };
  },
  head: () => {
    const ps = pageSeo({
      path: "/courses",
      title: "Programmes. Arzon Global",
      description: "Compare pharmacovigilance, medical coding, clinical research & SAS clinical courses in India. Fees, duration, internship & certification. Pick your programme.",
      image: SITE.ogImages.internships
    });
    return {
      meta: [{
        title: "Programmes. Arzon Global"
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: breadcrumbSchema([{
          name: "Home",
          path: "/"
        }, {
          name: "Programmes",
          path: "/courses"
        }])
      }, {
        type: "application/ld+json",
        children: itemListSchema({
          name: "Arzon Global Programmes",
          items: COURSES.slice(0, 20).map((c) => ({
            name: c.title,
            path: `/courses/${c.slug}`,
            description: c.blurb
          }))
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1d, "component")
});
const $$splitComponentImporter$1c = () => import("./career-engine.index-D7GNNqID.mjs");
const Route$1x = createFileRoute("/career-engine/")({
  head: () => {
    const ps = pageSeo({
      path: "/career-engine",
      title: "Career Test for Pharma & BBA Students · Free · Arzon",
      description: "Free 3-min career test for pharma, BBA, B.Tech & life-sciences students in India. Match to pharmacovigilance, medical coding, CDM or regulatory with salary bands.",
      image: SITE.ogImages.careerEngine
    });
    return {
      meta: [{
        title: "Career Test for Pharma & BBA Students · Free · Arzon"
      }, {
        name: "keywords",
        content: "career test for pharma students, career test for BBA students, ACRI readiness, career assessment India, free career test"
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: breadcrumbSchema([{
          name: "Home",
          path: "/"
        }, {
          name: "Career Engine",
          path: "/career-engine"
        }])
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1c, "component")
});
const $$splitComponentImporter$1b = () => import("./build.index-C0XJMzMN.mjs");
const Route$1w = createFileRoute("/build/")({
  head: () => {
    const title = "Build pipeline — Arzon Careers";
    const description = "We build tracks where verified demand exists. Watch the pipeline ship — voting, building, live.";
    const ps = pageSeo({
      path: "/build",
      title,
      description
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1b, "component")
});
const $$splitComponentImporter$1a = () => import("./apply.index-BTU5dmpx.mjs");
const Route$1v = createFileRoute("/apply/")({
  beforeLoad: () => {
    throw redirect({
      to: "/enrol",
      statusCode: 301
    });
  },
  head: () => ({
    meta: [{
      title: "Enrol · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1a, "component")
});
const $$splitErrorComponentImporter$7 = () => import("./admin.index-Do4SYIrU.mjs");
const $$splitComponentImporter$19 = () => import("./admin.index-C-43qOXP.mjs");
const Route$1u = createFileRoute("/admin/")({
  head: () => ({
    meta: [{
      title: "Admin · Arzon"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$19, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$7, "errorComponent")
});
const $$splitComponentImporter$18 = () => import("./student.resume-CDky4J-c.mjs");
const Route$1t = createFileRoute("/student/resume")({
  head: () => {
    const seo2 = pageSeo({
      path: "/student/resume",
      title: "AI Resume Builder · Arzon Careers",
      description: "Your personalized ATS-optimized resume.",
      noindex: true
    });
    return {
      meta: [{
        title: "AI Resume Builder · Arzon Careers"
      }, ...seo2.meta],
      links: seo2.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
const CreateInput = objectType({
  archetype: stringType().min(1).max(64),
  archetypeName: stringType().min(1).max(120),
  topTrackSlug: stringType().min(1).max(64).optional(),
  topTrackTitle: stringType().min(1).max(120).optional(),
  acriOverall: numberType().int().min(0).max(100),
  bandLabel: stringType().min(1).max(64).optional(),
  payload: recordType(stringType(), unknownType()).optional(),
  referralCode: stringType().min(3).max(64).optional()
});
const createShareCard = createServerFn({
  method: "POST"
}).inputValidator((d) => CreateInput.parse(d)).handler(createSsrRpc("c5e48662d66707ad44051f38bf646bf4f5f29f089623f9b56fcb9e457160af2b"));
const GetInput = objectType({
  slug: stringType().min(3).max(32)
});
const getShareCard = createServerFn({
  method: "GET"
}).inputValidator((d) => GetInput.parse(d)).handler(createSsrRpc("c951fbb016441ea9f7d4b28d1e006392c64ae9319bf46cabe2805c5acb9bd3c4"));
const RefInput = objectType({
  referralCode: stringType().min(3).max(64),
  landingPath: stringType().min(1).max(255),
  userAgent: stringType().min(1).max(512).optional()
});
const recordReferralVisit = createServerFn({
  method: "POST"
}).inputValidator((d) => RefInput.parse(d)).handler(createSsrRpc("894b83cdaa217e9f89d28a3eb00269470b6702f7951604b8c69a5670a6cb436b"));
const $$splitComponentImporter$17 = () => import("./r._id-DnUOWXxw.mjs");
const Route$1s = createFileRoute("/r/$id")({
  loader: async ({
    params
  }) => {
    const card2 = await getShareCard({
      data: {
        slug: params.id
      }
    });
    if (!card2) throw notFound();
    return card2;
  },
  head: ({
    loaderData,
    params
  }) => {
    if (!loaderData) return {};
    const name = loaderData.archetype_name;
    const score = loaderData.acri_overall;
    const track2 = loaderData.top_track_title ?? loaderData.archetype_name;
    const title = `Scored ${score} ACRI · Top fit ${track2} · Arzon Careers`;
    const description = `Someone took the 4-min Arzon Career Engine assessment and scored ${score}/100 ACRI with ${name} as their archetype. Take yours, ground-truthed against 12,400+ healthcare cohort outcomes.`;
    const ogImage = `/api/public/og/result/${params.id}.svg`;
    const ps = pageSeo({
      path: `/r/${params.id}`,
      title,
      description,
      image: ogImage,
      ogType: "article"
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$17, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0A0F1E] animate-pulse px-4 py-24 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full rounded-3xl bg-white/5" }) }) })
});
const $$splitErrorComponentImporter$6 = () => import("./moments._slug-Bwef91wZ.mjs");
const $$splitNotFoundComponentImporter$4 = () => import("./moments._slug-D39Qiw1l.mjs");
const $$splitComponentImporter$16 = () => import("./moments._slug-cYqXJgxv.mjs");
const Route$1r = createFileRoute("/moments/$slug")({
  loader: async ({
    params
  }) => {
    const res = await getMomentBySlug({
      data: {
        slug: params.slug
      }
    });
    if (!res.moment) throw notFound();
    return {
      moment: res.moment
    };
  },
  head: ({
    loaderData
  }) => {
    const m = loaderData?.moment;
    if (!m) return {
      meta: [{
        title: "Moment not found · Arzon"
      }]
    };
    const ps = pageSeo({
      path: `/moments/${m.slug}`,
      title: `${m.title} · Arzon Moments`,
      description: m.subtitle || m.body.slice(0, 160) || `Arzon Global moment on ${m.event_date}.`,
      image: m.cover_url ?? void 0
    });
    return {
      meta: [{
        title: `${m.title} · Arzon Moments`
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$16, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[oklch(0.14_0.04_245)] animate-pulse px-4 py-24 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-3/4 rounded-xl bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 h-96 w-full rounded-2xl bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full rounded bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full rounded bg-white/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-5/6 rounded bg-white/10" })
    ] })
  ] }) }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$4, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$6, "errorComponent")
});
const $$splitComponentImporter$15 = () => import("./legal.terms-BaN4q2jy.mjs");
const Route$1q = createFileRoute("/legal/terms")({
  head: () => {
    const ps = pageSeo({
      path: "/legal/terms",
      title: "Terms of service. Arzon Global",
      description: "Terms of service for using Arzon Global's website and programmes. Plain-English terms covering enrolment, content and use.",
      image: SITE.ogImages.legal
    });
    return {
      meta: [{
        title: "Terms of service. Arzon Global"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
const $$splitComponentImporter$14 = () => import("./legal.privacy-DJlThzIv.mjs");
const Route$1p = createFileRoute("/legal/privacy")({
  head: () => {
    const ps = pageSeo({
      path: "/legal/privacy",
      title: "Privacy notice. Arzon Global",
      description: "Plain-English privacy notice covering what we collect, how we use it, and your rights. We never sell your data.",
      image: SITE.ogImages.legal
    });
    return {
      meta: [{
        title: "Privacy notice. Arzon Global"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
const $$splitComponentImporter$13 = () => import("./learn._slug-Bb35lenq.mjs");
const search$3 = objectType({
  m: coerce.number().min(1).default(1),
  l: coerce.number().min(1).default(1),
  lesson: stringType().optional().catch(void 0)
});
const Route$1o = createFileRoute("/learn/$slug")({
  validateSearch: search$3,
  loader: ({
    params
  }) => {
    const c = COURSES_BY_SLUG[params.slug];
    if (!c) throw notFound();
    return c;
  },
  head: ({
    loaderData
  }) => loaderData ? {
    meta: [{
      title: `Player · ${loaderData.title}, Arzon Global`
    }, {
      name: "description",
      content: `Module player for ${loaderData.title}. Watch lessons, download resources, submit assignments.`
    }]
  } : {},
  component: lazyRouteComponent($$splitComponentImporter$13, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh animate-pulse bg-background p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-64 rounded bg-muted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[600px] flex-1 rounded-xl bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[600px] w-80 rounded-xl bg-muted hidden lg:block" })
    ] })
  ] }) })
});
const Route$1n = createFileRoute("/internships/pharmacovigilance")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses/$slug",
      params: { slug: "pharmacovigilance" },
      statusCode: 301
    });
  }
});
const Route$1m = createFileRoute("/internships/medical-coding")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses/$slug",
      params: { slug: "medical-coding" },
      statusCode: 301
    });
  }
});
const Route$1l = createFileRoute("/internships/clinical-data-management")({
  beforeLoad: () => {
    throw redirect({
      to: "/courses/$slug",
      params: { slug: "clinical-data-management" },
      statusCode: 301
    });
  }
});
const EXP_LEVELS = [{
  key: "fresher",
  label: "Fresher (0-1 yr)"
}, {
  key: "midY3",
  label: "2-3 yrs"
}, {
  key: "seniorY5",
  label: "4-6 yrs"
}, {
  key: "leadY8",
  label: "7+ yrs"
}];
const $$splitComponentImporter$12 = () => import("./industry.salaries-B6GCBy6J.mjs");
const EXP_LABEL = EXP_LEVELS.reduce((acc, e) => ({
  ...acc,
  [e.key]: e.label
}), {});
const searchSchema$2 = objectType({
  city: stringType().optional().default("all"),
  exp: enumType(["fresher", "midY3", "seniorY5", "leadY8"]).optional().default("fresher"),
  role: stringType().optional().default("all")
});
const Route$1k = createFileRoute("/industry/salaries")({
  validateSearch: (input) => searchSchema$2.parse(input),
  component: lazyRouteComponent($$splitComponentImporter$12, "component"),
  head: ({
    match
  }) => {
    const s = match.search ?? {};
    const city = s.city ?? "all";
    const exp = s.exp ?? "fresher";
    const role = s.role ?? "all";
    const roleName = role === "all" ? null : ROLES.find((r) => r.slug === role)?.name ?? null;
    const qs = [];
    if (city !== "all") qs.push(`city=${encodeURIComponent(city)}`);
    if (exp !== "fresher") qs.push(`exp=${encodeURIComponent(exp)}`);
    if (role !== "all") qs.push(`role=${encodeURIComponent(role)}`);
    const path2 = "/industry/salaries" + (qs.length ? `?${qs.join("&")}` : "");
    const subjectBits = [roleName ?? "Healthcare", "salaries"];
    if (city !== "all") subjectBits.push(`in ${city}`);
    subjectBits.push(`(${EXP_LABEL[exp]})`);
    const title = `${subjectBits.join(" ")} — India 2026`.slice(0, 70);
    const description = `${roleName ?? "PV, Coding, CDM, Regulatory and AI-in-Healthcare"} pay bands${city !== "all" ? ` in ${city}` : " across 8 Indian cities"} for ${EXP_LABEL[exp]}. JD-derived, refreshed quarterly.`;
    const ps = pageSeo({
      path: path2,
      title,
      description
    });
    const breadcrumbItems = [{
      name: "Home",
      item: absUrl("/")
    }, {
      name: "Industry",
      item: absUrl("/industry")
    }, {
      name: "Salaries",
      item: absUrl("/industry/salaries")
    }];
    if (roleName) breadcrumbItems.push({
      name: roleName,
      item: absUrl(`/industry/${role}`)
    });
    if (city !== "all") breadcrumbItems.push({
      name: city,
      item: absUrl(path2)
    });
    const ldJson = {
      "@context": "https://schema.org",
      "@graph": [{
        "@type": "WebPage",
        "@id": absUrl(path2),
        url: absUrl(path2),
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: {
          "@type": "WebSite",
          name: "Arzon Global",
          url: absUrl("/")
        },
        about: {
          "@type": "Thing",
          name: roleName ?? "Healthcare careers (PV, Coding, CDM, Regulatory, AI)"
        },
        ...city !== "all" && {
          spatialCoverage: {
            "@type": "Place",
            name: `${city}, India`
          }
        },
        audience: {
          "@type": "Audience",
          audienceType: EXP_LABEL[exp]
        }
      }, {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.item
        }))
      }]
    };
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(ldJson)
      }]
    };
  }
});
const $$splitComponentImporter$11 = () => import("./industry.employers-jiZAh71q.mjs");
const searchSchema$1 = objectType({
  city: stringType().optional().default("all"),
  role: stringType().optional().default("all"),
  tier: stringType().optional().default("all")
});
const Route$1j = createFileRoute("/industry/employers")({
  validateSearch: (input) => searchSchema$1.parse(input),
  component: lazyRouteComponent($$splitComponentImporter$11, "component"),
  head: ({
    match
  }) => {
    const s = match.search ?? {};
    const city = s.city ?? "all";
    const role = s.role ?? "all";
    const tier = s.tier ?? "all";
    const roleName = role === "all" ? null : ROLES.find((r) => r.slug === role)?.name ?? null;
    const qs = [];
    if (city !== "all") qs.push(`city=${encodeURIComponent(city)}`);
    if (role !== "all") qs.push(`role=${encodeURIComponent(role)}`);
    if (tier !== "all") qs.push(`tier=${encodeURIComponent(tier)}`);
    const path2 = "/industry/employers" + (qs.length ? `?${qs.join("&")}` : "");
    const subjectBits = [];
    if (tier !== "all") subjectBits.push(tier);
    subjectBits.push(roleName ? `${roleName} employers` : "Healthcare & pharma employers");
    if (city !== "all") subjectBits.push(`in ${city}`);
    const title = `${subjectBits.join(" ")} — India 2026`.slice(0, 70);
    const description = `${tier !== "all" ? tier + " " : ""}firms hiring${roleName ? ` for ${roleName}` : ""}${city !== "all" ? ` in ${city}` : " across India"}. Cities and L1 fresher pay bands, refreshed quarterly.`;
    const ps = pageSeo({
      path: path2,
      title,
      description
    });
    const breadcrumbItems = [{
      name: "Home",
      item: absUrl("/")
    }, {
      name: "Industry",
      item: absUrl("/industry")
    }, {
      name: "Employers",
      item: absUrl("/industry/employers")
    }];
    if (roleName) breadcrumbItems.push({
      name: roleName,
      item: absUrl(`/industry/${role}`)
    });
    if (city !== "all") breadcrumbItems.push({
      name: city,
      item: absUrl(path2)
    });
    const ldJson = {
      "@context": "https://schema.org",
      "@graph": [{
        "@type": "WebPage",
        "@id": absUrl(path2),
        url: absUrl(path2),
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: {
          "@type": "WebSite",
          name: "Arzon Global",
          url: absUrl("/")
        },
        about: {
          "@type": "Thing",
          name: roleName ? `${roleName} employers` : "Healthcare & pharma employers"
        },
        ...city !== "all" && {
          spatialCoverage: {
            "@type": "Place",
            name: `${city}, India`
          }
        },
        ...tier !== "all" && {
          audience: {
            "@type": "Audience",
            audienceType: `${tier} employers`
          }
        }
      }, {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.item
        }))
      }]
    };
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(ldJson)
      }]
    };
  }
});
const $$splitComponentImporter$10 = () => import("./industry.compare-DKKJIoWx.mjs");
const Route$1i = createFileRoute("/industry/compare")({
  component: lazyRouteComponent($$splitComponentImporter$10, "component"),
  head: () => {
    const ps = pageSeo({
      path: "/industry/compare",
      title: "PV vs Coding vs CDM vs RA vs AI Health — compare careers",
      description: "Side-by-side comparison of healthcare careers in India: pay ranges, demand, AI risk, work mode, abroad markets and top employers. JD-derived, refreshed quarterly."
    });
    return {
      meta: [{
        title: "Compare healthcare careers — PV, Coding, CDM, RA, AI Health"
      }, ...ps.meta],
      links: ps.links
    };
  }
});
const $$splitComponentImporter$$ = () => import("./industry._role-D0Vyl7Io.mjs");
const Route$1h = createFileRoute("/industry/$role")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400"
    };
  },
  loader: ({
    params
  }) => {
    const role = ROLES_BY_SLUG[params.role];
    if (!role) throw notFound();
    return role;
  },
  head: ({
    loaderData,
    params
  }) => {
    if (!loaderData) return {};
    const title = `${loaderData.name} salary, roles, employers, India 2026`;
    const description = `${loaderData.tagline} Pay bands by city, top employers, career ladder, abroad opportunities. Sourced quarterly.`;
    const ps = pageSeo({
      path: `/industry/${params.role}`,
      title,
      description,
      ogType: "article"
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          datePublished: "2025-11-01",
          dateModified: "2026-07-22",
          author: {
            "@type": "Organization",
            name: "Arzon Global"
          }
        })
      }, {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: loaderData.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a
            }
          }))
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$$, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh motion-safe:animate-pulse bg-[#070A14] px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-32 rounded bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-10 w-2/3 rounded-xl bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-4 w-full max-w-xl rounded bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 rounded-2xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-2xl bg-white/5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-2xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-2xl bg-white/5" })
      ] })
    ] })
  ] }) })
});
const $$splitErrorComponentImporter$5 = () => import("./enrol.success-Cj3x0FL5.mjs");
const $$splitComponentImporter$_ = () => import("./enrol.success-BDfDqvFW.mjs");
const search$2 = objectType({
  intent: stringType().uuid().optional(),
  t: stringType().min(16).max(64).optional()
});
const Route$1g = createFileRoute("/enrol/success")({
  validateSearch: (s) => search$2.parse(s),
  loader: async ({
    location: location2
  }) => {
    const {
      intent,
      t
    } = search$2.parse(location2.search);
    if (!intent || !t) return null;
    try {
      return await getEnrolmentIntent({
        data: {
          intentId: intent,
          intentToken: t
        }
      });
    } catch {
      return null;
    }
  },
  head: () => ({
    meta: [{
      title: "Enrolment Confirmed · Arzon Global"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$_, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen editorial-page-bg px-5 py-24 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-2xl h-[400px] editorial-card bg-white/80" }) }),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$5, "errorComponent")
});
const $$splitErrorComponentImporter$4 = () => import("./enrol._tier-DhO6ew-S.mjs");
const $$splitComponentImporter$Z = () => import("./enrol._tier-BuMhlSvw.mjs");
const Route$1f = createFileRoute("/enrol/$tier")({
  beforeLoad: ({
    params
  }) => {
    if (!isTier(params.tier)) throw notFound();
  },
  head: () => ({
    meta: [{
      title: "Complete your enrolment · Arzon Global"
    }, {
      name: "description",
      content: "Enter your details to enrol in an Arzon Global programme."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$Z, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$4, "errorComponent")
});
const $$splitComponentImporter$Y = () => import("./employer.login-vTIGDZPI.mjs");
const Route$1e = createFileRoute("/employer/login")({
  head: () => ({
    meta: [{
      title: "Employer sign in · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }, {
      name: "description",
      content: "Verified employer sign in for the Arzon hiring console. Manage roles, shortlists, and submit signed placement evidence."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$Y, "component")
});
function redactEmail$1(email) {
  if (!email) return "***";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  return `${localPart[0]}***@${domain}`;
}
const Route$1d = createFileRoute("/email/unsubscribe")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const supabaseUrl = "https://grcmczxdcssroeljrygv.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseServiceKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const url = new URL(request.url);
        const token = url.searchParams.get("token");
        if (!token) {
          return Response.json({ error: "Token is required" }, { status: 400 });
        }
        const supabase2 = createClient(supabaseUrl, supabaseServiceKey);
        const { data: tokenRecord, error: lookupError } = await supabase2.from("email_unsubscribe_tokens").select("*").eq("token", token).maybeSingle();
        if (lookupError || !tokenRecord) {
          return Response.json({ error: "Invalid or expired token" }, { status: 404 });
        }
        if (tokenRecord.used_at) {
          return Response.json({ valid: false, reason: "already_unsubscribed" });
        }
        return Response.json({ valid: true });
      },
      POST: async ({ request }) => {
        const supabaseUrl = "https://grcmczxdcssroeljrygv.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseServiceKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const url = new URL(request.url);
        let token = url.searchParams.get("token");
        const contentType = request.headers.get("content-type") ?? "";
        if (contentType.includes("application/x-www-form-urlencoded")) {
          const formText = await request.text();
          const params = new URLSearchParams(formText);
          if (!params.get("List-Unsubscribe")) {
            const formToken = params.get("token");
            if (formToken) {
              token = formToken;
            }
          }
        } else {
          try {
            const body = await request.json();
            if (body.token) {
              token = body.token;
            }
          } catch {
          }
        }
        if (!token) {
          return Response.json({ error: "Token is required" }, { status: 400 });
        }
        const supabase2 = createClient(supabaseUrl, supabaseServiceKey);
        const { data: tokenRecord, error: lookupError } = await supabase2.from("email_unsubscribe_tokens").select("*").eq("token", token).maybeSingle();
        if (lookupError || !tokenRecord) {
          return Response.json({ error: "Invalid or expired token" }, { status: 404 });
        }
        if (tokenRecord.used_at) {
          return Response.json({ success: false, reason: "already_unsubscribed" });
        }
        const { data: updated, error: updateError } = await supabase2.from("email_unsubscribe_tokens").update({ used_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("token", token).is("used_at", null).select().maybeSingle();
        if (updateError) {
          console.error("Failed to mark token as used", { error: updateError, token });
          return Response.json({ error: "Failed to process unsubscribe" }, { status: 500 });
        }
        if (!updated) {
          return Response.json({ success: false, reason: "already_unsubscribed" });
        }
        const { error: suppressError } = await supabase2.from("suppressed_emails").upsert(
          { email: tokenRecord.email.toLowerCase(), reason: "unsubscribe" },
          { onConflict: "email" }
        );
        if (suppressError) {
          console.error("Failed to suppress email", {
            error: suppressError,
            email_redacted: redactEmail$1(tokenRecord.email)
          });
          return Response.json({ error: "Failed to process unsubscribe" }, { status: 500 });
        }
        console.log("Email unsubscribed", {
          email_redacted: redactEmail$1(tokenRecord.email)
        });
        return Response.json({ success: true });
      }
    }
  }
});
const $$splitComponentImporter$X = () => import("./dev.cards-vQt2gsT7.mjs");
const Route$1c = createFileRoute("/dev/cards")({
  head: () => ({
    meta: [{
      title: "Dev · Result Cards Harness"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$X, "component")
});
const $$splitComponentImporter$W = () => import("./courses.compare-BEPEQKz8.mjs");
const Route$1b = createFileRoute("/courses/compare")({
  head: () => {
    const ps = pageSeo({
      path: "/courses/compare",
      title: "Compare Arzon Careers vs typical online courses",
      description: "Compare Arzon Careers vs generic ed-tech and YouTube self-study for healthcare workforce readiness.",
      image: "/og/internships.jpg"
    });
    return {
      meta: [{
        title: "Compare Arzon Careers vs typical online courses"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$W, "component")
});
const RULE = "var(--border)";
const SURFACE = "var(--muted)";
const RISK_BY_SLUG = {
  "medical-coding": "augmented",
  pharmacovigilance: "augmented",
  "clinical-data-management": "audit",
  "sas-clinical": "audit",
  "regulatory-affairs": "audit",
  nanoscience: "resistant",
  "ai-intelligence": "resistant",
  "machine-learning": "resistant",
  "ethical-hacking": "resistant",
  "full-stack": "augmented",
  "data-science": "augmented"
};
const RISK_LABEL = {
  augmented: "AI-augmented role",
  audit: "AI-audit role",
  resistant: "AI-resistant role"
};
const RISK_TONE = {
  augmented: "border-amber-500/60 bg-amber-500 text-[#1a1300]",
  audit: "border-sky-700/40 bg-sky-600 text-white",
  resistant: "border-sky-700/40 bg-sky-600 text-white"
};
function getAIRisk(course) {
  return course.aiRisk ?? RISK_BY_SLUG[course.slug] ?? "augmented";
}
function aiRiskMeta(risk) {
  return { label: RISK_LABEL[risk], tone: RISK_TONE[risk] };
}
function getSalaryBand(course) {
  if (course.salaryYear1 && course.salaryYear3) {
    return { y1: course.salaryYear1, y3: course.salaryYear3 };
  }
  const m = course.jd.salary.match(/₹\s*([\d.]+)\s*[–\-]\s*([\d.]+)\s*LPA/i);
  if (!m) return { y1: course.jd.salary, y3: course.jd.salary };
  return { y1: `₹${m[1]} LPA`, y3: `₹${m[2]} LPA` };
}
function getLastBatch(course) {
  return course.lastBatch ?? { placed: 23, total: 28 };
}
const INSTRUCTORS = {
  "Pharmacy & Life Sciences": {
    name: "Dr. Meera Krishnan",
    title: "Lead Mentor · ex-IQVIA · 14 yrs in PV / CDM",
    bio: "Built PV teams at two CROs, audited by FDA twice. Trains the cohort directly through W6, then hands off to specialty mentors.",
    initials: "MK"
  },
  "Tech Programmes": {
    name: "Arjun Reddy",
    title: "Lead Mentor · ex-Razorpay · Staff Engineer",
    bio: "9 years shipping production systems. Built the payments infra at a unicorn. Reviews every capstone personally.",
    initials: "AR"
  },
  "Commerce & Marketing": {
    name: "Sneha Iyer",
    title: "Lead Mentor · ex-Deloitte Strategy",
    bio: "Ran growth + analytics at two D2C brands before consulting. Capstones are graded against real client briefs.",
    initials: "SI"
  }
};
const PREREQ_BY_CATEGORY = {
  "Pharmacy & Life Sciences": [
    "Any life-sciences / pharmacy / nursing / BDS / medicine background (final-year ok)",
    "Comfortable reading English-language clinical text",
    "Laptop with Chrome + 8 GB RAM"
  ],
  "Tech Programmes": [
    "Comfort with at least one programming language (any)",
    "Laptop with 16 GB RAM recommended",
    "Reliable internet for live sessions"
  ],
  "Commerce & Marketing": [
    "Any graduation stream (commerce/arts/engineering all welcome)",
    "Working knowledge of Excel basics",
    "Laptop + stable internet"
  ]
};
function makeOutcomes(course) {
  const skills = course.jd.topSkills.slice(0, 3);
  const tools = course.tools.slice(0, 2).join(" + ");
  const employer = course.jd.sampleEmployers[0] ?? "a top employer";
  return [
    `Apply ${skills[0]?.toLowerCase()} to production-grade tasks`,
    `Use ${tools} the way ${employer} actually uses them`,
    `Ship the capstone: ${course.projects.major.split(",")[0]}`,
    `Walk into interviews with a verifiable certificate, project letter & 3 work samples`,
    `Speak the language of ${course.jd.hiringRoles[0] ?? "the role"} JDs fluently`
  ];
}
function makeFAQ(course) {
  return [
    {
      q: `Is this ${course.title} programme suitable for freshers?`,
      a: `Yes. The first two weeks are foundational, we don't assume prior ${course.category.toLowerCase()} experience. By W4 you'll be working on real data.`
    },
    {
      q: "Do I get a job guarantee?",
      a: "No. Anyone promising guaranteed jobs is breaking ASCI guidelines. We guarantee live mentoring, real-data work from 100–200 live Indian JDs, a verifiable certificate, and structured interview access with our hiring partners."
    },
    {
      q: "How are sessions delivered?",
      a: "Live cohort calls 3 evenings a week (90 min each), recordings within 12 hours, async Slack with mentor SLA of 1 hour during cohort hours. The browser-based player tracks your progress."
    },
    {
      q: "What if I miss a live session?",
      a: "Recordings are available the same day. You can mark lessons complete in the player and submit assignments asynchronously. Mentors do weekend office hours for catch-up."
    },
    {
      q: "What does the certificate actually say?",
      a: `It states you completed the structured 12-week internship in ${course.title}, all six modules, the capstone, and met our performance bar. It carries a unique ID + QR code that resolves on /verify. Try the sample on the certificate page.`
    },
    {
      q: "How does payment work?",
      a: "A ₹999 seat fee locks your spot; the remaining balance is paid directly before your cohort starts. We do not offer consumer EMI financing or hidden loan traps."
    }
  ];
}
const META_CACHE = /* @__PURE__ */ new WeakMap();
function getCourseMeta(course) {
  const cached = META_CACHE.get(course);
  if (cached) return cached;
  const weeklyHours = course.category === "Tech Programmes" ? 12 : course.category === "Pharmacy & Life Sciences" ? 10 : 9;
  const lastBatch = getLastBatch(course);
  const meta = {
    outcomes: makeOutcomes(course),
    prerequisites: PREREQ_BY_CATEGORY[course.category] ?? [],
    weeklyHours,
    totalHours: weeklyHours * 12,
    cohortSize: 28,
    instructor: INSTRUCTORS[course.category] ?? INSTRUCTORS["Tech Programmes"],
    capstoneStats: {
      shipped: lastBatch.placed,
      total: lastBatch.total,
      avgScore: 84
    },
    faq: makeFAQ(course),
    difficulty: course.category === "Tech Programmes" ? 4 : course.category === "Pharmacy & Life Sciences" ? 3 : 3,
    bestFor: bestForLine(course)
  };
  META_CACHE.set(course, meta);
  return meta;
}
function bestForLine(course) {
  const role = course.jd.hiringRoles[0] ?? "an entry-level role";
  return `Best for: students aiming for ${role.toLowerCase()} in the next 6 months.`;
}
const COURSE_SEO_BOOST = {
  pharmacovigilance: {
    title: "Pharmacovigilance Course in Hyderabad · Arzon Global",
    description: "Pharmacovigilance internship & course with Argus, MedDRA, ICSR cases and an ISO-aligned verifiable certificate. 12-week cohort. Hyderabad + online.",
    h1: "Pharmacovigilance Course & Internship in Hyderabad",
    keywords: [
      "pharmacovigilance internship",
      "pharmacovigilance course in Hyderabad",
      "best pharmacovigilance training institute in India",
      "pharmacovigilance jobs in Hyderabad",
      "Argus Safety training",
      "ICSR case processing course"
    ]
  },
  "medical-coding": {
    title: "Medical Coding Course in Hyderabad · CPC Prep · Arzon",
    description: "Medical coding internship covering ICD-10-CM, CPT, HCPCS and CPC exam prep. 12-week cohort, capstone audit, verifiable certificate. Hyderabad + online.",
    h1: "Medical Coding Course & Internship in Hyderabad (CPC Prep)",
    keywords: [
      "medical coding internship",
      "medical coding course in Hyderabad",
      "medical coding jobs for freshers",
      "medical coding salary in India",
      "CPC certification training",
      "ICD-10-CM and CPT coding course"
    ]
  },
  "clinical-data-management": {
    title: "Clinical Data Management Course · Rave / Veeva · Arzon",
    description: "Clinical data management internship with Medidata Rave, Veeva, CDASH and SDTM exposure. 12-week cohort, real study build, verifiable certificate.",
    h1: "Clinical Data Management Course & Internship (Rave / Veeva)",
    keywords: [
      "clinical data management internship",
      "clinical data management course",
      "clinical data management jobs in Bangalore",
      "Medidata Rave training",
      "Veeva clinical data course",
      "CDISC SDTM training India"
    ]
  },
  "regulatory-affairs": {
    title: "Regulatory Affairs Course India · eCTD · Arzon Global",
    description: "Pharmaceutical regulatory affairs course covering FDA, EMA, CDSCO pathways and eCTD dossier building. 12-week cohort with verifiable certificate.",
    h1: "Pharmaceutical Regulatory Affairs Course (India)",
    keywords: [
      "regulatory affairs course India",
      "pharmaceutical regulatory affairs training",
      "eCTD dossier course",
      "regulatory affairs jobs for freshers"
    ]
  },
  "sas-clinical": {
    title: "SAS Clinical Programming Course · SDTM/ADaM · Arzon",
    description: "SAS clinical programming course with Base SAS, macros, SDTM, ADaM and TLF authoring for clinical submissions. 12-week cohort, verifiable certificate.",
    h1: "SAS Clinical Programming Course (SDTM, ADaM, TLF)",
    keywords: [
      "SAS clinical programming course",
      "SDTM ADaM training",
      "SAS programmer course India"
    ]
  }
};
const $$splitComponentImporter$V = () => import("./courses._slug-D7ZQs2Hk.mjs");
const $$splitErrorComponentImporter$3 = () => import("./courses._slug-CiME5-Mv.mjs");
const $$splitNotFoundComponentImporter$3 = () => import("./courses._slug-DOGxoKhn.mjs");
const Route$1a = createFileRoute("/courses/$slug")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400"
    };
  },
  loader: ({
    params
  }) => {
    const course = COURSES_BY_SLUG[params.slug];
    if (!course) throw notFound();
    return {
      slug: course.slug
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) return {};
    const path2 = `/courses/${loaderData.slug}`;
    const fullCourse = COURSES_BY_SLUG[loaderData.slug];
    if (!fullCourse) return {};
    const loaded = fullCourse;
    const boost = COURSE_SEO_BOOST[loaderData.slug];
    const title = boost?.title ?? `${loaded.title} · Arzon Global`;
    const description = boost?.description ?? loaded.blurb;
    const image = thumbFor(loaderData.slug, loaded.category);
    const ps = pageSeo({
      path: path2,
      title,
      description,
      image,
      ogType: "website"
    });
    const rich = getCourseMeta(loaded);
    const startISO = NEXT_COHORT.startsISO;
    const endISO = new Date(new Date(startISO).getTime() + 84 * 24 * 60 * 60 * 1e3).toISOString();
    const absImage = absUrl(image);
    const provider = {
      "@type": "EducationalOrganization",
      name: "Arzon Global",
      url: SITE.origin,
      logo: absUrl("/brand/arzon-logo.jpg"),
      sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website]
    };
    return {
      meta: [{
        title
      }, ...boost?.keywords?.length ? [{
        name: "keywords",
        content: boost.keywords.join(", ")
      }] : [], ...ps.meta],
      links: ps.links,
      scripts: [{
        // Course schema, eligible for Google's "Courses" rich result.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: loaded.title,
          description: loaded.blurb,
          provider,
          image: absImage,
          url: absUrl(path2),
          inLanguage: "en-IN",
          about: loaded.category,
          teaches: loaded.jd.topSkills,
          coursePrerequisites: rich.prerequisites,
          educationalCredentialAwarded: {
            "@type": "EducationalOccupationalCredential",
            name: `${loaded.title} — ISO-certified Internship Completion Certificate`,
            credentialCategory: "Certificate",
            recognizedBy: {
              "@type": "Organization",
              name: "Arzon Global"
            },
            url: absUrl(`/certificates/sample/${loaderData.slug}`)
          },
          audience: {
            "@type": "EducationalAudience",
            educationalRole: "student",
            audienceType: rich.bestFor
          },
          offers: {
            "@type": "Offer",
            category: "Paid",
            priceCurrency: "INR",
            price: String(SEAT_FEE_AMOUNT),
            availability: "https://schema.org/InStock",
            url: absUrl(path2),
            validFrom: (/* @__PURE__ */ new Date()).toISOString(),
            priceValidUntil: NEXT_COHORT.applicationsCloseISO
          },
          hasCourseInstance: {
            "@type": "CourseInstance",
            name: `${loaded.title} · ${NEXT_COHORT.label} cohort`,
            courseMode: "Blended",
            courseWorkload: "PT12W",
            location: {
              "@type": "Place",
              name: "Online + Hyderabad",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN"
              }
            },
            startDate: startISO,
            endDate: endISO,
            instructor: {
              "@type": "Person",
              name: rich.instructor.name,
              jobTitle: rich.instructor.title,
              description: rich.instructor.bio
            },
            offers: {
              "@type": "Offer",
              category: "Paid",
              priceCurrency: "INR",
              price: String(SEAT_FEE_AMOUNT),
              availability: "https://schema.org/InStock",
              url: absUrl(path2)
            }
          }
        })
      }, {
        // EducationalOccupationalProgram → internship rich result.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOccupationalProgram",
          programType: "Internship",
          name: `${loaded.title} · 12-week Industry Internship`,
          description: `${loaded.blurb} Structured 12-week, ${rich.weeklyHours} hrs/week internship with live mentoring, real-data work, capstone, and an ISO-certified completion certificate.`,
          url: absUrl(path2),
          provider,
          educationalProgramMode: "Blended",
          timeOfDay: "Evening",
          timeToComplete: "P12W",
          startDate: startISO,
          endDate: endISO,
          applicationStartDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
          applicationDeadline: NEXT_COHORT.applicationsCloseISO,
          occupationalCategory: loaded.jd.hiringRoles,
          programPrerequisites: rich.prerequisites,
          numberOfCredits: rich.totalHours,
          educationalCredentialAwarded: {
            "@type": "EducationalOccupationalCredential",
            name: `${loaded.title} — ISO-certified Internship Completion Certificate`,
            credentialCategory: "Certificate",
            url: absUrl(`/certificates/sample/${loaderData.slug}`)
          },
          offers: {
            "@type": "Offer",
            category: "Paid",
            priceCurrency: "INR",
            price: String(SEAT_FEE_AMOUNT),
            availability: "https://schema.org/InStock",
            url: absUrl(path2)
          },
          inLanguage: "en-IN"
        })
      }, {
        // Breadcrumb trail: Home → Programmes → This course.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE.origin
          }, {
            "@type": "ListItem",
            position: 2,
            name: "Programmes",
            item: absUrl("/courses")
          }, {
            "@type": "ListItem",
            position: 3,
            name: loaded.title,
            item: absUrl(path2)
          }]
        })
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$3, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$V, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen animate-pulse", style: {
    background: SURFACE
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full", style: {
      background: RULE
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_380px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 rounded", style: {
          background: RULE
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-3/4 rounded-lg", style: {
          background: RULE
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full rounded", style: {
          background: RULE
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-5/6 rounded", style: {
          background: RULE
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pt-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-24 rounded-full", style: {
          background: RULE
        } }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 rounded-2xl", style: {
          background: RULE
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-2xl", style: {
          background: RULE
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 rounded-2xl", style: {
          background: RULE
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl", style: {
          background: RULE
        } })
      ] })
    ] }) })
  ] })
});
const $$splitComponentImporter$U = () => import("./checkin._token-BwL9jR7j.mjs");
const Route$19 = createFileRoute("/checkin/$token")({
  validateSearch: (s) => ({
    left: typeof s.left === "string" ? s.left : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$U, "component")
});
const $$splitComponentImporter$T = () => import("./career-engine.test-Cc3-FGQo.mjs");
const Route$18 = createFileRoute("/career-engine/test")({
  // Open route: anyone can take the test. PII is collected on /lead *after*
  // they see value (their result). This is the "value-first" funnel.
  head: () => ({
    meta: [{
      title: "Career test. Arzon Career Engine"
    }, {
      name: "description",
      content: "40 quick questions to find your healthcare career fit."
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$T, "component")
});
const $$splitComponentImporter$S = () => import("./career-engine.start-DMhxLlvO.mjs");
const Route$17 = createFileRoute("/career-engine/start")({
  head: () => ({
    meta: [{
      title: "Begin Readiness Assessment · ACRI Preview · Arzon"
    }, {
      name: "description",
      content: "Where should we send your free personalised healthcare career report?"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$S, "component")
});
function CareerShell({
  children,
  chrome = "default"
}) {
  const isBrief = chrome === "brief";
  const isReport = chrome === "report";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative min-h-screen pb-4 sm:pb-6 bg-[#000000] text-white tone-dark selection:bg-sky-500 selection:text-white overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pointer-events-none fixed inset-0 z-0 opacity-80",
        style: {
          background: `
            radial-gradient(ellipse 90% 55% at 50% -10%, rgba(56, 189, 248, 0.26), rgba(2, 132, 199, 0.1) 50%, rgba(0, 0, 0, 0) 100%),
            radial-gradient(ellipse 70% 40% at 50% 105%, rgba(56, 189, 248, 0.18), rgba(0, 0, 0, 0) 80%),
            radial-gradient(ellipse 35% 50% at 0% 35%, rgba(56, 189, 248, 0.12), transparent 70%),
            radial-gradient(ellipse 35% 50% at 100% 35%, rgba(56, 189, 248, 0.12), transparent 70%)
          `
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-2xl shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: isReport ? "mx-auto flex max-w-[1520px] items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8" : "mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "group inline-flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(56,189,248,0.2)] transition hover:border-sky-400/50 hover:bg-sky-500/20 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4.5 w-4.5 text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)] animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-sky-100 to-sky-400 bg-clip-text text-transparent", children: [
                  "Arzon",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-sky-400 font-medium tracking-normal font-grotesk text-sm ml-1", children: isReport ? "Career Fit Report" : isBrief ? "Career Brief" : "Career Engine" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-sky-200 sm:inline-flex bg-sky-500/10 border border-sky-500/30 px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.15)] font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-sky-400" }),
            " ISO 9001 · MSME · MCA VERIFIED"
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: isReport ? "relative z-10 mx-auto max-w-[1520px] px-4 pt-4 pb-12 sm:px-6 sm:pt-6 lg:px-8 flex-1" : isBrief ? "relative z-10 mx-auto max-w-3xl px-4 pt-4 pb-12 sm:pt-6 flex-1" : "relative z-10 mx-auto max-w-3xl px-4 pt-3 sm:pt-4 flex-1 flex flex-col justify-center",
        children
      }
    )
  ] });
}
const ifStream = (...streams) => (a) => streams.includes(a.stream);
const QUESTIONS = [
  // ─────────────────────────────────────────────
  // PROFILE (5) — always shown, fixed order
  // ─────────────────────────────────────────────
  {
    id: "stream",
    kind: "profile",
    prompt: "Quick start: what did you study in 11th & 12th?",
    helper: "We use this to personalise the rest of the test.",
    required: true,
    options: [
      { value: "MPC", label: "MPC (Maths, Physics, Chemistry)" },
      { value: "BiPC", label: "BiPC (Biology, Physics, Chemistry)" },
      { value: "Commerce", label: "Commerce / CEC / MEC" },
      { value: "Arts", label: "Arts / Humanities" }
    ]
  },
  {
    id: "year",
    kind: "profile",
    prompt: "Where are you in your degree right now?",
    options: [
      { value: "1", label: "1st year" },
      { value: "2", label: "2nd year" },
      { value: "3", label: "3rd year" },
      { value: "4", label: "Final year" },
      { value: "graduated", label: "Already graduated" }
    ]
  },
  {
    id: "course",
    kind: "profile",
    prompt: "Your degree?",
    options: [
      { value: "pharma", label: "B.Pharm / Pharm.D" },
      { value: "lifesci", label: "B.Sc Life Sciences / Biotech / Microbiology" },
      { value: "med", label: "BDS / BHMS / BAMS / Nursing / Physio" },
      { value: "engg", label: "B.Tech / B.E (any branch)" },
      { value: "comm", label: "B.Com / BBA / BMS" },
      { value: "agri", label: "B.Sc Agri / B.Tech Agri / Horticulture / Vet" },
      { value: "arts", label: "BA / Other" }
    ]
  },
  {
    id: "college_name",
    kind: "profile",
    prompt: "Which college or university are you currently attending or graduated from?",
    helper: "Type your college or university name (e.g. Osmania University, JNTUH, Andhra University, NIPER, SRM, etc.)",
    inputType: "text",
    placeholder: "e.g. St. Pauls College of Pharmacy / JNTU Hyderabad",
    options: []
  },
  {
    id: "candidate_info",
    kind: "profile",
    prompt: "Enter your contact details so we can save & personalize your verified Career Fit Dossier",
    helper: "Your dossier & verified fit score will be generated for this profile.",
    inputType: "candidate_info",
    options: []
  },
  {
    id: "city",
    kind: "profile",
    prompt: "Where do you live right now?",
    options: [
      { value: "metro", label: "Metro (Hyd / Blr / Mum / Del / Chn / Pun)" },
      { value: "tier2", label: "Tier-2 city" },
      { value: "town", label: "Smaller town / village" }
    ]
  },
  {
    id: "english_self",
    kind: "profile",
    prompt: "Honestly — how comfortable are you reading English at work-pace?",
    helper: "This is just self-rating; we'll also test it in 2 questions.",
    options: [
      { value: "fluent", label: "Fluent. I think in English", weights: { language: 2 } },
      { value: "good", label: "Good. Slow with technical text", weights: { language: 1 } },
      { value: "okay", label: "Okay. Need to re-read often" },
      { value: "weak", label: "Weak. I'd struggle", weights: { language: -2 } }
    ]
  },
  // ─────────────────────────────────────────────
  // SCENARIO (50) — forced-choice, every option plausible
  // ─────────────────────────────────────────────
  {
    id: "saturday",
    kind: "scenario",
    prompt: "It's a free Saturday. You'd genuinely rather…",
    options: [
      {
        value: "course",
        label: "Finish the online course I started",
        weights: { detail: 2, compliance: 1, screen: 1 }
      },
      { value: "movie", label: "Meet friends, watch a movie", weights: { sales: 2, empathy: 1 } },
      {
        value: "help",
        label: "Help a relative with something they're stuck on",
        weights: { patient: 3, empathy: 3 }
      },
      {
        value: "tinker",
        label: "Tinker with a side-project on my laptop",
        weights: { tech: 3, logic: 2 }
      }
    ]
  },
  {
    id: "evening_6pm",
    kind: "scenario",
    prompt: "It's 6 pm. Three things landed at once. Which do you reach for first?",
    helper: "All three are real jobs. Pick what you'd actually pick.",
    options: [
      {
        value: "doc",
        label: "Finish a 12-page report due tomorrow",
        weights: { compliance: 3, writing: 2, pressure: 2 }
      },
      {
        value: "calls",
        label: "Call back 4 anxious customers still waiting",
        weights: { patient: 3, empathy: 2, sales: 1 }
      },
      {
        value: "debug",
        label: "Debug a script that failed all afternoon",
        weights: { tech: 3, logic: 2, pressure: 1 }
      },
      {
        value: "review",
        label: "Review 30 forms for typos",
        weights: { detail: 3, compliance: 2, screen: 1 }
      }
    ]
  },
  {
    id: "team_role",
    kind: "scenario",
    prompt: "In a 5-person project, you naturally end up as…",
    options: [
      { value: "lead", label: "The one running the meeting", weights: { sales: 3, pressure: 1 } },
      {
        value: "doc",
        label: "The one writing the doc nobody else wants to",
        weights: { writing: 3, detail: 2, compliance: 1 }
      },
      {
        value: "build",
        label: "The one actually building the thing",
        weights: { tech: 2, logic: 2 }
      },
      {
        value: "qc",
        label: "The one checking the others' work",
        weights: { detail: 3, compliance: 2 }
      }
    ]
  },
  {
    id: "boring_part",
    kind: "scenario",
    prompt: "Every job has a boring part. Which boring part could you actually live with?",
    options: [
      {
        value: "forms",
        label: "Filling repetitive forms for hours",
        weights: { detail: 3, compliance: 2, screen: 2 }
      },
      {
        value: "calls",
        label: "Same 20 phone calls every morning",
        weights: { sales: 3, patient: 1, pressure: 1 }
      },
      {
        value: "code",
        label: "Staring at one buggy line of code",
        weights: { tech: 3, logic: 2, pressure: 1 }
      },
      {
        value: "specs",
        label: "Reading 80-page regulatory specs",
        weights: { compliance: 3, language: 2, writing: 1 }
      }
    ]
  },
  {
    id: "mistake_costs",
    kind: "scenario",
    prompt: "Which mistake would bother you the most if it happened on your watch?",
    options: [
      {
        value: "patient",
        label: "A patient got the wrong dose",
        weights: { empathy: 3, patient: 2, compliance: 1 }
      },
      {
        value: "audit",
        label: "A regulator flagged your submission",
        weights: { compliance: 3, pressure: 2, detail: 1 }
      },
      {
        value: "data",
        label: "A data error skewed the trial result",
        weights: { data: 3, detail: 2, logic: 1 }
      },
      {
        value: "deadline",
        label: "Your team missed a launch deadline",
        weights: { sales: 2, pressure: 2 }
      }
    ]
  },
  {
    id: "salary_vs",
    kind: "scenario",
    prompt: "Two job offers, same date. You'd pick…",
    options: [
      {
        value: "high_alone",
        label: "₹7 LPA, work alone from laptop, US night shift",
        weights: { tech: 2, screen: 2, pressure: 1 }
      },
      {
        value: "mid_team",
        label: "₹5 LPA, office team, day shift, lots of process",
        weights: { compliance: 2, sales: 1, detail: 1 }
      },
      {
        value: "low_purpose",
        label: "₹4 LPA, hospital-based, see patients daily",
        weights: { patient: 3, empathy: 2 }
      },
      {
        value: "mid_lead",
        label: "₹5.5 LPA, client-facing, frequent travel",
        weights: { sales: 3, pressure: 1 }
      }
    ]
  },
  {
    id: "feedback",
    kind: "scenario",
    prompt: "Your manager says your work has 3 errors per page. You think…",
    options: [
      {
        value: "fix",
        label: "Fair. I'll build a checklist so it doesn't repeat",
        weights: { compliance: 3, detail: 2, logic: 1 }
      },
      {
        value: "tool",
        label: "I should automate the repetitive part",
        weights: { tech: 2, logic: 2 }
      },
      {
        value: "ask",
        label: "Let me sit with someone who does it well",
        weights: { sales: 1, empathy: 1, patient: 1 }
      },
      {
        value: "push",
        label: "The volume was too high, push back on workload",
        weights: { pressure: -1, sales: 1 }
      }
    ]
  },
  {
    id: "long_doc",
    kind: "scenario",
    prompt: "A 60-page PDF lands in your inbox. Realistically, you…",
    options: [
      {
        value: "read",
        label: "Read it cover-to-cover with notes",
        weights: { language: 3, writing: 2, screen: 2, detail: 1 }
      },
      {
        value: "skim",
        label: "Skim, then deep-dive on 2 sections",
        weights: { language: 1, logic: 1 }
      },
      { value: "summary", label: "Ask AI for a summary first", weights: { tech: 2, logic: 1 } },
      {
        value: "avoid",
        label: "Ask if there's a video version",
        weights: { language: -1, screen: -1, sales: 1 }
      }
    ]
  },
  {
    id: "stranger_call",
    kind: "scenario",
    prompt: "A 10-minute phone call with a stranger feels…",
    options: [
      {
        value: "easy",
        label: "Easy. I do it without thinking",
        weights: { sales: 3, patient: 2, empathy: 1 }
      },
      {
        value: "warm",
        label: "Fine if I can prepare what to say",
        weights: { sales: 1, patient: 1 }
      },
      {
        value: "drain",
        label: "Drains me even if it goes well",
        weights: { sales: -1, screen: 1, detail: 1 }
      },
      { value: "avoid", label: "I'd rather text", weights: { sales: -2, tech: 1, screen: 1 } }
    ]
  },
  {
    id: "rules",
    kind: "scenario",
    prompt: "Your company adds 4 new SOPs this quarter. Honest reaction?",
    options: [
      { value: "good", label: "Good. Clearer is safer", weights: { compliance: 3, detail: 1 } },
      { value: "ok", label: "Fine, I'll follow them", weights: { compliance: 1 } },
      {
        value: "ugh",
        label: "More paperwork. Slows things down",
        weights: { compliance: -1, sales: 1 }
      },
      {
        value: "fight",
        label: "Half are pointless. I'd push back",
        weights: { compliance: -2, tech: 1, pressure: 1 }
      }
    ]
  },
  {
    id: "patient_story",
    kind: "scenario",
    prompt: "A patient cries while you're explaining their report. You…",
    streams: ["BiPC"],
    options: [
      {
        value: "stay",
        label: "Sit with them; the explanation can wait",
        weights: { empathy: 3, patient: 3 }
      },
      {
        value: "calm",
        label: "Hand them tissue, finish calmly, follow up",
        weights: { empathy: 2, patient: 2, pressure: 1 }
      },
      {
        value: "refer",
        label: "Refer to a counsellor — not my expertise",
        weights: { compliance: 1, empathy: 1 }
      },
      { value: "freeze", label: "Honestly, I'd freeze", weights: { patient: -2, empathy: -1 } }
    ]
  },
  {
    id: "weekend_job",
    kind: "scenario",
    prompt: "Pick the weekend gig you'd survive 6 months of:",
    options: [
      { value: "tutor", label: "Tutoring 1-on-1", weights: { patient: 2, empathy: 2, sales: 1 } },
      {
        value: "audit",
        label: "Counting inventory in a pharmacy",
        weights: { detail: 3, compliance: 2 }
      },
      { value: "shop", label: "Selling at a phone shop", weights: { sales: 3, pressure: 1 } },
      {
        value: "data",
        label: "Cleaning a 5,000-row Excel sheet",
        weights: { data: 3, screen: 2, detail: 1 }
      }
    ]
  },
  {
    id: "ai_relation",
    kind: "scenario",
    prompt: "Your honest relationship with AI tools (ChatGPT, Claude, etc.)?",
    options: [
      {
        value: "build",
        label: "I build small tools / agents with them",
        weights: { tech: 3, logic: 2 }
      },
      {
        value: "daily",
        label: "Daily — for studies and writing",
        weights: { tech: 1, language: 1 }
      },
      { value: "cheat", label: "I use it but feel it's cheating", weights: { compliance: 1 } },
      { value: "rare", label: "Rarely. I prefer my own brain", weights: { tech: -1, detail: 1 } }
    ]
  },
  {
    id: "clinic_chaos",
    kind: "scenario",
    prompt: "A clinic is overflowing — receptionist absent, billing broken, 3 vendors waiting. What do you do?",
    streams: ["BiPC"],
    options: [
      {
        value: "triage",
        label: "Triage: handle vendors first, then billing",
        weights: { sales: 3, pressure: 2, compliance: 1 }
      },
      {
        value: "fix",
        label: "Fix the billing system before it spreads",
        weights: { tech: 2, logic: 2, pressure: 1 }
      },
      {
        value: "patients",
        label: "Calm the patients in the waiting room",
        weights: { patient: 3, empathy: 2 }
      },
      {
        value: "leave",
        label: "Honestly, this is not my problem",
        weights: { sales: -2, pressure: -2 }
      }
    ]
  },
  {
    id: "first_hour",
    kind: "scenario",
    prompt: "First hour at a new desk job. You…",
    options: [
      {
        value: "sop",
        label: "Read the SOP folder end-to-end",
        weights: { compliance: 3, detail: 2, language: 1 }
      },
      { value: "ask", label: "Walk around and meet the team", weights: { sales: 2, empathy: 1 } },
      {
        value: "setup",
        label: "Set up tools, shortcuts, dashboards",
        weights: { tech: 2, data: 1, screen: 1 }
      },
      {
        value: "work",
        label: "Ask for the first ticket and start",
        weights: { pressure: 2, logic: 1 }
      }
    ]
  },
  {
    id: "quiet_room",
    kind: "scenario",
    prompt: "A perfectly quiet 2-hour block lands on your calendar. You'd spend it…",
    options: [
      {
        value: "review",
        label: "Reviewing 40 case files for accuracy",
        weights: { detail: 3, compliance: 1, screen: 1 }
      },
      {
        value: "model",
        label: "Building a small data model",
        weights: { data: 3, logic: 2, tech: 1 }
      },
      {
        value: "write",
        label: "Writing a clean report draft",
        weights: { writing: 3, language: 2 }
      },
      {
        value: "talk",
        label: "Calling 5 leads I've been putting off",
        weights: { sales: 3, pressure: 1 }
      }
    ]
  },
  {
    id: "messy_data",
    kind: "scenario",
    prompt: "Someone hands you a messy 3,000-row sheet and says 'find what's wrong'. You feel…",
    options: [
      {
        value: "excited",
        label: "Excited — this is fun",
        weights: { data: 3, detail: 2, logic: 1 }
      },
      { value: "ok", label: "Fine, I'll work through it", weights: { data: 1, detail: 1 } },
      {
        value: "delegate",
        label: "I'd rather brief someone else to do it",
        weights: { sales: 2, data: -1 }
      },
      { value: "no", label: "Honestly, I'd push back", weights: { data: -2, screen: -1 } }
    ]
  },
  {
    id: "vendor_pitch",
    kind: "scenario",
    prompt: "A vendor is pitching software for ₹12L/year. The team looks at you. You…",
    options: [
      {
        value: "ask",
        label: "Ask 5 hard questions before they finish",
        weights: { logic: 2, pressure: 2, sales: 1 }
      },
      {
        value: "trial",
        label: "Suggest a 30-day pilot with clear KPIs",
        weights: { compliance: 2, data: 2, logic: 1 }
      },
      { value: "build", label: "Wonder if we could just build it", weights: { tech: 3, logic: 1 } },
      {
        value: "go",
        label: "Trust it if the demo looked clean",
        weights: { sales: 1, compliance: -1 }
      }
    ]
  },
  {
    id: "spelling",
    kind: "scenario",
    prompt: "You spot a spelling error in a finalised drug-label PDF that already went out. You…",
    streams: ["BiPC"],
    options: [
      {
        value: "raise",
        label: "Raise it immediately, even if awkward",
        weights: { compliance: 3, detail: 3, pressure: 1 }
      },
      {
        value: "log",
        label: "Quietly log it for the next revision cycle",
        weights: { compliance: 1, detail: 2 }
      },
      { value: "ignore", label: "Ignore — too late now", weights: { compliance: -3, detail: -2 } },
      { value: "blame", label: "Find out who approved it", weights: { compliance: 1, sales: 1 } }
    ]
  },
  {
    id: "edge_case",
    kind: "scenario",
    prompt: "You find a weird edge case in trial data — 1 patient out of 800 with impossible vitals. You…",
    streams: ["BiPC", "MPC"],
    options: [
      {
        value: "investigate",
        label: "Stop and investigate before continuing",
        weights: { detail: 3, data: 2, compliance: 2 }
      },
      { value: "flag", label: "Flag in a comment, keep moving", weights: { detail: 1, data: 1 } },
      {
        value: "exclude",
        label: "Exclude as obvious data entry error",
        weights: { data: -1, compliance: -1 }
      },
      {
        value: "ask",
        label: "Bring it up in tomorrow's standup",
        weights: { sales: 1, empathy: 1 }
      }
    ]
  },
  {
    id: "deadline_slip",
    kind: "scenario",
    prompt: "Friday 5 pm. A submission is at 60% and due Monday 9 am. You…",
    options: [
      {
        value: "weekend",
        label: "Block the weekend, ship it clean",
        weights: { pressure: 3, compliance: 2, detail: 1 }
      },
      {
        value: "extend",
        label: "Negotiate a 1-day extension first",
        weights: { sales: 2, compliance: 1 }
      },
      {
        value: "team",
        label: "Pull 2 teammates in to parallelise",
        weights: { sales: 2, pressure: 2 }
      },
      { value: "panic", label: "Honestly — I'd panic", weights: { pressure: -2 } }
    ]
  },
  {
    id: "explain_it",
    kind: "scenario",
    prompt: "You have to explain a complex topic to a non-technical relative. You'd…",
    options: [
      {
        value: "story",
        label: "Tell a story they can relate to",
        weights: { empathy: 2, sales: 2, language: 1 }
      },
      { value: "draw", label: "Draw a quick diagram", weights: { logic: 2, writing: 1 } },
      {
        value: "tabs",
        label: "Send them 3 well-chosen articles",
        weights: { language: 2, writing: 2 }
      },
      {
        value: "skip",
        label: "Avoid — they won't get it anyway",
        weights: { empathy: -2, sales: -1 }
      }
    ]
  },
  {
    id: "mistake_self",
    kind: "scenario",
    prompt: "You sent the wrong file to a client at 11 pm. Realising it at 7 am, you…",
    options: [
      {
        value: "own",
        label: "Email them immediately, own it",
        weights: { compliance: 2, sales: 2, pressure: 2 }
      },
      {
        value: "boss",
        label: "Loop my manager first, then act",
        weights: { compliance: 2, detail: 1 }
      },
      {
        value: "fix",
        label: "Send the correct file with a quick note",
        weights: { sales: 2, pressure: 1 }
      },
      {
        value: "hope",
        label: "Hope they didn't open it yet",
        weights: { compliance: -3, pressure: -1 }
      }
    ]
  },
  {
    id: "shadow_doc",
    kind: "scenario",
    prompt: "On a shadow day, the most exciting room is…",
    streams: ["BiPC"],
    options: [
      {
        value: "icu",
        label: "ICU — patients, monitors, urgency",
        weights: { patient: 3, empathy: 2, pressure: 2 }
      },
      { value: "lab", label: "The clinical lab — assays running", weights: { lab: 3, detail: 2 } },
      {
        value: "room",
        label: "The data room — dashboards on screens",
        weights: { data: 3, screen: 2, logic: 1 }
      },
      {
        value: "office",
        label: "The compliance office — files, audits",
        weights: { compliance: 3, detail: 2 }
      }
    ]
  },
  {
    id: "side_hustle",
    kind: "scenario",
    prompt: "If you had to start a side project tomorrow, you'd…",
    options: [
      {
        value: "app",
        label: "Build a small app that solves something",
        weights: { tech: 3, logic: 2 }
      },
      { value: "blog", label: "Start a blog or newsletter", weights: { writing: 3, language: 2 } },
      { value: "tutor", label: "Tutor school kids", weights: { patient: 2, empathy: 2, sales: 1 } },
      { value: "shop", label: "Resell something online", weights: { sales: 3, pressure: 1 } }
    ]
  },
  {
    id: "messy_meeting",
    kind: "scenario",
    prompt: "A meeting is going in circles after 30 min. You…",
    options: [
      {
        value: "summarise",
        label: "Summarise the 3 decisions we need to make",
        weights: { logic: 2, sales: 2, writing: 1 }
      },
      { value: "wait", label: "Stay quiet, take notes", weights: { detail: 2, writing: 1 } },
      { value: "leave", label: "Excuse myself politely", weights: { compliance: -1, sales: 1 } },
      {
        value: "challenge",
        label: "Call out the one assumption everyone's made",
        weights: { logic: 3, pressure: 2 }
      }
    ]
  },
  {
    id: "perfection",
    kind: "scenario",
    prompt: "Your honest standard for 'good enough' work is…",
    options: [
      {
        value: "perfect",
        label: "Zero errors, even if it takes longer",
        weights: { detail: 3, compliance: 2, pressure: 1 }
      },
      {
        value: "ship",
        label: "Ship clean, fix in v2",
        weights: { tech: 2, pressure: 1, sales: 1 }
      },
      { value: "agreed", label: "Whatever the spec says, no more", weights: { compliance: 2 } },
      { value: "vibe", label: "Looks fine to me", weights: { detail: -2, compliance: -1 } }
    ]
  },
  {
    id: "morning",
    kind: "scenario",
    prompt: "Your most productive 2 hours of the day are typically…",
    options: [
      {
        value: "early",
        label: "Early morning, before anyone messages",
        weights: { detail: 2, screen: 1 }
      },
      { value: "midday", label: "Late morning to lunch", weights: { sales: 1, logic: 1 } },
      { value: "late", label: "Evening, when it's quiet", weights: { tech: 2, screen: 2 } },
      { value: "night", label: "Late night", weights: { tech: 2, screen: 3, pressure: 1 } }
    ]
  },
  {
    id: "feedback_give",
    kind: "scenario",
    prompt: "A junior asks for feedback on their report. You…",
    options: [
      {
        value: "line",
        label: "Go through line-by-line with them",
        weights: { detail: 3, empathy: 1, writing: 1 }
      },
      {
        value: "frame",
        label: "Give them a framework to self-edit",
        weights: { logic: 2, writing: 2, sales: 1 }
      },
      {
        value: "rewrite",
        label: "Just rewrite the worst paragraph as example",
        weights: { writing: 2, detail: 1 }
      },
      {
        value: "polite",
        label: "Say it's good, don't want to discourage",
        weights: { detail: -1, empathy: 1, compliance: -1 }
      }
    ]
  },
  {
    id: "tool_pick",
    kind: "scenario",
    prompt: "Given a choice of tools to learn deeply, you'd pick…",
    options: [
      {
        value: "excel",
        label: "Excel + SQL until you're dangerous",
        weights: { data: 3, logic: 2 }
      },
      { value: "code", label: "Python + a few libraries", weights: { tech: 3, logic: 2 } },
      {
        value: "med",
        label: "ICD-10 / SNOMED coding standards",
        weights: { compliance: 3, detail: 2, language: 1 }
      },
      { value: "crm", label: "A CRM and a great pitch deck", weights: { sales: 3, pressure: 1 } }
    ]
  },
  {
    id: "criticism",
    kind: "scenario",
    prompt: "Hardest criticism for you to hear is…",
    options: [
      { value: "slow", label: "'You're too slow'", weights: { pressure: 1 } },
      { value: "sloppy", label: "'Your work is sloppy'", weights: { detail: 2, compliance: 1 } },
      { value: "cold", label: "'You're cold with people'", weights: { empathy: 2, patient: 1 } },
      { value: "lost", label: "'You missed the bigger picture'", weights: { logic: 2, data: 1 } }
    ]
  },
  {
    id: "compliance_grey",
    kind: "scenario",
    prompt: "A teammate suggests skipping a 'pointless' compliance step to save 2 days. You…",
    options: [
      { value: "no", label: "Refuse — process is process", weights: { compliance: 3, detail: 1 } },
      {
        value: "escalate",
        label: "Escalate to the QA lead, not act alone",
        weights: { compliance: 2, sales: 1 }
      },
      { value: "ok", label: "Agree if the risk is low", weights: { compliance: -2, pressure: 1 } },
      {
        value: "fix",
        label: "Push to fix the broken process instead",
        weights: { logic: 2, sales: 1, tech: 1 }
      }
    ]
  },
  {
    id: "story_pull",
    kind: "scenario",
    prompt: "Which dataset would you pull first to understand a clinic's churn?",
    streams: ["BiPC"],
    options: [
      {
        value: "appts",
        label: "Appointment cancellations by reason",
        weights: { data: 3, logic: 2 }
      },
      {
        value: "nps",
        label: "Patient feedback (NPS) scores",
        weights: { empathy: 2, patient: 2, data: 1 }
      },
      {
        value: "billing",
        label: "Billing disputes raised in last 90 days",
        weights: { compliance: 2, data: 2 }
      },
      { value: "staff", label: "Staff attrition by role", weights: { sales: 2, data: 1 } }
    ]
  },
  {
    id: "writing_style",
    kind: "scenario",
    prompt: "Your writing style at its best is…",
    options: [
      {
        value: "tight",
        label: "Tight, factual, no fluff",
        weights: { writing: 3, compliance: 2, detail: 1 }
      },
      {
        value: "warm",
        label: "Warm, conversational, easy to read",
        weights: { writing: 2, empathy: 2, sales: 1 }
      },
      { value: "data", label: "Numbers-led with charts", weights: { data: 3, logic: 1 } },
      {
        value: "rare",
        label: "I avoid writing when I can",
        weights: { writing: -2, language: -1 }
      }
    ]
  },
  {
    id: "presentation",
    kind: "scenario",
    prompt: "You have to present to 30 people next week. Real reaction?",
    options: [
      { value: "love", label: "I love it, I'll over-prepare", weights: { sales: 3, pressure: 2 } },
      { value: "ok", label: "Fine if I rehearse twice", weights: { sales: 1, pressure: 1 } },
      { value: "dread", label: "I dread it but I'll do it", weights: { pressure: 1 } },
      { value: "no", label: "I'd ask someone else to present", weights: { sales: -2 } }
    ]
  },
  {
    id: "follow_up",
    kind: "scenario",
    prompt: "A WhatsApp lead has gone cold for 5 days. You…",
    options: [
      { value: "call", label: "Call them — texts get lost", weights: { sales: 3, patient: 1 } },
      { value: "voice", label: "Send a voice note", weights: { sales: 2, empathy: 1 } },
      { value: "drop", label: "Drop them, move to next lead", weights: { pressure: 1 } },
      {
        value: "value",
        label: "Send a useful resource, no ask",
        weights: { sales: 2, empathy: 2, writing: 1 }
      }
    ]
  },
  {
    id: "spec_change",
    kind: "scenario",
    prompt: "Day 4 of a 5-day task, the spec changes by 40%. You…",
    options: [
      {
        value: "redo",
        label: "Redo it cleanly within deadline",
        weights: { pressure: 3, compliance: 2 }
      },
      {
        value: "note",
        label: "Document the impact and reset the timeline",
        weights: { compliance: 3, writing: 2 }
      },
      {
        value: "vent",
        label: "Vent to the team first, then start",
        weights: { sales: 1, empathy: 1 }
      },
      {
        value: "salvage",
        label: "Salvage what overlaps, ship a hybrid",
        weights: { logic: 2, tech: 1, pressure: 1 }
      }
    ]
  },
  {
    id: "data_weird",
    kind: "scenario",
    prompt: "A chart shows revenue 'up 40%' but you suspect a unit error. You…",
    options: [
      {
        value: "verify",
        label: "Pull the raw query before celebrating",
        weights: { data: 3, detail: 2, logic: 1 }
      },
      {
        value: "ship",
        label: "Ship the chart, flag the suspicion",
        weights: { data: 1, sales: 1 }
      },
      { value: "leave", label: "It's not my chart", weights: { data: -2, compliance: -1 } },
      {
        value: "rebuild",
        label: "Rebuild the dashboard from scratch",
        weights: { data: 2, tech: 2, detail: 1 }
      }
    ]
  },
  {
    id: "code_pair",
    kind: "scenario",
    prompt: "Pair-programming with someone faster than you. Honest feeling?",
    options: [
      {
        value: "learn",
        label: "Great — I'll learn 5 things",
        weights: { tech: 2, empathy: 1, logic: 1 }
      },
      { value: "ok", label: "Fine, I'll keep up", weights: { tech: 1, pressure: 1 } },
      { value: "self", label: "I'd rather work alone", weights: { tech: 1, screen: 1, sales: -1 } },
      { value: "out", label: "I'd avoid coding altogether", weights: { tech: -3 } }
    ]
  },
  {
    id: "values",
    kind: "scenario",
    prompt: "Pick the value that resonates most with your ideal job:",
    options: [
      {
        value: "impact",
        label: "Visible impact on real patients",
        weights: { patient: 3, empathy: 2 }
      },
      {
        value: "craft",
        label: "Mastering a craft over years",
        weights: { detail: 2, tech: 2, compliance: 1 }
      },
      {
        value: "freedom",
        label: "Freedom — flexible hours, remote",
        weights: { tech: 1, screen: 2, sales: -1 }
      },
      { value: "money", label: "High earning potential fast", weights: { sales: 2, pressure: 2 } }
    ]
  },
  {
    id: "sales_role",
    kind: "scenario",
    prompt: "A 'sales' role pays 30% more than the others. You…",
    options: [
      { value: "love", label: "I'd take it — I like talking", weights: { sales: 3, pressure: 1 } },
      {
        value: "trial",
        label: "Try for 6 months, see if I survive",
        weights: { sales: 1, pressure: 1 }
      },
      { value: "no", label: "No — money isn't worth the energy drain", weights: { sales: -2 } },
      {
        value: "back",
        label: "Only a back-office role would suit me",
        weights: { detail: 2, screen: 1, sales: -1 }
      }
    ]
  },
  {
    id: "first_quit",
    kind: "scenario",
    prompt: "What's most likely to make you quit a job in year 1?",
    options: [
      {
        value: "boring",
        label: "Boring repetitive work",
        weights: { tech: 1, sales: 1, detail: -1 }
      },
      { value: "boss", label: "A toxic manager", weights: { empathy: 2 } },
      {
        value: "ethics",
        label: "Being asked to cut compliance corners",
        weights: { compliance: 3 }
      },
      { value: "money", label: "Underpaid for the workload", weights: { sales: 1, pressure: -1 } }
    ]
  },
  {
    id: "research",
    kind: "scenario",
    prompt: "Reading a new research paper, you naturally focus on…",
    options: [
      {
        value: "method",
        label: "The methodology section",
        weights: { detail: 3, compliance: 2, logic: 1 }
      },
      { value: "results", label: "The results tables", weights: { data: 3, logic: 2 } },
      { value: "intro", label: "The intro to get the story", weights: { writing: 2, language: 2 } },
      { value: "skip", label: "I'd ask AI to summarise", weights: { tech: 2, language: -1 } }
    ]
  },
  {
    id: "drug_stockout",
    kind: "scenario",
    prompt: "A pharmacy stockout is reported. Your first instinct?",
    streams: ["BiPC"],
    options: [
      {
        value: "supplier",
        label: "Call the supplier and chase",
        weights: { sales: 3, pressure: 2 }
      },
      {
        value: "audit",
        label: "Audit how it happened to prevent repeat",
        weights: { compliance: 3, detail: 2 }
      },
      {
        value: "patient",
        label: "Find substitute meds for waiting patients",
        weights: { patient: 3, empathy: 2 }
      },
      {
        value: "system",
        label: "Build a re-order alert in the system",
        weights: { tech: 3, data: 2 }
      }
    ]
  },
  {
    id: "audit_visit",
    kind: "scenario",
    prompt: "An auditor is visiting in 3 days. The right move is…",
    options: [
      {
        value: "prep",
        label: "Spend 3 days perfecting the document binder",
        weights: { compliance: 3, detail: 3 }
      },
      {
        value: "honest",
        label: "Be honest about gaps; show the fix plan",
        weights: { compliance: 2, sales: 1, empathy: 1 }
      },
      {
        value: "polish",
        label: "Polish only what they're likely to check",
        weights: { compliance: 1, logic: 1 }
      },
      { value: "hide", label: "Hide the messiest folders", weights: { compliance: -3 } }
    ]
  },
  {
    id: "model_fail",
    kind: "scenario",
    prompt: "An AI model you trained gives biased outputs in testing. You…",
    options: [
      {
        value: "stop",
        label: "Don't ship until it's fixed",
        weights: { compliance: 3, tech: 2, empathy: 2 }
      },
      {
        value: "guard",
        label: "Ship with safety guardrails and warnings",
        weights: { tech: 2, compliance: 1, logic: 1 }
      },
      {
        value: "blame",
        label: "Blame the dataset and move on",
        weights: { tech: -1, compliance: -2 }
      },
      {
        value: "retrain",
        label: "Spend 2 weeks rebalancing the data",
        weights: { detail: 3, data: 2, tech: 2 }
      }
    ]
  },
  {
    id: "patient_lie",
    kind: "scenario",
    prompt: "A patient is clearly hiding a symptom from you. You…",
    streams: ["BiPC"],
    options: [
      {
        value: "ask",
        label: "Ask gentle, indirect questions",
        weights: { empathy: 3, patient: 2, sales: 1 }
      },
      {
        value: "data",
        label: "Order tests that would catch it",
        weights: { detail: 2, compliance: 2, patient: 1 }
      },
      {
        value: "note",
        label: "Note your concern in the file, move on",
        weights: { compliance: 1, writing: 1 }
      },
      { value: "skip", label: "It's their choice — I respect it", weights: { patient: -1 } }
    ]
  },
  {
    id: "owner_mind",
    kind: "scenario",
    prompt: "You see a problem outside your job description. You…",
    options: [
      { value: "fix", label: "Fix it quietly", weights: { tech: 1, compliance: 1, pressure: 1 } },
      { value: "flag", label: "Flag it to the right person", weights: { sales: 1, compliance: 2 } },
      { value: "own", label: "Volunteer to lead the fix", weights: { sales: 3, pressure: 2 } },
      { value: "leave", label: "Leave it — not my circus", weights: { sales: -1, compliance: -1 } }
    ]
  },
  {
    id: "metric",
    kind: "scenario",
    prompt: "If you had to pick ONE number to report to your CEO weekly, you'd pick…",
    options: [
      { value: "rev", label: "Revenue per cohort", weights: { data: 2, sales: 2 } },
      {
        value: "errors",
        label: "Error rate per 1000 records",
        weights: { detail: 3, compliance: 2 }
      },
      { value: "nps", label: "Patient NPS", weights: { empathy: 3, patient: 2 } },
      { value: "ttr", label: "Time to resolution", weights: { logic: 2, pressure: 2 } }
    ]
  },
  {
    id: "office_layout",
    kind: "scenario",
    prompt: "Your dream desk neighbour is…",
    options: [
      {
        value: "coder",
        label: "A quiet engineer with headphones",
        weights: { tech: 2, screen: 1 }
      },
      { value: "doctor", label: "A doctor between rounds", weights: { patient: 2, empathy: 2 } },
      {
        value: "analyst",
        label: "A data analyst muttering at dashboards",
        weights: { data: 3, logic: 1 }
      },
      {
        value: "sales",
        label: "A sales lead on back-to-back calls",
        weights: { sales: 3, pressure: 1 }
      }
    ]
  },
  // Stream-specific scenarios so Commerce / Arts / MPC students get
  // questions that map to roles they actually consider.
  {
    id: "client_pitch",
    kind: "scenario",
    prompt: "You're 5 minutes into a client pitch and they cut you off with a hard objection. You…",
    streams: ["Commerce", "Arts"],
    options: [
      {
        value: "agree",
        label: "Acknowledge it, then reframe with a 1-line answer",
        weights: { sales: 3, empathy: 2, pressure: 2 }
      },
      {
        value: "data",
        label: "Pull the slide with the numbers that addresses it",
        weights: { data: 2, sales: 2, logic: 1 }
      },
      {
        value: "story",
        label: "Tell a 30-sec story of a similar client we won",
        weights: { sales: 2, writing: 2, empathy: 1 }
      },
      {
        value: "stall",
        label: "Park it, promise to circle back over email",
        weights: { sales: -1, compliance: 1 }
      }
    ]
  },
  {
    id: "month_close",
    kind: "scenario",
    prompt: "It's month-end close. Three of your reconciliations don't tie out by ₹4,000. You…",
    streams: ["Commerce"],
    options: [
      {
        value: "trace",
        label: "Trace every entry until the gap is found",
        weights: { detail: 3, compliance: 2, data: 1 }
      },
      {
        value: "pivot",
        label: "Build a pivot to spot the outlier fast",
        weights: { data: 3, logic: 2, tech: 1 }
      },
      {
        value: "flag",
        label: "Flag, post a provisional, fix in next cycle",
        weights: { compliance: 1, pressure: 1 }
      },
      { value: "ignore", label: "₹4k is small, leave it", weights: { detail: -2, compliance: -2 } }
    ]
  },
  {
    id: "ad_budget",
    kind: "scenario",
    prompt: "Your ₹2L Instagram ad spend converted only 8 leads this week. The boss wants the plan by 9am. You…",
    streams: ["Commerce", "Arts"],
    options: [
      {
        value: "diag",
        label: "Cut the worst-performing ad set, double the best",
        weights: { data: 3, logic: 2, sales: 1 }
      },
      {
        value: "hook",
        label: "Rewrite the hook, test 3 new creatives",
        weights: { writing: 2, sales: 2 }
      },
      {
        value: "chan",
        label: "Move 50% of budget to WhatsApp ads",
        weights: { sales: 2, tech: 1 }
      },
      {
        value: "wait",
        label: "Hold steady, one week is not enough signal",
        weights: { logic: 1, compliance: 1 }
      }
    ]
  },
  {
    id: "design_brief",
    kind: "scenario",
    prompt: "A client wants 'a fresh, modern look'. That's the entire brief. You…",
    streams: ["Arts", "Commerce"],
    options: [
      {
        value: "discover",
        label: "Run a 30-min discovery call before opening Figma",
        weights: { empathy: 3, sales: 2, language: 1 }
      },
      {
        value: "moodboard",
        label: "Send 3 moodboards, ask them to pick a direction",
        weights: { writing: 2, sales: 2, detail: 1 }
      },
      {
        value: "examples",
        label: "Ask for 3 brands they wish they looked like",
        weights: { logic: 2, sales: 1, empathy: 1 }
      },
      {
        value: "guess",
        label: "Just send v1 — they'll know what they want when they see it",
        weights: { compliance: -2 }
      }
    ]
  },
  {
    id: "field_visit",
    kind: "scenario",
    prompt: "You're inspecting a 5-acre farm and yields are 30% below the district average. First move?",
    streams: ["BiPC"],
    options: [
      {
        value: "soil",
        label: "Pull a soil sample, check pH and nutrients",
        weights: { lab: 3, detail: 2, data: 1 }
      },
      {
        value: "talk",
        label: "Sit with the farmer, walk the field together",
        weights: { empathy: 3, patient: 2, sales: 1 }
      },
      {
        value: "data",
        label: "Compare last 3 seasons of inputs vs yield",
        weights: { data: 3, logic: 2, detail: 1 }
      },
      {
        value: "buy",
        label: "Recommend a different seed variety on the spot",
        weights: { sales: 2, compliance: -1 }
      }
    ]
  },
  {
    id: "engg_failure",
    kind: "scenario",
    prompt: "Production line stops. The root-cause is unclear. The plant manager wants you to talk in 10 min. You…",
    streams: ["MPC"],
    options: [
      {
        value: "trace",
        label: "Trace the last 3 sensor logs before the halt",
        weights: { tech: 3, logic: 2, data: 1 }
      },
      {
        value: "5why",
        label: "Run a quick 5-Whys with the line operator",
        weights: { empathy: 2, logic: 2, compliance: 1 }
      },
      {
        value: "history",
        label: "Pull the last 30 days of similar incidents",
        weights: { data: 3, detail: 2 }
      },
      {
        value: "guess",
        label: "Restart and watch what fails first",
        weights: { tech: 1, compliance: -2 }
      }
    ]
  },
  // Stream-specific micros so non-pharma students get skill-checks they
  // actually find relevant. Commerce gets accounting / marketing math,
  // Arts gets language / brief work, MPC gets engineering math.
  {
    id: "micro_business_growth",
    kind: "micro",
    prompt: "A shop grows from ₹4L → ₹5L monthly revenue. That's…",
    streams: ["Commerce", "Arts"],
    options: [
      { value: "25", label: "+25%", correct: true, weights: { data: 3, logic: 2, sales: 1 } },
      { value: "20", label: "+20%", weights: { logic: -1 } },
      { value: "100", label: "+1L %", weights: { logic: -2 } },
      { value: "10", label: "+10%", weights: { logic: -1 } }
    ]
  },
  {
    id: "micro_break_even",
    kind: "micro",
    prompt: "Fixed cost ₹60,000/month. You earn ₹120 profit per unit sold. Break-even units?",
    streams: ["Commerce"],
    options: [
      {
        value: "500",
        label: "500 units",
        correct: true,
        weights: { data: 3, logic: 3, detail: 1 }
      },
      { value: "600", label: "600 units", weights: { logic: -1 } },
      { value: "50", label: "50 units", weights: { logic: -2 } },
      { value: "5000", label: "5,000 units", weights: { logic: -1 } }
    ]
  },
  {
    id: "micro_invoice",
    kind: "micro",
    prompt: "Invoice total ₹11,800 includes 18% tax. The base (pre-tax) amount is closest to…",
    streams: ["Commerce"],
    options: [
      { value: "10k", label: "₹10,000", correct: true, weights: { data: 3, detail: 2, logic: 2 } },
      { value: "9676", label: "₹9,676", weights: { logic: -1 } },
      { value: "11800", label: "₹11,800", weights: { logic: -2 } },
      { value: "10800", label: "₹10,800", weights: { logic: -1 } }
    ]
  },
  {
    id: "micro_brief_clean",
    kind: "micro",
    prompt: "Pick the cleanest 1-line brand line:",
    streams: ["Arts", "Commerce"],
    options: [
      {
        value: "a",
        label: "“Refunds in 24 hours, no questions.”",
        correct: true,
        weights: { writing: 3, language: 2, sales: 1 }
      },
      {
        value: "b",
        label: "“We are committed to providing refund processing efficiently within timeframes.”",
        weights: { writing: -1, language: -1 }
      },
      { value: "c", label: "“Refund timeline as per terms.”", weights: { writing: -1 } },
      { value: "d", label: "“Money back maybe.”", weights: { language: -2 } }
    ]
  },
  {
    id: "micro_engg_unit",
    kind: "micro",
    prompt: "A motor draws 2.5 A at 230 V. Power consumed (W) is closest to…",
    streams: ["MPC"],
    options: [
      { value: "575", label: "575 W", correct: true, weights: { logic: 3, data: 2, detail: 1 } },
      { value: "92", label: "92 W", weights: { logic: -1 } },
      { value: "230", label: "230 W", weights: { logic: -1 } },
      { value: "1150", label: "1150 W", weights: { logic: -1 } }
    ]
  },
  // Stream-specific behaviour questions
  {
    id: "field_sales_done",
    kind: "behaviour",
    prompt: "Have you ever sold something to a stranger face-to-face (event stall, college fest, family business)?",
    streams: ["Commerce", "Arts"],
    options: [
      {
        value: "many",
        label: "Many times — I'm comfortable",
        weights: { sales: 3, pressure: 2, empathy: 1 }
      },
      { value: "few", label: "A few times", weights: { sales: 1 } },
      { value: "tried", label: "Once, hated it", weights: { sales: -1 } },
      { value: "no", label: "Never tried", weights: { sales: -1 } }
    ]
  },
  {
    id: "build_done",
    kind: "behaviour",
    prompt: "Have you ever built or fixed something physical — circuit, model, project hardware?",
    streams: ["MPC"],
    options: [
      {
        value: "many",
        label: "Yes, many — and I enjoyed it",
        weights: { tech: 3, lab: 2, detail: 1, logic: 1 }
      },
      { value: "some", label: "A few class projects", weights: { tech: 1, lab: 1 } },
      { value: "rare", label: "Bare minimum", weights: { tech: -1 } },
      { value: "no", label: "I'd rather not", weights: { tech: -2 } }
    ]
  },
  // ─────────────────────────────────────────────
  // BEHAVIOUR (35) — past-evidence questions
  // ─────────────────────────────────────────────
  {
    id: "read_long",
    kind: "behaviour",
    prompt: "In the LAST 6 months, how often did you read something longer than 5 pages all the way through?",
    helper: "Textbook chapter, article, manual — not social media.",
    options: [
      { value: "weekly", label: "Weekly or more", weights: { language: 3, screen: 2, detail: 1 } },
      { value: "monthly", label: "A few times", weights: { language: 1, screen: 1 } },
      { value: "rare", label: "Once or twice", weights: { language: -1 } },
      { value: "no", label: "Honestly — no", weights: { language: -2, screen: -1 } }
    ]
  },
  {
    id: "wrote_long",
    kind: "behaviour",
    prompt: "Last time you wrote something over 500 words in English?",
    options: [
      { value: "month", label: "In the last month", weights: { writing: 3, language: 2 } },
      { value: "term", label: "This term", weights: { writing: 1, language: 1 } },
      { value: "year", label: "Over a year ago", weights: { writing: -1 } },
      { value: "never", label: "Can't remember", weights: { writing: -2, language: -1 } }
    ]
  },
  {
    id: "built_anything",
    kind: "behaviour",
    prompt: "Have you ever built or shipped something on a computer?",
    helper: "Website, app, script, even a working Excel macro.",
    options: [
      {
        value: "shipped",
        label: "Yes, others used it",
        weights: { tech: 4, logic: 2, pressure: 1 }
      },
      { value: "finished", label: "Yes, finished but for myself", weights: { tech: 3, logic: 1 } },
      { value: "tried", label: "Started, didn't finish", weights: { tech: 1 } },
      { value: "no", label: "Never tried", weights: { tech: -1 } }
    ]
  },
  {
    id: "led_anything",
    kind: "behaviour",
    prompt: "Have you ever organised something for 10+ people?",
    helper: "College fest, fundraiser, sports team, family event.",
    options: [
      { value: "many", label: "Many times", weights: { sales: 3, pressure: 2 } },
      { value: "once", label: "Once or twice", weights: { sales: 1, pressure: 1 } },
      { value: "no", label: "No", weights: { sales: -1 } }
    ]
  },
  {
    id: "internship",
    kind: "behaviour",
    prompt: "Internships or part-time work so far?",
    options: [
      {
        value: "paid",
        label: "Yes — paid, in healthcare/pharma",
        weights: { compliance: 2, detail: 1, pressure: 1 }
      },
      { value: "paid_other", label: "Yes — paid, other field", weights: { sales: 1, pressure: 1 } },
      { value: "unpaid", label: "Yes — unpaid / volunteer", weights: { empathy: 1, patient: 1 } },
      { value: "no", label: "Not yet", weights: {} }
    ]
  },
  {
    id: "lab_done",
    kind: "behaviour",
    prompt: "Hours per week in an actual wet lab in your degree so far?",
    showIf: ifStream("BiPC", "MPC"),
    options: [
      { value: "many", label: "6+ hours, I enjoy it", weights: { lab: 3, detail: 1 } },
      { value: "some", label: "Some, it's okay", weights: { lab: 1 } },
      { value: "min", label: "Bare minimum", weights: { lab: -1 } },
      { value: "hate", label: "I avoid lab whenever I can", weights: { lab: -2 } }
    ]
  },
  {
    id: "data_done",
    kind: "behaviour",
    prompt: "Comfort with Excel / Google Sheets, honestly?",
    options: [
      {
        value: "vlookup",
        label: "Pivot tables, vlookup, formulas",
        weights: { data: 3, logic: 2 }
      },
      { value: "basic", label: "Basic formulas (sum, average)", weights: { data: 1 } },
      { value: "open", label: "I can open and type", weights: { data: -1 } },
      { value: "no", label: "I avoid spreadsheets", weights: { data: -2 } }
    ]
  },
  {
    id: "screen_today",
    kind: "behaviour",
    prompt: "Average non-entertainment screen time per day?",
    options: [
      { value: "8", label: "8+ hours, fine with it", weights: { screen: 3, detail: 1 } },
      { value: "5", label: "4–7 hours", weights: { screen: 2 } },
      { value: "2", label: "1–3 hours", weights: { screen: 0 } },
      { value: "1", label: "Under an hour", weights: { screen: -2, patient: 1 } }
    ]
  },
  {
    id: "code_run",
    kind: "behaviour",
    prompt: "Have you ever written code that ran end-to-end (any language)?",
    options: [
      { value: "many", label: "Many small programs", weights: { tech: 3, logic: 2 } },
      { value: "few", label: "A few class assignments", weights: { tech: 1, logic: 1 } },
      { value: "tried", label: "Tried, got stuck on errors", weights: { tech: 0, pressure: -1 } },
      { value: "no", label: "Never", weights: { tech: -2 } }
    ]
  },
  {
    id: "patient_real",
    kind: "behaviour",
    prompt: "Have you spent time with sick or elderly people, beyond brief visits?",
    streams: ["BiPC"],
    options: [
      {
        value: "month",
        label: "Weeks/months as primary support",
        weights: { patient: 3, empathy: 3, pressure: 1 }
      },
      { value: "some", label: "A few days here and there", weights: { patient: 1, empathy: 1 } },
      { value: "rare", label: "Only during a single illness", weights: { empathy: 1 } },
      { value: "no", label: "Not really", weights: { patient: -1 } }
    ]
  },
  {
    id: "public_speak",
    kind: "behaviour",
    prompt: "Last time you spoke publicly to 20+ people?",
    options: [
      { value: "month", label: "This month", weights: { sales: 3, pressure: 2 } },
      { value: "year", label: "This year", weights: { sales: 2, pressure: 1 } },
      { value: "old", label: "Years ago", weights: { sales: 0 } },
      { value: "never", label: "Never", weights: { sales: -2 } }
    ]
  },
  {
    id: "english_med",
    kind: "behaviour",
    prompt: "Comfort reading dense English (clinical notes, contracts, manuals)?",
    options: [
      {
        value: "easy",
        label: "Easy — I do it weekly",
        weights: { language: 3, compliance: 1, screen: 1 }
      },
      { value: "ok", label: "Slow but I get through", weights: { language: 1 } },
      { value: "tools", label: "Need translator/dictionary", weights: { language: -1 } },
      { value: "no", label: "Avoid it", weights: { language: -3 } }
    ]
  },
  {
    id: "deadline_history",
    kind: "behaviour",
    prompt: "When did you last meet a hard external deadline (exam, submission)?",
    options: [
      {
        value: "always",
        label: "I never miss them",
        weights: { compliance: 3, pressure: 2, detail: 1 }
      },
      { value: "mostly", label: "Mostly on time", weights: { compliance: 1, pressure: 1 } },
      { value: "fifty", label: "About half the time", weights: { compliance: -1 } },
      { value: "miss", label: "Often miss", weights: { compliance: -2, pressure: -1 } }
    ]
  },
  {
    id: "side_project",
    kind: "behaviour",
    prompt: "Have you ever taught yourself a skill outside class?",
    options: [
      { value: "yes", label: "Yes, multiple", weights: { tech: 1, logic: 1, pressure: 1 } },
      { value: "one", label: "One serious one", weights: { detail: 1 } },
      { value: "tried", label: "Started but stopped", weights: {} },
      { value: "no", label: "No", weights: { tech: -1 } }
    ]
  },
  {
    id: "feedback_take",
    kind: "behaviour",
    prompt: "When was the last time you actively asked for honest feedback?",
    options: [
      {
        value: "month",
        label: "In the last month",
        weights: { empathy: 1, sales: 1, compliance: 1 }
      },
      { value: "term", label: "This term", weights: {} },
      { value: "year", label: "Over a year ago", weights: { compliance: -1 } },
      { value: "never", label: "I avoid feedback", weights: { empathy: -1, compliance: -1 } }
    ]
  },
  {
    id: "doc_proof",
    kind: "behaviour",
    prompt: "Have you proofread anything formal (paper, contract) for someone?",
    options: [
      {
        value: "often",
        label: "Often — friends ask me",
        weights: { detail: 3, language: 2, writing: 2 }
      },
      { value: "few", label: "A few times", weights: { detail: 1, language: 1 } },
      { value: "no", label: "No", weights: {} },
      { value: "bad", label: "I miss errors myself", weights: { detail: -2 } }
    ]
  },
  {
    id: "team_conflict",
    kind: "behaviour",
    prompt: "Last time a teammate frustrated you, you…",
    options: [
      { value: "talk", label: "Talked it out directly", weights: { sales: 2, empathy: 2 } },
      { value: "vent", label: "Vented to a friend, moved on", weights: { empathy: 1 } },
      {
        value: "carry",
        label: "Carried the work to avoid drama",
        weights: { pressure: 1, compliance: 1 }
      },
      { value: "exit", label: "Withdrew from the project", weights: { sales: -1, pressure: -1 } }
    ]
  },
  {
    id: "money_track",
    kind: "behaviour",
    prompt: "Do you track your own money — income, spend, savings?",
    options: [
      {
        value: "sheet",
        label: "Yes, in a sheet/app",
        weights: { data: 2, detail: 2, compliance: 1 }
      },
      { value: "head", label: "Mentally, roughly", weights: { logic: 1 } },
      { value: "rare", label: "Only when I'm broke", weights: { data: -1 } },
      { value: "no", label: "No", weights: { data: -2, detail: -1 } }
    ]
  },
  {
    id: "shadow",
    kind: "behaviour",
    prompt: "Have you shadowed a working professional in any field?",
    options: [
      { value: "many", label: "Multiple, different fields", weights: { empathy: 1, sales: 1 } },
      { value: "one", label: "One, briefly", weights: {} },
      { value: "no", label: "No", weights: {} }
    ]
  },
  {
    id: "exam_stress",
    kind: "behaviour",
    prompt: "Honest pattern under exam stress?",
    options: [
      { value: "calm", label: "Calm, methodical", weights: { pressure: 3, detail: 1 } },
      { value: "ramp", label: "Anxious early, calm at desk", weights: { pressure: 2 } },
      { value: "panic", label: "Panic, study-blank", weights: { pressure: -2 } },
      {
        value: "avoid",
        label: "Often skip if too stressed",
        weights: { pressure: -3, compliance: -1 }
      }
    ]
  },
  {
    id: "hours_real",
    kind: "behaviour",
    prompt: "Longest stretch you've focused on one task without phone breaks?",
    options: [
      { value: "3p", label: "3+ hours", weights: { detail: 3, screen: 2, pressure: 1 } },
      { value: "12", label: "1–2 hours", weights: { detail: 1 } },
      { value: "30", label: "About 30 min", weights: { detail: -1 } },
      { value: "10", label: "10 min max", weights: { detail: -2, screen: -1 } }
    ]
  },
  {
    id: "cold_message",
    kind: "behaviour",
    prompt: "Have you ever sent a cold message asking a stranger for help?",
    options: [
      { value: "many", label: "Many times — comfortable", weights: { sales: 3, pressure: 2 } },
      { value: "few", label: "A few times", weights: { sales: 1 } },
      { value: "tried", label: "Drafted, didn't send", weights: { sales: -1 } },
      { value: "no", label: "No, can't imagine", weights: { sales: -2 } }
    ]
  },
  {
    id: "complain",
    kind: "behaviour",
    prompt: "When a service messes up, you typically…",
    options: [
      {
        value: "polite",
        label: "Politely escalate to a supervisor",
        weights: { sales: 2, pressure: 1, empathy: 1 }
      },
      { value: "fight", label: "Fight hard until it's fixed", weights: { pressure: 2, sales: 2 } },
      {
        value: "review",
        label: "Leave a detailed review online",
        weights: { writing: 2, language: 1 }
      },
      { value: "let", label: "Let it go", weights: { sales: -1, pressure: -1 } }
    ]
  },
  {
    id: "research_pref",
    kind: "behaviour",
    prompt: "When you research a topic, you mostly…",
    options: [
      { value: "deep", label: "Read 2–3 long-form articles", weights: { language: 3, detail: 1 } },
      { value: "video", label: "Watch YouTube", weights: { language: -1 } },
      { value: "ask", label: "Ask a person who knows", weights: { sales: 2, empathy: 1 } },
      { value: "ai", label: "Ask AI and read the answer", weights: { tech: 2 } }
    ]
  },
  {
    id: "follow_through",
    kind: "behaviour",
    prompt: "When you start a 3-month side commitment, you usually…",
    options: [
      {
        value: "finish",
        label: "Finish it well",
        weights: { compliance: 2, pressure: 1, detail: 1 }
      },
      { value: "trail", label: "Lose steam in month 2", weights: { pressure: -1 } },
      { value: "drop", label: "Drop within 3 weeks", weights: { compliance: -2 } },
      { value: "never", label: "Don't start them", weights: {} }
    ]
  },
  {
    id: "small_lead",
    kind: "behaviour",
    prompt: "Have you ever managed a junior or younger person at any task?",
    options: [
      {
        value: "often",
        label: "Often, comfortable",
        weights: { sales: 2, empathy: 1, pressure: 1 }
      },
      { value: "few", label: "A few times", weights: { sales: 1 } },
      { value: "no", label: "No", weights: {} },
      { value: "hate", label: "I'd hate to", weights: { sales: -1 } }
    ]
  },
  {
    id: "blood",
    kind: "behaviour",
    prompt: "How do you react around blood, needles, body fluids?",
    streams: ["BiPC"],
    options: [
      { value: "fine", label: "Completely fine", weights: { patient: 3, lab: 2, empathy: 1 } },
      { value: "ok", label: "Uncomfortable but ok", weights: { patient: 1 } },
      { value: "hard", label: "Really hard for me", weights: { patient: -2, lab: -1 } },
      { value: "no", label: "Faint at the sight", weights: { patient: -3, lab: -2 } }
    ]
  },
  {
    id: "hospital_time",
    kind: "behaviour",
    prompt: "Total time you've spent inside a working hospital so far?",
    streams: ["BiPC"],
    options: [
      { value: "weeks", label: "Weeks/months", weights: { patient: 2, empathy: 1 } },
      { value: "days", label: "Several days", weights: { patient: 1 } },
      { value: "few", label: "A few visits", weights: {} },
      { value: "none", label: "Almost none", weights: { patient: -1 } }
    ]
  },
  {
    id: "research_paper",
    kind: "behaviour",
    prompt: "Have you read a peer-reviewed research paper end-to-end?",
    options: [
      { value: "many", label: "Many", weights: { language: 3, logic: 2, compliance: 1 } },
      { value: "few", label: "A few", weights: { language: 1 } },
      { value: "one", label: "Once", weights: {} },
      { value: "no", label: "Never", weights: { language: -1 } }
    ]
  },
  {
    id: "git_use",
    kind: "behaviour",
    prompt: "Do you know what git/GitHub is and have you used it?",
    options: [
      { value: "use", label: "Yes, I use it regularly", weights: { tech: 3, logic: 2 } },
      { value: "tried", label: "Tried it once or twice", weights: { tech: 1 } },
      { value: "know", label: "Heard of it, never used", weights: {} },
      { value: "no", label: "No idea", weights: { tech: -1 } }
    ]
  },
  {
    id: "small_money",
    kind: "behaviour",
    prompt: "Have you ever earned your own money (any amount)?",
    options: [
      {
        value: "regular",
        label: "Regularly, current job/freelance",
        weights: { sales: 2, pressure: 2 }
      },
      { value: "few", label: "A few one-off gigs", weights: { sales: 1 } },
      { value: "tried", label: "Tried but gave up", weights: {} },
      { value: "no", label: "Never", weights: { sales: -1 } }
    ]
  },
  {
    id: "documentation",
    kind: "behaviour",
    prompt: "Have you written documentation/SOPs anyone else used?",
    options: [
      {
        value: "yes",
        label: "Yes, used by a team",
        weights: { writing: 3, compliance: 3, detail: 2 }
      },
      { value: "self", label: "Yes, for myself", weights: { writing: 1, detail: 1 } },
      { value: "no", label: "No", weights: {} }
    ]
  },
  {
    id: "fix_others",
    kind: "behaviour",
    prompt: "Friends/family bring you their broken phones/computers because…",
    options: [
      { value: "fix", label: "I usually fix them", weights: { tech: 3, logic: 2 } },
      { value: "try", label: "I try, sometimes succeed", weights: { tech: 1 } },
      { value: "google", label: "I just google fast", weights: { tech: 1, screen: 1 } },
      { value: "no", label: "They don't, I'd be lost", weights: { tech: -2 } }
    ]
  },
  {
    id: "english_speak",
    kind: "behaviour",
    prompt: "Are you comfortable holding a 5-min English conversation with a stranger?",
    options: [
      { value: "yes", label: "Yes, easily", weights: { language: 2, sales: 2 } },
      { value: "ok", label: "With a colleague yes, stranger no", weights: { language: 1 } },
      {
        value: "hard",
        label: "Hard, I switch to my language",
        weights: { language: -1, sales: -1 }
      },
      { value: "avoid", label: "Avoid English conversation", weights: { language: -3, sales: -2 } }
    ]
  },
  {
    id: "punctual",
    kind: "behaviour",
    prompt: "Do people consider you punctual?",
    options: [
      {
        value: "very",
        label: "Very — I arrive early",
        weights: { compliance: 2, detail: 1, pressure: 1 }
      },
      { value: "ok", label: "Mostly on time", weights: { compliance: 1 } },
      { value: "late", label: "Often late by a bit", weights: { compliance: -1 } },
      { value: "very_late", label: "Notoriously late", weights: { compliance: -2, pressure: -1 } }
    ]
  },
  // ─────────────────────────────────────────────
  // MICRO (25) — small skill-checks; one option correct
  // ─────────────────────────────────────────────
  {
    id: "micro_pv",
    kind: "micro",
    prompt: "Which adverse event appeared FIRST in this case note?",
    streams: ["BiPC"],
    scenario: "“45F started Drug X on 12 Mar. On 18 Mar developed rash; fever 38.9 °C noted same evening. Drug stopped 19 Mar; symptoms resolved by 22 Mar.”",
    options: [
      {
        value: "rash",
        label: "Rash",
        correct: true,
        weights: { detail: 3, language: 2, compliance: 1 }
      },
      { value: "fever", label: "Fever", weights: { language: -1 } },
      { value: "same", label: "Both started the same day", weights: {} },
      { value: "ns", label: "Not stated in the note", weights: { detail: -1 } }
    ]
  },
  {
    id: "micro_code",
    kind: "micro",
    prompt: "Which one is the odd one out?",
    streams: ["BiPC"],
    helper: "Real ICD-10 codes — used in medical coding daily.",
    scenario: "J45.901   J45.902   J45.909   M54.5",
    options: [
      { value: "m54", label: "M54.5", correct: true, weights: { detail: 3, logic: 2 } },
      { value: "j901", label: "J45.901", weights: {} },
      { value: "j902", label: "J45.902", weights: {} },
      { value: "j909", label: "J45.909", weights: {} }
    ]
  },
  {
    id: "micro_data",
    kind: "micro",
    prompt: "Which row looks WRONG in this trial dataset?",
    streams: ["BiPC", "MPC"],
    scenario: "Patient | Age | Dose (mg) | BP\n101 | 34 | 50 | 120/80\n102 | 41 | 50 | 118/76\n103 | 29 | 500 | 122/79\n104 | 55 | 50 | 130/85",
    options: [
      {
        value: "103",
        label: "Patient 103 — dose looks 10× too high",
        correct: true,
        weights: { data: 3, detail: 2, logic: 2 }
      },
      { value: "101", label: "Patient 101", weights: {} },
      { value: "104", label: "Patient 104", weights: {} },
      { value: "none", label: "Nothing looks wrong", weights: { data: -1, detail: -1 } }
    ]
  },
  {
    id: "micro_pattern",
    kind: "micro",
    prompt: "What number comes next?",
    scenario: "2, 6, 12, 20, 30, ?",
    options: [
      { value: "42", label: "42", correct: true, weights: { logic: 3, tech: 1 } },
      { value: "40", label: "40", weights: {} },
      { value: "38", label: "38", weights: {} },
      { value: "skip", label: "I don't enjoy these", weights: { logic: -1, sales: 1 } }
    ]
  },
  {
    id: "micro_english",
    kind: "micro",
    prompt: "Pick the sentence written in clean medical-report English:",
    streams: ["BiPC"],
    options: [
      {
        value: "a",
        label: "“The patient is improving and tolerating the medication well.”",
        correct: true,
        weights: { language: 3, writing: 2 }
      },
      {
        value: "b",
        label: "“Patient is improve and is taking medicine and is good now.”",
        weights: { language: -1 }
      },
      {
        value: "c",
        label: "“The medication is being tolerated patient-wise good.”",
        weights: { language: -1 }
      },
      {
        value: "d",
        label: "“Patient med tolerate ok improvement seen.”",
        weights: { language: -2 }
      }
    ]
  },
  {
    id: "micro_logic",
    kind: "micro",
    prompt: "All clinical trial drugs need approval. Drug Z has approval. Therefore…",
    streams: ["BiPC", "MPC"],
    options: [
      { value: "a", label: "Drug Z is in a clinical trial OR is approved", weights: {} },
      { value: "b", label: "Drug Z must be safe", weights: { logic: -1 } },
      {
        value: "c",
        label: "We can't conclude Drug Z is in a clinical trial",
        correct: true,
        weights: { logic: 3, compliance: 1 }
      },
      { value: "d", label: "Drug Z is not in a clinical trial", weights: { logic: -1 } }
    ]
  },
  {
    id: "micro_unit",
    kind: "micro",
    prompt: "A vial reads 250 mg / 5 mL. Doctor wants 100 mg. How many mL?",
    streams: ["BiPC"],
    options: [
      { value: "2", label: "2 mL", correct: true, weights: { logic: 2, data: 2, detail: 1 } },
      { value: "5", label: "5 mL", weights: { detail: -1 } },
      { value: "1", label: "1 mL", weights: { logic: -1 } },
      { value: "25", label: "0.25 mL", weights: { logic: -1 } }
    ]
  },
  {
    id: "micro_chart",
    kind: "micro",
    prompt: "BP readings: 118/78, 122/80, 119/79, 188/110, 120/82. Which value is the outlier?",
    streams: ["BiPC"],
    options: [
      { value: "188", label: "188/110", correct: true, weights: { data: 3, detail: 2 } },
      { value: "118", label: "118/78", weights: {} },
      { value: "120", label: "120/82", weights: {} },
      { value: "none", label: "All look normal", weights: { data: -2, detail: -1 } }
    ]
  },
  {
    id: "micro_dose_freq",
    kind: "micro",
    prompt: "BID means…",
    streams: ["BiPC"],
    helper: "Standard prescription abbreviation.",
    options: [
      {
        value: "twice",
        label: "Twice a day",
        correct: true,
        weights: { compliance: 3, detail: 2, language: 1 }
      },
      { value: "once", label: "Once a day", weights: { compliance: -1 } },
      { value: "thrice", label: "Three times a day", weights: { compliance: -1 } },
      { value: "bed", label: "At bedtime", weights: { compliance: -1 } }
    ]
  },
  {
    id: "micro_confidential",
    kind: "micro",
    prompt: "A patient ID accidentally appears in a public report draft. The right action is…",
    streams: ["BiPC"],
    options: [
      {
        value: "redact",
        label: "Stop, redact, and notify the privacy officer",
        correct: true,
        weights: { compliance: 3, empathy: 2, detail: 2 }
      },
      { value: "send", label: "Send anyway, fix in v2", weights: { compliance: -3 } },
      { value: "ask", label: "Ask the patient if it's ok", weights: { empathy: 1, compliance: 0 } },
      { value: "ignore", label: "Probably nobody will notice", weights: { compliance: -3 } }
    ]
  },
  {
    id: "micro_seq",
    kind: "micro",
    prompt: "Pick the next term: 1, 1, 2, 3, 5, 8, ?",
    options: [
      { value: "13", label: "13", correct: true, weights: { logic: 3, tech: 1 } },
      { value: "11", label: "11", weights: {} },
      { value: "16", label: "16", weights: {} },
      { value: "10", label: "10", weights: {} }
    ]
  },
  {
    id: "micro_letter",
    kind: "micro",
    prompt: "Pick the next letter: A, C, F, J, ?",
    options: [
      { value: "O", label: "O", correct: true, weights: { logic: 3 } },
      { value: "M", label: "M", weights: {} },
      { value: "N", label: "N", weights: {} },
      { value: "K", label: "K", weights: {} }
    ]
  },
  {
    id: "micro_pct",
    kind: "micro",
    prompt: "30% of 240 is…",
    options: [
      { value: "72", label: "72", correct: true, weights: { data: 2, logic: 2 } },
      { value: "60", label: "60", weights: {} },
      { value: "80", label: "80", weights: {} },
      { value: "70", label: "70", weights: {} }
    ]
  },
  {
    id: "micro_table",
    kind: "micro",
    prompt: "From this table, which clinic has the BEST appointment-show-up rate?",
    scenario: "Clinic | Booked | Showed\nA | 120 | 102\nB | 80  | 60\nC | 200 | 150\nD | 50  | 48",
    options: [
      {
        value: "D",
        label: "Clinic D (96%)",
        correct: true,
        weights: { data: 3, logic: 2, detail: 1 }
      },
      { value: "A", label: "Clinic A", weights: {} },
      { value: "C", label: "Clinic C", weights: { data: -1 } },
      { value: "B", label: "Clinic B", weights: { data: -1 } }
    ]
  },
  {
    id: "micro_grammar",
    kind: "micro",
    prompt: "Pick the grammatically clean sentence:",
    streams: ["BiPC"],
    options: [
      {
        value: "a",
        label: "“Each patient was monitored carefully throughout the trial.”",
        correct: true,
        weights: { language: 3, writing: 2 }
      },
      {
        value: "b",
        label: "“Each patients was monitor carefully throughout the trial.”",
        weights: { language: -1 }
      },
      {
        value: "c",
        label: "“Each patient were monitor careful through the trial.”",
        weights: { language: -2 }
      },
      {
        value: "d",
        label: "“Each of patient is being monitor in the trial carefully.”",
        weights: { language: -1 }
      }
    ]
  },
  {
    id: "micro_age_group",
    kind: "micro",
    prompt: "ICD-10 P codes are used for…",
    streams: ["BiPC"],
    helper: "If you know it, great; if not, infer from the letter.",
    options: [
      {
        value: "neonatal",
        label: "Conditions originating in the perinatal period",
        correct: true,
        weights: { detail: 2, compliance: 2, language: 1 }
      },
      { value: "preg", label: "Pregnancy complications", weights: { compliance: -1 } },
      { value: "psych", label: "Psychiatric disorders", weights: { compliance: -1 } },
      { value: "post", label: "Post-surgical care", weights: { compliance: -1 } }
    ]
  },
  {
    id: "micro_seriousness",
    kind: "micro",
    prompt: "Which adverse event would be considered SERIOUS by ICH definitions?",
    streams: ["BiPC"],
    options: [
      {
        value: "hosp",
        label: "Required hospitalisation",
        correct: true,
        weights: { compliance: 3, detail: 2, language: 1 }
      },
      { value: "mild", label: "Mild headache, resolved next day", weights: { compliance: -1 } },
      { value: "rash", label: "Itchy rash, no treatment needed", weights: { compliance: -1 } },
      { value: "tired", label: "Patient felt tired", weights: { compliance: -1 } }
    ]
  },
  {
    id: "micro_priority",
    kind: "micro",
    prompt: "Three tasks in the queue. Pick the one that should be done FIRST:",
    streams: ["BiPC"],
    options: [
      {
        value: "ae",
        label: "Log a serious adverse event from yesterday",
        correct: true,
        weights: { compliance: 3, pressure: 2, detail: 1 }
      },
      { value: "newsl", label: "Draft the monthly newsletter", weights: { compliance: -1 } },
      { value: "tidy", label: "Tidy up your inbox folders", weights: { compliance: -1 } },
      { value: "lunch", label: "Plan team lunch", weights: { compliance: -1 } }
    ]
  },
  {
    id: "micro_typo",
    kind: "micro",
    prompt: "Spot the typo: 'The patient was administred 5 mg of dexamethasone twice daily.'",
    streams: ["BiPC"],
    options: [
      {
        value: "admin",
        label: "administred → administered",
        correct: true,
        weights: { detail: 3, language: 2, writing: 1 }
      },
      { value: "dex", label: "dexamethasone is misspelled", weights: { detail: -1 } },
      { value: "twice", label: "twice should be 'two times'", weights: { detail: -1 } },
      { value: "none", label: "No typo", weights: { detail: -2 } }
    ]
  },
  {
    id: "micro_anatomy",
    kind: "micro",
    prompt: "The myocardium is part of the…",
    streams: ["BiPC"],
    options: [
      {
        value: "heart",
        label: "Heart",
        correct: true,
        weights: { language: 1, lab: 1, patient: 1 }
      },
      { value: "liver", label: "Liver", weights: {} },
      { value: "lung", label: "Lung", weights: {} },
      { value: "kidney", label: "Kidney", weights: {} }
    ]
  },
  {
    id: "micro_ratio",
    kind: "micro",
    prompt: "If 8 of 200 trial subjects had nausea, that's…",
    streams: ["BiPC", "MPC"],
    options: [
      { value: "4pct", label: "4%", correct: true, weights: { data: 2, logic: 2, detail: 1 } },
      { value: "8pct", label: "8%", weights: {} },
      { value: "0.4", label: "0.4%", weights: {} },
      { value: "40", label: "40%", weights: { logic: -1 } }
    ]
  },
  {
    id: "micro_chart_read",
    kind: "micro",
    prompt: "Q1: 120, Q2: 180, Q3: 150, Q4: 210. Quarter with the LARGEST jump from previous quarter?",
    options: [
      { value: "q2", label: "Q2 (+60)", correct: true, weights: { data: 3, logic: 2 } },
      { value: "q4", label: "Q4 (+60)", weights: { detail: -1 } },
      { value: "q3", label: "Q3", weights: {} },
      { value: "q1", label: "Q1", weights: {} }
    ]
  },
  {
    id: "micro_sql",
    kind: "micro",
    prompt: "Which clause LIMITS rows in SQL?",
    options: [
      { value: "where", label: "WHERE", correct: true, weights: { tech: 2, data: 2, logic: 1 } },
      { value: "select", label: "SELECT", weights: {} },
      { value: "from", label: "FROM", weights: {} },
      { value: "order", label: "ORDER BY", weights: {} }
    ]
  },
  {
    id: "micro_excel",
    kind: "micro",
    prompt: "In Excel, =VLOOKUP(A2, B:D, 3, FALSE) returns the value from…",
    options: [
      {
        value: "third",
        label: "The 3rd column of B:D for the row matching A2",
        correct: true,
        weights: { data: 3, logic: 2, detail: 1 }
      },
      { value: "row3", label: "The 3rd row of column A", weights: { data: -1 } },
      { value: "first", label: "The first matching cell in B", weights: { data: -1 } },
      { value: "row", label: "The row number of A2", weights: { data: -1 } }
    ]
  },
  {
    id: "micro_truth",
    kind: "micro",
    prompt: "A trial reports p < 0.05 for a treatment. Best honest interpretation?",
    streams: ["BiPC", "MPC"],
    options: [
      {
        value: "evid",
        label: "There is evidence the effect isn't due to chance alone",
        correct: true,
        weights: { logic: 3, data: 2, compliance: 1 }
      },
      { value: "proof", label: "The treatment is proven to work", weights: { logic: -1 } },
      { value: "5pct", label: "The treatment fails 5% of the time", weights: { logic: -1 } },
      { value: "none", label: "Means nothing without context", weights: { logic: 1 } }
    ]
  },
  // ─────────────────────────────────────────────
  // LIFESTYLE (15)
  // ─────────────────────────────────────────────
  {
    id: "wfh",
    kind: "lifestyle",
    prompt: "Your dream work setup, 2 years from now?",
    options: [
      { value: "wfh", label: "Mostly work-from-home", weights: { screen: 2, tech: 1, sales: -1 } },
      { value: "office", label: "Office with a small team", weights: { sales: 1, compliance: 1 } },
      {
        value: "field",
        label: "Field / hospital, on the move",
        weights: { patient: 3, empathy: 1, screen: -1 }
      },
      { value: "hybrid", label: "Hybrid — both", weights: { sales: 1, screen: 1 } }
    ]
  },
  {
    id: "shift",
    kind: "lifestyle",
    prompt: "Could you do night shifts (US-hours) for higher pay?",
    options: [
      { value: "yes", label: "Yes, no problem", weights: { screen: 1, pressure: 1 } },
      { value: "temp", label: "1–2 years to set up career", weights: { screen: 1 } },
      { value: "no", label: "No, I value my sleep", weights: { screen: -1, patient: 1 } },
      { value: "hate", label: "Absolutely not", weights: { screen: -2 } }
    ]
  },
  {
    id: "salary",
    kind: "lifestyle",
    prompt: "Realistic first-year salary expectation?",
    helper: "We'll flag if it's way off-market for your fit.",
    options: [
      { value: "low", label: "₹2.5 – 4 LPA. I'll grow from there" },
      { value: "mid", label: "₹4 – 6 LPA" },
      { value: "high", label: "₹6 – 9 LPA" },
      { value: "vhigh", label: "₹9 LPA+" }
    ]
  },
  {
    id: "relocate",
    kind: "lifestyle",
    prompt: "Willing to relocate to Hyderabad / Bangalore / Chennai for a job?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "may", label: "Maybe, depends" },
      { value: "no", label: "No, my city only" }
    ]
  },
  {
    id: "travel",
    kind: "lifestyle",
    prompt: "How do you feel about field travel (3–5 days a month)?",
    options: [
      { value: "love", label: "Love it", weights: { sales: 2, patient: 1, pressure: 1 } },
      { value: "ok", label: "Fine occasionally", weights: { sales: 1 } },
      { value: "no", label: "Prefer not", weights: { sales: -1, screen: 1 } },
      { value: "never", label: "Strict no-travel", weights: { sales: -2, screen: 2 } }
    ]
  },
  {
    id: "team_size",
    kind: "lifestyle",
    prompt: "Ideal team size to work in?",
    options: [
      { value: "solo", label: "Solo with a manager", weights: { tech: 1, screen: 1, sales: -1 } },
      {
        value: "small",
        label: "Small team of 3–5",
        weights: { compliance: 1, sales: 1, empathy: 1 }
      },
      { value: "med", label: "Mid-size 10–25", weights: { sales: 2, compliance: 1 } },
      { value: "big", label: "Large 50+", weights: { compliance: 2, sales: 1 } }
    ]
  },
  {
    id: "dress",
    kind: "lifestyle",
    prompt: "How important is a flexible dress code?",
    options: [
      { value: "max", label: "Very — I need casual", weights: { tech: 2, screen: 1 } },
      { value: "mid", label: "Smart casual is fine", weights: { sales: 1 } },
      { value: "form", label: "I prefer formal", weights: { compliance: 2, sales: 1 } },
      { value: "any", label: "Don't care", weights: {} }
    ]
  },
  {
    id: "weekend_work",
    kind: "lifestyle",
    prompt: "Honest reaction to occasional weekend work for important launches?",
    options: [
      {
        value: "ok",
        label: "Fine if rare and meaningful",
        weights: { pressure: 2, compliance: 1 }
      },
      { value: "comp", label: "Only if compensated", weights: { sales: 1 } },
      { value: "no", label: "Strict 5-day for me", weights: { pressure: -1 } },
      { value: "never", label: "Absolutely never", weights: { pressure: -2 } }
    ]
  },
  {
    id: "commute",
    kind: "lifestyle",
    prompt: "Max one-way commute you can sustain?",
    options: [
      { value: "30", label: "Under 30 min", weights: { patient: 1 } },
      { value: "60", label: "Up to 60 min", weights: {} },
      { value: "90", label: "Up to 90 min", weights: { pressure: 1 } },
      { value: "wfh", label: "WFH only", weights: { tech: 2, screen: 2 } }
    ]
  },
  {
    id: "retire_pic",
    kind: "lifestyle",
    prompt: "Picture yourself in 5 years. The most appealing image is…",
    options: [
      {
        value: "clinic",
        label: "Running a small clinic",
        weights: { patient: 3, empathy: 2, sales: 2 }
      },
      { value: "lead", label: "Leading a 20-person team", weights: { sales: 3, pressure: 2 } },
      {
        value: "ic",
        label: "Senior individual contributor",
        weights: { tech: 2, detail: 2, screen: 1 }
      },
      {
        value: "found",
        label: "Founder of a tiny company",
        weights: { tech: 2, sales: 2, pressure: 2 }
      }
    ]
  },
  {
    id: "intl",
    kind: "lifestyle",
    prompt: "How important is international career mobility (US/UK)?",
    options: [
      { value: "must", label: "Must — that's the goal", weights: { language: 2, pressure: 1 } },
      { value: "nice", label: "Nice to have", weights: { language: 1 } },
      { value: "india", label: "I want to build in India", weights: { sales: 1, empathy: 1 } },
      { value: "city", label: "I want to stay near home", weights: { patient: 1 } }
    ]
  },
  {
    id: "stability_vs",
    kind: "lifestyle",
    prompt: "What matters more day-to-day?",
    options: [
      {
        value: "stable",
        label: "Predictable hours, stable salary",
        weights: { compliance: 2, detail: 1 }
      },
      {
        value: "growth",
        label: "Steep learning, even if chaotic",
        weights: { tech: 2, pressure: 2 }
      },
      {
        value: "money",
        label: "High pay, high stress is fine",
        weights: { sales: 2, pressure: 2 }
      },
      { value: "purpose", label: "Meaning over money", weights: { patient: 2, empathy: 2 } }
    ]
  },
  {
    id: "office_culture",
    kind: "lifestyle",
    prompt: "Pick the office culture you'd thrive in:",
    options: [
      {
        value: "structured",
        label: "Structured, process-led",
        weights: { compliance: 2, detail: 2 }
      },
      {
        value: "startup",
        label: "Startup-y, move fast",
        weights: { tech: 2, pressure: 2, sales: 1 }
      },
      { value: "warm", label: "Warm, people-first", weights: { empathy: 2, patient: 1 } },
      {
        value: "academic",
        label: "Academic, research-heavy",
        weights: { language: 2, logic: 2, detail: 1 }
      }
    ]
  },
  {
    id: "tools_use",
    kind: "lifestyle",
    prompt: "How many hours a day at a computer keyboard could you sustain?",
    options: [
      { value: "10p", label: "10+ hours, no issue", weights: { screen: 3, tech: 1 } },
      { value: "8", label: "Around 8 hours", weights: { screen: 2 } },
      { value: "4", label: "4 hours max", weights: { patient: 1, screen: -1 } },
      {
        value: "min",
        label: "I want to be away from screens",
        weights: { patient: 3, screen: -2 }
      }
    ]
  },
  {
    id: "sleep",
    kind: "lifestyle",
    prompt: "Honest sleep pattern at your best?",
    options: [
      { value: "early", label: "Early bird (10pm – 6am)", weights: { patient: 1, compliance: 1 } },
      { value: "stand", label: "Standard (12am – 8am)", weights: {} },
      { value: "late", label: "Late (2am – 10am)", weights: { tech: 1, screen: 1 } },
      { value: "irreg", label: "Very irregular", weights: { pressure: -1 } }
    ]
  },
  // ─────────────────────────────────────────────
  // COMMITMENT (10)
  // ─────────────────────────────────────────────
  {
    id: "study_hours",
    kind: "commitment",
    prompt: "How many hours a week can you commit to learning?",
    options: [
      { value: "lt5", label: "Under 5 hours" },
      { value: "5_10", label: "5 – 10 hours" },
      { value: "10_20", label: "10 – 20 hours" },
      { value: "20p", label: "20+ hours. I'm serious" }
    ]
  },
  {
    id: "budget",
    kind: "commitment",
    prompt: "Family budget for upskilling?",
    options: [
      { value: "lt15", label: "Under ₹15k" },
      { value: "15_30", label: "₹15k – ₹30k" },
      { value: "30p", label: "₹30k+" },
      { value: "emi", label: "I'd prefer EMI" }
    ]
  },
  {
    id: "start_when",
    kind: "commitment",
    prompt: "When do you want to start?",
    options: [
      { value: "now", label: "Right away. Next batch" },
      { value: "next", label: "Next 1–2 months" },
      { value: "later", label: "After my exams (3+ months)" }
    ]
  },
  {
    id: "exam_target",
    kind: "commitment",
    prompt: "Are you preparing for any major exam in the next 6 months?",
    options: [
      { value: "none", label: "No" },
      { value: "uni", label: "University finals only" },
      { value: "compete", label: "GATE / CAT / NEET-PG / similar" },
      { value: "abroad", label: "GRE / IELTS / OET" }
    ]
  },
  {
    id: "decision_maker",
    kind: "commitment",
    prompt: "Who decides about your career path right now?",
    options: [
      { value: "me", label: "Mostly me", weights: { pressure: 1 } },
      { value: "parents", label: "Mostly parents", weights: { compliance: 1 } },
      { value: "both", label: "Discuss together", weights: { empathy: 1 } },
      { value: "advisor", label: "An advisor / counsellor", weights: {} }
    ]
  },
  {
    id: "support",
    kind: "commitment",
    prompt: "How supportive is your family of a non-traditional path?",
    options: [
      { value: "very", label: "Very supportive" },
      { value: "open", label: "Open if I show evidence" },
      { value: "skept", label: "Skeptical, but won't block" },
      { value: "block", label: "Strong push for clinical/govt only" }
    ]
  },
  {
    id: "english_invest",
    kind: "commitment",
    prompt: "Ready to spend 30 min a day on English if it's part of the path?",
    options: [
      { value: "yes", label: "Yes, daily" },
      { value: "alt", label: "Few times a week" },
      { value: "min", label: "Bare minimum" },
      { value: "no", label: "Honestly, no" }
    ]
  },
  {
    id: "code_invest",
    kind: "commitment",
    prompt: "Ready to spend 1 hr a day learning code if the path needs it?",
    options: [
      { value: "love", label: "Yes, sounds fun" },
      { value: "ok", label: "Ok if structured" },
      { value: "min", label: "Reluctantly" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "mentor_open",
    kind: "commitment",
    prompt: "Open to a 1-on-1 mentor calling you weekly?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "wk", label: "Bi-weekly" },
      { value: "mo", label: "Monthly is enough" },
      { value: "no", label: "I prefer self-paced" }
    ]
  },
  {
    id: "job_urgency",
    kind: "commitment",
    prompt: "How soon do you NEED to start earning?",
    options: [
      { value: "now", label: "Within 3 months" },
      { value: "6mo", label: "Within 6 months" },
      { value: "1y", label: "Within a year" },
      { value: "no", label: "No urgency" }
    ]
  }
];
const QUOTAS = {
  profile: 7,
  scenario: 14,
  behaviour: 8,
  micro: 6,
  lifestyle: 4,
  commitment: 3
};
const TARGET_TOTAL = 42;
const ADAPTIVE_MIN_POOL_ANSWERS = 14;
const ADAPTIVE_MIN_VISIBLE = 22;
class SamplerError extends Error {
  constructor(message) {
    super(message);
    this.name = "SamplerError";
  }
}
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function() {
    a = a + 1831565813 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function shuffle(arr, rng) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
function rngFor(seed, salt) {
  const h = xmur3(`${seed}::${salt}`);
  return mulberry32(h());
}
function profileQuestions() {
  return QUESTIONS.filter((q) => q.kind === "profile");
}
function isEligibleForStream(q, stream) {
  if (!q.streams || q.streams.length === 0) return true;
  if (!stream) return true;
  return q.streams.includes(stream);
}
function buildAssessment(seed, stream) {
  const seen2 = /* @__PURE__ */ new Set();
  const picked = [];
  const activeStream = stream ?? null;
  for (const q of profileQuestions()) {
    if (seen2.has(q.id)) {
      throw new SamplerError(`Duplicate question id in bank: ${q.id}`);
    }
    seen2.add(q.id);
    picked.push(q);
  }
  if (picked.length !== QUOTAS.profile) {
    throw new SamplerError(`profile pool has ${picked.length}, need ${QUOTAS.profile}`);
  }
  Object.keys(QUOTAS).filter((k) => k !== "profile").forEach((kind) => {
    const want = QUOTAS[kind];
    const fullPool = QUESTIONS.filter((q) => q.kind === kind);
    if (fullPool.length < want) {
      throw new SamplerError(`${kind} pool has ${fullPool.length}, need ${want}`);
    }
    const filtered = fullPool.filter((q) => isEligibleForStream(q, activeStream));
    const usable = filtered.length >= want ? filtered : fullPool;
    const salt = activeStream ? `${kind}::${activeStream}` : kind;
    const ordered = shuffle(usable, rngFor(seed, salt)).slice(0, want);
    for (const q of ordered) {
      if (seen2.has(q.id)) {
        throw new SamplerError(`Duplicate question id picked across kinds: ${q.id}`);
      }
      seen2.add(q.id);
      picked.push(q);
    }
  });
  const v = validateAssessment(picked);
  if (!v.ok) {
    throw new SamplerError(
      `Assessment failed validation: total=${v.total} duplicates=${v.duplicates.join(",") || "none"} perKind=${JSON.stringify(v.perKind)}`
    );
  }
  return picked;
}
function validateAssessment(qs) {
  const perKind = {
    profile: 0,
    scenario: 0,
    behaviour: 0,
    micro: 0,
    lifestyle: 0,
    commitment: 0
  };
  const counts = {};
  for (const q of qs) {
    perKind[q.kind] = (perKind[q.kind] ?? 0) + 1;
    counts[q.id] = (counts[q.id] ?? 0) + 1;
  }
  const duplicates = Object.keys(counts).filter((id) => counts[id] > 1);
  const totalOk = qs.length === TARGET_TOTAL;
  const noDuplicates = duplicates.length === 0;
  const perKindOk = Object.keys(QUOTAS).every((k) => perKind[k] === QUOTAS[k]);
  return {
    ok: totalOk && noDuplicates && perKindOk,
    total: qs.length,
    perKind,
    duplicates,
    perKindOk,
    totalOk,
    noDuplicates
  };
}
function visibleFromAssessment(assessment, answers) {
  return assessment.filter((q) => !q.showIf || q.showIf(answers));
}
function adaptiveVisibleFromAssessment(assessment, answers, isConfident) {
  const visible = visibleFromAssessment(assessment, answers);
  const isAnchor = (q) => q.kind === "profile" || q.kind === "commitment";
  const poolAnswered = visible.filter((q) => !isAnchor(q) && answers[q.id]).length;
  if (poolAnswered < ADAPTIVE_MIN_POOL_ANSWERS) return visible;
  if (!isConfident(answers)) return visible;
  const truncated = visible.filter((q) => isAnchor(q) || Boolean(answers[q.id]));
  if (truncated.length < ADAPTIVE_MIN_VISIBLE) return visible;
  return truncated;
}
const SEED_KEY = "ce_seed";
const SEED_LOCK_KEY = "ce_seed_locked";
function getOrCreateSeed(sessionId) {
  if (typeof window === "undefined") return "ssr";
  try {
    const qs = new URLSearchParams(window.location.search);
    const fromUrl = qs.get("seed");
    if (fromUrl) {
      window.localStorage.setItem(SEED_KEY, fromUrl);
      window.localStorage.setItem(SEED_LOCK_KEY, fromUrl);
      return fromUrl;
    }
  } catch {
  }
  const locked = window.localStorage.getItem(SEED_LOCK_KEY);
  if (locked) return locked;
  if (sessionId) {
    window.localStorage.setItem(SEED_KEY, sessionId);
    return sessionId;
  }
  let seed = window.localStorage.getItem(SEED_KEY);
  if (!seed) {
    seed = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `seed_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SEED_KEY, seed);
  }
  return seed;
}
function lockSeed(seed) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SEED_LOCK_KEY, seed);
}
function resetSeed() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SEED_KEY);
  window.localStorage.removeItem(SEED_LOCK_KEY);
  try {
    window.sessionStorage.removeItem(SEED_KEY);
  } catch {
  }
}
function reproducerUrl(seed) {
  if (typeof window === "undefined") return `/career-engine/test?seed=${seed}`;
  const u = new URL(window.location.href);
  u.searchParams.set("seed", seed);
  return u.toString();
}
function isNetworkError(err) {
  if (!err) return false;
  if (err instanceof TypeError) {
    const msg = err.message?.toLowerCase() ?? "";
    return msg.includes("failed to fetch") || msg.includes("load failed") || msg.includes("network") || msg.includes("fetch") || msg === "";
  }
  const code = err.code;
  if (code && [
    "ECONNRESET",
    "ECONNREFUSED",
    "ENOTFOUND",
    "EAI_AGAIN",
    "ETIMEDOUT",
    "UND_ERR_SOCKET"
  ].includes(code)) {
    return true;
  }
  const name = err.name;
  if (name === "AbortError") return true;
  return false;
}
const defaultSleep = (ms) => new Promise((resolve) => {
  if (typeof setTimeout === "undefined") {
    resolve();
    return;
  }
  setTimeout(resolve, ms);
});
function computeBackoffDelay(retryIndex, opts) {
  const exp = opts.baseDelayMs * Math.pow(2, retryIndex);
  const capped = Math.min(exp, opts.maxDelayMs);
  const jitter = (opts.random ?? Math.random)() * opts.maxJitterMs;
  return Math.min(capped + jitter, opts.maxDelayMs + opts.maxJitterMs);
}
function serializeError(err) {
  if (!err) return { value: err };
  if (err instanceof Error) {
    const anyErr = err;
    return {
      name: err.name,
      message: err.message,
      code: anyErr.code,
      status: anyErr.status,
      stack: err.stack?.split("\n").slice(0, 8).join("\n"),
      cause: anyErr.cause ? String(anyErr.cause) : void 0
    };
  }
  if (typeof err === "object") {
    try {
      return { value: JSON.parse(JSON.stringify(err)) };
    } catch {
      return { value: String(err) };
    }
  }
  return { value: String(err) };
}
function defaultLog(level, payload) {
  if (typeof console === "undefined") return;
  const line = { tag: "retryWithBackoff", ts: (/* @__PURE__ */ new Date()).toISOString(), ...payload };
  if (level === "error") console.error("[retryWithBackoff]", line);
  else console.warn("[retryWithBackoff]", line);
}
async function retryWithBackoff(op, opts) {
  const sleep = opts.sleep ?? defaultSleep;
  const isRetryable = opts.isRetryable ?? isNetworkError;
  const log = opts.log ?? defaultLog;
  const label = opts.label ?? "anonymous";
  let lastError;
  let attempt = 0;
  for (attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      const value = await op();
      opts.onAttempt?.({ attempt, willRetry: false, delayMs: 0 });
      if (attempt > 1) {
        log("warn", { label, msg: "succeeded after retry", attempt });
      }
      return { ok: true, value, attempts: attempt };
    } catch (err) {
      lastError = err;
      const hasMore = attempt < opts.maxAttempts;
      const retry = hasMore && isRetryable(err);
      const delayMs = retry ? computeBackoffDelay(attempt - 1, opts) : 0;
      opts.onAttempt?.({ attempt, error: err, willRetry: retry, delayMs });
      log(retry ? "warn" : "error", {
        label,
        msg: retry ? "transient failure, retrying" : "giving up",
        attempt,
        maxAttempts: opts.maxAttempts,
        delayMs,
        retryable: isRetryable(err),
        error: serializeError(err)
      });
      if (!retry) break;
      await sleep(delayMs);
    }
  }
  return { ok: false, error: lastError, attempts: attempt };
}
const ListSchema = objectType({
  contacted: enumType(["all", "yes", "no"]).optional(),
  limit: numberType().int().min(1).max(1e3).optional()
});
const listLeads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ListSchema.parse(data ?? {})).handler(createSsrRpc("77acd1c20769f0aaa93fdea78adabaa9f8b27285e13363740e4c85703e8554bc"));
const MarkSchema = objectType({
  id: stringType().uuid(),
  contacted: booleanType(),
  actorId: stringType().uuid().nullable().optional()
});
const LeadDetailSchema = objectType({
  id: stringType().uuid()
});
const getLeadDetail = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => LeadDetailSchema.parse(data)).handler(createSsrRpc("1d72a981ddda94c3e788533eaae7d5cc47770ba4291f272c09ec798630f777a7"));
const getResultDetail = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => LeadDetailSchema.parse(data)).handler(createSsrRpc("db2365b3919f1b7b2667b010cf0d43aabf9c9502573319ac0c857bf82916c641"));
const LookupSchema = objectType({
  email: stringType().email()
});
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => LookupSchema.parse(data)).handler(createSsrRpc("5ad740de131cf43b837d0464e5b58252c7fef4ab1a5ec36eac8a5243e469a977"));
const ResultsListSchema = objectType({
  archetype: stringType().max(64).optional(),
  pathSlug: stringType().max(64).optional(),
  cohort: stringType().max(32).optional(),
  utm: stringType().max(64).optional(),
  minFit: numberType().int().min(0).max(100).optional(),
  maxFit: numberType().int().min(0).max(100).optional(),
  sinceDays: numberType().int().min(1).max(365).optional(),
  hasResult: enumType(["all", "yes", "no"]).optional(),
  limit: numberType().int().min(1).max(2e3).optional()
});
const listResults = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => ResultsListSchema.parse(data ?? {})).handler(createSsrRpc("feefac6ed2632b1257c5d929f3cb8c3e62bd6b70387b9954e3b017f9c346bb29"));
const markLeadContacted = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MarkSchema.parse(data)).handler(createSsrRpc("cd1707f1325761c7a6e97b12339b2bee1b055947db473310570bee0dba05c1f5"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => MarkSchema.parse(data)).handler(createSsrRpc("a2d83a89925a8e6fc39241e2456466dcf5d6d586aa004c0da5480d8504e9bcbb"));
const SubmitLeadSchema = objectType({
  sessionId: stringType().uuid(),
  name: stringType().min(1),
  phone: stringType().min(6),
  email: stringType().email(),
  whatsappOptin: booleanType(),
  resultPayload: recordType(stringType(), unknownType()),
  archetypeId: stringType(),
  fitScore: numberType(),
  topPaths: anyType()
});
const submitLeadEndpoint = createServerFn({
  method: "POST"
}).inputValidator((data) => SubmitLeadSchema.parse(data)).handler(createSsrRpc("c97af74688dabadc77afe17538c53df9173e6ee71221c2abd6c7a74c6bddef09"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("38714a784ef18026be665fb1d4b5b789c83232ca7f938cc0524b512160be5ff1"));
const adminOverview = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("a79cede85faaf45a8e23da0628f7235e83a0348365cc05732606cd932e6dfccd"));
const SESSION_KEY = "ce_session_id";
const SESSION_TOKEN_KEY = "ce_session_token";
const LEAD_KEY = "ce_lead_id";
const ANSWERS_KEY = "ce_answers";
const RESULT_KEY = "ce_result";
const PROFILE_KEY = "ce_profile";
const ATTEMPT_KEY = "ce_attempt_id";
const STARTED_AT_KEY = "ce_attempt_started_at";
const CLIENT_FP_KEY = "ce_client_fp";
const CE_ATTEMPT_TTL_MS = 2 * 60 * 60 * 1e3;
const LS_SNAPSHOT_KEY = "ce_snapshot_v1";
const EXPIRED_NOTICE_KEY = "ce_expired_notice";
const PERSIST_KEYS = [
  SESSION_KEY,
  SESSION_TOKEN_KEY,
  LEAD_KEY,
  ANSWERS_KEY,
  RESULT_KEY,
  PROFILE_KEY,
  ATTEMPT_KEY,
  STARTED_AT_KEY
];
function persistCareerEngineSnapshot() {
  if (typeof window === "undefined") return;
  try {
    const snap = { _savedAt: String(Date.now()) };
    let any = false;
    for (const k of PERSIST_KEYS) {
      const v = sessionStorage.getItem(k);
      if (v != null) {
        snap[k] = v;
        any = true;
      }
    }
    if (!any) {
      localStorage.removeItem(LS_SNAPSHOT_KEY);
      return;
    }
    localStorage.setItem(LS_SNAPSHOT_KEY, JSON.stringify(snap));
  } catch {
  }
}
function clearSnapshot() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LS_SNAPSHOT_KEY);
  } catch {
  }
}
function hasCompletedResult(raw) {
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    return !!(parsed && typeof parsed === "object" && "archetypeId" in parsed);
  } catch {
    return false;
  }
}
function hydrateCareerEngineSnapshot() {
  if (typeof window === "undefined") return { restored: false, expired: false };
  const sessionHasAttempt = !!sessionStorage.getItem(ATTEMPT_KEY);
  if (hasCompletedResult(sessionStorage.getItem(RESULT_KEY)))
    return { restored: false, expired: false };
  try {
    const raw = localStorage.getItem(LS_SNAPSHOT_KEY);
    if (!raw) return { restored: false, expired: false };
    const snap = JSON.parse(raw);
    if (!snap) return { restored: false, expired: false };
    const completedResult = hasCompletedResult(snap[RESULT_KEY]);
    if (sessionHasAttempt && !completedResult) return { restored: false, expired: false };
    const anchorRaw = snap[STARTED_AT_KEY] ?? snap._savedAt;
    const anchor = Number(anchorRaw);
    if (!completedResult && (!Number.isFinite(anchor) || anchor <= 0)) {
      clearSnapshot();
      return { restored: false, expired: false };
    }
    if (!completedResult && Date.now() - anchor > CE_ATTEMPT_TTL_MS) {
      clearSnapshot();
      try {
        sessionStorage.setItem(EXPIRED_NOTICE_KEY, "1");
      } catch {
      }
      return { restored: false, expired: true };
    }
    for (const k of PERSIST_KEYS) {
      if (snap[k] != null) sessionStorage.setItem(k, snap[k]);
    }
    return { restored: true, expired: false };
  } catch {
    return { restored: false, expired: false };
  }
}
function isAttemptExpired() {
  if (typeof window === "undefined") return false;
  if (hasCompletedResult(sessionStorage.getItem(RESULT_KEY))) return false;
  const v = sessionStorage.getItem(STARTED_AT_KEY);
  if (!v) return false;
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) return false;
  return Date.now() - n > CE_ATTEMPT_TTL_MS;
}
function hasResumableAttempt() {
  if (typeof window === "undefined") return false;
  if (isAttemptExpired()) return false;
  if (sessionStorage.getItem(RESULT_KEY)) return false;
  if (!sessionStorage.getItem(PROFILE_KEY)) return false;
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return !!parsed && typeof parsed === "object" && Object.keys(parsed).length > 0;
  } catch {
    return false;
  }
}
function consumeExpiredNotice() {
  if (typeof window === "undefined") return false;
  try {
    const v = sessionStorage.getItem(EXPIRED_NOTICE_KEY);
    if (v) sessionStorage.removeItem(EXPIRED_NOTICE_KEY);
    return !!v;
  } catch {
    return false;
  }
}
function getClientFingerprint() {
  if (typeof window === "undefined") return null;
  let fp = localStorage.getItem(CLIENT_FP_KEY);
  if (!fp) {
    fp = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    try {
      localStorage.setItem(CLIENT_FP_KEY, fp);
    } catch {
    }
  }
  return fp;
}
function isTransientCareerEngineError(err) {
  const raw = (err instanceof Error ? err.message : typeof err === "string" ? err : "") || "";
  const msg = raw.toLowerCase();
  if (!msg) return true;
  return msg.includes("failed to fetch") || msg.includes("load failed") || msg.includes("networkerror") || msg.includes("network error") || msg.includes("network request") || msg.includes("timeout") || msg.includes("timed out") || msg.includes("aborted") || msg.includes("offline") || msg.includes("fetch");
}
async function rpcWithRetry(label, op) {
  const result = await retryWithBackoff(op, {
    label,
    maxAttempts: 3,
    baseDelayMs: 400,
    maxDelayMs: 2e3,
    maxJitterMs: 200,
    isRetryable: isTransientCareerEngineError
  });
  if (result.ok) return result.value;
  throw result.error instanceof Error ? result.error : new Error(String(result.error ?? label + " failed"));
}
function getProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveProfile(p) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  persistCareerEngineSnapshot();
}
function resetCareerEngineState() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(LEAD_KEY);
  sessionStorage.removeItem(ANSWERS_KEY);
  sessionStorage.removeItem(RESULT_KEY);
  sessionStorage.removeItem(PROFILE_KEY);
  sessionStorage.removeItem(ATTEMPT_KEY);
  sessionStorage.removeItem(STARTED_AT_KEY);
  clearSnapshot();
}
function freshId(prefix) {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${id}`;
}
function getAttemptId() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ATTEMPT_KEY);
}
function startFreshAttempt(opts = {}) {
  if (typeof window === "undefined") return null;
  const profile = opts.preserveProfile === false ? null : sessionStorage.getItem(PROFILE_KEY);
  resetCareerEngineState();
  if (profile) sessionStorage.setItem(PROFILE_KEY, profile);
  resetSeed();
  const attemptId = freshId("attempt");
  sessionStorage.setItem(ATTEMPT_KEY, attemptId);
  Object.keys(sessionStorage).filter((k) => k.startsWith("ce_quiz_completed_")).forEach((k) => sessionStorage.removeItem(k));
  persistCareerEngineSnapshot();
  return attemptId;
}
function getSessionId() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_KEY);
}
function getSessionToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
}
function requireToken() {
  const t = getSessionToken();
  if (!t) throw new Error("session auth required");
  return t;
}
function getLeadId() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(LEAD_KEY);
}
function humanizeCareerEngineError(err, fallback) {
  const raw = (err instanceof Error ? err.message : typeof err === "string" ? err : "") || "";
  const msg = raw.toLowerCase();
  if (!msg) return fallback;
  if (msg.includes("invalid name")) return "Please enter your full name (2–80 characters).";
  if (msg.includes("invalid phone")) return "Please enter a valid 10-digit mobile number.";
  if (msg.includes("invalid email")) return "Please enter a valid email address.";
  if (msg.includes("hidden field") || msg.includes("autofill")) {
    return "Your browser autofilled a hidden field. Please refresh the page and try again.";
  }
  if (msg.includes("invalid question") || msg.includes("invalid answer")) {
    return "We couldn't save that answer. Please try again.";
  }
  if (msg.includes("session_id required"))
    return "Your session expired. Please refresh and try again.";
  if (msg.includes("lead_id required"))
    return "We lost track of your submission. Please refresh and try again.";
  if (msg.includes("permission denied") || msg.includes("not allowed") || msg.includes("rls")) {
    return "We couldn't reach the server. Please refresh and try again.";
  }
  if (msg.includes("failed to fetch") || msg.includes("networkerror") || msg.includes("network error") || msg.includes("timeout") || msg.includes("offline")) {
    return "Network issue — please check your connection and try again.";
  }
  if (msg.includes("rate") && msg.includes("limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (raw.length <= 140) return raw;
  return fallback;
}
async function startSession(stream, opts = {}) {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : null;
  const device = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
  const utm = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_source") : null;
  try {
    const data = await rpcWithRetry("ce_start_session", async () => {
      const { data: data2, error } = await supabase.rpc("ce_start_session", {
        p_stream: stream ?? void 0,
        p_device: device ?? void 0,
        p_utm_source: utm ?? void 0,
        p_user_agent: ua ?? void 0,
        p_honeypot: opts.honeypot ?? void 0,
        p_client_fp: getClientFingerprint() ?? void 0
      });
      if (error) throw new Error(error.message || "ce_start_session failed");
      return data2;
    });
    const row = Array.isArray(data) ? data[0] : data;
    if (!row) throw new Error("session start failed");
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, row.session_id);
      sessionStorage.setItem(SESSION_TOKEN_KEY, row.session_token);
      persistCareerEngineSnapshot();
    }
    return row.session_id;
  } catch (err) {
    console.warn("ce_start_session network fallback active", err);
    const fallbackId = `sess_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const fallbackTok = `tok_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, fallbackId);
      sessionStorage.setItem(SESSION_TOKEN_KEY, fallbackTok);
      persistCareerEngineSnapshot();
    }
    return fallbackId;
  }
}
async function recordAnswer(sessionId, questionId, answer) {
  try {
    const tok = getSessionToken();
    if (!tok || tok.startsWith("tok_local_")) return;
    await rpcWithRetry("ce_record_answer", async () => {
      const { error } = await supabase.rpc("ce_record_answer", {
        p_session_id: sessionId,
        p_question_id: questionId,
        p_answer: answer,
        p_session_token: tok
      });
      if (error) throw new Error(error.message || "ce_record_answer failed");
    });
  } catch (err) {
    console.warn("ce_record_answer fallback active", err);
  }
}
async function createLeadEarly(args) {
  try {
    const tok = getSessionToken();
    if (!tok || tok.startsWith("tok_local_")) throw new Error("Local session fallback active");
    const data = await rpcWithRetry("ce_create_lead_early", async () => {
      const { data: data2, error } = await supabase.rpc("ce_create_lead_early", {
        p_session_id: args.sessionId,
        p_name: args.name,
        p_phone: `91${args.phone}`,
        p_email: args.email,
        p_whatsapp_optin: args.whatsappOptin,
        p_session_token: tok
      });
      if (error) throw new Error(error.message || "Could not create lead");
      return data2;
    });
    if (typeof window !== "undefined" && data) {
      sessionStorage.setItem(LEAD_KEY, data);
      persistCareerEngineSnapshot();
    }
    return data;
  } catch (err) {
    console.warn("ce_create_lead_early fallback active", err);
    const fallbackLeadId = `lead_local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    if (typeof window !== "undefined") {
      sessionStorage.setItem(LEAD_KEY, fallbackLeadId);
      persistCareerEngineSnapshot();
    }
    return fallbackLeadId;
  }
}
async function finalizeLead(args) {
  try {
    const tok = getSessionToken();
    if (!tok || tok.startsWith("tok_local_") || args.leadId.startsWith("lead_local_")) return;
    await rpcWithRetry("ce_finalize_lead", async () => {
      const { error } = await supabase.rpc("ce_finalize_lead", {
        p_lead_id: args.leadId,
        p_archetype: args.result.archetypeId,
        p_top_paths: args.result.archetype.topPaths,
        p_fit_score: args.result.fitScore,
        p_result_payload: {
          breakdown: args.result.breakdown,
          risks: args.result.risks,
          traitScores: args.result.traitScores,
          confidence: args.result.confidence,
          confidenceBand: args.result.confidenceBand,
          microAccuracy: args.result.microAccuracy,
          ranking: args.result.ranking.map((r) => ({ id: r.id, fit: r.fit })),
          notFit: { id: args.result.notFit.id, fit: args.result.notFit.fit },
          notFitReasons: args.result.notFitReasons,
          evidence: args.result.evidence,
          resultMeta: args.result.resultMeta,
          aiAnalysis: args.result.aiAnalysis,
          archetype: {
            name: args.result.archetype.name,
            tagline: args.result.archetype.tagline,
            emoji: args.result.archetype.emoji,
            pathSlug: args.result.archetype.pathSlug
          }
        },
        p_session_token: tok
      });
      if (error) throw new Error(error.message || "Could not save result");
    });
    try {
      void fetch("/api/public/career-engine-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: args.leadId }),
        keepalive: true
      });
    } catch (e) {
      console.warn("career-engine-notify trigger failed", e);
    }
  } catch (err) {
    console.warn("ce_finalize_lead fallback active", err);
  }
}
async function submitLead(args) {
  const resultPayload = {
    breakdown: args.result.breakdown,
    risks: args.result.risks,
    traitScores: args.result.traitScores,
    confidence: args.result.confidence,
    confidenceBand: args.result.confidenceBand,
    microAccuracy: args.result.microAccuracy,
    ranking: args.result.ranking.map((r) => ({ id: r.id, fit: r.fit })),
    notFit: { id: args.result.notFit.id, fit: args.result.notFit.fit },
    notFitReasons: args.result.notFitReasons,
    evidence: args.result.evidence,
    resultMeta: args.result.resultMeta,
    aiAnalysis: args.result.aiAnalysis,
    archetype: {
      name: args.result.archetype.name,
      tagline: args.result.archetype.tagline,
      emoji: args.result.archetype.emoji,
      pathSlug: args.result.archetype.pathSlug
    }
  };
  try {
    const { data } = await submitLeadEndpoint({
      data: {
        sessionId: args.sessionId,
        name: args.name,
        phone: args.phone,
        email: args.email,
        whatsappOptin: args.whatsappOptin,
        resultPayload,
        archetypeId: args.result.archetypeId,
        fitScore: args.result.fitScore,
        topPaths: args.result.archetype.topPaths
      }
    });
    if (!data) throw new Error("No data returned from submitLeadEndpoint");
    if (typeof window !== "undefined") sessionStorage.setItem(LEAD_KEY, data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to submit lead");
  }
}
async function getResult(leadId) {
  const { data, error } = await supabase.rpc("ce_get_result", { p_lead_id: leadId });
  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}
async function setCohort(leadId, cohortId) {
  await rpcWithRetry("ce_set_cohort", async () => {
    const { error } = await supabase.rpc("ce_set_cohort", {
      p_lead_id: leadId,
      p_cohort_id: cohortId,
      p_session_token: requireToken()
    });
    if (error) throw new Error(error.message || "Could not save cohort selection");
  });
}
stringType().min(1).max(128).nullable().optional();
stringType().min(1).max(80).regex(/^[a-z0-9-]+$/, "lowercase slug");
enumType(["flagship", "secondary"]);
enumType(["card", "hero_cta", "compare"]);
numberType().finite().min(0).max(100);
enumType(["foundation", "developing", "industry_ready"]);
function trackAttemptStarted(args) {
  track("ce_attempt_started", {
    session_id: args.sessionId,
    props: {
      attempt_id: args.attemptId,
      seed: args.seed ?? null,
      stream: args.stream ?? null
    }
  });
}
function trackQuestionViewed(args) {
  track("ce_question_viewed", {
    session_id: args.sessionId,
    props: {
      attempt_id: args.attemptId,
      question_id: args.questionId,
      kind: args.kind,
      index: args.index,
      total: args.total
    }
  });
}
function trackQuestionAnswered(args) {
  track("ce_question_answered", {
    session_id: args.sessionId,
    props: {
      attempt_id: args.attemptId,
      question_id: args.questionId,
      kind: args.kind,
      value: args.value,
      index: args.index,
      total: args.total,
      latency_ms: args.latencyMs
    }
  });
}
function trackAttemptSubmitted(args) {
  track("ce_attempt_submitted", {
    session_id: args.sessionId,
    lead_id: args.leadId,
    props: {
      attempt_id: args.attemptId,
      seed: args.seed ?? null,
      answered: args.answered,
      elapsed_ms: args.elapsedMs
    }
  });
}
function trackAttemptOutcome(args) {
  const payload = {
    lead_id: args.leadId,
    props: {
      attempt_id: args.attemptId,
      archetype: args.archetype,
      fit_score: args.fitScore,
      confidence: args.confidence,
      confidence_band: args.confidenceBand,
      top_path: args.topPath ?? null,
      top_evidence: args.topEvidence
    }
  };
  void retryWithBackoff(() => sendTrackedEvent("ce_attempt_outcome", payload), {
    label: "ce_attempt_outcome",
    maxAttempts: 4,
    baseDelayMs: 500,
    maxDelayMs: 8e3,
    maxJitterMs: 250
  }).then((res) => {
    if (!res.ok) {
      try {
        console.error("[careerEngineAnalytics] ce_attempt_outcome failed", {
          attempts: res.attempts,
          attempt_id: args.attemptId,
          lead_id: args.leadId
        });
      } catch {
      }
    }
  });
}
async function sendTrackedEvent(eventName, extra) {
  if (typeof window === "undefined") return;
  try {
    if (navigator?.doNotTrack === "1") return;
  } catch {
  }
  const url = new URL(window.location.href);
  const utm = url.searchParams.get("utm_source") ?? url.searchParams.get("utm") ?? getAttributionUtmSource() ?? null;
  const attributionProps = getAttributionProps();
  await trackEvent({
    data: {
      event_name: eventName,
      anon_id: getAnonId(),
      session_id: extra.session_id ?? null,
      application_id: extra.application_id ?? null,
      lead_id: extra.lead_id ?? null,
      path: url.pathname + url.search,
      referrer: document.referrer || null,
      utm_source: utm,
      program_slug: extra.program_slug ?? null,
      cohort: extra.cohort ?? null,
      props: { ...attributionProps, ...extra.props ?? {} }
    }
  });
}
function trackAttemptRetake(args) {
  track("ce_attempt_retake", {
    props: { previous_attempt_id: args.previousAttemptId }
  });
}
function trackCEFunnelStep(args) {
  track(`ce_${args.step}_viewed`, {
    session_id: args.sessionId ?? null,
    lead_id: args.leadId ?? null,
    props: {
      funnel_step: args.step,
      attempt_id: args.attemptId ?? null,
      ...args.extra ?? {}
    }
  });
}
function trackCECtaClicked(args) {
  track("ce_cta_clicked", {
    session_id: args.sessionId ?? null,
    lead_id: args.leadId ?? null,
    props: {
      funnel_step: args.step,
      target: args.target,
      attempt_id: args.attemptId ?? null
    }
  });
}
function StartFreshButton({ label = "Start fresh", className }) {
  const navigate = useNavigate();
  const handleClick = () => {
    const previousAttemptId = getAttemptId();
    startFreshAttempt({ preserveProfile: true });
    trackAttemptRetake({ previousAttemptId });
    if (typeof window !== "undefined") {
      window.location.href = "/career-engine/start";
      return;
    }
    navigate({ to: "/career-engine/start" }).catch(() => {
      if (typeof window !== "undefined") window.location.href = "/career-engine/start";
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleClick,
      className: className ?? "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/65 transition hover:border-white/30 hover:bg-white/[0.05] hover:text-white",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
        label
      ]
    }
  );
}
function StickyResultCta({ leadId }) {
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const waText = "Hi Arzon — I just completed my Career Brief and want to lock my seat for the upcoming cohort.";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-hidden": !visible,
      className: `pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto mx-auto max-w-3xl px-3 pb-3 sm:pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/15 bg-[#0B0F19]/95 p-3.5 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: waLink(waText),
            target: "_blank",
            rel: "noopener noreferrer",
            "data-testid": "brief-whatsapp",
            onClick: () => trackCECtaClicked({
              step: "result",
              target: "whatsapp",
              leadId,
              attemptId: getAttemptId()
            }),
            className: "flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-3 text-xs font-bold text-emerald-400 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-emerald-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Chat with Mentor on WhatsApp" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/career-engine/enrol",
            onClick: () => trackCECtaClicked({
              step: "result",
              target: "confirm_seat",
              leadId,
              attemptId: getAttemptId()
            }),
            className: "flex-1 text-xs px-5 py-3 rounded-xl inline-flex flex-col items-center justify-center text-white font-bold bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-white" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Lock Seat · ",
                  PRICE_SEAT_LOCK,
                  " Deposit"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-normal opacity-90", children: "Fully adjusted on cohort start date" })
            ]
          }
        )
      ] }) })
    }
  );
}
function ResultNextStepCard({
  leadId,
  archetypeLabel,
  fitScore
}) {
  const waText = `Hi Arzon — I got a ${archetypeLabel} fit score of ${fitScore}/100 and want help choosing the next step.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 rounded-[28px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] sm:p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " Strongest next move"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-grotesk text-2xl font-bold text-white", children: "Reserve your seat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-white/75", children: "Your fit report is most useful when you act while it is fresh. Lock in the next open cohort, get a 1-on-1 onboarding call, and keep your place fully adjusted against the full programme fee." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-[#091425]/80 px-4 py-3 text-sm text-white/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-micro uppercase tracking-[0.2em] text-white/50", children: "Seat reservation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-grotesk text-xl font-semibold text-white", children: SEAT_FEE }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-white/60", children: "Fully adjusted in your fee" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.04] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-grotesk text-sm font-semibold text-white", children: "Next cohort" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/70", children: "Choose the next live batch before it fills." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.04] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-grotesk text-sm font-semibold text-white", children: "Proof-backed path" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/70", children: "Your reservation is credited against the full programme fee." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.04] p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-grotesk text-sm font-semibold text-white", children: "1-on-1 onboarding" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/70", children: "A counsellor helps you move from insight to action within 24 hours." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/career-engine/enrol",
          onClick: () => trackCECtaClicked({
            step: "result",
            target: "confirm_seat",
            leadId,
            attemptId: getAttemptId()
          }),
          className: "btn btn-gold inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold",
          children: [
            "Reserve my seat · ",
            SEAT_FEE,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: waLink(waText),
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: () => trackCECtaClicked({
            step: "result",
            target: "whatsapp",
            leadId,
            attemptId: getAttemptId()
          }),
          className: "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
            " Talk to a counsellor"
          ]
        }
      )
    ] })
  ] });
}
const DEFAULT_SKILLS = [
  {
    domain: "GCP & Regulatory Compliance",
    score: 88,
    maxScore: 100,
    status: "strong",
    remediationModule: "ICH-GCP E6(R2) Guidelines Refresher"
  },
  {
    domain: "MedDRA & Safety Coding",
    score: 74,
    maxScore: 100,
    status: "adequate",
    remediationModule: "MedDRA Terminology & Adverse Event Coding"
  },
  {
    domain: "Pharmacovigilance Signal Detection",
    score: 58,
    maxScore: 100,
    status: "needs_work",
    remediationModule: "15-Min Signal Detection & Case Safety Masterclass"
  },
  {
    domain: "Clinical Data Management (EDC)",
    score: 82,
    maxScore: 100,
    status: "strong",
    remediationModule: "eCRF Design & Query Resolution Basics"
  },
  {
    domain: "Clinical Trial Protocol Analysis",
    score: 69,
    maxScore: 100,
    status: "adequate",
    remediationModule: "Protocol Deviation & Monitoring Logs"
  }
];
function SkillRadarChart({
  skills = DEFAULT_SKILLS,
  overallFitScore = 78
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/20 p-6 sm:p-8 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5" }),
          " ACRI Adaptive Skill Diagnostic Radar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-grotesk text-2xl font-bold text-white", children: "Skill Competency Matrix" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mt-1", children: "Real-time evaluation across 5 core healthcare career pillars." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 text-center sm:text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro font-semibold text-slate-400 uppercase tracking-widest", children: "Overall ACRI Score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-grotesk text-3xl font-black text-sky-400", children: [
          overallFitScore,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: skills.map((skill) => {
      const isStrong = skill.status === "strong";
      const isAdequate = skill.status === "adequate";
      const isNeedsWork = skill.status === "needs_work";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-slate-800 bg-slate-950/50 p-4 sm:p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-white", children: skill.domain }),
                isStrong && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-emerald-500/20 px-2 py-0.5 text-micro font-bold text-emerald-400", children: "Strong Match" }),
                isAdequate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-amber-500/20 px-2 py-0.5 text-micro font-bold text-amber-400", children: "Good Foundation" }),
                isNeedsWork && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-red-500/20 px-2 py-0.5 text-micro font-bold text-red-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3" }),
                  " Focus Required"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold text-slate-300", children: [
                skill.score,
                " / ",
                skill.maxScore
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded-full bg-slate-800 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full transition-all duration-500 ${isStrong ? "bg-emerald-400" : isAdequate ? "bg-amber-400" : "bg-red-400"}`,
                style: { width: `${skill.score}%` }
              }
            ) }),
            !isStrong && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-slate-900/80 px-3.5 py-2.5 border border-slate-800/80 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-slate-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-sky-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Recommended 15-Min Fix: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: skill.remediationModule })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 text-xs text-sky-400 hover:text-white hover:bg-sky-500/20 font-semibold shrink-0",
                  onClick: () => window.location.href = "/curriculum",
                  children: [
                    "Review Lesson ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-3 w-3" })
                  ]
                }
              )
            ] })
          ]
        },
        skill.domain
      );
    }) })
  ] });
}
const PATHS$1 = {
  "medical-coding": {
    slug: "medical-coding",
    title: "Medical Coding",
    salary: "₹3 – 6 LPA",
    blurb: "ICD-10 / CPT coding work for US/EU payers. Desk job, high accuracy, US night shift common.",
    weights: { detail: 6, compliance: 3, screen: 3, logic: 1.5, language: 1 },
    hard: [
      { trait: "screen", min: 0, penalty: 25 },
      { trait: "detail", min: 0, penalty: 18 }
    ]
  },
  pharmacovigilance: {
    slug: "pharmacovigilance",
    title: "Pharmacovigilance",
    salary: "₹3.5 – 7 LPA",
    blurb: "Catch and report adverse drug events. Heavy English reading, careful documentation.",
    weights: { empathy: 3.5, detail: 3, language: 3, writing: 2.5, compliance: 2, patient: 2 },
    hard: [
      { trait: "language", min: 0, penalty: 22 },
      { trait: "empathy", min: 0, penalty: 12 }
    ]
  },
  "clinical-data-management": {
    slug: "clinical-data-management",
    title: "Clinical Data Management",
    salary: "₹4 – 8 LPA",
    blurb: "Own the data behind a clinical trial — clean, query, lock. EDC tools daily.",
    weights: { data: 5, detail: 3, logic: 2.5, screen: 2, compliance: 2, tech: 1 },
    hard: [
      { trait: "data", min: 0, penalty: 20 },
      { trait: "detail", min: 0, penalty: 12 }
    ]
  },
  "regulatory-affairs": {
    slug: "regulatory-affairs",
    title: "Regulatory Affairs",
    salary: "₹4 – 9 LPA",
    blurb: "Build the dossier between drug and regulator. Long documents, high compliance bar.",
    weights: { compliance: 5, writing: 4, language: 4, detail: 2, pressure: 1 },
    hard: [
      { trait: "compliance", min: 0, penalty: 25 },
      { trait: "language", min: 0, penalty: 20 },
      { trait: "writing", min: -1, penalty: 12 }
    ]
  },
  "sas-clinical": {
    slug: "sas-clinical",
    title: "SAS Programming (Clinical)",
    salary: "₹4.5 – 10 LPA",
    blurb: "Programme the analyses behind clinical trial submissions. Logic + data + a real shipping habit.",
    weights: { logic: 4, tech: 4, data: 4, detail: 2, screen: 1.5 },
    hard: [
      { trait: "logic", min: 0, penalty: 18 },
      { trait: "tech", min: -1, penalty: 14 }
    ]
  },
  "ai-intelligence": {
    slug: "ai-intelligence",
    title: "AI in Healthcare",
    salary: "₹6 – 14 LPA",
    blurb: "Build AI tools for clinical, payer or pharma workflows. Highest pay, steepest curve.",
    weights: { tech: 6, logic: 4, data: 2, screen: 1.5 },
    hard: [
      { trait: "tech", min: 0, penalty: 28 },
      { trait: "logic", min: 0, penalty: 14 }
    ],
    bonuses: [
      { id: "built_anything", value: "shipped", bonus: 8 },
      { id: "built_anything", value: "finished", bonus: 4 },
      { id: "git_use", value: "use", bonus: 4 },
      { id: "ai_relation", value: "build", bonus: 4 }
    ]
  },
  "clinical-saas": {
    slug: "clinical-saas",
    title: "Clinical SaaS Programme",
    salary: "₹6 – 12 LPA",
    blurb: "Customer-facing roles in clinical SaaS — sales, success, ops. People + systems hybrid.",
    weights: { sales: 5, pressure: 3, empathy: 1.5, compliance: 1.5, patient: 1, tech: 1 },
    hard: [
      { trait: "sales", min: 0, penalty: 22 },
      { trait: "pressure", min: -1, penalty: 12 }
    ],
    bonuses: [
      { id: "led_anything", value: "many", bonus: 6 },
      { id: "led_anything", value: "once", bonus: 3 },
      { id: "small_money", value: "regular", bonus: 4 }
    ]
  }
};
PATHS$1["software-engineer"] = {
  slug: "software-engineer",
  title: "Software Engineer (Product / Backend)",
  salary: "₹6 – 14 LPA",
  blurb: "Build product backends and APIs. Indian product co's pay 2-3x service co's. Strongest demand for B.Tech / B.E.",
  weights: { tech: 6, logic: 4, data: 1.5, screen: 1, detail: 1 },
  hard: [
    { trait: "tech", min: 0, penalty: 26 },
    { trait: "logic", min: 0, penalty: 14 }
  ],
  bonuses: [
    { id: "built_anything", value: "shipped", bonus: 8 },
    { id: "built_anything", value: "finished", bonus: 4 },
    { id: "git_use", value: "use", bonus: 4 }
  ]
};
PATHS$1["business-analyst"] = {
  slug: "business-analyst",
  title: "Business Analyst / Data Analyst",
  salary: "₹5 – 10 LPA",
  blurb: "Bridge between business and data. SQL + Excel + storytelling. Hires B.Com / BBA / Economics graduates.",
  weights: { data: 5, logic: 3, writing: 2, sales: 2, screen: 1, detail: 1 },
  hard: [
    { trait: "data", min: 0, penalty: 18 },
    { trait: "logic", min: -1, penalty: 10 }
  ]
};
PATHS$1["b2b-saas-sales"] = {
  slug: "b2b-saas-sales",
  title: "B2B SaaS Sales / Customer Success",
  salary: "₹5 – 11 LPA + variable",
  blurb: "Quota-carrying inside sales / CSM at Indian SaaS. BBA / Arts / Commerce friendly. Variable pay scales fast.",
  weights: { sales: 6, pressure: 3, empathy: 2, language: 1.5, writing: 1 },
  hard: [
    { trait: "sales", min: 0, penalty: 24 },
    { trait: "pressure", min: -1, penalty: 10 }
  ],
  bonuses: [
    { id: "led_anything", value: "many", bonus: 6 },
    { id: "led_anything", value: "once", bonus: 3 },
    { id: "small_money", value: "regular", bonus: 4 }
  ]
};
PATHS$1["agri-tech-ops"] = {
  slug: "agri-tech-ops",
  title: "Agri-Tech Product Operations",
  salary: "₹4 – 9 LPA",
  blurb: "Field-aware product/ops at Indian agri-tech (DeHaat, Ninjacart, Cropin). Combines crop knowledge with data + sales.",
  weights: { sales: 3, data: 3, lab: 3, compliance: 2, tech: 1.5, pressure: 1, empathy: 1 },
  hard: [{ trait: "sales", min: -1, penalty: 8 }]
};
const COURSE_TO_DOMAIN = {
  pharma: "healthcare",
  lifesci: "healthcare",
  med: "healthcare",
  engg: "tech",
  comm: "business",
  agri: "agri",
  arts: "comm-services"
};
const DOMAIN_PATHS = {
  healthcare: [
    "medical-coding",
    "pharmacovigilance",
    "clinical-data-management",
    "regulatory-affairs",
    "sas-clinical"
  ],
  tech: ["software-engineer", "ai-intelligence", "sas-clinical", "business-analyst"],
  business: ["b2b-saas-sales", "clinical-saas", "business-analyst", "regulatory-affairs"],
  agri: ["agri-tech-ops", "business-analyst", "b2b-saas-sales"],
  "comm-services": ["b2b-saas-sales", "clinical-saas", "pharmacovigilance"]
};
const CROSS_DOMAIN_CAP = 42;
const path = (slug) => {
  const p = PATHS$1[slug];
  return { slug: p.slug, title: p.title, salary: p.salary };
};
const ARCHETYPES = {
  coder: {
    id: "coder",
    name: "The Detail-Driven Coder",
    tagline: "Patience for codes, eye for accuracy.",
    description: "You like rules, patterns and getting things exactly right. Medical Coding rewards exactly that, and demand in India is strong.",
    emoji: "🩺",
    pathSlug: "pharma",
    needs: ["High screen tolerance", "Strong attention to detail", "Comfort with repetition"],
    dealbreakers: ["Low screen tolerance", "Dislikes repetitive desk work"],
    topPaths: [path("medical-coding"), path("clinical-data-management"), path("pharmacovigilance")]
  },
  sentinel: {
    id: "sentinel",
    name: "The Patient-Safety Sentinel",
    tagline: "Your job: catch what others miss.",
    description: "You read carefully, write clearly and feel responsibility for patient outcomes. Pharmacovigilance is built around people like you.",
    emoji: "🛡️",
    pathSlug: "pharma",
    needs: ["Careful English reading", "Empathy for patient safety", "Documentation discipline"],
    dealbreakers: ["Weak English reading", "Low empathy / patient-care interest"],
    topPaths: [path("pharmacovigilance"), path("clinical-data-management"), path("medical-coding")]
  },
  data_storyteller: {
    id: "data_storyteller",
    name: "The Data Storyteller",
    tagline: "You see the pattern in the noise.",
    description: "You're comfortable with numbers and you can explain them. Clinical Data Management and SAS pay well and never have empty seats.",
    emoji: "📊",
    pathSlug: "tech",
    needs: ["Comfort with spreadsheets/data", "Logical reasoning", "Screen stamina"],
    dealbreakers: ["Avoids numbers / spreadsheets", "Low logic micro-task accuracy"],
    topPaths: [path("clinical-data-management"), path("sas-clinical"), path("ai-intelligence")]
  },
  regulatory_architect: {
    id: "regulatory_architect",
    name: "The Regulatory Architect",
    tagline: "You build the wall between drug and danger.",
    description: "Long documents don't scare you. You like rules, you like writing, you like being the person who gets the submission right.",
    emoji: "📜",
    pathSlug: "pharma",
    needs: ["Strong English writing", "High compliance mindset", "Tolerance for long documents"],
    dealbreakers: ["Pushes back on rules", "Avoids long-form reading"],
    topPaths: [
      path("regulatory-affairs"),
      path("pharmacovigilance"),
      path("clinical-data-management")
    ]
  },
  operator: {
    id: "operator",
    name: "The Healthcare Operator",
    tagline: "You make systems run.",
    description: "You're a people-person with a head for systems. Healthcare needs operators, sales leaders and account managers — high pay, fast growth.",
    emoji: "💼",
    pathSlug: "business",
    needs: ["Comfort talking to strangers", "Pressure tolerance", "Has organised people before"],
    dealbreakers: ["Drained by phone calls", "Has never led anything"],
    topPaths: [path("clinical-saas"), path("regulatory-affairs"), path("pharmacovigilance")]
  },
  ai_builder: {
    id: "ai_builder",
    name: "The AI-Healthcare Builder",
    tagline: "Build the next generation of medical tools.",
    description: "You like building, you're curious about AI, and you're comfortable with logic. AI in Healthcare is the highest-paid track we offer.",
    emoji: "🤖",
    pathSlug: "tech",
    needs: ["Has shipped or built something", "Strong logic puzzle accuracy", "Daily AI tool use"],
    dealbreakers: ["Has never built anything technical", "Low logic/pattern reasoning"],
    topPaths: [path("ai-intelligence"), path("clinical-saas"), path("sas-clinical")]
  }
};
const ARCHETYPE_PRIMARY_PATHS = {
  coder: ["medical-coding"],
  sentinel: ["pharmacovigilance"],
  data_storyteller: ["clinical-data-management", "sas-clinical"],
  regulatory_architect: ["regulatory-affairs"],
  operator: ["clinical-saas"],
  ai_builder: ["ai-intelligence"]
};
const TRAITS = [
  "detail",
  "logic",
  "language",
  "screen",
  "patient",
  "data",
  "writing",
  "sales",
  "compliance",
  "tech",
  "lab",
  "empathy",
  "pressure"
];
function emptyTraits() {
  return TRAITS.reduce((acc, t) => (acc[t] = 0, acc), {});
}
const MAX_PER_TRAIT = (() => {
  const m = emptyTraits();
  for (const q of QUESTIONS) {
    const best = emptyTraits();
    for (const opt of q.options) {
      if (!opt.weights) continue;
      for (const t of TRAITS) {
        const v = opt.weights[t] ?? 0;
        if (v > best[t]) best[t] = v;
      }
    }
    for (const t of TRAITS) m[t] += best[t];
  }
  for (const t of TRAITS) if (m[t] <= 0) m[t] = 1;
  return m;
})();
function tally(answers) {
  const raw = emptyTraits();
  let microTotal = 0;
  let microCorrect = 0;
  let answered = 0;
  for (const q of QUESTIONS) {
    const v = answers[q.id];
    if (!v) continue;
    answered++;
    const opt = q.options.find((o) => o.value === v);
    if (!opt) continue;
    if (opt.weights) {
      for (const t of TRAITS) {
        raw[t] += opt.weights[t] ?? 0;
      }
    }
    if (q.kind === "micro") {
      microTotal += 1;
      if (opt.correct) microCorrect += 1;
    }
  }
  const norm = emptyTraits();
  for (const t of TRAITS) {
    norm[t] = clamp(raw[t] / MAX_PER_TRAIT[t] * 10, -10, 10);
  }
  return { raw, norm, microTotal, microCorrect, answered };
}
const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));
function pathImpactForAnswer(pdef, q, chosen) {
  const opt = q.options.find((o) => o.value === chosen);
  if (!opt) return 0;
  const weighted = Object.entries(pdef.weights).reduce((sum, [trait, pathWeight]) => {
    return sum + (opt.weights?.[trait] ?? 0) * (pathWeight ?? 0);
  }, 0);
  const bonus = pdef.bonuses?.reduce(
    (sum, b) => sum + (b.id === q.id && b.value === chosen ? b.bonus : 0),
    0
  ) ?? 0;
  return Math.round((weighted + bonus) * 10) / 10;
}
function archetypeImpactFromPaths(id, pathImpacts) {
  const owned = new Set(ARCHETYPE_PRIMARY_PATHS[id]);
  return Math.round(pathImpacts.reduce((sum, p) => sum + (owned.has(p.slug) ? p.delta : 0), 0) * 10) / 10;
}
function scorePath(pdef, norm, answers, microPct) {
  let score = 35;
  for (const [t, w] of Object.entries(pdef.weights)) {
    score += norm[t] * w;
  }
  if (pdef.hard) {
    for (const h of pdef.hard) {
      if (norm[h.trait] < h.min) score -= h.penalty;
    }
  }
  if (pdef.bonuses) {
    for (const b of pdef.bonuses) {
      if (answers[b.id] === b.value) score += b.bonus;
    }
  }
  const microWeight = pdef.weights.logic ?? pdef.weights.detail ?? 0;
  if (microWeight > 0 && microPct > 0) {
    score += (microPct - 50) * 0.05 * (microWeight / 4);
  }
  if (answers.course === "pharma" || answers.course === "lifesci" || answers.course === "med") {
    if (pdef.slug !== "ai-intelligence" && pdef.slug !== "clinical-saas") score += 3;
  }
  if (answers.course === "engg" && (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical")) {
    score += 5;
  }
  if (answers.course === "engg") {
    if (pdef.slug === "software-engineer") score += 12;
    if (pdef.slug === "business-analyst") score += 4;
    if (pdef.slug === "ai-intelligence") score += 4;
    if (pdef.slug === "medical-coding" || pdef.slug === "pharmacovigilance") score -= 4;
  }
  if (answers.course === "agri") {
    if (pdef.slug === "agri-tech-ops") score += 14;
    if (pdef.slug === "business-analyst") score += 5;
    if (pdef.slug === "b2b-saas-sales") score += 4;
    if (pdef.slug === "regulatory-affairs") score += 2;
    if (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical") score -= 4;
    if (pdef.slug === "medical-coding" || pdef.slug === "pharmacovigilance") score -= 5;
    if (pdef.slug === "clinical-data-management") score -= 3;
  }
  if (answers.course === "comm") {
    if (pdef.slug === "b2b-saas-sales") score += 12;
    if (pdef.slug === "business-analyst") score += 8;
    if (pdef.slug === "clinical-saas") score += 6;
    if (pdef.slug === "regulatory-affairs") score += 1;
    if (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical") score -= 3;
    if (pdef.slug === "software-engineer") score -= 4;
    if (pdef.slug === "medical-coding") score -= 3;
    if (pdef.slug === "pharmacovigilance") score -= 2;
  }
  if (answers.course === "arts") {
    if (pdef.slug === "b2b-saas-sales") score += 10;
    if (pdef.slug === "clinical-saas") score += 6;
    if (pdef.slug === "pharmacovigilance") score += 4;
    if (pdef.slug === "regulatory-affairs") score += 3;
    if (pdef.slug === "ai-intelligence" || pdef.slug === "sas-clinical") score -= 4;
    if (pdef.slug === "software-engineer") score -= 6;
    if (pdef.slug === "medical-coding") score -= 2;
  }
  const domain = COURSE_TO_DOMAIN[answers.course];
  if (domain && !DOMAIN_PATHS[domain].includes(pdef.slug)) {
    score = Math.min(score, CROSS_DOMAIN_CAP);
  }
  const contribs = Object.entries(pdef.weights).map(([t, w]) => ({ trait: t, impact: norm[t] * w })).sort((a, b) => b.impact - a.impact);
  const reasons = contribs.filter((c) => c.impact > 0).slice(0, 3).map((c) => `Strong ${c.trait}`);
  return { slug: pdef.slug, path: pdef, fit: clamp(score), reasons };
}
function archetypeFitFromPaths(id, pathScores) {
  const owned = ARCHETYPE_PRIMARY_PATHS[id];
  const ownedScores = owned.map((s) => pathScores[s].fit).sort((a, b) => b - a);
  const top = ownedScores[0] ?? 0;
  const second = ownedScores[1] ?? top;
  return clamp(top * 0.7 + second * 0.3);
}
function confidenceBand(gap, microPct) {
  if (gap >= 18 && microPct >= 60) return "highly_recommended";
  if (gap >= 10) return "recommended";
  if (gap >= 4) return "two_strong";
  return "exploratory";
}
function aptitudeScore(n, microPct) {
  return clamp(50 + (n.detail + n.logic + n.language + n.data) * 2.2 + (microPct - 50) * 0.4);
}
function interestScore(n) {
  return clamp(
    50 + (n.patient + n.writing + n.sales + n.tech + n.lab + n.compliance + n.empathy) * 1.4
  );
}
function backgroundScore(a) {
  const internship = a.internship === "paid" ? 35 : a.internship === "paid_other" ? 22 : a.internship === "unpaid" ? 18 : 10;
  const english = a.english_self === "fluent" ? 28 : a.english_self === "good" ? 20 : a.english_self === "okay" ? 12 : 4;
  const year = a.year && a.year !== "1" ? 22 : 12;
  const courseFit = a.course === "pharma" || a.course === "med" || a.course === "lifesci" ? 12 : 6;
  return clamp(internship + english + year + courseFit);
}
function commitmentScore(a) {
  const hours = a.study_hours === "20p" ? 45 : a.study_hours === "10_20" ? 35 : a.study_hours === "5_10" ? 22 : 8;
  const start = a.start_when === "now" ? 30 : a.start_when === "next" ? 22 : 10;
  const budget = a.budget === "30p" ? 22 : a.budget === "15_30" ? 16 : a.budget === "emi" ? 14 : 8;
  return clamp(hours + start + budget);
}
function buildRisks(n, a, archetype, microPct) {
  const out = [];
  if (archetype === "coder" && n.screen <= 0) {
    out.push({
      level: "warn",
      text: "Heads up: your screen tolerance is low. Pure coding work may burn you out — consider QA or audit roles."
    });
  }
  if ((archetype === "sentinel" || archetype === "regulatory_architect") && n.language <= 0) {
    out.push({
      level: "warn",
      text: "English fluency strongly affects PV and Regulatory roles. We'll add a free English upgrade module."
    });
  }
  if (archetype === "ai_builder" && a.built_anything === "no") {
    out.push({
      level: "info",
      text: "AI scored high but you've never built anything. Plan: a 4-week Python primer before the main programme."
    });
  }
  if (archetype === "operator" && a.led_anything === "no") {
    out.push({
      level: "info",
      text: "Operator roles need leadership reps. We'll pair you with live client projects to build that muscle."
    });
  }
  if (a.study_hours === "lt5") {
    out.push({
      level: "warn",
      text: "Under 5 hours/week is too light to keep up with the cohort. Aim for 8+."
    });
  }
  if ((a.salary === "high" || a.salary === "vhigh") && a.year === "1") {
    out.push({
      level: "info",
      text: "₹6 LPA+ in year 1 is rare for freshers. Most reach this in 18–24 months."
    });
  }
  if (microPct > 0 && microPct < 50) {
    out.push({
      level: "warn",
      text: "You scored below 50% on the mini skill-checks. We recommend our foundation track first."
    });
  }
  return out;
}
function notFitReasons(notFit, n, a) {
  const r = [];
  switch (notFit) {
    case "coder":
      if (n.screen <= 0) r.push("Low tolerance for long screen sessions");
      if (n.detail <= 0) r.push("Repetitive accuracy work isn't your strength right now");
      if (a.wfh === "field") r.push("You prefer field work over a desk");
      break;
    case "sentinel":
      if (n.language <= 0) r.push("English reading at work-pace would be a bottleneck");
      if (n.empathy <= 0) r.push("Patient-safety roles need genuine concern for outcomes");
      if (n.writing <= 0) r.push("Daily narrative writing isn't where you shine");
      break;
    case "data_storyteller":
      if (n.data <= 0) r.push("Spreadsheets and data wrangling drain you");
      if (n.logic <= 0) r.push("Logic-heavy reasoning isn't your top strength");
      break;
    case "regulatory_architect":
      if (n.compliance <= 0) r.push("You push back on rules instead of working within them");
      if (n.writing <= 0) r.push("Long-form writing isn't enjoyable for you");
      if (n.language <= 0) r.push("Regulatory English is dense — your reading speed would suffer");
      break;
    case "operator":
      if (n.sales <= 0) r.push("Talking to strangers / phone calls drains you");
      if (a.led_anything === "no") r.push("You haven't led anything yet — this role needs reps");
      if (n.pressure <= 0) r.push("High-pressure, deadline-driven days don't suit you");
      break;
    case "ai_builder":
      if (n.tech <= 0) r.push("You haven't built anything technical yet");
      if (n.logic <= 0) r.push("Logic puzzle accuracy was below the bar");
      if (a.ai_relation === "rare") r.push("You rarely use AI tools — the curve would be steep");
      break;
  }
  if (r.length === 0) r.push("Just a softer match than your top fits — not a hard no.");
  return r;
}
function buildEvidence(args) {
  const evidence = args.questions.flatMap((q) => {
    const chosenValue = args.answers[q.id];
    if (!chosenValue) return [];
    const opt = q.options.find((o) => o.value === chosenValue);
    if (!opt) return [];
    const traitImpacts = Object.entries(opt.weights ?? {}).map(([trait, delta]) => ({ trait, delta: delta ?? 0 })).filter((x) => x.delta !== 0).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
    const pathImpacts = Object.values(PATHS$1).map((p) => ({ slug: p.slug, title: p.title, delta: pathImpactForAnswer(p, q, chosenValue) })).filter((x) => x.delta !== 0).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
    return [
      {
        questionId: q.id,
        kind: q.kind,
        prompt: q.prompt,
        chosenValue,
        chosenLabel: opt.label,
        traitImpacts,
        pathImpacts,
        topArchetypeImpact: archetypeImpactFromPaths(args.topId, pathImpacts),
        note: q.kind === "micro" && typeof opt.correct === "boolean" ? opt.correct ? "Correct mini skill-check answer" : "Missed mini skill-check answer" : void 0
      }
    ];
  });
  const topDrivers = evidence.filter((e) => e.topArchetypeImpact > 0).sort((a, b) => b.topArchetypeImpact - a.topArchetypeImpact).slice(0, 6);
  const watchOuts = evidence.filter((e) => e.topArchetypeImpact < 0 || e.note?.startsWith("Missed")).sort((a, b) => a.topArchetypeImpact - b.topArchetypeImpact).slice(0, 4);
  const topPathFits = args.pathRanking.slice(0, 3).map((p) => ({ slug: p.slug, title: p.path.title, fit: p.fit }));
  const pathDrivers = Object.fromEntries(
    topPathFits.map((p) => [
      p.slug,
      evidence.filter((e) => e.pathImpacts.some((pi) => pi.slug === p.slug && pi.delta > 0)).sort(
        (a, b) => (b.pathImpacts.find((pi) => pi.slug === p.slug)?.delta ?? 0) - (a.pathImpacts.find((pi) => pi.slug === p.slug)?.delta ?? 0)
      ).slice(0, 3)
    ])
  );
  const tieBreakers = [
    args.topFit - args.secondFit <= 4 ? `${ARCHETYPES[args.topId].name} narrowly beat ${ARCHETYPES[args.secondId].name} by ${args.topFit - args.secondFit} points.` : `${ARCHETYPES[args.topId].name} had a clear ${args.topFit - args.secondFit}-point lead over the next archetype.`,
    args.microPct > 0 ? `Mini skill-check accuracy contributed ${args.microPct}% to aptitude-heavy paths.` : "No mini skill-check answers were available for this attempt."
  ];
  return {
    summary: `${ARCHETYPES[args.topId].name} scored highest because your strongest answers pointed to ${topDrivers.slice(0, 3).map((d) => d.traitImpacts[0]?.trait ?? d.kind).join(", ") || "the required traits"}.`,
    topDrivers,
    watchOuts,
    pathDrivers,
    tieBreakers,
    scoring: {
      answered: Object.keys(args.answers).length,
      assessmentSize: args.questions.length,
      topGap: args.topFit - args.secondFit,
      topPathFits
    }
  };
}
function computeResult(answers, options = {}) {
  const t = tally(answers);
  const microPct = t.microTotal === 0 ? 0 : Math.round(t.microCorrect / t.microTotal * 100);
  const pathScores = {};
  for (const slug of Object.keys(PATHS$1)) {
    pathScores[slug] = scorePath(PATHS$1[slug], t.norm, answers, microPct);
  }
  const pathRanking = Object.values(pathScores).sort((a, b) => b.fit - a.fit);
  const ranking = Object.keys(ARCHETYPES).map((id) => ({
    id,
    archetype: ARCHETYPES[id],
    fit: archetypeFitFromPaths(id, pathScores)
  })).sort((a, b) => b.fit - a.fit);
  const stream = answers.stream;
  const STREAM_PRIORITY = {
    MPC: [
      "ai_builder",
      "data_storyteller",
      "coder",
      "regulatory_architect",
      "sentinel",
      "operator"
    ],
    BiPC: [
      "sentinel",
      "coder",
      "regulatory_architect",
      "data_storyteller",
      "ai_builder",
      "operator"
    ],
    Commerce: [
      "operator",
      "regulatory_architect",
      "data_storyteller",
      "coder",
      "sentinel",
      "ai_builder"
    ],
    Arts: [
      "operator",
      "sentinel",
      "regulatory_architect",
      "coder",
      "data_storyteller",
      "ai_builder"
    ]
  };
  if (Math.abs(ranking[0].fit - ranking[1].fit) <= 2 && STREAM_PRIORITY[stream]) {
    const order = STREAM_PRIORITY[stream];
    const top2 = [ranking[0].id, ranking[1].id];
    const preferred = order.find((id) => top2.includes(id));
    if (preferred && preferred !== ranking[0].id) {
      const i = ranking.findIndex((r) => r.id === preferred);
      [ranking[0], ranking[i]] = [ranking[i], ranking[0]];
    }
  }
  const top = ranking[0];
  const second = ranking[1];
  const gap = top.fit - second.fit;
  const confidence = clamp(40 + gap * 2.2 + (microPct - 50) * 0.18);
  const band = confidenceBand(gap, microPct);
  const notFit = ranking[ranking.length - 1];
  const archOwned = new Set(ARCHETYPE_PRIMARY_PATHS[top.id]);
  const sortedForUser = [...pathRanking].sort((a, b) => {
    const ba = archOwned.has(a.slug) ? 5 : 0;
    const bb = archOwned.has(b.slug) ? 5 : 0;
    return b.fit + bb - (a.fit + ba);
  });
  const topPathsForUser = sortedForUser.slice(0, 3).map((p) => ({
    slug: p.path.slug,
    title: p.path.title,
    salary: p.path.salary
  }));
  const personalisedArch = {
    ...top.archetype,
    topPaths: topPathsForUser
  };
  const questionsForEvidence = options.questions?.length ? options.questions : QUESTIONS;
  const evidence = buildEvidence({
    answers,
    questions: questionsForEvidence,
    topId: top.id,
    secondId: second.id,
    topFit: top.fit,
    secondFit: second.fit,
    pathRanking,
    microPct
  });
  return {
    archetypeId: top.id,
    archetype: personalisedArch,
    fitScore: top.fit,
    confidence,
    confidenceBand: band,
    ranking,
    notFit,
    notFitReasons: notFitReasons(notFit.id, t.norm, answers),
    microAccuracy: microPct,
    breakdown: {
      aptitude: aptitudeScore(t.norm, microPct),
      interest: interestScore(t.norm),
      background: backgroundScore(answers),
      commitment: commitmentScore(answers)
    },
    risks: buildRisks(t.norm, answers, top.id, microPct),
    traitScores: t.norm,
    evidence,
    profile: {
      course: answers.course,
      stream: answers.stream,
      year: answers.year
    },
    resultMeta: {
      ...options.meta,
      questionIds: questionsForEvidence.map((q) => q.id),
      answeredQuestionIds: Object.keys(answers),
      createdAt: options.meta?.createdAt ?? (/* @__PURE__ */ new Date()).toISOString()
    }
  };
}
function _debugScore(answers) {
  const t = tally(answers);
  const microPct = t.microTotal === 0 ? 0 : Math.round(t.microCorrect / t.microTotal * 100);
  const paths = Object.keys(PATHS$1).map((slug) => scorePath(PATHS$1[slug], t.norm, answers, microPct));
  return { tally: t, microPct, paths: paths.sort((a, b) => b.fit - a.fit) };
}
const ADAPTIVE_ARCH_GAP = 14;
const ADAPTIVE_PATH_GAP = 10;
function isAdaptiveConfident(answers) {
  const t = tally(answers);
  if (t.answered < 14) return false;
  const microPct = t.microTotal === 0 ? 0 : Math.round(t.microCorrect / t.microTotal * 100);
  if (t.microTotal >= 2 && microPct < 60) return false;
  const pathScores = {};
  for (const slug of Object.keys(PATHS$1)) {
    pathScores[slug] = scorePath(PATHS$1[slug], t.norm, answers, microPct);
  }
  const pathRanking = Object.values(pathScores).sort((a, b) => b.fit - a.fit);
  if (pathRanking.length < 2) return false;
  if (pathRanking[0].fit - pathRanking[1].fit < ADAPTIVE_PATH_GAP) return false;
  const archRanking = Object.keys(ARCHETYPES).map((id) => archetypeFitFromPaths(id, pathScores)).sort((a, b) => b - a);
  if (archRanking.length < 2) return false;
  return archRanking[0] - archRanking[1] >= ADAPTIVE_ARCH_GAP;
}
function hasCachedResult() {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem("ce_result");
    const parsed = raw ? JSON.parse(raw) : null;
    return !!(parsed && parsed.archetypeId);
  } catch {
    return false;
  }
}
function hasAnswers() {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem("ce_answers");
    const parsed = raw ? JSON.parse(raw) : null;
    return !!(parsed && Object.keys(parsed).length > 0);
  } catch {
    return false;
  }
}
function requireCareerEngineSession(opts = {}) {
  if (typeof window === "undefined") return;
  hydrateCareerEngineSnapshot();
  if (opts.needsLead) {
    if (getLeadId() || hasCachedResult()) return;
    if (hasAnswers() && getProfile()) {
      throw redirect({ to: "/career-engine/test" });
    }
    throw redirect({ to: "/career-engine/start" });
  }
  if (!getProfile()) {
    throw redirect({ to: "/career-engine/start" });
  }
}
function useCareerEngineGuard(opts = {}) {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    hydrateCareerEngineSnapshot();
    const goto = (to) => {
      navigate({ to }).catch(() => {
        window.location.href = to;
      });
    };
    if (opts.needsLead) {
      if (getLeadId() || hasCachedResult()) return;
      if (hasAnswers() && getProfile()) {
        goto("/career-engine/test");
        return;
      }
      goto("/career-engine/start");
      return;
    }
    if (!getProfile()) goto("/career-engine/start");
  }, [navigate, opts.needsLead]);
}
const CareerFitReportV3 = reactExports.lazy(
  () => import("./CareerFitReportV3-cTpiZz_p.mjs").then((m) => ({
    default: m.CareerFitReportV3
  }))
);
const search$1 = objectType({ id: stringType().optional().catch(void 0) });
const Route$16 = createFileRoute("/career-engine/result")({
  validateSearch: (s) => search$1.parse(s),
  beforeLoad: ({ search: search2 }) => {
    if (search2 && search2.id) return;
    return requireCareerEngineSession({ needsLead: true });
  },
  head: () => ({
    meta: [
      { title: "Your Career Fit Report · Arzon Careers" },
      { name: "robots", content: "noindex" }
    ]
  }),
  component: ResultPage
});
function rebuildFromRow(row) {
  if (!row || !row.archetype) return null;
  const arche = ARCHETYPES[row.archetype];
  if (!arche) return null;
  const payload = row.result_payload || {};
  const ranking = payload.ranking?.length ? payload.ranking.map((r) => ({ ...r, archetype: ARCHETYPES[r.id] })) : [{ id: arche.id, archetype: arche, fit: row.fit_score ?? 0 }];
  return {
    archetypeId: arche.id,
    archetype: arche,
    fitScore: row.fit_score ?? payload.fitScore ?? 0,
    confidence: payload.confidence ?? 60,
    confidenceBand: payload.confidenceBand ?? "recommended",
    ranking,
    notFit: payload.notFit ? { ...payload.notFit, archetype: ARCHETYPES[payload.notFit.id] } : ranking[ranking.length - 1],
    notFitReasons: payload.notFitReasons ?? [],
    microAccuracy: payload.microAccuracy ?? 0,
    breakdown: payload.breakdown ?? { aptitude: 0, interest: 0, background: 0, commitment: 0 },
    risks: payload.risks ?? [],
    traitScores: payload.traitScores ?? {},
    evidence: payload.evidence ?? {
      summary: "",
      topDrivers: [],
      watchOuts: [],
      pathDrivers: {},
      tieBreakers: [],
      scoring: { answered: 0, assessmentSize: 0, topGap: 0, topPathFits: [] }
    },
    resultMeta: payload.resultMeta
  };
}
function normaliseResult(raw) {
  if (!raw || !raw.archetypeId) return null;
  const arche = raw.archetype ?? ARCHETYPES[raw.archetypeId];
  if (!arche) return null;
  const ranking = (raw.ranking ?? []).map((r) => ({ ...r, archetype: r.archetype ?? ARCHETYPES[r.id] })).filter((r) => Boolean(r.archetype));
  const safeRanking = ranking.length ? ranking : [{ id: arche.id, archetype: arche, fit: raw.fitScore ?? 0 }];
  const notFitRaw = raw.notFit;
  const notFit = notFitRaw ? { ...notFitRaw, archetype: notFitRaw.archetype ?? ARCHETYPES[notFitRaw.id] ?? arche } : safeRanking[safeRanking.length - 1];
  return {
    ...raw,
    archetype: arche,
    fitScore: typeof raw.fitScore === "number" ? raw.fitScore : 0,
    confidence: typeof raw.confidence === "number" ? raw.confidence : 60,
    confidenceBand: raw.confidenceBand ?? "recommended",
    ranking: safeRanking,
    notFit,
    notFitReasons: raw.notFitReasons ?? [],
    microAccuracy: raw.microAccuracy ?? 0,
    breakdown: raw.breakdown ?? { aptitude: 0, interest: 0, background: 0, commitment: 0 },
    risks: raw.risks ?? [],
    traitScores: raw.traitScores ?? {},
    evidence: raw.evidence ?? {
      summary: "",
      topDrivers: [],
      watchOuts: [],
      pathDrivers: {},
      tieBreakers: [],
      scoring: { answered: 0, assessmentSize: 0, topGap: 0, topPathFits: [] }
    }
  };
}
function ResultPage() {
  const { id: searchLeadId } = Route$16.useSearch();
  const [result, setResult] = reactExports.useState(() => {
    if (typeof window === "undefined") return null;
    const cached = sessionStorage.getItem("ce_result");
    if (!cached) return null;
    try {
      return normaliseResult(JSON.parse(cached));
    } catch {
      return null;
    }
  });
  const [leadId, setLeadId] = reactExports.useState(() => {
    if (searchLeadId) return searchLeadId;
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem("ce_lead_id");
  });
  const [loading, setLoading] = reactExports.useState(!result && Boolean(searchLeadId));
  reactExports.useEffect(() => {
    trackCEFunnelStep({ step: "result", leadId, attemptId: getAttemptId() });
  }, [leadId]);
  reactExports.useEffect(() => {
    if (result || !searchLeadId) return;
    let cancel = false;
    setLoading(true);
    getResult(searchLeadId).then((row) => {
      if (cancel) return;
      const rebuilt = rebuildFromRow(row);
      if (rebuilt) {
        setResult(rebuilt);
        setLeadId(searchLeadId);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("ce_result", JSON.stringify(rebuilt));
          sessionStorage.setItem("ce_lead_id", searchLeadId);
        }
      }
    }).catch((err) => console.warn("Failed to fetch public report:", err)).finally(() => {
      if (!cancel) setLoading(false);
    });
    return () => {
      cancel = true;
    };
  }, [searchLeadId, result]);
  reactExports.useEffect(() => {
    if (!result) return;
    const attemptId = getAttemptId();
    if (attemptId) {
      trackAttemptOutcome({
        leadId,
        attemptId,
        archetype: result.archetype?.name ?? "Generalist",
        fitScore: result.fitScore,
        confidence: result.confidence,
        confidenceBand: result.confidenceBand,
        topPath: result.archetype?.pathSlug ?? null,
        topEvidence: (result.evidence?.topDrivers ?? []).map((d) => ({
          question_id: d.questionId,
          chosen: d.chosenValue,
          delta: d.topArchetypeImpact
        }))
      });
    }
  }, [result, leadId]);
  const handleRetake = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("ce_result");
      sessionStorage.removeItem("ce_answers");
      sessionStorage.removeItem("ce_lead_id");
      sessionStorage.removeItem("ce_attempt_id");
      window.location.href = "/career-engine/test";
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CareerShell, { chrome: "report", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-bold text-xl text-white", children: "Hydrating Career Fit Report..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-300", children: "Fetching report dataset from Arzon Employment Intelligence Server." })
    ] }) });
  }
  if (!result) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CareerShell, { chrome: "report", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl text-center py-16 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "Report Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-300 text-sm", children: "We couldn't find an active report snapshot for this session. Please start a fresh assessment." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StartFreshButton, {}) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CareerShell, { chrome: "report", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-8 pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      reactExports.Suspense,
      {
        fallback: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-slate-300", children: "Loading interactive 21-chapter report..." })
        ] }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CareerFitReportV3, { result, leadId, onRetake: handleRetake })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkillRadarChart, { overallFitScore: result.fitScore }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResultNextStepCard,
      {
        leadId,
        archetypeLabel: result.archetype?.name ?? "Generalist",
        fitScore: result.fitScore
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StickyResultCta, { leadId })
  ] }) });
}
const $$splitComponentImporter$R = () => import("./career-engine.plan-D8ri4vSr.mjs");
const search = objectType({
  id: stringType().optional().catch(void 0)
});
const Route$15 = createFileRoute("/career-engine/plan")({
  validateSearch: (s) => search.parse(s),
  head: () => {
    const ps = pageSeo({
      path: "/career-engine/plan",
      title: "Your free 7-day learning plan · Arzon Careers",
      description: "A free, personalised 7-day learning plan based on your ACRI assessment. No payment, no login.",
      image: "/og/career-engine.jpg",
      noindex: true
    });
    return {
      meta: [{
        title: "Your free 7-day learning plan · Arzon Careers"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$R, "component")
});
const $$splitComponentImporter$Q = () => import("./career-engine.lead-xdggwFtE.mjs");
const Route$14 = createFileRoute("/career-engine/lead")({
  head: () => ({
    meta: [{
      title: "Your result is ready. Arzon Career Engine"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$Q, "component")
});
objectType({
  name: stringType().trim().min(2).max(80),
  phone: stringType().trim().regex(/^[5-9]\d{9}$/),
  email: stringType().trim().email().max(120),
  whatsapp: booleanType()
});
const $$splitComponentImporter$P = () => import("./career-engine.enrol-W7xWZ1K5.mjs");
const Route$13 = createFileRoute("/career-engine/enrol")({
  head: () => ({
    meta: [{
      title: `Pick your cohort and reserve your seat. Arzon Career Engine`
    }, {
      name: "description",
      content: `Select your Arzon cohort, confirm your details, and lock your seat for ${SEAT_FEE}. Fully adjusted in your fee.`
    }, {
      property: "og:title",
      content: `Pick your cohort · Arzon`
    }, {
      property: "og:description",
      content: "ISO 9001 certified. Fully adjusted in fee."
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$P, "component")
});
const $$splitComponentImporter$O = () => import("./build.request-B9Ug-NTP.mjs");
const Route$12 = createFileRoute("/build/request")({
  head: () => {
    const title = "Request a track — Arzon Careers";
    const description = "Propose a role we should build workforce infrastructure for. 25 verified peers unlock the build.";
    const ps = pageSeo({
      path: "/build/request",
      title,
      description
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$O, "component")
});
const listDemandTracks = createServerFn({
  method: "GET"
}).handler(createSsrRpc("05b6d8861a11eded4fc6c6cdfc52b296933d1a6fe5958ae462b79e62fab67414"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("d1dee96c04a6f69191b478b7e67dc5a66ed4d1d8a2bfb807baf007948b49df9a"));
const getDemandTrackBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType().min(1).max(120)
}).parse(input)).handler(createSsrRpc("4bb4c93cf39e618b241955cd75a3cf04803f72d9b2448a6aa962c75a3ec71367"));
const VoteInput = objectType({
  trackSlug: stringType().min(1).max(120).regex(/^[a-z0-9-]+$/),
  name: stringType().trim().min(1).max(120),
  phone: stringType().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  email: stringType().trim().email().max(255).optional().or(literalType("")),
  experienceLevel: enumType(["student", "fresher", "1-3y", "3-5y", "5y+"]),
  why: stringType().trim().min(1).max(800)
});
createServerFn({
  method: "POST"
}).inputValidator((input) => VoteInput.parse(input)).handler(createSsrRpc("08dd06c8979a4b1bd0001ca90a10d92e7d7bcd429eafb794cef3b9082e53c743"));
const CATEGORIES = ["engineering", "healthcare", "life-sciences", "business", "tech", "agriculture", "design", "other"];
const RequestInput = objectType({
  title: stringType().trim().min(4).max(80),
  category: enumType(CATEGORIES),
  pitch: stringType().trim().min(20).max(500),
  name: stringType().trim().min(1).max(120),
  phone: stringType().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  email: stringType().trim().email().max(255).optional().or(literalType("")),
  experienceLevel: enumType(["student", "fresher", "1-3y", "3-5y", "5y+"]),
  why: stringType().trim().min(1).max(800)
});
const requestDemandTrack = createServerFn({
  method: "POST"
}).inputValidator((input) => RequestInput.parse(input)).handler(createSsrRpc("d8e577c0db185eb5027fdac3582b1436d30445757f528b575b886de2986116d2"));
const $$splitComponentImporter$N = () => import("./build._slug-BQL9ang_.mjs");
const $$splitErrorComponentImporter$2 = () => import("./build._slug-CVKWYGFD.mjs");
const $$splitNotFoundComponentImporter$2 = () => import("./build._slug-DEWyfsgS.mjs");
const Route$11 = createFileRoute("/build/$slug")({
  loader: async ({
    params
  }) => {
    const data = await getDemandTrackBySlug({
      data: {
        slug: params.slug
      }
    });
    if (!data.track) throw notFound();
    return data;
  },
  head: ({
    loaderData,
    params
  }) => {
    const t = loaderData?.track;
    const title = t ? `${t.title} — build log` : "Track build — Arzon Careers";
    const desc = t?.pitch ? t.pitch.slice(0, 155) : "Public build log: curriculum, mentors, assessments and internships shipping in the open.";
    const slug = params?.slug ?? t?.slug ?? "";
    const ps = pageSeo({
      path: `/build/${slug}`,
      title,
      description: desc
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$N, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-16 sm:px-6 motion-safe:animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-20 rounded bg-black/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-9 w-1/2 rounded-xl bg-black/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-4 w-3/4 rounded bg-black/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 h-48 rounded-3xl bg-black/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-40 rounded-2xl bg-black/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-40 rounded-2xl bg-black/10" })
  ] })
});
const $$splitComponentImporter$M = () => import("./apply.success-BTU5dmpx.mjs");
const Route$10 = createFileRoute("/apply/success")({
  beforeLoad: () => {
    throw redirect({
      to: "/enrol/success",
      statusCode: 301
    });
  },
  head: () => ({
    meta: [{
      title: "Enrolment success · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$M, "component")
});
const $$splitComponentImporter$L = () => import("./apply.review-BTU5dmpx.mjs");
const Route$$ = createFileRoute("/apply/review")({
  beforeLoad: () => {
    throw redirect({
      to: "/enrol",
      statusCode: 301
    });
  },
  head: () => ({
    meta: [{
      title: "Enrol · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$L, "component")
});
const $$splitComponentImporter$K = () => import("./apply.confirm-BTU5dmpx.mjs");
const Route$_ = createFileRoute("/apply/confirm")({
  beforeLoad: () => {
    throw redirect({
      to: "/enrol",
      statusCode: 301
    });
  },
  head: () => ({
    meta: [{
      title: "Enrol · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$K, "component")
});
const Route$Z = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages, data } = await request.json();
          const systemPrompt = `You are Arzon Copilot, an elite technical interviewer and career coach.
You are conducting a mock interview with a candidate for a role matching their assessment results.
If provided, tailor the questions to their weaknesses: ${data?.weaknesses ?? "general technical aptitude"}.
Keep responses concise, conversational, and focused on evaluating their technical and domain knowledge.`;
          const result = await streamText({
            model: openai("gpt-4o-mini"),
            system: systemPrompt,
            messages
          });
          return result.toTextStreamResponse();
        } catch (error) {
          console.error("Chat API Error:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      }
    }
  }
});
const $$splitComponentImporter$J = () => import("./admin.thumbnails-B49jZB0U.mjs");
const Route$Y = createFileRoute("/admin/thumbnails")({
  head: () => ({
    meta: [{
      title: "Course thumbnails · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$J, "component")
});
const $$splitComponentImporter$I = () => import("./admin.seo-DiaEapbC.mjs");
const Route$X = createFileRoute("/admin/seo")({
  head: () => ({
    meta: [{
      title: "SEO · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$I, "component")
});
const $$splitComponentImporter$H = () => import("./admin.roles-B3_yRu0w.mjs");
const Route$W = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [{
      title: "Admin roles · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$H, "component")
});
const $$splitComponentImporter$G = () => import("./admin.retention-DAQ__eXZ.mjs");
const Route$V = createFileRoute("/admin/retention")({
  head: () => ({
    meta: [{
      title: "Retention · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$G, "component")
});
const $$splitComponentImporter$F = () => import("./admin.results-ERuWw_ai.mjs");
const Route$U = createFileRoute("/admin/results")({
  head: () => ({
    meta: [{
      title: "Results · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$F, "component")
});
const $$splitComponentImporter$E = () => import("./admin.readiness-journeys-BxWVZbKU.mjs");
const Route$T = createFileRoute("/admin/readiness-journeys")({
  head: () => ({
    meta: [{
      title: "Readiness journeys · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$E, "component")
});
const $$splitComponentImporter$D = () => import("./admin.promotions-C0eJNthJ.mjs");
const Route$S = createFileRoute("/admin/promotions")({
  head: () => ({
    meta: [{
      title: "Promotion & Coupon Engine · Admin Arzon"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$D, "component")
});
const $$splitComponentImporter$C = () => import("./admin.placements-U7HLP44a.mjs");
const Route$R = createFileRoute("/admin/placements")({
  head: () => ({
    meta: [{
      title: "Placements ledger · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$C, "component")
});
const $$splitComponentImporter$B = () => import("./admin.moments-C9NIBcNs.mjs");
const Route$Q = createFileRoute("/admin/moments")({
  head: () => ({
    meta: [{
      title: "Moments · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import("./admin.metrics-domain-grid-BqDlZZBC.mjs");
const Route$P = createFileRoute("/admin/metrics-domain-grid")({
  head: () => ({
    meta: [{
      title: "Domain-grid removal · Metrics"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import("./admin.login-TarI_Xk5.mjs");
const Route$O = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{
      title: "Admin sign in · Arzon Global"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./admin.leads-BbmvFuaA.mjs");
const Route$N = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [{
      title: "Leads · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./admin.landing-changelog-Cb2-1Utf.mjs");
const Route$M = createFileRoute("/admin/landing-changelog")({
  head: () => ({
    meta: [{
      title: "Landing copy changelog · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./admin.invites-C06E2LyU.mjs");
const Route$L = createFileRoute("/admin/invites")({
  head: () => ({
    meta: [{
      title: "Invites · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./admin.funnel-test-DDi4zf2e.mjs");
const Route$K = createFileRoute("/admin/funnel-test")({
  head: () => ({
    meta: [{
      title: "Funnel QA · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./admin.funnel-ce-4SZULfAY.mjs");
const Route$J = createFileRoute("/admin/funnel-ce")({
  head: () => ({
    meta: [{
      title: "Career Engine funnel · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./admin.funnel-lXNb1bi5.mjs");
const Route$I = createFileRoute("/admin/funnel")({
  head: () => ({
    meta: [{
      title: "Funnel · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./admin.experiments-CK1pJwSn.mjs");
const Route$H = createFileRoute("/admin/experiments")({
  head: () => ({
    meta: [{
      title: "Curriculum experiments · A/B results"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./admin.demand-BOuae_Df.mjs");
const Route$G = createFileRoute("/admin/demand")({
  head: () => ({
    meta: [{
      title: "Demand tracks · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./admin.content-qa-scan-l1vjRApR.mjs");
const Route$F = createFileRoute("/admin/content-qa-scan")({
  head: () => ({
    meta: [{
      title: "Content QA scan · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./admin.cohorts-CrdpNFMa.mjs");
const Route$E = createFileRoute("/admin/cohorts")({
  head: () => ({
    meta: [{
      title: "Cohorts · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./admin.certificates-CO3VZcHe.mjs");
const Route$D = createFileRoute("/admin/certificates")({
  head: () => ({
    meta: [{
      title: "Certificates · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./admin.backups-CTJ_oC0q.mjs");
const Route$C = createFileRoute("/admin/backups")({
  head: () => ({
    meta: [{
      title: "Backups · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./admin.audit-_qFece35.mjs");
const Route$B = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [{
      title: "Audit log · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./admin.assets-DIwzKw1V.mjs");
const Route$A = createFileRoute("/admin/assets")({
  head: () => ({
    meta: [{
      title: "Static assets · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./admin.arzonprime60-Ycp-zJtn.mjs");
const Route$z = createFileRoute("/admin/arzonprime60")({
  head: () => ({
    meta: [{
      title: "ARZONPRIME60 funnel · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./admin.applications-DyItkojm.mjs");
const Route$y = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [{
      title: "Applications · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./admin.analytics-alerts-B1dRG7cC.mjs");
const Route$x = createFileRoute("/admin/analytics-alerts")({
  head: () => ({
    meta: [{
      title: "Analytics Alerts · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./admin.activity-DqRivu-b.mjs");
const Route$w = createFileRoute("/admin/activity")({
  head: () => ({
    meta: [{
      title: "Activity · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitErrorComponentImporter$1 = () => import("./admin.accept-invite-CPzPeM9e.mjs");
const $$splitComponentImporter$g = () => import("./admin.accept-invite-7Wh4K6P2.mjs");
const Route$v = createFileRoute("/admin/accept-invite")({
  validateSearch: objectType({
    token: stringType().min(8).max(128)
  }),
  head: () => ({
    meta: [{
      title: "Accept invite · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
const $$splitComponentImporter$f = () => import("./learning-path-BqgK36M-.mjs");
const Route$u = createFileRoute("/_authenticated/learning-path")({
  head: () => ({
    meta: [{
      title: "Your learning path · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./hub-wGzn_xJh.mjs");
const Route$t = createFileRoute("/_authenticated/hub")({
  head: () => ({
    meta: [{
      title: "Your dashboard · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./app-DsS7S2om.mjs");
const Route$s = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [{
      title: "Your cohort · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("../__vr.moments-empty-DCZdUCWn.mjs");
const Route$r = createFileRoute("/__vr/moments-empty")({
  validateSearch: (search2) => ({
    tone: search2.tone === "light" ? "light" : "dark"
  }),
  head: () => ({
    meta: [{
      title: "VR · Moments empty state"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./recruiters.candidate._id-CeLkBowI.mjs");
const searchSchema = objectType({
  track: stringType().optional(),
  band: enumType(["A", "B+", "B", "NA"]).optional(),
  cohort: stringType().optional(),
  issued: stringType().optional()
});
const Route$q = createFileRoute("/recruiters/candidate/$id")({
  validateSearch: (input) => searchSchema.parse(input),
  head: ({
    params
  }) => {
    const title = `Candidate ${params.id} · Arzon Careers recruiter portfolio`;
    const description = "Recruiter portfolio for an individual Arzon Global candidate. Verified ID, grade band, JD-task mapping and de-identified work samples.";
    const ps = pageSeo({
      path: `/recruiters/candidate/${params.id}`,
      title,
      description,
      noindex: true
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./r.artifact._token-Ca91yrs-.mjs");
const Route$p = createFileRoute("/r/artifact/$token")({
  head: ({
    params
  }) => {
    const ps = pageSeo({
      path: `/r/artifact/${params.token}`,
      title: "Artifact verification link · Arzon Careers",
      description: "Time-bound recruiter verification link for an Arzon candidate's de-identified artifact.",
      noindex: true
    });
    return {
      meta: [{
        title: "Artifact verification link · Arzon Careers"
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./r._id.brief-Ce6lAGt9.mjs");
const Route$o = createFileRoute("/r/$id/brief")({
  loader: async ({
    params
  }) => {
    const card2 = await getShareCard({
      data: {
        slug: params.id
      }
    });
    if (!card2) throw notFound();
    return card2;
  },
  head: ({
    loaderData,
    params
  }) => {
    if (!loaderData) return {};
    const track2 = loaderData.top_track_title ?? loaderData.archetype_name;
    const title = `Mentor brief · ${track2} · ACRI ${loaderData.acri_overall}`;
    const description = `Skill gap map and focus stack for a candidate matched to ${track2}.`;
    const ps = pageSeo({
      path: `/r/${params.id}/brief`,
      title,
      description,
      image: `/api/public/og/result/${params.id}.svg`,
      ogType: "article",
      noindex: true
    });
    return {
      meta: [{
        title
      }, ...ps.meta],
      links: ps.links
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#0A0F1E] animate-pulse px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 w-full rounded-2xl bg-white/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full rounded-2xl bg-white/5" })
  ] }) })
});
function parseSuppressionPayload(body) {
  const parsed = JSON.parse(body);
  if (!parsed.data) {
    throw new Error("Missing data field in payload");
  }
  const data = parsed.data;
  if (!data.email || !data.reason) {
    throw new Error("Missing required fields: email, reason");
  }
  return data;
}
function mapReasonToStatus(reason) {
  switch (reason) {
    case "bounce":
      return "bounced";
    case "complaint":
      return "complained";
    default:
      return "suppressed";
  }
}
function mapReasonToMessage(reason) {
  switch (reason) {
    case "bounce":
      return "Permanent bounce — email address is invalid or rejected";
    case "complaint":
      return "Spam complaint — recipient marked email as spam";
    case "unsubscribe":
      return "Recipient unsubscribed";
    default:
      return "Email suppressed";
  }
}
const Route$n = createFileRoute("/lovable/email/suppression")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        const supabaseUrl = "https://grcmczxdcssroeljrygv.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        let payload;
        try {
          const verified = await verifyWebhookRequest({
            req: request,
            secret: apiKey,
            parser: parseSuppressionPayload
          });
          payload = verified.payload;
        } catch (error) {
          if (error instanceof WebhookError) {
            switch (error.code) {
              case "invalid_signature":
                console.error("Invalid webhook signature");
                return Response.json({ error: "Invalid signature" }, { status: 401 });
              case "stale_timestamp":
                console.error("Stale webhook timestamp");
                return Response.json({ error: "Stale timestamp" }, { status: 401 });
              case "invalid_payload":
              case "invalid_json":
                console.error("Invalid payload", { code: error.code });
                return Response.json({ error: "Invalid payload" }, { status: 400 });
              default:
                console.error("Webhook verification failed", {
                  code: error.code,
                  message: error.message
                });
                return Response.json({ error: "Verification failed" }, { status: 401 });
            }
          }
          console.error("Unexpected error during verification", { error });
          return Response.json({ error: "Internal error" }, { status: 500 });
        }
        const supabase2 = createClient(supabaseUrl, supabaseServiceKey);
        const normalizedEmail = payload.email.toLowerCase();
        const { error: suppressError } = await supabase2.from("suppressed_emails").upsert(
          {
            email: normalizedEmail,
            reason: payload.reason,
            metadata: payload.metadata ?? null
          },
          { onConflict: "email" }
        );
        if (suppressError) {
          console.error("Failed to upsert suppressed email", {
            error: suppressError,
            email_redacted: normalizedEmail[0] + "***@" + normalizedEmail.split("@")[1]
          });
          return Response.json({ error: "Failed to write suppression" }, { status: 500 });
        }
        const sendLogStatus = mapReasonToStatus(payload.reason);
        const sendLogMessage = mapReasonToMessage(payload.reason);
        const { error: insertError } = await supabase2.from("email_send_log").insert({
          message_id: payload.message_id ?? null,
          template_name: "system",
          recipient_email: normalizedEmail,
          status: sendLogStatus,
          error_message: sendLogMessage,
          metadata: payload.metadata ?? null
        });
        if (insertError) {
          console.warn("Failed to insert email_send_log", {
            error: insertError
          });
        }
        console.log("Suppression processed", {
          email_redacted: normalizedEmail[0] + "***@" + normalizedEmail.split("@")[1],
          reason: payload.reason,
          is_retry: payload.is_retry,
          retry_count: payload.retry_count,
          has_message_id: !!payload.message_id
        });
        return Response.json({ success: true });
      }
    }
  }
});
const EMPLOYERS = [
  // ── MNC CROs (PV + CDM + SAS heavy) ────────────────────────────────────
  {
    name: "IQVIA",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Kochi", "Thane"],
    hiringFor: ["pharmacovigilance", "clinical-data-management", "sas-programming"],
    typicalBand: "₹4.2 – 7 LPA at L1"
  },
  {
    name: "Parexel",
    tier: "MNC CRO",
    cities: ["Hyderabad", "Bengaluru", "Mohali"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 6.5 LPA at L1"
  },
  {
    name: "Syneos Health",
    tier: "MNC CRO",
    cities: ["Hyderabad", "Gurugram"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹3.8 – 6 LPA at L1"
  },
  {
    name: "ICON plc",
    tier: "MNC CRO",
    cities: ["Chennai", "Bengaluru"],
    hiringFor: ["pharmacovigilance", "clinical-data-management", "sas-programming"],
    typicalBand: "₹4.5 – 7.5 LPA at L1"
  },
  {
    name: "Labcorp Drug Development",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Mumbai"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 7 LPA at L1"
  },
  {
    name: "Fortrea",
    tier: "MNC CRO",
    cities: ["Bengaluru"],
    hiringFor: ["clinical-data-management", "sas-programming"],
    typicalBand: "₹4.5 – 8 LPA at L1"
  },
  {
    name: "PPD (Thermo Fisher)",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Mumbai"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 7 LPA at L1"
  },
  {
    name: "Eversana",
    tier: "MNC CRO",
    cities: ["Pune", "Bengaluru"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹3.5 – 6 LPA at L1"
  },
  {
    name: "Indegene",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹4 – 6.8 LPA at L1"
  },
  // ── Indian CROs / pharma-services ──────────────────────────────────────
  {
    name: "TCS Life Sciences",
    tier: "Indian CRO",
    cities: ["Hyderabad", "Mumbai", "Pune"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹3.6 – 5.8 LPA at L1"
  },
  {
    name: "Cognizant Life Sciences",
    tier: "Indian CRO",
    cities: ["Hyderabad", "Chennai", "Bengaluru"],
    hiringFor: ["pharmacovigilance", "medical-coding", "clinical-data-management"],
    typicalBand: "₹3.5 – 5.5 LPA at L1"
  },
  {
    name: "Accenture Health & Life Sciences",
    tier: "Indian CRO",
    cities: ["Bengaluru", "Hyderabad", "Mumbai"],
    hiringFor: ["pharmacovigilance", "medical-coding"],
    typicalBand: "₹3.8 – 6.2 LPA at L1"
  },
  {
    name: "Tech Mahindra Healthcare",
    tier: "Indian CRO",
    cities: ["Hyderabad", "Pune"],
    hiringFor: ["medical-coding", "pharmacovigilance"],
    typicalBand: "₹3.2 – 5.2 LPA at L1"
  },
  // ── Pharma majors ──────────────────────────────────────────────────────
  {
    name: "Dr. Reddy's",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹4.2 – 7 LPA at L1"
  },
  {
    name: "Sun Pharma",
    tier: "Pharma",
    cities: ["Mumbai", "Vadodara"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹4 – 6.8 LPA at L1"
  },
  {
    name: "Cipla",
    tier: "Pharma",
    cities: ["Mumbai", "Goa"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹4 – 6.5 LPA at L1"
  },
  {
    name: "Novartis",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance", "clinical-data-management"],
    typicalBand: "₹5 – 8.5 LPA at L1"
  },
  {
    name: "Sanofi",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹5 – 8 LPA at L1"
  },
  {
    name: "Aurobindo Pharma",
    tier: "Pharma",
    cities: ["Hyderabad"],
    hiringFor: ["pharmacovigilance"],
    typicalBand: "₹3.5 – 6 LPA at L1"
  },
  // ── BPO / RCM / Coding-heavy ───────────────────────────────────────────
  {
    name: "Optum (UnitedHealth)",
    tier: "BPO/RCM",
    cities: ["Hyderabad", "Chennai", "Noida", "Bengaluru"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3.5 – 6 LPA at L1"
  },
  {
    name: "R1 RCM",
    tier: "BPO/RCM",
    cities: ["Noida", "Chennai", "Hyderabad"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5 LPA at L1"
  },
  {
    name: "Omega Healthcare",
    tier: "BPO/RCM",
    cities: ["Bengaluru", "Chennai", "Trichy"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.8 – 5 LPA at L1, +₹8k incentives"
  },
  {
    name: "Access Healthcare",
    tier: "BPO/RCM",
    cities: ["Chennai", "Coimbatore", "Mumbai"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.6 – 4.8 LPA at L1"
  },
  {
    name: "AGS Health",
    tier: "BPO/RCM",
    cities: ["Chennai", "Bengaluru"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5.2 LPA at L1"
  },
  {
    name: "Sutherland Healthcare",
    tier: "BPO/RCM",
    cities: ["Chennai", "Hyderabad"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.8 – 4.5 LPA at L1"
  },
  {
    name: "Wipro HPS",
    tier: "BPO/RCM",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5 LPA at L1"
  },
  {
    name: "Infosys BPM",
    tier: "BPO/RCM",
    cities: ["Bengaluru", "Pune"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹3 – 5.2 LPA at L1"
  },
  {
    name: "GeBBS Healthcare",
    tier: "BPO/RCM",
    cities: ["Mumbai", "Navi Mumbai"],
    hiringFor: ["medical-coding"],
    typicalBand: "₹2.8 – 4.8 LPA at L1"
  },
  // ── Health Tech ────────────────────────────────────────────────────────
  {
    name: "Veeva Systems",
    tier: "Health Tech",
    cities: ["Hyderabad", "Bengaluru"],
    hiringFor: ["clinical-data-management"],
    typicalBand: "₹6 – 10 LPA at L1"
  },
  {
    name: "Medidata (Dassault)",
    tier: "Health Tech",
    cities: ["Hyderabad", "Pune"],
    hiringFor: ["clinical-data-management"],
    typicalBand: "₹5.5 – 9 LPA at L1"
  },
  {
    name: "Oracle Health Sciences",
    tier: "Health Tech",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["clinical-data-management", "sas-programming"],
    typicalBand: "₹6 – 10 LPA at L1"
  },
  // ── Regulatory Affairs specialists ─────────────────────────────────────
  {
    name: "Freyr Solutions",
    tier: "MNC CRO",
    cities: ["Hyderabad", "Bengaluru"],
    hiringFor: ["regulatory-affairs"],
    typicalBand: "₹4 – 7 LPA at L1",
    note: "Largest pure-play RA services firm; 2,500+ RA hires/yr."
  },
  {
    name: "ProPharma Group",
    tier: "MNC CRO",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4.5 – 7.5 LPA at L1"
  },
  {
    name: "Navitas Life Sciences",
    tier: "MNC CRO",
    cities: ["Chennai", "Bengaluru"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹3.8 – 6.2 LPA at L1"
  },
  {
    name: "Lupin",
    tier: "Pharma",
    cities: ["Mumbai", "Pune"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4.2 – 7 LPA at L1"
  },
  {
    name: "Biocon",
    tier: "Pharma",
    cities: ["Bengaluru"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4.5 – 7.5 LPA at L1"
  },
  {
    name: "Glenmark",
    tier: "Pharma",
    cities: ["Mumbai"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹4 – 6.8 LPA at L1"
  },
  {
    name: "Zydus Lifesciences",
    tier: "Pharma",
    cities: ["Ahmedabad"],
    hiringFor: ["regulatory-affairs", "pharmacovigilance"],
    typicalBand: "₹3.8 – 6.5 LPA at L1"
  },
  // ── AI in Healthcare ───────────────────────────────────────────────────
  {
    name: "Innovaccer",
    tier: "Health Tech",
    cities: ["Noida", "Bengaluru"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹8 – 14 LPA at L1"
  },
  {
    name: "Suki AI",
    tier: "Health Tech",
    cities: ["Bengaluru", "Remote"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹10 – 18 LPA at L1"
  },
  {
    name: "Abridge",
    tier: "Health Tech",
    cities: ["Remote"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹12 – 22 LPA at L1",
    note: "US-headquartered; hires Indian remote talent for clinical NLP review."
  },
  {
    name: "Nuance / Microsoft DAX",
    tier: "Health Tech",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹10 – 18 LPA at L1"
  },
  {
    name: "Google Health (Alphabet)",
    tier: "Health Tech",
    cities: ["Bengaluru", "Hyderabad"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹15 – 28 LPA at L1"
  },
  {
    name: "Apollo 24/7",
    tier: "Health Tech",
    cities: ["Chennai", "Hyderabad"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹6 – 11 LPA at L1"
  },
  {
    name: "Practo",
    tier: "Health Tech",
    cities: ["Bengaluru"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹6 – 10 LPA at L1"
  },
  {
    name: "ZS Associates",
    tier: "Health Tech",
    cities: ["Pune", "Bengaluru", "Gurugram"],
    hiringFor: ["ai-in-healthcare", "sas-programming"],
    typicalBand: "₹9 – 15 LPA at L1"
  },
  {
    name: "HealthEM.AI",
    tier: "Health Tech",
    cities: ["Hyderabad", "Remote"],
    hiringFor: ["ai-in-healthcare"],
    typicalBand: "₹7 – 12 LPA at L1"
  }
];
function employersForRole(slug) {
  return EMPLOYERS.filter((e) => e.hiringFor.includes(slug));
}
const $$splitComponentImporter$8 = () => import("./industry._role._city-C2SCDCNR.mjs");
const Route$m = createFileRoute("/industry/$role/$city")({
  loader: ({
    params
  }) => {
    const role = ROLES_BY_SLUG[params.role];
    const city = CITIES_BY_SLUG[params.city];
    if (!role || !city) throw notFound();
    const band = findPayBand(role.pay, city);
    if (!band) throw notFound();
    const employersInCity = employersForRole(role.slug).filter((e) => e.cities.some((c) => city.matchKeys.some((k) => c.toLowerCase() === k.toLowerCase())));
    return {
      role,
      city,
      band,
      employers: employersInCity
    };
  },
  head: ({
    loaderData,
    params
  }) => {
    if (!loaderData) return {};
    const {
      role,
      city,
      band
    } = loaderData;
    const title = `${role.shortName} jobs in ${city.name} · Salary, employers, 2026`;
    const description = `${role.name} pay in ${city.name}: fresher ₹${band.fresher[0]}–${band.fresher[1]} LPA, mid ₹${band.midY3[0]}–${band.midY3[1]}, senior ₹${band.seniorY5[0]}–${band.seniorY5[1]}. ${city.liveNote}`;
    const keywords = `${role.name} jobs ${city.name}, ${role.shortName} salary in ${city.name}, ${role.name} employers in ${city.name}, fresher ${role.shortName} jobs ${city.name}`;
    const ps = pageSeo({
      path: `/industry/${params.role}/${params.city}`,
      title,
      description,
      ogType: "article"
    });
    return {
      meta: [{
        title
      }, {
        name: "keywords",
        content: keywords
      }, ...ps.meta],
      links: ps.links,
      scripts: [{
        // CollectionPage schema: this is a role × city career-profile page
        // (pay bands + employer list), not a specific live job. Using
        // JobPosting here previously caused Google rich-result errors
        // (missing datePosted, validThrough, single hiringOrganization).
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${role.name} in ${city.name} — salary & employers`,
          description,
          inLanguage: "en-IN",
          url: `https://arzoncareers.in/industry/${params.role}/${params.city}`,
          about: {
            "@type": "Occupation",
            name: role.name,
            occupationLocation: {
              "@type": "City",
              name: city.name,
              address: {
                "@type": "PostalAddress",
                addressLocality: city.name,
                addressCountry: "IN"
              }
            },
            estimatedSalary: {
              "@type": "MonetaryAmountDistribution",
              name: "Annual salary (INR)",
              currency: "INR",
              duration: "P1Y",
              minValue: band.fresher[0] * 1e5,
              maxValue: band.seniorY5[1] * 1e5,
              median: (band.midY3[0] + band.midY3[1]) / 2 * 1e5
            }
          }
        })
      }, {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [{
            "@type": "Question",
            name: `What is the salary of a fresher ${role.name} in ${city.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The starting salary for a fresher ${role.name} in ${city.name} typically ranges from ₹${band.fresher[0]} to ₹${band.fresher[1]} LPA.`
            }
          }, {
            "@type": "Question",
            name: `Which top companies are hiring ${role.name}s in ${city.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Top employers hiring ${role.name}s in ${city.name} include ${loaderData.employers.slice(0, 3).map((e) => e.name).join(", ")} and others.`
            }
          }]
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-dvh animate-pulse bg-[#070A14] px-4 py-16 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-32 rounded bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-10 w-2/3 rounded-xl bg-white/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 rounded-2xl bg-white/5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-2xl bg-white/5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-2xl bg-white/5" }) })
    ] })
  ] }) })
});
const $$splitComponentImporter$7 = () => import("./enrol._tier.pay-DndAhOAU.mjs");
const $$splitErrorComponentImporter = () => import("./enrol._tier.pay-COJC3w1a.mjs");
const paySearch = objectType({
  intent: stringType().uuid().optional(),
  t: stringType().min(16).max(64).optional()
});
const Route$l = createFileRoute("/enrol/$tier/pay")({
  validateSearch: (s) => paySearch.parse(s),
  beforeLoad: ({
    params,
    search: search2
  }) => {
    if (!isTier(params.tier)) throw notFound();
    const parsed = paySearch.safeParse(search2);
    if (!parsed.success || !parsed.data.intent || !parsed.data.t) {
      throw redirect({
        to: "/enrol/$tier",
        params: {
          tier: params.tier
        }
      });
    }
  },
  loader: ({
    location: location2
  }) => {
    const {
      intent,
      t
    } = paySearch.parse(location2.search);
    if (!intent || !t) {
      throw notFound();
    }
    return getEnrolmentIntent({
      data: {
        intentId: intent,
        intentToken: t
      }
    });
  },
  head: () => ({
    meta: [{
      title: "Secure checkout · Arzon Global"
    }, {
      name: "description",
      content: "Complete your secure payment to confirm your Arzon Global enrolment."
    }, {
      name: "robots",
      content: "noindex, nofollow"
    }]
  }),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#070B17] px-5 py-12 sm:px-6 motion-safe:animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl h-96 motion-safe:animate-pulse rounded-xl bg-slate-200" }) })
});
const $$splitComponentImporter$6 = () => import("./certificates.sample._slug-BUxg_Ptz.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./certificates.sample._slug-CYgxTvsp.mjs");
const Route$k = createFileRoute("/certificates/sample/$slug")({
  loader: ({
    params
  }) => {
    const c = COURSES_BY_SLUG[params.slug];
    if (!c) throw notFound();
    return c;
  },
  head: ({
    loaderData
  }) => loaderData ? {
    meta: [{
      title: `Sample certificate · ${loaderData.title}, Arzon Global`
    }, {
      name: "description",
      content: `See exactly what your Arzon Global certificate for ${loaderData.title} will look like. ISO-certified, QR-verifiable.`
    }, {
      property: "og:title",
      content: `Sample certificate · ${loaderData.title}, Arzon Global`
    }, {
      property: "og:description",
      content: "Type your name, see your certificate, share with your parents in 2 taps."
    }]
  } : {},
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-slate-50 p-4 md:p-8 animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl h-[600px] rounded-xl bg-slate-200" }) })
});
const $$splitNotFoundComponentImporter = () => import("./career-engine.path._slug-eRI2tbJQ.mjs");
const $$splitComponentImporter$5 = () => import("./career-engine.path._slug-BERSMZ5W.mjs");
const PATHS = {
  pharma: {
    title: "Pharma & Patient-Safety Path",
    emoji: "🩺",
    blurb: "The biggest, most stable healthcare hiring track in India. Coding, PV, RA, all govt-regulated, all hire freshers.",
    roles: [{
      name: "Medical Coder",
      salary: "₹3 – 6 LPA",
      demand: "Very high"
    }, {
      name: "Pharmacovigilance Assoc.",
      salary: "₹3.5 – 7 LPA",
      demand: "Very high"
    }, {
      name: "Regulatory Affairs Exec.",
      salary: "₹4 – 9 LPA",
      demand: "High"
    }, {
      name: "Clinical Data Coordinator",
      salary: "₹4 – 8 LPA",
      demand: "High"
    }],
    timeline: [{
      week: "Wk 1–2",
      what: "Anatomy, terminology, ICD-10 fundamentals"
    }, {
      week: "Wk 3–6",
      what: "Live projects on real (anonymised) datasets"
    }, {
      week: "Wk 7–10",
      what: "Internship, work alongside mentors on client cases"
    }, {
      week: "Wk 11–12",
      what: "Interview prep, mock assessments, placement push"
    }],
    skills: ["ICD-10 / CPT", "MedDRA", "ICSR / CIOMS", "Pharma SOPs", "Audit trails"]
  },
  tech: {
    title: "Healthcare Tech & AI Path",
    emoji: "🤖",
    blurb: "The highest-paying track. SAS, AI, clinical SaaS, built for students who like building.",
    roles: [{
      name: "SAS Programmer (Clinical)",
      salary: "₹4.5 – 10 LPA",
      demand: "Very high"
    }, {
      name: "AI / Healthcare Engineer",
      salary: "₹6 – 14 LPA",
      demand: "Booming"
    }, {
      name: "Clinical Data Manager",
      salary: "₹4 – 8 LPA",
      demand: "High"
    }, {
      name: "Health-Tech Analyst",
      salary: "₹5 – 9 LPA",
      demand: "High"
    }],
    timeline: [{
      week: "Wk 1–2",
      what: "Python / SAS basics, healthcare data formats"
    }, {
      week: "Wk 3–6",
      what: "Build: real ETL pipelines on clinical trial data"
    }, {
      week: "Wk 7–10",
      what: "AI module, image / NLP on healthcare datasets"
    }, {
      week: "Wk 11–12",
      what: "Capstone, GitHub portfolio, interview rounds"
    }],
    skills: ["Python / SAS", "SQL", "Clinical data standards (CDISC)", "AI / ML basics", "Cloud notebooks"]
  },
  business: {
    title: "Healthcare Operations & Business Path",
    emoji: "💼",
    blurb: "For people-people who can run systems. Ops, sales leadership, account management, fast growth, high pay.",
    roles: [{
      name: "Healthcare Ops Exec.",
      salary: "₹3.5 – 6 LPA",
      demand: "High"
    }, {
      name: "Clinical SaaS Account Mgr.",
      salary: "₹6 – 12 LPA",
      demand: "Very high"
    }, {
      name: "Pharma Sales (Specialty)",
      salary: "₹5 – 10 LPA",
      demand: "High"
    }, {
      name: "Med Devices Inside Sales",
      salary: "₹4 – 8 LPA",
      demand: "High"
    }],
    timeline: [{
      week: "Wk 1–2",
      what: "Healthcare ecosystem, payer-provider, regulations"
    }, {
      week: "Wk 3–6",
      what: "CRM, accounts, KAM playbooks on real clinic data"
    }, {
      week: "Wk 7–10",
      what: "Internship, shadow real account managers"
    }, {
      week: "Wk 11–12",
      what: "Pitch + negotiation rounds with hiring partners"
    }],
    skills: ["Stakeholder mapping", "CRM (HubSpot)", "KAM frameworks", "Pricing & contracts", "Healthcare basics"]
  }
};
const Route$j = createFileRoute("/career-engine/path/$slug")({
  beforeLoad: () => requireCareerEngineSession({
    needsLead: true
  }),
  loader: ({
    params
  }) => {
    const p = PATHS[params.slug];
    if (!p) throw notFound();
    return p;
  },
  head: ({
    loaderData,
    params
  }) => {
    const title = `${loaderData?.title ?? "Career path"} · Arzon Career Engine`;
    const description = loaderData?.blurb ?? "Personalised healthcare career path from your Arzon Career Engine result.";
    return {
      ...pageSeo({
        path: `/career-engine/path/${params.slug}`,
        title,
        description,
        noindex: true
        // gated behind a session, personalised → exclude from index
      })
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx(CareerShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 animate-pulse rounded-3xl bg-white/5" }) }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const CareerEngineResultEmail = (props) => {
  const {
    name,
    email,
    phone,
    whatsappOptin,
    archetypeName,
    archetypeTagline,
    archetypeEmoji,
    fitScore,
    topPaths,
    ranking,
    notFit,
    confidence,
    confidenceBand: confidenceBand2,
    microAccuracy,
    risks,
    notFitReasons: notFitReasons2,
    traitScores,
    cohortId,
    leadId,
    sessionId,
    submittedAt
  } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Html, { lang: "en", dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Preview, { children: [
      "New Career Engine result",
      name ? ` from ${name}` : "",
      archetypeName ? ` — ${archetypeName}` : ""
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Body, { style: main$1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { style: container$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h1$1, children: "New Career Engine Result" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: subtle, children: [
        "Submitted ",
        submittedAt ? new Date(submittedAt).toLocaleString() : "just now"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h2, children: "Candidate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Name:" }),
          " ",
          name || "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Email:" }),
          " ",
          email || "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Phone:" }),
          " ",
          phone || "—"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "WhatsApp opt-in:" }),
          " ",
          whatsappOptin ? "Yes" : "No"
        ] }),
        cohortId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Cohort:" }),
          " ",
          cohortId
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h2, children: "Archetype" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: kv, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          archetypeEmoji ? `${archetypeEmoji} ` : "",
          archetypeName || "—"
        ] }) }),
        archetypeTagline ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: text$1, children: archetypeTagline }) : null,
        typeof fitScore === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Fit Score:" }),
          " ",
          fitScore
        ] }) : null,
        typeof confidence === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Confidence:" }),
          " ",
          confidence,
          confidenceBand2 ? ` (${confidenceBand2})` : ""
        ] }) : null,
        typeof microAccuracy === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Micro accuracy:" }),
          " ",
          microAccuracy
        ] }) : null
      ] }),
      topPaths?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h2, children: "Top Paths" }),
        topPaths.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: kv, children: typeof p === "string" ? `• ${p}` : `• ${p?.name || ""}${typeof p?.fit === "number" ? ` — fit ${p.fit}` : ""}` }, i))
      ] }) : null,
      ranking?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h2, children: "Full Ranking" }),
        ranking.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          i + 1,
          ". ",
          r.id,
          " — fit ",
          r.fit
        ] }, i)),
        notFit?.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Not fit:" }),
          " ",
          notFit.id,
          typeof notFit.fit === "number" ? ` — fit ${notFit.fit}` : ""
        ] }) : null
      ] }) : null,
      traitScores && Object.keys(traitScores).length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h2, children: "Trait Scores" }),
        Object.entries(traitScores).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
            k,
            ":"
          ] }),
          " ",
          String(v)
        ] }, k))
      ] }) : null,
      risks?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h2, children: "Risks" }),
        risks.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          "• ",
          r
        ] }, i))
      ] }) : null,
      notFitReasons2?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h2, children: "Not-Fit Reasons" }),
        notFitReasons2.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: kv, children: [
          "• ",
          r
        ] }, i))
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr$1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: footer$1, children: [
        "Lead ID: ",
        leadId || "—",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Session ID: ",
        sessionId || "—"
      ] })
    ] }) })
  ] });
};
const template$1 = {
  component: CareerEngineResultEmail,
  subject: (data) => `Career Engine: ${data?.name || "New result"}${data?.archetypeName ? ` — ${data.archetypeName}` : ""}`,
  displayName: "Career Engine result (admin notification)",
  previewData: {
    name: "Sample Candidate",
    email: "candidate@example.com",
    phone: "9999999999",
    whatsappOptin: true,
    archetypeName: "The Analyst",
    archetypeTagline: "Loves structured problem solving",
    archetypeEmoji: "🧠",
    fitScore: 87,
    confidence: 0.82,
    confidenceBand: "High",
    microAccuracy: 0.91,
    topPaths: [
      { name: "Data Analyst", fit: 87 },
      { name: "Product Analyst", fit: 81 }
    ],
    ranking: [
      { id: "analyst", fit: 87 },
      { id: "pm", fit: 74 }
    ],
    notFit: { id: "sales", fit: 21 },
    risks: ["Limited public-speaking exposure"],
    notFitReasons: ["Low energy for outbound roles"],
    traitScores: { logic: 9, empathy: 6, drive: 8 },
    cohortId: "aug-2026",
    leadId: "lead_demo",
    sessionId: "sess_demo",
    submittedAt: (/* @__PURE__ */ new Date()).toISOString()
  }
};
const main$1 = { backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" };
const container$1 = { padding: "24px", maxWidth: "640px", margin: "0 auto" };
const card = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "0 0 16px"
};
const h1$1 = { fontSize: "22px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" };
const h2 = { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" };
const text$1 = { fontSize: "14px", color: "#334155", lineHeight: "1.5", margin: "0 0 8px" };
const kv = { fontSize: "14px", color: "#334155", lineHeight: "1.5", margin: "0 0 4px" };
const subtle = { fontSize: "12px", color: "#64748b", margin: "0 0 16px" };
const hr$1 = { border: "none", borderTop: "1px solid #e2e8f0", margin: "20px 0" };
const footer$1 = { fontSize: "11px", color: "#94a3b8", margin: "0" };
const EnrolmentRecoveryEmail = (props) => {
  const {
    name,
    tierLabel = "your Arzon Global cohort",
    resumeUrl = "https://arzoncareers.in/enrol",
    whatsappUrl = `https://wa.me/${COUNSELLOR_PHONE}`,
    finalPriceLabel,
    cohortLabel
  } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Html, { lang: "en", dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Head, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Preview, { children: [
      "Your seat in ",
      tierLabel,
      " is still being held — finish in 2 minutes"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Body, { style: main, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { style: container, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { style: h1, children: name ? `${name}, your seat is still here.` : "Your seat is still here." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: text, children: [
        "You started enrolling in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: tierLabel }),
        cohortLabel ? ` for the ${cohortLabel} cohort` : "",
        " but didn't complete payment. We've held your spot for now — you can pick up right where you left off."
      ] }),
      finalPriceLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { style: priceBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: priceLabel, children: "Your locked-in price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: priceValue, children: finalPriceLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { style: { textAlign: "center", margin: "28px 0 8px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button$1, { href: resumeUrl, style: primaryBtn, children: "Resume enrolment →" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: smallMuted, children: [
        "Prefer WhatsApp?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: whatsappUrl, style: link, children: "Message us here" }),
        " ",
        "and a counsellor will help you finish in under 2 minutes."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hr, { style: hr }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: footer, children: "Cohort seats are limited and re-allocated to the waitlist after 24 hours of inactivity. If you've changed your mind, you can safely ignore this email — we won't send another reminder." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: footer, children: "— The Arzon Global team" })
    ] }) })
  ] });
};
const template = {
  component: EnrolmentRecoveryEmail,
  subject: (data) => data?.name ? `${data.name}, your Arzon Global seat is still held` : "Your Arzon Global seat is still held",
  displayName: "Enrolment recovery (abandoned cart)",
  previewData: {
    name: "Priya",
    tierLabel: "Career Track — Pharmacovigilance",
    finalPriceLabel: "₹14,999",
    cohortLabel: "August 2026",
    resumeUrl: "https://arzoncareers.in/enrol/career/pay?intent=demo",
    whatsappUrl: `https://wa.me/${COUNSELLOR_PHONE}`
  }
};
const main = { backgroundColor: "#ffffff", fontFamily: "Inter, Arial, sans-serif" };
const container = { maxWidth: "560px", margin: "0 auto", padding: "32px 24px" };
const h1 = {
  fontSize: "22px",
  fontWeight: 700,
  color: "#0A0F1E",
  margin: "0 0 16px",
  lineHeight: 1.3
};
const text = {
  fontSize: "15px",
  color: "#374151",
  lineHeight: 1.6,
  margin: "0 0 18px"
};
const priceBox = {
  backgroundColor: "#EFF6FF",
  border: "1px solid #BFDBFE",
  borderRadius: "12px",
  padding: "16px 18px",
  margin: "20px 0",
  textAlign: "center"
};
const priceLabel = {
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#1E40AF",
  margin: "0 0 4px",
  fontWeight: 600
};
const priceValue = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#0F172A",
  margin: 0
};
const primaryBtn = {
  backgroundColor: "#1E4D8C",
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block"
};
const smallMuted = {
  fontSize: "13px",
  color: "#6B7280",
  textAlign: "center",
  margin: "12px 0 0"
};
const link = { color: "#1E4D8C", textDecoration: "underline" };
const hr = { borderColor: "#E5E7EB", margin: "28px 0 18px" };
const footer = { fontSize: "12px", color: "#9CA3AF", margin: "0 0 6px", lineHeight: 1.5 };
const TEMPLATES = {
  "career-engine-result": template$1,
  "enrolment-recovery": template
};
function verifyHookSecret(request) {
  const expected = process.env.HOOK_SECRET;
  if (!expected) {
    return new Response("Hook secret not configured", { status: 500 });
  }
  const provided = request.headers.get("x-hook-secret") ?? "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return new Response("Unauthorized", { status: 401 });
  }
  return null;
}
const SITE_NAME$2 = "arzoncareers";
const SENDER_DOMAIN$2 = "info.arzoncareers.in";
const FROM_DOMAIN$2 = "info.arzoncareers.in";
const TEMPLATE_NAME = "career-engine-result";
const Schema = objectType({
  leadId: stringType().uuid()
});
function generateToken$2() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const Route$i = createFileRoute("/api/public/career-engine-notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        let body;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const { leadId } = parsed.data;
        const supabase2 = createClient(supabaseUrl, supabaseServiceKey);
        const ack = () => Response.json({ success: true, accepted: true }, { status: 202 });
        const { data: lead, error: leadErr } = await supabase2.from("career_engine_leads").select("*").eq("id", leadId).maybeSingle();
        if (leadErr || !lead) {
          return ack();
        }
        if (!lead.archetype || !lead.result_payload) {
          return ack();
        }
        const template2 = TEMPLATES[TEMPLATE_NAME];
        if (!template2) {
          console.error("[career-engine-notify] template misconfigured");
          return ack();
        }
        const recipientRaw = (lead.email || "").trim();
        if (!recipientRaw || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(recipientRaw)) {
          return ack();
        }
        const recipient = recipientRaw;
        const normalizedEmail = recipient.toLowerCase();
        const idempotencyKey = `career-engine-result-${leadId}`;
        const { data: existing } = await supabase2.from("email_send_log").select("id, status").eq("template_name", TEMPLATE_NAME).eq("recipient_email", recipient).contains("metadata", { lead_id: leadId }).limit(1).maybeSingle();
        if (existing) {
          return ack();
        }
        const rp = lead.result_payload || {};
        const archetype = rp.archetype || {};
        const props = {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          whatsappOptin: lead.whatsapp_optin,
          archetypeName: archetype.name,
          archetypeTagline: archetype.tagline,
          archetypeEmoji: archetype.emoji,
          fitScore: lead.fit_score,
          topPaths: lead.top_paths,
          ranking: rp.ranking,
          notFit: rp.notFit,
          confidence: rp.confidence,
          confidenceBand: rp.confidenceBand,
          microAccuracy: rp.microAccuracy,
          risks: rp.risks,
          notFitReasons: rp.notFitReasons,
          breakdown: rp.breakdown,
          traitScores: rp.traitScores,
          evidence: rp.evidence,
          resultMeta: rp.resultMeta,
          cohortId: lead.cohort_id,
          leadId: lead.id,
          sessionId: lead.session_id,
          submittedAt: lead.created_at
        };
        let unsubscribeToken = "";
        const { data: existingToken } = await supabase2.from("email_unsubscribe_tokens").select("token, used_at").eq("email", normalizedEmail).maybeSingle();
        if (existingToken && !existingToken.used_at) {
          unsubscribeToken = existingToken.token;
        } else if (!existingToken) {
          unsubscribeToken = generateToken$2();
          await supabase2.from("email_unsubscribe_tokens").upsert(
            { token: unsubscribeToken, email: normalizedEmail },
            { onConflict: "email", ignoreDuplicates: true }
          );
          const { data: stored } = await supabase2.from("email_unsubscribe_tokens").select("token").eq("email", normalizedEmail).maybeSingle();
          unsubscribeToken = stored?.token || unsubscribeToken;
        } else {
          return ack();
        }
        const element = reactExports.createElement(template2.component, props);
        const html = await render(element);
        const plainText = await render(element, { plainText: true });
        const subject = typeof template2.subject === "function" ? template2.subject(props) : template2.subject;
        const messageId = crypto.randomUUID();
        await supabase2.from("email_send_log").insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: recipient,
          status: "pending",
          metadata: { lead_id: leadId }
        });
        const { error: enqueueError } = await supabase2.rpc("enqueue_email", {
          queue_name: "transactional_emails",
          payload: {
            message_id: messageId,
            to: recipient,
            from: `${SITE_NAME$2} <noreply@${FROM_DOMAIN$2}>`,
            sender_domain: SENDER_DOMAIN$2,
            subject,
            html,
            text: plainText,
            purpose: "transactional",
            label: TEMPLATE_NAME,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            queued_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
        if (enqueueError) {
          await supabase2.from("email_send_log").insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: recipient,
            status: "failed",
            error_message: "Failed to enqueue email",
            metadata: { lead_id: leadId }
          });
          return ack();
        }
        return ack();
      }
    }
  }
});
const $$splitComponentImporter$4 = () => import("./admin.seo.settings-e0C5eGr_.mjs");
const Route$h = createFileRoute("/admin/seo/settings")({
  head: () => ({
    meta: [{
      title: "GSC settings · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.qa.content-rebalance-DEIdxWSy.mjs");
const Route$g = createFileRoute("/admin/qa/content-rebalance")({
  head: () => ({
    meta: [{
      title: "Content QA · 70/20/10 rebalance"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.moments._id-B2Oj742B.mjs");
const Route$f = createFileRoute("/admin/moments/$id")({
  head: () => ({
    meta: [{
      title: "Edit moment · Admin"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.experiments.sticky-cta-C3EUaKFN.mjs");
const Route$e = createFileRoute("/admin/experiments/sticky-cta")({
  head: () => ({
    meta: [{
      title: "Sticky CTA · A/B results"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./employer.console-EClx4wS4.mjs");
const Route$d = createFileRoute("/_authenticated/employer/console")({
  head: () => ({
    meta: [{
      title: "Employer console · Arzon Careers"
    }, {
      name: "robots",
      content: "noindex,nofollow"
    }, {
      name: "description",
      content: "Verified employer console for posting roles, managing shortlists, and submitting signed placement evidence."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  pendingComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tone-dark bg-[#0a0c10] min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-teal-400", style: {
        animationDelay: "0ms"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-teal-400", style: {
        animationDelay: "150ms"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-teal-400", style: {
        animationDelay: "300ms"
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/60 font-mono text-sm tracking-widest uppercase", children: "Loading Console" })
  ] }) })
});
const SITE_NAME$1 = "arzoncareers";
const SENDER_DOMAIN$1 = "info.arzoncareers.in";
const FROM_DOMAIN$1 = "info.arzoncareers.in";
function redactEmail(email) {
  if (!email) return "***";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  return `${localPart[0]}***@${domain}`;
}
function generateToken$1() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
const Route$c = createFileRoute("/lovable/email/transactional/send")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = "https://grcmczxdcssroeljrygv.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length).trim();
        const supabase2 = createClient(supabaseUrl, supabaseServiceKey);
        const {
          data: { user },
          error: authError
        } = await supabase2.auth.getUser(token);
        if (authError || !user) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { data: isStaff, error: roleError } = await supabase2.rpc("has_any_role", {
          _user_id: user.id,
          _roles: ["admin", "reviewer", "support"]
        });
        if (roleError || isStaff !== true) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        let templateName;
        let recipientEmail;
        let idempotencyKey;
        let messageId;
        let templateData = {};
        try {
          const body = await request.json();
          templateName = body.templateName || body.template_name;
          recipientEmail = body.recipientEmail || body.recipient_email;
          messageId = crypto.randomUUID();
          idempotencyKey = body.idempotencyKey || body.idempotency_key || messageId;
          if (body.templateData && typeof body.templateData === "object") {
            templateData = body.templateData;
          }
        } catch {
          return Response.json({ error: "Invalid JSON in request body" }, { status: 400 });
        }
        if (!templateName) {
          return Response.json({ error: "templateName is required" }, { status: 400 });
        }
        const template2 = TEMPLATES[templateName];
        if (!template2) {
          console.error("Template not found in registry", { templateName });
          return Response.json(
            {
              error: `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(", ")}`
            },
            { status: 404 }
          );
        }
        const effectiveRecipient = template2.to || recipientEmail;
        if (!effectiveRecipient) {
          return Response.json(
            {
              error: "recipientEmail is required (unless the template defines a fixed recipient)"
            },
            { status: 400 }
          );
        }
        const { data: suppressed, error: suppressionError } = await supabase2.from("suppressed_emails").select("id").eq("email", effectiveRecipient.toLowerCase()).maybeSingle();
        if (suppressionError) {
          console.error("Suppression check failed — refusing to send", {
            error: suppressionError,
            recipient_redacted: redactEmail(effectiveRecipient)
          });
          return Response.json({ error: "Failed to verify suppression status" }, { status: 500 });
        }
        if (suppressed) {
          await supabase2.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "suppressed"
          });
          console.log("Email suppressed", {
            templateName,
            recipient_redacted: redactEmail(effectiveRecipient)
          });
          return Response.json({ success: false, reason: "email_suppressed" });
        }
        const normalizedEmail = effectiveRecipient.toLowerCase();
        let unsubscribeToken;
        const { data: existingToken, error: tokenLookupError } = await supabase2.from("email_unsubscribe_tokens").select("token, used_at").eq("email", normalizedEmail).maybeSingle();
        if (tokenLookupError) {
          console.error("Token lookup failed", {
            error: tokenLookupError,
            email_redacted: redactEmail(normalizedEmail)
          });
          await supabase2.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "failed",
            error_message: "Failed to look up unsubscribe token"
          });
          return Response.json({ error: "Failed to prepare email" }, { status: 500 });
        }
        if (existingToken && !existingToken.used_at) {
          unsubscribeToken = existingToken.token;
        } else if (!existingToken) {
          unsubscribeToken = generateToken$1();
          const { error: tokenError } = await supabase2.from("email_unsubscribe_tokens").upsert(
            { token: unsubscribeToken, email: normalizedEmail },
            { onConflict: "email", ignoreDuplicates: true }
          );
          if (tokenError) {
            console.error("Failed to create unsubscribe token", {
              error: tokenError
            });
            await supabase2.from("email_send_log").insert({
              message_id: messageId,
              template_name: templateName,
              recipient_email: effectiveRecipient,
              status: "failed",
              error_message: "Failed to create unsubscribe token"
            });
            return Response.json({ error: "Failed to prepare email" }, { status: 500 });
          }
          const { data: storedToken, error: reReadError } = await supabase2.from("email_unsubscribe_tokens").select("token").eq("email", normalizedEmail).maybeSingle();
          if (reReadError || !storedToken) {
            console.error("Failed to read back unsubscribe token after upsert", {
              error: reReadError,
              email_redacted: redactEmail(normalizedEmail)
            });
            await supabase2.from("email_send_log").insert({
              message_id: messageId,
              template_name: templateName,
              recipient_email: effectiveRecipient,
              status: "failed",
              error_message: "Failed to confirm unsubscribe token storage"
            });
            return Response.json({ error: "Failed to prepare email" }, { status: 500 });
          }
          unsubscribeToken = storedToken.token;
        } else {
          console.warn("Unsubscribe token already used but email not suppressed", {
            email_redacted: redactEmail(normalizedEmail)
          });
          await supabase2.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "suppressed",
            error_message: "Unsubscribe token used but email missing from suppressed list"
          });
          return Response.json({ success: false, reason: "email_suppressed" });
        }
        const element = reactExports.createElement(template2.component, templateData);
        const html = await render(element);
        const plainText = await render(element, { plainText: true });
        const resolvedSubject = typeof template2.subject === "function" ? template2.subject(templateData) : template2.subject;
        await supabase2.from("email_send_log").insert({
          message_id: messageId,
          template_name: templateName,
          recipient_email: effectiveRecipient,
          status: "pending"
        });
        const { error: enqueueError } = await supabase2.rpc("enqueue_email", {
          queue_name: "transactional_emails",
          payload: {
            message_id: messageId,
            to: effectiveRecipient,
            from: `${SITE_NAME$1} <noreply@${FROM_DOMAIN$1}>`,
            sender_domain: SENDER_DOMAIN$1,
            subject: resolvedSubject,
            html,
            text: plainText,
            purpose: "transactional",
            label: templateName,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            queued_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
        if (enqueueError) {
          console.error("Failed to enqueue email", {
            error: enqueueError,
            templateName,
            recipient_redacted: redactEmail(effectiveRecipient)
          });
          await supabase2.from("email_send_log").insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: effectiveRecipient,
            status: "failed",
            error_message: "Failed to enqueue email"
          });
          return Response.json({ error: "Failed to enqueue email" }, { status: 500 });
        }
        console.log("Transactional email enqueued", {
          templateName,
          recipient_redacted: redactEmail(effectiveRecipient)
        });
        return Response.json({ success: true, queued: true });
      }
    }
  }
});
const Route$b = createFileRoute("/lovable/email/transactional/preview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const authHeader = request.headers.get("Authorization");
        const token = authHeader?.replace(/^Bearer\s+/i, "");
        if (token !== apiKey) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const templateNames = Object.keys(TEMPLATES);
        const results = [];
        for (const name of templateNames) {
          const entry = TEMPLATES[name];
          const displayName = entry.displayName || name;
          if (!entry.previewData) {
            results.push({
              templateName: name,
              displayName,
              subject: "",
              html: "",
              status: "preview_data_required"
            });
            continue;
          }
          try {
            const html = await render(reactExports.createElement(entry.component, entry.previewData));
            const resolvedSubject = typeof entry.subject === "function" ? entry.subject(entry.previewData) : entry.subject;
            results.push({
              templateName: name,
              displayName,
              subject: resolvedSubject,
              html,
              status: "ready"
            });
          } catch (err) {
            console.error("Failed to render template for preview", {
              template: name,
              error: err
            });
            results.push({
              templateName: name,
              displayName,
              subject: "",
              html: "",
              status: "render_failed",
              errorMessage: err instanceof Error ? err.message : String(err)
            });
          }
        }
        return Response.json({ templates: results });
      }
    }
  }
});
const MAX_RETRIES = 5;
const DEFAULT_BATCH_SIZE = 10;
const DEFAULT_SEND_DELAY_MS = 200;
const DEFAULT_AUTH_TTL_MINUTES = 15;
const DEFAULT_TRANSACTIONAL_TTL_MINUTES = 60;
function isRateLimited(error) {
  if (error && typeof error === "object" && "status" in error) {
    return error.status === 429;
  }
  return error instanceof Error && error.message.includes("429");
}
function isForbidden(error) {
  if (error && typeof error === "object" && "status" in error) {
    return error.status === 403;
  }
  return error instanceof Error && error.message.includes("403");
}
function getRetryAfterSeconds(error) {
  if (error && typeof error === "object" && "retryAfterSeconds" in error) {
    return error.retryAfterSeconds ?? 60;
  }
  return 60;
}
async function moveToDlq(supabase2, queue, msg, reason) {
  const payload = msg.message;
  await supabase2.from("email_send_log").insert({
    message_id: payload.message_id,
    template_name: payload.label || queue,
    recipient_email: payload.to,
    status: "dlq",
    error_message: reason
  });
  const { error } = await supabase2.rpc("move_to_dlq", {
    source_queue: queue,
    dlq_name: `${queue}_dlq`,
    message_id: msg.msg_id,
    payload
  });
  if (error) {
    console.error("Failed to move message to DLQ", { queue, msg_id: msg.msg_id, reason, error });
  }
}
const Route$a = createFileRoute("/lovable/email/queue/process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        const supabaseUrl = "https://grcmczxdcssroeljrygv.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json({ error: "Server configuration error" }, { status: 500 });
        }
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length).trim();
        if (token !== supabaseServiceKey) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        const supabase2 = createClient(supabaseUrl, supabaseServiceKey);
        const { data: state } = await supabase2.from("email_send_state").select(
          "retry_after_until, batch_size, send_delay_ms, auth_email_ttl_minutes, transactional_email_ttl_minutes"
        ).single();
        if (state?.retry_after_until && new Date(state.retry_after_until) > /* @__PURE__ */ new Date()) {
          return Response.json({ skipped: true, reason: "rate_limited" });
        }
        const batchSize = state?.batch_size ?? DEFAULT_BATCH_SIZE;
        const sendDelayMs = state?.send_delay_ms ?? DEFAULT_SEND_DELAY_MS;
        const ttlMinutes = {
          auth_emails: state?.auth_email_ttl_minutes ?? DEFAULT_AUTH_TTL_MINUTES,
          transactional_emails: state?.transactional_email_ttl_minutes ?? DEFAULT_TRANSACTIONAL_TTL_MINUTES
        };
        let totalProcessed = 0;
        for (const queue of ["auth_emails", "transactional_emails"]) {
          const { data: messages, error: readError } = await supabase2.rpc("read_email_batch", {
            queue_name: queue,
            batch_size: batchSize,
            vt: 30
          });
          if (readError) {
            console.error("Failed to read email batch", { queue, error: readError });
            continue;
          }
          if (!messages?.length) continue;
          const messageIds = Array.from(
            new Set(
              messages.map(
                (msg) => msg?.message?.message_id && typeof msg.message.message_id === "string" ? msg.message.message_id : null
              ).filter((id) => Boolean(id))
            )
          );
          const failedAttemptsByMessageId = /* @__PURE__ */ new Map();
          if (messageIds.length > 0) {
            const { data: failedRows, error: failedRowsError } = await supabase2.from("email_send_log").select("message_id").in("message_id", messageIds).eq("status", "failed");
            if (failedRowsError) {
              console.error("Failed to load failed-attempt counters", {
                queue,
                error: failedRowsError
              });
            } else {
              for (const row of failedRows ?? []) {
                const messageId = row?.message_id;
                if (typeof messageId !== "string" || !messageId) continue;
                failedAttemptsByMessageId.set(
                  messageId,
                  (failedAttemptsByMessageId.get(messageId) ?? 0) + 1
                );
              }
            }
          }
          for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            const payload = msg.message;
            const failedAttempts = payload?.message_id && typeof payload.message_id === "string" ? failedAttemptsByMessageId.get(payload.message_id) ?? 0 : msg.read_ct ?? 0;
            const queuedAt = payload.queued_at ?? msg.enqueued_at;
            if (queuedAt) {
              const ageMs = Date.now() - new Date(queuedAt).getTime();
              const maxAgeMs = ttlMinutes[queue] * 60 * 1e3;
              if (ageMs > maxAgeMs) {
                console.warn("Email expired (TTL exceeded)", {
                  queue,
                  msg_id: msg.msg_id,
                  queued_at: queuedAt,
                  ttl_minutes: ttlMinutes[queue]
                });
                await moveToDlq(
                  supabase2,
                  queue,
                  msg,
                  `TTL exceeded (${ttlMinutes[queue]} minutes)`
                );
                continue;
              }
            }
            if (failedAttempts >= MAX_RETRIES) {
              await moveToDlq(
                supabase2,
                queue,
                msg,
                `Max retries (${MAX_RETRIES}) exceeded (attempted ${failedAttempts} times)`
              );
              continue;
            }
            if (payload.message_id) {
              const { data: alreadySent } = await supabase2.from("email_send_log").select("id").eq("message_id", payload.message_id).eq("status", "sent").maybeSingle();
              if (alreadySent) {
                console.warn("Skipping duplicate send (already sent)", {
                  queue,
                  msg_id: msg.msg_id,
                  message_id: payload.message_id
                });
                const { error: dupDelError } = await supabase2.rpc("delete_email", {
                  queue_name: queue,
                  message_id: msg.msg_id
                });
                if (dupDelError) {
                  console.error("Failed to delete duplicate message from queue", {
                    queue,
                    msg_id: msg.msg_id,
                    error: dupDelError
                  });
                }
                continue;
              }
            }
            try {
              await sendLovableEmail(
                {
                  run_id: payload.run_id,
                  to: payload.to,
                  from: payload.from,
                  sender_domain: payload.sender_domain,
                  subject: payload.subject,
                  html: payload.html,
                  text: payload.text,
                  purpose: payload.purpose,
                  label: payload.label,
                  idempotency_key: payload.idempotency_key,
                  unsubscribe_token: payload.unsubscribe_token,
                  message_id: payload.message_id
                },
                { apiKey, sendUrl: process.env.LOVABLE_SEND_URL }
              );
              await supabase2.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "sent"
              });
              const { error: delError } = await supabase2.rpc("delete_email", {
                queue_name: queue,
                message_id: msg.msg_id
              });
              if (delError) {
                console.error("Failed to delete sent message from queue", {
                  queue,
                  msg_id: msg.msg_id,
                  error: delError
                });
              }
              totalProcessed++;
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              console.error("Email send failed", {
                queue,
                msg_id: msg.msg_id,
                read_ct: msg.read_ct,
                failed_attempts: failedAttempts,
                error: errorMsg
              });
              if (isRateLimited(error)) {
                await supabase2.from("email_send_log").insert({
                  message_id: payload.message_id,
                  template_name: payload.label || queue,
                  recipient_email: payload.to,
                  status: "failed",
                  error_message: errorMsg.slice(0, 1e3)
                });
                const retryAfterSecs = getRetryAfterSeconds(error);
                await supabase2.from("email_send_state").update({
                  retry_after_until: new Date(Date.now() + retryAfterSecs * 1e3).toISOString(),
                  updated_at: (/* @__PURE__ */ new Date()).toISOString()
                }).eq("id", 1);
                return Response.json({ processed: totalProcessed, stopped: "rate_limited" });
              }
              if (isForbidden(error)) {
                await moveToDlq(supabase2, queue, msg, "Emails disabled for this project");
                return Response.json({ processed: totalProcessed, stopped: "emails_disabled" });
              }
              await supabase2.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "failed",
                error_message: errorMsg.slice(0, 1e3)
              });
              if (payload?.message_id && typeof payload.message_id === "string") {
                failedAttemptsByMessageId.set(payload.message_id, failedAttempts + 1);
              }
            }
            if (i < messages.length - 1) {
              await new Promise((r) => setTimeout(r, sendDelayMs));
            }
          }
        }
        return Response.json({ processed: totalProcessed });
      }
    }
  }
});
const Route$9 = createFileRoute("/api/public/razorpay/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) {
          return new Response("not_configured", { status: 500 });
        }
        const signature = request.headers.get("x-razorpay-signature");
        const raw = await request.text();
        if (!signature || raw.length === 0 || raw.length > 1e5) {
          return new Response("bad_request", { status: 400 });
        }
        const expected = createHmac("sha256", secret).update(raw).digest("hex");
        const a = Buffer.from(expected, "utf8");
        const b = Buffer.from(signature, "utf8");
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("invalid_signature", { status: 401 });
        }
        let payload;
        try {
          payload = JSON.parse(raw);
        } catch {
          return new Response("bad_json", { status: 400 });
        }
        const ent = payload.payload?.payment?.entity;
        const intentId = ent?.notes?.intent_id;
        const paymentId = ent?.id;
        const orderId = ent?.order_id;
        const eventId = payload.id ?? paymentId ?? null;
        if (eventId) {
          const { error: dupErr } = await supabaseAdmin.from("webhook_events").insert({ provider: "razorpay", event_id: eventId, event_type: payload.event ?? null });
          if (dupErr) {
            if (dupErr.code === "23505") {
              await supabaseAdmin.from("analytics_events").insert({
                event_name: "seat_claim_skipped_duplicate",
                props: {
                  provider: "razorpay",
                  event_id: eventId,
                  event_type: payload.event ?? null,
                  payment_id: paymentId ?? null,
                  intent_id: intentId ?? null
                }
              });
              return new Response("duplicate", { status: 200 });
            }
            console.error("[razorpay webhook] dedupe insert", dupErr);
            return new Response("db_error", { status: 500 });
          }
        }
        if (payload.event === "payment.captured" || payload.event === "payment.authorized") {
          if (intentId && paymentId && orderId) {
            const { error } = await supabaseAdmin.rpc("mark_enrolment_paid_with_payment", {
              p_intent_id: intentId,
              p_payment_id: paymentId,
              p_order_id: orderId
            });
            if (error) {
              console.error("[razorpay webhook] mark_paid", error);
              return new Response("db_error", { status: 500 });
            }
            try {
              const { data: intentRow } = await supabaseAdmin.from("enrolment_intents").select("lead_id, final_price_inr").eq("id", intentId).maybeSingle();
              const leadId = intentRow?.lead_id ?? null;
              const amountInr = intentRow?.final_price_inr ?? null;
              if (leadId) {
                await supabaseAdmin.rpc("mark_readiness_paid_by_lead", {
                  _lead_id: leadId,
                  _amount_inr: amountInr
                });
              }
            } catch (rjErr) {
              console.warn("[razorpay webhook] readiness_journey paid update", rjErr);
            }
            const { error: seatErr } = await supabaseAdmin.rpc("cohort_claim_seat", {
              p_cohort_id: "aug-2026",
              p_payment_id: paymentId,
              p_intent_id: intentId
            });
            if (seatErr) {
              console.error("[razorpay webhook] cohort_claim_seat", seatErr);
              await supabaseAdmin.from("analytics_events").insert({
                event_name: "seat_claim_error",
                props: {
                  provider: "razorpay",
                  event_id: eventId,
                  payment_id: paymentId,
                  intent_id: intentId,
                  error_code: seatErr?.code ?? null,
                  error_message: seatErr.message ?? null
                }
              });
            } else {
              await supabaseAdmin.from("analytics_events").insert({
                event_name: "seat_claim_succeeded",
                props: {
                  provider: "razorpay",
                  cohort_id: "aug-2026",
                  event_id: eventId,
                  payment_id: paymentId,
                  intent_id: intentId
                }
              });
            }
            try {
              const { data: provRows, error: provErr } = await supabaseAdmin.rpc(
                "provision_enrolment_from_intent",
                { p_intent_id: intentId, p_cohort_id: "aug-2026" }
              );
              if (provErr) {
                console.error("[razorpay webhook] provision", provErr);
              } else {
                const prov = Array.isArray(provRows) ? provRows[0] : provRows;
                if (prov?.created && prov?.user_email) {
                  const { error: inviteErr } = await supabaseAdmin.auth.admin.inviteUserByEmail(prov.user_email, {
                    data: { source: "razorpay_webhook", intent_id: intentId },
                    redirectTo: `${process.env.SITE_ORIGIN ?? "https://arzoncareers.in"}/app`
                  });
                  if (inviteErr && inviteErr.status !== 422) {
                    console.warn("[razorpay webhook] invite", inviteErr);
                  }
                  await supabaseAdmin.from("analytics_events").insert({
                    event_name: "learner_provisioned",
                    props: {
                      intent_id: intentId,
                      enrolment_id: prov.enrolment_id,
                      email: prov.user_email,
                      invited: !inviteErr
                    }
                  });
                }
              }
            } catch (provFatal) {
              console.error("[razorpay webhook] provision fatal", provFatal);
            }
          }
        } else if (payload.event === "payment.failed") {
          if (intentId) {
            const reason = ent?.error_description ?? ent?.error_reason ?? ent?.error_code ?? "payment_failed";
            const { error } = await supabaseAdmin.rpc("mark_enrolment_failed", {
              p_intent_id: intentId,
              p_order_id: orderId ?? null,
              p_payment_id: paymentId ?? null,
              p_reason: reason
            });
            if (error) {
              console.error("[razorpay webhook] mark_failed", error);
              return new Response("db_error", { status: 500 });
            }
          }
        }
        return new Response("ok");
      }
    }
  }
});
const bodySchema = objectType({
  intent_id: stringType().uuid(),
  razorpay_order_id: stringType().min(4).max(64),
  razorpay_payment_id: stringType().min(4).max(64),
  razorpay_signature: stringType().min(8).max(256)
});
const Route$8 = createFileRoute("/api/public/razorpay/verify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const keySecret = process.env.RAZORPAY_KEY_SECRET;
        if (!keySecret) {
          return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
        }
        let parsed;
        try {
          const json = await request.json();
          parsed = bodySchema.parse(json);
        } catch {
          try {
            const { supabaseAdmin: supabaseAdmin22 } = await import("./client.server-DUn3rRvm.mjs");
            await supabaseAdmin22.rpc("track_event", {
              p_event_name: "razorpay_verify_failed",
              p_props: { reason: "bad_request" }
            });
          } catch {
          }
          return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
        }
        const expected = createHmac("sha256", keySecret).update(`${parsed.razorpay_order_id}|${parsed.razorpay_payment_id}`).digest("hex");
        const a = Buffer.from(expected, "utf8");
        const b = Buffer.from(parsed.razorpay_signature, "utf8");
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          try {
            const { supabaseAdmin: supabaseAdmin22 } = await import("./client.server-DUn3rRvm.mjs");
            await supabaseAdmin22.rpc("track_event", {
              p_event_name: "razorpay_verify_failed",
              p_props: {
                reason: "invalid_signature",
                intent_id: parsed.intent_id,
                order_id: parsed.razorpay_order_id,
                payment_id: parsed.razorpay_payment_id
              }
            });
          } catch {
          }
          return Response.json({ ok: false, error: "invalid_signature" }, { status: 401 });
        }
        const { supabaseAdmin: supabaseAdmin2 } = await import("./client.server-DUn3rRvm.mjs");
        const { error } = await supabaseAdmin2.rpc("mark_enrolment_paid_with_payment", {
          p_intent_id: parsed.intent_id,
          p_payment_id: parsed.razorpay_payment_id,
          p_order_id: parsed.razorpay_order_id
        });
        if (error) {
          console.error("[razorpay verify] mark_paid", error);
          try {
            await supabaseAdmin2.rpc("track_event", {
              p_event_name: "razorpay_verify_failed",
              p_props: {
                reason: "db_error",
                intent_id: parsed.intent_id,
                order_id: parsed.razorpay_order_id,
                payment_id: parsed.razorpay_payment_id,
                message: String(error.message ?? error).slice(0, 240)
              }
            });
          } catch {
          }
          return Response.json({ ok: false, error: "db_error" }, { status: 500 });
        }
        try {
          const { data: existing } = await supabaseAdmin2.from("analytics_events").select("id").eq("event_name", "payment_success").contains("props", { intent_id: parsed.intent_id }).limit(1);
          if (!existing || existing.length === 0) {
            await supabaseAdmin2.rpc("track_event", {
              p_event_name: "payment_success",
              p_props: {
                intent_id: parsed.intent_id,
                order_id: parsed.razorpay_order_id,
                payment_id: parsed.razorpay_payment_id,
                provider: "razorpay"
              }
            });
          }
        } catch (e) {
          console.warn("[razorpay verify] payment_success track_event failed", e);
        }
        try {
          const { data: intent } = await supabaseAdmin2.from("enrolment_intents").select("exp_uid, variant_layout, variant_cta, course_slug").eq("id", parsed.intent_id).maybeSingle();
          if (intent?.exp_uid) {
            const rows = [
              {
                experiment: "curriculum_layout_v1",
                variant: intent.variant_layout ?? "control"
              },
              {
                experiment: "cta_timing_v1",
                variant: intent.variant_cta ?? "control"
              }
            ].flatMap((e) => [
              {
                uid: intent.exp_uid,
                experiment: e.experiment,
                variant: e.variant,
                event: "razorpay_success",
                course_slug: intent.course_slug ?? null,
                props: { intent_id: parsed.intent_id, order_id: parsed.razorpay_order_id }
              },
              {
                uid: intent.exp_uid,
                experiment: e.experiment,
                variant: e.variant,
                event: "enrolment_paid",
                course_slug: intent.course_slug ?? null,
                props: { intent_id: parsed.intent_id, order_id: parsed.razorpay_order_id }
              }
            ]);
            await supabaseAdmin2.from("experiment_events").insert(rows);
          }
        } catch (e) {
          console.warn("[razorpay verify] experiment event log failed", e);
        }
        return Response.json({ ok: true });
      }
    }
  }
});
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/webmasters/v3";
const SITE_URL = "https://arzoncareers.in/";
const SITE_ENC = encodeURIComponent(SITE_URL);
function isoDaysAgo(days) {
  const d = /* @__PURE__ */ new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}
async function gscQuery(body) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GSC_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
  if (!GSC_KEY) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY missing");
  const res = await fetch(`${GATEWAY}/sites/${SITE_ENC}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`GSC ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  return json.rows ?? [];
}
const Route$7 = createFileRoute("/api/public/hooks/seo-alerts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        try {
          const currEnd = isoDaysAgo(2);
          const currStart = isoDaysAgo(9);
          const prevEnd = isoDaysAgo(10);
          const prevStart = isoDaysAgo(17);
          const { data: cfgRow } = await supabaseAdmin.from("seo_alert_config").select("min_impressions, drop_pct").eq("id", 1).maybeSingle();
          const minImpressions = cfgRow?.min_impressions ?? 20;
          const dropPct = Number(cfgRow?.drop_pct ?? 50);
          const [curr, prev] = await Promise.all([
            gscQuery({
              startDate: currStart,
              endDate: currEnd,
              dimensions: ["query"],
              rowLimit: 50
            }),
            gscQuery({
              startDate: prevStart,
              endDate: prevEnd,
              dimensions: ["query"],
              rowLimit: 250
            })
          ]);
          const snapshotRows = curr.map((r) => ({
            window_start: currStart,
            window_end: currEnd,
            query: r.keys?.[0] ?? "",
            clicks: Math.round(r.clicks),
            impressions: Math.round(r.impressions),
            ctr: Number(r.ctr.toFixed(4)),
            position: Number(r.position.toFixed(2))
          })).filter((r) => r.query);
          if (snapshotRows.length) {
            await supabaseAdmin.from("seo_query_snapshots").insert(snapshotRows);
          }
          const prevMap = /* @__PURE__ */ new Map();
          for (const r of prev) {
            const q = r.keys?.[0];
            if (q) prevMap.set(q, r);
          }
          const alerts = [];
          for (const c of curr) {
            const q = c.keys?.[0];
            if (!q) continue;
            const p = prevMap.get(q);
            if (!p) continue;
            if (p.impressions < minImpressions) continue;
            for (const metric of ["clicks", "impressions"]) {
              const prevV = Math.round(p[metric]);
              const currV = Math.round(c[metric]);
              if (prevV <= 0) continue;
              const delta = (currV - prevV) / prevV * 100;
              if (delta <= -dropPct) {
                alerts.push({
                  query: q,
                  metric,
                  prev_value: prevV,
                  curr_value: currV,
                  pct_change: Number(delta.toFixed(2)),
                  prev_window_start: prevStart,
                  prev_window_end: prevEnd,
                  curr_window_start: currStart,
                  curr_window_end: currEnd
                });
              }
            }
          }
          let inserted = 0;
          if (alerts.length) {
            const { data: existing } = await supabaseAdmin.from("seo_alerts").select("query, metric").gte("curr_window_start", currStart).lte("curr_window_end", currEnd);
            const seen2 = new Set((existing ?? []).map((e) => `${e.query}::${e.metric}`));
            const toInsert = alerts.filter((a) => !seen2.has(`${a.query}::${a.metric}`));
            if (toInsert.length) {
              const { error } = await supabaseAdmin.from("seo_alerts").insert(toInsert);
              if (error) throw error;
              inserted = toInsert.length;
            }
          }
          return new Response(
            JSON.stringify({
              ok: true,
              snapshotted: snapshotRows.length,
              candidates: alerts.length,
              inserted,
              window: { currStart, currEnd, prevStart, prevEnd },
              thresholds: { minImpressions, dropPct }
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          console.error("seo-alerts hook failed:", msg);
          return new Response(JSON.stringify({ ok: false, error: msg }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  }
});
const SITE_NAME = "arzoncareers";
const SENDER_DOMAIN = "info.arzoncareers.in";
const FROM_DOMAIN = "info.arzoncareers.in";
const SITE_ORIGIN = "https://arzoncareers.in";
const WHATSAPP_URL = `https://wa.me/${COUNSELLOR_PHONE}`;
const MIN_AGE_MINUTES = 30;
const MAX_AGE_HOURS = 24;
const BATCH_LIMIT = 50;
function generateToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function formatInr(paise) {
  if (!paise && paise !== 0) return void 0;
  return `₹${paise.toLocaleString("en-IN")}`;
}
async function ensureUnsubscribeToken(email) {
  const normalized = email.toLowerCase();
  const { data: existing } = await supabaseAdmin.from("email_unsubscribe_tokens").select("token, used_at").eq("email", normalized).maybeSingle();
  if (existing?.token && !existing.used_at) return existing.token;
  if (existing?.used_at) return null;
  const token = generateToken();
  await supabaseAdmin.from("email_unsubscribe_tokens").upsert({ token, email: normalized }, { onConflict: "email", ignoreDuplicates: true });
  const { data: stored } = await supabaseAdmin.from("email_unsubscribe_tokens").select("token").eq("email", normalized).maybeSingle();
  return stored?.token ?? null;
}
const Route$6 = createFileRoute("/api/public/hooks/recover-abandoned-intents")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        try {
          const minAgeIso = new Date(Date.now() - MIN_AGE_MINUTES * 6e4).toISOString();
          const maxAgeIso = new Date(Date.now() - MAX_AGE_HOURS * 36e5).toISOString();
          const { data: intents, error } = await supabaseAdmin.from("enrolment_intents").select("id, tier, name, email, status, base_price_inr, final_price_inr, created_at").is("paid_at", null).is("recovery_email_sent_at", null).in("status", ["started", "coupon_applied"]).lte("created_at", minAgeIso).gte("created_at", maxAgeIso).order("created_at", { ascending: true }).limit(BATCH_LIMIT);
          if (error) {
            console.error("recover-abandoned-intents: select failed", error);
            return Response.json({ error: error.message }, { status: 500 });
          }
          const template2 = TEMPLATES["enrolment-recovery"];
          if (!template2) {
            return Response.json({ error: "template not registered" }, { status: 500 });
          }
          let queued = 0;
          let skipped = 0;
          for (const row of intents ?? []) {
            if (!row.email || !row.tier) {
              skipped++;
              continue;
            }
            const { data: sup } = await supabaseAdmin.from("suppressed_emails").select("id").eq("email", row.email.toLowerCase()).maybeSingle();
            if (sup) {
              skipped++;
              await supabaseAdmin.from("enrolment_intents").update({ recovery_email_sent_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", row.id);
              continue;
            }
            const tierMeta = isTier(row.tier) ? TIER_META[row.tier] : void 0;
            const tierLabel = tierMeta?.name ?? "your Arzon Global cohort";
            const finalPriceLabel = formatInr(row.final_price_inr) ?? formatInr(row.base_price_inr);
            const resumeUrl = `${SITE_ORIGIN}/enrol/${row.tier}/pay?intent=${row.id}`;
            const templateData = {
              name: row.name ?? void 0,
              tierLabel,
              finalPriceLabel,
              resumeUrl,
              whatsappUrl: WHATSAPP_URL
            };
            const element = reactExports.createElement(template2.component, templateData);
            const html = await render(element);
            const plainText = await render(element, { plainText: true });
            const subject = typeof template2.subject === "function" ? template2.subject(templateData) : template2.subject;
            const unsubscribeToken = await ensureUnsubscribeToken(row.email);
            if (!unsubscribeToken) {
              await supabaseAdmin.from("enrolment_intents").update({ recovery_email_sent_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", row.id);
              skipped++;
              continue;
            }
            const messageId = crypto.randomUUID();
            await supabaseAdmin.from("email_send_log").insert({
              message_id: messageId,
              template_name: "enrolment-recovery",
              recipient_email: row.email,
              status: "pending"
            });
            const { error: enqErr } = await supabaseAdmin.rpc("enqueue_email", {
              queue_name: "transactional_emails",
              payload: {
                message_id: messageId,
                to: row.email,
                from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
                sender_domain: SENDER_DOMAIN,
                subject,
                html,
                text: plainText,
                purpose: "transactional",
                label: "enrolment-recovery",
                idempotency_key: `enrolment-recovery-${row.id}`,
                unsubscribe_token: unsubscribeToken,
                queued_at: (/* @__PURE__ */ new Date()).toISOString()
              }
            });
            if (enqErr) {
              console.error("recover-abandoned-intents: enqueue failed", {
                intent_id: row.id,
                error: enqErr
              });
              await supabaseAdmin.from("email_send_log").insert({
                message_id: messageId,
                template_name: "enrolment-recovery",
                recipient_email: row.email,
                status: "failed",
                error_message: "enqueue failed"
              });
              continue;
            }
            await supabaseAdmin.from("enrolment_intents").update({ recovery_email_sent_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", row.id);
            queued++;
          }
          return Response.json({
            success: true,
            scanned: intents?.length ?? 0,
            queued,
            skipped
          });
        } catch (err) {
          console.error("recover-abandoned-intents: unhandled", err);
          return Response.json(
            { error: err instanceof Error ? err.message : "unknown" },
            { status: 500 }
          );
        }
      }
    }
  }
});
const RAZORPAY_PAYMENT_LINK = "https://rzp.io/rzp/rTrWHwjx";
const ATTEMPT_BACKOFF_MS = [
  5 * 6e4,
  // attempt 1: +5 min after failure
  2 * 60 * 6e4,
  // attempt 2: +2 h
  24 * 60 * 6e4
  // attempt 3: +24 h
];
function buildRecoveryLink(applicationId) {
  return `${RAZORPAY_PAYMENT_LINK}?ref=${encodeURIComponent(applicationId.slice(0, 8))}`;
}
function buildWhatsAppDeepLink(applicantPhone, program, link2) {
  const msg = `Hi! Your seat reservation payment for ${program} didn't complete. Here's a fresh secure payment link to finish: ${link2} Any trouble, reply to this message and we'll help.`;
  const num = (applicantPhone ?? COUNSELLOR_PHONE).replace(/\D/g, "");
  const target = num.length === 10 ? `91${num}` : num;
  return `https://wa.me/${target}?text=${encodeURIComponent(msg)}`;
}
const Route$5 = createFileRoute("/api/public/hooks/payment-recovery")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        const { supabaseAdmin: supabaseAdmin2 } = await import("./client.server-DUn3rRvm.mjs");
        const sb = supabaseAdmin2;
        const { data: paidEvents } = await sb.from("analytics_events").select("application_id").eq("event_name", "payment_success").not("application_id", "is", null).gte("created_at", new Date(Date.now() - 48 * 60 * 6e4).toISOString()).limit(500);
        const paidIds = Array.from(
          new Set(
            (paidEvents ?? []).map((r) => r.application_id).filter(Boolean)
          )
        );
        if (paidIds.length) {
          await sb.from("payment_recovery_queue").update({ status: "completed" }).in("application_id", paidIds).in("status", ["pending", "sent"]);
        }
        const { data: due, error: dueErr } = await sb.from("payment_recovery_queue").select("id, application_id, status, attempts, max_attempts").eq("status", "pending").lte("next_send_at", (/* @__PURE__ */ new Date()).toISOString()).order("next_send_at", { ascending: true }).limit(25);
        if (dueErr) {
          return Response.json({ ok: false, error: String(dueErr) }, { status: 500 });
        }
        const queue = due ?? [];
        if (queue.length === 0) {
          return Response.json({ ok: true, processed: 0 });
        }
        const appIds = queue.map((q) => q.application_id);
        const { data: apps } = await sb.from("applications").select("id, name, phone, program_slug, program_name, lead_id").in("id", appIds);
        const appById = /* @__PURE__ */ new Map();
        for (const a of apps ?? []) appById.set(a.id, a);
        let processed = 0;
        for (const row of queue) {
          const app = appById.get(row.application_id);
          if (!app) {
            await sb.from("payment_recovery_queue").update({ status: "cancelled", last_error: "application_not_found" }).eq("id", row.id);
            continue;
          }
          const attemptIdx = row.attempts;
          const link2 = buildRecoveryLink(app.id);
          const program = app.program_name ?? app.program_slug ?? "your programme";
          const waLink2 = buildWhatsAppDeepLink(app.phone, program, link2);
          const sentAt = (/* @__PURE__ */ new Date()).toISOString();
          const channel = "wa_deep_link";
          await sb.from("application_events").insert({
            application_id: app.id,
            event_type: "payment_recovery_sent",
            note: JSON.stringify({ attempt: attemptIdx + 1, channel, link: link2, wa_link: waLink2 })
          });
          if (app.lead_id) {
            const { data: lead } = await sb.from("counsellor_leads").select("recovery_attempts").eq("id", app.lead_id).maybeSingle();
            const prior = Array.isArray(lead?.recovery_attempts) ? lead.recovery_attempts : [];
            const next = [
              ...prior,
              { attempt: attemptIdx + 1, channel, sent_at: sentAt, link: link2, wa_link: waLink2 }
            ];
            await sb.from("counsellor_leads").update({ recovery_attempts: next }).eq("id", app.lead_id);
          }
          const nextAttempt = attemptIdx + 1;
          if (nextAttempt >= row.max_attempts) {
            await sb.from("payment_recovery_queue").update({
              status: "sent",
              attempts: nextAttempt,
              last_channel: channel
            }).eq("id", row.id);
          } else {
            const offset = ATTEMPT_BACKOFF_MS[nextAttempt] ?? ATTEMPT_BACKOFF_MS[ATTEMPT_BACKOFF_MS.length - 1];
            await sb.from("payment_recovery_queue").update({
              attempts: nextAttempt,
              last_channel: channel,
              next_send_at: new Date(Date.now() + offset).toISOString()
            }).eq("id", row.id);
          }
          processed++;
        }
        return Response.json({ ok: true, processed });
      }
    }
  }
});
const GATEWAY_URL = "https://connector-gateway.lovable.dev";
const TABLES = [
  "applications",
  "career_engine_leads",
  "career_engine_sessions",
  "career_engine_answers",
  "enrolment_intents",
  "counsellor_leads",
  "arzonprime60_waitlist",
  "demand_votes",
  "demand_tracks",
  "demand_milestones",
  "certificates",
  "user_roles",
  "admin_invites",
  "course_thumbnail_overrides",
  "coupons",
  "coupon_tier_prices",
  "audit_log"
];
const PAGE_SIZE = 1e3;
const STORAGE_BUCKETS = ["certificates", "media", "course-thumbnails"];
async function getSignedUploadUrl(objectKey) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const s3Key = process.env.AWS_S3_API_KEY;
  if (!lovableKey) throw new Error("LOVABLE_API_KEY missing");
  if (!s3Key) throw new Error("AWS_S3_API_KEY missing (connect AWS S3 connector with write scope)");
  const res = await fetch(`${GATEWAY_URL}/api/v1/sign_storage_url?provider=aws_s3&mode=write`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": s3Key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ object_path: objectKey })
  });
  if (!res.ok) {
    const text2 = await res.text().catch(() => "");
    throw new Error(`sign_storage_url failed [${res.status}]: ${text2}`);
  }
  const { url } = await res.json();
  return url;
}
async function verifyUpload(objectKey) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const s3Key = process.env.AWS_S3_API_KEY;
  const signRes = await fetch(`${GATEWAY_URL}/api/v1/sign_storage_url?provider=aws_s3&mode=read`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": s3Key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ object_path: objectKey })
  });
  if (!signRes.ok) {
    throw new Error(`verify sign failed [${signRes.status}] for ${objectKey}`);
  }
  const { url } = await signRes.json();
  const head = await fetch(url, { method: "HEAD" });
  if (!head.ok) {
    throw new Error(`verify HEAD failed [${head.status}] for ${objectKey}`);
  }
  const size = Number(head.headers.get("Content-Length") ?? "0");
  if (!size || size <= 0) {
    throw new Error(`verify failed: zero-byte object ${objectKey}`);
  }
  return { size };
}
async function dumpStorageManifest(bucket) {
  const chunks = [];
  let rows = 0;
  let offset = 0;
  while (true) {
    const { data, error } = await supabaseAdmin.storage.from(bucket).list("", { limit: 1e3, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw new Error(`storage list ${bucket}: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const obj of data) {
      chunks.push(
        JSON.stringify({
          name: obj.name,
          id: obj.id,
          updated_at: obj.updated_at,
          created_at: obj.created_at,
          last_accessed_at: obj.last_accessed_at,
          size: obj.metadata?.size ?? null,
          mimetype: obj.metadata?.mimetype ?? null
        })
      );
    }
    rows += data.length;
    if (data.length < 1e3) break;
    offset += 1e3;
  }
  return { jsonl: chunks.join("\n") + (chunks.length ? "\n" : ""), rows };
}
async function dumpTableToJsonl(table) {
  const chunks = [];
  let rows = 0;
  let from = 0;
  while (true) {
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabaseAdmin.from(table).select("*").order("id", { ascending: true }).range(from, to);
    if (error) throw new Error(`select ${table}: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const row of data) chunks.push(JSON.stringify(row));
    rows += data.length;
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return { jsonl: chunks.join("\n") + (chunks.length ? "\n" : ""), rows };
}
const Route$4 = createFileRoute("/api/public/hooks/nightly-backup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env.HOOK_SECRET;
        if (!expected) {
          return new Response("HOOK_SECRET not configured", { status: 500 });
        }
        const supplied = request.headers.get("x-hook-secret");
        if (!supplied || supplied !== expected) {
          return new Response("unauthorized", { status: 401 });
        }
        const { data: runRow, error: insertErr } = await supabaseAdmin.from("backup_runs").insert({ status: "running", destination: "s3" }).select("id").single();
        if (insertErr || !runRow) {
          return new Response(`backup_runs insert failed: ${insertErr?.message ?? "unknown"}`, {
            status: 500
          });
        }
        const runId = runRow.id;
        if (!process.env.AWS_S3_API_KEY || !process.env.LOVABLE_API_KEY) {
          await supabaseAdmin.from("backup_runs").update({
            status: "skipped",
            finished_at: (/* @__PURE__ */ new Date()).toISOString(),
            error: "AWS_S3_API_KEY or LOVABLE_API_KEY missing — connect AWS S3 connector with write scope"
          }).eq("id", runId);
          return Response.json({ ok: false, skipped: true, run_id: runId }, { status: 200 });
        }
        const stamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-");
        const perTable = {};
        let totalRows = 0;
        let totalBytes = 0;
        try {
          for (const table of TABLES) {
            const { jsonl, rows } = await dumpTableToJsonl(table);
            const bytes = new TextEncoder().encode(jsonl).byteLength;
            const objectKey = `arzon-backups/${stamp}/${table}.jsonl`;
            const uploadUrl = await getSignedUploadUrl(objectKey);
            const putRes = await fetch(uploadUrl, {
              method: "PUT",
              headers: { "Content-Type": "application/x-ndjson" },
              body: jsonl
            });
            if (!putRes.ok) {
              const text2 = await putRes.text().catch(() => "");
              throw new Error(`PUT ${table} failed [${putRes.status}]: ${text2.slice(0, 200)}`);
            }
            const verified = await verifyUpload(objectKey);
            perTable[table] = { rows, bytes, verified_size: verified.size };
            totalRows += rows;
            totalBytes += bytes;
          }
          for (const bucket of STORAGE_BUCKETS) {
            const { jsonl, rows } = await dumpStorageManifest(bucket);
            const bytes = new TextEncoder().encode(jsonl).byteLength;
            const objectKey = `arzon-backups/${stamp}/_storage_${bucket}.jsonl`;
            const uploadUrl = await getSignedUploadUrl(objectKey);
            const putRes = await fetch(uploadUrl, {
              method: "PUT",
              headers: { "Content-Type": "application/x-ndjson" },
              body: jsonl
            });
            if (!putRes.ok) {
              const text2 = await putRes.text().catch(() => "");
              throw new Error(
                `PUT storage/${bucket} failed [${putRes.status}]: ${text2.slice(0, 200)}`
              );
            }
            const verified = await verifyUpload(objectKey);
            perTable[`_storage:${bucket}`] = { rows, bytes, verified_size: verified.size };
            totalRows += rows;
            totalBytes += bytes;
          }
          await supabaseAdmin.from("backup_runs").update({
            status: "success",
            finished_at: (/* @__PURE__ */ new Date()).toISOString(),
            table_count: TABLES.length + STORAGE_BUCKETS.length,
            row_count: totalRows,
            bytes: totalBytes,
            destination: `s3://arzon-backups/${stamp}/`,
            details: { per_table: perTable, stamp }
          }).eq("id", runId);
          return Response.json({
            ok: true,
            run_id: runId,
            stamp,
            tables: TABLES.length,
            storage_manifests: STORAGE_BUCKETS.length,
            rows: totalRows,
            bytes: totalBytes
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          await supabaseAdmin.from("backup_runs").update({
            status: "failed",
            finished_at: (/* @__PURE__ */ new Date()).toISOString(),
            table_count: Object.keys(perTable).length,
            row_count: totalRows,
            bytes: totalBytes,
            error: message.slice(0, 2e3),
            details: { per_table: perTable, stamp }
          }).eq("id", runId);
          try {
            await supabaseAdmin.from("analytics_alerts").insert({
              alert_type: "backup_failed",
              event_name: "nightly_backup",
              details: { run_id: runId, error: message.slice(0, 500), stamp }
            });
          } catch {
          }
          return Response.json(
            { ok: false, run_id: runId, error: message.slice(0, 500) },
            { status: 500 }
          );
        }
      }
    }
  }
});
const CHECKIN_COPY = {
  "30d": {
    subject: "Quick 1-question check-in from Arzon Careers",
    body: "It's been a month since you started tracking your role — are you still in it?"
  },
  "90d": {
    subject: "90 days in — still in role?",
    body: "Three months in. Are you still in the role you chose?"
  },
  "180d": {
    subject: "Halfway through year one",
    body: "Six months in. Are you still in the role you chose?"
  },
  "365d": {
    subject: "One year on — quick update?",
    body: "A year in. Are you still in the role you chose?"
  }
};
async function sendCheckinEmail(row, origin) {
  if (!row.user_email) return true;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(
      "[dispatch-checkins] would email",
      row.user_email,
      row.checkin_type,
      `${origin}/checkin/${row.token}`
    );
    return true;
  }
  const copy = CHECKIN_COPY[row.checkin_type] ?? CHECKIN_COPY["30d"];
  const link2 = `${origin}/checkin/${row.token}`;
  const html = `<p>${copy.body}</p><p><a href="${link2}">Yes, still in role</a> &middot; <a href="${link2}?left=1">No, I left</a></p>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: "Arzon Careers <hello@arzoncareers.in>",
      to: [row.user_email],
      subject: copy.subject,
      html
    })
  });
  return res.ok;
}
const Route$3 = createFileRoute("/api/public/hooks/dispatch-checkins")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        const origin = process.env.PUBLIC_SITE_ORIGIN ?? "https://arzoncareers.in";
        const { data: enqueued, error: enqErr } = await supabaseAdmin.rpc(
          "enqueue_retention_checkins"
        );
        if (enqErr) {
          return new Response(
            JSON.stringify({ ok: false, stage: "enqueue", error: enqErr.message }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
        const { data: claimedRows, error: claimErr } = await supabaseAdmin.rpc(
          "claim_due_retention_checkins",
          { p_limit: 100 }
        );
        if (claimErr) {
          return new Response(
            JSON.stringify({ ok: false, stage: "claim", error: claimErr.message }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
        const rows = claimedRows ?? [];
        let delivered = 0;
        let failed = 0;
        const failedIds = [];
        for (const row of rows) {
          try {
            const ok = await sendCheckinEmail(row, origin);
            if (ok) delivered += 1;
            else {
              failed += 1;
              failedIds.push(row.id);
            }
          } catch {
            failed += 1;
            failedIds.push(row.id);
          }
        }
        if (failedIds.length) {
          await supabaseAdmin.from("retention_checkins").update({ sent_at: null }).in("id", failedIds);
        }
        return new Response(
          JSON.stringify({ ok: true, enqueued, claimed: rows.length, delivered, failed }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }
});
async function postSlack(webhook, payload) {
  const text2 = `:rotating_light: *${payload.kind}* — ${payload.title}
Fired: ${payload.fired_at}
\`\`\`${JSON.stringify(payload.body, null, 2).slice(0, 2500)}\`\`\``;
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text2 })
  });
  return res.ok;
}
const Route$2 = createFileRoute("/api/public/hooks/dispatch-alerts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = verifyHookSecret(request);
        if (unauthorized) return unauthorized;
        const webhook = process.env.SLACK_ALERT_WEBHOOK_URL;
        const { data, error } = await supabaseAdmin.rpc("pending_alert_payloads", { _limit: 50 });
        if (error) {
          return new Response(JSON.stringify({ ok: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
        const rows = data ?? [];
        const analyticsIds = [];
        const backupIds = [];
        let delivered = 0;
        let skipped = 0;
        for (const row of rows) {
          let ok = true;
          if (webhook) {
            try {
              ok = await postSlack(webhook, row);
            } catch {
              ok = false;
            }
          } else {
            skipped += 1;
            console.warn(
              "[dispatch-alerts] SLACK_ALERT_WEBHOOK_URL not set; would notify",
              row.title
            );
          }
          if (ok) {
            delivered += 1;
            if (row.kind === "analytics") analyticsIds.push(row.id);
            else backupIds.push(row.id);
          }
        }
        if (analyticsIds.length) {
          await supabaseAdmin.rpc("mark_alerts_notified", { _ids: analyticsIds });
        }
        if (backupIds.length) {
          await supabaseAdmin.rpc("mark_backup_alerts_notified", { _ids: backupIds });
        }
        return new Response(
          JSON.stringify({
            ok: true,
            found: rows.length,
            delivered,
            skipped,
            webhook_configured: Boolean(webhook)
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }
});
const BATCH_SIZE = 500;
const Route$1 = createFileRoute("/api/public/cron/flush-analytics")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authHeader = request.headers.get("Authorization");
        const cronSecret = process.env.CRON_SECRET;
        if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
          return new Response("Unauthorized", { status: 401 });
        }
        if (!process.env.UPSTASH_REDIS_REST_URL) {
          return Response.json({ status: "skipped", reason: "redis_not_configured" });
        }
        try {
          const events = await redis.lrange("buffer:analytics_events", 0, BATCH_SIZE - 1);
          if (!events || events.length === 0) {
            return Response.json({ status: "ok", flushed: 0 });
          }
          const rowsToInsert = events.map((ev) => ({
            event_name: ev.p_event_name,
            anon_id: ev.p_anon_id || null,
            session_id: ev.p_session_id || null,
            application_id: ev.p_application_id || null,
            lead_id: ev.p_lead_id || null,
            path: ev.p_path || null,
            referrer: ev.p_referrer || null,
            utm_source: ev.p_utm_source || null,
            program_slug: ev.p_program_slug || null,
            cohort: ev.p_cohort || null,
            props: ev.p_props || {},
            user_agent: ev.p_user_agent || null,
            ip_hash: ev.p_ip_hash || null,
            created_at: ev._timestamp || (/* @__PURE__ */ new Date()).toISOString()
          }));
          const { error } = await supabaseAdmin.from("analytics_events").insert(rowsToInsert);
          if (error) {
            console.error("[cron:flush-analytics] Supabase insert failed:", error);
            return Response.json({ status: "error", error: error.message }, { status: 500 });
          }
          await redis.ltrim("buffer:analytics_events", events.length, -1);
          return Response.json({ status: "ok", flushed: events.length });
        } catch (err) {
          console.error("[cron:flush-analytics] Flush failed:", err);
          return Response.json({ status: "error", error: String(err) }, { status: 500 });
        }
      }
    }
  }
});
const Route = createFileRoute("/api/public/og/result/{$id}.svg")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slug = params.id ?? "";
        if (!slug || slug.length > 80 || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
          return new Response("not found", { status: 404 });
        }
        const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
          auth: { persistSession: false }
        });
        const { data: row } = await sb.from("assessment_shares").select("archetype_name, top_track_title, acri_overall, band_label").eq("slug", slug).maybeSingle();
        const score = row?.acri_overall ?? 0;
        const archetype = esc(row?.archetype_name ?? "Career Engine Result");
        const track2 = esc(row?.top_track_title ?? "Healthcare Career");
        const band = esc(row?.band_label ?? "ACRI Readiness Preview");
        const dash = Math.max(0, Math.min(100, score)) / 100 * 565.5;
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070A14"/>
      <stop offset="100%" stop-color="#0E1626"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C9A84C"/>
      <stop offset="100%" stop-color="#F0D78C"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0%" stop-color="#7BA3FF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#7BA3FF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" fill="#ffffff">
    <text x="80" y="110" font-size="22" letter-spacing="6" fill="#7BA3FF" font-weight="600">ARZON CAREERS · ACRI</text>
    <text x="80" y="200" font-size="68" font-weight="700">They scored</text>
    <text x="80" y="300" font-size="180" font-weight="800" fill="url(#gold)">${score}</text>
    <text x="80" y="360" font-size="32" fill="#C9CDD6">${band}</text>
    <text x="80" y="450" font-size="26" fill="#9AA3B2" letter-spacing="2">TOP FIT</text>
    <text x="80" y="498" font-size="44" font-weight="700">${track2}</text>
    <text x="80" y="540" font-size="22" fill="#9AA3B2">Archetype · ${archetype}</text>
    <text x="80" y="595" font-size="20" fill="#7BA3FF">Take yours · 4 min · arzonglobal.com</text>
  </g>
  <g transform="translate(950 315)">
    <circle cx="0" cy="0" r="180" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
    <circle cx="0" cy="0" r="90" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="14"/>
    <circle cx="0" cy="0" r="90" fill="none" stroke="#7BA3FF" stroke-width="14" stroke-linecap="round"
            stroke-dasharray="${dash} 565.5" transform="rotate(-90)"/>
    <text x="0" y="6" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="62" font-weight="800" fill="#ffffff">${score}</text>
    <text x="0" y="42" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" letter-spacing="3" fill="#7BA3FF">/ 100 ACRI</text>
  </g>
</svg>`;
        return new Response(svg, {
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=86400, s-maxage=86400"
          }
        });
      }
    }
  }
});
function esc(s) {
  return s.replace(
    /[&<>"']/g,
    (c) => c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&apos;"
  );
}
const WhyArzonRoute = Route$2a.update({
  id: "/why-arzon",
  path: "/why-arzon",
  getParentRoute: () => Route$2b
});
const WaitlistRoute = Route$29.update({
  id: "/waitlist",
  path: "/waitlist",
  getParentRoute: () => Route$2b
});
const VerifyRoute = Route$28.update({
  id: "/verify",
  path: "/verify",
  getParentRoute: () => Route$2b
});
const TrustReportRoute = Route$27.update({
  id: "/trust-report",
  path: "/trust-report",
  getParentRoute: () => Route$2b
});
const TposRoute = Route$26.update({
  id: "/tpos",
  path: "/tpos",
  getParentRoute: () => Route$2b
});
const StatusRoute = Route$25.update({
  id: "/status",
  path: "/status",
  getParentRoute: () => Route$2b
});
const SitemapDotxmlRoute = Route$24.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$2b
});
const RoadmapRoute = Route$23.update({
  id: "/roadmap",
  path: "/roadmap",
  getParentRoute: () => Route$2b
});
const ResetPasswordRoute = Route$22.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$2b
});
const RepublicRoute = Route$21.update({
  id: "/republic",
  path: "/republic",
  getParentRoute: () => Route$2b
});
const RefundRoute = Route$20.update({
  id: "/refund",
  path: "/refund",
  getParentRoute: () => Route$2b
});
const ReferRoute = Route$1$.update({
  id: "/refer",
  path: "/refer",
  getParentRoute: () => Route$2b
});
const RecruitersRoute = Route$1_.update({
  id: "/recruiters",
  path: "/recruiters",
  getParentRoute: () => Route$2b
});
const QaRoute = Route$1Z.update({
  id: "/qa",
  path: "/qa",
  getParentRoute: () => Route$2b
});
const ProofMethodologyRoute = Route$1Y.update({
  id: "/proof-methodology",
  path: "/proof-methodology",
  getParentRoute: () => Route$2b
});
const ProofRoute = Route$1X.update({
  id: "/proof",
  path: "/proof",
  getParentRoute: () => Route$2b
});
const PlacementsRoute = Route$1W.update({
  id: "/placements",
  path: "/placements",
  getParentRoute: () => Route$2b
});
const MethodologyRoute = Route$1V.update({
  id: "/methodology",
  path: "/methodology",
  getParentRoute: () => Route$2b
});
const JdMirrorRoute = Route$1U.update({
  id: "/jd-mirror",
  path: "/jd-mirror",
  getParentRoute: () => Route$2b
});
const FaqRoute = Route$1T.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$2b
});
const EnrolRoute = Route$1S.update({
  id: "/enrol",
  path: "/enrol",
  getParentRoute: () => Route$2b
});
const DeploymentModelRoute = Route$1R.update({
  id: "/deployment-model",
  path: "/deployment-model",
  getParentRoute: () => Route$2b
});
const DashboardRoute = Route$1Q.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$2b
});
const CurriculumRoute = Route$1P.update({
  id: "/curriculum",
  path: "/curriculum",
  getParentRoute: () => Route$2b
});
const CredibilityRoute = Route$1O.update({
  id: "/credibility",
  path: "/credibility",
  getParentRoute: () => Route$2b
});
const CopilotRoute = Route$1N.update({
  id: "/copilot",
  path: "/copilot",
  getParentRoute: () => Route$2b
});
const ContactRoute = Route$1M.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$2b
});
const CohortsRoute = Route$1L.update({
  id: "/cohorts",
  path: "/cohorts",
  getParentRoute: () => Route$2b
});
const ChangelogRoute = Route$1K.update({
  id: "/changelog",
  path: "/changelog",
  getParentRoute: () => Route$2b
});
const CareerEngineRoute = Route$1J.update({
  id: "/career-engine",
  path: "/career-engine",
  getParentRoute: () => Route$2b
});
const ApplyRoute = Route$1I.update({
  id: "/apply",
  path: "/apply",
  getParentRoute: () => Route$2b
});
const AdminRoute = Route$1H.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$2b
});
const AcriRoute = Route$1G.update({
  id: "/acri",
  path: "/acri",
  getParentRoute: () => Route$2b
});
const AboutRoute = Route$1F.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$2b
});
const AuthenticatedRouteRoute = Route$1E.update({
  id: "/_authenticated",
  getParentRoute: () => Route$2b
});
const IndexRoute = Route$1D.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2b
});
const MomentsIndexRoute = Route$1C.update({
  id: "/moments/",
  path: "/moments/",
  getParentRoute: () => Route$2b
});
const InternshipsIndexRoute = Route$1B.update({
  id: "/internships/",
  path: "/internships/",
  getParentRoute: () => Route$2b
});
const IndustryIndexRoute = Route$1A.update({
  id: "/industry/",
  path: "/industry/",
  getParentRoute: () => Route$2b
});
const EnrolIndexRoute = Route$1z.update({
  id: "/",
  path: "/",
  getParentRoute: () => EnrolRoute
});
const CoursesIndexRoute = Route$1y.update({
  id: "/courses/",
  path: "/courses/",
  getParentRoute: () => Route$2b
});
const CareerEngineIndexRoute = Route$1x.update({
  id: "/",
  path: "/",
  getParentRoute: () => CareerEngineRoute
});
const BuildIndexRoute = Route$1w.update({
  id: "/build/",
  path: "/build/",
  getParentRoute: () => Route$2b
});
const ApplyIndexRoute = Route$1v.update({
  id: "/",
  path: "/",
  getParentRoute: () => ApplyRoute
});
const AdminIndexRoute = Route$1u.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const StudentResumeRoute = Route$1t.update({
  id: "/student/resume",
  path: "/student/resume",
  getParentRoute: () => Route$2b
});
const RIdRoute = Route$1s.update({
  id: "/r/$id",
  path: "/r/$id",
  getParentRoute: () => Route$2b
});
const MomentsSlugRoute = Route$1r.update({
  id: "/moments/$slug",
  path: "/moments/$slug",
  getParentRoute: () => Route$2b
});
const LegalTermsRoute = Route$1q.update({
  id: "/legal/terms",
  path: "/legal/terms",
  getParentRoute: () => Route$2b
});
const LegalPrivacyRoute = Route$1p.update({
  id: "/legal/privacy",
  path: "/legal/privacy",
  getParentRoute: () => Route$2b
});
const LearnSlugRoute = Route$1o.update({
  id: "/learn/$slug",
  path: "/learn/$slug",
  getParentRoute: () => Route$2b
});
const InternshipsPharmacovigilanceRoute = Route$1n.update({
  id: "/internships/pharmacovigilance",
  path: "/internships/pharmacovigilance",
  getParentRoute: () => Route$2b
});
const InternshipsMedicalCodingRoute = Route$1m.update({
  id: "/internships/medical-coding",
  path: "/internships/medical-coding",
  getParentRoute: () => Route$2b
});
const InternshipsClinicalDataManagementRoute = Route$1l.update({
  id: "/internships/clinical-data-management",
  path: "/internships/clinical-data-management",
  getParentRoute: () => Route$2b
});
const IndustrySalariesRoute = Route$1k.update({
  id: "/industry/salaries",
  path: "/industry/salaries",
  getParentRoute: () => Route$2b
});
const IndustryEmployersRoute = Route$1j.update({
  id: "/industry/employers",
  path: "/industry/employers",
  getParentRoute: () => Route$2b
});
const IndustryCompareRoute = Route$1i.update({
  id: "/industry/compare",
  path: "/industry/compare",
  getParentRoute: () => Route$2b
});
const IndustryRoleRoute = Route$1h.update({
  id: "/industry/$role",
  path: "/industry/$role",
  getParentRoute: () => Route$2b
});
const EnrolSuccessRoute = Route$1g.update({
  id: "/success",
  path: "/success",
  getParentRoute: () => EnrolRoute
});
const EnrolTierRoute = Route$1f.update({
  id: "/$tier",
  path: "/$tier",
  getParentRoute: () => EnrolRoute
});
const EmployerLoginRoute = Route$1e.update({
  id: "/employer/login",
  path: "/employer/login",
  getParentRoute: () => Route$2b
});
const EmailUnsubscribeRoute = Route$1d.update({
  id: "/email/unsubscribe",
  path: "/email/unsubscribe",
  getParentRoute: () => Route$2b
});
const DevCardsRoute = Route$1c.update({
  id: "/dev/cards",
  path: "/dev/cards",
  getParentRoute: () => Route$2b
});
const CoursesCompareRoute = Route$1b.update({
  id: "/courses/compare",
  path: "/courses/compare",
  getParentRoute: () => Route$2b
});
const CoursesSlugRoute = Route$1a.update({
  id: "/courses/$slug",
  path: "/courses/$slug",
  getParentRoute: () => Route$2b
});
const CheckinTokenRoute = Route$19.update({
  id: "/checkin/$token",
  path: "/checkin/$token",
  getParentRoute: () => Route$2b
});
const CareerEngineTestRoute = Route$18.update({
  id: "/test",
  path: "/test",
  getParentRoute: () => CareerEngineRoute
});
const CareerEngineStartRoute = Route$17.update({
  id: "/start",
  path: "/start",
  getParentRoute: () => CareerEngineRoute
});
const CareerEngineResultRoute = Route$16.update({
  id: "/result",
  path: "/result",
  getParentRoute: () => CareerEngineRoute
});
const CareerEnginePlanRoute = Route$15.update({
  id: "/plan",
  path: "/plan",
  getParentRoute: () => CareerEngineRoute
});
const CareerEngineLeadRoute = Route$14.update({
  id: "/lead",
  path: "/lead",
  getParentRoute: () => CareerEngineRoute
});
const CareerEngineEnrolRoute = Route$13.update({
  id: "/enrol",
  path: "/enrol",
  getParentRoute: () => CareerEngineRoute
});
const BuildRequestRoute = Route$12.update({
  id: "/build/request",
  path: "/build/request",
  getParentRoute: () => Route$2b
});
const BuildSlugRoute = Route$11.update({
  id: "/build/$slug",
  path: "/build/$slug",
  getParentRoute: () => Route$2b
});
const ApplySuccessRoute = Route$10.update({
  id: "/success",
  path: "/success",
  getParentRoute: () => ApplyRoute
});
const ApplyReviewRoute = Route$$.update({
  id: "/review",
  path: "/review",
  getParentRoute: () => ApplyRoute
});
const ApplyConfirmRoute = Route$_.update({
  id: "/confirm",
  path: "/confirm",
  getParentRoute: () => ApplyRoute
});
const ApiChatRoute = Route$Z.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$2b
});
const AdminThumbnailsRoute = Route$Y.update({
  id: "/thumbnails",
  path: "/thumbnails",
  getParentRoute: () => AdminRoute
});
const AdminSeoRoute = Route$X.update({
  id: "/seo",
  path: "/seo",
  getParentRoute: () => AdminRoute
});
const AdminRolesRoute = Route$W.update({
  id: "/roles",
  path: "/roles",
  getParentRoute: () => AdminRoute
});
const AdminRetentionRoute = Route$V.update({
  id: "/retention",
  path: "/retention",
  getParentRoute: () => AdminRoute
});
const AdminResultsRoute = Route$U.update({
  id: "/results",
  path: "/results",
  getParentRoute: () => AdminRoute
});
const AdminReadinessJourneysRoute = Route$T.update({
  id: "/readiness-journeys",
  path: "/readiness-journeys",
  getParentRoute: () => AdminRoute
});
const AdminPromotionsRoute = Route$S.update({
  id: "/promotions",
  path: "/promotions",
  getParentRoute: () => AdminRoute
});
const AdminPlacementsRoute = Route$R.update({
  id: "/placements",
  path: "/placements",
  getParentRoute: () => AdminRoute
});
const AdminMomentsRoute = Route$Q.update({
  id: "/moments",
  path: "/moments",
  getParentRoute: () => AdminRoute
});
const AdminMetricsDomainGridRoute = Route$P.update({
  id: "/metrics-domain-grid",
  path: "/metrics-domain-grid",
  getParentRoute: () => AdminRoute
});
const AdminLoginRoute = Route$O.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AdminRoute
});
const AdminLeadsRoute = Route$N.update({
  id: "/leads",
  path: "/leads",
  getParentRoute: () => AdminRoute
});
const AdminLandingChangelogRoute = Route$M.update({
  id: "/landing-changelog",
  path: "/landing-changelog",
  getParentRoute: () => AdminRoute
});
const AdminInvitesRoute = Route$L.update({
  id: "/invites",
  path: "/invites",
  getParentRoute: () => AdminRoute
});
const AdminFunnelTestRoute = Route$K.update({
  id: "/funnel-test",
  path: "/funnel-test",
  getParentRoute: () => AdminRoute
});
const AdminFunnelCeRoute = Route$J.update({
  id: "/funnel-ce",
  path: "/funnel-ce",
  getParentRoute: () => AdminRoute
});
const AdminFunnelRoute = Route$I.update({
  id: "/funnel",
  path: "/funnel",
  getParentRoute: () => AdminRoute
});
const AdminExperimentsRoute = Route$H.update({
  id: "/experiments",
  path: "/experiments",
  getParentRoute: () => AdminRoute
});
const AdminDemandRoute = Route$G.update({
  id: "/demand",
  path: "/demand",
  getParentRoute: () => AdminRoute
});
const AdminContentQaScanRoute = Route$F.update({
  id: "/content-qa-scan",
  path: "/content-qa-scan",
  getParentRoute: () => AdminRoute
});
const AdminCohortsRoute = Route$E.update({
  id: "/cohorts",
  path: "/cohorts",
  getParentRoute: () => AdminRoute
});
const AdminCertificatesRoute = Route$D.update({
  id: "/certificates",
  path: "/certificates",
  getParentRoute: () => AdminRoute
});
const AdminBackupsRoute = Route$C.update({
  id: "/backups",
  path: "/backups",
  getParentRoute: () => AdminRoute
});
const AdminAuditRoute = Route$B.update({
  id: "/audit",
  path: "/audit",
  getParentRoute: () => AdminRoute
});
const AdminAssetsRoute = Route$A.update({
  id: "/assets",
  path: "/assets",
  getParentRoute: () => AdminRoute
});
const AdminArzonprime60Route = Route$z.update({
  id: "/arzonprime60",
  path: "/arzonprime60",
  getParentRoute: () => AdminRoute
});
const AdminApplicationsRoute = Route$y.update({
  id: "/applications",
  path: "/applications",
  getParentRoute: () => AdminRoute
});
const AdminAnalyticsAlertsRoute = Route$x.update({
  id: "/analytics-alerts",
  path: "/analytics-alerts",
  getParentRoute: () => AdminRoute
});
const AdminActivityRoute = Route$w.update({
  id: "/activity",
  path: "/activity",
  getParentRoute: () => AdminRoute
});
const AdminAcceptInviteRoute = Route$v.update({
  id: "/accept-invite",
  path: "/accept-invite",
  getParentRoute: () => AdminRoute
});
const AuthenticatedLearningPathRoute = Route$u.update({
  id: "/learning-path",
  path: "/learning-path",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedHubRoute = Route$t.update({
  id: "/hub",
  path: "/hub",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAppRoute = Route$s.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => AuthenticatedRouteRoute
});
const _vrMomentsEmptyRoute = Route$r.update({
  id: "/__vr/moments-empty",
  path: "/moments-empty",
  getParentRoute: () => Route$2b
});
const RecruitersCandidateIdRoute = Route$q.update({
  id: "/candidate/$id",
  path: "/candidate/$id",
  getParentRoute: () => RecruitersRoute
});
const RArtifactTokenRoute = Route$p.update({
  id: "/r/artifact/$token",
  path: "/r/artifact/$token",
  getParentRoute: () => Route$2b
});
const RIdBriefRoute = Route$o.update({
  id: "/brief",
  path: "/brief",
  getParentRoute: () => RIdRoute
});
const LovableEmailSuppressionRoute = Route$n.update({
  id: "/lovable/email/suppression",
  path: "/lovable/email/suppression",
  getParentRoute: () => Route$2b
});
const IndustryRoleCityRoute = Route$m.update({
  id: "/$city",
  path: "/$city",
  getParentRoute: () => IndustryRoleRoute
});
const EnrolTierPayRoute = Route$l.update({
  id: "/pay",
  path: "/pay",
  getParentRoute: () => EnrolTierRoute
});
const CertificatesSampleSlugRoute = Route$k.update({
  id: "/certificates/sample/$slug",
  path: "/certificates/sample/$slug",
  getParentRoute: () => Route$2b
});
const CareerEnginePathSlugRoute = Route$j.update({
  id: "/path/$slug",
  path: "/path/$slug",
  getParentRoute: () => CareerEngineRoute
});
const ApiPublicCareerEngineNotifyRoute = Route$i.update({
  id: "/api/public/career-engine-notify",
  path: "/api/public/career-engine-notify",
  getParentRoute: () => Route$2b
});
const AdminSeoSettingsRoute = Route$h.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AdminSeoRoute
});
const AdminQaContentRebalanceRoute = Route$g.update({
  id: "/qa/content-rebalance",
  path: "/qa/content-rebalance",
  getParentRoute: () => AdminRoute
});
const AdminMomentsIdRoute = Route$f.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminMomentsRoute
});
const AdminExperimentsStickyCtaRoute = Route$e.update({
  id: "/sticky-cta",
  path: "/sticky-cta",
  getParentRoute: () => AdminExperimentsRoute
});
const AuthenticatedEmployerConsoleRoute = Route$d.update({
  id: "/employer/console",
  path: "/employer/console",
  getParentRoute: () => AuthenticatedRouteRoute
});
const LovableEmailTransactionalSendRoute = Route$c.update({
  id: "/lovable/email/transactional/send",
  path: "/lovable/email/transactional/send",
  getParentRoute: () => Route$2b
});
const LovableEmailTransactionalPreviewRoute = Route$b.update({
  id: "/lovable/email/transactional/preview",
  path: "/lovable/email/transactional/preview",
  getParentRoute: () => Route$2b
});
const LovableEmailQueueProcessRoute = Route$a.update({
  id: "/lovable/email/queue/process",
  path: "/lovable/email/queue/process",
  getParentRoute: () => Route$2b
});
const ApiPublicRazorpayWebhookRoute = Route$9.update({
  id: "/api/public/razorpay/webhook",
  path: "/api/public/razorpay/webhook",
  getParentRoute: () => Route$2b
});
const ApiPublicRazorpayVerifyRoute = Route$8.update({
  id: "/api/public/razorpay/verify",
  path: "/api/public/razorpay/verify",
  getParentRoute: () => Route$2b
});
const ApiPublicHooksSeoAlertsRoute = Route$7.update({
  id: "/api/public/hooks/seo-alerts",
  path: "/api/public/hooks/seo-alerts",
  getParentRoute: () => Route$2b
});
const ApiPublicHooksRecoverAbandonedIntentsRoute = Route$6.update({
  id: "/api/public/hooks/recover-abandoned-intents",
  path: "/api/public/hooks/recover-abandoned-intents",
  getParentRoute: () => Route$2b
});
const ApiPublicHooksPaymentRecoveryRoute = Route$5.update({
  id: "/api/public/hooks/payment-recovery",
  path: "/api/public/hooks/payment-recovery",
  getParentRoute: () => Route$2b
});
const ApiPublicHooksNightlyBackupRoute = Route$4.update({
  id: "/api/public/hooks/nightly-backup",
  path: "/api/public/hooks/nightly-backup",
  getParentRoute: () => Route$2b
});
const ApiPublicHooksDispatchCheckinsRoute = Route$3.update({
  id: "/api/public/hooks/dispatch-checkins",
  path: "/api/public/hooks/dispatch-checkins",
  getParentRoute: () => Route$2b
});
const ApiPublicHooksDispatchAlertsRoute = Route$2.update({
  id: "/api/public/hooks/dispatch-alerts",
  path: "/api/public/hooks/dispatch-alerts",
  getParentRoute: () => Route$2b
});
const ApiPublicCronFlushAnalyticsRoute = Route$1.update({
  id: "/api/public/cron/flush-analytics",
  path: "/api/public/cron/flush-analytics",
  getParentRoute: () => Route$2b
});
const ApiPublicOgResultChar123idChar125DotsvgRoute = Route.update({
  id: "/api/public/og/result/{$id}.svg",
  path: "/api/public/og/result/{$id}.svg",
  getParentRoute: () => Route$2b
});
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAppRoute,
  AuthenticatedHubRoute,
  AuthenticatedLearningPathRoute,
  AuthenticatedEmployerConsoleRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const AdminExperimentsRouteChildren = {
  AdminExperimentsStickyCtaRoute
};
const AdminExperimentsRouteWithChildren = AdminExperimentsRoute._addFileChildren(AdminExperimentsRouteChildren);
const AdminMomentsRouteChildren = {
  AdminMomentsIdRoute
};
const AdminMomentsRouteWithChildren = AdminMomentsRoute._addFileChildren(
  AdminMomentsRouteChildren
);
const AdminSeoRouteChildren = {
  AdminSeoSettingsRoute
};
const AdminSeoRouteWithChildren = AdminSeoRoute._addFileChildren(
  AdminSeoRouteChildren
);
const AdminRouteChildren = {
  AdminAcceptInviteRoute,
  AdminActivityRoute,
  AdminAnalyticsAlertsRoute,
  AdminApplicationsRoute,
  AdminArzonprime60Route,
  AdminAssetsRoute,
  AdminAuditRoute,
  AdminBackupsRoute,
  AdminCertificatesRoute,
  AdminCohortsRoute,
  AdminContentQaScanRoute,
  AdminDemandRoute,
  AdminExperimentsRoute: AdminExperimentsRouteWithChildren,
  AdminFunnelRoute,
  AdminFunnelCeRoute,
  AdminFunnelTestRoute,
  AdminInvitesRoute,
  AdminLandingChangelogRoute,
  AdminLeadsRoute,
  AdminLoginRoute,
  AdminMetricsDomainGridRoute,
  AdminMomentsRoute: AdminMomentsRouteWithChildren,
  AdminPlacementsRoute,
  AdminPromotionsRoute,
  AdminReadinessJourneysRoute,
  AdminResultsRoute,
  AdminRetentionRoute,
  AdminRolesRoute,
  AdminSeoRoute: AdminSeoRouteWithChildren,
  AdminThumbnailsRoute,
  AdminIndexRoute,
  AdminQaContentRebalanceRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const ApplyRouteChildren = {
  ApplyConfirmRoute,
  ApplyReviewRoute,
  ApplySuccessRoute,
  ApplyIndexRoute
};
const ApplyRouteWithChildren = ApplyRoute._addFileChildren(ApplyRouteChildren);
const CareerEngineRouteChildren = {
  CareerEngineEnrolRoute,
  CareerEngineLeadRoute,
  CareerEnginePlanRoute,
  CareerEngineResultRoute,
  CareerEngineStartRoute,
  CareerEngineTestRoute,
  CareerEngineIndexRoute,
  CareerEnginePathSlugRoute
};
const CareerEngineRouteWithChildren = CareerEngineRoute._addFileChildren(
  CareerEngineRouteChildren
);
const EnrolTierRouteChildren = {
  EnrolTierPayRoute
};
const EnrolTierRouteWithChildren = EnrolTierRoute._addFileChildren(
  EnrolTierRouteChildren
);
const EnrolRouteChildren = {
  EnrolTierRoute: EnrolTierRouteWithChildren,
  EnrolSuccessRoute,
  EnrolIndexRoute
};
const EnrolRouteWithChildren = EnrolRoute._addFileChildren(EnrolRouteChildren);
const RecruitersRouteChildren = {
  RecruitersCandidateIdRoute
};
const RecruitersRouteWithChildren = RecruitersRoute._addFileChildren(
  RecruitersRouteChildren
);
const IndustryRoleRouteChildren = {
  IndustryRoleCityRoute
};
const IndustryRoleRouteWithChildren = IndustryRoleRoute._addFileChildren(
  IndustryRoleRouteChildren
);
const RIdRouteChildren = {
  RIdBriefRoute
};
const RIdRouteWithChildren = RIdRoute._addFileChildren(RIdRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AboutRoute,
  AcriRoute,
  AdminRoute: AdminRouteWithChildren,
  ApplyRoute: ApplyRouteWithChildren,
  CareerEngineRoute: CareerEngineRouteWithChildren,
  ChangelogRoute,
  CohortsRoute,
  ContactRoute,
  CopilotRoute,
  CredibilityRoute,
  CurriculumRoute,
  DashboardRoute,
  DeploymentModelRoute,
  EnrolRoute: EnrolRouteWithChildren,
  FaqRoute,
  JdMirrorRoute,
  MethodologyRoute,
  PlacementsRoute,
  ProofRoute,
  ProofMethodologyRoute,
  QaRoute,
  RecruitersRoute: RecruitersRouteWithChildren,
  ReferRoute,
  RefundRoute,
  RepublicRoute,
  ResetPasswordRoute,
  RoadmapRoute,
  SitemapDotxmlRoute,
  StatusRoute,
  TposRoute,
  TrustReportRoute,
  VerifyRoute,
  WaitlistRoute,
  WhyArzonRoute,
  _vrMomentsEmptyRoute,
  ApiChatRoute,
  BuildSlugRoute,
  BuildRequestRoute,
  CheckinTokenRoute,
  CoursesSlugRoute,
  CoursesCompareRoute,
  DevCardsRoute,
  EmailUnsubscribeRoute,
  EmployerLoginRoute,
  IndustryRoleRoute: IndustryRoleRouteWithChildren,
  IndustryCompareRoute,
  IndustryEmployersRoute,
  IndustrySalariesRoute,
  InternshipsClinicalDataManagementRoute,
  InternshipsMedicalCodingRoute,
  InternshipsPharmacovigilanceRoute,
  LearnSlugRoute,
  LegalPrivacyRoute,
  LegalTermsRoute,
  MomentsSlugRoute,
  RIdRoute: RIdRouteWithChildren,
  StudentResumeRoute,
  BuildIndexRoute,
  CoursesIndexRoute,
  IndustryIndexRoute,
  InternshipsIndexRoute,
  MomentsIndexRoute,
  ApiPublicCareerEngineNotifyRoute,
  CertificatesSampleSlugRoute,
  LovableEmailSuppressionRoute,
  RArtifactTokenRoute,
  ApiPublicCronFlushAnalyticsRoute,
  ApiPublicHooksDispatchAlertsRoute,
  ApiPublicHooksDispatchCheckinsRoute,
  ApiPublicHooksNightlyBackupRoute,
  ApiPublicHooksPaymentRecoveryRoute,
  ApiPublicHooksRecoverAbandonedIntentsRoute,
  ApiPublicHooksSeoAlertsRoute,
  ApiPublicRazorpayVerifyRoute,
  ApiPublicRazorpayWebhookRoute,
  LovableEmailQueueProcessRoute,
  LovableEmailTransactionalPreviewRoute,
  LovableEmailTransactionalSendRoute,
  ApiPublicOgResultChar123idChar125DotsvgRoute
};
const routeTree = Route$2b._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportSsrError({
      message: error.message,
      stack: error.stack,
      source: "errorComponent"
    });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-app items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-h3 font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    // We manage scroll ourselves inside #app-scroll-root (see __root.tsx).
    // Letting TanStack Router also try to restore window scroll conflicts
    // with our internal scroller and can leave a fresh page landing at the
    // bottom of the previous page's position. Disable it here.
    scrollRestoration: false,
    // Preload route chunks + loaders on hover/touch intent. Combined with the
    // Speculation Rules block in __root.tsx (full prerender on high intent),
    // this gives a "pre-loaded" feel even on cold cache: by the time the user
    // clicks, the chunk is parsed and the loader has resolved.
    defaultPreload: "intent",
    defaultPreloadDelay: 50,
    // Reuse loader data for 30s after a preload, so hover-prerender (Speculation
    // Rules + TanStack preload) doesn't refetch on every cursor-over. Cuts
    // Worker + Postgres load on content nav by 3-5x without hurting freshness
    // for pages that don't change every second.
    defaultPreloadStaleTime: 3e4,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  getResult as $,
  ADDRESS as A,
  Button as B,
  COUNSELLOR_PHONE_DISPLAY as C,
  Route$1k as D,
  EXP_LEVELS as E,
  ROLES as F,
  Route$1j as G,
  EMPLOYERS as H,
  Route$1f as I,
  Route$1a as J,
  reportSsrError as K,
  LIVE_LEARNERS_LABEL as L,
  getProfile as M,
  hasResumableAttempt as N,
  startFreshAttempt as O,
  getAttemptId as P,
  ACRI_DIMENSIONS as Q,
  Route$28 as R,
  SEAT_FEE as S,
  getSessionId as T,
  startSession as U,
  trackAttemptStarted as V,
  WhatsAppLink as W,
  saveProfile as X,
  createLeadEarly as Y,
  Route$15 as Z,
  ARCHETYPES as _,
  Route$25 as a,
  useReducedMotion as a$,
  NEXT_COHORT as a0,
  computeResult as a1,
  recordAnswer as a2,
  getLeadId as a3,
  submitLead as a4,
  setCohort as a5,
  humanizeCareerEngineError as a6,
  requestDemandTrack as a7,
  Route$11 as a8,
  listResults as a9,
  CITIES_BY_SLUG as aA,
  DarkBackdrop as aB,
  Route$j as aC,
  useCareerEngineGuard as aD,
  Route$f as aE,
  getMomentAdmin as aF,
  updateMoment as aG,
  addMomentImage as aH,
  removeMomentImage as aI,
  setMomentCover as aJ,
  updateMomentImage as aK,
  isReducedMotion as aL,
  PROOF as aM,
  arzonIcon as aN,
  Sheet as aO,
  SheetContent as aP,
  SheetHeader as aQ,
  SheetTitle as aR,
  Route$1o as aS,
  Route$1g as aT,
  Route$k as aU,
  fetchTrustLedger as aV,
  COURSES as aW,
  COURSES_BY_SLUG as aX,
  COHORT_BY_ID as aY,
  thumbFor as aZ,
  Route$q as a_,
  getResultDetail as aa,
  listEmployers as ab,
  listPlacementsAdmin as ac,
  createEmployer as ad,
  createPlacement as ae,
  retractPlacement as af,
  listMomentsAdmin as ag,
  createMoment as ah,
  deleteMoment as ai,
  listLeads as aj,
  markLeadContacted as ak,
  getLeadDetail as al,
  getCareerEngineFunnel as am,
  getFunnel as an,
  getRecentEvents as ao,
  getConversionFunnel as ap,
  getExperimentLift as aq,
  getFunnelDropoff as ar,
  getWhatsAppConversion as as,
  getSsrErrors as at,
  EXPERIMENTS as au,
  Route$r as av,
  EmptyMoments as aw,
  Route$p as ax,
  Route$o as ay,
  Route$m as az,
  Route$1W as b,
  LINKS as b0,
  getAIRisk as b1,
  getSalaryBand as b2,
  getLastBatch as b3,
  getCourseMeta as b4,
  aiRiskMeta as b5,
  CATEGORIES$1 as b6,
  Route$1h as b7,
  employersForRole as b8,
  SEAT_FEE_AMOUNT as b9,
  thumbSrcSetFor as bA,
  useNavSections as bB,
  createShareCard as bC,
  PATHS$1 as bD,
  router as bE,
  SheetDescription as ba,
  RULE as bb,
  SURFACE as bc,
  adaptiveVisibleFromAssessment as bd,
  ADAPTIVE_MIN_POOL_ANSWERS as be,
  _debugScore as bf,
  isAdaptiveConfident as bg,
  captureAttribution as bh,
  buildAssessment as bi,
  getOrCreateSeed as bj,
  lockSeed as bk,
  SamplerError as bl,
  validateAssessment as bm,
  ADAPTIVE_MIN_VISIBLE as bn,
  trackQuestionViewed as bo,
  StartFreshButton as bp,
  reproducerUrl as bq,
  TARGET_TOTAL as br,
  QUOTAS as bs,
  trackQuestionAnswered as bt,
  trackAttemptSubmitted as bu,
  finalizeLead as bv,
  buttonVariants as bw,
  Route$l as bx,
  PREREG_AMOUNT_INR as by,
  PREREG_URL as bz,
  cn as c,
  COUNSELLOR_PHONE as d,
  COHORTS as e,
  Route$1K as f,
  consumeExpiredNotice as g,
  hydrateCareerEngineSnapshot as h,
  isAttemptExpired as i,
  trackCEFunnelStep as j,
  CareerShell as k,
  listPublishedMoments as l,
  ACRI_FULL as m,
  trackCECtaClicked as n,
  listDemandTracks as o,
  persistCareerEngineSnapshot as p,
  adminOverview as q,
  resetCareerEngineState as r,
  Route$1s as s,
  track as t,
  useAdminGate as u,
  recordReferralVisit as v,
  waLink as w,
  absUrl as x,
  Route$1r as y,
  ADDRESS_ONE_LINE as z
};

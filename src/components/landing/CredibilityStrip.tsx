import { Link } from "@tanstack/react-router";
import {
  Users,
  BadgeCheck,
  ShieldCheck,
  ScrollText,
  Filter,
  FileSearch,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { LEARNER_COUNT_LABEL } from "@/lib/credibility";
import { CertificateVerifyMini } from "./CertificateVerifyMini";

type Tile = {
  icon: LucideIcon;
  value: string;
  label: string;
  sub: string;
  cta: string;
  to: string;
  hash?: string;
  accent: "teal" | "gold" | "blue" | "navy" | "rust" | "violet";
};

const TILES: Tile[] = [
  {
    icon: Users,
    value: LEARNER_COUNT_LABEL,
    label: "Learners trained",
    sub: "Across India since 2024",
    cta: "How we count",
    to: "/credibility",
    accent: "teal",
  },
  {
    icon: BadgeCheck,
    value: "ISO · MSME · MCA",
    label: "Registered & accredited",
    sub: "ISO 9001 certified, MSME UDYAM, MCA-incorporated.",
    cta: "See registration IDs",
    to: "/credibility",
    hash: "registrations",
    accent: "navy",
  },
  {
    icon: ShieldCheck,
    value: "Verifiable certificate",
    label: "Public verifier",
    sub: "Anyone can audit any Arzon certificate by ID, no login.",
    cta: "Try the verifier",
    to: "/verify",
    accent: "blue",
  },
  {
    icon: ScrollText,
    value: "Public trust ledger",
    label: "Refunds & complaints",
    sub: "Every refund issued and complaint received, on the record.",
    cta: "Read the ledger",
    to: "/trust-report",
    accent: "gold",
  },
  {
    icon: Filter,
    value: "36% accept rate",
    label: "Selectivity, not volume",
    sub: "Industry edtechs accept ~92%. We turn away ~64% on purpose.",
    cta: "See selectivity data",
    to: "/credibility",
    hash: "selectivity",
    accent: "rust",
  },
  {
    icon: FileSearch,
    value: "Syllabus from real JDs",
    label: "JD Mirror",
    sub: "100–200 live Indian JDs per role, mapped line-by-line to modules.",
    cta: "Open the JD Mirror",
    to: "/jd-mirror",
    accent: "violet",
  },
];

const ACCENT_BG: Record<Tile["accent"], string> = {
  teal: "bg-[color:var(--teal-soft)] text-[color:var(--teal-deep)] ring-[color:var(--teal-deep)]/15",
  gold: "bg-gold-soft text-warning ring-amber-700/20",
  blue: "bg-sky-100 text-sky-800 ring-sky-700/20", // @allow-raw-palette professional blue trust accent
  navy: "bg-sky-100 text-sky-900 ring-sky-700/20",
  rust: "bg-orange-100 text-orange-800 ring-orange-700/20",
  violet: "bg-violet-100 text-violet-800 ring-violet-700/20",
};

/**
 * Home-page Trust Grid — every tile links to a surface a student can audit.
 * Replaces the older 3-card credibility brag wall. Stops trust feeling like
 * marketing copy and starts it acting like a table of contents.
 */
export function CredibilityStrip() {
  return (
    <Section id="proof-strip" size="md">
      <SectionHeader
        eyebrow="Proof · why trust this"
        title={
          <>
            Everything below is <span className="italic-accent">independently verifiable.</span>
          </>
        }
        sub={
          <>
            We don't ask you to take our word. Every tile here links to the registration, ledger or
            verifier behind the claim, exactly what a recruiter or your parent would want to see.
          </>
        }
      />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:gap-3.5 md:mt-7 md:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <Link
            key={t.label}
            to={t.to}
            hash={t.hash}
            preload="intent"
            className="group relative flex flex-col overflow-hidden rounded-2xl card-light card-interactive card-hairline-gradient p-3.5 sm:p-4"
            aria-label={`${t.label} — ${t.cta}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-inset shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform duration-300 group-hover:scale-[1.05] ${ACCENT_BG[t.accent]}`}
              >
                <t.icon className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 translate-y-0.5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0 group-hover:text-[color:var(--teal-deep)]" />
            </div>
            <p className="mt-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-eyebrow">
              {t.label}
            </p>
            <p className="mt-0.5 font-grotesk text-base font-bold leading-tight text-ink sm:text-lg">
              {t.value}
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">{t.sub}</p>
            <p className="mt-2.5 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--teal-deep)]">
              {t.cta} <ArrowUpRight className="h-2.5 w-2.5" />
            </p>
          </Link>
        ))}
      </div>

      {/* Live mini-verifier — students experience verifiability, not just read about it */}
      <div className="mt-5">
        <CertificateVerifyMini />
      </div>
    </Section>
  );
}

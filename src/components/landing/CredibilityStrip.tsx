import { Link } from "@tanstack/react-router";
import {
  Users,
  BadgeCheck,
  ShieldCheck,
  ScrollText,
  Filter,
  FileSearch,
  ArrowUpRight,
  ArrowRight,
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
  teal: "bg-[#0a0c10] text-teal-400 ring-teal-400/20 shadow-[inset_0_0_15px_rgba(45,212,191,0.15)]",
  gold: "bg-[#0a0c10] text-brand-gold ring-brand-gold/20 shadow-[inset_0_0_15px_rgba(212,183,106,0.15)]",
  blue: "bg-[#0a0c10] text-sky-400 ring-sky-400/20 shadow-[inset_0_0_15px_rgba(56,189,248,0.15)]",
  navy: "bg-[#0a0c10] text-indigo-400 ring-indigo-400/20 shadow-[inset_0_0_15px_rgba(129,140,248,0.15)]",
  rust: "bg-[#0a0c10] text-orange-400 ring-orange-400/20 shadow-[inset_0_0_15px_rgba(251,146,60,0.15)]",
  violet: "bg-[#0a0c10] text-violet-400 ring-violet-400/20 shadow-[inset_0_0_15px_rgba(167,139,250,0.15)]",
};

/**
 * Home-page Trust Grid — every tile links to a surface a student can audit.
 * Replaces the older 3-card credibility brag wall. Stops trust feeling like
 * marketing copy and starts it acting like a table of contents.
 */
export function CredibilityStrip() {
  return (
    <Section id="proof-strip" size="md" className="tone-dark bg-[#0a0c10] py-16">
      <SectionHeader
        tone="dark"
        eyebrow="Proof · why trust this"
        title={
          <span className="text-white">
            Everything below is <span className="italic-accent">independently verifiable.</span>
          </span>
        }
        sub={
          <span className="text-white/70">
            We don't ask you to take our word. Every tile here links to the registration, ledger or
            verifier behind the claim, exactly what a recruiter or your parent would want to see.
          </span>
        }
      />

      <div className="mt-7 grid grid-cols-1 gap-4 sm:gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => (
          <Link
            key={t.label}
            to={t.to}
            hash={t.hash}
            preload="intent"
            className="group relative flex flex-col overflow-hidden rounded-[1.25rem] glass-panel-deep p-5 hover-glass-glow transition-all duration-300"
            aria-label={`${t.label} — ${t.cta}`}
          >
            <div className="flex items-start justify-between gap-3 relative z-10">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-inset transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${ACCENT_BG[t.accent]}`}
              >
                <t.icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 translate-y-0.5 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-gold" />
            </div>
            
            <div className="mt-5 relative z-10">
               <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-glow">
                 {t.label}
               </p>
               <p className="mt-1 font-display text-xl font-bold leading-tight text-white">
                 {t.value}
               </p>
               <p className="mt-2 text-sm leading-relaxed text-white/60">{t.sub}</p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
               <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 group-hover:text-brand-gold transition-colors">
                 {t.cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
               </p>
            </div>
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

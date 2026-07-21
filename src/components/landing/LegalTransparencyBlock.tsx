import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { Link } from "@tanstack/react-router";
import { Landmark, ShieldCheck, Building2, ArrowRight } from "lucide-react";
import legalImg from "@/assets/proof/legal-certs.webp";

/**
 * Image #4, three legal certificates side-by-side.
 * Slot: inside Proof, right after the dual certificate showcase.
 */
const items = [
  {
    icon: Landmark,
    title: "Government Compliant",
    body: "Registered firm with the Govt of Telangana. Registrar of Firms, Medchal-Malkajgiri.",
    hash: "mca",
  },
  {
    icon: ShieldCheck,
    title: "ISO 9001:2015 Certified",
    body: "Independent third-party audit of training & internship delivery quality systems.",
    hash: "iso",
  },
  {
    icon: Building2,
    title: "MSME Verified",
    body: "Officially registered under the MSME Udyam scheme · Govt of India.",
    hash: "msme",
  },
];

export function LegalTransparencyBlock() {
  return (
    <Section id="legal" size="lg">
      <SectionHeader
        align="center"
        eyebrow="Safe · Legal · Fully Transparent"
        title={
          <>
            You deserve a platform that is{" "}
            <em className="italic-accent not-italic">safe, legal, and fully transparent.</em>
          </>
        }
        sub="Three independent registrations you can verify yourself, not a logo wall, the actual documents."
      />

      {/* Hero proof, full image on desktop, scrollable on small screens */}
      <figure className="mt-10 overflow-hidden rounded-2xl border border-slate-200/10 bg-white/[0.03] ring-1 ring-white/5">
        <img
          src={legalImg}
          alt="Three legal certificates: state firm registration, ISO 9001:2015, and MSME Udyam registration for Arzon Global Labs"
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </figure>

      {/* Mobile: snap-scroll · Desktop: 3-up */}
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, body, hash }) => (
          <li key={title}>
            <Link
              to="/proof"
              hash={hash}
              className="group flex h-full flex-col rounded-2xl border border-slate-200/10 bg-white/[0.03] p-5 transition hover:border-slate-200/25 hover:bg-white/[0.06]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary-glow ring-1 ring-primary/30">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-base font-semibold text-slate-50">{title}</p>
              <p className="mt-1.5 text-sm text-slate-100/65">{body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-glow">
                Verify <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

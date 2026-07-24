import { Link } from "@tanstack/react-router";
import arzonIcon from "@/assets/arzon-icon.webp";
import {
  Mail,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Building2,
  ArrowRight,
  MessageCircle,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  Heart,
} from "lucide-react";
import { LINKS, ADDRESS } from "./constants";
import { MotionToggle } from "./MotionToggle";
import { COURSES } from "@/data/courses";
import { SISTER_BRANDS } from "@/lib/credibility";
import { CounsellorLeadForm } from "./CounsellorLeadForm";
import { trackEvent } from "@/lib/analytics";
import { TaskLogo } from "@/components/common/TaskLogo";

const ALL_PROGRAMME_LINKS = COURSES.map((c) => ({ slug: c.slug, title: c.title }));

// Footer-scoped palette — unified with the site-wide navy / teal blue
// palette (no more gold island that breaks the gradient story).
// ACCENT = sky-300-ish teal that already appears in Hero / FinalCTA.
const ACCENT = "#8EC5FF";
const ACCENT_STRONG = "#0056D2";
// Keep `GOLD` as an alias so existing references in this file (icons,
// brand badges, etc.) now render in the unified teal accent.
const GOLD = ACCENT;

// Shared focus-visible ring for every interactive element in the footer.
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised rounded-sm";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-labelledby="footer-heading"
      className="tone-dark relative bg-surface-dark px-3 pb-3 pt-0 sm:px-5 sm:pb-5"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* Top Next-step strip — navy band with teal accent */}
      <div className="tone-light relative mx-auto mb-0 max-w-7xl overflow-hidden border border-edge border-b-0 bg-white px-6 py-6 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 h-px bg-gradient-to-r from-transparent via-cta-blue/50 to-transparent"
        />
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="text-primary">
            <p className="font-sans text-h4 font-bold leading-tight sm:text-h3">
              Not sure which programme fits?
            </p>
            <p className="mt-1 text-sm text-navy-elevated">
              {" "}
              {/* @allow-copy-tell — semantic token name, not marketing copy */}
              Browse cohorts or talk to a counsellor, no payment required.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
            <Link
              to="/courses"
              aria-label="Browse all programmes"
              onClick={() =>
                trackEvent("footer_cta_click", {
                  surface: "footer",
                  target: "courses",
                  label: "Browse programmes",
                })
              }
              className={`inline-flex h-11 items-center justify-center rounded-md bg-cta-blue px-6 text-caption font-bold text-slate-50 transition-colors hover:bg-cta-blue-hover ${focusRing}`}
            >
              Browse programmes{" "}
              <ArrowRight aria-hidden="true" focusable="false" className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              aria-label="Talk to a counsellor"
              onClick={() =>
                trackEvent("footer_cta_click", {
                  surface: "footer",
                  target: "contact",
                  label: "Talk to counsellor",
                })
              }
              className={`inline-flex h-11 items-center justify-center rounded-md border border-cta-blue/35 bg-cta-blue-soft px-5 text-caption font-bold text-cta-blue transition-colors hover:border-cta-blue hover:bg-cta-blue-wash ${focusRing}`}
            >
              <MessageCircle aria-hidden="true" focusable="false" className="mr-2 h-4 w-4" /> Talk
              to counsellor
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid: brand (4) + nav columns (8) */}
      <div
        className="mx-auto grid max-w-7xl grid-cols-1 border bg-surface-raised md:grid-cols-12"
        style={{ borderColor: "rgba(255,255,255,0.10)" }}
      >
        {/* Brand section */}
        <div
          className="border-b p-8 md:col-span-4 md:border-b-0 md:border-r"
          style={{ borderBottomColor: "rgba(255,255,255,0.10)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-[#0a0c10] ring-1 ring-white/10">
              <img
                src={arzonIcon}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-none">
              <p className="font-mono text-body-sm font-bold tracking-[0.28em] text-slate-50">
                ARZON
              </p>
              <p className="mt-1 font-mono text-micro tracking-[0.42em]" style={{ color: GOLD }}>
                CAREERS
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-50">
            India's workforce-readiness platform across engineering, healthcare, agriculture,
            business and tech. ISO 9001 certified, MSME and MCA registered.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span
              aria-label="TASK · Telangana Academy for Skill and Knowledge — recognised training provider"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-200/15 bg-slate-50/3 px-3 py-2 font-mono text-micro font-bold uppercase tracking-[0.12em]"
              style={{ color: "#F8FAFC" }}
            >
              <TaskLogo size="sm" /> TASK-recognised
            </span>
            {[
              {
                icon: BadgeCheck,
                label: "ISO 9001",
                to: "/proof",
                hash: "iso",
                dot: "bg-accent-glow",
              },
              { icon: Building2, label: "MSME", to: "/proof", hash: "msme", dot: "bg-accent-glow" },
              { icon: ShieldCheck, label: "MCA", to: "/proof", hash: "mca", dot: "bg-accent-glow" },
              {
                icon: ShieldCheck,
                label: "Razorpay · PCI-DSS",
                to: "/proof",
                hash: "razorpay",
                dot: "bg-accent-glow",
              },
              {
                icon: Heart,
                label: "Made in Hyderabad with love",
                to: "/",
                hash: "",
                dot: "bg-rose-500",
              },
            ].map(({ icon: Icon, label, to, hash, dot }) => (
              <Link
                key={label}
                to={to}
                hash={hash}
                aria-label={`Verify ${label} registration`}
                className={`inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-200/15 bg-slate-50/3 px-3 py-2 font-mono text-micro font-bold uppercase tracking-[0.12em] transition hover:border-slate-200/25 hover:bg-slate-50/6 ${focusRing}`}
                style={{ color: "#F8FAFC" }}
              >
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                <Icon
                  aria-hidden="true"
                  focusable="false"
                  className="h-3 w-3"
                  style={{ color: GOLD }}
                />{" "}
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <p
              className="font-mono text-micro font-bold uppercase tracking-[0.22em]"
              style={{ color: "#F8FAFC" }}
            >
              Find us
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                {
                  icon: Globe,
                  label: "arzoncareers.in",
                  href: LINKS.website,
                  title: "Visit arzoncareers.in",
                },
                {
                  icon: Instagram,
                  label: "@arzon.global",
                  href: LINKS.instagram,
                  title: "Arzon Global on Instagram",
                },
                {
                  icon: Youtube,
                  label: "ETV feature",
                  href: LINKS.mediaETV.watch,
                  title: "Watch ETV Telangana feature on YouTube",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: LINKS.linkedin,
                  title: "Arzon Global on LinkedIn",
                },
              ].map(({ icon: Icon, label, href, title }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} (opens in new tab)`}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-200/15 bg-slate-50/3 px-4 py-2 text-caption font-semibold transition hover:border-slate-200/25 hover:bg-slate-50/6 ${focusRing}`}
                  style={{ color: "#F8FAFC" }}
                >
                  <Icon
                    aria-hidden="true"
                    focusable="false"
                    className="h-3 w-3"
                    style={{ color: GOLD }}
                  />{" "}
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation block: 3 columns + tucked SEO list */}
        <div className="flex flex-col md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {/* Programmes */}
            <nav
              aria-labelledby="footer-programmes-heading"
              className="border-b border-slate-200/10 p-8 sm:border-b-0 sm:border-r"
            >
              <h2
                id="footer-programmes-heading"
                className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-slate-50"
              >
                Programmes
              </h2>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <span
                    className="block font-mono text-micro font-bold uppercase tracking-[0.22em]"
                    style={{ color: GOLD }}
                  >
                    Flagship
                  </span>
                  <Link
                    to="/courses/$slug"
                    params={{ slug: "pharmacovigilance" }}
                    className={`mt-1 inline-block text-sm font-medium text-slate-50 transition-colors hover:opacity-80 ${focusRing}`}
                  >
                    Pharmacovigilance
                  </Link>
                </li>
                <li>
                  <FootLink to="/courses/medical-coding">Medical Coding</FootLink>
                </li>
                <li>
                  <FootLink to="/courses/clinical-data-management">
                    Clinical Data Management
                  </FootLink>
                </li>
                <li>
                  <FootLink to="/courses/regulatory-affairs">Regulatory Affairs</FootLink>
                </li>
                <li>
                  <FootLink to="/courses/ai-intelligence">AI in Healthcare</FootLink>
                </li>
                <li>
                  <Link
                    to="/courses"
                    aria-label="View all 25 programmes"
                    className={`inline-flex items-center gap-1 text-xs font-semibold underline decoration-1 underline-offset-4 ${focusRing}`}
                    style={{ color: GOLD }}
                  >
                    View all 25 programmes{" "}
                    <ArrowRight aria-hidden="true" focusable="false" className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Company */}
            <nav
              aria-labelledby="footer-company-heading"
              className="border-b border-slate-200/10 p-8 sm:border-b-0 sm:border-r"
            >
              <h2
                id="footer-company-heading"
                className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-slate-50"
              >
                Company
              </h2>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <FootLink to="/about">About Arzon</FootLink>
                </li>
                <li>
                  <FootLink to="/deployment-model">Deployment model</FootLink>
                </li>
                <li>
                  <FootLink to="/proof">Proof of impact</FootLink>
                </li>
                <li>
                  <FootLink to="/moments">Arzon moments</FootLink>
                </li>
                <li>
                  <FootLink to="/credibility">Why trust us</FootLink>
                </li>
                <li>
                  <FootLink to="/trust-report">Trust ledger</FootLink>
                </li>
                <li>
                  <FootLink to="/industry">Industry intel</FootLink>
                </li>
                <li>
                  <FootLink to="/cohorts">Upcoming cohorts</FootLink>
                </li>
                <li>
                  <FootLink to="/verify">Verify certificate</FootLink>
                </li>
                <li>
                  <FootLink to="/contact">Contact</FootLink>
                </li>
                <li className="pt-2">
                  <span
                    className="block font-mono text-micro font-bold uppercase tracking-[0.22em]"
                    style={{ color: GOLD }}
                  >
                    For partners
                  </span>
                </li>
                <li>
                  <FootLink to="/recruiters">For recruiters</FootLink>
                </li>
                <li>
                  <FootLink to="/tpos">For TPOs / colleges</FootLink>
                </li>
                <li>
                  <FootLink to="/acri">ACRI methodology</FootLink>
                </li>
              </ul>
            </nav>

            {/* Get started + contact */}
            <nav aria-labelledby="footer-getstarted-heading" className="bg-white/[0.02] p-8">
              <h2
                id="footer-lead-heading"
                className="font-mono text-micro font-bold uppercase tracking-[0.22em]"
                style={{ color: "#F8FAFC" }}
              >
                Talk to a counsellor
              </h2>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: "#CBD5E1" }}>
                Leave your details, we'll call you back within 24 hours.
              </p>
              <div className="mt-4">
                <CounsellorLeadForm />
              </div>

              <h2
                id="footer-getstarted-heading"
                className="mt-8 font-mono text-micro font-bold uppercase tracking-[0.22em]"
                style={{ color: "#F8FAFC" }}
              >
                Get started
              </h2>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <FootLink to="/apply" data-apply-surface="footer">
                    Start application
                  </FootLink>
                </li>
                <li>
                  <FootLink to="/dashboard">Dashboard</FootLink>
                </li>
                <li>
                  <FootLink to="/refund">Cancellation policy</FootLink>
                </li>
                <li>
                  <FootLink to="/legal/terms">Terms</FootLink>
                </li>
                <li>
                  <FootLink to="/legal/privacy">Privacy</FootLink>
                </li>
              </ul>

              <div className="mt-8 space-y-3 border-t border-slate-200/10 pt-5">
                <div className="flex items-start gap-3">
                  <Mail
                    aria-hidden="true"
                    focusable="false"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: GOLD }}
                  />
                  <a
                    href="mailto:info@arzonglobal.com"
                    aria-label="Email info@arzonglobal.com"
                    className={`text-sm font-medium text-slate-50 break-all hover:opacity-80 ${focusRing}`}
                  >
                    info@arzonglobal.com
                  </a>
                </div>
                <a
                  href={ADDRESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open office address in Google Maps (opens in new tab)"
                  className={`flex items-start gap-3 text-xs leading-relaxed text-slate-100/80 hover:text-slate-50 ${focusRing}`}
                >
                  <MapPin
                    aria-hidden="true"
                    focusable="false"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: GOLD }}
                  />
                  <span>
                    {ADDRESS.company}
                    <br />
                    {ADDRESS.street}, {ADDRESS.area},<br />
                    {ADDRESS.locality}, {ADDRESS.city},<br />
                    {ADDRESS.region} {ADDRESS.postalCode}, {ADDRESS.country}
                  </span>
                </a>
              </div>
            </nav>
          </div>

          {/* Tucked SEO crawl strip */}
          <nav
            aria-label="All programmes"
            className="border-t border-slate-200/10 bg-surface-dim p-6"
          >
            <ul
              role="list"
              className="flex flex-wrap gap-x-2 gap-y-1 text-micro uppercase leading-snug tracking-[0.12em] text-slate-100/55"
            >
              {ALL_PROGRAMME_LINKS.map((l, i) => (
                <li key={l.slug} className="inline">
                  <a href={`/courses/${l.slug}`} className={`hover:text-slate-50 ${focusRing}`}>
                    {l.title}
                  </a>
                  {i < ALL_PROGRAMME_LINKS.length - 1 ? <span aria-hidden="true"> • </span> : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Sister-brand row + bottom legal */}
      <div className="mx-auto max-w-7xl border border-t-0 border-slate-200/10 bg-surface-dim p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-3">
            <p className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-slate-100/75">
              Part of the Arzon group
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {SISTER_BRANDS.map((b) => (
                <a
                  key={b.host}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${b.name}, ${b.desc} (opens in new tab)`}
                  className={`group flex items-start gap-3 rounded-md border border-slate-200/15 bg-white/[0.03] p-3 transition hover:border-slate-200/30 hover:bg-white/[0.06] ${focusRing}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-white font-mono text-micro font-bold tracking-[0.16em] text-ink">
                    {b.code}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-meta font-semibold text-slate-50">
                      {b.name}{" "}
                      <span aria-hidden="true" style={{ color: GOLD }}>
                        ↗
                      </span>
                    </p>
                    <p className="mt-0.5 text-micro leading-snug text-slate-100/80">{b.desc}</p>
                    <p
                      className="mt-1 font-mono text-micro uppercase tracking-[0.16em]"
                      style={{ color: GOLD }}
                    >
                      {b.host}
                    </p>
                  </div>
                </a>
              ))}
              <div
                className="flex items-start gap-3 rounded-md border p-3"
                style={{ borderColor: `${GOLD}55`, backgroundColor: `${GOLD}12` }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded font-mono text-micro font-bold tracking-[0.16em]"
                  style={{ backgroundColor: `${GOLD}33`, color: GOLD }}
                >
                  AC
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-meta font-semibold text-slate-50">Arzon Careers</p>
                  <p className="mt-0.5 text-micro leading-snug text-slate-100/80">
                    Workforce-readiness arm, you are here.
                  </p>
                  <p
                    className="mt-1 font-mono text-micro uppercase tracking-[0.16em]"
                    style={{ color: GOLD }}
                  >
                    arzoncareers.in
                  </p>
                  <Link
                    to="/credibility"
                    aria-label="Why choose Arzon Careers"
                    className={`mt-1.5 inline-flex items-center gap-1 text-micro font-semibold ${focusRing}`}
                    style={{ color: GOLD }}
                  >
                    Why us <ArrowRight aria-hidden="true" focusable="false" className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          data-fab-avoid
          className="mt-8 rounded-md border border-slate-200/15 bg-white/[0.03] p-4 text-micro leading-relaxed text-slate-100/85"
        >
          <p className="font-mono text-micro font-bold uppercase tracking-[0.2em] text-slate-100/85">
            Disclaimer · ASCI compliant
          </p>
          <p className="mt-1.5">
            Outcomes vary. Arzon Global does not guarantee employment. The first cohort completes in
            November 2026; verified placement figures will be published from December 2026 onwards.
            Until then, see{" "}
            <Link to="/proof" className={`underline ${focusRing}`} style={{ color: GOLD }}>
              /proof
            </Link>{" "}
            for the live evidence vault and{" "}
            <Link to="/refund" className={`underline ${focusRing}`} style={{ color: GOLD }}>
              cancellation policy
            </Link>
            .
          </p>
        </div>

        {/* Bottom meta */}
        <div className="mt-6 flex flex-col items-start gap-3 border-t border-slate-200/10 pt-5 text-micro text-slate-100/75 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} Arzon Global Pvt Ltd · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              aria-label="Admin sign in"
              className={`font-mono text-micro uppercase tracking-[0.18em] text-slate-100/60 hover:text-slate-50 ${focusRing}`}
            >
              Admin
            </Link>
            <MotionToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FootLink({
  to,
  children,
  ...rest
}: { to: string; children: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      to={to as never}
      className={`text-sm text-slate-100/90 transition-colors hover:text-slate-50 ${focusRing}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

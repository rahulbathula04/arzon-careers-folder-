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

const ACCENT = "#38BDF8";
const GOLD = ACCENT;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded-sm";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-labelledby="footer-heading"
      className="tone-dark relative bg-[#0B0F19] text-white px-3 pb-3 pt-0 sm:px-5 sm:pb-5"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* Top Next-step strip */}
      <div className="relative mx-auto mb-0 max-w-7xl overflow-hidden border border-white/10 bg-[#121723] px-6 py-6 sm:px-8 rounded-t-2xl shadow-2xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-bold text-lg sm:text-xl text-white">
              Not sure which programme fits?
            </p>
            <p className="mt-1 text-sm text-slate-300">
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
              className={`inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-6 text-sm font-bold text-white shadow-lg transition-colors ${focusRing}`}
            >
              Browse programmes{" "}
              <ArrowRight
                aria-hidden="true"
                focusable="false"
                className="ml-1.5 h-4 w-4 text-white"
              />
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
              className={`inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 px-5 text-sm font-bold text-white transition-colors ${focusRing}`}
            >
              <MessageCircle
                aria-hidden="true"
                focusable="false"
                className="mr-2 h-4 w-4 text-blue-400"
              />{" "}
              Talk to counsellor
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 border border-white/10 bg-[#0B0F19] text-white md:grid-cols-12 rounded-b-2xl shadow-2xl">
        {/* Brand section */}
        <div className="border-b border-white/10 p-8 md:col-span-4 md:border-b-0 md:border-r">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 border border-white/10">
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
              <p className="font-mono text-sm font-bold tracking-widest text-white">ARZON</p>
              <p className="mt-1 font-mono text-xs font-bold tracking-widest text-sky-400">
                CAREERS
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-300">
            India's workforce-readiness platform across engineering, healthcare, agriculture,
            business and tech. ISO 9001 certified, MSME and MCA registered.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white">
              <TaskLogo size="sm" /> TASK-recognised
            </span>
            {[
              {
                icon: BadgeCheck,
                label: "ISO 9001",
                to: "/proof",
                hash: "iso",
                dot: "bg-emerald-400",
              },
              { icon: Building2, label: "MSME", to: "/proof", hash: "msme", dot: "bg-emerald-400" },
              { icon: ShieldCheck, label: "MCA", to: "/proof", hash: "mca", dot: "bg-emerald-400" },
              {
                icon: ShieldCheck,
                label: "Razorpay · PCI-DSS",
                to: "/proof",
                hash: "razorpay",
                dot: "bg-blue-400",
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
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10 ${focusRing}`}
              >
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />
                <Icon
                  aria-hidden="true"
                  focusable="false"
                  className="h-3.5 w-3.5 text-sky-400"
                />{" "}
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
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
                  className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10 ${focusRing}`}
                >
                  <Icon aria-hidden="true" focusable="false" className="h-3.5 w-3.5 text-sky-400" />{" "}
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation block */}
        <div className="flex flex-col md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {/* Programmes */}
            <nav
              aria-labelledby="footer-programmes-heading"
              className="border-b border-white/10 p-8 sm:border-b-0 sm:border-r"
            >
              <h2
                id="footer-programmes-heading"
                className="font-mono text-xs font-bold uppercase tracking-wider text-white"
              >
                Programmes
              </h2>
              <ul role="list" className="mt-6 space-y-3.5">
                <li>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    Flagship
                  </span>
                  <Link
                    to="/courses/$slug"
                    params={{ slug: "pharmacovigilance" }}
                    className={`mt-0.5 inline-block text-sm font-bold text-white hover:text-sky-300 transition-colors ${focusRing}`}
                    style={{ color: "#FFFFFF" }}
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
                    className={`inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 underline decoration-1 underline-offset-4 ${focusRing}`}
                  >
                    View all 25 programmes{" "}
                    <ArrowRight
                      aria-hidden="true"
                      focusable="false"
                      className="h-3 w-3 text-sky-400"
                    />
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Company */}
            <nav
              aria-labelledby="footer-company-heading"
              className="border-b border-white/10 p-8 sm:border-b-0 sm:border-r"
            >
              <h2
                id="footer-company-heading"
                className="font-mono text-xs font-bold uppercase tracking-wider text-white"
              >
                Company
              </h2>
              <ul role="list" className="mt-6 space-y-3.5">
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
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">
                    For Partners
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
            <nav aria-labelledby="footer-getstarted-heading" className="bg-white/5 p-8">
              <h2
                id="footer-lead-heading"
                className="font-mono text-xs font-bold uppercase tracking-wider text-white"
              >
                Talk to a counsellor
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Leave your details, we'll call you back within 24 hours.
              </p>
              <div className="mt-4">
                <CounsellorLeadForm />
              </div>

              <h2
                id="footer-getstarted-heading"
                className="mt-8 font-mono text-xs font-bold uppercase tracking-wider text-white"
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

              <div className="mt-8 space-y-3 border-t border-white/10 pt-5">
                <div className="flex items-start gap-3">
                  <Mail
                    aria-hidden="true"
                    focusable="false"
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
                  />
                  <a
                    href="mailto:info@arzonglobal.com"
                    aria-label="Email info@arzonglobal.com"
                    className={`text-xs font-bold text-white break-all hover:text-sky-300 ${focusRing}`}
                    style={{ color: "#FFFFFF" }}
                  >
                    info@arzonglobal.com
                  </a>
                </div>
                <a
                  href={ADDRESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open office address in Google Maps (opens in new tab)"
                  className={`flex items-start gap-3 text-xs leading-relaxed text-slate-300 hover:text-white ${focusRing}`}
                >
                  <MapPin
                    aria-hidden="true"
                    focusable="false"
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky-400"
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
          <nav aria-label="All programmes" className="border-t border-white/10 bg-[#0B0F19] p-6">
            <ul
              role="list"
              className="flex flex-wrap gap-x-2 gap-y-1 text-xs uppercase leading-snug tracking-wider text-slate-400 font-mono font-semibold"
            >
              {ALL_PROGRAMME_LINKS.map((l, i) => (
                <li key={l.slug} className="inline">
                  <a href={`/courses/${l.slug}`} className={`hover:text-white ${focusRing}`}>
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
      <div className="mx-auto max-w-7xl border border-t-0 border-white/10 bg-[#0B0F19] p-8 rounded-b-2xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
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
                  className={`group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10 ${focusRing}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white font-mono text-xs font-bold tracking-wider text-slate-900">
                    {b.code}
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-bold text-white">
                      {b.name}{" "}
                      <span aria-hidden="true" className="text-sky-400">
                        ↗
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-slate-300 leading-snug">{b.desc}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-sky-400 font-bold">
                      {b.host}
                    </p>
                  </div>
                </a>
              ))}
              <div className="flex items-start gap-3 rounded-xl border border-sky-400/30 bg-sky-500/10 p-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 font-mono text-xs font-bold tracking-wider text-sky-300 border border-sky-400/30">
                  AC
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold text-white">Arzon Careers</p>
                  <p className="mt-0.5 text-xs text-slate-300 leading-snug">
                    Workforce-readiness arm, you are here.
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-sky-400 font-bold">
                    arzoncareers.in
                  </p>
                  <Link
                    to="/credibility"
                    aria-label="Why choose Arzon Careers"
                    className={`mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 ${focusRing}`}
                  >
                    Why us{" "}
                    <ArrowRight
                      aria-hidden="true"
                      focusable="false"
                      className="h-3 w-3 text-sky-400"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          data-fab-avoid
          className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-300"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Disclaimer · ASCI compliant
          </p>
          <p className="mt-1.5">
            Outcomes vary. Arzon Global does not guarantee employment. The first cohort completes in
            November 2026; verified placement figures will be published from December 2026 onwards.
            Until then, see{" "}
            <Link to="/proof" className={`underline text-sky-400 ${focusRing}`}>
              /proof
            </Link>{" "}
            for the live evidence vault and{" "}
            <Link to="/refund" className={`underline text-sky-400 ${focusRing}`}>
              cancellation policy
            </Link>
            .
          </p>
        </div>

        {/* Bottom meta */}
        <div className="mt-6 flex flex-col items-start gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between font-mono">
          <p className="uppercase tracking-wider">
            © {new Date().getFullYear()} Arzon Global Pvt Ltd · All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              aria-label="Admin sign in"
              className={`font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white ${focusRing}`}
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
      className={`text-sm font-semibold text-white hover:text-sky-300 transition-colors ${focusRing}`}
      style={{ color: "#FFFFFF" }}
      {...rest}
    >
      {children}
    </Link>
  );
}

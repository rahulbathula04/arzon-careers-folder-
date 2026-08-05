import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Landmark,
  Tv,
  MessageCircle,
  ExternalLink,
  Award,
  Sparkles,
  Building2,
  CheckCircle2,
  Globe,
} from "lucide-react";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { LINKS, COUNSELLOR_PHONE } from "./constants";
import { trackEvent } from "@/lib/analytics";
import {
  HSBC_PARTNER_SINCE,
  JPMORGAN_PARTNER_SINCE,
  HSBC_SALARY_RANGE,
  JPMORGAN_SALARY_RANGE,
  AIML_COHORT_CAP,
} from "./constants";

export function TaskPartnershipBlock() {
  const ref = useRef<HTMLElement | null>(null);
  const ctaLabel = "Apply for the HSBC AI/ML Cohort";

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
    const el = ref.current;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            trackEvent("task_block_impression", { surface: "home" });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const partnerStats = [
    { label: "HSBC · Recruitment Partner", value: `Certified ${HSBC_PARTNER_SINCE}`, accent: "red" },
    { label: "JPMorgan Chase · Recruitment Partner", value: `Certified ${JPMORGAN_PARTNER_SINCE}`, accent: "blue" },
    { label: "HSBC AI/ML Fresher Salary", value: HSBC_SALARY_RANGE },
    { label: "JPMorgan Fresher Salary", value: JPMORGAN_SALARY_RANGE },
    { label: "Cohort Seats (Capped)", value: `${AIML_COHORT_CAP} · August 2026` },
    { label: "Hiring Cities · Pan India", value: "Bengaluru · Hyd · Pune · 4 more" },
  ];

  type Proof = {
    key: string;
    label: string;
    sub: string;
    href: string;
    external?: boolean;
    Icon: typeof ShieldCheck;
    accent?: "red" | "blue" | "default";
  };

  const proofs: Proof[] = [
    {
      key: "hsbc",
      label: "HSBC Holdings",
      sub: "Recruitment Partner · July 2026",
      href: "/credibility",
      Icon: Building2,
      accent: "red",
    },
    {
      key: "jpmorgan",
      label: "JPMorgan Chase",
      sub: "Recruitment Partner · July 2026",
      href: "/credibility",
      Icon: Building2,
      accent: "blue",
    },
    {
      key: "iso",
      label: "ISO 9001:2015",
      sub: "Verify certificate",
      href: "/verify",
      Icon: ShieldCheck,
    },
    {
      key: "msme",
      label: "MSME · Udyam",
      sub: "Govt registration",
      href: "/about#legal",
      Icon: BadgeCheck,
    },
    {
      key: "task",
      label: "TASK · Telangana",
      sub: "Govt recognition",
      href: "/about#legal",
      Icon: Landmark,
    },
    {
      key: "etv",
      label: LINKS.mediaETV.outlet,
      sub: "Media coverage",
      href: LINKS.mediaETV.watch,
      external: true,
      Icon: Tv,
    },
  ];

  return (
    <section
      ref={ref}
      id="launch-event"
      className="editorial-page-bg border-y border-slate-200 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* ── Header ── */}
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-mono font-bold text-red-800 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-red-600" />
            <span>CERTIFIED RECRUITMENT PARTNER · HSBC &amp; JPMORGAN CHASE · JULY 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight leading-tight">
            The only edtech in Telangana{" "}
            <span className="italic text-[#CC0000]">certified by both HSBC &amp; JPMorgan.</span>
          </h2>

          <p className="text-sm text-[#5B6472] leading-relaxed max-w-2xl font-medium">
            Arzon Global holds official Recruitment Partnership Certificates from HSBC Holdings
            (62 countries) and JPMorgan Chase &amp; Co. (100+ countries) — signed, framed, and
            effective July 2026. Our graduates go directly into their hiring pipelines.
          </p>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Dark Slate Partnership Command Vault */}
          <div className="tone-dark surface-island-dark lg:col-span-6 flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0B132B] p-6 sm:p-8 shadow-2xl text-white space-y-6">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  Official Partnership Hub
                </span>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>

              {/* HSBC + JPMorgan hero badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-red-900/60 bg-red-950/30 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-red-400" />
                    </div>
                    <span className="text-xs font-bold text-red-300 uppercase tracking-wider">HSBC</span>
                  </div>
                  <p className="text-[10px] text-red-400 font-mono uppercase tracking-wider">62 Countries</p>
                  <p className="text-xs font-bold text-white">Recruitment Partner</p>
                  <p className="text-[10px] text-slate-400">Certified {HSBC_PARTNER_SINCE}</p>
                </div>
                <div className="p-4 rounded-2xl border border-blue-900/60 bg-blue-950/30 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">JPMorgan</span>
                  </div>
                  <p className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">100+ Countries</p>
                  <p className="text-xs font-bold text-white">Recruitment Partner</p>
                  <p className="text-[10px] text-slate-400">Certified {JPMORGAN_PARTNER_SINCE}</p>
                </div>
              </div>

              {/* Stat Fact Tiles */}
              <ul className="grid gap-2">
                {partnerStats.slice(2).map((s) => (
                  <li
                    key={s.label}
                    className="px-4 py-3 rounded-2xl border border-slate-800 bg-[#142247]/60 flex items-center justify-between transition-colors hover:border-slate-700"
                  >
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {s.label}
                    </span>
                    <span className="text-xs font-bold text-white text-right">{s.value}</span>
                  </li>
                ))}
              </ul>

              {/* Verifiable Credentials Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {proofs.slice(2).map(({ key, label, sub, href, external, Icon }) => {
                  const onClick = () => trackEvent("task_block_proof_click", { label: key });
                  const inner = (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{label}</p>
                        <p className="text-[10px] text-slate-400 truncate">{sub}</p>
                      </div>
                      {external && (
                        <ExternalLink className="h-3 w-3 text-slate-400 ml-auto shrink-0" />
                      )}
                    </div>
                  );
                  return (
                    <div
                      key={key}
                      className="p-3.5 rounded-2xl border border-slate-800 bg-[#111C38] hover:border-blue-500/50 hover:bg-[#16254A] transition-all"
                    >
                      {external ? (
                        <a href={href} target="_blank" rel="noreferrer" onClick={onClick}>
                          {inner}
                        </a>
                      ) : (
                        <Link to={href} onClick={onClick}>
                          {inner}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Integrated Action Buttons */}
            <div className="space-y-3 pt-5 border-t border-slate-800">
              <Link
                to="/apply"
                onClick={() =>
                  trackEvent("task_block_cta_click", {
                    placement: "task_block",
                    label: "hsbc_aiml_apply",
                  })
                }
                className="h-13 px-6 w-full flex items-center justify-center gap-2.5 text-white font-bold rounded-xl bg-[#CC0000] hover:bg-[#b91c1c] shadow-lg shadow-red-900/30 transition-all hover:scale-[1.01] active:scale-[0.98] text-sm"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </Link>

              <a
                href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                  "Hi Arzon — I saw the HSBC & JPMorgan partnership. I want to apply for the AI/ML cohort (Aug 2026).",
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("task_block_whatsapp_click", { placement: "task_block" })
                }
                className="h-11 px-5 w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-200 bg-slate-900/80 border border-slate-800 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp Admissions Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Partnership Visual */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* TASK Photo Card */}
            <div className="relative group overflow-hidden rounded-3xl border border-slate-200 bg-white tone-light p-3 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1">
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 min-h-[280px]">
                <img
                  src={taskImg}
                  alt="Arzon Global TASK government recognition launch event, Hyderabad"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 motion-safe:animate-pulse shrink-0" />
                    <div>
                      <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                        Inauguration Chief Guest · TEAM TASK
                      </p>
                      <p className="text-[10px] text-slate-300 font-medium">Official Launch · Hyderabad</p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-amber-400 shrink-0">
                    30 Jul 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Certification Proof Strip */}
            <div className="rounded-2xl border border-slate-200 bg-white tone-light p-5 shadow-sm">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#707C90] mb-3">
                Verified Partnership Credentials
              </p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200/80">
                  <CheckCircle2 className="h-5 w-5 text-red-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-red-900">HSBC Holdings · Certificate of Recognition</p>
                    <p className="text-[10px] text-red-700 font-mono">Recruitment Partnership · 15/07/2026 · Bangalore</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200/80">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-blue-900">JPMorgan Chase &amp; Co. · Recruitment Partnership</p>
                    <p className="text-[10px] text-blue-700 font-mono">Certified Official · Verified · July 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200/80">
                  <Award className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-900">TASK · Govt of Telangana · ISO 9001:2015</p>
                    <p className="text-[10px] text-amber-700 font-mono">Government Recognition · Hyderabad · 30 Jul 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

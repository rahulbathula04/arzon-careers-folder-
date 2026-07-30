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
} from "lucide-react";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { LINKS, COUNSELLOR_PHONE } from "./constants";
import { trackEvent } from "@/lib/analytics";

export function TaskPartnershipBlock() {
  const ref = useRef<HTMLElement | null>(null);
  const ctaLabel = "Get my industry-fit score";

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

  const stats: Array<{ label: string; value: string }> = [
    { label: "Chief Guests", value: "TASK · Govt of Telangana" },
    { label: "Public Launch", value: "30 Jul 2025 · Hyderabad" },
    { label: "Programmes Shown", value: "PV · Coding · Clinical Research" },
  ];

  type Proof = {
    key: string;
    label: string;
    sub: string;
    href: string;
    external?: boolean;
    Icon: typeof ShieldCheck;
  };
  const proofs: Proof[] = [
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
      key: "mca",
      label: "MCA Incorporated",
      sub: "Company filing",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono font-bold text-amber-800 shadow-sm">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            <span>GOVERNMENT RECOGNITION · VERIFIABLE CREDENTIALS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight leading-tight">
            Recognised by{" "}
            <span className="italic text-[#8A6D1F]">Government of Telangana &amp; India</span>
          </h2>

          <p className="text-sm text-[#5B6472] leading-relaxed max-w-2xl font-medium">
            Senior TASK leadership - Telangana Academy for Skill &amp; Knowledge - inaugurated Arzon's
            national workforce readiness initiative in Hyderabad as official chief guests.
          </p>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left: Photo Frame */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="editorial-card card-light p-3 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-full">
              <div className="relative overflow-hidden rounded-xl bg-slate-100 flex-1">
                <img
                  src={taskImg}
                  alt="Public launch event photo with TASK officials"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between gap-3 px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse shrink-0" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#151C2E]">
                    Launch Event · TASK Officials &amp; Founding Team
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#5B6472] shrink-0">Hyderabad · 30 Jul 2025</span>
              </div>
            </div>
          </div>

          {/* Right: Institutional Accreditation & Action Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="editorial-card card-light p-6 rounded-2xl border border-slate-200 bg-white shadow-md space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#707C90]">
                    Institutional Accreditation
                  </span>
                  <Sparkles className="h-4 w-4 text-amber-500" />
                </div>

                {/* Key Facts */}
                <ul className="space-y-2">
                  {stats.map((s) => (
                    <li
                      key={s.label}
                      className="editorial-stat-tile px-4 py-3 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between"
                    >
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#707C90]">
                        {s.label}
                      </span>
                      <span className="text-xs font-bold text-[#151C2E] text-right">{s.value}</span>
                    </li>
                  ))}
                </ul>

                {/* Verifiable Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {proofs.map(({ key, label, sub, href, external, Icon }) => {
                    const onClick = () => trackEvent("task_block_proof_click", { label: key });
                    const inner = (
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-[#1D4ED8] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#151C2E] truncate">{label}</p>
                          <p className="text-[10px] text-[#5B6472] truncate">{sub}</p>
                        </div>
                        {external && (
                          <ExternalLink className="h-3 w-3 text-[#707C90] ml-auto shrink-0" />
                        )}
                      </div>
                    );
                    return (
                      <div
                        key={key}
                        className="editorial-stat-tile p-3 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-slate-100/80 transition"
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

              {/* Integrated CTAs */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <Link
                  to="/career-engine/test"
                  onClick={() =>
                    trackEvent("task_block_cta_click", {
                      placement: "task_block",
                      label: "readiness_test",
                    })
                  }
                  className="editorial-btn-blue text-xs sm:text-sm h-12 px-5 w-full flex items-center justify-center gap-2 text-slate-50 font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 text-slate-50" />
                </Link>

                <a
                  href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                    "Hi Arzon - I saw the TASK launch page. I'd like to know about the next cohort.",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("task_block_whatsapp_click", { placement: "task_block" })
                  }
                  className="editorial-stat-tile h-10 px-5 w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#151C2E] bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-[#1D4ED8]" />
                  <span>WhatsApp Admissions Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

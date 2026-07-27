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
  CheckCircle2,
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
      label: "MCA incorporated",
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
      className="py-14 px-4 sm:px-6 lg:px-8 bg-[#060A12] border-y border-slate-800/80 text-slate-50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        {/* ── Header ── */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono font-bold text-sky-400 shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" />
            <span>GOVERNMENT RECOGNITION · VERIFIABLE CREDENTIALS</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-50 tracking-tight leading-snug">
            Recognised by{" "}
            <span className="text-amber-400">Government of Telangana &amp; India</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            TASK officials — the Telangana Academy for Skill &amp; Knowledge — joined as chief guests
            at our public launch, validating our role-readiness programmes.
          </p>
        </div>

        {/* ── Body grid ── */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Left: Photo */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Fixed-height image frame */}
              <div className="relative w-full" style={{ height: "340px" }}>
                <img
                  src={taskImg}
                  alt="Public launch event with TASK officials"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* Dark gradient caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
                  <p className="font-mono text-[11px] font-semibold text-sky-400 uppercase tracking-widest">
                    Launch Event · Hyderabad
                  </p>
                  <p className="text-xs text-slate-200 font-medium mt-0.5">
                    TASK Officials &amp; Founding Team · 30 Jul 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Proof panel */}
          <div className="lg:col-span-5 space-y-4">
            {/* Accreditation card */}
            <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-5 space-y-4 shadow-xl">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-sky-400">
                Institutional Accreditation
              </p>

              {/* Stat tiles */}
              <ul className="space-y-2">
                {stats.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-white/[0.04] px-4 py-3"
                  >
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {s.label}
                    </p>
                    <p className="text-xs font-bold text-slate-100 text-right">{s.value}</p>
                  </li>
                ))}
              </ul>

              {/* Proof badges */}
              <div className="grid grid-cols-2 gap-2">
                {proofs.map(({ key, label, sub, href, external, Icon }) => {
                  const onClick = () => trackEvent("task_block_proof_click", { label: key });
                  const inner = (
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-sky-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-100 truncate">{label}</p>
                        <p className="text-[10px] text-slate-400 truncate">{sub}</p>
                      </div>
                      {external && (
                        <ExternalLink className="h-3 w-3 text-slate-500 ml-auto shrink-0" />
                      )}
                    </div>
                  );
                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-slate-800 bg-white/[0.04] p-2.5 transition hover:border-sky-500/40 hover:bg-slate-900"
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

            {/* CTAs */}
            <Link
              to="/career-engine/test"
              onClick={() =>
                trackEvent("task_block_cta_click", {
                  placement: "task_block",
                  label: "readiness_test",
                })
              }
              className="flex items-center justify-center gap-2 rounded-2xl h-12 px-5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white text-sm font-bold shadow-xl shadow-blue-900/50 transition-all duration-200"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
                "Hi Arzon — I saw the TASK launch page. I'd like to know about the next cohort.",
              )}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("task_block_whatsapp_click", { placement: "task_block" })}
              className="flex items-center justify-center gap-2 h-11 px-5 w-full rounded-2xl border border-slate-800 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-slate-200 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-sky-400" />
              <span>WhatsApp Admissions Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

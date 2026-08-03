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

        {/* ── Main Content Grid (12-Col Asymmetric Layout) ── */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Dark Slate Accreditation Command Vault */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-slate-800 bg-[#0B132B] p-6 sm:p-8 shadow-2xl text-white space-y-6">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400">
                  Institutional Accreditation Hub
                </span>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>

              {/* Stat Fact Tiles */}
              <ul className="grid gap-2.5">
                {stats.map((s) => (
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
                {proofs.map(({ key, label, sub, href, external, Icon }) => {
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
                to="/career-engine/test"
                onClick={() =>
                  trackEvent("task_block_cta_click", {
                    placement: "task_block",
                    label: "readiness_test",
                  })
                }
                className="h-13 px-6 w-full flex items-center justify-center gap-2.5 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.98] text-sm"
              >
                <span>{ctaLabel}</span>
                <ArrowRight className="h-4 w-4 text-white" />
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
                className="h-11 px-5 w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-200 bg-slate-900/80 border border-slate-800 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp Admissions Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Photo Frame with Live Event Metadata */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative group overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 flex-1 min-h-[380px]">
                <img
                  src={taskImg}
                  alt="Public launch event photo with TASK officials"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge Overlay */}
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
          </div>
        </div>
      </div>
    </section>
  );
}

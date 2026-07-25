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
    { label: "Chief guests", value: "TASK · Govt of Telangana" },
    { label: "Public launch", value: "30 Jul 2025 · Hyderabad" },
    { label: "Programmes shown", value: "PV · Coding · Clinical Research" },
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
      className="editorial-page-bg border-y border-slate-200 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
            Government Recognition · Verifiable Credentials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#151C2E] tracking-tight">
            Recognised by <span className="italic text-[#8A6D1F]">Government of Telangana & India</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Photo & Verification */}
          <div className="lg:col-span-7 space-y-4">
            <div className="editorial-card overflow-hidden p-2">
              <img
                src={taskImg}
                alt="Public launch event photo with TASK officials"
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl"
              />
              <p className="text-center text-xs text-[#5B6472] py-2">
                Launch Event · Hyderabad · TASK Officials & Founding Team
              </p>
            </div>
          </div>

          {/* Right Proof Specifications */}
          <div className="lg:col-span-5 space-y-4">
            <div className="editorial-card p-6 space-y-4">
              <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
                Institutional Accreditation
              </p>

              <ul className="space-y-2.5">
                {stats.map((s) => (
                  <li key={s.label} className="editorial-stat-tile p-3">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[#707C90]">
                      {s.label}
                    </p>
                    <p className="text-xs font-bold text-[#151C2E] mt-0.5">{s.value}</p>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {proofs.map(({ key, label, sub, href, external, Icon }) => {
                  const onClick = () => trackEvent("task_block_proof_click", { label: key });
                  const inner = (
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#1D4ED8] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#151C2E] truncate">{label}</p>
                        <p className="text-[10px] text-[#5B6472] truncate">{sub}</p>
                      </div>
                      {external && <ExternalLink className="h-3 w-3 text-[#707C90] ml-auto shrink-0" />}
                    </div>
                  );
                  return (
                    <div key={key} className="editorial-stat-tile p-2.5">
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

              <div className="pt-4 space-y-3">
                <Link
                  to="/career-engine/test"
                  onClick={() =>
                    trackEvent("task_block_cta_click", {
                      placement: "task_block",
                      label: "readiness_test",
                    })
                  }
                  className="editorial-btn-blue text-xs h-11 px-4 w-full flex items-center justify-center gap-2 text-white font-bold"
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
                  className="editorial-stat-tile h-10 px-4 w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#151C2E] hover:bg-slate-200 transition-colors"
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

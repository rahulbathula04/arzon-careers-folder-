import { Phone, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { COUNSELLOR_PHONE, COUNSELLOR_PHONE_DISPLAY, waLink } from "@/components/landing/constants";
import { CounsellorLeadForm } from "@/components/landing/CounsellorLeadForm";

/**
 * Three contact lanes for placement officers - call, WhatsApp, email.
 * Plus the standard counsellor lead form. Source = current path (set by
 * CounsellorLeadForm), so admin can filter TPO leads in the leads table.
 */
export function CounsellorLanes() {
  const waMessage =
    "Hi, I'm a TPO / placement officer enquiring about an Arzon Careers partner briefing for my college.";

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
          Three lanes to the partnerships team
        </p>
        <h3 className="mt-1 font-grotesk text-body font-bold text-ink">
          Same person, three ways to reach
        </h3>

        <div className="mt-4 space-y-3">
          <a
            href={`tel:+${COUNSELLOR_PHONE}`}
            className="flex items-center gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3 transition hover:border-[color:var(--teal-deep)]/40 hover:bg-white"
          >
            <Phone className="h-4 w-4 text-[color:var(--teal-deep)]" />
            <div className="flex-1">
              <p className="text-caption font-semibold text-ink">Call partnerships</p>
              <p className="font-mono text-micro text-slate-600">{COUNSELLOR_PHONE_DISPLAY}</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </a>

          <a
            href={waLink(waMessage)}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3 transition hover:border-[color:var(--teal-deep)]/40 hover:bg-white"
          >
            <MessageCircle className="h-4 w-4 text-[color:var(--teal-deep)]" />
            <div className="flex-1">
              <p className="text-caption font-semibold text-ink">WhatsApp partnerships</p>
              <p className="text-micro text-slate-600">Pre-filled TPO context, no script needed</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </a>

          <a
            href="mailto:info@arzonglobal.com?subject=TPO%20partnership%20enquiry"
            className="flex items-center gap-3 rounded-xl border border-ink/10 bg-slate-50 p-3 transition hover:border-[color:var(--teal-deep)]/40 hover:bg-white"
          >
            <Mail className="h-4 w-4 text-[color:var(--teal-deep)]" />
            <div className="flex-1">
              <p className="text-caption font-semibold text-ink">Email partnerships</p>
              <p className="font-mono text-micro text-slate-600">info@arzonglobal.com</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </div>

        <p className="mt-4 text-micro leading-relaxed text-slate-500">
          Same counsellor answers all three. Average response: under 4 working hours.
        </p>
        <p className="mt-3 text-meta leading-relaxed text-slate-600">
          Need the partner briefing pack? Ask on any lane - we send a same-day deck tailored to your
          batch size + course mix.{" "}
          <Link
            to="/credibility"
            className="font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
          >
            See why other colleges trust us first →
          </Link>
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
          Or have us call you back
        </p>
        <h3 className="mt-1 font-grotesk text-body font-bold text-ink">
          Within 24 hours, partnerships lead
        </h3>
        <div className="mt-4">
          <CounsellorLeadForm />
        </div>
      </div>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { LINKS, PROOF } from "./constants";
import { EtvVideoEmbed } from "./EtvVideoEmbed";

/**
 * National-media coverage. ETV Telangana feature on our founder
 * Srikanth Sinha, aired the same day as our public launch event.
 * Lazy iframe: only mounted after user clicks the poster, so the
 * landing page LCP stays clean.
 */
export function NationalMediaBlock() {
  const m = LINKS.mediaETV;

  return (
    <Section id="national-media" size="md" tone="muted">
      <SectionHeader
        align="center"
        eyebrow={`As featured on ${m.outlet}`}
        title={
          <>
            On <em className="not-italic text-primary-glow">regional television</em>, same week as
            our public launch.
          </>
        }
        sub={`${m.outlet} aired a feature on our founder Srikanth Sinha on ${m.date}, the same day as our public launch event in Hyderabad. Coverage on the public record, not a stage prop.`}
      />

      <div className="mt-10 grid items-start gap-6 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-10">
        <figure className="overflow-hidden rounded-2xl border border-slate-200/10 bg-[#0a0c10] ring-1 ring-white/5">
          <EtvVideoEmbed variant="section" />
        </figure>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/10 bg-white/[0.03] p-5">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
              On the public record
            </p>
            <p className="mt-2 font-grotesk text-base font-semibold text-slate-50">{m.title}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-100/70">
              <li>
                · Outlet: <span className="text-slate-50">{m.outlet}</span>
              </li>
              <li>
                · Aired: <span className="text-slate-50">{m.date}</span>
              </li>
              <li>
                · Same day as:{" "}
                <span className="text-slate-50">{PROOF.inaugurationBody} inauguration</span>
              </li>
            </ul>
            <a
              href={m.watch}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-glow hover:underline"
            >
              Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <Link
            to="/proof"
            hash="media"
            className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-slate-200/10 bg-white/[0.02] p-4 text-left transition hover:border-primary/40 hover:bg-white/[0.05]"
          >
            <div>
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-slate-100/80">
                Want the rest of the receipts?
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                See more proof, launch photos, ISO, MCA, MSME and verified alumni.
              </p>
            </div>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-glow ring-1 ring-primary/30 transition group-hover:bg-primary/25">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import { PRE_REGISTERED_LABEL, NEXT_COHORT } from "./constants";

/**
 * Conversion strip placed between Pricing and FAQ.
 * Plain language, one job: turn readers into 3-min fit-test takers.
 */
export function MidPageReserveStrip() {
  return (
    <section className="px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/[0.10] to-gold/[0.03] p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gold" />
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
            {PRE_REGISTERED_LABEL} students already locked in
          </p>
        </div>
        <h3 className="mt-3 font-grotesk text-h3 font-bold leading-tight text-slate-50 sm:text-h2">
          Not sure which programme? Take the 3-min fit test.
        </h3>
        <p className="mt-2 text-sm text-slate-100/75">
          30 honest questions. One personalised result. Next batch starts {NEXT_COHORT.startsLabel}.
        </p>
        <Link
          to="/career-engine"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-gold-ink hover:bg-gold/90 sm:w-auto"
        >
          Start the fit test <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

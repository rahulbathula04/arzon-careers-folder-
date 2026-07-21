/**
 * 20%-band content for /courses — recruiter-voice proof, one quote per
 * track. Quotes are paraphrased from real intake calls; replace text only
 * after explicit recruiter approval before going on a live URL.
 */
const QUOTES: { quote: string; who: string; role: string }[] = [
  {
    quote:
      "I don't care about a course certificate. Show me a candidate who has triaged ten ICSRs in Argus and I'll take the call.",
    who: "Talent lead",
    role: "Mid-size CRO, Hyderabad",
  },
  {
    quote: "Freshers who know ICD-10 conventions cold save us a month of ramp-up. That's the bar.",
    who: "Coding manager",
    role: "US healthcare BPO, Bengaluru",
  },
  {
    quote:
      "We screen for eCRF and protocol-deviation fluency on the first call. Most candidates can't get past it.",
    who: "Clinical operations",
    role: "Global CRO, Bengaluru",
  },
];

export function RecruiterQuoteStrip() {
  return (
    <section aria-label="What recruiters say they screen for" className="mt-10">
      <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
        What recruiters say
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {QUOTES.map((q) => (
          <li
            key={q.who + q.role}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <blockquote className="text-sm leading-relaxed text-white/85">
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <footer className="mt-3 text-xs text-white/55">
              {q.who} · {q.role}
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { AlertTriangle, ShieldCheck, ArrowUpRight, X, Check } from "lucide-react";
import { RichCard } from "@/components/ui/RichCard";

/**
 * Trust-recession hook for second-attempt buyers (people burnt by Henry
 * Harvin / Masai-style scams). Two RichCards float on the dark page -
 * warm "orange" (the wound) next to grounded "emerald" (the answer).
 * Light surfaces deliberately punch out of the navy background.
 */
export function BurntBeforeStrip() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* LEFT, what you've been through */}
          <RichCard tone="orange" elevation="lifted" className="tone-light">
            <RichCard.Header art={<AlertTriangle strokeWidth={1.4} />}>
              <RichCard.EyebrowRow>
                <RichCard.Chip icon={<AlertTriangle />}>Burnt by another institute?</RichCard.Chip>
              </RichCard.EyebrowRow>
              <RichCard.Title as="h2">
                Paid ₹40,000 for a certificate LinkedIn doesn't even recognise?
              </RichCard.Title>
            </RichCard.Header>
            <RichCard.Body>
              <p className="text-body-sm leading-relaxed">
                You're not alone. Here's what we keep hearing from students who come to us second:
              </p>
              <ul className="flex flex-col gap-2.5 text-body-sm">
                {COMPLAINTS.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tone-orange-to)]"
                      strokeWidth={2.5}
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </RichCard.Body>
          </RichCard>

          {/* RIGHT, what we do differently */}
          <RichCard tone="emerald" elevation="lifted" className="tone-light">
            <RichCard.Header art={<ShieldCheck strokeWidth={1.4} />}>
              <RichCard.EyebrowRow>
                <RichCard.Chip icon={<ShieldCheck />}>What we do differently</RichCard.Chip>
              </RichCard.EyebrowRow>
              <RichCard.Title as="h2">Receipts for every claim. No exceptions.</RichCard.Title>
            </RichCard.Header>
            <RichCard.Body>
              <ul className="flex flex-col gap-2.5 text-body-sm">
                {ANSWERS.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tone-emerald-to)]"
                      strokeWidth={2.75}
                    />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </RichCard.Body>
            <RichCard.Footer>
              <Link
                to="/proof"
                hash="refund"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--tone-emerald-to)] px-4 py-2 text-caption font-semibold text-slate-50 shadow-sm transition hover:opacity-90"
              >
                Read our refund promise
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </RichCard.Footer>
          </RichCard>
        </div>
      </div>
    </section>
  );
}

const COMPLAINTS = [
  '"Live mentor" turned out to be Zoom recordings from 2022.',
  "Certificate had no verification URL. Recruiters laughed.",
  "Counsellor disappeared the moment payment cleared.",
  "100% placement guarantee, until you read the 14-page T&C.", // copy-claims-ok: rhetorical quote of a competitor lie
];

const ANSWERS = [
  "Every certificate has a public, scannable verification URL.",
  "Mentors are named, on LinkedIn, and on live calls each week.",
  "Public launch event with TASK officials as chief guests, we publish the video, not just the logo.",
  "ISO 9001 issuer, MCA-registered.",
];

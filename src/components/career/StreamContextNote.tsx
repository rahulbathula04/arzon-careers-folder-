import { GraduationCap, Lightbulb } from "lucide-react";

/**
 * Stream-aware narrative shown just under the headline match card.
 * Coursera-style "tip" card: white surface, primary accent rail on the left,
 * Lightbulb icon, slate body copy.
 */

interface Props {
  /** Profile question `course` answer: pharma | lifesci | med | engg | comm | arts. */
  course?: string;
  /** Slug of the user's top recommended track. */
  topSlug: string;
  /** Title of the user's top recommended track. */
  topTitle: string;
}

interface CopyBlock {
  chip: string;
  headline: string;
  body: string;
}

function copyFor(course: string | undefined, topSlug: string, topTitle: string): CopyBlock | null {
  const t = topTitle;
  switch (course) {
    case "comm":
      return {
        chip: "BBA / B.Com / BMS",
        headline: `${t} is built for exactly your background.`,
        body: `${t} is the BBA / Commerce lane — quota-carrying B2B SaaS sales, customer success, business analyst and operations roles at Indian product co's like Razorpay, Freshworks, Zoho and Innovaccer. Hiring criteria here are communication, commercial reasoning and ownership — not lab or coding chops. The pharma-heavy tracks scored lower because they hire from B.Pharm / B.Sc Life Sciences. That's the test working correctly, not a knock on you.`,
      };
    case "arts":
      return {
        chip: "BA / Humanities",
        headline: `${t} fits your communication-led profile.`,
        body: "Indian SaaS, healthcare and edtech hire Arts / Humanities grads into customer-facing roles — sales, success, content, operations — where written English and empathy beat lab background. Lower scores on technical tracks are expected; they hire from engineering streams.",
      };
    case "engg":
      return {
        chip: "B.Tech / B.E",
        headline: `${t} matches your engineering background.`,
        body: `${topSlug === "software-engineer" ? "Indian product co's (Google, Microsoft, Razorpay, Zerodha, PhonePe) hire B.Tech grads at 2–3x service-co pay" : `${t} hires the logic + tech signal you bring`}. The cohort closes the domain + production-readiness gap that screen-rounds actually test.`,
      };
    case "agri":
      return {
        chip: "B.Sc / B.Tech Agriculture",
        headline: `${t} converts your agri training into a high-growth role.`,
        body: "Indian agri-tech (DeHaat, Ninjacart, Cropin, WayCool) raised over $1B since 2022 and is bottlenecked on field-aware grads who can talk to farmers AND read a dashboard. Your ground-truth advantage is exactly what they hire for. Pure pharma / coding tracks scored lower because they hire from a different stream.",
      };
    case "pharma":
      return {
        chip: "B.Pharm / Pharm.D",
        headline: `${t} is the highest-leverage path for B.Pharm graduates.`,
        body: "Your pharmacy training gives you domain depth from day one. The cohort builds the operational + tooling layer on top.",
      };
    case "lifesci":
      return {
        chip: "B.Sc Life Sciences",
        headline: `${t} converts your science background into a hireable role.`,
        body: "Life-sciences graduates bring strong domain reading. The cohort adds the regulatory / SOP discipline employers screen on.",
      };
    case "med":
      return {
        chip: "BDS / BHMS / BAMS / Nursing",
        headline: `${t} respects your clinical training.`,
        body: "Your clinical background is a real edge — patient-safety and coding employers actively prefer it.",
      };
    default:
      return null;
  }
}

export function StreamContextNote({ course, topSlug, topTitle }: Props) {
  const c = copyFor(course, topSlug, topTitle);
  if (!c) return null;
  return (
    <section className="tone-light mt-6 overflow-hidden rounded-3xl bg-white text-slate-900 ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)]">
      <div className="flex items-stretch">
        <div className="w-1.5 shrink-0 bg-primary" aria-hidden="true" />
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
              <Lightbulb className="h-3.5 w-3.5" />
            </span>
            <span className="inline-flex items-center gap-1.5 text-micro font-bold uppercase tracking-wide text-primary">
              <GraduationCap className="h-3 w-3" /> {c.chip} · why this fits
            </span>
          </div>
          <p className="mt-3 font-grotesk text-body font-extrabold leading-snug text-slate-900 sm:text-body">
            {c.headline}
          </p>
          <p className="mt-2 text-caption leading-relaxed text-slate-600">{c.body}</p>
        </div>
      </div>
    </section>
  );
}

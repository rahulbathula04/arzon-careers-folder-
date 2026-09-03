import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { CTAButton } from "@/components/landing/CTAButton";
import { waLink } from "@/components/landing/constants";
import { Gift, Users, IndianRupee, MessageCircle } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { ReferralHub } from "@/components/referral/ReferralHub";

export const Route = createFileRoute("/refer")({
  head: () => {
    const title = "Refer a friend to Arzon Global";
    const ps = pageSeo({
      path: "/refer",
      title,
      description:
        "Refer a healthcare graduate to Arzon Global. They get ₹1,000 off and you get ₹3,000 when they enrol.",
      image: "/og/career-engine.jpg",
    });
    return { meta: [{ title }, ...ps.meta], links: ps.links };
  },
  component: ReferPage,
});

function ReferPage() {
  const cards = [
    { icon: Gift, label: "They save", value: "₹1,000", sub: "off any tier at checkout" },
    { icon: IndianRupee, label: "You earn", value: "₹3,000", sub: "credited after they pay" },
    { icon: Users, label: "No cap", value: "Unlimited", sub: "refer as many as you like" },
  ];
  return (
    <main className="min-h-app text-white">
      <section className="mx-auto max-w-4xl px-5 pb-20 pt-16 sm:px-6 lg:px-8">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-gold">
          Alumni & friends
        </p>
        <h1 className="h-display mt-3">Refer a healthcare graduate.</h1>
        <p className="body-lg mt-4 max-w-2xl">
          You know who's stuck job-hunting after B.Pharm or B.Sc. Send them the ACRI Preview. If
          they enrol, you earn ₹2,000 and they get ₹2,000 off.
        </p>

        <div className="mt-8">
          <ReferralHub />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Icon className="h-5 w-5 text-gold" />
              <p className="mt-3 font-mono text-micro uppercase tracking-[0.18em] text-white/80">
                {label}
              </p>
              <p className="mt-1 font-grotesk text-h3 font-bold">{value}</p>
              <p className="mt-1 text-xs text-white/80">{sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-grotesk text-lg font-bold">How it works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-white/80">
            <li>WhatsApp our counsellor your friend's name and number.</li>
            <li>
              We send them the{" "}
              <Link to="/career-engine" className="underline">
                ACRI Readiness Preview
              </Link>{" "}
              with your referral tag.
            </li>
            <li>If they enrol in any tier, you receive ₹3,000 within 7 days.</li>
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink(
              "Hi Arzon, I want to refer a friend. Their name is ___ and their phone is ___.",
            )}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle className="h-4 w-4" /> Refer over WhatsApp
          </a>
          <CTAButton asChild variant="ghost">
            <Link to="/career-engine">Or share the ACRI Preview link →</Link>
          </CTAButton>
        </div>

        <p className="mt-6 text-xs text-white/80">
          Payouts are made via UPI to the referrer's verified number after the referred candidate's
          enrolment is confirmed and the cohort starts.
        </p>
      </section>
      <Footer />
    </main>
  );
}

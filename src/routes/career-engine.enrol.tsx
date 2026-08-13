import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AiThinkingLoader } from "@/components/ui/AiThinkingLoader";
import {
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  RefreshCcw,
  Sparkles,
  CheckCircle2,
  Pencil,
  CalendarDays,
  Loader2,
} from "lucide-react";
import { CareerShell } from "@/components/career/CareerShell";
import {
  SEAT_FEE,
  COHORTS,
  NEXT_COHORT,
  waLink,
  type Cohort,
} from "@/components/landing/constants";
import {
  getProfile,
  saveProfile,
  getLeadId,
  setCohort,
  humanizeCareerEngineError,
  type CareerEngineProfile,
} from "@/lib/careerEngineApi";
import { track } from "@/lib/track";
import { trackCEFunnelStep, trackCECtaClicked } from "@/lib/careerEngineAnalytics";
import { toast } from "sonner";

const RZP = "https://rzp.io/rzp/rTrWHwjx";

export const Route = createFileRoute("/career-engine/enrol")({
  head: () => ({
    meta: [
      { title: `Pick your cohort and reserve your seat. Arzon Career Engine` },
      {
        name: "description",
        content: `Select your Arzon cohort, confirm your details, and lock your seat for ${SEAT_FEE}. Fully adjusted in your fee.`,
      },
      { property: "og:title", content: `Pick your cohort · Arzon` },
      { property: "og:description", content: "ISO 9001 certified. Fully adjusted in fee." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EnrolPage,
});

const STATUS_COPY: Record<Cohort["status"], { label: string; tone: string }> = {
  open: { label: "Open", tone: "border-accent-glow/30 bg-accent-glow/10 text-eyebrow-strong" },
  filling: { label: "Filling fast", tone: "border-amber-300/30 bg-amber-300/10 text-amber-200" },
  waitlist: { label: "Waitlist", tone: "border-white/15 bg-white/[0.04] text-white/65" },
};

function formatCloseDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function EnrolPage() {
  const [leadId, setLeadId] = useState<string | null>(null);
  const [selectedCohortId, setSelectedCohortId] = useState<string>(NEXT_COHORT.id);
  const [profile, setProfile] = useState<CareerEngineProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<CareerEngineProfile>({
    name: "",
    phone: "",
    email: "",
    whatsappOptin: true,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLeadId(getLeadId());
    const p = getProfile();
    if (p) {
      setProfile(p);
      setDraft(p);
    } else {
      // No prior profile (user navigated directly), open the form by default.
      setEditing(true);
    }
    trackCEFunnelStep({ step: "enrol", leadId: getLeadId() });
  }, []);

  const selectedCohort = useMemo(
    () => COHORTS.find((c) => c.id === selectedCohortId) ?? NEXT_COHORT,
    [selectedCohortId],
  );

  const detailsValid =
    draft.name.trim().length >= 2 &&
    /^\d{10}$/.test(draft.phone.replace(/\D/g, "")) &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(draft.email.trim());

  const canPay = selectedCohort.status !== "waitlist" && !!profile && !editing && !submitting;

  const saveDetails = () => {
    if (!detailsValid) {
      toast.error("Please fill in your name, 10-digit phone and email.");
      return;
    }
    const cleaned: CareerEngineProfile = {
      name: draft.name.trim(),
      phone: draft.phone.replace(/\D/g, ""),
      email: draft.email.trim().toLowerCase(),
      whatsappOptin: draft.whatsappOptin,
    };
    saveProfile(cleaned);
    setProfile(cleaned);
    setEditing(false);
    toast.success("Details saved.");
  };

  const handlePay = async () => {
    if (!canPay) return;
    setSubmitting(true);
    trackCECtaClicked({
      step: "enrol",
      target: "pay",
      leadId: leadId ?? null,
    });
    track("ce_pay_clicked", {
      lead_id: leadId ?? null,
      props: {
        cohort_id: selectedCohortId,
        amount_label: SEAT_FEE,
        cohort_status: selectedCohort.status,
      },
    });
    // Canonical funnel name. `ce_pay_clicked` is kept for backwards compat
    // with existing dashboards; new analyses should key off `payment_started`.
    track("payment_started", {
      lead_id: leadId ?? null,
      props: {
        cohort_id: selectedCohortId,
        amount_label: SEAT_FEE,
        provider: "razorpay",
        funnel: "career_engine",
      },
      dedupeKey: `payment_started:${leadId ?? "anon"}:${selectedCohortId}`,
    });
    try {
      // CRITICAL: Open window BEFORE any await to prevent mobile popup blocker.
      // Mobile browsers block window.open() calls that follow an async gap.
      const url = `${RZP}#lead=${leadId ?? "anon"}&cohort=${selectedCohortId}`;
      const payWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!payWindow) {
        // Popup was blocked - give the user a fallback link
        toast.error("Your browser blocked the payment page. Tap the link below to pay.", {
          action: {
            label: "Open payment",
            onClick: () => window.open(url, "_blank", "noopener,noreferrer"),
          },
          duration: 15000,
        });
      }
      track("razorpay_handoff", {
        lead_id: leadId ?? null,
        props: { cohort_id: selectedCohortId, amount_label: SEAT_FEE },
      });
      // Non-blocking cohort save - runs after the popup is already open
      if (leadId) {
        setCohort(leadId, selectedCohortId)
          .then(() => {
            track("cohort_selected", {
              lead_id: leadId ?? null,
              props: { cohort_id: selectedCohortId },
            });
          })
          .catch((err) => {
            console.warn("setCohort failed", err);
          });
      }
    } catch (err) {
      try {
        track("payment_failed", {
          lead_id: leadId ?? null,
          props: {
            cohort_id: selectedCohortId,
            stage: "handoff",
            provider: "razorpay",
            message: err instanceof Error ? err.message.slice(0, 200) : String(err).slice(0, 200),
          },
        });
      } catch {
        /* noop */
      }
      toast.error(
        humanizeCareerEngineError(err, "We couldn't open the payment page. Please retry."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CareerShell>
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em] text-gold">
          <Sparkles className="h-3 w-3" /> Final step
        </span>
        <h1 className="h-display mt-4">Pick your cohort & lock your seat</h1>
        <p className="body-lg mx-auto mt-3 max-w-md text-white/75">
          Choose a batch, confirm your details, then pay {SEAT_FEE} to reserve. Fully adjusted in
          your programme fee.
        </p>
      </div>

      {/* Step A, Cohort selector */}
      <section className="mt-8">
        <header className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-micro font-semibold text-white/80">
            1
          </span>
          <h2 className="font-grotesk text-base font-bold text-white">Choose your cohort</h2>
        </header>
        <div className="mt-4 grid gap-3">
          {COHORTS.map((c) => {
            const isSelected = selectedCohortId === c.id;
            const isDisabled = c.status === "waitlist";
            const statusCopy = STATUS_COPY[c.status];
            return (
              <button
                key={c.id}
                type="button"
                disabled={isDisabled}
                onClick={() => setSelectedCohortId(c.id)}
                className={[
                  "group relative flex w-full items-center justify-between rounded-2xl border p-4 text-left transition",
                  isSelected
                    ? "border-primary-glow/60 bg-primary/[0.08] shadow-[0_0_0_1px_var(--primary-glow)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]",
                  isDisabled && "cursor-not-allowed opacity-60",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary-glow" />
                    <p className="font-grotesk text-base font-bold text-white">{c.label}</p>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-[0.14em] ${statusCopy.tone}`}
                    >
                      {statusCopy.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/65">Starts {c.startsLabel}</p>
                  <p className="mt-0.5 text-micro text-white/60">
                    Applications close {formatCloseDate(c.applicationsCloseISO)}
                  </p>
                </div>
                <span
                  aria-hidden
                  className={[
                    "flex h-5 w-5 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-primary-glow bg-primary-glow text-[#0A0F1E]"
                      : "border-white/25",
                  ].join(" ")}
                >
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                </span>
              </button>
            );
          })}
        </div>
        {selectedCohort.status === "waitlist" && (
          <a
            href={waLink(
              `Hi Arzon, please add me to the waitlist for the ${selectedCohort.label} cohort.`,
            )}
            target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-eyebrow hover:underline"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Join the waitlist on WhatsApp
          </a>
        )}
      </section>

      {/* Step B, Confirm details */}
      <section className="mt-8">
        <header className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-micro font-semibold text-white/80">
            2
          </span>
          <h2 className="font-grotesk text-base font-bold text-white">Confirm your details</h2>
        </header>

        {!editing && profile ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <dl className="grid gap-2 text-sm">
              <Row label="Name" value={profile.name} />
              <Row label="Phone" value={`+91 ${profile.phone.replace(/^91/, "")}`} />
              <Row label="Email" value={profile.email} />
            </dl>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-glow hover:underline"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit details
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="grid gap-3">
              <Field label="Full name">
                <input
                  type="text"
                  autoComplete="name"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="ce-input"
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Phone (10 digits)">
                <div className="flex items-stretch overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] focus-within:border-primary-glow/50">
                  <span className="flex items-center px-3 font-mono text-xs text-white/80">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={draft.phone.replace(/^91/, "")}
                    onChange={(e) =>
                      setDraft({ ...draft, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                    }
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/55 focus:outline-none"
                    placeholder="98xxxxxxxx"
                  />
                </div>
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  autoComplete="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  className="ce-input"
                  placeholder="you@example.com"
                />
              </Field>
              <label className="mt-1 flex items-start gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={draft.whatsappOptin}
                  onChange={(e) => setDraft({ ...draft, whatsappOptin: e.target.checked })}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-white/20 bg-white/5"
                />
                <span>Send me cohort updates and the welcome kit on WhatsApp.</span>
              </label>
            </div>
            <button
              type="button"
              onClick={saveDetails}
              disabled={!detailsValid}
              className="btn btn-primary btn-block mt-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save details
            </button>
          </div>
        )}
      </section>

      {/* Step C, Pay */}
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
        <header className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-mono text-micro font-semibold text-white/80">
            3
          </span>
          <h2 className="font-grotesk text-base font-bold text-white">Pay & lock your seat</h2>
        </header>
        <ul className="mt-4 space-y-2 text-sm text-white/80">
          <li>
            • Seat reserved in the {selectedCohort.label} cohort (starts{" "}
            {selectedCohort.startsLabel})
          </li>
          <li>• 1-on-1 onboarding call with a counsellor inside 24h</li>
          <li>• Pre-batch English + basics warm-up modules</li>
          <li>• Welcome kit with cohort group access</li>
          <li>• Fully adjusted in your full programme fee, you don't pay this twice</li>
        </ul>

        <button
          type="button"
          onClick={handlePay}
          disabled={!canPay}
          className="btn btn-primary btn-block btn-glow-pulse mt-5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <AiThinkingLoader label="Thinking & preparing payment…" size="sm" />
          ) : (
            <>
              Pay {SEAT_FEE} & lock seat <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
        {!profile && !editing && (
          <p className="mt-2 text-center text-micro text-amber-300/85">
            Confirm your details above to continue.
          </p>
        )}
        <p className="mt-3 inline-flex w-full items-center justify-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-white/50">
          <ShieldCheck className="h-3 w-3 text-gold" /> Razorpay · UPI / Card / Netbanking
        </p>
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-accent-glow/25 bg-accent-glow/[0.05] p-4">
          <RefreshCcw className="h-4 w-4 text-eyebrow" />
          <p className="mt-2 font-grotesk text-sm font-bold text-white">Break-even in ~28 days</p>
          <p className="mt-1 text-xs text-white/70">
            ₹24,999 ÷ ₹26,667 median first-month salary. Everything after is upside.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <ShieldCheck className="h-4 w-4 text-gold" />
          <p className="mt-2 font-grotesk text-sm font-bold text-white">Compliance-registered</p>
          <p className="mt-1 text-xs text-white/70">
            ISO 9001 certified · MSME · MCA registered Pvt. Ltd.
          </p>
        </div>
      </div>

      <a
        href={waLink(
          `Hi Arzon, I'm about to pay ${SEAT_FEE} for the ${selectedCohort.label} cohort but I have a quick question.`,
        )}
        target="_blank" rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/[0.06] px-4 py-3 text-sm font-semibold text-eyebrow-strong hover:bg-accent-glow/10"
      >
        <MessageCircle className="h-4 w-4" /> Talk to a counsellor on WhatsApp first
      </a>

      <div className="mt-6 text-center">
        <Link
          to="/career-engine/result"
          search={leadId ? { id: leadId } : {}}
          className="text-xs text-white/80 hover:text-white"
        >
          ← Back to my result
        </Link>
      </div>

      <style>{`
        .ce-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(255 255 255 / 0.10);
          background: rgb(255 255 255 / 0.03);
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: white;
        }
        .ce-input::placeholder { color: rgb(255 255 255 / 0.30); }
        .ce-input:focus { outline: none; border-color: color-mix(in oklab, var(--primary-glow) 50%, transparent); }
      `}</style>
    </CareerShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="font-mono text-micro uppercase tracking-[0.18em] text-white/50">{label}</dt>
      <dd className="text-right font-grotesk text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/80">
        {label}
      </span>
      {children}
    </label>
  );
}

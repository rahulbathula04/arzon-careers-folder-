import { Link } from "@tanstack/react-router";
import { Check, X, Minus, Calculator } from "lucide-react";
import type { Course } from "@/data/courses";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";
import { SamplePreview } from "@/components/courses/SamplePreview";
import { PRICE_CAREER, SEAT_FEE, NEXT_COHORT } from "@/components/landing/constants";

type Theme = ReturnType<typeof getTrackTheme>;

type Cell = true | false | "partial" | string;

const ROWS: Array<[string, Cell, Cell, Cell]> = [
  ["Recruiter-graded portfolio", false, "partial", true],
  ["Live Indian JD coverage (100–200/yr)", false, false, true],
  ["ISO 9001 verifiable credential", false, false, true],
  ["Mentor who actually worked the job", false, "partial", true],
  ["Mock interviews with a real panel", false, false, true],
  ["Months to first offer (median)", "8–14", "6–10", "3–5"],
  ["Hidden cost of waiting", "₹2.0L+", "₹1.2L", "—"],
];

function renderCell(v: Cell) {
  if (v === true)
    return <Check className="mx-auto h-5 w-5" style={{ color: "#34d399" }} aria-label="included" />;
  if (v === false)
    return (
      <X
        className="mx-auto h-5 w-5"
        style={{ color: "rgba(248,250,252,0.55)" }}
        aria-label="not included"
      />
    );
  if (v === "partial")
    return <Minus className="mx-auto h-5 w-5" style={{ color: "#F5C451" }} aria-label="partial" />;
  return (
    <span className="font-mono text-caption font-semibold" style={{ color: "#F8FAFC" }}>
      {v}
    </span>
  );
}

/** Beat 09 — the honest math. Self-taught vs Average course vs Arzon, then break-even, then price. */
export function RiskReversalBlock({ course, theme }: { course: Course; theme: Theme }) {
  // Break-even math: anchored to median entry salary (~₹3.2 LPA → ₹26,667/mo).
  // Mirrors Pricing.tsx BreakevenReframe so the number is identical site-wide.
  const fee = 24999;
  const monthly = Math.round(320000 / 12);
  const breakevenDays = Math.ceil((fee / monthly) * 30);

  return (
    <ConversionSection
      id="value-math"
      step="09"
      eyebrow="The honest math"
      title={
        <>
          Self-taught vs an average course vs{" "}
          <em className="not-italic" style={{ color: theme.hex.from }}>
            Arzon
          </em>
          .
        </>
      }
      subtitle="Same role, same recruiters. Different distance to your first offer."
      theme={theme}
    >
      {/* Row 1 — three-column comparison */}
      <div
        className="overflow-x-auto rounded-2xl border"
        style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.55)" }}
      >
        <table className="w-full min-w-[640px] text-caption sm:text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
              <th
                className="px-4 py-4 text-left font-mono text-micro font-medium uppercase tracking-wider sm:px-6"
                style={{ color: "rgba(248,250,252,0.55)" }}
              ></th>
              <th
                className="px-4 py-4 text-center font-grotesk text-sm font-semibold"
                style={{ color: "rgba(248,250,252,0.7)" }}
              >
                Self-taught
                <span
                  className="block text-micro font-normal"
                  style={{ color: "rgba(248,250,252,0.45)" }}
                >
                  YouTube + free notes
                </span>
              </th>
              <th
                className="px-4 py-4 text-center font-grotesk text-sm font-semibold"
                style={{ color: "rgba(248,250,252,0.7)" }}
              >
                Average course
                <span
                  className="block text-micro font-normal"
                  style={{ color: "rgba(248,250,252,0.45)" }}
                >
                  ₹8k–15k online
                </span>
              </th>
              <th className="px-4 py-4 text-center">
                <span
                  className="rounded-full px-3 py-1 font-grotesk text-sm font-bold"
                  style={{ background: "rgba(245,196,81,0.15)", color: "#F5C451" }}
                >
                  Arzon Global
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, a, b, c], i) => (
              <tr key={i} style={{ background: i % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                <td className="px-4 py-3.5 sm:px-6" style={{ color: "rgba(248,250,252,0.85)" }}>
                  {label}
                </td>
                <td className="px-4 py-3.5 text-center">{renderCell(a)}</td>
                <td className="px-4 py-3.5 text-center">{renderCell(b)}</td>
                <td className="px-4 py-3.5 text-center">{renderCell(c)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Row 2 — break-even math */}
      <div
        className="relative mt-6 overflow-hidden rounded-2xl p-5 ring-1 sm:mt-8 sm:p-7"
        style={{ background: "#0f1b3d", boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.25)" }}
      >
        <div className="relative grid items-center gap-5 md:grid-cols-[auto_1fr_auto] md:gap-8">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1"
              style={{
                background: "rgba(201,168,76,0.15)",
                boxShadow: "inset 0 0 0 1px rgba(201,168,76,0.35)",
              }}
            >
              <Calculator className="h-5 w-5" style={{ color: "#f0d78c" }} strokeWidth={2.25} />
            </span>
            <div>
              <p
                className="font-mono text-micro uppercase tracking-[0.22em]"
                style={{ color: "#f0d78c" }}
              >
                Break-even
              </p>
              <p className="font-display text-lg" style={{ color: "#F8FAFC" }}>
                Cost per placement
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-display text-h4 leading-snug" style={{ color: "#F8FAFC" }}>
              <span style={{ color: "#f0d78c" }}>₹{fee.toLocaleString()}</span>
              <span style={{ color: "rgba(248,250,252,0.55)" }}> ÷ </span>
              <span>₹{monthly.toLocaleString()}</span>
              <span style={{ color: "rgba(248,250,252,0.55)" }}> median first-month salary = </span>
              <span style={{ color: "#f0d78c" }}>break-even in ~{breakevenDays} days.</span>
            </p>
            <p className="mt-1.5 text-meta" style={{ color: "rgba(248,250,252,0.65)" }}>
              At a ₹3.2 LPA entry offer, the full programme pays itself back inside month one.
              Everything after is upside.
            </p>
          </div>
          <div
            className="rounded-xl px-4 py-3 ring-1 sm:min-w-[160px] sm:text-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)",
            }}
          >
            <p
              className="font-mono text-micro uppercase tracking-[0.22em]"
              style={{ color: "rgba(248,250,252,0.55)" }}
            >
              Days to recover
            </p>
            <p className="font-display text-h2" style={{ color: "#f0d78c" }}>
              ~{breakevenDays}
              <span className="ml-1 text-base" style={{ color: "rgba(248,250,252,0.55)" }}>
                days
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Row 3 — price, last */}
      <div
        className="mt-6 grid gap-4 rounded-2xl border p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
        style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(15,23,42,0.6)" }}
      >
        <div>
          <p
            className="font-mono text-micro uppercase tracking-[0.22em]"
            style={{ color: "rgba(248,250,252,0.55)" }}
          >
            Programme price
          </p>
          <p className="mt-1 font-display text-h3 font-bold" style={{ color: "#F8FAFC" }}>
            {PRICE_CAREER}{" "}
            <span className="text-caption font-normal" style={{ color: "rgba(248,250,252,0.6)" }}>
              · No hidden fees
            </span>
          </p>
          <p className="mt-1 text-caption" style={{ color: "rgba(248,250,252,0.6)" }}>
            {SEAT_FEE} seat fee locks your spot for the {NEXT_COHORT.label} cohort · starts{" "}
            {NEXT_COHORT.startsLabel}.
          </p>
        </div>
        <Link
          to="/apply"
          search={{ programme: course.slug, source: "value-math" }}
          className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full px-5 text-body-sm font-bold sm:self-auto"
          style={{ background: "#F5C451", color: "#0A0F1E" }}
        >
          Lock my seat
        </Link>
      </div>

      {/* Sample certificate stays — it's proof, not refund. */}
      <div className="tone-light mt-8 rounded-2xl border border-white/10 bg-white p-6 text-[#0A0F1E] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:p-8">
        <SamplePreview course={course} />
      </div>

      <p className="mt-6 text-caption" style={{ color: "#94A3B8" }}>
        {course.certification}{" "}
        <Link to="/verify" className="underline" style={{ color: theme.hex.from }}>
          Visit /verify →
        </Link>
      </p>
    </ConversionSection>
  );
}

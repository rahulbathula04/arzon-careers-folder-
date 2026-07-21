/**
 * ChapterActionPlan — step-by-step "Your Action Plan" that frames the
 * flow from today → recruiter-ready. Introduces the 7-day streak that
 * follows, and hands off to the ASSAY Hiring Simulation CTA at the end
 * of the report. Ships with one primary CTA (Start Week 1) that anchors
 * to the streak card below, matching the natural flow logic.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  Download,
  FileCheck2,
  Gauge,
  PhoneCall,
  UserRound,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getSevenDayPlan } from "@/data/sevenDayPlans";
import { track } from "@/lib/track";
import { ReportCard } from "../ReportCard";
import { REPORT_TONES } from "../reportTones";
import { ACTION_PLAN_STEP_IDS, useReportState } from "../ReportStateContext";
import { cn } from "@/lib/utils";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { CounsellorScheduler } from "../CounsellorScheduler";

const TONE = REPORT_TONES.primary;
const SECONDARY = REPORT_TONES.secondary;

function formatSlot(iso: string, opts: { includeYear?: boolean; compact?: boolean } = {}) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    weekday: opts.compact ? undefined : "short",
    day: "numeric",
    month: "short",
    year: opts.includeYear ? "numeric" : undefined,
    hour: "numeric",
    minute: "2-digit",
  });
}

type Step = {
  id: (typeof ACTION_PLAN_STEP_IDS)[number];
  week: string;
  title: string;
  detail: string;
  Icon: typeof CalendarCheck2;
};

export function ChapterActionPlan({
  archetype,
  leadId,
  chapter,
}: {
  archetype: ArchetypeId;
  leadId: string | null;
  chapter: number;
}) {
  const plan = getSevenDayPlan(archetype);
  const impressionRef = useRef<HTMLDivElement | null>(null);
  const {
    actionPlanChecks,
    toggleActionStep,
    actionPlanProgress,
    counsellorBooking,
    confirmCounsellorBooking,
    bookingProfile,
    updateBookingProfile,
  } = useReportState();
  const [schedulerOpen, setSchedulerOpen] = useState(false);

  useEffect(() => {
    if (!impressionRef.current || typeof IntersectionObserver === "undefined") return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            track("report_action_plan_view", {
              lead_id: leadId,
              props: { archetype, role: plan.role },
            });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(impressionRef.current);
    return () => io.disconnect();
  }, [archetype, leadId, plan.role]);

  const steps: Step[] = [
    {
      id: "w1",
      week: "Week 1 · Start today",
      title: `Run the 7-day plan for ${plan.role}`,
      detail:
        "One recruiter-visible move per day. Each check earns 15 readiness points and builds a streak on your report.",
      Icon: CalendarCheck2,
    },
    {
      id: "w2",
      week: "Week 2 · Ship proof",
      title: "Publish one artefact a recruiter can open",
      detail:
        "Turn your Week 1 work into a LinkedIn post, mini case study, or GitHub/Notion sample link — the thing you'd send in a cold email.",
      Icon: FileCheck2,
    },
    {
      id: "w3",
      week: "Week 3 · Get a verdict",
      title: "Take the ASSAY Hiring Simulation",
      detail:
        "Timed judgement, written clarity, and a role-specific work sample. You get a recruiter-style verdict — not a personality label.",
      Icon: Gauge,
    },
    {
      id: "w4",
      week: "Week 4 · Convert",
      title: "Book a 15-min counsellor call",
      detail:
        "Bring your streak, your artefact, and your simulation score. We map them to the exact roles you should apply for next.",
      Icon: PhoneCall,
    },
  ];

  const onPrimary = () => {
    track("report_action_plan_start_week1_click", {
      lead_id: leadId,
      props: { archetype, role: plan.role },
    });
  };

  const onLaunchAssay = () => {
    track("report_action_plan_launch_assay_click", {
      lead_id: leadId,
      props: { archetype, role: plan.role, source: "action_plan_chapter" },
    });
  };

  const profile = useMemo(
    () => ({
      name: bookingProfile?.name.trim() ?? "",
      phone: bookingProfile?.phone.trim() ?? "",
      role: (bookingProfile?.role || plan.role).trim(),
    }),
    [bookingProfile, plan.role],
  );

  const nameOk = profile.name.length >= 2;
  const phoneOk = profile.phone.replace(/[^0-9]/g, "").length >= 7;
  const profileReady = nameOk && phoneOk;

  const onOpenScheduler = () => {
    setSchedulerOpen(true);
    track("report_action_plan_counsellor_scheduler_open", {
      lead_id: leadId,
      props: { archetype, role: plan.role },
    });
  };

  const onCounsellorWhatsApp = () => {
    confirmCounsellorBooking({
      slotAt: null,
      via: "whatsapp",
      role: plan.role,
    });
    track("report_action_plan_counsellor_whatsapp_booked", {
      lead_id: leadId,
      props: { archetype, role: plan.role },
    });
  };

  const onDownloadPdf = () => {
    track("report_action_plan_download_pdf_click", {
      lead_id: leadId,
      props: { archetype, role: plan.role, done, total },
    });
    generateActionPlanPdf({
      role: plan.role,
      steps,
      checks: actionPlanChecks,
      done,
      total,
    });
  };

  const onToggleStep = (stepId: string, nowChecked: boolean) => {
    toggleActionStep(stepId);
    track("report_action_plan_step_toggle", {
      lead_id: leadId,
      props: { step_id: stepId, checked: nowChecked, archetype },
    });
  };

  const { done, total } = actionPlanProgress;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const counsellorMessage = useMemo(() => {
    const lines = [
      `Hi Arzon team — I'd like to book a 15-min counsellor call to walk through my Career Fit Report.`,
      profile.name ? `• Name: ${profile.name}` : null,
      profile.phone ? `• Phone: ${profile.phone}` : null,
      `• Target role: ${profile.role}`,
      `• Action plan progress: ${done}/${total} steps complete`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [profile, done, total]);

  return (
    <ReportCard
      id={`ch-${chapter}-action-plan`}
      chapter={chapter}
      eyebrow="Your action plan"
      tone="primary"
      title={
        <>
          From today to recruiter-ready in <span className={TONE.accentText}>four weeks</span>.
        </>
      }
      subtitle="A single sequence — not a to-do list. Each week unlocks the next. Start with Week 1 below; the simulation and counsellor call plug into what you build here."
      whatThisMeans="Follow this one path end-to-end and in four weeks you'll have proof, a simulation score, and a call booked — no guesswork."
    >
      <div ref={impressionRef}>
        {/* Progress header — mirrors the rail badge */}
        <div
          role="status"
          aria-live="polite"
          className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3"
        >
          <span className={cn("font-mono text-overline uppercase tracking-[0.22em]", TONE.eyebrow)}>
            Progress
          </span>
          <span className="font-grotesk text-sm font-bold text-white tabular-nums">
            {done} <span className="text-white/40">/ {total}</span>
          </span>
          <div className="relative h-1.5 min-w-[120px] flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full transition-[width] duration-500",
                TONE.accentBg,
              )}
              style={{ width: `${pct}%` }}
              aria-hidden
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50 tabular-nums">
            {pct}%
          </span>
        </div>

        <ol className="grid gap-3">
          {steps.map((s, i) => (
            <ActionStepRow
              key={s.id}
              step={s}
              index={i}
              checked={Boolean(actionPlanChecks[s.id])}
              onToggle={(next) => onToggleStep(s.id, next)}
            />
          ))}
        </ol>

        <div className={`mt-6 rounded-2xl border ${TONE.chipBorder} ${TONE.chipBg} px-5 py-4`}>
          <p className={`font-mono text-overline uppercase tracking-[0.22em] ${TONE.eyebrow}`}>
            Week 1 · Start today
          </p>
          <p className="mt-1.5 font-grotesk text-base font-bold text-white">
            Your first move is one check on the 7-day plan below.
          </p>
          <p className="mt-1 text-caption text-white/70">
            Day 1 takes about 20 minutes and puts something recruiter-visible on your profile by
            tonight.
          </p>
          <BookingDetailsForm
            profile={profile}
            onChange={updateBookingProfile}
            nameOk={nameOk}
            phoneOk={phoneOk}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#ch-21-streak"
              onClick={onPrimary}
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-full px-6 font-grotesk text-sm font-bold text-slate-900 shadow-[0_18px_50px_-20px_rgba(37,99,235,0.45)] transition hover:brightness-110",
                TONE.accentBg,
              )}
            >
              Start Week 1
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/career-engine"
              onClick={onLaunchAssay}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 font-grotesk text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.12]"
            >
              <Gauge className="h-4 w-4" aria-hidden />
              Launch ASSAY Hiring Simulation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={onDownloadPdf}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 font-grotesk text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.12]"
            >
              <Download className="h-4 w-4" aria-hidden />
              Download plan as PDF
            </button>
            <WhatsAppLink
              message={counsellorMessage}
              source="report_action_plan_counsellor"
              trackProps={{ archetype, role: profile.role, done, total, has_profile: profileReady }}
              onClick={onCounsellorWhatsApp}
              aria-disabled={!profileReady || undefined}
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-full border px-5 font-grotesk text-sm font-semibold transition",
                SECONDARY.chipBorder,
                SECONDARY.chipBg,
                SECONDARY.chipText,
                profileReady ? "hover:brightness-110" : "pointer-events-none opacity-50",
              )}
            >
              <PhoneCall className="h-4 w-4" aria-hidden />
              Chat on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </WhatsAppLink>
            <button
              type="button"
              onClick={onOpenScheduler}
              disabled={!profileReady}
              className={cn(
                "inline-flex h-12 items-center gap-2 rounded-full px-5 font-grotesk text-sm font-bold text-slate-900 transition",
                profileReady
                  ? cn(
                      SECONDARY.accentBg,
                      "shadow-[0_18px_50px_-20px_rgba(52,211,153,0.55)] hover:brightness-110",
                    )
                  : "cursor-not-allowed bg-white/20 text-white/50",
              )}
            >
              <CalendarCheck2 className="h-4 w-4" aria-hidden />
              Book counsellor slot
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          {!profileReady ? (
            <p className="mt-2 text-caption text-white/60">
              Add your name and phone above to send both booking options with your details
              prefilled.
            </p>
          ) : null}
          {counsellorBooking ? (
            <div
              className={cn(
                "mt-4 flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2 text-caption",
                SECONDARY.chipBorder,
                SECONDARY.chipBg,
                SECONDARY.chipText,
              )}
              role="status"
              aria-live="polite"
            >
              <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
              <span className="font-grotesk font-semibold">Counsellor booking confirmed</span>
              <span className="text-white/70">
                {counsellorBooking.slotAt
                  ? `for ${formatSlot(counsellorBooking.slotAt)}`
                  : counsellorBooking.via === "whatsapp"
                    ? "via WhatsApp"
                    : ""}
                {" · logged "}
                {formatSlot(counsellorBooking.bookedAt, { includeYear: false, compact: true })}
              </span>
            </div>
          ) : null}
          <p className="mt-3 text-caption text-white/55">
            Prefer to jump ahead to Week 3? Launch the simulation now — your Week 1 & 2 progress
            stays saved on this report.
          </p>
        </div>
        <CounsellorScheduler
          open={schedulerOpen}
          onOpenChange={setSchedulerOpen}
          role={profile.role}
          initialName={profile.name}
          initialContact={profile.phone}
          archetype={archetype}
          leadId={leadId}
        />
      </div>
    </ReportCard>
  );
}

function BookingDetailsForm({
  profile,
  onChange,
  nameOk,
  phoneOk,
}: {
  profile: { name: string; phone: string; role: string };
  onChange: (patch: { name?: string; phone?: string; role?: string }) => void;
  nameOk: boolean;
  phoneOk: boolean;
}) {
  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2">
        <UserRound className={cn("h-4 w-4", TONE.iconFill)} aria-hidden />
        <p className={cn("font-mono text-overline uppercase tracking-[0.22em]", TONE.eyebrow)}>
          Your details for booking
        </p>
      </div>
      <p className="mt-1 text-caption text-white/60">
        We use these to pre-fill your WhatsApp message and the counsellor slot form. Saved on this
        device only.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Full name
          </span>
          <input
            type="text"
            autoComplete="name"
            value={profile.name}
            onChange={(e) => onChange({ name: e.target.value })}
            maxLength={120}
            aria-invalid={profile.name.length > 0 && !nameOk}
            className="h-10 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
            placeholder="e.g. Priya Sharma"
          />
        </label>
        <label className="block">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Phone (WhatsApp)
          </span>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={profile.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            maxLength={40}
            aria-invalid={profile.phone.length > 0 && !phoneOk}
            className="h-10 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
            placeholder="+91 98…"
          />
        </label>
        <label className="block">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            Target role
          </span>
          <input
            type="text"
            value={profile.role}
            onChange={(e) => onChange({ role: e.target.value })}
            maxLength={160}
            className="h-10 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}

function generateActionPlanPdf({
  role,
  steps,
  checks,
  done,
  total,
}: {
  role: string;
  steps: Step[];
  checks: Record<string, boolean>;
  done: number;
  total: number;
}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const MARGIN = 48;
  let y = MARGIN;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Your 4-Week Action Plan", MARGIN, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text(`Target role: ${role}`, MARGIN, y);
  y += 14;
  const pct = total ? Math.round((done / total) * 100) : 0;
  doc.text(`Progress: ${done} of ${total} steps complete (${pct}%)`, MARGIN, y);
  y += 20;
  doc.setTextColor(0);

  autoTable(doc, {
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    tableWidth: pageW - MARGIN * 2,
    head: [["Done", "Week", "Step", "What to do"]],
    body: steps.map((s) => [checks[s.id] ? "[x]" : "[ ]", s.week, s.title, s.detail]),
    styles: { fontSize: 10, cellPadding: 8, valign: "top" },
    headStyles: { fillColor: [15, 118, 110], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 40, halign: "center" },
      1: { cellWidth: 100 },
      2: { cellWidth: 150, fontStyle: "bold" },
    },
  });

  // @ts-expect-error - autoTable augments doc with lastAutoTable
  y = (doc.lastAutoTable?.finalY ?? y) + 24;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Next actions", MARGIN, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  const ctas = [
    "1. Start Week 1 today — open your report and check off the first day of the 7-day plan.",
    "2. Launch the ASSAY Hiring Simulation to get a recruiter-style verdict on your work sample.",
    "3. Book a 15-min counsellor call once you have your streak, artefact, and simulation score.",
  ];
  for (const line of ctas) {
    const wrapped = doc.splitTextToSize(line, pageW - MARGIN * 2);
    doc.text(wrapped, MARGIN, y);
    y += wrapped.length * 13 + 4;
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text(
      `Arzon Careers · 4-week action plan · Page ${i} of ${pages}`,
      MARGIN,
      doc.internal.pageSize.getHeight() - 24,
    );
  }

  const safe =
    role
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "plan";
  doc.save(`arzon-action-plan-${safe}.pdf`);
}

function ActionStepRow({
  step,
  index,
  checked,
  onToggle,
}: {
  step: Step;
  index: number;
  checked: boolean;
  onToggle: (next: boolean) => void;
}) {
  const labelId = `action-step-${step.id}-title`;
  return (
    <li>
      <label
        htmlFor={`action-step-${step.id}`}
        className={cn(
          "group flex cursor-pointer items-start gap-4 rounded-2xl border px-4 py-3.5 transition",
          checked
            ? cn(TONE.chipBorder, TONE.chipBg)
            : "border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
        )}
      >
        <input
          id={`action-step-${step.id}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => onToggle(e.currentTarget.checked)}
          aria-labelledby={labelId}
          className="sr-only"
        />
        <span
          aria-hidden
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-meta font-bold transition",
            checked
              ? cn(TONE.accentBg, "border-transparent text-slate-900")
              : cn(TONE.chipBorder, TONE.chipBg, TONE.chipText),
          )}
        >
          {checked ? <Check className="h-4 w-4" strokeWidth={3} /> : index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-overline uppercase tracking-[0.18em] text-white/50">
            {step.week}
          </p>
          <p
            id={labelId}
            className={cn(
              "mt-0.5 font-grotesk text-sm font-bold text-white transition",
              checked && "line-through decoration-white/30 decoration-2",
            )}
          >
            {step.title}
          </p>
          <p className="mt-1 text-caption leading-relaxed text-white/65">{step.detail}</p>
        </div>
        <step.Icon
          className={cn("mt-1 hidden h-5 w-5 shrink-0 sm:block", TONE.iconFill)}
          aria-hidden
        />
      </label>
    </li>
  );
}

export default ChapterActionPlan;

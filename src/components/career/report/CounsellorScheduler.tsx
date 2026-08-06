/**
 * CounsellorScheduler - inline slot picker + confirmation for booking a
 * 15-min counsellor call from the report action plan. Persists the
 * request into `counsellor_leads` (public insert policy) with a
 * requested_slot_at + requested_role, and shows a confirmation state
 * with a WhatsApp fallback so the user can also chat immediately.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarCheck2,
  CalendarPlus,
  CalendarClock,
  Check,
  Copy,
  Loader2,
  MessageSquareText,
  PhoneCall,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { REPORT_TONES } from "./reportTones";
import { useReportState } from "./ReportStateContext";
import { formatPhoneInput, looksLikeEmail, validateEmail, validatePhone } from "./bookingContact";

const TONE = REPORT_TONES.secondary;
const ERROR_TONE = REPORT_TONES["ruled-out"];

const SLOTS_PER_DAY: { label: string; hour: number; minute: number }[] = [
  { label: "10:00 AM", hour: 10, minute: 0 },
  { label: "12:30 PM", hour: 12, minute: 30 },
  { label: "3:00 PM", hour: 15, minute: 0 },
  { label: "5:30 PM", hour: 17, minute: 30 },
  { label: "7:00 PM", hour: 19, minute: 0 },
];

type DayOption = { key: string; date: Date; label: string; sub: string };

function buildDays(count = 5): DayOption[] {
  const days: DayOption[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cursor = new Date(today);
  // Start from tomorrow - same-day counsellor slots aren't guaranteed
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    // Skip Sundays
    if (cursor.getDay() !== 0) {
      const d = new Date(cursor);
      days.push({
        key: d.toISOString().slice(0, 10),
        date: d,
        label: d.toLocaleDateString(undefined, { weekday: "short" }),
        sub: d.toLocaleDateString(undefined, { day: "numeric", month: "short" }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

type Status = "idle" | "submitting" | "confirmed" | "error";

// Short, human-readable reference code for the booking, e.g. `ARZ-260705-1030-K3F`.
// Not cryptographically unique - just something the user can paste back to us.
function makeBookingRef(slotAt: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const y = slotAt.getFullYear().toString().slice(-2);
  const stamp = `${y}${pad(slotAt.getMonth() + 1)}${pad(slotAt.getDate())}-${pad(slotAt.getHours())}${pad(slotAt.getMinutes())}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 3; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `ARZ-${stamp}-${suffix}`;
}

// Day key matching buildDays() - uses the UTC ISO date so a rescheduled
// booking maps back to the same visible day chip.
function confirmedAtToDayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Google Calendar template URL - opens a pre-filled "Add event" screen in
// any browser and works on mobile too. `dates` must be a UTC basic-format
// range: YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ.
function buildGoogleCalendarUrl({
  title,
  startAt,
  durationMinutes,
  details,
}: {
  title: string;
  startAt: Date;
  durationMinutes: number;
  details: string;
}): string {
  const toBasic = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const end = new Date(startAt.getTime() + durationMinutes * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toBasic(startAt)}/${toBasic(end)}`,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function CounsellorScheduler({
  open,
  onOpenChange,
  role,
  archetype,
  leadId,
  initialName,
  initialContact,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  role: string;
  archetype: string;
  leadId: string | null;
  initialName?: string;
  initialContact?: string;
}) {
  const { confirmCounsellorBooking } = useReportState();
  const days = useMemo(() => buildDays(5), []);
  const [dayKey, setDayKey] = useState<string>(days[0]?.key ?? "");
  const [slotIdx, setSlotIdx] = useState<number | null>(null);
  const [name, setName] = useState(initialName ?? "");
  const [contact, setContact] = useState(() => {
    const seed = initialContact ?? "";
    return looksLikeEmail(seed) ? seed : formatPhoneInput(seed);
  });
  const [contactTouched, setContactTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedAt, setConfirmedAt] = useState<Date | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  // When set, the picker is running in reschedule mode: the previously
  // confirmed slot is remembered so the WhatsApp handoff can say
  // "reschedule from X to Y" and the primary CTA reads "Confirm new slot".
  const [previousSlot, setPreviousSlot] = useState<Date | null>(null);
  const [previousBookingRef, setPreviousBookingRef] = useState<string | null>(null);
  const isRescheduling = previousSlot !== null && status !== "confirmed";
  // Re-entry guard: React state updates are async, so a rage-click or a
  // "Retry" toast tap can fire submit() twice before `status` flips to
  // "submitting". The ref blocks concurrent inserts atomically so the
  // booking cannot be duplicated in `counsellor_leads`.
  const submittingRef = useRef(false);

  // Sync in any new profile values while the dialog is closed so the
  // action-plan form's edits show up next time the user opens it.
  useEffect(() => {
    if (open) return;
    if (initialName !== undefined) setName(initialName);
    if (initialContact !== undefined) {
      setContact(
        looksLikeEmail(initialContact) ? initialContact : formatPhoneInput(initialContact),
      );
    }
  }, [open, initialName, initialContact]);

  const day = days.find((d) => d.key === dayKey) ?? days[0];

  const contactType: "email" | "phone" = looksLikeEmail(contact) ? "email" : "phone";
  const phoneCheck = contactType === "phone" ? validatePhone(contact) : null;
  const emailCheck = contactType === "email" ? validateEmail(contact) : null;
  const contactValid = contactType === "phone" ? !!phoneCheck?.ok : !!emailCheck?.ok;
  const contactError = contactTouched
    ? contactType === "phone"
      ? (phoneCheck?.error ?? null)
      : (emailCheck?.error ?? null)
    : null;
  // Normalized value used for both persistence and WhatsApp handoff.
  const normalizedContact =
    contactType === "phone" ? (phoneCheck?.e164 ?? contact.trim()) : contact.trim();

  const canSubmit =
    slotIdx !== null && name.trim().length >= 2 && contactValid && status !== "submitting";

  const reset = () => {
    setSlotIdx(null);
    setStatus("idle");
    setErrorMsg(null);
    setConfirmedAt(null);
    setBookingRef(null);
    setPreviousSlot(null);
    setPreviousBookingRef(null);
    submittingRef.current = false;
  };

  const startReschedule = () => {
    if (!confirmedAt) return;
    setPreviousSlot(confirmedAt);
    setPreviousBookingRef(bookingRef);
    setConfirmedAt(null);
    setBookingRef(null);
    setSlotIdx(null);
    setStatus("idle");
    setErrorMsg(null);
    // Default the day picker to the previously chosen day when it's still
    // in the visible window, otherwise fall back to the first available.
    const prevKey = confirmedAtToDayKey(confirmedAt);
    if (days.some((d) => d.key === prevKey)) setDayKey(prevKey);
    track("report_action_plan_counsellor_reschedule_open", {
      lead_id: leadId,
      props: {
        archetype,
        role,
        previous_slot_at: confirmedAt.toISOString(),
      },
    });
  };

  const submit = async () => {
    if (slotIdx === null || !day) return;
    if (submittingRef.current) return;
    submittingRef.current = true;
    const slot = SLOTS_PER_DAY[slotIdx];
    const requestedAt = new Date(day.date);
    requestedAt.setHours(slot.hour, slot.minute, 0, 0);

    setStatus("submitting");
    setErrorMsg(null);

    const { error } = await supabase.from("counsellor_leads").insert({
      name: name.trim().slice(0, 120),
      contact: normalizedContact.slice(0, 200),
      contact_type: contactType,
      source: previousSlot
        ? "report_action_plan_scheduler_reschedule"
        : "report_action_plan_scheduler",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 400) : null,
      requested_slot_at: requestedAt.toISOString(),
      requested_role: role.slice(0, 160),
    });

    if (error) {
      submittingRef.current = false;
      setStatus("error");
      const friendly = previousSlot
        ? "We couldn't save your new slot. Try again, or confirm the change on WhatsApp."
        : "We couldn't save your slot. Try again, or send us the slot on WhatsApp.";
      setErrorMsg(friendly);
      toast.error(friendly, {
        action: {
          label: "Retry",
          onClick: () => {
            void submit();
          },
        },
      });
      track("report_action_plan_counsellor_book_error", {
        lead_id: leadId,
        props: { archetype, role, message: error.message.slice(0, 200) },
      });
      return;
    }

    setConfirmedAt(requestedAt);
    setStatus("confirmed");
    setBookingRef(makeBookingRef(requestedAt));
    submittingRef.current = false;
    track(
      previousSlot
        ? "report_action_plan_counsellor_reschedule_success"
        : "report_action_plan_counsellor_book_success",
      {
        lead_id: leadId,
        props: {
          archetype,
          role,
          slot_at: requestedAt.toISOString(),
          contact_type: contactType,
          previous_slot_at: previousSlot?.toISOString() ?? null,
        },
      },
    );
    // Clear the "rescheduling from" marker now that the new slot is live.
    setPreviousSlot(null);
    setPreviousBookingRef(null);
  };

  // Build the exact message that will be handed off to WhatsApp. Kept in
  // one place so the live preview and the outbound link stay in sync.
  const trimmedName = name.trim();
  const previewContact = contactValid ? normalizedContact : contact.trim();
  const previewSlot: Date | null = confirmedAt
    ? confirmedAt
    : slotIdx !== null && day
      ? (() => {
          const s = SLOTS_PER_DAY[slotIdx];
          const d = new Date(day.date);
          d.setHours(s.hour, s.minute, 0, 0);
          return d;
        })()
      : null;
  const slotLabel = previewSlot
    ? previewSlot.toLocaleString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      })
    : "[pick a day and slot above]";
  const prevSlotLabel = previousSlot
    ? previousSlot.toLocaleString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;
  const opener = confirmedAt
    ? `Hi Arzon team - I just booked a counsellor slot for ${slotLabel}.`
    : previousSlot
      ? `Hi Arzon team - I'd like to reschedule my counsellor call from ${prevSlotLabel} to ${slotLabel}.`
      : `Hi Arzon team - I'd like to book a 15-min counsellor call for ${slotLabel}.`;
  const lines = [
    opener,
    "",
    `Name: ${trimmedName || "[add your name]"}`,
    `${contactType === "email" ? "Email" : "Phone"}: ${previewContact || "[add your phone or email]"}`,
    `Target role: ${role}`,
  ];
  if (confirmedAt) lines.push("", "Please confirm.");
  else if (previousSlot) lines.push("", "Please confirm the new slot.");
  if (confirmedAt && bookingRef) lines.push(`Ref: ${bookingRef}`);
  const confirmationMessage = lines.join("\n");

  // Google Calendar "add event" URL - universally shareable, works on
  // desktop and mobile without downloading anything. Wrapped in
  // try/catch so a bad Date (rare - DST edges, huge strings) doesn't
  // crash render; the UI falls back to hiding the button and toasting.
  const calendarUrl = useMemo(() => {
    if (!confirmedAt) return null;
    try {
      return buildGoogleCalendarUrl({
        title: `Arzon counsellor call · ${role}`,
        startAt: confirmedAt,
        durationMinutes: 15,
        details: [
          `Name: ${trimmedName || "(not provided)"}`,
          `${contactType === "email" ? "Email" : "Phone"}: ${previewContact || "(not provided)"}`,
          `Target role: ${role}`,
          bookingRef ? `Ref: ${bookingRef}` : "",
          "",
          "Confirmed via arzoncareers.in - 15-minute call.",
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch {
      return null;
    }
  }, [confirmedAt, role, trimmedName, contactType, previewContact, bookingRef]);

  // Surface calendar-generation failures once per booking so the user
  // knows why "Add to calendar" is missing and can retry via a copy.
  useEffect(() => {
    if (confirmedAt && !calendarUrl) {
      toast.error("Couldn't build a calendar link.", {
        action: {
          label: "Copy details",
          onClick: () => {
            void copyToClipboard(summaryForClipboard, "summary");
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedAt, calendarUrl]);

  const summaryForClipboard = confirmedAt
    ? [
        "Arzon counsellor call - booking summary",
        `When: ${confirmedAt.toLocaleString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
          hour: "numeric",
          minute: "2-digit",
        })} · 15 min`,
        `Target role: ${role}`,
        `Name: ${trimmedName || "(not provided)"}`,
        `${contactType === "email" ? "Email" : "Phone"}: ${previewContact || "(not provided)"}`,
        bookingRef ? `Ref: ${bookingRef}` : "",
        calendarUrl ? `Add to calendar: ${calendarUrl}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  const copyToClipboard = async (text: string, kind: "summary" | "link") => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("clipboard unavailable");
      }
      toast.success(kind === "summary" ? "Booking details copied" : "Calendar link copied");
      track("report_action_plan_counsellor_copy", {
        lead_id: leadId,
        props: { archetype, role, kind, ref: bookingRef },
      });
    } catch {
      toast.error("Couldn't copy - long-press to copy manually.");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && status === "confirmed" && confirmedAt) {
          confirmCounsellorBooking({
            slotAt: confirmedAt.toISOString(),
            via: "calendar",
            role,
          });
        }
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent className="max-w-lg border-white/10 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle className="font-grotesk text-xl font-bold text-white">
            {status === "confirmed" ? "Slot requested" : "Book a counsellor call"}
          </DialogTitle>
          <DialogDescription className="text-caption text-white/60">
            {status === "confirmed"
              ? "A counsellor will confirm shortly via your contact."
              : "15-minute call. Pick a day and slot that works for you."}
          </DialogDescription>
        </DialogHeader>

        {status === "confirmed" && confirmedAt ? (
          <div className="space-y-4">
            <div
              className={cn(
                "flex items-start gap-3 rounded-2xl border px-4 py-3",
                TONE.chipBorder,
                TONE.chipBg,
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  TONE.accentBg,
                )}
              >
                <Check className="h-4 w-4 text-slate-900" strokeWidth={3} />
              </span>
              <div className="flex-1">
                <p className={cn("font-grotesk text-base font-bold", TONE.chipText)}>
                  {confirmedAt.toLocaleDateString(undefined, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="text-caption text-white/80">
                  {confirmedAt.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })}{" "}
                  · 15 min · target role {role}
                </p>
                <p className="mt-1 text-caption text-white/50">
                  {confirmedAt.toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    timeZoneName: "long",
                  })}
                </p>
                {bookingRef ? (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                    Ref {bookingRef}
                  </p>
                ) : null}
              </div>
            </div>

            <dl className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-caption">
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Name
                </dt>
                <dd className="text-white/90">{trimmedName || "(not provided)"}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {contactType === "email" ? "Email" : "Phone"}
                </dt>
                <dd className="text-white/90">{previewContact || "(not provided)"}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                  Target role
                </dt>
                <dd className="text-white/90">{role}</dd>
              </div>
            </dl>

            <p className="text-caption text-white/60">
              Save this for your reference. A counsellor will confirm shortly on your{" "}
              {contactType === "email" ? "email" : "phone"}.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => copyToClipboard(summaryForClipboard, "summary")}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 font-grotesk text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                <Copy className="h-4 w-4" aria-hidden />
                Copy details
              </button>
              {calendarUrl ? (
                <>
                  <a
                    href={calendarUrl}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() =>
                      track("report_action_plan_counsellor_calendar_open", {
                        lead_id: leadId,
                        props: { archetype, role, ref: bookingRef },
                      })
                    }
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 font-grotesk text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/[0.08]"
                  >
                    <CalendarPlus className="h-4 w-4" aria-hidden />
                    Add to calendar
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(calendarUrl, "link")}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 font-grotesk text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/[0.08]"
                    aria-label="Copy shareable calendar link"
                  >
                    <Copy className="h-4 w-4" aria-hidden />
                    Copy link
                  </button>
                </>
              ) : null}
              <WhatsAppLink
                message={confirmationMessage}
                source="report_action_plan_counsellor_confirm"
                trackProps={{ archetype, role, slot_at: confirmedAt.toISOString() }}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-5 font-grotesk text-sm font-semibold transition hover:brightness-110",
                  TONE.chipBorder,
                  TONE.chipBg,
                  TONE.chipText,
                )}
              >
                <PhoneCall className="h-4 w-4" aria-hidden />
                Confirm on WhatsApp
              </WhatsAppLink>
              <button
                type="button"
                onClick={startReschedule}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 font-grotesk text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                <CalendarClock className="h-4 w-4" aria-hidden />
                Reschedule
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 font-grotesk text-sm font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {isRescheduling && prevSlotLabel ? (
              <div
                className={cn(
                  "flex items-start gap-2 rounded-2xl border px-3 py-2 text-caption",
                  TONE.chipBorder,
                  TONE.chipBg,
                  TONE.chipText,
                )}
                role="status"
              >
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <div className="flex-1">
                  <p className="font-grotesk font-semibold">Rescheduling</p>
                  <p className="text-white/75">
                    Current slot: {prevSlotLabel}. Pick a new day and time - we'll update the
                    counsellor and refresh your WhatsApp message.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Cancel reschedule and restore the previously confirmed slot.
                    const prev = previousSlot!;
                    setPreviousSlot(null);
                    setConfirmedAt(prev);
                    setBookingRef(previousBookingRef ?? makeBookingRef(prev));
                    setPreviousBookingRef(null);
                    setStatus("confirmed");
                  }}
                  className="shrink-0 rounded-full border border-white/20 bg-white/[0.04] px-3 py-1 font-grotesk text-[11px] font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
              </div>
            ) : null}
            <div>
              <p className="mb-2 font-mono text-overline uppercase tracking-[0.22em] text-white/50">
                Choose a day
              </p>
              <div className="flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => {
                      setDayKey(d.key);
                      setSlotIdx(null);
                    }}
                    className={cn(
                      "flex min-w-[68px] flex-col items-center rounded-xl border px-3 py-2 font-grotesk text-sm transition",
                      d.key === dayKey
                        ? cn(TONE.chipBorder, TONE.chipBg, TONE.chipText, "font-bold")
                        : "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/25 hover:bg-white/[0.06]",
                    )}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                      {d.label}
                    </span>
                    <span>{d.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-overline uppercase tracking-[0.22em] text-white/50">
                Choose a slot
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SLOTS_PER_DAY.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setSlotIdx(i)}
                    className={cn(
                      "rounded-xl border px-3 py-2 font-grotesk text-sm transition",
                      slotIdx === i
                        ? cn(TONE.chipBorder, TONE.chipBg, TONE.chipText, "font-bold")
                        : "border-white/10 bg-white/[0.03] text-white/80 hover:border-white/25 hover:bg-white/[0.06]",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-mono text-overline uppercase tracking-[0.22em] text-white/50">
                  Your name
                </span>
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                  placeholder="Full name"
                />
              </label>
              <label className="block">
                <span className="mb-1 block font-mono text-overline uppercase tracking-[0.22em] text-white/50">
                  Phone or email
                </span>
                <input
                  type="text"
                  autoComplete="tel"
                  inputMode={contactType === "phone" ? "tel" : "email"}
                  value={contact}
                  onChange={(e) => {
                    const next = e.target.value;
                    setContact(looksLikeEmail(next) ? next : formatPhoneInput(next));
                  }}
                  onBlur={() => setContactTouched(true)}
                  aria-invalid={contactError ? true : undefined}
                  aria-describedby={contactError ? "counsellor-contact-error" : undefined}
                  className={cn(
                    "h-11 w-full rounded-xl border bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:outline-none",
                    contactError
                      ? cn(ERROR_TONE.chipBorder, "focus:border-current")
                      : "border-white/15 focus:border-white/40",
                  )}
                  placeholder="+91 98… or you@…"
                />
                {contactError ? (
                  <span
                    id="counsellor-contact-error"
                    className={cn("mt-1 block text-caption", ERROR_TONE.chipText)}
                  >
                    {contactError}
                  </span>
                ) : null}
              </label>
            </div>

            {errorMsg ? (
              <div
                className={cn(
                  "flex items-start gap-2 rounded-xl border px-3 py-2 text-caption",
                  ERROR_TONE.chipBorder,
                  ERROR_TONE.chipBg,
                  ERROR_TONE.chipText,
                )}
              >
                <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{errorMsg}</span>
              </div>
            ) : null}

            <div
              className={cn("rounded-2xl border px-4 py-3", TONE.softBorder, TONE.softBg)}
              aria-live="polite"
            >
              <div className="mb-2 flex items-center gap-2">
                <MessageSquareText className={cn("h-3.5 w-3.5", TONE.iconAccent)} aria-hidden />
                <p
                  className={cn(
                    "font-mono text-overline uppercase tracking-[0.22em]",
                    TONE.softEyebrow,
                  )}
                >
                  WhatsApp message preview
                </p>
              </div>
              <pre className="whitespace-pre-wrap break-words font-mono text-caption leading-relaxed text-white/85">
                {confirmationMessage}
              </pre>
              <p className="mt-2 text-caption text-white/50">
                This is the exact message that opens in WhatsApp when you tap “Confirm slot” or
                “Chat on WhatsApp”.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full px-5 font-grotesk text-sm font-bold text-slate-900 transition",
                  canSubmit
                    ? cn(TONE.accentBg, "hover:brightness-110")
                    : "cursor-not-allowed bg-white/20 text-white/50",
                )}
              >
                {status === "submitting" ? (
                  <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden />
                ) : (
                  <CalendarCheck2 className="h-4 w-4" aria-hidden />
                )}
                {isRescheduling ? "Confirm new slot" : "Confirm slot"}
              </button>
              <WhatsAppLink
                message={confirmationMessage}
                source="report_action_plan_counsellor_fallback"
                trackProps={{ archetype, role }}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 font-grotesk text-sm font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/[0.08]"
              >
                <PhoneCall className="h-4 w-4" aria-hidden />
                Or chat on WhatsApp
              </WhatsAppLink>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CounsellorScheduler;

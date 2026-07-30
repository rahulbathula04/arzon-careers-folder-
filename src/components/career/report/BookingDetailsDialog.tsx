/**
 * BookingDetailsDialog - quick editor for the saved booking profile
 * (name, WhatsApp phone, target role). Persists into ReportStateContext
 * via `updateBookingProfile`, so the action-plan form, the WhatsApp
 * message preview, and the CounsellorScheduler prefills all refresh
 * automatically the next time they read from the store.
 *
 * Rendered from the sticky rail so the user can update their handoff
 * details from anywhere in the report, not just the action-plan card.
 */
import { useEffect, useState } from "react";
import { Check, UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { REPORT_TONES } from "./reportTones";
import { useReportState } from "./ReportStateContext";
import { formatPhoneInput, validatePhone } from "./bookingContact";

const TONE = REPORT_TONES.secondary;
const ERROR_TONE = REPORT_TONES["ruled-out"];

export function BookingDetailsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const { bookingProfile, updateBookingProfile } = useReportState();
  const [name, setName] = useState(bookingProfile?.name ?? "");
  const [phone, setPhone] = useState(() =>
    bookingProfile?.phone ? formatPhoneInput(bookingProfile.phone) : "",
  );
  const [role, setRole] = useState(bookingProfile?.role ?? "");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [saved, setSaved] = useState(false);

  // Rehydrate whenever the dialog is (re)opened so the fields always
  // reflect the latest saved profile.
  useEffect(() => {
    if (!open) return;
    setName(bookingProfile?.name ?? "");
    setPhone(bookingProfile?.phone ? formatPhoneInput(bookingProfile.phone) : "");
    setRole(bookingProfile?.role ?? "");
    setPhoneTouched(false);
    setSaved(false);
  }, [open, bookingProfile]);

  const phoneCheck = validatePhone(phone);
  const phoneEmpty = !phone.trim();
  const phoneError = phoneTouched && !phoneEmpty ? phoneCheck.error : null;
  const nameOk = name.trim().length >= 2;
  const canSave = nameOk && (phoneEmpty || phoneCheck.ok);

  const onSave = () => {
    if (!canSave) return;
    const nextPhone = phoneEmpty ? "" : phoneCheck.e164;
    updateBookingProfile({
      name: name.trim(),
      phone: nextPhone,
      role: role.trim(),
    });
    track("report_booking_profile_edit_save", {
      lead_id: null,
      props: {
        source: "sticky_rail",
        has_name: nameOk,
        has_phone: !phoneEmpty,
        has_role: role.trim().length > 0,
      },
    });
    setSaved(true);
    window.setTimeout(() => onOpenChange(false), 400);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-white/10 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-grotesk text-lg font-bold text-white">
            <UserRound className={cn("h-4 w-4", TONE.iconAccent)} aria-hidden />
            Edit booking details
          </DialogTitle>
          <DialogDescription className="text-caption text-white/60">
            Changes are saved on this device and prefill the WhatsApp message and counsellor slot
            form automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <label className="block">
            <span className="mb-1 block font-mono text-overline uppercase tracking-[0.22em] text-white/50">
              Full name
            </span>
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
              placeholder="e.g. Priya Sharma"
            />
          </label>

          <label className="block">
            <span className="mb-1 block font-mono text-overline uppercase tracking-[0.22em] text-white/50">
              Phone (WhatsApp)
            </span>
            <input
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              onBlur={() => setPhoneTouched(true)}
              maxLength={40}
              aria-invalid={phoneError ? true : undefined}
              aria-describedby={phoneError ? "booking-phone-error" : undefined}
              className={cn(
                "h-11 w-full rounded-xl border bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:outline-none",
                phoneError
                  ? cn(ERROR_TONE.chipBorder, "focus:border-current")
                  : "border-white/15 focus:border-white/40",
              )}
              placeholder="+91 98…"
            />
            {phoneError ? (
              <span
                id="booking-phone-error"
                className={cn("mt-1 block text-caption", ERROR_TONE.chipText)}
              >
                {phoneError}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-1 block font-mono text-overline uppercase tracking-[0.22em] text-white/50">
              Target role
            </span>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              maxLength={160}
              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 font-grotesk text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
              placeholder="e.g. Clinical Research Associate"
            />
          </label>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-11 items-center rounded-full border border-white/20 bg-white/[0.04] px-5 font-grotesk text-sm font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/[0.08]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 font-grotesk text-sm font-bold text-slate-900 transition",
              canSave
                ? cn(TONE.accentBg, "hover:brightness-110")
                : "cursor-not-allowed bg-white/20 text-white/50",
            )}
          >
            {saved ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : null}
            {saved ? "Saved" : "Save details"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookingDetailsDialog;

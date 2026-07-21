/**
 * Shared phone/email formatting + validation helpers for the booking flow.
 * Used by CounsellorScheduler and the sticky-rail booking-details editor
 * so every surface that captures a phone number applies the same rules.
 */

// Treat the input as an email as soon as it contains "@" or a letter that
// isn't part of a leading country-code prefix. Everything else is a phone.
export function looksLikeEmail(value: string): boolean {
  if (value.includes("@")) return true;
  return /[A-Za-z]/.test(value);
}

// Format a phone input as the user types. Defaults to +91 (India) when no
// country code is present, groups the national number as `XXXXX XXXXX`,
// and caps the national part at 10 digits (the common Indian mobile length).
export function formatPhoneInput(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return hasPlus ? "+" : "";

  let cc = "";
  let national = "";
  if (hasPlus) {
    if (digits.startsWith("91")) {
      cc = "91";
      national = digits.slice(2);
    } else if (digits.startsWith("1")) {
      cc = "1";
      national = digits.slice(1);
    } else {
      const guess = Math.min(3, digits.length);
      cc = digits.slice(0, guess);
      national = digits.slice(guess);
    }
  } else if (digits.startsWith("91") && digits.length > 10) {
    cc = "91";
    national = digits.slice(2);
  } else {
    cc = "91";
    national = digits;
  }

  const maxNational = cc === "91" ? 10 : 12;
  national = national.slice(0, maxNational);

  if (!national) return `+${cc}`;
  const grouped = national.length > 5 ? `${national.slice(0, 5)} ${national.slice(5)}` : national;
  return `+${cc} ${grouped}`;
}

export function validatePhone(value: string): { ok: boolean; e164: string; error: string | null } {
  if (!value.trim())
    return { ok: false, e164: "", error: "Add a phone number so we can call you back." };
  if (!value.trim().startsWith("+"))
    return { ok: false, e164: "", error: "Include a country code, e.g. +91." };
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return { ok: false, e164: "", error: "That number looks incomplete." };
  if (digits.length > 15) return { ok: false, e164: "", error: "Phone number is too long." };
  if (digits.startsWith("91") && digits.length !== 12)
    return { ok: false, e164: "", error: "Indian mobile numbers need 10 digits after +91." };
  return { ok: true, e164: `+${digits}`, error: null };
}

export function validateEmail(value: string): { ok: boolean; error: string | null } {
  const v = value.trim();
  if (!v) return { ok: false, error: "Add an email address so we can reach you." };
  if (v.length > 254) return { ok: false, error: "Email address is too long." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return { ok: false, error: "That email address doesn't look right." };
  return { ok: true, error: null };
}

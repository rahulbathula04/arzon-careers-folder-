/**
 * Minimal iCalendar (RFC 5545) generator for the 30/60/90 execution plan.
 * Pure client - creates a Blob URL the browser can download without any
 * server round-trip.
 */

export interface IcsEvent {
  uid: string;
  title: string;
  description: string;
  /** Local date in YYYY-MM-DD */
  date: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function fmt(d: Date) {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
}

function escapeIcsText(v: string) {
  return v.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

export function buildIcs(calendarName: string, events: IcsEvent[]): string {
  const now = fmt(new Date());
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Arzon Global//Career Fit Report//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText(calendarName)}`,
  ];
  for (const e of events) {
    const start = new Date(`${e.date}T09:00:00Z`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.uid}@arzonglobal.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${escapeIcsText(e.title)}`,
      `DESCRIPTION:${escapeIcsText(e.description)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(filename: string, ics: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Date helper - Monday of the week `n` weeks from today, local time,
 * returned as YYYY-MM-DD.
 */
export function nextMondayInWeeks(weeks: number, base: Date = new Date()): string {
  const d = new Date(base);
  const day = d.getDay(); // 0 sun .. 6 sat
  const daysToMonday = (8 - day) % 7 || 7;
  d.setDate(d.getDate() + daysToMonday + (weeks - 1) * 7);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

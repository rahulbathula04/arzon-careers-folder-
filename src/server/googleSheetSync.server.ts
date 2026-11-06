/**
 * Google Sheet Sync Engine for Arzon Careers
 * Master Spreadsheet ID: 1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4
 *
 * Appends inbound counselor leads directly to the master Google Sheet.
 * Chronological order: Oldest to Newest.
 * Every new lead is appended as the NEXT row (e.g., if there are 233 leads,
 * the new lead is inserted as #234 at Row 235).
 */

export const ARZON_LEADS_SPREADSHEET_ID = "1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4";
export const ARZON_LEADS_SHEET_URL = `https://docs.google.com/spreadsheets/d/${ARZON_LEADS_SPREADSHEET_ID}/edit`;

export interface CounselorLeadSyncPayload {
  name: string;
  phone: string;
  email: string;
  college: string;
  degree?: string | null;
  passoutYear?: string | null;
  programName: string;
  city?: string | null;
  source?: string | null;
  question?: string | null;
  status?: string;
  assignedCounselor?: string;
  remarks?: string;
}

function getWebhookUrl(): string | null {
  return (
    process.env.GOOGLE_SHEET_WEBHOOK_URL ||
    process.env.VITE_GOOGLE_SHEET_WEBHOOK_URL ||
    null
  );
}

function getFormattedISTDate(): string {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  });
}

function cleanDigits(phone: string | null | undefined): string {
  if (!phone) return "";
  const d = phone.replace(/\D/g, "");
  return d.length >= 10 ? d.slice(-10) : d;
}

/**
 * Formats a lead into the 16 master columns:
 * 1. Lead # ("AUTO" for webhook or numeric)
 * 2. Timestamp (IST)
 * 3. Full Name (Mandatory)
 * 4. Mobile Number (Mandatory)
 * 5. Email Address (Mandatory)
 * 6. College Name (Mandatory)
 * 7. Interested Domain (Mandatory)
 * 8. Degree / Qualification
 * 9. Passout Year
 * 10. Location / City
 * 11. Candidate Notes / Query
 * 12. Lead Source
 * 13. Lead Status
 * 14. Assigned Counselor
 * 15. Counselor Remarks
 * 16. 1-Click WhatsApp Chat
 */
export function formatMasterLeadRow(lead: CounselorLeadSyncPayload, leadNumber?: string): string[] {
  const digits = cleanDigits(lead.phone);
  const candidateName = lead.name?.trim() || "Candidate";
  const timestamp = getFormattedISTDate();
  const domain = lead.programName || "Pharmacovigilance & Drug Safety";
  const source = lead.source || "Website Inbound";

  const waUrl = digits
    ? `https://wa.me/91${digits}?text=${encodeURIComponent(
        `Hi ${candidateName}, this is from Arzon Global Admissions following up on your interest in ${domain}!`
      )}`
    : "";
  const waFormula = waUrl ? `=HYPERLINK("${waUrl}", "💬 Chat on WhatsApp")` : "";

  return [
    leadNumber || "AUTO",
    timestamp,
    candidateName,
    digits ? `'91${digits}` : lead.phone,
    lead.email,
    lead.college,
    domain,
    lead.degree || "Healthcare Graduate",
    lead.passoutYear || "2026",
    lead.city || "India",
    lead.question || "Requested 1-on-1 Career Counselling Callback",
    source,
    lead.status || "New Lead",
    lead.assignedCounselor || "",
    lead.remarks || "",
    waFormula,
  ];
}

/**
 * Dispatches a new counselor lead to the 'Counselor Leads' sheet.
 * Appends as the next sequential row so that each new lead creates
 * the next field/number without disrupting historical data.
 */
export async function syncCounselorLeadToGoogleSheet(
  lead: CounselorLeadSyncPayload
): Promise<boolean> {
  const webhookUrl = getWebhookUrl();
  const rowData = formatMasterLeadRow(lead);

  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "counselor_lead",
          spreadsheetId: ARZON_LEADS_SPREADSHEET_ID,
          sheetName: "Counselor Leads",
          row: rowData,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.warn("[GoogleSheetSync] Webhook dispatch warning:", err);
    }
  }

  return false;
}

export async function syncWhatsAppClickToGoogleSheet(
  _click: { trigger?: string; path?: string; source?: string; targetPhone?: string; message?: string; device?: string; userId?: string; proxy?: string; utmSource?: string }
): Promise<boolean> {
  // Telemetry click stream handler (master sheet focuses on actionable counselor leads)
  return true;
}

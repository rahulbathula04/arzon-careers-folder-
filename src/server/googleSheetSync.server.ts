/**
 * Google Sheet Sync Engine for Arzon Careers
 * Master Spreadsheet ID: 1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4
 *
 * Appends inbound counselor leads and WhatsApp click streams directly
 * to Google Sheets so counselors and sales specialists never miss a lead.
 */

export const ARZON_LEADS_SPREADSHEET_ID = "1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4";
export const ARZON_LEADS_SHEET_URL = `https://docs.google.com/spreadsheets/d/${ARZON_LEADS_SPREADSHEET_ID}/edit`;

export interface CounselorLeadSyncPayload {
  name: string;
  phone: string;
  email?: string | null;
  degree?: string | null;
  passoutYear?: string | null;
  programName?: string | null;
  source?: string | null;
  question?: string | null;
  status?: string;
  assignedCounselor?: string;
  remarks?: string;
}

export interface WhatsAppClickSyncPayload {
  trigger?: string;
  path?: string;
  source?: string;
  targetPhone?: string;
  message?: string;
  device?: string;
  userId?: string;
  proxy?: string;
  utmSource?: string;
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
 * Dispatches an actionable counselor lead to the 'Counselor Leads' tab.
 * Uses fire-and-forget async execution so candidate flow is never delayed.
 */
export async function syncCounselorLeadToGoogleSheet(
  lead: CounselorLeadSyncPayload
): Promise<boolean> {
  const webhookUrl = getWebhookUrl();
  const digits = cleanDigits(lead.phone);
  const candidateName = lead.name?.trim() || "Candidate";
  const timestamp = getFormattedISTDate();
  const role = lead.programName || "Career Counselling";
  const source = lead.source || "Website Counsellor CTA";
  const waUrl = digits
    ? `https://wa.me/91${digits}?text=${encodeURIComponent(
        `Hi ${candidateName}, following up on your Arzon career guidance request for ${role}!`
      )}`
    : "";
  const waFormula = waUrl ? `=HYPERLINK("${waUrl}", "Chat on WhatsApp")` : "";

  const rowData = [
    timestamp,
    candidateName,
    digits ? `'91${digits}` : lead.phone,
    lead.email || "",
    lead.degree || "",
    lead.passoutYear || "",
    role,
    source,
    lead.question || "Direct Inbound Request",
    lead.status || "New Lead",
    lead.assignedCounselor || "",
    lead.remarks || "",
    waFormula,
  ];

  if (!webhookUrl) {
    // If webhook isn't configured yet, log safely to server output
    console.log("[GoogleSheetSync] Pending sync (webhook URL not configured in env):", {
      candidateName,
      phone: digits,
      source,
    });
    return false;
  }

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

    if (!res.ok) {
      console.warn("[GoogleSheetSync] Webhook response not ok:", res.status, res.statusText);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[GoogleSheetSync] Webhook dispatch notice:", err);
    return false;
  }
}

/**
 * Dispatches WhatsApp click telemetry to the 'WhatsApp Click Stream' tab.
 */
export async function syncWhatsAppClickToGoogleSheet(
  click: WhatsAppClickSyncPayload
): Promise<boolean> {
  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) return false;

  const timestamp = getFormattedISTDate();
  const rowData = [
    timestamp,
    click.trigger || "whatsapp_click",
    click.path || "/",
    click.source || "wa_link",
    click.targetPhone || "918977626999",
    click.message || "Direct WhatsApp CTA",
    click.device || "",
    click.userId || "",
    click.proxy || "click",
    click.utmSource || "",
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "whatsapp_click",
        spreadsheetId: ARZON_LEADS_SPREADSHEET_ID,
        sheetName: "WhatsApp Click Stream",
        row: rowData,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return true;
  } catch {
    // Telemetry errors must never propagate
    return false;
  }
}

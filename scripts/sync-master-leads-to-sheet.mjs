import { createClient } from "@supabase/supabase-js";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const SPREADSHEET_ID = "1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4";

const env = fs.readFileSync(".env", "utf8");
const get = (k) => {
  const m = env.match(new RegExp(`^${k}="?([^"\\r\\n]+)"?`, "m"));
  return m ? m[1] : null;
};

const sb = createClient(get("SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"));

function cleanDigits(phone) {
  if (!phone) return "";
  const d = String(phone).replace(/\D/g, "");
  return d.length >= 10 ? d.slice(-10) : d;
}

function toIST(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
}

function sanitizeCell(val, fallback = "") {
  const raw = String(val ?? fallback).trim();
  if (!raw) return fallback;
  return /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
}

async function main() {
  console.log("1. Fetching all leads across Supabase tables...");
  const [clRes, ceRes, appRes] = await Promise.all([
    sb.from("counsellor_leads").select("*").order("created_at", { ascending: true }),
    sb.from("career_engine_leads").select("*").order("created_at", { ascending: true }),
    sb.from("applications").select("*").order("created_at", { ascending: true }),
  ]);

  const apps = appRes.data || [];
  const clLeads = clRes.data || [];
  const ceLeads = ceRes.data || [];

  console.log(`Fetched ${apps.length} applications, ${clLeads.length} counsellor_leads, ${ceLeads.length} career_engine_leads.`);

  // Map apps by phone for cross-enrichment
  const appByPhone = new Map();
  for (const a of apps) {
    const d = cleanDigits(a.phone);
    if (d && !appByPhone.has(d)) appByPhone.set(d, a);
  }

  const unified = [];

  // 1. Applications
  for (const a of apps) {
    const digits = cleanDigits(a.phone);
    unified.push({
      created_at: new Date(a.created_at).getTime(),
      timestampStr: toIST(a.created_at),
      name: sanitizeCell(a.name, "Candidate"),
      phoneDigits: digits,
      phoneDisplay: digits ? `'91${digits}` : sanitizeCell(a.phone),
      email: sanitizeCell(a.email),
      college: sanitizeCell(a.college, "College of Pharmacy / Life Sciences"),
      domain: sanitizeCell(a.program_name || a.program_slug, "Pharmacovigilance & Drug Safety"),
      degree: sanitizeCell(a.degree, "B.Pharm / Life Sciences"),
      year: sanitizeCell(a.graduation_year, "2026"),
      city: sanitizeCell(a.city, "India"),
      query: sanitizeCell(a.notes || a.remarks, "Admissions Application"),
      source: sanitizeCell(a.source || a.utm_source, "application_portal"),
      status: sanitizeCell(a.status, "New Lead"),
      assigned: sanitizeCell(a.assigned_counselor),
      remarks: sanitizeCell(a.remarks),
    });
  }

  // 2. Counsellor Leads
  for (const cl of clLeads) {
    const digits = cleanDigits(cl.contact);
    const enriched = digits ? appByPhone.get(digits) : null;
    unified.push({
      created_at: new Date(cl.created_at).getTime(),
      timestampStr: toIST(cl.created_at),
      name: sanitizeCell(cl.name, "Candidate"),
      phoneDigits: digits,
      phoneDisplay: digits ? `'91${digits}` : sanitizeCell(cl.contact),
      email: sanitizeCell(enriched?.email),
      college: sanitizeCell(enriched?.college, "Inbound Lead"),
      domain: sanitizeCell(cl.requested_role, "Career Guidance Callback"),
      degree: sanitizeCell(enriched?.degree, "Healthcare Graduate"),
      year: sanitizeCell(enriched?.graduation_year, "2026"),
      city: sanitizeCell(enriched?.city, "India"),
      query: "Requested 1-on-1 Career Guidance Callback",
      source: sanitizeCell(cl.source, "Website Counsellor CTA"),
      status: cl.contacted_at ? "Contacted - Call Scheduled" : "New Lead",
      assigned: sanitizeCell(cl.contacted_by),
      remarks: "",
    });
  }

  // 3. Career Engine Leads
  for (const ce of ceLeads) {
    const digits = cleanDigits(ce.phone);
    const enriched = digits ? appByPhone.get(digits) : null;
    const rp = ce.result_payload || {};
    const prof = rp.profile || {};
    const college = prof.college || prof.college_name || enriched?.college || "Admissions Candidate";
    const degree = prof.qualification || prof.degree || prof.course || enriched?.degree || "Healthcare Graduate";
    const year = prof.graduationYear || prof.year || enriched?.graduation_year || "2026";
    const domain = ce.archetype
      ? `Career Engine: ${ce.archetype.replace(/_/g, " ").toUpperCase()}`
      : (prof.targetRole || "Drug Safety Associate");

    let queryNotes = "Diagnostic Assessment Started";
    if (ce.fit_score != null) {
      queryNotes = `Assessment Fit Score: ${ce.fit_score}%`;
    }
    const antiCheat = rp.anti_cheat;
    if (antiCheat?.disqualified || (antiCheat?.tabSwitches ?? 0) >= 3) {
      queryNotes = `🚨 FAILED: CHEATING DETECTED (Strike 3) · Fit Score: 0%`;
    }

    unified.push({
      created_at: new Date(ce.created_at).getTime(),
      timestampStr: toIST(ce.created_at),
      name: sanitizeCell(ce.name, "Candidate"),
      phoneDigits: digits,
      phoneDisplay: digits ? `'91${digits}` : sanitizeCell(ce.phone),
      email: sanitizeCell(ce.email),
      college: sanitizeCell(college, "Admissions Candidate"),
      domain: sanitizeCell(domain, "Drug Safety Associate"),
      degree: sanitizeCell(degree, "Healthcare Graduate"),
      year: sanitizeCell(year, "2026"),
      city: sanitizeCell(enriched?.city, "India"),
      query: sanitizeCell(queryNotes),
      source: "Career Engine Diagnostic",
      status: ce.contacted_at ? "Contacted" : "New Lead",
      assigned: sanitizeCell(ce.contacted_by),
      remarks: ce.whatsapp_optin ? "WhatsApp Opted In" : "",
    });
  }

  // Sort strictly chronologically from oldest to newest
  unified.sort((a, b) => a.created_at - b.created_at);

  // Deduplicate entries that share the exact same phone on the same calendar day
  const finalLeads = [];
  const seen = new Map();

  for (const item of unified) {
    const key = `${item.phoneDigits || item.email}_${Math.floor(item.created_at / (1000 * 60 * 60 * 24))}`;
    if (!item.phoneDigits && !item.email) {
      finalLeads.push(item);
      continue;
    }
    if (seen.has(key)) {
      const existing = seen.get(key);
      if (item.query && item.query.includes("Score")) {
        existing.query = `${existing.query} · ${item.query}`;
      }
      if (item.college && item.college !== "Admissions Candidate" && existing.college === "Admissions Candidate") {
        existing.college = item.college;
      }
      if (item.degree && item.degree !== "Healthcare Graduate" && existing.degree === "Healthcare Graduate") {
        existing.degree = item.degree;
      }
      continue;
    }
    seen.set(key, item);
    finalLeads.push(item);
  }

  console.log(`\n2. Prepared ${finalLeads.length} unique, sequential leads chronologically.`);

  // Format into exact 16 columns matching Master Sheet schema
  const header = [
    "Lead #",
    "Timestamp (IST)",
    "Full Name (Mandatory)",
    "Mobile Number (Mandatory)",
    "Email Address (Mandatory)",
    "College Name (Mandatory)",
    "Interested Domain (Mandatory)",
    "Degree / Qualification",
    "Passout Year",
    "Location / City",
    "Candidate Notes / Query",
    "Lead Source",
    "Lead Status",
    "Assigned Counselor",
    "Counselor Remarks",
    "1-Click WhatsApp Chat",
  ];

  const rows = [header];

  finalLeads.forEach((lead, index) => {
    const leadNumber = `#${index + 1}`;
    const waUrl = lead.phoneDigits
      ? `https://wa.me/91${lead.phoneDigits}?text=${encodeURIComponent(
          `Hi ${lead.name}, this is from Arzon Global Admissions regarding your interest in ${lead.domain}!`
        )}`
      : "";
    const waFormula = waUrl ? `=HYPERLINK("${waUrl}", "💬 Chat on WhatsApp")` : "";

    rows.push([
      leadNumber,
      lead.timestampStr,
      lead.name,
      lead.phoneDisplay,
      lead.email,
      lead.college,
      lead.domain,
      lead.degree,
      lead.year,
      lead.city,
      lead.query,
      lead.source,
      lead.status,
      lead.assigned,
      lead.remarks,
      waFormula,
    ]);
  });

  console.log(`Total rows including header: ${rows.length}`);
  console.log(`Writing to Google Sheet: ${SPREADSHEET_ID}...`);

  const batchFile = path.resolve("./scratch-master-sync.json");
  const batchPayload = [
    {
      op: "write",
      range: `'Counselor Leads'!A1:P${rows.length}`,
      data: rows,
    },
  ];

  fs.writeFileSync(batchFile, JSON.stringify(batchPayload, null, 2), "utf8");

  try {
    const result = execSync(`gsheets mutate batch ${SPREADSHEET_ID} -f "${batchFile}"`, { encoding: "utf8" });
    console.log("gsheets batch result:", result);
  } finally {
    if (fs.existsSync(batchFile)) fs.unlinkSync(batchFile);
  }

  console.log("✅ Successfully synced all leads to Google Sheet!");
}

main().catch(console.error);

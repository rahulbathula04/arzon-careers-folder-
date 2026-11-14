import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const SPREADSHEET_ID = "1XTwCZ_vetdPbVZGse3HK3oBdptHk8TRtzRfZyshO0J4";

const envText = fs.readFileSync(".env", "utf8");
function getEnv(key) {
  const match = envText.match(new RegExp(`^${key}="?([^"\\r\\n]+)"?`, "m"));
  return match ? match[1] : null;
}

const url = getEnv("SUPABASE_URL") || getEnv("VITE_SUPABASE_URL");
const key = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("SUPABASE_PUBLISHABLE_KEY");
const sb = createClient(url, key);

function toIST(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: true });
}

function cleanDigits(phone) {
  if (!phone) return "";
  const d = String(phone).replace(/\D/g, "");
  return d.length >= 10 ? d.slice(-10) : d;
}

function sanitizeSheetCell(value, fallback = "") {
  const raw = String(value ?? fallback).trim();
  if (!raw) return fallback;
  return /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
}

async function run() {
  console.log("Reading existing Google Sheet rows to determine next Lead # & dedupe set...");
  const existingJson = execSync(
    `gsheets readonly read ${SPREADSHEET_ID} "'Counselor Leads'!A2:D5000" --json`,
    { encoding: "utf8" },
  );
  const parsed = JSON.parse(existingJson);
  const sheetRows = Array.isArray(parsed?.values) ? parsed.values : Array.isArray(parsed) ? parsed : [];

  let maxNum = 0;
  const existingKeys = new Set();

  for (const r of sheetRows) {
    const idToken = String(r[0] || "");
    const numMatch = idToken.match(/\d+/);
    if (numMatch) {
      const n = Number.parseInt(numMatch[0], 10);
      if (n > maxNum) maxNum = n;
    }
    const ts = String(r[1] || "");
    const phone = cleanDigits(r[3] || "");
    const dateMatch = ts.match(/^(\d{1,2}\/\d{1,2}\/\d{4})/);
    if (phone && dateMatch) {
      existingKeys.add(`${phone}-${dateMatch[1]}`);
    }
  }

  console.log(`Found ${sheetRows.length} existing rows (highest Lead #${maxNum}).`);

  const sinceIso = "2026-11-06T00:00:00.000Z";
  const [appsRes, ceRes, clRes] = await Promise.all([
    sb
      .from("applications")
      .select("id, created_at, name, email, phone, program_name, notes, status, utm_source")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true }),
    sb
      .from("career_engine_leads")
      .select("id, created_at, name, email, phone, archetype, fit_score, contacted_at")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true }),
    sb
      .from("counsellor_leads")
      .select("id, created_at, name, contact, requested_role, source, contacted_at")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true }),
  ]);

  const items = [];

  for (const a of appsRes.data || []) {
    const d = cleanDigits(a.phone);
    if (!d) continue;
    let college = "";
    let degree = "";
    let notesText = "";
    if (a.notes) {
      try {
        const obj = JSON.parse(a.notes);
        if (obj.college) college = obj.college;
        if (obj.degree) degree = obj.degree;
        if (obj.user_notes) notesText = obj.user_notes;
      } catch {
        notesText = a.notes;
      }
    }
    items.push({
      created_at: a.created_at,
      name: a.name || "Candidate",
      phone: d,
      email: a.email || `${d}@candidate.arzoncareers.in`,
      college: college || "College of Pharmacy / Life Sciences",
      domain: a.program_name || "Healthcare Career Program",
      degree: degree || "Healthcare Graduate",
      passoutYear: "2026",
      city: "India",
      notes: notesText || "Admissions Application",
      source: a.utm_source || "Application Portal",
      status: a.status === "enrolled" ? "Enrolled" : "New Lead",
    });
  }

  for (const c of ceRes.data || []) {
    const d = cleanDigits(c.phone);
    if (!d) continue;
    const domain = c.archetype
      ? c.archetype.replace(/_/g, " ").toUpperCase()
      : "Career Fit Assessment";
    items.push({
      created_at: c.created_at,
      name: c.name || "Candidate",
      phone: d,
      email: c.email || `${d}@candidate.arzoncareers.in`,
      college: "Pharmacy / Medical College",
      domain,
      degree: "Healthcare Graduate",
      passoutYear: "2026",
      city: "India",
      notes: c.fit_score != null ? `Assessment Fit Score: ${c.fit_score}%` : "Career Fit Assessment",
      source: "Career Engine",
      status: c.contacted_at ? "Contacted - Call Scheduled" : "New Lead",
    });
  }

  for (const cl of clRes.data || []) {
    const d = cleanDigits(cl.contact);
    if (!d) continue;
    items.push({
      created_at: cl.created_at,
      name: cl.name || "WhatsApp Direct Lead",
      phone: d,
      email: `${d}@whatsapp.arzoncareers.in`,
      college: "Direct WhatsApp / Counsellor CTA",
      domain: cl.requested_role || "Healthcare Career Guidance",
      degree: "Healthcare Graduate",
      passoutYear: "2026",
      city: "India",
      notes: "Requested 1-on-1 Career Counselling Callback",
      source: cl.source || "Website Counsellor CTA",
      status: cl.contacted_at ? "Contacted - Call Scheduled" : "New Lead",
    });
  }

  items.sort((x, y) => new Date(x.created_at).getTime() - new Date(y.created_at).getTime());

  const toAppend = [];
  for (const item of items) {
    const ist = toIST(item.created_at);
    const datePartMatch = ist.match(/^(\d{1,2}\/\d{1,2}\/\d{4})/);
    const dateKey = datePartMatch ? `${item.phone}-${datePartMatch[1]}` : `${item.phone}-${ist}`;
    if (existingKeys.has(dateKey)) continue;
    existingKeys.add(dateKey);
    toAppend.push(item);
  }

  if (toAppend.length === 0) {
    console.log("Sheet is already 100% up-to-date. Zero missing leads.");
    return;
  }

  console.log(`Found ${toAppend.length} missing leads to append starting at #${maxNum + 1}...`);

  const rows = toAppend.map((item, idx) => {
    const leadNum = `#${maxNum + 1 + idx}`;
    const safeName = sanitizeSheetCell(item.name, "Candidate");
    const safeDomain = sanitizeSheetCell(item.domain, "Healthcare Career Guidance");
    const waUrl = `https://wa.me/91${item.phone}?text=${encodeURIComponent(
      `Hi ${safeName}, this is from Arzon Global Admissions following up on your interest in ${safeDomain}!`,
    )}`;
    const waFormula = `=HYPERLINK("${waUrl}", "💬 Chat on WhatsApp")`;

    return [
      leadNum,
      toIST(item.created_at),
      safeName,
      `'91${item.phone}`,
      sanitizeSheetCell(item.email),
      sanitizeSheetCell(item.college),
      safeDomain,
      sanitizeSheetCell(item.degree),
      sanitizeSheetCell(item.passoutYear, "2026"),
      sanitizeSheetCell(item.city, "India"),
      sanitizeSheetCell(item.notes),
      sanitizeSheetCell(item.source),
      sanitizeSheetCell(item.status, "New Lead"),
      "",
      "",
      waFormula,
    ];
  });

  const startRow = 2 + sheetRows.length;
  const endRow = startRow + rows.length - 1;
  const targetRange = `'Counselor Leads'!A${startRow}:P${endRow}`;

  const batchFile = path.resolve("./scratch-sync-missing.json");
  fs.writeFileSync(
    batchFile,
    JSON.stringify([{ op: "write", range: targetRange, data: rows }], null, 2),
    "utf8",
  );

  try {
    const result = execSync(`gsheets mutate batch ${SPREADSHEET_ID} -f "${batchFile}"`, {
      encoding: "utf8",
    });
    console.log(`Written to ${targetRange}:`, result);
  } finally {
    if (fs.existsSync(batchFile)) fs.unlinkSync(batchFile);
  }
}

run();

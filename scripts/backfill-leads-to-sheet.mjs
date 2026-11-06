import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";

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
  const d = phone.replace(/\D/g, "");
  return d.length >= 10 ? d.slice(-10) : d;
}

async function run() {
  console.log("Fetching counsellor_leads...");
  const { data: counsellorLeads, error: clErr } = await sb
    .from("counsellor_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (clErr) console.error("Error fetching counsellor leads:", clErr);

  console.log("Fetching career_engine_leads...");
  const { data: ceLeads, error: ceErr } = await sb
    .from("career_engine_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (ceErr) console.error("Error fetching career engine leads:", ceErr);

  // Fetch applications for matching college or details if available
  const { data: apps } = await sb
    .from("applications")
    .select("phone, college, degree, city, graduation_year")
    .order("created_at", { ascending: false })
    .limit(300);

  const appMap = new Map();
  for (const a of apps || []) {
    const d = cleanDigits(a.phone);
    if (d && !appMap.has(d)) {
      appMap.set(d, a);
    }
  }

  const rows = [];

  // 1. Process counsellor_leads (highest intent)
  for (const cl of counsellorLeads || []) {
    const digits = cleanDigits(cl.contact);
    const appInfo = digits ? appMap.get(digits) : null;
    const waUrl = digits ? `https://wa.me/91${digits}?text=${encodeURIComponent(`Hi ${cl.name}, following up on your Arzon career guidance request regarding ${cl.requested_role || "Healthcare Careers"}!`)}` : "";
    const waFormula = waUrl ? `=HYPERLINK("${waUrl}", "💬 Chat on WhatsApp")` : "";

    rows.push([
      toIST(cl.created_at),
      cl.name || "Candidate",
      digits ? `'91${digits}` : (cl.contact || ""),
      "", // email
      appInfo?.college || "Inbound Lead", // College
      appInfo?.degree || "Healthcare Graduate", // Degree
      appInfo?.graduation_year || "2026", // Passout Year
      cl.requested_role || "Pharmacovigilance & Drug Safety", // Interested Domain
      appInfo?.city || "India", // Location
      "Requested 1-on-1 Career Counselling Callback", // Query
      cl.source || "Website Counsellor CTA", // Source
      cl.contacted_at ? "Contacted - Call Scheduled" : "New Lead", // Status
      cl.contacted_by || "", // Assigned
      "", // Remarks
      waFormula, // WhatsApp Link
    ]);
  }

  // 2. Process career_engine_leads
  for (const ce of ceLeads || []) {
    const digits = cleanDigits(ce.phone);
    const appInfo = digits ? appMap.get(digits) : null;
    const waUrl = digits ? `https://wa.me/91${digits}?text=${encodeURIComponent(`Hi ${ce.name}, this is from Arzon Careers regarding your healthcare career assessment and roadmap!`)}` : "";
    const waFormula = waUrl ? `=HYPERLINK("${waUrl}", "💬 Chat on WhatsApp")` : "";
    const domain = ce.archetype ? `Domain: ${ce.archetype.replace(/_/g, " ").toUpperCase()}` : "Healthcare Career Exploration";

    rows.push([
      toIST(ce.created_at),
      ce.name || "Candidate",
      digits ? `'91${digits}` : (ce.phone || ""),
      ce.email || "",
      appInfo?.college || "Campus Graduate",
      appInfo?.degree || "Pharmacy / Life Sciences",
      appInfo?.graduation_year || "2026",
      domain,
      appInfo?.city || "India",
      ce.fit_score != null ? `Assessment Fit Score: ${ce.fit_score}%` : "Inbound Assessment Inquiry",
      "Career Engine Assessment",
      ce.contacted_at ? "Contacted - Call Scheduled" : "New Lead",
      ce.contacted_by || "",
      ce.whatsapp_optin ? "WhatsApp Opted In" : "",
      waFormula,
    ]);
  }

  console.log(`Prepared ${rows.length} rows to write to Google Sheet.`);

  const batchFile = path.resolve("./scratch-batch-rebuilt.json");
  const batchPayload = [
    {
      op: "append",
      range: "'Counselor Leads'!A2",
      data: rows,
    },
  ];

  fs.writeFileSync(batchFile, JSON.stringify(batchPayload, null, 2), "utf8");

  try {
    const result = execSync(`gsheets mutate batch ${SPREADSHEET_ID} -f "${batchFile}"`, { encoding: "utf8" });
    console.log("Batch result:", result);
  } catch (err) {
    console.error("Batch execution failed:", err.stdout || err.message);
  } finally {
    if (fs.existsSync(batchFile)) fs.unlinkSync(batchFile);
  }
}

run();

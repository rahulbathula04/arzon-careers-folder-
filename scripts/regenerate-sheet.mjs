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
  console.log("Fetching all applications (old to new)...");
  const { data: apps } = await sb
    .from("applications")
    .select("id, created_at, name, email, phone, program_name, notes, status, utm_source")
    .order("created_at", { ascending: true });

  console.log("Fetching all career_engine_leads (old to new)...");
  const { data: ceLeads } = await sb
    .from("career_engine_leads")
    .select("id, created_at, name, email, phone, archetype, fit_score, contacted_at, whatsapp_optin")
    .order("created_at", { ascending: true });

  console.log("Fetching all counsellor_leads (old to new)...");
  const { data: clLeads } = await sb
    .from("counsellor_leads")
    .select("id, created_at, name, contact, requested_role, source, contacted_at")
    .order("created_at", { ascending: true });

  // Map to enrich leads
  const phoneProfile = new Map();

  for (const a of apps || []) {
    const d = cleanDigits(a.phone);
    if (!d) continue;
    let college = "";
    let degree = "";
    let notesText = "";
    if (a.notes) {
      try {
        const parsed = JSON.parse(a.notes);
        if (parsed.college) college = parsed.college;
        if (parsed.degree) degree = parsed.degree;
        if (parsed.user_notes) notesText = parsed.user_notes;
      } catch {
        notesText = a.notes;
      }
    }
    phoneProfile.set(d, {
      name: a.name,
      email: a.email,
      phone: d,
      college: college || "Admissions Candidate",
      degree: degree || "Healthcare Graduate",
      domain: a.program_name || "Healthcare Career Program",
      notes: notesText || "Application Submitted",
    });
  }

  // Combine all items into a unified chronologically sorted array
  const allItems = [];

  for (const a of apps || []) {
    let college = "";
    let degree = "";
    let notesText = "";
    if (a.notes) {
      try {
        const parsed = JSON.parse(a.notes);
        if (parsed.college) college = parsed.college;
        if (parsed.degree) degree = parsed.degree;
        if (parsed.user_notes) notesText = parsed.user_notes;
      } catch {
        notesText = a.notes;
      }
    }
    allItems.push({
      created_at: a.created_at,
      name: a.name || "Candidate",
      phone: cleanDigits(a.phone),
      email: a.email || "",
      college: college || "College of Pharmacy / Life Sciences",
      domain: a.program_name || "Healthcare Career Intelligence",
      degree: degree || "B.Pharm / Life Sciences",
      passoutYear: "2026",
      city: "India",
      notes: notesText || "Admissions Application",
      source: a.utm_source || "Application Portal",
      status: a.status === "enrolled" ? "Enrolled" : "New Lead",
    });
  }

  for (const c of ceLeads || []) {
    const d = cleanDigits(c.phone);
    const existing = d ? phoneProfile.get(d) : null;
    const domain = c.archetype
      ? c.archetype.replace(/_/g, " ").toUpperCase()
      : (existing?.domain || "Pharmacovigilance & Drug Safety");

    // Clean up local proxy email if present
    const cleanEmail = c.email && !c.email.includes("@arzon.local") && !c.email.includes("@counsellor.arzon")
      ? c.email
      : (existing?.email || `${d}@candidate.arzoncareers.in`);

    allItems.push({
      created_at: c.created_at,
      name: c.name || existing?.name || "Candidate",
      phone: d,
      email: cleanEmail,
      college: existing?.college || "Pharmacy / Medical College",
      domain: domain,
      degree: existing?.degree || "Healthcare Graduate",
      passoutYear: "2026",
      city: "India",
      notes: c.fit_score != null ? `Assessment Fit Score: ${c.fit_score}%` : "Career Fit Assessment",
      source: "Career Engine",
      status: c.contacted_at ? "Contacted - Call Scheduled" : "New Lead",
    });
  }

  for (const cl of clLeads || []) {
    const d = cleanDigits(cl.contact);
    const existing = d ? phoneProfile.get(d) : null;
    allItems.push({
      created_at: cl.created_at,
      name: cl.name || existing?.name || "Candidate",
      phone: d,
      email: existing?.email || `${d}@candidate.arzoncareers.in`,
      college: existing?.college || "Pharmacy / Health Sciences College",
      domain: cl.requested_role || "Pharmacovigilance & Drug Safety",
      degree: existing?.degree || "B.Pharm / Pharm.D",
      passoutYear: "2026",
      city: "India",
      notes: "Requested 1-on-1 Career Counselling Callback",
      source: cl.source || "Website Counsellor CTA",
      status: cl.contacted_at ? "Contacted - Call Scheduled" : "New Lead",
    });
  }

  // Sort strictly from OLD to NEW (Ascending order)
  allItems.sort((x, y) => new Date(x.created_at).getTime() - new Date(y.created_at).getTime());

  // Deduplicate by phone + rough timestamp (within 1 day)
  const deduped = [];
  const seenPhoneDay = new Set();

  for (const item of allItems) {
    if (!item.phone) continue;
    const day = item.created_at.slice(0, 10);
    const key = `${item.phone}-${day}`;
    if (seenPhoneDay.has(key)) continue;
    seenPhoneDay.add(key);
    deduped.push(item);
  }

  console.log(`Total deduped leads from OLD to NEW: ${deduped.length}`);

  // Format into 16 columns matching:
  // Lead #, Timestamp, Full Name, Mobile, Email, College Name, Interested Domain, Degree, Passout Year, City, Notes, Source, Status, Counselor, Remarks, 1-Click WhatsApp
  const rows = deduped.map((item, index) => {
    const leadNum = `#${index + 1}`; // #1, #2, #3 ... #233
    const waUrl = item.phone
      ? `https://wa.me/91${item.phone}?text=${encodeURIComponent(
          `Hi ${item.name}, this is from Arzon Global Admissions regarding your interest in ${item.domain}!`
        )}`
      : "";
    const waFormula = waUrl ? `=HYPERLINK("${waUrl}", "💬 Chat on WhatsApp")` : "";

    return [
      leadNum,
      toIST(item.created_at),
      item.name,
      `'91${item.phone}`,
      item.email,
      item.college,
      item.domain,
      item.degree,
      item.passoutYear,
      item.city,
      item.notes,
      item.source,
      item.status,
      "", // Assigned Counselor
      "", // Counselor Remarks
      waFormula,
    ];
  });

  const batchFile = path.resolve("./scratch-batch-old-to-new.json");
  const batchPayload = [
    {
      op: "append",
      range: "'Counselor Leads'!A2",
      data: rows,
    },
  ];

  fs.writeFileSync(batchFile, JSON.stringify(batchPayload, null, 2), "utf8");

  console.log("Writing rows to Google Sheet via batch append...");
  try {
    const result = execSync(`gsheets mutate batch ${SPREADSHEET_ID} -f "${batchFile}"`, { encoding: "utf8" });
    console.log("Batch result:", result);
  } catch (err) {
    console.error("Batch error:", err.stdout || err.message);
  } finally {
    if (fs.existsSync(batchFile)) fs.unlinkSync(batchFile);
  }
}

run();

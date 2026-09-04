import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envText = fs.readFileSync(".env", "utf8");
function getEnv(key) {
  const match = envText.match(new RegExp(`^${key}="?([^"\\r\\n]+)"?`, "m"));
  return match ? match[1] : null;
}

const url = getEnv("SUPABASE_URL") || getEnv("VITE_SUPABASE_URL");
const key = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("SUPABASE_PUBLISHABLE_KEY");

const sb = createClient(url, key);

async function verify() {
  console.log("Checking applications table for phone: 9876543299...");
  const { data: apps, error } = await sb
    .from("applications")
    .select("id, name, phone, email, program_slug, program_name, notes, created_at")
    .eq("phone", "9876543299");

  if (error) {
    console.error("DB Error:", error);
    process.exit(1);
  }

  console.log(`Found ${apps.length} row(s) for 9876543299:`);
  apps.forEach((app, idx) => {
    console.log(`\n--- Lead Row #${idx + 1} ---`);
    console.log("ID:", app.id);
    console.log("Name:", app.name || app.full_name);
    console.log("Phone:", app.phone);
    console.log("Email:", app.email);
    console.log("Program:", app.program_slug, "/", app.program_name);
    console.log("Created At:", app.created_at);
    console.log("Notes (Attribution & Degree):", app.notes);
  });

  // Check recent analytics events
  console.log("\nChecking recent analytics events for workshop_lead_submitted (verifying PII safety)...");
  const { data: events, error: evErr } = await sb
    .from("analytics_events")
    .select("id, event_name, props, created_at")
    .eq("event_name", "workshop_lead_submitted")
    .order("created_at", { ascending: false })
    .limit(3);

  if (evErr) {
    console.warn("Analytics events query warn:", evErr);
  } else {
    console.log(`Found ${events.length} event(s):`);
    events.forEach(e => {
      console.log("Event Props:", JSON.stringify(e.props));
      // Check PII
      const str = JSON.stringify(e.props);
      if (str.includes("9876543299") || str.includes("Kavya")) {
        console.error("FAIL: PII detected in analytics props!");
      } else {
        console.log("PASS: Zero PII detected in analytics props.");
      }
    });
  }
}

verify();

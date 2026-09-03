import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envText = fs.readFileSync(".env", "utf8");
function getEnv(key) {
  const match = envText.match(new RegExp(`^${key}="?([^"\\r\\n]+)"?`, "m"));
  return match ? match[1] : null;
}

const url = getEnv("SUPABASE_URL") || getEnv("VITE_SUPABASE_URL");
const key = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("SUPABASE_PUBLISHABLE_KEY");

console.log("Connecting to:", url);
const sb = createClient(url, key);

async function check() {
  const { count: evCount, error: evErr } = await sb.from("analytics_events").select("*", { count: "exact", head: true });
  const { data: latestEvents, error: latestErr } = await sb.from("analytics_events").select("event_name, path, created_at, utm_source, props").order("created_at", { ascending: false }).limit(10);
  const { count: appCount, error: appErr } = await sb.from("applications").select("*", { count: "exact", head: true });
  const { data: latestApps, error: appsErr } = await sb.from("applications").select("id, full_name, phone, email, track, status, created_at").order("created_at", { ascending: false }).limit(10);

  console.log("Analytics events count:", evCount, "Error:", evErr);
  console.log("Latest events count:", latestEvents?.length, "Error:", latestErr);
  if (latestEvents?.length) console.log("Recent events:", latestEvents);
  console.log("Applications count:", appCount, "Error:", appErr);
  if (latestApps?.length) console.log("Recent apps:", latestApps);
}

check();

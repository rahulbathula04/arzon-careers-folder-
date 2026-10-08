import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Supabase configuration is intentionally environment-only.
 *
 * Never silently fall back to a different project: doing so can make CI or
 * production appear healthy while reading/writing the wrong database.
 */
export function getSupabaseUrl(): string {
  const value =
    (typeof process !== "undefined" && process.env?.SUPABASE_URL) ||
    (typeof process !== "undefined" && process.env?.VITE_SUPABASE_URL) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL);

  if (!value) {
    throw new Error(
      "[supabaseEnv] SUPABASE_URL is not configured. " +
        "Set SUPABASE_URL on the server or VITE_SUPABASE_URL for browser builds.",
    );
  }

  return value;
}

const PLACEHOLDER_PATTERNS = [
  "your_supabase_publishable_key",
  "your_server_only_service_role_key",
  "your_supabase_anon_key",
  "your_supabase_service_role_key",
  "<your",
  "REPLACE_ME",
];

function assertNotPlaceholder(value: string, name: string): void {
  if (PLACEHOLDER_PATTERNS.some((p) => value.includes(p))) {
    throw new Error(
      `[supabaseEnv] ${name} is still set to a placeholder value from .env.example. ` +
        "Open your .env file and replace it with the real key from your Supabase project dashboard.",
    );
  }
}

export function getSupabaseAnonKey(): string {
  const value =
    (typeof process !== "undefined" && process.env?.SUPABASE_PUBLISHABLE_KEY) ||
    (typeof process !== "undefined" && process.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY);

  if (!value) {
    throw new Error(
      "[supabaseEnv] Supabase publishable key is not configured. " +
        "Set SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  assertNotPlaceholder(value, "SUPABASE_PUBLISHABLE_KEY");
  return value;
}

export function getSupabaseServiceKey(): string {
  // SECURITY: service-role keys bypass ALL Row-Level Security.
  // They must only exist in server-side process.env and must never use VITE_.
  const value =
    typeof process !== "undefined"
      ? process.env?.SUPABASE_SECRET_KEY || process.env?.SUPABASE_SERVICE_ROLE_KEY
      : undefined;

  if (!value) {
    throw new Error(
      "[supabaseEnv] SUPABASE_SERVICE_ROLE_KEY is not configured. " +
        "This server-only credential is required for trusted admin operations.",
    );
  }

  assertNotPlaceholder(value, "SUPABASE_SERVICE_ROLE_KEY");
  return value;
}

export function createSafePublicClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createSafeAdminClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseServiceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

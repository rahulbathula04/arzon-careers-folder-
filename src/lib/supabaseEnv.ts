import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const FALLBACK_SUPABASE_URL = "https://grcmczxdcssroeljrygv.supabase.co";
export const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyY21jenhkY3Nzcm9lbGpyeWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1OTIxMjQsImV4cCI6MjA5MzE2ODEyNH0.7wmrHyhGKpxwITpToTaczdnKoS9GPdvSohfbyr8_8AU";

export function getSupabaseUrl(): string {
  if (typeof process !== "undefined" && process.env) {
    if (process.env.SUPABASE_URL) return process.env.SUPABASE_URL;
    if (process.env.VITE_SUPABASE_URL) return process.env.VITE_SUPABASE_URL;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) {
    return import.meta.env.VITE_SUPABASE_URL;
  }
  return FALLBACK_SUPABASE_URL;
}

export function getSupabaseAnonKey(): string {
  if (typeof process !== "undefined" && process.env) {
    if (process.env.SUPABASE_PUBLISHABLE_KEY) return process.env.SUPABASE_PUBLISHABLE_KEY;
    if (process.env.VITE_SUPABASE_PUBLISHABLE_KEY) return process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) {
    return import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  }
  return FALLBACK_SUPABASE_ANON_KEY;
}

export function getSupabaseServiceKey(): string {
  if (typeof process !== "undefined" && process.env) {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) return process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) return process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    return import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  }
  return getSupabaseAnonKey();
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

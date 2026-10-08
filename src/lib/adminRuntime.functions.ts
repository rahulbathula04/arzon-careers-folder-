import { createServerFn } from "@tanstack/react-start";

/**
 * Returns configuration readiness only. Never returns credential values.
 * This endpoint is intentionally public so the admin sign-in screen can
 * distinguish local setup failures from authentication failures.
 */
export const getAdminRuntimeStatus = createServerFn({ method: "GET" }).handler(async () => {
  const browserUrlReady = Boolean(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
  );
  const browserKeyReady = Boolean(
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY,
  );
  const serverUrlReady = Boolean(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
  const serverSecretReady = Boolean(
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  return {
    browserReady: browserUrlReady && browserKeyReady,
    serverReady: serverUrlReady && serverSecretReady,
    browserUrlReady,
    browserKeyReady,
    serverUrlReady,
    serverSecretReady,
  };
});

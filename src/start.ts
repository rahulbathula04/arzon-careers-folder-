import { createStart } from "@tanstack/react-start";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

/**
 * Registers the Supabase bearer-token attacher as a global client-side
 * function middleware. Without this, every serverFn protected by
 * `requireSupabaseAuth` (the entire /admin/* data layer) rejects with
 * "Unauthorized: No authorization header provided", which surfaces in the
 * UI as a generic "Something went wrong" route error.
 */
export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
}));

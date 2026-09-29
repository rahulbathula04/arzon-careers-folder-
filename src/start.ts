import { createMiddleware, createStart } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const INTERNAL_API_PREFIXES = [
  "/api/public/hooks/",
  "/api/public/razorpay/webhook",
];

function isInternalSignedEndpoint(pathname: string): boolean {
  return INTERNAL_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Same-origin request protection for every non-GET request.
 *
 * TanStack Start server functions are callable RPC endpoints, so route
 * beforeLoad guards are not a sufficient CSRF boundary. Internal webhooks
 * are exempt here because they use their own timing-safe shared-secret/HMAC
 * authentication.
 */
const csrfMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getRequest();
  if (request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") {
    return next();
  }

  const pathname = new URL(request.url).pathname;
  if (isInternalSignedEndpoint(pathname)) {
    return next();
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin") {
    return next();
  }

  const expectedOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin === expectedOrigin) return next();
    } catch {
      /* reject below */
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      if (new URL(referer).origin === expectedOrigin) return next();
    } catch {
      /* reject below */
    }
  }

  return new Response("Forbidden", {
    status: 403,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
  functionMiddleware: [attachSupabaseAuth],
}));

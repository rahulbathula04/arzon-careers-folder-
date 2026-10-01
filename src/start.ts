import { createMiddleware, createStart } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const INTERNAL_API_PREFIXES = ["/api/public/hooks/", "/api/public/razorpay/webhook"];

function isInternalSignedEndpoint(pathname: string): boolean {
  return INTERNAL_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

const csrfMiddleware = createMiddleware().server(async ({ next }) => {
  const request = getRequest();
  if (request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") return next();

  const pathname = new URL(request.url).pathname;
  if (isInternalSignedEndpoint(pathname)) return next();

  if (request.headers.get("sec-fetch-site") === "same-origin") return next();

  const expectedOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (origin) {
    try { if (new URL(origin).origin === expectedOrigin) return next(); } catch {}
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try { if (new URL(referer).origin === expectedOrigin) return next(); } catch {}
  }

  return new Response("Forbidden", { status: 403, headers: { "Content-Type": "text/plain; charset=utf-8" } });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
  functionMiddleware: [attachSupabaseAuth],
}));

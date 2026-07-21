import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Schema = z.object({
  kind: z.enum(["hydration", "runtime", "unhandledrejection"]),
  message: z.string().max(2000),
  stack: z.string().max(8000).optional(),
  url: z.string().max(500).optional(),
  route: z.string().max(200).optional(),
  ua: z.string().max(500).optional(),
});

// Lightweight server fn: writes to worker logs so future admin failures
// can be diagnosed from Server Logs. Unauthenticated on purpose — payload
// is bounded and contains no PII.
export const logClientError = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Schema.parse(d ?? {}))
  .handler(async ({ data }) => {
    console.error(
      `[client-error] kind=${data.kind} route=${data.route ?? "?"} url=${data.url ?? "?"} :: ${data.message}` +
        (data.stack ? `\n${data.stack}` : ""),
    );
    return { ok: true as const };
  });

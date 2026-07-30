import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireStaff, requireAdmin } from "@/server/auth-guards.server";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { scanLandingCopy } from "./landingCopyScan.functions";

export const listLandingCopyChanges = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context.userId);
    const { data, error } = await supabaseAdmin
      .from("landing_copy_changes")
      .select(
        "id, changed_at, actor_email, file_path, section, before_text, after_text, reason, source",
      )
      .order("changed_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return { rows: data ?? [] };
  });

const RecordSchema = z.object({
  filePath: z.string().min(1).max(240),
  section: z.string().max(120).optional().nullable(),
  before: z.string().max(4000),
  after: z.string().max(4000),
  reason: z.string().max(500).optional().nullable(),
  source: z.enum(["agent", "admin", "migration", "scanner"]).default("admin"),
});

export const recordLandingCopyChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => RecordSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const { data: userRow } = await supabaseAdmin.auth.admin.getUserById(context.userId);
    const { error } = await supabaseAdmin.from("landing_copy_changes").insert({
      actor_id: context.userId,
      actor_email: userRow?.user?.email ?? null,
      file_path: data.filePath,
      section: data.section ?? null,
      before_text: data.before,
      after_text: data.after,
      reason: data.reason ?? null,
      source: data.source,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/**
 * Publish-rollback request. Re-runs the copy QA scan. If blocking findings
 * exist, records an audit entry in `landing_copy_changes` and returns a
 * payload telling the admin UI to surface Lovable's History panel as the
 * only true rollback path (Lovable's deploy pipeline owns version control).
 */
export const requestPublishRollback = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    // Server-side direct invocation (not via RPC).
    // scanLandingCopy is a createServerFn - call its handler indirectly by
    // duplicating the scan call here through fetch is not needed; instead we
    // import its handler logic. Easiest: re-export the scanner output by
    // calling the createServerFn factory directly is awkward, so re-run
    // via the underlying fn - we just call the createServerFn as a function.
    const scan = await (
      scanLandingCopy as unknown as () => Promise<{
        findings: Array<{ rule: string; file: string; line: number; severity: string }>;
        summary: {
          warnCount: number;
          typographyWarnCount: number;
          a11yWarnCount: number;
          publishReady: boolean;
        };
      }>
    )();
    const blocking = scan.summary.warnCount;
    if (blocking === 0) {
      return {
        rollbackNeeded: false,
        summary: scan.summary,
        message: "No blocking violations detected. Rollback not required.",
      };
    }
    const { data: userRow } = await supabaseAdmin.auth.admin.getUserById(context.userId);
    const top = scan.findings
      .filter((f) => f.severity === "warn")
      .slice(0, 10)
      .map((f) => `${f.file}:${f.line} - ${f.rule}`)
      .join("\n");
    await supabaseAdmin.from("landing_copy_changes").insert({
      actor_id: context.userId,
      actor_email: userRow?.user?.email ?? null,
      file_path: "(publish-rollback)",
      section: "publish",
      before_text: `Published landing had ${blocking} blocking violation${blocking === 1 ? "" : "s"}:\n${top}`,
      after_text: "Rollback to last approved landing version requested.",
      reason: "Content-QA scan detected typography or a11y regressions after publish.",
      source: "admin",
    });
    return {
      rollbackNeeded: true,
      summary: scan.summary,
      message: `Rollback requested. ${blocking} blocking violation${blocking === 1 ? "" : "s"} logged.`,
    };
  });

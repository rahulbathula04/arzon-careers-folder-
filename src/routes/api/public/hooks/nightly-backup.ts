import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Nightly external-backup hook (Phase 3).
 *
 * Calls supabaseAdmin to dump a small set of high-value tables as JSONL,
 * uploads each table to S3 via the Lovable connector gateway (signed PUT URL),
 * and records the run in public.backup_runs.
 *
 * Security:
 *  - Requires header `x-hook-secret: $HOOK_SECRET` (same shared secret used
 *    elsewhere in the app). Without it the route 401s.
 *  - Path is under /api/public/* so it bypasses published-site auth and
 *    can be called from pg_cron via net.http_post.
 *
 * Wiring (one-time, after AWS S3 connector is connected with write scope):
 *   -- Store the hook secret in Postgres settings (never inline it in cron SQL):
 *   --   ALTER DATABASE postgres SET app.hook_secret = '<value>';   -- run once via SQL editor
 *   SELECT cron.schedule(
 *     'arzon-nightly-backup',
 *     '30 20 * * *', -- 02:00 IST = 20:30 UTC (low-traffic window 01:30–04:00 IST)
 *     $$
 *     SELECT net.http_post(
 *       url := 'https://project--aee7d20e-6465-4338-8819-ad4efc6ce26b.lovable.app/api/public/hooks/nightly-backup',
 *       headers := jsonb_build_object('Content-Type','application/json','x-hook-secret', current_setting('app.hook_secret', true)),
 *       body := '{}'::jsonb
 *     ) AS request_id;
 *     $$
 *   );
 */

const GATEWAY_URL = "https://connector-gateway.lovable.dev";

// Tables that contain user data we want off-site copies of. Order matters
// only for log readability. Each table is paged with .range() so the 1000-row
// PostgREST default never silently truncates a backup.
const TABLES = [
  "applications",
  "career_engine_leads",
  "career_engine_sessions",
  "career_engine_answers",
  "enrolment_intents",
  "counsellor_leads",
  "arzonprime60_waitlist",
  "demand_votes",
  "demand_tracks",
  "demand_milestones",
  "certificates",
  "user_roles",
  "admin_invites",
  "course_thumbnail_overrides",
  "coupons",
  "coupon_tier_prices",
  "audit_log",
] as const;

const PAGE_SIZE = 1000;

// Storage buckets we capture a *manifest* of (object name + size + updated_at).
// File bodies are not copied — they already live in S3-backed object storage;
// the manifest lets us detect deletion / corruption and drives any future
// per-file rehydrate.
const STORAGE_BUCKETS = ["certificates", "media", "course-thumbnails"] as const;

type RunRow = {
  id: string;
};

async function getSignedUploadUrl(objectKey: string): Promise<string> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const s3Key = process.env.AWS_S3_API_KEY;
  if (!lovableKey) throw new Error("LOVABLE_API_KEY missing");
  if (!s3Key) throw new Error("AWS_S3_API_KEY missing (connect AWS S3 connector with write scope)");

  const res = await fetch(`${GATEWAY_URL}/api/v1/sign_storage_url?provider=aws_s3&mode=write`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": s3Key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ object_path: objectKey }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`sign_storage_url failed [${res.status}]: ${text}`);
  }
  const { url } = (await res.json()) as { url: string };
  return url;
}

/**
 * Verify an uploaded object actually exists in S3 and has non-zero size.
 * Uses a signed read URL + HEAD — "PUT returned 200" alone is not proof
 * the object is restorable (proxy could 200 then drop the body).
 */
async function verifyUpload(objectKey: string): Promise<{ size: number }> {
  const lovableKey = process.env.LOVABLE_API_KEY!;
  const s3Key = process.env.AWS_S3_API_KEY!;
  const signRes = await fetch(`${GATEWAY_URL}/api/v1/sign_storage_url?provider=aws_s3&mode=read`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": s3Key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ object_path: objectKey }),
  });
  if (!signRes.ok) {
    throw new Error(`verify sign failed [${signRes.status}] for ${objectKey}`);
  }
  const { url } = (await signRes.json()) as { url: string };
  const head = await fetch(url, { method: "HEAD" });
  if (!head.ok) {
    throw new Error(`verify HEAD failed [${head.status}] for ${objectKey}`);
  }
  const size = Number(head.headers.get("Content-Length") ?? "0");
  if (!size || size <= 0) {
    throw new Error(`verify failed: zero-byte object ${objectKey}`);
  }
  return { size };
}

async function dumpStorageManifest(bucket: string): Promise<{ jsonl: string; rows: number }> {
  const chunks: string[] = [];
  let rows = 0;
  let offset = 0;
  // Storage list() max limit is 1000; page until empty.

  while (true) {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .list("", { limit: 1000, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw new Error(`storage list ${bucket}: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const obj of data) {
      chunks.push(
        JSON.stringify({
          name: obj.name,
          id: obj.id,
          updated_at: obj.updated_at,
          created_at: obj.created_at,
          last_accessed_at: obj.last_accessed_at,
          size: (obj.metadata as { size?: number } | null)?.size ?? null,
          mimetype: (obj.metadata as { mimetype?: string } | null)?.mimetype ?? null,
        }),
      );
    }
    rows += data.length;
    if (data.length < 1000) break;
    offset += 1000;
  }
  return { jsonl: chunks.join("\n") + (chunks.length ? "\n" : ""), rows };
}

async function dumpTableToJsonl(
  table: (typeof TABLES)[number],
): Promise<{ jsonl: string; rows: number }> {
  const chunks: string[] = [];
  let rows = 0;
  let from = 0;
  // Loop with .range() to bypass the 1000-row default.

  while (true) {
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabaseAdmin
      .from(table)
      .select("*")
      .order("id", { ascending: true })
      .range(from, to);
    if (error) throw new Error(`select ${table}: ${error.message}`);
    if (!data || data.length === 0) break;
    for (const row of data) chunks.push(JSON.stringify(row));
    rows += data.length;
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return { jsonl: chunks.join("\n") + (chunks.length ? "\n" : ""), rows };
}

export const Route = createFileRoute("/api/public/hooks/nightly-backup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Auth: shared secret header.
        const expected = process.env.HOOK_SECRET;
        if (!expected) {
          return new Response("HOOK_SECRET not configured", { status: 500 });
        }
        const supplied = request.headers.get("x-hook-secret");
        if (!supplied || supplied !== expected) {
          return new Response("unauthorized", { status: 401 });
        }

        // Open a backup_runs row in 'running'.
        const { data: runRow, error: insertErr } = await supabaseAdmin
          .from("backup_runs")
          .insert({ status: "running", destination: "s3" })
          .select("id")
          .single<RunRow>();
        if (insertErr || !runRow) {
          return new Response(`backup_runs insert failed: ${insertErr?.message ?? "unknown"}`, {
            status: 500,
          });
        }
        const runId = runRow.id;

        // Short-circuit if the S3 connector isn't configured yet — record as 'skipped'
        // so the operator sees an explicit signal instead of red errors every night.
        if (!process.env.AWS_S3_API_KEY || !process.env.LOVABLE_API_KEY) {
          await supabaseAdmin
            .from("backup_runs")
            .update({
              status: "skipped",
              finished_at: new Date().toISOString(),
              error:
                "AWS_S3_API_KEY or LOVABLE_API_KEY missing — connect AWS S3 connector with write scope",
            })
            .eq("id", runId);
          return Response.json({ ok: false, skipped: true, run_id: runId }, { status: 200 });
        }

        const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
        const perTable: Record<string, { rows: number; bytes: number; verified_size?: number }> =
          {};
        let totalRows = 0;
        let totalBytes = 0;

        try {
          for (const table of TABLES) {
            const { jsonl, rows } = await dumpTableToJsonl(table);
            const bytes = new TextEncoder().encode(jsonl).byteLength;
            const objectKey = `arzon-backups/${stamp}/${table}.jsonl`;

            const uploadUrl = await getSignedUploadUrl(objectKey);
            const putRes = await fetch(uploadUrl, {
              method: "PUT",
              headers: { "Content-Type": "application/x-ndjson" },
              body: jsonl,
            });
            if (!putRes.ok) {
              const text = await putRes.text().catch(() => "");
              throw new Error(`PUT ${table} failed [${putRes.status}]: ${text.slice(0, 200)}`);
            }
            // Post-upload verification: object must exist with size > 0.
            const verified = await verifyUpload(objectKey);
            perTable[table] = { rows, bytes, verified_size: verified.size };
            totalRows += rows;
            totalBytes += bytes;
          }

          // Storage bucket manifests (object listing only — bodies stay in
          // Supabase storage which is itself S3-backed).
          for (const bucket of STORAGE_BUCKETS) {
            const { jsonl, rows } = await dumpStorageManifest(bucket);
            const bytes = new TextEncoder().encode(jsonl).byteLength;
            const objectKey = `arzon-backups/${stamp}/_storage_${bucket}.jsonl`;
            const uploadUrl = await getSignedUploadUrl(objectKey);
            const putRes = await fetch(uploadUrl, {
              method: "PUT",
              headers: { "Content-Type": "application/x-ndjson" },
              body: jsonl,
            });
            if (!putRes.ok) {
              const text = await putRes.text().catch(() => "");
              throw new Error(
                `PUT storage/${bucket} failed [${putRes.status}]: ${text.slice(0, 200)}`,
              );
            }
            const verified = await verifyUpload(objectKey);
            perTable[`_storage:${bucket}`] = { rows, bytes, verified_size: verified.size };
            totalRows += rows;
            totalBytes += bytes;
          }

          await supabaseAdmin
            .from("backup_runs")
            .update({
              status: "success",
              finished_at: new Date().toISOString(),
              table_count: TABLES.length + STORAGE_BUCKETS.length,
              row_count: totalRows,
              bytes: totalBytes,
              destination: `s3://arzon-backups/${stamp}/`,
              details: { per_table: perTable, stamp },
            })
            .eq("id", runId);

          return Response.json({
            ok: true,
            run_id: runId,
            stamp,
            tables: TABLES.length,
            storage_manifests: STORAGE_BUCKETS.length,
            rows: totalRows,
            bytes: totalBytes,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          await supabaseAdmin
            .from("backup_runs")
            .update({
              status: "failed",
              finished_at: new Date().toISOString(),
              table_count: Object.keys(perTable).length,
              row_count: totalRows,
              bytes: totalBytes,
              error: message.slice(0, 2000),
              details: { per_table: perTable, stamp },
            })
            .eq("id", runId);
          // Fire an analytics_alerts row so the existing alert dashboard picks it up.
          try {
            await supabaseAdmin.from("analytics_alerts").insert({
              alert_type: "backup_failed",
              event_name: "nightly_backup",
              details: { run_id: runId, error: message.slice(0, 500), stamp },
            });
          } catch {
            /* non-fatal — backup failure already recorded in backup_runs */
          }
          return Response.json(
            { ok: false, run_id: runId, error: message.slice(0, 500) },
            { status: 500 },
          );
        }
      },
    },
  },
});

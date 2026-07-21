# Restore Drill Runbook

**Purpose:** prove the nightly JSONL backups in S3 can rehydrate a table.
Run manually once per quarter; record outcome in `backup_runs.details`.

## Prerequisites

- AWS S3 connector connected (read access).
- `psql` with `SUPABASE_DB_URL` exported.
- A scratch schema to restore into so production data is never touched.

## Steps

1. **Pick a recent successful run.**

   ```sql
   SELECT id, started_at, destination, details
     FROM public.backup_runs
    WHERE status = 'success'
    ORDER BY started_at DESC
    LIMIT 5;
   ```

   Copy the S3 prefix from `destination` (e.g. `s3://arzon-backups/2026-05-27/`).

2. **Download one table's JSONL** (use `applications` as the canonical drill target):

   ```bash
   aws s3 cp s3://arzon-backups/2026-05-27/applications.jsonl /tmp/applications.jsonl
   wc -l /tmp/applications.jsonl   # should match details->>'applications'
   ```

3. **Create a scratch schema and load:**

   ```sql
   CREATE SCHEMA IF NOT EXISTS restore_drill;
   CREATE TABLE restore_drill.applications (LIKE public.applications INCLUDING ALL);
   ```

   ```bash
   jq -c '.' /tmp/applications.jsonl \
     | psql "$SUPABASE_DB_URL" -c \
       "COPY restore_drill.applications FROM STDIN WITH (FORMAT csv, QUOTE '\"', ESCAPE '\"', NULL '');"
   ```

   (Alternative: write a 10-line Node script that parses each JSONL row and INSERTs via supabase-js into `restore_drill.applications`.)

4. **Spot-check parity:**

   ```sql
   SELECT count(*)                       AS restored FROM restore_drill.applications;
   SELECT count(*)                       AS live     FROM public.applications;
   SELECT count(*) FILTER (WHERE r.id IS NULL) AS missing
     FROM public.applications p
     LEFT JOIN restore_drill.applications r USING (id);
   ```

   Acceptable: `missing` ≤ rows created after backup `started_at`.

5. **Storage manifest check.** Pull one bucket manifest and confirm at least
   one referenced object still exists in storage:

   ```bash
   aws s3 cp s3://arzon-backups/2026-05-27/_storage_certificates.jsonl /tmp/certs.jsonl
   head -1 /tmp/certs.jsonl | jq -r '.name'
   ```

   Then: in Supabase Studio → Storage → `certificates`, search for that name.

6. **Record the drill:**

   ```sql
   UPDATE public.backup_runs
      SET details = details || jsonb_build_object(
        'restore_drill_at', now(),
        'restore_drill_table', 'applications',
        'restore_drill_rows', <restored_count>,
        'restore_drill_passed', true
      )
    WHERE id = '<run-id>';
   ```

7. **Tear down:**
   ```sql
   DROP SCHEMA restore_drill CASCADE;
   ```

## Failure modes to watch

- `wc -l` mismatch vs `details->>'applications'` → upload was truncated.
- JSONL row fails `\copy` → schema drift between backup snapshot and live `applications`.
- Storage manifest references object that no longer exists → bucket TTL too aggressive.

Open a `backup_runs` row with `status='failed'` and a `details.restore_drill_error`
if any step fails; the alert dispatcher will pick it up.

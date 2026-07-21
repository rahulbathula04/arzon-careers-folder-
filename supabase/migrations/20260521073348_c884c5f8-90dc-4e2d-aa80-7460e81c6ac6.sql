-- Track when a recovery email was sent for an abandoned enrolment intent.
ALTER TABLE public.enrolment_intents
  ADD COLUMN IF NOT EXISTS recovery_email_sent_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_enrolment_intents_recovery_pending
  ON public.enrolment_intents (created_at)
  WHERE recovery_email_sent_at IS NULL
    AND paid_at IS NULL
    AND status IN ('started','coupon_applied');

-- Schedule recovery hook every 15 minutes.
-- Uses Supabase anon key for auth (apikey header) — /api/public/* bypasses edge auth.
DO $$
DECLARE
  v_anon_key text := current_setting('app.settings.supabase_anon_key', true);
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'recover-abandoned-enrolments') THEN
    PERFORM cron.unschedule('recover-abandoned-enrolments');
  END IF;

  PERFORM cron.schedule(
    'recover-abandoned-enrolments',
    '*/15 * * * *',
    $cron$
      SELECT net.http_post(
        url := 'https://arzoncareers.in/api/public/hooks/recover-abandoned-intents',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyY21jenhkY3Nzcm9lbGpyeWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1OTIxMjQsImV4cCI6MjA5MzE2ODEyNH0.7wmrHyhGKpxwITpToTaczdnKoS9GPdvSohfbyr8_8AU'
        ),
        body := '{}'::jsonb
      );
    $cron$
  );
END $$;

DO $$
DECLARE
  rec record;
  fks text[][] := ARRAY[
    ARRAY['applications','applications_lead_id_fkey','lead_id','career_engine_leads','id','SET NULL'],
    ARRAY['enrolment_intents','enrolment_intents_lead_id_fkey','lead_id','career_engine_leads','id','SET NULL'],
    ARRAY['arzonprime60_waitlist','arzonprime60_waitlist_lead_id_fkey','lead_id','career_engine_leads','id','SET NULL'],
    ARRAY['arzonprime60_waitlist','arzonprime60_waitlist_session_id_fkey','session_id','career_engine_sessions','id','SET NULL'],
    ARRAY['arzonprime60_waitlist','arzonprime60_waitlist_intent_id_fkey','intent_id','enrolment_intents','id','SET NULL'],
    ARRAY['career_engine_leads','career_engine_leads_session_id_fkey','session_id','career_engine_sessions','id','CASCADE'],
    ARRAY['career_engine_answers','career_engine_answers_session_id_fkey','session_id','career_engine_sessions','id','CASCADE'],
    ARRAY['demand_votes','demand_votes_track_id_fkey','track_id','demand_tracks','id','CASCADE'],
    ARRAY['demand_milestones','demand_milestones_track_id_fkey','track_id','demand_tracks','id','CASCADE'],
    ARRAY['demand_partners','demand_partners_track_id_fkey','track_id','demand_tracks','id','CASCADE'],
    ARRAY['application_events','application_events_application_id_fkey','application_id','applications','id','CASCADE'],
    ARRAY['coupon_tier_prices','coupon_tier_prices_code_fkey','code','coupons','code','CASCADE']
  ];
  i int;
BEGIN
  FOR i IN 1 .. array_length(fks, 1) LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
       WHERE conname = fks[i][2]
         AND conrelid = ('public.' || fks[i][1])::regclass
    ) THEN
      EXECUTE format(
        'ALTER TABLE public.%I ADD CONSTRAINT %I FOREIGN KEY (%I) REFERENCES public.%I(%I) ON DELETE %s',
        fks[i][1], fks[i][2], fks[i][3], fks[i][4], fks[i][5], fks[i][6]
      );
    END IF;
    EXECUTE format(
      'CREATE INDEX IF NOT EXISTS %I ON public.%I(%I)',
      'idx_' || fks[i][1] || '_' || fks[i][3], fks[i][1], fks[i][3]
    );
  END LOOP;
END$$;

-- Webhook replay protection table.
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  event_id text NOT NULL,
  event_type text,
  received_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, event_id)
);

GRANT ALL ON public.webhook_events TO service_role;

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
     WHERE schemaname = 'public' AND tablename = 'webhook_events'
       AND policyname = 'Admins can view webhook events'
  ) THEN
    CREATE POLICY "Admins can view webhook events"
      ON public.webhook_events
      FOR SELECT
      TO authenticated
      USING (has_role(auth.uid(), 'admin'::app_role));
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_webhook_events_received_at ON public.webhook_events(received_at DESC);

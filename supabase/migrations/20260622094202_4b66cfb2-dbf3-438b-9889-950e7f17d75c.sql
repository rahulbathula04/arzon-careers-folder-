
-- Retention check-in dispatcher: add due_at + magic token + idempotency
ALTER TABLE public.retention_checkins
  ADD COLUMN IF NOT EXISTS due_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS token text;

UPDATE public.retention_checkins SET token = encode(gen_random_bytes(24), 'hex') WHERE token IS NULL;
ALTER TABLE public.retention_checkins ALTER COLUMN token SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS retention_checkins_token_uidx ON public.retention_checkins(token);
CREATE UNIQUE INDEX IF NOT EXISTS retention_checkins_outcome_type_uidx
  ON public.retention_checkins(outcome_id, checkin_type);
CREATE INDEX IF NOT EXISTS retention_checkins_due_idx
  ON public.retention_checkins(due_at) WHERE sent_at IS NULL;

-- Allow anon to read a single row by token (magic link landing page)
DROP POLICY IF EXISTS "retention_checkins anon read by token" ON public.retention_checkins;
GRANT SELECT, UPDATE ON public.retention_checkins TO anon;

-- Enqueue due check-ins for any outcome that has progressed past 'recommended'
CREATE OR REPLACE FUNCTION public.enqueue_retention_checkins()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_inserted integer := 0;
  v_anchor timestamptz;
  o record;
  c record;
  schedule constant jsonb := '[
    {"type":"30d","days":30},
    {"type":"90d","days":90},
    {"type":"180d","days":180},
    {"type":"365d","days":365}
  ]'::jsonb;
BEGIN
  FOR o IN
    SELECT id, chosen_at, joined_at, stage
      FROM public.recommendation_outcomes
     WHERE stage IN ('chose_role','in_role')
  LOOP
    v_anchor := COALESCE(o.joined_at, o.chosen_at);
    IF v_anchor IS NULL THEN CONTINUE; END IF;
    FOR c IN SELECT * FROM jsonb_to_recordset(schedule) AS x(type text, days int)
    LOOP
      INSERT INTO public.retention_checkins(outcome_id, checkin_type, due_at, channel, token)
      VALUES (o.id, c.type, v_anchor + make_interval(days => c.days), 'email',
              encode(gen_random_bytes(24), 'hex'))
      ON CONFLICT (outcome_id, checkin_type) DO NOTHING;
      IF FOUND THEN v_inserted := v_inserted + 1; END IF;
    END LOOP;
  END LOOP;
  RETURN v_inserted;
END;
$$;

-- Atomically claim due check-ins so concurrent dispatchers don't double-send
CREATE OR REPLACE FUNCTION public.claim_due_retention_checkins(p_limit int DEFAULT 100)
RETURNS TABLE(id uuid, outcome_id uuid, checkin_type text, token text, due_at timestamptz,
              user_email text, recommended_family_id text, chosen_role_slug text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH due AS (
    SELECT rc.id
      FROM public.retention_checkins rc
     WHERE rc.sent_at IS NULL AND rc.due_at <= now()
     ORDER BY rc.due_at ASC
     LIMIT GREATEST(1, LEAST(p_limit, 500))
     FOR UPDATE SKIP LOCKED
  ),
  claimed AS (
    UPDATE public.retention_checkins rc
       SET sent_at = now()
      FROM due
     WHERE rc.id = due.id
    RETURNING rc.id, rc.outcome_id, rc.checkin_type, rc.token, rc.due_at
  )
  SELECT cl.id, cl.outcome_id, cl.checkin_type, cl.token, cl.due_at,
         ro.user_email, ro.recommended_family_id, ro.chosen_role_slug
    FROM claimed cl
    JOIN public.recommendation_outcomes ro ON ro.id = cl.outcome_id;
END;
$$;

-- Record a check-in response from the magic-link page
CREATE OR REPLACE FUNCTION public.record_retention_response(
  p_token text,
  p_still_in_role boolean,
  p_response jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_outcome_id uuid;
BEGIN
  IF p_token IS NULL OR length(p_token) < 16 THEN
    RAISE EXCEPTION 'invalid token';
  END IF;

  UPDATE public.retention_checkins
     SET responded_at = now(),
         response_json = COALESCE(p_response, '{}'::jsonb)
   WHERE token = p_token
   RETURNING outcome_id INTO v_outcome_id;

  IF v_outcome_id IS NULL THEN
    RAISE EXCEPTION 'check-in not found';
  END IF;

  UPDATE public.recommendation_outcomes
     SET still_in_role = p_still_in_role,
         status_last_checked_at = now(),
         stage = CASE WHEN p_still_in_role THEN 'in_role' ELSE 'left_role' END
   WHERE id = v_outcome_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.record_retention_response(text, boolean, jsonb) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_retention_checkins() TO service_role;
GRANT EXECUTE ON FUNCTION public.claim_due_retention_checkins(int) TO service_role;

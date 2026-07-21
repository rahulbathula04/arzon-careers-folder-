-- analytics_events table
CREATE TABLE public.analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  event_name text NOT NULL,
  anon_id uuid,
  user_id uuid,
  session_id uuid,
  application_id uuid,
  lead_id uuid,
  path text,
  referrer text,
  utm_source text,
  program_slug text,
  cohort text,
  props jsonb NOT NULL DEFAULT '{}'::jsonb,
  user_agent text,
  ip_hash text
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view analytics events"
ON public.analytics_events
FOR SELECT
TO authenticated
USING (public.has_any_role(auth.uid(), ARRAY['admin'::app_role, 'reviewer'::app_role, 'support'::app_role]));

-- No INSERT/UPDATE/DELETE policies => writes only via service role / SECURITY DEFINER fn

CREATE INDEX idx_analytics_events_name_created ON public.analytics_events (event_name, created_at DESC);
CREATE INDEX idx_analytics_events_anon ON public.analytics_events (anon_id, created_at);
CREATE INDEX idx_analytics_events_application ON public.analytics_events (application_id);
CREATE INDEX idx_analytics_events_lead ON public.analytics_events (lead_id);
CREATE INDEX idx_analytics_events_created ON public.analytics_events (created_at DESC);

-- Insert helper. Validates lengths and writes a single row.
CREATE OR REPLACE FUNCTION public.track_event(
  p_event_name text,
  p_anon_id uuid DEFAULT NULL,
  p_user_id uuid DEFAULT NULL,
  p_session_id uuid DEFAULT NULL,
  p_application_id uuid DEFAULT NULL,
  p_lead_id uuid DEFAULT NULL,
  p_path text DEFAULT NULL,
  p_referrer text DEFAULT NULL,
  p_utm_source text DEFAULT NULL,
  p_program_slug text DEFAULT NULL,
  p_cohort text DEFAULT NULL,
  p_props jsonb DEFAULT '{}'::jsonb,
  p_user_agent text DEFAULT NULL,
  p_ip_hash text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_name text := nullif(left(coalesce(p_event_name, ''), 64), '');
BEGIN
  IF v_name IS NULL THEN
    RAISE EXCEPTION 'event_name required';
  END IF;

  INSERT INTO public.analytics_events (
    event_name, anon_id, user_id, session_id, application_id, lead_id,
    path, referrer, utm_source, program_slug, cohort, props, user_agent, ip_hash
  ) VALUES (
    v_name,
    p_anon_id,
    p_user_id,
    p_session_id,
    p_application_id,
    p_lead_id,
    nullif(left(coalesce(p_path, ''), 256), ''),
    nullif(left(coalesce(p_referrer, ''), 256), ''),
    nullif(left(coalesce(p_utm_source, ''), 64), ''),
    nullif(left(coalesce(p_program_slug, ''), 80), ''),
    nullif(left(coalesce(p_cohort, ''), 64), ''),
    coalesce(p_props, '{}'::jsonb),
    nullif(left(coalesce(p_user_agent, ''), 256), ''),
    nullif(left(coalesce(p_ip_hash, ''), 128), '')
  )
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;
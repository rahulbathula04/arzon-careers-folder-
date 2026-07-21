
CREATE TABLE public.readiness_journey (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  lead_id uuid NULL REFERENCES public.career_engine_leads(id) ON DELETE SET NULL,
  started_at timestamptz NULL,
  submitted_at timestamptz NULL,
  paid_at timestamptz NULL,
  archetype text NULL,
  score_band text NULL,
  amount_inr integer NULL,
  utm jsonb NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX readiness_journey_started_idx ON public.readiness_journey (started_at DESC);
CREATE INDEX readiness_journey_submitted_idx ON public.readiness_journey (submitted_at DESC);
CREATE INDEX readiness_journey_paid_idx ON public.readiness_journey (paid_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.readiness_journey TO anon, authenticated;
GRANT ALL ON public.readiness_journey TO service_role;

ALTER TABLE public.readiness_journey ENABLE ROW LEVEL SECURITY;

-- Anyone can create their own journey row; the server function generates the session_id.
CREATE POLICY "Anyone can insert journey"
  ON public.readiness_journey FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Updates are routed exclusively through SECURITY DEFINER server functions
-- (markStarted/markSubmitted/markPaid) which scope by session_id, so block
-- direct client updates.
CREATE POLICY "Block direct updates"
  ON public.readiness_journey FOR UPDATE
  TO anon, authenticated
  USING (false) WITH CHECK (false);

-- Only staff/admins can read the funnel.
CREATE POLICY "Admins read all journeys"
  ON public.readiness_journey FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_readiness_journey_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END $$;

CREATE TRIGGER readiness_journey_touch_updated_at
  BEFORE UPDATE ON public.readiness_journey
  FOR EACH ROW EXECUTE FUNCTION public.touch_readiness_journey_updated_at();

-- Single SECURITY DEFINER RPC for mark* operations. The session_id is a
-- 128-bit random uuid stored client-side, so possession of the session_id
-- authorises mutations on that row only.
CREATE OR REPLACE FUNCTION public.mark_readiness_journey(
  _session_id text,
  _kind text,
  _lead_id uuid DEFAULT NULL,
  _archetype text DEFAULT NULL,
  _score_band text DEFAULT NULL,
  _amount_inr integer DEFAULT NULL,
  _utm jsonb DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _session_id IS NULL OR length(_session_id) < 8 THEN
    RAISE EXCEPTION 'invalid session_id';
  END IF;
  IF _kind NOT IN ('started','submitted','paid') THEN
    RAISE EXCEPTION 'invalid kind';
  END IF;

  INSERT INTO public.readiness_journey (session_id, started_at, submitted_at, paid_at, lead_id, archetype, score_band, amount_inr, utm)
  VALUES (
    _session_id,
    CASE WHEN _kind = 'started' THEN now() ELSE NULL END,
    CASE WHEN _kind = 'submitted' THEN now() ELSE NULL END,
    CASE WHEN _kind = 'paid' THEN now() ELSE NULL END,
    _lead_id, _archetype, _score_band, _amount_inr, _utm
  )
  ON CONFLICT (session_id) DO UPDATE SET
    started_at = COALESCE(public.readiness_journey.started_at,
                          CASE WHEN _kind = 'started' THEN now() ELSE NULL END),
    submitted_at = COALESCE(public.readiness_journey.submitted_at,
                            CASE WHEN _kind = 'submitted' THEN now() ELSE NULL END),
    paid_at = COALESCE(public.readiness_journey.paid_at,
                       CASE WHEN _kind = 'paid' THEN now() ELSE NULL END),
    lead_id = COALESCE(EXCLUDED.lead_id, public.readiness_journey.lead_id),
    archetype = COALESCE(EXCLUDED.archetype, public.readiness_journey.archetype),
    score_band = COALESCE(EXCLUDED.score_band, public.readiness_journey.score_band),
    amount_inr = COALESCE(EXCLUDED.amount_inr, public.readiness_journey.amount_inr),
    utm = COALESCE(EXCLUDED.utm, public.readiness_journey.utm);
END $$;

REVOKE ALL ON FUNCTION public.mark_readiness_journey(text,text,uuid,text,text,integer,jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.mark_readiness_journey(text,text,uuid,text,text,integer,jsonb) TO anon, authenticated, service_role;

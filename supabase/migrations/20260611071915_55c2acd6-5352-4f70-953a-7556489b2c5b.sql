-- 1) Funnel view ----------------------------------------------------------
CREATE OR REPLACE VIEW public.vw_apply_funnel_sessions AS
WITH ab AS (
  SELECT DISTINCT ON (anon_id, (props->>'experiment'))
    anon_id,
    (props->>'experiment') AS experiment,
    (props->>'variant')    AS variant
  FROM public.analytics_events
  WHERE event_name = 'ab_assignment'
    AND anon_id IS NOT NULL
    AND (props ? 'experiment') AND (props ? 'variant')
  ORDER BY anon_id, (props->>'experiment'), created_at ASC
),
cta AS (
  SELECT DISTINCT ON (session_id)
    session_id, anon_id, created_at AS cta_at,
    props->>'surface' AS surface,
    props->>'experiment_variant' AS cta_variant
  FROM public.analytics_events
  WHERE event_name = 'apply_cta_click' AND session_id IS NOT NULL
  ORDER BY session_id, created_at ASC
),
started AS (
  SELECT DISTINCT ON (session_id) session_id, created_at AS started_at
  FROM public.analytics_events
  WHERE event_name = 'apply_started' AND session_id IS NOT NULL
  ORDER BY session_id, created_at ASC
),
submitted AS (
  SELECT DISTINCT ON (session_id) session_id, created_at AS submitted_at
  FROM public.analytics_events
  WHERE event_name = 'apply_submitted' AND session_id IS NOT NULL
  ORDER BY session_id, created_at ASC
)
SELECT
  cta.session_id,
  cta.anon_id,
  cta.cta_at,
  cta.surface,
  cta.cta_variant,
  ab.variant      AS assigned_variant,
  started.started_at,
  submitted.submitted_at,
  (started.started_at   IS NOT NULL) AS reached_form,
  (submitted.submitted_at IS NOT NULL) AS reached_submit
FROM cta
LEFT JOIN started   ON started.session_id   = cta.session_id
LEFT JOIN submitted ON submitted.session_id = cta.session_id
LEFT JOIN ab        ON ab.anon_id = cta.anon_id AND ab.experiment = 'sticky_cta_placement';

GRANT SELECT ON public.vw_apply_funnel_sessions TO authenticated, service_role;

-- 2) Content QA reviews ---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_qa_reviews (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page        text NOT NULL,
  section_id  text NOT NULL,
  bucket      text NOT NULL CHECK (bucket IN ('desire','proof','sell','rescue')),
  status      text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','reviewed','approved','live','rejected')),
  notes       text,
  reviewer_id uuid REFERENCES auth.users(id),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page, section_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_qa_reviews TO authenticated;
GRANT ALL ON public.content_qa_reviews TO service_role;

ALTER TABLE public.content_qa_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "content_qa_reviews admin read"
  ON public.content_qa_reviews FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "content_qa_reviews admin write"
  ON public.content_qa_reviews FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER content_qa_reviews_touch
  BEFORE UPDATE ON public.content_qa_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

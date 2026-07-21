
ALTER TABLE public.enrolment_intents
  ADD COLUMN IF NOT EXISTS variant_layout text,
  ADD COLUMN IF NOT EXISTS variant_cta    text,
  ADD COLUMN IF NOT EXISTS exp_uid        text,
  ADD COLUMN IF NOT EXISTS course_slug    text,
  ADD COLUMN IF NOT EXISTS source         text;

CREATE INDEX IF NOT EXISTS idx_enrolment_intents_course_slug
  ON public.enrolment_intents (course_slug);
CREATE INDEX IF NOT EXISTS idx_enrolment_intents_exp_uid
  ON public.enrolment_intents (exp_uid);

CREATE OR REPLACE FUNCTION public.submit_course_enquiry(
  p_course_slug    text,
  p_name           text,
  p_email          text,
  p_phone          text,
  p_city           text,
  p_preferred_slot text,
  p_variant_layout text,
  p_variant_cta    text,
  p_exp_uid        text,
  p_placement      text,
  p_base_price_inr integer,
  p_utm_source     text DEFAULT NULL,
  p_user_agent     text DEFAULT NULL
) RETURNS TABLE(id uuid, intent_token text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_id    uuid;
  v_token text;
  v_name  text := trim(coalesce(p_name,''));
  v_email text := lower(trim(coalesce(p_email,'')));
  v_phone text := regexp_replace(coalesce(p_phone,''), '\D', '', 'g');
  v_slug  text := lower(trim(coalesce(p_course_slug,'')));
BEGIN
  IF length(v_slug) < 1 OR length(v_slug) > 80 THEN RAISE EXCEPTION 'invalid course'; END IF;
  IF length(v_name) < 2 OR length(v_name) > 80 THEN RAISE EXCEPTION 'invalid name'; END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 15 THEN RAISE EXCEPTION 'invalid phone'; END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(v_email) > 120 THEN
    RAISE EXCEPTION 'invalid email';
  END IF;
  IF p_base_price_inr IS NULL OR p_base_price_inr <= 0 THEN RAISE EXCEPTION 'invalid price'; END IF;

  INSERT INTO public.enrolment_intents (
    tier, name, email, phone, city, base_price_inr,
    utm_source, user_agent,
    course_slug, source, variant_layout, variant_cta, exp_uid,
    background
  ) VALUES (
    'career', v_name, v_email, v_phone,
    nullif(left(coalesce(p_city,''),80),''),
    p_base_price_inr,
    nullif(left(coalesce(p_utm_source,''),64),''),
    nullif(left(coalesce(p_user_agent,''),256),''),
    v_slug,
    nullif(left(coalesce('curriculum_'||coalesce(p_placement,'drawer'),''),64),''),
    nullif(left(coalesce(p_variant_layout,''),32),''),
    nullif(left(coalesce(p_variant_cta,''),32),''),
    nullif(left(coalesce(p_exp_uid,''),64),''),
    nullif(left(coalesce(p_preferred_slot,''),120),'')
  )
  RETURNING enrolment_intents.id, enrolment_intents.intent_token INTO v_id, v_token;

  RETURN QUERY SELECT v_id, v_token;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_course_enquiry(
  text, text, text, text, text, text, text, text, text, text, integer, text, text
) TO anon, authenticated;

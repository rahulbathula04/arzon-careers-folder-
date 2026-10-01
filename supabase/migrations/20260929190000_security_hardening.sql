-- Security hardening: public demand submissions are not phone-verified.
-- Only a real OTP/payment/staff verification flow may set verified_at.
-- Keeping this NULL prevents unverified traffic from inflating public demand counts.

CREATE OR REPLACE FUNCTION public.request_demand_track(
  p_title text, p_category text, p_pitch text, p_name text,
  p_phone text, p_email text, p_experience_level text, p_why text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_slug text; v_base_slug text; v_track_id uuid; v_status text;
  v_created boolean := false; v_duplicate_vote boolean := false;
  v_allowed_categories text[] := ARRAY['engineering','healthcare','life-sciences','business','tech','agriculture','design','other'];
  v_allowed_levels text[] := ARRAY['student','fresher','1-3y','3-5y','5y+'];
BEGIN
  IF p_title IS NULL OR char_length(trim(p_title)) < 4 OR char_length(p_title) > 80 THEN RAISE EXCEPTION 'invalid_title'; END IF;
  IF NOT (p_category = ANY(v_allowed_categories)) THEN RAISE EXCEPTION 'invalid_category'; END IF;
  IF p_pitch IS NULL OR char_length(trim(p_pitch)) < 20 OR char_length(p_pitch) > 500 THEN RAISE EXCEPTION 'invalid_pitch'; END IF;
  IF p_name IS NULL OR char_length(trim(p_name)) < 1 OR char_length(p_name) > 120 THEN RAISE EXCEPTION 'invalid_name'; END IF;
  IF p_phone IS NULL OR p_phone !~ '^[+0-9 ()\-]{7,20}$' THEN RAISE EXCEPTION 'invalid_phone'; END IF;
  IF p_email IS NOT NULL AND p_email <> '' AND char_length(p_email) > 255 THEN RAISE EXCEPTION 'invalid_email'; END IF;
  IF NOT (p_experience_level = ANY(v_allowed_levels)) THEN RAISE EXCEPTION 'invalid_experience_level'; END IF;
  IF p_why IS NULL OR char_length(trim(p_why)) < 1 OR char_length(p_why) > 800 THEN RAISE EXCEPTION 'invalid_why'; END IF;

  IF public.ce_rate_hit('demand_track_req:' || p_phone, 5, 3600) THEN
    RAISE EXCEPTION 'rate_limited';
  END IF;

  v_base_slug := regexp_replace(lower(trim(p_title)), '[^a-z0-9]+', '-', 'g');
  v_base_slug := regexp_replace(v_base_slug, '(^-+|-+$)', '', 'g');
  v_base_slug := substr(v_base_slug, 1, 80);
  IF v_base_slug = '' THEN v_base_slug := 'track'; END IF;
  v_slug := v_base_slug;

  SELECT id, status INTO v_track_id, v_status FROM demand_tracks WHERE slug = v_slug;
  IF FOUND THEN
    IF v_status = 'live' THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'already_live', 'slug', v_slug);
    END IF;
  ELSE
    BEGIN
      INSERT INTO demand_tracks (slug, title, category, pitch, status)
      VALUES (v_slug, p_title, p_category, p_pitch, 'voting') RETURNING id INTO v_track_id;
      v_created := true;
    EXCEPTION WHEN unique_violation THEN
      v_slug := v_base_slug || '-' || substr(md5(random()::text || clock_timestamp()::text), 1, 4);
      INSERT INTO demand_tracks (slug, title, category, pitch, status)
      VALUES (v_slug, p_title, p_category, p_pitch, 'voting') RETURNING id INTO v_track_id;
      v_created := true;
    END;
  END IF;

  BEGIN
    INSERT INTO demand_votes (
      track_id, name, phone, email, experience_level, why,
      verified_at, reservation_status, amount_inr
    )
    VALUES (
      v_track_id, p_name, p_phone, NULLIF(p_email,''), p_experience_level, p_why,
      NULL, 'pending', 499
    );
  EXCEPTION WHEN unique_violation THEN
    v_duplicate_vote := true;
  END;

  RETURN jsonb_build_object(
    'ok', true,
    'created', v_created,
    'slug', v_slug,
    'duplicateVote', v_duplicate_vote
  );
END;
$$;

REVOKE ALL ON FUNCTION public.request_demand_track(text,text,text,text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.request_demand_track(text,text,text,text,text,text,text,text) TO anon, authenticated;

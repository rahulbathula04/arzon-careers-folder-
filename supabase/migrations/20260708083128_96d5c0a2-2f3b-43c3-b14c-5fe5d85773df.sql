
-- 1) request_demand_track: SECURITY DEFINER RPC replacing service-role INSERT
CREATE OR REPLACE FUNCTION public.request_demand_track(
  p_title text,
  p_category text,
  p_pitch text,
  p_name text,
  p_phone text,
  p_email text,
  p_experience_level text,
  p_why text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_slug text;
  v_base_slug text;
  v_track_id uuid;
  v_status text;
  v_created boolean := false;
  v_duplicate_vote boolean := false;
  v_allowed_categories text[] := ARRAY['engineering','healthcare','life-sciences','business','tech','agriculture','design','other'];
  v_allowed_levels text[] := ARRAY['student','fresher','1-3y','3-5y','5y+'];
BEGIN
  -- Input validation
  IF p_title IS NULL OR char_length(trim(p_title)) < 4 OR char_length(p_title) > 80 THEN
    RAISE EXCEPTION 'invalid_title';
  END IF;
  IF NOT (p_category = ANY(v_allowed_categories)) THEN
    RAISE EXCEPTION 'invalid_category';
  END IF;
  IF p_pitch IS NULL OR char_length(trim(p_pitch)) < 20 OR char_length(p_pitch) > 500 THEN
    RAISE EXCEPTION 'invalid_pitch';
  END IF;
  IF p_name IS NULL OR char_length(trim(p_name)) < 1 OR char_length(p_name) > 120 THEN
    RAISE EXCEPTION 'invalid_name';
  END IF;
  IF p_phone IS NULL OR p_phone !~ '^[+0-9 ()\-]{7,20}$' THEN
    RAISE EXCEPTION 'invalid_phone';
  END IF;
  IF p_email IS NOT NULL AND p_email <> '' AND char_length(p_email) > 255 THEN
    RAISE EXCEPTION 'invalid_email';
  END IF;
  IF NOT (p_experience_level = ANY(v_allowed_levels)) THEN
    RAISE EXCEPTION 'invalid_experience_level';
  END IF;
  IF p_why IS NULL OR char_length(trim(p_why)) < 1 OR char_length(p_why) > 800 THEN
    RAISE EXCEPTION 'invalid_why';
  END IF;

  -- Rate limit: max 5 track requests per hour per phone
  IF NOT public.ce_rate_hit('demand_track_req:' || p_phone, 5, 3600) THEN
    RAISE EXCEPTION 'rate_limited';
  END IF;

  -- Compute base slug
  v_base_slug := regexp_replace(lower(trim(p_title)), '[^a-z0-9]+', '-', 'g');
  v_base_slug := regexp_replace(v_base_slug, '(^-+|-+$)', '', 'g');
  v_base_slug := substr(v_base_slug, 1, 80);
  IF v_base_slug = '' THEN v_base_slug := 'track'; END IF;
  v_slug := v_base_slug;

  -- Check existing
  SELECT id, status INTO v_track_id, v_status FROM demand_tracks WHERE slug = v_slug;

  IF FOUND THEN
    IF v_status = 'live' THEN
      RETURN jsonb_build_object('ok', false, 'reason', 'already_live', 'slug', v_slug);
    END IF;
  ELSE
    BEGIN
      INSERT INTO demand_tracks (slug, title, category, pitch, status)
      VALUES (v_slug, p_title, p_category, p_pitch, 'voting')
      RETURNING id INTO v_track_id;
      v_created := true;
    EXCEPTION WHEN unique_violation THEN
      v_slug := v_base_slug || '-' || substr(md5(random()::text || clock_timestamp()::text), 1, 4);
      INSERT INTO demand_tracks (slug, title, category, pitch, status)
      VALUES (v_slug, p_title, p_category, p_pitch, 'voting')
      RETURNING id INTO v_track_id;
      v_created := true;
    END;
  END IF;

  -- Record first vote (idempotent on unique_violation)
  BEGIN
    INSERT INTO demand_votes (track_id, name, phone, email, experience_level, why, verified_at, reservation_status, amount_inr)
    VALUES (v_track_id, p_name, p_phone, NULLIF(p_email,''), p_experience_level, p_why, now(), 'pending', 499);
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

REVOKE ALL ON FUNCTION public.request_demand_track(text,text,text,text,text,text,text,text) FROM public;
GRANT EXECUTE ON FUNCTION public.request_demand_track(text,text,text,text,text,text,text,text) TO anon, authenticated;

-- 2) record_recommendation_outcome: SECURITY DEFINER RPC that refuses to
--    overwrite rows already owned by a signed-in user, and rate-limits writes.
CREATE OR REPLACE FUNCTION public.record_recommendation_outcome(
  p_lead_id uuid,
  p_family_id text,
  p_recommended_role_slug text,
  p_chosen_role_slug text,
  p_stage text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_existing_user uuid;
  v_lead_exists boolean;
BEGIN
  -- Validate inputs
  IF p_lead_id IS NULL THEN
    RAISE EXCEPTION 'invalid_lead_id';
  END IF;
  IF p_family_id IS NULL OR char_length(p_family_id) > 120 THEN
    RAISE EXCEPTION 'invalid_family_id';
  END IF;
  IF p_recommended_role_slug IS NOT NULL AND char_length(p_recommended_role_slug) > 120 THEN
    RAISE EXCEPTION 'invalid_recommended_slug';
  END IF;
  IF p_chosen_role_slug IS NOT NULL AND char_length(p_chosen_role_slug) > 120 THEN
    RAISE EXCEPTION 'invalid_chosen_slug';
  END IF;
  IF p_stage NOT IN ('recommended','chose_role') THEN
    RAISE EXCEPTION 'invalid_stage';
  END IF;

  -- Rate limit per lead (max 30 writes/hour)
  IF NOT public.ce_rate_hit('rec_outcome:' || p_lead_id::text, 30, 3600) THEN
    RAISE EXCEPTION 'rate_limited';
  END IF;

  -- Verify the referenced lead exists (prevents spamming random UUIDs)
  SELECT EXISTS(SELECT 1 FROM career_engine_leads WHERE id = p_lead_id AND deleted_at IS NULL)
    INTO v_lead_exists;
  IF NOT v_lead_exists THEN
    RAISE EXCEPTION 'lead_not_found';
  END IF;

  -- Never overwrite a row already claimed by an authenticated user
  SELECT user_id INTO v_existing_user FROM recommendation_outcomes WHERE lead_id = p_lead_id;
  IF v_existing_user IS NOT NULL AND v_existing_user <> COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid) THEN
    RAISE EXCEPTION 'row_owned_by_user';
  END IF;

  INSERT INTO recommendation_outcomes (
    lead_id, recommended_family_id, recommended_role_slug, chosen_role_slug,
    recommended_at, chosen_at, stage, source, user_id
  )
  VALUES (
    p_lead_id, p_family_id, p_recommended_role_slug, p_chosen_role_slug,
    CASE WHEN p_stage = 'recommended' THEN now() ELSE NULL END,
    CASE WHEN p_stage = 'chose_role' THEN now() ELSE NULL END,
    p_stage, 'self_report', auth.uid()
  )
  ON CONFLICT (lead_id) DO UPDATE SET
    recommended_family_id = COALESCE(EXCLUDED.recommended_family_id, recommendation_outcomes.recommended_family_id),
    recommended_role_slug = COALESCE(EXCLUDED.recommended_role_slug, recommendation_outcomes.recommended_role_slug),
    chosen_role_slug      = COALESCE(EXCLUDED.chosen_role_slug, recommendation_outcomes.chosen_role_slug),
    recommended_at        = COALESCE(EXCLUDED.recommended_at, recommendation_outcomes.recommended_at),
    chosen_at             = COALESCE(EXCLUDED.chosen_at, recommendation_outcomes.chosen_at),
    stage                 = EXCLUDED.stage,
    updated_at            = now()
  WHERE recommendation_outcomes.user_id IS NULL
     OR recommendation_outcomes.user_id = auth.uid();

  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL ON FUNCTION public.record_recommendation_outcome(uuid,text,text,text,text) FROM public;
GRANT EXECUTE ON FUNCTION public.record_recommendation_outcome(uuid,text,text,text,text) TO anon, authenticated;

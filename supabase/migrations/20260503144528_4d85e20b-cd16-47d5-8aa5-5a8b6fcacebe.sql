
-- ──────────────────────────────────────────────
-- 1. Per-session secret token
-- ──────────────────────────────────────────────
ALTER TABLE public.career_engine_sessions
  ADD COLUMN IF NOT EXISTS session_token text;

UPDATE public.career_engine_sessions
   SET session_token = encode(gen_random_bytes(24), 'base64')
 WHERE session_token IS NULL;

ALTER TABLE public.career_engine_sessions
  ALTER COLUMN session_token SET NOT NULL,
  ALTER COLUMN session_token SET DEFAULT encode(gen_random_bytes(24), 'base64');

CREATE INDEX IF NOT EXISTS ce_sessions_token_idx
  ON public.career_engine_sessions(session_token);

-- Hide the token column from any future direct SELECTs by anon/authenticated
REVOKE SELECT ON public.career_engine_sessions FROM anon, authenticated;

-- ──────────────────────────────────────────────
-- 2. Ownership assertion helper
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.ce_assert_session_owner(
  p_session_id uuid, p_session_token text
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF p_session_id IS NULL OR p_session_token IS NULL OR length(p_session_token) < 16 THEN
    RAISE EXCEPTION 'session auth required';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM public.career_engine_sessions
     WHERE id = p_session_id AND session_token = p_session_token
  ) THEN
    RAISE EXCEPTION 'session auth failed';
  END IF;
END; $$;

REVOKE EXECUTE ON FUNCTION public.ce_assert_session_owner(uuid, text) FROM PUBLIC;

-- ──────────────────────────────────────────────
-- 3. ce_start_session: now returns the token alongside the id
-- ──────────────────────────────────────────────
DROP FUNCTION IF EXISTS public.ce_start_session(text, text, text, text);

CREATE OR REPLACE FUNCTION public.ce_start_session(
  p_stream text DEFAULT NULL,
  p_device text DEFAULT NULL,
  p_utm_source text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
) RETURNS TABLE(session_id uuid, session_token text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_id uuid;
  v_token text;
BEGIN
  INSERT INTO public.career_engine_sessions (stream, device, utm_source, user_agent)
  VALUES (
    nullif(left(coalesce(p_stream, ''), 32), ''),
    nullif(left(coalesce(p_device, ''), 32), ''),
    nullif(left(coalesce(p_utm_source, ''), 64), ''),
    nullif(left(coalesce(p_user_agent, ''), 256), '')
  )
  RETURNING id, career_engine_sessions.session_token INTO v_id, v_token;
  RETURN QUERY SELECT v_id, v_token;
END; $$;

GRANT EXECUTE ON FUNCTION public.ce_start_session(text, text, text, text) TO anon, authenticated;

-- ──────────────────────────────────────────────
-- 4. ce_record_answer: require token
-- ──────────────────────────────────────────────
DROP FUNCTION IF EXISTS public.ce_record_answer(uuid, text, text);

CREATE OR REPLACE FUNCTION public.ce_record_answer(
  p_session_id uuid,
  p_question_id text,
  p_answer text,
  p_session_token text
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  PERFORM public.ce_assert_session_owner(p_session_id, p_session_token);
  IF p_question_id IS NULL OR length(p_question_id) = 0 OR length(p_question_id) > 64 THEN
    RAISE EXCEPTION 'invalid question_id';
  END IF;
  IF p_answer IS NULL OR length(p_answer) > 512 THEN
    RAISE EXCEPTION 'invalid answer';
  END IF;

  INSERT INTO public.career_engine_answers (session_id, question_id, answer)
  VALUES (p_session_id, p_question_id, p_answer)
  ON CONFLICT (session_id, question_id)
    DO UPDATE SET answer = excluded.answer, asked_at = now();

  IF p_question_id = 'stream' THEN
    UPDATE public.career_engine_sessions
       SET stream = nullif(left(p_answer, 32), '')
     WHERE id = p_session_id;
  END IF;
END; $$;

GRANT EXECUTE ON FUNCTION public.ce_record_answer(uuid, text, text, text) TO anon, authenticated;

-- ──────────────────────────────────────────────
-- 5. ce_create_lead_early: require token
-- ──────────────────────────────────────────────
DROP FUNCTION IF EXISTS public.ce_create_lead_early(uuid, text, text, text, boolean);

CREATE OR REPLACE FUNCTION public.ce_create_lead_early(
  p_session_id uuid,
  p_name text,
  p_phone text,
  p_email text,
  p_whatsapp_optin boolean,
  p_session_token text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_lead_id uuid;
  v_name  text := trim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_email text := lower(trim(coalesce(p_email, '')));
BEGIN
  PERFORM public.ce_assert_session_owner(p_session_id, p_session_token);
  IF length(v_name)  < 2 OR length(v_name)  > 80  THEN RAISE EXCEPTION 'invalid name';  END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 15 THEN RAISE EXCEPTION 'invalid phone'; END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(v_email) > 120 THEN
    RAISE EXCEPTION 'invalid email';
  END IF;

  SELECT id INTO v_lead_id
    FROM public.career_engine_leads
   WHERE session_id = p_session_id
   ORDER BY created_at ASC
   LIMIT 1;

  IF v_lead_id IS NOT NULL THEN
    UPDATE public.career_engine_leads
       SET name = v_name, phone = v_phone, email = v_email,
           whatsapp_optin = coalesce(p_whatsapp_optin, true)
     WHERE id = v_lead_id;
    RETURN v_lead_id;
  END IF;

  INSERT INTO public.career_engine_leads (
    session_id, name, phone, email, whatsapp_optin
  ) VALUES (
    p_session_id, v_name, v_phone, v_email, coalesce(p_whatsapp_optin, true)
  )
  RETURNING id INTO v_lead_id;

  RETURN v_lead_id;
END; $$;

GRANT EXECUTE ON FUNCTION public.ce_create_lead_early(uuid, text, text, text, boolean, text) TO anon, authenticated;

-- ──────────────────────────────────────────────
-- 6. ce_submit_lead: require token
-- ──────────────────────────────────────────────
DROP FUNCTION IF EXISTS public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb);

CREATE OR REPLACE FUNCTION public.ce_submit_lead(
  p_session_id uuid,
  p_name text,
  p_phone text,
  p_email text,
  p_whatsapp_optin boolean,
  p_archetype text,
  p_top_paths jsonb,
  p_fit_score integer,
  p_result_payload jsonb,
  p_session_token text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_lead_id uuid;
  v_name  text := trim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_email text := lower(trim(coalesce(p_email, '')));
BEGIN
  PERFORM public.ce_assert_session_owner(p_session_id, p_session_token);
  IF length(v_name) < 2 OR length(v_name) > 80 THEN RAISE EXCEPTION 'invalid name'; END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 15 THEN RAISE EXCEPTION 'invalid phone'; END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(v_email) > 120 THEN
    RAISE EXCEPTION 'invalid email';
  END IF;

  INSERT INTO public.career_engine_leads (
    session_id, name, phone, email, whatsapp_optin,
    archetype, top_paths, fit_score, result_payload
  ) VALUES (
    p_session_id, v_name, v_phone, v_email, coalesce(p_whatsapp_optin, true),
    nullif(left(coalesce(p_archetype, ''), 64), ''),
    p_top_paths, p_fit_score, p_result_payload
  )
  RETURNING id INTO v_lead_id;

  UPDATE public.career_engine_sessions SET completed_at = now() WHERE id = p_session_id;
  RETURN v_lead_id;
END; $$;

GRANT EXECUTE ON FUNCTION public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb, text) TO anon, authenticated;

-- ──────────────────────────────────────────────
-- 7. ce_finalize_lead: require token (verified via the lead's session)
-- ──────────────────────────────────────────────
DROP FUNCTION IF EXISTS public.ce_finalize_lead(uuid, text, jsonb, integer, jsonb);

CREATE OR REPLACE FUNCTION public.ce_finalize_lead(
  p_lead_id uuid,
  p_archetype text,
  p_top_paths jsonb,
  p_fit_score integer,
  p_result_payload jsonb,
  p_session_token text
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_session_id uuid;
BEGIN
  IF p_lead_id IS NULL THEN RAISE EXCEPTION 'lead_id required'; END IF;

  SELECT session_id INTO v_session_id
    FROM public.career_engine_leads WHERE id = p_lead_id;
  IF v_session_id IS NULL THEN RAISE EXCEPTION 'lead not found'; END IF;

  PERFORM public.ce_assert_session_owner(v_session_id, p_session_token);

  UPDATE public.career_engine_leads
     SET archetype      = nullif(left(coalesce(p_archetype, ''), 64), ''),
         top_paths      = p_top_paths,
         fit_score      = p_fit_score,
         result_payload = p_result_payload
   WHERE id = p_lead_id;

  UPDATE public.career_engine_sessions
     SET completed_at = now()
   WHERE id = v_session_id;
END; $$;

GRANT EXECUTE ON FUNCTION public.ce_finalize_lead(uuid, text, jsonb, integer, jsonb, text) TO anon, authenticated;

-- ──────────────────────────────────────────────
-- 8. ce_set_cohort: require token
-- ──────────────────────────────────────────────
DROP FUNCTION IF EXISTS public.ce_set_cohort(uuid, text);

CREATE OR REPLACE FUNCTION public.ce_set_cohort(
  p_lead_id uuid, p_cohort_id text, p_session_token text
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_cohort text := lower(trim(coalesce(p_cohort_id, '')));
  v_session_id uuid;
BEGIN
  IF p_lead_id IS NULL THEN RAISE EXCEPTION 'lead_id required'; END IF;
  IF v_cohort NOT IN ('may-2026','aug-2026','nov-2026') THEN
    RAISE EXCEPTION 'invalid cohort_id';
  END IF;

  SELECT session_id INTO v_session_id
    FROM public.career_engine_leads WHERE id = p_lead_id;
  IF v_session_id IS NULL THEN RAISE EXCEPTION 'lead not found'; END IF;

  PERFORM public.ce_assert_session_owner(v_session_id, p_session_token);

  UPDATE public.career_engine_leads SET cohort_id = v_cohort WHERE id = p_lead_id;
END; $$;

GRANT EXECUTE ON FUNCTION public.ce_set_cohort(uuid, text, text) TO anon, authenticated;

-- ──────────────────────────────────────────────
-- 9. Drop the open "anyone can insert" RLS policies.
--    All writes must now go through the token-validated RPCs above.
-- ──────────────────────────────────────────────
DROP POLICY IF EXISTS "Anyone can start a session" ON public.career_engine_sessions;
DROP POLICY IF EXISTS "Anyone can record answers"  ON public.career_engine_answers;
DROP POLICY IF EXISTS "Anyone can submit a lead"   ON public.career_engine_leads;

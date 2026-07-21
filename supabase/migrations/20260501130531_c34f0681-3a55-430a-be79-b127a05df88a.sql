-- ============================================================
-- Career Engine RPCs: SECURITY DEFINER refactor + missing functions
-- ============================================================

-- 1) ce_start_session — SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.ce_start_session(
  p_stream     text DEFAULT NULL,
  p_device     text DEFAULT NULL,
  p_utm_source text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO public.career_engine_sessions (stream, device, utm_source, user_agent)
  VALUES (
    nullif(left(coalesce(p_stream, ''), 32), ''),
    nullif(left(coalesce(p_device, ''), 32), ''),
    nullif(left(coalesce(p_utm_source, ''), 64), ''),
    nullif(left(coalesce(p_user_agent, ''), 256), '')
  )
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$function$;

-- 2) ce_record_answer — SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.ce_record_answer(
  p_session_id  uuid,
  p_question_id text,
  p_answer      text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF p_session_id IS NULL THEN RAISE EXCEPTION 'session_id required'; END IF;
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
END;
$function$;

-- 3) ce_submit_lead — SECURITY DEFINER (legacy single-shot path)
CREATE OR REPLACE FUNCTION public.ce_submit_lead(
  p_session_id     uuid,
  p_name           text,
  p_phone          text,
  p_email          text,
  p_whatsapp_optin boolean,
  p_archetype      text,
  p_top_paths      jsonb,
  p_fit_score      integer,
  p_result_payload jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_lead_id uuid;
  v_name  text := trim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_email text := lower(trim(coalesce(p_email, '')));
BEGIN
  IF p_session_id IS NULL THEN RAISE EXCEPTION 'session_id required'; END IF;
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
    p_top_paths,
    p_fit_score,
    p_result_payload
  )
  RETURNING id INTO v_lead_id;

  UPDATE public.career_engine_sessions
     SET completed_at = now()
   WHERE id = p_session_id;

  RETURN v_lead_id;
END;
$function$;

-- 4) ce_get_result — SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.ce_get_result(p_lead_id uuid)
RETURNS TABLE(
  archetype      text,
  top_paths      jsonb,
  fit_score      integer,
  result_payload jsonb,
  created_at     timestamp with time zone
)
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT archetype, top_paths, fit_score, result_payload, created_at
    FROM public.career_engine_leads
   WHERE id = p_lead_id;
$function$;

-- 5) NEW: ce_create_lead_early — captures profile BEFORE the test
CREATE OR REPLACE FUNCTION public.ce_create_lead_early(
  p_session_id     uuid,
  p_name           text,
  p_phone          text,
  p_email          text,
  p_whatsapp_optin boolean
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_lead_id uuid;
  v_name  text := trim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_email text := lower(trim(coalesce(p_email, '')));
BEGIN
  IF p_session_id IS NULL THEN RAISE EXCEPTION 'session_id required'; END IF;
  IF length(v_name)  < 2 OR length(v_name)  > 80  THEN RAISE EXCEPTION 'invalid name';  END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 15 THEN RAISE EXCEPTION 'invalid phone'; END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(v_email) > 120 THEN
    RAISE EXCEPTION 'invalid email';
  END IF;

  -- One early lead per session: if one already exists, update + return it.
  SELECT id INTO v_lead_id
    FROM public.career_engine_leads
   WHERE session_id = p_session_id
   ORDER BY created_at ASC
   LIMIT 1;

  IF v_lead_id IS NOT NULL THEN
    UPDATE public.career_engine_leads
       SET name           = v_name,
           phone          = v_phone,
           email          = v_email,
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
END;
$function$;

-- 6) NEW: ce_finalize_lead — patches archetype + result AFTER the test
CREATE OR REPLACE FUNCTION public.ce_finalize_lead(
  p_lead_id        uuid,
  p_archetype      text,
  p_top_paths      jsonb,
  p_fit_score      integer,
  p_result_payload jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_session_id uuid;
BEGIN
  IF p_lead_id IS NULL THEN RAISE EXCEPTION 'lead_id required'; END IF;

  UPDATE public.career_engine_leads
     SET archetype      = nullif(left(coalesce(p_archetype, ''), 64), ''),
         top_paths      = p_top_paths,
         fit_score      = p_fit_score,
         result_payload = p_result_payload
   WHERE id = p_lead_id
   RETURNING session_id INTO v_session_id;

  IF v_session_id IS NOT NULL THEN
    UPDATE public.career_engine_sessions
       SET completed_at = now()
     WHERE id = v_session_id;
  END IF;
END;
$function$;

-- ============================================================
-- Execute grants — every ce_* RPC callable by anon + authenticated
-- ============================================================
REVOKE ALL ON FUNCTION public.ce_start_session(text, text, text, text)               FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ce_record_answer(uuid, text, text)                     FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ce_get_result(uuid)                                    FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ce_create_lead_early(uuid, text, text, text, boolean)  FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ce_finalize_lead(uuid, text, jsonb, integer, jsonb)    FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.ce_start_session(text, text, text, text)               TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ce_record_answer(uuid, text, text)                     TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ce_submit_lead(uuid, text, text, text, boolean, text, jsonb, integer, jsonb) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ce_get_result(uuid)                                    TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ce_create_lead_early(uuid, text, text, text, boolean)  TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ce_finalize_lead(uuid, text, jsonb, integer, jsonb)    TO anon, authenticated;
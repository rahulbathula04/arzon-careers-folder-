CREATE OR REPLACE FUNCTION public.ce_log_server_event(
  p_event      text,
  p_session_id uuid DEFAULT NULL,
  p_lead_id    uuid DEFAULT NULL,
  p_props      jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_name text := nullif(left(coalesce(p_event, ''), 64), '');
BEGIN
  IF v_name IS NULL THEN RETURN; END IF;
  RAISE LOG 'ce_server | % | sid=% lid=% % ',
    v_name,
    coalesce(p_session_id::text, '-'),
    coalesce(p_lead_id::text, '-'),
    coalesce(p_props::text, '{}');
  INSERT INTO public.analytics_events (event_name, session_id, lead_id, props)
  VALUES (v_name, p_session_id, p_lead_id, coalesce(p_props, '{}'::jsonb));
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'ce_server_log_failed | % | %', v_name, SQLERRM;
END;
$$;

CREATE OR REPLACE FUNCTION public.ce_start_session(
  p_stream      text DEFAULT NULL,
  p_device      text DEFAULT NULL,
  p_utm_source  text DEFAULT NULL,
  p_user_agent  text DEFAULT NULL,
  p_honeypot    text DEFAULT NULL,
  p_client_fp   text DEFAULT NULL
)
RETURNS TABLE(session_id uuid, session_token text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_id uuid;
  v_token text;
  v_fp text;
  v_resumed boolean := false;
BEGIN
  IF p_honeypot IS NOT NULL AND length(trim(p_honeypot)) > 0 THEN
    PERFORM public.ce_log_server_event('ce_server_session_rejected', NULL, NULL,
      jsonb_build_object('reason', 'honeypot'));
    RAISE EXCEPTION 'request rejected: hidden field filled by browser autofill';
  END IF;

  v_fp := nullif(left(coalesce(p_client_fp, md5(coalesce(p_user_agent,''))), 64), '');

  IF v_fp IS NOT NULL THEN
    SELECT s.id, s.session_token INTO v_id, v_token
      FROM public.career_engine_sessions s
     WHERE s.completed_at IS NULL
       AND s.started_at > now() - interval '5 minutes'
       AND coalesce(s.user_agent,'') = coalesce(p_user_agent,'')
     ORDER BY s.started_at DESC LIMIT 1;
    IF v_id IS NOT NULL THEN
      v_resumed := true;
      PERFORM public.ce_log_server_event('ce_server_session_resumed', v_id, NULL,
        jsonb_build_object('fp', v_fp, 'utm_source', p_utm_source, 'device', p_device));
      RETURN QUERY SELECT v_id, v_token;
      RETURN;
    END IF;
  END IF;

  IF v_fp IS NOT NULL AND public.ce_rate_hit('ce_start:' || v_fp, 20, 3600) THEN
    PERFORM public.ce_log_server_event('ce_server_session_rate_limited', NULL, NULL,
      jsonb_build_object('fp', v_fp));
    RAISE EXCEPTION 'rate limit exceeded - please wait a few minutes before starting a new test';
  END IF;

  INSERT INTO public.career_engine_sessions (stream, device, utm_source, user_agent)
  VALUES (
    nullif(left(coalesce(p_stream, ''), 32), ''),
    nullif(left(coalesce(p_device, ''), 32), ''),
    nullif(left(coalesce(p_utm_source, ''), 64), ''),
    nullif(left(coalesce(p_user_agent, ''), 256), '')
  )
  RETURNING id, career_engine_sessions.session_token INTO v_id, v_token;

  PERFORM public.ce_log_server_event('ce_server_session_started', v_id, NULL,
    jsonb_build_object('stream', p_stream, 'device', p_device, 'utm_source', p_utm_source, 'fp', v_fp, 'resumed', v_resumed));

  RETURN QUERY SELECT v_id, v_token;
END;
$$;

CREATE OR REPLACE FUNCTION public.ce_record_answer(
  p_session_id uuid, p_question_id text, p_answer text, p_session_token text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_last_asked timestamptz;
BEGIN
  PERFORM public.ce_assert_session_owner(p_session_id, p_session_token);

  IF p_question_id IS NULL OR length(p_question_id) = 0 OR length(p_question_id) > 64 THEN
    PERFORM public.ce_log_server_event('ce_server_answer_rejected', p_session_id, NULL,
      jsonb_build_object('reason', 'invalid_question_id', 'len', coalesce(length(p_question_id), 0)));
    RAISE EXCEPTION 'invalid question_id';
  END IF;
  IF p_answer IS NULL OR length(p_answer) > 512 THEN
    PERFORM public.ce_log_server_event('ce_server_answer_rejected', p_session_id, NULL,
      jsonb_build_object('reason', 'invalid_answer', 'qid', p_question_id, 'len', coalesce(length(p_answer), 0)));
    RAISE EXCEPTION 'invalid answer';
  END IF;

  IF public.ce_rate_hit('ce_ans:' || p_session_id::text, 80, 60) THEN
    PERFORM public.ce_log_server_event('ce_server_answer_rate_limited', p_session_id, NULL,
      jsonb_build_object('qid', p_question_id));
    RAISE EXCEPTION 'rate limit exceeded - slow down';
  END IF;

  SELECT asked_at INTO v_last_asked
    FROM public.career_engine_answers
   WHERE session_id = p_session_id AND question_id = p_question_id;

  IF v_last_asked IS NOT NULL AND v_last_asked > now() - interval '800 milliseconds' THEN
    PERFORM public.ce_log_server_event('ce_server_answer_rate_limited', p_session_id, NULL,
      jsonb_build_object('qid', p_question_id, 'reason', 'min_interval'));
    RAISE EXCEPTION 'rate limit exceeded - slow down';
  END IF;

  INSERT INTO public.career_engine_answers (session_id, question_id, answer)
  VALUES (p_session_id, p_question_id, p_answer)
  ON CONFLICT (session_id, question_id) DO UPDATE SET answer = excluded.answer, asked_at = now();

  IF p_question_id = 'stream' THEN
    UPDATE public.career_engine_sessions SET stream = nullif(left(p_answer, 32), '') WHERE id = p_session_id;
  END IF;

  PERFORM public.ce_log_server_event('ce_server_answer_recorded', p_session_id, NULL,
    jsonb_build_object('qid', p_question_id, 'answer_len', length(p_answer), 'updated', v_last_asked IS NOT NULL));
END;
$$;

CREATE OR REPLACE FUNCTION public.ce_create_lead_early(
  p_session_id uuid, p_name text, p_phone text, p_email text,
  p_whatsapp_optin boolean, p_session_token text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_lead_id uuid;
  v_existed boolean := false;
  v_name  text := trim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  v_email text := lower(trim(coalesce(p_email, '')));
BEGIN
  PERFORM public.ce_assert_session_owner(p_session_id, p_session_token);

  IF length(v_name)  < 2 OR length(v_name)  > 80  THEN
    PERFORM public.ce_log_server_event('ce_server_lead_rejected', p_session_id, NULL,
      jsonb_build_object('reason', 'invalid_name', 'len', length(v_name)));
    RAISE EXCEPTION 'invalid name';
  END IF;
  IF length(v_phone) < 10 OR length(v_phone) > 15 THEN
    PERFORM public.ce_log_server_event('ce_server_lead_rejected', p_session_id, NULL,
      jsonb_build_object('reason', 'invalid_phone', 'len', length(v_phone)));
    RAISE EXCEPTION 'invalid phone';
  END IF;
  IF v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(v_email) > 120 THEN
    PERFORM public.ce_log_server_event('ce_server_lead_rejected', p_session_id, NULL,
      jsonb_build_object('reason', 'invalid_email'));
    RAISE EXCEPTION 'invalid email';
  END IF;

  SELECT id INTO v_lead_id FROM public.career_engine_leads
   WHERE session_id = p_session_id ORDER BY created_at ASC LIMIT 1;

  IF v_lead_id IS NOT NULL THEN
    v_existed := true;
    UPDATE public.career_engine_leads
       SET name = v_name, phone = v_phone, email = v_email,
           whatsapp_optin = coalesce(p_whatsapp_optin, true)
     WHERE id = v_lead_id;
  ELSE
    INSERT INTO public.career_engine_leads (session_id, name, phone, email, whatsapp_optin)
    VALUES (p_session_id, v_name, v_phone, v_email, coalesce(p_whatsapp_optin, true))
    RETURNING id INTO v_lead_id;
  END IF;

  PERFORM public.ce_log_server_event('ce_server_lead_created', p_session_id, v_lead_id,
    jsonb_build_object('updated', v_existed, 'whatsapp_optin', coalesce(p_whatsapp_optin, true), 'phone_len', length(v_phone)));

  RETURN v_lead_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.ce_finalize_lead(
  p_lead_id uuid, p_archetype text, p_top_paths jsonb,
  p_fit_score integer, p_result_payload jsonb, p_session_token text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_session_id uuid;
  v_answer_count integer;
BEGIN
  IF p_lead_id IS NULL THEN
    PERFORM public.ce_log_server_event('ce_server_finalize_rejected', NULL, NULL,
      jsonb_build_object('reason', 'lead_id_required'));
    RAISE EXCEPTION 'lead_id required';
  END IF;

  SELECT session_id INTO v_session_id FROM public.career_engine_leads WHERE id = p_lead_id;
  IF v_session_id IS NULL THEN
    PERFORM public.ce_log_server_event('ce_server_finalize_rejected', NULL, p_lead_id,
      jsonb_build_object('reason', 'lead_not_found'));
    RAISE EXCEPTION 'lead not found';
  END IF;

  PERFORM public.ce_assert_session_owner(v_session_id, p_session_token);

  UPDATE public.career_engine_leads
     SET archetype      = nullif(left(coalesce(p_archetype, ''), 64), ''),
         top_paths      = p_top_paths,
         fit_score      = p_fit_score,
         result_payload = p_result_payload
   WHERE id = p_lead_id;

  UPDATE public.career_engine_sessions SET completed_at = now() WHERE id = v_session_id;

  SELECT count(*) INTO v_answer_count FROM public.career_engine_answers WHERE session_id = v_session_id;

  PERFORM public.ce_log_server_event('ce_server_finalized', v_session_id, p_lead_id,
    jsonb_build_object(
      'archetype', p_archetype, 'fit_score', p_fit_score,
      'top_paths_count', coalesce(jsonb_array_length(p_top_paths), 0),
      'payload_bytes', octet_length(coalesce(p_result_payload::text, '')),
      'answer_count', v_answer_count
    ));
END;
$$;

CREATE OR REPLACE FUNCTION public.ce_set_cohort(
  p_lead_id uuid, p_cohort_id text, p_session_token text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_cohort text := lower(trim(coalesce(p_cohort_id, '')));
  v_session_id uuid;
BEGIN
  IF p_lead_id IS NULL THEN
    PERFORM public.ce_log_server_event('ce_server_cohort_rejected', NULL, NULL,
      jsonb_build_object('reason', 'lead_id_required'));
    RAISE EXCEPTION 'lead_id required';
  END IF;
  IF v_cohort NOT IN ('may-2026','aug-2026','nov-2026') THEN
    PERFORM public.ce_log_server_event('ce_server_cohort_rejected', NULL, p_lead_id,
      jsonb_build_object('reason', 'invalid_cohort_id', 'cohort', v_cohort));
    RAISE EXCEPTION 'invalid cohort_id';
  END IF;

  SELECT session_id INTO v_session_id FROM public.career_engine_leads WHERE id = p_lead_id;
  IF v_session_id IS NULL THEN
    PERFORM public.ce_log_server_event('ce_server_cohort_rejected', NULL, p_lead_id,
      jsonb_build_object('reason', 'lead_not_found'));
    RAISE EXCEPTION 'lead not found';
  END IF;

  PERFORM public.ce_assert_session_owner(v_session_id, p_session_token);

  UPDATE public.career_engine_leads SET cohort_id = v_cohort WHERE id = p_lead_id;

  PERFORM public.ce_log_server_event('ce_server_cohort_set', v_session_id, p_lead_id,
    jsonb_build_object('cohort', v_cohort));
END;
$$;

CREATE OR REPLACE VIEW public.ce_funnel_summary AS
WITH base AS (
  SELECT date_trunc('day', created_at) AS day, event_name, session_id, lead_id
  FROM public.analytics_events
  WHERE created_at > now() - interval '30 days' AND event_name LIKE 'ce_server_%'
)
SELECT
  day,
  count(*) FILTER (WHERE event_name = 'ce_server_session_started')   AS sessions_started,
  count(DISTINCT session_id) FILTER (WHERE event_name = 'ce_server_answer_recorded') AS sessions_with_answers,
  count(*) FILTER (WHERE event_name = 'ce_server_lead_created')      AS leads_created,
  count(*) FILTER (WHERE event_name = 'ce_server_finalized')         AS leads_finalized,
  count(*) FILTER (WHERE event_name = 'ce_server_cohort_set')        AS cohorts_set,
  count(*) FILTER (WHERE event_name LIKE '%_rejected')               AS rejections,
  count(*) FILTER (WHERE event_name LIKE '%_rate_limited')           AS rate_limited
FROM base GROUP BY day ORDER BY day DESC;

CREATE OR REPLACE FUNCTION public.ce_session_trace(p_session_id uuid)
RETURNS TABLE(at timestamptz, source text, event text, question_id text, answer text, props jsonb)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT asked_at AS at, 'answer'::text, 'recorded'::text, question_id, answer, NULL::jsonb
    FROM public.career_engine_answers WHERE session_id = p_session_id
  UNION ALL
  SELECT created_at AS at, 'server'::text, event_name, NULL::text, NULL::text, props
    FROM public.analytics_events
   WHERE session_id = p_session_id AND event_name LIKE 'ce_server_%'
  ORDER BY at ASC;
$$;

REVOKE ALL ON FUNCTION public.ce_session_trace(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ce_session_trace(uuid) TO authenticated;
GRANT SELECT ON public.ce_funnel_summary TO authenticated;
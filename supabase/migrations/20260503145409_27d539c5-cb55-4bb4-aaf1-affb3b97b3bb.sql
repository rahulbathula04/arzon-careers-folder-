
-- Rate-limit buckets
CREATE TABLE IF NOT EXISTS public.ce_rate_buckets (
  key text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0,
  window_start timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ce_rate_buckets ENABLE ROW LEVEL SECURITY;

-- No public policies: only SECURITY DEFINER functions touch this table.

-- Helper: atomically increment a bucket and return whether the cap is exceeded.
CREATE OR REPLACE FUNCTION public.ce_rate_hit(p_key text, p_max integer, p_window_seconds integer)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_row public.ce_rate_buckets%ROWTYPE;
BEGIN
  IF p_key IS NULL OR length(p_key) = 0 OR length(p_key) > 128 THEN
    RETURN false; -- no-op on bad keys
  END IF;

  INSERT INTO public.ce_rate_buckets(key, count, window_start)
  VALUES (p_key, 1, now())
  ON CONFLICT (key) DO UPDATE
    SET count = CASE
                  WHEN public.ce_rate_buckets.window_start < now() - make_interval(secs => p_window_seconds)
                    THEN 1
                  ELSE public.ce_rate_buckets.count + 1
                END,
        window_start = CASE
                         WHEN public.ce_rate_buckets.window_start < now() - make_interval(secs => p_window_seconds)
                           THEN now()
                         ELSE public.ce_rate_buckets.window_start
                       END
  RETURNING * INTO v_row;

  RETURN v_row.count > p_max;
END;
$$;

REVOKE ALL ON FUNCTION public.ce_rate_hit(text, integer, integer) FROM PUBLIC, anon, authenticated;

-- Replace ce_start_session: add honeypot + client fingerprint + rate limit
DROP FUNCTION IF EXISTS public.ce_start_session(text, text, text, text);
CREATE OR REPLACE FUNCTION public.ce_start_session(
  p_stream text DEFAULT NULL,
  p_device text DEFAULT NULL,
  p_utm_source text DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_honeypot text DEFAULT NULL,
  p_client_fp text DEFAULT NULL
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
BEGIN
  -- Honeypot: real users never fill this hidden field.
  IF p_honeypot IS NOT NULL AND length(trim(p_honeypot)) > 0 THEN
    RAISE EXCEPTION 'request rejected';
  END IF;

  -- Per-fingerprint rate limit: 5 starts / hour. Falls back to UA hash.
  v_fp := nullif(left(coalesce(p_client_fp, encode(digest(coalesce(p_user_agent,''), 'sha256'), 'hex')), 64), '');
  IF v_fp IS NOT NULL AND public.ce_rate_hit('ce_start:' || v_fp, 5, 3600) THEN
    RAISE EXCEPTION 'rate limit exceeded - please wait before starting a new test';
  END IF;

  INSERT INTO public.career_engine_sessions (stream, device, utm_source, user_agent)
  VALUES (
    nullif(left(coalesce(p_stream, ''), 32), ''),
    nullif(left(coalesce(p_device, ''), 32), ''),
    nullif(left(coalesce(p_utm_source, ''), 64), ''),
    nullif(left(coalesce(p_user_agent, ''), 256), '')
  )
  RETURNING id, career_engine_sessions.session_token INTO v_id, v_token;
  RETURN QUERY SELECT v_id, v_token;
END;
$$;

-- Replace ce_record_answer: per-session rate limit + min-interval per question
CREATE OR REPLACE FUNCTION public.ce_record_answer(
  p_session_id uuid,
  p_question_id text,
  p_answer text,
  p_session_token text
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
    RAISE EXCEPTION 'invalid question_id';
  END IF;
  IF p_answer IS NULL OR length(p_answer) > 512 THEN
    RAISE EXCEPTION 'invalid answer';
  END IF;

  -- Per-session burst cap: 80 answers / minute.
  IF public.ce_rate_hit('ce_ans:' || p_session_id::text, 80, 60) THEN
    RAISE EXCEPTION 'rate limit exceeded - slow down';
  END IF;

  -- Min interval per (session, question): 800ms between writes.
  SELECT asked_at INTO v_last_asked
    FROM public.career_engine_answers
   WHERE session_id = p_session_id AND question_id = p_question_id;

  IF v_last_asked IS NOT NULL AND v_last_asked > now() - interval '800 milliseconds' THEN
    RAISE EXCEPTION 'rate limit exceeded - slow down';
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
$$;

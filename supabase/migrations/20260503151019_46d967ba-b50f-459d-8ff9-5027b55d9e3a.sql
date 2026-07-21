
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
    RAISE EXCEPTION 'request rejected: hidden field filled by browser autofill';
  END IF;

  v_fp := nullif(left(coalesce(p_client_fp, encode(digest(coalesce(p_user_agent,''), 'sha256'), 'hex')), 64), '');

  -- Reuse a recently started, still-open session for this fingerprint to
  -- avoid burning through rate limit on repeat clicks.
  IF v_fp IS NOT NULL THEN
    SELECT s.id, s.session_token
      INTO v_id, v_token
      FROM public.career_engine_sessions s
     WHERE s.completed_at IS NULL
       AND s.started_at > now() - interval '5 minutes'
       AND coalesce(s.user_agent,'') = coalesce(p_user_agent,'')
     ORDER BY s.started_at DESC
     LIMIT 1;
    IF v_id IS NOT NULL THEN
      RETURN QUERY SELECT v_id, v_token;
      RETURN;
    END IF;
  END IF;

  -- Per-fingerprint rate limit: 20 starts / hour.
  IF v_fp IS NOT NULL AND public.ce_rate_hit('ce_start:' || v_fp, 20, 3600) THEN
    RAISE EXCEPTION 'rate limit exceeded — please wait a few minutes before starting a new test';
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

-- Batch Career Engine answer persistence for lower request volume at scale.
-- Keeps the same session-token ownership checks and validation as ce_record_answer,
-- but writes a bounded set of answers in one RPC transaction.

CREATE OR REPLACE FUNCTION public.ce_record_answers_batch(
  p_session_id uuid,
  p_answers jsonb,
  p_session_token text
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_count integer := 0;
  v_item jsonb;
  v_question_id text;
  v_answer text;
BEGIN
  PERFORM public.ce_assert_session_owner(p_session_id, p_session_token);

  IF jsonb_typeof(coalesce(p_answers, '[]'::jsonb)) <> 'array' THEN
    PERFORM public.ce_log_server_event(
      'ce_server_answer_batch_rejected',
      p_session_id,
      NULL,
      jsonb_build_object('reason', 'answers_not_array')
    );
    RAISE EXCEPTION 'answers must be an array';
  END IF;

  IF jsonb_array_length(p_answers) < 1 OR jsonb_array_length(p_answers) > 42 THEN
    PERFORM public.ce_log_server_event(
      'ce_server_answer_batch_rejected',
      p_session_id,
      NULL,
      jsonb_build_object('reason', 'invalid_batch_size', 'count', jsonb_array_length(p_answers))
    );
    RAISE EXCEPTION 'invalid answer batch size';
  END IF;

  IF public.ce_rate_hit('ce_ans_batch:' || p_session_id::text, 30, 60) THEN
    PERFORM public.ce_log_server_event(
      'ce_server_answer_batch_rate_limited',
      p_session_id,
      NULL,
      jsonb_build_object('count', jsonb_array_length(p_answers))
    );
    RAISE EXCEPTION 'rate limit exceeded - slow down';
  END IF;

  FOR v_item IN SELECT value FROM jsonb_array_elements(p_answers)
  LOOP
    v_question_id := nullif(trim(coalesce(v_item->>'question_id', '')), '');
    v_answer := v_item->>'answer';

    IF v_question_id IS NULL OR length(v_question_id) > 64 THEN
      PERFORM public.ce_log_server_event(
        'ce_server_answer_batch_rejected',
        p_session_id,
        NULL,
        jsonb_build_object('reason', 'invalid_question_id')
      );
      RAISE EXCEPTION 'invalid question_id';
    END IF;

    IF v_answer IS NULL OR length(v_answer) > 512 THEN
      PERFORM public.ce_log_server_event(
        'ce_server_answer_batch_rejected',
        p_session_id,
        NULL,
        jsonb_build_object('reason', 'invalid_answer', 'qid', v_question_id)
      );
      RAISE EXCEPTION 'invalid answer';
    END IF;

    INSERT INTO public.career_engine_answers (session_id, question_id, answer)
    VALUES (p_session_id, v_question_id, v_answer)
    ON CONFLICT (session_id, question_id)
    DO UPDATE SET answer = excluded.answer, asked_at = now();

    IF v_question_id = 'stream' THEN
      UPDATE public.career_engine_sessions
      SET stream = nullif(left(v_answer, 32), '')
      WHERE id = p_session_id;
    END IF;

    v_count := v_count + 1;
  END LOOP;

  PERFORM public.ce_log_server_event(
    'ce_server_answers_batch_recorded',
    p_session_id,
    NULL,
    jsonb_build_object('count', v_count)
  );

  RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.ce_record_answers_batch(uuid, jsonb, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ce_record_answers_batch(uuid, jsonb, text) TO anon, authenticated;

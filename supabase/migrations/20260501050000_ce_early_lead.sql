-- Career Engine v2: capture lead BEFORE the test starts.
-- 1. ce_create_lead_early(): insert minimal lead row tied to the session.
-- 2. ce_finalize_lead(): patch that row with archetype + result after test.

create or replace function public.ce_create_lead_early(
  p_session_id uuid,
  p_name text,
  p_phone text,
  p_email text,
  p_whatsapp_optin boolean
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_lead_id uuid;
begin
  if p_session_id is null then
    raise exception 'session_id required';
  end if;
  if length(coalesce(p_name, '')) < 2 then
    raise exception 'name too short';
  end if;
  if p_phone !~ '^[0-9]{10,15}$' then
    raise exception 'invalid phone';
  end if;
  if p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'invalid email';
  end if;

  insert into public.career_engine_leads (
    session_id, name, phone, email, whatsapp_optin
  ) values (
    p_session_id,
    btrim(p_name),
    p_phone,
    lower(btrim(p_email)),
    coalesce(p_whatsapp_optin, true)
  )
  returning id into v_lead_id;

  return v_lead_id;
end;
$$;

create or replace function public.ce_finalize_lead(
  p_lead_id uuid,
  p_archetype text,
  p_top_paths jsonb,
  p_fit_score integer,
  p_result_payload jsonb
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_lead_id is null then
    raise exception 'lead_id required';
  end if;

  update public.career_engine_leads
     set archetype      = p_archetype,
         top_paths      = p_top_paths,
         fit_score      = p_fit_score,
         result_payload = p_result_payload
   where id = p_lead_id;

  -- Mark the linked session complete (best-effort).
  update public.career_engine_sessions s
     set completed_at = now()
   where s.id = (select session_id from public.career_engine_leads where id = p_lead_id)
     and s.completed_at is null;
end;
$$;

grant execute on function public.ce_create_lead_early(uuid, text, text, text, boolean) to anon, authenticated;
grant execute on function public.ce_finalize_lead(uuid, text, jsonb, integer, jsonb) to anon, authenticated;

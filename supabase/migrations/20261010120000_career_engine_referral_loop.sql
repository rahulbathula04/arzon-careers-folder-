-- Career Engine referral loop: server-authoritative attribution and completion counts.
-- Public clients can only use the RPCs below with a session token bound to a lead.
-- Direct table access remains closed to anon/authenticated roles.

begin;

create table if not exists public.career_engine_referral_links (
  id uuid primary key default gen_random_uuid(),
  referrer_lead_id uuid not null unique references public.career_engine_leads(id) on delete cascade,
  code text not null unique check (code ~ '^[a-f0-9]{32}$'),
  created_at timestamptz not null default now()
);

create table if not exists public.career_engine_referrals (
  id uuid primary key default gen_random_uuid(),
  referral_link_id uuid not null references public.career_engine_referral_links(id) on delete cascade,
  referrer_lead_id uuid not null references public.career_engine_leads(id) on delete cascade,
  referred_lead_id uuid not null unique references public.career_engine_leads(id) on delete cascade,
  status text not null default 'started' check (status in ('started', 'completed')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint career_engine_referrals_not_self check (referrer_lead_id <> referred_lead_id),
  constraint career_engine_referrals_completion_consistent check (
    (status = 'started' and completed_at is null) or
    (status = 'completed' and completed_at is not null)
  )
);

create index if not exists ce_referrals_referrer_status_idx
  on public.career_engine_referrals(referrer_lead_id, status);

alter table public.career_engine_referral_links enable row level security;
alter table public.career_engine_referrals enable row level security;
revoke all on public.career_engine_referral_links from public, anon, authenticated;
revoke all on public.career_engine_referrals from public, anon, authenticated;

-- Attach a newly captured lead to the first valid referral code it arrives with.
-- A code is accepted only if the referrer has a completed, server-persisted result.
create or replace function public.ce_attach_referral_to_lead(
  p_referred_lead_id uuid,
  p_session_token text,
  p_referral_code text
) returns boolean
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_referred_phone text;
  v_referred_payload jsonb;
  v_referrer_lead_id uuid;
  v_referrer_phone text;
  v_link_id uuid;
  v_rows integer := 0;
begin
  if p_referred_lead_id is null
     or p_session_token is null
     or length(p_session_token) < 16 then
    raise exception 'valid assessment session required';
  end if;

  select l.phone, l.result_payload
    into v_referred_phone, v_referred_payload
    from public.career_engine_leads l
    join public.career_engine_sessions s on s.id = l.session_id
   where l.id = p_referred_lead_id
     and s.session_token = p_session_token;

  if not found then
    raise exception 'lead does not belong to this assessment session';
  end if;

  if p_referral_code is null
     or lower(trim(p_referral_code)) !~ '^[a-f0-9]{32}$' then
    return false;
  end if;

  select rl.id, l.id, l.phone
    into v_link_id, v_referrer_lead_id, v_referrer_phone
    from public.career_engine_referral_links rl
    join public.career_engine_leads l on l.id = rl.referrer_lead_id
   where rl.code = lower(trim(p_referral_code))
     and l.result_payload is not null
     and l.result_payload <> '{}'::jsonb
     and l.result_payload <> 'null'::jsonb
   limit 1;

  if not found then
    return false;
  end if;

  -- Do not allow self-referrals by reusing the same lead or mobile number.
  if v_referrer_lead_id = p_referred_lead_id
     or (
       nullif(regexp_replace(coalesce(v_referrer_phone, ''), '\\D', '', 'g'), '') is not null
       and regexp_replace(coalesce(v_referrer_phone, ''), '\\D', '', 'g')
         = regexp_replace(coalesce(v_referred_phone, ''), '\\D', '', 'g')
     ) then
    return false;
  end if;

  -- One referred lead can be attributed once. Later links cannot overwrite
  -- the original referral, which keeps progress counts stable and auditable.
  insert into public.career_engine_referrals (
    referral_link_id, referrer_lead_id, referred_lead_id, status, completed_at
  ) values (
    v_link_id,
    v_referrer_lead_id,
    p_referred_lead_id,
    case
      when v_referred_payload is not null
       and v_referred_payload <> '{}'::jsonb
       and v_referred_payload <> 'null'::jsonb then 'completed'
      else 'started'
    end,
    case
      when v_referred_payload is not null
       and v_referred_payload <> '{}'::jsonb
       and v_referred_payload <> 'null'::jsonb then now()
      else null
    end
  )
  on conflict (referred_lead_id) do nothing;

  get diagnostics v_rows = row_count;
  return v_rows = 1;
end;
$function$;

-- Return a link and counts only to the session that owns the completed result.
-- Referral links are created lazily and remain stable for this result lead.
create or replace function public.ce_get_referral_progress(
  p_lead_id uuid,
  p_session_token text
) returns table (
  referral_code text,
  started_count integer,
  completed_count integer
)
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_code text;
begin
  if p_lead_id is null
     or p_session_token is null
     or length(p_session_token) < 16 then
    raise exception 'valid assessment session required';
  end if;

  if not exists (
    select 1
      from public.career_engine_leads l
      join public.career_engine_sessions s on s.id = l.session_id
     where l.id = p_lead_id
       and s.session_token = p_session_token
       and l.result_payload is not null
       and l.result_payload <> '{}'::jsonb
       and l.result_payload <> 'null'::jsonb
  ) then
    raise exception 'completed server-persisted result required';
  end if;

  select rl.code into v_code
    from public.career_engine_referral_links rl
   where rl.referrer_lead_id = p_lead_id;

  if v_code is null then
    insert into public.career_engine_referral_links(referrer_lead_id, code)
    values (p_lead_id, encode(gen_random_bytes(16), 'hex'))
    on conflict (referrer_lead_id) do nothing;

    select rl.code into v_code
      from public.career_engine_referral_links rl
     where rl.referrer_lead_id = p_lead_id;
  end if;

  return query
    select v_code,
           count(r.id)::integer,
           count(r.id) filter (where r.status = 'completed')::integer
      from public.career_engine_referrals r
     where r.referrer_lead_id = p_lead_id;
end;
$function$;

-- Convert an attributed referral to completed only after a result payload is
-- persisted on the referred lead. Client-side events cannot unlock progress.
create or replace function public.ce_complete_referrals_after_result()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if new.result_payload is not null
     and new.result_payload <> '{}'::jsonb
     and new.result_payload <> 'null'::jsonb then
    update public.career_engine_referrals r
       set status = 'completed',
           completed_at = coalesce(r.completed_at, now())
     where r.referred_lead_id = new.id
       and r.status = 'started';
  end if;

  return new;
end;
$function$;

drop trigger if exists ce_complete_referrals_after_result on public.career_engine_leads;
create trigger ce_complete_referrals_after_result
after update of result_payload on public.career_engine_leads
for each row
when (
  new.result_payload is distinct from old.result_payload
  and new.result_payload is not null
  and new.result_payload <> '{}'::jsonb
  and new.result_payload <> 'null'::jsonb
)
execute function public.ce_complete_referrals_after_result();

revoke all on function public.ce_attach_referral_to_lead(uuid, text, text) from public;
grant execute on function public.ce_attach_referral_to_lead(uuid, text, text) to anon, authenticated;

revoke all on function public.ce_get_referral_progress(uuid, text) from public;
grant execute on function public.ce_get_referral_progress(uuid, text) to anon, authenticated;

commit;

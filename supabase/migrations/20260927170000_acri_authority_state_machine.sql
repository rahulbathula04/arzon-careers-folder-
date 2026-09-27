-- Phase 2: ACRI authorization, canonical candidate identity and lifecycle state machine
-- Applied to the active Supabase project before committing this migration.
begin;

alter table public.acri_candidates
  add column if not exists candidate_id uuid references public.candidates(id) on delete set null;

update public.acri_candidates ac
set candidate_id=c.id, updated_at=now()
from public.candidates c
where ac.candidate_id is null
  and c.deleted_at is null
  and lower(trim(c.email))=lower(trim(ac.email));

create unique index if not exists acri_candidates_candidate_id_uq
  on public.acri_candidates(candidate_id)
  where candidate_id is not null;

create unique index if not exists acri_candidates_invite_code_uq
  on public.acri_candidates(invite_code)
  where invite_code is not null;

drop index if exists public.acri_candidates_email_uq;
create unique index if not exists acri_candidates_email_uq on public.acri_candidates(lower(email));

alter table public.acri_candidates drop constraint if exists acri_candidates_status_check;
update public.acri_candidates
set status=case lower(status)
  when 'registered' then 'REGISTERED'
  when 'pending_review' then 'PENDING_REVIEW'
  when 'approved' then 'APPROVED'
  when 'invite_issued' then 'INVITED'
  when 'invited' then 'INVITED'
  when 'in_assessment' then 'STARTED'
  when 'started' then 'STARTED'
  when 'completed' then 'COMPLETED'
  when 'scored' then 'SCORED'
  when 'credential_issued' then 'CREDENTIAL_ISSUED'
  else status
end;
alter table public.acri_candidates
  add constraint acri_candidates_status_check
  check (status in ('REGISTERED','PENDING_REVIEW','APPROVED','INVITED','STARTED','COMPLETED','SCORED','CREDENTIAL_ISSUED'));
alter table public.acri_candidates alter column candidate_id set not null;

create or replace function public.acri_enforce_candidate_state()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if tg_op='INSERT' and new.status <> 'REGISTERED' then
    raise exception 'new ACRI candidate must start in REGISTERED state';
  end if;
  if tg_op='INSERT' then return new; end if;
  if new.status=old.status then return new; end if;
  if not (
    (old.status='REGISTERED' and new.status='PENDING_REVIEW') or
    (old.status='PENDING_REVIEW' and new.status='APPROVED') or
    (old.status='APPROVED' and new.status='INVITED') or
    (old.status='INVITED' and new.status='STARTED') or
    (old.status='STARTED' and new.status='COMPLETED') or
    (old.status='COMPLETED' and new.status='SCORED') or
    (old.status='SCORED' and new.status='CREDENTIAL_ISSUED') or
    (old.status in ('STARTED','SCORED') and new.status=old.status)
  ) then
    raise exception 'invalid ACRI candidate state transition: % -> %',old.status,new.status;
  end if;
  insert into public.acri_events(event_name,candidate_id,payload)
  values('candidate_state_changed',new.id,jsonb_build_object('from',old.status,'to',new.status,'changed_at',now()));
  return new;
end;
$$;

drop trigger if exists acri_candidate_state_guard on public.acri_candidates;
create trigger acri_candidate_state_guard
before update of status on public.acri_candidates
for each row execute function public.acri_enforce_candidate_state();

drop function if exists public.acri_register_candidate(text,text,text,text,text,text,text,text,text);
create or replace function public.acri_register_candidate(
  p_full_name text,p_email text,p_mobile text,p_highest_qualification text,
  p_college_university text,p_currently_working text,
  p_utm_source text default null,p_utm_medium text default null,p_utm_campaign text default null
)
returns table(
  candidate_id uuid,acri_candidate_id uuid,cohort_id text,cohort_name text,
  cohort_capacity integer,cohort_claimed_count integer,cohort_starts_at timestamptz,
  cohort_ends_at timestamptz,status text,existing_candidate boolean
)
language plpgsql security definer set search_path=public
as $$
declare
  v_email text:=lower(trim(coalesce(p_email,'')));
  v_name text:=trim(coalesce(p_full_name,''));
  v_mobile text:=regexp_replace(coalesce(p_mobile,''),'\D','','g');
  v_candidate_id uuid; v_acri_id uuid; v_existing boolean:=false;
  v_cohort_id text; v_cohort record;
begin
  if length(v_name)<2 or length(v_name)>120 then raise exception 'invalid name'; end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email)>120 then raise exception 'invalid email'; end if;
  if length(v_mobile)<10 or length(v_mobile)>15 then raise exception 'invalid mobile'; end if;
  if p_currently_working not in ('yes','no') then raise exception 'invalid employment status'; end if;

  select id,name,capacity,claimed_count,status,starts_at,ends_at into v_cohort
  from public.acri_cohorts where track='pharmacovigilance' and status='active'
  order by starts_at nulls first limit 1 for share;
  if not found then raise exception 'No active ACRI cohort is currently available.'; end if;
  if v_cohort.claimed_count>=v_cohort.capacity then raise exception 'The active ACRI cohort is currently full.'; end if;

  select id into v_candidate_id from public.candidates
  where deleted_at is null and lower(trim(email))=v_email
  order by created_at limit 1 for update;

  if v_candidate_id is null then
    begin
      insert into public.candidates(email,phone,full_name,whatsapp_optin,first_seen_at,last_seen_at)
      values(v_email,v_mobile,v_name,true,now(),now()) returning id into v_candidate_id;
    exception when unique_violation then
      select id into v_candidate_id from public.candidates
      where deleted_at is null and lower(trim(email))=v_email
      order by created_at limit 1 for update;
    end;
  else
    v_existing:=true;
    update public.candidates set phone=coalesce(nullif(v_mobile,''),phone),
      full_name=coalesce(nullif(v_name,''),full_name),last_seen_at=now(),updated_at=now()
    where id=v_candidate_id;
  end if;

  select id into v_acri_id from public.acri_candidates where candidate_id=v_candidate_id limit 1 for update;
  if v_acri_id is null then
    insert into public.acri_candidates(
      candidate_id,full_name,email,mobile,highest_qualification, college_university,
      currently_working,cohort_id,status,utm_source,utm_medium,utm_campaign
    ) values (
      v_candidate_id,v_name,v_email,v_mobile,p_highest_qualification,p_college_university,
      p_currently_working,v_cohort.id,'REGISTERED',
      nullif(left(coalesce(p_utm_source,''),80),''),
      nullif(left(coalesce(p_utm_medium,''),80),''),
      nullif(left(coalesce(p_utm_campaign,''),80),'')
    ) returning id into v_acri_id;
    update public.acri_candidates set status='PENDING_REVIEW',updated_at=now() where id=v_acri_id;
    insert into public.acri_events(event_name,candidate_id,payload)
    values('candidate_application_logged',v_acri_id,jsonb_build_object(
      'canonical_candidate_id',v_candidate_id,'status','PENDING_REVIEW',
      'qualification',p_highest_qualification,'college',p_college_university
    ));
  end if;

  select * into v_cohort from public.acri_cohorts
  where id=(select cohort_id from public.acri_candidates where id=v_acri_id);
  return query select v_candidate_id,v_acri_id,v_cohort.id,v_cohort.name,v_cohort.capacity,
    v_cohort.claimed_count,v_cohort.starts_at,v_cohort.ends_at,
    (select status from public.acri_candidates where id=v_acri_id),v_existing;
end;
$$;

drop function if exists public.acri_approve_candidate(uuid,text);
create or replace function public.acri_approve_candidate(p_acri_candidate_id uuid,p_invite_code text default null)
returns table(acri_candidate_id uuid,candidate_id uuid,invite_code text,status text)
language plpgsql security definer set search_path=public
as $$
declare v_candidate public.acri_candidates%rowtype; v_code text;
begin
  select * into v_candidate from public.acri_candidates where id=p_acri_candidate_id for update;
  if not found then raise exception 'ACRI candidate not found'; end if;
  if v_candidate.status='CREDENTIAL_ISSUED' then raise exception 'ACRI candidate has already completed certification'; end if;
  if v_candidate.status='INVITED' and v_candidate.invite_code is not null then
    return query select v_candidate.id,v_candidate.candidate_id,v_candidate.invite_code,v_candidate.status; return;
  end if;
  if v_candidate.status<>'PENDING_REVIEW' then raise exception 'candidate must be in PENDING_REVIEW before approval'; end if;

  update public.acri_candidates set status='APPROVED',updated_at=now() where id=v_candidate.id;

  v_code:=upper(trim(coalesce(p_invite_code,'')));
  if v_code='' then v_code:='ACRI-PV-'||upper(substr(md5(gen_random_uuid()::text),1,10)); end if;

  insert into public.acri_invitations(code,candidate_id,cohort_id,track,status,single_use)
  values(v_code,v_candidate.id,v_candidate.cohort_id,'pharmacovigilance','active',true);

  update public.acri_candidates set status='INVITED',invite_code=v_code,updated_at=now()
  where id=v_candidate.id;

  insert into public.acri_events(event_name,candidate_id,invite_code,payload)
  values('candidate_approved_by_admin',v_candidate.id,v_code,jsonb_build_object(
    'canonical_candidate_id',v_candidate.candidate_id,'approved_at',now()
  ));

  return query select v_candidate.id,v_candidate.candidate_id,v_code,
    (select status from public.acri_candidates where id=v_candidate.id);
end;
$$;

drop function if exists public.acri_start_session(text);
create or replace function public.acri_start_session(p_invite_code text)
returns table(
  session_id uuid,session_token text,expires_at timestamptz,
  acri_candidate_id uuid,candidate_id uuid,full_name text,email text,
  qualification text,college text,assessment_id text,version text
)
language plpgsql security definer set search_path=public
as $$
declare
  v_inv public.acri_invitations%rowtype; v_candidate public.acri_candidates%rowtype;
  v_assessment public.acri_assessments%rowtype; v_version public.acri_assessment_versions%rowtype;
  v_existing public.acri_sessions%rowtype; v_session_id uuid; v_token text; v_expiry timestamptz;
begin
  select * into v_inv from public.acri_invitations where code=upper(trim(p_invite_code)) for update;
  if not found or v_inv.status<>'active' then raise exception 'Invitation code is invalid, expired, or already used.'; end if;
  if v_inv.expires_at<=now() then
    update public.acri_invitations set status='expired' where id=v_inv.id and status='active';
    raise exception 'Invitation code is invalid, expired, or already used.';
  end if;

  select * into v_candidate from public.acri_candidates where id=v_inv.candidate_id for update;
  if not found then raise exception 'Candidate record could not be loaded.'; end if;

  if v_candidate.status='STARTED' then
    select * into v_existing from public.acri_sessions
    where invite_id=v_inv.id and candidate_id=v_candidate.id and status='in_progress' and expires_at>now()
    order by started_at desc limit 1 for update;
    if found then
      return query select v_existing.id,v_existing.session_token,v_existing.expires_at,
        v_candidate.id,v_candidate.candidate_id,v_candidate.full_name,v_candidate.email,
        v_candidate.highest_qualification,v_candidate.college_university,
        v_existing.assessment_id,v_existing.version;
      return;
    end if;
  elsif v_candidate.status<>'INVITED' then
    raise exception 'ACRI candidate is not authorized to start an assessment.';
  end if;

  select * into v_assessment from public.acri_assessments
  where status='published' order by created_at limit 1;
  if not found then raise exception 'ACRI assessment is unavailable.'; end if;
  select * into v_version from public.acri_assessment_versions
  where assessment_id=v_assessment.id and version=v_assessment.current_version and status='published';
  if not found then raise exception 'ACRI assessment version is unavailable.'; end if;

  v_session_id:=gen_random_uuid(); v_token:=encode(gen_random_bytes(32),'hex');
  v_expiry:=least(v_inv.expires_at,now()+make_interval(mins=>v_assessment.duration_minutes));

  insert into public.acri_sessions(id,session_token,candidate_id,invite_id,assessment_id,version,expires_at,status)
  values(v_session_id,v_token,v_candidate.id,v_inv.id,v_assessment.id,v_version.version,v_expiry,'in_progress');

  update public.acri_candidates set status='STARTED',updated_at=now() where id=v_candidate.id;

  insert into public.acri_events(event_name,candidate_id,invite_code,session_id,payload)
  values('assessment_started',v_candidate.id,v_inv.code,v_session_id,jsonb_build_object(
    'canonical_candidate_id',v_candidate.candidate_id,'assessment_id',v_assessment.id,'version',v_version.version
  ));

  return query select v_session_id,v_token,v_expiry,v_candidate.id,v_candidate.candidate_id,
    v_candidate.full_name,v_candidate.email,v_candidate.highest_qualification,
    v_candidate.college_university,v_assessment.id,v_version.version;
end;
$$;

drop function if exists public.acri_finalize_assessment(uuid,uuid,text,text);
create or replace function public.acri_finalize_assessment(
  p_session_id uuid,p_candidate_id uuid,p_result_id text,p_credential_id text default null
)
returns table(status text,credential_verified boolean)
language plpgsql security definer set search_path=public
as $$
declare v_session public.acri_sessions%rowtype; v_candidate public.acri_candidates%rowtype;
  v_result public.acri_results%rowtype; v_credential public.acri_credentials%rowtype;
begin
  select * into v_session from public.acri_sessions where id=p_session_id for update;
  if not found then raise exception 'Assessment session not found.'; end if;
  if v_session.candidate_id<>p_candidate_id then raise exception 'Assessment candidate mismatch.'; end if;

  select * into v_candidate from public.acri_candidates where id=p_candidate_id for update;
  if not found then raise exception 'ACRI candidate not found.'; end if;

  select * into v_result from public.acri_results
  where id=p_result_id and session_id=v_session.id and candidate_id=v_candidate.id;
  if not found then raise exception 'Assessment result is not linked to this session.'; end if;

  if p_credential_id is not null then
    select * into v_credential from public.acri_credentials
    where credential_id=p_credential_id and result_id=v_result.id and candidate_id=v_candidate.id for update;
    if not found then raise exception 'Credential record is not linked to this result.'; end if;
  end if;

  if v_session.status='submitted' then
    return query select v_candidate.status,coalesce(v_credential.is_verified,false); return;
  end if;

  if v_session.status<>'in_progress' or v_candidate.status<>'STARTED' then
    raise exception 'Assessment lifecycle cannot be finalized from the current state.';
  end if;

  update public.acri_sessions set status='submitted',completed_at=now() where id=v_session.id;
  update public.acri_candidates set status='COMPLETED',updated_at=now() where id=v_candidate.id;
  update public.acri_candidates set status='SCORED',updated_at=now() where id=v_candidate.id;

  if p_credential_id is not null then
    update public.acri_credentials set is_verified=true where credential_id=p_credential_id;
    update public.acri_candidates set status='CREDENTIAL_ISSUED',updated_at=now() where id=v_candidate.id;
  end if;

  update public.acri_invitations set status='used',used_at=now()
  where id=v_session.invite_id and status='active';

  insert into public.acri_events(event_name,candidate_id,session_id,payload)
  values('assessment_lifecycle_finalized',v_candidate.id,v_session.id,jsonb_build_object(
    'canonical_candidate_id',v_candidate.candidate_id,'result_id',p_result_id,
    'credential_id',p_credential_id,'final_status',(select status from public.acri_candidates where id=v_candidate.id)
  ));

  return query select (select status from public.acri_candidates where id=v_candidate.id),
    (p_credential_id is not null);
end;
$$;

revoke all on function public.acri_register_candidate(text,text,text,text,text,text,text,text,text) from public,anon,authenticated;
revoke all on function public.acri_approve_candidate(uuid,text) from public,anon,authenticated;
revoke all on function public.acri_start_session(text) from public,anon,authenticated;
revoke all on function public.acri_finalize_assessment(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.acri_register_candidate(text,text,text,text,text,text,text,text,text) to service_role;
grant execute on function public.acri_approve_candidate(uuid,text) to service_role;
grant execute on function public.acri_start_session(text) to service_role;
grant execute on function public.acri_finalize_assessment(uuid,uuid,text,text) to service_role;

commit;

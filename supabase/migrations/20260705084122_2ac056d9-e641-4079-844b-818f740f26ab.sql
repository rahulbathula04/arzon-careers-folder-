alter table public.counsellor_leads
  add column if not exists requested_slot_at timestamptz,
  add column if not exists requested_role text;

alter table public.counsellor_leads
  drop constraint if exists counsellor_leads_requested_role_length;
alter table public.counsellor_leads
  add constraint counsellor_leads_requested_role_length
  check (requested_role is null or (length(requested_role) between 1 and 160));
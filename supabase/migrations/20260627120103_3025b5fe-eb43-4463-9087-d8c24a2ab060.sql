create table if not exists public.ai_feedback (
  id uuid primary key default gen_random_uuid(),
  route text not null,
  surface text,
  reason text not null check (reason in ('sounds_ai','not_verified','wrong_data','other')),
  note text,
  user_agent text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  resolved_by uuid references auth.users(id) on delete set null,
  resolution_note text
);
create index if not exists ai_feedback_created_at_idx on public.ai_feedback (created_at desc);
create index if not exists ai_feedback_route_idx on public.ai_feedback (route);
create index if not exists ai_feedback_open_idx on public.ai_feedback (created_at desc) where resolved_at is null;
grant select, update on public.ai_feedback to authenticated;
grant all on public.ai_feedback to service_role;
alter table public.ai_feedback enable row level security;
create policy "Staff can read ai_feedback" on public.ai_feedback for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Staff can update ai_feedback" on public.ai_feedback for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
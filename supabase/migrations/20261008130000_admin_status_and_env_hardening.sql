-- Admin system-status writes.
-- Public visitors keep read-only access; only authenticated admins may update status rows.
grant select on table public.status_components to anon, authenticated;
grant update on table public.status_components to authenticated;

drop policy if exists "status admin update" on public.status_components;

create policy "status admin update"
  on public.status_components
  for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'::app_role))
  with check (public.has_role(auth.uid(), 'admin'::app_role));

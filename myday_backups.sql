create table public.myday_backups (
  owner_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object' and jsonb_typeof(snapshot->'items') is not distinct from 'array'),
  revision integer not null default 1 check (revision > 0)
);
alter table public.myday_backups enable row level security;
revoke all on public.myday_backups from public, anon, authenticated;
grant select, insert (snapshot), update (snapshot, revision) on public.myday_backups to authenticated;
create policy myday_read_own on public.myday_backups for select to authenticated using ((select auth.uid()) = owner_id);
create policy myday_insert_own on public.myday_backups for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy myday_update_own on public.myday_backups for update to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);

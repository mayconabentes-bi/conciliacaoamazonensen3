-- Supabase Storage setup for the Galeria Histórica dos Veneráveis Mestres.
-- Execute este arquivo no Supabase SQL Editor do projeto oficial.

-- 1) Cria ou atualiza o bucket público que receberá as fotos.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'veneraveis',
  'veneraveis',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 2) Permite leitura pública das fotos publicadas.
drop policy if exists "Public read for veneraveis bucket" on storage.objects;
create policy "Public read for veneraveis bucket"
on storage.objects
for select
to public
using (bucket_id = 'veneraveis');

-- 3) Permite upload apenas para usuários autenticados no painel administrativo.
drop policy if exists "Authenticated upload for veneraveis bucket" on storage.objects;
create policy "Authenticated upload for veneraveis bucket"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'veneraveis');

-- 4) Permite substituir fotos apenas para usuários autenticados.
drop policy if exists "Authenticated update for veneraveis bucket" on storage.objects;
create policy "Authenticated update for veneraveis bucket"
on storage.objects
for update
to authenticated
using (bucket_id = 'veneraveis')
with check (bucket_id = 'veneraveis');

-- 5) Permite exclusão técnica apenas para usuários autenticados.
drop policy if exists "Authenticated delete for veneraveis bucket" on storage.objects;
create policy "Authenticated delete for veneraveis bucket"
on storage.objects
for delete
to authenticated
using (bucket_id = 'veneraveis');

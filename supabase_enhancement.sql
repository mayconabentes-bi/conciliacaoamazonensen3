-- 1. Atualizar a tabela de currículos (Resumes)
ALTER TABLE public.resumes 
ADD COLUMN IF NOT EXISTS relationship TEXT,
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- 2. Instruções para Supabase Storage:
-- Crie um bucket chamado 'resumes' no painel do Supabase.
-- Garanta que o bucket seja PÚBLICO para que as URLs das fotos funcionem para todos os membros.
-- Adicione as seguintes políticas (Policies) no bucket 'resumes':
--   - Permitir INSERT público: Permite que usuários carreguem fotos (bucket_id = 'resumes')
--   - Permitir SELECT público: Permite que todos vejam as fotos (bucket_id = 'resumes')

-- 3. (Opcional) Se quiser restringir o upload apenas para autenticados no futuro, 
-- mude a política de INSERT. Por enquanto, seguiremos o formato aberto para o teste.

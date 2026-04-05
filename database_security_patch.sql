-- PATCH DE SEGURANÇA: Corrigindo RLS para uso exclusivo de Administradores
-- Instruções: Execute este script no SQL Editor do seu dashboard Supabase.

-- 1. Tabela: site_content
-- Remove o acesso público para inserções e atualizações.
DROP POLICY IF EXISTS "Allow public insert site_content" ON public.site_content;
DROP POLICY IF EXISTS "Allow public update site_content" ON public.site_content;

-- Cria novas políticas restritas apenas para quem está Autenticado (Administrador)
CREATE POLICY "Allow authenticated insert site_content" ON public.site_content 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update site_content" ON public.site_content 
FOR UPDATE TO authenticated USING (true);


-- 2. Tabela: jobs (vagas)
-- Remove o acesso público para inserções e atualizações livres.
DROP POLICY IF EXISTS "Allow public insert jobs" ON public.jobs;
DROP POLICY IF EXISTS "Allow public update jobs" ON public.jobs;

-- Apenas o administrador deve poder postar vagas e atualizá-las
CREATE POLICY "Allow authenticated insert jobs" ON public.jobs 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update jobs" ON public.jobs 
FOR UPDATE TO authenticated USING (true);


-- 3. Instrução para o Painel Supabase
-- IMPORTANTE: Vá na aba "Authentication" -> "Users" e crie seu usuário Administrador
-- (Email e Senha real) para usar no painel de Login da aplicação.

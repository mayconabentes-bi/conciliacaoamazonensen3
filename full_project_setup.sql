-- 1. Tabela de Conteúdo do Site (Global)
CREATE TABLE IF NOT EXISTS public.site_content (
    id TEXT PRIMARY KEY,
    json_data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabela de Vagas (Jobs)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT,
    requirements TEXT,
    location TEXT,
    type TEXT,
    salary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabela de Currículos (Resumes)
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    relationship TEXT,
    experience_years INTEGER,
    bio TEXT,
    skills TEXT[],
    contact_email TEXT NOT NULL,
    linkedin_url TEXT,
    photo_url TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Habilitar RLS (Segurança)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- 5. Limpar Políticas Existentes (Para evitar erro de "já existe")
DROP POLICY IF EXISTS "Allow public read jobs" ON public.jobs;
DROP POLICY IF EXISTS "Allow public read resumes" ON public.resumes;
DROP POLICY IF EXISTS "Allow public read site_content" ON public.site_content;
DROP POLICY IF EXISTS "Allow public insert site_content" ON public.site_content;
DROP POLICY IF EXISTS "Allow public update site_content" ON public.site_content;
DROP POLICY IF EXISTS "Allow public insert resumes" ON public.resumes;

-- 6. Recriar Políticas de Acesso
CREATE POLICY "Allow public read jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Allow public insert jobs" ON public.jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update jobs" ON public.jobs FOR UPDATE USING (true);
CREATE POLICY "Allow public read resumes" ON public.resumes FOR SELECT USING (is_public = true);
CREATE POLICY "Allow public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Allow public insert site_content" ON public.site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update site_content" ON public.site_content FOR UPDATE USING (true);
CREATE POLICY "Allow public insert resumes" ON public.resumes FOR INSERT WITH CHECK (true);

-- 7. (IMPORTANTE) Lembre-se de criar o bucket 'resumes' no Storage como PÚBLICO!

-- SQL para criação das tabelas do Clube de Negócios no Supabase

-- Tabela de Vagas (Jobs)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location TEXT NOT NULL,
    type TEXT NOT NULL, -- Full-time, Remote, etc
    salary TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Currículos / Talentos (Resumes)
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    experience_years INTEGER DEFAULT 0,
    bio TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    contact_email TEXT NOT NULL,
    linkedin_url TEXT,
    relationship TEXT,
    lodge_name TEXT,
    mason_name TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS (Row Level Security) - Opcional conforme necessidade
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Políticas simples (Permitir leitura pública para exemplo)
CREATE POLICY "Leitura pública de vagas" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Leitura pública de talentos ativos" ON public.resumes FOR SELECT USING (is_public = true);
CREATE POLICY "Inserção pública de currículos" ON public.resumes FOR INSERT WITH CHECK (true);

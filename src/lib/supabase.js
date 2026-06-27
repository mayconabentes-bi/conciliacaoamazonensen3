import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const getSupabaseHost = (url) => {
  if (!url) return 'não configurado';
  try {
    return new URL(url).host;
  } catch {
    return 'URL inválida';
  }
};

export const supabaseDiagnostics = {
  hasUrl: Boolean(supabaseUrl),
  hasAnonKey: Boolean(supabaseAnonKey),
  host: getSupabaseHost(supabaseUrl),
  urlSource: import.meta.env.VITE_SUPABASE_URL_SOURCE || 'VITE_SUPABASE_URL',
  keySource: import.meta.env.VITE_SUPABASE_KEY_SOURCE || 'VITE_SUPABASE_ANON_KEY'
};

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erro: Variáveis de ambiente do Supabase não encontradas!');
}

// Usar valores vazios em vez de undefined evita o erro fatal "supabaseUrl is required"
// O app não vai funcionar, mas não vai dar tela branca total de cara (o erro será no fetch)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

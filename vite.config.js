import { defineConfig } from 'vite' // Force restart
import react from '@vitejs/plugin-react-swc'

const deriveSupabaseUrlFromPostgres = (postgresHost = '', postgresUrl = '') => {
  const candidates = [postgresHost, postgresUrl]

  for (const value of candidates) {
    const directMatch = value.match(/db\.([a-z0-9-]+)\.supabase\.co/i)
    if (directMatch?.[1]) return `https://${directMatch[1]}.supabase.co`

    const pooledMatch = value.match(/postgres\.([a-z0-9-]+)@/i)
    if (pooledMatch?.[1]) return `https://${pooledMatch[1]}.supabase.co`
  }

  return ''
}

const supabaseUrl =
  process.env.VITE_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  deriveSupabaseUrlFromPostgres(process.env.POSTGRES_HOST, process.env.POSTGRES_URL)

const supabaseKey =
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  ''

const supabaseKeySource = process.env.VITE_SUPABASE_ANON_KEY
  ? 'VITE_SUPABASE_ANON_KEY'
  : process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    ? 'VITE_SUPABASE_PUBLISHABLE_KEY'
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
      : process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
        ? 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'
        : process.env.SUPABASE_PUBLISHABLE_KEY
          ? 'SUPABASE_PUBLISHABLE_KEY'
          : 'não configurada'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl || ''),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseKey || ''),
    'import.meta.env.VITE_SUPABASE_KEY_SOURCE': JSON.stringify(supabaseKeySource),
    'import.meta.env.VITE_SUPABASE_URL_SOURCE': JSON.stringify(supabaseUrl ? 'resolvida no build' : 'não configurada')
  },
  server: {
    host: true,
    port: 5175,
  },
})

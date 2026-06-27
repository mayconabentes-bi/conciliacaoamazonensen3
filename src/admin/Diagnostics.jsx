import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase, supabaseDiagnostics } from '../lib/supabase';

const Diagnostics = () => {
    const [status, setStatus] = useState({ loading: true, content: null, auth: null, error: null });

    const runChecks = async () => {
        setStatus({ loading: true, content: null, auth: null, error: null });
        try {
            const [{ data: contentData, error: contentError }, { data: authData, error: authError }] = await Promise.all([
                supabase.from('site_content').select('id, updated_at').eq('id', 'global').maybeSingle(),
                supabase.auth.getSession()
            ]);

            setStatus({
                loading: false,
                content: contentError ? { ok: false, message: contentError.message } : { ok: true, message: contentData ? `Registro global encontrado. Última atualização: ${contentData.updated_at || 'sem data'}.` : 'Tabela acessível, mas o registro global ainda não existe.' },
                auth: authError ? { ok: false, message: authError.message } : { ok: true, message: authData?.session ? 'Sessão administrativa ativa.' : 'Sem sessão ativa neste navegador.' },
                error: null
            });
        } catch (error) {
            setStatus({ loading: false, content: null, auth: null, error: error.message });
        }
    };

    useEffect(() => {
        runChecks();
    }, []);

    const StatusLine = ({ ok, label, message }) => (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid var(--admin-border)' }}>
            {ok ? <CheckCircle size={20} color="#2ecc71" /> : <AlertTriangle size={20} color="#f1c40f" />}
            <div>
                <strong>{label}</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--admin-muted)', lineHeight: 1.5 }}>{message}</p>
            </div>
        </div>
    );

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Diagnóstico de Publicação</h1>
                <button className="btn-save" onClick={runChecks} disabled={status.loading}>
                    <RefreshCw size={18} /> Verificar Novamente
                </button>
            </div>

            <div className="admin-card">
                <h3 className="section-title">Chaves e APIs obrigatórias</h3>
                <StatusLine
                    ok={supabaseDiagnostics.hasUrl}
                    label="VITE_SUPABASE_URL"
                    message={supabaseDiagnostics.hasUrl ? `Configurada para ${supabaseDiagnostics.host} (${supabaseDiagnostics.urlSource}).` : 'Ausente. Configure NEXT_PUBLIC_SUPABASE_URL, SUPABASE_URL ou VITE_SUPABASE_URL no Vercel.'}
                />
                <StatusLine
                    ok={supabaseDiagnostics.hasAnonKey}
                    label="VITE_SUPABASE_ANON_KEY"
                    message={supabaseDiagnostics.hasAnonKey ? `Configurada no build via ${supabaseDiagnostics.keySource}.` : 'Ausente. Configure SUPABASE_PUBLISHABLE_KEY, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ou VITE_SUPABASE_ANON_KEY no Vercel.'}
                />
                <StatusLine
                    ok={Boolean(import.meta.env.PROD || import.meta.env.DEV)}
                    label="Ambiente Vite"
                    message={`Modo atual: ${import.meta.env.MODE || 'indefinido'}.`}
                />
            </div>

            <div className="admin-card">
                <h3 className="section-title">Conexão com Supabase</h3>
                {status.loading ? (
                    <p style={{ color: 'var(--admin-muted)' }}>Verificando conexão...</p>
                ) : status.error ? (
                    <StatusLine ok={false} label="Erro inesperado" message={status.error} />
                ) : (
                    <>
                        <StatusLine ok={status.content?.ok} label="Tabela site_content" message={status.content?.message} />
                        <StatusLine ok={status.auth?.ok} label="Autenticação" message={status.auth?.message} />
                    </>
                )}
            </div>

            <div className="admin-card">
                <h3 className="section-title">Como publicar a versão correta</h3>
                <ol style={{ color: 'var(--admin-muted)', lineHeight: 1.7 }}>
                    <li>Confirme que o deployment da Vercel está usando o commit mais recente da branch correta.</li>
                    <li>Confirme que existe uma URL pública do Supabase (<strong>NEXT_PUBLIC_SUPABASE_URL</strong>, <strong>SUPABASE_URL</strong> ou <strong>VITE_SUPABASE_URL</strong>) e uma chave pública (<strong>SUPABASE_PUBLISHABLE_KEY</strong>, <strong>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</strong> ou <strong>VITE_SUPABASE_ANON_KEY</strong>) nos ambientes Production e Preview.</li>
                    <li>Não use <strong>SUPABASE_SERVICE_ROLE_KEY</strong> no navegador; essa chave é secreta e fica somente no backend.</li>
                    <li>Após alterar variáveis no Vercel, faça um novo deploy de produção para embutir as chaves no build.</li>
                    <li>Depois do deploy, abra este diagnóstico no painel oficial e verifique se todos os itens aparecem como configurados.</li>
                </ol>
            </div>
        </div>
    );
};

export default Diagnostics;

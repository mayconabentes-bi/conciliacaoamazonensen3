import { useState, useEffect } from 'react';
import { CONTENT as INITIAL_CONTENT } from '../data/content';
import { supabase } from '../lib/supabase';

export const useContent = () => {
    // Migration Helper
    const migrateContent = (data) => {
        let needsUpdate = false;
        
        // Version-based Force Update (2.0.0+)
        if (!data.version || data.version !== INITIAL_CONTENT.version) {
            console.log(`Versão antiga (${data.version || '1.0'}) detectada. Forçando atualização para ${INITIAL_CONTENT.version}...`);
            
            // Overwrite all data that might have changed or been added recently
            data.historyGeneral = INITIAL_CONTENT.historyGeneral;
            data.historyBrazil = INITIAL_CONTENT.historyBrazil;
            data.historyAmazonas = INITIAL_CONTENT.historyAmazonas;
            data.historyGlomam = INITIAL_CONTENT.historyGlomam;
            data.history = INITIAL_CONTENT.history;
            data.institute = INITIAL_CONTENT.institute;
            data.academy = INITIAL_CONTENT.academy;
            data.library = INITIAL_CONTENT.library;
            data.lectures = INITIAL_CONTENT.lectures;
            data.seminars = INITIAL_CONTENT.seminars;
            data.courses = INITIAL_CONTENT.courses;
            data.nominata = INITIAL_CONTENT.nominata;
            data.sessions = INITIAL_CONTENT.sessions;
            data.clubeAcacias = INITIAL_CONTENT.clubeAcacias;
            data.nav = INITIAL_CONTENT.nav;
            data.footer = INITIAL_CONTENT.footer;
            data.testimonials = INITIAL_CONTENT.testimonials;
            
            // Sync version
            data.version = INITIAL_CONTENT.version;
            needsUpdate = true;
        }

        // Feature-specific migrations: Testimonials Pending
        if (data.testimonials && !data.testimonials.pending) {
            data.testimonials.pending = [];
            needsUpdate = true;
        }

        // Initialize sessions if missing
        if (!data.sessions) {
            data.sessions = INITIAL_CONTENT.sessions;
            needsUpdate = true;
        }

        // Removed legacy hardcoded nav migrations as they conflict with new MPA linking.
        return { data, needsUpdate };
    };

    const [content, setContent] = useState(() => {
        try {
            const saved = localStorage.getItem('conciliacao_content');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (!parsed || typeof parsed !== 'object') {
                    console.warn('[useContent] Dados do localStorage inválidos. Resetando...');
                    localStorage.removeItem('conciliacao_content');
                    return INITIAL_CONTENT;
                }
                const { data, needsUpdate } = migrateContent(parsed);
                if (needsUpdate) {
                    localStorage.setItem('conciliacao_content', JSON.stringify(data));
                }
                return data;
            }
        } catch (err) {
            console.error('[useContent] Erro ao carregar do localStorage:', err);
            localStorage.removeItem('conciliacao_content');
        }
        return INITIAL_CONTENT;
    });

    // Fetch from Supabase on mount
    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_content')
                    .select('json_data')
                    .eq('id', 'global')
                    .single();

                if (data && data.json_data) {
                    const { data: updatedJson, needsUpdate } = migrateContent(data.json_data);

                    setContent(updatedJson);
                    localStorage.setItem('conciliacao_content', JSON.stringify(updatedJson));

                    if (needsUpdate) {
                        console.log('Sincronizando migração com Supabase...');
                        await supabase
                            .from('site_content')
                            .upsert({
                                id: 'global',
                                json_data: updatedJson,
                                updated_at: new Date().toISOString()
                            });
                    }
                } else if (error && error.code !== 'PGRST116') {
                    console.error('Erro ao buscar conteúdo do Supabase:', error);
                }
            } catch (err) {
                console.error('Erro inesperado:', err);
            }
        };

        fetchContent();
    }, []);

    const updateSection = async (section, newData) => {
        const updatedContent = {
            ...content,
            [section]: newData
        };

        // Update Local State
        setContent(updatedContent);
        localStorage.setItem('conciliacao_content', JSON.stringify(updatedContent));

        // Sync with Supabase
        try {
            const { error } = await supabase
                .from('site_content')
                .upsert({
                    id: 'global',
                    json_data: updatedContent,
                    updated_at: new Date().toISOString()
                });

            if (error) {
                console.error('Erro ao salvar no Supabase:', error);
                alert('Erro ao salvar no servidor. Verifique o console.');
            }
        } catch (err) {
            console.error('Erro na sincronização:', err);
        }
    };

    const submitTestimonial = async (newTestimonial) => {
        const currentTestimonials = content.testimonials || { list: [], pending: [] };
        const updatedTestimonials = {
            ...currentTestimonials,
            pending: [...(currentTestimonials.pending || []), newTestimonial]
        };

        await updateSection('testimonials', updatedTestimonials);
    };

    const resetContent = async () => {
        if (window.confirm('Deseja realmente resetar TODO o conteúdo para o padrão de fábrica?')) {
            setContent(INITIAL_CONTENT);
            localStorage.removeItem('conciliacao_content');

            try {
                await supabase
                    .from('site_content')
                    .upsert({ id: 'global', json_data: INITIAL_CONTENT });
            } catch (err) {
                console.error('Erro ao resetar no Supabase:', err);
            }
        }
    };

    return { content, updateSection, submitTestimonial, resetContent };
};

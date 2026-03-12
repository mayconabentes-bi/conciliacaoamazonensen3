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
            data.nominata = INITIAL_CONTENT.nominata;
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

        try {
            // Migração do menu Descobrir
            const discoverLink = data.nav.links.find(l => l.label === 'Descobrir');
            if (discoverLink && discoverLink.dropdown && discoverLink.dropdown[0]) {
                const requiredItems = [
                    { label: 'História da Maçonaria', href: '#historia-maçonaria' },
                    { label: 'Maçonaria no Brasil', href: '#maconaria-brasil' },
                    { label: 'Maçonaria no Amazonas', href: '#maconaria-amazonas' },
                    { label: 'GLOMAM', href: '#glomam' }
                ];
                const currentItems = discoverLink.dropdown[0].items;
                const isIdentical = currentItems.length === requiredItems.length && 
                                   currentItems.every((item, idx) => 
                                       item.label === requiredItems[idx].label && 
                                       item.href === requiredItems[idx].href
                                   );
                if (!isIdentical) {
                    discoverLink.dropdown[0].items = requiredItems;
                    needsUpdate = true;
                }
            }

            // Migração do menu Academia
            const academyLink = data.nav.links.find(l => l.label === 'Academia');
            if (academyLink) {
                const requiredAcademyItems = [
                    { label: 'Artigos Filosóficos', href: '#academia-portal' },
                    { label: 'Palestras', href: '#academia-portal' },
                    { label: 'Seminários', href: '#academia-portal' },
                    { label: 'Biblioteca', href: '#academia-portal' }
                ];

                if (!academyLink.dropdown) {
                    console.log('Transformando Academia em dropdown...');
                    academyLink.dropdown = [{ title: 'Áreas de Estudo', items: requiredAcademyItems }];
                    needsUpdate = true;
                } else if (JSON.stringify(academyLink.dropdown[0].items) !== JSON.stringify(requiredAcademyItems)) {
                    console.log('Atualizando subcategorias da Academia...');
                    academyLink.dropdown[0].items = requiredAcademyItems;
                    needsUpdate = true;
                }
            }

            // Migração do menu Sobre a Loja
            const aboutLink = data.nav.links.find(l => l.label === 'Sobre a Loja');
            if (aboutLink && aboutLink.dropdown && aboutLink.dropdown[0]) {
                const requiredAboutItems = [
                    { label: 'História', href: '#historia' },
                    { label: 'Nossos Valores', href: '#valores' },
                    { label: 'Nominata', href: '#nominata' },
                    { label: 'Veneráveis Mestres', href: '#veneraveis' },
                    { label: 'Clube das Acácias', href: '#clube-acacias' }
                ];
                if (JSON.stringify(aboutLink.dropdown[0].items) !== JSON.stringify(requiredAboutItems)) {
                    console.log('Atualizando subcategorias de Sobre a Loja...');
                    aboutLink.dropdown[0].items = requiredAboutItems;
                    needsUpdate = true;
                }
            }

            // Migração do menu Instituto Social
            const instituteLink = data.nav.links.find(l => l.label === 'Instituto Social');
            if (instituteLink) {
                const requiredInstituteItems = [
                    { label: 'Academia de Liderança', href: '#academia-maconica-de-lideranca' },
                    { label: 'Estudos Filosóficos', href: '#nucleo-de-estudos-filosoficos' },
                    { label: 'Fórum Anual', href: '#forum-anual' },
                    { label: 'Projeto Ribeirinho', href: '#projeto-ribeirinho' },
                    { label: 'Jovens Empreendedores', href: '#projeto-jovens-empreendedores' },
                    { label: 'Acervo Histórico', href: '#acervo-conciliacao' },
                    { label: 'Clube de Negócios', href: '#clube-de-negocios' }
                ];

                if (!instituteLink.dropdown) {
                    console.log('Transformando Instituto Social em dropdown...');
                    instituteLink.dropdown = [{ title: 'Iniciativas Sociais', items: requiredInstituteItems }];
                    needsUpdate = true;
                } else if (JSON.stringify(instituteLink.dropdown[0].items) !== JSON.stringify(requiredInstituteItems)) {
                    console.log('Atualizando subcategorias do Instituto Social...');
                    instituteLink.dropdown[0].items = requiredInstituteItems;
                    needsUpdate = true;
                }
            }
        } catch (e) {
            console.error('Erro na migração do menu:', e);
        }
        return { data, needsUpdate };
    };

    const [content, setContent] = useState(() => {
        const saved = localStorage.getItem('conciliacao_content');
        if (saved) {
            const { data, needsUpdate } = migrateContent(JSON.parse(saved));
            if (needsUpdate) {
                localStorage.setItem('conciliacao_content', JSON.stringify(data));
            }
            return data;
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

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kpfzrjchjgmgeuabibzn.supabase.co';
const supabaseAnonKey = 'sb_publishable_MoFu6T8BjfCpOrvW3ouPqw_g8laqtnC';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkContent() {
    const { data, error } = await supabase
        .from('site_content')
        .select('json_data')
        .eq('id', 'global')
        .single();

    if (error) {
        console.error('Erro ao buscar conteúdo:', error.message);
        return;
    }

    if (data && data.json_data) {
        console.log('--- CONTEÚDO ATUAL NO SUPABASE ---');
        console.log('Versão:', data.json_data.version);
        console.log('Número de artigos na Academia:', data.json_data.academy?.articles?.length);
        console.log('Clube das Acácias presente?', !!data.json_data.clubeAcacias);
        console.log('Categorias no menu:', data.json_data.nav?.links?.map(l => l.label).join(', '));
        
        // Check for specific "update" markers
        const academy = data.json_data.academy;
        if (academy && academy.articles) {
            const hasProfIcons = academy.articles.some(a => a.icon && !a.icon.includes('.')); // assuming prof icons are like 'Compass'
            console.log('Tem ícones profissionais na Academia?', hasProfIcons);
        }
    } else {
        console.log('Nenhum conteúdo encontrado para id="global"');
    }
}

checkContent();

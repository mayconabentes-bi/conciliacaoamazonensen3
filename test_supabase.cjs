const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kpfzrjchjgmgeuabibzn.supabase.co';
const supabaseAnonKey = 'sb_publishable_MoFu6T8BjfCpOrvW3ouPqw_g8laqtnC';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    const tables = ['leads', 'assessments', 'config', 'site_content'];
    for (const table of tables) {
        const { error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            console.log(`Tabela "${table}": ERRO - ${error.message}`);
        } else {
            console.log(`Tabela "${table}": OK`);
        }
    }
}

checkTables();

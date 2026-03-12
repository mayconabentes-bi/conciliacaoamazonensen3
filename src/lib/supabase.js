import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kpfzrjchjgmgeuabibzn.supabase.co';
const supabaseAnonKey = 'sb_publishable_MoFu6T8BjfCpOrvW3ouPqw_g8laqtnC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

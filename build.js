import fs from 'node:fs';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const configContent = `// Gerado automaticamente no build (Vercel / CI / Local)
window.FITNEXIS_CONFIG = {
  SUPABASE_URL: ${JSON.stringify(supabaseUrl)},
  SUPABASE_ANON_KEY: ${JSON.stringify(supabaseAnonKey)}
};
`;

fs.writeFileSync('config.js', configContent, 'utf8');

if (supabaseUrl && supabaseAnonKey) {
  console.log('[Build] config.js gerado com sucesso contendo as credenciais do Supabase.');
} else {
  console.log('[Build] config.js gerado sem credenciais (variáveis de ambiente não encontradas no build).');
}

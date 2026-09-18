# Fitnexis

Aplicativo web progressivo (PWA) para organizar rotinas de treino, registrar evolução de cargas e manter histórico com sincronização em nuvem opcional.

## Recursos

- Fichas de treino editáveis e seleção do próximo treino
- Marcação de exercícios concluídos, timer de descanso e histórico
- Registro de cargas com gráfico de evolução
- Backup e restauração via JSON
- Modo offline com service worker
- Sincronização em nuvem via Supabase (quando configurado)

## Configuração do Supabase

1. Crie um novo projeto no Supabase.
2. Copie `Project URL` e `anon public key` (Settings > API) para as variáveis no topo do `index.html`:

```js
const SUPABASE_URL = '...';
const SUPABASE_ANON_KEY = '...';
```

3. Rode o SQL abaixo no SQL Editor do projeto (ou execute o arquivo `supabase/schema.sql`):

```sql
create table if not exists public.fitnexis_states (
  user_id text primary key,
  payload jsonb not null,
  updated_at timestamptz default timezone('utc', now())
);

alter table public.fitnexis_states enable row level security;

create policy "Usuário acessa seu próprio estado"
  on public.fitnexis_states
  for all
  using (auth.uid()::text = user_id)
  with check (auth.uid()::text = user_id);
```

4. Em `Authentication > Providers`, ative `Google` e configure:
   - `Client ID` e `Client Secret` do OAuth do Google.
   - Redirect URL da aplicação (ex.: `https://fitnexis-livid.vercel.app/`).
5. Em `Authentication > URL Configuration`, adicione o mesmo domínio na lista de `Site URL` e `Redirect URLs`.
6. Em `Authentication > Settings`, mantenha o login via OAuth habilitado para usuários.
7. Publicando com Vercel, mantenha os valores no `index.html` ou passe por variáveis de ambiente/build na sua pipeline.

## Arquivos úteis do Supabase

- `supabase/schema.sql`: SQL da tabela principal (`fitnexis_states`).

## Preciso que eu crie o projeto no seu Supabase?

Envie estes dados e eu faço o provisionamento:

- `SUPABASE_ACCESS_TOKEN` (token de conta)
- `ORGANIZATION_ID` no Supabase
- Nome do projeto (ex.: `fitnexis`)
- Região (ex.: `us-east-1`)
- Senha do banco (DB password)

## Executar localmente

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Testes

```bash
npm test
```

## Estrutura

- `index.html`: interface principal e lógica do app
- `manifest.json`: metadados de instalação da PWA
- `service-worker.js`: cache offline
- `icons/`: ativos de ícone
- `tests/`: validações estáticas

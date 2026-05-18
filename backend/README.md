# Backend — Node.js + TypeScript + Express + Prisma + PostgreSQL

## Pré-requisitos
- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Subir o banco de dados
docker compose up -d

# 4. Gerar o client do Prisma e rodar a migration
npm run db:generate
npm run db:migrate

# 5. (Opcional) Popular o banco com dados iniciais
npm run db:seed

# 6. Iniciar o servidor em modo dev
npm run dev
```

## Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/health | Health check |
| GET | /api/users | Lista todos os usuários |
| GET | /api/users/:id | Busca usuário por ID |
| POST | /api/users | Cria um novo usuário |

## Prisma

```bash
npm run db:studio    # Abre interface visual do banco
npm run db:migrate   # Roda migrations pendentes
npm run db:seed      # Popula o banco com dados iniciais
```

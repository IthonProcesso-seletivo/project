#!/bin/bash

# ─────────────────────────────────────────
#  Backend Setup — Node + TypeScript + Express + Prisma + PostgreSQL
# ─────────────────────────────────────────

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${GREEN}[setup]${NC} $1"; }
info() { echo -e "${BLUE}[info]${NC} $1"; }

# ─── Estrutura de pastas ───
log "Criando estrutura de pastas..."
mkdir -p src/{config,controllers,middlewares,routes,services}
mkdir -p prisma

# ─── package.json ───
log "Criando package.json..."
cat > package.json << 'JSON'
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "db:generate": "prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "dotenv": "^16.3.1",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "prisma": "^5.7.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.0"
  }
}
JSON

# ─── tsconfig.json ───
log "Criando tsconfig.json..."
cat > tsconfig.json << 'JSON'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
JSON

# ─── .env.example ───
log "Criando .env.example..."
cat > .env.example << 'ENV'
PORT=3000
DATABASE_URL="postgresql://admin:admin@localhost:5432/myapp"
ENV

# ─── .gitignore ───
log "Criando .gitignore..."
cat > .gitignore << 'GIT'
node_modules/
dist/
.env
GIT

# ─── docker-compose.yml ───
log "Criando docker-compose.yml..."
cat > docker-compose.yml << 'YAML'
version: '3.8'
services:
  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: myapp
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
YAML

# ─── Prisma schema ───
log "Criando prisma/schema.prisma..."
cat > prisma/schema.prisma << 'PRISMA'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Exemplo de model — fique à vontade para modificar!
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
PRISMA

# ─── Prisma seed ───
log "Criando prisma/seed.ts..."
cat > prisma/seed.ts << 'SEED'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  await prisma.user.upsert({
    where: { email: 'mentor@example.com' },
    update: {},
    create: {
      name: 'Mentor',
      email: 'mentor@example.com',
    },
  });

  console.log('✅ Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
SEED

# ─── src/config/prisma.ts ───
log "Criando src/config/prisma.ts..."
cat > src/config/prisma.ts << 'TS'
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
TS

# ─── src/middlewares/errorHandler.ts ───
log "Criando src/middlewares/errorHandler.ts..."
cat > src/middlewares/errorHandler.ts << 'TS'
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
}
TS

# ─── src/routes/index.ts ───
log "Criando src/routes/index.ts..."
cat > src/routes/index.ts << 'TS'
import { Router } from 'express';
import { userRoutes } from './user.routes';

export const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/users', userRoutes);
TS

# ─── src/routes/user.routes.ts ───
log "Criando src/routes/user.routes.ts..."
cat > src/routes/user.routes.ts << 'TS'
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRoutes = Router();

userRoutes.get('/', UserController.getAll);
userRoutes.get('/:id', UserController.getById);
userRoutes.post('/', UserController.create);
TS

# ─── src/controllers/user.controller.ts ───
log "Criando src/controllers/user.controller.ts..."
cat > src/controllers/user.controller.ts << 'TS'
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.findById(Number(req.params.id));
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }
}
TS

# ─── src/services/user.service.ts ───
log "Criando src/services/user.service.ts..."
cat > src/services/user.service.ts << 'TS'
import { prisma } from '../config/prisma';

export class UserService {
  static findAll() {
    return prisma.user.findMany();
  }

  static findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  static create(data: { name: string; email: string }) {
    return prisma.user.create({ data });
  }
}
TS

# ─── src/server.ts ───
log "Criando src/server.ts..."
cat > src/server.ts << 'TS'
import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
TS

# ─── README.md ───
log "Criando README.md..."
cat > README.md << 'MD'
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
MD

echo ""
info "Estrutura criada:"
find . -not -path './node_modules/*' -not -path './.git/*' | sort | sed 's|[^/]*/|  |g'
echo ""
log "✅ Setup completo! Siga os passos do README.md para rodar o projeto."

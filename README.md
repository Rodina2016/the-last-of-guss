# The Last of Guss

Монорепо из двух пакетов:
- `server` — Node.js + TypeScript + Fastify + Prisma + PostgreSQL
- `web`    — React + TypeScript + Vite + Tailwind

Требования окружения: Node 20, PostgreSQL 16.

## Запуск проекта

### 1. Поднять PostgreSQL
Можно через Docker:

```bash
docker run --name guss-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=guss \
  -p 51213:5432 \
  -d postgres:16
```

### 2. запуск бэка
cd server
npx prisma migrate dev
npm install
npm run dev


### 2. запуск фронта
cd web
npm install
npm run dev

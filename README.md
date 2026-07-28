# Learn Hub

A site for learning core concepts from original docs — condensed, with real project examples — plus interview prep flashcards. Built on Angular, NestJS, and MongoDB.

## Stack

- **apps/web** — Angular 22 (standalone components)
- **apps/api** — NestJS 11 REST API
- **MongoDB** — via Mongoose, run locally through Docker Compose
- Monorepo managed with **Nx**, package manager **pnpm**

## Prerequisites

- Node.js 22+
- pnpm (`corepack enable` or `npm i -g pnpm`)
- Docker (for the local MongoDB instance)

## Getting started

```sh
pnpm install
cp .env.example .env   # adjust if needed
pnpm start              # brings up MongoDB via Docker, then serves api + web
```

- API: http://localhost:3000/api
- Web: http://localhost:4200

`pnpm start` runs a `prestart` hook (`docker compose up -d`) automatically, so MongoDB is always up before the apps serve — no manual Docker step needed.

## Scripts

| Script              | What it does                                      |
| ------------------- | -------------------------------------------------- |
| `pnpm start`         | Start MongoDB (Docker) + serve api and web together |
| `pnpm start:api`     | Start MongoDB (Docker) + serve api only             |
| `pnpm start:web`     | Serve web only                                      |
| `pnpm build`         | Production build of api and web                    |
| `pnpm docker:up`     | Start the MongoDB container                         |
| `pnpm docker:down`   | Stop the MongoDB container                          |
| `pnpm docker:down:v` | Stop the container and delete its data volume       |
| `pnpm docker:logs`   | Tail MongoDB logs                                   |

Any other Nx target works as usual: `pnpm exec nx <target> <project>`, e.g. `pnpm exec nx lint api`, `pnpm exec nx typecheck web`.

## Environment variables

Set in `.env` (see `.env.example`):

| Variable       | Purpose                          | Default                              |
| -------------- | --------------------------------- | ------------------------------------- |
| `MONGODB_URI`  | Mongo connection string           | `mongodb://localhost:27017/learn-hub` |
| `API_PORT`     | Port the NestJS API listens on    | `3000`                                |

`API_PORT` is deliberately named this way (not `PORT`) — Nx auto-loads the root `.env` for every task, and Angular's dev server treats a plain `PORT` var as its own listen port, which collides with the API's port.

## Data model

- **Topic** — title, category, source doc URL, tags
- **Concept** — belongs to a Topic; short explanation, original quote, code example, difficulty
- **Project** — real example project; stack, repo URL, related Concepts
- **InterviewQuestion** — belongs to a Concept; question, answer, difficulty, follow-ups

Each resource is a standard REST CRUD module under `apps/api/src/app/` (controller, service, DTOs, Mongoose schema).

## Project structure

```
apps/
  web/        Angular app
  api/        NestJS app
  api-e2e/    API e2e tests
docker-compose.yml   MongoDB service
```

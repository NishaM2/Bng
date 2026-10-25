# Bng

A WhatsApp bot that turns "where should we meet?" into a fair, metro-friendly, budget-accurate outing plan for 2–6 friends in Bengaluru.

## Requirements

- Node.js 22 or later
- Docker Desktop (runs Postgres + PostGIS)

## Getting started

1. Copy `.env.example` to `.env` and set `POSTGRES_PASSWORD` (use the same password inside `DATABASE_URL`).
2. Start the database:

   ```bash
   docker compose up -d
   ```

   This runs Postgres 17 with PostGIS 3.5 on port 5433.
3. Start the server:

   ```bash
   npm install
   npm run dev
   ```

Then open http://localhost:3000/health (or the `PORT` you set in `.env`). It should show `ok`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the server with auto-restart on file changes |
| `npm run build` | Compiles TypeScript into `dist/` |
| `npm start` | Runs the compiled server from `dist/` |
| `npm run typecheck` | Checks types without building |

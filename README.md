# Akkha Magar

A Magar language and heritage platform: Akkha Lipi sand tracing, the Dhut / Kham / Kaike dialect matrix, lessons, daily conversations, clans and demography, and a cultural heritage archive.

## Requirements

- Node.js 24 (see `.nvmrc`; `nvm use` / `fnm use`)
- [Bun](https://bun.sh) for installing dependencies (`bun.lock` is the lockfile)
- Docker, for building the production image

## Local development

```bash
bun install
npm run dev            # Express + Vite dev server on http://localhost:3000
```

## Checks

```bash
npx vitest run                      # unit tests
npm run lint                        # TypeScript
bash .harness/sensors/run-all.sh    # full harness gate (requires ripgrep: brew install ripgrep)
npm run bench                       # DOD hot-path micro-benchmarks
```

## Production build

```bash
npm run build          # client bundle → dist/ (with .br/.gz/.zst precompressed variants)
                       # server bundle → dist-server/server.cjs
NODE_ENV=production npm start
```

## Container image

The `Dockerfile` produces a small, portable image (Node 24, production dependencies only, non-root user, health check on `/api/health`) that runs on any container host.

```bash
docker build -t akkha-magar .
docker run --rm -p 3000:3000 akkha-magar
curl -sI -H 'Accept-Encoding: br' http://localhost:3000/   # expect Content-Encoding: br
```

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Listening port. Container platforms set this automatically. |
| `NODE_ENV` | — | `production` serves the prebuilt `dist/`; otherwise runs the Vite dev server. |

See `.env.example`.

## Deploying

Push the image to any registry and run it on a container platform (e.g. Cloud Run, Fly.io, Render, Railway, or a VPS with Docker). The server listens on `$PORT`, shuts down gracefully on `SIGTERM`, and needs no secrets or external services.

# syntax=docker/dockerfile:1
# ^ Pins the Dockerfile syntax/frontend version so builds behave the same on every Docker/BuildKit version.

# =====================================================================================================
# Akkha Magar — portable production image
#
# Runs on any container host (Cloud Run, Fly.io, Render, Railway, a VPS with Docker, Kubernetes).
#
# This is a MULTI-STAGE build: each `FROM ... AS <name>` starts a fresh, throwaway image. Later stages
# copy only the files they need from earlier ones, so the final image contains no compilers, build
# tools, dev dependencies or source code — just the built app and what it needs to run. That keeps the
# image small (faster deploys and cold starts) and reduces its attack surface.
# =====================================================================================================


# ---- Stage 1a: all dependencies (needed to BUILD the app) -------------------------------------------

# Bun's official image, used only to install packages: bun.lock is this project's lockfile, and Bun
# installs are fast. Nothing from this image except node_modules reaches the final image.
FROM oven/bun:1 AS deps

# All following commands run inside /app (created automatically if missing).
WORKDIR /app

# Copy ONLY the manifest and lockfile first. Docker caches each step; as long as these two files do not
# change, the slow install step below is reused from cache even when source code changes.
COPY package.json bun.lock ./

# Install every dependency (including devDependencies such as Vite, TypeScript, esbuild, React) exactly
# as pinned in bun.lock. --frozen-lockfile makes the build FAIL instead of silently changing versions if
# package.json and bun.lock disagree — reproducible builds.
RUN bun install --frozen-lockfile


# ---- Stage 1b: production dependencies only (needed to RUN the app) ---------------------------------

# A separate, parallel stage so the runtime image gets a node_modules WITHOUT build tooling.
FROM oven/bun:1 AS prod-deps
WORKDIR /app
COPY package.json bun.lock ./

# --production skips devDependencies: only express, compression and dotenv are installed. React, Vite
# and the rest are already compiled into the static bundle during the build stage and are not needed
# at runtime.
RUN bun install --frozen-lockfile --production


# ---- Stage 2: build ----------------------------------------------------------------------------------

# Official Node.js 24 (current Active LTS) on a minimal Debian ("slim") base. The build runs on Node,
# not Bun, so it matches the runtime exactly and gets Node's zlib zstd support for precompression.
FROM node:24-slim AS build
WORKDIR /app

# Reuse the full dependency install from stage 1a instead of installing again.
COPY --from=deps /app/node_modules ./node_modules

# Copy the application source. .dockerignore keeps node_modules, dist, .env files, .harness and editor
# files out, so secrets never enter the image and local build output cannot leak in.
COPY . .

# `npm run build` (see package.json) runs three steps:
#   1. vite build              → client bundle in dist/ (HTML, hashed JS/CSS)
#   2. scripts/precompress.ts  → .br / .gz (and .zst) variants next to each asset, so the server never
#                                compresses static files per request
#   3. esbuild server.ts       → single server bundle in dist-server/ (kept OUT of the public dist/ so
#                                server code is never downloadable)
RUN npm run build


# ---- Stage 3: runtime (the image that is actually deployed) ------------------------------------------

# Fresh Node 24 slim base: none of the build stages' tooling or source code is carried over.
FROM node:24-slim AS runtime

# NODE_ENV=production makes server.ts serve the prebuilt dist/ (instead of starting the Vite dev server)
# and enables production optimisations in Express. PORT is the default listening port; hosting
# platforms override it at runtime (Cloud Run, Fly.io, Render inject their own PORT).
ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

# Production-only node_modules from stage 1b. --chown gives the files to the unprivileged `node` user
# (built into the official image) instead of root.
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules

# The built, precompressed client bundle served to browsers.
COPY --from=build --chown=node:node /app/dist ./dist

# The bundled server (server.cjs + source map for readable stack traces). Not publicly served.
COPY --from=build --chown=node:node /app/dist-server ./dist-server

# package.json is kept for runtime metadata (name/version, "type") that Node and tooling may read.
COPY --chown=node:node package.json ./

# Drop root privileges: if the app were ever compromised, the attacker would not be root inside the
# container. Many platforms (and Kubernetes security policies) expect non-root containers.
USER node

# Documents the port the app listens on by default (informational; publishing is done with
# `docker run -p` or by the hosting platform).
EXPOSE 3000

# Lets Docker (and platforms that honour it) detect a hung or crashed app and restart/replace it.
# Every 30s it calls GET /api/health using Node's built-in fetch (no curl/wget needed in the slim
# image). Waits 10s after start before counting failures; 3 consecutive failures = unhealthy.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start the server directly with `node` (not `npm start`): node becomes the container's main process,
# so it receives the platform's SIGTERM and runs the graceful shutdown in server.ts. npm would sit in
# between and may not forward the signal, causing hard kills mid-request.
CMD ["node", "dist-server/server.cjs"]

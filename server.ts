import express from "express";
import compression from "compression";
import path from "path";
import { constants as zlibConstants } from "zlib";
import dotenv from "dotenv";
import { servePrecompressed, sendPrecompressed } from "./server/static-precompressed";

dotenv.config();

const app = express();
// Container platforms (Cloud Run, Fly.io, Render, …) inject PORT; 3000 for local runs
const PORT = Number(process.env.PORT) || 3000;

// The Guruma AI tutor and dialect-compare endpoints were retired (the chat is a static
// placeholder), so the server no longer proxies any paid model API.
app.use(express.json({ limit: "16kb" })); // also inflates gzip/deflate request bodies

// Dynamic responses (API JSON now, database-backed endpoints later): on-the-fly Brotli/gzip.
// Precompressed static files already carry Content-Encoding, which this middleware skips.
app.use(
  compression({
    threshold: "1kb",
    brotli: { params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 } },
  })
);

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Akkha Magar Language Engine" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dev-only: loaded lazily so production images need no build tooling
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Build-time .br / .zst / .gz variants, negotiated per request (see scripts/precompress.ts)
    app.use(servePrecompressed(distPath));
    app.use(express.static(distPath));
    // SPA fallback: index.html, also served precompressed
    app.get("*", (req, res) => {
      if (!sendPrecompressed(req, res, distPath, "index.html", "/index.html")) res.sendStatus(404);
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Akkha Magar server running on http://0.0.0.0:${PORT}`);
  });

  // Platforms send SIGTERM before stopping/replacing an instance: finish in-flight requests, then exit
  const shutdown = (signal: string) => {
    console.log(`${signal} received, closing server`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer();

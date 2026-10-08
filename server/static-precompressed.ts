import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { existsSync, statSync } from 'node:fs';
import { resolve, sep, extname } from 'node:path';
import { negotiateEncoding, Encoding, ENCODING_EXTENSION, ENCODING_PREFERENCE } from './encoding';

const isFile = (path: string): boolean => {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
};

const HASHED_ASSET_CACHE = 'public, max-age=31536000, immutable';
const REVALIDATE_CACHE = 'no-cache';

/** Cache policy: Vite's content-hashed /assets/* never change; everything else revalidates. */
export function cacheControlFor(urlPath: string): string {
  return urlPath.startsWith('/assets/') ? HASHED_ASSET_CACHE : REVALIDATE_CACHE;
}

/**
 * Sends `relativePath` (inside `root`) using the best precompressed variant the client accepts,
 * falling back to the original file. Returns false if the original does not exist.
 */
export function sendPrecompressed(req: Request, res: Response, root: string, relativePath: string, urlPath: string): boolean {
  const originalPath = resolve(root, '.' + sep + relativePath);
  if (!originalPath.startsWith(resolve(root) + sep) || !isFile(originalPath)) return false;

  const available: Encoding[] = [];
  for (const encoding of ENCODING_PREFERENCE) {
    if (existsSync(originalPath + ENCODING_EXTENSION[encoding])) available.push(encoding);
  }
  const chosen = negotiateEncoding(req.headers['accept-encoding'], available);

  res.vary('Accept-Encoding');
  res.setHeader('Cache-Control', cacheControlFor(urlPath));
  // Content-Type must describe the decoded body, so derive it from the original extension
  res.type(extname(originalPath));
  if (chosen) res.setHeader('Content-Encoding', chosen);

  res.sendFile(chosen ? originalPath + ENCODING_EXTENSION[chosen] : originalPath);
  return true;
}

/** Express middleware serving precompressed static files from `root` (GET/HEAD only). */
export function servePrecompressed(root: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    let urlPath: string;
    try {
      urlPath = decodeURIComponent(req.path);
    } catch {
      return next();
    }
    const relativePath = urlPath === '/' ? 'index.html' : urlPath.slice(1);
    if (!sendPrecompressed(req, res, root, relativePath, urlPath)) next();
  };
}

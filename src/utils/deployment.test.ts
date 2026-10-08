import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (rel: string) => readFileSync(resolve(root, rel), 'utf8');

describe('self-hosted configuration', () => {
  it('package is named for the project', () => {
    expect(JSON.parse(read('package.json')).name).toBe('akkha-magar');
  });

  it('server takes its port from the environment (container platforms inject PORT)', () => {
    expect(read('server.ts').includes('process.env.PORT')).toBe(true);
  });

  it('documented environment variables are the ones the server reads', () => {
    const example = read('.env.example');
    expect(example).toMatch(/^PORT=/m);
    expect(example).toMatch(/^NODE_ENV=/m);
  });
});

describe('portable container image', () => {
  it('Dockerfile builds on Node 24 and runs production deps as a non-root user', () => {
    const dockerfile = read('Dockerfile');
    expect(dockerfile).toMatch(/FROM node:24/);
    expect(dockerfile).toMatch(/^USER node$/m);
    expect(dockerfile).toMatch(/--production|--omit=dev/);
    expect(dockerfile).toMatch(/NODE_ENV=production/);
    expect(dockerfile).toMatch(/HEALTHCHECK/);
  });

  it('.dockerignore keeps secrets and local artefacts out of the build context', () => {
    const ignore = read('.dockerignore').split('\n').map((l) => l.trim());
    for (const entry of ['node_modules', 'dist', '.env*']) {
      expect(ignore, `.dockerignore should list ${entry}`).toContain(entry);
    }
  });
});

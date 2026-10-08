import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  // GitHub Pages serves the site under /<repo>/; Docker/Express serves it at /.
  base: process.env.PAGES_BASE ?? '/',
  plugins: [react(), tailwindcss()],
});

/**
 * A second, separate build that emits the concept as ONE document.
 *
 * The site's real build (../../vite.config.js) is deliberately multi-page:
 * eight HTML files, code-split chunks, assets served from /public. That is
 * correct for a web host and useless for anywhere that can accept only a
 * single file. This config produces the other shape — one HTML, one JS, one
 * CSS — which `bundle-single.mjs` then folds into a single self-contained
 * document with every font and photograph inlined as a data URI.
 *
 *   node work/violife/bundle-single.mjs
 *
 * It is a separate config rather than another entry in the main one because
 * the two disagree about almost every build option.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../..')

export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(import.meta.dirname, '.single-build'),
    emptyOutDir: true,
    // Nothing else will be served alongside this file, so everything has to
    // land in one chunk rather than being fetched.
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    rollupOptions: {
      input: resolve(import.meta.dirname, 'single/index.html'),
      output: { inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app.[ext]' },
    },
  },
})

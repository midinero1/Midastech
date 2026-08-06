import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        // The marketing site.
        main: resolve(import.meta.dirname, 'index.html'),
        // Internal picker for the three logo directions. Delete once a mark is chosen.
        logos: resolve(import.meta.dirname, 'logos.html'),
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const r = (p) => resolve(import.meta.dirname, p)

// A real multi-page site rather than a client-side router: four HTML documents,
// so every page has its own title, description and canonical URL for search,
// and clean directory URLs that need no redirect rules on a static host.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: r('index.html'),
        services: r('services/index.html'),
        about: r('about/index.html'),
        contact: r('contact/index.html'),
      },
    },
  },
})

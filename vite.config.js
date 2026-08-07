import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const r = (p) => resolve(import.meta.dirname, p)

// A real multi-page site rather than a client-side router: one HTML document
// per page per language, so every page has its own title, description,
// canonical URL and hreflang alternates for search, and clean directory URLs
// that need no redirect rules on a static host.
//
// English sits at the root, Greek under /el/.
const LANGS = ['en', 'el']
const PAGES = ['home', 'services', 'about', 'contact']

const input = Object.fromEntries(
  LANGS.flatMap((lang) =>
    PAGES.map((page) => {
      const dir = [lang === 'en' ? '' : lang, page === 'home' ? '' : page].filter(Boolean).join('/')
      return [`${lang}-${page}`, r(dir ? `${dir}/index.html` : 'index.html')]
    }),
  ),
)

// Concept work lives under /work/ — self-contained studies with their own
// stylesheet and shell, kept out of the marketing site's navigation and
// sitemap and marked noindex. They share the build only so they deploy with
// everything else and stay runnable as the toolchain moves on.
const WORK = ['violife']
const WORK_LANGS = ['el', 'en']
const WORK_PAGES = ['home', 'products', 'recipes', 'story', 'find']
// Greek is the concept's primary language, so it holds the clean URLs and
// English sits under /en/. Mirrors DEFAULT_LOCALE in src/violife/data.js.
const WORK_DEFAULT_LANG = 'el'

for (const project of WORK) {
  for (const lang of WORK_LANGS) {
    for (const page of WORK_PAGES) {
      const dir = ['work', project, lang === WORK_DEFAULT_LANG ? '' : lang, page === 'home' ? '' : page]
        .filter(Boolean)
        .join('/')
      input[`work-${project}-${lang}-${page}`] = r(`${dir}/index.html`)
    }
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { rollupOptions: { input } },
})

/**
 * Folds the concept into one self-contained HTML file.
 *
 *   node work/violife/bundle-single.mjs
 *   → work/violife/violife-concept.html
 *
 * Runs the single-document Vite build, then inlines what it left pointing
 * outward: the stylesheet, the script, every self-hosted font referenced
 * from CSS, and every product photograph loaded at runtime through `img()`
 * in src/violife/data.js. The result opens from a file:// URL, an email
 * attachment or a host that only accepts one file, with no network access
 * of any kind.
 *
 * Fonts and photographs are already the compressed formats — woff2 and
 * webp — so base64 costs the usual third on top and nothing more.
 */

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, extname, basename, join } from 'node:path'

const here = import.meta.dirname
const root = resolve(here, '../..')
const build = resolve(here, '.single-build')
const out = resolve(here, 'violife-concept.html')

const MIME = {
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
}

const dataUri = (file) => {
  const ext = extname(file).toLowerCase()
  const mime = MIME[ext]
  if (!mime) throw new Error(`No MIME type known for ${file}`)
  return `data:${mime};base64,${readFileSync(file).toString('base64')}`
}

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(0)} kB`

/* 1. Build ---------------------------------------------------------- */
execFileSync('npx', ['vite', 'build', '--config', resolve(here, 'vite.single.config.js')], {
  cwd: root,
  stdio: 'inherit',
})

/* 2. Read what it produced ------------------------------------------ */
// Vite mirrors the entry's path under outDir, and that path depends on where
// the config sits, so find the document rather than assuming its depth.
const findHtml = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      const hit = findHtml(path)
      if (hit) return hit
    } else if (entry.name.endsWith('.html')) return path
  }
  return null
}

const htmlPath = findHtml(build)
if (!htmlPath) throw new Error(`No HTML emitted into ${build}`)
let html = readFileSync(htmlPath, 'utf8')
const assets = readdirSync(build, { withFileTypes: true }).filter((e) => e.isFile()).map((e) => e.name)
const js = assets.find((f) => f.endsWith('.js'))
const css = assets.find((f) => f.endsWith('.css'))
if (!js || !css) throw new Error(`Expected one .js and one .css in ${build}, found: ${assets.join(', ')}`)

let styles = readFileSync(resolve(build, css), 'utf8')
const script = readFileSync(resolve(build, js), 'utf8')

/* 3a. Drop @font-face blocks for families the page never sets --------
   The concept sets one family, Inter, but shares a stylesheet with the
   marketing site and so carries that site's faces too. Left in, each one
   is embedded in full — a third of a megabyte of a typeface that never
   renders. A browser would simply never fetch them; a single file has no
   such luxury, because there is no fetching. */
const declared = new Set(
  [...styles.matchAll(/@font-face\s*\{[^}]*?font-family:\s*["']?([^;"'}]+)/g)].map((m) => m[1].trim()),
)
// A family is "used" if its name appears anywhere outside the face blocks —
// it may be named by a custom property (--font-sans: 'Inter', …) rather than
// by a font-family declaration, so matching only the latter drops faces the
// page genuinely renders with.
const elsewhere = styles.replace(/@font-face\s*\{[^}]*\}/g, '')
const unused = [...declared].filter((family) => !elsewhere.includes(family))

if (unused.length) {
  styles = styles.replace(/@font-face\s*\{[^}]*\}/g, (block) => {
    const family = block.match(/font-family:\s*["']?([^;"'}]+)/)?.[1].trim()
    return unused.includes(family) ? '' : block
  })
  console.log(`  dropped unused faces: ${unused.join(', ')}`)
}

/* 3b. Inline the fonts that survived -------------------------------- */
let fonts = 0
styles = styles.replace(/url\(['"]?\/fonts\/([^'")]+)['"]?\)/g, (whole, file) => {
  const path = resolve(root, 'public/fonts', file)
  if (!existsSync(path)) {
    console.warn(`  ! font not found, left as a URL: ${file}`)
    return whole
  }
  fonts += 1
  return `url(${dataUri(path)})`
})

/* 4. Inline the photographs `img()` resolves at runtime -------------- */
const dir = resolve(root, 'public/violife')
const map = Object.fromEntries(
  readdirSync(dir)
    .filter((f) => MIME[extname(f).toLowerCase()])
    .map((f) => [basename(f), dataUri(resolve(dir, f))]),
)

/* 5. Reassemble ------------------------------------------------------ */
// The replacements are passed as functions, never as strings: CSS and
// minified JS both contain `$'` and `` $` ``, which String.replace would
// otherwise expand as substitution patterns and duplicate the document.
html = html
  .replace(/\s*<script type="module"[^>]*><\/script>/, '')
  .replace(/\s*<link rel="stylesheet"[^>]*>/, '')
  .replace('</head>', () => `    <style>${styles}</style>\n  </head>`)
  .replace(
    '</body>',
    () =>
      `    <script>window.__VIOLIFE_ASSETS__ = ${JSON.stringify(map)}</script>\n` +
      `    <script type="module">${script}</script>\n  </body>`,
  )

writeFileSync(out, html)
rmSync(build, { recursive: true, force: true })

console.log(`\n  css     ${kb(styles)} (${fonts} fonts inlined)`)
console.log(`  js      ${kb(script)}`)
console.log(`  images  ${Object.keys(map).length} inlined`)
console.log(`\n  → ${out}  ${kb(html)}\n`)

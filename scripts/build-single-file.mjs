import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')
const outFile = path.join(root, 'sk-print-house.html')

const MIME = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
}

const cache = new Map()

function dataUri(relPath) {
  if (cache.has(relPath)) return cache.get(relPath)
  const file = path.join(dist, relPath.replace(/^\//, ''))
  if (!fs.existsSync(file)) return null
  const ext = path.extname(file).toLowerCase()
  const mime = MIME[ext] ?? 'application/octet-stream'
  const uri = `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`
  cache.set(relPath, uri)
  return uri
}

let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const jsHref = html.match(/<script[^>]*\bsrc="([^"]+\.js)"[^>]*><\/script>/)?.[1]
const cssHref = html.match(/<link[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+\.css)"[^>]*>/)?.[1]

if (!jsHref || !cssHref) {
  throw new Error('Could not find the built JS or CSS file in dist/index.html')
}

// --- CSS: inline fonts and any other url() assets ---
let css = fs.readFileSync(path.join(dist, cssHref.replace(/^\//, '')), 'utf8')
css = css.replace(/url\((['"]?)(\/assets\/[^)'"]+)\1\)/g, (match, _quote, url) => {
  const uri = dataUri(url)
  return uri ? `url(${uri})` : match
})
css = css.replace(/<\/style/gi, '<\\/style')

// --- JS: inline every quoted /assets/... reference ---
let js = fs.readFileSync(path.join(dist, jsHref.replace(/^\//, '')), 'utf8')
js = js.replace(/(["'`])\/assets\/([^"'`\n]+)\1/g, (match, quote, rel) => {
  const uri = dataUri(`/assets/${rel}`)
  return uri ? `${quote}${uri}${quote}` : match
})
js = js.replace(/<\/script/gi, '<\\/script')

// --- HTML: favicons, social image, remove external refs ---
html = html.replace(/<link[^>]*rel="icon"[^>]*>/, () => {
  const uri = dataUri('/assets/favicon-64.png')
  return uri ? `<link rel="icon" type="image/png" href="${uri}" />` : ''
})
html = html.replace(/<link[^>]*rel="apple-touch-icon"[^>]*>/, () => {
  const uri = dataUri('/assets/apple-touch-icon.png')
  return uri ? `<link rel="apple-touch-icon" href="${uri}" />` : ''
})
html = html.replace(
  /<meta property="og:image" content="[^"]*" \/>/,
  '<meta property="og:image" content="https://skprinthouse.com/assets/og-cover.jpg" />',
)
html = html.replace(
  /<meta name="twitter:image" content="[^"]*" \/>/,
  '<meta name="twitter:image" content="https://skprinthouse.com/assets/og-cover.jpg" />',
)

html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>/g, '')
html = html.replace(
  new RegExp(`<script[^>]*\\bsrc="${jsHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*></script>`),
  () => `<script type="module">${js}</script>`,
)
html = html.replace(
  new RegExp(`<link[^>]*\\bhref="${cssHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`),
  () => `<style>${css}</style>`,
)

html = html.replace(
  '<div id="root"></div>',
  '<div id="root"></div>\n    <noscript>This website needs JavaScript enabled.</noscript>',
)

fs.writeFileSync(outFile, html)

const kb = (fs.statSync(outFile).size / 1024).toFixed(0)
console.log(`Created ${path.relative(root, outFile)} — ${kb} KB`)

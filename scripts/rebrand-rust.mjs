/**
 * cheatsrust.net — Rust template → Rust cheats site.
 * Run: node scripts/rebrand-rust.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const RUST_CHECKOUT = 'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frust';

const TEXT_EXTS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.svg',
  '.html',
  '.webmanifest',
  '.css',
  '.toml',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline', '_template']);

/** Longest-first. */
const REPLACEMENTS = [
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frust', RUST_CHECKOUT],
  ['%2Fproducts%2Frust', '%2Fproducts%2Frust'],
  ['https://cheatsrust.net', 'https://cheatsrust.net'],
  ['cheatsrust.net', 'cheatsrust.net'],
  ['cheatsrust-net', 'cheatsrust-net'],
  ['cheatsrust-forum-vote:', 'cheatsrust-forum-vote:'],
  ['/rust-cheats/', '/rust-cheats/'],
  ['/rust-cheats', '/rust-cheats'],
  ['/products/rust-cheats/', '/products/rust/'],
  ['/products/rust/', '/products/rust/'],
  ['/products/rust/', '/products/rust/'],
  ['/products/rust/', '/products/rust/'],
  ['/products/rust', '/products/rust'],
  ['/go/rust/', '/go/rust/'],
  ['/go/rust', '/go/rust'],
  ['checkoutPath(\'apex\')', "checkoutPath('rust')"],
  ['checkoutPath("rust")', 'checkoutPath("rust")'],
  ["checkoutPath(_product = 'rust')", "checkoutPath(_product = 'rust')"],
  ["product: 'rust'", "product: 'rust'"],
  ['ZADEYO_RUST_CHECKOUT_URL', 'ZADEYO_RUST_CHECKOUT_URL'],
  ['ZADEYO_RUST_PRODUCT_SEO', 'ZADEYO_RUST_PRODUCT_SEO'],
  ['zadeyoRustProductSeo', 'zadeyoRustProductSeo'],
  ['rustCheatsLanding', 'rustCheatsLanding'],
  ['RUST_CHECKOUT_URL', 'RUST_CHECKOUT_URL'],
  ['FAVICON_VERSION = \'rust-2026\'', "FAVICON_VERSION = 'rust-2026'"],
  ['TITLE_PREFIX = \'Rust Cheats\'', "TITLE_PREFIX = 'Rust Cheats'"],
  ["PRODUCT_BASE = '/products/rust/'", "PRODUCT_BASE = '/products/rust/'"],
  ['SITE_DOMAIN = \'cheatsrust.net\'', "SITE_DOMAIN = 'cheatsrust.net'"],
  ['"name": "cheatsrust-net"', '"name": "cheatsrust-net"'],
  ["site: 'https://cheatsrust.net'", "site: 'https://cheatsrust.net'"],
  ['Rust Cheats', 'Rust Cheats'],
  ['Rust cheats', 'Rust cheats'],
  ['Rust cheat', 'Rust cheat'],
  ['Rust', 'Rust'],
  ['Rust Lite', 'Rust Lite'],
  ['Rust Pro', 'Rust Pro'],
  ['Rust Elite', 'Rust Elite'],
  ['rust aimbot', 'rust aimbot'],
  ['rust ESP', 'rust ESP'],
  ['Rust ', 'Rust '],
  ['rust-', 'rust-'],
  ['Easy Anti-Cheat', 'Easy Anti-Cheat'],
  ['Steam', 'Steam'],
  ['loadout preview', 'loadout preview'],
  ['player ESP', 'player ESP'],
  ['per-profile', 'per-profile'],
  ['combat test server', 'combat test server'],
  ['combat test server', 'combat test server'],
  ['vanilla and modded servers', 'vanilla and modded servers'],
  ['vanilla servers', 'vanilla servers'],
  ['>R</text>', '>R</text>'],
  ['aria-label="Rust Cheats"', 'aria-label="Rust Cheats"'],
  ['rust-2026', 'rust-2026'],
  ['  rust:', '  rust:'],
  ["'rust'", "'rust'"],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (TEXT_EXTS.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

let filesChanged = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel === 'scripts/rebrand-rust.mjs') continue;
  if (rel.startsWith('scripts/rebrand-') && rel !== 'scripts/rebrand-rust.mjs') continue;

  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of REPLACEMENTS) {
    text = text.split(from).join(to);
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    filesChanged++;
  }
}

console.log(`rebrand-rust: updated ${filesChanged} files`);

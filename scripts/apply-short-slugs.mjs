/**
 * Apply canonical short slugs in content (run once after editing slug-redirects.mjs).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const REPLACEMENTS = [
  ['/products/rust/', '/products/rust/'],
  ['products/rust-cheats/', 'products/r6/'],

  ['rust-cheat-features', 'rust-cheat-features'],
  ['rust-practice-settings-guide', 'rust-firing-range-practice'],
  ['r6-console-hacks-tips', 'rust-training-tips'],
  ['how-to-use-rust-practice-settings', 'rust-cheat-setup'],
  ['rust-practice-settings-hacks', 'rust-practice-settings'],
  ['how-to-buy-rust-legends-cheats-2026', 'buy-rust-legends-cheats'],
  ['r6-hwid-spoofer-after-ban', 'rust-hwid-ban'],
  ['rust-radar-hack-guide', 'rust-radar'],
  ['rust-external-loader', 'rust-external-loader'],
  ['r6-esp-wallhack-setup', 'rust-esp-setup'],
  ['rust-stream-proof-setup', 'rust-stream-proof'],
  ['rust-aimbot-ranked-guide', 'rust-aimbot-ranked'],
  ['rust-aimbot-combat-guide', 'rust-aimbot-combat'],
  ['rust-elite-tier-tier-guide', 'rust-elite-tier'],
  ['r6-skin-changer-guide', 'rust-loadouts'],
  ['eac-patch-day-day-checklist', 'eac-patch-day'],
  ['easy-anti-cheat-r6-guide', 'eac-troubleshooting'],

  ['can-custom-lobby-hack-codes-be-used-in-ranked', 'lobby-codes-ranked'],
  ['how-to-enable-the-r6-console', 'rust-practice-settings-forum'],
  ['practice-rust-high-ground-safely', 'rust-high-ground'],
  ['what-to-check-after-a-r6-patch', 'after-rust-patch'],
  ['r6-lite-or-pro-tier-comparison', 'lite-vs-pro'],
  ['how-to-learn-weapon-aim-in-creative', 'rust-aim-practice'],
  ['what-does-rust-map-awareness-include', 'rust-map-awareness'],
  ['how-to-set-up-map-overlay', 'map-overlay-setup'],
  ['what-zoom-settings-are-comfortable', 'camera-zoom'],
  ['how-to-tune-script-delay-settings', 'aimbot-delay'],
  ['how-to-practice-auto-combos', 'aimbot-practice'],
  ['what-is-in-the-elite-tier', 'elite-tier-tools'],
  ['how-do-lite-and-pro-differ', 'lite-pro-diff'],
  ['what-to-know-about-skin-changer', 'loadout-tools'],
  ['what-to-do-if-eac-cannot-verify', 'eac-verify'],
  ['how-does-an-external-loader-work', 'external-loader'],
  ['how-to-check-stream-proof-capture', 'stream-proof-obs'],
  ['what-to-do-after-hwid-change', 'after-hwid-change'],
  ['what-to-check-before-installing-tools', 'before-install'],
  ['how-to-choose-r6-product-tier', 'choose-rust-tier'],
];

const SKIP = new Set(['node_modules', '.git', 'dist']);
const EXTS = new Set(['.ts', '.astro', '.mjs', '.json', '.md', '.txt', '.webmanifest']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (EXTS.has(path.extname(e.name))) out.push(f);
  }
  return out;
}

let n = 0;
for (const file of walk(root)) {
  if (file.includes('apply-short-slugs.mjs')) continue;
  if (file.includes('slug-redirects.mjs')) continue;
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [a, b] of REPLACEMENTS) {
    if (after.includes(a)) after = after.split(a).join(b);
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    n++;
    console.log(path.relative(root, file));
  }
}

const fromDir = path.join(root, 'src', 'pages', 'products', 'r6-hacks');
const toDir = path.join(root, 'src', 'pages', 'products', 'r6');
if (fs.existsSync(fromDir) && !fs.existsSync(toDir)) {
  fs.renameSync(fromDir, toDir);
  console.log('renamed pages/products/rust-hacks → r6');
}

console.log(`Updated ${n} files.`);

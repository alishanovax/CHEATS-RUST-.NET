/**
 * One-time content migration: R6 template → Rust (cheatsrust.net).
 * Run: node scripts/migrate-rust-content.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const TEXT_REPLACEMENTS = [
  ['https://r6hacks.org', 'https://cheatsrust.net'],
  ['r6hacks.org', 'cheatsrust.net'],
  ['https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frainbow-six-siege', 'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frust'],
  ['/products/r6/', '/products/rust/'],
  ['/products/r6', '/products/rust'],
  ['/r6-hacks/', '/rust-cheats/'],
  ['/r6-hacks', '/rust-cheats'],
  ['/go/r6/', '/go/rust/'],
  ['/go/r6', '/go/rust'],
  ['Rainbow Six Siege', 'Rust'],
  ['Rainbow Six', 'Rust'],
  ['R6 Hacks', 'Rust Cheats'],
  ['R6 hacks', 'Rust cheats'],
  ['R6 hack', 'Rust cheat'],
  ['r6 hacks', 'Rust cheats'],
  ['r6 hack', 'Rust cheat'],
  ['R6 Lite', 'Rust Lite'],
  ['R6 Pro', 'Rust Pro'],
  ['R6 Elite', 'Rust Elite'],
  ['BattlEye', 'Easy Anti-Cheat'],
  ['battleye', 'easy-anti-cheat'],
  ['Ubisoft', 'EA'],
  ['operator portal', 'customer portal'],
  ['Operator loadout', 'loadout preview'],
  ['operator ESP', 'player ESP'],
  ['per-operator', 'per-profile'],
  ['gadget ESP', 'item ESP'],
  ['Gadget ESP', 'Item ESP'],
  ['Training Grounds', 'combat test server'],
  ['training grounds', 'combat test server'],
  ['Shooting Range', 'combat test server'],
  ['Team Deathmatch and Deathmatch', 'vanilla and modded servers'],
  ['Team Deathmatch', 'vanilla servers'],
  ['Deathmatch', 'Ranked'],
  ['reboot vans', 'respawn beacons'],
  ['reboot van', 'respawn beacon'],
  ['Vault Hunter', 'Legend'],
  ['Settlement fight', 'Rust combat'],
  ['Courtyard battle', 'Rust firefight'],
];

const SLUG_REPLACEMENTS = [
  ['buy-r6-hacks', 'buy-rust-legends-cheats'],
  ['buy-r6-cheats', 'buy-rust-legends-cheats'],
  ['r6-lite-vs-pro', 'rust-lite-vs-pro'],
  ['r6-practice-lobby', 'rust-firing-range-practice'],
  ['r6-training-tips', 'rust-training-tips'],
  ['r6-esp-setup', 'rust-esp-setup'],
  ['r6-radar', 'rust-radar'],
  ['r6-aimbot-ranked', 'rust-aimbot-ranked'],
  ['r6-aimbot-combat', 'rust-aimbot-combat'],
  ['r6-stream-proof', 'rust-stream-proof'],
  ['r6-elite', 'rust-elite-tier'],
  ['r6-features', 'rust-cheat-features'],
  ['r6-hwid-ban', 'rust-hwid-ban'],
  ['r6-external-hack-guide', 'rust-external-loader'],
  ['r6-external-loader', 'rust-external-loader'],
  ['r6-loadouts', 'rust-loadouts'],
  ['r6-hack-setup', 'rust-cheat-setup'],
  ['r6-console-commands', 'rust-practice-settings'],
  ['r6-hack-codes', 'rust-practice-settings'],
  ['enable-r6-console', 'rust-practice-settings-forum'],
  ['after-r6-patch', 'after-rust-patch'],
  ['r6-high-ground', 'rust-high-ground'],
  ['r6-aim-practice', 'rust-aim-practice'],
  ['r6-map-awareness', 'rust-map-awareness'],
  ['choose-tier', 'choose-rust-tier'],
  ['r6-cheats', 'rust-legends-cheats'],
  ['r6-hacks-features-guide', 'rust-cheat-features'],
  ['how-to-buy-r6-hacks-2026', 'buy-rust-legends-cheats'],
  ['battleye-patch', 'eac-patch-day'],
  ['battleye-fix', 'eac-troubleshooting'],
  ['battleye-verify', 'eac-verify'],
];

const EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.txt',
  '.xml',
  '.svg',
  '.toml',
  '.md',
]);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(path.extname(name))) files.push(full);
  }
  return files;
}

function applyReplacements(content) {
  let out = content;
  for (const [from, to] of SLUG_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  for (const [from, to] of TEXT_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  // Remaining path segments
  out = out.replace(/\/blog\/r6-/g, '/blog/rust-');
  out = out.replace(/slug: "r6-/g, 'slug: "rust-');
  out = out.replace(/slug: 'r6-/g, "slug: 'rust-");
  out = out.replace(/cheatImageForSlug\('r6-/g, "cheatImageForSlug('rust-");
  out = out.replace(/cheatImageForSlug\("r6-/g, 'cheatImageForSlug("rust-');
  out = out.replace(/productRelatedBlogSlugs[\s\S]*?};/m, (block) =>
    block.replace(/'r6-/g, "'rust-").replace(/"r6-/g, '"rust-'),
  );
  return out;
}

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  if (file.includes('migrate-rust-content.mjs')) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyReplacements(before);
  if (after !== before) {
    fs.writeFileSync(file, after, 'utf8');
    changed++;
  }
}

console.log(`Updated ${changed} files.`);

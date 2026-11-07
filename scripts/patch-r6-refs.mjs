import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const reps = [
  ["checkoutPath('r6')", "checkoutPath('rust')"],
  ['checkoutPath("r6")', 'checkoutPath("rust")'],
  [/\bR6 product catalog\b/g, 'Rust product catalog'],
  [/\bR6 products hub\b/g, 'Rust products hub'],
  [/\bR6 setup guides\b/g, 'Rust setup guides'],
  [/\bR6 community forum\b/g, 'Rust community forum'],
  [/\bR6 catalog\b/g, 'Rust catalog'],
  [/\bR6 blog guides\b/g, 'Rust blog guides'],
  [/\bR6 shop\b/g, 'Rust cheats shop'],
  [/\bR6 practice guides\b/g, 'Rust combat test server guides'],
  [/\bR6 tier\b/g, 'Rust tier'],
  [/\bR6 trainer\b/g, 'Rust cheat'],
  [/\bR6 modules\b/g, 'Rust cheat modules'],
  [/\bR6 features\b/g, 'Rust cheat features'],
  [/\bR6 product hub\b/g, 'Rust product hub'],
  [/\bR6 multiplayer\b/g, 'Rust multiplayer'],
  [/\br6 aimbot\b/g, 'rust aimbot'],
  [/\br6 ESP\b/g, 'rust ESP'],
  [/\br6 item ESP\b/g, 'apex item ESP'],
  [/\br6 no recoil\b/g, 'apex recoil control'],
  [/\br6 compatibility\b/g, 'apex compatibility'],
  [/\br6 multiplayer\b/g, 'apex multiplayer'],
  ['Competitive Siege focus', 'Competitive Rust focus'],
  ['operator tools', 'Legend tools'],
  ['onProductsR6Hub', 'onProductsApexHub'],
  ["return segment || 'r6'", "return segment || 'rust'"],
  ['const r6SystemRequirements', 'const apexSystemRequirements'],
  ['systemRequirements: r6SystemRequirements', 'systemRequirements: apexSystemRequirements'],
  ['Buy R6 PC', 'Buy Rust PC'],
  ['FAQ – R6 tiers', 'FAQ – Rust tiers'],
  ['help on r6hacks', 'help on cheatsrust.net'],
  ['ZADEYO_R6_', 'ZADEYO_APEX_'],
  ['zadeyoR6ProductSeo', 'zadeyoRustProductSeo'],
  ['r6HacksLanding', 'rustCheatsLanding'],
  ['cheatsrust.net R6 product catalog', 'cheatsrust.net Rust product catalog'],
  ['go-r6-', 'go-rust-'],
  ['id={`go-r6-', 'id={`go-rust-'],
];

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|astro|mjs|txt|toml)$/.test(name)) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.includes('patch-r6-refs.mjs') || file.includes('migrate-apex')) continue;
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) {
    text = typeof from === 'string' ? text.split(from).join(to) : text.replace(from, to);
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    changed++;
  }
}
console.log(`Patched ${changed} files.`);

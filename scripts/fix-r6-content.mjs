/**
 * Post-rebrand cleanup: R6-specific terminology in src/
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'src');

const REPLACEMENTS = [
  ['Rust or EAC update', 'Rust or Easy Anti-Cheat update'],
  ['Rust or EAC updates', 'Rust or Easy Anti-Cheat updates'],
  ['Rust or EAC', 'Rust or Easy Anti-Cheat'],
  ['after EAC patches', 'after Easy Anti-Cheat patches'],
  ['EAC patches', 'Easy Anti-Cheat patches'],
  ['EAC update', 'Easy Anti-Cheat update'],
  ['EAC updates', 'Easy Anti-Cheat updates'],
  ['EAC ban', 'Easy Anti-Cheat ban'],
  ['EAC bans', 'Easy Anti-Cheat bans'],
  ['EAC penalties', 'Easy Anti-Cheat penalties'],
  ['EAC issues', 'Easy Anti-Cheat issues'],
  ['EAC Unable to Verify Rust', 'Easy Anti-Cheat connection issues on Rust'],
  ['eac verification', 'Easy Anti-Cheat verification'],
  ['eac fix', 'Easy Anti-Cheat fix'],
  ['EAC patch day', 'Easy Anti-Cheat patch day'],
  ['EAC bypass', 'Easy Anti-Cheat compatibility'],
  ['eac-bypass-r6-guide', 'eac-troubleshooting'],
  ['eac-patch-day-checklist', 'eac-patch-day'],
  ['Hajin DMZ', 'combat test server'],
  ['6v6', 'Ranked'],
  ['Ground War', 'Unranked'],
  ['Gunfight', 'Quick Match'],
  ['DMZ loot', 'Item ESP'],
  ['Hajin DMZ loot', 'Item ESP'],
  ['armor plates', 'operator health'],
  ['armor', 'health'],
  ['Steam client', 'Steam'],
  ['launch Modern Warfare 4 on Steam', 'launch Rust through Steam'],
  ['Modern Warfare 4 on Steam', 'Rust on PC'],
  ['Steam accounts', 'EA accounts'],
  ['Steam account', 'EA account'],
  ['Loadout Changer', 'loadout preview tools'],
  ['Ricochet', 'Easy Anti-Cheat'],
  ['ZADEYO_MW4_PRODUCT_SEO', 'ZADEYO_RUST_PRODUCT_SEO'],
  ['mw4SystemRequirements', 'r6SystemRequirements'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|astro|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(root)) {
  let text = fs.readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== text) {
    fs.writeFileSync(file, next);
    changed++;
    console.log(path.relative(process.cwd(), file));
  }
}
console.log(`Updated ${changed} files.`);

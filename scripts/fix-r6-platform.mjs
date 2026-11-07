import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'src');
const REPLACEMENTS = [
  ['Rust and EAC receive', 'Rust and Easy Anti-Cheat receive'],
  ['Easy Anti-Hack or Rust', 'Easy Anti-Cheat or Rust'],
  ['Easy Anti-Hack', 'Easy Anti-Cheat'],
  ['Easy Anti-Hack', 'Easy Anti-Cheat'],
  ['EAC patch-day', 'Easy Anti-Cheat patch-day'],
  ['After EAC Ban', 'After Easy Anti-Cheat ban'],
  ['EAC and report', 'Easy Anti-Cheat and report'],
  ['EAC does not', 'Easy Anti-Cheat does not'],
  ['EAC risk', 'Easy Anti-Cheat risk'],
  ['account-only EAC', 'account-only Easy Anti-Cheat'],
  ['EAC cases', 'Easy Anti-Cheat cases'],
  ['EAC bans', 'Easy Anti-Cheat bans'],
  ['EAC ban', 'Easy Anti-Cheat ban'],
  ['EAC Unable to verify', 'Easy Anti-Cheat connection issues on'],
  ['EAC cannot verify', 'Easy Anti-Cheat cannot verify'],
  ['if EAC cannot', 'if Easy Anti-Cheat cannot'],
  ['from the loader or Steam', 'from the loader or Steam'],
  ['launch Rust on Steam', 'launch Rust through Steam'],
  ['Rust on Steam', 'Rust on PC'],
  ['for Steam players', 'for PC players'],
  ['on Steam PC', 'on PC'],
  ['Steam PC', 'PC'],
  ['Steam platform', 'PC platform'],
  ['Gearbox, 2K and Steam', 'EA'],
  ['Steam locker', 'in-game inventory'],
  ['Steam inventory', 'in-game inventory'],
  ['Steam review', 'EA review'],
  ['Steam restrictions', 'EA account restrictions'],
  ['Steam ban appeals', 'EA ban appeals'],
  ['Steam game file verification', 'Steam file verification'],
  ['through Steam', 'through Steam'],
  ['normal Steam launch', 'normal Steam launch'],
  ['into the Steam folder', 'into the game folder'],
  ['Loot-shooter action on Steam', 'Tactical shooter action on PC'],
  ['Mw4 Hacks', 'Rust Cheats'],
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (/\.(ts|astro)$/.test(e.name)) out.push(f);
  }
  return out;
}

let n = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const [a, b] of REPLACEMENTS) after = after.split(a).join(b);
  if (after !== before) {
    fs.writeFileSync(file, after);
    n++;
  }
}
console.log(`Platform cleanup: ${n} files.`);

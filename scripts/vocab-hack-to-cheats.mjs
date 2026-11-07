/**
 * Replace user-facing "hack/hacks/wallhack" with cheat/cheats/wall ESP.
 * Skips slug/path segments that contain hyphens (e.g. rust-esp-setup).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const DIRS = [path.join(root, 'src'), path.join(root, 'public')];
const EXTS = new Set(['.ts', '.astro', '.mjs', '.json', '.txt', '.webmanifest', '.md']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

/** wallhack not inside hyphenated slug segments */
function replaceWallhack(text) {
  return text.replace(/(?<![\w-])wallhack(?![\w-])/gi, (m) =>
    m[0] === 'W' || m[0] === 'w' && m === 'Wallhack' ? 'Wall ESP' : m[0] === 'W' ? 'Wall ESP' : 'wall ESP',
  );
}

function applyCopy(text) {
  let next = replaceWallhack(text);
  next = next.replace(/\bHacks\b/g, 'Cheats');
  next = next.replace(/\bhacks\b/g, 'cheats');
  next = next.replace(/\bHack\b/g, 'Cheat');
  next = next.replace(/\bhack\b/g, 'cheat');
  next = next.replace(/\banti-cheat action\b/g, 'anti-cheat action');
  next = next.replace(/\bcheats cheats\b/gi, 'cheats');
  next = next.replace(/\bcheat cheat\b/gi, 'cheat');
  return next;
}

const skipFiles = new Set([
  path.join(root, 'scripts', 'vocab-hack-to-cheats.mjs'),
  path.join(root, 'scripts', 'rebrand-bodycam.mjs'),
  path.join(root, 'scripts', 'rebrand-fortnite.mjs'),
  path.join(root, 'scripts', 'rebrand-mw4.mjs'),
  path.join(root, 'src', 'components', 'icons', 'types.ts'),
  path.join(root, 'src', 'components', 'icons', 'registry.ts'),
  path.join(root, 'src', 'config', 'slug-redirects.mjs'),
  path.join(root, 'src', 'utils', 'path.ts'),
  path.join(root, 'astro.config.mjs'),
  path.join(root, 'public', '_redirects'),
  path.join(root, 'src', 'data', 'sectionIcons.ts'),
]);

let changed = 0;
for (const file of walk(root)) {
  if (!DIRS.some((d) => file.startsWith(d))) continue;
  if (skipFiles.has(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = applyCopy(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Updated ${changed} files.`);

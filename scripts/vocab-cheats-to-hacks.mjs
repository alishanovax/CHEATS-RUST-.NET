/**
 * User-facing copy: cheats/cheat → hacks (keeps URL slugs and code identifiers).
 * Run: node scripts/vocab-cheats-to-hacks.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const DIRS = [path.join(root, 'src'), path.join(root, 'public')];
const EXTS = new Set(['.ts', '.astro', '.mjs', '.json', '.txt', '.webmanifest', '.md', '.css']);

const SKIP_FILES = new Set([
  path.join(root, 'scripts', 'vocab-hack-to-cheats.mjs'),
  path.join(root, 'scripts', 'vocab-cheats-to-hacks.mjs'),
  path.join(root, 'scripts', 'rebrand-mw4.mjs'),
  path.join(root, 'scripts', 'rebrand-borderlands.mjs'),
]);

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

const PLACEHOLDERS = [];

function protect(text, pattern, label) {
  return text.replace(pattern, (m) => {
    const token = `__PH_${label}_${PLACEHOLDERS.length}__`;
    PLACEHOLDERS.push({ token, value: m });
    return token;
  });
}

function applyCopy(text) {
  PLACEHOLDERS.length = 0;
  let next = text;

  // Paths, slugs, identifiers (keep literal)
  next = protect(next, /\/products\/rust-cheats\b/g, 'path');
  next = protect(next, /rust-cheats(?=[-/'"`])/g, 'slug');
  next = protect(next, /cheatImageForSlug/g, 'fn');
  next = protect(next, /r6CheatsLanding/g, 'id');
  next = protect(next, /\bbrowseCheats\b/g, 'key');
  next = protect(next, /\b(cheats|hacks):\s*\{/g, 'i18nsection');
  next = protect(next, /\bt\.(cheats|hacks)\b/g, 'tcheats');
  next = protect(next, /CheatsSection/g, 'comp');
  next = protect(next, /navCheats|faqBlogVsCheats|faqPrivateCheats/g, 'icon');
  next = protect(next, /cheatMetaDescription/g, 'fn2');
  next = protect(next, /SITE_CHEAT_IMAGES|SiteCheatImage|cheatImageAltForSrc|cheatImageForSlug/g, 'img');
  next = protect(next, /https:\/\/[^\s'"]+supabase[^\s'"]+/g, 'supabaseurl');
  next = protect(next, /\/blog\/[\w-]*cheat[\w-]*/g, 'blogpath');
  next = protect(next, /slug:\s*"[^"]*cheat[^"]*"/g, 'slugattr');
  next = protect(next, /id="cheats"/g, 'htmlid');

  // Vocabulary (longest first)
  next = next.replace(/\bCheats\b/g, 'Hacks');
  next = next.replace(/\bcheats\b/g, 'hacks');
  next = next.replace(/\bCheat\b/g, 'Hack');
  next = next.replace(/\bcheat\b/g, 'hack');

  // User asked for "hacks" not singular "hack" on branding
  next = next.replace(/\bRust Cheats\b/g, 'Rust Cheats');
  next = next.replace(/\bBuy hack\b/gi, 'Buy hacks');
  next = next.replace(/\bBuy Hack\b/g, 'Buy Hacks');

  for (const { token, value } of PLACEHOLDERS) {
    next = next.split(token).join(value);
  }

  return next;
}

const files = walk(root).filter((f) => !SKIP_FILES.has(f) && DIRS.some((d) => f.startsWith(d)));
let changed = 0;
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  const after = applyCopy(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}
console.log(`Done. Updated ${changed} files.`);

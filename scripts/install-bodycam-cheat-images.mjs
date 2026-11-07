/**
 * Install the four approved Rust hack screenshots into public/images/.
 * Run: node scripts/install-r6-hack-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const ASSET_DIRS = [
  path.join(
    process.env.USERPROFILE ?? '',
    '.cursor',
    'projects',
    'c-Users-JUMBO-COMPUTERS-Desktop-r6hacks-org',
    'assets',
  ),
  path.join(root, 'assets'),
];

function findAsset(namePart) {
  for (const dir of ASSET_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const match = fs.readdirSync(dir).find((f) => f.includes(namePart));
    if (match) return path.join(dir, match);
  }
  return null;
}

const TARGETS = [
  { id: 'image-f47b9287', out: 'r6-hack-aimbot-esp.png' },
  { id: 'image-8c08f8ce', out: 'r6-hack-esp-wallhack.png' },
  { id: 'image-af852abe', out: 'r6-hack-gameplay.jpg' },
  { id: 'image-77a0ce29', out: 'r6-hack-esp-indoor.png' },
];

const imagesRoot = path.join(root, 'public', 'images');
fs.mkdirSync(imagesRoot, { recursive: true });

for (const sub of ['gameplay', 'blog']) {
  const subDir = path.join(imagesRoot, sub);
  if (fs.existsSync(subDir)) {
    fs.rmSync(subDir, { recursive: true, force: true });
    console.log('Removed', subDir);
  }
}

for (const entry of fs.readdirSync(imagesRoot)) {
  const full = path.join(imagesRoot, entry);
  if (!fs.statSync(full).isFile()) continue;
  fs.unlinkSync(full);
}

for (const { id, out } of TARGETS) {
  const src = findAsset(id);
  if (!src) {
    console.error('Missing source asset for', id);
    process.exit(1);
  }
  fs.copyFileSync(src, path.join(imagesRoot, out));
  console.log('Installed', out);
}

console.log('Done — public/images contains only the four hack screenshots.');

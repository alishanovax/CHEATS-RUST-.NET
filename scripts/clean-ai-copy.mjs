import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/utils/schema.ts',
  'src/utils/rss.ts',
  'src/data/faq.ts',
  'src/data/blog/posts.ts',
  'src/i18n/en.ts',
  'src/config/site.ts',
];

const reps = [
  ['R6Hacks Editorial', 'Rust Cheats'],
  ['R6Hacks Community Forum', 'Rust Cheats Forum'],
  ['R6Hacks Blog', 'Rust Cheats Blog'],
  ['R6Hacks Support', 'Rust Cheats Support'],
  ['Join R6Hacks on Discord', 'Join Rust Cheats on Discord'],
  ['R6Hacks home', 'Rust Cheats home'],
  ['R6Hacks', 'Rust Cheats'],
  ["TITLE_PREFIX = 'Rust Cheats & Tools'", "TITLE_PREFIX = 'Rust Cheats'"],
  ['humanized Aimbot', 'smooth aimbot'],
  ['humanized order', 'smooth order'],
  ['humanized input', 'smooth input'],
  ['humanized', 'smooth'],
  [
    'Climbing ranked play with rust aimbot means smooth aimbot—not instant bot bursts that draw reports.',
    'Ranked Rust aimbot works better with smooth tracking than instant snaps that get you reported.',
  ],
  [
    'maintains private Rust cheats for Windows PC Multiplayer and Ranked—not console lobby codes. Every module ships through the customer portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Rust cheats for Windows PC Multiplayer and Ranked. Check status before you queue after a patch.',
  ],
  [
    'maintains private Rust cheats for Windows PC Multiplayer and Ranked. Every module ships through the customer portal with secure checkout, Discord support, and live status banners before patch-day queues.',
    'sells Rust cheats for Windows PC Multiplayer and Ranked. Check status before you queue after a patch.',
  ],
  [
    'maintains private Rust cheats for Windows PC Multiplayer and Ranked. Check live status before every patch-day queue.',
    'sells Rust cheats for Windows PC Multiplayer and Ranked. Check status before you queue after a patch.',
  ],
  [
    'maintains private Rust cheats for Windows PC Multiplayer and Ranked.',
    'sells Rust cheats for Windows PC Multiplayer and Ranked.',
  ],
  [
    'ships a modular external suite for Windows PC ranked—not lobby hack codes. Aimbot tracks targets, loot assist clears POIs, ESP wallhack exposes third-parties, and utility tools like Radar Hack and Loadout Changer round out the toolkit. This is the complete feature map across',
    'sells external Rust cheats for PC Ranked. Aimbot, loot assist, ESP wallhack, radar and Loadout Changer. See',
  ],
];

for (const rel of files) {
  const file = path.join(root, rel);
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [from, to] of reps) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text);
    console.log('updated', rel);
  } else {
    console.log('noop', rel);
  }
}

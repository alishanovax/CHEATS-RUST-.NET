/**
 * Second-pass vocabulary cleanup: Dota/Steam/VAC leftovers → Rust.
 * Run: node scripts/vocab-mw4.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
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
]);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.seo-baseline']);
const SKIP_FILES = new Set(['rebrand-mw4.mjs', 'vocab-mw4.mjs']);

const REPLACEMENTS = [
  ['via Steam on Windows', 'via Steam Games Launcher on Windows'],
  ['via Steam', 'via Steam Games'],
  ['on Steam PC', 'on PC'],
  ['Steam PC', 'Windows PC'],
  ['Steam account', 'Steam account'],
  ['Steam inventory', 'Steam locker'],
  ['Steam platform', 'Steam Games platform'],
  ['Steam overlay', 'Steam overlay'],
  ['Steam restrictions', 'Steam account restrictions'],
  ['Steam Rust', 'Rust on Epic'],
  ['through Steam', 'through Steam Games'],
  ['exiting Steam', 'exiting the Steam Games Launcher'],
  ['Current Rust client via Steam', 'Current Rust client via Steam Games Launcher'],
  ['right-click Rust → Properties', 'open Rust settings in the Steam Games Launcher'],
  ['reqSteam', 'reqEpic'],
  ['compatSteam', 'compatEpic'],
  [' Steam ', ' Steam Games '],
  ['Steam,', 'Steam Games,'],
  ['Steam.', 'Steam Games.'],
  ['Steam)', 'Steam Games)'],
  ['(Steam', '(Steam Games'],

  ['Valve Terms of Use', 'Steam Terms of Service'],
  ['Valve-approved', 'Epic-approved'],
  ['Valve-sanctioned', 'Epic-sanctioned'],
  ['Valve practice', 'Private Servers practice'],
  ['Valve review', 'Steam review'],
  ['Valve lobby', 'Private Servers lobby'],
  [' Valve ', ' Steam '],
  ['Valve,', 'Epic,'],
  ['Valve.', 'Epic.'],

  [' after VAC', ' after EAC'],
  [' game, VAC,', ' game, EAC,'],
  ['VAC-aware', 'EAC-aware'],
  ['VAC enforcement', 'EAC enforcement'],
  [' VAC ', ' EAC '],
  ['(VAC)', '(EAC)'],

  ['ranked MMR', 'ranked play'],
  ['live MMR', 'live ranked'],
  ['high-MMR', 'high-rank'],
  ['climbing MMR', 'climbing rank'],
  ['in MMR', 'in ranked'],
  ['MMR games', 'ranked games'],
  ['MMR.', 'rank.'],
  [' MMR ', ' rank '],

  ['ranked and Turbo', 'Multiplayer and Ranked'],
  ['Ranked, Turbo', 'Multiplayer, Ranked'],
  ['Turbo or bot lobbies', 'Private Servers or Ranked lobbies'],
  ['Turbo lobby', 'Ranked lobby'],
  ['Turbo preset', 'Ranked preset'],
  ['Turbo-friendly', 'Ranked-friendly'],
  ['and Turbo', 'and Ranked'],
  ['or Turbo', 'or Ranked'],
  [' Turbo', ' Ranked'],
  ['Turbo ', 'Ranked '],

  ['map hack and zoom hack', 'ESP wallhack and radar hack'],
  ['scripts, map hack, and zoom hack', 'aimbot, ESP wallhack, and radar hack'],
  ['scripts, map hack, zoom hack', 'aimbot, ESP, and radar hack'],
  ['scripts, map hack and loadout changer', 'aimbot, ESP and loadout changer'],
  ['map hack, zoom hack', 'ESP, radar hack'],
  ['map hack and', 'ESP wallhack and'],
  ['full map hack', 'full ESP wallhack'],
  ['Map hack and hero ESP', 'ESP wallhack and player ESP'],
  ['map hack ESP', 'ESP wallhack'],
  ['map hack setup', 'ESP wallhack setup'],
  ['map hack', 'ESP wallhack'],
  ['Map hack', 'ESP wallhack'],
  ['Map Hack', 'ESP Wallhack'],
  ['zoom hack', 'radar hack'],
  ['Zoom hack', 'Radar hack'],
  ['Zoom Hack', 'Radar Hack'],

  ['Auto Combo', 'Aimbot'],
  ['auto combo', 'aimbot'],
  ['Auto Farm Bot', 'Loot Assist'],
  ['Auto Kill Steal', 'Auto Finish'],
  ['Auto Dagon', 'Auto Shield Break'],
  ['Orbwalker', 'Smooth Aim'],
  ['Smart Cast', 'Sticky Aim'],
  ['Target Selector', 'Bone Priority'],
  ['Activator for BKB, Hex and Orchid', 'hotkey macros for heals and mobility'],
  ['Activator (BKB/Hex/Orchid)', 'Hotkey macros (heals/shields)'],
  ['Activator', 'Hotkey macros'],
  ['Delay Setting', 'Smoothness sliders'],

  ['Invoker, Lion, PA and burst cores', 'ARs, SMGs, snipers and shotguns'],
  ['Invoker, Lion, PA', 'ARs, SMGs, and snipers'],
  ['Invoker Tornado → EMP → Meteor chain', 'AR spray with sticky aim and bone priority'],
  ['Invoker invoke', 'weapon swap'],
  ['Invoker', 'assault rifle'],
  ['Timbersaw combo', 'shotgun push'],
  ['burst heroes', 'close-range loadouts'],
  ['mids on burst', 'aggressive players on'],
  ['per-hero', 'per-weapon'],
  ['Per-hero', 'Per-weapon'],
  ['hero configs', 'weapon configs'],
  ['hero ESP', 'player ESP'],
  ['Hero ESP', 'Player ESP'],
  ['enemy hero', 'enemy player'],
  ['enemy heroes', 'enemy players'],
  ['hero positions', 'player positions'],
  ['hero boxes', 'player boxes'],
  ['Hero boxes', 'Player boxes'],
  ['hero arcanas', 'outfit skins'],
  ['hero,', 'player,'],
  [' heroes', ' players'],
  [' Heroes', ' Players'],
  [' hero ', ' player '],
  [' Hero ', ' Player '],

  ['ward and sentry locator', 'chest and reboot-van locator'],
  ['ward and sentry markers', 'chest and reboot markers'],
  ['ward and rune', 'chest and loot'],
  ['ward, rune', 'chest, loot'],
  ['ward placements', 'chest locations'],
  ['ward locations', 'chest locations'],
  ['ward lines', 'sight lines'],
  ['ward spots', 'high-ground spots'],
  ['ward study', 'cover study'],
  ['ward ESP', 'weapon ESP'],
  ['ward information', 'chest information'],
  ['placed wards', 'placed markers'],
  ['observer and sentry ward', 'chest and reboot'],
  ['hiding wards', 'holding cover'],
  ['-killwards', 'clear markers'],
  ['wards,', 'chests,'],
  [' wards', ' chests'],
  [' ward ', ' chest '],
  ['Ward ', 'Chest '],

  ['rune timers', 'loot timers'],
  ['rune spawn timers', 'loot spawn timers'],
  ['rune information', 'loot information'],
  ['rune timings', 'loot timings'],
  ['power runes', 'rare loot'],
  ['power rune', 'rare loot'],
  ['bounty and power', 'chest and rare'],
  ['Bounty and power', 'Chest and rare'],
  ['runes and', 'loot and'],
  [' runes', ' loot'],
  [' rune', ' loot'],
  ['Rune ', 'Loot '],

  ['arcanas and immortals', 'skins and wraps'],
  ['arcana and immortal', 'skin and wrap'],
  ['Arcana & immortal', 'Skin & wrap'],
  ['arcanas,', 'skins,'],
  ['immortals and exclusive sets', 'wraps and exclusive sets'],
  ['previewed arcanas', 'previewed skins'],
  ['arcana cosmetic', 'skin cosmetic'],
  ['Local arcana', 'Local skin'],

  ['net worth', 'loadout value'],
  ['jungle cam', 'POI cam'],
  ['jungle routes', 'POI routes'],
  ['Jungle camp', 'POI'],
  ['jungle pathing', 'POI pathing'],
  ['teamfights', 'squad fights'],
  ['dive your lane', 'third-party your fight'],
  ['last-hit precision in lane', 'precision in build fights'],
  ['Lane Control AI', 'Rotation Assist AI'],
  ['Lane last-hit', 'Close-range finish'],
  ['under tower', 'under pressure'],
  ['ganks and map control', 'third-parties and rotations'],
  ['See Ganks Before They Hit', 'See Third Parties Before They Hit'],
  ['Minimap & Runes', 'Radar & Loot'],
  ['minimap hack', 'radar overlay'],
  ['Minimap', 'Radar'],
  ['minimap', 'radar'],
  ['wave timing', 'zone timing'],
  ['Fog of war', 'Storm circle'],
  ['fog of war', 'storm circle'],

  ['Rust Scripts, Map Hack & ESP', 'Rust Aimbot, ESP & Wallhack'],
  ['humanized scripts', 'humanized aimbot'],
  ['script automation', 'aimbot automation'],
  ['script delays', 'aimbot smoothness'],
  ['script engine', 'aimbot engine'],
  ['hero scripts', 'weapon aim profiles'],
  ['Scripts,', 'Aimbot,'],
  [' scripts', ' aimbot'],
  ['Scripts ', 'Aimbot '],
  [' scripts.', ' aimbot.'],

  ['npc_mw4_hero_invoker', 'training_bot'],
  ['-createhero', '-spawnbot'],
  ['item_orchid', 'item_shield'],
  ['Orchid Malevolence', 'Shield Potion'],
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(root)) {
  if (SKIP_FILES.has(path.basename(file))) continue;
  if (!TEXT_EXTS.has(path.extname(file).toLowerCase())) continue;
  const before = fs.readFileSync(file, 'utf8');
  let next = before;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== before) {
    fs.writeFileSync(file, next);
    changed++;
    console.log('updated', path.relative(root, file));
  }
}
console.log(`Vocab pass done. Updated ${changed} files.`);

/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
  /** Optional on-page H1 override (SEO-only routes). */
  h1?: string;
  /** Optional second H1 line (homepage hero accent). */
  h1Accent?: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Rust Cheats — PC aimbot, ESP & setup guides',
    description:
      'Compare Rust PC cheat tiers, read setup guides, and check out secure options — aimbot, player ESP, configs and support at cheatsrust.net.',
    h1: 'Rust Cheats',
  },
  '/products/rust/': {
    title: 'Rust PC cheats — Lite, Pro, Elite & utilities',
    description:
      'Shop Rust PC cheats: Lite ESP, Pro aimbot, Elite suite, HWID tools and UGC — compare features and checkout at cheatsrust.net.',
    h1: 'Rust PC cheats — compare tiers and utilities',
  },
  '/products/rust/lite/': {
    title: 'Rust Lite Cheats | Player ESP, Radar & Loot Timers',
    description:
      'Rust Lite cheats for PC — player ESP, chest markers, loot timers and radar without aimbot. Stream-proof overlay and ranked presets on cheatsrust.net.',
  },
  '/products/rust/pro/': {
    title: 'Rust Pro Cheats | Aimbot, Smooth Aim & Wall ESP',
    description:
      'Rust Pro cheats include Lite ESP plus Aimbot, Smooth Aim, Sticky Aim and bone priority — ranked-safe defaults and portal presets for Rust on PC.',
  },
  '/products/rust/elite/': {
    title: 'Elite Rust Cheats | Aimbot, ESP & Loot Assist',
    description:
      'Elite tier includes advanced aim, full ESP, loot assist, Legend-focused tools and priority update notes for Rust on PC.',
  },
  '/products/rust/hwid-spoofer/': {
    title: 'HWID Spoofer for Rust | Hardware Identity Tools',
    description:
      'HWID tools for Rust on PC — guided steps for hardware identity resets. Read compatibility and risk notes before you buy at cheatsrust.net.',
  },
  '/products/rust/ugc/': {
    title: 'UGC Tools | Rust Easy Anti-Cheat & account appeals',
    description:
      'UGC (Unban & Governance Control) organizes Easy Anti-Cheat and account restriction appeals, dispute workflows and case tracking for Rust players.',
  },
  '/products/rust/unlock-all/': {
    title: 'loadout preview tools — skins, wraps & weapon previews',
    description:
      'Loadout Pack for Rust on PC — local cosmetic and weapon previews with your client. Compare scope and checkout at cheatsrust.net.',
  },
  '/products/rust/utilities/': {
    title: 'Rust cheat utilities — HWID, UGC & loadout tools',
    description:
      'Utilities hub: HWID tools, EAC appeal workflows (UGC), and optional helper tools for Rust PC — compare before checkout.',
    h1: 'Compare Rust utilities — HWID, UGC & loadout preview tools',
  },
  '/blog/': {
    title: 'Rust guides — aimbot, ESP, tiers & patch days',
    description:
      'Guides for Rust PC cheats: aimbot and ESP setup, Lite vs Pro, combat test server drills, and what to check after patches and anti-cheat updates.',
    h1: 'Rust cheat guides — setup, tiers and patch checks',
  },
  '/forum/': {
    title: 'Rust forum — loader, configs & product discussion',
    description:
      'Community threads on loader setup, aim configs, product questions and patch-day checks — backed by guides on cheatsrust.net.',
    h1: 'Forum — loader help, configs and Rust cheat discussion',
  },
  '/faq/': {
    title: 'FAQ — Rust tiers, bans, loader & checkout | cheatsrust',
    description:
      'FAQ on Lite, Pro and Elite tiers, aimbot, wall ESP, radar, HWID spoofer, loadout preview tools, bans and loader setup at cheatsrust.net.',
    h1: 'FAQ — Rust Cheats tiers, bans, Easy Anti-Cheat setup, loader help and checkout',
  },
  '/terms/': {
    title: 'Terms — licenses, delivery, refunds & account risk',
    description:
      'Terms for buying digital Rust software on cheatsrust.net: license use, delivery, refunds, and risks when using third-party tools with Facepunch titles.',
    h1: 'Terms — licenses, delivery, refunds & account risk',
  },
  '/privacy/': {
    title: 'Privacy — analytics, cookies & checkout data',
    description:
      'How cheatsrust.net uses analytics, cookies, and contact or checkout-related data for support and referrals. Read the full policy before you buy.',
    h1: 'Privacy — analytics, cookies, checkout and contact data',
  },
  '/about/': {
    title: 'About — Rust tier guides, loader help & updates',
    description:
      'Who we are: Rust PC cheat tier comparisons, setup guides, and support channels at cheatsrust.net — independent of Facepunch and publishers.',
    h1: 'About — Rust tier guides, loader help & updates',
  },
  '/support/': {
    title: 'Support — loader, HWID & checkout help | cheatsrust',
    description:
      'Get help with the loader, aim and ESP configs, HWID resets, and checkout — Discord and FAQ linked from cheatsrust.net.',
    h1: 'Support — loader, HWID, checkout & config help',
  },
  '/rust-cheats/': {
    title: 'Rust cheats hub — PC tiers, features & checkout',
    description:
      'Overview of Rust PC cheat tiers, core features, and loader-focused notes. Compare options and checkout at cheatsrust.net.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}

/** Blog post `<title>` / meta description overrides (exact audit phrases). */
export const BLOG_POST_SEO: Record<string, Partial<PageSeoEntry>> = {
  'rust-radar': {
    title: 'Rust radar guide — FOV, spacing & team callouts',
    description:
      'Use radar overlays safely in Rust: FOV habits, spacing, and squad callouts for vanilla servers and ranked — guide at cheatsrust.net.',
  },
  'rust-stream-proof': {
    title: 'Stream-safe overlays — hiding ESP from OBS & capture',
    description:
      'Test OBS, Game Bar, and capture-card setups so stream viewers do not see overlays — practical checklist for Rust creators on cheatsrust.net.',
  },
  'rust-aimbot-ranked': {
    title: 'Ranked aimbot — bone priority, prediction & smoothness',
  },
  'eac-troubleshooting': {
    title: 'EAC errors on Rust PC — verify, repair & recovery',
    description:
      'When Easy Anti-Cheat fails to verify Rust on PC: file checks, repairs, reinstall paths, and when account recovery applies — guide at cheatsrust.net.',
  },
};

/** Optional on-page H1 overrides (blog posts). */
export const BLOG_POST_PAGE_H1: Record<string, string> = {
  'eac-troubleshooting':
    'What the Easy Anti-Cheat error means — EAC unable to verify Rust (Rust cheats)',
  'rust-stream-proof':
    'Stream-Proof Overlay Setup — hide wall ESP and script overlays from OBS (Rust cheats)',
  'rust-firing-range-practice': 'combat test server Practice: Aim Drills Before Ranked (Rust cheats)',
  'rust-radar': 'Rust radar on PC — FOV habits, spacing and team callouts',
};

export function getBlogPostSeo(slug: string, fallback: PageSeoEntry): PageSeoEntry {
  const override = BLOG_POST_SEO[slug];
  if (!override) return fallback;
  return {
    title: override.title ?? fallback.title,
    description: override.description ?? fallback.description,
  };
}

export function blogPostPageH1(slug: string, postTitle: string): string {
  return BLOG_POST_PAGE_H1[slug] ?? postTitle;
}

/** Layout `<title>` for blog posts; ranked override is used verbatim when under 60 chars. */
export function blogPostLayoutTitle(slug: string, postTitle: string, brand = 'Rust Cheats'): string {
  const override = BLOG_POST_SEO[slug]?.title;
  if (override && override.length <= 60) return override;
  if (override) return `${override.slice(0, 57).trim()}…`;
  const suffix = ` | ${brand}`;
  const max = 60;
  if (`${postTitle}${suffix}`.length <= max) return `${postTitle}${suffix}`;
  const trimmed = postTitle.slice(0, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}

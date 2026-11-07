/**
 * SSR copy for /go/rust/ — mirror for Zadeyo /products/rust-legends SEO.
 * Apply the same fields in Zadeyo admin (this repo does not deploy zadeyo.com).
 */
export const ZADEYO_RUST_CHECKOUT_URL =
  'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frust';

export const ZADEYO_RUST_PRODUCT_SEO = {
  title: 'Rust Cheats – Monthly and long-term PC access',
  description:
    'Rust PC cheats with player ESP, aimbot, radar, and recoil control. Compare tiers on cheatsrust.net, then checkout on ZADEYO when status is online.',
  h1: 'Rust Cheats — ESP, aimbot, wall ESP & ranked presets',
  h2ProductDetails: 'Product details',
  h2Features: 'Features',
  h2SystemRequirements: 'System requirements',
  h2Checkout: 'Checkout and delivery',
  h2Plans: 'Monthly vs long-term plans',
  h2Loader: 'Loader, configs, and updates',
  h2Safety: 'Status checks before you queue',
  logoAlt: 'Rust cheats — ZADEYO checkout logo',
  intro:
    'PC tools with player ESP, precision aimbot, and recoil control. Compare tiers on cheatsrust.net, then continue to ZADEYO when the status banner shows online.',
  sections: [
    {
      heading: 'Aim and combat modules',
      level: 'h3' as const,
      paragraphs: [
        'Smooth aim inside a configurable FOV circle with visibility checks, triggerbot options, and recoil control for AR and SMG profiles.',
      ],
    },
    {
      heading: 'ESP and loot awareness',
      level: 'h3' as const,
      paragraphs: [
        'Player ESP, skeleton and box overlays, snaplines, loot ESP, and save/load config profiles for vanilla and modded servers.',
      ],
    },
  ],
  bodySections: [
    {
      id: 'checkout',
      headingKey: 'h2Checkout' as const,
      paragraphs: [
        'Payment and license delivery run on ZADEYO after you choose a plan. You receive digital loader access and setup guidance—no physical shipment.',
        'Use cheatsrust.net for tier tables, Easy Anti-Cheat patch notes, and pre-purchase FAQ before you launch Rust on PC.',
      ],
    },
    {
      id: 'plans',
      headingKey: 'h2Plans' as const,
      paragraphs: [
        'Monthly billing follows a 31-day cycle with the same module list as the long-term option. It fits shorter trials while you tune aimbot smoothness and ESP range in unranked playlists.',
        'The long-term option keeps one portal license without monthly renewals. Confirm live pricing and module lists on the ZADEYO checkout screen before you pay.',
      ],
    },
    {
      id: 'loader',
      headingKey: 'h2Loader' as const,
      paragraphs: [
        'The customer portal hosts the current Windows loader, default configs, and save/load profiles for vanilla and modded servers.',
        'After an Rust or Easy Anti-Cheat update, reload the loader from the portal and read the homepage status banner before ranked queue.',
      ],
    },
    {
      id: 'safety',
      headingKey: 'h2Safety' as const,
      paragraphs: [
        'Third-party tools carry ban risk. Start with conservative FOV, smooth aim, and limited ESP distance until sessions feel stable.',
        'Check Discord #status and the cheatsrust.net banner on patch days. Do not queue ranked while modules show offline or misaligned.',
      ],
    },
  ],
  screenshotAlts: [
    'Rust ESP overlay screenshot 1',
    'Rust aimbot FOV screenshot 2',
    'Rust loot ESP screenshot 3',
  ],
} as const;

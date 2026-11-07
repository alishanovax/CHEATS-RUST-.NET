/** Approved Rust media — only these assets are used site-wide. */
export interface SiteCheatImage {
  src: string;
  alt: string;
}

const RUST_MEDIA = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/rust/05c202fe-8171-4881-bc3a-b25833919850/1793532837815-xxneux-rustt1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/rust/05c202fe-8171-4881-bc3a-b25833919850/1793532986972-zc457p-rustt2.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/rust/05c202fe-8171-4881-bc3a-b25833919850/1793532999959-4ekf07-rustt3.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/rust/f8fb1df6-697d-4d9b-b239-91326d061bf8/1793450555245-r9zohg-tang-i-got-paid-to-play-rust-with-the-best-rust-cheats-cqsoamt-688-1091x614-10m1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/rust/f8fb1df6-697d-4d9b-b239-91326d061bf8/1793450525388-uv4trc-one-stop-cheats-how-a-cheater-duo-dominated-rust-with-the-best-rust-cheat-m5lsi-.webp',
] as const;

export const SITE_CHEAT_IMAGES: SiteCheatImage[] = [
  {
    src: RUST_MEDIA[0],
    alt: 'Rust PC survival gameplay scene with player engagement on a server',
  },
  {
    src: RUST_MEDIA[1],
    alt: 'Rust multiplayer combat with structures and open-world terrain on PC',
  },
  {
    src: RUST_MEDIA[2],
    alt: 'Rust on PC — outdoor environment and player perspective during a raid',
  },
  {
    src: RUST_MEDIA[3],
    alt: 'Rust cheats product discussion screenshot — verify features on the ZADEYO listing',
  },
  {
    src: RUST_MEDIA[4],
    alt: 'Rust cheats overview image — compare modules before checkout on cheatsrust.net',
  },
];

/** Product detail screenshot carousel (three slides). */
export const PRODUCT_GALLERY_IMAGES: SiteCheatImage[] = [
  SITE_CHEAT_IMAGES[0]!,
  SITE_CHEAT_IMAGES[1]!,
  SITE_CHEAT_IMAGES[2]!,
];

export const PRIMARY_CHEAT_IMAGE = SITE_CHEAT_IMAGES[0].src;

export function cheatImageForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % SITE_CHEAT_IMAGES.length;
  }
  return SITE_CHEAT_IMAGES[hash]!.src;
}

export function cheatImageAltForSrc(src: string): string {
  return SITE_CHEAT_IMAGES.find((img) => img.src === src)?.alt ?? SITE_CHEAT_IMAGES[0]!.alt;
}

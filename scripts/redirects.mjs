import { SLUG_REDIRECTS } from '../src/config/slug-redirects.mjs';

/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/rust/'],
  ['/cheats/', '/products/rust/'],
  ['/cheats/lite', '/products/rust/lite/'],
  ['/cheats/lite/', '/products/rust/lite/'],
  ['/cheats/pro', '/products/rust/pro/'],
  ['/cheats/pro/', '/products/rust/pro/'],
  ['/cheats/elite', '/products/rust/elite/'],
  ['/cheats/elite/', '/products/rust/elite/'],
  ['/cheats/compare', '/blog/rust-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/rust-lite-vs-pro/'],
  ['/hacks', '/products/rust/'],
  ['/hacks/', '/products/rust/'],
  ['/hacks/lite', '/products/rust/lite/'],
  ['/hacks/lite/', '/products/rust/lite/'],
  ['/hacks/pro', '/products/rust/pro/'],
  ['/hacks/pro/', '/products/rust/pro/'],
  ['/hacks/elite', '/products/rust/elite/'],
  ['/hacks/elite/', '/products/rust/elite/'],
  ['/hacks/compare', '/blog/rust-lite-vs-pro/'],
  ['/hacks/compare/', '/blog/rust-lite-vs-pro/'],
  ['/products/rust/utilities', '/products/rust/utilities/'],
  ['/products/rust-cheats', '/products/rust/'],
  ['/products/rust-cheats/', '/products/rust/'],
  ['/products/rust-cheats/lite', '/products/rust/lite/'],
  ['/products/rust-cheats/lite/', '/products/rust/lite/'],
  ['/products/rust-cheats/pro', '/products/rust/pro/'],
  ['/products/rust-cheats/pro/', '/products/rust/pro/'],
  ['/products/rust-cheats/elite', '/products/rust/elite/'],
  ['/products/rust-cheats/elite/', '/products/rust/elite/'],
  ['/products/rust-cheats/hwid-spoofer', '/products/rust/hwid-spoofer/'],
  ['/products/rust-cheats/hwid-spoofer/', '/products/rust/hwid-spoofer/'],
  ['/products/rust-cheats/ugc', '/products/rust/ugc/'],
  ['/products/rust-cheats/ugc/', '/products/rust/ugc/'],
  ['/products/rust-cheats/unlock-all', '/products/rust/unlock-all/'],
  ['/products/rust-cheats/unlock-all/', '/products/rust/unlock-all/'],
  ['/products/rust-cheats/utilities', '/products/rust/utilities/'],
  ['/products/rust-cheats/utilities/', '/products/rust/utilities/'],
  ['/products/rust-hacks', '/products/rust/'],
  ['/products/rust/', '/products/rust/'],
  ['/products/rust/pro', '/products/rust/pro/'],
  ['/products/rust/pro/', '/products/rust/pro/'],
  ['/products/rust/lite', '/products/rust/lite/'],
  ['/products/rust/lite/', '/products/rust/lite/'],
  ['/products/rust/elite', '/products/rust/elite/'],
  ['/products/rust/elite/', '/products/rust/elite/'],
  ['/products/rust/account-recovery', '/products/rust/ugc/'],
  ['/products/rust/account-recovery/', '/products/rust/ugc/'],
  ['/products/dota-2-hacks', '/products/rust/'],
  ['/products/dota-2-hacks/', '/products/rust/'],
  ['/products/dota-2-hacks/elite', '/products/rust/elite/'],
  ['/products/dota-2-hacks/elite/', '/products/rust/elite/'],
  ['/products/dota-2-hacks/utilities', '/products/rust/utilities/'],
  ['/products/dota-2-hacks/utilities/', '/products/rust/utilities/'],
  ...Object.entries(SLUG_REDIRECTS),
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}

import { PRODUCT_BASE } from '../config/site';

/** Normalize internal paths to match trailingSlash: 'always' and canonical URLs. */
export function withTrailingSlash(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const [pathname, hash = ''] = path.split('#');
  const normalized = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${normalized}#${hash}` : normalized;
}

/** Former /cheats/* and /hacks/* URLs → current routes (301 targets match astro.config + scripts/redirects.mjs). */
export const LEGACY_PATH_MAP: Record<string, string> = {
  '/cheats': PRODUCT_BASE,
  '/cheats/': PRODUCT_BASE,
  '/cheats/lite': `${PRODUCT_BASE}lite/`,
  '/cheats/lite/': `${PRODUCT_BASE}lite/`,
  '/cheats/pro': `${PRODUCT_BASE}pro/`,
  '/cheats/pro/': `${PRODUCT_BASE}pro/`,
  '/cheats/elite': `${PRODUCT_BASE}elite/`,
  '/cheats/elite/': `${PRODUCT_BASE}elite/`,
  '/r6-cheats': '/rust-cheats/',
  '/r6-cheats/': '/rust-cheats/',
  '/r6-hacks': '/rust-cheats/',
  '/r6-hacks/': '/rust-cheats/',
  '/rust-cheats': '/rust-cheats/',
  '/rust-cheats/': '/rust-cheats/',
  '/products/r6': PRODUCT_BASE,
  '/products/r6/': PRODUCT_BASE,
  '/products/r6/lite': `${PRODUCT_BASE}lite/`,
  '/products/r6/lite/': `${PRODUCT_BASE}lite/`,
  '/products/r6/pro': `${PRODUCT_BASE}pro/`,
  '/products/r6/pro/': `${PRODUCT_BASE}pro/`,
  '/products/r6/elite': `${PRODUCT_BASE}elite/`,
  '/products/r6/elite/': `${PRODUCT_BASE}elite/`,
  '/products/rust-cheats': PRODUCT_BASE,
  '/products/rust-cheats/': PRODUCT_BASE,
  '/products/rust-cheats/lite': `${PRODUCT_BASE}lite/`,
  '/products/rust-cheats/lite/': `${PRODUCT_BASE}lite/`,
  '/products/rust-cheats/pro': `${PRODUCT_BASE}pro/`,
  '/products/rust-cheats/pro/': `${PRODUCT_BASE}pro/`,
  '/products/rust-cheats/elite': `${PRODUCT_BASE}elite/`,
  '/products/rust-cheats/elite/': `${PRODUCT_BASE}elite/`,
  '/products/rust-hacks': PRODUCT_BASE,
  '/products/rust/': PRODUCT_BASE,
  '/products/rust/pro': `${PRODUCT_BASE}pro/`,
  '/products/rust/pro/': `${PRODUCT_BASE}pro/`,
  '/hacks': PRODUCT_BASE,
  '/hacks/': PRODUCT_BASE,
  '/hacks/lite': PRODUCT_BASE,
  '/hacks/lite/': PRODUCT_BASE,
  '/hacks/pro': PRODUCT_BASE,
  '/hacks/pro/': PRODUCT_BASE,
  '/hacks/elite': `${PRODUCT_BASE}elite/`,
  '/hacks/elite/': `${PRODUCT_BASE}elite/`,
  '/hacks/compare': '/blog/rust-lite-vs-pro/',
  '/hacks/compare/': '/blog/rust-lite-vs-pro/',
  '/contact': '/support/',
  '/contact/': '/support/',
};

export function normalizeInternalPath(href: string): string {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('/go/')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const rawPath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';

  let pathname = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  pathname = LEGACY_PATH_MAP[pathname] ?? pathname;

  return withTrailingSlash(pathname) + hash;
}

export const ROUTES = {
  home: '/',
  blog: '/blog/',
  forum: '/forum/',
  products: PRODUCT_BASE,
  productsElite: `${PRODUCT_BASE}elite/`,
  productsUtilities: `${PRODUCT_BASE}utilities/`,
  faq: '/faq/',
  terms: '/terms/',
  about: '/about/',
  support: '/support/',
  privacy: '/privacy/',
} as const;

export function blogPostPath(slug: string): string {
  return `/blog/${slug}/`;
}

/** @deprecated Use productPath — cheat tier pages live under products. */
export function cheatPath(slug: string): string {
  return productPath(slug);
}

export function productPath(slug: string): string {
  return `${PRODUCT_BASE}${slug}/`;
}

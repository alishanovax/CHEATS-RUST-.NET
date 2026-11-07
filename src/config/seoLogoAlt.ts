import { normalizeSeoPath } from './pageSeo';

/** Footer logo alt text matched to each route’s audit keyword (exact phrases). */
const LOGO_ALT_BY_PATH: Record<string, string> = {
  '/products/rust/': 'Rust – Rust Cheats shop logo',
  '/about/': 'Aimbot Esp – logo',
  '/blog/': 'Rust guides – logo',
  '/faq/': 'Faq – logo',
  '/forum/': 'Forum – logo',
  '/privacy/': 'Privacy – logo',
  '/support/': 'Support – logo',
  '/terms/': 'Terms – logo',
  '/products/rust/utilities/': 'Utilities – Rust Cheats logo',
  '/rust-cheats/': 'Rust Cheats logo',
};

export function footerLogoAltForPath(pathname: string): string {
  const path = normalizeSeoPath(pathname);
  return LOGO_ALT_BY_PATH[path] ?? 'Rust Cheats logo';
}

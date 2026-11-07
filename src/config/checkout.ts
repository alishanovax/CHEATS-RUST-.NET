import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets only (never use as visible href).
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  rust: 'rust',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** All Buy now / checkout CTAs use the same Zadeyo go link. */
export function checkoutPath(_product: CheckoutProduct = 'rust'): string {
  return CHECKOUT.rust;
}

/** Default product checkout redirect (replaces legacy Discord CTAs). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('rust');

/** Map internal product slugs to checkout (single Zadeyo destination). */
export function checkoutForSlug(_slug: string): string {
  return CHECKOUT.rust;
}

/** Resolve blog CTA or legacy href values to internal checkout paths. */
const GO_CHECKOUT_PATH = /^\/go\/[\w-]+\/?$/i;

export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    const normalized = href.startsWith('/') ? href : `/${href}`;
    if (GO_CHECKOUT_PATH.test(normalized)) {
      return CHECKOUT.rust;
    }
    return normalized;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  if (href.includes('%2Fproducts%2Fcloud-dma') || href.includes('/products/cloud-dma')) {
    return checkoutPath('rust');
  }
  if (href.includes('%2Fproducts%2Fskin-changer') || href.includes('/products/skin-changer')) {
    return checkoutPath('skinChanger');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }
  if (
    href.includes('zadeyo.com/go/') ||
    href.includes('%2Frust-legends-cheats') ||
    href.includes('/rust-cheats') ||
    href.includes('%2Fproducts%2Frust') ||
    href.includes('/products/rust-legends') ||
    href.includes('%2Fproducts%2Frainbow-six-siege') ||
    href.includes('/products/rainbow-six-siege') ||
    href.includes('/products/mw4')
  ) {
    return checkoutPath('rust');
  }

  return href;
}

import fs from 'node:fs';
import path from 'node:path';

function walkHtml(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(full, out);
    else if (ent.name === 'index.html') out.push(full);
  }
  return out;
}

const root = path.resolve('dist');
const sitemap = fs.readFileSync(path.join(root, 'sitemap-all.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const locDup = locs.filter((l, i) => locs.indexOf(l) !== i);
const badHost = locs.filter((l) => !l.startsWith('https://cheatsrust.net/'));

const files = walkHtml(root).filter((f) => !f.includes(`${path.sep}404`));

const indexable = [];
const issues = [];

function normUrl(u) {
  return u.endsWith('/') ? u : `${u}/`;
}

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const robots = html.match(/name="robots" content="([^"]+)"/)?.[1] ?? '';
  const noindex = robots.includes('noindex');
  const inSitemap = (() => {
    const rel = f.replace(/^dist/, '').replace(/index\.html$/, '').replace(/\\/g, '/');
    const url = normUrl(`https://cheatsrust.net${rel === '/' ? '/' : rel}`);
    return locs.includes(url);
  })();

  const can = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const rel = f.replace(/^dist/, '').replace(/index\.html$/, '').replace(/\\/g, '/');
  const expected = normUrl(`https://cheatsrust.net${rel === '/' ? '/' : rel}`);

  if (!noindex) {
    indexable.push(f);
    if (!can) issues.push({ type: 'missing-canonical', f });
    else if (normUrl(can) !== expected) issues.push({ type: 'canonical-mismatch', f, can, expected });
    if (!title) issues.push({ type: 'missing-title', f });
  }

  if (inSitemap && noindex) issues.push({ type: 'sitemap-but-noindex', f });
}

const titles = {};
for (const f of indexable) {
  const html = fs.readFileSync(f, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (title) titles[title] = (titles[title] ?? 0) + 1;
}
const dupTitles = Object.entries(titles).filter(([, c]) => c > 1);

const zadeyo = walkHtml(root);
let wrongCheckout = 0;
const want = 'https://zadeyo.com/go/ALISHA?to=%2Fproducts%2Frust';
for (const f of zadeyo) {
  const html = fs.readFileSync(f, 'utf8');
  if (html.includes('zadeyo.com/go/') && !html.includes(want) && html.includes('Buy')) {
    wrongCheckout++;
    if (wrongCheckout < 3) issues.push({ type: 'checkout-url', f });
  }
}

console.log(
  JSON.stringify(
    {
      build: 'ok',
      sitemapUrls: locs.length,
      sitemapDuplicateLocs: locDup.length,
      sitemapBadHost: badHost.length,
      htmlIndexableApprox: indexable.length,
      duplicateTitles: dupTitles.length,
      issuesSample: issues.slice(0, 15),
      issueCount: issues.length,
      wrongCheckoutHints: wrongCheckout,
    },
    null,
    2,
  ),
);

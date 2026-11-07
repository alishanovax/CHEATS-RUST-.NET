import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { SLUG_REDIRECTS } from './src/config/slug-redirects.mjs';

export default defineConfig({
  site: 'https://cheatsrust.net',
  trailingSlash: 'always',
  server: {
    host: true,
    port: 4322,
  },
  redirects: {
    '/products/borderlands-cheats/': '/products/rust/',
    '/products/borderlands-cheats/elite/': '/products/rust/elite/',
    '/products/borderlands-cheats/utilities/': '/products/rust/utilities/',
    '/products/borderlands-hacks/': '/products/rust/',
    '/products/borderlands-hacks/elite/': '/products/rust/elite/',
    '/products/borderlands-hacks/utilities/': '/products/rust/utilities/',
    '/borderlands-cheats/': '/rust-cheats/',
    '/borderlands-hacks/': '/rust-cheats/',
    '/products/mw4-cheats/': '/products/rust/',
    '/products/mw4-cheats/elite/': '/products/rust/elite/',
    '/products/mw4-cheats/utilities/': '/products/rust/utilities/',
    '/products/mw4-hacks/': '/products/rust/',
    '/products/mw4-hacks/elite/': '/products/rust/elite/',
    '/products/mw4-hacks/utilities/': '/products/rust/utilities/',
    '/mw4-cheats/': '/rust-cheats/',
    '/mw4-hacks/': '/rust-cheats/',
    '/go/mw4/': '/go/rust/',
    '/go/borderlands/': '/go/rust/',
    '/go/bodycam/': '/go/rust/',
    '/go/fortnite/': '/go/rust/',
    '/cheats/': '/products/rust/',
    '/cheats/lite/': '/products/rust/lite/',
    '/cheats/pro/': '/products/rust/pro/',
    '/cheats/elite/': '/products/rust/elite/',
    '/cheats/compare/': '/blog/rust-lite-vs-pro/',
    '/hacks/': '/products/rust/',
    '/hacks/lite/': '/products/rust/lite/',
    '/hacks/pro/': '/products/rust/pro/',
    '/hacks/elite/': '/products/rust/elite/',
    '/hacks/compare/': '/blog/rust-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/rust/',
    '/products/dota-2-cheats/elite/': '/products/rust/elite/',
    '/products/dota-2-cheats/utilities/': '/products/rust/utilities/',
    '/products/dota-2-hacks/': '/products/rust/',
    '/products/dota-2-hacks/elite/': '/products/rust/elite/',
    '/products/dota-2-hacks/utilities/': '/products/rust/utilities/',
    '/products/fortnite-cheats/': '/products/rust/',
    '/products/fortnite-cheats/elite/': '/products/rust/elite/',
    '/products/fortnite-cheats/utilities/': '/products/rust/utilities/',
    '/products/fortnite-hacks/': '/products/rust/',
    '/products/fortnite-hacks/elite/': '/products/rust/elite/',
    '/products/fortnite-hacks/utilities/': '/products/rust/utilities/',
    '/contact/': '/support/',
    ...SLUG_REDIRECTS,
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});

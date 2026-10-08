import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rushdanrosdi.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) => !new URL(page).pathname.startsWith('/tools/gsc-monitor/'),
  })],
});

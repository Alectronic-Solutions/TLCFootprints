import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'tlc-favicon',
      transformIndexHtml(html) {
        if (html.includes('rel="icon"')) return [];
        return [{
          tag: 'link',
          attrs: { rel: 'icon', href: 'favicon.svg', type: 'image/svg+xml' },
          injectTo: 'head'
        }];
      }
    }
  ],
  // GitHub Pages serves this project from /TLCFootprints/ rather than the domain root.
  base: '/TLCFootprints/',
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        index: 'index.html',
        about: 'about.html',
        programs: 'programs.html',
        faq: 'faq.html',
        contact: 'contact.html',
        enrollment: 'enrollment.html',
        safety: 'safety.html',
        resources: 'resources.html',
        privacy: 'privacy.html',
        terms: 'terms.html'
      }
    }
  }
});

import { defineConfig } from 'vite';

export default defineConfig({
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
        enrollment: 'enrollment.html'
      }
    }
  }
});

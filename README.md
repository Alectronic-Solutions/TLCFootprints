# T.L.C. Footprints Home Daycare

A fast, static marketing site built with Vite and vanilla HTML, CSS, and JavaScript.

## Local development

```bash
npm install
npm run dev
```

Vite will show a local URL, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

GitHub Actions runs the production build and deploys the generated `dist/` folder to GitHub Pages on every push to `main`.

## Adding tours or calendar booking later

Keep the site static until a real booking requirement exists. When it does, add a hosted scheduler such as Calendly or Square Appointments to the tour flow, or connect the existing contact form to a form endpoint. That preserves the site’s speed and avoids maintaining a custom calendar before it is needed.

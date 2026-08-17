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

## Required before publishing

The site deliberately does not submit contact details until a secure form endpoint is configured. In `contact.html`, set the `data-endpoint` value on `#tour-form` to the HTTPS endpoint supplied by your form provider (for example, Formspree, Netlify Forms, or your own server). Test a real submission before making the site public.

Before launch, also replace or add:

- The provider's real contact method and preferred public location/service-area policy.
- California license number and any credentials you wish to publicize.
- Approved parent testimonials, with permission.
- Real photos of the provider and environment, with written permission for any identifiable children.
- A production domain, then add canonical URLs, a `sitemap.xml`, and the same name/phone/service area to the Google Business Profile.

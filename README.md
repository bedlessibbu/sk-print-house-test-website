# SK Print House

**Your Complete Printing Solution** — a premium, production-quality website for SK Print House, built with React, TypeScript, Vite and Tailwind CSS.

The site presents all 19 printing services, an honest portfolio of original print studies, the studio process, FAQs, contact and a multi-step quote request. It is design-led, fully responsive and built to be handed to a real business without invented facts.

---

## Quick start

```bash
cd D:\SK-PRINT-HOUSE-OPENCODE
npm install
npm run dev
```

Open **http://localhost:5173**.

The current development server is running at:

```text
http://localhost:5173
```

### Stop the running dev server

Stop whatever is listening on port 5173:

```powershell
Get-NetTCPConnection -LocalPort 5173 -State Listen |
  Select-Object -ExpandProperty OwningProcess -Unique |
  ForEach-Object { Stop-Process -Id $_ -Force }
```

You can also close the terminal window running the server, or press `Ctrl + C` in it.

To confirm the port is free afterwards:

```powershell
netstat -ano | findstr ":5173"
```

No `LISTENING` line means it has stopped.

### Restart

```powershell
cd D:\SK-PRINT-HOUSE-OPENCODE
npm run dev -- --port 5173 --host 127.0.0.1
```

If port 5173 is already in use, run:

```powershell
npm run dev -- --port 5174 --host 127.0.0.1
```

and open `http://localhost:5174`.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | TypeScript project check |
| `npm run lint` | ESLint |

---

## Stack

- React 19 + React Router 7
- TypeScript 5.9
- Vite 8
- Tailwind CSS 3.4
- Framer Motion
- Lucide React icons
- Self-hosted variable fonts: Fraunces (display) and Manrope (sans) via `@fontsource-variable`

---

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About the studio |
| `/services` | All 19 services, filterable; `?service=slug` opens a detail panel |
| `/portfolio` | Print studies with category filter and lightbox |
| `/process` | Six-step process and studio principles |
| `/testimonials` | Honest empty state and feedback form |
| `/faqs` | Category filter and accordion |
| `/contact` | Contact channels and enquiry form |
| `/quote` | Three-step quote request |
| `*` | Custom 404 |

---

## Business information

All business details live in **`src/config/business.ts`**:

- phone: `+91 96436 62299`
- CEO direct line: `+91 99998 28273`
- email: `sk.printhouse@gmail.com`
- WhatsApp: `+919643662299`
- tagline: `Your Complete Printing Solution`
- navigation, service options, form endpoint, site URL

Address, opening hours and experience claims were **not supplied**, so they are intentionally absent. The Contact page explains that these details are confirmed directly. Do not add invented details.

### Official logo

- `public/assets/logo.png` — copied byte-for-byte from the official logo. It is never modified.
- `public/assets/logo-mark.png` — a derived square crop of the SK mark used in the navigation.
- Favicons are generated from the official mark.

The logo artwork itself contains the original line “A COMPLETE PRINTING SOLUTION”. The live tagline typography across the site uses **“Your Complete Printing Solution”** as requested; the logo is left untouched.

---

## Forms and real delivery

The forms never pretend to submit. Behaviour depends on configuration:

### With a form endpoint (recommended)

Set in `.env`:

```env
VITE_FORM_ENDPOINT=https://formspree.io/f/your-id
VITE_FORM_ACCESS_KEY=optional-access-key
VITE_SITE_URL=https://your-domain.com
```

The form POSTs JSON to that endpoint. Works with Formspree, Web3Forms, Basin or any endpoint that accepts JSON. On success the user sees a real success notification; on failure they see an error and can retry.

### Without a form endpoint

The form opens WhatsApp with the enquiry pre-filled, and offers an email draft with the same details. The notification explicitly says nothing has been sent until the user presses send in WhatsApp. This is deliberate: no fake success messages.

### To receive enquiries by email without code

1. Create a Formspree or Web3Forms form.
2. Put the endpoint in `.env` as `VITE_FORM_ENDPOINT`.
3. Restart the dev server or rebuild.

No API keys are hard-coded in the repository.

---

## Content and honesty

- **Portfolio** items are labelled as original studio print studies, not client work. This avoids misrepresenting clients.
- **Testimonials** are not invented. The page carries a clear empty state and invites real feedback, which is only published with permission.
- **Process, FAQs and service specifications** are practical, general statements and are confirmed per project.
- No address, opening hours, years of experience, client counts or awards are invented.

---

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter metadata through `src/lib/seo.ts`.
- Organisation JSON-LD in `index.html`.
- `public/robots.txt`, `public/sitemap.xml` and `public/_redirects` for SPA hosting.
- Open Graph cover at `public/assets/og-cover.jpg` (generated by `scripts/make-og.mjs`).
- Replace `business.siteUrl` / `VITE_SITE_URL` with the real domain before launch.

---

## Accessibility

- Skip link to main content
- Semantic landmarks and heading order
- Visible focus rings
- Keyboard-operable menus, accordions, lightbox (arrow keys + Escape) and forms
- Form labels, `aria-invalid`, `aria-describedby` and inline errors
- Reduced-motion support
- Descriptive alt text and accessible SVG labels

---

## Project structure

```text
src/
  components/
    art/PrintArt.tsx        Original SVG print-specimen system
    forms/                  ContactForm, QuoteForm
    layout/                 Navbar, Footer, Layout, PageHeader, CtaBand, BackToTop, WhatsAppFloat, ScrollToTop
    ui/                     Button, Accordion, Lightbox, Toast, Reveal, TiltCard, Logo, Marquee, SectionHeading, icons
  config/business.ts        Single source of business information
  content/                  services, portfolio, process, FAQs, art types
  lib/                      seo, forms, validation, utils
  pages/                    Home, About, Services, Portfolio, Process, Testimonials, Faqs, Contact, Quote, NotFound
  App.tsx                   Router and providers
  main.tsx                  Entry, fonts and global CSS
public/
  assets/                   Official logo, derived mark, favicons, OG cover, 18 local WebP photos
```

---

## Build and preview

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

---

## Known limitations

- No backend, database or payment processing is included. The forms either POST to a configured endpoint or hand off to WhatsApp/email.
- The site URL defaults to the placeholder `https://skprinthouse.com`; replace it with the real domain.
- The official logo artwork contains the older line “A COMPLETE PRINTING SOLUTION”; it is intentionally not edited.
- Testimonials remain empty until real, permissioned feedback is collected.
- No physical address or opening hours are published because they were not supplied.
- The main JS bundle is around 589 kB minified (173 kB gzipped). Route-level code splitting can reduce it if needed.

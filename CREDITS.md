# Credits and asset notes

## Official brand asset

`public/assets/logo.png` is the official SK Print House logo, copied from the business's original file without modification. It is used as supplied.

`public/assets/logo-mark.png` is a derived crop of the same official mark, used at small sizes in the navigation. It does not alter the original.

Favicons (`favicon-32.png`, `favicon-64.png`, `apple-touch-icon.png`) were generated from the official mark.

The live tagline used throughout the website is **“Your Complete Printing Solution”**. The logo artwork itself contains the original line “A COMPLETE PRINTING SOLUTION”; the artwork is left untouched.

## Photography

Photography in `public/assets/photos/` was downloaded from [Unsplash](https://unsplash.com) and is bundled locally as optimised WebP files. No images are hotlinked at runtime.

The Unsplash License allows free use, including commercial use, without required attribution. This credit is provided as good practice. If the project is launched commercially, review each image and replace any that are not appropriate for the final brand direction.

## Typefaces

- **Fraunces Variable** — Undercase Type, via `@fontsource-variable/fraunces`, SIL Open Font License.
- **Manrope Variable** — Mikhail Sharanda, via `@fontsource-variable/manrope`, SIL Open Font License.

Fonts are self-hosted and bundled by Vite.

## Original artwork

All print specimens rendered by `src/components/art/PrintArt.tsx` are original SVG compositions created for this website. They are not photographs of client work and are labelled as studio print studies in the interface.

## Icons

Interface icons are from [Lucide](https://lucide.dev), ISC License. The WhatsApp glyph in `WhatsAppIcon.tsx` is a simple brand mark used to identify the messaging channel.

## Open Graph cover

`public/assets/og-cover.jpg` was generated from the official logo, the site palette and typography using `scripts/make-og.mjs`.

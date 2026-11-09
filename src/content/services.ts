import type { ArtSpec } from './art'

export type ServiceCategory = 'print' | 'brand' | 'signage' | 'merch' | 'personal'

export interface Service extends ArtSpec {
  slug: string
  name: string
  category: ServiceCategory
  summary: string
  description: string
  details: string[]
  specs: string
  featured?: boolean
}

export const serviceCategories = [
  { id: 'all', label: 'All services' },
  { id: 'print', label: 'Print & Paper' },
  { id: 'brand', label: 'Brand & Business' },
  { id: 'signage', label: 'Signage & Large Format' },
  { id: 'merch', label: 'Merchandise & Gifts' },
  { id: 'personal', label: 'Personal & Celebration' },
] as const

export const services: Service[] = [
  {
    slug: 'digital-printing',
    name: 'Digital printing',
    category: 'print',
    summary: 'Short runs, sharp detail, no waiting for a press setup.',
    description:
      'Ideal for short runs, variable data and last-minute deadlines, digital printing puts crisp colour on paper without the setup of a traditional press. We colour-manage every file and proof the details before the first sheet runs.',
    details: ['Short and medium runs', 'Full-colour and variable data', 'Uncoated, coated and textured stocks'],
    specs: 'A6–A3+ · 90–400 gsm · matte / gloss / silk',
    art: 'press',
    variant: 'ivory',
    featured: true,
  },
  {
    slug: 'offset-printing',
    name: 'Offset printing',
    category: 'print',
    summary: 'The classic standard for volume, depth and consistency.',
    description:
      'For larger runs where consistency and economy matter, offset printing delivers rich solids and fine detail across every sheet. We plan the stock, ink and finishing together so the final piece feels considered, not just printed.',
    details: ['Long runs and bulk orders', 'Pantone and process colour', 'Consistent colour across the run'],
    specs: 'Bulk quantities · Pantone · custom stocks',
    art: 'swatches',
    variant: 'navy',
  },
  {
    slug: 'visiting-cards',
    name: 'Visiting cards',
    category: 'brand',
    summary: 'A first impression you can feel between two fingers.',
    description:
      'A visiting card is a small object with a large job. We work with weight, texture and finish to make yours feel as considered as the brand it represents — from crisp minimal cards to richly layered pieces.',
    details: ['Single or double-sided', 'Rounded corners, spot UV, foil', 'Matching stationery available'],
    specs: '90 × 54 mm · 300–600 gsm · premium finishes',
    art: 'cards',
    variant: 'navy',
    featured: true,
  },
  {
    slug: 'wedding-invitations',
    name: 'Wedding invitations',
    category: 'personal',
    summary: 'Invitations worthy of the occasion they announce.',
    description:
      'From a single card to a complete wedding suite, we bring paper, typography and finishing together for an invitation that sets the tone before the day begins. Share your theme and we will help shape the details.',
    details: ['Invitation suites and inserts', 'Monograms and custom artwork', 'Textured, metallic and specialty papers'],
    specs: 'Custom sizes · envelope + insert sets · foil / emboss on request',
    art: 'invite',
    variant: 'ivory',
    featured: true,
  },
  {
    slug: 'flex-printing',
    name: 'Flex printing',
    category: 'signage',
    summary: 'Large, vivid and built for the outdoors.',
    description:
      'Flex printing turns a message into a surface — shop fronts, event backdrops, hoardings and site branding. We print at scale with weather-ready materials and finish edges for a clean, professional installation.',
    details: ['Indoor and outdoor use', 'Eyelets, hemming and mounting options', 'Single or multi-panel output'],
    specs: 'Custom sizes · star flex / vinyl · weather-resistant inks',
    art: 'billboard',
    variant: 'red',
  },
  {
    slug: 'banners',
    name: 'Banners',
    category: 'signage',
    summary: 'Presence, at any scale.',
    description:
      'Roll-up banners, standees, backdrops and hand-held displays, produced for clarity at a distance. We check legibility, resolution and finish so the banner works as hard as the event does.',
    details: ['Roll-up and standee formats', 'Event and retail displays', 'Artwork scaling and preflight'],
    specs: 'Standard and custom formats · 510 gsm media · carry cases',
    art: 'billboard',
    variant: 'navy',
  },
  {
    slug: 'posters',
    name: 'Posters',
    category: 'signage',
    summary: 'Big type. Strong image. No noise.',
    description:
      'Posters ask for hierarchy and confidence. We print them on stocks that hold deep colour and fine detail, from promotional runs to gallery-quality pieces.',
    details: ['Promotional and campaign posters', 'Matte, gloss and uncoated stocks', 'Small and large formats'],
    specs: 'A3–A0 · 130–300 gsm · matte / gloss',
    art: 'poster',
    variant: 'red',
    featured: true,
  },
  {
    slug: 'brochures',
    name: 'Brochures',
    category: 'print',
    summary: 'The whole story, held in the hand.',
    description:
      'Brochures give a brand room to explain itself. We handle folding, binding and paper choice as one decision, so the piece opens well, reads well and lasts.',
    details: ['Bi-fold, tri-fold and multi-page', 'Saddle-stitch and perfect binding', 'Editorial layout support'],
    specs: 'A4 / A5 / DL · 130–300 gsm · folded or bound',
    art: 'brochure',
    variant: 'ivory',
  },
  {
    slug: 'flyers',
    name: 'Flyers',
    category: 'print',
    summary: 'A message that travels well.',
    description:
      'Single sheets with a job to do. We keep flyers sharp, legible and economical — ideal for launches, offers, events and local campaigns.',
    details: ['Single or double-sided', 'Short-run digital or bulk offset', 'Bold, legible artwork'],
    specs: 'A4 / A5 / A6 · 90–170 gsm · matte / gloss',
    art: 'flyer',
    variant: 'navy',
  },
  {
    slug: 'pamphlets',
    name: 'Pamphlets',
    category: 'print',
    summary: 'Simple, useful, effective.',
    description:
      'Pamphlets are the quiet workhorses of print — menus, guides, schedules and information sheets. We make them easy to read and easy to keep.',
    details: ['Folded or flat sheets', 'Menu and information formats', 'Bulk-friendly pricing'],
    specs: 'A4 / A5 / DL · folded options · uncoated or gloss',
    art: 'flyer',
    variant: 'ivory',
  },
  {
    slug: 'stickers',
    name: 'Stickers',
    category: 'brand',
    summary: 'Small details that stick.',
    description:
      'From product seals to packaging accents, stickers add a layer of finish that people notice. Choose the shape, material and cut that suit the surface and the life of the piece.',
    details: ['Die-cut and kiss-cut shapes', 'Paper, vinyl and transparent stocks', 'Sheets or individual pieces'],
    specs: 'Custom shapes · gloss / matte / clear · indoor & outdoor',
    art: 'sticker',
    variant: 'red',
  },
  {
    slug: 'labels',
    name: 'Labels',
    category: 'brand',
    summary: 'Identity, wrapped around a product.',
    description:
      'Labels carry a product’s voice onto the shelf. We print crisp type, rich colour and durable finishes for bottles, jars, boxes and sachets.',
    details: ['Product and packaging labels', 'Water-resistant options', 'Roll or sheet supply'],
    specs: 'Custom sizes · paper / vinyl / metallic · roll or sheet',
    art: 'label',
    variant: 'kraft',
  },
  {
    slug: 'packaging',
    name: 'Packaging',
    category: 'brand',
    summary: 'The moment before the reveal.',
    description:
      'Packaging is the first physical touchpoint of a brand. We produce boxes, sleeves, bags and wraps that protect the product and elevate the unboxing.',
    details: ['Boxes, sleeves and wraps', 'Structural and artwork guidance', 'Matte, gloss and specialty finishes'],
    specs: 'Custom structures · 200–450 gsm board · foil / spot UV',
    art: 'packaging',
    variant: 'kraft',
    featured: true,
  },
  {
    slug: 't-shirt-printing',
    name: 'T-shirt printing',
    category: 'merch',
    summary: 'Wearable, washable, memorable.',
    description:
      'Team uniforms, event merchandise and brand apparel, printed for comfort and durability. We advise on placement, size and ink so the design survives the wash and the wear.',
    details: ['Screen and digital apparel printing', 'Front, back and sleeve placement', 'Bulk team and event orders'],
    specs: 'Cotton / poly-cotton · S–3XL · custom artwork',
    art: 'apparel',
    variant: 'navy',
    featured: true,
  },
  {
    slug: 'mug-printing',
    name: 'Mug printing',
    category: 'merch',
    summary: 'A daily reminder of the brand.',
    description:
      'Photo mugs, corporate gifts and promotional drinkware, printed in full colour. A small, useful object that keeps a message close.',
    details: ['Full-colour wrap printing', 'Photo and logo mugs', 'Individual or bulk orders'],
    specs: 'Standard 325 ml · ceramic · dishwasher-safe print',
    art: 'mug',
    variant: 'ivory',
  },
  {
    slug: 'photo-printing',
    name: 'Photo printing',
    category: 'personal',
    summary: 'Images made tangible.',
    description:
      'Prints, enlargements and framed pieces for the moments worth keeping. We care about colour, crop and paper so the final print does justice to the original.',
    details: ['Photo prints and enlargements', 'Framed and mounted options', 'Colour correction on request'],
    specs: 'Standard to large formats · glossy / matte / lustre · frames',
    art: 'photo',
    variant: 'ivory',
  },
  {
    slug: 'corporate-printing',
    name: 'Corporate printing',
    category: 'brand',
    summary: 'One consistent brand, everywhere.',
    description:
      'Letterheads, envelopes, folders, ID cards, diaries and presentation materials — the everyday print that keeps a company coherent. We build the set together so everything belongs.',
    details: ['Stationery and presentation sets', 'Brand consistency across items', 'Recurring and bulk orders'],
    specs: 'Custom specifications · matching stocks · scheduled supply',
    art: 'corporate',
    variant: 'navy',
  },
  {
    slug: 'customised-gifts',
    name: 'Customised gifts',
    category: 'merch',
    summary: 'Thoughtful, personal, printed.',
    description:
      'Personalised gifts for clients, teams and celebrations — printed with names, messages or artwork. We help choose an object and a finish that feels considered.',
    details: ['Personalised corporate gifting', 'Names, messages and monograms', 'Curated gift sets'],
    specs: 'Mugs, bottles, diaries, boxes · custom personalisation · bulk',
    art: 'gift',
    variant: 'kraft',
  },
  {
    slug: 'large-format-printing',
    name: 'Large-format printing',
    category: 'signage',
    summary: 'When the message needs a wall.',
    description:
      'Wall graphics, window films, exhibition panels and building wraps, printed and finished for the surface they live on. We plan resolution, scale and installation details from the start.',
    details: ['Wall, window and floor graphics', 'Exhibition and event graphics', 'Installation-ready finishing'],
    specs: 'Custom sizes · vinyl / fabric / board · indoor & outdoor',
    art: 'billboard',
    variant: 'kraft',
    featured: true,
  },
]

export const featuredServices = services.filter((service) => service.featured)

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

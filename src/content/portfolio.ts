import type { ArtSpec } from './art'

export type PortfolioCategory =
  | 'Invitations'
  | 'Identity'
  | 'Packaging'
  | 'Editorial'
  | 'Signage'
  | 'Merchandise'

export interface PortfolioItem extends ArtSpec {
  id: string
  title: string
  category: PortfolioCategory
  format: string
  description: string
  size: 'tall' | 'wide' | 'normal'
  featured?: boolean
}

/**
 * These are original studio print studies made for this website — not
 * photographs of client work. The page labels them honestly as specimens.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'aurum',
    title: 'Aurum Suite',
    category: 'Invitations',
    format: 'Wedding invitation suite',
    description:
      'A warm ivory suite with a navy monogram, a single red seal and generous margins. Designed as a study in restraint.',
    size: 'tall',
    art: 'invite',
    variant: 'ivory',
    featured: true,
  },
  {
    id: 'nocturne',
    title: 'Nocturne',
    category: 'Identity',
    format: 'Visiting card set',
    description:
      'Deep navy cards with a red edge, a quiet monogram and type set small enough to reward a closer look.',
    size: 'normal',
    art: 'cards',
    variant: 'navy',
    featured: true,
  },
  {
    id: 'batch-04',
    title: 'Batch No. 04',
    category: 'Packaging',
    format: 'Label and carton study',
    description:
      'A kraft packaging system built around a single numeral, a thin rule and a label that does the talking.',
    size: 'tall',
    art: 'packaging',
    variant: 'kraft',
    featured: true,
  },
  {
    id: 'quiet-issue',
    title: 'The Quiet Issue',
    category: 'Editorial',
    format: 'Brochure / journal',
    description:
      'An editorial study in serif type, asymmetric columns and a red folio. Made to be opened slowly.',
    size: 'wide',
    art: 'brochure',
    variant: 'ivory',
  },
  {
    id: 'ink-study',
    title: 'Ink Study',
    category: 'Signage',
    format: 'Typographic poster series',
    description:
      'A bold poster study where oversized type and a single crimson block carry the whole composition.',
    size: 'tall',
    art: 'poster',
    variant: 'red',
    featured: true,
  },
  {
    id: 'maison',
    title: 'Maison',
    category: 'Editorial',
    format: 'Menu and table card',
    description:
      'A restaurant menu study with airy typography, a hairline frame and one small red accent.',
    size: 'normal',
    art: 'menu',
    variant: 'ivory',
  },
  {
    id: 'field-notes',
    title: 'Field Notes',
    category: 'Identity',
    format: 'Notebook and stationery',
    description:
      'Everyday stationery photographed as it should feel: uncoated paper, a good pen and space to think.',
    size: 'wide',
    art: 'notebook',
    variant: 'ivory',
  },
  {
    id: 'studio-tee',
    title: 'Studio Tee',
    category: 'Merchandise',
    format: 'Apparel print',
    description:
      'A study in one-colour apparel printing — a small mark, placed with intent on a heavyweight black tee.',
    size: 'tall',
    art: 'apparel',
    variant: 'navy',
    featured: true,
  },
  {
    id: 'first-light',
    title: 'First Light',
    category: 'Invitations',
    format: 'Letterpress-style card',
    description:
      'A deep navy invitation with reversed type, a fine border and the kind of weight that stays in the hand.',
    size: 'normal',
    art: 'invite',
    variant: 'navy',
  },
  {
    id: 'object-no-2',
    title: 'Object No. 2',
    category: 'Packaging',
    format: 'Label and bottle study',
    description:
      'A minimal label on an amber bottle, photographed in hard afternoon light. Small format, considered detail.',
    size: 'tall',
    art: 'label',
    variant: 'kraft',
  },
  {
    id: 'street-level',
    title: 'Street Level',
    category: 'Signage',
    format: 'Large-format panel',
    description:
      'A large-format study that treats the street as a gallery wall — one message, read at speed.',
    size: 'wide',
    art: 'billboard',
    variant: 'red',
  },
  {
    id: 'everyday-objects',
    title: 'Everyday Objects',
    category: 'Merchandise',
    format: 'Gift and mug set',
    description:
      'A gifting study built around simple objects, printed with a name and wrapped without fuss.',
    size: 'normal',
    art: 'gift',
    variant: 'kraft',
  },
]

export const portfolioCategories: Array<'All' | PortfolioCategory> = [
  'All',
  'Invitations',
  'Identity',
  'Packaging',
  'Editorial',
  'Signage',
  'Merchandise',
]

export const featuredPortfolio = portfolioItems.filter((item) => item.featured)

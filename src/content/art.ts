export type ArtKey =
  | 'press'
  | 'swatches'
  | 'cards'
  | 'invite'
  | 'poster'
  | 'brochure'
  | 'flyer'
  | 'sticker'
  | 'label'
  | 'packaging'
  | 'apparel'
  | 'mug'
  | 'photo'
  | 'corporate'
  | 'gift'
  | 'billboard'
  | 'menu'
  | 'notebook'

export type ArtVariant = 'ivory' | 'navy' | 'red' | 'kraft'

export interface ArtSpec {
  art: ArtKey
  variant?: ArtVariant
}

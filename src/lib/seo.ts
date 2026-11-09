import { useEffect } from 'react'
import { business } from '../config/business'

interface SeoOptions {
  title: string
  description: string
  path: string
  image?: string
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function useSeo({ title, description, path, image }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes('SK Print House') ? title : `${title} — SK Print House`
    const canonical = `${business.siteUrl}${path}`
    const socialImage = image ?? `${business.siteUrl}/assets/og-cover.jpg`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:image', socialImage)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', socialImage)
    upsertLink('canonical', canonical)
  }, [title, description, path, image])
}

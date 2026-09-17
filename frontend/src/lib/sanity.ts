import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const isSanityConfigured = Boolean(projectId)

const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2025-01-20',
  useCdn: process.env.NODE_ENV === 'production',
})

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    return await client.fetch<T>(query, params)
  } catch (err) {
    console.error('[Sanity] fetch error:', err)
    return null
  }
}

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

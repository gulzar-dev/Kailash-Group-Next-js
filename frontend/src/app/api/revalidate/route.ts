import {NextRequest, NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({error: 'Invalid secret'}, {status: 401})
  }

  try {
    const body = await request.json()
    const {type, slug} = body

    switch (type) {
      case 'company':
        if (slug) {
          revalidatePath(`/company/${slug}`)
        }
        revalidatePath('/')
        break
      case 'service':
      case 'award':
      case 'faqItem':
      case 'communityPartner':
      case 'timelineEntry':
      case 'linkedinPost':
      case 'hero':
      case 'aboutSection':
      case 'ecosystemSection':
      case 'servicesSection':
      case 'communitySection':
      case 'faqSection':
      case 'contactSection':
      case 'marqueeSection':
        revalidatePath('/')
        break
      case 'siteSettings':
      case 'navigation':
        revalidatePath('/')
        revalidatePath('/about')
        revalidatePath('/awards')
        break
      case 'seoMetadata':
        if (slug) {
          revalidatePath(slug)
        } else {
          revalidatePath('/')
        }
        break
      case 'legalDocument':
        if (slug) {
          revalidatePath(`/legal/${slug}`)
        }
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({revalidated: true, type, slug})
  } catch (error) {
    return NextResponse.json({error: 'Error revalidating'}, {status: 500})
  }
}

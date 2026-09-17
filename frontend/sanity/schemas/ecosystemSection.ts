import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ecosystemSection',
  title: 'Ecosystem Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Discover',
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
    }),
  ],
})

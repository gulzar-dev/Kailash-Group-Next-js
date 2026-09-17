import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading1',
      title: 'Heading 1',
      type: 'string',
      initialValue: 'Built on Expertise.',
    }),
    defineField({
      name: 'heading2',
      title: 'Heading 2',
      type: 'string',
      initialValue: 'Driven by Purpose.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'cta1Text',
      title: 'CTA 1 Text',
      type: 'string',
      initialValue: 'Explore Our Companies',
    }),
    defineField({
      name: 'cta1Link',
      title: 'CTA 1 Link',
      type: 'string',
      initialValue: '#companies',
    }),
    defineField({
      name: 'cta2Text',
      title: 'CTA 2 Text',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'cta2Link',
      title: 'CTA 2 Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
  ],
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Homepage', value: '/'},
          {title: 'About', value: '/about'},
          {title: 'Awards', value: '/awards'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'sectionId', title: 'Section ID', type: 'string'}),
            defineField({name: 'heading', title: 'Heading', type: 'string'}),
            defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
            defineField({name: 'ctaText', title: 'CTA Text', type: 'string'}),
            defineField({name: 'ctaLink', title: 'CTA Link', type: 'string'}),
          ],
        },
      ],
    }),
  ],
})

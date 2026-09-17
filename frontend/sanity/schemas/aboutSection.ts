import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section (Homepage)',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'number', title: 'Number', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'portraitAlt',
      title: 'Portrait Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'nameLabel',
      title: 'Name Label',
      type: 'string',
      initialValue: 'Amit Pall',
    }),
    defineField({
      name: 'titleLabel',
      title: 'Title Label',
      type: 'string',
      initialValue: 'Founder & Principal',
    }),
  ],
})

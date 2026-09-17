import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'marqueeSection',
  title: 'Marquee Section',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})

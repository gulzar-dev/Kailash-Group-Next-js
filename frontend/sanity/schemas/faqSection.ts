import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
  ],
})

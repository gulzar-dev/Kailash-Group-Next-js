import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesSection',
  title: 'Services Section',
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
  ],
})

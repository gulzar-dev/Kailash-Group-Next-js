import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'communitySection',
  title: 'Community Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
  ],
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'org',
      title: 'Organization',
      type: 'string',
    }),
    defineField({
      name: 'sentence',
      title: 'Sentence',
      type: 'text',
    }),
  ],
})

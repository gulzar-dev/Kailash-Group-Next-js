import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'timelineEntry',
  title: 'Timeline Entry',
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
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
})

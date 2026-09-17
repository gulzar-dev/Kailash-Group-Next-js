import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'communityPartner',
  title: 'Community Partner',
  type: 'document',
  fields: [
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
  ],
})

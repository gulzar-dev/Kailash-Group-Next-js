import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'linkedinPost',
  title: 'LinkedIn Post',
  type: 'document',
  fields: [
    defineField({
      name: 'postId',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'reactions',
      title: 'Reactions',
      type: 'number',
    }),
    defineField({
      name: 'permalink',
      title: 'Permalink',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      optional: true,
    }),
  ],
})

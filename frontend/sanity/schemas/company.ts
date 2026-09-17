import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      options: {
        slugify: (s: string) =>
          s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'short',
      title: 'Short Label',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'practice',
      title: 'Practice Areas',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'accent',
      title: 'Accent Color (hex)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text'}),
      ],
    }),
  ],
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seoMetadata',
  title: 'SEO Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Homepage', value: '/'},
          {title: 'About', value: '/about'},
          {title: 'Awards', value: '/awards'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
    }),
  ],
})

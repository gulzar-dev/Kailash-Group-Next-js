import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'llmsContent',
  title: 'LLMs.txt Content',
  type: 'document',
  fields: [
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
    }),
    defineField({
      name: 'founderText',
      title: 'Founder Text',
      type: 'text',
    }),
    defineField({
      name: 'companies',
      title: 'Companies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'what', title: 'What', type: 'text'}),
            defineField({
              name: 'services',
              title: 'Services',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({name: 'website', title: 'Website', type: 'url'}),
          ],
        },
      ],
    }),
  ],
})

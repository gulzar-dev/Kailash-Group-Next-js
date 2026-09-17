import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'label', title: 'Label', type: 'string'}),
          defineField({name: 'href', title: 'Link', type: 'string'}),
          defineField({name: 'isDropdown', title: 'Has Dropdown', type: 'boolean', initialValue: false}),
          defineField({
            name: 'children',
            title: 'Dropdown Items',
            type: 'array',
            of: [{type: 'object', fields: [
              defineField({name: 'label', title: 'Label', type: 'string'}),
              defineField({name: 'href', title: 'Link', type: 'string'}),
            ]}],
          }),
          defineField({name: 'sortOrder', title: 'Sort Order', type: 'number'}),
        ],
      }],
    }),
    defineField({name: 'ctaText', title: 'CTA Button Text', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA Button Link', type: 'string'}),
  ],
  preview: {
    prepare() { return {title: 'Navigation'} },
  },
})

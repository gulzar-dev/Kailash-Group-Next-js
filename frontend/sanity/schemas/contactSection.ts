import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'formLabels',
      title: 'Form Labels',
      type: 'object',
      fields: [
        defineField({name: 'nameLabel', title: 'Name Label', type: 'string'}),
        defineField({name: 'emailLabel', title: 'Email Label', type: 'string'}),
        defineField({name: 'phoneLabel', title: 'Phone Label', type: 'string'}),
        defineField({name: 'areaLabel', title: 'Area Label', type: 'string'}),
        defineField({name: 'messageLabel', title: 'Message Label', type: 'string'}),
      ],
    }),
    defineField({
      name: 'submitText',
      title: 'Submit Text',
      type: 'string',
      initialValue: 'Send Enquiry',
    }),
    defineField({
      name: 'loadingText',
      title: 'Loading Text',
      type: 'string',
      initialValue: 'Sending...',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
    }),
    defineField({
      name: 'contactCards',
      title: 'Contact Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'icon', title: 'Icon', type: 'string'}),
          ],
        },
      ],
    }),
  ],
})

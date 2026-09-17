import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'emailTemplate',
  title: 'Email Templates',
  type: 'document',
  fields: [
    defineField({
      name: 'enquiryNotification',
      title: 'Enquiry Notification',
      type: 'object',
      fields: [
        defineField({name: 'subject', title: 'Subject', type: 'string'}),
        defineField({name: 'header', title: 'Header', type: 'string'}),
        defineField({name: 'body', title: 'Body', type: 'text'}),
      ],
    }),
    defineField({
      name: 'enquiryConfirmation',
      title: 'Enquiry Confirmation',
      type: 'object',
      fields: [
        defineField({name: 'subject', title: 'Subject', type: 'string'}),
        defineField({name: 'header', title: 'Header', type: 'string'}),
        defineField({name: 'body', title: 'Body', type: 'text'}),
        defineField({name: 'footer', title: 'Footer', type: 'text'}),
      ],
    }),
    defineField({
      name: 'rateLimitMessage',
      title: 'Rate Limit Message',
      type: 'text',
    }),
    defineField({
      name: 'invalidRequestMessage',
      title: 'Invalid Request Message',
      type: 'text',
    }),
    defineField({
      name: 'invalidSubmissionMessage',
      title: 'Invalid Submission Message',
      type: 'text',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
    }),
  ],
})

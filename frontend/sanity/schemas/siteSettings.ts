import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Kailash Group'}),
    defineField({name: 'siteUrl', title: 'Site URL', type: 'url', initialValue: 'https://kailashgroup.com.au'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'phoneIntl', title: 'Phone (International)', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'address', title: 'Address (full)', type: 'text'}),
    defineField({
      name: 'addressParts',
      title: 'Address Parts',
      type: 'object',
      fields: [
        defineField({name: 'streetAddress', title: 'Street Address', type: 'string'}),
        defineField({name: 'addressLocality', title: 'City', type: 'string'}),
        defineField({name: 'addressRegion', title: 'State', type: 'string'}),
        defineField({name: 'postalCode', title: 'Postal Code', type: 'string'}),
        defineField({name: 'addressCountry', title: 'Country', type: 'string'}),
      ],
    }),
    defineField({name: 'mapUrl', title: 'Google Maps URL', type: 'url'}),
    defineField({name: 'mapEmbed', title: 'Google Maps Embed URL', type: 'url'}),
    defineField({name: 'logoHeader', title: 'Header Logo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'logoFooter', title: 'Footer Logo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'object', fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'url', title: 'URL', type: 'url'}),
      ]}],
    }),
    defineField({name: 'footerTagline', title: 'Footer Tagline', type: 'text'}),
  ],
  preview: {
    prepare() { return {title: 'Site Settings'} },
  },
})

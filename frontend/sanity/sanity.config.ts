import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'kailash-group',
  title: 'Kailash Group',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), media()],
  schema: {
    types: schemaTypes,
  },
})

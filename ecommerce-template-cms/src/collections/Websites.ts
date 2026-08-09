import type { CollectionConfig } from 'payload'

export const Websites: CollectionConfig = {
  slug: 'websites',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Website Name',
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Domain',
      admin: {
        description: 'e.g., store1.localhost:8000',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      defaultValue: 'active',
      required: true,
    },
    {
      name: 'medusa_sales_channel_id',
      type: 'text',
      required: true,
      index: true,
      label: 'Medusa Sales Channel ID',
      admin: {
        description: 'The ID of the Sales Channel in Medusa associated with this website.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      type: 'group',
      name: 'theme',
      label: 'Theme & Branding',
      fields: [
        {
          name: 'primary_color',
          type: 'text',
          defaultValue: '#000000',
        },
        {
          name: 'secondary_color',
          type: 'text',
          defaultValue: '#ffffff',
        },
        {
          name: 'font',
          type: 'text',
          defaultValue: 'Inter, sans-serif',
        },
      ],
    },
    {
      type: 'group',
      name: 'localization',
      label: 'Localization',
      fields: [
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'usd',
        },
        {
          name: 'locale',
          type: 'text',
          defaultValue: 'en-US',
        },
      ],
    },
    {
      name: 'seo_defaults',
      type: 'json',
      required: false,
      admin: {
        description: 'Default SEO settings for the website',
      },
    },
    {
      name: 'social_links',
      type: 'json',
      required: false,
    },
    {
      name: 'analytics_config',
      type: 'json',
      required: false,
    },
  ],
}

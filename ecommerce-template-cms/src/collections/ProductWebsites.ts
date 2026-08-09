import type { CollectionConfig } from 'payload'

export const ProductWebsites: CollectionConfig = {
  slug: 'product-websites',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      index: true,
    },
    {
      name: 'website',
      type: 'relationship',
      relationTo: 'websites',
      required: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'visibility',
      type: 'select',
      options: [
        { label: 'Visible', value: 'visible' },
        { label: 'Hidden', value: 'hidden' },
      ],
      defaultValue: 'visible',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'sort_order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'title_override',
      type: 'text',
      required: false,
    },
    {
      name: 'description_override',
      type: 'richText',
      required: false,
    },
    {
      name: 'slug_override',
      type: 'text',
      required: false,
      index: true,
      validate: (value: any) => {
        if (value && typeof value !== 'string') {
          return 'Slug must be a string'
        }
        if (value && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return 'Slug must be URL-friendly'
        }
        return true
      },
    },
    {
      name: 'seo_title',
      type: 'text',
      required: false,
    },
    {
      name: 'seo_description',
      type: 'textarea',
      required: false,
    },
  ],
}

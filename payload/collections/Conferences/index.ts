import regions from '@/constants/regions';
import tools from '@/constants/tools';
import { isAdmin } from '@/payload/access/admin';
import { authenticated } from '@/payload/access/authenticated';
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished';
import { CollectionConfig } from 'payload';

export const ConferencesCollection: CollectionConfig = {
  slug: 'conferences',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: isAdmin,
    read: authenticatedOrPublished,
    update: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'website',
      label: 'Website',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'pictures',
      type: 'array',
      label: 'Conference images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Picture',
        plural: 'Pictures',
      },
      fields: [
        {
          name: 'picture',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'language',
      label: 'Language',
      type: 'text',
    },
    {
      name: 'tool',
      label: 'Tool',
      type: 'select',
      options: tools.map((tool) => ({
        label: tool,
        value: tool,
      })),
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      name: 'submitter_name',
      label: 'Submitter Name',
      type: 'text',
      required: true,
    },
    {
      name: 'submitter_email',
      label: 'Submitter Email',
      type: 'email',
      required: true,
    },
    {
      name: 'start_date',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'end_date',
      label: 'End Date',
      type: 'date',
      required: true,
    },
    {
      name: 'region',
      label: 'Region',
      type: 'select',
      options: regions.map((region) => ({
        label: region,
        value: region,
      })),
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
};

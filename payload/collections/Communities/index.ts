import programmingLanguages from '@/constants/programmingLanguages';
import regions from '@/constants/regions';
import tools from '@/constants/tools';
import { isAdmin } from '@/payload/access/admin';
import { authenticated } from '@/payload/access/authenticated';
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished';
import { CollectionConfig } from 'payload';

export const CommunitiesCollection: CollectionConfig = {
  slug: 'communities',
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
      name: 'region',
      label: 'Region',
      type: 'select',
      options: regions.map((region) => ({
        label: region,
        value: region,
      })),
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
      name: 'language',
      label: 'Language',
      type: 'select',
      options: programmingLanguages.map((language) => ({
        label: language,
        value: language,
      })),
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'submitter_email',
      label: 'Submitter Email',
      type: 'email',
      required: true,
    },
    {
      name: 'submitter_name',
      label: 'Submitter Name',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
  versions: {
    drafts: true,
  },
};

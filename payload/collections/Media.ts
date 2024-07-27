import type { CollectionConfig } from 'payload';
import { anyone } from '../access/anyone';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: anyone,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
};

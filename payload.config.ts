import { s3Storage } from '@payloadcms/storage-s3';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Media } from '@/payload/collections/Media';
import { ConferencesCollection } from './payload/collections/Conferences';
import { CommunitiesCollection } from './payload/collections/Communities';

import { UsersCollection } from './payload/collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3StoragePlugin = s3Storage({
  collections: {
    ['media']: true,
  },
  bucket: process.env.S3_BUCKET!,
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION!,
  },
});

export default buildConfig({
  admin: {
    user: UsersCollection.slug,
  },
  collections: [
    UsersCollection,
    Media,
    ConferencesCollection,
    CommunitiesCollection,
  ],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [s3StoragePlugin],
});

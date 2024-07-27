const { withPayload } = require('@payloadcms/next/withPayload');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      'res.cloudinary.com',
      'source.unsplash.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = withPayload(withBundleAnalyzer(nextConfig));

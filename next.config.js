const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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

module.exports = withBundleAnalyzer(nextConfig);

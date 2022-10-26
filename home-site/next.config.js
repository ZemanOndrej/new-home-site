/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static.ozeman.eu', 'i.imgur.com', 'drdiary.eu'],
  },
};

module.exports = nextConfig;

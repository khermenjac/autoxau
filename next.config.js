/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,  // Disable SWC if causing issues
  experimental: {
    forceSwcTransforms: false,
  },
}

module.exports = nextConfig

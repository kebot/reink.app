/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['staticinstapaper.s3.dualstack.us-west-2.amazonaws.com']
  },
  experimental: {
    outputStandalone: true,
  }
}

module.exports = nextConfig

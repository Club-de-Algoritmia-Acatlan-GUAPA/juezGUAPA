/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental : {
    appDir : true,
    enableUndici: true
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

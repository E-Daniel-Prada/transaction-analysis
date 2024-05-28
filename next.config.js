/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    output: "standalone",
  })
  
  const path = require('path')
  
  const nextConfig = {
    sassOptions: {
      includePaths: [path.join(__dirname, 'src/sass')],
      prependData: `@import "main.sass"`,
    }
  }
  
  module.exports = withBundleAnalyzer(nextConfig)
  
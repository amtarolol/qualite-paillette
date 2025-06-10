/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuration pour Docker
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
}

export default nextConfig

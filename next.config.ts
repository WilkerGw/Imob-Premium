import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // @ts-ignore - Propriedade sugerida pelo terminal do Next.js para permitir HMR via IP
  allowedDevOrigins: ['192.168.0.6'],
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];  // required for ThreeJS
    return config;
  },
  // Allow connections from local network
  async rewrites() {
    return [];
  },
  // Enable access from all hosts
  webSocketServer: {
    host: '0.0.0.0'
  }
}

module.exports = nextConfig

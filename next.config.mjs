/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fatlaapi.alsalhani.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'fatlaapi.alsalhani.com',
        port: '',
        pathname: '/uploads/**',
      },
      // Add support for local/relative image paths
    ],
    domains: ['fatlaapi.alsalhani.com', 'localhost'],
  },
};

export default nextConfig;

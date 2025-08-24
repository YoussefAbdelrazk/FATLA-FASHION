/** @type {import('next').NextConfig} */
  import createNextIntlPlugin from 'next-intl/plugin';

  const withNextIntl = createNextIntlPlugin();

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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Add support for local/relative image paths
    ],
    domains: ['fatlaapi.alsalhani.com', 'localhost'],
  },
};

export default withNextIntl(nextConfig);

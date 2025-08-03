/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fatlaapi.alsalhani.com',
      },
    ],
  },
};

export default nextConfig;

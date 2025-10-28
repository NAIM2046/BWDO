/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:  ['i.ibb.co.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

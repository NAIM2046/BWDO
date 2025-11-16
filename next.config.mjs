/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:  ['i.ibb.co.com', 'images.unsplash.com' , "i.ibb.co"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React's Strict Mode for better development practices
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
    ],
  },
};

export default nextConfig;

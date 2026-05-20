import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React's Strict Mode for better development practices
  images: {
    domains: [
      'images.unsplash.com',
      'img.icons8.com',
      'unsplash.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'digitalhub.fifa.com',
      },
      {
        protocol: 'https',
        hostname: 'epbqgemnussnneutkpec.supabase.co', // In case images are stored in Supabase Storage
      }
    ]
  }
};

export default nextConfig;

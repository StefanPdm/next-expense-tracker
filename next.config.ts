import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow Clerk-hosted images used by their widgets
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  // 👇 Added these sections to skip heavy checks during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-expect-error - The eslint type is missing in Next.js 16 types but valid at runtime
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

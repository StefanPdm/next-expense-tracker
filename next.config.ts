import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Clerk-hosted images used by their widgets
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;

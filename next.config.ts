import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "th-i.thgim.com",
      },
      {
        protocol: "https",
        hostname: "www.thehindu.com",
      },
      {
        protocol: "https",
        hostname: "www.hindustantimes.com",
      },
      {
        protocol: "https",
        hostname: "images.hindustantimes.com",
      },
    ],
  },
};

export default nextConfig;
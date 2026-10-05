import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.10"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
  },
};

export default nextConfig;

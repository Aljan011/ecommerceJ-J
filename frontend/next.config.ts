import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // hostname: "paperbagnepal.com",
        hostname: "**",
        // pathname: "/**",
      },
    ],
  },
  
};

export default nextConfig;

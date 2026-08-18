import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nnxkvfafuqrynwqkevdj.supabase.co",
      },
    ],
  },
};

export default nextConfig;

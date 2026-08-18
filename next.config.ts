import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
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

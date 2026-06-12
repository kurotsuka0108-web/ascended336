import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // BASE の商品画像CDNを許可（本番連携時に使用）
    remotePatterns: [
      { protocol: "https", hostname: "baseec-img-mng.akamaized.net" },
      { protocol: "https", hostname: "baseec-images.akamaized.net" },
      { protocol: "https", hostname: "images.thebase.in" },
    ],
  },
};

export default nextConfig;

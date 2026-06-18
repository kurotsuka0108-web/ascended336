import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // BASE の商品画像CDNを許可（本番連携時に使用）
    remotePatterns: [
      { protocol: "https", hostname: "baseec-img-mng.akamaized.net" },
      { protocol: "https", hostname: "baseec-images.akamaized.net" },
      { protocol: "https", hostname: "images.thebase.in" },
    ],
    // /public/sample のデモ用SVGを next/image で扱うための設定。
    // 配信は自前の静的ファイルのみ。スクリプト実行を防ぐため CSP / attachment を付与。
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

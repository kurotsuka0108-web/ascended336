import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ワークスペースのルートを明示する。Next.js は上位ディレクトリのロックファイルを
  // 探してルートを自動判定するため、プロジェクト外（例: ホームディレクトリ）に
  // package-lock.json が紛れ込むとそちらをルートに選び、ファイル監視の肥大化・
  // モジュール解決の失敗・出力ファイルトレースのズレを招く。固定して影響を断つ。
  turbopack: { root: path.resolve(__dirname) },
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

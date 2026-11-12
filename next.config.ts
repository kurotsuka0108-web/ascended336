import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ワークスペースのルートを明示する。Next.js は上位ディレクトリのロックファイルを
  // 探してルートを自動判定するため、プロジェクト外（例: ホームディレクトリ）に
  // package-lock.json が紛れ込むとそちらをルートに選び、ファイル監視の肥大化・
  // モジュール解決の失敗・出力ファイルトレースのズレを招く。固定して影響を断つ。
  turbopack: { root: path.resolve(__dirname) },
  images: {
    // BASE の商品画像CDNを許可。API v2 の画像URLのホストが増えたらここに足す
    remotePatterns: [
      { protocol: "https", hostname: "baseec-img-mng.akamaized.net" },
      { protocol: "https", hostname: "baseec-images.akamaized.net" },
      { protocol: "https", hostname: "**.thebase.in" },
      { protocol: "https", hostname: "**.thebase.com" },
    ],
  },
  // 実商品は当初「デザイン×色」で1商品だったが、色を詳細ページで選ぶ形にまとめた。
  // 共有済みの旧URLが切れないよう、色を選んだ状態の新URLへ転送する。
  async redirects() {
    return ["graffiti-tee", "emblem-tee"].flatMap((id) =>
      ["white", "black"].map((color) => ({
        source: `/products/${id}-${color}`,
        destination: `/products/${id}?color=${color}`,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;

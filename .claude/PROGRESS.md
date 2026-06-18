# 作業進捗・引き継ぎメモ（ascended336）

> 作業を再開するときは、まずこのファイルを読んで現在地を把握すること。
> 要件の詳細は `.claude/project-brief.md` を参照。

最終更新: 2026-06-15

## リポジトリ
- GitHub: https://github.com/kurotsuka0108-web/ascended336 （Public）
- ブランチ: `main`（`origin/main` を追跡）
- ⚠️ gitルートは **ascended336フォルダ単体**（親 `projects/` の同居リポジトリとは別。ascended336内で `git init` 済み）

## 起動方法
```bash
npm run dev        # http://localhost:3000
npx tsc --noEmit   # 型チェック
```

## フェーズ進捗（コーディングフェーズ管理）
- フェーズ1 設計・計画 … ✅ 完了
- フェーズ2 実装（BASE API連携データ層） … ✅ 完了・コミット済み
- **フェーズ3 スタイリング … 👈 次はここから**
- フェーズ4 動作確認 … 未
- フェーズ5 仕上げ … 未

## 完了済み（フェーズ2）
- `src/types/product.ts` — 共通 `Product` 型
- `src/lib/mock-products.ts` — モック商品30点（4カテゴリー・在庫切れ1点含む）
- `src/lib/base.ts` — BASE APIクライアント。`getProducts()` / `getProduct()`。
  **トークン未設定時はモックへ自動フォールバック**。`.env.local` にトークンを入れるだけで本番連携に切替。
- トップ / 商品一覧 / 商品詳細を Server Component で実データ取得に変更
- `ProductCard` / `ProductGrid` / `FeaturedProducts` を実データ・画像・在庫表示に対応
- 商品詳細に動的SEO（`generateMetadata`）・カテゴリーフィルタ
- `next.config.ts` にBASE画像CDNドメイン許可 / `.env.example` 追加
- 壊れた重複ファイル `layout 2.tsx` を削除済み

## 次にやること（優先順）
1. **フェーズ3：スタイリング** — 画像プレースホルダーの質感向上、商品カード・各ページの仕上げ
2. 水平スクロールギャラリー（要件の未実装アニメーション）
3. Instagram投稿の埋め込み表示
4. SEO仕上げ：`sitemap.ts` / `robots.ts` / OGP画像（`og:image`）
5. （任意）BASE実トークン取得 → `.env.local` 設定で本番連携テスト

## ⚠️ 要対応（未追跡ファイル）
作業前に処理を決めること（未コミット・git管理外）:
- `src/components/layout/Footer 2.tsx` — **別プロジェクトの紛れ込みと思われる**
  （`riot-*` / `font-stencil` / `lucide-react`・"DIY ANARCHY STYLES" 等、ascended336と無関係。`lucide-react`未インストール）→ 削除推奨
- `src/components/layout/MotionProvider.tsx` — 正当なコンポーネント（`reducedMotion="user"`）。
  現状未使用。フェーズ3で `layout.tsx` に組み込んで活用可能

## BASEトークンの状況
- 現時点 未取得 → モック表示で運用中
- 取得手順は `.env.example` のコメント参照（ショップ開設→BASE Developersアプリ登録→OAuth認可）
- 分担：アプリ登録/refresh_token設定=開発者、OAuth認可=クライアント（実クライアントは練習案件のため不在）

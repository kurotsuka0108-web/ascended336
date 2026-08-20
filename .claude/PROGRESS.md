# 作業進捗・引き継ぎメモ（ascended336）

> 作業を再開するときは、まずこのファイルを読んで現在地を把握すること。
> 要件の詳細は `.claude/project-brief.md` を参照。

最終更新: 2026-08-20

## リポジトリ / デプロイ
- GitHub: https://github.com/kurotsuka0108-web/ascended336 （Public）
- 本番: https://ascended336.vercel.app/ （Vercel）
- ブランチ: `main`（`origin/main` を追跡）。クラウド作業時は `claude/ecommerce-site-continuation-16vxap` で開発 → mainへ取り込む
- ⚠️ gitルートは **ascended336フォルダ単体**

## 起動方法
```bash
npm run dev        # http://localhost:3000
npx tsc --noEmit   # 型チェック
```

## フェーズ進捗
- フェーズ1 設計・計画 … ✅
- フェーズ2 実装（BASE API連携データ層） … ✅
- **フェーズ3 スタイリング … ✅ 完了**
- **フェーズ4 動作確認 … 🚧 着手（Storyページのみ検証済み）**
- フェーズ5 仕上げ … 未

## フェーズ3で完了済み
- ②A 共通質感: フィルムグレイン（`GrainOverlay`）/ プレースホルダー質感統一（`.placeholder-surface`）
- `MotionProvider`（reduced-motion一元管理）を `layout.tsx` に組込
- ②B/②C/②D スクロール登場（商品カード/カテゴリー/一覧グリッド stagger fade-up）、カード画像ホバーズーム、一覧に点数表示
- 商品詳細に複数画像ギャラリー（`ProductGallery`）
- **Hero**: ロゴ撤去のミニマル構成。背景は**サイズ別レスポンシブ画像**で出し分け（`hero-bg-mobile.png`=縦長 / `hero-bg-tablet.png` / `hero-bg.png`=横長PC・object-cover）。SCROLLインジケーター削除。タグライン＋CTA（下部左）。背景画像にブランドロゴが描かれている。
- **Header大型化**（高さ/ロゴ/メニュー拡大、`main` 余白同期）
- **水平スクロールギャラリー**（`HorizontalGallery`・ピン留め横スクロール / reduced-motionは通常横スクロール）。lookbook刷新＋トップにLOOKBOOK誘導セクション。
- **マーキー**（`Marquee`）: 常時流れる無限ループ（10秒・縦幅は標準の約70%・中空アウトライン文字）。トップのNEW/BEST間に配置。
- **VINTAGEカテゴリー追加**（型/推定/フィルタ/バナー/ヘッダー）。古着モック5点（一点物=ONEサイズ在庫1）。商品計35点。
- **CategoryBannerのスマホ縦線崩れ修正**（divide-x→gap-px方式・最終項目を全幅化）
- 紛れ込みの `Footer 2.tsx` 削除
- **Storyページ演出**（フェーズ3の最終項目）
  - `StoryHero`: ヒーローを `.placeholder-surface` 化＋`useScroll`/`useTransform` でパララックス（背面レイヤーを -12%〜12%）。中央に薄い「336」、上下グラデでなじませ、ラベルはスクロールで濃淡。
  - `StoryChapters`: 章ごとに `whileInView` stagger（大きなアウトライン章番号がスケールダウンで登場 → 番号/罫線が左から伸びる → タイトル → 本文 → CTA）。
  - `src/lib/use-reduced-motion.ts` 新規: **ハイドレーション安全な** prefers-reduced-motion 判定（`useSyncExternalStore`）。framer-motion の `useReducedMotion()` はクライアント初回描画から実値を返すため、それで DOM を出し分けるとハイドレーション不一致になる。

## 次にやること
1. **【要判断・バグ】`HorizontalGallery` のハイドレーションエラー**
   - reduced-motion 有効時、`/lookbook` と `/`（トップ）で `Hydration failed because the server rendered HTML didn't match the client` が発生（Playwrightで再現確認済み）。
   - 原因: `useReducedMotion()`（framer-motion）の値でツリーを丸ごと分岐しているため。サーバー描画は常に「モーションあり」。
   - 対策: `src/lib/use-reduced-motion.ts` の `useHydratedReducedMotion()` に差し替えるだけ。**ユーザー確認待ち**。
2. フェーズ4 動作確認: 他ページ（トップ/一覧/詳細/lookbook）をStoryと同様に検証（レスポンシブ・横スクロール溢れ・コンソールエラー）。
3. フェーズ5 仕上げ: SEO（`sitemap.ts`/`robots.ts`/`og:image`）、Instagram埋め込み。
4. （任意）lookbookの各LOOK→商品詳細リンク導線（写真と商品が揃ったら）。

## ⚠️ 本番に出ているデモ用仮データ / 残置ファイル
- `public/sample/*.svg` と `src/lib/mock-products.ts` の `DEMO_IMAGES`（商品0,1=id1000,1001）→ ギャラリー確認用の仮画像。実画像/BASE連携後に削除。
- `next.config.ts` の `dangerouslyAllowSVG`（＋CSP/attachment）はデモSVG用。デモ撤去時に見直し可。
- `public/wall-bg.png` は旧ヒーロー背景。現在未使用だが**残置希望**（削除しない）。
- ヒーロー背景の元画像はユーザー提供。差し替え時は `public/hero-bg*.png` を置換。

## BASEトークンの状況
- 未取得 → モック35点で表示中（想定どおり）。取得手順は `.env.example` 参照。

## スマホ（claude.ai/code）で続ける場合
- GitHubリポジトリは同期済み。claude.ai/code をブラウザで開き本リポジトリを選択 → このPROGRESS.mdから再開。
- クラウド側の変更はリポジトリにコミットされる。Macに戻ったら `git pull`。

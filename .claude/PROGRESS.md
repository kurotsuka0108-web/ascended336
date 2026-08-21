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
- **フェーズ4 動作確認 … 🚧 進行中（主要4ページを実ブラウザで検証済み）**
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
- **Storyヒーロー背景の作り直し** — 平坦な単色の星SVGがクリップアートに見えて安っぽかったため差し替え。
  - 背景を実写のグラフィティ壁 `public/wall-bg.png`（**ロゴなし版**・従来未使用）に変更。`placeholder-surface` は単なるグラデーションで質感が出ないため使わない。
  - その上に巨大なブラシ体（`font-display`＝Dracutaz）の「ASCENDED336」を **`mix-blend-mode: screen`** で重ね、壁に描かれた壁画のように見せている。
  - **重要**: モチーフは減光レイヤーの「上」に置くこと。下に置くとビネットに潰れて消える（一度やらかした）。
  - **重要**: 単色ベタ塗りの図形を直接置かないこと。壁から浮いてステッカーに見える。必ず合成モードで下の壁の凹凸を透かす。
  - 動きは「外側＝スクロール連動のパララックス／内側＝26秒周期の常時ドリフト」の二層構成。同じ要素に `style` の x と `animate` の x を同時指定すると衝突するため分けている。
  - CREDOラベルは壁の赤に埋もれて読めなかったのでクリーム色＋赤い短罫線に変更。テキスト直下にスポット状の減光を追加。
- **Storyページ本文の刷新**（ブランドストーリー確定版）
  - 原稿はセリの花言葉「貧相だけど高潔」を軸にした**詩のリズム**の文章。散文化せず、改行位置を原稿のまま1行として出す方針。
  - `src/lib/story-content.ts`: 本文をデータとして分離。ブロック種別は verse / chain / quote / accent / define。文中の `*...*` がブランドレッドになる強調記法。**文言の修正はこのファイルだけ触ればよい**。
  - `StoryHero`: ブランドの一行「— 貧相でも、高潔であれ。—」を掲げるエピグラフ構成に変更。
  - `StoryChapters`: 01 THE FLOWER／一輪のセリ、02 THE STAR／星、03 THE ASCENT／昇華。行ごとのマスクリビール、連鎖3行（星は尖っている→尖りは反骨→反骨は自由）の階段状stagger、特大引用、03章のみ登場の移動量を大きく（＝上昇）。
  - `StarMark`: ロゴの星（セリのつぼみ）を模した七芒星SVG。背景装飾とアクセント行の行頭に使用。
  - 日本語の折り返し対策: 引用・本文に `word-break: auto-phrase` ＋ `text-balance`。「自分で上げ／ろ。」のような不自然な改行を防ぐ。
- **Storyページ演出**（フェーズ3の最終項目）
  - `StoryHero`: ヒーローを `.placeholder-surface` 化＋`useScroll`/`useTransform` でパララックス（背面レイヤーを -12%〜12%）。中央に薄い「336」、上下グラデでなじませ、ラベルはスクロールで濃淡。
  - `StoryChapters`: 章ごとに `whileInView` stagger（大きなアウトライン章番号がスケールダウンで登場 → 番号/罫線が左から伸びる → タイトル → 本文 → CTA）。
  - `src/lib/use-reduced-motion.ts` 新規: **ハイドレーション安全な** prefers-reduced-motion 判定（`useSyncExternalStore`）。framer-motion の `useReducedMotion()` はクライアント初回描画から実値を返すため、それで DOM を出し分けるとハイドレーション不一致になる。

## 次にやること
1. **フェーズ4 動作確認の続き**
   - 済: `/` `/lookbook` `/story` `/products` を reduced-motion 有無の両方で検証 → **コンソールエラー0・ハイドレーション不一致0・横スクロール溢れなし**（1440px）。
   - 未: 商品詳細 `/products/[id]`、スマホ幅（320/390px）での全ページ通し確認、カート/ドロワーなどの操作系。
2. フェーズ5 仕上げ: SEO（`sitemap.ts`/`robots.ts`/`og:image`）、Instagram埋め込み。
3. （任意）lookbookの各LOOK→商品詳細リンク導線（写真と商品が揃ったら）。

## 既知の注意点（ハマりどころ）
- **SVG座標に `Math.sin` / `Math.cos` の結果をそのまま入れないこと。**
  Node とブラウザで最下位ビットがずれ、ハイドレーション不一致になる（`StarMark` で実際に発生）。
  必ず `Number(n.toFixed(3))` のように丸めてから属性に渡す。
- **framer-motion の `useReducedMotion()` を DOM の出し分けに使わないこと。**
  クライアント初回描画から実値を返す一方、サーバー描画は常に `false` なので、
  `style` の出し分けやツリー分岐に使うとハイドレーション不一致になる
  （実際に `/lookbook` `/` で `Hydration failed` が出ていた）。
  そういう用途は `src/lib/use-reduced-motion.ts` の `useHydratedReducedMotion()` を使う。
  `animate`/`transition` prop の出し分け（`Marquee`）はマウント後の適用なので `useReducedMotion()` のままでOK。

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

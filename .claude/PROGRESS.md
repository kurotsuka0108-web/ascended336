# 作業進捗・引き継ぎメモ（ascended336）

> 作業を再開するときは、まずこのファイルを読んで現在地を把握すること。
> 要件の詳細は `.claude/project-brief.md` を参照。

最終更新: 2026-06-18

## リポジトリ / デプロイ
- GitHub: https://github.com/kurotsuka0108-web/ascended336 （Public）
- 本番: https://ascended336.vercel.app/ （Vercel・確認済みで全ページ正常）
- ブランチ: `main`（`origin/main` を追跡・mainが作業ブランチ）
- ⚠️ gitルートは **ascended336フォルダ単体**

## 起動方法
```bash
npm run dev        # http://localhost:3000
npx tsc --noEmit   # 型チェック
```

## フェーズ進捗
- フェーズ1 設計・計画 … ✅
- フェーズ2 実装（BASE API連携データ層） … ✅
- **フェーズ3 スタイリング … 🚧 進行中（後述の残アニメーションが残り）**
- フェーズ4 動作確認 … 未
- フェーズ5 仕上げ … 未

## フェーズ3で完了済み（コミット 9358933 ほか）
- ②A 共通質感: フィルムグレイン全面オーバーレイ（`GrainOverlay`）/ プレースホルダー質感統一（`.placeholder-surface` in globals.css）
- `MotionProvider`（reduced-motion一元管理）を `layout.tsx` に組込
- ②B 商品カード/注目商品: スクロール登場（stagger fade-up）、カード画像ホバーズーム
- ②C カテゴリーバナー: スクロール登場
- ②D 商品一覧: グリッドのスクロール登場 / ヘッダーに点数表示（XX ITEMS）
- 商品詳細に**複数画像ギャラリー**（`ProductGallery`：0枚=プレースホルダー/1枚/複数枚=サムネ切替）
- **Hero**: 文字→ロゴ→と試行の末、最終的に**ロゴ撤去のミニマル構成**に。グラフィティ壁＋タグライン＋CTA（下部左）、壁はヘッダー下までフルブリード。
- **Header大型化**: 高さ `h-20 md:h-28`、ロゴ `h-16 md:h-24`、メニュー `text-base lg:text-lg`、カート26px。`main` 余白も `pt-20 md:pt-28` に同期。
- 紛れ込みの `Footer 2.tsx` を削除

## 次にやること：残りのアニメーション（承認済みプラン）
> 4案ユーザー承認済み。Framer Motion・reduced-motion対応（スクロール駆動系は `useReducedMotion()` でガード）。登場系は `src/lib/animations.ts` の `fadeInUp`/`staggerContainer` 再利用。

1. **【次はここ】水平スクロールギャラリー**（要件の未実装機能）
   - 新規 `src/components/sections/HorizontalGallery.tsx`（client）。外側を高く取り内側 `sticky top-0 h-screen`、`useScroll`の進捗を `x: 0%→-N%` に。タイルは `.placeholder-surface`。
   - **配置=両方**: `src/app/lookbook/page.tsx` の masonry を置換（ヘッダー/シーズンラベルは残す）＋ `src/app/page.tsx` の BEST SELLERS 下にLOOKBOOK誘導の水平スクロールセクション追加。
   - reduced-motion時は通常の横スクロール/静止にフォールバック。
2. **スクロール連動マーキー** 新規 `src/components/sections/Marquee.tsx`。`useScroll`+`useTransform`で横流し。「BRITISH PUNK · REFINED CHAOS · ELEVATED REBELLION ·」。トップのNEW/BEST間の区切りに配置。
3. **Storyページ演出**: `src/app/story/page.tsx` を client部品化（`StoryHero`=パララックス, `StoryChapters`=fade-up＋大章番号）。`#2a2a2a`ベタを `.placeholder-surface` に。
4. （Hero登場アニメはユーザーが「フォーカスイン」を一度採用したがロゴ撤去で消滅。現状Heroにロゴ無し。再度ロゴを使うか等は要相談）

その後: SEO仕上げ（sitemap.ts/robots.ts/og:image）、Instagram埋め込み。

## ⚠️ 本番に出ているデモ用仮データ（後で外す想定）
- `public/sample/*.svg`（FRONT/BACK/DETAIL）と `src/lib/mock-products.ts` の `DEMO_IMAGES`（商品0,1=id1000,1001に割当）→ ギャラリー確認用の仮画像。実画像/BASE連携後は `DEMO_IMAGES` を削除。
- `next.config.ts` の `dangerouslyAllowSVG`（＋CSP/attachment）はこのデモSVGを `next/image` で扱うため。デモ撤去時に見直し可。
- Heroのフォント切替トグルは削除済み。未使用フォント（Anton/Bungee/Glitch/Rubik Spray）も削除済み。

## BASEトークンの状況
- 未取得 → モック30点で表示中（想定どおり）。取得手順は `.env.example` 参照。

## スマホ（claude.ai/code）で続ける場合
- GitHubリポジトリは同期済み。claude.ai/code をブラウザで開き本リポジトリを選択 → このPROGRESS.mdから再開。
- クラウド側の変更はリポジトリにコミットされる。Macに戻ったら `git pull`。

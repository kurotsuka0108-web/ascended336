# 作業進捗・引き継ぎメモ（ascended336）

> 作業を再開するときは、まずこのファイルを読んで現在地を把握すること。
> 要件の詳細は `.claude/project-brief.md` を参照。

最終更新: 2026-08-22

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
  - **背景は壁・文字とも完全に固定**（ユーザー指示）。当初はパララックス＋常時ドリフトを付けていたが、壁と文字が別々に動くと相対位置がズレて「壁に描かれている」関係が崩れるため、動かすなら必ず一体で動かすこと。動くのは CREDO の初回登場のみ。
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

## 2026-08-22 の作業（PR #4〜#9）
- **#4 トップのヒーロー背景を差し替え** — スマホ/タブレット/PCの3枚をユーザー提供画像に更新（`Hero.tsx` は既にブレークポイント別の出し分け済みでコード変更なし）。
- **#5 Storyヒーローの巨大タイポがスマホで見切れる問題を修正**
  - 原因は `fontSize: clamp(7rem, 22vw, 20rem)` の**下限**。`22vw < 7rem` になる**幅509px未満（＝スマホ全域）**でだけ下限が発動し、想定より大きく描画されていた。
  - Dracutaz の "ASCENDED336" は **4.104em 幅**。1行で画面に収めるには `font-size ≦ 100vw / 4.104 ≒ 24.3vw` が上限。
  - 下限を `4rem` に下げて全画面幅で `22vw` を効かせ、常に画面幅の約90%に収まるようにした。**下限は必ず 22vw を下回る値にすること。**
- **#6 Turbopack のワークスペースルートを明示** — ホームディレクトリに空の孤児 `package-lock.json` があり、Next.js がそこをルートと誤判定して起動警告＋`@swc/helpers` の解決エラーが出ていた。孤児ファイルを削除し、`next.config.ts` に `turbopack.root` を固定（再発防止）。
- **#7 実商品4点の登録＋おすすめ欄**（下の専用セクション参照）
- **#8 商品写真に斜めストライプが重なる問題を修正**
  - `.placeholder-surface::after` の45度ストライプは**擬似要素なので子要素より後に描画され、写真の上に重なる**。写真の不透明度を上げても消えない。
  - 写真があるときは `placeholder-surface` を外して無地（`bg-brand-black`）にする。画像未登録時のプレースホルダー表示は従来どおり維持。
  - `ProductGallery`（詳細）と `ProductCard`（一覧）の両方に同じ重なりが出ていた。
- **#9 このPROGRESS.mdの更新**

## 実商品の登録（PR #7）
撮影済みのTシャツ4点。物撮り（3:4）とモデル着用の2点構成。画像は `public/products/`。

| URL | 商品名 |
|---|---|
| `/products/graffiti-tee-white` | GRAFFITI TAG TEE / WHITE |
| `/products/emblem-tee-white` | EMBLEM LOGO TEE / WHITE |
| `/products/graffiti-tee-black` | GRAFFITI TAG TEE / BLACK |
| `/products/emblem-tee-black` | EMBLEM LOGO TEE / BLACK |

- 物撮りを `images[0]`（メイン）に。一覧カードは `aspect-[3/4]` なので物撮りが無加工でぴったり収まる。
- **説明文はストーリーの原稿（`lib/story-content.ts`）からモチーフを引き、最終行にその章の一行を置く**構成で統一。原稿を書き換えるときは商品説明との対応も確認すること。
- `ProductGallery` のメイン画像は **`object-contain`**。物撮り3:4とモデル着用2:3で比率が混在し、`object-cover` だと全身カットの頭と足元が切れるため。逆に枠を2:3にすると物撮りの袖が切れる。商品写真をトリミングしない方を優先している。
- **おすすめ欄**: 商品ページ下部の `YOU MAY ALSO LIKE`。新規コンポーネントは作らず**トップの `FeaturedProducts` を再利用**。選定は `lib/base.ts` の `getRelatedProducts()`（自分自身を除外・同カテゴリー優先・最大4件）。
  **順序は決定的にすること。** ランダムにするとISR再生成やハイドレーションで内容がズレる。

### ⚠️ 実商品の要確定事項（すべて仮値。コード内に `TODO(要確定)` あり）
| 項目 | 現在の値 | 変更箇所 |
|---|---|---|
| 価格 | ¥8,800（4点共通） | `mock-products.ts` の `PROVISIONAL_TEE_PRICE` の1行 |
| サイズ | FREE（未定のためユーザー指示で一旦FREE） | `REAL_SEEDS` の `variations` を `APPAREL_SIZES` 等へ |
| 在庫数 | 8 | 同上 |
| 商品名・説明文 | Claudeが起草 | `REAL_SEEDS` |

## 次にやること
1. **実商品の情報を確定させる**（上の「要確定事項」の表を参照）。価格・サイズ・在庫がすべて仮値のまま本番に出ている。
2. **フェーズ4 動作確認の続き**
   - 済: `/` `/lookbook` `/story` `/products` を reduced-motion 有無の両方で検証 → **コンソールエラー0・ハイドレーション不一致0・横スクロール溢れなし**（1440px）。
   - 商品詳細 `/products/[id]`: 8/22時点で **HTTPレスポンスとHTMLの内容のみ自動検証済み**（4商品とも200、画像8点とも200、おすすめ欄4件・自分自身の除外を確認）。**実ブラウザでの目視・コンソールエラー確認は未実施。**
   - 未: スマホ幅（320/390px）での全ページ通し確認、カート/ドロワーなどの操作系。
3. フェーズ5 仕上げ: SEO（`sitemap.ts`/`robots.ts`/`og:image`）、Instagram埋め込み。
4. （任意）lookbookの各LOOK→商品詳細リンク導線 — **実商品4点と写真が揃ったので着手可能になった**。

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
- `public/sample/*.svg` → ギャラリー確認用の仮画像。id1000（DESTROY MOHAIR KNIT）と id1001（SAFETY PIN SHIRT）に割り当て。BASE連携後に削除。
  - **`DEMO_IMAGES` は廃止済み**（PR #7）。配列の添字直指定（`{0:…, 1:…}`）だったため、商品を1点足すと別商品に画像が付く状態だった。現在は `MockSeed.images` に各 seed が直接持つ。
  - 実商品とモックは `REAL_SEEDS` / `SEEDS` の別配列。モックのIDは `SEEDS` 内の添字+1000 で固定してあるので、**実商品を足しても既存の `/products/1000` 等のURLは変わらない**。
- `next.config.ts` の `dangerouslyAllowSVG`（＋CSP/attachment）はデモSVG用。デモ撤去時に見直し可。
- `public/wall-bg.png` は旧ヒーロー背景。現在未使用だが**残置希望**（削除しない）。
- ヒーロー背景の元画像はユーザー提供。差し替え時は `public/hero-bg*.png` を置換。

## STORY → ABOUT（2026-11-14）
- `/story` を `/about` に置き換え（`/story` は 308 で転送）。ナビ・トップのリンクも ABOUT に。一度 CONCEPT にしたが、BASE と名前をそろえるため ABOUT に変更（ユーザー指示）。
- 中身はグラフィティ壁の写真の上に、BASE ショップの ABOUT と同じ文章（`lib/about-content.ts`）。
- スマホ中心で組む: 本文 15px・行間 1.9（md 以上は 1.05rem・2.1）。改行は句の切れ目だけ（句の配列＋`<wbr>`＋keep-all）。信条「貧相でも、高潔。」と旧ストーリー本文は削除（ユーザー指示）。
- 上のストーリー関連の記述（StoryHero / StoryBody / story-content / StarMark）は過去の経緯。ファイルはもう無い。

## BASEトークンの状況
- **API v2 のパーソナルアクセストークン（PAT）を使用**（2026-11-12 発行、スコープ `items.read`）。Vercel の `BASE_API_TOKEN`（Production / Preview）に設定済み。
- **有効期限：2027-02-10（発行から90日・最大）。期限前に BASE Developers → API v2 → PAT で再発行し、Vercel の値を差し替えること。** 切れると BASE の商品が出なくなり、サイト内の実商品4点（`lib/local-products.ts`）に戻る。
- BASE で**販売開始前**（`sales_status` = `item_waiting_for_sale`）か非公開の商品は **COMING SOON**（購入ボタン停止）で出す。販売が始まれば最大1時間で通常表示に切り替わる。販売終了後は SOLD OUT。BASE は色ごとに別商品（例: `AscenDed336 – SYMBOL TEE BLACK`）なので、末尾の色名で1商品にまとめ、詳細ページの色ボタンで切り替える。一覧では色ごとに1枚ずつ並べる。
- 商品説明は BASE に登録された文を使う（ユーザー指示）。

## スマホ（claude.ai/code）で続ける場合
- GitHubリポジトリは同期済み。claude.ai/code をブラウザで開き本リポジトリを選択 → このPROGRESS.mdから再開。
- クラウド側の変更はリポジトリにコミットされる。Macに戻ったら `git pull`。

## トップのマーキーをロゴに（2026-11-14）
- `Marquee.tsx` の流れる文字（BRITISH PUNK — …）をロゴマーク（ユリの星）だけの繰り返しに差し替え。ブランド名の文字は入れない（ユーザー指示）。
- 画像は `public/logo-star.png`（394×388）。`logo-mark.png` から星の部分だけを sharp で切り出し、余白を trim したもの。

## トップのカテゴリーと LOOKBOOK（2026-11-14）
- `CategoryBanner.tsx`: TOPS だけ写真付きのリンク（`/products/graffiti-tee/black-front.jpg`）。BOTTOMS / OUTERWEAR / VINTAGE / ACCESSORIES は「COMING SOON」の札のみでリンクなし。商品が増えたら `image` を足せばリンクに切り替わる。
- トップの LOOKBOOK 誘導の説明文（荒削りと品格が交差する…）を削除し、見出し LOOKBOOK だけに（ユーザー指示）。

## トップの整理と BASE 連携の取り込み（2026-11-14）
- トップから BEST SELLERS を削除（発売前で売れた実績がないため。ユーザー指示）。ヒーローの英語のキャッチコピー（REFINED CHAOS — ELEVATED REBELLION）も削除。
- `base-api-v2` を `about-page` にマージ。見本商品（mock-products）は削除済みで、商品は BASE に登録された8点だけ。BASE から取れないときだけ `local-products.ts`（同じ実商品4点）を出す。

import type { Product, ProductCategory, ProductVariation } from "@/types/product";

/**
 * 開発用モック商品データ（約30点）。
 * BASE のトークンが未設定のとき、lib/base.ts がこのデータにフォールバックする。
 * 本番では BASE API から取得した実データに置き換わる。
 */

const APPAREL_SIZES: ProductVariation[] = [
  { id: "xs", label: "XS", stock: 3 },
  { id: "s", label: "S", stock: 5 },
  { id: "m", label: "M", stock: 5 },
  { id: "l", label: "L", stock: 4 },
  { id: "xl", label: "XL", stock: 2 },
];

const FREE_SIZE: ProductVariation[] = [{ id: "free", label: "FREE", stock: 8 }];

/** 古着など一点物（在庫1のワンサイズ） */
const ONE_OF_A_KIND: ProductVariation[] = [{ id: "one", label: "ONE", stock: 1 }];

/**
 * 実商品Tシャツの仮価格（税込）。正式な価格が決まり次第ここだけ変更する。
 * 既存モックの ANARCHY GRAPHIC TEE と同額に揃えてある。
 */
const PROVISIONAL_TEE_PRICE = 8800;

type MockSeed = {
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  /** 商品画像のパス（先頭がメイン）。未指定なら画像なしのプレースホルダー表示 */
  images?: string[];
  accessory?: boolean;
  /** 一点物（古着など）。ONEサイズ・在庫1で表示 */
  oneOfAKind?: boolean;
  soldOut?: boolean;
};

/**
 * ── 実商品 ──
 * 撮影済みの実在アイテム。物撮り（3:4）とモデル着用の2点で構成する。
 *
 * 説明文はストーリーページの原稿（lib/story-content.ts の CHAPTERS / CREDO）から
 * モチーフと言い回しを引いている。最終行はその章の一行を置く決まりで、
 * 詳細ページ側が whitespace-pre-line なので \n がそのまま改行として出る。
 * 原稿を書き換えるときは、こちらの文言との対応も確認すること。
 *
 * TODO(要確定): price と在庫数は仮値。サイズ展開が未定のため一旦 FREE で運用中。
 * サイズが決まったら variations を APPAREL_SIZES 等に差し替えること。
 */
const REAL_SEEDS: (MockSeed & { id: string })[] = [
  {
    id: "graffiti-tee-white",
    name: "GRAFFITI TAG TEE / WHITE",
    price: PROVISIONAL_TEE_PRICE,
    category: "TOPS",
    description:
      "一筆で書き切ったタグを、そのまま胸に置いた。線の震えも、かすれも、消さずに残してある。飾らなくても、媚びなくても、筆跡だけで立っていられる一枚。\n星は尖っている。尖りは反骨、反骨は自由。",
    images: [
      "/products/graffiti-tee-white-front.jpg",
      "/products/graffiti-tee-white-model.jpg",
    ],
  },
  {
    id: "emblem-tee-white",
    name: "EMBLEM LOGO TEE / WHITE",
    price: PROVISIONAL_TEE_PRICE,
    category: "TOPS",
    description:
      "セリのつぼみは、星の形をしている。その星とセリフ体のロゴを、胸元に静かに置いた。小さくて、素朴で、見落とされるような花。それでも花言葉は「貧相だけど高潔」。\n派手じゃなくてもいい。でも、誇りだけは失うな。",
    images: [
      "/products/emblem-tee-white-front.jpg",
      "/products/emblem-tee-white-model.jpg",
    ],
  },
  {
    id: "graffiti-tee-black",
    name: "GRAFFITI TAG TEE / BLACK",
    price: PROVISIONAL_TEE_PRICE,
    category: "TOPS",
    description:
      "黒地に白く抜いたタグ。夜の壁に残されたサインのように、筆跡だけが浮かび上がる。過去も、痛みも、劣等感も、全部ひっくるめて自分の美学に変えていくための一枚。\n自分の価値を、自分で上げろ。",
    images: [
      "/products/graffiti-tee-black-front.jpg",
      "/products/graffiti-tee-black-model.jpg",
    ],
  },
  {
    id: "emblem-tee-black",
    name: "EMBLEM LOGO TEE / BLACK",
    price: PROVISIONAL_TEE_PRICE,
    category: "TOPS",
    description:
      "漆黒のボディに、白の星とセリフ体のロゴ。Ascended ＝ 昇華・上昇。掲げる意味はひとつ、自分の価値を自分で上げること。黒と白の対比が、品格と反骨を同時に成立させる。\n貧相でも、高潔であれ。",
    images: [
      "/products/emblem-tee-black-front.jpg",
      "/products/emblem-tee-black-model.jpg",
    ],
  },
];

const SEEDS: MockSeed[] = [
  // ── TOPS ──
  // この2点だけ /public/sample のデモ用SVGを割り当て、画像未登録以外の見え方
  // （複数画像のサムネイル切替）も一覧・詳細で確認できるようにしている。
  { name: "DESTROY MOHAIR KNIT", price: 28000, category: "TOPS", description: "粗く編み立てたモヘアニット。あえて崩したホールと不揃いなステッチが、退廃と気高さを同居させる。", images: ["/sample/look-front.svg", "/sample/look-back.svg", "/sample/look-detail.svg"] },
  { name: "SAFETY PIN SHIRT", price: 19800, category: "TOPS", description: "セーフティピンをあしらったブロードシャツ。上品なシルエットに反骨のディテールを忍ばせた一着。", images: ["/sample/look-front.svg", "/sample/look-detail.svg"] },
  { name: "ANARCHY GRAPHIC TEE", price: 8800, category: "TOPS", description: "ヘビーウェイト天竺に色褪せ加工を施したグラフィックTシャツ。ロンドンの壁を思わせるプリント。" },
  { name: "TARTAN PUNK BLOUSE", price: 22000, category: "TOPS", description: "タータンチェックのブラウス。クラシックな織りに荒削りなカッティングを掛け合わせた。" },
  { name: "DISTRESSED RIB KNIT", price: 17600, category: "TOPS", description: "リブ編みのダメージニット。タイトなフォルムが上品な反逆を演出する。" },
  { name: "CHAOS MESH LONG SLEEVE", price: 14300, category: "TOPS", description: "透けるメッシュのロングスリーブ。重ね着で印象が変わるレイヤードピース。" },
  { name: "ROYAL CREST POLO", price: 16500, category: "TOPS", description: "クレスト刺繍のポロ。ブリティッシュの格式をパンクの温度で着崩す。" },
  { name: "RAW HEM SWEAT", price: 15400, category: "TOPS", description: "切りっぱなしの裾が荒々しいスウェット。上質な裏起毛で着心地は静かに上品。" },

  // ── BOTTOMS ──
  { name: "ANARCHY TARTAN TROUSERS", price: 26400, category: "BOTTOMS", description: "ボンテージ仕様のタータントラウザー。ストラップとバックルが歩くたびに鳴る。" },
  { name: "RIPPED SLIM DENIM", price: 23100, category: "BOTTOMS", description: "膝を破いたスリムデニム。色落ちとダメージを丁寧に仕込んだ主役級の一本。" },
  { name: "BONDAGE CARGO PANTS", price: 27500, category: "BOTTOMS", description: "ストラップ付きカーゴ。機能美と退廃をまとう武骨なシルエット。" },
  { name: "PLEATED KILT SKIRT", price: 24200, category: "BOTTOMS", description: "プリーツの効いたキルトスカート。安全ピンのディテールが効いた一枚。" },
  { name: "LEATHER LACE-UP PANTS", price: 38500, category: "BOTTOMS", description: "サイドレースアップのレザーパンツ。艶やかな質感が夜の街に映える。" },
  { name: "WORK CHAIN TROUSERS", price: 20900, category: "BOTTOMS", description: "チェーンを下げたワークトラウザー。タフな生地に上品なテーパード。" },
  { name: "ASYMMETRIC WRAP SKIRT", price: 21450, category: "BOTTOMS", description: "非対称ラップスカート。巻き方で表情を変える可変ピース。" },

  // ── OUTERWEAR ──
  { name: "STUDDED RIDERS JACKET", price: 68000, category: "OUTERWEAR", description: "スタッズを打ち込んだライダース。本革の重厚さと荒削りな存在感。" },
  { name: "TARTAN WOOL COAT", price: 78000, category: "OUTERWEAR", description: "タータンのウールコート。クラシックな仕立てに反骨のシルエットを。" },
  { name: "PAINTED DENIM JACKET", price: 42000, category: "OUTERWEAR", description: "ハンドペイントのデニムジャケット。一点ずつ表情の異なるアート。" },
  { name: "DECONSTRUCTED BLAZER", price: 56000, category: "OUTERWEAR", description: "解体と再構築のブレザー。端正なテーラリングを意図的に崩した。" },
  { name: "MILITARY PARKA", price: 49500, category: "OUTERWEAR", description: "ミリタリーパーカ。武骨なディテールを上質な素材でまとめた。" },
  { name: "PUNK TRENCH COAT", price: 64900, category: "OUTERWEAR", description: "ストラップを増やしたトレンチ。英国の品格を現代の反逆へ。" },

  // ── ACCESSORIES ──
  { name: "SPIKE LEATHER CHOKER", price: 6600, category: "ACCESSORIES", description: "スパイクのレザーチョーカー。喉元に宿る小さな反逆。", accessory: true },
  { name: "SAFETY PIN EARRINGS", price: 5500, category: "ACCESSORIES", description: "セーフティピアス。シルバー925の精緻な造形。", accessory: true },
  { name: "STUDDED LEATHER BELT", price: 12100, category: "ACCESSORIES", description: "スタッズベルト。経年で味を増す本革仕様。", accessory: true },
  { name: "CHAIN WALLET", price: 14300, category: "ACCESSORIES", description: "チェーンウォレット。武骨な金具と上質なレザー。", accessory: true },
  { name: "TARTAN SCARF", price: 8800, category: "ACCESSORIES", description: "タータンのウールスカーフ。首元の英国。", accessory: true },
  { name: "ANARCHY ENAMEL PINS", price: 3300, category: "ACCESSORIES", description: "エナメルピンのセット。襟元の小さな主張。", accessory: true },
  { name: "SKULL SIGNET RING", price: 9900, category: "ACCESSORIES", description: "スカルのシグネットリング。重厚なシルバー。", accessory: true, soldOut: true },
  { name: "STUDDED BEANIE", price: 7700, category: "ACCESSORIES", description: "スタッズビーニー。やわらかなニットに鋭い金属。", accessory: true },
  { name: "LEATHER GLOVES", price: 11000, category: "ACCESSORIES", description: "ショート丈のレザーグローブ。指先まで宿る品格。", accessory: true },

  // ── VINTAGE（古着・一点物） ──
  { name: "70S VINTAGE TARTAN BLAZER", price: 34000, category: "VINTAGE", description: "70年代英国のタータンブレザー。時を経た生地の風合いと一点物の佇まい。", oneOfAKind: true },
  { name: "ARCHIVE BAND TEE (VINTAGE)", price: 18700, category: "VINTAGE", description: "色褪せたアーカイブのバンドT。当時のプリントとダメージをそのままに。", oneOfAKind: true },
  { name: "WORN LEATHER RIDERS (USED)", price: 52000, category: "VINTAGE", description: "使い込まれたライダース。深いシワとアタリが語る確かな経年。", oneOfAKind: true },
  { name: "VINTAGE MOHAIR CARDIGAN", price: 26400, category: "VINTAGE", description: "起毛の効いたヴィンテージモヘアカーディガン。希少な色味の一着。", oneOfAKind: true },
  { name: "FADED PUNK DENIM (USED)", price: 23100, category: "VINTAGE", description: "理想的に色落ちした古着デニム。安全ピンの補修跡まで愛おしい。", oneOfAKind: true, soldOut: true },
];

/** seed と ID から Product を組み立てる。 */
function buildProduct(seed: MockSeed, id: string): Product {
  const variations = seed.oneOfAKind
    ? ONE_OF_A_KIND
    : seed.accessory
      ? FREE_SIZE
      : APPAREL_SIZES;
  const inStock = !seed.soldOut;
  return {
    id,
    name: seed.name,
    description: seed.description,
    price: seed.price,
    images: seed.images ?? [],
    category: seed.category,
    inStock,
    variations: inStock
      ? variations
      : variations.map((v) => ({ ...v, stock: 0 })),
  };
}

/**
 * 実商品を先頭に、モック商品を後ろに連結する。
 *
 * モック側の ID は「SEEDS 内の添字 + 1000」で固定する。実商品を先頭に足しても
 * 添字がずれないよう配列を分けてあるので、既存の /products/1000 等のURLは不変。
 * 実商品には内容が読み取れるスラッグを与える（例: /products/graffiti-tee-white）。
 */
export const MOCK_PRODUCTS: Product[] = [
  ...REAL_SEEDS.map((seed) => ({
    ...buildProduct(seed, seed.id),
    // サイズ展開が未定のため一旦 FREE。決まり次第 APPAREL_SIZES 等へ差し替える。
    variations: FREE_SIZE,
  })),
  ...SEEDS.map((seed, i) => buildProduct(seed, String(1000 + i))),
];

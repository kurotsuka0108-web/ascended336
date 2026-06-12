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

type MockSeed = {
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  accessory?: boolean;
  soldOut?: boolean;
};

const SEEDS: MockSeed[] = [
  // ── TOPS ──
  { name: "DESTROY MOHAIR KNIT", price: 28000, category: "TOPS", description: "粗く編み立てたモヘアニット。あえて崩したホールと不揃いなステッチが、退廃と気高さを同居させる。" },
  { name: "SAFETY PIN SHIRT", price: 19800, category: "TOPS", description: "セーフティピンをあしらったブロードシャツ。上品なシルエットに反骨のディテールを忍ばせた一着。" },
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
];

export const MOCK_PRODUCTS: Product[] = SEEDS.map((seed, i) => {
  const variations = seed.accessory ? FREE_SIZE : APPAREL_SIZES;
  const inStock = !seed.soldOut;
  return {
    id: String(1000 + i),
    name: seed.name,
    description: seed.description,
    price: seed.price,
    images: [],
    category: seed.category,
    inStock,
    variations: inStock
      ? variations
      : variations.map((v) => ({ ...v, stock: 0 })),
  };
});

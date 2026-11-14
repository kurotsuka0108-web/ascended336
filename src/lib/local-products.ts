import type { Product, ProductColor, ProductVariation } from "@/types/product";
import { PRESETS } from "./size-charts";

/**
 * サイト内に持っている実商品データ（4点）。
 * BASE の鍵が未設定・BASE に表示できる商品が無い・取得に失敗した、のいずれかのとき
 * lib/base.ts がこのデータを表示する。BASE に商品が並べば使われなくなる。
 */

/**
 * 仮価格（税込）。正式な価格は BASE 側で管理する。
 * TODO(要確定): price と在庫数は仮値。
 */
const PROVISIONAL_TEE_PRICE = 8800;
const PROVISIONAL_LONG_TEE_PRICE = 9900;

/** サイズ展開。在庫数は仮値 */
const SIZES: ProductVariation[] = [
  { id: "s", label: "S", stock: 5 },
  { id: "m", label: "M", stock: 5 },
  { id: "l", label: "L", stock: 5 },
];

/** 白・黒の2色展開。画像は public/products/<商品ID>/<色>-<種類>.jpg に置く */
function whiteAndBlack(id: string, kinds: string[]): ProductColor[] {
  return [
    { id: "white", label: "WHITE", swatch: "#f5f5f0" },
    { id: "black", label: "BLACK", swatch: "#0a0a0a" },
  ].map((c) => ({
    ...c,
    images: kinds.map((kind) => `/products/${id}/${c.id}-${kind}.jpg`),
  }));
}

/**
 * デザインごとに1商品とし、色は詳細ページで選ぶ。
 * 旧URL（/products/graffiti-tee-white 等）は next.config.ts で ?color= 付きへ転送している。
 * 説明文は空（ユーザー指示で削除）。空なら詳細ページは説明欄ごと出さない。
 */
const SEEDS: (Omit<Product, "images" | "category" | "inStock" | "variations"> & {
  colors: ProductColor[];
})[] = [
  {
    id: "graffiti-tee",
    name: "GRAFFITI TAG TEE",
    price: PROVISIONAL_TEE_PRICE,
    description: "",
    colors: whiteAndBlack("graffiti-tee", ["front", "model"]),
    sizeChart: PRESETS.tee,
  },
  {
    id: "emblem-tee",
    name: "EMBLEM LOGO TEE",
    price: PROVISIONAL_TEE_PRICE,
    description: "",
    colors: whiteAndBlack("emblem-tee", ["front", "model"]),
    sizeChart: PRESETS.tee,
  },
  {
    id: "graffiti-long-tee",
    name: "GRAFFITI TAG LONG TEE",
    price: PROVISIONAL_LONG_TEE_PRICE,
    description: "",
    colors: whiteAndBlack("graffiti-long-tee", ["front"]),
    sizeChart: PRESETS["long-tee"],
  },
  {
    id: "emblem-long-tee",
    name: "EMBLEM LOGO LONG TEE",
    price: PROVISIONAL_LONG_TEE_PRICE,
    description: "",
    colors: whiteAndBlack("emblem-long-tee", ["front"]),
    sizeChart: PRESETS["long-tee"],
  },
];

export const LOCAL_PRODUCTS: Product[] = SEEDS.map((seed) => ({
  ...seed,
  images: seed.colors[0].images,
  category: "TOPS",
  inStock: true,
  variations: SIZES,
}));

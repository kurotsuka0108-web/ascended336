import "server-only";
import type {
  Product,
  ProductCategory,
  ProductColor,
  ProductVariation,
  SizeChartKey,
} from "@/types/product";
import { LOCAL_PRODUCTS } from "./local-products";
import { shopItemUrl } from "./shop";

/**
 * BASE API v2 クライアント。
 *
 * - サーバーサイド専用（"server-only"）。鍵をクライアントに渡さない。
 * - 鍵は BASE Developers で発行するパーソナルアクセストークン（スコープ items.read）。
 *   Vercel の環境変数 BASE_API_TOKEN に置く。有効期限があるので切れる前に差し替えること。
 * - 鍵が無い・取得に失敗した・表示できる商品が1つも無い場合は LOCAL_PRODUCTS を表示する。
 * - 本番では BASE で「公開」の商品だけを出す。プレビュー・ローカルでは非公開の商品も出し、
 *   ショップ公開前に見え方を確認できるようにする。
 *
 * 参考: https://apiv2.thebase.com/docs/
 */

const API_BASE = "https://apiv2.thebase.com/api";
const REVALIDATE_SECONDS = 3600; // 1時間ごとに再取得（ISR）
const PAGE_SIZE = 100; // API の上限

// 貼り付け時に混ざりやすい "Bearer " の付けすぎ・空白・改行・見えない文字（ゼロ幅スペース等）を除く。
// 鍵の文字列に空白は含まれないので、途中に入ったものも全部消してよい
const TOKEN = process.env.BASE_API_TOKEN?.trim()
  .replace(/^Bearer\s+/i, "")
  .replace(/[\s\u200B-\u200D\u2060\uFEFF]/g, "");
const PUBLIC_ONLY = process.env.VERCEL_ENV === "production";

// ── カテゴリー推定（BASE のカテゴリー名と揃えるまでの簡易マッピング） ──
function inferCategory(title: string): ProductCategory {
  const t = title.toLowerCase();
  if (/(vintage|used|secondhand|archive|古着)/.test(t)) return "VINTAGE";
  if (/(coat|jacket|blazer|parka|trench|outer|riders)/.test(t)) return "OUTERWEAR";
  if (/(pants|trousers|denim|skirt|kilt|cargo|bottom)/.test(t)) return "BOTTOMS";
  if (/(belt|choker|earring|ring|pin|scarf|wallet|beanie|glove|necklace|bag|cap|hat)/.test(t))
    return "ACCESSORIES";
  return "TOPS";
}

/** 商品名からサイズ表を選ぶ。Tシャツ以外は出さない */
function inferSizeChart(title: string): SizeChartKey | undefined {
  const t = title.toLowerCase();
  if (/(long|ロング|長袖)/.test(t)) return "long-tee";
  if (/(tee|t-shirt|tシャツ|半袖)/.test(t)) return "tee";
  return undefined;
}

// ── 色 ──
// BASE では色ごとに別商品として登録している（例: "AscenDed336 – SYMBOL TEE BLACK"）。
// 名前の末尾の色名を外した名前が同じ商品を1つにまとめ、詳細ページの色ボタンで切り替える。
// 写真・在庫・購入リンクは色ごとに、その色の BASE 商品のものを使う。

/** 色名 → 色見本の塗り。ここに無い色名は色として扱わない（名前の一部とみなす） */
const COLORS: { label: string; pattern: RegExp; swatch: string }[] = [
  { label: "WHITE", pattern: /^(white|ホワイト|白)$/i, swatch: "#f5f5f0" },
  { label: "BLACK", pattern: /^(black|ブラック|黒)$/i, swatch: "#0a0a0a" },
  { label: "GRAY", pattern: /^(gr[ae]y|グレー|灰)$/i, swatch: "#8a8a8a" },
  { label: "RED", pattern: /^(red|レッド|赤)$/i, swatch: "#cc0000" },
  { label: "NAVY", pattern: /^(navy|ネイビー|紺)$/i, swatch: "#1c2541" },
];

/** 名前からブランド名の前置きと末尾の色名を外す */
function splitName(raw: string): { name: string; color?: (typeof COLORS)[number] } {
  // 詳細ページではブランド名を別に出しているので、"AscenDed336 – " は省く
  const name = raw.replace(/^ascended\s*336\s*[–—-]\s*/i, "").trim();
  const words = name.split(/\s+/);
  const color = COLORS.find((c) => c.pattern.test(words[words.length - 1]));
  return color && words.length > 1
    ? { name: words.slice(0, -1).join(" "), color }
    : { name };
}

// ── BASE のレスポンス型（使う範囲のみ） ──
interface BaseImage {
  url: string;
}

interface BaseVariation {
  id: number;
  name?: string | null;
  stock: number;
}

interface BaseItem {
  id: number;
  name: string;
  detail: string | null;
  price: number | null;
  stock: number;
  visible: boolean;
  images?: BaseImage[];
  variations?: BaseVariation[];
}

/** BASE の item をアプリの Product 型へ正規化する。色はまだまとめない */
function normalize(item: BaseItem): Product & { color?: ProductColor } {
  const { name, color } = splitName(item.name);
  const id = String(item.id);
  const images = (item.images ?? []).map((img) => img.url);
  const variations: ProductVariation[] = (item.variations ?? []).map((v) => ({
    id: String(v.id),
    label: v.name?.trim() || "FREE",
    stock: v.stock,
  }));
  const url = shopItemUrl(id);

  return {
    id,
    name,
    description: item.detail ?? "",
    price: item.price ?? 0,
    images,
    category: inferCategory(name),
    inStock: item.stock > 0,
    variations,
    sizeChart: inferSizeChart(name),
    url,
    color: color && {
      id: color.label.toLowerCase(),
      label: color.label,
      swatch: color.swatch,
      images,
      itemId: id,
      variations,
      url,
      inStock: item.stock > 0,
    },
  };
}

/**
 * 色違いの商品を1つにまとめる。並びは BASE の表示順で、最初に出てきた色が既定の色。
 * まとめた商品の ID・写真・在庫・購入リンクは既定の色のものを使う。
 */
function groupByColor(items: BaseItem[]): Product[] {
  const products: Product[] = [];
  for (const { color, ...product } of items.map(normalize)) {
    const group = color && products.find((p) => p.name === product.name && p.colors);
    if (group && color) {
      // 同じ色が2つ登録されていたら、先に出てきたほうを使う
      if (!group.colors!.some((c) => c.id === color.id)) group.colors!.push(color);
      group.inStock ||= color.inStock!;
    } else {
      products.push(color ? { ...product, colors: [color] } : product);
    }
  }
  return products;
}

async function fetchBase<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  // エラー本文は problem+json（type と title のみ。鍵は含まれない）
  // 鍵の取り違えを切り分けるため、401 のときだけ鍵の文字数を添える（中身は出さない）
  if (!res.ok) {
    const hint = res.status === 401 ? ` (token length: ${TOKEN?.length})` : "";
    throw new Error(`BASE ${path} → ${res.status} ${await res.text()}${hint}`);
  }
  return res.json();
}

/** BASE の商品を全件取得する。鍵が無い・失敗したら null */
async function fetchAllItems(): Promise<BaseItem[] | null> {
  if (!TOKEN) return null;
  try {
    const items: BaseItem[] = [];
    for (let offset = 0; ; offset += PAGE_SIZE) {
      const query = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(offset) });
      if (PUBLIC_ONLY) query.set("visible", "true");
      const page = (await fetchBase<BaseItem[]>(`/items?${query}`)) ?? [];
      items.push(...page);
      if (page.length < PAGE_SIZE) return items;
    }
  } catch (err) {
    console.error("[base] items fetch error:", err);
    return null;
  }
}

/** カテゴリーで絞り込む（クエリ文字列 → 表示用カテゴリー）。 */
function filterByCategory(products: Product[], category?: string): Product[] {
  if (!category || category.toUpperCase() === "ALL") return products;
  const target = category.toUpperCase();
  return products.filter((p) => p.category === target);
}

/** 表示する商品の全件。BASE に出せる商品が無ければサイト内の実商品 */
async function getAllProducts(): Promise<Product[]> {
  const items = await fetchAllItems();
  return items && items.length > 0 ? groupByColor(items) : LOCAL_PRODUCTS;
}

/**
 * 商品一覧を取得する。
 * @param category 絞り込みカテゴリー（"tops" など。未指定なら全件）
 */
export async function getProducts(category?: string): Promise<Product[]> {
  return filterByCategory(await getAllProducts(), category);
}

/**
 * 商品を1件取得する。見つからなければ null。
 * 色違いをまとめているので、どの色の BASE 商品IDで来ても、まとめた商品を返す。
 * @param id BASE の商品ID（数字）、またはサイト内の実商品のID（"graffiti-tee" など）
 */
export async function getProduct(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return (
    products.find((p) => p.id === id || p.colors?.some((c) => c.itemId === id)) ?? null
  );
}

/**
 * 商品詳細ページ下部に出すおすすめ商品を返す。
 *
 * 同カテゴリーを優先し、足りなければ他カテゴリーで補う。並びは一覧の取得順を
 * そのまま使う。ランダムにすると再読み込みやISRの再生成のたびに内容が変わり、
 * サーバーとクライアントで結果がズレるため、必ず決定的な順序にすること。
 *
 * @param product 表示中の商品（これ自身は除外する）
 * @param limit   最大件数
 */
export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const others = (await getProducts()).filter((p) => p.id !== product.id);
  const sameCategory = others.filter((p) => p.category === product.category);
  const rest = others.filter((p) => p.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

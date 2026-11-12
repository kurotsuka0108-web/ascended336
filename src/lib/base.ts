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

const TOKEN = process.env.BASE_API_TOKEN;
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

// ── 色とサイズ ──
// BASE のバリエーションは1軸なので、名前を「色 / サイズ」（例: "WHITE / M"）で
// 登録してもらい、ここで2つに分ける。サイズだけの名前（"M"）なら色展開なし。

const SIZE_PATTERN = /^(XXS|XS|S|M|L|XL|XXL|XXXL|FREE|F|ONE)$/i;

/** 色名 → 色見本の塗り。載っていない色はグレーで出す */
const SWATCHES: [RegExp, string][] = [
  [/(white|ホワイト|白)/i, "#f5f5f0"],
  [/(black|ブラック|黒)/i, "#0a0a0a"],
  [/(gr[ae]y|グレー|灰)/i, "#8a8a8a"],
  [/(red|レッド|赤)/i, "#cc0000"],
  [/(navy|ネイビー|紺)/i, "#1c2541"],
];

function splitVariation(name: string): { color?: string; size: string } {
  const parts = name.split(/\s*[/／]\s*/).filter(Boolean);
  if (parts.length >= 2) {
    const size = parts[parts.length - 1];
    return { color: parts.slice(0, -1).join(" / "), size };
  }
  // 区切りが無ければ、サイズなら色なし・それ以外は色だけ（サイズはフリー扱い）
  return SIZE_PATTERN.test(name) ? { size: name } : { color: name, size: "FREE" };
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

/** BASE の item をアプリの Product 型へ正規化する。 */
function normalize(item: BaseItem): Product {
  const images = (item.images ?? []).map((img) => img.url);
  const parsed = (item.variations ?? []).map((v) => ({
    ...splitVariation(v.name?.trim() || "FREE"),
    stock: v.stock,
  }));

  // サイズは登場順に並べ、在庫は色をまたいで合計する
  const variations: ProductVariation[] = [];
  for (const v of parsed) {
    const found = variations.find((s) => s.label === v.size);
    if (found) found.stock += v.stock;
    else variations.push({ id: v.size.toLowerCase(), label: v.size, stock: v.stock });
  }

  // 色ごとの画像は BASE の画像の並び順で割り当てる（2色・4枚なら 1〜2枚目が1色目）。
  // 枚数が色数で割り切れなければ、どの色でも全画像を出す
  const colorNames = [...new Set(parsed.flatMap((v) => (v.color ? [v.color] : [])))];
  const perColor = colorNames.length > 0 && images.length % colorNames.length === 0
    ? images.length / colorNames.length
    : 0;
  const colors: ProductColor[] = colorNames.map((name, i) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    label: name.toUpperCase(),
    swatch: SWATCHES.find(([re]) => re.test(name))?.[1] ?? "#8a8a8a",
    images: perColor > 0 ? images.slice(i * perColor, (i + 1) * perColor) : images,
  }));

  return {
    id: String(item.id),
    name: item.name,
    description: item.detail ?? "",
    price: item.price ?? 0,
    images: colors[0]?.images ?? images,
    category: inferCategory(item.name),
    inStock: item.stock > 0,
    variations,
    colors: colors.length > 0 ? colors : undefined,
    sizeChart: inferSizeChart(item.name),
    url: shopItemUrl(String(item.id)),
  };
}

async function fetchBase<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`BASE ${path} → ${res.status}`);
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
  return items && items.length > 0 ? items.map(normalize) : LOCAL_PRODUCTS;
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
 * @param id BASE の商品ID（数字）、またはサイト内の実商品のID（"graffiti-tee" など）
 */
export async function getProduct(id: string): Promise<Product | null> {
  if (!/^\d+$/.test(id) || !TOKEN) {
    return LOCAL_PRODUCTS.find((p) => p.id === id) ?? null;
  }
  try {
    const item = await fetchBase<BaseItem>(`/items/${id}`);
    if (!item || (PUBLIC_ONLY && !item.visible)) return null;
    return normalize(item);
  } catch (err) {
    console.error("[base] item detail fetch error:", err);
    return null;
  }
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

import "server-only";
import type { Product, ProductCategory, ProductVariation } from "@/types/product";
import { MOCK_PRODUCTS } from "./mock-products";

/**
 * BASE API クライアント。
 *
 * - サーバーサイド専用（"server-only"）。秘密情報をクライアントに渡さない。
 * - 環境変数（BASE_CLIENT_ID / BASE_CLIENT_SECRET / BASE_REFRESH_TOKEN）が
 *   未設定のときは自動でモックデータにフォールバックする。
 * - トークンを .env.local / Vercel に設定するだけで本番連携に切り替わる。
 *
 * 参考: https://docs.thebase.in/docs/api/
 */

const API_BASE = "https://api.thebase.in/1";
const REVALIDATE_SECONDS = 3600; // 1時間ごとに再取得（ISR）

const CLIENT_ID = process.env.BASE_CLIENT_ID;
const CLIENT_SECRET = process.env.BASE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.BASE_REFRESH_TOKEN;

/** トークン一式が揃っているか。揃っていなければモックを使う。 */
const hasCredentials = Boolean(CLIENT_ID && CLIENT_SECRET && REFRESH_TOKEN);

// ── カテゴリー推定（BASE 標準 item にカテゴリー項目が無いため簡易マッピング） ──
// 本番では BASE のカテゴリーAPI（/1/categories）連携に差し替え可能。
function inferCategory(title: string): ProductCategory {
  const t = title.toLowerCase();
  if (/(vintage|used|secondhand|archive|古着)/.test(t)) return "VINTAGE";
  if (/(coat|jacket|blazer|parka|trench|outer|riders)/.test(t)) return "OUTERWEAR";
  if (/(pants|trousers|denim|skirt|kilt|cargo|bottom)/.test(t)) return "BOTTOMS";
  if (/(belt|choker|earring|ring|pin|scarf|wallet|beanie|glove|necklace|bag|cap|hat)/.test(t))
    return "ACCESSORIES";
  return "TOPS";
}

// ── BASE のレスポンス型（必要な範囲のみ） ──
interface BaseVariation {
  variation_id: number;
  variation: string | null;
  stock: number;
}

interface BaseItem {
  item_id: number;
  title: string;
  detail: string;
  price: number;
  stock: number;
  visible: number;
  img1_origin?: string;
  img2_origin?: string;
  img3_origin?: string;
  img4_origin?: string;
  img5_origin?: string;
  variations?: BaseVariation[];
}

interface BaseItemsResponse {
  items: BaseItem[];
}

interface BaseTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/** BASE の item をアプリの Product 型へ正規化する。 */
function normalize(item: BaseItem): Product {
  const images = [
    item.img1_origin,
    item.img2_origin,
    item.img3_origin,
    item.img4_origin,
    item.img5_origin,
  ].filter((url): url is string => Boolean(url));

  const variations: ProductVariation[] = (item.variations ?? []).map((v) => ({
    id: String(v.variation_id),
    label: v.variation ?? "FREE",
    stock: v.stock,
  }));

  return {
    id: String(item.item_id),
    name: item.title,
    description: item.detail,
    price: item.price,
    images,
    category: inferCategory(item.title),
    inStock: item.stock > 0,
    variations,
  };
}

/**
 * refresh_token を使って access_token を取得する。
 * access_token は短命（約1時間）なので毎リクエスト前に更新する。
 */
async function getAccessToken(): Promise<string | null> {
  try {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      refresh_token: REFRESH_TOKEN!,
    });

    const res = await fetch(`${API_BASE}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[base] token refresh failed:", res.status);
      return null;
    }

    const data: BaseTokenResponse = await res.json();
    return data.access_token;
  } catch (err) {
    console.error("[base] token refresh error:", err);
    return null;
  }
}

/** カテゴリーで絞り込む（クエリ文字列 → 表示用カテゴリー）。 */
function filterByCategory(products: Product[], category?: string): Product[] {
  if (!category || category.toUpperCase() === "ALL") return products;
  const target = category.toUpperCase();
  return products.filter((p) => p.category === target);
}

/**
 * 商品一覧を取得する。
 * @param category 絞り込みカテゴリー（"tops" など。未指定なら全件）
 */
export async function getProducts(category?: string): Promise<Product[]> {
  if (!hasCredentials) {
    return filterByCategory(MOCK_PRODUCTS, category);
  }

  const token = await getAccessToken();
  if (!token) return filterByCategory(MOCK_PRODUCTS, category);

  try {
    const res = await fetch(`${API_BASE}/items?limit=100`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error("[base] items fetch failed:", res.status);
      return filterByCategory(MOCK_PRODUCTS, category);
    }

    const data: BaseItemsResponse = await res.json();
    const products = data.items
      .filter((item) => item.visible === 1)
      .map(normalize);

    return filterByCategory(products, category);
  } catch (err) {
    console.error("[base] items fetch error:", err);
    return filterByCategory(MOCK_PRODUCTS, category);
  }
}

/**
 * 商品を1件取得する。見つからなければ null。
 * @param id 商品ID（item_id）
 */
export async function getProduct(id: string): Promise<Product | null> {
  if (!hasCredentials) {
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  }

  const token = await getAccessToken();
  if (!token) return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;

  try {
    const res = await fetch(`${API_BASE}/items/detail/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      console.error("[base] item detail fetch failed:", res.status);
      return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
    }

    const data: { item: BaseItem } = await res.json();
    return normalize(data.item);
  } catch (err) {
    console.error("[base] item detail fetch error:", err);
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  }
}

/** 連携状態（デバッグ・表示用）。true ならモックを使用中。 */
export const isUsingMockData = !hasCredentials;

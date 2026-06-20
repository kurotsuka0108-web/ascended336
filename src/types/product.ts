/**
 * アプリ共通の商品型。
 * BASE API のレスポンス（item）を正規化したもの。
 * UI 側は BASE 固有のフィールド名を意識しない。
 */

export type ProductCategory =
  | "TOPS"
  | "BOTTOMS"
  | "OUTERWEAR"
  | "VINTAGE"
  | "ACCESSORIES";

export interface ProductVariation {
  /** BASE の variation_id（モックでは連番） */
  id: string;
  /** サイズなどのラベル（例: "S", "M", "FREE"） */
  label: string;
  /** 在庫数 */
  stock: number;
}

export interface Product {
  /** BASE の item_id を文字列化したもの */
  id: string;
  /** 商品名 */
  name: string;
  /** 商品説明 */
  description: string;
  /** 価格（円・税込） */
  price: number;
  /** 画像URLの配列（先頭がメイン）。未登録なら空配列 */
  images: string[];
  /** カテゴリー */
  category: ProductCategory;
  /** 在庫の有無（全バリエーション合計が0なら false） */
  inStock: boolean;
  /** サイズなどのバリエーション */
  variations: ProductVariation[];
}

/** BASE ショップのURL。購入ボタン・ヘッダー・フッターのリンク先 */
export const SHOP_URL = "https://ascended336.base.shop";

/** BASE の商品ページのURL */
export function shopItemUrl(itemId: string): string {
  return `${SHOP_URL}/items/${itemId}`;
}

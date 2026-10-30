"use client";

import { useState } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import SizeGuide from "@/components/product/SizeGuide";
import type { Product } from "@/types/product";

interface ProductDetailProps {
  product: Product;
  /** URL の ?color= で指定された色。未指定・該当なしなら先頭の色 */
  initialColorId?: string;
}

/**
 * 商品詳細の本体（ギャラリー＋情報欄）。
 * 色を選ぶとギャラリーの画像がその色に切り替わるため、両者の状態をここで持つ。
 */
export default function ProductDetail({ product, initialColorId }: ProductDetailProps) {
  const colors = product.colors ?? [];
  const [colorId, setColorId] = useState(
    colors.some((c) => c.id === initialColorId) ? initialColorId : colors[0]?.id,
  );
  const color = colors.find((c) => c.id === colorId);
  const images = color?.images ?? product.images;

  function selectColor(id: string) {
    setColorId(id);
    // 共有・リロードしても同じ色で開けるよう URL に残す（履歴は積まない）
    const url = new URL(window.location.href);
    url.searchParams.set("color", id);
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

      {/* Image gallery */}
      <ProductGallery
        images={images}
        name={color ? `${product.name} / ${color.label}` : product.name}
        category={product.category}
      />

      {/* Info area */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="font-heading text-[11px] tracking-[0.4em] text-brand-red mb-2">
            ASCENDED336
          </p>
          <h1 className="font-display text-brand-white leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            {product.name}
          </h1>
          <p className="font-body text-xl text-brand-white">
            ¥{product.price.toLocaleString()}
          </p>
        </div>

        <p className="font-body text-sm text-brand-gray-light leading-relaxed whitespace-pre-line">
          {product.description}
        </p>

        {/* Color selector */}
        {colors.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="font-heading text-[11px] tracking-[0.3em] text-brand-gray-light">
              COLOR
              {color && <span className="text-brand-white">&nbsp;—&nbsp;{color.label}</span>}
            </span>
            <div role="radiogroup" aria-label="カラー" className="flex flex-wrap gap-3">
              {colors.map((c) => {
                const selected = c.id === colorId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={c.label}
                    title={c.label}
                    onClick={() => selectColor(c.id)}
                    className={`w-11 h-11 rounded-full p-1 border transition-colors duration-200
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red
                               ${selected ? "border-brand-white" : "border-transparent hover:border-brand-gray-light"}`}
                  >
                    {/* 黒の見本が背景に沈まないよう、塗りには常に細い枠を付ける */}
                    <span
                      className="block w-full h-full rounded-full border border-brand-gray-light/60"
                      style={{ backgroundColor: c.swatch }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size selector */}
        {product.variations.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <span className="font-heading text-[11px] tracking-[0.3em] text-brand-gray-light">
                SIZE
              </span>
              {product.sizeChart && <SizeGuide chart={product.sizeChart} />}
            </div>
            <div className="flex flex-wrap gap-3">
              {product.variations.map((v) => {
                const soldOut = v.stock <= 0;
                return (
                  <button
                    key={v.id}
                    disabled={soldOut}
                    className={`min-w-12 h-12 px-3 border font-heading text-xs
                               transition-colors duration-200
                               focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red
                               ${
                                 soldOut
                                   ? "border-brand-gray text-brand-gray-light/40 line-through cursor-not-allowed"
                                   : "border-brand-gray text-brand-gray-light hover:border-brand-white hover:text-brand-white"
                               }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* BASE purchase button */}
        {product.inStock ? (
          <a
            href="https://base.shop"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm tracking-[0.35em] px-8 py-4 text-center
                       bg-brand-red text-brand-cream border-2 border-brand-red
                       shadow-[3px_3px_0_rgba(0,0,0,0.55)]
                       hover:bg-transparent hover:text-brand-red
                       transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
          >
            BASE で購入する →
          </a>
        ) : (
          <span
            className="font-heading text-sm tracking-[0.35em] px-8 py-4 text-center
                       border-2 border-brand-gray text-brand-gray-light cursor-not-allowed"
          >
            SOLD OUT
          </span>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  name: string;
  category: string;
}

/**
 * 商品詳細の画像ギャラリー。
 * - 0枚: 質感プレースホルダー
 * - 1枚: 単体表示
 * - 複数枚: メイン画像＋サムネイル切替（クリック/キーボード対応）
 * BASE登録画像が複数あれば自動でサムネイルが並ぶ。
 */
export default function ProductGallery({ images, name, category }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;
  const hasThumbs = images.length > 1;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image
          placeholder-surface は画像が無いときだけ。::after の斜めストライプは擬似要素
          ＝子要素より後に描画されるため写真の上に重なり、object-contain の余白にも出る。
          写真があるときは無地の背景に切り替えて模様を出さない。 */}
      <div
        className={`aspect-[3/4] relative overflow-hidden border border-brand-gray-mid ${
          hasImages ? "bg-brand-black" : "placeholder-surface"
        }`}
      >
        {hasImages ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* 物撮りは3:4・モデル着用は2:3と縦横比が混在するため object-contain。
                  object-cover にすると2:3の全身カットで頭と足元が切れる。
                  商品写真をトリミングしないことを優先し、余白は枠の質感で受ける。 */}
              <Image
                src={images[active]}
                alt={`${name}（${active + 1}/${images.length}）`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="font-display text-3xl tracking-[0.1em] text-brand-white/15 select-none">
              A336
            </span>
            <span className="font-heading text-xs tracking-[0.3em] text-brand-gray-light">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasThumbs && (
        <div
          role="tablist"
          aria-label="商品画像サムネイル"
          className="flex gap-3 overflow-x-auto pb-1"
        >
          {images.map((src, i) => {
            const isActive = i === active;
            return (
              <button
                key={src + i}
                role="tab"
                aria-selected={isActive}
                aria-label={`画像 ${i + 1} を表示`}
                onClick={() => setActive(i)}
                className={`relative aspect-square w-16 md:w-20 shrink-0 overflow-hidden border
                            transition-colors duration-200
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red
                            ${
                              isActive
                                ? "border-brand-red"
                                : "border-brand-gray-mid hover:border-brand-white/60"
                            }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className={`object-cover transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

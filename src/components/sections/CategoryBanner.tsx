"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

/**
 * image があるカテゴリーは写真付きのリンク、無いカテゴリーは商品がまだ無いので
 * 「COMING SOON」の札だけを出し、リンクにはしない（押しても空の一覧になるだけのため）。
 * 商品が増えたら image を足すだけでリンクに切り替わる。
 */
const CATEGORIES: { label: string; href: string; image?: string }[] = [
  { label: "TOPS",        href: "/products?category=tops", image: "/products/graffiti-tee/black-front.jpg" },
  { label: "BOTTOMS",     href: "/products?category=bottoms" },
  { label: "OUTERWEAR",   href: "/products?category=outerwear" },
  { label: "VINTAGE",     href: "/products?category=vintage" },
  { label: "ACCESSORIES", href: "/products?category=accessories" },
];

const tileClass = "flex flex-col items-center justify-center w-full h-full py-10 gap-3";
const imageBoxClass = "relative w-full max-w-[120px] aspect-square flex items-center justify-center overflow-hidden";
const labelStyle = { fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)" };

export default function CategoryBanner() {
  return (
    <section className="border-y border-brand-gray" aria-label="カテゴリー一覧">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-brand-gray"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {CATEGORIES.map((cat, i) => {
            const isLastOdd =
              i === CATEGORIES.length - 1 && CATEGORIES.length % 2 === 1;
            return (
            <motion.div
              key={cat.href}
              variants={fadeInUp}
              className={`bg-brand-black ${isLastOdd ? "col-span-2 md:col-span-1" : ""}`}
            >
              {cat.image ? (
                <Link
                  href={cat.href}
                  className={`group ${tileClass}
                             hover:bg-brand-gray transition-colors duration-200
                             focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-brand-red`}
                >
                  <div className={imageBoxClass}>
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span
                    className="font-heading tracking-[0.3em] text-brand-white/70
                               group-hover:text-brand-white transition-colors duration-200"
                    style={labelStyle}
                  >
                    {cat.label}
                  </span>
                </Link>
              ) : (
                <div className={tileClass}>
                  <div className={`placeholder-surface ${imageBoxClass}`}>
                    <span className="font-heading text-[11px] leading-[1.6] tracking-[0.3em] text-center text-brand-white/35 select-none">
                      COMING
                      <br />
                      SOON
                    </span>
                  </div>
                  <span
                    className="font-heading tracking-[0.3em] text-brand-white/40"
                    style={labelStyle}
                  >
                    {cat.label}
                  </span>
                </div>
              )}
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
